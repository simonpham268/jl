import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Quote list item interface (row data)
 */
export interface QuoteListItem {
  quoteNo: string;
  customerName?: string;
  siteName?: string;
  status?: string;
  priority?: string;
  title?: string;
  description?: string;
  dateLogged?: string;
  expiryDate?: string;
  quoteOwner?: string;
  jobType?: string;
  jobCategory?: string;
  quoteTrade?: string;
  quoteValue?: string;
  chanceOfSale?: string;
  expectedSaleDate?: string;
  sourceOfEnquiry?: string;
  tags?: string;
}

/**
 * Search/filter options for quotes
 */
export interface QuoteSearchOptions {
  query?: string;
  status?: string[];
  dateLoggedStart?: string;
  dateLoggedEnd?: string;
  expiryDateStart?: string;
  expiryDateEnd?: string;
  jobType?: string[];
  jobCategory?: string[];
  quoteTrade?: string[];
  quoteOwner?: string[];
  chanceOfSale?: number[];
}

/**
 * Quote tabs
 */
export type QuoteTab = 'All' | 'Outstanding' | 'Accepted' | 'Rejected' | 'Expired';

/**
 * Table columns that can be sorted
 */
export type QuoteSortableColumn = 'Quote No.' | 'Customer Name' | 'Site Name' | 'Priority' | 'Date Logged' | 'Expiry Date' | 'Quote Owner' | 'Quote Value' | 'Chance of Sale';

/**
 * Results per page options
 */
export type QuoteResultsPerPage = 5 | 10 | 20 | 30 | 50;

/**
 * AllQuotesPage - Page Object for All Quotes list page
 * URL: /Quote
 */
export class AllQuotesPage extends BasePage {
  // ========================
  // Locators - Header/Actions
  // ========================
  readonly pageTitle: Locator;
  readonly logQuoteButton: Locator;
  readonly printButton: Locator;
  readonly importButton: Locator;
  readonly exportButton: Locator;

  // ========================
  // Locators - Empty State
  // ========================
  readonly emptyStateHeading: Locator;
  readonly emptyStateDescription: Locator;
  readonly createFirstQuoteLink: Locator;

  // ========================
  // Locators - Search/Filter
  // ========================
  readonly hideFilterButton: Locator;
  readonly searchInput: Locator;
  readonly statusDropdown: Locator;
  readonly dateLoggedStartInput: Locator;
  readonly dateLoggedEndInput: Locator;
  readonly expiryDateStartInput: Locator;
  readonly expiryDateEndInput: Locator;
  readonly showAdvancedButton: Locator;
  readonly hideAdvancedButton: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // ========================
  // Locators - Tabs
  // ========================
  readonly allTab: Locator;
  readonly outstandingTab: Locator;
  readonly acceptedTab: Locator;
  readonly rejectedTab: Locator;
  readonly expiredTab: Locator;

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
  readonly quoteNoColumnHeader: Locator;
  readonly customerNameColumnHeader: Locator;
  readonly siteNameColumnHeader: Locator;
  readonly priorityColumnHeader: Locator;
  readonly dateLoggedColumnHeader: Locator;
  readonly expiryDateColumnHeader: Locator;
  readonly quoteOwnerColumnHeader: Locator;
  readonly quoteValueColumnHeader: Locator;

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
  // Locators - Quote Detail Sidebar
  // ========================
  readonly quoteDetailSidebar: Locator;
  readonly viewFullQuoteDetailsButton: Locator;

