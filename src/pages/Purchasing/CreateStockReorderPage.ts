import { Locator, Page } from "@playwright/test";
import { test, expect } from '@playwright/test';
import { BasePage } from "../BasePage";
import { StockReorderData } from '../../data/testData/stockReorder.data';

/**
 * Stock item for reorder
 */
export interface StockReorderItem {
  stockNumber?: string;
  description?: string;
  reference?: string;
  location?: string;
  currentStock?: number;
  reorderLevel?: number;
  reorderQty?: number;
}

/**
 * Stock reorder search options
 */
export interface StockReorderSearchOptions {
  query?: string;
  locations?: string[];
}

/**
 * CreateStockReorderPage - Page Object for Create Stock Reorder page
 * URL: /StockPurchaseOrder/AutoStockReorder
 * This is a multi-step wizard: Step 1 - Select Stock, Step 2 - Supplier Information
 */
export class CreateStockReorderPage extends BasePage {
  // ========================
  // Locators - Header
  // ========================
  readonly pageTitle: Locator;

  // ========================
  // Locators - Step Indicators
  // ========================
  readonly step1Indicator: Locator;
  readonly step2Indicator: Locator;

  // ========================
  // Locators - Step 1: Search Filter
  // ========================
  readonly searchStockInput: Locator;
  readonly locationDropdown: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // ========================
  // Locators - Step 1: Stock List
  // ========================
  readonly stockListHeading: Locator;
  readonly showSelectedOnlyToggle: Locator;
  readonly stockTable: Locator;
  readonly stockTableRows: Locator;
  readonly noResultsMessage: Locator;

  // ========================
  // Locators - Navigation Buttons
  // ========================
  readonly cancelButton: Locator;
  readonly nextButton: Locator;
  readonly backButton: Locator;
  readonly createPOButton: Locator;

  constructor(page: Page) {
    super(page);

    // Header
    this.pageTitle = page.getByRole('heading', { name: 'Create Stock Reorder' });

    // Step Indicators
    this.step1Indicator = page.locator('text=Select Stock to Reorder');
    this.step2Indicator = page.locator('text=Supplier Information');

    // Step 1: Search Filter
    this.searchStockInput = page.getByPlaceholder('Number / Description / Reference');
    this.locationDropdown = page.locator('text=Location(s)').locator('..');
    this.resetFilterButton = page.getByRole('button', { name: /Reset Filter/ });
    this.searchButton = page.getByRole('button', { name: /Search/ });

    // Step 1: Stock List
    this.stockListHeading = page.getByRole('heading', { name: /Stock List/ });
    this.showSelectedOnlyToggle = page.locator('text=Show selected Stock(s) only').locator('..');
    this.stockTable = page.locator('table').first();
    this.stockTableRows = page.locator('table tbody tr');
    this.noResultsMessage = page.locator('text=No matching results found');

    // Navigation Buttons
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.nextButton = page.getByRole('button', { name: /Next/ });
    this.backButton = page.getByRole('button', { name: /Back/ });
    this.createPOButton = page.getByRole('button', { name: /Create PO/ });
  }

  // ========================
  // Navigation Methods
  // ========================

  /**
   * Navigate to Create Stock Reorder page
   */
  async navigateToCreateStockReorder(): Promise<void> {
    await test.step('Navigate to Create Stock Reorder page', async () => {
      await this.page.goto('/StockPurchaseOrder/AutoStockReorder');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Create Stock Reorder page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
    });
  }

  // ========================
  // Step 1: Filter Methods
  // ========================

  /**
   * Search stock records
   */
  async searchStock(query: string): Promise<void> {
    await test.step(`Search stock records: ${query}`, async () => {
      await this.searchStockInput.fill(query);
    });
  }

