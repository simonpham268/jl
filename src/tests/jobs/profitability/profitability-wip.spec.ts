import { test, expect } from '../../../fixtures/combined.fixture';
import type { Page } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { JobDetailsPage } from '../../../pages/Jobs/JobDetailsPage';
import type { ProfitabilityTab } from '../../../pages/Jobs/JobDetailsPage';
import { SystemSetupPage } from '../../../pages/Settings/SystemSetupPage';
import { QuoteDetailPage } from '../../../pages/Quotes/QuoteDetailPage';
import { LabourCostModal, PriceType } from '../../../modals/LabourCostModal';
import { OvertimeCostModal } from '../../../modals/OvertimeCostModal';
import { parseCurrencyValue, CURRENCY_FORMAT } from '../../../utils/currency.util';
import { ApiQuoteDataBuilder } from '../../../data/apiData/quote.api.data';

const profitabilityTabs: ProfitabilityTab[] = ['Details', 'Costs'];

type QuoteUpgradeServices = {
  quoteService: any;
  customerService: any;
  siteService: any;
  jobService: any;
};

async function createJobFromQuote(
  services: QuoteUpgradeServices,
  quoteDetailPage: QuoteDetailPage,
  quoteLabourModal: LabourCostModal,
  page: Page,
  opts: { prefix: string; quoteSell: number; description: string },
): Promise<{ jobNumericId: string; jobPath: string }> {
  const { quoteService, customerService, siteService, jobService } = services;
  const customerName = `${opts.prefix} Auto ${Date.now()}`;

  const [jobTypeId, customerRes] = await Promise.all([
    jobService.getDefaultJobTypeId(),
    customerService.createCustomer({ Name: customerName }),
  ]);

  const customerId = Number(customerRes.body?.AdditionalData?.CustomerId);
  if (!customerId) throw new Error(`Failed to create customer. Response: ${JSON.stringify(customerRes.body)}`);

  const siteRes = await siteService.createSite({ CustomerId: customerId, CustomerName: customerName, Name: `${opts.prefix} Site ${Date.now()}` });
  const siteBody = siteRes.body as any;
  const siteId = Number(siteBody?.AdditionalData?.SiteId ?? siteBody?.SiteId);
  if (!siteId) throw new Error(`Failed to create site. Response: ${JSON.stringify(siteRes.body)}`);

  const quoteRes = await quoteService.createQuote(
    ApiQuoteDataBuilder.create().customerId(customerId).siteId(siteId).jobType(String(jobTypeId)).build(),
  );
  const quoteBody = quoteRes.body as any;
  const quoteId = quoteBody?.AdditionalData?.QuoteId ?? quoteBody?.QuoteId
    ?? quoteBody?.redirectUrl?.match(/\/(\d+)$/)?.[1];
  if (!quoteId) throw new Error(`quoteId could not be created. Response: ${JSON.stringify(quoteRes.body)}`);

  await quoteDetailPage.navigateTo(quoteId);
  await quoteDetailPage.switchToTab('Prices');
  await quoteLabourModal.clickAddLabour();
  await quoteLabourModal.fillAddLabourCostModal({
    description: `Quote Labour ${Date.now()}`,
    costPerHour: 0,
    priceType: PriceType.FIX_PRICE,
    sellPerHour: opts.quoteSell,
  });
  await quoteLabourModal.saveModal();

  await quoteDetailPage.switchToTab('Details');
  await quoteDetailPage.enableEditMode();
  await quoteDetailPage.fillDescription(opts.description);
  await quoteDetailPage.saveChanges();

  await quoteDetailPage.clickUpgrade();
  await quoteDetailPage.clickUpgradeQuoteNext();
  await quoteDetailPage.clickUpgradeQuoteSkipAndUpgrade();

  expect(page.url()).toContain('/Job/Detail/');

  const urlMatch = page.url().match(/\/Job\/Detail\/(\d+)/);
  if (!urlMatch) throw new Error(`Could not extract job ID from URL: ${page.url()}`);
  const jobNumericId = urlMatch[1];
  return { jobNumericId, jobPath: `/Job/Detail/${jobNumericId}` };
}

