import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Job list item interface (row data)
 */
export interface JobListItem {
  jobNo: string;
  customerName?: string;
  siteName?: string;
  status?: string;
  visits?: string;
  priority?: string;
  remaining?: string;
  jobCategory?: string;
  customerOrderNumber?: string;
  dateLogged?: string;
  dateCompleted?: string;
  jobType?: string;
  referenceNo?: string;
  contact?: string;
  description?: string;
  revisitReason?: string;
  appointmentDate?: string;
  postcode?: string;
  tags?: string;
  targetCompletionDate?: string;
  totalInvoicedValue?: string;
  quotedValue?: string;
  jobTrade?: string;
  customerType?: string;
  jobOwner?: string;
  subJobStatus?: string;
}

/**
 * Search/filter options
 */
export interface JobSearchOptions {
  query?: string;
  status?: string[];
  dateLoggedStart?: string;
  dateLoggedEnd?: string;
  appointmentDateStart?: string;
  appointmentDateEnd?: string;
  jobType?: string[];
  jobCategory?: string[];
  jobTrade?: string[];
  engineer?: string[];
  customerType?: string[];
  jobOwner?: string[];
}

/**
 * Job tabs
 */
export type JobTab = 'All' | 'Open' | 'In Jeopardy' | 'Requires Allocation' | 'Completed Today' | 'Requires Invoicing' | 'Requires Revisit' | 'Suspended' | 'Requires Approval' | 'Approved';

/**
 * Table columns that can be sorted
 */
export type JobSortableColumn = 'Job No.' | 'Customer Name' | 'Site Name' | 'Priority' | 'Customer Order Number' | 'Date Logged' | 'Date Completed' | 'Appointment Date' | 'Postcode' | 'Target Completion Date' | 'Job Owner';

/**
 * Results per page options
 */
export type JobResultsPerPage = 5 | 10 | 20 | 30 | 50;

/**
 * AllJobsPage - Page Object for All Jobs list page
 * URL: /Job
 */
export class AllJobsPage extends BasePage {
  // ========================
  // Locators - Header/Actions
  // ========================
  readonly pageTitle: Locator;
  readonly logJobButton: Locator;
  readonly printButton: Locator;
  readonly importButton: Locator;
  readonly exportButton: Locator;

  // ========================
  // Locators - Search/Filter
  // ========================
  readonly hideFilterButton: Locator;
  readonly searchInput: Locator;
  readonly statusDropdown: Locator;
  readonly dateLoggedStartInput: Locator;
  readonly dateLoggedEndInput: Locator;
  readonly appointmentStartInput: Locator;
  readonly appointmentEndInput: Locator;
  readonly showAdvancedButton: Locator;
  readonly hideAdvancedButton: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;
  readonly quickFiltersButton: Locator;

  // ========================
  // Locators - Tabs
  // ========================
  readonly allTab: Locator;
  readonly openTab: Locator;
  readonly inJeopardyTab: Locator;
  readonly requiresAllocationTab: Locator;
  readonly completedTodayTab: Locator;
  readonly requiresInvoicingTab: Locator;
  readonly requiresRevisitTab: Locator;
  readonly suspendedTab: Locator;
  readonly requiresApprovalTab: Locator;
  readonly approvedTab: Locator;

  // ========================
  // Locators - Table
  // ========================
  readonly table: Locator;
  readonly tableHeader: Locator;
  readonly tableBody: Locator;
  readonly tableRows: Locator;
  readonly loadingIndicator: Locator;

  // ========================
  // Locators - Column Headers (sortable)
  // ========================
  readonly jobNoColumnHeader: Locator;
  readonly customerNameColumnHeader: Locator;
  readonly siteNameColumnHeader: Locator;
  readonly priorityColumnHeader: Locator;
  readonly customerOrderNumberColumnHeader: Locator;
  readonly dateLoggedColumnHeader: Locator;
  readonly dateCompletedColumnHeader: Locator;
  readonly appointmentDateColumnHeader: Locator;
  readonly postcodeColumnHeader: Locator;
  readonly targetCompletionDateColumnHeader: Locator;
  readonly jobOwnerColumnHeader: Locator;

