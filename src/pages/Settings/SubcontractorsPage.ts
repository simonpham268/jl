import type { Page, Locator } from '@playwright/test';
import { test } from '@playwright/test';

/**
 * Subcontractors Page Object
 * URL: /Subcontractor
 * View existing subcontractors and add new
 */
export class SubcontractorsPage {
  readonly page: Page;

  // Breadcrumb
  readonly settingsLink: Locator;

  // Tabs
  readonly subcontractorsTab: Locator;
  readonly subcontractorTemplateTab: Locator;

  // Header
  readonly pageTitle: Locator;

  // Actions
  readonly addSubcontractorButton: Locator;
  readonly importButton: Locator;

  // Filter
  readonly searchInput: Locator;
  readonly includeInactiveCheckbox: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // Results
  readonly subcontractorListHeading: Locator;
  readonly columnSettingsButton: Locator;
  readonly dataTable: Locator;
  readonly loadingIndicator: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Breadcrumb
    this.settingsLink = page.locator('a[href="https://uat.joblogic.com/Setting"]');

    // Tabs
    this.subcontractorsTab = page.locator('a[href="#subcontractorsTab"]');
    this.subcontractorTemplateTab = page.locator('a[href="#subcontractorTemplateTab"]');

    // Header
    this.pageTitle = page.locator('h3:has-text("Subcontractors")');

    // Actions
    this.addSubcontractorButton = page.locator('text=Add Subcontractor');
    this.importButton = page.locator('text=Import').first();

    // Filter
    this.searchInput = page.getByPlaceholder('Name / Address / Account No.');
    this.includeInactiveCheckbox = page.locator('text=Include Inactive');
    this.resetFilterButton = page.getByRole('button', { name: 'Reset Filter' });
    this.searchButton = page.getByRole('button', { name: 'Search' });

    // Results
    this.subcontractorListHeading = page.locator('h3:has-text("Subcontractor list")');
    this.columnSettingsButton = page.locator('button').filter({ hasText: '' }).first();
    this.dataTable = page.locator('table').first();
    this.loadingIndicator = page.locator('text=Loading Data... Please wait');
    this.noResultsMessage = page.locator('text=No matching results found');
  }

  // ========================
  // Private Helper Methods
  // ========================

  /**
   * Get row locator by name (dynamic locator)
   */
  private getRowByName(name: string): Locator {
    return this.page.locator(`tr:has-text("${name}")`);
  }

  // Navigation
  async navigateToSubcontractors(): Promise<void> {
    await test.step('Navigate to Subcontractors page', async () => {
      await this.page.goto('/Subcontractor');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Subcontractors page is loaded', async () => {
      await this.pageTitle.waitFor({ state: 'visible' });
    });
  }

  async goBackToSettings(): Promise<void> {
    await test.step('Go back to Settings page', async () => {
      await this.settingsLink.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  // Tab Navigation
  async switchToSubcontractorsTab(): Promise<void> {
    await test.step('Switch to Subcontractors tab', async () => {
      await this.subcontractorsTab.click();
    });
  }

  async switchToSubcontractorTemplateTab(): Promise<void> {
    await test.step('Switch to Subcontractor Template tab', async () => {
      await this.subcontractorTemplateTab.click();
    });
  }

  // Actions
  async clickAddSubcontractor(): Promise<void> {
    await test.step('Click Add Subcontractor button', async () => {
      await this.addSubcontractorButton.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickImport(): Promise<void> {
    await test.step('Click Import button', async () => {
      await this.importButton.click();
    });
  }

  // Filter Methods
  async search(query: string): Promise<void> {
    await test.step(`Search for "${query}"`, async () => {
      await this.searchInput.fill(query);
    });
  }

  async toggleIncludeInactive(): Promise<void> {
    await test.step('Toggle Include Inactive checkbox', async () => {
      await this.includeInactiveCheckbox.click();
    });
  }

  async setIncludeInactive(checked: boolean): Promise<void> {
    await test.step(`Set Include Inactive to ${checked}`, async () => {
      const checkbox = this.includeInactiveCheckbox.locator('input[type="checkbox"]');

      if (checked) {
        await checkbox.check();
      } else {
        await checkbox.uncheck();
      }
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

  async clickSubcontractorByName(name: string): Promise<void> {
    await test.step(`Click subcontractor "${name}"`, async () => {
      await this.getRowByName(name).click();
    });
  }

  // Filter Application
  async applyFilters(options: {
    query?: string;
    includeInactive?: boolean;
  }): Promise<void> {
    await test.step('Apply Subcontractors filters', async () => {
      if (options.query) {
        await this.search(options.query);
      }
      if (options.includeInactive !== undefined) {
        await this.setIncludeInactive(options.includeInactive);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }
}
