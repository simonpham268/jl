/**
 * Crawler — indexes release notes (web) + SharePoint docs into SQLite FTS.
 *
 * CLI usage:
 *   npx tsx mcp-servers/crawler.ts                   # crawl all
 *   npx tsx mcp-servers/crawler.ts release_notes     # release notes only
 *   npx tsx mcp-servers/crawler.ts sharepoint        # SharePoint only
 *   npx tsx mcp-servers/crawler.ts sharepoint --force # force reindex all
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env.uat from project root
config({ path: resolve(process.cwd(), '.env.uat') });

import { chromium } from '@playwright/test';
import mammoth from 'mammoth';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
// pdf-parse v2 API: new PDFParse({ data: buffer }) -> .getText() returns { text: string }
const { PDFParse } = require('pdf-parse') as {
  PDFParse: new (opts: { data: ArrayBuffer }) => {
    getText(): Promise<{ text: string }>;
    destroy(): Promise<void>;
  };
};
import {
  type ChunkInput,
  dbClearSource,
  dbClearSourceRef,
  dbGetSpDoc,
  dbGetNotionPage,
  dbInsertChunks,
  dbMarkIndexed,
  dbUpsertSpDoc,
  dbUpsertNotionPage,
  openDb,
} from './db.js';

// ========================
// Shared: chunking
// ========================

const MAX_CHUNK_WORDS = 800;

function chunkText(
  text: string,
  source: string,
  sourceRef: string,
  metadata: object,
  defaultHeading = '',
): ChunkInput[] {
  const lines = text.split('\n');
  const result: ChunkInput[] = [];
  let heading = defaultHeading;
  let buf: string[] = [];

  function flush() {
    const content = buf.join('\n').replace(/\n{3,}/g, '\n\n').trim();
    const words = content.split(/\s+/).filter(Boolean);
    if (words.length < 10) { buf = []; return; }
    for (let i = 0; i < words.length; i += MAX_CHUNK_WORDS) {
      result.push({
        heading,
        content: words.slice(i, i + MAX_CHUNK_WORDS).join(' '),
        source,
        source_ref: sourceRef,
        metadata,
      });
    }
    buf = [];
  }

  for (const line of lines) {
    if (/^#{1,4} .+/.test(line)) {
      flush();
      heading = line.replace(/^#+\s*/, '').trim();
    } else {
      buf.push(line);
    }
  }
  flush();
  return result;
}

// ========================
// Release Notes crawler
// ========================

const DOCS_BASE_URL = process.env.RELEASE_NOTES_URL ?? 'https://support.joblogic.com/docs/latest-release-notes';

const RELEASE_LINK_RE =
  /release|update|changelog|what'?s.?new|\d{4}|january|february|march|april|may|june|july|august|september|october|november|december/i;

// Pattern to match actual release notes URLs (not documentation)
const RELEASE_URL_RE =
  /\/(mobile-release|web-release|release-notes|release-\d{4}|january-\d{4}|february-\d{4}|march-\d{4}|april-\d{4}|may-\d{4}|june-\d{4}|july-\d{4}|august-\d{4}|september-\d{4}|october-\d{4}|november-\d{4}|december-\d{4})/i;

const HTML_ENTITIES: Record<string, string> = {
  '&nbsp;': ' ', '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'",
};

