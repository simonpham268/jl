import type { Page, Locator } from '@playwright/test';
import { test } from '@playwright/test';

/**
 * Document Templates Page Object
 * URL: /Template
 * Create custom templates for job sheets, invoices, credits, and purchase orders
 */
export class DocumentTemplatesPage {
  readonly page: Page;

  // Breadcrumb
  readonly settingsLink: Locator;

  // Tabs
  readonly jobsheetTab: Locator;
  readonly quotesTab: Locator;
  readonly invoiceCreditTab: Locator;
  readonly ppmsTab: Locator;
  readonly purchaseOrdersTab: Locator;
  readonly serviceLettersTab: Locator;
  readonly goodsReceivedNotesTab: Locator;
  readonly assetTaskComplianceTab: Locator;

  // Header
  readonly pageTitle: Locator;

  // Actions
  readonly addTemplateButton: Locator;
  readonly downloadGuidelinesLink: Locator;

  // Filter
  readonly searchInput: Locator;
  readonly resetFilterButton: Locator;
  readonly searchButton: Locator;

  // Results
  readonly dataTable: Locator;
  readonly loadingIndicator: Locator;

  constructor(page: Page) {
    this.page = page;

    // Breadcrumb
    this.settingsLink = page.locator('a[href="https://uat.joblogic.com/Setting"]');

    // Tabs
    this.jobsheetTab = page.locator('[role="tab"]:has-text("Jobsheet")');
    this.quotesTab = page.getByRole('button', { name: 'Quotes' });
    this.invoiceCreditTab = page.getByRole('button', { name: 'Invoice & Credit' });
    this.ppmsTab = page.getByRole('button', { name: 'PPMs' });
    this.purchaseOrdersTab = page.getByRole('button', { name: 'Purchase Orders' });
    this.serviceLettersTab = page.getByRole('button', { name: 'Service Letters' });
    this.goodsReceivedNotesTab = page.locator('[role="tab"]:has-text("Goods Received Notes")');
    this.assetTaskComplianceTab = page.locator('[role="tab"]:has-text("Asset & Task Compliance")');

    // Header
    this.pageTitle = page.locator('h3:has-text("Jobsheet"), h3:has-text("Quotes"), h3:has-text("Invoice"), h3:has-text("PPM"), h3:has-text("Purchase")');

    // Actions
    this.addTemplateButton = page.locator('text=Add Template');
    this.downloadGuidelinesLink = page.locator('text=Download').filter({ hasText: 'Guidelines' });

    // Filter
    this.searchInput = page.getByPlaceholder('Title / Description');
    this.resetFilterButton = page.getByRole('button', { name: 'Reset Filter' });
    this.searchButton = page.getByRole('button', { name: 'Search' });

    // Results
    this.dataTable = page.locator('table').first();
    this.loadingIndicator = page.locator('text=Loading Data... Please wait');
  }

  // Navigation
  async navigateToDocumentTemplates(): Promise<void> {
    await test.step('Navigate to Document Templates page', async () => {
      await this.page.goto('/Template');
      await this.page.waitForLoadState('networkidle');
    });
  }

  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Document Templates page is loaded', async () => {
      await this.jobsheetTab.waitFor({ state: 'visible' });
    });
  }

  async goBackToSettings(): Promise<void> {
    await test.step('Go back to Settings page', async () => {
      await this.settingsLink.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  // Tab Navigation
  async switchToJobsheet(): Promise<void> {
    await test.step('Switch to Jobsheet tab', async () => {
      await this.jobsheetTab.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  async switchToQuotes(): Promise<void> {
    await test.step('Switch to Quotes tab', async () => {
      await this.quotesTab.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  async switchToInvoiceCredit(): Promise<void> {
    await test.step('Switch to Invoice & Credit tab', async () => {
      await this.invoiceCreditTab.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  async switchToPPMs(): Promise<void> {
    await test.step('Switch to PPMs tab', async () => {
      await this.ppmsTab.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  async switchToPurchaseOrders(): Promise<void> {
    await test.step('Switch to Purchase Orders tab', async () => {
      await this.purchaseOrdersTab.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  async switchToServiceLetters(): Promise<void> {
    await test.step('Switch to Service Letters tab', async () => {
      await this.serviceLettersTab.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  async switchToGoodsReceivedNotes(): Promise<void> {
    await test.step('Switch to Goods Received Notes tab', async () => {
      await this.goodsReceivedNotesTab.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  async switchToAssetTaskCompliance(): Promise<void> {
    await test.step('Switch to Asset & Task Compliance tab', async () => {
      await this.assetTaskComplianceTab.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  async switchToTab(tabName: 'Jobsheet' | 'Quotes' | 'Invoice & Credit' | 'PPMs' | 'Purchase Orders' | 'Service Letters' | 'Goods Received Notes' | 'Asset & Task Compliance'): Promise<void> {
    await test.step(`Switch to ${tabName} tab`, async () => {
      switch (tabName) {
      case 'Jobsheet':
        await this.switchToJobsheet();
        break;
      case 'Quotes':
        await this.switchToQuotes();
        break;
      case 'Invoice & Credit':
        await this.switchToInvoiceCredit();
        break;
      case 'PPMs':
        await this.switchToPPMs();
        break;
      case 'Purchase Orders':
        await this.switchToPurchaseOrders();
        break;
      case 'Service Letters':
        await this.switchToServiceLetters();
        break;
      case 'Goods Received Notes':
        await this.switchToGoodsReceivedNotes();
        break;
      case 'Asset & Task Compliance':
        await this.switchToAssetTaskCompliance();
        break;
      }
    });
  }

  // Actions
  async clickAddTemplate(): Promise<void> {
    await test.step('Click Add Template button', async () => {
      await this.addTemplateButton.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  async clickDownloadGuidelines(): Promise<void> {
    await test.step('Click Download Guidelines link', async () => {
      await this.downloadGuidelinesLink.click();
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
    await test.step('Apply Document Templates filters', async () => {
      if (options.query) {
        await this.search(options.query);
      }
      await this.clickSearch();
    });
  }
}
