import { Locator, Page } from "@playwright/test";
import { test, expect } from '@playwright/test';
import { BasePage } from "../BasePage";

/**
 * PPM Quote list item interface
 */
export interface PPMQuoteListItem {
  quoteNo: string;
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
  loggedBy?: string;
}

/**
 * PPM Quote search options
 */
export interface PPMQuoteSearchOptions {
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
 * PPM Quote tabs
 */
export type PPMQuoteTab = 'Quote Design' | 'Outstanding' | 'Sent' | 'Accepted' | 'Rejected' | 'All';

/**
 * PPM Quote Status
 */
export type PPMQuoteStatus = 'Quote Design' | 'Outstanding' | 'Sent' | 'Accepted' | 'Rejected';

/**
 * AllPPMQuotesPage - Page Object for All PPM Quotes list page
 * URL: /PPMQuote
 */
export class AllPPMQuotesPage extends BasePage {
  // ========================
  // Locators - Header/Actions
  // ========================
  readonly pageTitle: Locator;
  readonly addPPMButton: Locator;
  readonly printButton: Locator;
  readonly exportButton: Locator;

  // ========================
  // Locators - Filter
  // ========================
  readonly hideFilterButton: Locator;
  readonly searchInput: Locator;
  readonly statusDropdown: Locator;
  readonly showAdvancedButton: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // ========================
  // Locators - Tabs
  // ========================
  readonly quoteDesignTab: Locator;
  readonly outstandingTab: Locator;
  readonly sentTab: Locator;
  readonly acceptedTab: Locator;
  readonly rejectedTab: Locator;
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
  readonly quoteStatusLabel: Locator;
  readonly loggedByLabel: Locator;
  readonly jobCategoryLabel: Locator;
  readonly quoteDescriptionLabel: Locator;
  readonly billingTypeLabel: Locator;
  readonly startDateLabel: Locator;
  readonly endDateLabel: Locator;
  readonly planReferenceLabel: Locator;
  readonly sellingRateLabel: Locator;
  readonly viewFullDetailsButton: Locator;

  // ========================
  // Locators - Table Actions
  // ========================
  readonly columnSettingsButton: Locator;

  constructor(page: Page) {
    super(page);

    // Header/Actions
    this.pageTitle = page.getByRole('heading', { name: 'PPM Quotes' });
    this.addPPMButton = page.getByRole('link', { name: /Add PPM/ });
    this.printButton = page.locator('text=Print');
    this.exportButton = page.locator('text=Export');

    // Filter
    this.hideFilterButton = page.getByRole('button', { name: /Hide Filter/ });
    this.searchInput = page.getByPlaceholder('PPM Quote No. / Customer / Site / Description / Account Manager');
    this.statusDropdown = page.locator('text=Status').locator('..');
    this.showAdvancedButton = page.getByRole('button', { name: 'Show Advanced' });
    this.resetFilterButton = page.getByRole('button', { name: /Reset Filter/ });
    this.searchButton = page.getByRole('button', { name: /Search/ }).last();

    // Tabs
    this.quoteDesignTab = page.getByRole('tab', { name: 'Quote Design' });
    this.outstandingTab = page.getByRole('tab', { name: 'Outstanding' });
    this.sentTab = page.getByRole('tab', { name: 'Sent' });
    this.acceptedTab = page.getByRole('tab', { name: 'Accepted' });
    this.rejectedTab = page.getByRole('tab', { name: 'Rejected' });
    this.allTab = page.getByRole('tab', { name: 'All' });

    // Table
    this.table = page.locator('table').first();
    this.tableRows = page.locator('table tbody tr');
    this.loadingIndicator = page.locator('text=Loading Data... Please wait');
    this.noResultsMessage = page.locator('text=No matching results found');

    // Sidebar Summary
    this.sidebarTitle = page.locator('text=PPM Quote').first();
    this.customerNameLabel = page.locator('text=Customer Name').locator('..').locator('p');
    this.siteNameLabel = page.locator('text=Site Name').locator('..').locator('p');
    this.quoteStatusLabel = page.locator('text=PPM Quote Status').locator('..').locator('p');
    this.loggedByLabel = page.locator('text=Logged by').locator('..').locator('p');
    this.jobCategoryLabel = page.locator('text=Job Category').locator('..').locator('p');
    this.quoteDescriptionLabel = page.locator('text=Quote Description');
    this.billingTypeLabel = page.locator('text=Billing Type').locator('..').locator('p');
    this.startDateLabel = page.locator('text=Start Date').locator('..').locator('p');
    this.endDateLabel = page.locator('text=End Date').locator('..').locator('p');
    this.planReferenceLabel = page.locator('text=Plan Reference').locator('..').locator('p');
    this.sellingRateLabel = page.locator('text=Selling Rate').locator('..').locator('p');
    this.viewFullDetailsButton = page.getByRole('button', { name: /View Full PPM Quote Details/ });

    // Table Actions
    this.columnSettingsButton = page.locator('[class*="column-settings"]');
  }

