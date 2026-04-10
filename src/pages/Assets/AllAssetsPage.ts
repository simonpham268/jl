import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Asset list item interface (row data)
 */
export interface AssetListItem {
  description: string;
  customerName?: string;
  siteName?: string;
  class?: string;
  location?: string;
  number?: string;
  serialNo?: string;
  systemId?: string;
  qrCode?: string;
  assetCondition?: string;
  installationDate?: string;
  warrantyExpiryDate?: string;
  labourWarrantyExpiryDate?: string;
  refrigerantType?: string;
  gwp?: string;
  totalCharge?: string;
  co2Eq?: string;
  ppmContract?: string;
}

/**
 * Search/filter options
 */
export interface AssetSearchOptions {
  query?: string; // Free text search
  gasType?: string[]; // Filter by gas type
  tags?: string[]; // Filter by tags
  assetConditions?: string[]; // Filter by asset conditions
}

/**
 * Asset tabs
 */
export type AssetTab = 'Active' | 'Suspended' | 'All' | 'Hire Asset' | 'Cross Asset';

/**
 * Table columns that can be sorted
 */
export type AssetSortableColumn = 'Description' | 'Customer Name' | 'Site Name' | 'Class' | 'Location' | 'Serial No' | 'System ID' | 'Installation Date' | 'Warranty Expiry Date' | 'Labour Warranty Expiry Date' | 'Total Charge (kg)';

/**
 * Results per page options
 */
export type AssetResultsPerPage = 5 | 10 | 20 | 30 | 50;

/**
 * View mode
 */
export type ViewMode = 'List' | 'Grid';

/**
 * AllAssetsPage - Page Object for All Assets list page
 * URL: /Asset
 */
export class AllAssetsPage extends BasePage {
  // ========================
  // Locators - Header/Actions
  // ========================
  readonly pageTitle: Locator;
  readonly listViewButton: Locator;
  readonly gridViewButton: Locator;
  readonly addAssetButton: Locator;
  readonly printButton: Locator;
  readonly exportButton: Locator;

  // ========================
  // Locators - Search/Filter
  // ========================
  readonly hideFilterButton: Locator;
  readonly searchInput: Locator;
  readonly showAdvancedButton: Locator;
  readonly hideAdvancedButton: Locator;
  readonly gasTypeDropdown: Locator;
  readonly tagsDropdown: Locator;
  readonly assetConditionsDropdown: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // ========================
  // Locators - Tabs
  // ========================
  readonly activeTab: Locator;
  readonly suspendedTab: Locator;
  readonly allTab: Locator;
  readonly hireAssetTab: Locator;
  readonly crossAssetTab: Locator;

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
  readonly descriptionColumnHeader: Locator;
  readonly customerNameColumnHeader: Locator;
  readonly siteNameColumnHeader: Locator;
  readonly classColumnHeader: Locator;
  readonly locationColumnHeader: Locator;
  readonly serialNoColumnHeader: Locator;
  readonly systemIdColumnHeader: Locator;
  readonly installationDateColumnHeader: Locator;
  readonly warrantyExpiryColumnHeader: Locator;
  readonly labourWarrantyColumnHeader: Locator;
  readonly totalChargeColumnHeader: Locator;

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
  // Locators - Asset Detail Sidebar
  // ========================
  readonly assetDetailSidebar: Locator;
  readonly viewFullDetailsButton: Locator;

