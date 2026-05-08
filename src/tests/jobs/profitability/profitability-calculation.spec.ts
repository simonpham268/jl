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

      // Supplier PO: create → add item (0) → deliver → invoice → resolve
      const supplierId = await purchaseOrderService.getFirstSupplierId();
      const poId = await purchaseOrderService.createPO(jobNumericId, supplierId);
      await purchaseOrderService.addLineItem(poId, supplierId, 0, `Invoice Item ${Date.now()}`);
      await purchaseOrderService.deliverLine(poId);
      await invoiceService.createSupplierPOInvoice(poId, 25);
      await purchaseOrderService.resolvePurchaseOrder(poId);

      // Subcontractor PO: create → add item (25) + (50) → complete → invoice → delete line 25 → resolve
      const subcontractorId = await subcontractorPOService.getFirstSubcontractorId();
      const subPoId = await subcontractorPOService.createPO(jobNumericId, subcontractorId);
      await subcontractorPOService.addItem(subPoId, subcontractorId, 25, `Sub Invoice Item 25 ${Date.now()}`);
      await subcontractorPOService.addItem(subPoId, subcontractorId, 50, `Sub Invoice Item 50 ${Date.now()}`);
      await subcontractorPOService.completeLine(subPoId);
      const subInvoiceId = await invoiceService.createSubcontractorPOInvoice(subPoId, 25);
      const subLines = await invoiceService.getSubInvoiceLines(subInvoiceId);
      const line50 = subLines.find(l => l.pricePerUnit === 50);
      if (line50) await invoiceService.deleteSubcontractorInvoiceLine(line50.id, subInvoiceId);
      await subcontractorPOService.resolvePurchaseOrder(subPoId);

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

  test.describe('Job Cost Actuals Calculation', () => {
    let tc20RedirectUrl: string;

    test.beforeEach(async ({ page, jobService, customerService, purchaseOrderService, subcontractorPOService }) => {
      const subcontractorCostModal = new SubcontractorCostModal(page);

      const [jobTypeId, customerRes] = await Promise.all([
        jobService.getDefaultJobTypeId(),
        customerService.createCustomer({ Name: `Test Job Cost Actuals ${Date.now()}` }),
      ]);
      const customerId = Number(customerRes.body?.AdditionalData?.CustomerId);
      const siteId = Number(customerRes.body?.AdditionalData?.SiteId);
      if (!customerId || !siteId) throw new Error(`Failed to create customer/site. Response: ${JSON.stringify(customerRes.body)}`);

      const jobData = createBasicApiJobData(customerId, siteId, jobTypeId);
      tc20RedirectUrl = await JobDetailsPage.createJobAndGetRedirectUrl(jobService, jobData);
      console.log(`[Job] ${tc20RedirectUrl}`);

      // Remaining Job Costs (UI): Add Subcontractor cost — Cost Per Hour = 200
      await jobDetailsPage.navigateToJob(tc20RedirectUrl);
      await jobDetailsPage.switchToTab('Costs');
      await subcontractorCostModal.clickAddSubcontractor();
      await subcontractorCostModal.costPerHourInput.fill('200');
      await subcontractorCostModal.saveModal();

      const jobNumericId = tc20RedirectUrl.split('/').pop()!;

      // Delivered PO Costs (API): Supplier PO → add item (300) → deliver
      const supplierId = await purchaseOrderService.getFirstSupplierId();
      const poId = await purchaseOrderService.createPO(jobNumericId, supplierId);
      await purchaseOrderService.addLineItem(poId, supplierId, 300, `PO Item ${Date.now()}`);
      await purchaseOrderService.deliverLine(poId);

      // Completed Subcontract PO Costs (API): Sub PO → add item (100) → complete
      const subcontractorId = await subcontractorPOService.getFirstSubcontractorId();
      const subPoId = await subcontractorPOService.createPO(jobNumericId, subcontractorId);
      await subcontractorPOService.addItem(subPoId, subcontractorId, 100, `Sub Item ${Date.now()}`);
      await subcontractorPOService.completeLine(subPoId);
    });

    /** ID: TC_20_RQ4 Tags: Regression */
    test('[TC_20_RQ4] @Regression: [Profitability – Detail/Costs Tab] Include WIP – Verify Job Cost Actuals = -(Remaining + Delivered PO + Completed Sub PO)', async () => {
      const verifyJobCostActuals = async (tab: 'Costs' | 'Details') => {
        await jobDetailsPage.navigateToJob(tc20RedirectUrl);
        await jobDetailsPage.switchToTab(tab);
        await jobDetailsPage.expandProfitOverview(tab);
        const loc = jobDetailsPage.getProfitLocators(tab);
        await expect.soft(loc.profitabilityIncludeWIPSection).toBeVisible();
        await expect.soft(loc.wipJobCostActuals).toContainText('-£600.00');
      };

      await verifyJobCostActuals('Costs');
      await verifyJobCostActuals('Details');
    });
  }); // Job Cost Actuals Calculation

  test.describe('Job Cost Committed Calculation', () => {
    let tc21RedirectUrl: string;

    test.beforeEach(async ({ jobService, customerService, purchaseOrderService, subcontractorPOService }) => {
      const [jobTypeId, customerRes] = await Promise.all([
        jobService.getDefaultJobTypeId(),
        customerService.createCustomer({ Name: `Test Job Cost Committed ${Date.now()}` }),
      ]);
      const customerId = Number(customerRes.body?.AdditionalData?.CustomerId);
      const siteId = Number(customerRes.body?.AdditionalData?.SiteId);
      if (!customerId || !siteId) throw new Error(`Failed to create customer/site. Response: ${JSON.stringify(customerRes.body)}`);

      const jobData = createBasicApiJobData(customerId, siteId, jobTypeId);
      tc21RedirectUrl = await JobDetailsPage.createJobAndGetRedirectUrl(jobService, jobData);
      console.log(`[Job] ${tc21RedirectUrl}`);

      const jobNumericId = tc21RedirectUrl.split('/').pop()!;

      // Undelivered PO Costs (API): Supplier PO → add item (250) → NOT delivered
      const supplierId = await purchaseOrderService.getFirstSupplierId();
      const poId = await purchaseOrderService.createPO(jobNumericId, supplierId);
      await purchaseOrderService.addLineItem(poId, supplierId, 250, `PO Item ${Date.now()}`);

      // Incomplete Subcontract PO Costs (API): Sub PO → add item (150) → NOT completed
      const subcontractorId = await subcontractorPOService.getFirstSubcontractorId();
      const subPoId = await subcontractorPOService.createPO(jobNumericId, subcontractorId);
      await subcontractorPOService.addItem(subPoId, subcontractorId, 150, `Sub Item ${Date.now()}`);
    });

    /** ID: TC_21_RQ4 Tags: Regression */
    test('[TC_21_RQ4] @Regression: [Profitability – Detail/Costs Tab] Include WIP – Verify Job Cost Committed = -(Undelivered PO + Incomplete Sub PO)', async () => {
      const verifyJobCostCommitted = async (tab: 'Costs' | 'Details') => {
        await jobDetailsPage.navigateToJob(tc21RedirectUrl);
        await jobDetailsPage.switchToTab(tab);
        await jobDetailsPage.expandProfitOverview(tab);
        const loc = jobDetailsPage.getProfitLocators(tab);
        await expect.soft(loc.profitabilityIncludeWIPSection).toBeVisible();
        await expect.soft(loc.wipJobCostCommitted).toContainText('-£400.00');
      };

      await verifyJobCostCommitted('Costs');
      await verifyJobCostCommitted('Details');
    });
  }); // Job Cost Committed Calculation

  test.describe('Total Expected Cost Calculation', () => {
    let tc22RedirectUrl: string;

    test.beforeEach(async ({ page, jobService, customerService, purchaseOrderService, subcontractorPOService }) => {
      const subcontractorCostModal = new SubcontractorCostModal(page);

      const [jobTypeId, customerRes] = await Promise.all([
        jobService.getDefaultJobTypeId(),
        customerService.createCustomer({ Name: `Test Total Expected Cost ${Date.now()}` }),
      ]);
      const customerId = Number(customerRes.body?.AdditionalData?.CustomerId);
      const siteId = Number(customerRes.body?.AdditionalData?.SiteId);
      if (!customerId || !siteId) throw new Error(`Failed to create customer/site. Response: ${JSON.stringify(customerRes.body)}`);

      const jobData = createBasicApiJobData(customerId, siteId, jobTypeId);
      tc22RedirectUrl = await JobDetailsPage.createJobAndGetRedirectUrl(jobService, jobData);
      console.log(`[Job] ${tc22RedirectUrl}`);

      // Remaining Job Costs (UI): Subcontractor cost — Cost Per Hour = 200
      await jobDetailsPage.navigateToJob(tc22RedirectUrl);
      await jobDetailsPage.switchToTab('Costs');
      await subcontractorCostModal.clickAddSubcontractor();
      await subcontractorCostModal.costPerHourInput.fill('200');
      await subcontractorCostModal.saveModal();

      const jobNumericId = tc22RedirectUrl.split('/').pop()!;
      const supplierId = await purchaseOrderService.getFirstSupplierId();

      // Delivered PO Costs (API): Supplier PO → add item (300) → deliver
      const poId1 = await purchaseOrderService.createPO(jobNumericId, supplierId);
      await purchaseOrderService.addLineItem(poId1, supplierId, 300, `PO Delivered ${Date.now()}`);
      await purchaseOrderService.deliverLine(poId1);

      // Completed Subcontract PO Costs (API): Sub PO → add item (100) → complete
      const subcontractorId = await subcontractorPOService.getFirstSubcontractorId();
      const subPoId1 = await subcontractorPOService.createPO(jobNumericId, subcontractorId);
      await subcontractorPOService.addItem(subPoId1, subcontractorId, 100, `Sub Completed ${Date.now()}`);
      await subcontractorPOService.completeLine(subPoId1);

      // Undelivered PO Costs (API): Supplier PO → add item (250) → NOT delivered
      const poId2 = await purchaseOrderService.createPO(jobNumericId, supplierId);
      await purchaseOrderService.addLineItem(poId2, supplierId, 250, `PO Undelivered ${Date.now()}`);

      // Incomplete Subcontract PO Costs (API): Sub PO → add item (150) → NOT completed
      const subPoId2 = await subcontractorPOService.createPO(jobNumericId, subcontractorId);
      await subcontractorPOService.addItem(subPoId2, subcontractorId, 150, `Sub Incomplete ${Date.now()}`);
    });

    /** ID: TC_22_RQ4 Tags: Regression */
    test('[TC_22_RQ4] @Regression: [Profitability – Detail/Costs Tab] Include WIP – Verify Total Expected Cost = Job Cost Actuals + Job Cost Committed', async () => {
      const verifyTotalExpectedCost = async (tab: 'Costs' | 'Details') => {
        await jobDetailsPage.navigateToJob(tc22RedirectUrl);
        await jobDetailsPage.switchToTab(tab);
        await jobDetailsPage.expandProfitOverview(tab);
        const loc = jobDetailsPage.getProfitLocators(tab);
        await expect.soft(loc.profitabilityIncludeWIPSection).toBeVisible();
        await expect.soft(loc.wipJobCostActuals).toContainText('-£600.00');
        await expect.soft(loc.wipJobCostCommitted).toContainText('-£400.00');
        await expect.soft(loc.wipTotalExpectedCost).toContainText('-£1,000.00');
      };

      await verifyTotalExpectedCost('Costs');
      await verifyTotalExpectedCost('Details');
    });
  }); // Total Expected Cost Calculation

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

  test.describe('Actuals Profit Calculation', () => {
    let profitRedirectUrl: string;

    test.beforeEach(async ({ page, jobService, customerService, purchaseOrderService, subcontractorPOService, invoiceService }) => {
      const subcontractorCostModal = new SubcontractorCostModal(page);

      const [jobTypeId, customerRes] = await Promise.all([
        jobService.getDefaultJobTypeId(),
        customerService.createCustomer({ Name: `Test Profit Job ${Date.now()}` }),
      ]);
      const customerId = Number(customerRes.body?.AdditionalData?.CustomerId);
      const siteId = Number(customerRes.body?.AdditionalData?.SiteId);
      if (!customerId || !siteId) throw new Error(`Failed to create customer/site. Response: ${JSON.stringify(customerRes.body)}`);

      const jobData = createBasicApiJobData(customerId, siteId, jobTypeId);
      profitRedirectUrl = await JobDetailsPage.createJobAndGetRedirectUrl(jobService, jobData);
      console.log(`[Job] ${profitRedirectUrl}`);

      // Actual Costs setup (UI): Add Subcontractor cost — Cost Per Hour = 2000
      await jobDetailsPage.navigateToJob(profitRedirectUrl);
      await jobDetailsPage.switchToTab('Costs');
      await subcontractorCostModal.clickAddSubcontractor();
      await subcontractorCostModal.costPerHourInput.fill('2000');
      await subcontractorCostModal.saveModal();

      const jobNumericId = profitRedirectUrl.split('/').pop()!;

      // Actual Costs setup (API): Supplier PO → add item (3000) → deliver
      const supplierId = await purchaseOrderService.getFirstSupplierId();
      const poId = await purchaseOrderService.createPO(jobNumericId, supplierId);
      await purchaseOrderService.addLineItem(poId, supplierId, 3000, `PO Item ${Date.now()}`);
      await purchaseOrderService.deliverLine(poId);

      // Actual Costs setup (API): Subcontractor PO → add item (652.10) → complete
      const subcontractorId = await subcontractorPOService.getFirstSubcontractorId();
      const subPoId = await subcontractorPOService.createPO(jobNumericId, subcontractorId);
      await subcontractorPOService.addItem(subPoId, subcontractorId, 652.10, `Sub Item ${Date.now()}`);
      await subcontractorPOService.completeLine(subPoId);

      // Supplier Invoice Adjustments (API): Supplier PO → add item (0) → deliver → invoice (50) → resolve
      const poId2 = await purchaseOrderService.createPO(jobNumericId, supplierId);
      await purchaseOrderService.addLineItem(poId2, supplierId, 0, `Invoice Item ${Date.now()}`);
      await purchaseOrderService.deliverLine(poId2);
      await invoiceService.createSupplierPOInvoice(poId2, 50);
      await purchaseOrderService.resolvePurchaseOrder(poId2);
    });

    /** ID: TC_36_RQ4 Tags: Regression */
    test('[TC_36_RQ4] @Regression: [Profitability – Detail/Costs Tab] Actuals Only – Verify Profit = Invoiced Sell − (Actual Costs + PO Resolved)', async () => {

      const verifyProfit = async (tab: 'Costs' | 'Details') => {
        await jobDetailsPage.navigateToJob(profitRedirectUrl);
        await jobDetailsPage.switchToTab(tab);
        await jobDetailsPage.expandProfitOverview(tab);
        const loc = jobDetailsPage.getProfitLocators(tab);
        await expect.soft(loc.profitabilityActualsOnlySection).toBeVisible();
        await expect.soft(loc.actualsProfit).toContainText('-£5,702.10');
      };

      await verifyProfit('Costs');
      await verifyProfit('Details');
    });

    /** ID: TC_37_RQ4 Tags: Regression */
    test('[TC_37_RQ4] @Regression: [Profitability – Detail/Costs Tab] Actuals Only – Verify Profit % = -100% when Invoiced Sell = 0 (division-by-zero rule)', async () => {

      const verifyProfitPercent = async (tab: 'Costs' | 'Details') => {
        await jobDetailsPage.navigateToJob(profitRedirectUrl);
        await jobDetailsPage.switchToTab(tab);
        await jobDetailsPage.expandProfitOverview(tab);
        const loc = jobDetailsPage.getProfitLocators(tab);
        await expect.soft(loc.profitabilityActualsOnlySection).toBeVisible();
        await expect.soft(loc.actualsProfitPercent).toContainText('-100.00%');
      };

      await verifyProfitPercent('Costs');
      await verifyProfitPercent('Details');
    });
  }); // Actuals Profit Calculation

  test.describe('Actuals Profit Calculation with Invoice', () => {
    let invoicedProfitRedirectUrl: string;

    test.beforeEach(async ({ page, jobService, customerService, purchaseOrderService, invoiceService }) => {
      const subcontractorCostModal = new SubcontractorCostModal(page);

      const [jobTypeId, customerRes] = await Promise.all([
        jobService.getDefaultJobTypeId(),
        customerService.createCustomer({ Name: `Test Profit Invoice Job ${Date.now()}` }),
      ]);
      const customerId = Number(customerRes.body?.AdditionalData?.CustomerId);
      const siteId = Number(customerRes.body?.AdditionalData?.SiteId);
      if (!customerId || !siteId) throw new Error(`Failed to create customer/site. Response: ${JSON.stringify(customerRes.body)}`);

      const jobData = createBasicApiJobData(customerId, siteId, jobTypeId);
      invoicedProfitRedirectUrl = await JobDetailsPage.createJobAndGetRedirectUrl(jobService, jobData);
      console.log(`[Job] ${invoicedProfitRedirectUrl}`);

      // Actual Costs setup (UI): Add Subcontractor cost — Cost Per Hour = 2000
      await jobDetailsPage.navigateToJob(invoicedProfitRedirectUrl);
      await jobDetailsPage.switchToTab('Costs');
      await subcontractorCostModal.clickAddSubcontractor();
      await subcontractorCostModal.costPerHourInput.fill('2000');
      await subcontractorCostModal.saveModal();

      const jobNumericId = invoicedProfitRedirectUrl.split('/').pop()!;

      // Actual Costs setup (API): Supplier PO → add item (3000) → deliver
      const supplierId = await purchaseOrderService.getFirstSupplierId();
      const poId = await purchaseOrderService.createPO(jobNumericId, supplierId);
      await purchaseOrderService.addLineItem(poId, supplierId, 3000, `PO Item ${Date.now()}`);
      await purchaseOrderService.deliverLine(poId);

      // Supplier Invoice Adjustments (API): Supplier PO → add item (0) → deliver → invoice (500) → resolve
      const poId2 = await purchaseOrderService.createPO(jobNumericId, supplierId);
      await purchaseOrderService.addLineItem(poId2, supplierId, 0, `Invoice Item ${Date.now()}`);
      await purchaseOrderService.deliverLine(poId2);
      await invoiceService.createSupplierPOInvoice(poId2, 500);
      await purchaseOrderService.resolvePurchaseOrder(poId2);

      // Invoiced Sell (API): Create customer invoice = 7,000
      await invoiceService.createCustomerInvoice(jobNumericId, 7000);
    });

    /** ID: TC_38_RQ4 Tags: Regression */
    test('[TC_38_RQ4] @Regression: [Profitability – Detail/Costs Tab] Actuals Only – Verify Profit and Profit % when Invoiced Sell = £10,000, Actual Costs = £5,000, PO Resolved = £500', async () => {

      const verifyProfitAndPercent = async (tab: 'Costs' | 'Details') => {
        await jobDetailsPage.navigateToJob(invoicedProfitRedirectUrl);
        await jobDetailsPage.switchToTab(tab);
        await jobDetailsPage.expandProfitOverview(tab);
        const loc = jobDetailsPage.getProfitLocators(tab);
        await expect.soft(loc.profitabilityActualsOnlySection).toBeVisible();
        await expect.soft(loc.actualsInvoicedCustomer).toContainText('£10,000.00');
        await expect.soft(loc.actualsProfit).toContainText('£4,500.00');
        await expect.soft(loc.actualsProfitPercent).toContainText('45.00%');
      };

      await verifyProfitAndPercent('Costs');
      await verifyProfitAndPercent('Details');
    });
  }); // Actuals Profit Calculation with Invoice
}); // Detailed with Cost Breakdown View
