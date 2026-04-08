import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env.uat from project root
config({ path: resolve(process.cwd(), '.env.uat') });

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { crawlSharePoint } from './crawler.js';
import { dbIsIndexed, dbMarkIndexed, dbSearch, openDb, type FtsRow } from './db.js';

// ========================
// Config
// ========================

const SITE_URL = process.env.SHAREPOINT_SITE_URL ?? '';
const LIBRARY = process.env.SHAREPOINT_LIBRARY ?? '';
const TENANT_ID = process.env.AZURE_TENANT_ID ?? '';
const CLIENT_ID = process.env.AZURE_CLIENT_ID ?? '';
const CLIENT_SECRET = process.env.AZURE_CLIENT_SECRET ?? '';

function parseSiteUrl(url: string): { hostname: string; sitePath: string } {
  const { hostname, pathname } = new URL(url);
  return { hostname, sitePath: pathname };
}

// ========================
// DB
// ========================

const db = openDb();

// ========================
// Auth: Azure AD Client Credentials
// ========================

let tokenCache: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
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
  if (!res.ok) throw new Error(`Auth failed (${res.status}): ${await res.text()}`);
  const data = await res.json() as { access_token: string; expires_in: number };
  tokenCache = { token: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return tokenCache.token;
}

// ========================
// Graph API helpers
// ========================

async function graphGet(pathOrUrl: string): Promise<any> {
  const token = await getAccessToken();
  const url = pathOrUrl.startsWith('https://') ? pathOrUrl : `https://graph.microsoft.com/v1.0${pathOrUrl}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`Graph API error (${res.status}): ${await res.text()}`);
  return res.json();
}

let siteCache: { siteId: string; driveId: string } | null = null;

async function getSiteAndDrive(): Promise<{ siteId: string; driveId: string }> {
  if (siteCache) return siteCache;
  const { hostname, sitePath } = parseSiteUrl(SITE_URL);
  const site = await graphGet(`/sites/${hostname}:${sitePath}`);
  const drives = await graphGet(`/sites/${site.id}/drives`);
  const drive = drives.value.find((d: any) => d.name.toLowerCase() === LIBRARY.toLowerCase());
  if (!drive) {
    throw new Error(`Library "${LIBRARY}" not found. Available: ${drives.value.map((d: any) => d.name).join(', ')}`);
  }
  siteCache = { siteId: site.id, driveId: drive.id };
  return siteCache;
}

function encodeFolderPath(p: string): string {
  return p.split('/').map(encodeURIComponent).join('/');
}

async function graphGetAll(initialPath: string): Promise<any[]> {
  const items: any[] = [];
  let next: string | undefined = initialPath;
  while (next) {
    const data = await graphGet(next);
    items.push(...(data.value ?? []));
    next = data['@odata.nextLink'];
  }
  return items;
}

// ========================
// Output helpers
// ========================

function toolError(error: unknown) {
  const msg = error instanceof Error ? error.message : String(error);
  return { content: [{ type: 'text' as const, text: `Error: ${msg}` }], isError: true };
}

function formatSearchResults(rows: FtsRow[]): string {
  if (rows.length === 0) return 'No results found.';
  return rows.map((r) => {
    const meta = JSON.parse(r.metadata) as { fileName?: string; filePath?: string; webUrl?: string; fileType?: string };
    return [
      `### ${r.heading || meta.fileName || '(no heading)'}`,
      `File: ${meta.filePath ?? r.source_ref}${meta.webUrl ? ` | [Open](${meta.webUrl})` : ''}`,
      '',
      r.content,
    ].join('\n');
  }).join('\n\n---\n\n');
}

// ========================
// Shared download logic
// ========================

async function downloadFileContent(driveId: string, itemId: string) {
  const meta = await graphGet(`/drives/${driveId}/items/${itemId}`);
  const fileName: string = meta.name;
  const isOfficeDoc = /\.(docx?|xlsx?|pptx?)$/i.test(fileName);

  let content: string;
  if (isOfficeDoc) {
    content = [
      `[Office document: ${fileName}]`,
      `Size: ${((meta.size ?? 0) / 1024).toFixed(1)}KB`,
      `Modified: ${meta.lastModifiedDateTime}`,
      `Web URL: ${meta.webUrl}`,
      '',
      'To read this document, open via the URL above, or run refresh_index to index it into the DB.',
    ].join('\n');
  } else {
    const token = await getAccessToken();
    const res = await fetch(
      `https://graph.microsoft.com/v1.0/drives/${driveId}/items/${itemId}/content`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!res.ok) throw new Error(`Failed to download: ${res.status}`);
    const raw = await res.text();
    content = raw.length > 100_000 ? `${raw.substring(0, 100_000)}\n\n[Truncated at 100KB]` : raw;
  }

  return { content: [{ type: 'text' as const, text: `File: ${fileName}\n${'='.repeat(40)}\n\n${content}` }] };
}

