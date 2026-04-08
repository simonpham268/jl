/**
 * Scan Regression test plans (Area Path: TMS\QC Team\Regression) in Azure DevOps,
 * collect test cases from each plan, count frequency across plans,
 * and export to CSV + Excel sorted by frequency (high → low).
 *
 * Usage:
 *   npx tsx src/utils/azured-devops/scan-regression-plans.ts              # all regression plans
 *   npx tsx src/utils/azured-devops/scan-regression-plans.ts --active     # active plans only
 *   npx tsx src/utils/azured-devops/scan-regression-plans.ts --web        # web only (exclude mobile)
 *   npx tsx src/utils/azured-devops/scan-regression-plans.ts --mobile     # mobile only (exclude web)
 *   npx tsx src/utils/azured-devops/scan-regression-plans.ts --web --active
 */

const fs = require('fs');
const path = require('path');

// ── Azure DevOps configuration (reuse from azure.ts) ────────────────────────
const CONFIG = {
  organization: 'joblogicltd',
  project: 'TMS',
  token: '9FVwEqLeB9zbpBeYMtd537ziTwFhWZXBNejWPsxhTBbI8SmyewMCJQQJ99CCACAAAAAakAp9AAASAZDO4RQy',
  cookie:
    'VstsSession=%7B%22PersistentSessionId%22%3A%223634b936-a054-44c1-9b87-c76562d0cbcb%22%2C%22PendingAuthenticationSessionId%22%3A%2200000000-0000-0000-0000-000000000000%22%2C%22CurrentAuthenticationSessionId%22%3A%2200000000-0000-0000-0000-000000000000%22%2C%22SignInState%22%3A%7B%7D%7D',
  baseUrl: 'https://dev.azure.com/joblogicltd',
  areaPath: 'TMS\\QC Team\\Regression',
};

// ── CLI flags ────────────────────────────────────────────────────────────────
const CLI_ARGS = process.argv.slice(2);
const ACTIVE_ONLY = CLI_ARGS.includes('--active');
const WEB_ONLY = CLI_ARGS.includes('--web');
const MOBILE_ONLY = CLI_ARGS.includes('--mobile');
const MAX_RETRIES = 3;
const RETRY_BASE_MS = 2000; // exponential backoff base

// ── Types ────────────────────────────────────────────────────────────────────
interface PlanInfo {
  id: number;
  name: string;
  state: string;
  areaPath: string;
}

interface TestCaseEntry {
  testCaseId: number;
  title: string;
  /** Which plan IDs contain this test case */
  planIds: number[];
  /** Corresponding plan names */
  planNames: string[];
  /** Total number of plans containing this test case */
  frequency: number;
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${CONFIG.token}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (CONFIG.cookie) {
    headers['Cookie'] = CONFIG.cookie;
  }
  return headers;
}

/** Fetch with automatic retry + exponential backoff on 429 / 5xx */
async function fetchWithRetry(url: string, options?: any, retries = MAX_RETRIES): Promise<any> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const resp = await fetch(url, { method: 'GET', headers: getHeaders(), ...options });
    if (resp.ok) return resp;

    // Rate-limited or server error → retry
    if ((resp.status === 429 || resp.status >= 500) && attempt < retries) {
      const waitMs = RETRY_BASE_MS * Math.pow(2, attempt);
      const retryAfter = resp.headers.get('Retry-After');
      const waitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : waitMs;
      console.log(`  ⏳ ${resp.status} – retrying in ${waitTime}ms (attempt ${attempt + 1}/${retries})`);
      await delay(waitTime);
      continue;
    }

    const body = await resp.text();
    throw new Error(`${resp.status} ${resp.statusText} → ${url}\n${body}`);
  }
}

async function fetchJson(url: string): Promise<any> {
  const resp = await fetchWithRetry(url);
  return resp.json();
}

