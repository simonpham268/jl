import { Locator, Page } from "@playwright/test";
import { test, expect } from '@playwright/test';
import { BasePage } from "../BasePage";

/**
 * Contract Purchase Order list item interface
 */
export interface ContractPOListItem {
  poNumber: string;
  subcontractorName?: string;
  accountNumber?: string;
  dateRaised?: string;
  status?: string;
}

/**
 * Contract Purchase Order search options
 */
export interface ContractPOSearchOptions {
  query?: string;
  dateRaisedStart?: string;
  dateRaisedEnd?: string;
  subcontractor?: string[];
  status?: string[];
}

/**
 * Contract Purchase Order tabs
 */
export type ContractPOTab = 'All' | 'Fully Completed' | 'Not Completed';

/**
 * ContractPurchaseOrdersPage - Page Object for Contract Purchase Orders page
 * URL: /ContractPurchaseOrder
 */
export class ContractPurchaseOrdersPage extends BasePage {
  // ========================
  // Locators - Header/Actions
  // ========================
  readonly pageTitle: Locator;
  readonly createContractPOButton: Locator;
  readonly exportButton: Locator;

  // ========================
  // Locators - Filter
  // ========================
  readonly hideFilterButton: Locator;
  readonly searchInput: Locator;
  readonly dateRaisedStartInput: Locator;
  readonly dateRaisedEndInput: Locator;
  readonly showAdvancedButton: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // ========================
  // Locators - Tabs
  // ========================
  readonly allTab: Locator;
  readonly fullyCompletedTab: Locator;
  readonly notCompletedTab: Locator;

  // ========================
  // Locators - Table
  // ========================
  readonly table: Locator;
  readonly tableRows: Locator;
  readonly loadingIndicator: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Header/Actions
    this.pageTitle = page.getByRole('heading', { name: 'Contract Purchase Orders' });
    this.createContractPOButton = page.locator('text=Create Contract PO');
    this.exportButton = page.getByRole('link', { name: /Export/ });

    // Filter
    this.hideFilterButton = page.getByRole('button', { name: /Hide Filter/ });
    this.searchInput = page.getByPlaceholder('PO Number / Subcontractor Name / Account Number');
    this.dateRaisedStartInput = page.locator('text=Date Raised').locator('..').getByPlaceholder('Start Date');
    this.dateRaisedEndInput = page.getByPlaceholder('End Date').first();
    this.showAdvancedButton = page.getByRole('button', { name: 'Show Advanced' });
    this.resetFilterButton = page.getByRole('button', { name: /Reset Filter/ });
    this.searchButton = page.getByRole('button', { name: /Search/ }).last();

    // Tabs
    this.allTab = page.getByRole('tab', { name: /All/ });
    this.fullyCompletedTab = page.getByRole('tab', { name: /Fully Completed/ });
    this.notCompletedTab = page.getByRole('tab', { name: /Not Completed/ });

    // Table
    this.table = page.locator('table').first();
    this.tableRows = page.locator('table tbody tr');
    this.loadingIndicator = page.locator('text=Loading');
    this.noResultsMessage = page.locator('text=No matching results found');
  }

  // ========================
  // Navigation Methods
  // ========================

  /**
   * Navigate to Contract Purchase Orders page
   */
  async navigateToContractPurchaseOrders(): Promise<void> {
    await test.step('Navigate to Contract Purchase Orders page', async () => {
      await this.page.goto('/ContractPurchaseOrder');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Contract Purchase Orders page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
    });
  }

  /**
   * Click Create Contract PO button
   */
  async clickCreateContractPO(): Promise<void> {
    await test.step('Click Create Contract PO button', async () => {
      await this.createContractPOButton.click();
    });
  }

  /**
   * Click Export button
   */
  async clickExport(): Promise<void> {
    await test.step('Click Export button', async () => {
      await this.exportButton.click();
    });
  }

  // ========================
  // Filter Methods
  // ========================

  /**
   * Toggle filter visibility
   */
  async toggleFilter(): Promise<void> {
    await test.step('Toggle filter visibility', async () => {
      await this.hideFilterButton.click();
    });
  }

  /**
   * Search contract purchase orders
   */
  async search(query: string): Promise<void> {
    await test.step(`Search contract purchase orders: ${query}`, async () => {
      await this.searchInput.fill(query);
    });
  }

  /**
   * Set date raised range
   */
  async setDateRaisedRange(startDate: string, endDate: string): Promise<void> {
    await test.step(`Set date raised range: ${startDate} - ${endDate}`, async () => {
      await this.dateRaisedStartInput.clear();
      await this.dateRaisedStartInput.fill(startDate);
      await this.dateRaisedEndInput.clear();
      await this.dateRaisedEndInput.fill(endDate);
    });
  }

  /**
   * Click show advanced filters
   */
  async clickShowAdvanced(): Promise<void> {
    await test.step('Click show advanced filters', async () => {
      await this.showAdvancedButton.click();
    });
  }

  /**
   * Click reset filter
   */
  async clickResetFilter(): Promise<void> {
    await test.step('Click reset filter', async () => {
      await this.resetFilterButton.click();
    });
  }

  /**
   * Click search button
   */
  async clickSearch(): Promise<void> {
    await test.step('Click search button', async () => {
      await this.searchButton.click();
    });
  }

  /**
   * Search and wait for results
   */
  async searchAndWait(query?: string): Promise<void> {
    await test.step(`Search and wait for results${query ? `: ${query}` : ''}`, async () => {
      if (query) {
        await this.search(query);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }

  // ========================
  // Tab Methods
  // ========================

  /**
   * Switch to a specific tab
   */
  async switchToTab(tab: ContractPOTab): Promise<void> {
    await test.step(`Switch to ${tab} tab`, async () => {
      const tabLocator = {
        'All': this.allTab,
        'Fully Completed': this.fullyCompletedTab,
        'Not Completed': this.notCompletedTab,
      }[tab];
      await tabLocator.click();
      await this.waitForDataLoad();
    });
  }

  // ========================
  // Table Methods
  // ========================

  /**
   * Wait for data to load
   */
  async waitForDataLoad(): Promise<void> {
    await test.step('Wait for data to load', async () => {
      await this.loadingIndicator.waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {});
    });
  }

  /**
   * Check if no results found
   */
  async isNoResultsVisible(): Promise<boolean> {
    return await test.step('Check if no results visible', async () => {
      return await this.noResultsMessage.isVisible();
    });
  }

  /**
   * Get row count
   */
  async getRowCount(): Promise<number> {
    return await test.step('Get row count', async () => {
      await this.waitForDataLoad();
      if (await this.isNoResultsVisible()) {
        return 0;
      }
      return await this.tableRows.count();
    });
  }

  /**
   * Click row by index
   */
  async clickRowByIndex(index: number): Promise<void> {
    await test.step(`Click row at index ${index}`, async () => {
      await this.tableRows.nth(index).click();
    });
  }

  /**
   * Click contract PO by PO number
   */
  async clickContractPOByNumber(poNumber: string): Promise<void> {
    await test.step(`Click contract PO: ${poNumber}`, async () => {
      await this.page.locator(`text=${poNumber}`).first().click();
    });
  }

  // ========================
  // Combined Methods
  // ========================

  /**
   * Apply search filters
   */
  async applyFilters(options: ContractPOSearchOptions): Promise<void> {
    await test.step('Apply search filters', async () => {
      if (options.query) {
        await this.search(options.query);
      }
      if (options.dateRaisedStart && options.dateRaisedEnd) {
        await this.setDateRaisedRange(options.dateRaisedStart, options.dateRaisedEnd);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }
}
