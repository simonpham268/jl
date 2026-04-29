import Database from 'better-sqlite3';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = resolve(__dirname, 'data', 'tc.db');

// ─── DB helpers ────────────────────────────────────────────────────────────────

function openDb(): Database.Database {
  return new Database(DB_PATH);
}

function getCustomerTables(db: Database.Database): string[] {
  return (db.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").all() as { name: string }[])
    .map(r => r.name);
}

interface TcRow {
  id: number;
  title: string;
  suite_id: number;
  suite_name: string;
  tags: string;
  steps: string;
}

function formatTc(row: TcRow, customer: string): string {
  const tags: string[] = JSON.parse(row.tags || '[]');
  const steps: Array<{ action: string; expected: string }> = JSON.parse(row.steps || '[]');

  const stepsText = steps.map((s, i) => {
    let line = `Step ${i + 1}: ${s.action}`;
    if (s.expected) line += `\n   Expected: ${s.expected}`;
    return line;
  }).join('\n');

  return [
    `## [TC${row.id}] ${row.title}`,
    `Customer: ${customer} | Suite: ${row.suite_name}`,
    tags.length ? `Tags: ${tags.join(', ')}` : '',
    '',
    stepsText,
  ].filter(Boolean).join('\n');
}

// ─── MCP Server ────────────────────────────────────────────────────────────────

const server = new McpServer({ name: 'test-cases', version: '1.0.0' });

server.registerTool(
  'list_customers',
  {
    description: 'List all available customers (tables) in tc.db with their TC counts.',
  },
  async () => {
    try {
      const db = openDb();
      const tables = getCustomerTables(db);
      const rows = tables.map(t => {
        const count = (db.prepare(`SELECT COUNT(*) as c FROM "${t}"`).get() as { c: number }).c;
        return `- ${t}: ${count} TCs`;
      });
      db.close();
      return { content: [{ type: 'text' as const, text: `# Customers in tc.db\n\n${rows.join('\n')}` }] };
    } catch (err: any) {
      return { content: [{ type: 'text' as const, text: `Error: ${err.message}` }], isError: true };
    }
  }
);

server.registerTool(
  'search_test_cases',
  {
    description: 'Search test cases by keyword in title, tags, or steps. Filter by customer (table name) optionally.',
    inputSchema: {
      query: z.string().describe('Keyword to search in title, tags, or steps'),
      customer: z.string().optional().describe('Customer table name to search in (e.g. "Scutum", "Linaker"). Searches all if omitted.'),
      limit: z.number().optional().describe('Max number of results (default 10)'),
    },
  },
  async ({ query, customer, limit = 10 }) => {
    try {
      const db = openDb();
      const tables = customer ? [customer] : getCustomerTables(db);
      const kw = query.toLowerCase();
      const results: string[] = [];

      for (const table of tables) {
        if (results.length >= limit) break;
        const rows = db.prepare(`SELECT * FROM "${table}"`).all() as TcRow[];
        for (const row of rows) {
          if (results.length >= limit) break;
          const searchable = [
            row.title,
            row.tags,
            row.steps,
          ].join(' ').toLowerCase();

          if (searchable.includes(kw)) {
            results.push(formatTc(row, table));
          }
        }
      }

      db.close();

      if (results.length === 0) {
        return { content: [{ type: 'text' as const, text: `No test cases found for "${query}".` }] };
      }

      const text = `# Search: "${query}"${customer ? ` in ${customer}` : ''}\n\nFound ${results.length} result(s)\n\n---\n\n${results.join('\n\n---\n\n')}`;
      return { content: [{ type: 'text' as const, text }] };
    } catch (err: any) {
      return { content: [{ type: 'text' as const, text: `Error: ${err.message}` }], isError: true };
    }
  }
);

server.registerTool(
  'get_test_case',
  {
    description: 'Get full details of a specific test case by ID.',
    inputSchema: {
      id: z.number().describe('Test case ID (e.g. 107446)'),
      customer: z.string().optional().describe('Customer table to look in. Searches all tables if omitted.'),
    },
  },
  async ({ id, customer }) => {
    try {
      const db = openDb();
      const tables = customer ? [customer] : getCustomerTables(db);

      for (const table of tables) {
        const row = db.prepare(`SELECT * FROM "${table}" WHERE id = ?`).get(id) as TcRow | undefined;
        if (row) {
          db.close();
          return { content: [{ type: 'text' as const, text: formatTc(row, table) }] };
        }
      }

      db.close();
      return { content: [{ type: 'text' as const, text: `Test case TC${id} not found.` }] };
    } catch (err: any) {
      return { content: [{ type: 'text' as const, text: `Error: ${err.message}` }], isError: true };
    }
  }
);

// ─── Entry point ───────────────────────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
