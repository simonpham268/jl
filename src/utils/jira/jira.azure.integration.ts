// JIRA to Azure DevOps Integration
const fetch = require('node-fetch');
const { getCustomFieldValuesByRelease } = require('./jira');
const { getTestCaseIdsByTags, getTestCaseDetailsByTags } = require('../azured-devops/azure');

// ============================================================================
// Configuration
// ============================================================================

const AZURE_CONFIG = {
  organization: 'joblogicltd',
  project: 'TMS',
  token: '9FVwEqLeB9zbpBeYMtd537ziTwFhWZXBNejWPsxhTBbI8SmyewMCJQQJ99CCACAAAAAakAp9AAASAZDO4RQy',
  cookie: 'VstsSession=%7B%22PersistentSessionId%22%3A%223634b936-a054-44c1-9b87-c76562d0cbcb%22%2C%22PendingAuthenticationSessionId%22%3A%2200000000-0000-0000-0000-000000000000%22%2C%22CurrentAuthenticationSessionId%22%3A%2200000000-0000-0000-0000-000000000000%22%2C%22SignInState%22%3A%7B%7D%7D',
  baseUrl: 'https://dev.azure.com/joblogicltd'
};

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Create Azure DevOps API headers
 */
function createHeaders(): Record<string, string> {
  return {
    'Authorization': `Bearer ${AZURE_CONFIG.token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cookie': AZURE_CONFIG.cookie
  };
}

/**
 * Build Azure DevOps API URL
 */
function buildUrl(path: string): string {
  return `${AZURE_CONFIG.baseUrl}/${AZURE_CONFIG.project}${path}`;
}

/**
 * Fetch work item details from Azure DevOps
 */
async function fetchWorkItem(id: number, fields: string[]): Promise<any | null> {
  const url = buildUrl(`/_apis/wit/workitems/${id}?fields=${fields.join(',')}&api-version=7.1`);
  const response = await fetch(url, { method: 'GET', headers: createHeaders() });
  return response.ok ? response.json() : null;
}

/**
 * Import test cases to a test suite
 */
async function importToSuite(testCaseIds: number[], planId: number, suiteId: number): Promise<boolean> {
  const payload = testCaseIds.map(id => ({ workItem: { id: id.toString() } }));
  const url = buildUrl(`/_apis/testplan/Plans/${planId}/Suites/${suiteId}/TestCase?api-version=7.1`);
  
  const response = await fetch(url, {
    method: 'POST',
    headers: createHeaders(),
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Failed to import: ${response.status} ${response.statusText}\n${errorText}`);
    return false;
  }
  return true;
}

/**
 * Rate-limited delay
 */
const delay = (ms: number = 100) => new Promise(r => setTimeout(r, ms));

// ============================================================================
// Filter Functions
// ============================================================================

interface FilterResult {
  matches: boolean;
  reason?: string;
}

/**
 * Check if work item matches filters
 */
function matchesFilters(
  workItem: any,
  excludeAreaPaths: string[],
  priorities: number[],
  excludeAutoStatuses?: string[]
): FilterResult {
  const fields = workItem.fields;
  const areaPath = fields['System.AreaPath'] || '';
  const priority = fields['Microsoft.VSTS.Common.Priority'];
  const autoStatus = fields['Microsoft.VSTS.TCM.AutomationStatus'] || '';

  // Exclude test cases under specified area paths
  if (excludeAreaPaths.length) {
    const isExcluded = excludeAreaPaths.some(p => {
      const matches = areaPath.startsWith(p);
      // Debug log for exclusion check
      if (matches) {
        console.log(`      [EXCLUDE CHECK] "${areaPath}" starts with "${p}" -> EXCLUDED`);
      }
      return matches;
    });
    if (isExcluded) {
      return { matches: false, reason: `Area "${areaPath}" is in excluded paths` };
    }
  }
  if (priorities.length && !priorities.includes(Number(priority))) {
    return { matches: false, reason: `Priority ${priority} not in ${JSON.stringify(priorities)}` };
  }
  // Exclude test cases with automation status in the array
  if (excludeAutoStatuses?.length && excludeAutoStatuses.includes(autoStatus)) {
    return { matches: false, reason: `Status "${autoStatus}" is in excluded statuses ${JSON.stringify(excludeAutoStatuses)}` };
  }
  return { matches: true };
}

