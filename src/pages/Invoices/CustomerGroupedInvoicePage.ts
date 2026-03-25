import { Locator, Page } from "@playwright/test";
import { test, expect } from '@playwright/test';
import { BasePage } from "../BasePage";
import { CustomerGroupedInvoiceData } from '../../data/testData/customerGroupedInvoice.data';

/**
 * Job status options for filtering
 */
export type InvoiceJobStatus = 
  | 'Open'
  | 'Complete'
  | 'Cancelled'
  | 'On Hold';

/**
 * Order by options
 */
export type InvoiceOrderBy = 
  | 'Job Number (A-Z)'
  | 'Job Number (Z-A)'
  | 'Date Logged (Newest)'
  | 'Date Logged (Oldest)';

/**
 * Tab types for the page
 */
export type CustomerGroupedTab = 'Jobs' | 'Draft Invoices';

/**
 * Search options for filtering jobs
 */
export interface CustomerGroupedSearchOptions {
  customer?: string;
  searchText?: string;
  startDate?: string;
  endDate?: string;
  statuses?: InvoiceJobStatus[];
  orderBy?: InvoiceOrderBy;
}

/**
 * CustomerGroupedInvoicePage - Page Object for Create Customer Grouped Invoice
 * URL: /CGroupInvoice/Create
 */
export class CustomerGroupedInvoicePage extends BasePage {
  // ========================
  // Locators - Page Header
  // ========================
  readonly pageTitle: Locator;
  readonly exportButton: Locator;

  // ========================
  // Locators - Tab Navigation
  // ========================
  readonly jobsTab: Locator;
  readonly draftInvoicesTab: Locator;

  // ========================
  // Locators - Filter Section
  // ========================
  readonly customerCombobox: Locator;
  readonly customerSearchbox: Locator;
  readonly searchJobsInput: Locator;
  readonly startDateInput: Locator;
  readonly endDateInput: Locator;
  readonly statusDropdown: Locator;
  readonly orderByCombobox: Locator;
  readonly orderBySearchbox: Locator;
  readonly showAdvancedButton: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // ========================
  // Locators - Results Section
  // ========================
  readonly allTab: Locator;
  readonly selectedTab: Locator;
  readonly resultsTable: Locator;
  readonly noMatchingJobsMessage: Locator;