  constructor(page: Page) {
    super(page);

    // Header/Actions
    this.pageTitle = page.getByRole('heading', { name: 'Assets' });
    this.listViewButton = page.getByRole('button', { name: 'List' });
    this.gridViewButton = page.getByRole('button', { name: 'Grid' });
    this.addAssetButton = page.getByRole('link', { name: 'Add Asset' }).first();
    this.printButton = page.getByText('Print');
    this.exportButton = page.getByRole('link', { name: 'Export' });

    // Search/Filter
    this.hideFilterButton = page.getByRole('button', { name: /Hide Filter|Show Filter/i });
    this.searchInput = page.getByPlaceholder('Description / Class / Location / Number / Serial No. / System ID / Reference / Make / Model / QR Code');
    this.showAdvancedButton = page.getByRole('button', { name: 'Show Advanced' });
    this.hideAdvancedButton = page.getByRole('button', { name: 'Hide Advanced' });
    this.gasTypeDropdown = page.locator('text=Gas Type').locator('..').locator('[class*="multiselect"], [role="listbox"]');
    this.tagsDropdown = page.locator('text=Tag(s)').locator('..').locator('[class*="multiselect"], [role="listbox"]');
    this.assetConditionsDropdown = page.locator('text=Asset Condition(s)').locator('..').locator('[class*="multiselect"], [role="listbox"]');
    this.resetFilterButton = page.getByRole('button', { name: 'Reset Filter' });
    this.searchButton = page.getByRole('button', { name: 'Search' });

    // Tabs
    this.activeTab = page.getByRole('tab', { name: /Active/ });
    this.suspendedTab = page.getByRole('tab', { name: /Suspended/ });
    this.allTab = page.getByRole('tab', { name: /^All/ });
    this.hireAssetTab = page.getByRole('tab', { name: /Hire Asset/ });
    this.crossAssetTab = page.getByRole('tab', { name: /Cross Asset/ });

    // Table
    this.table = page.locator('table').first();
    this.tableHeader = this.table.locator('thead, [role="rowgroup"]').first();
    this.tableBody = this.table.locator('tbody, [role="rowgroup"]').last();
    this.tableRows = this.tableBody.locator('tr, [role="row"]');
    this.loadingIndicator = page.getByText('Loading Data... Please wait');

    // Column Headers (sortable)
    this.descriptionColumnHeader = page.getByRole('button', { name: 'Description' });
    this.customerNameColumnHeader = page.getByRole('button', { name: 'Customer Name' });
    this.siteNameColumnHeader = page.getByRole('button', { name: 'Site Name' });
    this.classColumnHeader = page.getByRole('button', { name: 'Class' });
    this.locationColumnHeader = page.getByRole('button', { name: 'Location' });
    this.serialNoColumnHeader = page.getByRole('button', { name: 'Serial No' });
    this.systemIdColumnHeader = page.getByRole('button', { name: 'System ID' });
    this.installationDateColumnHeader = page.getByRole('button', { name: 'Installation Date' });
    this.warrantyExpiryColumnHeader = page.getByRole('button', { name: 'Warranty Expiry Date' });
    this.labourWarrantyColumnHeader = page.getByRole('button', { name: 'Labour Warranty Expiry Date' });
    this.totalChargeColumnHeader = page.getByRole('button', { name: 'Total Charge (kg)' });

    // Pagination
    this.pagination = page.getByRole('navigation', { name: 'Page navigation' });
    this.firstPageButton = this.pagination.locator('text="««"');
    this.previousPageButton = this.pagination.locator('text="«"');
    this.nextPageButton = this.pagination.locator('text="»"');
    this.lastPageButton = this.pagination.locator('text="»»"');
    this.resultsPerPageDropdown = page.locator('select, [role="combobox"]').filter({ hasText: /Results per page/ });

    // Asset Detail Sidebar
    this.assetDetailSidebar = page.locator('text=Asset Summary').locator('..');
    this.viewFullDetailsButton = page.getByRole('button', { name: 'View Full Asset Details' });
  }

  // ========================
  // Navigation
  // ========================

  /**
   * Navigate to All Assets page
   */
  async navigateToAllAssets(): Promise<void> {
    await test.step('Navigate to All Assets page', async () => {
      await this.page.goto('/Asset');
      await this.waitForTableLoad();
    });
  }

