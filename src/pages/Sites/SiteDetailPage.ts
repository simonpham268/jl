import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Site Detail tabs
 */
export type SiteDetailTab =
  | 'Details'
  | 'Assets'
  | 'Contacts'
  | 'History'
  | 'Info'
  | 'Refcom'
  | 'Related Sites'
  | 'Billing'
  | 'Configuration'
  | 'Service Job';

/**
 * History sub-tabs
 */
export type HistorySubTab = 'Jobs' | 'Quotes' | 'PPM' | 'Invoices' | 'Documents' | 'Refcom';

/**
 * Info sub-tabs
 */
export type InfoSubTab = 'Notes' | 'Emails' | 'To Do' | 'Attachments' | 'Service Letters';

/**
 * SiteDetailPage - Page Object for Site Detail page
 * URL: /Site/Detail/{id}
 */
export class SiteDetailPage extends BasePage {
  // ========================
  // Locators - Header/Breadcrumb
  // ========================
  readonly pageTitle: Locator;
  readonly sitesLink: Locator;
  readonly siteName: Locator;

  // ========================
  // Locators - Main Actions
  // ========================
  readonly logJobButton: Locator;
  readonly logQuoteButton: Locator;
  readonly moreActionsButton: Locator;

  // ========================
  // Locators - Tabs
  // ========================
  readonly detailsTab: Locator;
  readonly assetsTab: Locator;
  readonly contactsTab: Locator;
  readonly historyTab: Locator;
  readonly infoTab: Locator;
  readonly refcomTab: Locator;
  readonly relatedSitesTab: Locator;
  readonly billingTab: Locator;
  readonly configurationTab: Locator;
  readonly serviceJobTab: Locator;

  // ========================
  // Locators - Details Section
  // ========================
  readonly customerSection: Locator;
  readonly editCustomerButton: Locator;
  readonly detailsSection: Locator;
  readonly editDetailsButton: Locator;
  readonly undoButton: Locator;
  readonly saveButton: Locator;

  // Details - Customer Info
  readonly customerName: Locator;
  readonly customerAddress: Locator;
  readonly customerTelephone: Locator;
  readonly customerEmail: Locator;

  // Details - Site Info
  readonly siteNameInput: Locator;
  readonly tagsDropdown: Locator;
  readonly addressInput: Locator;
  readonly postcodeInput: Locator;
  readonly telephoneInput: Locator;
  readonly areaDropdown: Locator;
  readonly accountManagerDropdown: Locator;
  readonly activeCheckbox: Locator;

  // ========================
  // Locators - Assets Tab
  // ========================
  readonly assetsTable: Locator;
  readonly assetsTableRows: Locator;
  readonly addAssetButton: Locator;

  // ========================
  // Locators - Contacts Tab
  // ========================
  readonly contactsTable: Locator;
  readonly contactsTableRows: Locator;
  readonly addContactButton: Locator;
  readonly threeDotsIcon: Locator;
  readonly deleteContactButton: Locator;
  readonly editContactButton: Locator;

  // ========================
  // Locators - Modal
  // ========================
  readonly confirmModal: Locator;
  readonly confirmYesButton: Locator;
  readonly confirmNoButton: Locator;

  // ========================
  // Locators - Toast
  // ========================
  readonly toastMessage: Locator;

  // ========================
  // Locators - Loading
  // ========================
  readonly loadingIndicator: Locator;

  // ========================
  // Locators - AI Summary
  // ========================
  readonly summariseButton: Locator;
  readonly regenerateButton: Locator;