// ========================
// MCP Server
// ========================

const server = new McpServer({ name: 'sharepoint-docs', version: '1.0.0' });

// Tool: List files
server.registerTool(
  'list_sharepoint_files',
  {
    description: 'List files and folders in the SharePoint document library.',
    inputSchema: {
      folderPath: z.string().optional().describe('Relative folder path (e.g. "Release Notes/2025") or empty for root'),
      fileType: z.string().optional().describe('Filter by extension (e.g. ".docx", ".pdf")'),
    },
  },
  async ({ folderPath, fileType }) => {
    try {
      const { driveId } = await getSiteAndDrive();
      const apiPath = folderPath
        ? `/drives/${driveId}/root:/${encodeFolderPath(folderPath)}:/children`
        : `/drives/${driveId}/root/children`;
      let items = (await graphGetAll(apiPath)).map((item: any) => ({
        name: item.name, type: item.folder ? 'folder' : 'file',
        id: item.id, size: item.size ?? 0,
        modified: item.lastModifiedDateTime, webUrl: item.webUrl,
      }));
      if (fileType) items = items.filter((i) => i.type === 'folder' || i.name.endsWith(fileType));
      const listing = items.map((i) =>
        i.type === 'folder'
          ? `📁 ${i.name}/ (id: ${i.id})`
          : `📄 ${i.name} (${(i.size / 1024).toFixed(1)}KB, modified: ${i.modified}, id: ${i.id})`
      ).join('\n');
      return {
        content: [{
          type: 'text',
          text: items.length > 0
            ? `Found ${items.length} items in "${folderPath ?? 'root'}":\n\n${listing}`
            : `No items found in "${folderPath ?? 'root'}"`,
        }],
      };
    } catch (error) { return toolError(error); }
  }
);

// Tool: Search — DB-backed FTS when indexed, Graph API search as fallback
server.registerTool(
  'search_sharepoint_docs',
  {
    description: 'Search SharePoint documents by keyword. Uses full-text index when available (fast), falls back to Graph API search.',
    inputSchema: {
      query: z.string().describe('Search keyword (file name, content, or metadata)'),
      maxResults: z.number().optional().describe('Maximum results (default: 10)'),
    },
  },
  async ({ query, maxResults = 10 }) => {
    try {
      // DB-backed FTS search
      if (dbIsIndexed(db, 'sharepoint')) {
        const rows = dbSearch(db, query, 'sharepoint', maxResults);
        return { content: [{ type: 'text', text: formatSearchResults(rows) }] };
      }

      // Fallback: Graph API search
      const { driveId } = await getSiteAndDrive();
      const data = await graphGet(
        `/drives/${driveId}/root/search(q='${encodeURIComponent(query)}')?$top=${maxResults}`
      );
      if (!data.value?.length) {
        return { content: [{ type: 'text', text: `No documents found matching "${query}"` }] };
      }
      const results = data.value.map((item: any) =>
        `📄 ${item.name}\n   ID: ${item.id}\n   URL: ${item.webUrl}\n   Modified: ${item.lastModifiedDateTime}`
      ).join('\n\n');
      return { content: [{ type: 'text', text: `Found ${data.value.length} results for "${query}":\n\n${results}\n\nTip: Run refresh_index to enable faster full-text search.` }] };
    } catch (error) { return toolError(error); }
  }
);

// Tool: Get file content by item ID
server.registerTool(
  'get_sharepoint_file_content',
  {
    description: 'Download and return the text content of a SharePoint file by item ID.',
    inputSchema: {
      itemId: z.string().describe('Item ID from list_sharepoint_files or search results'),
    },
  },
  async ({ itemId }) => {
    try {
      const { driveId } = await getSiteAndDrive();
      return await downloadFileContent(driveId, itemId);
    } catch (error) { return toolError(error); }
  }
);

// Tool: Get file content by path
server.registerTool(
  'get_sharepoint_file_by_path',
  {
    description: 'Download and return the text content of a SharePoint file by its path (e.g. "Release Notes/2025/July.docx").',
    inputSchema: {
      filePath: z.string().describe('File path relative to library root'),
    },
  },
  async ({ filePath }) => {
    try {
      const { driveId } = await getSiteAndDrive();
      const meta = await graphGet(`/drives/${driveId}/root:/${encodeFolderPath(filePath)}`);
      return await downloadFileContent(driveId, meta.id);
    } catch (error) { return toolError(error); }
  }
);

// Tool: Rebuild index
server.registerTool(
  'refresh_index',
  { description: 'Re-crawl all SharePoint documents and rebuild the full-text search index. Supports delta sync — only re-indexes changed files.' },
  async () => {
    try {
      const count = await crawlSharePoint(db);
      dbMarkIndexed(db, 'sharepoint', count);
      return { content: [{ type: 'text', text: `Index rebuilt: ${count} chunks indexed from SharePoint documents.` }] };
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
