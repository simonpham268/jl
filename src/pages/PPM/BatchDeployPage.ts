import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Batch Deploy search options
 */
export interface BatchDeploySearchOptions {
  subcontractor?: string;
  customer?: string;
  site?: string;
  ppmContract?: string;
  dateAllocatedStart?: string;
  dateAllocatedEnd?: string;
  siteAreas?: string[];
  subcontractorAreas?: string[];
  visitDueDateStart?: string;
  visitDueDateEnd?: string;
}

/**
 * PPM Visit item interface
 */
export interface PPMVisitItem {
  visitId?: string;
  ppmContract?: string;
  customer?: string;
  site?: string;
  subcontractor?: string;
  visitDueDate?: string;
  dateAllocated?: string;
}

/**
 * BatchDeployPage - Page Object for Batch Deploy Subcontractor PPM Visits page
 * URL: /PPMContract/BatchDeploy
 */
export class BatchDeployPage extends BasePage {
  // ========================
  // Locators - Header
  // ========================
  readonly pageTitle: Locator;

  // ========================
  // Locators - Filter
  // ========================
  readonly subcontractorCombobox: Locator;
  readonly subcontractorSearchInput: Locator;
  readonly customerCombobox: Locator;
  readonly customerSearchInput: Locator;
  readonly siteCombobox: Locator;
  readonly siteSearchInput: Locator;
  readonly ppmContractCombobox: Locator;
  readonly ppmContractSearchInput: Locator;
  readonly dateAllocatedStartInput: Locator;
  readonly dateAllocatedEndInput: Locator;
  readonly siteAreasDropdown: Locator;
  readonly subcontractorAreasDropdown: Locator;
  readonly visitDueDateStartInput: Locator;
  readonly visitDueDateEndInput: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // ========================
  // Locators - Selection Bar
  // ========================
  readonly selectedCountText: Locator;
  readonly batchDeployButton: Locator;

  // ========================
  // Locators - Results
  // ========================
  readonly table: Locator;
  readonly tableRows: Locator;
  readonly noResultsMessage: Locator;
  readonly loadingIndicator: Locator;
  readonly selectAllCheckbox: Locator;

  constructor(page: Page) {
    super(page);

    // Header
    this.pageTitle = page.getByRole('heading', { name: 'Batch Deploy Subcontractor PPM Visits' });

    // Filter - Comboboxes
    this.subcontractorCombobox = page.locator('text=Subcontractor').locator('..').locator('[class*="vs__dropdown"]');
    this.subcontractorSearchInput = page.locator('text=Subcontractor').locator('..').getByRole('searchbox');
    this.customerCombobox = page.locator('text=Customer').locator('..').locator('[class*="vs__dropdown"]');
    this.customerSearchInput = page.locator('text=Customer').locator('..').getByRole('searchbox');
    this.siteCombobox = page.locator('text=Site').locator('..').locator('[class*="vs__dropdown"]');
    this.siteSearchInput = page.locator('text=Site').locator('..').getByRole('searchbox');
    this.ppmContractCombobox = page.locator('text=PPM Contract').locator('..').locator('[class*="vs__dropdown"]');
    this.ppmContractSearchInput = page.locator('text=PPM Contract').locator('..').getByRole('searchbox');

    // Filter - Date Range
    this.dateAllocatedStartInput = page.locator('text=Date Allocated').locator('..').getByPlaceholder('Start Date');
    this.dateAllocatedEndInput = page.locator('text=Date Allocated').locator('..').getByPlaceholder('End Date');
    this.visitDueDateStartInput = page.locator('text=Visit Due Date').locator('..').getByPlaceholder('Start Date');
    this.visitDueDateEndInput = page.locator('text=Visit Due Date').locator('..').getByPlaceholder('End Date');

    // Filter - Multiselect
    this.siteAreasDropdown = page.locator('text=Site Area(s)').locator('..');
    this.subcontractorAreasDropdown = page.locator('text=Subcontractor Area(s)').locator('..');

    // Filter - Buttons
    this.resetFilterButton = page.getByRole('button', { name: /Reset Filter/ });
    this.searchButton = page.getByRole('button', { name: /Search/ });

    // Selection Bar
    this.selectedCountText = page.locator('text=Visit(s) Selected');
    this.batchDeployButton = page.getByRole('button', { name: /Batch Deploy/ });

    // Results
    this.table = page.locator('table').first();
    this.tableRows = page.locator('table tbody tr');
    this.noResultsMessage = page.locator('text=No matching results found');
    this.loadingIndicator = page.locator('text=Loading');
    this.selectAllCheckbox = page.locator('table thead input[type="checkbox"]');
  }

