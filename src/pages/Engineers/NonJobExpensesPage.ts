import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Non Job Expense item interface
 */
export interface NonJobExpenseItem {
  description?: string;
  engineer?: string;
  dateIncurred?: string;
  dateRaised?: string;
  amount?: string;
  status?: string;
}

/**
 * Non Job Expense search options
 */
export interface NonJobExpenseSearchOptions {
  query?: string;
  dateIncurred?: string;
  dateRaised?: string;
}

/**
 * NonJobExpensesPage - Page Object for Non Job Expenses page
 * URL: /NonJobExpense
 */
export class NonJobExpensesPage extends BasePage {
  // ========================
  // Locators - Header/Actions
  // ========================
  readonly pageTitle: Locator;
  readonly addNonJobExpenseButton: Locator;
  readonly printButton: Locator;
  readonly exportButton: Locator;

  // ========================
  // Locators - Filter
  // ========================
  readonly searchInput: Locator;
  readonly dateIncurredInput: Locator;
  readonly dateRaisedInput: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // ========================
  // Locators - Results
  // ========================
  readonly listHeading: Locator;
  readonly table: Locator;
  readonly tableRows: Locator;
  readonly loadingIndicator: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Header/Actions
    this.pageTitle = page.getByRole('heading', { name: 'Non Job Expenses' });
    this.addNonJobExpenseButton = page.locator('text=Add Non Job Expense');
    this.printButton = page.locator('text=Print');
    this.exportButton = page.locator('text=Export');

    // Filter
    this.searchInput = page.getByPlaceholder('Description / Engineer');
    this.dateIncurredInput = page.locator('text=Date Incurred').locator('..').getByPlaceholder('DD/MM/YYYY');
    this.dateRaisedInput = page.locator('text=Date Raised').locator('..').getByPlaceholder('DD/MM/YYYY');
    this.resetFilterButton = page.getByRole('button', { name: /Reset Filter/ });
    this.searchButton = page.getByRole('button', { name: /Search/ });

    // Results
    this.listHeading = page.getByRole('heading', { name: 'Non Job Expenses List' });
    this.table = page.locator('table').first();
    this.tableRows = page.locator('table tbody tr');
    this.loadingIndicator = page.locator('text=Loading');
    this.noResultsMessage = page.locator('text=No matching results found');
  }

  // ========================
  // Navigation Methods
  // ========================

  /**
   * Navigate to Non Job Expenses page
   */
  async navigateToNonJobExpenses(): Promise<void> {
    await test.step('Navigate to Non Job Expenses page', async () => {
      await this.page.goto('/NonJobExpense');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Non Job Expenses page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
    });
  }

  /**
   * Click Add Non Job Expense button
   */
  async clickAddNonJobExpense(): Promise<void> {
    await test.step('Click Add Non Job Expense button', async () => {
      await this.addNonJobExpenseButton.click();
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
   * Search expenses
   */
  async search(query: string): Promise<void> {
    await test.step(`Search expenses: ${query}`, async () => {
      await this.searchInput.fill(query);
    });
  }

  /**
   * Set date incurred
   */
  async setDateIncurred(date: string): Promise<void> {
    await test.step(`Set date incurred: ${date}`, async () => {
      await this.dateIncurredInput.fill(date);
    });
  }

  /**
   * Set date raised
   */
  async setDateRaised(date: string): Promise<void> {
    await test.step(`Set date raised: ${date}`, async () => {
      await this.dateRaisedInput.fill(date);
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

  // ========================
  // Combined Methods
  // ========================

  /**
   * Apply search filters
   */
  async applyFilters(options: NonJobExpenseSearchOptions): Promise<void> {
    await test.step('Apply search filters', async () => {
      if (options.query) {
        await this.search(options.query);
      }
      if (options.dateIncurred) {
        await this.setDateIncurred(options.dateIncurred);
      }
      if (options.dateRaised) {
        await this.setDateRaised(options.dateRaised);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }
}