  // ========================
  // Locators - Pagination
  // ========================
  readonly pagination: Locator;
  readonly firstPageButton: Locator;
  readonly previousPageButton: Locator;
  readonly nextPageButton: Locator;
  readonly lastPageButton: Locator;
  readonly resultsPerPageDropdown: Locator;

  // ========================
  // Locators - Job Detail Sidebar
  // ========================
  readonly jobDetailSidebar: Locator;
  readonly viewFullJobDetailsButton: Locator;

  constructor(page: Page) {
    super(page);

    // Header/Actions
    this.pageTitle = page.getByRole('heading', { name: 'Jobs', level: 3 });
    this.logJobButton = page.getByRole('link', { name: 'Log Job' }).first();
    this.printButton = page.getByText('Print');
    this.importButton = page.getByText('Import');
    this.exportButton = page.getByText('Export');

    // Search/Filter
    this.hideFilterButton = page.getByRole('button', { name: /Hide Filter|Show Filter/i });
    this.searchInput = page.getByPlaceholder('Customer / Site / Job Number / Contact / Description / Order No. / Reference / Priority Description / Custom Fields.');
    this.statusDropdown = page.locator('text=Status').locator('..').locator('[class*="multiselect"], [role="listbox"]');
    this.dateLoggedStartInput = page.locator('text=Date Logged').locator('..').locator('input[placeholder="Start Date"]');
    this.dateLoggedEndInput = page.locator('text=Date Logged').locator('..').locator('input[placeholder="End Date"]');
    this.appointmentStartInput = page.locator('text=Appointment Date').locator('..').locator('input[placeholder="Start Date"]');
    this.appointmentEndInput = page.locator('text=Appointment Date').locator('..').locator('input[placeholder="End Date"]');
    this.showAdvancedButton = page.getByRole('button', { name: 'Show Advanced' });
    this.hideAdvancedButton = page.getByRole('button', { name: 'Hide Advanced' });
    this.resetFilterButton = page.getByRole('button', { name: 'Reset Filter' });
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.quickFiltersButton = page.getByText('Quick Filters');

    // Tabs
    this.allTab = page.getByRole('tab', { name: /^All \(\d+\)/ });
    this.openTab = page.getByRole('tab', { name: /^Open \(\d+\)/ });
    this.inJeopardyTab = page.getByRole('tab', { name: /In Jeopardy/ });
    this.requiresAllocationTab = page.getByRole('tab', { name: /Requires Allocation/ });
    this.completedTodayTab = page.getByRole('tab', { name: /Completed Today/ });
    this.requiresInvoicingTab = page.getByRole('tab', { name: /Requires Invoicing/ });
    this.requiresRevisitTab = page.getByRole('tab', { name: /Requires Revisit/ });
    this.suspendedTab = page.getByRole('tab', { name: /Suspended/ });
    this.requiresApprovalTab = page.getByRole('tab', { name: /Requires Approval/ });
    this.approvedTab = page.getByRole('tab', { name: /Approved/ });

    // Table
    this.table = page.locator('table').first();
    this.tableHeader = this.table.locator('thead, [role="rowgroup"]').first();
    this.tableBody = this.table.locator('tbody, [role="rowgroup"]').last();
    this.tableRows = this.tableBody.locator('tr, [role="row"]');
    this.loadingIndicator = page.getByText('Loading Data... Please wait');

    // Column Headers (sortable)
    this.jobNoColumnHeader = page.getByRole('button', { name: 'Job No.' });
    this.customerNameColumnHeader = page.getByRole('button', { name: 'Customer Name' });
    this.siteNameColumnHeader = page.getByRole('button', { name: 'Site Name' });
    this.priorityColumnHeader = page.getByRole('button', { name: 'Priority' });
    this.customerOrderNumberColumnHeader = page.getByRole('button', { name: 'Customer Order Number' });
    this.dateLoggedColumnHeader = page.getByRole('button', { name: 'Date Logged' });
    this.dateCompletedColumnHeader = page.getByRole('button', { name: 'Date Completed' });
    this.appointmentDateColumnHeader = page.getByRole('button', { name: 'Appointment Date' });
    this.postcodeColumnHeader = page.getByRole('button', { name: 'Postcode' });
    this.targetCompletionDateColumnHeader = page.getByRole('button', { name: 'Target Completion Date' });
    this.jobOwnerColumnHeader = page.getByRole('button', { name: 'Job Owner' });

    // Pagination
    this.pagination = page.getByRole('navigation', { name: 'Page navigation' });
    this.firstPageButton = this.pagination.locator('text="««"');
    this.previousPageButton = this.pagination.locator('text="«"');
    this.nextPageButton = this.pagination.locator('text="»"');
    this.lastPageButton = this.pagination.locator('text="»»"');
    this.resultsPerPageDropdown = page.locator('select, [role="combobox"]').filter({ hasText: /Results per page/ });

    // Job Detail Sidebar
    this.jobDetailSidebar = page.locator('text=Job Details').locator('..');
    this.viewFullJobDetailsButton = page.getByRole('button', { name: 'View Full Job Details' });
  }