function htmlToMarkdown(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, lvl, inner) => {
      const text = inner.replace(/<[^>]+>/g, '').trim();
      return `\n${'#'.repeat(Number(lvl))} ${text}\n`;
    })
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?(p|div|li|tr)[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, (e) => HTML_ENTITIES[e] ?? '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export async function crawlReleaseNotes(db: ReturnType<typeof openDb>): Promise<number> {
  console.log('[crawler] Crawling release notes…');
  dbClearSource(db, 'release_notes');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Step 1: Load the "Latest Release Notes" page
    await page.goto(DOCS_BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    // Step 2: First expand "Latest Release Notes" section if collapsed
    const latestReleaseBtn = page.getByRole('button', { name: /Expand Latest Release Notes section/i });
    if (await latestReleaseBtn.count() > 0) {
      await latestReleaseBtn.click();
      console.log('[crawler] Expanded: Latest Release Notes');
      await page.waitForTimeout(500);
    }

    // Step 3: Expand all "Release Notes YYYY" year sections
    let expandCount = 0;
    
    // Expand year sections (Release Notes 2026, 2025, 2024, etc.)
    while (true) {
      const yearBtn = page.getByRole('button', { name: /Expand Release Notes \d{4} section/i }).first();
      if (await yearBtn.count() === 0) break;
      const label = await yearBtn.getAttribute('aria-label') || '';
      await yearBtn.click();
      expandCount++;
      console.log(`[crawler] Expanded: ${label.replace('Expand ', '').replace(' section', '')}`);
      await page.waitForTimeout(300);
    }

    // Step 4: Expand all month sections (January, February, etc.)
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    
    for (const month of months) {
      while (true) {
        const monthBtn = page.getByRole('button', { name: new RegExp(`Expand ${month} section`, 'i') }).first();
        if (await monthBtn.count() === 0) break;
        await monthBtn.click();
        expandCount++;
        console.log(`[crawler] Expanded: ${month}`);
        await page.waitForTimeout(200);
      }
    }

    console.log(`[crawler] Total expanded: ${expandCount} sections`);

    // Step 5: Collect all release article links
    const allLinks = await page.$$eval('a[href]', (els) =>
      els.map((el) => ({
        title: el.textContent?.trim() ?? '',
        url: (el as any).href as string,
      }))
    );

    // Filter to only release notes pages (Web Release, Mobile Release)
    const releaseLinks = [
      ...new Map(
        allLinks
          .filter((l) =>
            l.title &&
            l.url.includes('support.joblogic.com/docs/') &&
            !l.url.endsWith('/docs/') &&
            !l.url.endsWith('/docs/latest-release-notes') &&
            !l.url.includes('#') &&
            (
              /release/i.test(l.url) || // URL contains "release"
              /^(web|mobile)\s*release/i.test(l.title) // Title starts with Web/Mobile Release
            )
          )
          .map((l) => [l.url, l])
      ).values(),
    ];

    console.log(`[crawler] Found ${releaseLinks.length} release notes pages`);

    // Step 6: Visit each release page and extract content
    const chunks: ChunkInput[] = [];

    for (const link of releaseLinks) {
      try {
        await page.goto(link.url, { waitUntil: 'networkidle', timeout: 30000 });
        const html = await page.$eval('main, article, [role="main"]', (el) => el.innerHTML)
          .catch(() => page.content());
        const text = htmlToMarkdown(html);
        const pageChunks = chunkText(text, 'release_notes', link.url, { url: link.url, title: link.title });
        chunks.push(...pageChunks);
        console.log(`[crawler] Crawled: ${link.title} → ${pageChunks.length} chunks`);
      } catch (err) {
        console.warn(`[crawler] Failed ${link.url}:`, err instanceof Error ? err.message : err);
      }
    }

    dbInsertChunks(db, chunks);
    dbMarkIndexed(db, 'release_notes', chunks.length);
    console.log(`[crawler] Release notes done: ${chunks.length} chunks from ${releaseLinks.length} pages`);
    return chunks.length;
  } finally {
    await browser.close();
  }
}

// ========================
// SharePoint crawler
// ========================

const SITE_URL = process.env.SHAREPOINT_SITE_URL ?? '';
const LIBRARY = process.env.SHAREPOINT_LIBRARY ?? '';
const TENANT_ID = process.env.AZURE_TENANT_ID ?? '';
const CLIENT_ID = process.env.AZURE_CLIENT_ID ?? '';
const CLIENT_SECRET = process.env.AZURE_CLIENT_SECRET ?? '';

let tokenCache: { token: string; expiresAt: number } | null = null;

async function getToken(): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expiresAt - 60_000) return tokenCache.token;
  const res = await fetch(
    `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: CLIENT_ID, client_secret: CLIENT_SECRET,
        scope: 'https://graph.microsoft.com/.default', grant_type: 'client_credentials',
      }),
    }
  );
  if (!res.ok) throw new Error(`Auth failed: ${await res.text()}`);
  const data = await res.json() as { access_token: string; expires_in: number };
  tokenCache = { token: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return tokenCache.token;
}

async function graphGet(pathOrUrl: string): Promise<any> {
  const token = await getToken();
  const url = pathOrUrl.startsWith('https://') ? pathOrUrl : `https://graph.microsoft.com/v1.0${pathOrUrl}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`Graph ${res.status}: ${await res.text()}`);
  return res.json();
}