  /**
   * Select locations
   */
  async selectLocations(locations: string[]): Promise<void> {
    await test.step(`Select locations: ${locations.join(', ')}`, async () => {
      await this.locationDropdown.click();
      for (const location of locations) {
        await this.page.getByRole('option', { name: new RegExp(location, 'i') }).click();
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
  async searchAndWait(options?: StockReorderSearchOptions): Promise<void> {
    await test.step('Search and wait for stock results', async () => {
      if (options?.query) {
        await this.searchStock(options.query);
      }
      if (options?.locations) {
        await this.selectLocations(options.locations);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }

  // ========================
  // Step 1: Stock List Methods
  // ========================

  /**
   * Wait for data to load
   */
  async waitForDataLoad(): Promise<void> {
    await test.step('Wait for data to load', async () => {
      await this.page.waitForTimeout(1000);
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
   * Get stock row count
   */
  async getStockRowCount(): Promise<number> {
    return await test.step('Get stock row count', async () => {
      await this.waitForDataLoad();
      if (await this.isNoResultsVisible()) {
        return 0;
      }
      return await this.stockTableRows.count();
    });
  }

  /**
   * Toggle show selected only
   */
  async toggleShowSelectedOnly(): Promise<void> {
    await test.step('Toggle show selected only', async () => {
      await this.showSelectedOnlyToggle.click();
    });
  }

  /**
   * Select stock by row index
   */
  async selectStockByIndex(index: number): Promise<void> {
    await test.step(`Select stock at row index ${index}`, async () => {
      await this.stockTableRows.nth(index).locator('input[type="checkbox"]').check();
    });
  }

  /**
   * Deselect stock by row index
   */
  async deselectStockByIndex(index: number): Promise<void> {
    await test.step(`Deselect stock at row index ${index}`, async () => {
      await this.stockTableRows.nth(index).locator('input[type="checkbox"]').uncheck();
    });
  }

  // ========================
  // Navigation Button Methods
  // ========================

  /**
   * Click cancel button
   */
  async clickCancel(): Promise<void> {
    await test.step('Click cancel button', async () => {
      await this.cancelButton.click();
    });
  }

  /**
   * Click next button
   */
  async clickNext(): Promise<void> {
    await test.step('Click next button', async () => {
      await this.nextButton.click();
    });
  }

  /**
   * Check if next button is enabled
   */
  async isNextEnabled(): Promise<boolean> {
    return await test.step('Check if next button is enabled', async () => {
      return await this.nextButton.isEnabled();
    });
  }

  /**
   * Click back button
   */
  async clickBack(): Promise<void> {
    await test.step('Click back button', async () => {
      await this.backButton.click();
    });
  }

  /**
   * Click create PO button
   */
  async clickCreatePO(): Promise<void> {
    await test.step('Click create PO button', async () => {
      await this.createPOButton.click();
    });
  }

  // ========================
  // Combined Methods
  // ========================

  /**
   * Select stocks and proceed to next step
   */
  async selectStocksAndProceed(indices: number[]): Promise<void> {
    await test.step(`Select stocks at indices [${indices.join(', ')}] and proceed`, async () => {
      for (const index of indices) {
        await this.selectStockByIndex(index);
      }
      await this.clickNext();
    });
  }

  // ========================
  // High-Level Methods (Data Builder Pattern)
  // ========================

  /**
   * Fill the Stock Reorder form with data (does not create PO)
   * Use this when you need to search and select stocks but not submit yet
   * @param data - StockReorderData object from builder
   */
  async fillNewStockReorderForm(data: StockReorderData): Promise<void> {
    await test.step('Fill new Stock Reorder form', async () => {
      if (data.searchQuery) await this.searchStock(data.searchQuery);
      if (data.locations && data.locations.length > 0) await this.selectLocations(data.locations);
      
      if (data.searchQuery || data.locations) {
        await this.clickSearch();
        await this.waitForDataLoad();
      }
      
      for (const index of data.stockIndices) {
        await this.selectStockByIndex(index);
      }
    });
  }

  /**
   * Create a new Stock Reorder with the provided data
   * Searches, selects stocks, proceeds to next step 
   * @param data - StockReorderData object from builder
   */
  async createNewStockReorder(data: StockReorderData): Promise<void> {
    await test.step('Create new Stock Reorder', async () => {
      await this.fillNewStockReorderForm(data);
      await this.clickNext();
    });
  }
}
