import type { Page, Locator } from '@playwright/test';
import { test } from '@playwright/test';

/**
 * Portal Users Page Object
 * URL: /Portal
 * Add a customer or site user, and view current user details
 */
export class PortalUsersPage {
  readonly page: Page;

  // Breadcrumb
  readonly settingsLink: Locator;

  // Header
  readonly pageTitle: Locator;

  // Actions
  readonly addPortalUsersLink: Locator;
  readonly managePortalRolesLink: Locator;
  readonly importPortalUsersButton: Locator;
  readonly printButton: Locator;
  readonly exportButton: Locator;

  // Filters
  readonly searchInput: Locator;
  readonly assignedRolesDropdown: Locator;
  readonly includeInactiveCheckbox: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // Results
  readonly dataTable: Locator;
  readonly loadingIndicator: Locator;
  readonly columnSettingsButton: Locator;
  readonly pagination: Locator;

  constructor(page: Page) {
    this.page = page;

    // Breadcrumb
    this.settingsLink = page.locator('a[href="https://uat.joblogic.com/Setting"]');

    // Header
    this.pageTitle = page.locator('h3:has-text("Portal Users")');

    // Actions
    this.addPortalUsersLink = page.locator('a[href="/Portal/Create?type=CUSTOMER"]');
    this.managePortalRolesLink = page.locator('a[href="/Portal/Role"]');
    this.importPortalUsersButton = page.locator('text=Import Portal Users');
    this.printButton = page.locator('text=Print').first();
    this.exportButton = page.locator('text=Export');

    // Filters
    this.searchInput = page.getByPlaceholder('Search Name / Email');
    this.assignedRolesDropdown = page.locator('text=Assigned Roles').locator('..').locator('listbox');
    this.includeInactiveCheckbox = page.locator('text=Include Inactive');
    this.resetFilterButton = page.getByRole('button', { name: 'Reset Filter' });
    this.searchButton = page.getByRole('button', { name: 'Search' });

    // Results
    this.dataTable = page.locator('table').first();
    this.loadingIndicator = page.locator('text=Loading Data... Please wait');
    this.columnSettingsButton = page.locator('button').filter({ hasText: '' }).first();
    this.pagination = page.locator('nav[aria-label="Page navigation"]');
  }

  // Navigation
  async navigateToPortalUsers(): Promise<void> {
    await test.step('Navigate to Portal Users page', async () => {
      await this.page.goto('/Portal');
      await this.page.waitForLoadState('networkidle');
    });
  }

  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Portal Users page is loaded', async () => {
      await this.pageTitle.waitFor({ state: 'visible' });
    });
  }

  async goBackToSettings(): Promise<void> {
    await test.step('Go back to Settings page', async () => {
      await this.settingsLink.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  // Actions
  async clickAddPortalUsers(): Promise<void> {
    await test.step('Click Add Portal Users link', async () => {
      await this.addPortalUsersLink.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  async clickManagePortalRoles(): Promise<void> {
    await test.step('Click Manage Portal Roles link', async () => {
      await this.managePortalRolesLink.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  async clickImportPortalUsers(): Promise<void> {
    await test.step('Click Import Portal Users button', async () => {
      await this.importPortalUsersButton.click();
    });
  }

  async clickPrint(): Promise<void> {
    await test.step('Click Print button', async () => {
      await this.printButton.click();
    });
  }

  async clickExport(): Promise<void> {
    await test.step('Click Export button', async () => {
      await this.exportButton.click();
    });
  }

  // Filter Methods
  async search(query: string): Promise<void> {
    await test.step(`Search for "${query}"`, async () => {
      await this.searchInput.fill(query);
    });
  }

  async selectAssignedRoles(roles: string[]): Promise<void> {
    await test.step(`Select assigned roles: ${roles.join(', ')}`, async () => {
      await this.assignedRolesDropdown.click();
      for (const role of roles) {
        await this.page.locator(`text="${role}"`).click();
      }
      await this.page.keyboard.press('Escape');
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
      await this.page.waitForLoadState('networkidle');
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

  async clickUserByName(name: string): Promise<void> {
    await test.step(`Click user "${name}"`, async () => {
      const row = this.page.locator(`tr:has-text("${name}")`);

      await row.click();
    });
  }

  // Filter Application
  async applyFilters(options: {
    query?: string;
    assignedRoles?: string[];
    includeInactive?: boolean;
  }): Promise<void> {
    await test.step('Apply Portal Users filters', async () => {
      if (options.query) {
        await this.search(options.query);
      }
      if (options.assignedRoles && options.assignedRoles.length > 0) {
        await this.selectAssignedRoles(options.assignedRoles);
      }
      if (options.includeInactive !== undefined) {
        await this.setIncludeInactive(options.includeInactive);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }
}
