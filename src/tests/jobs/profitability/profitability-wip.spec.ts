import { test, expect } from '../../../fixtures/combined.fixture';
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
    const labourDescription = `Labour ${Date.now()}`;
    const quoteDescription = `TC23 Quote ${Date.now()}`;
    const customerName = `TC23 Auto ${Date.now()}`;

    const [jobTypeId, customerRes] = await Promise.all([
      jobService.getDefaultJobTypeId(),
      customerService.createCustomer({ Name: customerName }),
    ]);

    const customerId = Number(customerRes.body?.AdditionalData?.CustomerId);
    if (!customerId) throw new Error(`Failed to create customer. Response: ${JSON.stringify(customerRes.body)}`);

    const siteRes = await siteService.createSite({ CustomerId: customerId, CustomerName: customerName, Name: `TC23 Site ${Date.now()}` });
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
      description: labourDescription,
      costPerHour: 0,
      priceType: PriceType.FIX_PRICE,
      sellPerHour: sellPerHour,
    });
    await quoteLabourModal.saveModal();

    await quoteDetailPage.switchToTab('Details');
    await quoteDetailPage.enableEditMode();
    await quoteDetailPage.fillDescription(quoteDescription);
    await quoteDetailPage.saveChanges();

    await quoteDetailPage.clickUpgrade();
    await quoteDetailPage.clickUpgradeQuoteNext();
    await quoteDetailPage.clickUpgradeQuoteSkipAndUpgrade();

    expect(page.url()).toContain('/Job/Detail/');

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

  /** ID: TC_24_RQ4 Tags: Smoke, Regression */
  test('[TC_24_RQ4] @Smoke @Regression: [Profitability - Detail/Costs Tab] Job Profitability Include WIP - Verify Total Job Sell calculation', async ({ page, quoteService, customerService, siteService, jobService }) => {
    const quoteSell = Math.floor(Math.random() * 900) + 100;
    const labourJobSell = Math.floor(Math.random() * 900) + 100;
    const overtimeSell = Math.floor(Math.random() * 900) + 100;
    const expectedTotal = quoteSell + labourJobSell + overtimeSell;
    const quoteLabourDescription = `Labour ${Date.now()}`;
    const jobLabourDescription = `Job Labour ${Date.now()}`;
    const overtimeDescription = `Overtime ${Date.now()}`;
    const quoteDescription = `TC24 Quote ${Date.now()}`;
    const customerName = `TC24 Auto ${Date.now()}`;

    const [jobTypeId, customerRes] = await Promise.all([
      jobService.getDefaultJobTypeId(),
      customerService.createCustomer({ Name: customerName }),
    ]);

    const customerId = Number(customerRes.body?.AdditionalData?.CustomerId);
    if (!customerId) throw new Error(`Failed to create customer. Response: ${JSON.stringify(customerRes.body)}`);

    const siteRes = await siteService.createSite({ CustomerId: customerId, CustomerName: customerName, Name: `TC24 Site ${Date.now()}` });
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
      description: quoteLabourDescription,
      costPerHour: 0,
      priceType: PriceType.FIX_PRICE,
      sellPerHour: quoteSell,
    });
    await quoteLabourModal.saveModal();

    await quoteDetailPage.switchToTab('Details');
    await quoteDetailPage.enableEditMode();
    await quoteDetailPage.fillDescription(quoteDescription);
    await quoteDetailPage.saveChanges();

    await quoteDetailPage.clickUpgrade();
    await quoteDetailPage.clickUpgradeQuoteNext();
    await quoteDetailPage.clickUpgradeQuoteSkipAndUpgrade();

    expect(page.url()).toContain('/Job/Detail/');

    await jobDetailsPage.switchToTab('Details');
    const jobDescription24 = await jobDetailsPage.getDescription();
    expect.soft(jobDescription24).toContain(quoteDescription);

    await jobDetailsPage.switchToTab('Costs');

    await jobLabourModal.clickAddLabour();
    await jobLabourModal.fillAddLabourCostModal({
      description: jobLabourDescription,
      costPerHour: 0,
      priceType: PriceType.FIX_PRICE,
      sellPerHour: labourJobSell,
    });
    await jobLabourModal.saveModal();

    await overtimeModal.clickAddOvertime();
    await overtimeModal.fillAddOvertimeCostModal({
      description: overtimeDescription,
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

  /** ID: TC_25_RQ4 Tags: Smoke, Regression */
  test('[TC_25_RQ4] @Smoke @Regression: [Profitability - Detail/Costs Tab] Job Profitability Include WIP - Verify Current Profit calculation', async ({ page, quoteService, customerService, siteService, jobService, purchaseOrderService, subcontractorPOService }) => {
    const quoteSell = Math.floor(Math.random() * 400) + 300;
    const jobSell = Math.floor(Math.random() * 400) + 300;
    const supplierPoAmount = Math.floor(Math.random() * 150) + 50;
    const subPoAmount = Math.floor(Math.random() * 150) + 50;
    const totalJobSell = quoteSell + jobSell;
    const totalExpectedCost = supplierPoAmount + subPoAmount;
    const expectedCurrentProfit = totalJobSell - totalExpectedCost;
    const quoteLabourDescription = `Labour ${Date.now()}`;
    const jobLabourDescription = `Job Labour ${Date.now()}`;
    const quoteDescription = `TC25 Quote ${Date.now()}`;
    const customerName = `TC25 Auto ${Date.now()}`;

    const [jobTypeId, customerRes] = await Promise.all([
      jobService.getDefaultJobTypeId(),
      customerService.createCustomer({ Name: customerName }),
    ]);

    const customerId = Number(customerRes.body?.AdditionalData?.CustomerId);
    if (!customerId) throw new Error(`Failed to create customer. Response: ${JSON.stringify(customerRes.body)}`);

    const siteRes = await siteService.createSite({ CustomerId: customerId, CustomerName: customerName, Name: `TC25 Site ${Date.now()}` });
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
      description: quoteLabourDescription,
      costPerHour: 0,
      priceType: PriceType.FIX_PRICE,
      sellPerHour: quoteSell,
    });
    await quoteLabourModal.saveModal();

    await quoteDetailPage.switchToTab('Details');
    await quoteDetailPage.enableEditMode();
    await quoteDetailPage.fillDescription(quoteDescription);
    await quoteDetailPage.saveChanges();

    await quoteDetailPage.clickUpgrade();
    await quoteDetailPage.clickUpgradeQuoteNext();
    await quoteDetailPage.clickUpgradeQuoteSkipAndUpgrade();

    expect(page.url()).toContain('/Job/Detail/');

    await jobDetailsPage.switchToTab('Details');
    const jobDescription25 = await jobDetailsPage.getDescription();
    expect.soft(jobDescription25).toContain(quoteDescription);

    const jobIdMatch = page.url().match(/\/Job\/Detail\/(\d+)/);
    if (!jobIdMatch) throw new Error(`Could not extract job ID from URL: ${page.url()}`);
    const jobNumericId = jobIdMatch[1];

    const supplierId = await purchaseOrderService.getFirstSupplierId();
    const poId = await purchaseOrderService.createPO(jobNumericId, supplierId);
    await purchaseOrderService.addLineItem(poId, supplierId, supplierPoAmount, `Supplier Item ${Date.now()}`);

    const subcontractorId = await subcontractorPOService.getFirstSubcontractorId();
    const subPoId = await subcontractorPOService.createPO(jobNumericId, subcontractorId);
    await subcontractorPOService.addItem(subPoId, subcontractorId, subPoAmount, `Sub Item ${Date.now()}`);

    await jobDetailsPage.switchToTab('Costs');
    await jobLabourModal.clickAddLabour();
    await jobLabourModal.fillAddLabourCostModal({
      description: jobLabourDescription,
      costPerHour: 0,
      priceType: PriceType.FIX_PRICE,
      sellPerHour: jobSell,
    });
    await jobLabourModal.saveModal();

    await JobDetailsPage.forEachTab(jobDetailsPage, profitabilityTabs, async (tab) => {
      await jobDetailsPage.expandProfitOverview(tab);
      const loc = jobDetailsPage.getProfitLocators(tab);
      await expect(loc.profitabilityIncludeWIPSection).toBeVisible();

      const wipCurrentProfitText = (await loc.wipCurrentProfit.textContent()) ?? '';
      expect.soft(wipCurrentProfitText).toMatch(CURRENCY_FORMAT);
      expect.soft(parseCurrencyValue(wipCurrentProfitText)).toBeCloseTo(expectedCurrentProfit, 2);
    });
  });
});
