import { Locator, Page } from "@playwright/test";
import { test, expect } from '@playwright/test';
import { BasePage } from "../BasePage";

/**
 * Engineer item interface
 */
export interface EngineerItem {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  team?: string;
  status?: string;
}

/**
 * Engineer search options
 */
export interface EngineerSearchOptions {
  query?: string;
  team?: string[];
  status?: string[];
}

/**
 * EngineersListPage - Page Object for Engineers List page
 * URL: /Staff/Engineers
 */
export class EngineersListPage extends BasePage {
  // ========================
  // Locators - Header/Actions
  // ========================
  readonly pageTitle: Locator;
  readonly addEngineerButton: Locator;
  readonly engineerTeamsButton: Locator;
  readonly importUsersButton: Locator;
  readonly printButton: Locator;
  readonly exportButton: Locator;

  // ========================
  // Locators - Filter
  // ========================
  readonly searchInput: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // ========================
  // Locators - Results
  // ========================
  readonly staffListHeading: Locator;
  readonly table: Locator;
  readonly tableRows: Locator;
  readonly loadingIndicator: Locator;
  readonly noResultsMessage: Locator;
  readonly pagination: Locator;

  constructor(page: Page) {
    super(page);

    // Header/Actions
    this.pageTitle = page.getByRole('heading', { name: 'Engineers' });
    this.addEngineerButton = page.getByRole('link', { name: /Add Engineer/ });
    this.engineerTeamsButton = page.getByRole('link', { name: /Engineer Teams/ });
    this.importUsersButton = page.locator('text=Import Users');
    this.printButton = page.locator('text=Print');
    this.exportButton = page.getByRole('link', { name: /Export/ });

    // Filter
    this.searchInput = page.getByPlaceholder('Search Name / Email / Address');
    this.resetFilterButton = page.getByRole('button', { name: /Reset Filter/ });
    this.searchButton = page.getByRole('button', { name: /Search/ });

    // Results
    this.staffListHeading = page.getByRole('heading', { name: 'Staff list' });
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
   * Navigate to Engineers List page
   */
  async navigateToEngineersList(): Promise<void> {
    await test.step('Navigate to Engineers List page', async () => {
      await this.page.goto('/Staff/Engineers');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Engineers List page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
    });
  }

  /**
   * Click Add Engineer button
   */
  async clickAddEngineer(): Promise<void> {
    await test.step('Click Add Engineer button', async () => {
      await this.addEngineerButton.click();
    });
  }

  /**
   * Click Engineer Teams button
   */
  async clickEngineerTeams(): Promise<void> {
    await test.step('Click Engineer Teams button', async () => {
      await this.engineerTeamsButton.click();
    });
  }

  /**
   * Click Import Users button
   */
  async clickImportUsers(): Promise<void> {
    await test.step('Click Import Users button', async () => {
      await this.importUsersButton.click();
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
   * Search engineers
   */
  async search(query: string): Promise<void> {
    await test.step(`Search engineers: ${query}`, async () => {
      await this.searchInput.fill(query);
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
   * Click engineer by name
   */
  async clickEngineerByName(name: string): Promise<void> {
    await test.step(`Click engineer: ${name}`, async () => {
      await this.page.locator(`text=${name}`).first().click();
    });
  }

  // ========================
  // Combined Methods
  // ========================

  /**
   * Apply search filters
   */
  async applyFilters(options: EngineerSearchOptions): Promise<void> {
    await test.step('Apply search filters', async () => {
      if (options.query) {
        await this.search(options.query);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }
}