test.describe('[Profitability - Detail/Costs Tab] Job Profitability Include WIP', () => {
  let loginPage: LoginPage;
  let systemSetupPage: SystemSetupPage;
  let quoteDetailPage: QuoteDetailPage;
  let jobDetailsPage: JobDetailsPage;
  let quoteLabourModal: LabourCostModal;
  let jobLabourModal: LabourCostModal;
  let overtimeModal: OvertimeCostModal;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    systemSetupPage = new SystemSetupPage(page);
    quoteDetailPage = new QuoteDetailPage(page);
    jobDetailsPage = new JobDetailsPage(page);
    quoteLabourModal = new LabourCostModal(page, 'Quote');
    jobLabourModal = new LabourCostModal(page, 'Job');
    overtimeModal = new OvertimeCostModal(page);

    await loginPage.goToBaseURL();
    await systemSetupPage.navigateToSystemSetup();
    await systemSetupPage.configureJobProfitabilityView('Detailed with Cost Breakdown View');
  });

  /** ID: TC_23_RQ4 Tags: Smoke, Regression */
  test('[TC_23_RQ4] @Smoke @Regression: [Profitability - Detail/Costs Tab] Job Profitability Include WIP - Verify Sell - Additional Chargeable Lines mapping', async ({ page, quoteService, customerService, siteService, jobService }) => {
    const sellPerHour = Math.floor(Math.random() * 900) + 100;
    const quoteDescription = `TC23 Quote ${Date.now()}`;

    await createJobFromQuote(
      { quoteService, customerService, siteService, jobService },
      quoteDetailPage, quoteLabourModal, page,
      { prefix: 'TC23', quoteSell: sellPerHour, description: quoteDescription },
    );

    await jobDetailsPage.switchToTab('Details');
    const jobDescription23 = await jobDetailsPage.getDescription();
    expect.soft(jobDescription23).toContain(quoteDescription);

    await JobDetailsPage.forEachTab(jobDetailsPage, profitabilityTabs, async (tab) => {
      await jobDetailsPage.expandProfitOverview(tab);
      const loc = jobDetailsPage.getProfitLocators(tab);
      await expect(loc.quotedProfitabilitySection).toBeVisible();

      const { sell } = await jobDetailsPage.getQuotedSellValue(tab);
      expect.soft(sell).toMatch(CURRENCY_FORMAT);
      expect.soft(parseCurrencyValue(sell)).toBe(sellPerHour);
    });
  });

  test.describe('Current Profit and Profit Margin', () => {
    let jobPath: string;
    let totalJobSell: number;
    let totalExpectedCost: number;

    test.beforeEach(async ({ page, quoteService, customerService, siteService, jobService, purchaseOrderService, subcontractorPOService }) => {
      const quoteSell = Math.floor(Math.random() * 900) + 100;
      const jobLabourSell = Math.floor(Math.random() * 900) + 100;
      const supplierPOCost = Math.floor(Math.random() * 900) + 100;
      const subPOCost = Math.floor(Math.random() * 900) + 100;
      totalJobSell = quoteSell + jobLabourSell;
      totalExpectedCost = supplierPOCost + subPOCost;

      const quoteDescription = `WIP Quote ${Date.now()}`;
      const { jobNumericId, jobPath: path } = await createJobFromQuote(
        { quoteService, customerService, siteService, jobService },
        quoteDetailPage, quoteLabourModal, page,
        { prefix: 'TC25-26', quoteSell, description: quoteDescription },
      );
      jobPath = path;

      await jobDetailsPage.switchToTab('Details');
      const jobDescription = await jobDetailsPage.getDescription();
      expect.soft(jobDescription).toContain(quoteDescription);

      await jobDetailsPage.switchToTab('Costs');
      await jobLabourModal.clickAddLabour();
      await jobLabourModal.fillAddLabourCostModal({
        description: `Job Labour ${Date.now()}`,
        costPerHour: 0,
        priceType: PriceType.FIX_PRICE,
        sellPerHour: jobLabourSell,
      });
      await jobLabourModal.saveModal();

      const supplierId = await purchaseOrderService.getFirstSupplierId();
      const poId = await purchaseOrderService.createPO(jobNumericId, supplierId);
      await purchaseOrderService.addLineItem(poId, supplierId, supplierPOCost, `Supplier PO ${Date.now()}`);

      const subcontractorId = await subcontractorPOService.getFirstSubcontractorId();
      const subPoId = await subcontractorPOService.createPO(jobNumericId, subcontractorId);
      await subcontractorPOService.addItem(subPoId, subcontractorId, subPOCost, `Sub PO ${Date.now()}`);
    });

    /** ID: TC_25_RQ4 Tags: Smoke, Regression */
    test('[TC_25_RQ4] @Smoke @Regression: [Profitability - Detail/Costs Tab] Job Profitability Include WIP - Verify Current Profit calculation', async () => {
      const expectedCurrentProfit = totalJobSell - totalExpectedCost;

      const verifyCurrentProfit = async (tab: 'Costs' | 'Details') => {
        await jobDetailsPage.navigateToJob(jobPath);
        await jobDetailsPage.switchToTab(tab);
        await jobDetailsPage.expandProfitOverview(tab);
        const loc = jobDetailsPage.getProfitLocators(tab);
        await expect.soft(loc.profitabilityIncludeWIPSection).toBeVisible();
        const wipCurrentProfitText = (await loc.wipCurrentProfit.textContent()) ?? '';
        expect.soft(wipCurrentProfitText).toMatch(CURRENCY_FORMAT);
        expect.soft(parseCurrencyValue(wipCurrentProfitText)).toBeCloseTo(expectedCurrentProfit, 2);
      };

      await verifyCurrentProfit('Costs');
      await verifyCurrentProfit('Details');
    });

    /** ID: TC_26_RQ4 Tags: Smoke, Regression */
    test('[TC_26_RQ4] @Smoke @Regression: [Profitability - Detail/Costs Tab] Job Profitability Include WIP - Verify Profit Margin calculation', async () => {
      const expectedProfitMargin = (totalJobSell - totalExpectedCost) / totalJobSell * 100;

      const verifyProfitMargin = async (tab: 'Costs' | 'Details') => {
        await jobDetailsPage.navigateToJob(jobPath);
        await jobDetailsPage.switchToTab(tab);
        await jobDetailsPage.expandProfitOverview(tab);
        const loc = jobDetailsPage.getProfitLocators(tab);
        await expect.soft(loc.profitabilityIncludeWIPSection).toBeVisible();
        const wipProfitMarginText = (await loc.wipProfitMargin.textContent()) ?? '';
        expect.soft(wipProfitMarginText).toMatch(/-?\d+[\d,.]*\.\d{2}%/);
        expect.soft(parseCurrencyValue(wipProfitMarginText)).toBeCloseTo(expectedProfitMargin, 2);
      };

      await verifyProfitMargin('Costs');
      await verifyProfitMargin('Details');
    });
  }); // Current Profit and Profit Margin

  /** ID: TC_24_RQ4 Tags: Smoke, Regression */
  test('[TC_24_RQ4] @Smoke @Regression: [Profitability - Detail/Costs Tab] Job Profitability Include WIP - Verify Total Job Sell calculation', async ({ page, quoteService, customerService, siteService, jobService }) => {
    const quoteSell = Math.floor(Math.random() * 900) + 100;
    const labourJobSell = Math.floor(Math.random() * 900) + 100;
    const overtimeSell = Math.floor(Math.random() * 900) + 100;
    const expectedTotal = quoteSell + labourJobSell + overtimeSell;
    const quoteDescription = `TC24 Quote ${Date.now()}`;

    await createJobFromQuote(
      { quoteService, customerService, siteService, jobService },
      quoteDetailPage, quoteLabourModal, page,
      { prefix: 'TC24', quoteSell, description: quoteDescription },
    );

    await jobDetailsPage.switchToTab('Details');
    const jobDescription24 = await jobDetailsPage.getDescription();
    expect.soft(jobDescription24).toContain(quoteDescription);

    await jobDetailsPage.switchToTab('Costs');
    await jobLabourModal.clickAddLabour();
    await jobLabourModal.fillAddLabourCostModal({
      description: `Job Labour ${Date.now()}`,
      costPerHour: 0,
      priceType: PriceType.FIX_PRICE,
      sellPerHour: labourJobSell,
    });
    await jobLabourModal.saveModal();

    await overtimeModal.clickAddOvertime();
    await overtimeModal.fillAddOvertimeCostModal({
      description: `Overtime ${Date.now()}`,
      costPerHour: 0,
      priceType: PriceType.FIX_PRICE,
      sellPerHour: overtimeSell,
    });
    await overtimeModal.saveModal();

    await JobDetailsPage.forEachTab(jobDetailsPage, profitabilityTabs, async (tab) => {
      await jobDetailsPage.expandProfitOverview(tab);
      const loc = jobDetailsPage.getProfitLocators(tab);
      await expect(loc.profitabilityIncludeWIPSection).toBeVisible();

      const wipSellText = (await loc.wipTotalJobSell.textContent()) ?? '';
      expect.soft(wipSellText).toMatch(CURRENCY_FORMAT);
      expect.soft(parseCurrencyValue(wipSellText)).toBeCloseTo(expectedTotal, 2);
    });
  });
});
