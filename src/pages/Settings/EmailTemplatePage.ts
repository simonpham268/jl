import { Page, Locator } from '@playwright/test';
import { test } from '@playwright/test';

/**
 * Email Template Page Object
 * URL: /EmailTemplate
 * Create customized email templates for Jobs, estimates, Invoices, credits, etc.
 */
export class EmailTemplatePage {
  readonly page: Page;

  // Breadcrumb
  readonly settingsLink: Locator;

  // Tabs
  readonly jobTab: Locator;
  readonly quotesTab: Locator;
  readonly invoicesTab: Locator;
  readonly ppmsTab: Locator;
  readonly purchaseOrdersTab: Locator;
  readonly serviceLettersTab: Locator;
  readonly documentsTab: Locator;

  // Header
  readonly pageTitle: Locator;

  // Actions
  readonly addTemplateLink: Locator;

  // Filter
  readonly searchInput: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // Results
  readonly dataTable: Locator;
  readonly loadingIndicator: Locator;
  readonly pagination: Locator;
  readonly resultsPerPageDropdown: Locator;

  constructor(page: Page) {
    this.page = page;

    // Breadcrumb
    this.settingsLink = page.locator('a[href="https://uat.joblogic.com/Setting"]');

    // Tabs
    this.jobTab = page.locator('[role="tab"]:has-text("Job")');
    this.quotesTab = page.getByRole('button', { name: 'Quotes' });
    this.invoicesTab = page.getByRole('button', { name: 'Invoices' });
    this.ppmsTab = page.getByRole('button', { name: 'PPMs' });
    this.purchaseOrdersTab = page.getByRole('button', { name: 'Purchase Orders' });
    this.serviceLettersTab = page.getByRole('button', { name: 'Service Letters' });
    this.documentsTab = page.getByRole('button', { name: 'Documents' });

    // Header
    this.pageTitle = page.locator('h3:has-text("Email Template")');

    // Actions
    this.addTemplateLink = page.locator('a:has-text("Add Template")');

    // Filter
    this.searchInput = page.getByPlaceholder('Template name / Email subject / Email body');
    this.resetFilterButton = page.getByRole('button', { name: 'Reset Filter' });
    this.searchButton = page.getByRole('button', { name: 'Search' });

    // Results
    this.dataTable = page.locator('table').first();
    this.loadingIndicator = page.locator('text=Loading Data... Please wait');
    this.pagination = page.locator('nav[aria-label="Page navigation"]');
    this.resultsPerPageDropdown = page.locator('select:has-text("Results per page")');
  }

  // Navigation
  async navigateToEmailTemplate(): Promise<void> {
    await test.step('Navigate to Email Template page', async () => {
      await this.page.goto('/EmailTemplate');
      await this.page.waitForLoadState('networkidle');
    });
  }

  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Email Template page is loaded', async () => {
      await this.jobTab.waitFor({ state: 'visible' });
    });
  }

  async goBackToSettings(): Promise<void> {
    await test.step('Go back to Settings page', async () => {
      await this.settingsLink.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  // Tab Navigation
  async switchToJobTab(): Promise<void> {
    await test.step('Switch to Job tab', async () => {
      await this.jobTab.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  async switchToQuotesTab(): Promise<void> {
    await test.step('Switch to Quotes tab', async () => {
      await this.quotesTab.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  async switchToInvoicesTab(): Promise<void> {
    await test.step('Switch to Invoices tab', async () => {
      await this.invoicesTab.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  async switchToPPMsTab(): Promise<void> {
    await test.step('Switch to PPMs tab', async () => {
      await this.ppmsTab.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  async switchToPurchaseOrdersTab(): Promise<void> {
    await test.step('Switch to Purchase Orders tab', async () => {
      await this.purchaseOrdersTab.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  async switchToServiceLettersTab(): Promise<void> {
    await test.step('Switch to Service Letters tab', async () => {
      await this.serviceLettersTab.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  async switchToDocumentsTab(): Promise<void> {
    await test.step('Switch to Documents tab', async () => {
      await this.documentsTab.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  async switchToTab(tabName: 'Job' | 'Quotes' | 'Invoices' | 'PPMs' | 'Purchase Orders' | 'Service Letters' | 'Documents'): Promise<void> {
    await test.step(`Switch to ${tabName} tab`, async () => {
      switch (tabName) {
        case 'Job':
          await this.switchToJobTab();
          break;
        case 'Quotes':
          await this.switchToQuotesTab();
          break;
        case 'Invoices':
          await this.switchToInvoicesTab();
          break;
        case 'PPMs':
          await this.switchToPPMsTab();
          break;
        case 'Purchase Orders':
          await this.switchToPurchaseOrdersTab();
          break;
        case 'Service Letters':
          await this.switchToServiceLettersTab();
          break;
        case 'Documents':
          await this.switchToDocumentsTab();
          break;
      }
    });
  }

  // Actions
  async clickAddTemplate(): Promise<void> {
    await test.step('Click Add Template link', async () => {
      await this.addTemplateLink.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  // Filter Methods
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

  // Pagination
  async selectResultsPerPage(count: number): Promise<void> {
    await test.step(`Select ${count} results per page`, async () => {
      await this.resultsPerPageDropdown.selectOption({ label: `${count} Results per page` });
      await this.page.waitForLoadState('networkidle');
    });
  }

  async goToPage(pageNumber: number): Promise<void> {
    await test.step(`Go to page ${pageNumber}`, async () => {
      const pageLink = this.pagination.locator(`text="${pageNumber}"`);
      await pageLink.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  async goToNextPage(): Promise<void> {
    await test.step('Go to next page', async () => {
      const nextButton = this.pagination.locator('text=»').first();
      await nextButton.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  async goToPreviousPage(): Promise<void> {
    await test.step('Go to previous page', async () => {
      const prevButton = this.pagination.locator('text=«').first();
      await prevButton.click();
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

  async clickTemplateByName(name: string): Promise<void> {
    await test.step(`Click template "${name}"`, async () => {
      const row = this.page.locator(`tr:has-text("${name}")`);
      await row.click();
    });
  }

  // Filter Application
  async applyFilters(options: {
    query?: string;
  }): Promise<void> {
    await test.step('Apply Email Template filters', async () => {
      if (options.query) {
        await this.search(options.query);
      }
      await this.clickSearch();
      await this.waitForDataLoad();
    });
  }
}
