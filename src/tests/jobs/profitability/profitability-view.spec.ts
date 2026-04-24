import { test } from '../../../fixtures/combined.fixture';
import { LoginPage } from '../../../pages/LoginPage';
import { JobDetailsPage } from '../../../pages/Jobs/JobDetailsPage';
import { SystemSetupPage } from '../../../pages/Settings/SystemSetupPage';
import { BasePage } from '../../../pages/BasePage';
import { createBasicApiJobData } from '../../../data/apiData/job.api.data';

test.describe('Profitability – Detail/Costs Tab – Profit Overview Section', () => {
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
    await systemSetupPage.configureJobProfitabilityView('Detailed with Cost Breakdown View');

    if (!redirectUrl) {
      redirectUrl = await BasePage.createJobAndGetRedirectUrl(jobService, createBasicApiJobData());
    }
    await jobDetailsPage.navigateToJob(redirectUrl);
  });

  test('[TC_12_RQ4] @Smoke @Regression: [Profitability – Detail/Costs Tab] Verify "Profit Overview" section displays correct details when expanded', async () => {
    await jobDetailsPage.switchToTab('Details');
    await jobDetailsPage.assertProfitabilitySectionVisible();
    await jobDetailsPage.expandProfitOverview('Details');
    await jobDetailsPage.assertProfitOverviewSubsectionsVisible('Details');

    await jobDetailsPage.switchToTab('Costs');
    await jobDetailsPage.assertProfitabilitySectionVisible();
    await jobDetailsPage.expandProfitOverview('Costs');
    await jobDetailsPage.assertProfitOverviewSubsectionsVisible('Costs');
  });

  test('[TC_13_RQ4] @Smoke @Regression: [Profitability – Detail/Costs Tab] Verify "Cost Breakdown by Category" section when expanded displays correct columns', async () => {
    await jobDetailsPage.switchToTab('Details');
    await jobDetailsPage.assertProfitabilitySectionVisible();
    await jobDetailsPage.expandCostBreakdownByCategory('Details');
    await jobDetailsPage.assertCostBreakdownByCategoryColumnsVisible('Details');

    await jobDetailsPage.switchToTab('Costs');
    await jobDetailsPage.assertProfitabilitySectionVisible();
    await jobDetailsPage.expandCostBreakdownByCategory('Costs');
    await jobDetailsPage.assertCostBreakdownByCategoryColumnsVisible('Costs');
  });
});
