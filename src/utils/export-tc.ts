/// <reference types="node" />
/**
 * Export TC markdown test cases to Excel using template/Template TC.xlsx
 *
 * Usage:
 *   npx tsx src/utils/export-tc.ts TC-FILE.md
 *   npx tsx src/utils/export-tc.ts TC-FILE.md --jira=JEC-9999
 *   npx tsx src/utils/export-tc.ts TC-FILE.md --area="TMS\QC Team\JLWeb Test Cases\Jobs"
 *
 * Jira ticket is auto-detected from the markdown header (**Jira:** DD-XXXX).
 * --jira flag overrides the auto-detected value.
 */
import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';

// ─── Paths ─────────────────────────────────────────────────────────────────────

// __dirname = <root>/src/utils
const TEMPLATE_PATH = path.join(__dirname, '..', '..', 'template', 'Template TC.xlsx');
const TC_DIR = path.join(__dirname, '..', '..', 'docs');
const DEFAULT_AREA = 'TMS\\QC Team\\JLWeb Test Cases\\';

// ─── Constants ─────────────────────────────────────────────────────────────────

const HEADER_ROW = 11;
const DATA_START_ROW = 12;
const TOTAL_COLS = 10;
const SYSTEM_TAGS = new Set(['smoke', 'regression', 'edge-case']);

const FILL_YELLOW: ExcelJS.Fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF00' } };
const FILL_WHITE: ExcelJS.Fill = { type: 'pattern', pattern: 'solid', fgColor: { theme: 0 } };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FILL_BLUE: ExcelJS.Fill = { type: 'pattern', pattern: 'solid', fgColor: { theme: 9, tint: 0.79998168889431 } as any };

const FONT_BASE: Partial<ExcelJS.Font> = { size: 10, name: 'Arial' };

const BORDER_THIN: Partial<ExcelJS.Borders> = {
  top: { style: 'thin' },
  bottom: { style: 'thin' },
  left: { style: 'thin' },
  right: { style: 'thin' },
};

// ─── Interfaces ────────────────────────────────────────────────────────────────

interface TestStep {
  action: string;
  expected: string;
}

interface TestCase {
  id: string;
  title: string;
  tags: string[];
  preconditions: string[];
  steps: TestStep[];
}

interface ParsedMd {
  jiraTicket: string;
  testCases: TestCase[];
}

interface CliArgs {
  mdPath: string;
  outputPath: string;
  jiraOverride: string | undefined;
  areaOverride: string | undefined;
}

// ─── CLI ───────────────────────────────────────────────────────────────────────

function parseArgs(): CliArgs {
  const args = process.argv.slice(2);
  const mdArg = args.find(a => !a.startsWith('--'));

  if (!mdArg) {
    console.error('Usage: npx tsx src/utils/export-tc.ts TC-FILE.md [--jira=JEC-XXX] [--area="..."]');
    process.exit(1);
  }

  const mdPath = path.isAbsolute(mdArg) ? mdArg : path.join(TC_DIR, mdArg);
  const outputPath = path.join(path.dirname(mdPath), `${path.basename(mdPath, '.md')}.xlsx`);
  const jiraOverride = args.find(a => a.startsWith('--jira='))?.slice('--jira='.length);
  const areaOverride = args.find(a => a.startsWith('--area='))?.slice('--area='.length);

  return { mdPath, outputPath, jiraOverride, areaOverride };
}

// ─── Markdown parser ───────────────────────────────────────────────────────────