  /**
   * Wait for table data to finish loading
   */
  async waitForTableLoad(): Promise<void> {
    await test.step('Wait for table to load', async () => {
      await this.loadingIndicator.waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {});
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  // ========================
  // View Mode
  // ========================

  /**
   * Switch to list view
   */
  async switchToListView(): Promise<void> {
    await test.step('Switch to list view', async () => {
      await this.listViewButton.click();
      await this.waitForTableLoad();
    });
  }

  /**
   * Switch to grid view
   */
  async switchToGridView(): Promise<void> {
    await test.step('Switch to grid view', async () => {
      await this.gridViewButton.click();
      await this.waitForTableLoad();
    });
  }

  // ========================
  // Search & Filter
  // ========================

  /**
   * Search assets by text
   * @param query - Search text
   */
  async search(query: string): Promise<void> {
    await test.step(`Search assets: ${query}`, async () => {
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
   * Filter by gas type
   * @param gasTypes - Array of gas type names to select
   */
  async filterByGasType(gasTypes: string[]): Promise<void> {
    await test.step(`Filter by gas type: ${gasTypes.join(', ')}`, async () => {
      await this.showAdvancedFilters();
      await this.gasTypeDropdown.click();
      for (const gasType of gasTypes) {
        await this.page.getByRole('option', { name: gasType }).click();
      }
      await this.page.keyboard.press('Escape');
      await this.searchButton.click();
      await this.waitForTableLoad();
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
   * Filter by asset conditions
   * @param conditions - Array of condition names to select
   */
  async filterByAssetConditions(conditions: string[]): Promise<void> {
    await test.step(`Filter by asset conditions: ${conditions.join(', ')}`, async () => {
      await this.showAdvancedFilters();
      await this.assetConditionsDropdown.click();
      for (const condition of conditions) {
        await this.page.getByRole('option', { name: condition }).click();
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
  async searchWithOptions(options: AssetSearchOptions): Promise<void> {
    await test.step('Search with options', async () => {
      if (options.query) {
        await this.searchInput.fill(options.query);
      }
      if (options.gasType?.length) {
        await this.filterByGasType(options.gasType);
        return;
      }
      if (options.tags?.length) {
        await this.filterByTags(options.tags);
        return;
      }
      if (options.assetConditions?.length) {
        await this.filterByAssetConditions(options.assetConditions);
        return;
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
  async switchToTab(tab: AssetTab): Promise<void> {
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
      case 'Hire Asset':
        await this.hireAssetTab.click();
        break;
      case 'Cross Asset':
        await this.crossAssetTab.click();
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
  async getTabCount(tab: AssetTab): Promise<number> {
    const tabElement = tab === 'Active' ? this.activeTab
      : tab === 'Suspended' ? this.suspendedTab
        : tab === 'All' ? this.allTab
          : tab === 'Hire Asset' ? this.hireAssetTab
            : this.crossAssetTab;

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
   * Click on an asset row by description
   * @param description - Asset description to click
   */
  async clickAssetByDescription(description: string): Promise<void> {
    await test.step(`Click asset: ${description}`, async () => {
      await this.table.getByRole('link', { name: description }).first().click();
      await this.page.waitForURL(/\/Asset\/Detail\/\d+/);
    });
  }

  /**
   * Click on an asset row by customer name
   * @param customerName - Customer name to find and click
   */
  async clickAssetByCustomerName(customerName: string): Promise<void> {
    await test.step(`Click asset by customer: ${customerName}`, async () => {
      // Find the row containing the customer name, then click its description link
      const row = this.tableBody.locator('tr, [role="row"]').filter({ has: this.page.getByRole('link', { name: customerName }) });
      const descriptionLink = row.locator('td, [role="cell"]').first().getByRole('link');

      await descriptionLink.click();
      await this.page.waitForURL(/\/Asset\/Detail\/\d+/);
    });
  }

  /**
   * Click on an asset row by site name
   * @param siteName - Site name to find and click
   */
  async clickAssetBySiteName(siteName: string): Promise<void> {
    await test.step(`Click asset by site: ${siteName}`, async () => {
      // Find the row containing the site name (3rd cell), then click its description link
      const row = this.tableBody.locator('tr, [role="row"]').filter({
        has: this.page.locator('td, [role="cell"]').nth(2).getByRole('link', { name: siteName })
      });
      const descriptionLink = row.locator('td, [role="cell"]').first().getByRole('link');

      await descriptionLink.click();
      await this.page.waitForURL(/\/Asset\/Detail\/\d+/);
    });
  }

  /**
   * Click on an asset row by asset number
   * @param number - Asset number to find and click
   */
  async clickAssetByNumber(number: string): Promise<void> {
    await test.step(`Click asset by number: ${number}`, async () => {
      // Find the row containing the asset number (6th cell), then click its description link
      const row = this.tableBody.locator('tr, [role="row"]').filter({ hasText: number });
      const descriptionLink = row.locator('td, [role="cell"]').first().getByRole('link');

      await descriptionLink.click();
      await this.page.waitForURL(/\/Asset\/Detail\/\d+/);
    });
  }

  /**
   * Click on an asset row by serial number
   * @param serialNumber - Serial number to find and click
   */
  async clickAssetBySerialNumber(serialNumber: string): Promise<void> {
    await test.step(`Click asset by serial number: ${serialNumber}`, async () => {
      const row = this.tableBody.locator('tr, [role="row"]').filter({ hasText: serialNumber });
      const descriptionLink = row.locator('td, [role="cell"]').first().getByRole('link');

      await descriptionLink.click();
      await this.page.waitForURL(/\/Asset\/Detail\/\d+/);
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
   * Get asset data from a row
   * @param index - Row index (0-based)
   */
  async getAssetFromRow(index: number): Promise<AssetListItem> {
    const row = this.tableRows.nth(index);
    const cells = row.locator('td, [role="cell"]');

    return {
      description: await cells.nth(0).textContent() || '',
      customerName: await cells.nth(1).textContent() || undefined,
      siteName: await cells.nth(2).textContent() || undefined,
      class: await cells.nth(3).textContent() || undefined,
      location: await cells.nth(4).textContent() || undefined,
      number: await cells.nth(5).textContent() || undefined,
      serialNo: await cells.nth(6).textContent() || undefined,
      systemId: await cells.nth(7).textContent() || undefined,
      qrCode: await cells.nth(8).textContent() || undefined,
      assetCondition: await cells.nth(9).textContent() || undefined,
      installationDate: await cells.nth(10).textContent() || undefined,
      warrantyExpiryDate: await cells.nth(11).textContent() || undefined,
      labourWarrantyExpiryDate: await cells.nth(12).textContent() || undefined,
      refrigerantType: await cells.nth(13).textContent() || undefined,
      gwp: await cells.nth(14).textContent() || undefined,
      totalCharge: await cells.nth(15).textContent() || undefined,
      co2Eq: await cells.nth(16).textContent() || undefined,
      ppmContract: await cells.nth(17).textContent() || undefined,
    };
  }

  /**
   * Get all visible assets
   */
  async getAllVisibleAssets(): Promise<AssetListItem[]> {
    const count = await this.getRowCount();
    const assets: AssetListItem[] = [];

    for (let i = 0; i < count; i++) {
      assets.push(await this.getAssetFromRow(i));
    }
    return assets;
  }

  /**
   * Sort table by column
   * @param column - Column to sort by
   */
  async sortByColumn(column: AssetSortableColumn): Promise<void> {
    await test.step(`Sort by ${column}`, async () => {
      switch (column) {
      case 'Description':
        await this.descriptionColumnHeader.click();
        break;
      case 'Customer Name':
        await this.customerNameColumnHeader.click();
        break;
      case 'Site Name':
        await this.siteNameColumnHeader.click();
        break;
      case 'Class':
        await this.classColumnHeader.click();
        break;
      case 'Location':
        await this.locationColumnHeader.click();
        break;
      case 'Serial No':
        await this.serialNoColumnHeader.click();
        break;
      case 'System ID':
        await this.systemIdColumnHeader.click();
        break;
      case 'Installation Date':
        await this.installationDateColumnHeader.click();
        break;
      case 'Warranty Expiry Date':
        await this.warrantyExpiryColumnHeader.click();
        break;
      case 'Labour Warranty Expiry Date':
        await this.labourWarrantyColumnHeader.click();
        break;
      case 'Total Charge (kg)':
        await this.totalChargeColumnHeader.click();
        break;
      }
      await this.waitForTableLoad();
    });
  }

  /**
   * Check if asset exists in the table
   * @param description - Asset description to find
   */
  async assetExists(description: string): Promise<boolean> {
    const link = this.table.getByRole('link', { name: description });

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
  async setResultsPerPage(count: AssetResultsPerPage): Promise<void> {
    await test.step(`Set ${count} results per page`, async () => {
      await this.resultsPerPageDropdown.selectOption({ label: `${count} Results per page` });
      await this.waitForTableLoad();
    });
  }

  // ========================
  // Header Actions
  // ========================

  /**
   * Click Add Asset button (navigates to Add Asset page)
   */
  async clickAddAsset(): Promise<void> {
    await test.step('Click Add Asset', async () => {
      await this.addAssetButton.click();
      await this.page.waitForURL(/\/Asset\/Create/);
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

  // ========================
  // Detail Sidebar
  // ========================

  /**
   * View full asset details (from sidebar)
   */
  async viewFullAssetDetails(): Promise<void> {
    await test.step('View full asset details', async () => {
      await this.viewFullDetailsButton.click();
      await this.page.waitForURL(/\/Asset\/Detail\/\d+/);
    });
  }

  /**
   * Check if asset detail sidebar is visible
   */
  async isDetailSidebarVisible(): Promise<boolean> {
    return await this.assetDetailSidebar.isVisible();
  }

  // ========================
  // Assertions
  // ========================

  /**
   * Assert page is loaded correctly
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert All Assets page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
      await expect(this.table).toBeVisible();
    });
  }

  /**
   * Assert search results contain expected asset
   * @param description - Expected asset description in results
   */
  async assertSearchResultsContain(description: string): Promise<void> {
    await test.step(`Assert results contain: ${description}`, async () => {
      const link = this.table.getByRole('link', { name: description });

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