/** Small delay to avoid rate-limiting */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── Step 1 – List Regression test plans (Area Path exact match) ─────────────
async function listRegressionPlans(): Promise<PlanInfo[]> {
  console.log(`=== Fetching Regression Test Plans ===`);
  console.log(`Area Path filter : ${CONFIG.areaPath}`);
  console.log(`Active only      : ${ACTIVE_ONLY}`);
  console.log(`Platform filter  : ${WEB_ONLY ? 'Web only' : MOBILE_ONLY ? 'Mobile only' : 'All'}\n`);

  // Azure DevOps paginated response: default top=200; use continuationToken
  let allPlans: any[] = [];
  let continuationToken: string | undefined;

  do {
    let url = `${CONFIG.baseUrl}/${CONFIG.project}/_apis/testplan/plans?api-version=7.1&filterActivePlans=false`;
    if (continuationToken) {
      url += `&continuationToken=${continuationToken}`;
    }
    const resp = await fetchWithRetry(url);
    const data = await resp.json();
    allPlans = allPlans.concat(data.value || []);
    continuationToken = resp.headers.get('x-ms-continuationtoken') || data.continuationToken;
  } while (continuationToken);

  console.log(`Total plans fetched: ${allPlans.length}`);

  // Filter by area path "TMS\QC Team\Regression" (exact) + optional platform filter
  let regressionPlans: PlanInfo[] = allPlans
    .filter((p: any) => {
      const area: string = p.areaPath || '';
      if (area !== CONFIG.areaPath) return false;

      const name: string = (p.name || '').toLowerCase();
      if (WEB_ONLY && name.includes('mobile')) return false;
      if (MOBILE_ONLY && !name.includes('mobile')) return false;

      return true;
    })
    .map((p: any) => ({
      id: p.id,
      name: p.name,
      state: p.state || 'Unknown',
      areaPath: p.areaPath || '',
    }));

  if (ACTIVE_ONLY) {
    regressionPlans = regressionPlans.filter((p) => p.state === 'Active');
  }

  // Sort by plan ID descending (newest first)
  regressionPlans.sort((a, b) => b.id - a.id);

  console.log(`Regression plans matched: ${regressionPlans.length}\n`);
  regressionPlans.forEach((p, i) =>
    console.log(`  ${String(i + 1).padStart(3)}. [${p.id}] ${p.name} (${p.state})`),
  );
  console.log('');

  return regressionPlans;
}

// ── Step 2 – For one plan, get all test case IDs ────────────────────────────
async function getTestCasesForPlan(
  planId: number,
  planName: string,
): Promise<Map<number, string>> {
  /** Map<testCaseId, title> */
  const testCases = new Map<number, string>();

  // 2a – list all suites in the plan
  const suitesUrl = `${CONFIG.baseUrl}/${CONFIG.project}/_apis/testplan/Plans/${planId}/suites?api-version=7.1`;
  let suitesData: any;
  try {
    suitesData = await fetchJson(suitesUrl);
  } catch (err: any) {
    console.log(`  ⚠ Could not fetch suites for plan ${planId}: ${err.message}`);
    return testCases;
  }

  const suites: any[] = suitesData.value || [];

  // 2b – for each suite, get test points (they carry the test case ref)
  for (const suite of suites) {
    const suiteId: number = suite.id;
    let contToken: string | undefined;

    do {
      let pointsUrl = `${CONFIG.baseUrl}/${CONFIG.project}/_apis/testplan/Plans/${planId}/Suites/${suiteId}/TestPoint?api-version=7.1&includePointDetails=true`;
      if (contToken) {
        pointsUrl += `&continuationToken=${contToken}`;
      }

      try {
        const resp = await fetchWithRetry(pointsUrl);
        const pointsData = await resp.json();
        const points: any[] = pointsData.value || [];

        for (const point of points) {
          const tcRef = point.testCaseReference;
          if (tcRef && tcRef.id) {
            testCases.set(tcRef.id, tcRef.name || `TC${tcRef.id}`);
          }
        }
        contToken = pointsData.continuationToken;
      } catch {
        break;
      }
    } while (contToken);

    // tiny delay between suites
    await delay(50);
  }

  console.log(`  [${planId}] "${planName}" → ${suites.length} suite(s), ${testCases.size} TC(s)`);
  return testCases;
}

