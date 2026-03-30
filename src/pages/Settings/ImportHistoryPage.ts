import type { Page, Locator } from '@playwright/test';
import { test } from '@playwright/test';

/**
 * Import History Page Object
 * URL: /Import/History
 * See past imports of customer, site and other data
 */
export class ImportHistoryPage {
  readonly page: Page;

  // Breadcrumb
  readonly settingsLink: Locator;

  // Header
  readonly pageTitle: Locator;

  // Filters
  readonly importTypeDropdown: Locator;
  readonly importStatusDropdown: Locator;
  readonly importDateStart: Locator;
  readonly importDateEnd: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // Results
  readonly dataTable: Locator;
  readonly loadingIndicator: Locator;
  readonly pagination: Locator;

  constructor(page: Page) {
    this.page = page;

    // Breadcrumb
    this.settingsLink = page.locator('a[href="https://uat.joblogic.com/Setting"]');

    // Header
    this.pageTitle = page.locator('h3:has-text("History of Imports")');

    // Filters
    this.importTypeDropdown = page.locator('text=Import Type').locator('..').locator('..').locator('[class*="multiselect"], select');
    this.importStatusDropdown = page.locator('text=Status').locator('..').locator('..').locator('[class*="multiselect"], select');
    this.importDateStart = page.getByPlaceholder('Start Date');
    this.importDateEnd = page.getByPlaceholder('End Date');
    this.resetFilterButton = page.getByRole('button', { name: 'Reset Filter' });
    this.searchButton = page.getByRole('button', { name: 'Search' });

    // Results
    this.dataTable = page.locator('table').first();
    this.loadingIndicator = page.locator('text=Loading Data... Please wait');
    this.pagination = page.locator('nav[aria-label="Page navigation"]');
  }

  // Navigation
  async navigateToImportHistory(): Promise<void> {
    await test.step('Navigate to Import History page', async () => {
      await this.page.goto('/Import/History');
      await this.page.waitForLoadState('networkidle');
    });
  }

  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Import History page is loaded', async () => {
      await this.pageTitle.waitFor({ state: 'visible' });
    });
  }

  async goBackToSettings(): Promise<void> {
    await test.step('Go back to Settings page', async () => {
      await this.settingsLink.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  // Filter Methods
  async selectImportTypes(types: string[]): Promise<void> {
    await test.step(`Select import types: ${types.join(', ')}`, async () => {
      await this.importTypeDropdown.click();
      for (const type of types) {
        await this.page.locator(`text="${type}"`).click();
      }
      await this.page.keyboard.press('Escape');
    });
  }

  async selectImportStatuses(statuses: string[]): Promise<void> {
    await test.step(`Select import statuses: ${statuses.join(', ')}`, async () => {
      await this.importStatusDropdown.click();
      for (const status of statuses) {
        await this.page.locator(`text="${status}"`).click();
      }
      await this.page.keyboard.press('Escape');
    });
  }

  async setImportDateRange(startDate: string, endDate: string): Promise<void> {
    await test.step(`Set import date range: ${startDate} to ${endDate}`, async () => {
      await this.importDateStart.fill(startDate);
      await this.importDateEnd.fill(endDate);
    });
  }

  async clickResetFilter(): Promise<void> {
    await test.step('Click Reset Filter button', async () => {
      await this.resetFilterButton.click();
    });
  }

  async clickSearch(): Promise<void> {
    await test.step('Click Search button', async () => {
      await this.searchButton.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  // Results Methods
  async waitForDataLoad(): Promise<void> {
    await test.step('Wait for data to load', async () => {
      await this.loadingIndicator.waitFor({ state: 'hidden', timeout: 30000 });
    });
  }

  async isNoResultsVisible(): Promise<boolean> {
    return await test.step('Check if no results displayed', async () => {
      const noResults = this.page.locator('text=No matching results found');

      return await noResults.isVisible();
    });
  }

  async getRowCount(): Promise<number> {
    return await test.step('Get row count', async () => {
      const rows = this.dataTable.locator('tbody tr');

      return await rows.count();
    });
  }

  async clickRowByIndex(index: number): Promise<void> {
    await test.step(`Click row at index ${index}`, async () => {
      const row = this.dataTable.locator('tbody tr').nth(index);

      await row.click();
    });
  }

  // Filter Application
  async applyFilters(options: {
    importTypes?: string[];
    importStatuses?: string[];
    importDateStart?: string;
    importDateEnd?: string;
  }): Promise<void> {
    await test.step('Apply Import History filters', async () => {
      if (options.importTypes && options.importTypes.length > 0) {
        await this.selectImportTypes(options.importTypes);
      }
      if (options.importStatuses && options.importStatuses.length > 0) {
        await this.selectImportStatuses(options.importStatuses);
      }
      if (options.importDateStart && options.importDateEnd) {
        await this.setImportDateRange(options.importDateStart, options.importDateEnd);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }
}
