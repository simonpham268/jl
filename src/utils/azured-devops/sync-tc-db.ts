/**
 * Sync test cases from Azure DevOps suite → SQLite DB
 *
 * Usage:
 *   npx tsx src/utils/azured-devops/sync-tc-db.ts --plan=3198 --suite=63434 --customer=axa
 *
 * What it does:
 *   1. Fetches all child suites under the given parent suite
 *   2. For each child suite, fetches all test case IDs
 *   3. Fetches full work item details (title, steps, tags) for each TC
 *   4. Upserts into SQLite table named after --customer (e.g. "axa")
 */

import Database from 'better-sqlite3';
import fetch from 'node-fetch';
import path from 'path';
import fs from 'fs';

// ─── Config ────────────────────────────────────────────────────────────────────

const CONFIG = {
  organization: 'joblogicltd',
  project: 'TMS',
  token: '9FVwEqLeB9zbpBeYMtd537ziTwFhWZXBNejWPsxhTBbI8SmyewMCJQQJ99CCACAAAAAakAp9AAASAZDO4RQy',
  baseUrl: 'https://dev.azure.com/joblogicltd',
};

const DB_PATH = path.join(__dirname, '../../../mcp-servers/data/tc.db');

// ─── CLI args ──────────────────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const get = (key: string) => args.find(a => a.startsWith(`--${key}=`))?.split('=')[1];

  const plan = Number(get('plan'));
  const suite = Number(get('suite'));
  const index = Number(get('index') ?? '1') || 1;
  const prefix = get('prefix') ?? '';
  const tableName = get('table') ?? ''; // --table=Tracker: sync suite directly into one named table

  if (!plan || !suite) {
    console.error('Usage: npx tsx sync-tc-db.ts --plan=3198 --suite=60480 [--index=1] [--prefix=CP] [--table=Tracker]');
    console.error('  --index=1 (default): direct children of suite → table names');
    console.error('  --index=2: grandchildren → table names');
    console.error('  --prefix=CP: prefix table names to avoid conflicts (e.g. "CP - Login")');
    console.error('  --table=Tracker: sync all TCs from suite directly into one named table');
    process.exit(1);
  }

  return { plan, suite, index, prefix, tableName };
}

// ─── Azure DevOps helpers ──────────────────────────────────────────────────────

function headers() {
  return {
    Authorization: `Bearer ${CONFIG.token}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
}

// Returns suites at a given depth under suiteId.
// depth=1 → direct children (current behavior)
// depth=2 → grandchildren (children of children), etc.
async function getSuitesAtDepth(planId: number, suiteId: number, depth: number): Promise<Array<{ id: number; name: string; hasChildren: boolean }>> {
  const children = await getChildSuites(planId, suiteId);
  if (depth <= 1) return children;

  const result: Array<{ id: number; name: string; hasChildren: boolean }> = [];
  for (const child of children) {
    const deeper = await getSuitesAtDepth(planId, child.id, depth - 1);
    result.push(...deeper);
  }
  return result;
}

// Get direct children of a suite using expand=children
async function getChildSuites(planId: number, suiteId: number): Promise<Array<{ id: number; name: string; hasChildren: boolean }>> {
  const url = `${CONFIG.baseUrl}/${CONFIG.project}/_apis/testplan/Plans/${planId}/suites/${suiteId}?expand=children&api-version=7.1`;
  const res = await fetch(url, { headers: headers() });
  if (!res.ok) throw new Error(`Failed to get suite ${suiteId}: ${res.status} ${res.statusText}`);

  const data: any = await res.json();
  return (data.children ?? []).map((s: any) => ({ id: s.id, name: s.name, hasChildren: s.hasChildren ?? false }));
}

// Recursively collect all TCs from leaf suites
async function collectAllTCs(planId: number, suiteId: number): Promise<Array<{ id: number; title: string }>> {
  const children = await getChildSuites(planId, suiteId);

  if (children.length === 0) {
    return getTestCasesInSuite(planId, suiteId);
  }

  const results: Array<{ id: number; title: string }> = [];
  for (const child of children) {
    const tcs = await collectAllTCs(planId, child.id);
    results.push(...tcs);
  }
  return results;
}

async function getTestCasesInSuite(planId: number, suiteId: number): Promise<Array<{ id: number; title: string }>> {
  const url = `${CONFIG.baseUrl}/${CONFIG.project}/_apis/testplan/Plans/${planId}/Suites/${suiteId}/TestCase?api-version=7.1`;
  const res = await fetch(url, { headers: headers() });
  if (!res.ok) {
    console.warn(`  Warning: could not fetch TCs for suite ${suiteId}: ${res.status}`);
    return [];
  }

  const data: any = await res.json();
  return (data.value ?? []).map((tc: any) => ({
    id: Number(tc.testCase?.id ?? tc.workItem?.id),
    title: tc.testCase?.name ?? tc.workItem?.name ?? '',
  }));
}

async function getWorkItemDetails(id: number): Promise<{ title: string; tags: string[]; steps: Array<{ action: string; expected: string }> }> {
  const url = `${CONFIG.baseUrl}/${CONFIG.project}/_apis/wit/workitems/${id}?api-version=7.1`;
  const res = await fetch(url, { headers: headers() });
  if (!res.ok) throw new Error(`Failed to fetch workitem ${id}: ${res.status}`);

  const wi: any = await res.json();
  const title: string = wi.fields['System.Title'] ?? '';
  const tagsRaw: string = wi.fields['System.Tags'] ?? '';
  const tags = tagsRaw.split(';').map((t: string) => t.trim()).filter(Boolean);
  const stepsXml: string = wi.fields['Microsoft.VSTS.TCM.Steps'] ?? '';
  const steps = parseStepsXml(stepsXml);

  return { title, tags, steps };
}

// ─── XML / HTML parsing (adapted from azure.ts) ────────────────────────────────

function decodeHtml(s: string): string {
  return s
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
}

function stripHtml(html: string): string {
  return decodeHtml(html)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ').trim();
}

function parseStepsXml(xml: string): Array<{ action: string; expected: string }> {
  if (!xml) return [];
  const steps: Array<{ action: string; expected: string }> = [];
  const stepRe = /<step[^>]*>(.*?)<\/step>/gs;
  const paramRe = /<parameterizedString[^>]*>(.*?)<\/parameterizedString>/g;

  let m;
  while ((m = stepRe.exec(xml)) !== null) {
    const params = [...m[1].matchAll(paramRe)];
    const action = params[0] ? stripHtml(params[0][1]) : '';
    const expected = params[1] ? stripHtml(params[1][1]) : '';
    if (action) steps.push({ action, expected });
  }
  return steps;
}

// ─── SQLite helpers ────────────────────────────────────────────────────────────

function openDb(): Database.Database {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return new Database(DB_PATH);
}

function ensureTable(db: Database.Database, table: string) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS "${table}" (
      id          INTEGER PRIMARY KEY,
      title       TEXT NOT NULL,
      suite_id    INTEGER,
      suite_name  TEXT,
      tags        TEXT,
      steps       TEXT,
      synced_at   TEXT DEFAULT (datetime('now'))
    )
  `);
}