/**
 * Filter test cases by area path
 */
async function filterByAreaPath(testCaseIds: number[], areaPaths: string[]): Promise<number[]> {
  const filtered: number[] = [];
  const fields = ['System.AreaPath', 'System.Title'];

  console.log(`Filtering ${testCaseIds.length} test cases by area path...`);

  for (const id of testCaseIds) {
    const workItem = await fetchWorkItem(id, fields);
    
    if (!workItem) {
      console.log(`  TC${id}: Failed to fetch, including by default`);
      filtered.push(id);
      continue;
    }

    const areaPath = workItem.fields['System.AreaPath'] || '';
    const title = workItem.fields['System.Title'] || '';
    const isIncluded = areaPaths.some(p => areaPath.startsWith(p));

    console.log(`  TC${id}: ${isIncluded ? '✓' : '✗'} "${title}" (${areaPath})`);
    if (isIncluded) filtered.push(id);
    
    await delay();
  }

  return filtered;
}

/**
 * Filter test cases by multiple criteria
 */
async function filterTestCases(
  testCaseIds: number[],
  excludeAreaPaths: string[],
  priorities: number[],
  excludeAutoStatuses?: string[]
): Promise<number[]> {
  const filtered: number[] = [];
  const fields = ['System.AreaPath', 'System.Title', 'Microsoft.VSTS.Common.Priority', 'Microsoft.VSTS.TCM.AutomationStatus'];

  for (let i = 0; i < testCaseIds.length; i++) {
    const id = testCaseIds[i];
    const workItem = await fetchWorkItem(id, fields);
    
    if (!workItem) {
      console.log(`  [${i + 1}/${testCaseIds.length}] TC${id}: Failed to fetch, skipping`);
      continue;
    }

    const { matches, reason } = matchesFilters(workItem, excludeAreaPaths, priorities, excludeAutoStatuses);
    const title = workItem.fields['System.Title'] || 'Unknown';
    const status = matches ? '✓ INCLUDED' : `✗ EXCLUDED - ${reason}`;
    
    console.log(`  [${i + 1}/${testCaseIds.length}] TC${id}: ${status} - "${title}"`);
    if (matches) filtered.push(id);
    
    await delay();
  }

  return filtered;
}

// ============================================================================
// Main Export Functions
// ============================================================================

/**
 * Import test cases to suite with filters (tags, priority, excluded area paths, automation status)
 * @param planId - Azure DevOps Test Plan ID
 * @param suiteId - Azure DevOps Test Suite ID
 * @param tags - Array of tags to filter (include test cases with these tags)
 * @param priorities - Array of priorities to include (e.g., [1,2])
 * @param excludeAreaPaths - Array of area paths to EXCLUDE (test cases under these paths will be excluded)
 * @param excludeAutoStatuses - Optional array of automation statuses to EXCLUDE (e.g., ['Automated'])
 */
