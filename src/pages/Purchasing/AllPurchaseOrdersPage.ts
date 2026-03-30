import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Purchase Order list item interface
 */
export interface PurchaseOrderListItem {
  poNumber: string;
  supplier?: string;
  accountNumber?: string;
  dateRaised?: string;
  owner?: string;
  raisedBy?: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
  deliveryStatus?: string;
  invoiceStatus?: string;
  status?: string;
}

/**
 * Purchase Order search options
 */
export interface PurchaseOrderSearchOptions {
  query?: string;
  poTypes?: string[];
  dateRaisedStart?: string;
  dateRaisedEnd?: string;
  supplier?: string[];
  status?: string[];
  deliveryStatus?: string[];
}

/**
 * Purchase Order tabs
 */
export type PurchaseOrderTab = 'All' | 'Fully Delivered' | 'Partially Delivered' | 'Not Delivered' | 'In Query' | 'Not Applicable' | 'Needs Approval' | 'Partially Returned';

/**
 * AllPurchaseOrdersPage - Page Object for All Purchase Orders list page
 * URL: /PurchaseOrder
 */
export class AllPurchaseOrdersPage extends BasePage {
  // ========================
  // Locators - Header/Actions
  // ========================
  readonly pageTitle: Locator;
  readonly createStockPOButton: Locator;
  readonly exportButton: Locator;

  // ========================
  // Locators - Filter
  // ========================
  readonly hideFilterButton: Locator;
  readonly searchInput: Locator;
  readonly poTypeDropdown: Locator;
  readonly dateRaisedStartInput: Locator;
  readonly dateRaisedEndInput: Locator;
  readonly showAdvancedButton: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // ========================
  // Locators - Tabs
  // ========================
  readonly allTab: Locator;
  readonly fullyDeliveredTab: Locator;
  readonly partiallyDeliveredTab: Locator;
  readonly notDeliveredTab: Locator;
  readonly inQueryTab: Locator;
  readonly notApplicableTab: Locator;
  readonly needsApprovalTab: Locator;
  readonly partiallyReturnedTab: Locator;

  // ========================
  // Locators - Table
  // ========================
  readonly table: Locator;
  readonly tableRows: Locator;
  readonly loadingIndicator: Locator;
  readonly noResultsMessage: Locator;

  // ========================
  // Locators - Sidebar Summary
  // ========================
  readonly sidebarPONumber: Locator;
  readonly supplierNameLabel: Locator;
  readonly ownerLabel: Locator;
  readonly raisedByLabel: Locator;
  readonly poTypeLabel: Locator;
  readonly estimatedDeliveryLabel: Locator;
  readonly accountNumberLabel: Locator;
  readonly actualDeliveryLabel: Locator;
  readonly dateRaisedLabel: Locator;
  readonly deliveryStatusLabel: Locator;
  readonly statusLabel: Locator;
  readonly invoiceStatusLabel: Locator;
  readonly viewFullDetailsButton: Locator;

  constructor(page: Page) {
    super(page);

    // Header/Actions
    this.pageTitle = page.getByRole('heading', { name: 'Purchase Orders' });
    this.createStockPOButton = page.getByRole('link', { name: /Create Stock PO/ });
    this.exportButton = page.getByRole('link', { name: /Export/ });

    // Filter
    this.hideFilterButton = page.getByRole('button', { name: /Hide Filter/ });
    this.searchInput = page.getByPlaceholder('PO Number / Job Number / Supplier Name / Account Number / Reference Number');
    this.poTypeDropdown = page.locator('text=PO Type(s)').locator('..');
    this.dateRaisedStartInput = page.locator('text=Date Raised').locator('..').getByPlaceholder('Start Date');
    this.dateRaisedEndInput = page.getByPlaceholder('End Date').first();
    this.showAdvancedButton = page.getByRole('button', { name: 'Show Advanced' });
    this.resetFilterButton = page.getByRole('button', { name: /Reset Filter/ });
    this.searchButton = page.getByRole('button', { name: /Search/ }).last();

    // Tabs
    this.allTab = page.getByRole('tab', { name: /All/ });
    this.fullyDeliveredTab = page.getByRole('tab', { name: /Fully Delivered/ });
    this.partiallyDeliveredTab = page.getByRole('tab', { name: /Partially Delivered/ });
    this.notDeliveredTab = page.getByRole('tab', { name: /Not Delivered/ });
    this.inQueryTab = page.getByRole('tab', { name: /In Query/ });
    this.notApplicableTab = page.getByRole('tab', { name: /Not Applicable/ });
    this.needsApprovalTab = page.getByRole('tab', { name: /Needs Approval/ });
    this.partiallyReturnedTab = page.getByRole('tab', { name: /Partially Returned/ });

    // Table
    this.table = page.locator('table').first();
    this.tableRows = page.locator('table tbody tr');
    this.loadingIndicator = page.locator('text=Loading');
    this.noResultsMessage = page.locator('text=No matching results found');

    // Sidebar Summary
    this.sidebarPONumber = page.locator('text=PO').locator('..');
    this.supplierNameLabel = page.locator('text=Supplier Name').locator('..').locator('p');
    this.ownerLabel = page.locator('text=Owner').locator('..').locator('p');
    this.raisedByLabel = page.locator('text=Raised By').locator('..').locator('p');
    this.poTypeLabel = page.locator('text=PO Type').locator('..').locator('p');
    this.estimatedDeliveryLabel = page.locator('text=Estimated Delivery').locator('..').locator('p');
    this.accountNumberLabel = page.locator('text=Account Number').locator('..').locator('p');
    this.actualDeliveryLabel = page.locator('text=Actual Delivery').locator('..').locator('p');
    this.dateRaisedLabel = page.locator('text=Date Raised').locator('..').locator('p');
    this.deliveryStatusLabel = page.locator('text=Delivery Status').locator('..').locator('p');
    this.statusLabel = page.locator('text=Status').locator('..').locator('p');
    this.invoiceStatusLabel = page.locator('text=Invoice Status').locator('..').locator('p');
    this.viewFullDetailsButton = page.getByRole('button', { name: /View Full Purchase Order Details/ });
  }