  constructor(page: Page) {
    super(page);

    // Header/Breadcrumb
    this.pageTitle = page.getByRole('heading', { level: 3 }).filter({ hasText: 'Sites /' });
    this.sitesLink = page.getByRole('link', { name: 'Sites' }).first();
    this.siteName = page.locator('h3').locator('div').last();

    // Main Actions
    this.logJobButton = page.getByRole('link', { name: 'Log Job' });
    this.logQuoteButton = page.getByRole('link', { name: 'Log Quote' });
    this.moreActionsButton = page.locator('nav button').filter({ has: page.locator('[class*="icon"]') }).first();

    // Tabs
    this.detailsTab = page.getByRole('link', { name: 'Details' });
    this.assetsTab = page.getByRole('link', { name: 'Assets' });
    this.contactsTab = page.getByRole('link', { name: 'Contacts' });
    this.historyTab = page.getByRole('button', { name: /History/ });
    this.infoTab = page.getByRole('button', { name: /Info/ });
    this.refcomTab = page.getByRole('button', { name: /Refcom/ });
    this.relatedSitesTab = page.getByRole('link', { name: 'Related Sites' });
    this.billingTab = page.getByRole('link', { name: 'Billing' });
    this.configurationTab = page.getByRole('link', { name: 'Configuration' });
    this.serviceJobTab = page.getByRole('link', { name: 'Service Job' });

    // Details Section
    this.customerSection = page.locator('h3:has-text("Customer")').locator('..');
    this.editCustomerButton = this.customerSection.getByRole('button', { name: 'Edit' });
    this.detailsSection = page.locator('h3:has-text("Details")').locator('..');
    this.editDetailsButton = this.detailsSection.getByRole('button', { name: 'Edit' });
    this.undoButton = page.getByRole('button', { name: 'Undo' });
    this.saveButton = page.getByRole('button', { name: 'Save' });

    // Details - Customer Info
    this.customerName = page.locator('text=Customer Name').locator('..').locator('a, span').last();
    this.customerAddress = page.locator('text=Address').locator('..').locator('span').last();
    this.customerTelephone = page.locator('text=Telephone').locator('..').locator('a[href^="tel:"]');
    this.customerEmail = page.locator('text=Email').locator('..').locator('a[href^="mailto:"]');

    // Details - Site Info
    this.siteNameInput = page.locator('text=Name*').locator('..').locator('input');
    this.tagsDropdown = page.locator('text=Tag(s)').locator('..').locator('[class*="multiselect"]');
    this.addressInput = page.getByPlaceholder('Company name, building, Street address');
    this.postcodeInput = page.locator('text=Postcode').locator('..').locator('input');
    this.telephoneInput = page.locator('text=Telephone').locator('..').locator('input[type="text"]');
    this.areaDropdown = page.locator('text=Area').locator('..').locator('[role="combobox"]');
    this.accountManagerDropdown = page.locator('text=Account Manager').locator('..').locator('[role="combobox"]');
    this.activeCheckbox = page.locator('text=Active').locator('..');

    // Assets Tab
    this.assetsTable = page.locator('#assetsTab table');
    this.assetsTableRows = this.assetsTable.locator('tbody tr');
    this.addAssetButton = page.getByRole('link', { name: 'Add Asset' });

    // Contacts Tab
    this.contactsTable = page.locator('#contactsTab table');
    this.contactsTableRows = this.contactsTable.locator('tbody tr');
    this.addContactButton = page.getByRole('button', { name: 'Add Contact' });
    this.threeDotsIcon = page.locator('#contactsTab table button.table-actions_trigger').first();
    this.deleteContactButton = page.locator('button#deleteContact, button:has-text("Delete")').first();
    this.editContactButton = page.locator('button#editContact, button:has-text("Edit")').first();

    // Modal
    this.confirmModal = page.locator('#modalSwitchContainer, .modal.in').first();
    this.confirmYesButton = page.locator('button#modalConfirmYes').first();
    this.confirmNoButton = page.locator('button#modalConfirmNo').first();

    // Toast
    this.toastMessage = page.locator('[role="alert"], .toast, .alert-success, .notification').first();

    // Loading
    this.loadingIndicator = page.locator('.loading, .spinner, [class*="load"]');

    // AI Summary
    this.summariseButton = page.getByRole('button', { name: 'Summarise' });
    this.regenerateButton = page.getByRole('button', { name: 'Regenerate' });
  }

  // ========================
  // Navigation
  // ========================

  /**
   * Navigate to site detail by site ID
   */
  async navigateToSiteDetail(siteId: number | string): Promise<void> {
    await test.step(`Navigate to Site Detail: ${siteId}`, async () => {
      await this.page.goto(`/Site/Detail/${siteId}`);
      await this.waitForPageLoad();
    });
  }

  /**
   * Wait for page to fully load
   */
  async waitForPageLoad(): Promise<void> {
    await test.step('Wait for Site Detail page to load', async () => {
      await this.page.waitForLoadState('domcontentloaded');
      await this.loadingIndicator.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
    });
  }

  /**
   * Verify page is loaded
   */
  async verifyPageLoaded(): Promise<void> {
    await test.step('Verify Site Detail page is loaded', async () => {
      await expect(this.detailsTab).toBeVisible();
    });
  }

  /**
   * Go back to All Sites list
   */
  async goBackToSitesList(): Promise<void> {
    await test.step('Go back to Sites list', async () => {
      await this.sitesLink.click();
      await this.page.waitForURL('**/Site**');
    });
  }

  // ========================
  // Tab Navigation
  // ========================