// ── Step 3 – Aggregate across all plans ─────────────────────────────────────
async function aggregateTestCases(plans: PlanInfo[]): Promise<TestCaseEntry[]> {
  console.log('\n=== Collecting Test Cases from Each Plan ===\n');

  /** Map<testCaseId, TestCaseEntry> */
  const aggregated = new Map<number, TestCaseEntry>();

  for (let i = 0; i < plans.length; i++) {
    const plan = plans[i];
    console.log(`[${i + 1}/${plans.length}]`);
    const casesInPlan = await getTestCasesForPlan(plan.id, plan.name);

    for (const [tcId, title] of casesInPlan.entries()) {
      const existing = aggregated.get(tcId);
      if (existing) {
        if (!existing.planIds.includes(plan.id)) {
          existing.planIds.push(plan.id);
          existing.planNames.push(plan.name);
          existing.frequency++;
        }
      } else {
        aggregated.set(tcId, {
          testCaseId: tcId,
          title,
          planIds: [plan.id],
          planNames: [plan.name],
          frequency: 1,
        });
      }
    }

    // delay between plans to avoid rate-limits
    await delay(200);
  }

  // Sort by frequency descending, then by test case ID ascending
  const sorted = [...aggregated.values()].sort((a, b) => {
    if (b.frequency !== a.frequency) return b.frequency - a.frequency;
    return a.testCaseId - b.testCaseId;
  });

  return sorted;
}

// ── Step 4 – Export to CSV ──────────────────────────────────────────────────
function exportToCsv(entries: TestCaseEntry[], plans: PlanInfo[], outputPath: string): void {
  const headers = [
    'Test Case ID',
    'Title',
    'Frequency (Plans Count)',
    'Plan IDs',
    'Plan Names',
  ];

  const rows = entries.map((e) => [
    e.testCaseId,
    `"${e.title.replace(/"/g, '""')}"`,
    e.frequency,
    `"${e.planIds.join('; ')}"`,
    `"${e.planNames.join('; ')}"`,
  ]);

  const csvContent = [
    `# Regression Plans Scanned: ${plans.length}`,
    `# Total Unique Test Cases: ${entries.length}`,
    `# Generated: ${new Date().toISOString()}`,
    '',
    headers.join(','),
    ...rows.map((r) => r.join(',')),
  ].join('\n');

  fs.writeFileSync(outputPath, csvContent, 'utf8');
  console.log(`CSV saved → ${outputPath}`);
}

