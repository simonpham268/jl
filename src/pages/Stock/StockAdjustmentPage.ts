import { Locator, Page } from "@playwright/test";
import { test, expect } from '@playwright/test';
import { BasePage } from "../BasePage";

/**
 * Stock Adjustment item interface
 */
export interface StockAdjustmentItem {
  location?: string;
  date?: string;
  createdBy?: string;
  description?: string;
  quantity?: number;
}

/**
 * Stock Adjustment search options
 */
export interface StockAdjustmentSearchOptions {
  locations?: string[];
  dateStart?: string;
  dateEnd?: string;
  createdBy?: string[];
}

/**
 * StockAdjustmentPage - Page Object for Stock Adjustment page
 * URL: /StockAdjustment
 */
export class StockAdjustmentPage extends BasePage {
  // ========================
  // Locators - Header/Actions
  // ========================
  readonly pageTitle: Locator;
  readonly addStockAdjustmentButton: Locator;
  readonly exportButton: Locator;

  // ========================
  // Locators - Filter
  // ========================
  readonly locationMultiselect: Locator;
  readonly dateStartInput: Locator;
  readonly dateEndInput: Locator;
  readonly createdByMultiselect: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // ========================
  // Locators - Results
  // ========================
  readonly table: Locator;
  readonly tableRows: Locator;
  readonly loadingIndicator: Locator;
  readonly noResultsMessage: Locator;
  readonly pagination: Locator;

  constructor(page: Page) {
    super(page);

    // Header/Actions
    this.pageTitle = page.getByRole('heading', { name: 'Stock Adjustment Report' });
    this.addStockAdjustmentButton = page.locator('text=Add Stock Adjustment');
    this.exportButton = page.locator('text=Export');

    // Filter
    this.locationMultiselect = page.locator('text=Location').locator('..').locator('[class*="multiselect"], [role="listbox"]');
    this.dateStartInput = page.getByPlaceholder('Start Date');
    this.dateEndInput = page.getByPlaceholder('End Date');
    this.createdByMultiselect = page.locator('text=Created By').locator('..').locator('[class*="multiselect"], [role="listbox"]');
    this.resetFilterButton = page.getByRole('button', { name: /Reset Filter/ });
    this.searchButton = page.getByRole('button', { name: /Search/ });

    // Results
    this.table = page.locator('table').first();
    this.tableRows = page.locator('table tbody tr');
    this.loadingIndicator = page.locator('text=Loading Data');
    this.noResultsMessage = page.locator('text=No matching results found');
    this.pagination = page.getByRole('navigation', { name: 'Page navigation' });
  }

  // ========================
  // Navigation Methods
  // ========================

  /**
   * Navigate to Stock Adjustment page
   */
  async navigateToStockAdjustment(): Promise<void> {
    await test.step('Navigate to Stock Adjustment page', async () => {
      await this.page.goto('/StockAdjustment');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Stock Adjustment page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
    });
  }

  // ========================
  // Action Methods
  // ========================

  /**
   * Click Add Stock Adjustment button
   */
  async clickAddStockAdjustment(): Promise<void> {
    await test.step('Click Add Stock Adjustment button', async () => {
      await this.addStockAdjustmentButton.click();
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
   * Set date range
   */
  async setDateRange(startDate: string, endDate: string): Promise<void> {
    await test.step(`Set date range: ${startDate} - ${endDate}`, async () => {
      await this.dateStartInput.fill(startDate);
      await this.dateEndInput.fill(endDate);
    });
  }

  /**
   * Select created by
   */
  async selectCreatedBy(users: string[]): Promise<void> {
    await test.step(`Select created by: ${users.join(', ')}`, async () => {
      await this.createdByMultiselect.click();
      for (const user of users) {
        await this.page.getByRole('option', { name: new RegExp(user, 'i') }).click();
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
  async applyFilters(options: StockAdjustmentSearchOptions): Promise<void> {
    await test.step('Apply search filters', async () => {
      if (options.locations) {
        await this.selectLocations(options.locations);
      }
      if (options.dateStart && options.dateEnd) {
        await this.setDateRange(options.dateStart, options.dateEnd);
      }
      if (options.createdBy) {
        await this.selectCreatedBy(options.createdBy);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }
}
