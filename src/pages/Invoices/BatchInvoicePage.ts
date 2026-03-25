import { Locator, Page } from "@playwright/test";
import { test, expect } from '@playwright/test';
import { BasePage } from "../BasePage";
import { BatchInvoiceData } from '../../data/testData/batchInvoice.data';

/**
 * Job status options for filtering
 */
export type BatchJobStatus = 
  | 'Open'
  | 'Complete'
  | 'Cancelled'
  | 'On Hold';

/**
 * Tab types for the page
 */
export type BatchInvoiceTab = 'Jobs' | 'Draft Invoices';

/**
 * Search options for filtering
 */
export interface BatchInvoiceSearchOptions {
  customers?: string[];
  searchText?: string;
  startDate?: string;
  endDate?: string;
  statuses?: BatchJobStatus[];
  jobCategories?: string[];
}

/**
 * BatchInvoicePage - Page Object for Create Batch of Invoices
 * URL: /BatchInvoice/Create
 */
export class BatchInvoicePage extends BasePage {
  // ========================
  // Locators - Page Header
  // ========================
  readonly pageTitle: Locator;

  // ========================
  // Locators - Tab Navigation
  // ========================
  readonly jobsTab: Locator;
  readonly draftInvoicesTab: Locator;

  // ========================
  // Locators - Filter Section
  // ========================
  readonly hideFilterButton: Locator;
  readonly customersDropdown: Locator;
  readonly searchJobsInput: Locator;
  readonly dateLoggedLabel: Locator;
  readonly startDateInput: Locator;
  readonly endDateInput: Locator;
  readonly statusDropdown: Locator;
  readonly jobCategoryDropdown: Locator;
  readonly showAdvancedButton: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // ========================
  // Locators - Results Section
  // ========================
  readonly allTab: Locator;
  readonly selectedTab: Locator;
  readonly resultsTable: Locator;
  readonly noMatchingResultsMessage: Locator;