  // ========================
  // Navigation Methods
  // ========================

  /**
   * Navigate to Batch Deploy page
   */
  async navigateToBatchDeploy(): Promise<void> {
    await test.step('Navigate to Batch Deploy Subcontractor PPM Visits page', async () => {
      await this.page.goto('/PPMContract/BatchDeploy');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Batch Deploy page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
    });
  }

  // ========================
  // Filter Methods
  // ========================

  /**
   * Select subcontractor
   */
  async selectSubcontractor(subcontractor: string): Promise<void> {
    await test.step(`Select subcontractor: ${subcontractor}`, async () => {
      await this.subcontractorSearchInput.fill(subcontractor);
      await this.page.waitForTimeout(500);
      await this.page.getByRole('option', { name: new RegExp(subcontractor, 'i') }).first().click();
    });
  }

  /**
   * Select customer
   */
  async selectCustomer(customer: string): Promise<void> {
    await test.step(`Select customer: ${customer}`, async () => {
      await this.customerSearchInput.fill(customer);
      await this.page.waitForTimeout(500);
      await this.page.getByRole('option', { name: new RegExp(customer, 'i') }).first().click();
    });
  }

  /**
   * Select site
   */
  async selectSite(site: string): Promise<void> {
    await test.step(`Select site: ${site}`, async () => {
      await this.siteSearchInput.fill(site);
      await this.page.waitForTimeout(500);
      await this.page.getByRole('option', { name: new RegExp(site, 'i') }).first().click();
    });
  }

  /**
   * Select PPM contract
   */
  async selectPPMContract(contract: string): Promise<void> {
    await test.step(`Select PPM contract: ${contract}`, async () => {
      await this.ppmContractSearchInput.fill(contract);
      await this.page.waitForTimeout(500);
      await this.page.getByRole('option', { name: new RegExp(contract, 'i') }).first().click();
    });
  }

  /**
   * Set date allocated range
   */
  async setDateAllocatedRange(startDate: string, endDate: string): Promise<void> {
    await test.step(`Set date allocated range: ${startDate} - ${endDate}`, async () => {
      await this.dateAllocatedStartInput.fill(startDate);
      await this.dateAllocatedEndInput.fill(endDate);
    });
  }

  /**
   * Set visit due date range
   */
  async setVisitDueDateRange(startDate: string, endDate: string): Promise<void> {
    await test.step(`Set visit due date range: ${startDate} - ${endDate}`, async () => {
      await this.visitDueDateStartInput.fill(startDate);
      await this.visitDueDateEndInput.fill(endDate);
    });
  }

  /**
   * Select site areas
   */
  async selectSiteAreas(areas: string[]): Promise<void> {
    await test.step(`Select site areas: ${areas.join(', ')}`, async () => {
      await this.siteAreasDropdown.click();
      for (const area of areas) {
        await this.page.getByRole('option', { name: new RegExp(area, 'i') }).click();
      }
      await this.page.keyboard.press('Escape');
    });
  }

