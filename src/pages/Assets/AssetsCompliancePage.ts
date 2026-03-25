import { Locator, Page } from "@playwright/test";
import { test, expect } from '@playwright/test';
import { BasePage } from "../BasePage";

/**
 * Compliance list item interface (row data)
 */
export interface ComplianceListItem {
  customer?: string;
  site?: string;
  jobNumber?: string;
  assetDescription?: string;
  task?: string;
  assetNumber?: string;
  serialNumber?: string;
  assetReferenceNumber?: string;
  status?: string;
}

/**
 * Search/filter options
 */
export interface ComplianceSearchOptions {
  query?: string;           // Free text search
  listBy?: string;          // List By filter
  dateLoggedStart?: string; // Date Logged start
  dateLoggedEnd?: string;   // Date Logged end
  preferredDateStart?: string;  // Preferred Appointment Date start
  preferredDateEnd?: string;    // Preferred Appointment Date end
  jobCategory?: string[];   // Job Category filter
  jobType?: string[];       // Job Type filter
  showMandatory?: boolean;  // Show Mandatory checkbox
}

/**
 * Compliance tabs
 */
export type ComplianceTab = 'All' | 'Open' | 'Completed';

/**
 * AssetsCompliancePage - Page Object for Assets & Tasks Compliance page
 * URL: /AssetTaskCompliance
 */
export class AssetsCompliancePage extends BasePage {
  // ========================
  // Locators - Header/Actions
  // ========================
  readonly pageTitle: Locator;
  readonly printButton: Locator;
  readonly exportButton: Locator;

  // ========================
  // Locators - Search/Filter
  // ========================
  readonly hideFilterButton: Locator;
  readonly searchInput: Locator;
  readonly listByDropdown: Locator;
  readonly dateLoggedStartInput: Locator;
  readonly dateLoggedEndInput: Locator;
  readonly preferredDateStartInput: Locator;
  readonly preferredDateEndInput: Locator;
  readonly jobCategoryDropdown: Locator;
  readonly jobTypeDropdown: Locator;
  readonly showMandatoryCheckbox: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // ========================
  // Locators - Tabs
  // ========================
  readonly allTab: Locator;
  readonly openTab: Locator;
  readonly completedTab: Locator;

  // ========================
  // Locators - Table
  // ========================
  readonly table: Locator;
  readonly tableRows: Locator;
  readonly loadingIndicator: Locator;

  constructor(page: Page) {
    super(page);

    // Header/Actions
    this.pageTitle = page.getByRole('heading', { name: 'Assets & Tasks Compliance' });
    this.printButton = page.getByText('Print');
    this.exportButton = page.getByRole('link', { name: 'Export' });

    // Search/Filter
    this.hideFilterButton = page.getByRole('button', { name: /Hide Filter|Show Filter/i });
    this.searchInput = page.getByPlaceholder('Customer / Site / Job Number / Assets Description / Task / Asset Number / Serial Number / Asset Reference Number');
    this.listByDropdown = page.locator('text=List By').locator('..').locator('[role="combobox"]');
    this.dateLoggedStartInput = page.locator('text=Date Logged *').locator('..').locator('input[placeholder="Start Date"]');
    this.dateLoggedEndInput = page.locator('text=Date Logged *').locator('..').locator('input[placeholder="End Date"]');
    this.preferredDateStartInput = page.locator('text=Preferred Appointment Date').locator('..').locator('input[placeholder="Start Date"]');
    this.preferredDateEndInput = page.locator('text=Preferred Appointment Date').locator('..').locator('input[placeholder="End Date"]');
    this.jobCategoryDropdown = page.locator('text=Job Category').locator('..').locator('[class*="multiselect"], [role="listbox"]');
    this.jobTypeDropdown = page.locator('text=Job Type').locator('..').locator('[class*="multiselect"], [role="listbox"]');
    this.showMandatoryCheckbox = page.locator('text=Show Mandatory');
    this.resetFilterButton = page.getByRole('button', { name: 'Reset Filter' });
    this.searchButton = page.getByRole('button', { name: 'Search' });

    // Tabs
    this.allTab = page.getByRole('tab', { name: /^All/ });
    this.openTab = page.getByRole('tab', { name: /Open/ });
    this.completedTab = page.getByRole('tab', { name: /Completed/ });

    // Table
    this.table = page.locator('table').first();
    this.tableRows = this.table.locator('tbody tr, [role="row"]');
    this.loadingIndicator = page.getByText('Loading Data... Please wait');
  }

  // ========================
  // Navigation
  // ========================

