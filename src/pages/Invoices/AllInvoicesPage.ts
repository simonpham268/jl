import { Locator, Page } from "@playwright/test";
import { test, expect } from '@playwright/test';
import { BasePage } from "../BasePage";

/**
 * Invoice tab types
 */
export type InvoiceTab = 'Invoices' | 'Draft Invoices' | 'Credits' | 'Draft Credits';

/**
 * Invoice search options
 */
export interface InvoiceSearchOptions {
  searchText?: string;
  startDate?: string;
  endDate?: string;
}

/**
 * Invoice list item
 */
export interface InvoiceListItem {
  invoiceNumber: string;
  customerName: string;
  siteName: string;
  jobNumber: string;
  dateRaised: string;
  amount: string;
  status: string;
}

/**
 * Invoice summary info from sidebar
 */
export interface InvoiceSummaryInfo {
  customerName: string;
  siteName: string;
  jobNumber: string;
  invoiceStatus: string;
  paymentStatus: string;
  dateRaised: string;
  paymentDueDate: string;
}

/**
 * AllInvoicesPage - Page Object for All Invoices list page
 * URL: /Invoice
 */
export class AllInvoicesPage extends BasePage {
  // ========================
  // Locators - Page Header
  // ========================
  readonly pageTitle: Locator;
  readonly createCustomerGroupedButton: Locator;
  readonly printButton: Locator;
  readonly exportButton: Locator;

  // ========================
  // Locators - Filter Section
  // ========================
  readonly hideFilterButton: Locator;
  readonly searchInvoicesInput: Locator;
  readonly startDateInput: Locator;
  readonly endDateInput: Locator;
  readonly showAdvancedButton: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // ========================
  // Locators - Tab Navigation
  // ========================
  readonly invoicesTab: Locator;
  readonly draftInvoicesTab: Locator;
  readonly creditsTab: Locator;
  readonly draftCreditsTab: Locator;

  // ========================
  // Locators - Results Section
  // ========================
  readonly resultsTable: Locator;
  readonly loadingMessage: Locator;
  readonly noResultsMessage: Locator;

  // ========================
  // Locators - Detail Sidebar
  // ========================
  readonly invoiceSidebar: Locator;
  readonly sidebarTitle: Locator;
  readonly invoiceSummaryHeading: Locator;
  readonly customerNameLink: Locator;
  readonly siteNameLink: Locator;
  readonly jobNumberLink: Locator;
  readonly invoiceStatus: Locator;
  readonly paymentStatus: Locator;
  readonly dateRaised: Locator;
  readonly paymentDueDate: Locator;

  constructor(page: Page) {
    super(page);

    // Page Header
    this.pageTitle = page.getByRole('heading', { name: 'Invoice(s)', level: 3 });
    this.createCustomerGroupedButton = page.getByRole('link', { name: 'Create Customer Grouped' });
    this.printButton = page.locator('text=Print');
    this.exportButton = page.locator('text=Export');

    // Filter Section
    this.hideFilterButton = page.getByRole('button', { name: 'Hide Filter' });
    this.searchInvoicesInput = page.getByPlaceholder('Customer / Site / Invoice Number / Address / Account No. / Order No. / Job No. / PPM Contract No.');
    this.startDateInput = page.locator('text=Start Date').locator('..').getByPlaceholder('DD/MM/YYYY');
    this.endDateInput = page.locator('text=End Date').locator('..').getByPlaceholder('DD/MM/YYYY');
    this.showAdvancedButton = page.getByRole('button', { name: 'Show Advanced' });
    this.resetFilterButton = page.getByRole('button', { name: 'Reset Filter' });
    this.searchButton = page.getByRole('button', { name: 'Search' });

    // Tab Navigation
    this.invoicesTab = page.getByRole('tab', { name: /Invoices\(\d+\)/ });
    this.draftInvoicesTab = page.getByRole('tab', { name: /Draft Invoices\(\d+\)/ });
    this.creditsTab = page.getByRole('tab', { name: /Credits\(\d+\)/ });
    this.draftCreditsTab = page.getByRole('tab', { name: /Draft Credits\(\d+\)/ });

    // Results Section
    this.resultsTable = page.locator('table').first();
    this.loadingMessage = page.locator('text=Loading Data... Please wait');
    this.noResultsMessage = page.locator('text=No records found');

    // Detail Sidebar
    this.invoiceSidebar = page.locator('[class*="sidebar"]').first();
    this.sidebarTitle = page.locator('text=Invoice');
    this.invoiceSummaryHeading = page.getByRole('heading', { name: 'Invoice Summary', level: 4 });
    this.customerNameLink = page.locator('text=Customer Name').locator('..').locator('a');
    this.siteNameLink = page.locator('text=Site Name').locator('..').locator('a');
    this.jobNumberLink = page.locator('text=Job Number').locator('..').locator('a');
    this.invoiceStatus = page.locator('text=Invoice Status').locator('..').locator('p');
    this.paymentStatus = page.locator('text=Payment Status').locator('..').locator('p');
    this.dateRaised = page.locator('text=Date Raised').locator('..').locator('p');
    this.paymentDueDate = page.locator('text=Payment Due Date').locator('..').locator('p');
  }