  /**
   * Click on a specific tab
   */
  async clickTab(tabName: SiteDetailTab): Promise<void> {
    await test.step(`Click ${tabName} tab`, async () => {
      const tabMap: Record<SiteDetailTab, Locator> = {
        'Details': this.detailsTab,
        'Assets': this.assetsTab,
        'Contacts': this.contactsTab,
        'History': this.historyTab,
        'Info': this.infoTab,
        'Refcom': this.refcomTab,
        'Related Sites': this.relatedSitesTab,
        'Billing': this.billingTab,
        'Configuration': this.configurationTab,
        'Service Job': this.serviceJobTab,
      };

      await tabMap[tabName].click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Get active tab name
   */
  async getActiveTab(): Promise<string | null> {
    return await test.step('Get active tab name', async () => {
      const activeTab = this.page.locator('[role="tablist"] a[aria-selected="true"], .nav-link.active').first();
      return await activeTab.textContent();
    });
  }

  // ========================
  // Details Tab Actions
  // ========================

  /**
   * Click Edit button in Details section
   */
  async clickEditDetails(): Promise<void> {
    await test.step('Click Edit Details button', async () => {
      await this.editDetailsButton.click();
    });
  }

  /**
   * Click Save button
   */
  async clickSave(): Promise<void> {
    await test.step('Click Save button', async () => {
      await this.saveButton.click();
      await this.waitForPageLoad();
    });
  }

  /**
   * Click Undo button
   */
  async clickUndo(): Promise<void> {
    await test.step('Click Undo button', async () => {
      await this.undoButton.click();
    });
  }

  /**
   * Get site name from page
   */
  async getSiteName(): Promise<string | null> {
    return await test.step('Get site name', async () => {
      return await this.siteName.textContent();
    });
  }

  // ========================
  // Main Actions
  // ========================

  /**
   * Click Log Job button
   */
  async clickLogJob(): Promise<void> {
    await test.step('Click Log Job button', async () => {
      await this.logJobButton.click();
      await this.page.waitForURL('**/Job/Create**');
    });
  }

  /**
   * Click Log Quote button
   */
  async clickLogQuote(): Promise<void> {
    await test.step('Click Log Quote button', async () => {
      await this.logQuoteButton.click();
      await this.page.waitForURL('**/Quote/Create**');
    });
  }

  // ========================
  // Contacts Tab Actions
  // ========================

  /**
   * Click Contacts tab and wait for table
   */
  async openContactsTab(): Promise<void> {
    await test.step('Open Contacts tab', async () => {
      await this.contactsTab.click();
      await this.contactsTable.waitFor({ state: 'visible', timeout: this.elementTimeout });
    });
  }

  /**
   * Get contact row by name
   */
  private getContactRow(contactName: string): Locator {
    return this.page.locator(`#contactsTab table tbody tr:has-text("${contactName}")`).first();
  }

  /**
   * Click three dots menu for a contact
   */
  async clickContactThreeDots(contactName: string): Promise<void> {
    await test.step(`Click three dots for contact: ${contactName}`, async () => {
      const row = this.getContactRow(contactName);
      await row.hover();
      const threeDotsBtn = row.locator('button.table-actions_trigger').first();
      await threeDotsBtn.click();
    });
  }

  /**
   * Delete a contact by name
   */
  async deleteContact(contactName: string): Promise<void> {
    await test.step(`Delete contact: ${contactName}`, async () => {
      await this.clickContactThreeDots(contactName);
      await this.deleteContactButton.click();
      await this.confirmYesButton.click();
      await this.waitForPageLoad();
    });
  }

  /**
   * Get contacts count
   */
  async getContactsCount(): Promise<number> {
    return await test.step('Get contacts count', async () => {
      return await this.contactsTableRows.count();
    });
  }

  // ========================
  // Assets Tab Actions
  // ========================

  /**
   * Open Assets tab
   */
  async openAssetsTab(): Promise<void> {
    await test.step('Open Assets tab', async () => {
      await this.assetsTab.click();
      await this.assetsTable.waitFor({ state: 'visible', timeout: this.elementTimeout });
    });
  }

  /**
   * Get asset row by name
   */
  private getAssetRow(assetName: string): Locator {
    return this.page.locator(`#assetsTab table tbody tr:has-text("${assetName}")`).first();
  }

  /**
   * Click on an asset to view details
   */
  async clickAsset(assetName: string): Promise<void> {
    await test.step(`Click on asset: ${assetName}`, async () => {
      const row = this.getAssetRow(assetName);
      await row.getByRole('link').first().click();
      await this.page.waitForURL('**/Asset/**');
    });
  }

  /**
   * Get assets count
   */
  async getAssetsCount(): Promise<number> {
    return await test.step('Get assets count', async () => {
      return await this.assetsTableRows.count();
    });
  }

  // ========================
  // Toast/Modal Helpers
  // ========================

  /**
   * Get toast message text
   */
  async getToastMessage(): Promise<string | null> {
    return await test.step('Get toast message', async () => {
      await this.toastMessage.waitFor({ state: 'visible', timeout: 10000 });
      return await this.toastMessage.textContent();
    });
  }

  /**
   * Wait for toast to disappear
   */
  async waitForToastToDisappear(): Promise<void> {
    await test.step('Wait for toast to disappear', async () => {
      await this.toastMessage.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
    });
  }

  /**
   * Confirm modal action
   */
  async confirmModalAction(): Promise<void> {
    await test.step('Confirm modal action', async () => {
      await this.confirmYesButton.click();
      await this.waitForPageLoad();
    });
  }

  /**
   * Cancel modal action
   */
  async cancelModalAction(): Promise<void> {
    await test.step('Cancel modal action', async () => {
      await this.confirmNoButton.click();
    });
  }
}