  constructor(page: Page) {
    super(page);

    // Header/Actions
    this.pageTitle = page.getByRole('heading', { name: 'Quotes', level: 3 });
    this.logQuoteButton = page.getByRole('link', { name: 'Log Quote' }).first();
    this.printButton = page.getByText('Print');
    this.importButton = page.getByText('Import');
    this.exportButton = page.getByText('Export');

    // Empty State
    this.emptyStateHeading = page.getByRole('heading', { name: 'Create beautifully branded quotes' });
    this.emptyStateDescription = page.getByText('Log inquiries for small works and projects');
    this.createFirstQuoteLink = page.getByRole('link', { name: /Create your first quote/i });

    // Search/Filter
    this.hideFilterButton = page.getByRole('button', { name: /Hide Filter|Show Filter/i });
    this.searchInput = page.getByPlaceholder(/Customer|Site|Quote|Description/i);
    this.statusDropdown = page.locator('text=Status').locator('..').locator('[class*="multiselect"], [role="listbox"]');
    this.dateLoggedStartInput = page.locator('text=Date Logged').locator('..').locator('input[placeholder="Start Date"]');
    this.dateLoggedEndInput = page.locator('text=Date Logged').locator('..').locator('input[placeholder="End Date"]');
    this.expiryDateStartInput = page.locator('text=Expiry Date').locator('..').locator('input[placeholder="Start Date"]');
    this.expiryDateEndInput = page.locator('text=Expiry Date').locator('..').locator('input[placeholder="End Date"]');
    this.showAdvancedButton = page.getByRole('button', { name: 'Show Advanced' });
    this.hideAdvancedButton = page.getByRole('button', { name: 'Hide Advanced' });
    this.resetFilterButton = page.getByRole('button', { name: 'Reset Filter' });
    this.searchButton = page.getByRole('button', { name: 'Search' });

    // Tabs
    this.allTab = page.getByRole('tab', { name: /^All/ });
    this.outstandingTab = page.getByRole('tab', { name: /^Outstanding/ });
    this.acceptedTab = page.getByRole('tab', { name: /^Accepted/ });
    this.rejectedTab = page.getByRole('tab', { name: /^Rejected/ });
    this.expiredTab = page.getByRole('tab', { name: /^Expired/ });

    // Table
    this.table = page.locator('table').first();
    this.tableHeader = this.table.locator('thead, [role="rowgroup"]').first();
    this.tableBody = this.table.locator('tbody, [role="rowgroup"]').last();
    this.tableRows = this.tableBody.locator('tr, [role="row"]');
    this.loadingIndicator = page.getByText('Loading Data... Please wait');

    // Column Headers (sortable)
    this.quoteNoColumnHeader = page.getByRole('button', { name: 'Quote No.' });
    this.customerNameColumnHeader = page.getByRole('button', { name: 'Customer Name' });
    this.siteNameColumnHeader = page.getByRole('button', { name: 'Site Name' });
    this.priorityColumnHeader = page.getByRole('button', { name: 'Priority' });
    this.dateLoggedColumnHeader = page.getByRole('button', { name: 'Date Logged' });
    this.expiryDateColumnHeader = page.getByRole('button', { name: 'Expiry Date' });
    this.quoteOwnerColumnHeader = page.getByRole('button', { name: 'Quote Owner' });
    this.quoteValueColumnHeader = page.getByRole('button', { name: 'Quote Value' });

    // Pagination
    this.pagination = page.locator('[role="navigation"][aria-label="Page navigation"]');
    this.firstPageButton = this.pagination.getByText('««');
    this.previousPageButton = this.pagination.getByText('«');
    this.nextPageButton = this.pagination.getByText('»');
    this.lastPageButton = this.pagination.getByText('»»');
    this.resultsPerPageDropdown = page.locator('text*=Results per page').locator('..').locator('select, [role="combobox"]');

    // Quote Detail Sidebar
    this.quoteDetailSidebar = page.locator('[class*="sidebar"], [class*="detail-panel"]');
    this.viewFullQuoteDetailsButton = page.getByRole('button', { name: /View Full Quote Details/i });
  }

  // ========================
  // Navigation
  // ========================

  /**
   * Navigate to All Quotes page
   */
  async navigateToAllQuotes(): Promise<void> {
    await test.step('Navigate to All Quotes page', async () => {
      await this.page.goto('/Quote');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert All Quotes page is loaded', async () => {
      // Check for either the quotes list or empty state
      const hasEmptyState = await this.emptyStateHeading.isVisible().catch(() => false);
      const hasTable = await this.table.isVisible().catch(() => false);

      expect(hasEmptyState || hasTable).toBe(true);
    });
  }

  /**
   * Check if quotes list is empty
   */
  async isEmptyState(): Promise<boolean> {
    return await test.step('Check if empty state', async () => {
      return await this.emptyStateHeading.isVisible();
    });
  }

  /**
   * Click Log Quote button
   */
  async clickLogQuote(): Promise<void> {
    await test.step('Click Log Quote', async () => {
      // Handle both empty state and normal state
      const emptyStateVisible = await this.emptyStateHeading.isVisible().catch(() => false);

      if (emptyStateVisible) {
        await this.createFirstQuoteLink.click();
      } else {
        await this.logQuoteButton.click();
      }
    });
  }

  // ========================
  // Search and Filter
  // ========================

  /**
   * Search for quotes
   */
  async search(query: string): Promise<void> {
    await test.step(`Search: ${query}`, async () => {
      await this.searchInput.fill(query);
      await this.searchButton.click();
      await this.waitForTableLoad();
    });
  }

  /**
   * Reset all filters
   */
  async resetFilters(): Promise<void> {
    await test.step('Reset filters', async () => {
      await this.resetFilterButton.click();
      await this.waitForTableLoad();
    });
  }