  // ========================
  // Navigation
  // ========================

  /**
   * Navigate to All Jobs page
   */
  async navigateToAllJobs(): Promise<void> {
    await test.step('Navigate to All Jobs page', async () => {
      await this.page.goto('/Job');
      await this.waitForTableLoad();
    });
  }

  /**
   * Wait for table data to finish loading
   */
  async waitForTableLoad(): Promise<void> {
    await test.step('Wait for table to load', async () => {
      await this.loadingIndicator.waitFor({ state: 'hidden', timeout: 30000 }).catch(() => { });
      await this.page.waitForLoadState('networkidle');
    });
  }

  // ========================
  // Search & Filter
  // ========================

  /**
   * Search jobs by text
   * @param query - Search text
   */
  async search(query: string): Promise<void> {
    await test.step(`Search jobs: ${query}`, async () => {
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
   * Filter by status
   * @param statuses - Array of status names to select
   */
  async filterByStatus(statuses: string[]): Promise<void> {
    await test.step(`Filter by status: ${statuses.join(', ')}`, async () => {
      await this.statusDropdown.click();
      for (const status of statuses) {
        await this.page.getByRole('option', { name: status }).click();
      }
      await this.page.keyboard.press('Escape');
      await this.searchButton.click();
      await this.waitForTableLoad();
    });
  }

  /**
   * Set date logged range
   */
  async setDateLoggedRange(startDate: string, endDate: string): Promise<void> {
    await test.step(`Set date logged range: ${startDate} - ${endDate}`, async () => {
      await this.dateLoggedStartInput.fill(startDate);
      await this.dateLoggedEndInput.fill(endDate);
    });
  }

  /**
   * Set appointment date range
   */
  async setAppointmentDateRange(startDate: string, endDate: string): Promise<void> {
    await test.step(`Set appointment date range: ${startDate} - ${endDate}`, async () => {
      await this.appointmentStartInput.fill(startDate);
      await this.appointmentEndInput.fill(endDate);
    });
  }

  /**
   * Show/expand advanced filters
   */
  async showAdvancedFilters(): Promise<void> {
    await test.step('Show advanced filters', async () => {
      const isHidden = await this.showAdvancedButton.isVisible();

      if (isHidden) {
        await this.showAdvancedButton.click();
      }
    });
  }

  /**
   * Hide/collapse advanced filters
   */
  async hideAdvancedFilters(): Promise<void> {
    await test.step('Hide advanced filters', async () => {
      const isShown = await this.hideAdvancedButton.isVisible();

      if (isShown) {
        await this.hideAdvancedButton.click();
      }
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
  async searchWithOptions(options: JobSearchOptions): Promise<void> {
    await test.step('Search with options', async () => {
      if (options.query) {
        await this.searchInput.fill(options.query);
      }
      if (options.status?.length) {
        await this.filterByStatus(options.status);
        return;
      }
      if (options.dateLoggedStart && options.dateLoggedEnd) {
        await this.setDateLoggedRange(options.dateLoggedStart, options.dateLoggedEnd);
      }
      if (options.appointmentDateStart && options.appointmentDateEnd) {
        await this.setAppointmentDateRange(options.appointmentDateStart, options.appointmentDateEnd);
      }
      await this.searchButton.click();
      await this.waitForTableLoad();
    });
  }

  // ========================
  // Tabs
  // ========================

  /**
   * Switch to a specific tab
   * @param tab - Tab name
   */
  async switchToTab(tab: JobTab): Promise<void> {
    await test.step(`Switch to ${tab} tab`, async () => {
      switch (tab) {
      case 'All':
        await this.allTab.click();
        break;
      case 'Open':
        await this.openTab.click();
        break;
      case 'In Jeopardy':
        await this.inJeopardyTab.click();
        break;
      case 'Requires Allocation':
        await this.requiresAllocationTab.click();
        break;
      case 'Completed Today':
        await this.completedTodayTab.click();
        break;
      case 'Requires Invoicing':
        await this.requiresInvoicingTab.click();
        break;
      case 'Requires Revisit':
        await this.requiresRevisitTab.click();
        break;
      case 'Suspended':
        await this.suspendedTab.click();
        break;
      case 'Requires Approval':
        await this.requiresApprovalTab.click();
        break;
      case 'Approved':
        await this.approvedTab.click();
        break;
      }
      await this.waitForTableLoad();
    });
  }

  /**
   * Get count from tab
   * @param tab - Tab name
   * @returns Number of items in tab
   */
  async getTabCount(tab: JobTab): Promise<number> {
    const tabElement = tab === 'All' ? this.allTab
      : tab === 'Open' ? this.openTab
        : tab === 'In Jeopardy' ? this.inJeopardyTab
          : tab === 'Requires Allocation' ? this.requiresAllocationTab
            : tab === 'Completed Today' ? this.completedTodayTab
              : tab === 'Requires Invoicing' ? this.requiresInvoicingTab
                : tab === 'Requires Revisit' ? this.requiresRevisitTab
                  : tab === 'Suspended' ? this.suspendedTab
                    : tab === 'Requires Approval' ? this.requiresApprovalTab
                      : this.approvedTab;

    const text = await tabElement.textContent();
    const match = text?.match(/\((\d+)\)/);

    return match ? parseInt(match[1], 10) : 0;
  }

  // ========================
  // Table Actions - Click Jobs
  // ========================

  /**
   * Get number of rows in the table
   */
  async getRowCount(): Promise<number> {
    return await this.tableRows.count();
  }

  /**
   * Click on a job row by job number
   * @param jobNo - Job number to click (e.g., 'M0000264')
   */
  async clickJobByJobNo(jobNo: string): Promise<void> {
    await test.step(`Click job: ${jobNo}`, async () => {
      await this.table.getByRole('link', { name: jobNo }).first().click();
      await this.page.waitForURL(/\/Job\/Detail\/\d+/);
    });
  }

  /**
   * Click on a job row by customer name
   * @param customerName - Customer name to find and click
   */
  async clickJobByCustomerName(customerName: string): Promise<void> {
    await test.step(`Click job by customer: ${customerName}`, async () => {
      const row = this.tableBody.locator('tr, [role="row"]').filter({ has: this.page.getByRole('link', { name: customerName }) });
      const jobNoLink = row.locator('td, [role="cell"]').first().getByRole('link');

      await jobNoLink.click();
      await this.page.waitForURL(/\/Job\/Detail\/\d+/);
    });
  }

  /**
   * Click on a job row by site name
   * @param siteName - Site name to find and click
   */
  async clickJobBySiteName(siteName: string): Promise<void> {
    await test.step(`Click job by site: ${siteName}`, async () => {
      const row = this.tableBody.locator('tr, [role="row"]').filter({
        has: this.page.locator('td, [role="cell"]').nth(2).getByRole('link', { name: siteName })
      });
      const jobNoLink = row.locator('td, [role="cell"]').first().getByRole('link');

      await jobNoLink.click();
      await this.page.waitForURL(/\/Job\/Detail\/\d+/);
    });
  }

  /**
   * Click on a job row by description
   * @param description - Job description to find and click
   */
  async clickJobByDescription(description: string): Promise<void> {
    await test.step(`Click job by description: ${description}`, async () => {
      const row = this.tableBody.locator('tr, [role="row"]').filter({ hasText: description });
      const jobNoLink = row.locator('td, [role="cell"]').first().getByRole('link');

      await jobNoLink.click();
      await this.page.waitForURL(/\/Job\/Detail\/\d+/);
    });
  }

  /**
   * Click on a job row by status
   * @param status - Job status to find and click
   */
  async clickJobByStatus(status: string): Promise<void> {
    await test.step(`Click job by status: ${status}`, async () => {
      const row = this.tableBody.locator('tr, [role="row"]').filter({ hasText: status }).first();
      const jobNoLink = row.locator('td, [role="cell"]').first().getByRole('link');

      await jobNoLink.click();
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
   * Get job data from a row
   * @param index - Row index (0-based)
   */
  async getJobFromRow(index: number): Promise<JobListItem> {
    const row = this.tableRows.nth(index);
    const cells = row.locator('td, [role="cell"]');

    return {
      jobNo: await cells.nth(0).textContent() || '',
      customerName: await cells.nth(1).textContent() || undefined,
      siteName: await cells.nth(2).textContent() || undefined,
      status: await cells.nth(3).textContent() || undefined,
      visits: await cells.nth(4).textContent() || undefined,
      priority: await cells.nth(5).textContent() || undefined,
      remaining: await cells.nth(6).textContent() || undefined,
      jobCategory: await cells.nth(7).textContent() || undefined,
      customerOrderNumber: await cells.nth(8).textContent() || undefined,
      dateLogged: await cells.nth(9).textContent() || undefined,
      dateCompleted: await cells.nth(10).textContent() || undefined,
      jobType: await cells.nth(11).textContent() || undefined,
      referenceNo: await cells.nth(12).textContent() || undefined,
      contact: await cells.nth(13).textContent() || undefined,
      description: await cells.nth(14).textContent() || undefined,
    };
  }

  /**
   * Get all visible jobs
   */
  async getAllVisibleJobs(): Promise<JobListItem[]> {
    const count = await this.getRowCount();
    const jobs: JobListItem[] = [];

    for (let i = 0; i < count; i++) {
      jobs.push(await this.getJobFromRow(i));
    }
    return jobs;
  }

  /**
   * Sort table by column
   * @param column - Column to sort by
   */
  async sortByColumn(column: JobSortableColumn): Promise<void> {
    await test.step(`Sort by ${column}`, async () => {
      switch (column) {
      case 'Job No.':
        await this.jobNoColumnHeader.click();
        break;
      case 'Customer Name':
        await this.customerNameColumnHeader.click();
        break;
      case 'Site Name':
        await this.siteNameColumnHeader.click();
        break;
      case 'Priority':
        await this.priorityColumnHeader.click();
        break;
      case 'Customer Order Number':
        await this.customerOrderNumberColumnHeader.click();
        break;
      case 'Date Logged':
        await this.dateLoggedColumnHeader.click();
        break;
      case 'Date Completed':
        await this.dateCompletedColumnHeader.click();
        break;
      case 'Appointment Date':
        await this.appointmentDateColumnHeader.click();
        break;
      case 'Postcode':
        await this.postcodeColumnHeader.click();
        break;
      case 'Target Completion Date':
        await this.targetCompletionDateColumnHeader.click();
        break;
      case 'Job Owner':
        await this.jobOwnerColumnHeader.click();
        break;
      }
      await this.waitForTableLoad();
    });
  }

  /**
   * Check if job exists in the table
   * @param jobNo - Job number to find
   */
  async jobExists(jobNo: string): Promise<boolean> {
    const link = this.table.getByRole('link', { name: jobNo });

    return await link.isVisible();
  }

  // ========================
  // Pagination
  // ========================

  /**
   * Go to first page
   */
  async goToFirstPage(): Promise<void> {
    await test.step('Go to first page', async () => {
      await this.firstPageButton.click();
      await this.waitForTableLoad();
    });
  }

  /**
   * Go to previous page
   */
  async goToPreviousPage(): Promise<void> {
    await test.step('Go to previous page', async () => {
      await this.previousPageButton.click();
      await this.waitForTableLoad();
    });
  }

  /**
   * Go to next page
   */
  async goToNextPage(): Promise<void> {
    await test.step('Go to next page', async () => {
      await this.nextPageButton.click();
      await this.waitForTableLoad();
    });
  }

  /**
   * Go to last page
   */
  async goToLastPage(): Promise<void> {
    await test.step('Go to last page', async () => {
      await this.lastPageButton.click();
      await this.waitForTableLoad();
    });
  }

  /**
   * Go to specific page number
   * @param pageNumber - Page number to navigate to
   */
  async goToPage(pageNumber: number): Promise<void> {
    await test.step(`Go to page ${pageNumber}`, async () => {
      await this.pagination.locator(`text="${pageNumber}"`).click();
      await this.waitForTableLoad();
    });
  }

  /**
   * Set results per page
   * @param count - Number of results per page
   */
  async setResultsPerPage(count: JobResultsPerPage): Promise<void> {
    await test.step(`Set ${count} results per page`, async () => {
      await this.resultsPerPageDropdown.selectOption({ label: `${count} Results per page` });
      await this.waitForTableLoad();
    });
  }

  // ========================
  // Header Actions
  // ========================

  /**
   * Click Log Job button (navigates to Log Job page)
   */
  async clickLogJob(): Promise<void> {
    await test.step('Click Log Job', async () => {
      await this.logJobButton.click();
      await this.page.waitForURL(/\/Job\/Create/);
    });
  }

  /**
   * Click Print button
   */
  async clickPrint(): Promise<void> {
    await test.step('Click Print', async () => {
      await this.printButton.click();
    });
  }

  /**
   * Click Export button
   */
  async clickExport(): Promise<void> {
    await test.step('Click Export', async () => {
      await this.exportButton.click();
    });
  }

  /**
   * Click Import button
   */
  async clickImport(): Promise<void> {
    await test.step('Click Import', async () => {
      await this.importButton.click();
    });
  }

  // ========================
  // Detail Sidebar
  // ========================

  /**
   * View full job details (from sidebar)
   */
  async viewFullJobDetails(): Promise<void> {
    await test.step('View full job details', async () => {
      await this.viewFullJobDetailsButton.click();
      await this.page.waitForURL(/\/Job\/Detail\/\d+/);
    });
  }

  /**
   * Check if job detail sidebar is visible
   */
  async isDetailSidebarVisible(): Promise<boolean> {
    return await this.jobDetailSidebar.isVisible();
  }

  // ========================
  // Assertions
  // ========================

  /**
   * Assert page is loaded correctly
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert All Jobs page is loaded', async () => {
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
