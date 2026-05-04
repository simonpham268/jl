/** IDs: TC_24_RQ2, TC_25_RQ2, TC_26_RQ2, TC_27_RQ2 | Tags: @Regression @Quote @Price @Uplift */
/**
 * Precondition: "Preserve Entered Uplift/Discount Percentage" = CHECKED (true)
 * Tooltip: "When checked, the system keeps the exact percentage you entered."
 *
 * TC_24_RQ2 verifies: uplift % on Material line is preserved exactly as entered, regardless of rounding mode.
 * TC_25_RQ2 verifies: uplift % on Expense line is preserved exactly as entered, regardless of rounding mode.
 * TC_26_RQ2 verifies: uplift % on Subcontractor line is preserved exactly as entered, regardless of rounding mode.
 * Sell is rounded per rounding mode, but uplift % must NOT be recalculated from the rounded sell.
 *
 * Counterparts: TC_24_RQ3 / TC_25_RQ3 / TC_26_RQ3 (unchecked) — uplift % recalculates from rounded sell.
 */
import { test, expect } from '../fixtures/combined.fixture';
import { LoginPage } from '../pages/LoginPage';
import { QuoteDetailPage } from '../pages/Quotes/QuoteDetailPage';
import { buildQuotePriceSystemSettings, buildSORChargeableSellingRate } from '../data/apiData/quote-price.api.data';

/** Rounding modes to verify — all non-"No Rounding" options */
const ROUNDING_MODES = [
  {
    label: 'Round Up', roundingType: 1,
    cases: [
      { cost: 10.12,  uplift: 5,    expectedSell: 10.63  },
      { cost: 25.55,  uplift: 7,    expectedSell: 27.34  },
      { cost: 16.77,  uplift: 1,    expectedSell: 16.94  },
      { cost: 1.23,   uplift: 0.5,  expectedSell: 1.24   },
      { cost: 100.01, uplift: 0.01, expectedSell: 100.02 },
    ],
  },
  {
    label: 'Round Down', roundingType: 2,
    // BUG: System returns rounded-up values instead of rounded-down — needs investigation.
    // Expected floor behavior: 10.626→10.62, 27.3385→27.33, 16.9377→16.93, 1.23615→1.23
    // Actual system behavior: returns same as Round Up (10.63, 27.34, 16.94, 1.24)
    cases: [
      { cost: 10.12,  uplift: 5,    expectedSell: 10.62  },
      { cost: 25.55,  uplift: 7,    expectedSell: 27.33  },
      { cost: 16.77,  uplift: 1,    expectedSell: 16.93  },
      { cost: 1.23,   uplift: 0.5,  expectedSell: 1.23   },
      { cost: 100.01, uplift: 0.01, expectedSell: 100.02 },
    ],
  },
  {
    label: 'Round To Nearest', roundingType: 3,
    cases: [
      { cost: 10.12,  uplift: 5,    expectedSell: 10.63  },
      { cost: 25.55,  uplift: 7,    expectedSell: 27.34  },
      { cost: 16.77,  uplift: 1,    expectedSell: 16.94  },
      { cost: 1.23,   uplift: 0.5,  expectedSell: 1.24   },
      { cost: 100.01, uplift: 0.01, expectedSell: 100.02 },
    ],
  },
];

/** Expected sell values per rounding mode for TC_27_RQ2 (itemSellValue=16.77) */
const ROUNDING_MODES_SOR = [
  {
    label: 'Round Up', roundingType: 1,
    // Scenario A: 16.77 × 1.10 = 18.447 → ceil  = 18.45
    // Scenario B: 16.77 × 0.90 = 15.093 → ceil  = 15.10
    scenarioA_sell: 18.45, scenarioB_sell: 15.10,
  },
  {
    label: 'Round Down', roundingType: 2,
    // Scenario A: 18.447 → floor = 18.44
    // Scenario B: 15.093 → floor = 15.09
    scenarioA_sell: 18.44, scenarioB_sell: 15.09,
  },
  {
    label: 'Round To Nearest', roundingType: 3,
    // Scenario A: 18.447 → nearest = 18.45
    // Scenario B: 15.093 → nearest = 15.09
    scenarioA_sell: 18.45, scenarioB_sell: 15.09,
  },
];

