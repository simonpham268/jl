import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * PPM Contract list item interface
 */
export interface PPMContractListItem {
  contractNo: string;
  customerName?: string;
  siteName?: string;
  description?: string;
  status?: string;
  billingType?: string;
  startDate?: string;
  endDate?: string;
  planReference?: string;
  sellingRate?: string;
  jobCategory?: string;
  accountManager?: string;
}

/**
 * PPM Contract search options
 */
export interface PPMContractSearchOptions {
  query?: string;
  status?: string[];
  customer?: string[];
  site?: string[];
  jobCategory?: string[];
  accountManager?: string[];
  startDateFrom?: string;
  startDateTo?: string;
  endDateFrom?: string;
  endDateTo?: string;
}

/**
 * PPM Contract tabs
 */
export type PPMContractTab = 'In Progress' | 'Completed' | 'Suspended' | 'All';

/**
 * AllPPMContractsPage - Page Object for All PPM Contracts list page
 * URL: /PPMContract
 */
export class AllPPMContractsPage extends BasePage {
  // ========================
  // Locators - Header/Actions
  // ========================
  readonly pageTitle: Locator;
  readonly addPPMButton: Locator;
  readonly printButton: Locator;
  readonly importPPMButton: Locator;
  readonly exportButton: Locator;

  // ========================
  // Locators - Filter
  // ========================
  readonly hideFilterButton: Locator;
  readonly searchInput: Locator;
  readonly showAdvancedButton: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // ========================
  // Locators - Tabs
  // ========================
  readonly inProgressTab: Locator;
  readonly completedTab: Locator;
  readonly suspendedTab: Locator;
  readonly allTab: Locator;

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
  readonly sidebarTitle: Locator;
  readonly customerNameLabel: Locator;
  readonly siteNameLabel: Locator;
  readonly descriptionLabel: Locator;
  readonly billingTypeLabel: Locator;
  readonly startDateLabel: Locator;
  readonly endDateLabel: Locator;
  readonly jobCategoryLabel: Locator;
  readonly planReferenceLabel: Locator;
  readonly sellingRateLabel: Locator;
  readonly viewFullDetailsButton: Locator;

  // ========================
  // Locators - Table Actions
  // ========================
  readonly refreshButton: Locator;
  readonly columnSettingsButton: Locator;

  constructor(page: Page) {
    super(page);

    // Header/Actions
    this.pageTitle = page.getByRole('heading', { name: 'PPM Contracts' });
    this.addPPMButton = page.getByRole('link', { name: /Add PPM/ });
    this.printButton = page.locator('text=Print');
    this.importPPMButton = page.locator('text=Import PPM');
    this.exportButton = page.locator('text=Export');

    // Filter
    this.hideFilterButton = page.getByRole('button', { name: /Hide Filter/ });
    this.searchInput = page.getByPlaceholder('PPM Contract No. / Customer / Site / Description / Account Manager');
    this.showAdvancedButton = page.getByRole('button', { name: 'Show Advanced' });
    this.resetFilterButton = page.getByRole('button', { name: /Reset Filter/ });
    this.searchButton = page.getByRole('button', { name: /Search/ }).last();

    // Tabs
    this.inProgressTab = page.getByRole('tab', { name: 'In Progress' });
    this.completedTab = page.getByRole('tab', { name: 'Completed' });
    this.suspendedTab = page.getByRole('tab', { name: 'Suspended' });
    this.allTab = page.getByRole('tab', { name: 'All' });

    // Table
    this.table = page.locator('table').first();
    this.tableRows = page.locator('table tbody tr');
    this.loadingIndicator = page.locator('text=Loading Data... Please wait');
    this.noResultsMessage = page.locator('text=No matching results found');

    // Sidebar Summary
    this.sidebarTitle = page.locator('text=PPM Contract').first();
    this.customerNameLabel = page.locator('text=Customer Name').locator('..').locator('p');
    this.siteNameLabel = page.locator('text=Site Name').locator('..').locator('p');
    this.descriptionLabel = page.locator('text=Description').first();
    this.billingTypeLabel = page.locator('text=Billing Type').locator('..').locator('p');
    this.startDateLabel = page.locator('text=Start Date').locator('..').locator('p');
    this.endDateLabel = page.locator('text=End Date').locator('..').locator('p');
    this.jobCategoryLabel = page.locator('text=Job Category').locator('..').locator('p');
    this.planReferenceLabel = page.locator('text=Plan Reference').locator('..').locator('p');
    this.sellingRateLabel = page.locator('text=Selling Rate').locator('..').locator('p');
    this.viewFullDetailsButton = page.getByRole('button', { name: /View Full PPM Contract Details/ });

    // Table Actions
    this.refreshButton = page.locator('[class*="refresh"]');
    this.columnSettingsButton = page.locator('[class*="column-settings"]');
  }

  // ========================
  // Navigation Methods
  // ========================

  /**
   * Navigate to All PPM Contracts page
   */
  async navigateToAllPPMContracts(): Promise<void> {
    await test.step('Navigate to All PPM Contracts page', async () => {
      await this.page.goto('/PPMContract');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert All PPM Contracts page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
    });
  }

