import { Locator, Page } from "@playwright/test";
import { test, expect } from '@playwright/test';
import { BasePage } from "../BasePage";

/**
 * PPM Parts Required search options
 */
export interface PPMPartsSearchOptions {
  query?: string;
  engineer?: string[];
  customer?: string[];
  site?: string[];
  ppmContract?: string[];
  visitDueDateStart?: string;
  visitDueDateEnd?: string;
}

/**
 * PPM Part Required item interface
 */
export interface PPMPartItem {
  partNumber?: string;
  partDescription?: string;
  quantity?: number;
  engineer?: string;
  customer?: string;
  site?: string;
  ppmContract?: string;
  visitDueDate?: string;
}

/**
 * PPMPartsRequiredPage - Page Object for PPM Parts Required page
 * URL: /PPMPartRequired
 */
export class PPMPartsRequiredPage extends BasePage {
  // ========================
  // Locators - Header
  // ========================
  readonly pageTitle: Locator;
  readonly printButton: Locator;
  readonly exportButton: Locator;

  // ========================
  // Locators - Filter
  // ========================
  readonly hideFilterButton: Locator;
  readonly searchInput: Locator;
  readonly engineerDropdown: Locator;
  readonly customerDropdown: Locator;
  readonly siteDropdown: Locator;
  readonly ppmContractDropdown: Locator;
  readonly visitDueDateStartInput: Locator;
  readonly visitDueDateEndInput: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // ========================
  // Locators - Results
  // ========================
  readonly table: Locator;
  readonly tableRows: Locator;
  readonly loadingIndicator: Locator;
  readonly noResultsMessage: Locator;
  readonly pagination: Locator;

  constructor(page: Page) {
    super(page);

    // Header
    this.pageTitle = page.getByRole('heading', { name: 'PPM Parts Required' });
    this.printButton = page.getByRole('button', { name: /Print/ });
    this.exportButton = page.getByRole('button', { name: /Export/ });

    // Filter
    this.hideFilterButton = page.getByRole('button', { name: /Hide Filter/ });
    this.searchInput = page.getByPlaceholder('Part Number / Part Description');
    this.engineerDropdown = page.locator('text=Engineer').locator('..');
    this.customerDropdown = page.locator('text=Customer').locator('..');
    this.siteDropdown = page.locator('text=Site').locator('..');
    this.ppmContractDropdown = page.locator('text=PPM Contract').locator('..');
    this.visitDueDateStartInput = page.locator('text=Visit Due Date').locator('..').getByPlaceholder('Start Date');
    this.visitDueDateEndInput = page.locator('text=Visit Due Date').locator('..').getByPlaceholder('End Date');
    this.resetFilterButton = page.getByRole('button', { name: /Reset Filter/ });
    this.searchButton = page.getByRole('button', { name: /Search/ });

    // Results
    this.table = page.locator('table').first();
    this.tableRows = page.locator('table tbody tr');
    this.loadingIndicator = page.locator('text=Loading Data... Please wait');
    this.noResultsMessage = page.locator('text=No matching results found');
    this.pagination = page.getByRole('navigation', { name: 'Page navigation' });
  }

  // ========================
  // Navigation Methods
  // ========================

