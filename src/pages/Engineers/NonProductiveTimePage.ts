import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Non Productive Time item interface
 */
export interface NonProductiveTimeItem {
  engineer?: string;
  type?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  duration?: string;
  notes?: string;
}

/**
 * Non Productive Time search options
 */
export interface NonProductiveTimeSearchOptions {
  query?: string;
  engineer?: string[];
  dateStart?: string;
  dateEnd?: string;
  type?: string[];
}

/**
 * NonProductiveTimePage - Page Object for All Non-Productive Time page
 * URL: /NonProductiveTime
 */
export class NonProductiveTimePage extends BasePage {
  // ========================
  // Locators - Header/Actions
  // ========================
  readonly pageTitle: Locator;
  readonly addNonProductiveTimeButton: Locator;
  readonly printButton: Locator;
  readonly exportButton: Locator;

  // ========================
  // Locators - Filter
  // ========================
  readonly searchInput: Locator;
  readonly engineerDropdown: Locator;
  readonly dateStartInput: Locator;
  readonly dateEndInput: Locator;
  readonly typeDropdown: Locator;
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
    this.pageTitle = page.getByRole('heading', { name: /Non-Productive Time|Non Productive Time/ });
    this.addNonProductiveTimeButton = page.locator('text=Add Non-Productive Time');
    this.printButton = page.locator('text=Print');
    this.exportButton = page.locator('text=Export');

    // Filter
    this.searchInput = page.getByPlaceholder(/Search|Engineer/);
    this.engineerDropdown = page.locator('text=Engineer').locator('..');
    this.dateStartInput = page.getByPlaceholder('Start Date');
    this.dateEndInput = page.getByPlaceholder('End Date');
    this.typeDropdown = page.locator('text=Type').locator('..');
    this.resetFilterButton = page.getByRole('button', { name: /Reset Filter/ });
    this.searchButton = page.getByRole('button', { name: /Search/ });

    // Results
    this.table = page.locator('table').first();
    this.tableRows = page.locator('table tbody tr');
    this.loadingIndicator = page.locator('text=Loading');
    this.noResultsMessage = page.locator('text=No matching results found');
    this.pagination = page.getByRole('navigation', { name: 'Page navigation' });
  }

  // ========================
  // Navigation Methods
  // ========================

  /**
   * Navigate to Non-Productive Time page
   */
  async navigateToNonProductiveTime(): Promise<void> {
    await test.step('Navigate to Non-Productive Time page', async () => {
      await this.page.goto('/NonProductiveTime');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Non-Productive Time page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
    });
  }

  /**
   * Click Add Non-Productive Time button
   */
  async clickAddNonProductiveTime(): Promise<void> {
    await test.step('Click Add Non-Productive Time button', async () => {
      await this.addNonProductiveTimeButton.click();
    });
  }

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
   * Search
   */
  async search(query: string): Promise<void> {
    await test.step(`Search: ${query}`, async () => {
      await this.searchInput.fill(query);
    });
  }

  /**
   * Select engineer filter
   */
  async selectEngineer(engineers: string[]): Promise<void> {
    await test.step(`Select engineers: ${engineers.join(', ')}`, async () => {
      await this.engineerDropdown.click();
      for (const engineer of engineers) {
        await this.page.getByRole('option', { name: new RegExp(engineer, 'i') }).click();
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
   * Select type filter
   */
  async selectType(types: string[]): Promise<void> {
    await test.step(`Select types: ${types.join(', ')}`, async () => {
      await this.typeDropdown.click();
      for (const type of types) {
        await this.page.getByRole('option', { name: new RegExp(type, 'i') }).click();
      }
      await this.page.keyboard.press('Escape');
    });
  }

  /**
   * Click reset filter
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
   * Check if no results found
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
  async applyFilters(options: NonProductiveTimeSearchOptions): Promise<void> {
    await test.step('Apply search filters', async () => {
      if (options.query) {
        await this.search(options.query);
      }
      if (options.engineer) {
        await this.selectEngineer(options.engineer);
      }
      if (options.dateStart && options.dateEnd) {
        await this.setDateRange(options.dateStart, options.dateEnd);
      }
      if (options.type) {
        await this.selectType(options.type);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }
}