  /**
   * Click Add PPM button
   */
  async clickAddPPM(): Promise<void> {
    await test.step('Click Add PPM button', async () => {
      await this.addPPMButton.click();
    });
  }

  /**
   * Click Print button
   */
  async clickPrint(): Promise<void> {
    await test.step('Click Print button', async () => {
      await this.printButton.click();
    });
  }

  /**
   * Click Import PPM button
   */
  async clickImportPPM(): Promise<void> {
    await test.step('Click Import PPM button', async () => {
      await this.importPPMButton.click();
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
    await test.step('Toggle filter section', async () => {
      await this.hideFilterButton.click();
    });
  }

  /**
   * Search PPM contracts
   */
  async search(query: string): Promise<void> {
    await test.step(`Search PPM contracts: ${query}`, async () => {
      await this.searchInput.fill(query);
    });
  }

  /**
   * Click show advanced filters
   */
  async clickShowAdvanced(): Promise<void> {
    await test.step('Click Show Advanced filters', async () => {
      await this.showAdvancedButton.click();
    });
  }

  /**
   * Click reset filter
   */
  async clickResetFilter(): Promise<void> {
    await test.step('Click Reset Filter', async () => {
      await this.resetFilterButton.click();
    });
  }

  /**
   * Click search button
   */
  async clickSearch(): Promise<void> {
    await test.step('Click Search button', async () => {
      await this.searchButton.click();
    });
  }

  /**
   * Search and wait for results
   */
  async searchAndWait(query: string): Promise<void> {
    await test.step(`Search and wait: ${query}`, async () => {
      await this.search(query);
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }

  // ========================
  // Tab Methods
  // ========================

  /**
   * Switch to tab
   */
  async switchToTab(tab: PPMContractTab): Promise<void> {
    await test.step(`Switch to ${tab} tab`, async () => {
      const tabMap: Record<PPMContractTab, Locator> = {
        'In Progress': this.inProgressTab,
        'Completed': this.completedTab,
        'Suspended': this.suspendedTab,
        'All': this.allTab,
      };

      await tabMap[tab].click();
      await this.waitForDataLoad();
    });
  }

  /**
   * Get current active tab
   */
  async getActiveTab(): Promise<string> {
    const tabs = [this.inProgressTab, this.completedTab, this.suspendedTab, this.allTab];

    for (const tab of tabs) {
      const isSelected = await tab.getAttribute('aria-selected');

      if (isSelected === 'true') {
        return await tab.textContent() || '';
      }
    }
    return '';
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
   * Check if loading
   */
  async isLoading(): Promise<boolean> {
    return await this.loadingIndicator.isVisible();
  }

  /**
   * Check if no results found
   */
  async isNoResultsVisible(): Promise<boolean> {
    return await this.noResultsMessage.isVisible();
  }

  /**
   * Get row count
   */
  async getRowCount(): Promise<number> {
    await this.waitForDataLoad();
    return await this.tableRows.count();
  }

  /**
   * Click PPM contract by contract number
   */
  async clickContractByNumber(contractNo: string): Promise<void> {
    await test.step(`Click contract: ${contractNo}`, async () => {
      await this.page.locator(`text=${contractNo}`).first().click();
    });
  }

  /**
   * Click PPM contract by customer name
   */
  async clickContractByCustomerName(customerName: string): Promise<void> {
    await test.step(`Click contract by customer: ${customerName}`, async () => {
      await this.tableRows.filter({ hasText: customerName }).first().click();
    });
  }

  /**
   * Click row by index
   */
  async clickRowByIndex(index: number): Promise<void> {
    await test.step(`Click row ${index + 1}`, async () => {
      await this.tableRows.nth(index).click();
    });
  }

  // ========================
  // Sidebar Methods
  // ========================

  /**
   * Get sidebar customer name
   */
  async getSidebarCustomerName(): Promise<string> {
    return await this.customerNameLabel.textContent() || '';
  }

  /**
   * Get sidebar site name
   */
  async getSidebarSiteName(): Promise<string> {
    return await this.siteNameLabel.textContent() || '';
  }

  /**
   * Click view full details
   */
  async clickViewFullDetails(): Promise<void> {
    await test.step('Click View Full PPM Contract Details', async () => {
      await this.viewFullDetailsButton.click();
    });
  }

  // ========================
  // Combined Methods
  // ========================

  /**
   * Apply search filters
   */
  async applyFilters(options: PPMContractSearchOptions): Promise<void> {
    await test.step('Apply search filters', async () => {
      if (options.query) {
        await this.search(options.query);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }

  /**
   * Get all visible contract items
   */
  async getAllVisibleItems(): Promise<PPMContractListItem[]> {
    await this.waitForDataLoad();
    const count = await this.tableRows.count();
    const items: PPMContractListItem[] = [];

    for (let i = 0; i < count; i++) {
      const row = this.tableRows.nth(i);
      const cells = row.locator('td');

      items.push({
        contractNo: await cells.nth(0).textContent() || '',
        customerName: await cells.nth(1).textContent() || '',
        siteName: await cells.nth(2).textContent() || '',
        description: await cells.nth(3).textContent() || '',
      });
    }    return items;
  }
}
