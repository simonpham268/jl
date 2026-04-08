import Database from 'better-sqlite3';
import { mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const DB_PATH = process.env.INDEX_DB_PATH ?? resolve(__dirname, 'data', 'index.db');

export function openDb(): Database.Database {
  mkdirSync(dirname(DB_PATH), { recursive: true });
  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.exec(`
    CREATE TABLE IF NOT EXISTS index_meta (
      source      TEXT PRIMARY KEY,
      indexed_at  INTEGER NOT NULL,
      chunk_count INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS sp_docs (
      item_id     TEXT PRIMARY KEY,
      file_path   TEXT NOT NULL,
      file_name   TEXT NOT NULL,
      modified_at TEXT NOT NULL,
      indexed_at  INTEGER NOT NULL
    );

    CREATE VIRTUAL TABLE IF NOT EXISTS chunks_fts USING fts5(
      heading,
      content,
      source     UNINDEXED,
      source_ref UNINDEXED,
      metadata   UNINDEXED
    );
  `);
  return db;
}

// ========================
// Types
// ========================

export interface FtsRow {
  heading: string;
  content: string;
  source: string;
  source_ref: string;
  metadata: string;
}

export interface ChunkInput {
  heading: string;
  content: string;
  source: string;
  source_ref: string;
  metadata: object;
}

// ========================
// Query helpers
// ========================

export function dbSearch(db: Database.Database, query: string, source?: string, limit = 20): FtsRow[] {
  // Escape special FTS5 characters
  const safe = query.replace(/["*^]/g, ' ').trim();
  if (!safe) return [];
  try {
    if (source) {
      return db.prepare(
        `SELECT heading, content, source, source_ref, metadata
         FROM chunks_fts WHERE chunks_fts MATCH ? AND source = ?
         ORDER BY rank LIMIT ?`
      ).all(safe, source, limit) as FtsRow[];
    }
    return db.prepare(
      `SELECT heading, content, source, source_ref, metadata
       FROM chunks_fts WHERE chunks_fts MATCH ?
       ORDER BY rank LIMIT ?`
    ).all(safe, limit) as FtsRow[];
  } catch {
    return [];
  }
}

export function dbIsIndexed(db: Database.Database, source: string): boolean {
  const row = db.prepare('SELECT chunk_count FROM index_meta WHERE source = ?').get(source) as { chunk_count: number } | undefined;
  return !!row && row.chunk_count > 0;
}

export function dbMarkIndexed(db: Database.Database, source: string, chunkCount: number): void {
  db.prepare(`
    INSERT INTO index_meta (source, indexed_at, chunk_count) VALUES (?, ?, ?)
    ON CONFLICT(source) DO UPDATE SET indexed_at = excluded.indexed_at, chunk_count = excluded.chunk_count
  `).run(source, Date.now(), chunkCount);
}

export function dbClearSource(db: Database.Database, source: string): void {
  db.prepare('DELETE FROM chunks_fts WHERE source = ?').run(source);
  db.prepare('DELETE FROM index_meta WHERE source = ?').run(source);
  if (source === 'sharepoint') db.prepare('DELETE FROM sp_docs').run();
}

export function dbClearSourceRef(db: Database.Database, source: string, sourceRef: string): void {
  db.prepare('DELETE FROM chunks_fts WHERE source = ? AND source_ref = ?').run(source, sourceRef);
}

export function dbInsertChunks(db: Database.Database, chunks: ChunkInput[]): void {
  if (chunks.length === 0) return;
  const stmt = db.prepare(
    'INSERT INTO chunks_fts (heading, content, source, source_ref, metadata) VALUES (?, ?, ?, ?, ?)'
  );
  db.transaction(() => {
    for (const c of chunks) {
      stmt.run(c.heading, c.content, c.source, c.source_ref, JSON.stringify(c.metadata));
    }
  })();
}

// ========================
// SharePoint delta sync
// ========================

export function dbGetSpDoc(db: Database.Database, itemId: string): { modified_at: string } | null {
  return db.prepare('SELECT modified_at FROM sp_docs WHERE item_id = ?').get(itemId) as { modified_at: string } | null;
}

export function dbUpsertSpDoc(
  db: Database.Database,
  itemId: string,
  filePath: string,
  fileName: string,
  modifiedAt: string,
): void {
  db.prepare(`
    INSERT INTO sp_docs (item_id, file_path, file_name, modified_at, indexed_at)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(item_id) DO UPDATE SET
      file_path   = excluded.file_path,
      file_name   = excluded.file_name,
      modified_at = excluded.modified_at,
      indexed_at  = excluded.indexed_at
  `).run(itemId, filePath, fileName, modifiedAt, Date.now());
}
