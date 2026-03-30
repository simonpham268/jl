#!/usr/bin/env npx tsx
/**
 * Shortcut CLI for importing test cases to suite with filters
 *
 * Usage with named parameters (recommended for manual testers):
 *   npm run import-suite -- planId=107558 suiteId=107559 tags=["auto","regression"] priorities=[1,2] excludePaths=["TMS\\QC Team\\Bin"]
 *
 * Or with positional arguments:
 *   npx tsx src/utils/jira/import-suite-filtered.ts 107558 107559 '["auto"]' '[1,2]' '["TMS\\QC Team\\Bin"]'
 */

import { importTestCasesToSuiteWithFilters } from './jira.azure.integration';

const args = process.argv.slice(2);

// Merge arguments that were split by spaces (e.g., excludePaths=[TMS\QC Team\Bin] -> 3 args)
function mergeArgs(rawArgs: string[]): string[] {
  const merged: string[] = [];
  let currentArg = '';
  let bracketCount = 0;

  for (const arg of rawArgs) {
    // Count brackets
    const openBrackets = (arg.match(/\[/g) || []).length;
    const closeBrackets = (arg.match(/\]/g) || []).length;

    if (bracketCount === 0 && openBrackets === 0) {
      // Normal argument without brackets
      merged.push(arg);
    } else if (bracketCount === 0 && openBrackets > 0) {
      // Start of a bracketed argument
      currentArg = arg;
      bracketCount = openBrackets - closeBrackets;
      if (bracketCount <= 0) {
        // Bracket closed in same argument
        merged.push(currentArg);
        currentArg = '';
        bracketCount = 0;
      }
    } else {
      // Continuation of a bracketed argument (spaces caused split)
      currentArg += ' ' + arg;
      bracketCount += openBrackets - closeBrackets;
      if (bracketCount <= 0) {
        // Bracket closed
        merged.push(currentArg);
        currentArg = '';
        bracketCount = 0;
      }
    }
  }

  // Handle unclosed bracket
  if (currentArg) {
    merged.push(currentArg);
  }  return merged;
}

const mergedArgs = mergeArgs(args);

// Parse named parameters (key=value format)
function parseNamedArgs(args: string[]): Record<string, string> {
  const parsed: Record<string, string> = {};

  for (const arg of args) {
    const match = arg.match(/^(\w+)=(.*)$/);

    if (match) {
      parsed[match[1].toLowerCase()] = match[2];
    }
  }
  return parsed;
}

/**
 * Parse array value - handles both JSON format and simple format
 * Examples:
 *   '["auto","regression"]' -> ["auto", "regression"]
 *   '[auto,regression]' -> ["auto", "regression"]
 *   'auto,regression' -> ["auto", "regression"]
 */