  // ========================
  // Navigation Methods
  // ========================

  /**
   * Navigate to All Purchase Orders page
   */
  async navigateToAllPurchaseOrders(): Promise<void> {
    await test.step('Navigate to All Purchase Orders page', async () => {
      await this.page.goto('/PurchaseOrder');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert All Purchase Orders page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
    });
  }

  /**
   * Click Create Stock PO button
   */
  async clickCreateStockPO(): Promise<void> {
    await test.step('Click Create Stock PO button', async () => {
      await this.createStockPOButton.click();
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
   * Search purchase orders
   */
  async search(query: string): Promise<void> {
    await test.step(`Search purchase orders: ${query}`, async () => {
      await this.searchInput.fill(query);
    });
  }

  /**
   * Select PO types
   */
  async selectPOTypes(types: string[]): Promise<void> {
    await test.step(`Select PO types: ${types.join(', ')}`, async () => {
      await this.poTypeDropdown.click();
      for (const type of types) {
        await this.page.getByRole('option', { name: new RegExp(type, 'i') }).click();
      }
      await this.page.keyboard.press('Escape');
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
  async switchToTab(tab: PurchaseOrderTab): Promise<void> {
    await test.step(`Switch to ${tab} tab`, async () => {
      const tabLocator = {
        'All': this.allTab,
        'Fully Delivered': this.fullyDeliveredTab,
        'Partially Delivered': this.partiallyDeliveredTab,
        'Not Delivered': this.notDeliveredTab,
        'In Query': this.inQueryTab,
        'Not Applicable': this.notApplicableTab,
        'Needs Approval': this.needsApprovalTab,
        'Partially Returned': this.partiallyReturnedTab,
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
   * Click purchase order by PO number
   */
  async clickPurchaseOrderByNumber(poNumber: string): Promise<void> {
    await test.step(`Click purchase order: ${poNumber}`, async () => {
      await this.page.locator(`text=${poNumber}`).first().click();
    });
  }

  // ========================
  // Sidebar Methods
  // ========================

  /**
   * Click view full purchase order details
   */
  async clickViewFullDetails(): Promise<void> {
    await test.step('Click view full purchase order details', async () => {
      await this.viewFullDetailsButton.click();
    });
  }

  /**
   * Get sidebar supplier name
   */
  async getSidebarSupplierName(): Promise<string> {
    return await test.step('Get sidebar supplier name', async () => {
      return await this.supplierNameLabel.textContent() || '';
    });
  }

  /**
   * Get sidebar PO type
   */
  async getSidebarPOType(): Promise<string> {
    return await test.step('Get sidebar PO type', async () => {
      return await this.poTypeLabel.textContent() || '';
    });
  }

  // ========================
  // Combined Methods
  // ========================

  /**
   * Apply search filters
   */
  async applyFilters(options: PurchaseOrderSearchOptions): Promise<void> {
    await test.step('Apply search filters', async () => {
      if (options.query) {
        await this.search(options.query);
      }
      if (options.poTypes) {
        await this.selectPOTypes(options.poTypes);
      }
      if (options.dateRaisedStart && options.dateRaisedEnd) {
        await this.setDateRaisedRange(options.dateRaisedStart, options.dateRaisedEnd);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }
}
