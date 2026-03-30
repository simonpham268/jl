import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Subcontractor PO list item interface
 */
export interface SubcontractorPOListItem {
  poNumber: string;
  jobNumber?: string;
  subcontractorName?: string;
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
 * Subcontractor PO search options
 */
export interface SubcontractorPOSearchOptions {
  query?: string;
  dateRaisedStart?: string;
  dateRaisedEnd?: string;
  subcontractor?: string[];
  status?: string[];
  deliveryStatus?: string[];
}

/**
 * Subcontractor PO tabs
 */
export type SubcontractorPOTab = 'All' | 'Fully Completed' | 'Partially Completed' | 'Not Completed' | 'Not Applicable' | 'Needs Approval';

/**
 * SubcontractorPOPage - Page Object for Subcontractor Purchase Orders page
 * URL: /SubContractorPO
 */
export class SubcontractorPOPage extends BasePage {
  // ========================
  // Locators - Header/Actions
  // ========================
  readonly pageTitle: Locator;
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
  readonly filtersAppliedIndicator: Locator;

  // ========================
  // Locators - Tabs
  // ========================
  readonly allTab: Locator;
  readonly fullyCompletedTab: Locator;
  readonly partiallyCompletedTab: Locator;
  readonly notCompletedTab: Locator;
  readonly notApplicableTab: Locator;
  readonly needsApprovalTab: Locator;

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
  readonly jobNumberLabel: Locator;
  readonly subcontractorNameLabel: Locator;
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
    this.pageTitle = page.getByRole('heading', { name: 'Subcontractor Purchase Orders' });
    this.exportButton = page.getByRole('link', { name: /Export/ });

    // Filter
    this.hideFilterButton = page.getByRole('button', { name: /Hide Filter/ });
    this.searchInput = page.getByPlaceholder('PO Number / Job Number / Subcontractor Name / Account Number / Reference Number');
    this.dateRaisedStartInput = page.locator('text=Date Raised').locator('..').getByPlaceholder('Start Date');
    this.dateRaisedEndInput = page.getByPlaceholder('End Date').first();
    this.showAdvancedButton = page.getByRole('button', { name: 'Show Advanced' });
    this.resetFilterButton = page.getByRole('button', { name: /Reset Filter/ });
    this.searchButton = page.getByRole('button', { name: /Search/ }).last();
    this.filtersAppliedIndicator = page.locator('text=Filters are applied');

    // Tabs
    this.allTab = page.getByRole('tab', { name: /All/ });
    this.fullyCompletedTab = page.getByRole('tab', { name: /Fully Completed/ });
    this.partiallyCompletedTab = page.getByRole('tab', { name: /Partially Completed/ });
    this.notCompletedTab = page.getByRole('tab', { name: /Not Completed/ });
    this.notApplicableTab = page.getByRole('tab', { name: /Not Applicable/ });
    this.needsApprovalTab = page.getByRole('tab', { name: /Needs Approval/ });

    // Table
    this.table = page.locator('table').first();
    this.tableRows = page.locator('table tbody tr');
    this.loadingIndicator = page.locator('text=Loading');
    this.noResultsMessage = page.locator('text=No matching results found');

    // Sidebar Summary
    this.sidebarPONumber = page.locator('text=PO').locator('..');
    this.jobNumberLabel = page.locator('text=Job Number').locator('..').locator('p');
    this.subcontractorNameLabel = page.locator('text=Subcontractor Name').locator('..').locator('p');
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
   * Navigate to Subcontractor PO page
   */
  async navigateToSubcontractorPO(): Promise<void> {
    await test.step('Navigate to Subcontractor PO page', async () => {
      await this.page.goto('/SubContractorPO');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Subcontractor PO page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
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
   * Search subcontractor POs
   */
  async search(query: string): Promise<void> {
    await test.step(`Search subcontractor POs: ${query}`, async () => {
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
   * Check if filters are applied
   */
  async isFiltersApplied(): Promise<boolean> {
    return await test.step('Check if filters are applied', async () => {
      return await this.filtersAppliedIndicator.isVisible();
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
  async switchToTab(tab: SubcontractorPOTab): Promise<void> {
    await test.step(`Switch to ${tab} tab`, async () => {
      const tabLocator = {
        'All': this.allTab,
        'Fully Completed': this.fullyCompletedTab,
        'Partially Completed': this.partiallyCompletedTab,
        'Not Completed': this.notCompletedTab,
        'Not Applicable': this.notApplicableTab,
        'Needs Approval': this.needsApprovalTab,
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
   * Click subcontractor PO by PO number
   */
  async clickSubcontractorPOByNumber(poNumber: string): Promise<void> {
    await test.step(`Click subcontractor PO: ${poNumber}`, async () => {
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
   * Get sidebar job number
   */
  async getSidebarJobNumber(): Promise<string> {
    return await test.step('Get sidebar job number', async () => {
      return await this.jobNumberLabel.textContent() || '';
    });
  }

  /**
   * Get sidebar subcontractor name
   */
  async getSidebarSubcontractorName(): Promise<string> {
    return await test.step('Get sidebar subcontractor name', async () => {
      return await this.subcontractorNameLabel.textContent() || '';
    });
  }

  // ========================
  // Combined Methods
  // ========================

  /**
   * Apply search filters
   */
  async applyFilters(options: SubcontractorPOSearchOptions): Promise<void> {
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
