import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Stock Records tab type
 */
export type StockRecordsTab = 'All' | 'Active' | 'Suspended';

/**
 * Stock Record item interface
 */
export interface StockRecordItem {
  number?: string;
  description?: string;
  reference?: string;
  status?: string;
}

/**
 * Stock Records search options
 */
export interface StockRecordsSearchOptions {
  query?: string;
}

/**
 * StockRecordsPage - Page Object for All Stock Records page
 * URL: /Stock
 */
export class StockRecordsPage extends BasePage {
  // ========================
  // Locators - Header/Actions
  // ========================
  readonly pageTitle: Locator;
  readonly addStockRecordLink: Locator;
  readonly exportLink: Locator;

  // ========================
  // Locators - Filter
  // ========================
  readonly searchInput: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // ========================
  // Locators - Tabs
  // ========================
  readonly allTab: Locator;
  readonly activeTab: Locator;
  readonly suspendedTab: Locator;

  // ========================
  // Locators - Results
  // ========================
  readonly columnSettingsButton: Locator;
  readonly table: Locator;
  readonly tableRows: Locator;
  readonly loadingIndicator: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Header/Actions
    this.pageTitle = page.getByRole('heading', { name: 'Stock Records' });
    this.addStockRecordLink = page.getByRole('link', { name: /Add Stock Record/ });
    this.exportLink = page.getByRole('link', { name: /Export/ });

    // Filter
    this.searchInput = page.getByPlaceholder(/Number|Description|Reference/);
    this.resetFilterButton = page.getByRole('button', { name: /Reset Filter/ });
    this.searchButton = page.getByRole('button', { name: /Search/ });

    // Tabs
    this.allTab = page.getByRole('tab', { name: /^All/ });
    this.activeTab = page.getByRole('tab', { name: /Active/ });
    this.suspendedTab = page.getByRole('tab', { name: /Suspended/ });

    // Results
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
   * Navigate to Stock Records page
   */
  async navigateToStockRecords(): Promise<void> {
    await test.step('Navigate to Stock Records page', async () => {
      await this.page.goto('/Stock');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Stock Records page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
    });
  }

  // ========================
  // Action Methods
  // ========================

  /**
   * Click Add Stock Record link
   */
  async clickAddStockRecord(): Promise<void> {
    await test.step('Click Add Stock Record link', async () => {
      await this.addStockRecordLink.click();
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
   * Search stock records
   */
  async search(query: string): Promise<void> {
    await test.step(`Search: ${query}`, async () => {
      await this.searchInput.fill(query);
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
  // Tab Methods
  // ========================

  /**
   * Switch to tab
   */
  async switchToTab(tab: StockRecordsTab): Promise<void> {
    await test.step(`Switch to ${tab} tab`, async () => {
      switch (tab) {
      case 'All':
        await this.allTab.click();
        break;
      case 'Active':
        await this.activeTab.click();
        break;
      case 'Suspended':
        await this.suspendedTab.click();
        break;
      }
      await this.waitForDataLoad();
    });
  }

  /**
   * Get tab count
   */
  async getTabCount(tab: StockRecordsTab): Promise<number> {
    return await test.step(`Get ${tab} tab count`, async () => {
      let tabLocator: Locator;

      switch (tab) {
      case 'All':
        tabLocator = this.allTab;
        break;
      case 'Active':
        tabLocator = this.activeTab;
        break;
      case 'Suspended':
        tabLocator = this.suspendedTab;
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

  /**
   * Click stock record by number
   */
  async clickStockRecordByNumber(number: string): Promise<void> {
    await test.step(`Click stock record with number: ${number}`, async () => {
      await this.page.locator(`table tbody tr:has-text("${number}")`).first().click();
    });
  }
}