function parseArrayValue(value: string): string[] {
  if (!value || value === '[]') return [];

  // Try JSON parse first
  try {
    const parsed = JSON.parse(value);

    if (Array.isArray(parsed)) return parsed.map(String);
  } catch {
    // Continue to fallback parsing
  }

  // Remove brackets if present
  let cleaned = value.trim();

  if (cleaned.startsWith('[') && cleaned.endsWith(']')) {
    cleaned = cleaned.slice(1, -1);
  }

  // Split by comma and clean up each item
  if (!cleaned) return [];
  return cleaned.split(',').map(item => item.trim().replace(/^['"]|['"]$/g, ''));
}

/**
 * Parse number array - handles both JSON and simple format
 */
function parseNumberArray(value: string): number[] {
  const strings = parseArrayValue(value);

  return strings.map(s => Number(s)).filter(n => !isNaN(n));
}

// Check if using named parameters
const hasNamedParams = mergedArgs.some(arg => arg.includes('='));

const showHelp = () => {
  console.log(`
================================================================================
                    IMPORT TEST CASES TO SUITE WITH FILTERS                   
================================================================================

Usage:
  npm run import-suite -- planId=<id> suiteId=<id> tags=[...] priorities=[...] excludePaths=[...] excludeAuto=[...]

Parameters:
  planId         Azure DevOps Test Plan ID
  suiteId        Azure DevOps Test Suite ID  
  tags           Array of tags to include (no quotes needed)
                 Example: tags=[auto,regression]
  priorities     Array of priorities (1-4)
                 Example: priorities=[1,2]
  excludePaths   Array of area paths to EXCLUDE
                 Example: excludePaths=[TMS\\QC Team\\Bin]
  excludeAuto    (Optional) Array of automation statuses to EXCLUDE
                 Values: "Automated", "Not Automated", "Planned"
                 Example: excludeAuto=[Automated]

Examples:
  Import test cases with tags "auto" OR "regression", priority 1 or 2:
  npm run import-suite -- planId=107558 suiteId=107559 tags=[auto,regression] priorities=[1,2] excludePaths=[]

  Import all except "Automated" test cases:
  npm run import-suite -- planId=107558 suiteId=107559 tags=[regression] priorities=[1] excludePaths=[] excludeAuto=[Automated]

  Exclude "Automated" AND "Planned" test cases (only import "Not Automated"):
  npm run import-suite -- planId=107558 suiteId=107559 tags=[smoke] priorities=[] excludePaths=[] excludeAuto=[Automated,Planned]

  Exclude test cases under "TMS\\QC Team\\Bin":
  npm run import-suite -- planId=107558 suiteId=107559 tags=[smoke] priorities=[] excludePaths=[TMS\\QC Team\\Bin]
`);
  process.exit(1);
};

if (mergedArgs.length === 0 || mergedArgs[0] === '--help' || mergedArgs[0] === '-h') {
  showHelp();
}

let planId: number;
let suiteId: number;
let tags: string[];
let priorities: number[];
let excludeAreaPaths: string[];
let excludeAutoStatuses: string[];

try {
  if (hasNamedParams) {
    // Parse named parameters
    const params = parseNamedArgs(mergedArgs);

    if (!params.planid || !params.suiteid || !params.tags) {
      console.error('Missing required parameters: planId, suiteId, tags');
      console.log('\nRun with --help for usage information.\n');
      process.exit(1);
    }

    planId = Number(params.planid);
    suiteId = Number(params.suiteid);
    tags = parseArrayValue(params.tags);
    priorities = params.priorities ? parseNumberArray(params.priorities) : [];
    excludeAreaPaths = params.excludepaths ? parseArrayValue(params.excludepaths) : [];
    excludeAutoStatuses = params.excludeauto ? parseArrayValue(params.excludeauto) : [];
  } else {
    // Parse positional arguments (backward compatibility)
    if (mergedArgs.length < 5) {
      console.error('Not enough arguments.');
      showHelp();
    }

    planId = Number(mergedArgs[0]);
    suiteId = Number(mergedArgs[1]);
    tags = parseArrayValue(mergedArgs[2]);
    priorities = parseNumberArray(mergedArgs[3]);
    excludeAreaPaths = parseArrayValue(mergedArgs[4]);
    excludeAutoStatuses = mergedArgs[5] ? parseArrayValue(mergedArgs[5]) : [];
  }

  // Validate
  if (isNaN(planId) || isNaN(suiteId)) {
    console.error('planId and suiteId must be numbers.');
    process.exit(1);
  }

  if (!Array.isArray(tags)) {
    console.error('tags must be a JSON array.');
    process.exit(1);
  }

  console.log('\nParameters:');
  console.log(`   Plan ID:        ${planId}`);
  console.log(`   Suite ID:       ${suiteId}`);
  console.log(`   Tags:           ${JSON.stringify(tags)}`);
  console.log(`   Priorities:     ${JSON.stringify(priorities)}`);
  console.log(`   Exclude Paths:  ${JSON.stringify(excludeAreaPaths)}`);
  if (excludeAutoStatuses.length) console.log(`   Exclude Auto:   ${JSON.stringify(excludeAutoStatuses)}`);

  // Debug: Show raw and merged args
  console.log(`\n   [DEBUG] Raw args count: ${args.length}`);
  console.log(`   [DEBUG] Merged args count: ${mergedArgs.length}`);
  if (excludeAreaPaths.length > 0) {
    console.log(`   [DEBUG] Exclude paths parsed: ${excludeAreaPaths.map(p => '"' + p + '"').join(', ')}`);
  }
  console.log('');

  importTestCasesToSuiteWithFilters(planId, suiteId, tags, priorities, excludeAreaPaths, excludeAutoStatuses.length ? excludeAutoStatuses : undefined)
    .then(success => {
      if (success) {
        console.log('\nImport completed successfully!\n');
      } else {
        console.log('\nImport failed or no test cases matched.\n');
      }
      process.exit(success ? 0 : 1);
    })
    .catch(err => {
      console.error('\nError:', err?.message || err);
      process.exit(1);
    });
} catch (e: any) {
  console.error('Failed to parse parameters:', e?.message || e);
  console.log('\nMake sure arrays are properly formatted, e.g. [auto,regression]');
  console.log('Run with --help for usage information.\n');
  process.exit(1);
}
