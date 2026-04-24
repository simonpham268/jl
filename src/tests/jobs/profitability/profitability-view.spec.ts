import { test, expect } from "../../../fixtures/combined.fixture";
import { LoginPage } from "../../../pages/LoginPage";
import { JobDetailsPage } from "../../../pages/Jobs/JobDetailsPage";
import { SystemSetupPage } from "../../../pages/Settings/SystemSetupPage";
import { createBasicApiJobData } from "../../../data/apiData/job.api.data";

test.describe("Profitability – Detail/Costs Tab – Profit Overview Section", () => {
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
    await systemSetupPage.configureJobProfitabilityView(
      "Detailed with Cost Breakdown View",
    );

    if (!redirectUrl) {
      redirectUrl = await JobDetailsPage.createJobAndGetRedirectUrl(
        jobService,
        createBasicApiJobData(),
      );
    }
    await jobDetailsPage.navigateToJob(redirectUrl);
  });

  test('[TC_06_RQ4] @Smoke @Regression: [Job Detail/Job Cost] Verify "Detailed with Cost Breakdown View" layout is displayed when selected', async () => {
    await jobDetailsPage.switchToTab("Details");
    await expect(jobDetailsPage.profitabilitySection).toBeVisible();
    const detailsLoc = jobDetailsPage.getProfitLocators("Details");
    await expect(detailsLoc.profitOverviewSection).toBeVisible();
    await expect(detailsLoc.costBreakdownByCategorySection).toBeVisible();

    await jobDetailsPage.switchToTab("Costs");
    await expect(jobDetailsPage.profitabilitySection).toBeVisible();
    const costsLoc = jobDetailsPage.getProfitLocators("Costs");
    await expect(costsLoc.profitOverviewSection).toBeVisible();
    await expect(costsLoc.costBreakdownByCategorySection).toBeVisible();
  });

  test('[TC_12_RQ4] @Smoke @Regression: [Profitability – Detail/Costs Tab] Verify "Profit Overview" section displays correct details when expanded', async () => {
    await jobDetailsPage.switchToTab("Details");
    await jobDetailsPage.expandProfitOverview("Details");
    const detailsLoc = jobDetailsPage.getProfitLocators("Details");
    await expect(detailsLoc.quotedProfitabilitySection).toBeVisible();
    await expect(detailsLoc.profitabilityIncludeWIPSection).toBeVisible();
    await expect(detailsLoc.profitabilityActualsOnlySection).toBeVisible();

    await jobDetailsPage.switchToTab("Costs");
    await jobDetailsPage.expandProfitOverview("Costs");
    const costsLoc = jobDetailsPage.getProfitLocators("Costs");
    await expect(costsLoc.quotedProfitabilitySection).toBeVisible();
    await expect(costsLoc.profitabilityIncludeWIPSection).toBeVisible();
    await expect(costsLoc.profitabilityActualsOnlySection).toBeVisible();
  });

  test('[TC_13_RQ4] @Smoke @Regression: [Profitability – Detail/Costs Tab] Verify "Cost Breakdown by Category" section when expanded displays correct columns', async () => {
    await jobDetailsPage.switchToTab("Details");
    await jobDetailsPage.expandCostBreakdownByCategory("Details");
    const detailsLoc = jobDetailsPage.getProfitLocators("Details");
    await expect(detailsLoc.costBreakdownCategoryColumn).toBeVisible();
    await expect(detailsLoc.costBreakdownQuotedColumn).toBeVisible();
    await expect(detailsLoc.costBreakdownPOCommittedColumn).toBeVisible();
    await expect(detailsLoc.costBreakdownActualColumn).toBeVisible();
    await expect(detailsLoc.costBreakdownUnallocatedCostColumn).toBeVisible();

    await jobDetailsPage.switchToTab("Costs");
    await jobDetailsPage.expandCostBreakdownByCategory("Costs");
    const costsLoc = jobDetailsPage.getProfitLocators("Costs");
    await expect(costsLoc.costBreakdownCategoryColumn).toBeVisible();
    await expect(costsLoc.costBreakdownQuotedColumn).toBeVisible();
    await expect(costsLoc.costBreakdownPOCommittedColumn).toBeVisible();
    await expect(costsLoc.costBreakdownActualColumn).toBeVisible();
    await expect(costsLoc.costBreakdownUnallocatedCostColumn).toBeVisible();
  });
});
