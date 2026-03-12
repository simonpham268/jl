// JIRA to Azure DevOps Integration Demo
const fetch = require('node-fetch');
const { getCustomFieldValuesByRelease } = require('./jira');
const { getTestCaseIdsByTags, getTestCaseDetailsByTags } = require('../azured-devops/azure');

/**
 * Demo: Get JIRA custom field values and find matching Azure DevOps test cases
 * @param sprintVersion - JIRA Sprint version (e.g., "212", "213")
 * @param testPlanId - Azure DevOps Test Plan ID to import test cases into
 * @param testSuiteId - Azure DevOps Test Suite ID to import test cases into
 * @param underPath - Array of area paths to include from import
 */
export async function integrateJiraWithAzureDevOps(
  sprintVersion: string,
  testPlanId?: number,
  testSuiteId?: number,
  underPath: string[] = ["TMS\\QC Team\\JLWeb Test Cases"]
): Promise<void> {
  console.log(`=== JIRA → Azure DevOps Integration Demo ===`);
  console.log(`Sprint Version: ${sprintVersion}\n`);

  try {
    // Step 1: Get custom field values from JIRA
    console.log('Step 1: Getting custom field values from JIRA...\n');
    const customFieldValues = await getCustomFieldValuesByRelease(sprintVersion);

    if (customFieldValues.length === 0) {
      console.log('No custom field values found in JIRA. Exiting.');
      return;
    }

    console.log(`Found ${customFieldValues.length} custom field values from JIRA:`);
    customFieldValues.forEach((value: string, index: number) => {
      console.log(`   ${index + 1}. "${value}"`);
    });
    console.log(`\nCustom Field Values Array: ${JSON.stringify(customFieldValues)}\n`);

    // Step 2: Query Azure DevOps for test cases with matching tags
    console.log('Step 2: Querying Azure DevOps for matching test cases...\n');
    const testCaseIds = await getTestCaseIdsByTags(customFieldValues);

    if (testCaseIds.length === 0) {
      console.log('No matching test cases found in Azure DevOps.');
      return;
    }

    // Step 3: Get detailed information about the test cases
    console.log('Step 3: Getting detailed test case information...\n');
    const testCaseDetails = await getTestCaseDetailsByTags(customFieldValues);

    // Step 4: Display final results
    console.log(`\n=== FINAL INTEGRATION RESULTS ===`);
    console.log(`JIRA Sprint ${sprintVersion} Custom Fields: ${customFieldValues.length} values`);
    console.log(`Azure DevOps Test Cases Found: ${testCaseIds.length} test cases`);
    console.log(`\nTest Case IDs: ${JSON.stringify(testCaseIds)}`);

    console.log(`\nDetailed Test Case Information:`);
    testCaseDetails.forEach((testCase: any, index: number) => {
      console.log(`\n${index + 1}. Test Case ID: ${testCase.id}`);
      console.log(`   Title: ${testCase.title}`);
      console.log(`   Tags: ${testCase.tags.join(', ') || 'No tags'}`);

      // Show which JIRA custom field values match this test case
      const matchingValues = customFieldValues.filter((value: string) =>
        testCase.tags.some((tag: string) => tag.includes(value) || value.includes(tag))
      );
      if (matchingValues.length > 0) {
        console.log(`   Matches JIRA values: ${matchingValues.join(', ')}`);
      }
    });

    // Step 5: Import test cases to test suite if parameters provided
    if (testPlanId && testSuiteId) {
      console.log(`\nStep 4: Importing test cases to Azure DevOps Test Suite...`);
      const importSuccess = await importTestCasesToSuite(testCaseIds, testPlanId, testSuiteId, underPath);

      if (importSuccess) {
        console.log(`Successfully imported test cases to Plan ${testPlanId}, Suite ${testSuiteId}`);
      } else {
        console.log(`Failed to import test cases to Test Suite`);
      }
    }

    console.log(`\nIntegration complete! You can now use these test case IDs for automation.`);

  } catch (error: any) {
    console.error(`Integration failed:`, error?.message || error);
    throw error;
  }
}

