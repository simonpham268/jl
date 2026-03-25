import { Locator, Page } from "@playwright/test";
import { test, expect } from '@playwright/test';
import { BasePage } from "../BasePage";

/**
 * Letter stage options
 */
export type LetterStage = 'All' | 'Letter 1' | 'Letter 2' | 'Letter 3' | 'Letter 4';

/**
 * Compliance status options
 */
export type ComplianceStatus = 'All' | 'Compliant' | 'Non-Compliant' | 'Not Applicable';

/**
 * Service Job Letter item interface
 */
export interface ServiceJobLetterItem {
  jobNo: string;
  customerName?: string;
  siteName?: string;
  serviceDescription?: string;
  letterStage?: string;
  scheduledDate?: string;
  jobType?: string;
  complianceStatus?: string;
}

/**
 * Search/filter options
 */
export interface ServiceJobLetterSearchOptions {
  query?: string;
  letterStage?: LetterStage;
  scheduledStartDate?: string;
  scheduledEndDate?: string;
  jobTypes?: string[];
  complianceStatus?: ComplianceStatus;
}

/**
 * ServiceJobLettersPage - Page Object for Service Job Letters page
 * URL: /Job/ServiceLetterIndex
 */
export class ServiceJobLettersPage extends BasePage {
  // ========================
  // Locators - Header/Actions
  // ========================
  readonly pageTitle: Locator;
  readonly batchPrintButton: Locator;
  readonly batchEmailButton: Locator;

  // ========================
  // Locators - Search/Filter
  // ========================
  readonly hideFilterButton: Locator;
  readonly searchInput: Locator;
  readonly letterStageDropdown: Locator;
  readonly scheduledStartDateInput: Locator;
  readonly scheduledEndDateInput: Locator;
  readonly jobTypesDropdown: Locator;
  readonly complianceStatusDropdown: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // ========================
  // Locators - Table
  // ========================
  readonly table: Locator;
  readonly tableHeader: Locator;
  readonly tableBody: Locator;
  readonly tableRows: Locator;
  readonly loadingIndicator: Locator;

  // ========================
  // Locators - Checkbox Selection
  // ========================
  readonly selectAllCheckbox: Locator;

  constructor(page: Page) {
    super(page);

    // Header/Actions
    this.pageTitle = page.getByRole('heading', { name: 'Service Job Letters' }).first();
    this.batchPrintButton = page.getByRole('button', { name: 'Batch Print' });
    this.batchEmailButton = page.getByRole('button', { name: 'Batch Email' });

    // Search/Filter
    this.hideFilterButton = page.getByRole('button', { name: /Hide Filter|Show Filter/i });
    this.searchInput = page.getByPlaceholder('Customer / Site / Job Number / Service Description');
    this.letterStageDropdown = page.locator('text=Letter Stage').locator('..').getByRole('combobox');
    this.scheduledStartDateInput = page.getByPlaceholder('Scheduled Start Date');
    this.scheduledEndDateInput = page.getByPlaceholder('Scheduled End Date');
    this.jobTypesDropdown = page.locator('text=Job Type(s)').locator('..').locator('[class*="multiselect"], [role="listbox"]');
    this.complianceStatusDropdown = page.locator('text=Compliance Status').locator('..').getByRole('combobox');
    this.resetFilterButton = page.getByRole('button', { name: 'Reset Filter' });
    this.searchButton = page.getByRole('button', { name: 'Search' });

    // Table
    this.table = page.locator('table').first();
    this.tableHeader = this.table.locator('thead, [role="rowgroup"]').first();
    this.tableBody = this.table.locator('tbody, [role="rowgroup"]').last();
    this.tableRows = this.tableBody.locator('tr, [role="row"]');
    this.loadingIndicator = page.getByText('Loading Data... Please wait');

    // Checkbox Selection
    this.selectAllCheckbox = this.tableHeader.locator('input[type="checkbox"]');
  }

  // ========================
  // Navigation
  // ========================

  /**
   * Navigate to Service Job Letters page
   */
  async navigateToServiceJobLetters(): Promise<void> {
    await test.step('Navigate to Service Job Letters page', async () => {
      await this.page.goto('/Job/ServiceLetterIndex');
      await this.waitForTableLoad();
    });
  }

