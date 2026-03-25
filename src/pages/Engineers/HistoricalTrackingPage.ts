import { Locator, Page } from "@playwright/test";
import { test, expect } from '@playwright/test';
import { BasePage } from "../BasePage";

/**
 * HistoricalTrackingPage - Page Object for Historical Tracking page
 * URL: /EngineerTracking/Historical
 */
export class HistoricalTrackingPage extends BasePage {
  // ========================
  // Locators - Header
  // ========================
  readonly pageTitle: Locator;

  // ========================
  // Locators - Filter
  // ========================
  readonly engineerDropdown: Locator;
  readonly dateInput: Locator;
  readonly searchButton: Locator;
  readonly resetFilterButton: Locator;

  // ========================
  // Locators - Map/Content
  // ========================
  readonly mapContainer: Locator;
  readonly loadingIndicator: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Header
    this.pageTitle = page.getByRole('heading', { name: /Historical Tracking|Engineer Tracking/ });

    // Filter
    this.engineerDropdown = page.locator('text=Engineer').locator('..');
    this.dateInput = page.getByPlaceholder('DD/MM/YYYY');
    this.searchButton = page.getByRole('button', { name: /Search/ });
    this.resetFilterButton = page.getByRole('button', { name: /Reset Filter/ });

    // Map/Content
    this.mapContainer = page.locator('[id*="map"], [class*="map"]').first();
    this.loadingIndicator = page.locator('text=Loading');
    this.noResultsMessage = page.locator('text=No tracking data found');
  }

  // ========================
  // Navigation Methods
  // ========================

  /**
   * Navigate to Historical Tracking page
   */
  async navigateToHistoricalTracking(): Promise<void> {
    await test.step('Navigate to Historical Tracking page', async () => {
      await this.page.goto('/EngineerTracking/Historical');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Historical Tracking page is loaded', async () => {
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  // ========================
  // Filter Methods
  // ========================

  /**
   * Select engineer
   */
  async selectEngineer(engineerName: string): Promise<void> {
    await test.step(`Select engineer: ${engineerName}`, async () => {
      await this.engineerDropdown.click();
      await this.page.getByRole('option', { name: new RegExp(engineerName, 'i') }).click();
    });
  }

  /**
   * Set date
   */
  async setDate(date: string): Promise<void> {
    await test.step(`Set date: ${date}`, async () => {
      await this.dateInput.fill(date);
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
   * Click reset filter
   */
  async clickResetFilter(): Promise<void> {
    await test.step('Click reset filter', async () => {
      await this.resetFilterButton.click();
    });
  }

  /**
   * Search tracking data
   */
  async searchTrackingData(engineerName: string, date: string): Promise<void> {
    await test.step(`Search tracking data for ${engineerName} on ${date}`, async () => {
      await this.selectEngineer(engineerName);
      await this.setDate(date);
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }

  // ========================
  // Data Methods
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
}
