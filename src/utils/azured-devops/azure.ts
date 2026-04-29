const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// Azure DevOps configuration
const CONFIG = {
  organization: 'joblogicltd',
  project: 'TMS',
  token: '9FVwEqLeB9zbpBeYMtd537ziTwFhWZXBNejWPsxhTBbI8SmyewMCJQQJ99CCACAAAAAakAp9AAASAZDO4RQy',
  cookie: 'VstsSession=%7B%22PersistentSessionId%22%3A%223634b936-a054-44c1-9b87-c76562d0cbcb%22%2C%22PendingAuthenticationSessionId%22%3A%2200000000-0000-0000-0000-000000000000%22%2C%22CurrentAuthenticationSessionId%22%3A%2200000000-0000-0000-0000-000000000000%22%2C%22SignInState%22%3A%7B%7D%7D',
  // Try both URL formats
  baseUrl: 'https://dev.azure.com/joblogicltd', // Alternative format from UI
  devAzureUrl: 'https://dev.azure.com/joblogicltd' // Standard format
};

interface TestStep {
  id: string;
  type: string;
  action: string;
  expectedResult: string;
}

interface TestCase {
  title: string;
  steps: TestStep[];
  tags: string[];
}

function decodeHtmlEntities(encoded: string): string {
  const entityMap: { [key: string]: string } = {
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&nbsp;': ' ',
    '&#x27;': "'",
    '&#x2F;': '/',
    '&#x60;': '`',
    '&#x3D;': '='
  };

  return encoded.replace(/&[a-zA-Z0-9#x]+;/g, (match) => {
    return entityMap[match] || match;
  });
}

function stripHtmlTags(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<p[^>]*>/gi, '')
    .replace(/<div[^>]*>/gi, '')
    .replace(/<\/div>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\n\s*\n/g, '\n')
    .trim();
}

function extractPlainText(htmlEncodedContent: string): string {
  if (!htmlEncodedContent) return '';

  // First decode HTML entities
  let decodedText = decodeHtmlEntities(htmlEncodedContent);

  // Then strip HTML tags
  const plainText = stripHtmlTags(decodedText);

  // Final decode pass in case there were nested entities
  decodedText = decodeHtmlEntities(plainText);  return decodedText
    .replace(/\s+/g, ' ')
    .replace(/\n\s*\n/g, '\n')
    .trim();
}

