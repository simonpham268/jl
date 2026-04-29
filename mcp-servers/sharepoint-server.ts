import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env.uat from project root
config({ path: resolve(process.cwd(), '.env.uat') });

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import mammoth from 'mammoth';
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

async function graphPost(path: string, body: unknown): Promise<any> {
  const token = await getAccessToken();
  const url = path.startsWith('https://') ? path : `https://graph.microsoft.com/v1.0${path}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Graph API error (${res.status}): ${await res.text()}`);
  return res.json();
}

// MS Graph Search API — searches across ALL SharePoint sites in the tenant, no hardcoding needed.
// Returns items with composite ID format "driveId/itemId" for use with get_sharepoint_file_content.
async function graphSearch(query: string, maxResults: number): Promise<Array<{
  compositeId: string; name: string; webUrl: string; modified: string; summary: string;
}>> {
  const data = await graphPost('/search/query', {
    requests: [{ entityTypes: ['driveItem'], query: { queryString: query }, from: 0, size: maxResults, region: 'GBR' }],
  });
  const hits: any[] = data.value?.[0]?.hitsContainers?.[0]?.hits ?? [];
  return hits.map((h: any) => ({
    compositeId: `${h.resource.parentReference?.driveId}/${h.resource.id}`,
    name: h.resource.name,
    webUrl: h.resource.webUrl ?? '',
    modified: h.resource.lastModifiedDateTime ?? '',
    summary: h.summary ?? '',
  }));
}

let siteCache: { siteId: string; driveId: string } | null = null;

async function getSiteAndDrive(): Promise<{ siteId: string; driveId: string }> {
  if (siteCache) return siteCache;
  const { hostname, sitePath } = parseSiteUrl(SITE_URL);
  const site = await graphGet(`/sites/${hostname}:${sitePath}`);
  const drives = await graphGet(`/sites/${site.id}/drives`);
  const drive = drives.value.find((d: any) => d.name.toLowerCase() === LIBRARY.toLowerCase());
  if (!drive) throw new Error(`Library "${LIBRARY}" not found. Available: ${drives.value.map((d: any) => d.name).join(', ')}`);
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
  const token = await getAccessToken();
  const meta = await graphGet(`/drives/${driveId}/items/${itemId}`);
  const fileName: string = meta.name;

  const res = await fetch(
    `https://graph.microsoft.com/v1.0/drives/${driveId}/items/${itemId}/content`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) throw new Error(`Failed to download: ${res.status}`);

  let content: string;
  if (/\.docx?$/i.test(fileName)) {
    const buffer = await res.arrayBuffer();
    const { value } = await mammoth.extractRawText({ buffer: Buffer.from(buffer) });
    content = value.length > 100_000 ? `${value.substring(0, 100_000)}\n\n[Truncated at 100KB]` : value;
  } else {
    const raw = await res.text();
    content = raw.length > 100_000 ? `${raw.substring(0, 100_000)}\n\n[Truncated at 100KB]` : raw;
  }

  return { content: [{ type: 'text' as const, text: `File: ${fileName}\nURL: ${meta.webUrl}\n${'='.repeat(40)}\n\n${content}` }] };
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

// Tool: Search — DB-backed FTS when indexed, MS Graph Search API as fallback (searches entire tenant)
server.registerTool(
  'search_sharepoint_docs',
  {
    description: 'Search SharePoint documents by keyword. Uses full-text index when available (fast), falls back to Microsoft Graph Search across all SharePoint sites.',
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

      // Fallback: MS Graph Search API — searches ALL SharePoint sites in tenant, no site config needed
      const hits = await graphSearch(query, maxResults);
      if (!hits.length) {
        return { content: [{ type: 'text', text: `No documents found matching "${query}"` }] };
      }
      const results = hits.map((h) =>
        `📄 ${h.name}\n   ID: ${h.compositeId}\n   URL: ${h.webUrl}\n   Modified: ${h.modified}${h.summary ? `\n   Preview: ${h.summary}` : ''}`
      ).join('\n\n');
      return { content: [{ type: 'text', text: `Found ${hits.length} results for "${query}":\n\n${results}\n\nTip: Use the ID above with get_sharepoint_file_content to read a file. Run refresh_index to enable faster full-text search.` }] };
    } catch (error) { return toolError(error); }
  }
);

// Tool: Get file content by item ID
// Accepts either a plain itemId (uses primary configured library) or
// a composite "driveId/itemId" returned by search_sharepoint_docs.
server.registerTool(
  'get_sharepoint_file_content',
  {
    description: 'Download and return the text content of a SharePoint file. Accepts item ID from list_sharepoint_files, or composite "driveId/itemId" from search_sharepoint_docs.',
    inputSchema: {
      itemId: z.string().describe('Item ID (plain) or composite "driveId/itemId" from search results'),
    },
  },
  async ({ itemId }) => {
    try {
      if (itemId.includes('/')) {
        const slashIdx = itemId.indexOf('/');
        const driveId = itemId.slice(0, slashIdx);
        const realItemId = itemId.slice(slashIdx + 1);
        return await downloadFileContent(driveId, realItemId);
      }
      const { driveId } = await getSiteAndDrive();
      return await downloadFileContent(driveId, itemId);
    } catch (error) { return toolError(error); }
  }
);

// Tool: Get file content by path — searches entire tenant if not found in primary library
server.registerTool(
  'get_sharepoint_file_by_path',
  {
    description: 'Download and return the text content of a SharePoint file by filename or path. Searches all SharePoint sites if not found in the primary library.',
    inputSchema: {
      filePath: z.string().describe('File path relative to library root, or just a filename to search across all sites'),
    },
  },
  async ({ filePath }) => {
    try {
      // Try primary library first
      const { driveId } = await getSiteAndDrive();
      const meta = await graphGet(`/drives/${driveId}/root:/${encodeFolderPath(filePath)}`);
      return await downloadFileContent(driveId, meta.id);
    } catch {
      // Not in primary library — use MS Graph Search to find it anywhere in the tenant
      try {
        const fileName = filePath.split('/').pop() ?? filePath;
        const hits = await graphSearch(`filename:"${fileName}"`, 5);
        if (!hits.length) return toolError(new Error(`File "${filePath}" not found in any SharePoint site.`));
        const [first] = hits;
        const slashIdx = first.compositeId.indexOf('/');
        const driveId = first.compositeId.slice(0, slashIdx);
        const itemId = first.compositeId.slice(slashIdx + 1);
        return await downloadFileContent(driveId, itemId);
      } catch (error) { return toolError(error); }
    }
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
