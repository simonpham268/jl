import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Forms Logbook item interface
 */
export interface FormsLogbookItem {
  jobNo?: string;
  customer?: string;
  site?: string;
  postcode?: string;
  formName?: string;
  formType?: string;
  engineer?: string;
  assetDescription?: string;
  assetNumber?: string;
  date?: string;
}

/**
 * Forms Logbook search options
 */
export interface FormsLogbookSearchOptions {
  query?: string;
  startDate?: string;
  endDate?: string;
  showPrivate?: boolean;
}

/**
 * FormsLogbookPage - Page Object for Forms Logbook page
 * URL: /Logbook
 */
export class FormsLogbookPage extends BasePage {
  // ========================
  // Locators - Header/Actions
  // ========================
  readonly pageTitle: Locator;
  readonly addNewItemButton: Locator;
  readonly printButton: Locator;

  // ========================
  // Locators - Filter/Search
  // ========================
  readonly searchLogbookInput: Locator;
  readonly startDateInput: Locator;
  readonly endDateInput: Locator;
  readonly showPrivateToggle: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // ========================
  // Locators - Results
  // ========================
  readonly listHeading: Locator;
  readonly columnSettingsButton: Locator;
  readonly table: Locator;
  readonly tableRows: Locator;
  readonly noResultsMessage: Locator;
  readonly loadingIndicator: Locator;
  readonly pagination: Locator;

  constructor(page: Page) {
    super(page);

    // Header/Actions
    this.pageTitle = page.getByRole('heading', { name: 'Forms Logbook', exact: true });
    this.addNewItemButton = page.getByRole('button', { name: /Add New Item/ });
    this.printButton = page.locator('text=Print');

    // Filter/Search
    this.searchLogbookInput = page.getByPlaceholder(/Job No|Customer|Site|Postcode|Form Name|Form Type|Engineer|Asset/);
    this.startDateInput = page.locator('text=Start Date').locator('..').getByPlaceholder('DD/MM/YYYY');
    this.endDateInput = page.locator('text=End Date').locator('..').getByPlaceholder('DD/MM/YYYY');
    this.showPrivateToggle = page.locator('text=Show Private');
    this.resetFilterButton = page.getByRole('button', { name: /Reset Filter/ });
    this.searchButton = page.getByRole('button', { name: /Search/ });

    // Results
    this.listHeading = page.getByRole('heading', { name: 'Forms Logbook list' });
    this.columnSettingsButton = page.locator('[class*="column-settings"], [class*="settings"]').first();
    this.table = page.locator('table').first();
    this.tableRows = page.locator('table tbody tr');
    this.noResultsMessage = page.locator('text=No matching results found');
    this.loadingIndicator = page.locator('text=Loading');
    this.pagination = page.getByRole('navigation', { name: 'Page navigation' });
  }

  // ========================
  // Navigation Methods
  // ========================

  /**
   * Navigate to Forms Logbook page
   */
  async navigateToFormsLogbook(): Promise<void> {
    await test.step('Navigate to Forms Logbook page', async () => {
      await this.page.goto('/Logbook');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Forms Logbook page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
    });
  }

  // ========================
  // Action Methods
  // ========================

  /**
   * Click Add New Item button
   */
  async clickAddNewItem(): Promise<void> {
    await test.step('Click Add New Item button', async () => {
      await this.addNewItemButton.click();
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

  // ========================
  // Filter Methods
  // ========================

  /**
   * Search logbook
   */
  async searchLogbook(query: string): Promise<void> {
    await test.step(`Search logbook: ${query}`, async () => {
      await this.searchLogbookInput.fill(query);
    });
  }

  /**
   * Set start date
   */
  async setStartDate(date: string): Promise<void> {
    await test.step(`Set start date: ${date}`, async () => {
      await this.startDateInput.fill(date);
    });
  }

  /**
   * Set end date
   */
  async setEndDate(date: string): Promise<void> {
    await test.step(`Set end date: ${date}`, async () => {
      await this.endDateInput.fill(date);
    });
  }

  /**
   * Set date range
   */
  async setDateRange(startDate: string, endDate: string): Promise<void> {
    await test.step(`Set date range: ${startDate} - ${endDate}`, async () => {
      await this.setStartDate(startDate);
      await this.setEndDate(endDate);
    });
  }

  /**
   * Toggle show private
   */
  async toggleShowPrivate(): Promise<void> {
    await test.step('Toggle show private', async () => {
      await this.showPrivateToggle.click();
    });
  }

  /**
   * Set show private
   */
  async setShowPrivate(show: boolean): Promise<void> {
    await test.step(`Set show private: ${show}`, async () => {
      const isChecked = await this.showPrivateToggle.locator('input').isChecked().catch(() => false);

      if (isChecked !== show) {
        await this.toggleShowPrivate();
      }
    });
  }

  /**
   * Click reset filter button
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
        await this.searchLogbook(query);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
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
      await this.loadingIndicator.waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {});
    });
  }

  /**
   * Check if no results visible
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
   * Click form by job number
   */
  async clickFormByJobNo(jobNo: string): Promise<void> {
    await test.step(`Click form with job no: ${jobNo}`, async () => {
      await this.page.locator(`table tbody tr:has-text("${jobNo}")`).first().click();
    });
  }

  /**
   * Click form by form name
   */
  async clickFormByName(formName: string): Promise<void> {
    await test.step(`Click form with name: ${formName}`, async () => {
      await this.page.locator(`table tbody tr:has-text("${formName}")`).first().click();
    });
  }

  // ========================
  // Combined Methods
  // ========================

  /**
   * Apply search filters
   */
  async applyFilters(options: FormsLogbookSearchOptions): Promise<void> {
    await test.step('Apply search filters', async () => {
      if (options.query) {
        await this.searchLogbook(options.query);
      }
      if (options.startDate) {
        await this.setStartDate(options.startDate);
      }
      if (options.endDate) {
        await this.setEndDate(options.endDate);
      }
      if (options.showPrivate !== undefined) {
        await this.setShowPrivate(options.showPrivate);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }
}