export async function importTestCasesToSuiteWithFilters(
  planId: number,
  suiteId: number,
  tags: string[],
  priorities: number[],
  excludeAreaPaths: string[],
  excludeAutoStatuses?: string[]
): Promise<boolean> {
  console.log(`\n=== Import Test Cases to Suite with Filters ===`);
  console.log(`Plan: ${planId}, Suite: ${suiteId}`);
  console.log(`Tags: ${JSON.stringify(tags)}`);
  console.log(`Priorities: ${JSON.stringify(priorities)}`);
  console.log(`Exclude Area Paths: ${JSON.stringify(excludeAreaPaths)}`);
  if (excludeAutoStatuses?.length) console.log(`Exclude Auto Statuses: ${JSON.stringify(excludeAutoStatuses)}`);
  console.log('');

  try {
    // Step 1: Query by tags
    console.log('Step 1: Querying test cases by tags...');
    const testCaseIds: number[] = await getTestCaseIdsByTags(tags);
    if (!testCaseIds.length) {
      console.log('No test cases found for provided tags.');
      return false;
    }
    console.log(`Found ${testCaseIds.length} test cases.\n`);

    // Step 2: Apply filters
    console.log('Step 2: Filtering test cases...');
    const filteredIds = await filterTestCases(testCaseIds, excludeAreaPaths, priorities, excludeAutoStatuses);
    console.log(`\nFiltered: ${filteredIds.length}/${testCaseIds.length} matched.\n`);

    if (!filteredIds.length) {
      console.log('No test cases matched all filters.');
      return false;
    }

    // Step 3: Import
    console.log('Step 3: Importing to suite...');
    const success = await importToSuite(filteredIds, planId, suiteId);
    
    if (success) {
      console.log(`\n=== Import Successful ===`);
      console.log(`Imported ${filteredIds.length} test cases: ${JSON.stringify(filteredIds)}`);
    }
    return success;

  } catch (error: any) {
    console.error('Error:', error?.message || error);
    return false;
  }
}

/**
 * Import test cases to Azure DevOps test suite
 */
export async function importTestCasesToSuite(
  testCaseIds: number[],
  testPlanId: number,
  testSuiteId: number,
  underPath?: string[]
): Promise<boolean> {
  console.log(`Importing ${testCaseIds.length} test cases to Plan ${testPlanId}, Suite ${testSuiteId}...`);

  try {
    let idsToImport = testCaseIds;

    if (underPath?.length) {
      console.log(`Filtering by area paths: ${JSON.stringify(underPath)}`);
      idsToImport = await filterByAreaPath(testCaseIds, underPath);
      console.log(`After filtering: ${idsToImport.length} (${testCaseIds.length - idsToImport.length} excluded)`);
    }

    if (!idsToImport.length) {
      console.log('No test cases to import after filtering.');
      return true;
    }

    const success = await importToSuite(idsToImport, testPlanId, testSuiteId);
    if (success) {
      console.log(`Successfully imported ${idsToImport.length} test cases.`);
    }
    return success;

  } catch (error: any) {
    console.error(`Error importing:`, error?.message || error);
    return false;
  }
}

/**
 * JIRA to Azure DevOps integration
 */
export async function integrateJiraWithAzureDevOps(
  sprintVersion: string,
  testPlanId?: number,
  testSuiteId?: number,
  underPath: string[] = ["TMS\\QC Team\\JLWeb Test Cases"]
): Promise<void> {
  console.log(`=== JIRA → Azure DevOps Integration ===`);
  console.log(`Sprint: ${sprintVersion}\n`);

  try {
    // Step 1: Get JIRA custom fields
    console.log('Step 1: Getting custom field values from JIRA...');
    const customFieldValues = await getCustomFieldValuesByRelease(sprintVersion);

    if (!customFieldValues.length) {
      console.log('No custom field values found. Exiting.');
      return;
    }

    console.log(`Found ${customFieldValues.length} values: ${JSON.stringify(customFieldValues)}\n`);

    // Step 2: Query Azure DevOps
    console.log('Step 2: Querying Azure DevOps for matching test cases...');
    const testCaseIds = await getTestCaseIdsByTags(customFieldValues);

    if (!testCaseIds.length) {
      console.log('No matching test cases found.');
      return;
    }

    // Step 3: Get details
    console.log('Step 3: Getting detailed test case information...');
    const testCaseDetails = await getTestCaseDetailsByTags(customFieldValues);

    // Step 4: Display results
    console.log(`\n=== Results ===`);
    console.log(`JIRA Fields: ${customFieldValues.length}, Azure Test Cases: ${testCaseIds.length}`);
    console.log(`IDs: ${JSON.stringify(testCaseIds)}\n`);

    testCaseDetails.forEach((tc: any, i: number) => {
      console.log(`${i + 1}. TC${tc.id}: ${tc.title}`);
      console.log(`   Tags: ${tc.tags.join(', ') || 'None'}`);
    });

    // Step 5: Import if plan/suite provided
    if (testPlanId && testSuiteId) {
      console.log(`\nStep 4: Importing to Test Suite...`);
      const success = await importTestCasesToSuite(testCaseIds, testPlanId, testSuiteId, underPath);
      console.log(success ? 'Import successful!' : 'Import failed.');
    }

    console.log(`\nIntegration complete!`);

  } catch (error: any) {
    console.error(`Integration failed:`, error?.message || error);
    throw error;
  }
}

