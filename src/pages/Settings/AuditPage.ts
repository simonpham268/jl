import { Page, Locator } from '@playwright/test';
import { test } from '@playwright/test';

/**
 * Audit Page Object
 * URL: /Audit
 * View Audit information for detailed reports on user actions
 */
export class AuditPage {
  readonly page: Page;

  // Breadcrumb
  readonly settingsLink: Locator;

  // Header
  readonly pageTitle: Locator;

  // Filters
  readonly auditTypeDropdown: Locator;
  readonly actionDropdown: Locator;
  readonly operationTimeStart: Locator;
  readonly operationTimeEnd: Locator;
  readonly auditEntryUserDropdown: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // Results
  readonly dataTable: Locator;
  readonly loadingIndicator: Locator;

  constructor(page: Page) {
    this.page = page;

    // Breadcrumb
    this.settingsLink = page.locator('a[href="https://uat.joblogic.com/Setting"]');

    // Header
    this.pageTitle = page.locator('h3:has-text("Audit")');

    // Filters
    this.auditTypeDropdown = page.locator('text=Audit Type').locator('..').locator('..').locator('[class*="multiselect"]');
    this.actionDropdown = page.locator('text=Action').locator('..').locator('..').locator('[class*="multiselect"]');
    this.operationTimeStart = page.getByPlaceholder('Start Date');
    this.operationTimeEnd = page.getByPlaceholder('End Date');
    this.auditEntryUserDropdown = page.locator('text=Audit Entry User').locator('..').locator('..').locator('[class*="multiselect"]');
    this.resetFilterButton = page.getByRole('button', { name: 'Reset Filter' });
    this.searchButton = page.getByRole('button', { name: 'Search' });

    // Results
    this.dataTable = page.locator('table').first();
    this.loadingIndicator = page.locator('text=Loading Data... Please wait');
  }

  // Navigation
  async navigateToAudit(): Promise<void> {
    await test.step('Navigate to Audit page', async () => {
      await this.page.goto('/Audit');
      await this.page.waitForLoadState('networkidle');
    });
  }

  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Audit page is loaded', async () => {
      await this.pageTitle.waitFor({ state: 'visible' });
    });
  }

  async goBackToSettings(): Promise<void> {
    await test.step('Go back to Settings page', async () => {
      await this.settingsLink.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  // Filter Methods
  async selectAuditTypes(types: string[]): Promise<void> {
    await test.step(`Select audit types: ${types.join(', ')}`, async () => {
      await this.auditTypeDropdown.click();
      for (const type of types) {
        await this.page.locator(`text="${type}"`).click();
      }
      await this.page.keyboard.press('Escape');
    });
  }

  async selectActions(actions: string[]): Promise<void> {
    await test.step(`Select actions: ${actions.join(', ')}`, async () => {
      await this.actionDropdown.click();
      for (const action of actions) {
        await this.page.locator(`text="${action}"`).click();
      }
      await this.page.keyboard.press('Escape');
    });
  }

  async setOperationTimeRange(startDate: string, endDate: string): Promise<void> {
    await test.step(`Set operation time range: ${startDate} to ${endDate}`, async () => {
      await this.operationTimeStart.fill(startDate);
      await this.operationTimeEnd.fill(endDate);
    });
  }

  async selectAuditEntryUsers(users: string[]): Promise<void> {
    await test.step(`Select audit entry users: ${users.join(', ')}`, async () => {
      await this.auditEntryUserDropdown.click();
      for (const user of users) {
        await this.page.locator(`text="${user}"`).click();
      }
      await this.page.keyboard.press('Escape');
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
      await this.page.waitForLoadState('networkidle');
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
      const noResults = this.page.locator('text=No matching results found');
      return await noResults.isVisible();
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
    auditTypes?: string[];
    actions?: string[];
    operationTimeStart?: string;
    operationTimeEnd?: string;
    auditEntryUsers?: string[];
  }): Promise<void> {
    await test.step('Apply Audit filters', async () => {
      if (options.auditTypes && options.auditTypes.length > 0) {
        await this.selectAuditTypes(options.auditTypes);
      }
      if (options.actions && options.actions.length > 0) {
        await this.selectActions(options.actions);
      }
      if (options.operationTimeStart && options.operationTimeEnd) {
        await this.setOperationTimeRange(options.operationTimeStart, options.operationTimeEnd);
      }
      if (options.auditEntryUsers && options.auditEntryUsers.length > 0) {
        await this.selectAuditEntryUsers(options.auditEntryUsers);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }
}
