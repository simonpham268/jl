import { test, expect } from '../../../fixtures/combined.fixture';
import { LoginPage } from '../../../pages/LoginPage';
import { JobDetailsPage } from '../../../pages/Jobs/JobDetailsPage';
import type { JobDetailTab, ProfitabilityTab } from '../../../pages/Jobs/JobDetailsPage';
import { SystemSetupPage } from '../../../pages/Settings/SystemSetupPage';
import { createJobTestData } from '../../../data/apiData/job.api.data';

const COST_BREAKDOWN_CATEGORIES = ['Labour', 'Overtime', 'Travel', 'Mileage', 'Material', 'Expenses', 'Call-out', 'Other', 'Subcontractor', 'Schedule of Rates'] as const;

async function forEachTab<T extends JobDetailTab>(jobDetailsPage: JobDetailsPage, tabs: T[], fn: (tab: T) => Promise<void>) {
  for (const tab of tabs) {
    await jobDetailsPage.switchToTab(tab);
    await fn(tab);
  }
}

let loginPage: LoginPage;
let jobDetailsPage: JobDetailsPage;
let systemSetupPage: SystemSetupPage;
let redirectUrl: string;

test.beforeEach(async ({ page, jobService, customerService }) => {
  loginPage = new LoginPage(page);
  systemSetupPage = new SystemSetupPage(page);
  jobDetailsPage = new JobDetailsPage(page);

  await loginPage.goToBaseURL();
  await systemSetupPage.navigateToSystemSetup();

  if (!redirectUrl) {
    const jobData = await createJobTestData(jobService, customerService);
    redirectUrl = await JobDetailsPage.createJobAndGetRedirectUrl(jobService, jobData);
  }
});

