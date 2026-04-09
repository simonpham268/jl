import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Report item interface
 */
export interface ReportItem {
  name: string;
  category?: string;
  description?: string;
  scheduleStatus?: string;
  isFavourite?: boolean;
}

/**
 * Report search options
 */
export interface ReportSearchOptions {
  categories?: string[];
  query?: string;
  scheduleStatus?: string;
}

/**
 * Report tabs
 */
export type ReportTab = 'All Reports' | 'Favourite Reports' | 'Dynamic Dashboard';

/**
 * DynamicReportsPage - Page Object for Dynamic Reports page
 * URL: /Report
 */
export class DynamicReportsPage extends BasePage {
  // ========================
  // Locators - Header/Actions
  // ========================
  readonly pageTitle: Locator;
  readonly createDynamicDashboardButton: Locator;
  readonly descriptionText: Locator;

  // ========================
  // Locators - Filter
  // ========================
  readonly categoryDropdown: Locator;
  readonly searchInput: Locator;
  readonly scheduleStatusSection: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // ========================
  // Locators - Tabs
  // ========================
  readonly allReportsTab: Locator;
  readonly favouriteReportsTab: Locator;
  readonly dynamicDashboardTab: Locator;

  // ========================
  // Locators - Results
  // ========================
  readonly reportsList: Locator;
  readonly noResultsMessage: Locator;
  readonly pagination: Locator;

  constructor(page: Page) {
    super(page);

    // Header/Actions
    this.pageTitle = page.getByRole('heading', { name: 'Reports' });
    this.createDynamicDashboardButton = page.getByRole('button', { name: /Create Dynamic Dashboard/ });
    this.descriptionText = page.locator('text=Preview and select the reports that suit your reporting requirements best');

    // Filter
    this.categoryDropdown = page.locator('text=Select reports by category').locator('..');
    this.searchInput = page.getByPlaceholder('Enter search term / ref. No., etc...');
    this.scheduleStatusSection = page.locator('text=Schedule Status').locator('..');
    this.resetFilterButton = page.getByRole('button', { name: /Reset Filter/ });
    this.searchButton = page.getByRole('button', { name: /Search/ });

    // Tabs
    this.allReportsTab = page.getByRole('link', { name: /All Reports/ });
    this.favouriteReportsTab = page.getByRole('link', { name: /Favourite Reports/ });
    this.dynamicDashboardTab = page.getByRole('link', { name: /Dynamic Dashboard/ });

    // Results
    this.reportsList = page.locator('[role="tabpanel"]');
    this.noResultsMessage = page.locator('text=No matching results found');
    this.pagination = page.getByRole('navigation', { name: 'Page navigation' });
  }

  // ========================
  // Private Helper Methods
  // ========================

  /**
   * Get row locator by text (dynamic locator)
   */
  private getRowByText(text: string): Locator {
    return this.page.locator(`text=${text}`).locator('..');
  }

  // ========================
  // Navigation Methods
  // ========================

  /**
   * Navigate to Dynamic Reports page
   */
  async navigateToDynamicReports(): Promise<void> {
    await test.step('Navigate to Dynamic Reports page', async () => {
      await this.page.goto('/Report');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Dynamic Reports page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
    });
  }

  /**
   * Click Create Dynamic Dashboard button
   */
  async clickCreateDynamicDashboard(): Promise<void> {
    await test.step('Click Create Dynamic Dashboard button', async () => {
      await this.createDynamicDashboardButton.click();
    });
  }

  // ========================
  // Filter Methods
  // ========================

  /**
   * Select report categories
   */
  async selectCategories(categories: string[]): Promise<void> {
    await test.step(`Select categories: ${categories.join(', ')}`, async () => {
      await this.categoryDropdown.click();
      for (const category of categories) {
        await this.page.getByRole('option', { name: new RegExp(category, 'i') }).click();
      }
      await this.page.keyboard.press('Escape');
    });
  }

  /**
   * Search reports
   */
  async search(query: string): Promise<void> {
    await test.step(`Search reports: ${query}`, async () => {
      await this.searchInput.fill(query);
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
  // Tab Methods
  // ========================

  /**
   * Switch to a specific tab
   */
  async switchToTab(tab: ReportTab): Promise<void> {
    await test.step(`Switch to ${tab} tab`, async () => {
      const tabLocator = {
        'All Reports': this.allReportsTab,
        'Favourite Reports': this.favouriteReportsTab,
        'Dynamic Dashboard': this.dynamicDashboardTab,
      }[tab];

      await tabLocator.click();
      await this.waitForDataLoad();
    });
  }

  /**
   * Get tab count
   */
  async getTabCount(tab: ReportTab): Promise<number> {
    return await test.step(`Get ${tab} tab count`, async () => {
      const tabLocator = {
        'All Reports': this.allReportsTab,
        'Favourite Reports': this.favouriteReportsTab,
        'Dynamic Dashboard': this.dynamicDashboardTab,
      }[tab];
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
      await this.page.waitForTimeout(1000);
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
   * Click on a report by name
   */
  async clickReportByName(reportName: string): Promise<void> {
    await test.step(`Click report: ${reportName}`, async () => {
      await this.page.locator(`text=${reportName}`).first().click();
    });
  }

  /**
   * Toggle favourite for a report
   */
  async toggleFavourite(reportName: string): Promise<void> {
    await test.step(`Toggle favourite for report: ${reportName}`, async () => {
      const reportRow = this.getRowByText(reportName);

      await reportRow.locator('[title*="favourite"], [class*="star"]').click();
    });
  }

  // ========================
  // Combined Methods
  // ========================

  /**
   * Apply search filters
   */
  async applyFilters(options: ReportSearchOptions): Promise<void> {
    await test.step('Apply search filters', async () => {
      if (options.categories) {
        await this.selectCategories(options.categories);
      }
      if (options.query) {
        await this.search(options.query);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }
}
