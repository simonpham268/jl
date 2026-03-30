import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Customer list item interface (row data)
 */
export interface CustomerListItem {
  name: string;
  accountManager?: string;
  accountNumber?: string;
  address?: string;
  postcode?: string;
  contactName?: string;
  telephone?: string;
  email?: string;
}

/**
 * Search/filter options
 */
export interface CustomerSearchOptions {
  query?: string; // Free text search
  tags?: string[]; // Filter by tags
}

/**
 * Customer tabs
 */
export type CustomerTab = 'Active' | 'Suspended' | 'All';

/**
 * Table columns that can be sorted
 */
export type SortableColumn = 'Name' | 'Account Number' | 'Address' | 'Postcode';

/**
 * Results per page options
 */
export type ResultsPerPage = 5 | 10 | 20 | 30 | 50;

/**
 * AllCustomersPage - Page Object for All Customers list page
 * URL: /Customer
 */
export class AllCustomersPage extends BasePage {
  // ========================
  // Locators - Header/Actions
  // ========================
  readonly pageTitle: Locator;
  readonly addCustomerButton: Locator;
  readonly printButton: Locator;
  readonly importButton: Locator;
  readonly exportButton: Locator;

  // ========================
  // Locators - Search/Filter
  // ========================
  readonly hideFilterButton: Locator;
  readonly searchInput: Locator;
  readonly showAdvancedButton: Locator;
  readonly hideAdvancedButton: Locator;
  readonly tagsDropdown: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // ========================
  // Locators - Tabs
  // ========================
  readonly activeTab: Locator;
  readonly suspendedTab: Locator;
  readonly allTab: Locator;

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
  readonly nameColumnHeader: Locator;
  readonly accountNumberColumnHeader: Locator;
  readonly addressColumnHeader: Locator;
  readonly postcodeColumnHeader: Locator;

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
  // Locators - Customer Detail Sidebar
  // ========================
  readonly customerDetailSidebar: Locator;
  readonly viewFullDetailsButton: Locator;

  constructor(page: Page) {
    super(page);

    // Header/Actions
    this.pageTitle = page.getByRole('heading', { name: 'Customers' });
    this.addCustomerButton = page.getByRole('link', { name: 'Add Customer' }).first();
    this.printButton = page.getByText('Print');
    this.importButton = page.getByText('Import');
    this.exportButton = page.getByText('Export');

    // Search/Filter
    this.hideFilterButton = page.getByRole('button', { name: /Hide Filter|Show Filter/i });
    this.searchInput = page.getByPlaceholder('Name / Address / Contact Details / Reference / Account Number / Account Manager');
    this.showAdvancedButton = page.getByRole('button', { name: 'Show Advanced' });
    this.hideAdvancedButton = page.getByRole('button', { name: 'Hide Advanced' });
    this.tagsDropdown = page.locator('text=Tag(s)').locator('..').locator('[class*="multiselect"], [role="listbox"]');
    this.resetFilterButton = page.getByRole('button', { name: 'Reset Filter' });
    this.searchButton = page.getByRole('button', { name: 'Search' });

    // Tabs
    this.activeTab = page.getByRole('tab', { name: /Active/ });
    this.suspendedTab = page.getByRole('tab', { name: /Suspended/ });
    this.allTab = page.getByRole('tab', { name: /^All/ });

    // Table
    this.table = page.locator('table').first();
    this.tableHeader = this.table.locator('thead, [role="rowgroup"]').first();
    this.tableBody = this.table.locator('tbody, [role="rowgroup"]').last();
    this.tableRows = this.tableBody.locator('tr, [role="row"]');
    this.loadingIndicator = page.getByText('Loading Data... Please wait');

    // Column Headers (sortable)
    this.nameColumnHeader = page.getByRole('button', { name: 'Name' });
    this.accountNumberColumnHeader = page.getByRole('button', { name: 'Account Number' });
    this.addressColumnHeader = page.getByRole('button', { name: 'Address' });
    this.postcodeColumnHeader = page.getByRole('button', { name: 'Postcode' });

    // Pagination
    this.pagination = page.getByRole('navigation', { name: 'Page navigation' });
    this.firstPageButton = this.pagination.locator('text="««"');
    this.previousPageButton = this.pagination.locator('text="«"');
    this.nextPageButton = this.pagination.locator('text="»"');
    this.lastPageButton = this.pagination.locator('text="»»"');
    this.resultsPerPageDropdown = page.locator('select, [role="combobox"]').filter({ hasText: /Results per page/ });

    // Customer Detail Sidebar
    this.customerDetailSidebar = page.locator('text=Customer Detail').locator('..');
    this.viewFullDetailsButton = page.getByRole('button', { name: 'View Full Customer Details' });
  }

  // ========================
  // Navigation
  // ========================