  /**
   * Show advanced filters
   */
  async showAdvancedFilters(): Promise<void> {
    await test.step('Show advanced filters', async () => {
      const isVisible = await this.showAdvancedButton.isVisible();

      if (isVisible) {
        await this.showAdvancedButton.click();
      }
    });
  }

  /**
   * Hide advanced filters
   */
  async hideAdvancedFilters(): Promise<void> {
    await test.step('Hide advanced filters', async () => {
      const isVisible = await this.hideAdvancedButton.isVisible();

      if (isVisible) {
        await this.hideAdvancedButton.click();
      }
    });
  }

  /**
   * Set date logged range
   */
  async setDateLoggedRange(startDate: string, endDate: string): Promise<void> {
    await test.step(`Set Date Logged: ${startDate} - ${endDate}`, async () => {
      if (startDate) {
        await this.dateLoggedStartInput.fill(startDate);
      }
      if (endDate) {
        await this.dateLoggedEndInput.fill(endDate);
      }
    });
  }

  /**
   * Set expiry date range
   */
  async setExpiryDateRange(startDate: string, endDate: string): Promise<void> {
    await test.step(`Set Expiry Date: ${startDate} - ${endDate}`, async () => {
      if (startDate) {
        await this.expiryDateStartInput.fill(startDate);
      }
      if (endDate) {
        await this.expiryDateEndInput.fill(endDate);
      }
    });
  }

  /**
   * Apply filters by clicking search
   */
  async applyFilters(): Promise<void> {
    await test.step('Apply filters', async () => {
      await this.searchButton.click();
      await this.waitForTableLoad();
    });
  }

  // ========================
  // Tab Navigation
  // ========================

  /**
   * Switch to a specific tab
   */
  async switchToTab(tab: QuoteTab): Promise<void> {
    await test.step(`Switch to ${tab} tab`, async () => {
      const tabMap: Record<QuoteTab, Locator> = {
        'All': this.allTab,
        'Outstanding': this.outstandingTab,
        'Accepted': this.acceptedTab,
        'Rejected': this.rejectedTab,
        'Expired': this.expiredTab,
      };

      await tabMap[tab].click();
      await this.waitForTableLoad();
    });
  }

  /**
   * Get count from tab
   */
  async getTabCount(tab: QuoteTab): Promise<number> {
    return await test.step(`Get ${tab} tab count`, async () => {
      const tabMap: Record<QuoteTab, Locator> = {
        'All': this.allTab,
        'Outstanding': this.outstandingTab,
        'Accepted': this.acceptedTab,
        'Rejected': this.rejectedTab,
        'Expired': this.expiredTab,
      };
      const text = await tabMap[tab].textContent() || '';
      const match = text.match(/\((\d+)\)/);

      return match ? parseInt(match[1]) : 0;
    });
  }

  // ========================
  // Table Operations
  // ========================

