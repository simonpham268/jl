import type { Page, Locator } from '@playwright/test';
import { test } from '@playwright/test';

/**
 * Staff (Users) Page Object
 * URL: /Staff
 * View existing users and add new users
 */
export class StaffPage {
  readonly page: Page;

  // Breadcrumb
  readonly settingsLink: Locator;

  // Header
  readonly pageTitle: Locator;

  // Actions
  readonly userAccessLogLink: Locator;
  readonly addUserLink: Locator;
  readonly engineerTeamsLink: Locator;
  readonly manageUserRolesLink: Locator;
  readonly importUsersButton: Locator;
  readonly printButton: Locator;
  readonly exportLink: Locator;

  // Filter
  readonly searchInput: Locator;
  readonly includeInactiveCheckbox: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // Results
  readonly staffListHeading: Locator;
  readonly columnSettingsButton: Locator;
  readonly dataTable: Locator;
  readonly loadingIndicator: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Breadcrumb
    this.settingsLink = page.locator('a[href="https://uat.joblogic.com/Setting"]');

    // Header
    this.pageTitle = page.locator('h3:has-text("Users")');

    // Actions
    this.userAccessLogLink = page.locator('a[href="/Staff/UserAccessLog"]');
    this.addUserLink = page.locator('a[href="/Staff/CreateUser"]');
    this.engineerTeamsLink = page.locator('a[href="/EngineerTeam"]');
    this.manageUserRolesLink = page.locator('a[href="/Staff/ManageUserRole"]');
    this.importUsersButton = page.locator('text=Import Users');
    this.printButton = page.locator('text=Print').first();
    this.exportLink = page.locator('a[href="/Staff/Export"]');

    // Filter
    this.searchInput = page.getByPlaceholder('Search Name / Email / Address');
    this.includeInactiveCheckbox = page.locator('text=Include Inactive');
    this.resetFilterButton = page.getByRole('button', { name: 'Reset Filter' });
    this.searchButton = page.getByRole('button', { name: 'Search' });

    // Results
    this.staffListHeading = page.locator('h3:has-text("Staff list")');
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
  async navigateToStaff(): Promise<void> {
    await test.step('Navigate to Staff page', async () => {
      await this.page.goto('/Staff');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Staff page is loaded', async () => {
      await this.pageTitle.waitFor({ state: 'visible' });
    });
  }

  async goBackToSettings(): Promise<void> {
    await test.step('Go back to Settings page', async () => {
      await this.settingsLink.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  // Actions
  async clickUserAccessLog(): Promise<void> {
    await test.step('Click User Access Log link', async () => {
      await this.userAccessLogLink.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickAddUser(): Promise<void> {
    await test.step('Click Add User link', async () => {
      await this.addUserLink.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickEngineerTeams(): Promise<void> {
    await test.step('Click Engineer Teams link', async () => {
      await this.engineerTeamsLink.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickManageUserRoles(): Promise<void> {
    await test.step('Click Manage User Roles link', async () => {
      await this.manageUserRolesLink.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async clickImportUsers(): Promise<void> {
    await test.step('Click Import Users button', async () => {
      await this.importUsersButton.click();
    });
  }

  async clickPrint(): Promise<void> {
    await test.step('Click Print button', async () => {
      await this.printButton.click();
    });
  }

  async clickExport(): Promise<void> {
    await test.step('Click Export link', async () => {
      await this.exportLink.click();
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

  async clickUserByName(name: string): Promise<void> {
    await test.step(`Click user "${name}"`, async () => {
      await this.getRowByName(name).click();
    });
  }

  // Filter Application
  async applyFilters(options: {
    query?: string;
    includeInactive?: boolean;
  }): Promise<void> {
    await test.step('Apply Staff filters', async () => {
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