// ── Step 5 – Export to Excel (via exceljs) ──────────────────────────────────
async function exportToExcel(
  entries: TestCaseEntry[],
  plans: PlanInfo[],
  outputPath: string,
): Promise<void> {
  // Dynamic import so the script still works if exceljs is missing
  let ExcelJS: any;
  try {
    ExcelJS = require('exceljs');
  } catch {
    console.log('⚠ exceljs not installed – skipping Excel export. Run: npm i exceljs');
    return;
  }

  const workbook = new ExcelJS.Workbook();

  // ── Sheet 1: Summary (frequency table) ────────────────────────────────
  const summarySheet = workbook.addWorksheet('Test Case Frequency');

  summarySheet.columns = [
    { header: 'Test Case ID', key: 'tcId', width: 15 },
    { header: 'Title', key: 'title', width: 60 },
    { header: 'Frequency', key: 'freq', width: 12 },
    { header: 'Plan IDs', key: 'planIds', width: 30 },
    { header: 'Plan Names', key: 'planNames', width: 60 },
  ];

  // Style header row
  summarySheet.getRow(1).font = { bold: true };
  summarySheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF4472C4' },
  };
  summarySheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };

  for (const entry of entries) {
    summarySheet.addRow({
      tcId: entry.testCaseId,
      title: entry.title,
      freq: entry.frequency,
      planIds: entry.planIds.join('; '),
      planNames: entry.planNames.join('; '),
    });
  }

  // Auto-filter
  summarySheet.autoFilter = {
    from: 'A1',
    to: `E${entries.length + 1}`,
  };

  // ── Sheet 2: Plans overview ───────────────────────────────────────────
  const plansSheet = workbook.addWorksheet('Plans Overview');

  plansSheet.columns = [
    { header: 'Plan ID', key: 'planId', width: 12 },
    { header: 'Plan Name', key: 'planName', width: 50 },
    { header: 'State', key: 'state', width: 12 },
    { header: 'Test Cases Count', key: 'tcCount', width: 18 },
  ];

  plansSheet.getRow(1).font = { bold: true };
  plansSheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF4472C4' },
  };
  plansSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };

  for (const plan of plans) {
    const tcCount = entries.filter((e) => e.planIds.includes(plan.id)).length;
    plansSheet.addRow({
      planId: plan.id,
      planName: plan.name,
      state: plan.state,
      tcCount,
    });
  }

  // ── Sheet 3: Matrix (test case × plan) ───────────────────────────────
  const matrixSheet = workbook.addWorksheet('TC × Plan Matrix');

  // Build columns: TC ID | Title | Frequency | plan1 | plan2 | …
  const matrixColumns: any[] = [
    { header: 'Test Case ID', key: 'tcId', width: 15 },
    { header: 'Title', key: 'title', width: 50 },
    { header: 'Frequency', key: 'freq', width: 12 },
  ];
  for (const plan of plans) {
    matrixColumns.push({
      header: `${plan.name} (${plan.id})`,
      key: `plan_${plan.id}`,
      width: 18,
    });
  }
  matrixSheet.columns = matrixColumns;

  matrixSheet.getRow(1).font = { bold: true };
  matrixSheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF4472C4' },
  };
  matrixSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };

  for (const entry of entries) {
    const row: any = {
      tcId: entry.testCaseId,
      title: entry.title,
      freq: entry.frequency,
    };
    for (const plan of plans) {
      row[`plan_${plan.id}`] = entry.planIds.includes(plan.id) ? 'X' : '';
    }
    matrixSheet.addRow(row);
  }

  await workbook.xlsx.writeFile(outputPath);
  console.log(`Excel saved → ${outputPath}`);
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main(): Promise<void> {
  const startTime = Date.now();

  try {
    // 1 – Discover regression plans
    const plans = await listRegressionPlans();

    if (plans.length === 0) {
      console.log('No regression plans found. Exiting.');
      return;
    }

    // 2 – Aggregate test cases
    const entries = await aggregateTestCases(plans);

    console.log(`\n=== Results ===`);
    console.log(`Plans scanned : ${plans.length}`);
    console.log(`Unique TCs    : ${entries.length}`);
    if (entries.length > 0) {
      console.log(`Most frequent : TC${entries[0].testCaseId} "${entries[0].title}" → ${entries[0].frequency} plan(s)`);
    }

    // 3 – Prepare output directory
    const outputDir = path.resolve(__dirname, '../../../output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);

    // 4 – Export CSV
    const csvPath = path.join(outputDir, `regression-tc-frequency-${timestamp}.csv`);
    exportToCsv(entries, plans, csvPath);

    // 5 – Export Excel
    const xlsxPath = path.join(outputDir, `regression-tc-frequency-${timestamp}.xlsx`);
    await exportToExcel(entries, plans, xlsxPath);

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`\nDone in ${elapsed}s`);
  } catch (error: any) {
    console.error('Fatal error:', error?.message || error);
    process.exit(1);
  }
}

// Run
main();