function parseStepsXml(xmlContent: string) {
  const steps: Array<{ id: string, type: string, action: string, expectedResult: string }> = [];

  // Simple regex-based XML parsing (for Node.js compatibility)
  const stepRegex = /<step[^>]*id="([^"]*)"[^>]*type="([^"]*)"[^>]*>(.*?)<\/step>/gs;
  const paramRegex = /<parameterizedString[^>]*>(.*?)<\/parameterizedString>/g;

  let stepMatch;

  while ((stepMatch = stepRegex.exec(xmlContent)) !== null) {
    const [, id, type, stepContent] = stepMatch;

    const paramMatches = [...stepContent.matchAll(paramRegex)];

    const action = paramMatches.length > 0
      ? extractPlainText(paramMatches[0][1])
      : '';

    const expectedResult = paramMatches.length > 1
      ? extractPlainText(paramMatches[1][1])
      : '';

    if (action.trim()) {
      steps.push({
        id,
        type,
        action: action.trim(),
        expectedResult: expectedResult.trim()
      });
    }
  }  return steps;
}

function parseWorkItem(workItem: any): TestCase {
  const title = workItem.fields['System.Title'] || 'Unknown Test Case';
  const stepsXml = workItem.fields['Microsoft.VSTS.TCM.Steps'];
  const tagsString = workItem.fields['System.Tags'] || '';

  // Parse tags from semicolon-separated string
  const tags = tagsString
    .split(';')
    .map((tag: string) => tag.trim())
    .filter((tag: string) => tag.length > 0);

  if (!stepsXml) {
    return { title, steps: [], tags };
  }

  const steps = parseStepsXml(stepsXml);

  return { title, steps, tags };
}

function generateMarkdownContent(testCase: TestCase, testCaseId: number): string {
  let simpleSteps = '';

  testCase.steps.forEach((step, index) => {
    const stepLine = `Step ${index + 1}: ${step.action}`;

    console.log(stepLine);
    simpleSteps += stepLine;

    if (step.expectedResult && step.expectedResult.trim()) {
      const expectedLine = `\n   Expected: ${step.expectedResult}`;

      console.log(expectedLine);
      simpleSteps += expectedLine;
    }

    simpleSteps += '\n';
  });

  let tagsSection = '';

  if (testCase.tags.length > 0) {
    tagsSection = `\n## Tags\n${testCase.tags.map(tag => `- ${tag}`).join('\n')}\n`;
  }  return `# ${testCase.title}

## ID: ${testCaseId}${tagsSection}

## Test Steps

${simpleSteps}`;
}

function saveMarkdownFile(content: string, testCaseId: number): string {
  const outputDir = path.join(__dirname, '../../../output');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputFile = path.join(outputDir, `test-case-${testCaseId}.md`);

  fs.writeFileSync(outputFile, content, 'utf8');

  console.log(`\nTest case saved to: ${outputFile}`);
  return outputFile;
}

/**
 * Parse test case ID from various formats
 * @param testId - Test ID in various formats: 7884, "7884", "TC7884", "[TC7884]", etc.
 * @returns number - The numeric test case ID
 */
function parseTestCaseId(testId: string | number): number {
  if (typeof testId === 'number') {
    return testId;
  }

  // Remove brackets and extract numeric part
  const cleanId = testId
    .replace(/[\[\]]/g, '') // Remove square brackets
    .replace(/^TC/i, '') // Remove TC prefix (case insensitive)
    .trim();

  const numericId = parseInt(cleanId, 10);

  if (isNaN(numericId)) {
    throw new Error(`Invalid test case ID format: "${testId}". Expected formats: 7884, "TC7884", "[TC7884]", etc.`);
  }  return numericId;
}

/**
 * Update test case status in Azure DevOps (both work item and test plan outcome)
 * @param testCaseId - The Azure DevOps work item ID
 * @param status - The test execution status: 'passed' or 'failed'
 * @param executionNotes - Optional notes about the test execution
 * @param planId - Optional test plan ID to update specific plan when test case exists in multiple plans
 * @param suiteId - Optional suite ID to update specific suite within the plan
 * @returns Promise<boolean> - Success status of the update
 */
export async function updateTestCaseStatus(
  planId: number,
  suiteId: number,
  testCaseId: string | number,
  status: 'passed' | 'failed',
  executionNotes?: string,
): Promise<boolean> {
  const numericId = parseTestCaseId(testCaseId);

  console.log(`=== Updating Test Case ${numericId} Status: ${status.toUpperCase()} ===`);
  if (planId) {
    console.log(`Target Test Plan ID: ${planId}`);
  }
  if (suiteId) {
    console.log(`Target Suite ID: ${suiteId}`);
  }
  console.log('');

  try {
    // First, update the work item
    await updateWorkItem(numericId, status, executionNotes);

    // Then, update the test plan outcome
    await updateTestPlanOutcome(numericId, status, executionNotes, planId, suiteId);    return true;
  } catch (error: any) {
    console.error(`Failed to update Test Case ${numericId} status:`, error?.message || error);
    return false;
  }
}

/**
 * Update work item fields
 */
async function updateWorkItem(numericId: number, status: 'passed' | 'failed', executionNotes?: string): Promise<void> {
  const updatePayload = [
    {
      'op': 'add',
      'path': '/fields/Microsoft.VSTS.TCM.AutomatedTestName',
      'value': `TC${numericId}_AutomatedTest`
    }
  ];

  // Add execution notes if provided
  if (executionNotes) {
    updatePayload.push({
      'op': 'add',
      'path': '/fields/System.History',
      'value': `Test execution result: ${status.toUpperCase()}\n${executionNotes}`
    });
  }

  // Add custom field for test result tracking (if available)
  updatePayload.push({
    'op': 'add',
    'path': '/fields/System.Description',
    'value': `Last automated test result: ${status.toUpperCase()} at ${new Date().toISOString()}\n\n${executionNotes || 'No additional details'}`
  });

  // API endpoint for updating work item
  const url = `${CONFIG.baseUrl}/${CONFIG.project}/_apis/wit/workitems/${numericId}?api-version=7.1`;

  const headers: Record<string, string> = {
    'Authorization': `Bearer ${CONFIG.token}`,
    'Content-Type': 'application/json-patch+json',
    'Accept': 'application/json'
  };

  if (CONFIG.cookie) {
    headers['Cookie'] = CONFIG.cookie;
  }

  const response = await fetch(url, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(updatePayload)
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(`Work item update failed: ${response.status} ${response.statusText}\nResponse: ${errorText}`);
  }

  console.log(`Work item ${numericId} updated successfully`);
}

/**
 * Update test plan outcome by directly updating test point
 */
async function updateTestPlanOutcome(numericId: number, status: 'passed' | 'failed', executionNotes?: string, planId?: number, suiteId?: number): Promise<void> {
  try {
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${CONFIG.token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (CONFIG.cookie) {
      headers['Cookie'] = CONFIG.cookie;
    }

    let testPoints: any[] = [];

    // Method 1: If we have specific planId and suiteId, try multiple API endpoints
    if (planId && suiteId) {
      console.log(`Looking for test points in Plan ${planId}, Suite ${suiteId} for TC ${numericId}`);

      // Try testplan API first with visualstudio.com format
      const testPlanPointsUrl = `${CONFIG.baseUrl}/${CONFIG.project}/_apis/testplan/Plans/${planId}/Suites/${suiteId}/TestPoint?api-version=7.1`;

      console.log(`Trying testplan API: ${testPlanPointsUrl}`);

      const testPlanResponse = await fetch(testPlanPointsUrl, {
        method: 'GET',
        headers: headers
      });

      console.log(`TestPlan API response: ${testPlanResponse.status} ${testPlanResponse.statusText}`);

      if (testPlanResponse.ok) {
        const testPlanData = await testPlanResponse.json();

        // Filter for our specific test case
        testPoints = testPlanData.value?.filter((point: any) =>
          point.testCaseReference?.id === numericId || point.testCaseReference?.id === numericId.toString()
        ) || [];

        console.log(`Found ${testPoints.length} test point(s) via testplan API for TC${numericId}`);

        // Debug: Show all test points in this suite
        if (testPlanData.value && testPlanData.value.length > 0) {
          console.log(`All test points in this suite:`);
          testPlanData.value.forEach((point: any, index: number) => {
            console.log(`  ${index + 1}. TC${point.testCaseReference?.id} - Point ID: ${point.id} - State: ${point.testCaseReference.state || 'Unknown'}`);
          });
        }
      } else {
        const errorText = await testPlanResponse.text();

        console.log(`TestPlan API error: ${errorText}`);

        // Fallback to original test API with visualstudio.com
        console.log(`Falling back to test API...`);
        const suitePointsUrl = `${CONFIG.baseUrl}/${CONFIG.project}/_apis/test/Plans/${planId}/Suites/${suiteId}/points?api-version=7.1`;

        const suitePointsResponse = await fetch(suitePointsUrl, {
          method: 'GET',
          headers: headers
        });

        console.log(`Suite points API response: ${suitePointsResponse.status} ${suitePointsResponse.statusText}`);

        if (suitePointsResponse.ok) {
          const suitePointsData = await suitePointsResponse.json();

          console.log(`Raw suite points data:`, JSON.stringify(suitePointsData, null, 2));

          // Filter for our specific test case
          testPoints = suitePointsData.value?.filter((point: any) =>
            point.testCase?.id === numericId || point.testCase?.id === numericId.toString()
          ) || [];

          console.log(`Found ${testPoints.length} test point(s) in specified suite for TC${numericId}`);

          // Debug: Show all test cases in this suite
          if (suitePointsData.value && suitePointsData.value.length > 0) {
            console.log(`All test cases in this suite:`);
            suitePointsData.value.forEach((point: any, index: number) => {
              console.log(`  ${index + 1}. TC${point.testCase?.id} - ${point.testCase?.name || 'No name'} (Point ID: ${point.id})`);
            });
          }
        } else {
          const errorText = await suitePointsResponse.text();

          console.log(`Suite points API error: ${errorText}`);
        }
      }
    }

    // Method 2: If method 1 failed or we don't have suite info, try getting by plan only
    if (testPoints.length === 0 && planId) {
      console.log(`Looking for test points in all suites of Plan ${planId} for TC${numericId}`);

      const planPointsUrl = `${CONFIG.baseUrl}/${CONFIG.project}/_apis/test/Plans/${planId}/points?testCaseId=${numericId}&api-version=7.1`;

      const planPointsResponse = await fetch(planPointsUrl, {
        method: 'GET',
        headers: headers
      });

      console.log(`Plan points API response: ${planPointsResponse.status} ${planPointsResponse.statusText}`);

      if (planPointsResponse.ok) {
        const planPointsData = await planPointsResponse.json();

        console.log(`Raw plan points data:`, JSON.stringify(planPointsData, null, 2));

        testPoints = planPointsData.value || [];

        // Additional filtering by suiteId if specified
        if (suiteId) {
          const beforeFilter = testPoints.length;

          testPoints = testPoints.filter((point: any) =>
            point.suite?.id === suiteId || point.suite?.id === suiteId.toString()
          );
          console.log(`Filtered ${beforeFilter} -> ${testPoints.length} points for Suite ID ${suiteId}`);
        }

        console.log(`Found ${testPoints.length} test point(s) in Plan ${planId} for TC${numericId}`);
      } else {
        const errorText = await planPointsResponse.text();

        console.log(`Plan points API error: ${errorText}`);
      }
    }

    // Method 3: Fallback - get all test points for the test case and filter manually
    if (testPoints.length === 0) {
      console.log(`Using fallback method - searching all test points for TC${numericId}`);

      const allPointsUrl = `${CONFIG.baseUrl}/${CONFIG.project}/_apis/test/points?testCaseId=${numericId}&api-version=7.1`;

      const allPointsResponse = await fetch(allPointsUrl, {
        method: 'GET',
        headers: headers
      });

      console.log(`All points API response: ${allPointsResponse.status} ${allPointsResponse.statusText}`);

      if (allPointsResponse.ok) {
        const allPointsData = await allPointsResponse.json();

        console.log(`Raw all points data:`, JSON.stringify(allPointsData, null, 2));

        testPoints = allPointsData.value || [];

        console.log(`Found ${testPoints.length} total test points for TC${numericId}`);

        // Show details of all found test points
        testPoints.forEach((point: any, index: number) => {
          console.log(`  Point ${index + 1}: ID=${point.id}, Plan=${point.testPlan?.id}, Suite=${point.suite?.id}, State=${point.outcome}`);
        });

        // Filter by planId and suiteId if specified
        if (planId) {
          const beforePlanFilter = testPoints.length;

          testPoints = testPoints.filter((point: any) =>
            point.testPlan?.id === planId || point.testPlan?.id === planId.toString()
          );
          console.log(`Plan filter: ${beforePlanFilter} -> ${testPoints.length} points for Plan ID ${planId}`);
        }

        if (suiteId) {
          const beforeSuiteFilter = testPoints.length;

          testPoints = testPoints.filter((point: any) =>
            point.suite?.id === suiteId || point.suite?.id === suiteId.toString()
          );
          console.log(`Suite filter: ${beforeSuiteFilter} -> ${testPoints.length} points for Suite ID ${suiteId}`);
        }

        console.log(`Found ${testPoints.length} matching test point(s) after filtering`);
      } else {
        const errorText = await allPointsResponse.text();

        console.log(`All points API error: ${errorText}`);
      }
    }

    // If still no test points found, let's check if the test case exists in the suite at all
    if (testPoints.length === 0 && planId && suiteId) {
      console.log(`\nChecking if TC${numericId} exists in Suite ${suiteId}...`);

      const suiteTestCasesUrl = `${CONFIG.baseUrl}/${CONFIG.project}/_apis/test/Plans/${planId}/Suites/${suiteId}/testcases?api-version=7.1`;

      const suiteTestCasesResponse = await fetch(suiteTestCasesUrl, {
        method: 'GET',
        headers: headers
      });

      console.log(`Suite test cases API response: ${suiteTestCasesResponse.status} ${suiteTestCasesResponse.statusText}`);

      if (suiteTestCasesResponse.ok) {
        const suiteTestCasesData = await suiteTestCasesResponse.json();

        console.log(`Suite test cases data:`, JSON.stringify(suiteTestCasesData, null, 2));

        // Find our test case and get potential test point information
        const ourTestCase = suiteTestCasesData.value?.find((tc: any) =>
          tc.testCase?.id == numericId || tc.testCase?.id == numericId.toString()
        );

        if (!ourTestCase) {
          console.log(`TC${numericId} does NOT exist in Suite ${suiteId}`);
          console.log(`Test cases in suite:`, suiteTestCasesData.value?.map((tc: any) => `TC${tc.testCase?.id}`) || []);
        } else {
          console.log(`TC${numericId} has ${ourTestCase.pointAssignments?.length || 0} point assignments`);

          // Try to find test points using configuration and tester info
          if (ourTestCase.pointAssignments && ourTestCase.pointAssignments.length > 0) {
            console.log(`Attempting to find test points using configuration info...`);

            for (const assignment of ourTestCase.pointAssignments) {
              const configId = assignment.configuration?.id;
              const testerId = assignment.tester?.id;

              console.log(`  Configuration ID: ${configId}, Tester ID: ${testerId}`);

              // Try to get test point using configuration-based API
              const configBasedUrl = `${CONFIG.baseUrl}/${CONFIG.project}/_apis/test/Plans/${planId}/Suites/${suiteId}/points?testCaseId=${numericId}&configurationId=${configId}&api-version=7.1`;

              console.log(`  Testing config-based API: ${configBasedUrl}`);

              const configResponse = await fetch(configBasedUrl, {
                method: 'GET',
                headers: headers
              });

              console.log(`  Config API response: ${configResponse.status} ${configResponse.statusText}`);

              if (configResponse.ok) {
                const configData = await configResponse.json();

                console.log(`  Config API data:`, JSON.stringify(configData, null, 2));

                if (configData.value && configData.value.length > 0) {
                  testPoints = configData.value;
                  console.log(`  Found ${testPoints.length} test points via configuration API!`);
                  break;
                }
              } else {
                const errorText = await configResponse.text();

                console.log(`  Config API error: ${errorText}`);
              }
            }
          }

          if (testPoints.length === 0) {
            console.log(`TC${numericId} exists in Suite ${suiteId} but has no accessible test points (may not be ready for execution)`);
          }
        }
      } else {
        const errorText = await suiteTestCasesResponse.text();

        console.log(`Suite test cases API error: ${errorText}`);
      }
    }
    if (testPoints.length === 0) {
      console.log(`\nNo test points found for TC${numericId}. Attempting to create test run...`);

      // Try to create a test run and test points programmatically
      if (planId && suiteId) {
        const created = await createTestRunAndPoints(numericId, planId, suiteId, status, headers, executionNotes);

        if (created) {
          console.log(`\nSuccessfully created and updated test run for TC${numericId}`);
          return;
        }
      }

      let message = `No test points found for TC${numericId}`;

      if (planId) message += ` in Plan ID ${planId}`;
      if (suiteId) message += ` Suite ID ${suiteId}`;

      console.log(`\n ${message}`);
      console.log(`\nPossible reasons:`);
      console.log(`   1. Test case exists but test points haven't been created yet`);
      console.log(`   2. Test case might be in 'Design' state (not ready for execution)`);
      console.log(`   3. Need to run a test execution to create test points`);
      console.log(`   4. Test case was recently added and Azure DevOps hasn't synced yet\n`);      return;
    }

    // Update each found test point with delays to prevent conflicts
    let successCount = 0;

    console.log(`Found ${testPoints.length} test points to update for TC${numericId}:`);

    for (let i = 0; i < testPoints.length; i++) {
      const testPoint = testPoints[i];

      console.log(`  ${i + 1}. Point ID: ${testPoint.id}, Plan: ${testPoint.testPlan?.id}, Suite: ${testPoint.testSuite?.id || testPoint.suite?.id}, Current Outcome: ${testPoint.outcome || 'None'}`);
    }

    for (let i = 0; i < testPoints.length; i++) {
      const testPoint = testPoints[i];

      // Add delay between updates to prevent race conditions
      if (i > 0) {
        console.log(`Waiting 2 seconds before next update to prevent race conditions...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      console.log(`\nUpdating test point ${testPoint.id} (${i + 1}/${testPoints.length}) - Plan: ${testPoint.testPlan?.id}, Suite: ${testPoint.testSuite?.id || testPoint.suite?.id}`);

      const updatePayload = {
        outcome: status === 'passed' ? 'Passed' : 'Failed',
        state: 'Completed'
      };

      const updateUrl = `${CONFIG.baseUrl}/${CONFIG.project}/_apis/test/Plans/${testPoint.testPlan.id}/Suites/${testPoint.testSuite?.id || testPoint.suite?.id}/Points/${testPoint.id}?api-version=7.1`;

      console.log(`Sending update payload:`, JSON.stringify(updatePayload, null, 2));
      console.log(`Update URL: ${updateUrl}`);

      const updateResponse = await fetch(updateUrl, {
        method: 'PATCH',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatePayload)
      });

      console.log(`Response status: ${updateResponse.status} ${updateResponse.statusText}`);

      if (updateResponse.ok) {
        const responseData = await updateResponse.json();

        successCount++;
        console.log(`SUCCESS: Test point ${testPoint.id} updated successfully`);
        console.log(`  New outcome: ${responseData.outcome}, New state: ${responseData.state}`);

        let successMsg = `Test point ${testPoint.id} updated: TC${numericId} -> ${status.toUpperCase()}`;

        successMsg += ` (Plan: ${testPoint.testPlan?.id || 'Unknown'}`;
        if (testPoint.testSuite?.id || testPoint.suite?.id) {
          successMsg += `, Suite: ${testPoint.testSuite?.id || testPoint.suite?.id}`;
        }
        successMsg += ')';
        console.log(successMsg);
      } else {
        const errorText = await updateResponse.text();

        console.log(`FAILED: Update failed for test point ${testPoint.id}: ${updateResponse.status} - ${errorText}`);

        // Log detailed error information
        try {
          const errorJson = JSON.parse(errorText);

          console.log(`Error details:`, JSON.stringify(errorJson, null, 2));
        } catch {
          console.log(`Raw error text: ${errorText}`);
        }

        // Try alternative approach with test results API
        console.log(`Attempting alternative update method for test point ${testPoint.id}...`);
        await updateViaTestResults(testPoint, numericId, status, headers, executionNotes);
      }
    }

    if (successCount > 0) {
      console.log(`\nSuccessfully updated ${successCount} out of ${testPoints.length} test points for TC${numericId}`);
    }
  } catch (error: any) {
    let message = `Test plan outcome update failed for TC${numericId}`;

    if (planId) message += ` in Plan ID ${planId}`;
    if (suiteId) message += ` Suite ID ${suiteId}`;
    message += `: ${error?.message || error}`;
    console.log(message);
  }
}

/**
 * Create a test run and test points when they don't exist
 */
async function createTestRunAndPoints(
  numericId: number,
  planId: number,
  suiteId: number,
  status: 'passed' | 'failed',
  headers: Record<string, string>,
  executionNotes?: string
): Promise<boolean> {
  try {
    console.log(`Creating truly unplanned test run for TC${numericId}`);

    // Create completely unplanned test run (no plan reference at all)
    const testRunPayload = {
      name: `Automated Unplanned Run - TC${numericId}`,
      automated: true,
      isAutomated: true
      // Don't include plan reference
    };

    const createRunUrl = `${CONFIG.baseUrl}/${CONFIG.project}/_apis/test/runs?api-version=7.1`;

    const createRunResponse = await fetch(createRunUrl, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testRunPayload)
    });

    if (!createRunResponse.ok) {
      const errorText = await createRunResponse.text();

      console.log(`Failed to create test run: ${createRunResponse.status} - ${errorText}`);
      return false;
    }

    const testRun = await createRunResponse.json();

    console.log(`Created truly unplanned test run ID: ${testRun.id}`);

    // Add unplanned test result with minimal required fields
    const testResultPayload = [{
      testCase: {
        id: numericId
      },
      testCaseTitle: `Test Case ${numericId}`,
      outcome: status === 'passed' ? 'Passed' : 'Failed',
      state: 'Completed',
      comment: executionNotes || `Automated test result: ${status} (Plan: ${planId}, Suite: ${suiteId})`,
      startedDate: new Date().toISOString(),
      completedDate: new Date().toISOString(),
      durationInMs: 1000,
      automatedTestName: `TC${numericId}_AutomatedTest`
    }];

    const addResultUrl = `${CONFIG.baseUrl}/${CONFIG.project}/_apis/test/runs/${testRun.id}/results?api-version=7.1`;

    console.log(`Adding unplanned test result...`);

    const addResultResponse = await fetch(addResultUrl, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testResultPayload)
    });

    if (!addResultResponse.ok) {
      const errorText = await addResultResponse.text();

      console.log(`Failed to add test result: ${addResultResponse.status} - ${errorText}`);

      // Try even simpler payload with all required fields
      console.log(`Trying minimal payload with all required fields...`);

      const minimalResultPayload = [{
        testCase: {
          id: numericId
        },
        testCaseTitle: `Test Case ${numericId}`,
        outcome: status === 'passed' ? 'Passed' : 'Failed',
        state: 'Completed',
        automatedTestName: `TC${numericId}_AutomatedTest`
      }];

      const minimalResponse = await fetch(addResultUrl, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(minimalResultPayload)
      });

      if (!minimalResponse.ok) {
        const minimalError = await minimalResponse.text();

        console.log(`Minimal payload also failed: ${minimalResponse.status} - ${minimalError}`);
        return false;
      } else {
        console.log(`Added minimal test result for TC${numericId}: ${status.toUpperCase()}`);
      }
    } else {
      console.log(`Added test result for TC${numericId}: ${status.toUpperCase()}`);
    }

    // Complete the test run
    const completeRunPayload = {
      state: 'Completed',
      completedDate: new Date().toISOString()
    };

    const completeRunUrl = `${CONFIG.baseUrl}/${CONFIG.project}/_apis/test/runs/${testRun.id}?api-version=7.1`;

    const completeRunResponse = await fetch(completeRunUrl, {
      method: 'PATCH',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(completeRunPayload)
    });

    if (!completeRunResponse.ok) {
      const errorText = await completeRunResponse.text();

      console.log(`Test run created but failed to complete: ${completeRunResponse.status} - ${errorText}`);
    } else {
      console.log(`Completed test run ID: ${testRun.id}`);
    }

    console.log(`\nSuccessfully created unplanned test execution for TC${numericId}:`);
    console.log(`   - Test Run ID: ${testRun.id}`);
    console.log(`   - Outcome: ${status.toUpperCase()}`);
    console.log(`   - Associated with Plan ID: ${planId} (via comment only)`);
    console.log(`   - Associated with Suite ID: ${suiteId} (via comment only)`);
    console.log(`   - Type: Truly Unplanned (no plan reference)`);    return true;
  } catch (error: any) {
    console.log(`Failed to create test run for TC${numericId}:`, error?.message || error);
    return false;
  }
}

/**
 * Alternative method to update via test results API
 */
async function updateViaTestResults(testPoint: any, numericId: number, status: 'passed' | 'failed', headers: Record<string, string>, executionNotes?: string): Promise<void> {
  try {
    // Create a minimal test run
    const runPayload = {
      name: `Auto Test Run TC${numericId}`,
      automated: true,
      plan: {
        id: testPoint.testPlan?.id || testPoint.planId
      },
      pointIds: [testPoint.id]
    };

    const runUrl = `${CONFIG.baseUrl}/${CONFIG.project}/_apis/test/runs?api-version=7.1`;

    const runResponse = await fetch(runUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(runPayload)
    });

    if (!runResponse.ok) {
      console.log(`Failed to create test run for TC${numericId}: ${runResponse.status}`);
      return;
    }

    const testRun = await runResponse.json();

    // Add test result
    const resultPayload = [{
      testCase: { id: numericId },
      outcome: status === 'passed' ? 'Passed' : 'Failed',
      state: 'Completed',
      comment: executionNotes || `Automated test: ${status}`,
      runBy: {
        displayName: 'Automated Test'
      }
    }];

    const resultUrl = `${CONFIG.baseUrl}/${CONFIG.project}/_apis/test/runs/${testRun.id}/results?api-version=7.1`;

    const resultResponse = await fetch(resultUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(resultPayload)
    });

    if (!resultResponse.ok) {
      console.log(`Failed to add test result for TC${numericId}: ${resultResponse.status}`);
      return;
    }

    // Complete the run
    const completePayload = {
      state: 'Completed'
    };

    const completeUrl = `${CONFIG.baseUrl}/${CONFIG.project}/_apis/test/runs/${testRun.id}?api-version=7.1`;

    const completeResponse = await fetch(completeUrl, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(completePayload)
    });

    if (!completeResponse.ok) {
      console.log(`Failed to complete test run for TC${numericId}: ${completeResponse.status}`);
    }

    console.log(`Test outcome updated via results API: TC${numericId} -> ${status.toUpperCase()}`);
  } catch (error: any) {
    console.log(`Alt method failed for TC${numericId}:`, error?.message || error);
  }
}

/**
 * Parse test case ID from Allure test name format like "[TC7884]"
 * @param testName - The test name from Allure results
 * @returns number | null - The numeric test case ID or null if not found
 */
function extractTestCaseIdFromAllureName(testName: string): number | null {
  // Match pattern like [TC7884] at the beginning of test name
  const match = testName.match(/^\[TC(\d+)\]/i);

  if (match && match[1]) {
    return parseInt(match[1], 10);
  }
  return null;
}

/**
 * Read Allure JSON result files and update Azure DevOps test case statuses
 * @param allureResultsDir - Path to allure-results directory (default: ./allure-results)
 * @returns Promise<{ success: number, failed: number, skipped: number }> - Summary of updates
 */
export async function updateStatusFromAllureResults(
  allureResultsDir: string = './allure-results'
): Promise<{ success: number, failed: number, skipped: number }> {
  console.log(`=== Reading Allure Results from ${allureResultsDir} ===\n`);

  let successCount = 0;
  let failedCount = 0;
  let skippedCount = 0;

  try {
    const allureDir = path.resolve(allureResultsDir);

    if (!fs.existsSync(allureDir)) {
      throw new Error(`Allure results directory not found: ${allureDir}`);
    }

    // Read all JSON files in the directory
    const files = fs.readdirSync(allureDir)
      .filter((file: string) => file.endsWith('-result.json'))
      .map((file: string) => path.join(allureDir, file));

    console.log(`Found ${files.length} Allure result files\n`);

    for (const filePath of files) {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const testResult = JSON.parse(fileContent);

        // Extract test case ID from name field
        const testCaseId = extractTestCaseIdFromAllureName(testResult.name || '');

        if (!testCaseId) {
          console.log(`No test case ID found in: ${testResult.name}`);
          skippedCount++;
          continue;
        }

        // Map Allure status to our status format
        let status: 'passed' | 'failed';

        if (testResult.status === 'passed') {
          status = 'passed';
        } else if (testResult.status === 'failed' || testResult.status === 'broken') {
          status = 'failed';
        } else {
          console.log(`Skipping test case ${testCaseId} with status: ${testResult.status}`);
          skippedCount++;
          continue;
        }

        // Prepare execution notes
        const executionNotes = [
          `Automated test execution completed`,
          `Test duration: ${testResult.stop && testResult.start ?
            Math.round((testResult.stop - testResult.start) / 1000) + 's' : 'N/A'}`,
          `Steps executed: ${testResult.steps?.length || 0}`,
          testResult.statusDetails?.message ? `Details: ${testResult.statusDetails.message}` : ''
        ].filter(note => note).join('\n');

        console.log(`Processing TC${testCaseId}: ${status.toUpperCase()}`);

        // Update Azure DevOps
        const updateSuccess = await updateTestCaseStatus(107558, 107601, testCaseId, status, executionNotes);

        if (updateSuccess) {
          successCount++;
          console.log(`TC${testCaseId} updated successfully\n`);
        } else {
          failedCount++;
          console.log(`TC${testCaseId} update failed\n`);
        }

        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (fileError: any) {
        console.error(`Error processing file ${path.basename(filePath)}:`, fileError?.message || fileError);
        failedCount++;
      }
    }

    console.log(`\n=== Allure Results Processing Complete ===`);
    console.log(`Successfully updated: ${successCount}`);
    console.log(`Failed to update: ${failedCount}`);
    console.log(`Skipped: ${skippedCount}`);    return { success: successCount, failed: failedCount, skipped: skippedCount };
  } catch (error: any) {
    console.error('Error reading Allure results:', error?.message || error);
    throw error;
  }
}

/**
 * Update multiple test case statuses in batch
 * @param testResults - Array of test results with caseId and status
 * @returns Promise<{ success: number, failed: number }> - Summary of update results
 */
export async function updateMultipleTestCaseStatuses(
  testResults: Array<{
    caseId: string | number;
    status: 'passed' | 'failed';
    notes?: string;
  }>
): Promise<{ success: number, failed: number }> {
  console.log(`=== Updating ${testResults.length} Test Case Statuses ===\n`);

  let successCount = 0;
  let failedCount = 0;

  for (const testResult of testResults) {
    const success = await updateTestCaseStatus(107558, 107601,
      testResult.caseId,
      testResult.status,
      testResult.notes
    );

    if (success) {
      successCount++;
    } else {
      failedCount++;
    }

    // Add small delay between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n=== Batch Update Complete ===`);
  console.log(`Success: ${successCount}`);
  console.log(`Failed: ${failedCount}`);  return { success: successCount, failed: failedCount };
}

/**
 * Call this function with a test case ID to fetch from Azure DevOps and generate markdown
 * @param testCaseId - The Azure DevOps work item ID in various formats (e.g., 7753, "TC7753", "[TC7753]")
 * @returns Promise<string> - Path to generated markdown file
 */
export async function readTestCaseFromTestID(testCaseId: string | number): Promise<string> {
  const numericId = parseTestCaseId(testCaseId);

  console.log(`=== Fetching Test Case ${numericId} from Azure DevOps ===\n`);

  try {
    // Fetch from API
    const url = `${CONFIG.baseUrl}/${CONFIG.project}/_apis/wit/workitems/${numericId}?api-version=7.1`;

    const headers: Record<string, string> = {
      'Authorization': `Bearer ${CONFIG.token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (CONFIG.cookie) {
      headers['Cookie'] = CONFIG.cookie;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const workItem = await response.json();

    console.log(`Successfully fetched work item: ${workItem.fields['System.Title']}`);

    // Parse and generate markdown
    const testCase = parseWorkItem(workItem);

    console.log(`Test Case: ${testCase.title}`);
    console.log(`Number of steps: ${testCase.steps.length}`);
    console.log(`Tags: ${testCase.tags.length > 0 ? testCase.tags.join(', ') : 'None'}\n`);

    const markdownContent = generateMarkdownContent(testCase, numericId);
    const outputFile = saveMarkdownFile(markdownContent, numericId);

    return outputFile;
  } catch (error) {
    console.error('Failed to fetch or parse work item:', error);
    throw error;
  }
}

/**
 * Get test case IDs by querying Azure DevOps work items with matching tags
 * @param customFieldValues - Array of custom field values from JIRA (e.g., ["Service Jobs - SVJB", "Regression"])
 * @returns Promise<number[]> - Array of test case work item IDs
 */
export async function getTestCaseIdsByTags(customFieldValues: string[]): Promise<number[]> {
  console.log(`=== Querying Azure DevOps Test Cases by Tags ===`);
  console.log(`Tags to search: ${JSON.stringify(customFieldValues)}\n`);

  if (!customFieldValues || customFieldValues.length === 0) {
    console.log('No custom field values provided, returning empty array');
    return [];
  }

  try {
    // Build WIQL query with dynamic OR conditions for tags
    const tagConditions = customFieldValues
      .map(tag => `[System.Tags] CONTAINS '${tag.replace(/'/g, "''")}'`) // Escape single quotes
      .join(' OR ');

    const wiqlQuery = `
      SELECT [System.Id], [System.Title]
      FROM WorkItems
      WHERE
          [System.WorkItemType] = 'Test Case'
          AND (${tagConditions})
      ORDER BY [System.Id]
    `;

    console.log('WIQL Query:');
    console.log(wiqlQuery);
    console.log('');

    // Prepare request payload
    const requestPayload = {
      query: wiqlQuery
    };

    // API endpoint for WIQL query
    const url = `${CONFIG.baseUrl}/${CONFIG.project}/_apis/wit/wiql?api-version=7.0`;

    const headers: Record<string, string> = {
      'Authorization': `Bearer ${CONFIG.token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (CONFIG.cookie) {
      headers['Cookie'] = CONFIG.cookie;
    }

    // Execute WIQL query
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(`WIQL query failed: ${response.status} ${response.statusText}\nResponse: ${errorText}`);
    }

    const queryResult = await response.json();

    // Extract work item IDs from the result
    const testCaseIds: number[] = [];

    if (queryResult.workItems && Array.isArray(queryResult.workItems)) {
      for (const workItem of queryResult.workItems) {
        if (workItem.id) {
          testCaseIds.push(workItem.id);
        }
      }
    }

    console.log(`Found ${testCaseIds.length} test cases matching the tags:`);
    testCaseIds.forEach((id, index) => {
      console.log(`${index + 1}. Test Case ID: ${id}`);
    });
    console.log(`\nTest Case IDs Array: ${JSON.stringify(testCaseIds)}`);    return testCaseIds;
  } catch (error: any) {
    console.error(`Failed to query test cases by tags:`, error?.message || error);
    throw error;
  }
}

/**
 * Get detailed test case information by tags (combines getTestCaseIdsByTags with work item details)
 * @param customFieldValues - Array of custom field values from JIRA
 * @returns Promise<Array<{id: number, title: string, tags: string[]}>> - Array of detailed test case info
 */
export async function getTestCaseDetailsByTags(
  customFieldValues: string[]
): Promise<Array<{id: number, title: string, tags: string[]}>> {
  console.log(`=== Getting Detailed Test Cases by Tags ===\n`);

  try {
    // First get the test case IDs
    const testCaseIds = await getTestCaseIdsByTags(customFieldValues);

    if (testCaseIds.length === 0) {
      console.log('No test cases found');
      return [];
    }

    // Fetch detailed information for each test case
    const testCaseDetails: Array<{id: number, title: string, tags: string[]}> = [];

    console.log(`\nFetching details for ${testCaseIds.length} test cases...\n`);

    for (const id of testCaseIds) {
      try {
        const url = `${CONFIG.baseUrl}/${CONFIG.project}/_apis/wit/workitems/${id}?fields=System.Title,System.Tags&api-version=7.1`;

        const headers: Record<string, string> = {
          'Authorization': `Bearer ${CONFIG.token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        };

        if (CONFIG.cookie) {
          headers['Cookie'] = CONFIG.cookie;
        }

        const response = await fetch(url, {
          method: 'GET',
          headers: headers
        });

        if (!response.ok) {
          console.log(`Failed to fetch details for Test Case ${id}: ${response.status} ${response.statusText}`);
          continue;
        }

        const workItem = await response.json();

        const title = workItem.fields['System.Title'] || 'Unknown';
        const tagsString = workItem.fields['System.Tags'] || '';
        const tags = tagsString
          .split(';')
          .map((tag: string) => tag.trim())
          .filter((tag: string) => tag.length > 0);

        testCaseDetails.push({
          id: id,
          title: title,
          tags: tags
        });

        console.log(`${testCaseDetails.length}. TC${id}: ${title}`);
        if (tags.length > 0) {
          console.log(`   Tags: ${tags.join(', ')}`);
        }
        console.log('');

        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error: any) {
        console.error(`Error fetching details for Test Case ${id}:`, error?.message || error);
      }
    }

    console.log(`\n=== Summary ===`);
    console.log(`Total test cases found: ${testCaseDetails.length}`);    return testCaseDetails;
  } catch (error: any) {
    console.error(`Failed to get test case details by tags:`, error?.message || error);
    throw error;
  }
}

/**
 * Find which suite contains a specific test case within a given plan
 * @param planId - Azure DevOps Test Plan ID
 * @param testCaseId - Test Case ID to search for
 * @returns Promise<number | null> - Suite ID if found, null if not found
 */
export async function findSuiteIdByTestCase(planId: number, testCaseId: number): Promise<number | null> {
  console.log(`=== Finding Suite ID for Test Case ${testCaseId} in Plan ${planId} ===`);

  try {
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${CONFIG.token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (CONFIG.cookie) {
      headers['Cookie'] = CONFIG.cookie;
    }

    // Step 1: Get all suites in the test plan
    const suitesUrl = `${CONFIG.baseUrl}/${CONFIG.project}/_apis/testplan/Plans/${planId}/suites?api-version=7.1`;

    console.log(`Fetching suites from plan ${planId}...`);

    const suitesResponse = await fetch(suitesUrl, {
      method: 'GET',
      headers: headers
    });

    if (!suitesResponse.ok) {
      const errorText = await suitesResponse.text();

      throw new Error(`Failed to fetch suites: ${suitesResponse.status} ${suitesResponse.statusText}\nResponse: ${errorText}`);
    }

    const suitesData = await suitesResponse.json();
    const suites = suitesData.value || [];

    console.log(`Found ${suites.length} suites in plan ${planId}`);

    if (suites.length === 0) {
      console.log('No suites found in the plan');
      return null;
    }

    // Step 2: Check each suite for the test case
    for (const suite of suites) {
      const suiteId = suite.id;

      console.log(`Checking suite ${suiteId} (${suite.name || 'Unnamed'})...`);

      try {
        // Get test cases in this suite
        const suiteTestCasesUrl = `${CONFIG.baseUrl}/${CONFIG.project}/_apis/testplan/Plans/${planId}/Suites/${suiteId}/TestCase?api-version=7.1`;

        const testCasesResponse = await fetch(suiteTestCasesUrl, {
          method: 'GET',
          headers: headers
        });

        if (!testCasesResponse.ok) {
          console.log(`  Failed to fetch test cases for suite ${suiteId}: ${testCasesResponse.status}`);
          continue;
        }

        const testCasesData = await testCasesResponse.json();
        const testCases = testCasesData.value || [];

        console.log(`  Suite ${suiteId} contains ${testCases.length} test cases`);

        // Check if our test case is in this suite
        const foundTestCase = testCases.find((tc: any) => {
          const tcId = tc.testCase?.id || tc.workItem?.id;

          return tcId == testCaseId || tcId == testCaseId.toString();
        });

        if (foundTestCase) {
          console.log(`Found test case ${testCaseId} in suite ${suiteId} (${suite.name || 'Unnamed'})`);
          return suiteId;
        }

        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (suiteError: any) {
        console.log(`  Error checking suite ${suiteId}: ${suiteError?.message}`);
        continue;
      }
    }

    console.log(`Test case ${testCaseId} not found in any suite of plan ${planId}`);
    return null;
  } catch (error: any) {
    console.error(`Error searching for test case ${testCaseId} in plan ${planId}:`, error?.message || error);
    throw error;
  }
}

/**
 * Fetch all test cases from child suites under a parent suite, saving all into a single markdown file.
 * If the parent suite has no children, fetches TCs directly from it.
 * @param planId - Azure DevOps Test Plan ID (e.g. 3198)
 * @param parentSuiteId - Parent suite ID (e.g. 60480)
 * @returns Promise<string> - Path to the generated combined markdown file
 *
 * Usage: npx tsx azure.ts fetch-suite 3198 60480
 */
export async function readTestCasesFromSuite(planId: number, parentSuiteId: number): Promise<string> {
  console.log(`=== Fetching Test Cases from Plan ${planId}, Parent Suite ${parentSuiteId} ===\n`);

  const headers: Record<string, string> = {
    'Authorization': `Bearer ${CONFIG.token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  if (CONFIG.cookie) headers['Cookie'] = CONFIG.cookie;

  // 1. Get all suites in the plan, filter to direct children of parentSuiteId
  const suitesUrl = `${CONFIG.baseUrl}/${CONFIG.project}/_apis/testplan/Plans/${planId}/suites?api-version=7.1`;
  const suitesRes = await fetch(suitesUrl, { method: 'GET', headers });
  if (!suitesRes.ok) throw new Error(`Failed to fetch suites: ${suitesRes.status} ${suitesRes.statusText}`);

  const suitesData: any = await suitesRes.json();
  const childSuites: any[] = (suitesData.value ?? []).filter((s: any) => s.parentSuite?.id === parentSuiteId);

  console.log(`Found ${childSuites.length} child suites under suite ${parentSuiteId}`);

  const suitesToProcess = childSuites.length > 0
    ? childSuites
    : [{ id: parentSuiteId, name: `Suite ${parentSuiteId}` }];

  if (childSuites.length === 0) {
    console.log(`No child suites — fetching TCs directly from suite ${parentSuiteId}\n`);
  }

  const sections: string[] = [];
  let total = 0;
  let errors = 0;

  // 2. For each suite, fetch TCs and build markdown sections
  for (const suite of suitesToProcess) {
    console.log(`\nSuite: ${suite.name} (${suite.id})`);

    const tcUrl = `${CONFIG.baseUrl}/${CONFIG.project}/_apis/testplan/Plans/${planId}/Suites/${suite.id}/TestCase?api-version=7.1`;
    const tcRes = await fetch(tcUrl, { method: 'GET', headers });

    if (!tcRes.ok) {
      console.warn(`  Warning: could not fetch TCs for suite ${suite.id}: ${tcRes.status}`);
      continue;
    }

    const tcData: any = await tcRes.json();
    const testCases: any[] = tcData.value ?? [];
    console.log(`  → ${testCases.length} test cases`);

    for (const tc of testCases) {
      const tcId = Number(tc.testCase?.id ?? tc.workItem?.id);
      if (!tcId) continue;

      try {
        const wiUrl = `${CONFIG.baseUrl}/${CONFIG.project}/_apis/wit/workitems/${tcId}?api-version=7.1`;
        const wiRes = await fetch(wiUrl, { method: 'GET', headers });
        if (!wiRes.ok) throw new Error(`${wiRes.status} ${wiRes.statusText}`);

        const workItem = await wiRes.json();
        const testCase = parseWorkItem(workItem);
        sections.push(generateMarkdownContent(testCase, tcId));
        process.stdout.write('.');
        total++;
      } catch (err: any) {
        process.stdout.write('x');
        errors++;
        console.error(`\n  Error TC${tcId}: ${err.message}`);
      }

      await new Promise(r => setTimeout(r, 150));
    }
    console.log();
  }

  // 3. Save all sections into a single file
  const outputDir = path.join(__dirname, '../../../output');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const outputFile = path.join(outputDir, `suite-${parentSuiteId}.md`);
  fs.writeFileSync(outputFile, sections.join('\n\n---\n\n'), 'utf8');

  console.log(`\n=== Done ===`);
  console.log(`Saved:  ${total} test cases → ${outputFile}`);
  if (errors) console.log(`Errors: ${errors}`);

  return outputFile;
}

// Alias for backward compatibility
export const getTestCaseFromApi = readTestCaseFromTestID;

// Main execution handler for command line usage
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length >= 2) {
    const command = args[0].toLowerCase();

    if (command === 'query-by-tags') {
      // Command: npx tsx azure.ts query-by-tags "Service Jobs - SVJB" "Regression"
      const tags = args.slice(1);

      console.log(`Querying test cases by tags: ${JSON.stringify(tags)}\n`);

      getTestCaseDetailsByTags(tags)
        .then(testCases => {
          console.log(`\n=== FINAL RESULT ===`);
          console.log(`Found ${testCases.length} test cases`);
          const ids = testCases.map(tc => tc.id);

          console.log(`Test Case IDs: ${JSON.stringify(ids)}`);
        })
        .catch(error => {
          console.error('Query failed:', error?.message || error);
          process.exit(1);
        });
    } else if (command === 'fetch-suite') {
      // Command: npx tsx azure.ts fetch-suite <planId> <parentSuiteId>
      // Example: npx tsx azure.ts fetch-suite 3198 60480
      const planId = parseInt(args[1], 10);
      const parentSuiteId = parseInt(args[2], 10);

      if (isNaN(planId) || isNaN(parentSuiteId)) {
        console.error('Error: Both planId and parentSuiteId must be valid numbers');
        console.error('Usage: npx tsx azure.ts fetch-suite <planId> <parentSuiteId>');
        console.error('Example: npx tsx azure.ts fetch-suite 3198 60480');
        process.exit(1);
      }

      readTestCasesFromSuite(planId, parentSuiteId)
        .then(file => {
          console.log(`\nOutput: ${file}`);
        })
        .catch(error => {
          console.error('fetch-suite failed:', error?.message || error);
          process.exit(1);
        });
    } else if (command === 'find-suite') {
      // Command: npx tsx azure.ts find-suite <planId> <testCaseId>
      // Example: npx tsx azure.ts find-suite 107558 107370
      const planId = parseInt(args[1], 10);
      const testCaseId = parseInt(args[2], 10);

      if (isNaN(planId) || isNaN(testCaseId)) {
        console.error('Error: Both planId and testCaseId must be valid numbers');
        console.error('Usage: npx tsx azure.ts find-suite <planId> <testCaseId>');
        console.error('Example: npx tsx azure.ts find-suite 107558 107370');
        process.exit(1);
      }

      console.log(`Finding suite for Test Case ${testCaseId} in Plan ${planId}...\n`);

      findSuiteIdByTestCase(planId, testCaseId)
        .then(suiteId => {
          if (suiteId) {
            console.log(`\nSUCCESS: Test Case ${testCaseId} found in Suite ${suiteId}`);
            console.log(`\nComplete Info:`);
            console.log(`   Plan ID: ${planId}`);
            console.log(`   Suite ID: ${suiteId}`);
            console.log(`   Test Case ID: ${testCaseId}`);
            console.log(`\nUsage Example:`);
            console.log(`   await updateTestCaseStatus(${planId}, ${suiteId}, ${testCaseId}, 'passed', 'Test completed successfully');`);
          } else {
            console.log(`\nTest Case ${testCaseId} not found in any suite of Plan ${planId}`);
            console.log(`\nPossible reasons:`);
            console.log(`   1. Test case doesn't exist in this plan`);
            console.log(`   2. Test case exists but not assigned to any suite`);
            console.log(`   3. Invalid plan ID or test case ID`);
            process.exit(1);
          }
        })
        .catch(error => {
          console.error('\nSearch failed:', error?.message || error);
          process.exit(1);
        });
    } else if (args[1] && (args[1].toLowerCase() === 'passed' || args[1].toLowerCase() === 'failed')) {
      // Command line: npx tsx azure.ts 107364 PASSED [planId] [suiteId]
      const testCaseId = args[0];
      const status = args[1].toLowerCase();
      const planId = args[2] ? parseInt(args[2], 10) : undefined;
      const suiteId = args[3] ? parseInt(args[3], 10) : undefined;

      updateTestCaseStatus(107558, 107601, testCaseId, status as 'passed' | 'failed', undefined)
        .then(success => {
          if (success) {
            let message = `\nTest case ${testCaseId} status updated to ${status.toUpperCase()}`;

            if (planId) message += ` in Plan ID ${planId}`;
            if (suiteId) message += ` Suite ID ${suiteId}`;
            console.log(message);
          } else {
            console.error(`\nFailed to update test case ${testCaseId}`);
            process.exit(1);
          }
        })
        .catch(error => {
          console.error('Update failed:', error?.message || error);
          process.exit(1);
        });
    } else {
      console.error('Invalid command or status');
      console.error('Usage:');
      console.error('  npx tsx azure.ts query-by-tags "Service Jobs - SVJB" "Regression"');
      console.error('  npx tsx azure.ts find-suite <planId> <testCaseId>');
      console.error('  npx tsx azure.ts <testCaseId> <status> [planId] [suiteId]');
      console.error('');
      console.error('Examples:');
      console.error('  npx tsx azure.ts find-suite 107558 107370');
      console.error('  npx tsx azure.ts 107364 PASSED 107558 107601');
      process.exit(1);
    }
  } else if (args.length === 1) {
    // Single argument: generate markdown for test case
    readTestCaseFromTestID(args[0]).catch(console.error);
  } else {
    // Default demo execution
    console.log('Usage examples:');
    console.log('  npx tsx azure.ts query-by-tags "Service Jobs - SVJB" "Regression"');
    console.log('  npx tsx azure.ts find-suite 107558 107370');
    console.log('  npx tsx azure.ts 107364 PASSED 107558 107601');
    console.log('  npx tsx azure.ts "[TC7753]"');
    console.log('');
    console.log('Commands:');
    console.log('  fetch-suite     - Fetch all TCs from child suites and generate markdown files');
    console.log('  query-by-tags   - Find test cases by tags');
    console.log('  find-suite      - Find which suite contains a test case');
    console.log('  <id> <status>   - Update test case status');
    console.log('  <id>            - Generate markdown for test case');
  }
}