async function graphGetAll(path: string): Promise<any[]> {
  const items: any[] = [];
  let next: string | undefined = path;
  while (next) {
    const data = await graphGet(next);
    items.push(...(data.value ?? []));
    next = data['@odata.nextLink'];
  }
  return items;
}

function encPath(p: string) { return p.split('/').map(encodeURIComponent).join('/'); }

async function listFilesRecursive(driveId: string, folderPath?: string): Promise<any[]> {
  const apiPath = folderPath
    ? `/drives/${driveId}/root:/${encPath(folderPath)}:/children`
    : `/drives/${driveId}/root/children`;
  const items = await graphGetAll(apiPath);
  const files: any[] = [];
  for (const item of items) {
    if (item.folder) {
      const sub = folderPath ? `${folderPath}/${item.name}` : item.name;
      files.push(...await listFilesRecursive(driveId, sub));
    } else {
      item._folderPath = folderPath ?? '';
      files.push(item);
    }
  }
  return files;
}

async function extractText(fileName: string, buffer: ArrayBuffer): Promise<string> {
  // Word documents (.doc, .docx)
  if (/\.docx?$/i.test(fileName)) {
    const { value } = await mammoth.extractRawText({ buffer: Buffer.from(buffer) });
    return value;
  }
  // PDF files
  if (/\.pdf$/i.test(fileName)) {
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    await parser.destroy();
    return result.text;
  }
  // Excel files (.xls, .xlsx) - extract as metadata only (full parsing requires xlsx library)
  if (/\.xlsx?$/i.test(fileName)) {
    return `[Excel spreadsheet: ${fileName}]\nNote: Excel content requires xlsx library for full text extraction.`;
  }
  // PowerPoint files (.ppt, .pptx) - metadata only
  if (/\.pptx?$/i.test(fileName)) {
    return `[PowerPoint presentation: ${fileName}]\nNote: PowerPoint content not fully extracted.`;
  }
  // Plain text files
  return new TextDecoder().decode(buffer);
}

