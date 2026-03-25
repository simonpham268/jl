import { Locator, Page } from "@playwright/test";
import { test, expect } from '@playwright/test';
import { BasePage } from "../BasePage";

/**
 * Stock Bulk Transfer item interface
 */
export interface StockBulkTransferItem {
  number?: string;
  description?: string;
  reference?: string;
  location?: string;
  quantity?: number;
}

/**
 * Stock Bulk Transfer search options
 */
export interface StockBulkTransferSearchOptions {
  query?: string;
  locations?: string[];
}

/**
 * StockBulkTransferPage - Page Object for Stock Bulk Transfer page
 * URL: /Stock/StockBulkTransfer
 */
export class StockBulkTransferPage extends BasePage {
  // ========================
  // Locators - Header
  // ========================
  readonly pageTitle: Locator;

  // ========================
  // Locators - Filter
  // ========================
  readonly searchInput: Locator;
  readonly locationMultiselect: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // ========================
  // Locators - Form
  // ========================
  readonly requiredFieldsText: Locator;
  readonly cancelButton: Locator;
  readonly transferButton: Locator;

  // ========================
  // Locators - Results
  // ========================
  readonly table: Locator;
  readonly tableRows: Locator;
  readonly loadingIndicator: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Header
    this.pageTitle = page.getByRole('heading', { name: 'Stock Bulk Transfer' });

    // Filter
    this.searchInput = page.getByPlaceholder(/Number|Description|Reference/);
    this.locationMultiselect = page.locator('text=Location').locator('..').locator('[class*="multiselect"], [role="listbox"]');
    this.resetFilterButton = page.getByRole('button', { name: /Reset Filter/ });
    this.searchButton = page.getByRole('button', { name: /Search/ });

    // Form
    this.requiredFieldsText = page.locator('text=* Required Fields');
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.transferButton = page.getByRole('button', { name: /Transfer/ });

    // Results
    this.table = page.locator('table').first();
    this.tableRows = page.locator('table tbody tr');
    this.loadingIndicator = page.locator('text=Loading Data');
    this.noResultsMessage = page.locator('text=No matching results found');
  }

  // ========================
  // Navigation Methods
  // ========================

  /**
   * Navigate to Stock Bulk Transfer page
   */
  async navigateToStockBulkTransfer(): Promise<void> {
    await test.step('Navigate to Stock Bulk Transfer page', async () => {
      await this.page.goto('/Stock/StockBulkTransfer');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Stock Bulk Transfer page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
    });
  }

  // ========================
  // Filter Methods
  // ========================

  /**
   * Search stock records
   */
  async search(query: string): Promise<void> {
    await test.step(`Search: ${query}`, async () => {
      await this.searchInput.fill(query);
    });
  }

  /**
   * Select locations
   */
  async selectLocations(locations: string[]): Promise<void> {
    await test.step(`Select locations: ${locations.join(', ')}`, async () => {
      await this.locationMultiselect.click();
      for (const location of locations) {
        await this.page.getByRole('option', { name: new RegExp(location, 'i') }).click();
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
        await this.search(query);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }

  // ========================
  // Form Methods
  // ========================

  /**
   * Click Cancel button
   */
  async clickCancel(): Promise<void> {
    await test.step('Click Cancel button', async () => {
      await this.cancelButton.click();
    });
  }

  /**
   * Click Transfer button
   */
  async clickTransfer(): Promise<void> {
    await test.step('Click Transfer button', async () => {
      await this.transferButton.click();
    });
  }

  /**
   * Check if transfer button is enabled
   */
  async isTransferEnabled(): Promise<boolean> {
    return await test.step('Check if transfer button is enabled', async () => {
      return await this.transferButton.isEnabled();
    });
  }

  /**
   * Check if cancel button is enabled
   */
  async isCancelEnabled(): Promise<boolean> {
    return await test.step('Check if cancel button is enabled', async () => {
      return await this.cancelButton.isEnabled();
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

  /**
   * Select row checkbox by index
   */
  async selectRowByIndex(index: number): Promise<void> {
    await test.step(`Select row checkbox at index ${index}`, async () => {
      await this.tableRows.nth(index).locator('input[type="checkbox"]').check();
    });
  }

  /**
   * Deselect row checkbox by index
   */
  async deselectRowByIndex(index: number): Promise<void> {
    await test.step(`Deselect row checkbox at index ${index}`, async () => {
      await this.tableRows.nth(index).locator('input[type="checkbox"]').uncheck();
    });
  }

  // ========================
  // Combined Methods
  // ========================

  /**
   * Apply search filters
   */
  async applyFilters(options: StockBulkTransferSearchOptions): Promise<void> {
    await test.step('Apply search filters', async () => {
      if (options.query) {
        await this.search(options.query);
      }
      if (options.locations) {
        await this.selectLocations(options.locations);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }
}