  // ========================
  // Navigation Methods
  // ========================

  /**
   * Navigate to All PPM Quotes page
   */
  async navigateToAllPPMQuotes(): Promise<void> {
    await test.step('Navigate to All PPM Quotes page', async () => {
      await this.page.goto('/PPMQuote');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert All PPM Quotes page is loaded', async () => {
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
   * Search PPM quotes
   */
  async search(query: string): Promise<void> {
    await test.step(`Search PPM quotes: ${query}`, async () => {
      await this.searchInput.fill(query);
    });
  }

  /**
   * Select status filter
   */
  async selectStatus(status: PPMQuoteStatus[]): Promise<void> {
    await test.step(`Select status: ${status.join(', ')}`, async () => {
      await this.statusDropdown.click();
      for (const s of status) {
        await this.page.getByRole('option', { name: s }).click();
      }
      await this.page.keyboard.press('Escape');
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
  async switchToTab(tab: PPMQuoteTab): Promise<void> {
    await test.step(`Switch to ${tab} tab`, async () => {
      const tabMap: Record<PPMQuoteTab, Locator> = {
        'Quote Design': this.quoteDesignTab,
        'Outstanding': this.outstandingTab,
        'Sent': this.sentTab,
        'Accepted': this.acceptedTab,
        'Rejected': this.rejectedTab,
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
    const tabs = [this.quoteDesignTab, this.outstandingTab, this.sentTab, this.acceptedTab, this.rejectedTab, this.allTab];
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
   * Click PPM quote by quote number
   */
  async clickQuoteByNumber(quoteNo: string): Promise<void> {
    await test.step(`Click quote: ${quoteNo}`, async () => {
      await this.page.locator(`text=${quoteNo}`).first().click();
    });
  }

  /**
   * Click PPM quote by customer name
   */
  async clickQuoteByCustomerName(customerName: string): Promise<void> {
    await test.step(`Click quote by customer: ${customerName}`, async () => {
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
   * Get sidebar quote status
   */
  async getSidebarQuoteStatus(): Promise<string> {
    return await this.quoteStatusLabel.textContent() || '';
  }

  /**
   * Click view full details
   */
  async clickViewFullDetails(): Promise<void> {
    await test.step('Click View Full PPM Quote Details', async () => {
      await this.viewFullDetailsButton.click();
    });
  }

  // ========================
  // Combined Methods
  // ========================

  /**
   * Apply search filters
   */
  async applyFilters(options: PPMQuoteSearchOptions): Promise<void> {
    await test.step('Apply search filters', async () => {
      if (options.query) {
        await this.search(options.query);
      }
      if (options.status) {
        await this.selectStatus(options.status as PPMQuoteStatus[]);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }

  /**
   * Get all visible quote items
   */
  async getAllVisibleItems(): Promise<PPMQuoteListItem[]> {
    await this.waitForDataLoad();
    const count = await this.tableRows.count();
    const items: PPMQuoteListItem[] = [];

    for (let i = 0; i < count; i++) {
      const row = this.tableRows.nth(i);
      const cells = row.locator('td');
      
      items.push({
        quoteNo: await cells.nth(0).textContent() || '',
        customerName: await cells.nth(1).textContent() || '',
        siteName: await cells.nth(2).textContent() || '',
        description: await cells.nth(3).textContent() || '',
      });
    }

    return items;
  }
}