export async function crawlSharePoint(db: ReturnType<typeof openDb>, forceReindex = false): Promise<number> {
  if (!SITE_URL || !TENANT_ID || !CLIENT_ID || !CLIENT_SECRET) {
    throw new Error('SharePoint env vars missing (SHAREPOINT_SITE_URL, AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET)');
  }

  console.log(`[crawler] Crawling SharePoint${forceReindex ? ' (force reindex)' : ''}…`);

  const { hostname, pathname } = new URL(SITE_URL);
  const site = await graphGet(`/sites/${hostname}:${pathname}`);
  const drives = await graphGet(`/sites/${site.id}/drives`);
  const drive = drives.value.find((d: any) => d.name.toLowerCase() === LIBRARY.toLowerCase());
  if (!drive) throw new Error(`Library "${LIBRARY}" not found`);

  const files = await listFilesRecursive(drive.id);
  // Supported file types: Word, Excel, PowerPoint, PDF, text files
  // Exclude: apk, exe, zip, images, videos, etc.
  const SUPPORTED = /\.(docx?|xlsx?|pptx?|pdf|txt|md|csv)$/i;
  const EXCLUDED = /\.(apk|exe|zip|rar|7z|tar|gz|jpg|jpeg|png|gif|bmp|svg|mp4|avi|mov|wmv|mp3|wav|dll|bin|iso)$/i;
  const supported = files.filter((f) => SUPPORTED.test(f.name) && !EXCLUDED.test(f.name));

  console.log(`[crawler] Found ${supported.length} supported files (of ${files.length} total)`);

  let totalChunks = 0;

  for (const file of supported) {
    const itemId: string = file.id;
    const modifiedAt: string = file.lastModifiedDateTime;
    const filePath = file._folderPath ? `${file._folderPath}/${file.name}` : file.name;

    // Delta sync — skip unchanged files (unless force reindex)
    const existing = dbGetSpDoc(db, itemId);
    if (!forceReindex && existing?.modified_at === modifiedAt) {
      console.log(`[crawler] Skipped (unchanged): ${filePath}`);
      continue;
    }

    try {
      const token = await getToken();
      const res = await fetch(
        `https://graph.microsoft.com/v1.0/drives/${drive.id}/items/${itemId}/content`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error(`Download failed: ${res.status}`);

      const buffer = await res.arrayBuffer();
      const text = await extractText(file.name, buffer);
      const ext = file.name.split('.').pop()?.toLowerCase() ?? '';

      dbClearSourceRef(db, 'sharepoint', filePath);
      const chunks = chunkText(text, 'sharepoint', filePath, {
        fileName: file.name,
        filePath,
        fileType: ext,
        modifiedAt,
        webUrl: file.webUrl,
      }, filePath);
      dbInsertChunks(db, chunks);
      dbUpsertSpDoc(db, itemId, filePath, file.name, modifiedAt);

      totalChunks += chunks.length;
      console.log(`[crawler] Indexed: ${filePath} → ${chunks.length} chunks`);
    } catch (err) {
      console.warn(`[crawler] Failed ${filePath}:`, err instanceof Error ? err.message : err);
    }
  }

  dbMarkIndexed(db, 'sharepoint', totalChunks);
  console.log(`[crawler] SharePoint done: ${totalChunks} chunks`);
  return totalChunks;
}

// ========================
// Notion crawler (Playwright-based, no API key needed)
// ========================

const NOTION_SITE_URL = process.env.NOTION_SITE_URL ?? '';


export async function crawlNotion(db: ReturnType<typeof openDb>, forceReindex = false): Promise<number> {
  if (!NOTION_SITE_URL) {
    throw new Error('NOTION_SITE_URL must be set in .env.uat');
  }

  console.log(`[crawler] Crawling Notion (hover title → Open in side peek → extract → Close)${forceReindex ? ' (force)' : ''}…`);

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();
  let totalChunks = 0;

  try {
    // ── Step 1: Load database ──
    console.log('[crawler] Loading Notion database…');
    await page.goto(NOTION_SITE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(6000); // Wait for rows to fully render

    // ── Step 2: Scroll to load ALL rows ──
    if (forceReindex) dbClearSource(db, 'notion');

    // ── Steps 3+4: Scroll → crawl visible rows → scroll → crawl new rows → repeat ──
    // Notion uses virtual scrolling: rows outside viewport are removed from DOM.
    // Strategy: collect visible unprocessed rows → process each → scroll down → repeat
    // until 3 consecutive scrolls produce no new rows.

    // Helper: scroll the Notion table container (not window — Notion uses its own scroller)
    const scrollNotion = (px: number) => page.evaluate((amount: number) => {
      const firstRow = document.querySelector('.notion-table-view-row');
      if (firstRow) {
        let el: Element | null = firstRow.parentElement;
        while (el && el !== document.body) {
          const s = window.getComputedStyle(el);
          if (s.overflowY === 'auto' || s.overflowY === 'scroll') {
            el.scrollBy(0, amount);
            return;
          }
          el = el.parentElement;
        }
      }
      window.scrollBy(0, amount);
    }, px);

    const processedTitles = new Set<string>();
    let stableScrolls = 0;
    let totalRows = 0;

    // Process one row at a time from currently visible DOM.
    // After each row, re-check DOM — avoids stale refs from virtual scrolling.
    // Scroll down only when no unprocessed rows are visible.
    while (stableScrolls < 30) {
      // Find the FIRST visible unprocessed row in current DOM
      const rows = await page.locator('.notion-table-view-row').all();
      let foundRow: { rowEl: ReturnType<typeof page.locator>; title: string } | null = null;

      for (const rowEl of rows) {
        const cell = rowEl.locator('.notion-table-view-cell').first();
        // Use evaluate to strip button/action elements before reading text —
        // Notion renders "Open"/"Close" buttons inside the cell DOM (hidden via CSS)
        // and textContent() would include them, corrupting the title.
        const title = await cell.evaluate((el) => {
          const clone = el.cloneNode(true) as HTMLElement;
          clone.querySelectorAll('[role="button"], button, [aria-label]').forEach((n) => n.remove());
          return (clone.textContent ?? '').trim().replace(/\s+/g, ' ');
        }).catch(() => '');
        if (!title || title.length < 2 || processedTitles.has(title)) continue;
        foundRow = { rowEl, title };
        break;
      }

      if (!foundRow) {
        // All visible rows processed — scroll down to load more
        stableScrolls++;
        await scrollNotion(500);
        await page.waitForTimeout(1500);
        continue;
      }

      stableScrolls = 0;
      const { rowEl, title } = foundRow;
      processedTitles.add(title); // Mark before processing to prevent retries on error
      totalRows++;

      const stableId = Buffer.from(title).toString('hex').slice(0, 32).padEnd(32, '0');

      if (!forceReindex && dbGetNotionPage(db, stableId)) {
        console.log(`[crawler] Skip (indexed): "${title}"`);
        continue;
      }

      console.log(`[crawler] [${totalRows}] Processing: "${title}"`);

      try {
        const titleCell = rowEl.locator('.notion-table-view-cell').first();

        // Hover deepest div — Notion's mouseenter fires 4 levels deep
        const titleInner = titleCell.locator('div div div div').first();
        if (await titleInner.count() > 0) {
          await titleInner.hover();
        } else {
          await titleCell.hover();
        }
        await page.waitForTimeout(600);

        // Click "Open in side peek" (Notion uses div[role="button"], not <button>)
        const openBtn = page.locator('[aria-label="Open in side peek"]').first();
        if (!await openBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
          console.log(`[crawler]   OPEN button not found — skipping`);
          continue;
        }
        await openBtn.click();

        // Wait for URL &pm=s then wait for h1 (content loaded)
        await page.waitForURL(/pm=s/, { timeout: 8000 }).catch(() => {});
        const sidePeek = page.locator('[role="region"][aria-label="Side Peek"]');
        await page.locator('[role="region"][aria-label="Side Peek"] h1')
          .waitFor({ state: 'visible', timeout: 10000 })
          .catch(() => {});
        await page.waitForTimeout(500);

        const notionUrl = page.url();
        const peekText = await sidePeek.innerText().catch(() => '');

        if (peekText && peekText.length > 30) {
          const fullText = `# ${title}\n\n${peekText}`;
          const metadata = { pageId: stableId, title, notionUrl };
          dbClearSourceRef(db, 'notion', stableId);
          const chunks = chunkText(fullText, 'notion', stableId, metadata, title);
          dbInsertChunks(db, chunks);
          dbUpsertNotionPage(db, stableId, title, new Date().toISOString());
          totalChunks += chunks.length;
          console.log(`[crawler] Indexed: "${title}" → ${chunks.length} chunks`);
        } else {
          console.log(`[crawler] Empty content: "${title}" — skipped`);
        }

        // Close side peek
        const closeBtn = page.getByRole('button', { name: 'Close', exact: true });
        if (await closeBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
          await closeBtn.click();
        } else {
          await page.keyboard.press('Escape');
        }
        await page.waitForTimeout(800);

      } catch (err) {
        console.warn(`[crawler] Failed "${title}":`, err instanceof Error ? err.message : err);
        await page.keyboard.press('Escape').catch(() => {});
        await page.waitForTimeout(500);
      }
    }

    dbMarkIndexed(db, 'notion', totalChunks);
    console.log(`[crawler] Notion done: ${totalChunks} chunks from ${processedTitles.size} unique rows`);
    return totalChunks;

  } finally {
    await browser.close();
  }
}

// ========================
// CLI entry point
// ========================

const isMain = process.argv[1]?.includes('crawler');
if (isMain) {
  const args = process.argv.slice(2);
  const forceReindex = args.includes('--force');
  const source = args.find((a) => !a.startsWith('-')) ?? 'all';
  const db = openDb();

  (async () => {
    if (source === 'release_notes' || source === 'all') await crawlReleaseNotes(db);
    if (source === 'sharepoint' || source === 'all') await crawlSharePoint(db, forceReindex);
    if (source === 'notion' || source === 'all') await crawlNotion(db, forceReindex);
    db.close();
    console.log('[crawler] Done.');
  })().catch((err) => {
    console.error('[crawler] Fatal:', err);
    process.exit(1);
  });
}