  // ========================
  // Locators - Footer
  // ========================
  readonly totalOutstandingCost: Locator;
  readonly cancelButton: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);

    // Page Header
    this.pageTitle = page.getByRole('heading', { name: 'Create Customer Grouped Invoice', level: 3 });
    this.exportButton = page.locator('text=Export');

    // Tab Navigation
    this.jobsTab = page.getByRole('link', { name: 'Jobs', exact: false });
    this.draftInvoicesTab = page.getByRole('link', { name: 'Draft Invoices' });

    // Filter Section
    this.customerCombobox = page.locator('text=Customer *').locator('..').locator('[role="combobox"]');
    this.customerSearchbox = page.locator('text=Customer *').locator('..').locator('input[role="searchbox"]');
    this.searchJobsInput = page.getByPlaceholder('Site / Contact / Description / Order No. / Reference');
    this.startDateInput = page.locator('text=Date Logged').locator('..').getByPlaceholder('Start Date');
    this.endDateInput = page.locator('text=Date Logged').locator('..').getByPlaceholder('End Date');
    this.statusDropdown = page.locator('text=Status').locator('..').locator('[class*="multiselect"]');
    this.orderByCombobox = page.locator('text=Order By').locator('..').locator('[role="combobox"]');
    this.orderBySearchbox = page.locator('text=Order By').locator('..').locator('input[role="searchbox"]');
    this.showAdvancedButton = page.getByRole('button', { name: 'Show Advanced' });
    this.resetFilterButton = page.getByRole('button', { name: 'Reset Filter' });
    this.searchButton = page.getByRole('button', { name: 'Search' });

    // Results Section
    this.allTab = page.getByRole('link', { name: /All \(\d+\)/ });
    this.selectedTab = page.getByRole('link', { name: /Selected \(\d+\)/ });
    this.resultsTable = page.locator('table').first();
    this.noMatchingJobsMessage = page.locator('strong:has-text("No matching jobs found")');

    // Footer
    this.totalOutstandingCost = page.locator('text=Total Outstanding Cost').locator('..').locator('div').last();
    this.cancelButton = page.getByRole('link', { name: 'Cancel' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  // ========================
  // Navigation
  // ========================

  /**
   * Navigate to Create Customer Grouped Invoice page
   */
  async navigateToCustomerGroupedInvoice(): Promise<void> {
    await test.step('Navigate to Create Customer Grouped Invoice page', async () => {
      await this.page.goto('/CGroupInvoice/Create');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Create Customer Grouped Invoice page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
      await expect(this.customerCombobox).toBeVisible();
    });
  }

  // ========================
  // Tab Navigation
  // ========================

  /**
   * Switch to a specific tab
   */
  async switchToTab(tab: CustomerGroupedTab): Promise<void> {
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
   * Select customer from dropdown
   */
  async selectCustomer(customerName: string): Promise<void> {
    await test.step(`Select customer: ${customerName}`, async () => {
      await this.customerCombobox.click();
      await this.customerSearchbox.fill(customerName);
      await this.page.getByRole('option', { name: customerName }).click();
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
   * Select order by option
   */
  async selectOrderBy(orderBy: InvoiceOrderBy): Promise<void> {
    await test.step(`Select order by: ${orderBy}`, async () => {
      await this.orderByCombobox.click();
      await this.orderBySearchbox.fill(orderBy);
      await this.page.getByRole('option', { name: orderBy }).click();
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
  async applyFilters(options: CustomerGroupedSearchOptions): Promise<void> {
    await test.step('Apply search filters', async () => {
      if (options.customer) await this.selectCustomer(options.customer);
      if (options.searchText) await this.searchJobs(options.searchText);
      if (options.startDate) await this.setStartDate(options.startDate);
      if (options.endDate) await this.setEndDate(options.endDate);
      if (options.orderBy) await this.selectOrderBy(options.orderBy);
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
   * Get all jobs count
   */
  async getAllJobsCount(): Promise<number> {
    return await test.step('Get all jobs count', async () => {
      const text = await this.allTab.textContent();
      const match = text?.match(/All \((\d+)\)/);
      return match ? parseInt(match[1]) : 0;
    });
  }

  /**
   * Get selected jobs count
   */
  async getSelectedJobsCount(): Promise<number> {
    return await test.step('Get selected jobs count', async () => {
      const text = await this.selectedTab.textContent();
      const match = text?.match(/Selected \((\d+)\)/);
      return match ? parseInt(match[1]) : 0;
    });
  }

  /**
   * Check if no matching jobs message is visible
   */
  async isNoMatchingJobsVisible(): Promise<boolean> {
    return await test.step('Check if no matching jobs visible', async () => {
      return await this.noMatchingJobsMessage.isVisible();
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
      return text?.trim() || '£0.00';
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
   * Create customer grouped invoice with selected jobs
   */
  async createInvoice(customerName: string, jobNumbers: string[]): Promise<void> {
    await test.step('Create customer grouped invoice', async () => {
      await this.selectCustomer(customerName);
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
   * Fill the Customer Grouped Invoice form with data (does not save)
   * Use this when you need to fill the form but not submit yet
   * @param data - CustomerGroupedInvoiceData object from builder
   */
  async fillCustomerGroupedInvoiceForm(data: CustomerGroupedInvoiceData): Promise<void> {
    await test.step('Fill Customer Grouped Invoice form', async () => {
      await this.selectCustomer(data.customer);
      
      if (data.searchText) await this.searchJobs(data.searchText);
      if (data.startDate) await this.setStartDate(data.startDate);
      if (data.endDate) await this.setEndDate(data.endDate);
      if (data.orderBy) await this.selectOrderBy(data.orderBy);
      
      await this.clickSearch();
      await this.page.waitForTimeout(1000);
      
      for (const jobNumber of data.jobNumbers) {
        await this.selectJobByNumber(jobNumber);
      }
    });
  }

  /**
   * Create a new Customer Grouped Invoice with the provided data
   * Fills the form and saves it
   * @param data - CustomerGroupedInvoiceData object from builder
   */
  async createNewCustomerGroupedInvoice(data: CustomerGroupedInvoiceData): Promise<void> {
    await test.step('Create new Customer Grouped Invoice', async () => {
      await this.fillCustomerGroupedInvoiceForm(data);
      await this.clickSave();
    });
  }
}