  /**
   * Navigate to Assets & Tasks Compliance page
   */
  async navigateToCompliance(): Promise<void> {
    await test.step('Navigate to Assets & Tasks Compliance page', async () => {
      await this.page.goto('/AssetTaskCompliance');
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
   * Search by text
   * @param query - Search text
   */
  async search(query: string): Promise<void> {
    await test.step(`Search compliance: ${query}`, async () => {
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
   * Select List By option
   * @param option - List By option (e.g., 'Assets & Tasks', 'Assets Only', 'Tasks Only')
   */
  async selectListBy(option: string): Promise<void> {
    await test.step(`Select List By: ${option}`, async () => {
      await this.listByDropdown.click();
      await this.page.getByRole('option', { name: option }).click();
    });
  }

  /**
   * Set Date Logged range
   * @param startDate - Start date (DD/MM/YYYY)
   * @param endDate - End date (DD/MM/YYYY)
   */
  async setDateLoggedRange(startDate: string, endDate: string): Promise<void> {
    await test.step(`Set Date Logged: ${startDate} - ${endDate}`, async () => {
      await this.dateLoggedStartInput.fill(startDate);
      await this.dateLoggedEndInput.fill(endDate);
    });
  }

  /**
   * Set Preferred Appointment Date range
   * @param startDate - Start date (DD/MM/YYYY)
   * @param endDate - End date (DD/MM/YYYY)
   */
  async setPreferredDateRange(startDate: string, endDate: string): Promise<void> {
    await test.step(`Set Preferred Date: ${startDate} - ${endDate}`, async () => {
      await this.preferredDateStartInput.fill(startDate);
      await this.preferredDateEndInput.fill(endDate);
    });
  }

  /**
   * Filter by Job Category
   * @param categories - Array of job category names to select
   */
  async filterByJobCategory(categories: string[]): Promise<void> {
    await test.step(`Filter by Job Category: ${categories.join(', ')}`, async () => {
      await this.jobCategoryDropdown.click();
      for (const category of categories) {
        await this.page.getByRole('option', { name: category }).click();
      }
      await this.page.keyboard.press('Escape');
    });
  }

  /**
   * Filter by Job Type
   * @param types - Array of job type names to select
   */
  async filterByJobType(types: string[]): Promise<void> {
    await test.step(`Filter by Job Type: ${types.join(', ')}`, async () => {
      await this.jobTypeDropdown.click();
      for (const type of types) {
        await this.page.getByRole('option', { name: type }).click();
      }
      await this.page.keyboard.press('Escape');
    });
  }

  /**
   * Toggle Show Mandatory checkbox
   * @param enable - true to check, false to uncheck
   */
  async setShowMandatory(enable: boolean): Promise<void> {
    await test.step(`Set Show Mandatory: ${enable}`, async () => {
      if (enable) {
        await this.showMandatoryCheckbox.check();
      } else {
        await this.showMandatoryCheckbox.uncheck();
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
   * Apply search and filters
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
  async searchWithOptions(options: ComplianceSearchOptions): Promise<void> {
    await test.step('Search with options', async () => {
      if (options.query) {
        await this.searchInput.fill(options.query);
      }
      if (options.listBy) {
        await this.selectListBy(options.listBy);
      }
      if (options.dateLoggedStart && options.dateLoggedEnd) {
        await this.setDateLoggedRange(options.dateLoggedStart, options.dateLoggedEnd);
      }
      if (options.preferredDateStart && options.preferredDateEnd) {
        await this.setPreferredDateRange(options.preferredDateStart, options.preferredDateEnd);
      }
      if (options.jobCategory?.length) {
        await this.filterByJobCategory(options.jobCategory);
      }
      if (options.jobType?.length) {
        await this.filterByJobType(options.jobType);
      }
      if (options.showMandatory !== undefined) {
        await this.setShowMandatory(options.showMandatory);
      }
      await this.applyFilters();
    });
  }

  // ========================
  // Tabs
  // ========================

  /**
   * Switch to a specific tab
   * @param tab - Tab name (All, Open, Completed)
   */
  async switchToTab(tab: ComplianceTab): Promise<void> {
    await test.step(`Switch to ${tab} tab`, async () => {
      switch (tab) {
        case 'All':
          await this.allTab.click();
          break;
        case 'Open':
          await this.openTab.click();
          break;
        case 'Completed':
          await this.completedTab.click();
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
  async getTabCount(tab: ComplianceTab): Promise<number> {
    const tabElement = tab === 'All' ? this.allTab 
      : tab === 'Open' ? this.openTab 
      : this.completedTab;
    
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
   * Click on a row by index (0-based)
   * @param index - Row index
   */
  async clickRowByIndex(index: number): Promise<void> {
    await test.step(`Click row ${index + 1}`, async () => {
      await this.tableRows.nth(index).click();
    });
  }

  /**
   * Get all visible items
   */
  async getAllVisibleItems(): Promise<ComplianceListItem[]> {
    const count = await this.getRowCount();
    const items: ComplianceListItem[] = [];
    for (let i = 0; i < count; i++) {
      const row = this.tableRows.nth(i);
      const cells = row.locator('td, [role="cell"]');
      items.push({
        customer: await cells.nth(0).textContent() || undefined,
        site: await cells.nth(1).textContent() || undefined,
        jobNumber: await cells.nth(2).textContent() || undefined,
        assetDescription: await cells.nth(3).textContent() || undefined,
        task: await cells.nth(4).textContent() || undefined,
        assetNumber: await cells.nth(5).textContent() || undefined,
        serialNumber: await cells.nth(6).textContent() || undefined,
        assetReferenceNumber: await cells.nth(7).textContent() || undefined,
        status: await cells.nth(8).textContent() || undefined,
      });
    }
    return items;
  }

  // ========================
  // Header Actions
  // ========================

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
  // Assertions
  // ========================

  /**
   * Assert page is loaded correctly
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Compliance page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
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