/**
 * Import test cases to Azure DevOps test suite
 * @param testCaseIds - Array of test case IDs to import
 * @param testPlanId - Azure DevOps Test Plan ID
 * @param testSuiteId - Azure DevOps Test Suite ID
 * @param underPath - Optional array of area paths to include (e.g., ["TMS\\QC Team\\Bin", "TMS\\QC Team\\CustomerLines"])
 * @returns Promise<boolean> - Success status
 */
export async function importTestCasesToSuite(
  testCaseIds: number[],
  testPlanId: number,
  testSuiteId: number,
  underPath?: string[]
): Promise<boolean> {
  console.log(`Importing ${testCaseIds.length} test cases to Plan ${testPlanId}, Suite ${testSuiteId}...`);

  if (underPath && underPath.length > 0) {
    console.log(`Including test cases under areas: ${JSON.stringify(underPath)}`);
  }

  try {
    // Azure DevOps configuration (reusing from azure.ts)
    const CONFIG = {
      organization: 'joblogicltd',
      project: 'TMS',
      token: '9FVwEqLeB9zbpBeYMtd537ziTwFhWZXBNejWPsxhTBbI8SmyewMCJQQJ99CCACAAAAAakAp9AAASAZDO4RQy',
      cookie: 'VstsSession=%7B%22PersistentSessionId%22%3A%223634b936-a054-44c1-9b87-c76562d0cbcb%22%2C%22PendingAuthenticationSessionId%22%3A%2200000000-0000-0000-0000-000000000000%22%2C%22CurrentAuthenticationSessionId%22%3A%2200000000-0000-0000-0000-000000000000%22%2C%22SignInState%22%3A%7B%7D%7D',
      baseUrl: 'https://dev.azure.com/joblogicltd'
    };

    let filteredTestCaseIds = testCaseIds;

    // Filter test cases by area path if underPath is provided
    if (underPath && underPath.length > 0) {
      console.log(`\nFiltering test cases by area path...`);
      filteredTestCaseIds = await filterTestCasesByAreaPath(testCaseIds, underPath, CONFIG);
      console.log(`After filtering: ${filteredTestCaseIds.length} test cases (${testCaseIds.length - filteredTestCaseIds.length} excluded)`);
    }

    if (filteredTestCaseIds.length === 0) {
      console.log('No test cases to import after filtering.');
      return true;
    }

    // Build request payload
    const requestPayload = filteredTestCaseIds.map(id => ({
      workItem: {
        id: id.toString()
      }
    }));

    console.log(`Request payload:`);
    console.log(JSON.stringify(requestPayload, null, 2));

    // API endpoint for adding test cases to suite
    const url = `${CONFIG.baseUrl}/${CONFIG.project}/_apis/testplan/Plans/${testPlanId}/Suites/${testSuiteId}/TestCase?api-version=7.1`;

    const headers: Record<string, string> = {
      'Authorization': `Bearer ${CONFIG.token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (CONFIG.cookie) {
      headers['Cookie'] = CONFIG.cookie;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to import test cases: ${response.status} ${response.statusText}`);
      console.error(`Response: ${errorText}`);
      return false;
    }

    const result = await response.json();
    console.log(`Successfully imported test cases:`);
    console.log(JSON.stringify(result, null, 2));

    return true;

  } catch (error: any) {
    console.error(`Error importing test cases:`, error?.message || error);
    return false;
  }
}

/**
 * Filter test cases by area path
 * @param testCaseIds - Array of test case IDs to filter
 * @param underPath - Array of area paths to include
 * @param config - Azure DevOps configuration
 * @returns Promise<number[]> - Filtered array of test case IDs
 */
