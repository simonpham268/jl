import { test, expect } from '../../../fixtures/combined.fixture';
import { LoginPage } from '../../../pages/LoginPage';
import { JobDetailsPage } from '../../../pages/Jobs/JobDetailsPage';
import type { JobDetailTab } from '../../../pages/Jobs/JobDetailsPage';
import { SystemSetupPage } from '../../../pages/Settings/SystemSetupPage';
import { createBasicApiJobData } from '../../../data/apiData/job.api.data';

async function forEachTab<T extends JobDetailTab>(
  jobDetailsPage: JobDetailsPage,
  tabs: T[],
  fn: (tab: T) => Promise<void>,
) {
  for (const tab of tabs) {
    await jobDetailsPage.switchToTab(tab);
    await fn(tab);
  }
}

test.describe('Profitability – Detail/Costs Tab', () => {
  let loginPage: LoginPage;
  let jobDetailsPage: JobDetailsPage;
  let systemSetupPage: SystemSetupPage;
  let redirectUrl: string;

  test.beforeEach(async ({ page, jobService }) => {
    loginPage = new LoginPage(page);
    systemSetupPage = new SystemSetupPage(page);
    jobDetailsPage = new JobDetailsPage(page);

    await loginPage.goToBaseURL();
    await systemSetupPage.navigateToSystemSetup();

    if (!redirectUrl) {
      redirectUrl = await JobDetailsPage.createJobAndGetRedirectUrl(
        jobService,
        createBasicApiJobData(),
      );
    }
  });

  test.describe('Detailed with Cost Breakdown View', () => {
    test.beforeEach(async () => {
      await systemSetupPage.configureJobProfitabilityView(
        'Detailed with Cost Breakdown View',
      );
      await jobDetailsPage.navigateToJob(redirectUrl);
    });

    test('[TC_06_RQ4 TC_09_RQ4] @Smoke @Regression: [Job Detail/Job Cost] Verify "Detailed with Cost Breakdown View" layout is displayed when selected', async () => {
      await forEachTab(jobDetailsPage, ['Details', 'Costs'], async (tab) => {
        await expect(jobDetailsPage.profitabilitySection).toBeVisible();
        const loc = jobDetailsPage.getProfitLocators(tab);
        await expect(loc.profitOverviewSection).toBeVisible();
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

    test('[TC_27_RQ4] @Smoke @Regression: [Profitability – Detail/Costs Tab] Job Profitability Include WIP – Verify UI and popup for "Variable Target Profit Margin"', async () => {
      await forEachTab(jobDetailsPage, ['Details', 'Costs'], async (tab) => {
        await jobDetailsPage.expandProfitOverview(tab);
        const loc = jobDetailsPage.getProfitLocators(tab);
        await expect(loc.variableTargetProfitMarginAddButton).toBeVisible();
        await jobDetailsPage.clickAddVariableTargetProfitMargin(tab);
        await expect(jobDetailsPage.variableTargetProfitMarginModal).toBeVisible();
        await expect(jobDetailsPage.variableTargetProfitMarginPercentInput).toBeVisible();
        await expect(jobDetailsPage.variableTargetProfitMarginModalSaveButton).toBeVisible();
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
});
