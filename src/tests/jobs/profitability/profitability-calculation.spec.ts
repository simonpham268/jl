import { test, expect } from '../../../fixtures/combined.fixture';
import { LoginPage } from '../../../pages/LoginPage';
import { JobDetailsPage } from '../../../pages/Jobs/JobDetailsPage';
import type { ProfitabilityTab } from '../../../pages/Jobs/JobDetailsPage';
import { SystemSetupPage } from '../../../pages/Settings/SystemSetupPage';
import { QuoteDetailPage } from '../../../pages/Quotes/QuoteDetailPage';
import { LabourCostModal, PriceType, type LabourCostModel } from '../../../modals/LabourCostModal';
import { SubcontractorCostModal } from '../../../modals/SubcontractorCostModal';
import { PriceType as CostPriceType } from '../../../models/CostModel';
import { parseCurrencyValue, CURRENCY_FORMAT } from '../../../utils/currency.util';
import { createBasicApiJobData } from '../../../data/apiData/job.api.data';

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
      test('[TC_14_RQ4] @Smoke @Regression: [Profitability - Detail/Costs Tab] Quoted Profitability - Verify Quoted Costs calculation', async () => {
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
      test('[TC_15_RQ4] @Smoke @Regression: [Profitability - Detail/Costs Tab] Quoted Profitability - Verify Quoted Sell calculation', async () => {
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
      test('[TC_16_RQ4] @Smoke @Regression: [Profitability - Detail/Costs Tab] Quoted Profitability - Verify Quoted Profit calculation', async () => {
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
      test('[TC_17_RQ4] @Smoke @Regression: [Profitability - Detail/Costs Tab] Quoted Profitability - Verify Profit Margin calculation', async () => {
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

  test.describe('Actuals & WIP Calculations', () => {
    let redirectUrl: string;

    test.beforeEach(async ({ jobService, customerService }) => {
      if (!redirectUrl) {
        const [jobTypeId, customerRes] = await Promise.all([
          jobService.getDefaultJobTypeId(),
          customerService.createCustomer({ Name: `Test Job ${Date.now()}` }),
        ]);

        const customerId = Number(customerRes.body?.AdditionalData?.CustomerId);
        const siteId = Number(customerRes.body?.AdditionalData?.SiteId);
        if (!customerId || !siteId) throw new Error(`Failed to create customer/site. Response: ${JSON.stringify(customerRes.body)}`);

        const jobData = createBasicApiJobData(customerId, siteId, jobTypeId);
        redirectUrl = await JobDetailsPage.createJobAndGetRedirectUrl(jobService, jobData);
        console.log(`[Job] ${redirectUrl}`);
      }
      await jobDetailsPage.navigateToJob(redirectUrl);
    });

    test('[TC_29_RQ4] @Smoke @Regression: [Profitability – Detail/Costs Tab] Verify Job Profitability Include WIP values after adding Subcontractor cost and Variable Target Profit Margin', async ({ page }) => {
      const subcontractorCostModal = new SubcontractorCostModal(page);

      await jobDetailsPage.switchToTab('Costs');
      await jobDetailsPage.expandProfitOverview('Costs');

      await subcontractorCostModal.clickAddSubcontractor();
      await subcontractorCostModal.fillAddSubcontractorCostModal({
        description: `Subcontractor ${Date.now()}`,
        costPerHour: 1000,
        priceType: CostPriceType.FIX_PRICE,
        upliftPercent: 50,
      });
      await subcontractorCostModal.saveModal();

      await jobDetailsPage.expandProfitOverview('Costs');
      await jobDetailsPage.clickAddVariableTargetProfitMargin('Costs');
      await expect.soft(jobDetailsPage.targetProfitMarginModal).toBeVisible();
      await jobDetailsPage.targetProfitMarginPercentInput.fill('20');
      await jobDetailsPage.targetProfitMarginModalSaveButton.click();
      await expect.soft(jobDetailsPage.toastSuccessMessage).toContainText('Target margin saved successfully');
      await expect.soft(jobDetailsPage.targetProfitMarginModal).toBeHidden();

      const verifyCostsWIP = async (tab: 'Costs' | 'Details') => {
        const loc = jobDetailsPage.getProfitLocators(tab);
        await expect.soft(loc.wipTotalJobSell).toContainText('£1,500.00');
        await expect.soft(loc.wipCurrentProfit).toContainText('£500.00');
        await expect.soft(loc.wipProfitMargin).toContainText('33.33%');
        await expect.soft(loc.targetProfitMarginDisplayValue).toContainText('20.00%');
        await expect.soft(loc.wipRemainingCost).toContainText('£200.00');
        await expect.soft(loc.wipRemainingCostPercent).toContainText('+13.33%');
      };

      await verifyCostsWIP('Costs');

      await jobDetailsPage.switchToTab('Details');
      await jobDetailsPage.expandProfitOverview('Details');
      await verifyCostsWIP('Details');
    });

    test('[TC_30_RQ4] @Regression: [Profitability – Detail/Costs Tab] Verify Actual Costs with Subcontractor cost and PO committed cost (API preconditions)', async ({ page, purchaseOrderService, subcontractorPOService }) => {
      const subcontractorCostModal = new SubcontractorCostModal(page);

      // Step 1 (UI): Add Subcontractor cost — Cost Per Hour = 2000 only
      await jobDetailsPage.switchToTab('Costs');
      await subcontractorCostModal.clickAddSubcontractor();
      await subcontractorCostModal.costPerHourInput.fill('2000');
      await subcontractorCostModal.saveModal();

      const jobNumericId = redirectUrl.split('/').pop()!;

      // Steps 2–3 (API): Create Supplier PO → add item (cost=3000) → deliver
      const supplierId = await purchaseOrderService.getFirstSupplierId();
      const poId = await purchaseOrderService.createPO(jobNumericId, supplierId);
      await purchaseOrderService.addLineItem(poId, supplierId, 3000, `PO Item ${Date.now()}`);
      await purchaseOrderService.deliverLine(poId);

      // Steps 4–5 (API): Create Subcontractor PO → add item (652.10) → complete
      const subcontractorId = await subcontractorPOService.getFirstSubcontractorId();
      const subPoId = await subcontractorPOService.createPO(jobNumericId, subcontractorId);
      await subcontractorPOService.addItem(subPoId, subcontractorId, 652.10, `Sub Item ${Date.now()}`);
      await subcontractorPOService.completeLine(subPoId);

      // Step 6: Navigate back to Job and verify Actual Costs = -£5,652.10 on both tabs
      await jobDetailsPage.navigateToJob(redirectUrl);
      await jobDetailsPage.switchToTab('Costs');
      await jobDetailsPage.expandProfitOverview('Costs');
      await expect.soft(jobDetailsPage.getProfitLocators('Costs').actualsActualCosts).toContainText('-£5,652.10');

      await jobDetailsPage.switchToTab('Details');
      await jobDetailsPage.expandProfitOverview('Details');
      await expect.soft(jobDetailsPage.getProfitLocators('Details').actualsActualCosts).toContainText('-£5,652.10');
    });

    test('[TC_31_RQ4] @Regression: [Profitability – Detail/Costs Tab] Verify Supplier Invoice Adjustments after invoicing Supplier PO and Subcontractor PO', async ({ purchaseOrderService, subcontractorPOService, invoiceService }) => {

      const jobNumericId = redirectUrl.split('/').pop()!;

      // Supplier PO: create → add item (25) → deliver → invoice
      const supplierId = await purchaseOrderService.getFirstSupplierId();
      const poId = await purchaseOrderService.createPO(jobNumericId, supplierId);
      await purchaseOrderService.addLineItem(poId, supplierId, 25, `Invoice Item ${Date.now()}`);
      await purchaseOrderService.deliverLine(poId);
      await invoiceService.createSupplierPOInvoice(poId, 25);

      // Subcontractor PO: create → add item (25) → complete → invoice
      const subcontractorId = await subcontractorPOService.getFirstSubcontractorId();
      const subPoId = await subcontractorPOService.createPO(jobNumericId, subcontractorId);
      await subcontractorPOService.addItem(subPoId, subcontractorId, 25, `Sub Invoice Item ${Date.now()}`);
      await subcontractorPOService.completeLine(subPoId);
      await invoiceService.createSubcontractorPOInvoice(subPoId, 25);

      // Verify Supplier Invoice Adjustments = -£50.00 on both tabs
      await jobDetailsPage.navigateToJob(redirectUrl);
      await jobDetailsPage.switchToTab('Costs');
      await jobDetailsPage.expandProfitOverview('Costs');
      await expect.soft(jobDetailsPage.getProfitLocators('Costs').actualsSupplierInvoiceAdjustments).toContainText('-£50.00');

      await jobDetailsPage.switchToTab('Details');
      await jobDetailsPage.expandProfitOverview('Details');
      await expect.soft(jobDetailsPage.getProfitLocators('Details').actualsSupplierInvoiceAdjustments).toContainText('-£50.00');
    });
  }); // Actuals & WIP Calculations

  test.describe('Invoiced Customer Calculations', () => {
    let invoiceRedirectUrl: string;

    test.beforeEach(async ({ jobService, customerService }) => {
      const [jobTypeId, customerRes] = await Promise.all([
        jobService.getDefaultJobTypeId(),
        customerService.createCustomer({ Name: `Test Invoice Job ${Date.now()}` }),
      ]);

      const customerId = Number(customerRes.body?.AdditionalData?.CustomerId);
      const siteId = Number(customerRes.body?.AdditionalData?.SiteId);
      if (!customerId || !siteId) throw new Error(`Failed to create customer/site. Response: ${JSON.stringify(customerRes.body)}`);

      const jobData = createBasicApiJobData(customerId, siteId, jobTypeId);
      invoiceRedirectUrl = await JobDetailsPage.createJobAndGetRedirectUrl(jobService, jobData);
      console.log(`[Job] ${invoiceRedirectUrl}`);
      await jobDetailsPage.navigateToJob(invoiceRedirectUrl);
    });

    /** ID: TC_33_RQ4 Tags: Regression */
    test('[TC_33_RQ4] @Regression: [Profitability – Detail/Costs Tab] Actuals Only – Verify Invoiced (Customer) = £1,000.00 after two approved customer invoices (£600 + £400)', async ({ invoiceService }) => {

      const jobNumericId = invoiceRedirectUrl.split('/').pop()!;

      await invoiceService.createCustomerInvoice(jobNumericId, 600);
      await invoiceService.createCustomerInvoice(jobNumericId, 400);

      const verifyInvoicedCustomer = async (tab: 'Costs' | 'Details') => {
        await jobDetailsPage.navigateToJob(invoiceRedirectUrl);
        await jobDetailsPage.switchToTab(tab);
        await jobDetailsPage.expandProfitOverview(tab);
        const loc = jobDetailsPage.getProfitLocators(tab);
        await expect.soft(loc.profitabilityActualsOnlySection).toBeVisible();
        await expect.soft(loc.actualsInvoicedCustomer).toContainText('£1,000.00');
      };

      await verifyInvoicedCustomer('Costs');
      await verifyInvoicedCustomer('Details');
    });

    /** ID: TC_34_RQ4 Tags: Regression */
    test('[TC_34_RQ4] @Regression: [Profitability – Detail/Costs Tab] Actuals Only – Verify Invoiced (Customer) = £800.00 after invoice (£1,000) and credit invoice (£200)', async ({ invoiceService }) => {

      const jobNumericId = invoiceRedirectUrl.split('/').pop()!;

      // Create approved customer invoice £1,000 → get invoiceId for credit
      const invoiceId = await invoiceService.createCustomerInvoice(jobNumericId, 1000);

      // Create credit invoice £200 against the above invoice → approve
      await invoiceService.createCreditInvoice(invoiceId, 200);

      // Verify Invoiced (Customer) = £800.00 (1000 - 200) on both tabs
      const verifyInvoicedCustomer = async (tab: 'Costs' | 'Details') => {
        await jobDetailsPage.navigateToJob(invoiceRedirectUrl);
        await jobDetailsPage.switchToTab(tab);
        await jobDetailsPage.expandProfitOverview(tab);
        const loc = jobDetailsPage.getProfitLocators(tab);
        await expect.soft(loc.profitabilityActualsOnlySection).toBeVisible();
        await expect.soft(loc.actualsInvoicedCustomer).toContainText('£800.00');
      };

      await verifyInvoicedCustomer('Costs');
      await verifyInvoicedCustomer('Details');
    });
  }); // Invoiced Customer Calculations
}); // Detailed with Cost Breakdown View
