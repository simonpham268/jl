import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Refrigerant Audit item interface
 */
export interface RefrigerantAuditItem {
  customer?: string;
  site?: string;
  assetDescription?: string;
  refrigerantType?: string;
}

/**
 * Refrigerant Audit search options
 */
export interface RefrigerantAuditSearchOptions {
  searchTerms?: string;
  assetDescription?: string[];
  refrigerantType?: string[];
}

/**
 * RefrigerantAuditPage - Page Object for Refrigerant Audit page
 * URL: /Refcom/RefrigerantAudit
 */
export class RefrigerantAuditPage extends BasePage {
  // ========================
  // Locators - Header/Actions
  // ========================
  readonly pageTitle: Locator;
  readonly printButton: Locator;
  readonly exportButton: Locator;

  // ========================
  // Locators - Filter
  // ========================
  readonly searchTermsInput: Locator;
  readonly assetDescriptionMultiselect: Locator;
  readonly refrigerantTypeMultiselect: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // ========================
  // Locators - Results
  // ========================
  readonly resultsTitle: Locator;
  readonly table: Locator;
  readonly tableRows: Locator;
  readonly loadingIndicator: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Header/Actions
    this.pageTitle = page.getByRole('heading', { name: 'Refrigerant Audit' });
    this.printButton = page.locator('text=Print');
    this.exportButton = page.locator('text=Export');

    // Filter
    this.searchTermsInput = page.getByPlaceholder(/Customer|Site/);
    this.assetDescriptionMultiselect = page.locator('text=Asset Description').locator('..').locator('[class*="multiselect"], [role="listbox"]');
    this.refrigerantTypeMultiselect = page.locator('text=Refrigerant Type').locator('..').locator('[class*="multiselect"], [role="listbox"]');
    this.resetFilterButton = page.getByRole('button', { name: /Reset Filter/ });
    this.searchButton = page.getByRole('button', { name: /Search/ });

    // Results
    this.resultsTitle = page.locator('p:has-text("Refrigerant Audit")');
    this.table = page.locator('table').first();
    this.tableRows = page.locator('table tbody tr');
    this.loadingIndicator = page.locator('text=Loading Data');
    this.noResultsMessage = page.locator('text=No matching results found');
  }

  // ========================
  // Navigation Methods
  // ========================

  /**
   * Navigate to Refrigerant Audit page
   */
  async navigateToRefrigerantAudit(): Promise<void> {
    await test.step('Navigate to Refrigerant Audit page', async () => {
      await this.page.goto('/Refcom/RefrigerantAudit');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Refrigerant Audit page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
    });
  }

  // ========================
  // Action Methods
  // ========================

  /**
   * Click Print button
   */
  async clickPrint(): Promise<void> {
    await test.step('Click Print button', async () => {
      await this.printButton.click();
    });
  }

  /**
   * Click Export button
   */
  async clickExport(): Promise<void> {
    await test.step('Click Export button', async () => {
      await this.exportButton.click();
    });
  }

  // ========================
  // Filter Methods
  // ========================

  /**
   * Search terms
   */
  async searchTerms(query: string): Promise<void> {
    await test.step(`Search terms: ${query}`, async () => {
      await this.searchTermsInput.fill(query);
    });
  }

  /**
   * Select asset descriptions
   */
  async selectAssetDescriptions(descriptions: string[]): Promise<void> {
    await test.step(`Select asset descriptions: ${descriptions.join(', ')}`, async () => {
      await this.assetDescriptionMultiselect.click();
      for (const desc of descriptions) {
        await this.page.getByRole('option', { name: new RegExp(desc, 'i') }).click();
      }
      await this.page.keyboard.press('Escape');
    });
  }

  /**
   * Select refrigerant types
   */
  async selectRefrigerantTypes(types: string[]): Promise<void> {
    await test.step(`Select refrigerant types: ${types.join(', ')}`, async () => {
      await this.refrigerantTypeMultiselect.click();
      for (const type of types) {
        await this.page.getByRole('option', { name: new RegExp(type, 'i') }).click();
      }
      await this.page.keyboard.press('Escape');
    });
  }

  /**
   * Click reset filter button
   */
  async clickResetFilter(): Promise<void> {
    await test.step('Click reset filter', async () => {
      await this.resetFilterButton.click();
    });
  }

  /**
   * Click search button
   */
  async clickSearch(): Promise<void> {
    await test.step('Click search button', async () => {
      await this.searchButton.click();
    });
  }

  /**
   * Search and wait for results
   */
  async searchAndWait(query?: string): Promise<void> {
    await test.step(`Search and wait for results${query ? `: ${query}` : ''}`, async () => {
      if (query) {
        await this.searchTerms(query);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }

  // ========================
  // Results Methods
  // ========================

  /**
   * Wait for data to load
   */
  async waitForDataLoad(): Promise<void> {
    await test.step('Wait for data to load', async () => {
      await this.loadingIndicator.waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {});
    });
  }

  /**
   * Check if no results visible
   */
  async isNoResultsVisible(): Promise<boolean> {
    return await test.step('Check if no results visible', async () => {
      return await this.noResultsMessage.isVisible();
    });
  }

  /**
   * Get row count
   */
  async getRowCount(): Promise<number> {
    return await test.step('Get row count', async () => {
      await this.waitForDataLoad();
      if (await this.isNoResultsVisible()) {
        return 0;
      }
      return await this.tableRows.count();
    });
  }

  /**
   * Click row by index
   */
  async clickRowByIndex(index: number): Promise<void> {
    await test.step(`Click row at index ${index}`, async () => {
      await this.tableRows.nth(index).click();
    });
  }

  // ========================
  // Combined Methods
  // ========================

  /**
   * Apply search filters
   */
  async applyFilters(options: RefrigerantAuditSearchOptions): Promise<void> {
    await test.step('Apply search filters', async () => {
      if (options.searchTerms) {
        await this.searchTerms(options.searchTerms);
      }
      if (options.assetDescription) {
        await this.selectAssetDescriptions(options.assetDescription);
      }
      if (options.refrigerantType) {
        await this.selectRefrigerantTypes(options.refrigerantType);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }
}
