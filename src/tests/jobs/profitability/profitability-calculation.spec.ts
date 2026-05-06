import { test, expect } from '../../../fixtures/combined.fixture';
import { LoginPage } from '../../../pages/LoginPage';
import { JobDetailsPage } from '../../../pages/Jobs/JobDetailsPage';
import type { ProfitabilityTab } from '../../../pages/Jobs/JobDetailsPage';
import { SystemSetupPage } from '../../../pages/Settings/SystemSetupPage';
import { QuoteDetailPage } from '../../../pages/Quotes/QuoteDetailPage';
import { LabourCostModal, PriceType, type LabourCostModel } from '../../../modals/LabourCostModal';
import { parseCurrencyValue, CURRENCY_FORMAT } from '../../../utils/currency.util';

const profitabilityTabs: ProfitabilityTab[] = ['Details', 'Costs'];
const EXPECTED_PROFIT_MARGIN_ROUNDING = 39.94;

const labourCostsValues = {
  calculation: [
    { description: 'costPerHour 100', costPerHour: 100, priceType: PriceType.FIX_PRICE, sellPerHour: 1000, taxRate: 'S5 (5.00%)' },
    { description: 'costPerHour 200', costPerHour: 200, priceType: PriceType.FIX_PRICE, sellPerHour: 0, taxRate: 'No Tax' },
    { description: 'costPerHour 300', costPerHour: 300, priceType: PriceType.FIX_PRICE, sellPerHour: 0, taxRate: 'No Tax' },
  ],
  rounding: [
    { description: 'sellPerHour 333', costPerHour: 200, priceType: PriceType.FIX_PRICE, sellPerHour: 333, taxRate: 'No Tax' },
  ],
} as const satisfies Record<string, readonly LabourCostModel[]>;

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
    await systemSetupPage.configureJobProfitabilityView('Detailed with Cost Breakdown View');
  });

  test.describe('Profit Overview - Quoted Profitability', () => {
    let quoteDetailPage: QuoteDetailPage;
    let labourModal: LabourCostModal;

    test.beforeEach(async ({ page }) => {
      quoteDetailPage = new QuoteDetailPage(page);
      labourModal = new LabourCostModal(page, 'Quote');
    });

    test.describe('Calculation', () => {
      let jobId: number | undefined;
      let quoteId: string | number | undefined;

      test.beforeEach(async ({ page, quoteService }) => {
        if (!quoteId) {
          quoteId = await QuoteDetailPage.createQuoteAndGetId(quoteService);
          await quoteDetailPage.navigateTo(quoteId);
          await quoteDetailPage.switchToTab('Prices');
          await labourModal.addLabourCosts(labourCostsValues.calculation);
          jobId = await QuoteDetailPage.upgradeToJobAndGetId(page, quoteDetailPage);
        } else if (jobId) {
          await jobDetailsPage.navigateToJob(`/Job/Detail/${jobId}`);
        }
      });

      /** ID: TC_14_RQ4 Tags: Smoke, Regression */
      test('[TC_14_RQ4] @Smoke @Regression: [Profitability - Detail/Costs Tab] Quoted Profitability - Verify Quoted Costs calculation', async ({ page }) => {
        await JobDetailsPage.forEachTab(jobDetailsPage, profitabilityTabs, async (tab) => {
          await jobDetailsPage.expandProfitOverview(tab);
          const loc = jobDetailsPage.getProfitLocators(tab);
          await expect(loc.quotedProfitabilitySection).toBeVisible();

          const quotedCostValue = await jobDetailsPage.getQuotedCostValue(tab);
          expect(quotedCostValue.cost).toMatch(CURRENCY_FORMAT);
          expect(quotedCostValue.cost).toContain('-');
          expect(parseCurrencyValue(quotedCostValue.cost)).toBeCloseTo(JobDetailsPage.calculateExpectedQuotedCost(labourCostsValues.calculation.map((cost) => cost.costPerHour)), 2);
        });
      });

      /** ID: TC_15_RQ4 Tags: Smoke, Regression */
      test('[TC_15_RQ4] @Smoke @Regression: [Profitability - Detail/Costs Tab] Quoted Profitability - Verify Quoted Sell calculation', async ({ page }) => {
        await JobDetailsPage.forEachTab(jobDetailsPage, profitabilityTabs, async (tab) => {
          await jobDetailsPage.expandProfitOverview(tab);
          const loc = jobDetailsPage.getProfitLocators(tab);
          await expect(loc.quotedProfitabilitySection).toBeVisible();

          const quotedSellValue = await jobDetailsPage.getQuotedSellValue(tab);
          expect(quotedSellValue.sell).toMatch(CURRENCY_FORMAT);
          expect(parseCurrencyValue(quotedSellValue.sell)).toBeCloseTo(JobDetailsPage.calculateExpectedQuotedSell(labourCostsValues.calculation.map((c) => c.sellPerHour ?? 0)), 2);
        });
      });

      /** ID: TC_16_RQ4 Tags: Smoke, Regression */
      test('[TC_16_RQ4] @Smoke @Regression: [Profitability - Detail/Costs Tab] Quoted Profitability - Verify Quoted Profit calculation', async ({ page }) => {
        await JobDetailsPage.forEachTab(jobDetailsPage, profitabilityTabs, async (tab) => {
          await jobDetailsPage.expandProfitOverview(tab);
          const loc = jobDetailsPage.getProfitLocators(tab);
          await expect(loc.quotedProfitabilitySection).toBeVisible();

          const quotedProfitValue = await jobDetailsPage.getQuotedProfitValue(tab);
          expect(quotedProfitValue.profit).toMatch(CURRENCY_FORMAT);
          expect(quotedProfitValue.profit).not.toContain('-');
          expect(parseCurrencyValue(quotedProfitValue.profit)).toBeCloseTo(
            JobDetailsPage.calculateExpectedQuotedProfit(
              labourCostsValues.calculation.map((c) => c.sellPerHour ?? 0),
              labourCostsValues.calculation.map((c) => c.costPerHour),
            ),
            2,
          );
        });
      });

      /** ID: TC_17_RQ4 Tags: Smoke, Regression */
      test('[TC_17_RQ4] @Smoke @Regression: [Profitability - Detail/Costs Tab] Quoted Profitability - Verify Profit Margin calculation', async ({ page }) => {
        await JobDetailsPage.forEachTab(jobDetailsPage, profitabilityTabs, async (tab) => {
          await jobDetailsPage.expandProfitOverview(tab);
          const loc = jobDetailsPage.getProfitLocators(tab);
          await expect(loc.quotedProfitabilitySection).toBeVisible();

          const quotedProfitMarginValue = await jobDetailsPage.getQuotedProfitMarginValue(tab);
          expect(quotedProfitMarginValue.profitMargin).toMatch(/\d+\.\d{2}%/);
          expect(parseCurrencyValue(quotedProfitMarginValue.profitMargin)).toBeCloseTo(
            JobDetailsPage.calculateExpectedProfitMargin(
              labourCostsValues.calculation.map((c) => c.sellPerHour ?? 0),
              labourCostsValues.calculation.map((c) => c.costPerHour),
            ),
            2,
          );
        });
      });
    }); // Calculation

    test.describe('Rounding', () => {
      let jobId: number | undefined;
      let quoteId: string | number | undefined;

      test.beforeEach(async ({ page, quoteService }) => {
        if (!quoteId) {
          quoteId = await QuoteDetailPage.createQuoteAndGetId(quoteService);
          await quoteDetailPage.navigateTo(quoteId);
          await quoteDetailPage.switchToTab('Prices');
          await labourModal.addLabourCosts(labourCostsValues.rounding);
          jobId = await QuoteDetailPage.upgradeToJobAndGetId(page, quoteDetailPage);
        } else if (jobId) {
          await jobDetailsPage.navigateToJob(`/Job/Detail/${jobId}`);
        }
      });

      /** ID: TC_18_RQ4 Tags: Regression */
      test('[TC_18_RQ4] @Regression: [Profitability - Detail/Costs Tab] Quoted Profitability - Verify rounding of Profit Margin', async () => {
        await JobDetailsPage.forEachTab(jobDetailsPage, profitabilityTabs, async (tab) => {
          await jobDetailsPage.expandProfitOverview(tab);
          const loc = jobDetailsPage.getProfitLocators(tab);
          await expect(loc.quotedProfitabilitySection).toBeVisible();

          const quotedProfitMarginValue = await jobDetailsPage.getQuotedProfitMarginValue(tab);
          expect(quotedProfitMarginValue.profitMargin).toMatch(/\d+\.\d{2}%/);
          expect(parseCurrencyValue(quotedProfitMarginValue.profitMargin)).toBeCloseTo(EXPECTED_PROFIT_MARGIN_ROUNDING, 2);
        });
      });
    }); // Profit Margin Rounding
  }); // Profit Overview - Quoted Profitability
}); // Detailed with Cost Breakdown View
