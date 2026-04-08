import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { crawlReleaseNotes } from './crawler.js';
import { dbIsIndexed, dbMarkIndexed, dbSearch, openDb } from './db.js';

// ========================
// Config
// ========================

const DOCS_BASE_URL = process.env.RELEASE_NOTES_URL ?? 'https://support.joblogic.com/docs/latest-release-notes';
const MAX_OUTPUT_CHARS = 50_000;

// ========================
// DB
// ========================

const db = openDb();

// ========================
// Web fetch fallback (used when DB not yet indexed)
// ========================

const RELEASE_LINK_RE =
  /release|update|changelog|what'?s.?new|\d{4}|january|february|march|april|may|june|july|august|september|october|november|december/i;

const HTML_ENTITIES: Record<string, string> = {
  '&nbsp;': ' ', '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'",
};

interface PageCache { url: string; text: string; links: { title: string; url: string }[]; fetchedAt: number }
const pageCache = new Map<string, PageCache>();
const CACHE_TTL_MS = 60 * 60 * 1000;

function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, lvl, inner) =>
      `\n${'#'.repeat(Number(lvl))} ${inner.replace(/<[^>]+>/g, '').trim()}\n`)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?(p|div|li|tr)[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, (e) => HTML_ENTITIES[e] ?? '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function extractLinks(html: string, pageUrl: string): { title: string; url: string }[] {
  const origin = new URL(pageUrl).origin;
  const seen = new Set<string>();
  const links: { title: string; url: string }[] = [];
  const re = /<a[^>]+href=["']([^"'#]+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    let href = m[1].trim();
    const title = m[2].replace(/<[^>]+>/g, '').trim();
    if (!title || !href) continue;
    if (href.startsWith('/')) href = `${origin}${href}`;
    if (!href.includes('support.joblogic.com') || seen.has(href)) continue;
    seen.add(href);
    links.push({ title, url: href });
  }
  return links;
}

async function fetchPage(url: string): Promise<PageCache> {
  const cached = pageCache.get(url);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) return cached;
  const res = await fetch(url, { headers: { 'User-Agent': 'MCP-ReleaseNotes/1.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  const html = await res.text();
  const page: PageCache = { url, text: htmlToText(html), links: extractLinks(html, url), fetchedAt: Date.now() };
  pageCache.set(url, page);
  return page;
}

async function fetchReleasePages(): Promise<PageCache[]> {
  const main = await fetchPage(DOCS_BASE_URL);
  const releaseLinks = [...new Map(
    main.links.filter((l) => RELEASE_LINK_RE.test(l.title) || RELEASE_LINK_RE.test(l.url)).map((l) => [l.url, l])
  ).values()];
  const results = await Promise.allSettled(releaseLinks.map((l) => fetchPage(l.url)));
  const pages: PageCache[] = [main];
  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    pages.push(r.status === 'fulfilled' ? r.value
      : { url: releaseLinks[i].url, text: `[Failed to fetch]`, links: [], fetchedAt: Date.now() });
  }
  return pages;
}

// ========================
// Output helpers
// ========================

function truncate(text: string): string {
  return text.length > MAX_OUTPUT_CHARS
    ? `${text.substring(0, MAX_OUTPUT_CHARS)}\n\n[Truncated at ${MAX_OUTPUT_CHARS / 1000}KB]`
    : text;
}

function toolError(error: unknown) {
  const msg = error instanceof Error ? error.message : String(error);
  return { content: [{ type: 'text' as const, text: `Error: ${msg}` }], isError: true };
}

function formatSearchResults(rows: ReturnType<typeof dbSearch>): string {
  if (rows.length === 0) return 'No results found.';
  return rows.map((r) => {
    const meta = JSON.parse(r.metadata) as { url?: string };
    return [
      `### ${r.heading || '(no heading)'}`,
      `Source: ${meta.url ?? r.source_ref}`,
      '',
      r.content,
    ].join('\n');
  }).join('\n\n---\n\n');
}

// ========================
// MCP Server
// ========================

const server = new McpServer({ name: 'release-notes', version: '1.0.0' });

server.registerTool(
  'get_release_notes',
  {
    description: 'Search release notes by keyword (uses indexed DB when available, falls back to web). Leave keyword empty to get all indexed notes.',
    inputSchema: {
      keyword: z.string().optional().describe('Filter by keyword, version, month, or feature name'),
      url: z.string().optional().describe('Fetch a specific page URL directly from the web'),
    },
  },
  async ({ keyword, url }) => {
    try {
      // Always live-fetch if a specific URL is given
      if (url) {
        const page = await fetchPage(url);
        const text = keyword
          ? page.text.split('\n').filter((l) => l.toLowerCase().includes(keyword.toLowerCase())).join('\n')
          : page.text;
        return { content: [{ type: 'text', text: truncate(text) }] };
      }

      // Use DB if indexed
      if (dbIsIndexed(db, 'release_notes')) {
        if (keyword) {
          const rows = dbSearch(db, keyword, 'release_notes', 20);
          return { content: [{ type: 'text', text: truncate(formatSearchResults(rows)) }] };
        }
        // No keyword — return overview prompt
        const rows = dbSearch(db, 'release', 'release_notes', 5);
        return {
          content: [{
            type: 'text',
            text: `Release notes are indexed in DB. Use a keyword to search (e.g. "July 2025", "invoice", "mobile").\n\nSample entries:\n\n${formatSearchResults(rows)}`,
          }],
        };
      }

      // DB not indexed — fall back to web
      const pages = await fetchReleasePages();
      let text = pages.map((p) => `# ${p.url}\n\n${p.text}`).join('\n\n---\n\n');
      if (keyword) {
        const kw = keyword.toLowerCase();
        const lines = text.split('\n');
        const matched: string[] = [];
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].toLowerCase().includes(kw)) {
            matched.push(lines.slice(Math.max(0, i - 2), Math.min(lines.length, i + 3)).join('\n'));
          }
        }
        text = matched.length > 0 ? matched.join('\n\n---\n\n') : `No results found for "${keyword}".`;
      }
      return { content: [{ type: 'text', text: truncate(text) }] };
    } catch (error) {
      return toolError(error);
    }
  }
);

server.registerTool(
  'list_doc_pages',
  { description: 'List all available documentation and release notes page links.' },
  async () => {
    try {
      const { links } = await fetchPage(DOCS_BASE_URL);
      if (links.length === 0) return { content: [{ type: 'text', text: 'No links found.' }] };
      const list = links.map((l) => `- [${l.title}](${l.url})`).join('\n');
      return { content: [{ type: 'text', text: `# Available Pages (${links.length})\n\n${list}` }] };
    } catch (error) {
      return toolError(error);
    }
  }
);

server.registerTool(
  'refresh_index',
  { description: 'Re-crawl all JobLogic release notes pages and rebuild the search index.' },
  async () => {
    try {
      const count = await crawlReleaseNotes(db);
      dbMarkIndexed(db, 'release_notes', count);
      return { content: [{ type: 'text', text: `Index rebuilt: ${count} chunks indexed from release notes pages.` }] };
    } catch (error) {
      return toolError(error);
    }
  }
);

// ========================
// Entry point
// ========================

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
