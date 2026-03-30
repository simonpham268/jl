import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Stock Reorder Report item interface
 */
export interface StockReorderReportItem {
  description?: string;
  location?: string;
  itemNumber?: string;
  currentStock?: number;
  reorderLevel?: number;
}

/**
 * Stock Reorder Report search options
 */
export interface StockReorderReportSearchOptions {
  query?: string;
  itemDescriptions?: string[];
  locations?: string[];
}

/**
 * StockReorderReportPage - Page Object for Stock Reorder Report page
 * URL: /StockReorder
 */
export class StockReorderReportPage extends BasePage {
  // ========================
  // Locators - Header/Actions
  // ========================
  readonly pageTitle: Locator;
  readonly createStockReorderLink: Locator;

  // ========================
  // Locators - Filter
  // ========================
  readonly searchInput: Locator;
  readonly itemDescriptionMultiselect: Locator;
  readonly locationMultiselect: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // ========================
  // Locators - Results
  // ========================
  readonly listHeading: Locator;
  readonly columnSettingsButton: Locator;
  readonly table: Locator;
  readonly tableRows: Locator;
  readonly loadingIndicator: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Header/Actions
    this.pageTitle = page.getByRole('heading', { name: 'Stock Reorder Report' });
    this.createStockReorderLink = page.getByRole('link', { name: /Create Stock Reorder/ });

    // Filter
    this.searchInput = page.getByPlaceholder(/Description|Location|Item Number/);
    this.itemDescriptionMultiselect = page.locator('text=Item Description').locator('..').locator('[class*="multiselect"], [role="listbox"]');
    this.locationMultiselect = page.locator('text=Location').first().locator('..').locator('[class*="multiselect"], [role="listbox"]');
    this.resetFilterButton = page.getByRole('button', { name: /Reset Filter/ });
    this.searchButton = page.getByRole('button', { name: /Search/ });

    // Results
    this.listHeading = page.getByRole('heading', { name: 'Stocks Lists' });
    this.columnSettingsButton = page.locator('button:has([class*="cog"])').first();
    this.table = page.locator('table').first();
    this.tableRows = page.locator('table tbody tr');
    this.loadingIndicator = page.locator('text=Loading Data');
    this.noResultsMessage = page.locator('text=No matching results found');
  }

  // ========================
  // Navigation Methods
  // ========================

  /**
   * Navigate to Stock Reorder Report page
   */
  async navigateToStockReorderReport(): Promise<void> {
    await test.step('Navigate to Stock Reorder Report page', async () => {
      await this.page.goto('/StockReorder');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Stock Reorder Report page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
    });
  }

  // ========================
  // Action Methods
  // ========================

  /**
   * Click Create Stock Reorder link
   */
  async clickCreateStockReorder(): Promise<void> {
    await test.step('Click Create Stock Reorder link', async () => {
      await this.createStockReorderLink.click();
    });
  }

  // ========================
  // Filter Methods
  // ========================

  /**
   * Search stock items
   */
  async search(query: string): Promise<void> {
    await test.step(`Search: ${query}`, async () => {
      await this.searchInput.fill(query);
    });
  }

  /**
   * Select item descriptions
   */
  async selectItemDescriptions(descriptions: string[]): Promise<void> {
    await test.step(`Select item descriptions: ${descriptions.join(', ')}`, async () => {
      await this.itemDescriptionMultiselect.click();
      for (const desc of descriptions) {
        await this.page.getByRole('option', { name: new RegExp(desc, 'i') }).click();
      }
      await this.page.keyboard.press('Escape');
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
  async applyFilters(options: StockReorderReportSearchOptions): Promise<void> {
    await test.step('Apply search filters', async () => {
      if (options.query) {
        await this.search(options.query);
      }
      if (options.itemDescriptions) {
        await this.selectItemDescriptions(options.itemDescriptions);
      }
      if (options.locations) {
        await this.selectLocations(options.locations);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }
}
