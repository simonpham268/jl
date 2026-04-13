/**
 * notion-exporter.ts
 *
 * Standalone crawler: reads Notion specs via Playwright → exports each page
 * as a .docx file.
 *
 * Modes (--mode flag):
 *   local      Save to ~/Downloads/notion-export/ (default)
 *   sharepoint Upload to SharePoint via Graph API (requires write permission)
 *
 * Separate from crawler.ts — does NOT modify the FTS index.
 * Supports delta sync: skips pages already exported unless --force is passed.
 *
 * CLI usage:
 *   npx tsx mcp-servers/notion-exporter.ts                        # local, delta sync
 *   npx tsx mcp-servers/notion-exporter.ts --force               # local, re-export all
 *   npx tsx mcp-servers/notion-exporter.ts --mode=sharepoint     # upload to SharePoint
 */

import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { homedir } from 'os';

config({ path: resolve(process.cwd(), '.env.uat') });

import { chromium } from '@playwright/test';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  convertInchesToTwip,
} from 'docx';
import Database from 'better-sqlite3';
import { mkdirSync, writeFileSync } from 'fs';

// ========================
// Config
// ========================

const NOTION_SITE_URL = process.env.NOTION_SITE_URL ?? '';
const SHAREPOINT_SITE_URL = process.env.SHAREPOINT_SITE_URL ?? '';
const SHAREPOINT_LIBRARY = process.env.SHAREPOINT_LIBRARY ?? '';
const TENANT_ID = process.env.AZURE_TENANT_ID ?? '';
const CLIENT_ID = process.env.AZURE_CLIENT_ID ?? '';
const CLIENT_SECRET = process.env.AZURE_CLIENT_SECRET ?? '';

const EXPORT_FOLDER = 'Notion Export'; // subfolder inside SHAREPOINT_LIBRARY
const LOCAL_EXPORT_DIR = resolve(homedir(), 'Downloads', 'notion-export');
const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = process.env.INDEX_DB_PATH ?? resolve(__dirname, 'data', 'index.db');

// ========================
// DB: track uploaded pages
// ========================

function openDb() {
  mkdirSync(dirname(DB_PATH), { recursive: true });
  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.exec(`
    CREATE TABLE IF NOT EXISTS notion_exports (
      page_id       TEXT PRIMARY KEY,
      title         TEXT NOT NULL,
      last_exported INTEGER NOT NULL,
      sp_item_id    TEXT
    )
  `);
  return db;
}

function getExported(db: Database.Database, pageId: string) {
  return db.prepare('SELECT last_exported FROM notion_exports WHERE page_id = ?').get(pageId) as
    | { last_exported: number }
    | undefined;
}

function upsertExported(db: Database.Database, pageId: string, title: string, spItemId: string) {
  db.prepare(`
    INSERT INTO notion_exports (page_id, title, last_exported, sp_item_id)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(page_id) DO UPDATE SET
      title         = excluded.title,
      last_exported = excluded.last_exported,
      sp_item_id    = excluded.sp_item_id
  `).run(pageId, title, Date.now(), spItemId);
}

// ========================
// SharePoint: Graph API
// ========================

let tokenCache: { token: string; expiresAt: number } | null = null;

async function getToken(): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expiresAt - 60_000) return tokenCache.token;
  const res = await fetch(
    `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        scope: 'https://graph.microsoft.com/.default',
        grant_type: 'client_credentials',
      }),
    }
  );
  if (!res.ok) throw new Error(`Auth failed: ${await res.text()}`);
  const data = (await res.json()) as { access_token: string; expires_in: number };
  tokenCache = { token: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return tokenCache.token;
}

async function graphGet(pathOrUrl: string): Promise<any> {
  const token = await getToken();
  const url = pathOrUrl.startsWith('https://') ? pathOrUrl : `https://graph.microsoft.com/v1.0${pathOrUrl}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`Graph GET ${res.status}: ${await res.text()}`);
  return res.json();
}

let siteCache: { siteId: string; driveId: string } | null = null;

async function getSiteAndDrive(): Promise<{ siteId: string; driveId: string }> {
  if (siteCache) return siteCache;
  const { hostname, pathname } = new URL(SHAREPOINT_SITE_URL);
  const site = await graphGet(`/sites/${hostname}:${pathname}`);
  const drives = await graphGet(`/sites/${site.id}/drives`);
  const drive = drives.value.find(
    (d: any) => d.name.toLowerCase() === SHAREPOINT_LIBRARY.toLowerCase()
  );
  if (!drive) throw new Error(`Library "${SHAREPOINT_LIBRARY}" not found`);
  siteCache = { siteId: site.id, driveId: drive.id };
  return siteCache;
}