test.describe('Detailed with Cost Breakdown View', () => {
  test.beforeEach(async () => {
    await systemSetupPage.configureJobProfitabilityView('Detailed with Cost Breakdown View');
    await jobDetailsPage.navigateToJob(redirectUrl);
  });

  test.describe('Profit Overview - Quoted Profitability', () => {
    test('[TC_06_RQ4 TC_09_RQ4] @Smoke @Regression: [Job Detail/Job Cost] Verify "Detailed with Cost Breakdown View" layout is displayed when selected', async () => {
      await forEachTab(jobDetailsPage, ['Details', 'Costs'], async (tab) => {
        await expect(jobDetailsPage.profitabilitySection).toBeVisible();
        const loc = jobDetailsPage.getProfitLocators(tab);
        await expect(loc.profitOverviewSection).toBeVisible();
        await expect(loc.costBreakdownByCategorySection).toBeVisible();
      });
    });

    test('[TC_11_RQ4] @Smoke @Regression: [Profitability – Detail/Costs Tab] Verify Profitability sections are displayed when collapsed in Detailed view', async () => {
      await forEachTab(jobDetailsPage, ['Details', 'Costs'], async (tab) => {
        await jobDetailsPage.collapseProfitOverview(tab);
        const loc = jobDetailsPage.getProfitLocators(tab);
        await expect(loc.profitOverviewSection).toBeVisible();
        await expect(loc.collapsedSummary).toBeVisible();
        await expect(loc.collapsedSummary).toContainText('Quoted:');
        await expect(loc.collapsedSummary).toContainText('Current:');
        await expect(loc.collapsedSummary).toContainText('Actuals:');
        await expect(loc.costBreakdownByCategorySection).toBeVisible();
      });
    });

    test('[TC_12_RQ4] @Smoke @Regression: [Profitability – Detail/Costs Tab] Verify "Profit Overview" section displays correct details when expanded', async () => {
      await forEachTab(jobDetailsPage, ['Details', 'Costs'], async (tab) => {
        await jobDetailsPage.expandProfitOverview(tab);
        const loc = jobDetailsPage.getProfitLocators(tab);
        await expect(loc.quotedProfitabilitySection).toBeVisible();
        await expect(loc.profitabilityIncludeWIPSection).toBeVisible();
        await expect(loc.profitabilityActualsOnlySection).toBeVisible();
      });
    });
  });

  test.describe('Profit Overview - Job Profitability Include WIP', () => {
    test('[TC_27_RQ4] @Smoke @Regression: [Profitability – Detail/Costs Tab] Job Profitability Include WIP – Verify UI and popup for "Variable Target Profit Margin"', async () => {
      await forEachTab(jobDetailsPage, ['Details', 'Costs'], async (tab) => {
        await jobDetailsPage.expandProfitOverview(tab);
        const loc = jobDetailsPage.getProfitLocators(tab);
        await expect(loc.targetProfitMarginAddButton).toBeVisible();
        await jobDetailsPage.clickAddVariableTargetProfitMargin(tab);
        await expect(jobDetailsPage.targetProfitMarginModal).toBeVisible();
        await expect(jobDetailsPage.targetProfitMarginPercentInput).toBeVisible();
        await expect(jobDetailsPage.targetProfitMarginModalSaveButton).toBeVisible();
      });
    });

    test('[TC_28_RQ4] @Regression: [Profitability – Detail/Costs Tab] Variable Target Profit Margin – Validate valid and invalid inputs', async ({ page }) => {
      const tab = 'Details' as const;
      await jobDetailsPage.expandProfitOverview(tab);
      const loc = jobDetailsPage.getProfitLocators(tab);

      // Valid input: enter 20, save → toast success + display value
      await jobDetailsPage.clickAddVariableTargetProfitMargin(tab);
      await expect.soft(jobDetailsPage.targetProfitMarginModal).toBeVisible();
      await jobDetailsPage.targetProfitMarginPercentInput.fill('20');
      await jobDetailsPage.targetProfitMarginModalSaveButton.click();
      await expect.soft(jobDetailsPage.toastSuccessMessage).toContainText('Target margin saved successfully');
      await expect.soft(jobDetailsPage.targetProfitMarginModal).toBeHidden();
      await expect.soft(loc.targetProfitMarginDisplayValue).toContainText('20.00%');

      // Invalid inputs
      const invalidCases: Array<{ value: string; expectRangeError: boolean; expectMessage?: string }> = [
        { value: '-1', expectRangeError: true },
        { value: '101', expectRangeError: true },
        { value: '1e3', expectRangeError: true },
        { value: 'e', expectRangeError: false, expectMessage: 'Please enter a valid numeric value' },
        { value: '1e', expectRangeError: false, expectMessage: 'Please enter a valid numeric value' },
        { value: '', expectRangeError: false, expectMessage: 'Please enter a valid numeric value' },
      ];

      for (const { value, expectRangeError, expectMessage } of invalidCases) {
        await test.step(`Test invalid input: "${value || '(empty)'}"`, async () => {
          if (!await jobDetailsPage.targetProfitMarginModal.isVisible()) {
            await jobDetailsPage.clickAddVariableTargetProfitMargin(tab);
            await expect.soft(jobDetailsPage.targetProfitMarginModal).toBeVisible();
          }
          await jobDetailsPage.targetProfitMarginPercentInput.fill('');
          if (value) await jobDetailsPage.targetProfitMarginPercentInput.pressSequentially(value);
          await jobDetailsPage.targetProfitMarginModalSaveButton.click();
          await expect.soft(jobDetailsPage.toastErrorMessage).toBeVisible();
          if (expectRangeError) {
            await expect.soft(jobDetailsPage.toastErrorMessage).toContainText('Target margin must be between 0% and 100%');
          }
          if (expectMessage) {
            await expect.soft(jobDetailsPage.toastErrorMessage).toContainText(expectMessage);
          }
          await page.locator('#toast-container .toast-error').waitFor({ state: 'detached', timeout: 10000 }).catch(() => {});
        });
      }
    });

    /** ID: TC_32_RQ4 Tags: Regression */
    test('[TC_32_RQ4] @Regression: [Profitability – Detail/Costs Tab] Actuals Only – Verify Invoiced (Customer) = £0.00 when no invoice exists', async () => {

      // Verify Approved Invoices in History → Invoice tab = £0.00
      await jobDetailsPage.navigateToInvoiceHistoryTab();
      await expect.soft(jobDetailsPage.approvedInvoicesAmount).toContainText('£0.00');

      // Verify Invoiced (Customer) = £0.00 on both tabs
      const verifyInvoicedCustomer = async (tab: ProfitabilityTab) => {
        await jobDetailsPage.navigateToJob(redirectUrl);
        await jobDetailsPage.switchToTab(tab);
        await jobDetailsPage.expandProfitOverview(tab);
        const loc = jobDetailsPage.getProfitLocators(tab);
        await expect.soft(loc.profitabilityActualsOnlySection).toBeVisible();
        await expect.soft(loc.actualsInvoicedCustomer).toBeVisible();
        await expect.soft(loc.actualsInvoicedCustomer).toContainText('£0.00');
      };

      await verifyInvoicedCustomer('Costs');
      await verifyInvoicedCustomer('Details');
    });
  });

  test.describe('Cost Breakdown by Category', () => {
    test('[TC_13_RQ4] @Smoke @Regression: [Profitability – Detail/Costs Tab] Verify "Cost Breakdown by Category" section when expanded displays correct columns', async () => {
      await forEachTab(jobDetailsPage, ['Details', 'Costs'], async (tab) => {
        await jobDetailsPage.expandCostBreakdownByCategory(tab);
        const loc = jobDetailsPage.getProfitLocators(tab);
        await expect(loc.costBreakdownCategoryColumn).toBeVisible();
        await expect(loc.costBreakdownQuotedColumn).toBeVisible();
        await expect(loc.costBreakdownPOCommittedColumn).toBeVisible();
        await expect(loc.costBreakdownActualColumn).toBeVisible();
        await expect(loc.costBreakdownUnallocatedCostColumn).toBeVisible();
      });
    });

    test('[TC_39_RQ4] @Smoke @Regression: [Profitability – Detail/Costs Tab] Cost Breakdown by Category – Verify categories are displayed correctly', async () => {
      await forEachTab(jobDetailsPage, ['Details', 'Costs'], async (tab) => {
        await jobDetailsPage.expandCostBreakdownByCategory(tab);
        for (const category of COST_BREAKDOWN_CATEGORIES) {
          await expect(jobDetailsPage.getCostBreakdownCategoryRow(tab, category)).toBeVisible();
          await expect(jobDetailsPage.getCostBreakdownValueCells(tab, category)).toHaveText(['–', '–', '–', '–']);
        }
      });
    });
  });
});

test.describe('Profit Summary View', () => {
  test.beforeEach(async () => {
    await systemSetupPage.configureJobProfitabilityView('Profit Summary View');
    await jobDetailsPage.navigateToJob(redirectUrl);
  });

  test('[TC_05_RQ4] @Smoke @Regression:[Job Detail / Job Cost] Verify Profit Summary View layout is displayed when "Profit Summary View" is selected', async () => {
    await forEachTab(jobDetailsPage, ['Details', 'Costs'], async (tab) => {
      await expect(jobDetailsPage.profitabilitySection).toBeVisible();
      const loc = jobDetailsPage.getProfitLocators(tab);
      await expect(loc.profitOverviewSection).toBeHidden();
      await expect(loc.costBreakdownByCategorySection).toBeHidden();
      await jobDetailsPage.expandProfitabilitySection(tab);
      await expect(loc.quotedJobsLabel).toBeVisible();
      await expect(loc.costLabel).toBeVisible();
      await expect(loc.sellLabel).toBeVisible();
      await expect(loc.profitColumnHeader).toBeVisible();
      await expect(loc.profitPercentColumnHeader).toBeVisible();
      await expect(loc.profitMarginColumnHeader).toBeVisible();
    });
  });
});