  /**
   * Select subcontractor areas
   */
  async selectSubcontractorAreas(areas: string[]): Promise<void> {
    await test.step(`Select subcontractor areas: ${areas.join(', ')}`, async () => {
      await this.subcontractorAreasDropdown.click();
      for (const area of areas) {
        await this.page.getByRole('option', { name: new RegExp(area, 'i') }).click();
      }
      await this.page.keyboard.press('Escape');
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
  async searchAndWait(): Promise<void> {
    await test.step('Search and wait for results', async () => {
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
   * Select visit by row index
   */
  async selectVisitByIndex(index: number): Promise<void> {
    await test.step(`Select visit at row index ${index}`, async () => {
      await this.tableRows.nth(index).locator('input[type="checkbox"]').check();
    });
  }

  /**
   * Deselect visit by row index
   */
  async deselectVisitByIndex(index: number): Promise<void> {
    await test.step(`Deselect visit at row index ${index}`, async () => {
      await this.tableRows.nth(index).locator('input[type="checkbox"]').uncheck();
    });
  }

  /**
   * Select all visits
   */
  async selectAllVisits(): Promise<void> {
    await test.step('Select all visits', async () => {
      await this.selectAllCheckbox.check();
    });
  }

  /**
   * Deselect all visits
   */
  async deselectAllVisits(): Promise<void> {
    await test.step('Deselect all visits', async () => {
      await this.selectAllCheckbox.uncheck();
    });
  }

  // ========================
  // Selection Bar Methods
  // ========================

  /**
   * Get selected visits count
   */
  async getSelectedVisitsCount(): Promise<number> {
    return await test.step('Get selected visits count', async () => {
      const text = await this.selectedCountText.locator('..').textContent();
      const match = text?.match(/(\d+)/);

      return match ? parseInt(match[1], 10) : 0;
    });
  }

  /**
   * Check if batch deploy button is enabled
   */
  async isBatchDeployEnabled(): Promise<boolean> {
    return await test.step('Check if batch deploy button is enabled', async () => {
      return await this.batchDeployButton.isEnabled();
    });
  }

  /**
   * Click batch deploy button
   */
  async clickBatchDeploy(): Promise<void> {
    await test.step('Click batch deploy button', async () => {
      await this.batchDeployButton.click();
    });
  }

  // ========================
  // Combined Methods
  // ========================

  /**
   * Apply search filters
   */
  async applyFilters(options: BatchDeploySearchOptions): Promise<void> {
    await test.step('Apply search filters', async () => {
      if (options.subcontractor) {
        await this.selectSubcontractor(options.subcontractor);
      }
      if (options.customer) {
        await this.selectCustomer(options.customer);
      }
      if (options.site) {
        await this.selectSite(options.site);
      }
      if (options.ppmContract) {
        await this.selectPPMContract(options.ppmContract);
      }
      if (options.dateAllocatedStart && options.dateAllocatedEnd) {
        await this.setDateAllocatedRange(options.dateAllocatedStart, options.dateAllocatedEnd);
      }
      if (options.visitDueDateStart && options.visitDueDateEnd) {
        await this.setVisitDueDateRange(options.visitDueDateStart, options.visitDueDateEnd);
      }
      if (options.siteAreas) {
        await this.selectSiteAreas(options.siteAreas);
      }
      if (options.subcontractorAreas) {
        await this.selectSubcontractorAreas(options.subcontractorAreas);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }

  /**
   * Deploy selected visits
   */
  async deploySelectedVisits(): Promise<void> {
    await test.step('Deploy selected visits', async () => {
      if (await this.isBatchDeployEnabled()) {
        await this.clickBatchDeploy();
      }
    });
  }

  /**
   * Select visits and deploy
   */
  async selectAndDeployVisits(indices: number[]): Promise<void> {
    await test.step(`Select visits at indices [${indices.join(', ')}] and deploy`, async () => {
      for (const index of indices) {
        await this.selectVisitByIndex(index);
      }
      await this.clickBatchDeploy();
    });
  }
}