function parseMd(mdContent: string, jiraOverride?: string): ParsedMd {
  const jiraMatch = mdContent.match(/\*\*Jira:\*\*\s*([A-Z]+-\d+)/);
  const jiraTicket = jiraOverride ?? jiraMatch?.[1] ?? '';

  const testCases: TestCase[] = [];
  const lines = mdContent.split('\n');
  let current: TestCase | null = null;
  let inSteps = false;
  let currentStep: TestStep | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('## ID: ')) {
      if (currentStep && current) current.steps.push(currentStep);
      if (current) testCases.push(current);
      current = { id: line.replace('## ID: ', '').trim(), title: '', tags: [], preconditions: [], steps: [] };
      inSteps = false;
      currentStep = null;
      continue;
    }

    if (!current) continue;

    if (line.startsWith('## Title: ')) {
      current.title = line.replace('## Title: ', '').trim();
      continue;
    }

    if (line.startsWith('## Tags')) {
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].startsWith('- ')) current.tags.push(lines[j].replace(/^-\s+/, '').trim());
        else if (lines[j].startsWith('##')) break;
      }
      continue;
    }

    if (line.startsWith('## Preconditions')) {
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].startsWith('- ')) current.preconditions.push(lines[j].replace(/^-\s+/, '').trim());
        else if (lines[j].startsWith('##')) break;
      }
      continue;
    }

    if (line.startsWith('## Test Steps')) { inSteps = true; continue; }
    if (line.startsWith('## Expected Result')) { inSteps = false; continue; }

    if (inSteps && /^Step \d+:/.test(line)) {
      if (currentStep) current.steps.push(currentStep);
      currentStep = { action: line.replace(/^Step \d+:\s*/, '').trim(), expected: '' };
      continue;
    }

    if (inSteps && currentStep && line.trimStart().startsWith('Expected:')) {
      currentStep.expected = line.replace(/^\s*Expected:\s*/, '').trim();
    }
  }

  if (currentStep && current) current.steps.push(currentStep);
  if (current) testCases.push(current);

  return { jiraTicket, testCases };
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

/** Template priority scale: 1=Very High, 2=High, 3=Medium, 4=Low */
function getPriority(tags: string[]): number {
  if (tags.includes('smoke')) return 1;
  if (tags.includes('edge-case')) return 3;
  return 2;
}

function buildTagString(tags: string[], jiraTicket: string): string {
  const features = tags.filter(t => !SYSTEM_TAGS.has(t)).join(', ');
  return [jiraTicket, features].filter(Boolean).join(', ');
}

function styleCell(
  cell: ExcelJS.Cell,
  fill: ExcelJS.Fill,
  align: Partial<ExcelJS.Alignment> = { vertical: 'top', wrapText: true },
): void {
  cell.fill = fill;
  cell.font = { ...FONT_BASE };
  cell.border = BORDER_THIN;
  cell.alignment = align;
}

function subtotalFormula(rowNum: number): ExcelJS.CellFormulaValue {
  return { formula: `IF(C${rowNum}="","",SUBTOTAL(3,$C$12:C${rowNum}))` };
}

// ─── Row writers ───────────────────────────────────────────────────────────────

function writeTitleRow(ws: ExcelJS.Worksheet, rowNum: number, tc: TestCase, jiraTicket: string, areaPath: string): void {
  const row = ws.getRow(rowNum);

  row.getCell(1).fill = FILL_YELLOW;
  row.getCell(1).border = BORDER_THIN;
  row.getCell(1).alignment = { vertical: 'top', wrapText: true };

  row.getCell(2).value = subtotalFormula(rowNum);
  styleCell(row.getCell(2), FILL_WHITE, { horizontal: 'center', vertical: 'top' });

  row.getCell(3).value = tc.title;
  styleCell(row.getCell(3), FILL_WHITE);

  styleCell(row.getCell(4), FILL_BLUE);
  styleCell(row.getCell(5), FILL_BLUE);

  row.getCell(6).value = getPriority(tc.tags);
  styleCell(row.getCell(6), FILL_WHITE, { vertical: 'top', wrapText: true });

  row.getCell(7).value = buildTagString(tc.tags, jiraTicket);
  styleCell(row.getCell(7), FILL_WHITE);

  row.getCell(8).value = areaPath;
  styleCell(row.getCell(8), FILL_WHITE, { vertical: 'top', wrapText: true, shrinkToFit: true });
  row.getCell(8).dataValidation = {
    type: 'list',
    allowBlank: true,
    formulae: ['Data!$B$3:$B$40'],
  };

  styleCell(row.getCell(9), FILL_WHITE, { vertical: 'top' });
  row.getCell(9).dataValidation = {
    type: 'list',
    allowBlank: true,
    formulae: ['Data!$D$3:$D$7'],
  };

  styleCell(row.getCell(10), FILL_WHITE, { vertical: 'top' });
}

