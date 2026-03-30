import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Stock Location item interface
 */
export interface StockLocationItem {
  name?: string;
  address?: string;
  vehicleReg?: string;
  engineer?: string;
  isActive?: boolean;
}

/**
 * Stock Locations search options
 */
export interface StockLocationsSearchOptions {
  query?: string;
  includeInactive?: boolean;
}

/**
 * StockLocationsPage - Page Object for Stock Locations page
 * URL: /Location
 */
export class StockLocationsPage extends BasePage {
  // ========================
  // Locators - Header/Actions
  // ========================
  readonly pageTitle: Locator;
  readonly addLocationLink: Locator;
  readonly importButton: Locator;

  // ========================
  // Locators - Filter
  // ========================
  readonly searchInput: Locator;
  readonly includeInactiveCheckbox: Locator;
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
    this.pageTitle = page.getByRole('heading', { name: 'Stock Locations' });
    this.addLocationLink = page.getByRole('link', { name: /Add Location/ });
    this.importButton = page.locator('text=Import');

    // Filter
    this.searchInput = page.getByPlaceholder(/Name|Address|Vehicle Reg|Engineer/);
    this.includeInactiveCheckbox = page.locator('text=Include Inactive');
    this.resetFilterButton = page.getByRole('button', { name: /Reset Filter/ });
    this.searchButton = page.getByRole('button', { name: /Search/ });

    // Results
    this.listHeading = page.getByRole('heading', { name: 'Locations List' });
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
   * Navigate to Stock Locations page
   */
  async navigateToStockLocations(): Promise<void> {
    await test.step('Navigate to Stock Locations page', async () => {
      await this.page.goto('/Location');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Stock Locations page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
    });
  }

  // ========================
  // Action Methods
  // ========================

  /**
   * Click Add Location link
   */
  async clickAddLocation(): Promise<void> {
    await test.step('Click Add Location link', async () => {
      await this.addLocationLink.click();
    });
  }

  /**
   * Click Import button
   */
  async clickImport(): Promise<void> {
    await test.step('Click Import button', async () => {
      await this.importButton.click();
    });
  }

  // ========================
  // Filter Methods
  // ========================

  /**
   * Search locations
   */
  async search(query: string): Promise<void> {
    await test.step(`Search: ${query}`, async () => {
      await this.searchInput.fill(query);
    });
  }

  /**
   * Toggle include inactive
   */
  async toggleIncludeInactive(): Promise<void> {
    await test.step('Toggle include inactive', async () => {
      await this.includeInactiveCheckbox.click();
    });
  }

  /**
   * Set include inactive
   */
  async setIncludeInactive(include: boolean): Promise<void> {
    await test.step(`Set include inactive: ${include}`, async () => {
      const checkbox = this.includeInactiveCheckbox.locator('input');
      const isChecked = await checkbox.isChecked().catch(() => false);

      if (isChecked !== include) {
        await this.toggleIncludeInactive();
      }
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
   * Click location by name
   */
  async clickLocationByName(name: string): Promise<void> {
    await test.step(`Click location with name: ${name}`, async () => {
      await this.page.locator(`table tbody tr:has-text("${name}")`).first().click();
    });
  }

  // ========================
  // Combined Methods
  // ========================

  /**
   * Apply search filters
   */
  async applyFilters(options: StockLocationsSearchOptions): Promise<void> {
    await test.step('Apply search filters', async () => {
      if (options.query) {
        await this.search(options.query);
      }
      if (options.includeInactive !== undefined) {
        await this.setIncludeInactive(options.includeInactive);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }
}
