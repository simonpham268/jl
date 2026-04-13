import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env.uat from project root
config({ path: resolve(process.cwd(), '.env.uat') });

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { crawlNotion } from './crawler.js';
import { dbIsIndexed, dbMarkIndexed, dbSearch, openDb, type FtsRow } from './db.js';

// ========================
// Config
// ========================

const MAX_OUTPUT_CHARS = 50_000;

// ========================
// DB
// ========================

const db = openDb();

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

function formatSearchResults(rows: FtsRow[]): string {
  if (rows.length === 0) return 'No results found.';
  return rows.map((r) => {
    const meta = JSON.parse(r.metadata) as {
      pageId?: string;
      title?: string;
      featureModule?: string;
      shortDesc?: string;
      notionUrl?: string;
    };
    const header = [
      `### ${r.heading || meta.title || '(no heading)'}`,
      meta.featureModule ? `Feature/Module: ${meta.featureModule}` : '',
      meta.notionUrl ? `Notion: ${meta.notionUrl}` : '',
    ].filter(Boolean).join('\n');
    return `${header}\n\n${r.content}`;
  }).join('\n\n---\n\n');
}

// ========================
// MCP Server
// ========================

const server = new McpServer({ name: 'notion-specs', version: '1.0.0' });

// Tool: List all specs (from DB)
server.registerTool(
  'list_notion_specs',
  {
    description: 'List all spec documents in the Notion database (name, feature/module, short description).',
    inputSchema: {
      cursor: z.string().optional().describe('Pagination cursor (page number as string, e.g. "2")'),
    },
  },
  async ({ cursor }) => {
    try {
      // Ensure notion_pages table exists
      db.exec(`
        CREATE TABLE IF NOT EXISTS notion_pages (
          page_id     TEXT PRIMARY KEY,
          title       TEXT NOT NULL,
          last_edited TEXT NOT NULL,
          indexed_at  INTEGER NOT NULL
        )
      `);

      const pageSize = 100;
      const offset = cursor ? (parseInt(cursor, 10) - 1) * pageSize : 0;

      const pages = db.prepare(
        'SELECT page_id, title, last_edited FROM notion_pages ORDER BY title LIMIT ? OFFSET ?'
      ).all(pageSize, offset) as { page_id: string; title: string; last_edited: string }[];

      const total = (db.prepare('SELECT COUNT(*) as cnt FROM notion_pages').get() as { cnt: number }).cnt;

      if (pages.length === 0) {
        return {
          content: [{
            type: 'text',
            text: 'No Notion specs indexed yet. Run refresh_notion_index first.',
          }],
        };
      }

      const lines = pages.map((p) => {
        // Pull first chunk metadata for this page (may have notionUrl, featureModule etc)
        const chunk = db.prepare(
          "SELECT metadata FROM chunks_fts WHERE source = 'notion' AND source_ref = ? LIMIT 1"
        ).get(p.page_id) as { metadata: string } | undefined;
        const meta = chunk ? JSON.parse(chunk.metadata) as { notionUrl?: string; featureModule?: string } : {};
        const parts = [`**${p.title}**`];
        if (meta.featureModule) parts.push(`Feature: ${meta.featureModule}`);
        parts.push(`ID: ${p.page_id}`);
        if (meta.notionUrl) parts.push(`URL: ${meta.notionUrl}`);
        return parts.join(' | ');
      });

      const currentPage = cursor ? parseInt(cursor, 10) : 1;
      const hasMore = offset + pageSize < total;
      const footer = hasMore ? `\n\n_Showing page ${currentPage}. Use cursor: "${currentPage + 1}" for next page. Total: ${total} specs._` : `\n\n_Total: ${total} specs._`;

      return {
        content: [{
          type: 'text',
          text: `Found ${pages.length} specs (page ${currentPage}):\n\n${lines.join('\n')}${footer}`,
        }],
      };
    } catch (error) { return toolError(error); }
  }
);

// Tool: Search specs (DB FTS, no API key needed)
server.registerTool(
  'search_notion_specs',
  {
    description: 'Search Notion spec documents by keyword. Uses indexed DB (fast full-text search).',
    inputSchema: {
      query: z.string().describe('Search keyword — spec name, feature, or any content keyword'),
      maxResults: z.number().optional().describe('Maximum results (default: 10)'),
    },
  },
  async ({ query, maxResults = 10 }) => {
    try {
      if (!dbIsIndexed(db, 'notion')) {
        return toolError('No Notion index found. Run refresh_notion_index first.');
      }
      const rows = dbSearch(db, query, 'notion', maxResults);
      return { content: [{ type: 'text', text: truncate(formatSearchResults(rows)) }] };
    } catch (error) { return toolError(error); }
  }
);

// Tool: Get page content by ID (from DB chunks)
server.registerTool(
  'get_notion_page',
  {
    description: 'Get full content of a Notion spec page by its page ID (from list_notion_specs or search results).',
    inputSchema: {
      pageId: z.string().describe('Notion page ID (from list_notion_specs or search results)'),
    },
  },
  async ({ pageId }) => {
    try {
      const chunks = db.prepare(
        "SELECT heading, content, metadata FROM chunks_fts WHERE source = 'notion' AND source_ref = ? ORDER BY rowid"
      ).all(pageId) as { heading: string; content: string; metadata: string }[];

      if (chunks.length === 0) {
        return toolError(`Page "${pageId}" not found in index. Run refresh_notion_index or check the ID.`);
      }

      const meta = JSON.parse(chunks[0].metadata) as { title?: string; notionUrl?: string };
      const title = meta.title ?? pageId;
      const url = meta.notionUrl ? `URL: ${meta.notionUrl}\n` : '';

      // Reassemble content from chunks, deduplicate consecutive same headings
      let lastHeading = '';
      const sections: string[] = [];
      for (const chunk of chunks) {
        if (chunk.heading && chunk.heading !== lastHeading) {
          sections.push(`\n## ${chunk.heading}\n`);
          lastHeading = chunk.heading;
        }
        sections.push(chunk.content);
      }

      const output = `# ${title}\n${url}\n${sections.join('\n')}`.trim();
      return { content: [{ type: 'text', text: truncate(output) }] };
    } catch (error) { return toolError(error); }
  }
);

// Tool: Rebuild index via Playwright crawler
server.registerTool(
  'refresh_notion_index',
  {
    description: 'Re-crawl all Notion spec pages using Playwright and rebuild the full-text search index. Supports delta sync — only re-indexes changed pages.',
    inputSchema: {
      force: z.boolean().optional().describe('Force full reindex even for unchanged pages'),
    },
  },
  async ({ force = false }) => {
    try {
      const count = await crawlNotion(db, force);
      dbMarkIndexed(db, 'notion', count);
      return {
        content: [{ type: 'text', text: `Notion index rebuilt: ${count} chunks indexed.` }],
      };
    } catch (error) { return toolError(error); }
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