  /**
   * Wait for table to finish loading
   */
  async waitForTableLoad(): Promise<void> {
    await test.step('Wait for table load', async () => {
      await this.loadingIndicator.waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {});
      await this.page.waitForTimeout(500);
    });
  }

  /**
   * Get total number of visible rows
   */
  async getRowCount(): Promise<number> {
    return await test.step('Get row count', async () => {
      return await this.tableRows.count();
    });
  }

  /**
   * Click on a quote row by quote number
   */
  async clickQuoteByQuoteNo(quoteNo: string): Promise<void> {
    await test.step(`Click quote: ${quoteNo}`, async () => {
      const row = this.tableBody.locator(`tr:has-text("${quoteNo}")`);

      await row.click();
    });
  }

  /**
   * Click on a quote row by customer name
   */
  async clickQuoteByCustomerName(customerName: string): Promise<void> {
    await test.step(`Click quote by customer: ${customerName}`, async () => {
      const row = this.tableBody.locator(`tr:has-text("${customerName}")`);
      
      await row.click();
    });
  }

  /**
   * Click on a quote row by site name
   */
  async clickQuoteBySiteName(siteName: string): Promise<void> {
    await test.step(`Click quote by site: ${siteName}`, async () => {
      const row = this.tableBody.locator(`tr:has-text("${siteName}")`);

      await row.click();
    });
  }

  /**
   * Click on a quote row by description
   */
  async clickQuoteByDescription(description: string): Promise<void> {
    await test.step(`Click quote by description: ${description}`, async () => {
      const row = this.tableBody.locator(`tr:has-text("${description}")`);

      await row.click();
    });
  }

  /**
   * Click on a quote row by status
   */
  async clickQuoteByStatus(status: string): Promise<void> {
    await test.step(`Click quote by status: ${status}`, async () => {
      const row = this.tableBody.locator(`tr:has-text("${status}")`).first();

      await row.click();
    });
  }

  /**
   * Click on a row by index (0-based)
   */
  async clickRowByIndex(index: number): Promise<void> {
    await test.step(`Click row at index: ${index}`, async () => {
      await this.tableRows.nth(index).click();
    });
  }

  /**
   * Get all visible quote items
   */
  async getAllVisibleItems(): Promise<QuoteListItem[]> {
    return await test.step('Get all visible items', async () => {
      const items: QuoteListItem[] = [];
      const count = await this.tableRows.count();

      for (let i = 0; i < count; i++) {
        const row = this.tableRows.nth(i);
        const cells = row.locator('td');
        const quoteNo = await cells.nth(0).textContent() || '';

        items.push({ quoteNo: quoteNo.trim() });
      }
      return items;
    });
  }

  // ========================
  // Sorting
  // ========================

  /**
   * Sort by column
   */
  async sortByColumn(column: QuoteSortableColumn): Promise<void> {
    await test.step(`Sort by ${column}`, async () => {
      const columnMap: Record<QuoteSortableColumn, Locator> = {
        'Quote No.': this.quoteNoColumnHeader,
        'Customer Name': this.customerNameColumnHeader,
        'Site Name': this.siteNameColumnHeader,
        'Priority': this.priorityColumnHeader,
        'Date Logged': this.dateLoggedColumnHeader,
        'Expiry Date': this.expiryDateColumnHeader,
        'Quote Owner': this.quoteOwnerColumnHeader,
        'Quote Value': this.quoteValueColumnHeader,
        'Chance of Sale': this.page.getByRole('button', { name: 'Chance of Sale' }),
      };

      await columnMap[column].click();
      await this.waitForTableLoad();
    });
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
   * Set results per page
   */
  async setResultsPerPage(count: QuoteResultsPerPage): Promise<void> {
    await test.step(`Set ${count} results per page`, async () => {
      await this.resultsPerPageDropdown.selectOption(count.toString());
      await this.waitForTableLoad();
    });
  }

  // ========================
  // Detail Sidebar
  // ========================

  /**
   * View full quote details from sidebar
   */
  async viewFullQuoteDetails(): Promise<void> {
    await test.step('View full quote details', async () => {
      await this.viewFullQuoteDetailsButton.click();
    });
  }

  // ========================
  // Export/Import
  // ========================

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

  /**
   * Click Print button
   */
  async clickPrint(): Promise<void> {
    await test.step('Click Print', async () => {
      await this.printButton.click();
    });
  }

  // ========================
  // Quote Rejection Actions
  // ========================

  /**
   * Click Reject button for selected quote
   */
  async clickRejectButton(): Promise<void> {
    await test.step('Click Reject button', async () => {
      const rejectButton = this.page.getByRole('button', { name: /reject/i });
      await rejectButton.click();
    });
  }

  /**
   * Select rejection reason from dropdown
   */
  async selectRejectionReason(reason: string): Promise<void> {
    await test.step(`Select rejection reason: ${reason}`, async () => {
      const reasonDropdown = this.page.locator('select[name*="reason"], [id*="reason"] select, .reason-dropdown select').first();
      await reasonDropdown.selectOption(reason);
    });
  }

  /**
   * Fill rejection reason text
   */
  async fillRejectionReason(rejectionText: string): Promise<void> {
    await test.step(`Fill rejection reason: ${rejectionText}`, async () => {
      const rejectionInput = this.page.locator('textarea[name*="reason"], input[name*="reason"], [id*="rejection"] textarea, [id*="rejection"] input').first();
      await rejectionInput.fill(rejectionText);
    });
  }

  /**
   * Save rejection
   */
  async saveRejection(): Promise<void> {
    await test.step('Save rejection', async () => {
      const saveButton = this.page.getByRole('button', { name: /save/i });
      await saveButton.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  /**
   * Get quote status text
   */
  async getQuoteStatusText(): Promise<string> {
    return await test.step('Get quote status text', async () => {
      const statusElement = this.page.locator('.status-text, .quote-status, [class*="status"], .badge').first();
      return await statusElement.textContent() || '';
    });
  }

  /**
   * Check if Revert button is visible
   */
  async isRevertButtonVisible(): Promise<boolean> {
    return await test.step('Check if Revert button is visible', async () => {
      const revertButton = this.page.getByRole('button', { name: /revert/i });
      return await revertButton.isVisible();
    });
  }
}
