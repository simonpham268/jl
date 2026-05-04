/** ID: 28951 28952 Tags: @Regression @SOR @Quote @Price */
import { test, expect } from '../fixtures/combined.fixture';
import { LoginPage } from '../pages/LoginPage';
import { QuoteDetailPage } from '../pages/Quotes/QuoteDetailPage';
import { createBasicApiQuoteData } from '../data/apiData/quote.api.data';

test.describe('Quote - Price - SOR Toggle', () => {
  let loginPage: LoginPage;
  let quoteDetailPage: QuoteDetailPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    quoteDetailPage = new QuoteDetailPage(page);
    await loginPage.goToBaseURL();
  });

  test('[TC28951] @Regression @SOR: SOR toggle changes non-SOR Cost Headers to NonChargeable', async ({ quoteService }) => {
    // Precondition: Create quote via API
    const response = await quoteService.createQuote(createBasicApiQuoteData());

    if (!response.body) throw new Error(`No response body from createQuote (HTTP ${response.status} ${response.statusText})`);
    const body = response.body as any;
    const quoteId = body.AdditionalData?.QuoteId ?? body.QuoteId
      ?? body.redirectUrl?.match(/\/(\d+)$/)?.[1];
    if (!quoteId) throw new Error(`Missing QuoteId. Full response: ${JSON.stringify(response.body)}`);

    // Step 1-2: Open Quote detail page
    await quoteDetailPage.navigateTo(quoteId);

    // Step 3: Click Prices tab
    await quoteDetailPage.switchToTab('Prices');

    // Precondition: Add line items to Labour, Travel, Material
    // so the Chargeable column has YES values to verify after SOR toggle
    await quoteDetailPage.enableCostHeaderRows(['Labour', 'Travel', 'Material']);

    // Step 4: Verify SOR toggle is currently OFF (default state)
    const isSorOff = await quoteDetailPage.isSorToggleChecked();
    expect(isSorOff).toBe(false);

    // Step 5: Click Schedule of Rates toggle to ON
    await quoteDetailPage.toggleSorToggle(true);

    // Step 6: Verify ALL non-SOR Cost Headers that have line items are NonChargeable (NO)
    // Use poll() to retry until DOM fully reflects the SOR toggle change
    await expect.poll(
      async () => quoteDetailPage.verifyAllNonSorHeadersNonChargeable(),
      { timeout: 5000, intervals: [500, 1000, 2000] }
    ).toBe(true);
  });

  test('[TC28952] @Regression @SOR: SOR toggle does not change Schedule of Rates Cost Header to NonChargeable', async ({ quoteService }) => {
    // Step 1: Create quote via API
    const response = await quoteService.createQuote(createBasicApiQuoteData());

    if (!response.body) throw new Error(`No response body from createQuote (HTTP ${response.status} ${response.statusText})`);
    const body = response.body as any;
    const quoteId = body.AdditionalData?.QuoteId ?? body.QuoteId
      ?? body.redirectUrl?.match(/\/(\d+)$/)?.[1];
    if (!quoteId) throw new Error(`Missing QuoteId. Full response: ${JSON.stringify(response.body)}`);

    // Step 2: Navigate to Quote Detail page
    await quoteDetailPage.navigateTo(quoteId);

    // Step 3: Switch to Prices tab
    await quoteDetailPage.switchToTab('Prices');

    // Step 4: Enable line items for Labour, Travel, Material AND Schedule of Rates
    await quoteDetailPage.enableCostHeaderRows(['Labour', 'Travel', 'Material', 'Schedule of Rates']);

    // Step 5: Verify SOR toggle is currently OFF (default state)
    const isSorOff = await quoteDetailPage.isSorToggleChecked();
    expect(isSorOff).toBe(false);

    // Step 6: Turn SOR toggle ON
    await quoteDetailPage.toggleSorToggle(true);

    // Step 7: Verify non-SOR Cost Headers (Labour, Travel, Material) become NonChargeable (NO)
    await expect.poll(
      async () => quoteDetailPage.verifyAllNonSorHeadersNonChargeable(),
      { timeout: 5000, intervals: [500, 1000, 2000] }
    ).toBe(true);

    // Step 8: Verify Schedule of Rates Cost Header is still Chargeable (YES)
    // Unlike non-SOR headers, the SOR header should NOT be changed to NonChargeable after SOR toggle ON
    const sorStatus = await quoteDetailPage.getCostHeaderChargeableStatus('Schedule of Rates');
    expect(sorStatus).toBe('YES');
  });
});