  /**
   * Navigate to All Customers page
   */
  async navigateToAllCustomers(): Promise<void> {
    await test.step('Navigate to All Customers page', async () => {
      await this.page.goto('/Customer');
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
   * Search customers by text
   * @param query - Search text (name, address, contact, reference, account number, account manager)
   */
  async search(query: string): Promise<void> {
    await test.step(`Search customers: ${query}`, async () => {
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
   * Filter by tags
   * @param tags - Array of tag names to select
   */
  async filterByTags(tags: string[]): Promise<void> {
    await test.step(`Filter by tags: ${tags.join(', ')}`, async () => {
      await this.showAdvancedFilters();
      await this.tagsDropdown.click();
      for (const tag of tags) {
        await this.page.getByRole('option', { name: tag }).click();
      }
      await this.page.keyboard.press('Escape');
      await this.searchButton.click();
      await this.waitForTableLoad();
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
   * Search with options (combined search and filter)
   */
  async searchWithOptions(options: CustomerSearchOptions): Promise<void> {
    await test.step('Search with options', async () => {
      if (options.query) {
        await this.searchInput.fill(options.query);
      }
      if (options.tags?.length) {
        await this.filterByTags(options.tags);
      } else {
        await this.searchButton.click();
        await this.waitForTableLoad();
      }
    });
  }

  // ========================
  // Tabs
  // ========================

  /**
   * Switch to a specific tab
   * @param tab - Tab name (Active, Suspended, All)
   */
  async switchToTab(tab: CustomerTab): Promise<void> {
    await test.step(`Switch to ${tab} tab`, async () => {
      switch (tab) {
      case 'Active':
        await this.activeTab.click();
        break;
      case 'Suspended':
        await this.suspendedTab.click();
        break;
      case 'All':
        await this.allTab.click();
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
  async getTabCount(tab: CustomerTab): Promise<number> {
    const tabElement = tab === 'Active' ? this.activeTab
      : tab === 'Suspended' ? this.suspendedTab
        : this.allTab;

    const text = await tabElement.textContent();
    const match = text?.match(/\((\d+)\)/);

    return match ? parseInt(match[1], 10) : 0;
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
   * Click on a customer row by name
   * @param customerName - Customer name to click
   */
  async clickCustomerByName(customerName: string): Promise<void> {
    await test.step(`Click customer: ${customerName}`, async () => {
      await this.table.getByRole('link', { name: customerName }).click();
    });
  }

  /**
   * Click on a row by index (0-based)
   * @param index - Row index
   */
  async clickRowByIndex(index: number): Promise<void> {
    await test.step(`Click row ${index + 1}`, async () => {
      await this.tableRows.nth(index).click();
    });
  }

  /**
   * Get customer data from a row
   * @param index - Row index (0-based)
   */
  async getCustomerFromRow(index: number): Promise<CustomerListItem> {
    const row = this.tableRows.nth(index);
    const cells = row.locator('td, [role="cell"]');

    return {
      name: await cells.nth(0).textContent() || '',
      accountManager: await cells.nth(1).textContent() || undefined,
      accountNumber: await cells.nth(2).textContent() || undefined,
      address: await cells.nth(3).textContent() || undefined,
      postcode: await cells.nth(4).textContent() || undefined,
      contactName: await cells.nth(5).textContent() || undefined,
      telephone: await cells.nth(6).textContent() || undefined,
      email: await cells.nth(7).textContent() || undefined,
    };
  }

  /**
   * Get all visible customers
   */
  async getAllVisibleCustomers(): Promise<CustomerListItem[]> {
    const count = await this.getRowCount();
    const customers: CustomerListItem[] = [];

    for (let i = 0; i < count; i++) {
      customers.push(await this.getCustomerFromRow(i));
    }
    return customers;
  }

  /**
   * Sort table by column
   * @param column - Column to sort by
   */
  async sortByColumn(column: SortableColumn): Promise<void> {
    await test.step(`Sort by ${column}`, async () => {
      switch (column) {
      case 'Name':
        await this.nameColumnHeader.click();
        break;
      case 'Account Number':
        await this.accountNumberColumnHeader.click();
        break;
      case 'Address':
        await this.addressColumnHeader.click();
        break;
      case 'Postcode':
        await this.postcodeColumnHeader.click();
        break;
      }
      await this.waitForTableLoad();
    });
  }

  /**
   * Check if customer exists in the table
   * @param customerName - Customer name to find
   */
  async customerExists(customerName: string): Promise<boolean> {
    const link = this.table.getByRole('link', { name: customerName });

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
   * @param count - Number of results per page (5, 10, 20, 30, 50)
   */
  async setResultsPerPage(count: ResultsPerPage): Promise<void> {
    await test.step(`Set ${count} results per page`, async () => {
      await this.resultsPerPageDropdown.selectOption({ label: `${count} Results per page` });
      await this.waitForTableLoad();
    });
  }

  // ========================
  // Header Actions
  // ========================

  /**
   * Click Add Customer button (navigates to Add Customer page)
   */
  async clickAddCustomer(): Promise<void> {
    await test.step('Click Add Customer', async () => {
      await this.addCustomerButton.click();
      await this.page.waitForURL(/\/Customer\/Create/);
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
   * Click Import button
   */
  async clickImport(): Promise<void> {
    await test.step('Click Import', async () => {
      await this.importButton.click();
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

  // ========================
  // Detail Sidebar
  // ========================

  /**
   * View full customer details (from sidebar)
   */
  async viewFullCustomerDetails(): Promise<void> {
    await test.step('View full customer details', async () => {
      await this.viewFullDetailsButton.click();
      await this.page.waitForURL(/\/Customer\/Detail\/\d+/);
    });
  }

  /**
   * Check if customer detail sidebar is visible
   */
  async isDetailSidebarVisible(): Promise<boolean> {
    return await this.customerDetailSidebar.isVisible();
  }

  // ========================
  // Assertions
  // ========================

  /**
   * Assert page is loaded correctly
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert All Customers page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
      await expect(this.table).toBeVisible();
    });
  }

  /**
   * Assert search results contain expected customer
   * @param customerName - Expected customer name in results
   */
  async assertSearchResultsContain(customerName: string): Promise<void> {
    await test.step(`Assert results contain: ${customerName}`, async () => {
      const link = this.table.getByRole('link', { name: customerName });

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