function encPath(p: string) {
  return p.split('/').map(encodeURIComponent).join('/');
}

async function ensureFolder(driveId: string, folderPath: string): Promise<void> {
  const parts = folderPath.split('/').filter(Boolean);
  let current = '';
  for (const part of parts) {
    const parent = current || 'root';
    const apiPath = current
      ? `/drives/${driveId}/root:/${encPath(current)}:/children`
      : `/drives/${driveId}/root/children`;
    try {
      await graphGet(`/drives/${driveId}/root:/${encPath(current ? `${current}/${part}` : part)}`);
    } catch {
      // Folder doesn't exist — create it
      const token = await getToken();
      await fetch(`https://graph.microsoft.com/v1.0${apiPath}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: part,
          folder: {},
          '@microsoft.graph.conflictBehavior': 'ignore',
        }),
      });
    }
    current = current ? `${current}/${part}` : part;
  }
}

async function uploadDocx(
  driveId: string,
  folderPath: string,
  fileName: string,
  buffer: Buffer
): Promise<string> {
  const token = await getToken();
  const filePath = `${folderPath}/${fileName}`;
  const url = `https://graph.microsoft.com/v1.0/drives/${driveId}/root:/${encPath(filePath)}:/content`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    },
    body: buffer,
  });
  if (!res.ok) throw new Error(`Upload failed (${res.status}): ${await res.text()}`);
  const data = (await res.json()) as { id: string };
  return data.id;
}

// ========================
// Notion block types (browser-side extraction result)
// ========================

interface NotionRun {
  text: string;
  bold: boolean;
  italic: boolean;
  code: boolean;
}

interface NotionBlock {
  type: 'h1' | 'h2' | 'h3' | 'p' | 'bullet' | 'numbered' | 'todo' | 'quote' | 'callout' | 'code' | 'divider' | 'toggle';
  text: string;
  runs: NotionRun[];
  depth: number;
}

// ========================
// .docx builder
// ========================

function buildDocxFromBlocks(title: string, notionUrl: string, blocks: NotionBlock[]): Promise<Buffer> {
  const children: Paragraph[] = [];

  // Title (page name)
  children.push(new Paragraph({
    text: title,
    heading: HeadingLevel.HEADING_1,
    alignment: AlignmentType.LEFT,
  }));

  // Source URL
  children.push(new Paragraph({
    children: [
      new TextRun({ text: 'Source: ', bold: true }),
      new TextRun({ text: notionUrl }),
    ],
    spacing: { after: 200 },
  }));

  let numberedCount: Record<number, number> = {};

  for (const block of blocks) {
    const indentTwip = block.depth > 0 ? convertInchesToTwip(block.depth * 0.4) : 0;

    const runs: TextRun[] = block.runs.length > 0
      ? block.runs.map((r) => new TextRun({ text: r.text, bold: r.bold, italics: r.italic, font: r.code ? 'Courier New' : undefined }))
      : [new TextRun(block.text)];

    switch (block.type) {
      case 'h1':
        children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: runs }));
        numberedCount = {};
        break;
      case 'h2':
        children.push(new Paragraph({ heading: HeadingLevel.HEADING_3, children: runs }));
        numberedCount = {};
        break;
      case 'h3':
        children.push(new Paragraph({ heading: HeadingLevel.HEADING_4, children: runs }));
        break;
      case 'bullet':
      case 'todo':
        children.push(new Paragraph({
          bullet: { level: block.depth },
          children: runs,
        }));
        break;
      case 'numbered': {
        const level = block.depth;
        numberedCount[level] = (numberedCount[level] ?? 0) + 1;
        children.push(new Paragraph({
          indent: { left: indentTwip + convertInchesToTwip(0.25) },
          children: [new TextRun(`${numberedCount[level]}. `), ...runs],
        }));
        break;
      }
      case 'quote':
        children.push(new Paragraph({
          indent: { left: convertInchesToTwip(0.5) },
          children: [new TextRun({ text: '| ', bold: true }), ...runs],
        }));
        break;
      case 'callout':
        children.push(new Paragraph({
          indent: { left: convertInchesToTwip(0.25) },
          children: [new TextRun({ text: '💡 ', }), ...runs],
        }));
        break;
      case 'code':
        children.push(new Paragraph({
          children: runs.map((r) => new TextRun({ text: r.text, font: 'Courier New' })),
        }));
        break;
      case 'divider':
        children.push(new Paragraph({ text: '─'.repeat(50) }));
        break;
      default:
        if (block.text.trim()) {
          children.push(new Paragraph({
            indent: indentTwip > 0 ? { left: indentTwip } : undefined,
            children: runs,
          }));
        } else {
          children.push(new Paragraph({ text: '' }));
        }
    }
  }

  const doc = new Document({ sections: [{ children }] });
  return Packer.toBuffer(doc) as Promise<Buffer>;
}