  // ========================
  // Navigation
  // ========================

  /**
   * Navigate to All Invoices page
   */
  async navigateToAllInvoices(): Promise<void> {
    await test.step('Navigate to All Invoices page', async () => {
      await this.page.goto('/Invoice');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert All Invoices page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
      await expect(this.searchButton).toBeVisible();
    });
  }

  /**
   * Click Create Customer Grouped button
   */
  async clickCreateCustomerGrouped(): Promise<void> {
    await test.step('Click Create Customer Grouped', async () => {
      await this.createCustomerGroupedButton.click();
    });
  }

  // ========================
  // Tab Navigation
  // ========================

  /**
   * Switch to a specific tab
   */
  async switchToTab(tab: InvoiceTab): Promise<void> {
    await test.step(`Switch to ${tab} tab`, async () => {
      switch (tab) {
        case 'Invoices':
          await this.invoicesTab.click();
          break;
        case 'Draft Invoices':
          await this.draftInvoicesTab.click();
          break;
        case 'Credits':
          await this.creditsTab.click();
          break;
        case 'Draft Credits':
          await this.draftCreditsTab.click();
          break;
      }
    });
  }

  /**
   * Get invoices count
   */
  async getInvoicesCount(): Promise<number> {
    return await test.step('Get invoices count', async () => {
      const text = await this.invoicesTab.textContent();
      const match = text?.match(/Invoices\((\d+)\)/);
      return match ? parseInt(match[1]) : 0;
    });
  }

  /**
   * Get draft invoices count
   */
  async getDraftInvoicesCount(): Promise<number> {
    return await test.step('Get draft invoices count', async () => {
      const text = await this.draftInvoicesTab.textContent();
      const match = text?.match(/Draft Invoices\((\d+)\)/);
      return match ? parseInt(match[1]) : 0;
    });
  }

  /**
   * Get credits count
   */
  async getCreditsCount(): Promise<number> {
    return await test.step('Get credits count', async () => {
      const text = await this.creditsTab.textContent();
      const match = text?.match(/Credits\((\d+)\)/);
      return match ? parseInt(match[1]) : 0;
    });
  }