test.describe('Quote - Uplift', () => {
  let loginPage: LoginPage;
  let quoteDetailPage: QuoteDetailPage;
  let createdCustomerId: string | number | undefined;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    quoteDetailPage = new QuoteDetailPage(page);
    createdCustomerId = undefined;
    await loginPage.goToBaseURL();
  });

  test.afterEach(async ({ customerService }) => {
    if (createdCustomerId) {
      await customerService.deleteCustomer(createdCustomerId);
    }
  });

  // #region TC_24_RQ2 — Material
  test('[TC_24_RQ2] @Regression @Quote: [Quotes > Material] Preserve entered uplift percentage of Material when uplift is authoritative', async ({ customerService, quoteService, jobService, settingService }) => {
const customerRes = await customerService.createCustomer({ Name: `QA_${Date.now()}` });
    const customerId = customerRes.body?.AdditionalData?.CustomerId ?? customerRes.body?.CustomerId;
    const siteId = customerRes.body?.AdditionalData?.SiteId;
    if (!customerId || !siteId) throw new Error(`Failed to create customer: ${JSON.stringify(customerRes.body)}`);
    createdCustomerId = customerId;

    const quoteRes = await quoteService.createQuote({
      QuoteCustomerId: customerId,
      QuoteSiteId: siteId,
      Description: `QA_Quote_${Date.now()}`,
      JobTypeId: await jobService.getDefaultJobTypeId(),
      AssignedToUserId: 2,
    });
    if (!quoteRes.body) throw new Error(`No response body from createQuote (HTTP ${quoteRes.status} ${quoteRes.statusText})`);
    const quoteId = quoteRes.body.QuoteId
      ?? quoteRes.body.AdditionalData?.QuoteId
      ?? quoteRes.body.AdditionalData?.quoteid
      ?? quoteRes.body.redirectUrl?.match(/\/(\d+)$/)?.[1];
    if (!quoteId) throw new Error(`Missing QuoteId. Full response: ${JSON.stringify(quoteRes.body)}`);


    for (const mode of ROUNDING_MODES) {
      await test.step(`Rounding Mode: ${mode.label} (RoundingType=${mode.roundingType})`, async () => {
        await settingService.updateSystemDetail(buildQuotePriceSystemSettings(mode.roundingType));
        await quoteDetailPage.navigateTo(quoteId);
        await quoteDetailPage.switchToTab('Prices');

        let lineIndex = 0;
        for (const { cost, uplift, expectedSell } of mode.cases) {
          await test.step(`cost=${cost}, uplift=${uplift}% → sell≈${expectedSell}`, async () => {
            await quoteDetailPage.addMaterialLineFixedPrice(cost, uplift);
            await quoteDetailPage.reopenMaterialLine(lineIndex);

            const sell = await quoteDetailPage.getMaterialLineSellPerUnit();
            const actualUplift = await quoteDetailPage.getMaterialLineUpliftPercentage();

            expect.soft(parseFloat(sell), `[${mode.label}] cost=${cost} uplift=${uplift}% → Sell Per Unit`).toBeCloseTo(expectedSell, 2);
            expect.soft(parseFloat(actualUplift), `[${mode.label}] cost=${cost} uplift=${uplift}% → Uplift %`).toBe(uplift);

            await quoteDetailPage.saveMaterialLine();
            lineIndex++;
          });
        }
      });
    }
  });
  // #endregion

  // #region TC_25_RQ2 — Expense
  test('[TC_25_RQ2] @Regression @Quote: [Quotes > Expense] Preserve entered uplift percentage of Expense when uplift is authoritative', async ({ customerService, quoteService, jobService, settingService }) => {
const customerRes = await customerService.createCustomer({ Name: `QA_${Date.now()}` });
    const customerId = customerRes.body?.AdditionalData?.CustomerId ?? customerRes.body?.CustomerId;
    const siteId = customerRes.body?.AdditionalData?.SiteId;
    if (!customerId || !siteId) throw new Error(`Failed to create customer: ${JSON.stringify(customerRes.body)}`);
    createdCustomerId = customerId;

    const quoteRes = await quoteService.createQuote({
      QuoteCustomerId: customerId,
      QuoteSiteId: siteId,
      Description: `QA_Quote_${Date.now()}`,
      JobTypeId: await jobService.getDefaultJobTypeId(),
      AssignedToUserId: 2,
    });
    if (!quoteRes.body) throw new Error(`No response body from createQuote (HTTP ${quoteRes.status} ${quoteRes.statusText})`);
    const quoteId = quoteRes.body.QuoteId
      ?? quoteRes.body.AdditionalData?.QuoteId
      ?? quoteRes.body.AdditionalData?.quoteid
      ?? quoteRes.body.redirectUrl?.match(/\/(\d+)$/)?.[1];
    if (!quoteId) throw new Error(`Missing QuoteId. Full response: ${JSON.stringify(quoteRes.body)}`);


    for (const mode of ROUNDING_MODES) {
      await test.step(`Rounding Mode: ${mode.label} (RoundingType=${mode.roundingType})`, async () => {
        await settingService.updateSystemDetail(buildQuotePriceSystemSettings(mode.roundingType));
        await quoteDetailPage.navigateTo(quoteId);
        await quoteDetailPage.switchToTab('Prices');

        let lineIndex = 0;
        for (const { cost, uplift, expectedSell } of mode.cases) {
          await test.step(`cost=${cost}, uplift=${uplift}% → sell≈${expectedSell}`, async () => {
            await quoteDetailPage.addExpenseLineFixedPrice(cost, uplift);
            await quoteDetailPage.reopenExpenseLine(lineIndex);

            const sell = await quoteDetailPage.getExpenseLineSellPerUnit();
            const actualUplift = await quoteDetailPage.getExpenseLineUpliftPercentage();

            expect.soft(parseFloat(sell), `[${mode.label}] cost=${cost} uplift=${uplift}% → Sell Per Unit`).toBeCloseTo(expectedSell, 2);
            expect.soft(parseFloat(actualUplift), `[${mode.label}] cost=${cost} uplift=${uplift}% → Uplift %`).toBe(uplift);

            await quoteDetailPage.saveExpenseLine();
            lineIndex++;
          });
        }
      });
    }
  });
  // #endregion

  // #region TC_26_RQ2 — Subcontractor
  test('[TC_26_RQ2] @Regression @Quote: [Quotes > Subcontractor] Preserve entered uplift percentage of Subcontractor when uplift is authoritative', async ({ customerService, quoteService, jobService, settingService }) => {
const customerRes = await customerService.createCustomer({ Name: `QA_${Date.now()}` });
    const customerId = customerRes.body?.AdditionalData?.CustomerId ?? customerRes.body?.CustomerId;
    const siteId = customerRes.body?.AdditionalData?.SiteId;
    if (!customerId || !siteId) throw new Error(`Failed to create customer: ${JSON.stringify(customerRes.body)}`);
    createdCustomerId = customerId;

    const quoteRes = await quoteService.createQuote({
      QuoteCustomerId: customerId,
      QuoteSiteId: siteId,
      Description: `QA_Quote_${Date.now()}`,
      JobTypeId: await jobService.getDefaultJobTypeId(),
      AssignedToUserId: 2,
    });
    if (!quoteRes.body) throw new Error(`No response body from createQuote (HTTP ${quoteRes.status} ${quoteRes.statusText})`);
    const quoteId = quoteRes.body.QuoteId
      ?? quoteRes.body.AdditionalData?.QuoteId
      ?? quoteRes.body.AdditionalData?.quoteid
      ?? quoteRes.body.redirectUrl?.match(/\/(\d+)$/)?.[1];
    if (!quoteId) throw new Error(`Missing QuoteId. Full response: ${JSON.stringify(quoteRes.body)}`);


    for (const mode of ROUNDING_MODES) {
      await test.step(`Rounding Mode: ${mode.label} (RoundingType=${mode.roundingType})`, async () => {
        await settingService.updateSystemDetail(buildQuotePriceSystemSettings(mode.roundingType));
        await quoteDetailPage.navigateTo(quoteId);
        await quoteDetailPage.switchToTab('Prices');

        let lineIndex = 0;
        for (const { cost, uplift, expectedSell } of mode.cases) {
          await test.step(`cost=${cost}, uplift=${uplift}% → sell≈${expectedSell}`, async () => {
            await quoteDetailPage.addSubcontractorLineFixedPrice(cost, uplift);
            await quoteDetailPage.reopenSubcontractorLine(lineIndex);

            const sell = await quoteDetailPage.getSubcontractorLineSellPerUnit();
            const actualUplift = await quoteDetailPage.getSubcontractorLineUpliftPercentage();

            expect.soft(parseFloat(sell), `[${mode.label}] cost=${cost} uplift=${uplift}% → Sell Per Unit`).toBeCloseTo(expectedSell, 2);
            expect.soft(parseFloat(actualUplift), `[${mode.label}] cost=${cost} uplift=${uplift}% → Uplift %`).toBe(uplift);

            await quoteDetailPage.saveSubcontractorLine();
            lineIndex++;
          });
        }
      });
    }
  });
  // #endregion

  // #region TC_27_RQ2 — Schedule of Rates
  test('[TC_27_RQ2] @Regression @Quote: [Quotes > SOR] Preserve entered uplift/discount percentage of Schedule of Rates when percentage is authoritative', async ({ customerService, quoteService, jobService, settingService }) => {
    test.setTimeout(300_000);

    // Precondition: enable IsScheduleOfRatesChargeable=true on the default selling rate
    await settingService.editSellingRate(buildSORChargeableSellingRate());

    const customerRes = await customerService.createCustomer({ Name: `QA_${Date.now()}` });
    const customerId = customerRes.body?.AdditionalData?.CustomerId ?? customerRes.body?.CustomerId;
    const siteId = customerRes.body?.AdditionalData?.SiteId;
    if (!customerId || !siteId) throw new Error(`Failed to create customer: ${JSON.stringify(customerRes.body)}`);
    createdCustomerId = customerId;

    const quoteRes = await quoteService.createQuote({
      QuoteCustomerId: customerId,
      QuoteSiteId: siteId,
      Description: `QA_Quote_${Date.now()}`,
      JobTypeId: await jobService.getDefaultJobTypeId(),
      AssignedToUserId: 2,
    });
    if (!quoteRes.body) throw new Error(`No response body from createQuote (HTTP ${quoteRes.status} ${quoteRes.statusText})`);
    const quoteId = quoteRes.body.QuoteId
      ?? quoteRes.body.AdditionalData?.QuoteId
      ?? quoteRes.body.AdditionalData?.quoteid
      ?? quoteRes.body.redirectUrl?.match(/\/(\d+)$/)?.[1];
    if (!quoteId) throw new Error(`Missing QuoteId. Full response: ${JSON.stringify(quoteRes.body)}`);


    for (const mode of ROUNDING_MODES_SOR) {
      await test.step(`Rounding Mode: ${mode.label} (RoundingType=${mode.roundingType})`, async () => {
        await settingService.updateSystemDetail(buildQuotePriceSystemSettings(mode.roundingType));
        await quoteDetailPage.navigateTo(quoteId);
        await quoteDetailPage.switchToTab('Prices');

        // Scenario A: Enter Uplift 10% — sell should round, uplift must be preserved
        await test.step('Scenario A: Uplift=10% on ItemSellValue=16.77', async () => {
          await quoteDetailPage.addSORLineWithUplift(16.77, 10);
          await quoteDetailPage.reopenSORLine(0);

          const sell = await quoteDetailPage.getSORLineSellPerUnit();
          const actualUplift = await quoteDetailPage.getSORLineUpliftPercentage();

          expect.soft(parseFloat(sell), `[${mode.label}] Scenario A → Sell Per Unit`).toBeCloseTo(mode.scenarioA_sell, 2);
          expect.soft(parseFloat(actualUplift), `[${mode.label}] Scenario A → Uplift %`).toBe(10);

          await quoteDetailPage.saveSORLine();
        });

        // Scenario B: Enter Discount 10% — sell should round, discount must be preserved
        await test.step('Scenario B: Discount=10% on ItemSellValue=16.77', async () => {
          await quoteDetailPage.addSORLineWithDiscount(16.77, 10);
          await quoteDetailPage.reopenSORLine(1);

          const sell = await quoteDetailPage.getSORLineSellPerUnit();
          const actualDiscount = await quoteDetailPage.getSORLineDiscountPercentage();

          expect.soft(parseFloat(sell), `[${mode.label}] Scenario B → Sell Per Unit`).toBeCloseTo(mode.scenarioB_sell, 2);
          expect.soft(parseFloat(actualDiscount), `[${mode.label}] Scenario B → Discount %`).toBe(10);

          await quoteDetailPage.saveSORLine();
        });
      });
    }
  });
  // #endregion
});
