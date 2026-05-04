import { test, expect } from '../../../fixtures/combined.fixture';
import { LoginPage } from '../../../pages/LoginPage';
import { JobDetailsPage } from '../../../pages/Jobs/JobDetailsPage';
import type { ProfitabilityTab } from '../../../pages/Jobs/JobDetailsPage';
import { SystemSetupPage } from '../../../pages/Settings/SystemSetupPage';
import { QuoteDetailPage } from '../../../pages/Quotes/QuoteDetailPage';
import { LabourCostModal, PriceType, type LabourCostModel } from '../../../modals/LabourCostModal';
import { parseCurrencyValue } from '../../../utils/currency.util';

function calculateExpectedQuotedCost(costs: readonly number[]): number {
  return -costs.reduce((sum, cost) => sum + cost, 0);
}

function calculateExpectedQuotedSell(sellPerHour: number): number {
  return sellPerHour;
}

const profitabilityTabs: ProfitabilityTab[] = ['Details', 'Costs'];

const labourCostsValues: readonly LabourCostModel[] = [
  {
    description: 'Labour 100',
    costPerHour: 100,
    priceType: PriceType.FIX_PRICE,
    sellPerHour: 1000,
    taxRate: 'S5 (5.00%)',
  },
  {
    description: 'Labour 200',
    costPerHour: 200,
    priceType: PriceType.FIX_PRICE,
    sellPerHour: 0,
    taxRate: 'S5 (5.00%)',
  },
  {
    description: 'Labour 300',
    costPerHour: 300,
    priceType: PriceType.FIX_PRICE,
    sellPerHour: 0,
    taxRate: 'S5 (5.00%)',
  },
] as const;

test.describe('Detailed with Cost Breakdown View', () => {
  let loginPage: LoginPage;
  let jobDetailsPage: JobDetailsPage;
  let systemSetupPage: SystemSetupPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    systemSetupPage = new SystemSetupPage(page);
    jobDetailsPage = new JobDetailsPage(page);

    await loginPage.goToBaseURL();
    await systemSetupPage.navigateToSystemSetup();
    await systemSetupPage.configureJobProfitabilityView(
      'Detailed with Cost Breakdown View',
    );
  });

  test.describe('Profit Overview', () => {
    test.describe('Quoted Profitability', () => {
      let jobId: number | undefined;
      let quoteId: string | number | undefined;
      let quoteDetailPage: QuoteDetailPage;
      let labourModal: LabourCostModal;

      test.beforeEach(async ({ page, quoteService }) => {
        quoteDetailPage = new QuoteDetailPage(page);
        labourModal = new LabourCostModal(page, 'Quote');

        quoteId = await QuoteDetailPage.createQuoteAndGetId(quoteService);
        await quoteDetailPage.navigateTo(quoteId);
        await quoteDetailPage.switchToTab('Prices');
      });

      test.afterEach(async ({ jobService, quoteService }) => {
        if (jobId) await jobService.deleteJob(jobId);
        if (quoteId) await quoteService.deleteQuote(quoteId);
      });

      /** ID: TC_14_RQ4 Tags: Smoke, Regression */
      test(
        '[TC_14_RQ4] @Smoke @Regression: [Profitability - Detail/Costs Tab] Quoted Profitability - Verify Quoted Costs calculation',
        async ({ page }) => {
          await labourModal.addLabourCosts(labourCostsValues);
          jobId = await QuoteDetailPage.upgradeToJobAndGetId(page, quoteDetailPage);

          await JobDetailsPage.forEachTab(jobDetailsPage, profitabilityTabs, async (tab) => {
            await jobDetailsPage.expandProfitOverview(tab);
            const loc = jobDetailsPage.getProfitLocators(tab);
            await expect(loc.quotedProfitabilitySection).toBeVisible();

            const quotedCostValue = await jobDetailsPage.getQuotedCostValue(tab);
            expect(quotedCostValue.cost).toContain('-');
            expect(parseCurrencyValue(quotedCostValue.cost)).toBeCloseTo(
              calculateExpectedQuotedCost(
                labourCostsValues.map((cost) => cost.costPerHour),
              ),
              2,
            );
          });
        },
      );

      /** ID: TC_15_RQ4 Tags: Smoke, Regression */
      test(
        '[TC_15_RQ4] @Smoke @Regression: [Profitability - Detail/Costs Tab] Quoted Profitability - Verify Quoted Sell calculation',
        async ({ page }) => {
          await labourModal.addLabourCosts([labourCostsValues[0]]);
          jobId = await QuoteDetailPage.upgradeToJobAndGetId(page, quoteDetailPage);

          await JobDetailsPage.forEachTab(jobDetailsPage, profitabilityTabs, async (tab) => {
            await jobDetailsPage.expandProfitOverview(tab);
            const loc = jobDetailsPage.getProfitLocators(tab);
            await expect(loc.quotedProfitabilitySection).toBeVisible();

            const quotedSellValue = await jobDetailsPage.getQuotedSellValue(tab);
            expect(parseCurrencyValue(quotedSellValue.sell)).toBeCloseTo(
              calculateExpectedQuotedSell(labourCostsValues[0].sellPerHour ?? 0),
              2,
            );
          });
        },
      );
    }); // Quoted Profitability
  }); // Profit Overview
}); // Detailed with Cost Breakdown View