  /**
   * Navigate to PPM Parts Required page
   */
  async navigateToPPMPartsRequired(): Promise<void> {
    await test.step('Navigate to PPM Parts Required page', async () => {
      await this.page.goto('/PPMPartRequired');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert PPM Parts Required page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
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
    await test.step('Toggle filter visibility', async () => {
      await this.hideFilterButton.click();
    });
  }

  /**
   * Search parts
   */
  async search(query: string): Promise<void> {
    await test.step(`Search for parts: ${query}`, async () => {
      await this.searchInput.fill(query);
    });
  }

  /**
   * Select engineer filter
   */
  async selectEngineer(engineers: string[]): Promise<void> {
    await test.step(`Select engineers: ${engineers.join(', ')}`, async () => {
      await this.engineerDropdown.click();
      for (const engineer of engineers) {
        await this.page.getByRole('option', { name: new RegExp(engineer, 'i') }).click();
      }
      await this.page.keyboard.press('Escape');
    });
  }

  /**
   * Select customer filter
   */
  async selectCustomer(customers: string[]): Promise<void> {
    await test.step(`Select customers: ${customers.join(', ')}`, async () => {
      await this.customerDropdown.click();
      for (const customer of customers) {
        await this.page.getByRole('option', { name: new RegExp(customer, 'i') }).click();
      }
      await this.page.keyboard.press('Escape');
    });
  }

  /**
   * Select site filter
   */
  async selectSite(sites: string[]): Promise<void> {
    await test.step(`Select sites: ${sites.join(', ')}`, async () => {
      await this.siteDropdown.click();
      for (const site of sites) {
        await this.page.getByRole('option', { name: new RegExp(site, 'i') }).click();
      }
      await this.page.keyboard.press('Escape');
    });
  }

  /**
   * Select PPM contract filter
   */
  async selectPPMContract(contracts: string[]): Promise<void> {
    await test.step(`Select PPM contracts: ${contracts.join(', ')}`, async () => {
      await this.ppmContractDropdown.click();
      for (const contract of contracts) {
        await this.page.getByRole('option', { name: new RegExp(contract, 'i') }).click();
      }
      await this.page.keyboard.press('Escape');
    });
  }

  /**
   * Set visit due date range
   */
  async setVisitDueDateRange(startDate: string, endDate: string): Promise<void> {
    await test.step(`Set visit due date range: ${startDate} - ${endDate}`, async () => {
      await this.visitDueDateStartInput.clear();
      await this.visitDueDateStartInput.fill(startDate);
      await this.visitDueDateEndInput.clear();
      await this.visitDueDateEndInput.fill(endDate);
    });
  }

  /**
   * Get start date value
   */
  async getStartDate(): Promise<string> {
    return await test.step('Get start date value', async () => {
      return await this.visitDueDateStartInput.inputValue();
    });
  }

  /**
   * Get end date value
   */
  async getEndDate(): Promise<string> {
    return await test.step('Get end date value', async () => {
      return await this.visitDueDateEndInput.inputValue();
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
   * Check if loading
   */
  async isLoading(): Promise<boolean> {
    return await test.step('Check if loading', async () => {
      return await this.loadingIndicator.isVisible();
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
   * Click part by part number
   */
  async clickPartByNumber(partNumber: string): Promise<void> {
    await test.step(`Click part with number: ${partNumber}`, async () => {
      await this.page.locator(`text=${partNumber}`).first().click();
    });
  }

  // ========================
  // Combined Methods
  // ========================

  /**
   * Apply search filters
   */
  async applyFilters(options: PPMPartsSearchOptions): Promise<void> {
    await test.step('Apply search filters', async () => {
      if (options.query) {
        await this.search(options.query);
      }
      if (options.engineer) {
        await this.selectEngineer(options.engineer);
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
      if (options.visitDueDateStart && options.visitDueDateEnd) {
        await this.setVisitDueDateRange(options.visitDueDateStart, options.visitDueDateEnd);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }

  /**
   * Get all visible part items
   */
  async getAllVisibleItems(): Promise<PPMPartItem[]> {
    return await test.step('Get all visible part items', async () => {
      await this.waitForDataLoad();
      const count = await this.tableRows.count();
      const items: PPMPartItem[] = [];

      for (let i = 0; i < count; i++) {
        const row = this.tableRows.nth(i);
        const cells = row.locator('td');
        
        items.push({
          partNumber: await cells.nth(0).textContent() || '',
          partDescription: await cells.nth(1).textContent() || '',
          quantity: parseInt(await cells.nth(2).textContent() || '0', 10),
        });
      }

      return items;
    });
  }
}