  /**
   * Wait for table data to finish loading
   */
  async waitForTableLoad(): Promise<void> {
    await test.step('Wait for table to load', async () => {
      await this.loadingIndicator.waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {});
      await this.page.waitForLoadState('networkidle');
    });
  }

  // ========================
  // Search & Filter
  // ========================

  /**
   * Search service job letters by text
   * @param query - Search text
   */
  async search(query: string): Promise<void> {
    await test.step(`Search service job letters: ${query}`, async () => {
      await this.searchInput.fill(query);
      await this.searchButton.click();
      await this.waitForTableLoad();
    });
  }

  /**
   * Clear search input
   */
  async clearSearch(): Promise<void> {
    await test.step('Clear search', async () => {
      await this.searchInput.clear();
    });
  }

  /**
   * Select letter stage
   * @param stage - Letter stage to select
   */
  async selectLetterStage(stage: LetterStage): Promise<void> {
    await test.step(`Select letter stage: ${stage}`, async () => {
      await this.letterStageDropdown.click();
      await this.page.getByRole('option', { name: stage }).click();
    });
  }

  /**
   * Set scheduled date range
   */
  async setScheduledDateRange(startDate: string, endDate: string): Promise<void> {
    await test.step(`Set scheduled date range: ${startDate} - ${endDate}`, async () => {
      await this.scheduledStartDateInput.fill(startDate);
      await this.scheduledEndDateInput.fill(endDate);
    });
  }

  /**
   * Filter by job types
   * @param jobTypes - Array of job type names to select
   */
  async filterByJobTypes(jobTypes: string[]): Promise<void> {
    await test.step(`Filter by job types: ${jobTypes.join(', ')}`, async () => {
      await this.jobTypesDropdown.click();
      for (const jobType of jobTypes) {
        await this.page.getByRole('option', { name: jobType }).click();
      }
      await this.page.keyboard.press('Escape');
    });
  }

  /**
   * Select compliance status
   * @param status - Compliance status to select
   */
  async selectComplianceStatus(status: ComplianceStatus): Promise<void> {
    await test.step(`Select compliance status: ${status}`, async () => {
      await this.complianceStatusDropdown.click();
      await this.page.getByRole('option', { name: status }).click();
    });
  }

  /**
   * Toggle filter section visibility
   */
  async toggleFilterSection(): Promise<void> {
    await test.step('Toggle filter section', async () => {
      await this.hideFilterButton.click();
    });
  }

  /**
   * Reset all filters
   */
  async resetFilter(): Promise<void> {
    await test.step('Reset filters', async () => {
      const isEnabled = await this.resetFilterButton.isEnabled();
      if (isEnabled) {
        await this.resetFilterButton.click();
        await this.waitForTableLoad();
      }
    });
  }

  /**
   * Apply current filters
   */
  async applyFilters(): Promise<void> {
    await test.step('Apply filters', async () => {
      await this.searchButton.click();
      await this.waitForTableLoad();
    });
  }

  /**
   * Search with options (combined search and filter)
   */
  async searchWithOptions(options: ServiceJobLetterSearchOptions): Promise<void> {
    await test.step('Search with options', async () => {
      if (options.query) {
        await this.searchInput.fill(options.query);
      }
      if (options.letterStage) {
        await this.selectLetterStage(options.letterStage);
      }
      if (options.scheduledStartDate && options.scheduledEndDate) {
        await this.setScheduledDateRange(options.scheduledStartDate, options.scheduledEndDate);
      }
      if (options.jobTypes?.length) {
        await this.filterByJobTypes(options.jobTypes);
      }
      if (options.complianceStatus) {
        await this.selectComplianceStatus(options.complianceStatus);
      }
      await this.searchButton.click();
      await this.waitForTableLoad();
    });
  }

  // ========================
  // Table Actions
  // ========================

  /**
   * Get number of rows in the table
   */
  async getRowCount(): Promise<number> {
    return await this.tableRows.count();
  }

  /**
   * Click on a job by job number
   * @param jobNo - Job number to click
   */
  async clickJobByJobNo(jobNo: string): Promise<void> {
    await test.step(`Click job: ${jobNo}`, async () => {
      await this.table.getByRole('link', { name: jobNo }).first().click();
      await this.page.waitForURL(/\/Job\/Detail\/\d+/);
    });
  }

  /**
   * Click on a row by index (0-based)
   * @param index - Row index
   */
  async clickRowByIndex(index: number): Promise<void> {
    await test.step(`Click row ${index + 1}`, async () => {
      const row = this.tableRows.nth(index);
      const jobNoLink = row.locator('td, [role="cell"]').first().getByRole('link');
      await jobNoLink.click();
      await this.page.waitForURL(/\/Job\/Detail\/\d+/);
    });
  }

  /**
   * Select a row checkbox
   * @param index - Row index (0-based)
   */
  async selectRow(index: number): Promise<void> {
    await test.step(`Select row ${index + 1}`, async () => {
      const row = this.tableRows.nth(index);
      const checkbox = row.locator('input[type="checkbox"]');
      await checkbox.check();
    });
  }

  /**
   * Unselect a row checkbox
   * @param index - Row index (0-based)
   */
  async unselectRow(index: number): Promise<void> {
    await test.step(`Unselect row ${index + 1}`, async () => {
      const row = this.tableRows.nth(index);
      const checkbox = row.locator('input[type="checkbox"]');
      await checkbox.uncheck();
    });
  }

  /**
   * Select all rows
   */
  async selectAllRows(): Promise<void> {
    await test.step('Select all rows', async () => {
      await this.selectAllCheckbox.check();
    });
  }

  /**
   * Unselect all rows
   */
  async unselectAllRows(): Promise<void> {
    await test.step('Unselect all rows', async () => {
      await this.selectAllCheckbox.uncheck();
    });
  }

  /**
   * Get service job letter data from a row
   * @param index - Row index (0-based)
   */
  async getLetterFromRow(index: number): Promise<ServiceJobLetterItem> {
    const row = this.tableRows.nth(index);
    const cells = row.locator('td, [role="cell"]');
    
    return {
      jobNo: await cells.nth(1).textContent() || '',
      customerName: await cells.nth(2).textContent() || undefined,
      siteName: await cells.nth(3).textContent() || undefined,
      serviceDescription: await cells.nth(4).textContent() || undefined,
      letterStage: await cells.nth(5).textContent() || undefined,
      scheduledDate: await cells.nth(6).textContent() || undefined,
      jobType: await cells.nth(7).textContent() || undefined,
      complianceStatus: await cells.nth(8).textContent() || undefined,
    };
  }

  /**
   * Get all visible service job letters
   */
  async getAllVisibleLetters(): Promise<ServiceJobLetterItem[]> {
    const count = await this.getRowCount();
    const letters: ServiceJobLetterItem[] = [];
    for (let i = 0; i < count; i++) {
      letters.push(await this.getLetterFromRow(i));
    }
    return letters;
  }

  // ========================
  // Batch Actions
  // ========================

  /**
   * Click Batch Print button
   */
  async clickBatchPrint(): Promise<void> {
    await test.step('Click Batch Print', async () => {
      await this.batchPrintButton.click();
    });
  }

  /**
   * Click Batch Email button
   */
  async clickBatchEmail(): Promise<void> {
    await test.step('Click Batch Email', async () => {
      await this.batchEmailButton.click();
    });
  }

  /**
   * Check if Batch Print button is enabled
   */
  async isBatchPrintEnabled(): Promise<boolean> {
    return await this.batchPrintButton.isEnabled();
  }

  /**
   * Check if Batch Email button is enabled
   */
  async isBatchEmailEnabled(): Promise<boolean> {
    return await this.batchEmailButton.isEnabled();
  }

  // ========================
  // Assertions
  // ========================

  /**
   * Assert page is loaded correctly
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Service Job Letters page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
    });
  }

  /**
   * Assert search results contain expected job
   * @param jobNo - Expected job number in results
   */
  async assertSearchResultsContain(jobNo: string): Promise<void> {
    await test.step(`Assert results contain: ${jobNo}`, async () => {
      const link = this.table.getByRole('link', { name: jobNo });
      await expect(link).toBeVisible();
    });
  }

  /**
   * Assert no results found
   */
  async assertNoResults(): Promise<void> {
    await test.step('Assert no results found', async () => {
      const rowCount = await this.getRowCount();
      expect(rowCount).toBe(0);
    });
  }
}
