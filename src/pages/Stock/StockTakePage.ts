import { Locator, Page } from "@playwright/test";
import { test, expect } from '@playwright/test';
import { BasePage } from "../BasePage";

/**
 * Stock Take tab type
 */
export type StockTakeTab = 'Open' | 'Completed' | 'All';

/**
 * Stock Take item interface
 */
export interface StockTakeItem {
  location?: string;
  dateCreated?: string;
  dateCompleted?: string;
  status?: string;
}

/**
 * Stock Take search options
 */
export interface StockTakeSearchOptions {
  locations?: string[];
  dateCreatedStart?: string;
  dateCreatedEnd?: string;
  dateCompletedStart?: string;
  dateCompletedEnd?: string;
}

/**
 * StockTakePage - Page Object for Stock Take page
 * URL: /StockTake
 */
export class StockTakePage extends BasePage {
  // ========================
  // Locators - Header/Actions
  // ========================
  readonly pageTitle: Locator;
  readonly addStockTakeLink: Locator;
  readonly exportLink: Locator;

  // ========================
  // Locators - Filter
  // ========================
  readonly locationMultiselect: Locator;
  readonly dateCreatedStartInput: Locator;
  readonly dateCreatedEndInput: Locator;
  readonly dateCompletedStartInput: Locator;
  readonly dateCompletedEndInput: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // ========================
  // Locators - Tabs
  // ========================
  readonly openTab: Locator;
  readonly completedTab: Locator;
  readonly allTab: Locator;

  // ========================
  // Locators - Results
  // ========================
  readonly columnSettingsButton: Locator;
  readonly table: Locator;
  readonly tableRows: Locator;
  readonly loadingIndicator: Locator;
  readonly noResultsMessage: Locator;
  readonly pagination: Locator;

  constructor(page: Page) {
    super(page);

    // Header/Actions
    this.pageTitle = page.getByRole('heading', { name: 'Stock Take' });
    this.addStockTakeLink = page.getByRole('link', { name: /Add Stock Take/ });
    this.exportLink = page.getByRole('link', { name: /Export/ });

    // Filter
    this.locationMultiselect = page.locator('text=Location').locator('..').locator('[class*="multiselect"], [role="listbox"]');
    this.dateCreatedStartInput = page.locator('text=Date Created').locator('..').getByPlaceholder('Start Date');
    this.dateCreatedEndInput = page.locator('text=Date Created').locator('..').getByPlaceholder('End Date');
    this.dateCompletedStartInput = page.locator('text=Date Completed').locator('..').getByPlaceholder('Start Date');
    this.dateCompletedEndInput = page.locator('text=Date Completed').locator('..').getByPlaceholder('End Date');
    this.resetFilterButton = page.getByRole('button', { name: /Reset Filter/ });
    this.searchButton = page.getByRole('button', { name: /Search/ });

    // Tabs
    this.openTab = page.getByRole('tab', { name: /Open/ });
    this.completedTab = page.getByRole('tab', { name: /Completed/ });
    this.allTab = page.getByRole('tab', { name: /^All/ });

    // Results
    this.columnSettingsButton = page.locator('button:has([class*="cog"])').first();
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
   * Navigate to Stock Take page
   */
  async navigateToStockTake(): Promise<void> {
    await test.step('Navigate to Stock Take page', async () => {
      await this.page.goto('/StockTake');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Stock Take page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
    });
  }

  // ========================
  // Action Methods
  // ========================

  /**
   * Click Add Stock Take link
   */
  async clickAddStockTake(): Promise<void> {
    await test.step('Click Add Stock Take link', async () => {
      await this.addStockTakeLink.click();
    });
  }

  /**
   * Click Export link
   */
  async clickExport(): Promise<void> {
    await test.step('Click Export link', async () => {
      await this.exportLink.click();
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
   * Set date created range
   */
  async setDateCreatedRange(startDate: string, endDate: string): Promise<void> {
    await test.step(`Set date created range: ${startDate} - ${endDate}`, async () => {
      await this.dateCreatedStartInput.fill(startDate);
      await this.dateCreatedEndInput.fill(endDate);
    });
  }

  /**
   * Set date completed range
   */
  async setDateCompletedRange(startDate: string, endDate: string): Promise<void> {
    await test.step(`Set date completed range: ${startDate} - ${endDate}`, async () => {
      await this.dateCompletedStartInput.fill(startDate);
      await this.dateCompletedEndInput.fill(endDate);
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
  // Tab Methods
  // ========================

  /**
   * Switch to tab
   */
  async switchToTab(tab: StockTakeTab): Promise<void> {
    await test.step(`Switch to ${tab} tab`, async () => {
      switch (tab) {
        case 'Open':
          await this.openTab.click();
          break;
        case 'Completed':
          await this.completedTab.click();
          break;
        case 'All':
          await this.allTab.click();
          break;
      }
      await this.waitForDataLoad();
    });
  }

  /**
   * Get tab count
   */
  async getTabCount(tab: StockTakeTab): Promise<number> {
    return await test.step(`Get ${tab} tab count`, async () => {
      let tabLocator: Locator;
      switch (tab) {
        case 'Open':
          tabLocator = this.openTab;
          break;
        case 'Completed':
          tabLocator = this.completedTab;
          break;
        case 'All':
          tabLocator = this.allTab;
          break;
      }
      const text = await tabLocator.textContent() || '';
      const match = text.match(/\((\d+)\)/);
      return match ? parseInt(match[1], 10) : 0;
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
  async applyFilters(options: StockTakeSearchOptions): Promise<void> {
    await test.step('Apply search filters', async () => {
      if (options.locations) {
        await this.selectLocations(options.locations);
      }
      if (options.dateCreatedStart && options.dateCreatedEnd) {
        await this.setDateCreatedRange(options.dateCreatedStart, options.dateCreatedEnd);
      }
      if (options.dateCompletedStart && options.dateCompletedEnd) {
        await this.setDateCompletedRange(options.dateCompletedStart, options.dateCompletedEnd);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }
}
