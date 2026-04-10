import type { Page, Locator } from '@playwright/test';
import { test } from '@playwright/test';

/**
 * Electronic Forms Page Object
 * URL: /CompanyForm
 * Find eforms by industry or search term, add custom forms
 */
export class ElectronicFormsPage {
  readonly page: Page;

  // Breadcrumb
  readonly settingsLink: Locator;

  // Tabs
  readonly electronicFormsTab: Locator;
  readonly namingConventionTab: Locator;

  // Header
  readonly pageTitle: Locator;

  // Actions
  readonly addCustomFormLink: Locator;

  // Filter
  readonly industryDropdown: Locator;
  readonly searchInput: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // Form Type Tabs
  readonly availableFormsLink: Locator;
  readonly deployedFormsLink: Locator;
  readonly customFormsLink: Locator;

  // Form Type Toggles
  readonly jobFormCheckbox: Locator;
  readonly generalFormCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;

    // Breadcrumb
    this.settingsLink = page.locator('a[href="https://uat.joblogic.com/Setting"]');

    // Tabs
    this.electronicFormsTab = page.locator('a[href="#electronicFormsTab"]');
    this.namingConventionTab = page.locator('a[href="#namingConvention"]');

    // Header
    this.pageTitle = page.locator('h3:has-text("Electronic Forms")');

    // Actions
    this.addCustomFormLink = page.locator('a[href="/CompanyForm/_AddNewCustomForm"]');

    // Filter
    this.industryDropdown = page.locator('text=Select Forms by Industry').locator('..').locator('listbox');
    this.searchInput = page.getByPlaceholder('Enter search term / ref. No., etc...');
    this.resetFilterButton = page.getByRole('button', { name: 'Reset Filter' });
    this.searchButton = page.getByRole('button', { name: 'Search' });

    // Form Type Tabs
    this.availableFormsLink = page.locator('a[href="#availableForms"]');
    this.deployedFormsLink = page.locator('a[href="#deployedForms"]');
    this.customFormsLink = page.locator('a[href="#customForms"]');

    // Form Type Toggles
    this.jobFormCheckbox = page.locator('text=Job Form').locator('input[type="checkbox"]');
    this.generalFormCheckbox = page.locator('text=General Form').locator('input[type="checkbox"]');
  }

  // Navigation
  async navigateToElectronicForms(): Promise<void> {
    await test.step('Navigate to Electronic Forms page', async () => {
      await this.page.goto('/CompanyForm');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Electronic Forms page is loaded', async () => {
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
  async switchToElectronicFormsTab(): Promise<void> {
    await test.step('Switch to Electronic Forms tab', async () => {
      await this.electronicFormsTab.click();
    });
  }

  async switchToNamingConventionTab(): Promise<void> {
    await test.step('Switch to Naming Convention tab', async () => {
      await this.namingConventionTab.click();
    });
  }

  // Actions
  async clickAddCustomForm(): Promise<void> {
    await test.step('Click Add Custom Form link', async () => {
      await this.addCustomFormLink.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  // Filter Methods
  async selectIndustry(industries: string[]): Promise<void> {
    await test.step(`Select industries: ${industries.join(', ')}`, async () => {
      await this.industryDropdown.click();
      for (const industry of industries) {
        await this.page.locator(`text="${industry}"`).click();
      }
      await this.page.keyboard.press('Escape');
    });
  }

  async search(query: string): Promise<void> {
    await test.step(`Search for "${query}"`, async () => {
      await this.searchInput.fill(query);
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
    });
  }

  // Form Type Tab Navigation
  async switchToAvailableForms(): Promise<void> {
    await test.step('Switch to Available Forms', async () => {
      await this.availableFormsLink.click();
    });
  }

  async switchToDeployedForms(): Promise<void> {
    await test.step('Switch to Deployed Forms', async () => {
      await this.deployedFormsLink.click();
    });
  }

  async switchToCustomForms(): Promise<void> {
    await test.step('Switch to Custom Forms', async () => {
      await this.customFormsLink.click();
    });
  }

  // Form Type Toggle
  async toggleJobForm(): Promise<void> {
    await test.step('Toggle Job Form checkbox', async () => {
      await this.jobFormCheckbox.click();
    });
  }

  async toggleGeneralForm(): Promise<void> {
    await test.step('Toggle General Form checkbox', async () => {
      await this.generalFormCheckbox.click();
    });
  }

  async setJobForm(checked: boolean): Promise<void> {
    await test.step(`Set Job Form to ${checked}`, async () => {
      if (checked) {
        await this.jobFormCheckbox.check();
      } else {
        await this.jobFormCheckbox.uncheck();
      }
    });
  }

  async setGeneralForm(checked: boolean): Promise<void> {
    await test.step(`Set General Form to ${checked}`, async () => {
      if (checked) {
        await this.generalFormCheckbox.check();
      } else {
        await this.generalFormCheckbox.uncheck();
      }
    });
  }

  // Filter Application
  async applyFilters(options: {
    industries?: string[];
    query?: string;
    jobForm?: boolean;
    generalForm?: boolean;
  }): Promise<void> {
    await test.step('Apply Electronic Forms filters', async () => {
      if (options.industries && options.industries.length > 0) {
        await this.selectIndustry(options.industries);
      }
      if (options.query) {
        await this.search(options.query);
      }
      if (options.jobForm !== undefined) {
        await this.setJobForm(options.jobForm);
      }
      if (options.generalForm !== undefined) {
        await this.setGeneralForm(options.generalForm);
      }
      await this.clickSearch();
    });
  }
}
