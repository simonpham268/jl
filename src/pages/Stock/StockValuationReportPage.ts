import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Stock Valuation item interface
 */
export interface StockValuationItem {
  number?: string;
  description?: string;
  reference?: string;
  location?: string;
  rackShelf?: string;
  quantity?: number;
  costPrice?: number;
  sellPrice?: number;
}

/**
 * Stock Valuation Report search options
 */
export interface StockValuationSearchOptions {
  query?: string;
  locations?: string[];
  rackShelves?: string[];
}

/**
 * StockValuationReportPage - Page Object for Stock Valuation Report page
 * URL: /Stock/StockValuationReport
 */
export class StockValuationReportPage extends BasePage {
  // ========================
  // Locators - Header/Actions
  // ========================
  readonly pageTitle: Locator;
  readonly printButton: Locator;
  readonly exportButton: Locator;

  // ========================
  // Locators - Filter
  // ========================
  readonly searchInput: Locator;
  readonly locationMultiselect: Locator;
  readonly rackShelfMultiselect: Locator;
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
  readonly grandTotalSection: Locator;
  readonly totalCostCell: Locator;
  readonly totalSellCell: Locator;
  readonly pagination: Locator;

  constructor(page: Page) {
    super(page);

    // Header/Actions
    this.pageTitle = page.getByRole('heading', { name: 'Stock Valuation Report' });
    this.printButton = page.locator('text=Print');
    this.exportButton = page.locator('text=Export');

    // Filter
    this.searchInput = page.getByPlaceholder(/Number|Description|Reference/);
    this.locationMultiselect = page.locator('text=Location').first().locator('..').locator('[class*="multiselect"], [role="listbox"]');
    this.rackShelfMultiselect = page.locator('text=Rack/Shelf').locator('..').locator('[class*="multiselect"], [role="listbox"]');
    this.resetFilterButton = page.getByRole('button', { name: /Reset Filter/ });
    this.searchButton = page.getByRole('button', { name: /Search/ });

    // Results
    this.listHeading = page.getByRole('heading', { name: 'Stocks Lists' });
    this.columnSettingsButton = page.locator('button:has([class*="cog"])').first();
    this.table = page.locator('table').first();
    this.tableRows = page.locator('table tbody tr');
    this.loadingIndicator = page.locator('text=Loading Data');
    this.noResultsMessage = page.locator('text=No matching results found');
    this.grandTotalSection = page.locator('text=Grand Total').locator('..');
    this.totalCostCell = page.locator('text=Total Cost:').locator('..').locator('td').last();
    this.totalSellCell = page.locator('text=Total Sell:').locator('..').locator('td').last();
    this.pagination = page.getByRole('navigation', { name: 'Page navigation' });
  }

  // ========================
  // Navigation Methods
  // ========================

  /**
   * Navigate to Stock Valuation Report page
   */
  async navigateToStockValuationReport(): Promise<void> {
    await test.step('Navigate to Stock Valuation Report page', async () => {
      await this.page.goto('/Stock/StockValuationReport');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Stock Valuation Report page is loaded', async () => {
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
   * Search stock
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
   * Select rack/shelves
   */
  async selectRackShelves(rackShelves: string[]): Promise<void> {
    await test.step(`Select rack/shelves: ${rackShelves.join(', ')}`, async () => {
      await this.rackShelfMultiselect.click();
      for (const rackShelf of rackShelves) {
        await this.page.getByRole('option', { name: new RegExp(rackShelf, 'i') }).click();
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

  /**
   * Get total cost value
   */
  async getTotalCost(): Promise<string> {
    return await test.step('Get total cost value', async () => {
      return await this.totalCostCell.textContent() || '';
    });
  }

  /**
   * Get total sell value
   */
  async getTotalSell(): Promise<string> {
    return await test.step('Get total sell value', async () => {
      return await this.totalSellCell.textContent() || '';
    });
  }

  // ========================
  // Combined Methods
  // ========================

  /**
   * Apply search filters
   */
  async applyFilters(options: StockValuationSearchOptions): Promise<void> {
    await test.step('Apply search filters', async () => {
      if (options.query) {
        await this.search(options.query);
      }
      if (options.locations) {
        await this.selectLocations(options.locations);
      }
      if (options.rackShelves) {
        await this.selectRackShelves(options.rackShelves);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }
}