async function filterTestCasesByAreaPath(
  testCaseIds: number[],
  underPath: string[],
  config: any
): Promise<number[]> {
  const filteredIds: number[] = [];

  console.log(`Checking area paths for ${testCaseIds.length} test cases...`);

  const headers: Record<string, string> = {
    'Authorization': `Bearer ${config.token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  if (config.cookie) {
    headers['Cookie'] = config.cookie;
  }

  for (const id of testCaseIds) {
    try {
      // Fetch test case details to get area path
      const url = `${config.baseUrl}/${config.project}/_apis/wit/workitems/${id}?fields=System.AreaPath,System.Title&api-version=7.1`;

      const response = await fetch(url, {
        method: 'GET',
        headers: headers
      });

      if (!response.ok) {
        console.log(`Warning: Could not fetch details for test case ${id}, including it by default`);
        filteredIds.push(id);
        continue;
      }

      const workItem = await response.json() as any;
      const areaPath = workItem.fields?.['System.AreaPath'] || '';
      const title = workItem.fields?.['System.Title'] || '';

      // Check if test case area path starts with any of the included paths
      const isIncluded = underPath.some(includedPath =>
        areaPath.startsWith(includedPath)
      );

      if (isIncluded) {
        console.log(`Including TC${id}: "${title}" (Area: ${areaPath})`);
        filteredIds.push(id);
      } else {
        console.log(`Excluding TC${id}: "${title}" (Area: ${areaPath})`);
      }

      // Add small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));

    } catch (error: any) {
      console.log(`Error checking test case ${id}: ${error?.message}, including it by default`);
      filteredIds.push(id);
    }
  }

  return filteredIds;
}

/**
 * Convenience function with predefined inclusion patterns
 * @param sprintVersion - JIRA Sprint version
 * @param testPlanId - Azure DevOps Test Plan ID
 * @param testSuiteId - Azure DevOps Test Suite ID
 * @param includeQcTeam - Whether to include QC Team areas (default: true)
 * @param customInclusions - Additional custom inclusion paths
 */
export async function integrateJiraWithAzureDevOpsFiltered(
  sprintVersion: string,
  testPlanId: number,
  testSuiteId: number,
  includeQcTeam: boolean = true,
  customInclusions: string[] = []
): Promise<void> {
  let underPath: string[] = [...customInclusions];

  if (includeQcTeam) {
    underPath.push(
      "TMS\\QC Team\\JLWeb Test Cases"
    );
  }

  console.log(`Using inclusion filters: ${JSON.stringify(underPath)}\n`);

  return integrateJiraWithAzureDevOps(sprintVersion, testPlanId, testSuiteId, underPath);
}

/**
 * CLI Usage
 */
if (require.main === module) {
  const sprintVersion = process.argv[2];
  const testPlanId = process.argv[3] ? parseInt(process.argv[3], 10) : undefined;
  const testSuiteId = process.argv[4] ? parseInt(process.argv[4], 10) : undefined;
  const underPathArg = process.argv[5]; // JSON string or comma-separated paths

  let underPath: string[] | undefined = undefined;
  if (underPathArg) {
    try {
      // Try parsing as JSON first
      underPath = JSON.parse(underPathArg);
    } catch {
      // If JSON parsing fails, treat as comma-separated values
      underPath = underPathArg.split(',').map(path => path.trim()).filter(path => path.length > 0);
    }
  }

  if (!sprintVersion) {
    console.log('Usage: npx tsx src/utils/jira/jira-azure-integration.ts <sprint_version> [test_plan_id] [test_suite_id] [under_paths]');
    console.log('Examples:');
    console.log('  npx tsx src/utils/jira/jira-azure-integration.ts 212');
    console.log('  npx tsx src/utils/jira/jira-azure-integration.ts 213 107558 107559');
    console.log('  npx tsx src/utils/jira/jira-azure-integration.ts 213 107558 107559 "[\\"TMS\\\\QC Team\\\\Bin\\",\\"TMS\\\\QC Team\\\\CustomerLines\\"]"');
    console.log('  npx tsx src/utils/jira/jira-azure-integration.ts 213 107558 107559 "TMS\\\\QC Team\\\\Bin,TMS\\\\QC Team\\\\CustomerLines"');
    process.exit(1);
  }

  integrateJiraWithAzureDevOps(sprintVersion, testPlanId, testSuiteId, underPath)
    .then(() => {
      console.log('\nDemo completed successfully!');
    })
    .catch((error) => {
      console.error('\nDemo failed:', error);
      process.exit(1);
    });
}