function upsert(db: Database.Database, table: string, row: {
  id: number; title: string; suite_id: number; suite_name: string;
  tags: string[]; steps: Array<{ action: string; expected: string }>;
}) {
  const stmt = db.prepare(`
    INSERT INTO "${table}" (id, title, suite_id, suite_name, tags, steps, synced_at)
    VALUES (@id, @title, @suite_id, @suite_name, @tags, @steps, datetime('now'))
    ON CONFLICT(id) DO UPDATE SET
      title      = excluded.title,
      suite_id   = excluded.suite_id,
      suite_name = excluded.suite_name,
      tags       = excluded.tags,
      steps      = excluded.steps,
      synced_at  = excluded.synced_at
  `);

  stmt.run({
    id: row.id,
    title: row.title,
    suite_id: row.suite_id,
    suite_name: row.suite_name,
    tags: JSON.stringify(row.tags),
    steps: JSON.stringify(row.steps),
  });
}

// ─── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const { plan, suite: parentSuiteId, index, prefix, tableName: directTable } = parseArgs();

  console.log(`\n=== Syncing Azure DevOps TCs → SQLite ===`);
  console.log(`Plan: ${plan} | Parent Suite: ${parentSuiteId}${directTable ? ` | Table: "${directTable}"` : ` | Index (depth): ${index}`}${prefix ? ` | Prefix: "${prefix}"` : ''}\n`);

  const db = openDb();
  let total = 0;
  let errors = 0;

  // --table mode: sync all TCs from the suite directly into one named table
  if (directTable) {
    ensureTable(db, directTable);
    console.log(`Direct sync → table: "${directTable}" (suite: ${parentSuiteId})`);
    const tcs = await collectAllTCs(plan, parentSuiteId);
    console.log(`  → ${tcs.length} test cases`);

    for (const tc of tcs) {
      try {
        const details = await getWorkItemDetails(tc.id);
        upsert(db, directTable, {
          id: tc.id,
          title: details.title || tc.title,
          suite_id: parentSuiteId,
          suite_name: directTable,
          tags: details.tags,
          steps: details.steps,
        });
        process.stdout.write('.');
        total++;
      } catch (err: any) {
        process.stdout.write('x');
        errors++;
        console.error(`\n  Error TC${tc.id}: ${err.message}`);
      }
      await new Promise(r => setTimeout(r, 100));
    }
    console.log();
    db.close();
    console.log(`\n=== Done ===`);
    console.log(`Saved : ${total} TCs into "${directTable}" in ${DB_PATH}`);
    if (errors) console.log(`Errors: ${errors}`);
    return;
  }

  // Default mode: child suites at depth → each becomes a table
  console.log(`Fetching suites at depth ${index} under suite ${parentSuiteId}...`);
  const childSuites = await getSuitesAtDepth(plan, parentSuiteId, index);
  console.log(`Found ${childSuites.length} suites at depth ${index}\n`);

  for (const childSuite of childSuites) {
    const tableName = prefix ? `${prefix} - ${childSuite.name}` : childSuite.name;
    ensureTable(db, tableName);

    console.log(`Suite → table: "${tableName}" (${childSuite.id})`);
    const tcs = await collectAllTCs(plan, childSuite.id);
    console.log(`  → ${tcs.length} test cases`);

    for (const tc of tcs) {
      try {
        const details = await getWorkItemDetails(tc.id);
        upsert(db, tableName, {
          id: tc.id,
          title: details.title || tc.title,
          suite_id: childSuite.id,
          suite_name: childSuite.name,
          tags: details.tags,
          steps: details.steps,
        });
        process.stdout.write('.');
        total++;
      } catch (err: any) {
        process.stdout.write('x');
        errors++;
        console.error(`\n  Error TC${tc.id}: ${err.message}`);
      }
      await new Promise(r => setTimeout(r, 100));
    }
    console.log();
  }

  db.close();
  console.log(`\n=== Done ===`);
  console.log(`Saved : ${total} TCs across ${childSuites.length} tables in ${DB_PATH}`);
  if (errors) console.log(`Errors: ${errors}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
