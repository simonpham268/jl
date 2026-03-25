import { Locator, Page } from "@playwright/test";
import { test, expect } from '@playwright/test';
import { BasePage } from "../BasePage";

/**
 * Purchase Invoice list item interface
 */
export interface PurchaseInvoiceListItem {
  invoiceNumber: string;
  supplierName?: string;
  poNumber?: string;
  reference?: string;
  jobNumber?: string;
  dateRaised?: string;
  amount?: string;
}

/**
 * Purchase Invoice search options
 */
export interface PurchaseInvoiceSearchOptions {
  query?: string;
  dateRaisedStart?: string;
  dateRaisedEnd?: string;
}

/**
 * Purchase Invoice tabs
 */
export type PurchaseInvoiceTab = 'Stock Purchase Invoices' | 'Job Purchase Invoices' | 'Subcontractor Purchase Invoices';

/**
 * AllPurchaseInvoicesPage - Page Object for All Purchase Invoices page
 * URL: /PurchaseInvoice
 */
export class AllPurchaseInvoicesPage extends BasePage {
  // ========================
  // Locators - Header
  // ========================
  readonly pageTitle: Locator;

  // ========================
  // Locators - Filter
  // ========================
  readonly searchInput: Locator;
  readonly dateRaisedStartInput: Locator;
  readonly dateRaisedEndInput: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // ========================
  // Locators - Tabs
  // ========================
  readonly stockPurchaseInvoicesTab: Locator;
  readonly jobPurchaseInvoicesTab: Locator;
  readonly subcontractorPurchaseInvoicesTab: Locator;

  // ========================
  // Locators - Table
  // ========================
  readonly table: Locator;
  readonly tableRows: Locator;
  readonly loadingIndicator: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Header
    this.pageTitle = page.getByRole('heading', { name: 'Purchase Invoices' });

    // Filter
    this.searchInput = page.getByPlaceholder('Invoice Number / Supplier Name / PO Number / Reference / Job Number');
    this.dateRaisedStartInput = page.getByPlaceholder('DD/MM/YYYY').first();
    this.dateRaisedEndInput = page.getByPlaceholder('DD/MM/YYYY').nth(1);
    this.resetFilterButton = page.getByRole('button', { name: /Reset Filter/ });
    this.searchButton = page.getByRole('button', { name: /Search/ });

    // Tabs
    this.stockPurchaseInvoicesTab = page.getByRole('tab', { name: /Stock Purchase Invoices/ });
    this.jobPurchaseInvoicesTab = page.getByRole('tab', { name: /Job Purchase Invoices/ });
    this.subcontractorPurchaseInvoicesTab = page.getByRole('tab', { name: /Subcontractor Purchase Invoices/ });

    // Table
    this.table = page.locator('table').first();
    this.tableRows = page.locator('table tbody tr');
    this.loadingIndicator = page.locator('text=Loading Data... Please wait');
    this.noResultsMessage = page.locator('text=No matching results found');
  }

  // ========================
  // Navigation Methods
  // ========================

  /**
   * Navigate to All Purchase Invoices page
   */
  async navigateToAllPurchaseInvoices(): Promise<void> {
    await test.step('Navigate to All Purchase Invoices page', async () => {
      await this.page.goto('/PurchaseInvoice');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert All Purchase Invoices page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
    });
  }

  // ========================
  // Filter Methods
  // ========================

  /**
   * Search purchase invoices
   */
  async search(query: string): Promise<void> {
    await test.step(`Search purchase invoices: ${query}`, async () => {
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
  async switchToTab(tab: PurchaseInvoiceTab): Promise<void> {
    await test.step(`Switch to ${tab} tab`, async () => {
      const tabLocator = {
        'Stock Purchase Invoices': this.stockPurchaseInvoicesTab,
        'Job Purchase Invoices': this.jobPurchaseInvoicesTab,
        'Subcontractor Purchase Invoices': this.subcontractorPurchaseInvoicesTab,
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
   * Click purchase invoice by invoice number
   */
  async clickInvoiceByNumber(invoiceNumber: string): Promise<void> {
    await test.step(`Click purchase invoice: ${invoiceNumber}`, async () => {
      await this.page.locator(`text=${invoiceNumber}`).first().click();
    });
  }

  // ========================
  // Combined Methods
  // ========================

  /**
   * Apply search filters
   */
  async applyFilters(options: PurchaseInvoiceSearchOptions): Promise<void> {
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