  // ========================
  // Locators - Footer
  // ========================
  readonly totalOutstandingCost: Locator;
  readonly cancelButton: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);

    // Page Header
    this.pageTitle = page.getByRole('heading', { name: 'Batch of Invoices', level: 3 });

    // Tab Navigation
    this.jobsTab = page.getByRole('tab', { name: 'Jobs' });
    this.draftInvoicesTab = page.getByRole('tab', { name: 'Draft Invoices' });

    // Filter Section
    this.hideFilterButton = page.getByRole('button', { name: 'Hide Filter' });
    this.customersDropdown = page.locator('text=Customer(s)').locator('..').locator('[class*="multiselect"]');
    this.searchJobsInput = page.getByPlaceholder('Site / Contact / Description / Order No. / Reference');
    this.dateLoggedLabel = page.locator('text=Date Logged *');
    this.startDateInput = page.getByPlaceholder('Start Date');
    this.endDateInput = page.getByPlaceholder('End Date');
    this.statusDropdown = page.locator('text=Status').locator('..').locator('[class*="multiselect"]');
    this.jobCategoryDropdown = page.locator('text=Job Category').locator('..').locator('[class*="multiselect"]');
    this.showAdvancedButton = page.getByRole('button', { name: 'Show Advanced' });
    this.resetFilterButton = page.getByRole('button', { name: 'Reset Filter' });
    this.searchButton = page.getByRole('button', { name: 'Search' });

    // Results Section
    this.allTab = page.getByRole('link', { name: /All \(\d+\)/ });
    this.selectedTab = page.getByRole('link', { name: /Selected \(\d+\)/ });
    this.resultsTable = page.locator('table').first();
    this.noMatchingResultsMessage = page.locator('strong:has-text("No matching results found")');

    // Footer
    this.totalOutstandingCost = page.locator('text=Total Outstanding Cost').locator('..').locator('div').last();
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  // ========================
  // Navigation
  // ========================

  /**
   * Navigate to Create Batch of Invoices page
   */
  async navigateToBatchInvoice(): Promise<void> {
    await test.step('Navigate to Create Batch of Invoices page', async () => {
      await this.page.goto('/BatchInvoice/Create');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Batch of Invoices page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
      await expect(this.searchButton).toBeVisible();
    });
  }

  // ========================
  // Tab Navigation
  // ========================

  /**
   * Switch to a specific tab
   */
  async switchToTab(tab: BatchInvoiceTab): Promise<void> {
    await test.step(`Switch to ${tab} tab`, async () => {
      if (tab === 'Jobs') {
        await this.jobsTab.click();
      } else {
        await this.draftInvoicesTab.click();
      }
    });
  }

  // ========================
  // Filter Methods
  // ========================

  /**
   * Toggle filter visibility
   */
  async toggleFilter(): Promise<void> {
    await test.step('Toggle filter', async () => {
      await this.hideFilterButton.click();
    });
  }

  /**
   * Search jobs by text
   */
  async searchJobs(searchText: string): Promise<void> {
    await test.step(`Search jobs: ${searchText}`, async () => {
      await this.searchJobsInput.fill(searchText);
    });
  }

  /**
   * Set date logged range
   */
  async setDateLoggedRange(startDate: string, endDate: string): Promise<void> {
    await test.step(`Set date logged range: ${startDate} - ${endDate}`, async () => {
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
   * Click Show Advanced button
   */
  async clickShowAdvanced(): Promise<void> {
    await test.step('Click Show Advanced', async () => {
      await this.showAdvancedButton.click();
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
  async applyFilters(options: BatchInvoiceSearchOptions): Promise<void> {
    await test.step('Apply search filters', async () => {
      if (options.searchText) await this.searchJobs(options.searchText);
      if (options.startDate) await this.setStartDate(options.startDate);
      if (options.endDate) await this.setEndDate(options.endDate);
      await this.clickSearch();
    });
  }

  // ========================
  // Results Methods
  // ========================

  /**
   * Switch to All results tab
   */
  async switchToAllResults(): Promise<void> {
    await test.step('Switch to All results', async () => {
      await this.allTab.click();
    });
  }

  /**
   * Switch to Selected results tab
   */
  async switchToSelectedResults(): Promise<void> {
    await test.step('Switch to Selected results', async () => {
      await this.selectedTab.click();
    });
  }

  /**
   * Get all items count
   */
  async getAllItemsCount(): Promise<number> {
    return await test.step('Get all items count', async () => {
      const text = await this.allTab.textContent();
      const match = text?.match(/All \((\d+)\)/);
      return match ? parseInt(match[1]) : 0;
    });
  }

  /**
   * Get selected items count
   */
  async getSelectedItemsCount(): Promise<number> {
    return await test.step('Get selected items count', async () => {
      const text = await this.selectedTab.textContent();
      const match = text?.match(/Selected \((\d+)\)/);
      return match ? parseInt(match[1]) : 0;
    });
  }

  /**
   * Check if no matching results message is visible
   */
  async isNoMatchingResultsVisible(): Promise<boolean> {
    return await test.step('Check if no matching results visible', async () => {
      return await this.noMatchingResultsMessage.isVisible();
    });
  }

  /**
   * Select job by job number
   */
  async selectJobByNumber(jobNumber: string): Promise<void> {
    await test.step(`Select job: ${jobNumber}`, async () => {
      const row = this.resultsTable.locator(`tr:has-text("${jobNumber}")`);
      await row.locator('input[type="checkbox"]').check();
    });
  }

  /**
   * Select all jobs
   */
  async selectAllJobs(): Promise<void> {
    await test.step('Select all jobs', async () => {
      const selectAllCheckbox = this.resultsTable.locator('thead input[type="checkbox"]');
      await selectAllCheckbox.check();
    });
  }

  // ========================
  // Footer Methods
  // ========================

  /**
   * Get total outstanding cost
   */
  async getTotalOutstandingCost(): Promise<string> {
    return await test.step('Get total outstanding cost', async () => {
      const text = await this.totalOutstandingCost.textContent();
      return text?.trim() || '0.00';
    });
  }

  /**
   * Click Cancel button
   */
  async clickCancel(): Promise<void> {
    await test.step('Click Cancel', async () => {
      await this.cancelButton.click();
    });
  }

  /**
   * Click Save button
   */
  async clickSave(): Promise<void> {
    await test.step('Click Save', async () => {
      await this.saveButton.click();
    });
  }

  /**
   * Check if Save button is enabled
   */
  async isSaveEnabled(): Promise<boolean> {
    return await test.step('Check if Save is enabled', async () => {
      return await this.saveButton.isEnabled();
    });
  }

  /**
   * Create batch of invoices with selected jobs
   */
  async createBatchInvoice(jobNumbers: string[]): Promise<void> {
    await test.step('Create batch of invoices', async () => {
      await this.clickSearch();
      await this.page.waitForTimeout(1000);
      
      for (const jobNumber of jobNumbers) {
        await this.selectJobByNumber(jobNumber);
      }
      
      await this.clickSave();
    });
  }

  // ========================
  // High-Level Methods (Data Builder Pattern)
  // ========================

  /**
   * Fill the Batch Invoice form with data (does not save)
   * Use this when you need to fill the form but not submit yet
   * @param data - BatchInvoiceData object from builder
   */
  async fillBatchInvoiceForm(data: BatchInvoiceData): Promise<void> {
    await test.step('Fill Batch Invoice form', async () => {
      await this.setDateLoggedRange(data.startDate, data.endDate);
      
      if (data.searchText) await this.searchJobs(data.searchText);
      
      await this.clickSearch();
      await this.page.waitForTimeout(1000);
      
      for (const jobNumber of data.jobNumbers) {
        await this.selectJobByNumber(jobNumber);
      }
    });
  }

  /**
   * Create a new Batch of Invoices with the provided data
   * Fills the form and saves it
   * @param data - BatchInvoiceData object from builder
   */
  async createNewBatchOfInvoices(data: BatchInvoiceData): Promise<void> {
    await test.step('Create new Batch of Invoices', async () => {
      await this.fillBatchInvoiceForm(data);
      await this.clickSave();
    });
  }
}