  /**
   * Get draft credits count
   */
  async getDraftCreditsCount(): Promise<number> {
    return await test.step('Get draft credits count', async () => {
      const text = await this.draftCreditsTab.textContent();
      const match = text?.match(/Draft Credits\((\d+)\)/);
      return match ? parseInt(match[1]) : 0;
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
   * Search invoices by text
   */
  async searchInvoices(searchText: string): Promise<void> {
    await test.step(`Search invoices: ${searchText}`, async () => {
      await this.searchInvoicesInput.fill(searchText);
    });
  }

  /**
   * Set date range
   */
  async setDateRange(startDate: string, endDate: string): Promise<void> {
    await test.step(`Set date range: ${startDate} - ${endDate}`, async () => {
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
  async applyFilters(options: InvoiceSearchOptions): Promise<void> {
    await test.step('Apply search filters', async () => {
      if (options.searchText) await this.searchInvoices(options.searchText);
      if (options.startDate) await this.setStartDate(options.startDate);
      if (options.endDate) await this.setEndDate(options.endDate);
      await this.clickSearch();
    });
  }

  // ========================
  // Results Methods
  // ========================

  /**
   * Wait for data to load
   */
  async waitForDataLoad(): Promise<void> {
    await test.step('Wait for data to load', async () => {
      await this.loadingMessage.waitFor({ state: 'hidden', timeout: 30000 });
    });
  }

  /**
   * Check if loading message is visible
   */
  async isLoading(): Promise<boolean> {
    return await test.step('Check if loading', async () => {
      return await this.loadingMessage.isVisible();
    });
  }

  /**
   * Check if no results message is visible
   */
  async isNoResultsVisible(): Promise<boolean> {
    return await test.step('Check if no results visible', async () => {
      return await this.noResultsMessage.isVisible();
    });
  }

  /**
   * Click invoice by invoice number
   */
  async clickInvoiceByNumber(invoiceNumber: string): Promise<void> {
    await test.step(`Click invoice: ${invoiceNumber}`, async () => {
      await this.waitForDataLoad();
      const row = this.resultsTable.locator(`tr:has-text("${invoiceNumber}")`);
      await row.click();
    });
  }

  /**
   * Click invoice by customer name
   */
  async clickInvoiceByCustomerName(customerName: string): Promise<void> {
    await test.step(`Click invoice for customer: ${customerName}`, async () => {
      await this.waitForDataLoad();
      const row = this.resultsTable.locator(`tr:has-text("${customerName}")`).first();
      await row.click();
    });
  }

  /**
   * Get invoice records count from table
   */
  async getInvoiceRecordsCount(): Promise<number> {
    return await test.step('Get invoice records count', async () => {
      await this.waitForDataLoad();
      const rows = this.resultsTable.locator('tbody tr');
      return await rows.count();
    });
  }

  // ========================
  // Print/Export Methods
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
  // Sidebar Methods
  // ========================

  /**
   * Get invoice summary from sidebar
   */
  async getInvoiceSummary(): Promise<InvoiceSummaryInfo> {
    return await test.step('Get invoice summary', async () => {
      const customerName = await this.customerNameLink.textContent() || '';
      const siteName = await this.siteNameLink.textContent() || '';
      const jobNumber = await this.jobNumberLink.textContent() || '';
      const invoiceStatus = await this.invoiceStatus.textContent() || '';
      const paymentStatus = await this.paymentStatus.textContent() || '';
      const dateRaised = await this.dateRaised.textContent() || '';
      const paymentDueDate = await this.paymentDueDate.textContent() || '';

      return {
        customerName: customerName.trim(),
        siteName: siteName.trim(),
        jobNumber: jobNumber.trim(),
        invoiceStatus: invoiceStatus.trim(),
        paymentStatus: paymentStatus.trim(),
        dateRaised: dateRaised.trim(),
        paymentDueDate: paymentDueDate.trim(),
      };
    });
  }

  /**
   * Click customer name link in sidebar
   */
  async clickCustomerInSidebar(): Promise<void> {
    await test.step('Click customer in sidebar', async () => {
      await this.customerNameLink.click();
    });
  }

  /**
   * Click site name link in sidebar
   */
  async clickSiteInSidebar(): Promise<void> {
    await test.step('Click site in sidebar', async () => {
      await this.siteNameLink.click();
    });
  }

  /**
   * Click job number link in sidebar
   */
  async clickJobInSidebar(): Promise<void> {
    await test.step('Click job in sidebar', async () => {
      await this.jobNumberLink.click();
    });
  }

  /**
   * Search and wait for results
   */
  async searchAndWait(options?: InvoiceSearchOptions): Promise<void> {
    await test.step('Search and wait for results', async () => {
      if (options) {
        await this.applyFilters(options);
      } else {
        await this.clickSearch();
      }
      await this.waitForDataLoad();
    });
  }
}
