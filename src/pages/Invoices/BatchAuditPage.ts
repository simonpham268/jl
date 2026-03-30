import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Action types for batch audit filtering
 */
export type AuditAction =
  | 'Create'
  | 'Update'
  | 'Delete'
  | 'Email'
  | 'Print';

/**
 * Audit search options
 */
export interface BatchAuditSearchOptions {
  actions?: AuditAction[];
  startDate?: string;
  endDate?: string;
  users?: string[];
}

/**
 * Audit record item
 */
export interface AuditRecordItem {
  action: string;
  user: string;
  operationTime: string;
  details: string;
}

/**
 * BatchAuditPage - Page Object for Batch Audit page
 * URL: /BatchInvoice/Audit
 */
export class BatchAuditPage extends BasePage {
  // ========================
  // Locators - Page Header
  // ========================
  readonly pageTitle: Locator;

  // ========================
  // Locators - Filter Section
  // ========================
  readonly actionDropdown: Locator;
  readonly operationTimeLabel: Locator;
  readonly startDateInput: Locator;
  readonly endDateInput: Locator;
  readonly userDropdown: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // ========================
  // Locators - Results Section
  // ========================
  readonly resultsTable: Locator;
  readonly loadingMessage: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Page Header
    this.pageTitle = page.getByRole('heading', { name: 'Batch Audit', level: 3 });

    // Filter Section
    this.actionDropdown = page.locator('text=Action').locator('..').locator('[class*="multiselect"]');
    this.operationTimeLabel = page.locator('text=Operation Time');
    this.startDateInput = page.getByPlaceholder('Start Date');
    this.endDateInput = page.getByPlaceholder('End Date');
    this.userDropdown = page.locator('text=User').locator('..').locator('[class*="multiselect"]');
    this.resetFilterButton = page.getByRole('button', { name: 'Reset Filter' });
    this.searchButton = page.getByRole('button', { name: 'Search' });

    // Results Section
    this.resultsTable = page.locator('table').first();
    this.loadingMessage = page.locator('text=Loading Data... Please wait');
    this.noResultsMessage = page.locator('text=No records found');
  }

  // ========================
  // Navigation
  // ========================

  /**
   * Navigate to Batch Audit page
   */
  async navigateToBatchAudit(): Promise<void> {
    await test.step('Navigate to Batch Audit page', async () => {
      await this.page.goto('/BatchInvoice/Audit');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Batch Audit page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
      await expect(this.searchButton).toBeVisible();
    });
  }

  // ========================
  // Filter Methods
  // ========================

  /**
   * Set operation time range
   */
  async setOperationTimeRange(startDate: string, endDate: string): Promise<void> {
    await test.step(`Set operation time range: ${startDate} - ${endDate}`, async () => {
      await this.startDateInput.clear();
      await this.startDateInput.fill(startDate);
      await this.endDateInput.clear();
      await this.endDateInput.fill(endDate);
    });
  }

  /**
   * Set start date
   */
  async setStartDate(date: string): Promise<void> {
    await test.step(`Set start date: ${date}`, async () => {
      await this.startDateInput.clear();
      await this.startDateInput.fill(date);
    });
  }

  /**
   * Set end date
   */
  async setEndDate(date: string): Promise<void> {
    await test.step(`Set end date: ${date}`, async () => {
      await this.endDateInput.clear();
      await this.endDateInput.fill(date);
    });
  }

  /**
   * Click Reset Filter button
   */
  async clickResetFilter(): Promise<void> {
    await test.step('Click Reset Filter', async () => {
      await this.resetFilterButton.click();
    });
  }

  /**
   * Click Search button
   */
  async clickSearch(): Promise<void> {
    await test.step('Click Search', async () => {
      await this.searchButton.click();
    });
  }

  /**
   * Apply search filters
   */
  async applyFilters(options: BatchAuditSearchOptions): Promise<void> {
    await test.step('Apply search filters', async () => {
      if (options.startDate) await this.setStartDate(options.startDate);
      if (options.endDate) await this.setEndDate(options.endDate);
      await this.clickSearch();
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
      await this.loadingMessage.waitFor({ state: 'hidden', timeout: 30000 });
    });
  }

  /**
   * Check if loading message is visible
   */
  async isLoading(): Promise<boolean> {
    return await test.step('Check if loading', async () => {
      return await this.loadingMessage.isVisible();
    });
  }

  /**
   * Check if no results message is visible
   */
  async isNoResultsVisible(): Promise<boolean> {
    return await test.step('Check if no results visible', async () => {
      return await this.noResultsMessage.isVisible();
    });
  }

  /**
   * Get audit records count
   */
  async getAuditRecordsCount(): Promise<number> {
    return await test.step('Get audit records count', async () => {
      await this.waitForDataLoad();
      const rows = this.resultsTable.locator('tbody tr');

      return await rows.count();
    });
  }

  /**
   * Click on audit record by index
   */
  async clickAuditRecord(index: number): Promise<void> {
    await test.step(`Click audit record at index ${index}`, async () => {
      await this.waitForDataLoad();
      const row = this.resultsTable.locator('tbody tr').nth(index);

      await row.click();
    });
  }

  /**
   * Search and wait for results
   */
  async searchAndWait(options?: BatchAuditSearchOptions): Promise<void> {
    await test.step('Search and wait for results', async () => {
      if (options) {
        await this.applyFilters(options);
      } else {
        await this.clickSearch();
      }
      await this.waitForDataLoad();
    });
  }
}