function writeContentRow(ws: ExcelJS.Worksheet, rowNum: number, c4Value: string, c5Value = ''): void {
  const row = ws.getRow(rowNum);

  row.getCell(1).fill = FILL_YELLOW;
  row.getCell(1).border = BORDER_THIN;

  row.getCell(2).value = subtotalFormula(rowNum);
  styleCell(row.getCell(2), FILL_WHITE, { horizontal: 'center', vertical: 'top' });

  styleCell(row.getCell(3), FILL_WHITE);

  row.getCell(4).value = c4Value;
  styleCell(row.getCell(4), FILL_WHITE);

  if (c5Value) row.getCell(5).value = c5Value;
  styleCell(row.getCell(5), FILL_WHITE);

  for (let c = 6; c <= TOTAL_COLS; c++) {
    styleCell(row.getCell(c), FILL_WHITE, { vertical: 'top' });
  }
}

// ─── Sheet writers ─────────────────────────────────────────────────────────────

function clearPriorityTable(ws: ExcelJS.Worksheet): void {
  for (let r = 2; r <= 8; r++) {
    ws.getRow(r).eachCell({ includeEmpty: true }, cell => {
      cell.value = null;
      cell.fill = { type: 'pattern', pattern: 'none' };
      cell.border = {};
      cell.font = {};
      cell.alignment = {};
    });
  }
}

function writeTcsSheet(ws: ExcelJS.Worksheet, testCases: TestCase[], jiraTicket: string, areaPath: string): void {
  clearPriorityTable(ws);
  for (let r = ws.rowCount; r > HEADER_ROW; r--) ws.spliceRows(r, 1);

  let rowNum = DATA_START_ROW;

  for (const tc of testCases) {
    writeTitleRow(ws, rowNum++, tc, jiraTicket, areaPath);

    if (tc.preconditions.length > 0) {
      const preText = 'Precondition:\n' + tc.preconditions.map((p, i) => `${i + 1}. ${p}`).join('\n');
      writeContentRow(ws, rowNum++, preText);
    }

    for (const step of tc.steps) {
      writeContentRow(ws, rowNum++, step.action, step.expected);
    }
  }

  const widths = [15, 6, 55, 55, 55, 9, 28, 42, 12, 15];
  widths.forEach((w, i) => (ws.getColumn(i + 1).width = w));
}

function writeSummarySheet(ws: ExcelJS.Worksheet, jiraTicket: string): void {
  ws.getRow(7).getCell(2).value = jiraTicket;
}

// ─── Entry point ───────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const { mdPath, outputPath, jiraOverride, areaOverride } = parseArgs();

  if (!fs.existsSync(mdPath)) {
    console.error(`File not found: ${mdPath}`);
    process.exit(1);
  }

  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(`Template not found: ${TEMPLATE_PATH}`);
    process.exit(1);
  }

  const { jiraTicket, testCases } = parseMd(fs.readFileSync(mdPath, 'utf-8'), jiraOverride);
  const areaPath = areaOverride ?? DEFAULT_AREA;

  console.log(`File   : ${path.basename(mdPath)}`);
  console.log(`Jira   : ${jiraTicket || '(no Jira ticket)'}`);
  console.log(`Area   : ${areaPath}`);
  console.log(`TCs    : ${testCases.length}`);

  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(TEMPLATE_PATH);

  const wsTCs = wb.getWorksheet('TCs');
  const wsSummary = wb.getWorksheet('Summary');

  if (!wsTCs) throw new Error('Worksheet "TCs" not found in template');

  writeTcsSheet(wsTCs, testCases, jiraTicket, areaPath);
  if (wsSummary && jiraTicket) writeSummarySheet(wsSummary, jiraTicket);

  await wb.xlsx.writeFile(outputPath);
  console.log(`\nSaved  : ${outputPath}`);
}

main().catch(console.error);