// Fallback: build docx from plain innerText when DOM extraction returns no blocks
function buildDocxFromText(title: string, notionUrl: string, rawText: string): Promise<Buffer> {
  const blocks: NotionBlock[] = rawText.split('\n').map((line) => ({
    type: 'p',
    text: line,
    runs: [{ text: line, bold: false, italic: false, code: false }],
    depth: 0,
  }));
  return buildDocxFromBlocks(title, notionUrl, blocks);
}

// ========================
// Main crawler
// ========================

async function exportNotion(forceReindex = false, mode: 'local' | 'sharepoint' = 'local'): Promise<void> {
  if (!NOTION_SITE_URL) throw new Error('NOTION_SITE_URL not set in .env.uat');

  const db = openDb();

  let driveId = '';
  if (mode === 'sharepoint') {
    if (!SHAREPOINT_SITE_URL || !TENANT_ID || !CLIENT_ID || !CLIENT_SECRET) {
      throw new Error('SharePoint/Azure env vars missing');
    }
    ({ driveId } = await getSiteAndDrive());
    await ensureFolder(driveId, EXPORT_FOLDER);
    console.log(`[exporter] SharePoint folder ready: ${SHAREPOINT_LIBRARY}/${EXPORT_FOLDER}`);
  } else {
    mkdirSync(LOCAL_EXPORT_DIR, { recursive: true });
    console.log(`[exporter] Local export folder ready: ${LOCAL_EXPORT_DIR}`);
  }

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  let exported = 0;
  let skipped = 0;
  let failed = 0;

  try {
    console.log('[exporter] Loading Notion database…');
    await page.goto(NOTION_SITE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(6000);

    // Helper: scroll the Notion table container (not window — Notion uses its own scroller)
    const scrollNotion = (px: number) => page.evaluate((amount: number) => {
      // Walk up from the first table row to find its scrollable ancestor
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

    while (stableScrolls < 30) {
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
        stableScrolls++;
        await scrollNotion(500);
        await page.waitForTimeout(1500);
        continue;
      }

      stableScrolls = 0;
      const { rowEl, title } = foundRow;
      processedTitles.add(title);
      totalRows++;

      // stableId matches crawler.ts logic for delta comparison
      const stableId = Buffer.from(title).toString('hex').slice(0, 32).padEnd(32, '0');

      if (!forceReindex && getExported(db, stableId)) {
        console.log(`[exporter] Skip: "${title}"`);
        skipped++;
        // Scroll slightly after each skip so Notion loads new rows into virtual list
        await scrollNotion(80);
        await page.waitForTimeout(200);
        continue;
      }

      console.log(`[exporter] [${totalRows}] Processing: "${title}"`);

      try {
        const titleCell = rowEl.locator('.notion-table-view-cell').first();
        const titleInner = titleCell.locator('div div div div').first();
        if (await titleInner.count() > 0) {
          await titleInner.hover();
        } else {
          await titleCell.hover();
        }
        await page.waitForTimeout(600);

        const openBtn = page.locator('[aria-label="Open in side peek"]').first();
        if (!await openBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
          console.log(`[exporter]   OPEN button not found — skipping`);
          skipped++;
          continue;
        }
        await openBtn.click();

        await page.waitForURL(/pm=s/, { timeout: 8000 }).catch(() => {});
        const sidePeek = page.locator('[role="region"][aria-label="Side Peek"]');
        await page.locator('[role="region"][aria-label="Side Peek"] h1')
          .waitFor({ state: 'visible', timeout: 10000 })
          .catch(() => {});
        await page.waitForTimeout(500);

        const notionUrl = page.url();

        // Extract structured blocks from Notion DOM
        const blocks: NotionBlock[] = await sidePeek.evaluate((peekEl: Element) => {
          const TYPE_MAP: [string, string][] = [
            ['notion-header-block', 'h1'],
            ['notion-sub_header-block', 'h2'],
            ['notion-sub_sub_header-block', 'h3'],
            ['notion-bulleted_list', 'bullet'],
            ['notion-numbered_list', 'numbered'],
            ['notion-to_do', 'todo'],
            ['notion-quote', 'quote'],
            ['notion-callout', 'callout'],
            ['notion-code', 'code'],
            ['notion-divider', 'divider'],
            ['notion-toggle', 'toggle'],
            ['notion-text-block', 'p'],
          ];

          function getType(el: Element): string | null {
            const cls = el.className || '';
            const tag = el.tagName?.toLowerCase() ?? '';
            if (tag === 'h1') return 'h1';
            if (tag === 'h2') return 'h2';
            if (tag === 'h3') return 'h3';
            for (const [frag, type] of TYPE_MAP) {
              if (cls.includes(frag)) return type;
            }
            return null;
          }

          function extractRuns(el: Element): any[] {
            const runs: any[] = [];
            const walk = (node: Node, bold: boolean, italic: boolean, code: boolean) => {
              if (node.nodeType === 3) {
                const text = node.textContent ?? '';
                if (text) runs.push({ text, bold, italic, code });
                return;
              }
              if (node.nodeType !== 1) return;
              const n = node as Element;
              if (getType(n) !== null) return; // skip nested notion blocks
              const tag = n.tagName?.toLowerCase() ?? '';
              const style = n.getAttribute('style') ?? '';
              const b = bold || tag === 'b' || tag === 'strong'
                || style.includes('font-weight:600') || style.includes('font-weight: 600');
              const i = italic || tag === 'i' || tag === 'em'
                || style.includes('font-style:italic') || style.includes('font-style: italic');
              const c = code || tag === 'code';
              for (const child of node.childNodes) walk(child, b, i, c);
            };
            walk(el, false, false, false);
            return runs;
          }

          const result: any[] = [];
          const seen = new WeakSet<Element>();

          function processEl(el: Element, depth: number) {
            if (seen.has(el)) return;
            const type = getType(el);

            if (type === 'divider') {
              seen.add(el);
              result.push({ type: 'divider', text: '', runs: [], depth });
              return;
            }

            if (type) {
              seen.add(el);
              const runs = extractRuns(el);
              const text = runs.map((r: any) => r.text).join('').trim().replace(/\s+/g, ' ');
              if (text) result.push({ type, text, runs, depth });
              // recurse for nested blocks (toggle content, etc.)
              for (const child of el.children) processEl(child, depth + 1);
              return;
            }

            for (const child of el.children) processEl(child, depth);
          }

          const root = peekEl.querySelector('.notion-page-content') ?? peekEl;
          for (const child of root.children) processEl(child as Element, 0);
          return result;
        }).catch(() => [] as NotionBlock[]);

        // Fallback: innerText if DOM extraction found nothing
        const hasContent = blocks.length > 0 && blocks.some((b) => b.text.trim().length > 0);
        const peekText = hasContent ? '' : await sidePeek.innerText().catch(() => '');

        if (hasContent || peekText.length > 30) {
          // Build .docx
          const docBuffer = hasContent
            ? await buildDocxFromBlocks(title, notionUrl, blocks)
            : await buildDocxFromText(title, notionUrl, peekText);

          // Safe filename: remove special chars
          const safeTitle = title.replace(/[/\\?%*:|"<>]/g, '-').slice(0, 200);
          const fileName = `${safeTitle}.docx`;

          if (mode === 'sharepoint') {
            // Upload to SharePoint
            const spItemId = await uploadDocx(driveId, EXPORT_FOLDER, fileName, docBuffer);
            upsertExported(db, stableId, title, spItemId);
            exported++;
            console.log(`[exporter]   Uploaded: "${fileName}" → SharePoint item ${spItemId}`);
          } else {
            // Save locally
            const filePath = resolve(LOCAL_EXPORT_DIR, fileName);
            writeFileSync(filePath, docBuffer);
            upsertExported(db, stableId, title, filePath);
            exported++;
            console.log(`[exporter]   Saved: "${filePath}"`);
          }
        } else {
          console.log(`[exporter]   Empty content (${blocks.length} blocks, ${peekText.length} chars) — skipped`);
          skipped++;
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
        console.warn(`[exporter] Failed "${title}":`, err instanceof Error ? err.message : err);
        await page.keyboard.press('Escape').catch(() => {});
        await page.waitForTimeout(500);
        failed++;
      }
    }

    const dest = mode === 'sharepoint' ? `SharePoint (${SHAREPOINT_LIBRARY}/${EXPORT_FOLDER})` : LOCAL_EXPORT_DIR;
    console.log(
      `[exporter] Done — exported: ${exported}, skipped: ${skipped}, failed: ${failed} (of ${processedTitles.size} unique pages)\n[exporter] Output: ${dest}`
    );
  } finally {
    await browser.close();
    db.close();
  }
}

// ========================
// CLI entry point
// ========================

const forceReindex = process.argv.includes('--force');
const modeArg = process.argv.find((a) => a.startsWith('--mode='))?.split('=')[1];
const mode = modeArg === 'sharepoint' ? 'sharepoint' : 'local';
exportNotion(forceReindex, mode).catch((err) => {
  console.error('[exporter] Fatal:', err);
  process.exit(1);
});
