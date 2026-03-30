import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Refcom Audit item interface
 */
export interface RefcomAuditItem {
  customer?: string;
  site?: string;
  jobNumber?: string;
  assetDescription?: string;
  logType?: string;
  engineer?: string;
  date?: string;
}

/**
 * Refcom Audit search options
 */
export interface RefcomAuditSearchOptions {
  searchTerms?: string;
  assetDescription?: string[];
  startDate?: string;
  endDate?: string;
  logType?: string[];
  engineer?: string[];
}

/**
 * RefcomAuditPage - Page Object for Refcom Audit page
 * URL: /Refcom/LogBook
 */
export class RefcomAuditPage extends BasePage {
  // ========================
  // Locators - Header/Actions
  // ========================
  readonly pageTitle: Locator;
  readonly swapCylinderLink: Locator;
  readonly printButton: Locator;
  readonly exportButton: Locator;

  // ========================
  // Locators - Filter
  // ========================
  readonly searchTermsInput: Locator;
  readonly assetDescriptionMultiselect: Locator;
  readonly startDateInput: Locator;
  readonly endDateInput: Locator;
  readonly logTypeMultiselect: Locator;
  readonly engineerMultiselect: Locator;
  readonly showAdvancedToggle: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // ========================
  // Locators - Results
  // ========================
  readonly recordCount: Locator;
  readonly columnSettingsButton: Locator;
  readonly table: Locator;
  readonly tableRows: Locator;
  readonly loadingIndicator: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Header/Actions
    this.pageTitle = page.getByRole('heading', { name: 'Refcom Audit' });
    this.swapCylinderLink = page.getByRole('link', { name: /Swap Cylinder/ });
    this.printButton = page.locator('text=Print');
    this.exportButton = page.locator('text=Export');

    // Filter
    this.searchTermsInput = page.getByPlaceholder(/Customer|Site|Job Number|Asset Description/);
    this.assetDescriptionMultiselect = page.locator('text=Asset Description').locator('..').locator('[class*="multiselect"], [role="listbox"]');
    this.startDateInput = page.getByPlaceholder('Start Date');
    this.endDateInput = page.getByPlaceholder('End Date');
    this.logTypeMultiselect = page.locator('text=Log Type').locator('..').locator('[class*="multiselect"], [role="listbox"]');
    this.engineerMultiselect = page.locator('text=Engineer').locator('..').locator('[class*="multiselect"], [role="listbox"]');
    this.showAdvancedToggle = page.locator('text=Show Advanced');
    this.resetFilterButton = page.getByRole('button', { name: /Reset Filter/ });
    this.searchButton = page.getByRole('button', { name: /Search/ });

    // Results
    this.recordCount = page.locator('text=/\\d+ of \\d+ record/');
    this.columnSettingsButton = page.locator('[class*="column-settings"], button:has([class*="cog"])').first();
    this.table = page.locator('table').first();
    this.tableRows = page.locator('table tbody tr');
    this.loadingIndicator = page.locator('text=Loading');
    this.noResultsMessage = page.locator('text=No matching results found');
  }

  // ========================
  // Navigation Methods
  // ========================

  /**
   * Navigate to Refcom Audit page
   */
  async navigateToRefcomAudit(): Promise<void> {
    await test.step('Navigate to Refcom Audit page', async () => {
      await this.page.goto('/Refcom/LogBook');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Refcom Audit page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
    });
  }

  // ========================
  // Action Methods
  // ========================

  /**
   * Click Swap Cylinder link
   */
  async clickSwapCylinder(): Promise<void> {
    await test.step('Click Swap Cylinder link', async () => {
      await this.swapCylinderLink.click();
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
   * Search terms
   */
  async searchTerms(query: string): Promise<void> {
    await test.step(`Search terms: ${query}`, async () => {
      await this.searchTermsInput.fill(query);
    });
  }

  /**
   * Select asset descriptions
   */
  async selectAssetDescriptions(descriptions: string[]): Promise<void> {
    await test.step(`Select asset descriptions: ${descriptions.join(', ')}`, async () => {
      await this.assetDescriptionMultiselect.click();
      for (const desc of descriptions) {
        await this.page.getByRole('option', { name: new RegExp(desc, 'i') }).click();
      }
      await this.page.keyboard.press('Escape');
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
   * Select log types
   */
  async selectLogTypes(types: string[]): Promise<void> {
    await test.step(`Select log types: ${types.join(', ')}`, async () => {
      await this.logTypeMultiselect.click();
      for (const type of types) {
        await this.page.getByRole('option', { name: new RegExp(type, 'i') }).click();
      }
      await this.page.keyboard.press('Escape');
    });
  }

  /**
   * Select engineers
   */
  async selectEngineers(engineers: string[]): Promise<void> {
    await test.step(`Select engineers: ${engineers.join(', ')}`, async () => {
      await this.engineerMultiselect.click();
      for (const engineer of engineers) {
        await this.page.getByRole('option', { name: new RegExp(engineer, 'i') }).click();
      }
      await this.page.keyboard.press('Escape');
    });
  }

  /**
   * Toggle show advanced
   */
  async toggleShowAdvanced(): Promise<void> {
    await test.step('Toggle show advanced', async () => {
      await this.showAdvancedToggle.click();
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
        await this.searchTerms(query);
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
   * Get record count text
   */
  async getRecordCountText(): Promise<string> {
    return await test.step('Get record count text', async () => {
      return await this.recordCount.textContent() || '';
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

  // ========================
  // Combined Methods
  // ========================

  /**
   * Apply search filters
   */
  async applyFilters(options: RefcomAuditSearchOptions): Promise<void> {
    await test.step('Apply search filters', async () => {
      if (options.searchTerms) {
        await this.searchTerms(options.searchTerms);
      }
      if (options.assetDescription) {
        await this.selectAssetDescriptions(options.assetDescription);
      }
      if (options.startDate) {
        await this.setStartDate(options.startDate);
      }
      if (options.endDate) {
        await this.setEndDate(options.endDate);
      }
      if (options.logType) {
        await this.selectLogTypes(options.logType);
      }
      if (options.engineer) {
        await this.selectEngineers(options.engineer);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }
}
