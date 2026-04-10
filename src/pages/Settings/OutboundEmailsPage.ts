import type { Page, Locator } from '@playwright/test';
import { test } from '@playwright/test';

/**
 * Outbound Emails Page Object
 * URL: /OutboundEmailHistory/OutboundEmails
 * Show all outbound emails
 */
export class OutboundEmailsPage {
  readonly page: Page;

  // Breadcrumb
  readonly settingsLink: Locator;

  // Header
  readonly pageTitle: Locator;

  // Filters
  readonly searchInput: Locator;
  readonly emailTypeDropdown: Locator;
  readonly statusDropdown: Locator;
  readonly sentDateStart: Locator;
  readonly sentDateEnd: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // Results
  readonly dataTable: Locator;
  readonly loadingIndicator: Locator;
  readonly pagination: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Breadcrumb
    this.settingsLink = page.locator('a[href="https://uat.joblogic.com/Setting"]');

    // Header
    this.pageTitle = page.locator('h3:has-text("Outbound Emails")');

    // Filters
    this.searchInput = page.getByPlaceholder('To / Subject');
    this.emailTypeDropdown = page.locator('text=Email Type').locator('..').locator('..').locator('[class*="multiselect"], select');
    this.statusDropdown = page.locator('text=Status').locator('..').locator('..').locator('[class*="multiselect"], select');
    this.sentDateStart = page.getByPlaceholder('Start Date');
    this.sentDateEnd = page.getByPlaceholder('End Date');
    this.resetFilterButton = page.getByRole('button', { name: 'Reset Filter' });
    this.searchButton = page.getByRole('button', { name: 'Search' });

    // Results
    this.dataTable = page.locator('table').first();
    this.loadingIndicator = page.locator('text=Loading Data... Please wait');
    this.pagination = page.locator('nav[aria-label="Page navigation"]');
    this.noResultsMessage = page.locator('text=No matching results found');
  }

  // Navigation
  async navigateToOutboundEmails(): Promise<void> {
    await test.step('Navigate to Outbound Emails page', async () => {
      await this.page.goto('/OutboundEmailHistory/OutboundEmails');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Outbound Emails page is loaded', async () => {
      await this.pageTitle.waitFor({ state: 'visible' });
    });
  }

  async goBackToSettings(): Promise<void> {
    await test.step('Go back to Settings page', async () => {
      await this.settingsLink.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  // Filter Methods
  async search(query: string): Promise<void> {
    await test.step(`Search for "${query}"`, async () => {
      await this.searchInput.fill(query);
    });
  }

  async selectEmailTypes(types: string[]): Promise<void> {
    await test.step(`Select email types: ${types.join(', ')}`, async () => {
      await this.emailTypeDropdown.click();
      for (const type of types) {
        await this.page.locator(`text="${type}"`).click();
      }
      await this.page.keyboard.press('Escape');
    });
  }

  async selectStatuses(statuses: string[]): Promise<void> {
    await test.step(`Select statuses: ${statuses.join(', ')}`, async () => {
      await this.statusDropdown.click();
      for (const status of statuses) {
        await this.page.locator(`text="${status}"`).click();
      }
      await this.page.keyboard.press('Escape');
    });
  }

  async setSentDateRange(startDate: string, endDate: string): Promise<void> {
    await test.step(`Set sent date range: ${startDate} to ${endDate}`, async () => {
      await this.sentDateStart.fill(startDate);
      await this.sentDateEnd.fill(endDate);
    });
  }

  async clickResetFilter(): Promise<void> {
    await test.step('Click Reset Filter button', async () => {
      await this.resetFilterButton.click();
    });
  }

  async clickSearch(): Promise<void> {
    await test.step('Click Search button', async () => {
      await this.searchButton.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async searchAndWait(query: string): Promise<void> {
    await test.step(`Search and wait for "${query}"`, async () => {
      await this.search(query);
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }

  // Results Methods
  async waitForDataLoad(): Promise<void> {
    await test.step('Wait for data to load', async () => {
      await this.loadingIndicator.waitFor({ state: 'hidden', timeout: 30000 });
    });
  }

  async isNoResultsVisible(): Promise<boolean> {
    return await test.step('Check if no results displayed', async () => {
      return await this.noResultsMessage.isVisible();
    });
  }

  async getRowCount(): Promise<number> {
    return await test.step('Get row count', async () => {
      const rows = this.dataTable.locator('tbody tr');

      return await rows.count();
    });
  }

  async clickRowByIndex(index: number): Promise<void> {
    await test.step(`Click row at index ${index}`, async () => {
      const row = this.dataTable.locator('tbody tr').nth(index);

      await row.click();
    });
  }

  // Filter Application
  async applyFilters(options: {
    query?: string;
    emailTypes?: string[];
    statuses?: string[];
    sentDateStart?: string;
    sentDateEnd?: string;
  }): Promise<void> {
    await test.step('Apply Outbound Emails filters', async () => {
      if (options.query) {
        await this.search(options.query);
      }
      if (options.emailTypes && options.emailTypes.length > 0) {
        await this.selectEmailTypes(options.emailTypes);
      }
      if (options.statuses && options.statuses.length > 0) {
        await this.selectStatuses(options.statuses);
      }
      if (options.sentDateStart && options.sentDateEnd) {
        await this.setSentDateRange(options.sentDateStart, options.sentDateEnd);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }
}
