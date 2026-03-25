import { test as base } from '@playwright/test';
import { ApiClient } from '../api/base/ApiClient';
import { CustomerService, JobService, SiteService, AssetService, QuoteService, PPMQuoteService } from '../api/services';
import { findSuiteIdByTestCase, updateTestCaseStatus } from '../utils/azured-devops/azure';
import { requireEnv } from '../utils/require.env';

// ========================
// Azure DevOps Integration
// ========================

/**
 * Extract test case ID from test name format like "[TC7884]"
 */
function extractTestCaseIdFromTestName(testName: string): number | null {
    const match = testName.match(/^\[TC(\d+)\]/i);
    if (match && match[1]) {
        return parseInt(match[1], 10);
    }
    return null;
}

/**
 * Push test result to Azure DevOps immediately after test completion
 */
async function pushTestResultToAzureDevOps(testInfo: any): Promise<void> {
    try {
        const testCaseId = extractTestCaseIdFromTestName(testInfo.title);

        if (!testCaseId) {
            console.log(`No test case ID found in: ${testInfo.title}`);
            return;
        }

        // Map Playwright status to Azure DevOps status
        let status: 'passed' | 'failed';
        if (testInfo.status === 'passed') {
            status = 'passed';
        } else if (testInfo.status === 'failed' || testInfo.status === 'timedOut') {
            status = 'failed';
        } else {
            console.log(`Skipping TC${testCaseId} with status: ${testInfo.status}`);
            return;
        }

        // Create execution notes
        const executionNotes = [
            `Automated test execution completed`,
            `Test duration: ${testInfo.duration}ms`,
            `Project: ${testInfo.project?.name || 'Unknown'}`,
            testInfo.error?.message ? `Error: ${testInfo.error.message}` : ''
        ].filter(note => note).join('\n');

        // Get Plan ID first
        const planId = parseInt(requireEnv('PLAN_ID'), 10);

        console.log(`Updating TC${testCaseId} status: ${status.toUpperCase()} in Azure DevOps...`);
        console.log(`   Plan ID: ${planId}, Suite ID: TBD`);
        console.log(`   Duration: ${testInfo.duration}ms, Project: ${testInfo.project?.name || 'Unknown'}`);
        
        if (testInfo.error?.message) {
            console.log(`   Error Details: ${testInfo.error.message.substring(0, 200)}...`);
        }

        // Find suite ID for the test case
        const suiteId = await findSuiteIdByTestCase(planId, testCaseId);
        
        if (!suiteId) {
            console.log(`WARNING: Suite ID not found for TC${testCaseId} - skipping Azure DevOps update`);
            return;
        }
        
        console.log(`Found TC${testCaseId} in Suite ${suiteId} - proceeding with update`);
        
        // Add delay to prevent API throttling and ensure proper sequencing
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Update Azure DevOps with proper awaiting to prevent race conditions
        try {
            const updateResult = await updateTestCaseStatus(planId, suiteId, testCaseId, status, executionNotes);
            
            if (updateResult) {
                console.log(`SUCCESS: TC${testCaseId} status updated successfully: ${status.toUpperCase()}`);
            } else {
                console.log(`ERROR: TC${testCaseId} status update failed - check Azure DevOps API response`);
            }
        } catch (updateError: any) {
            console.error(`CRITICAL ERROR updating TC${testCaseId}:`, updateError?.message || updateError);
        }

    } catch (error) {
        console.error(`Error pushing test result to Azure DevOps:`, error);
    }
}

// ========================
// API Fixtures
// ========================

// Define the fixture types
interface CombinedFixtures {
    apiClient: ApiClient;
    jobService: JobService;
    customerService: CustomerService;
    siteService: SiteService;
    assetService: AssetService;
    quoteService: QuoteService;
    ppmQuoteService: PPMQuoteService;
}

// Extend base test with API fixtures + Azure DevOps integration
export const test = base.extend<CombinedFixtures>({

    // API client (auto-loads auth from storage)
    apiClient: async ({ request }, use) => {
        const client = new ApiClient(request);
        await use(client);
    },

    // Job service
    jobService: async ({ apiClient }, use) => {
        await use(new JobService(apiClient));
    },

    customerService: async ({ apiClient }, use) => {
        await use(new CustomerService(apiClient));
    },

    siteService: async ({ apiClient }, use) => {
        await use(new SiteService(apiClient));
    },

    assetService: async ({ apiClient }, use) => {
        await use(new AssetService(apiClient));
    },

    quoteService: async ({ apiClient }, use) => {
        await use(new QuoteService(apiClient));
    },

    ppmQuoteService: async ({ apiClient }, use) => {
        await use(new PPMQuoteService(apiClient));
    }
});

export { expect } from '@playwright/test';

// ========================
// Azure DevOps Auto-Push
// ========================

// Check if running on CI environment
const isCI = process.env.CI === 'true' || process.env.TF_BUILD === 'True';

// Setup automatic result pushing after each test (only on CI)
test.afterEach(async ({}, testInfo) => {
    if (!isCI) {
        return;
    }
    // Add a small delay to ensure test state is properly finalized
    await new Promise(resolve => setTimeout(resolve, 1000));
    await pushTestResultToAzureDevOps(testInfo);
});