/**
 * Convenience function with predefined QC Team paths
 */
export async function integrateJiraWithAzureDevOpsFiltered(
  sprintVersion: string,
  testPlanId: number,
  testSuiteId: number,
  includeQcTeam: boolean = true,
  customInclusions: string[] = []
): Promise<void> {
  const underPath = [...customInclusions];
  if (includeQcTeam) underPath.push("TMS\\QC Team\\JLWeb Test Cases");
  
  console.log(`Using filters: ${JSON.stringify(underPath)}\n`);
  return integrateJiraWithAzureDevOps(sprintVersion, testPlanId, testSuiteId, underPath);
}

// ============================================================================
// CLI
// ============================================================================

if (require.main === module) {
  const [cmd, ...args] = process.argv.slice(2);

  const showHelp = () => {
    console.log(`
Usage:
  npx tsx src/utils/jira/jira.azure.integration.ts <command> [options]

Commands:
  import-suite-filtered <planId> <suiteId> <tags> <priorities> <excludeAreaPaths> [excludeAutoStatuses]
    Import test cases with filters. Arrays should be JSON format.
    - tags: Include test cases with these tags
    - priorities: Include test cases with these priorities
    - excludeAreaPaths: EXCLUDE test cases under these area paths
    - excludeAutoStatuses: EXCLUDE test cases with these statuses (e.g., ["Automated"])
    Example: npx tsx ... import-suite-filtered 107558 107559 '["auto"]' '[1,2]' '["TMS\\\\QC Team\\\\Bin"]' '["Automated"]'

  <sprintVersion> [planId] [suiteId] [areaPaths]
    JIRA integration. Import test cases from JIRA sprint to Azure DevOps.
    Example: npx tsx ... 213 107558 107559
`);
    process.exit(1);
  };

  if (!cmd || cmd === '--help' || cmd === '-h') {
    showHelp();
  }

  if (cmd === 'import-suite-filtered') {
    const [planId, suiteId, tagsStr, prioritiesStr, excludeAreaPathsStr, excludeAutoStatusStr] = args;
    
    if (!planId || !suiteId || !tagsStr || !prioritiesStr || !excludeAreaPathsStr) {
      showHelp();
    }

    try {
      const tags = JSON.parse(tagsStr);
      const priorities = JSON.parse(prioritiesStr);
      const excludeAreaPaths = JSON.parse(excludeAreaPathsStr);
      const excludeAutoStatuses = excludeAutoStatusStr ? JSON.parse(excludeAutoStatusStr) : undefined;

      importTestCasesToSuiteWithFilters(Number(planId), Number(suiteId), tags, priorities, excludeAreaPaths, excludeAutoStatuses)
        .then(success => process.exit(success ? 0 : 1))
        .catch(err => {
          console.error('Error:', err?.message || err);
          process.exit(1);
        });
    } catch {
      console.error('Failed to parse JSON arrays.');
      process.exit(1);
    }
  } else {
    // JIRA integration mode
    const sprintVersion = cmd;
    const testPlanId = args[0] ? parseInt(args[0], 10) : undefined;
    const testSuiteId = args[1] ? parseInt(args[1], 10) : undefined;
    let underPath: string[] | undefined;
    
    if (args[2]) {
      try {
        underPath = JSON.parse(args[2]);
      } catch {
        underPath = args[2].split(',').map(p => p.trim()).filter(p => p);
      }
    }

    integrateJiraWithAzureDevOps(sprintVersion, testPlanId, testSuiteId, underPath)
      .then(() => console.log('\nDone!'))
      .catch(err => {
        console.error('\nFailed:', err);
        process.exit(1);
      });
  }
}