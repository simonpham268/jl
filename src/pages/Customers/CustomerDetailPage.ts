import type { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { test } from '@playwright/test';

/**
 * Customer Detail tabs
 */
export type CustomerDetailTab =
  | 'Details'
  | 'Sites'
  | 'Contacts'
  | 'History'
  | 'Info'
  | 'Refcom'
  | 'Billing'
  | 'Invoice Details'
  | 'Base Configuration';

/**
 * History sub-tabs
 */
export type CustomerHistorySubTab = 'Jobs' | 'Quotes' | 'PPM' | 'Invoices' | 'Documents' | 'Refcom';

/**
 * Info sub-tabs
 */
export type CustomerInfoSubTab = 'Notes' | 'Emails' | 'To Do' | 'Attachments' | 'Service Letters';

/**
 * CustomerDetailPage - Page Object for Customer Detail page
 * URL: /Customer/Detail/{id}
 */
export class CustomerDetailPage extends BasePage {
  // ========================
  // Locators - Header/Breadcrumb
  // ========================
  readonly pageTitle: Locator;
  readonly customersLink: Locator;
  readonly customerName: Locator;

  // ========================
  // Locators - Main Actions
  // ========================
  readonly logJobButton: Locator;
  readonly logQuoteButton: Locator;
  readonly addInvoiceButton: Locator;
  readonly moreActionsButton: Locator;

  // ========================
  // Locators - Tabs
  // ========================
  readonly detailsTab: Locator;
  readonly sitesTab: Locator;
  readonly contactsTab: Locator;
  readonly historyTab: Locator;
  readonly infoTab: Locator;
  readonly refcomTab: Locator;
  readonly billingTab: Locator;
  readonly invoiceDetailsTab: Locator;
  readonly baseConfigurationTab: Locator;

  // ========================
  // Locators - Details Section
  // ========================
  readonly detailsSection: Locator;
  readonly editDetailsButton: Locator;
  readonly undoButton: Locator;
  readonly saveButton: Locator;
  readonly customerNameInput: Locator;
  readonly tagsDropdown: Locator;
  readonly customerTypeDropdown: Locator;
  readonly addressInput: Locator;
  readonly postcodeInput: Locator;
  readonly telephoneInput: Locator;
  readonly activeCheckbox: Locator;
  readonly accountManagerDropdown: Locator;
  readonly totalReceivableBalance: Locator;

  // ========================
  // Locators - Sites Tab
  // ========================
  readonly sitesTable: Locator;
  readonly sitesTableRows: Locator;
  readonly addSiteButton: Locator;

  // ========================
  // Locators - Contacts Tab
  // ========================
  readonly contactTable: Locator;
  readonly contactsTableRows: Locator;
  readonly firstContactRow: Locator;
  readonly threeDotsIcon: Locator;
  readonly deleteButton: Locator;
  readonly editContactButton: Locator;
  readonly addContactButton: Locator;
  readonly contactRowByName: Locator;

  // ========================
  // Locators - Modal
  // ========================
  readonly confirmDeletePopup: Locator;
  readonly yesButton: Locator;
  readonly noButton: Locator;

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

  // Selector strategies as class properties (rule 10)
  readonly tabSelectors: string[];
  readonly deleteButtonSelectors: string[];
  readonly confirmButtonSelectors: string[];
  readonly contactRowSelectors: string[];

  constructor(page: Page) {
    super(page);

    // Header/Breadcrumb
    this.pageTitle = page.getByRole('heading', { level: 3 }).filter({ hasText: 'Customers /' });
    this.customersLink = page.getByRole('link', { name: 'Customers' }).first();
    this.customerName = page.locator('h3').locator('div').last();

    // Main Actions
    this.logJobButton = page.getByRole('link', { name: 'Log Job' });
    this.logQuoteButton = page.getByRole('link', { name: 'Log Quote' });
    this.addInvoiceButton = page.getByRole('link', { name: 'Add Invoice' });
    this.moreActionsButton = page.locator('nav button').filter({ has: page.locator('[class*="icon"]') }).first();

    // Tabs
    this.detailsTab = page.getByRole('link', { name: 'Details' });
    this.sitesTab = page.getByRole('link', { name: 'Sites' });
    this.contactsTab = page.locator('a[href="#contactsTab"]').first();
    this.historyTab = page.getByRole('button', { name: /History/ });
    this.infoTab = page.getByRole('button', { name: /Info/ });
    this.refcomTab = page.getByRole('button', { name: /Refcom/ });
    this.billingTab = page.getByRole('link', { name: 'Billing' });
    this.invoiceDetailsTab = page.getByRole('link', { name: 'Invoice Details' });
    this.baseConfigurationTab = page.getByRole('link', { name: 'Base Configuration' });

    // Details Section
    this.detailsSection = page.locator('h3:has-text("Details")').locator('..');
    this.editDetailsButton = page.getByRole('button', { name: 'Edit' }).first();
    this.undoButton = page.getByRole('button', { name: 'Undo' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.customerNameInput = page.locator('text=Name*').locator('..').locator('input');
    this.tagsDropdown = page.locator('text=Tag(s)').locator('..').locator('[class*="multiselect"]');
    this.customerTypeDropdown = page.locator('text=Customer Type').locator('..').locator('[role="combobox"]');
    this.addressInput = page.getByPlaceholder('Company name, building, Street address');
    this.postcodeInput = page.locator('text=Postcode').locator('..').locator('input');
    this.telephoneInput = page.locator('text=Telephone').locator('..').locator('input[type="text"]');
    this.activeCheckbox = page.locator('text=Active').locator('..');
    this.accountManagerDropdown = page.locator('text=Account Manager').locator('..').locator('[role="combobox"]');
    this.totalReceivableBalance = page.locator('text=Total Receivable Balance').locator('..');

    // Sites Tab
    this.sitesTable = page.locator('#sitesTab table');
    this.sitesTableRows = this.sitesTable.locator('tbody tr');
    this.addSiteButton = page.getByRole('link', { name: 'Add Site' });

    // Contacts Tab
    this.contactTable = page.locator('#contactsTab table');
    this.contactsTableRows = this.contactTable.locator('tbody tr');
    this.firstContactRow = page.locator('#contactsTab table tbody tr:first-child');
    this.contactRowByName = page.locator('#contactsTab table tbody tr');
    this.threeDotsIcon = page.locator('#contactsTab table button.table-actions_trigger').first();
    this.deleteButton = page.locator('button#deleteContact, #contactsTab button:has-text("Delete")').first();
    this.editContactButton = page.locator('button#editContact, button:has-text("Edit")').first();
    this.addContactButton = page.getByRole('button', { name: 'Add Contact' });

    // Modal
    this.confirmDeletePopup = page.locator('#modalSwitchContainer, .modal.in').first();
    this.yesButton = page.locator('button#modalConfirmYes').first();
    this.noButton = page.locator('button#modalConfirmNo').first();

    // Toast
    this.toastMessage = page.locator('[role="alert"], .toast, .alert-success, .notification').first();

    // Loading
    this.loadingIndicator = page.locator('.loading, .spinner, [class*="load"], .ajax-loader, [data-testid="loading"]');

    // AI Summary
    this.summariseButton = page.getByRole('button', { name: 'Summarise' });
    this.regenerateButton = page.getByRole('button', { name: 'Regenerate' });

    // Selector strategies as class properties following prompt.md guidelines
    this.tabSelectors = [
      'a[href="#contactsTab"]',
      'a:has-text("Contacts")',
      '[role="tab"]:has-text("Contacts")'
    ];

    this.deleteButtonSelectors = [
      'button#deleteContact',
      '#contactsTab button:has-text("Delete")',
      'button:has-text("Delete")'
    ];

    this.confirmButtonSelectors = [
      'button#modalConfirmYes',
      'button:has-text("Yes")',
      '.btn-confirm'
    ];

    // Contact row selectors by name (rule 10: arrays as class properties)
    this.contactRowSelectors = [
      '#contactsTab table tbody tr:has-text("CONTACTNAME")',
      'table tbody tr:has-text("CONTACTNAME")',
      '[data-testid="contact-row"]:has-text("CONTACTNAME")'
    ];
  }

  /**
     * Verify customer detail page has loaded
     */
  async verifyPageLoaded(): Promise<void> {
    await test.step('Verify Customer Detail page has loaded', async () => {
      await this.pageTitle.waitFor({ state: 'visible', timeout: this.elementTimeout });
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
     * Click on the Contacts tab - Step 9
     */
  async clickContactsTab(): Promise<void> {
    await test.step('Click on the Contacts tab', async () => {
      await this.contactsTab.waitFor({ state: 'visible', timeout: this.elementTimeout });
      await this.contactsTab.click();
      // Wait for the contacts table to be visible after tab switch
      await this.page.locator('#contactsTab table').waitFor({ state: 'visible', timeout: this.elementTimeout });
    });
  }

  /**
     * Click on the three vertical dots icon - Step 10
     */
  async clickThreeDotsIcon(): Promise<void> {
    await test.step('Click on the three vertical dots icon', async () => {
      // The table-actions_wrapper is display:none until row is hovered
      await this.firstContactRow.hover();
      // Now the trigger button should be visible
      await this.threeDotsIcon.waitFor({ state: 'visible', timeout: this.elementTimeout });
      await this.threeDotsIcon.click();
      // Wait for the Delete option (id=deleteContact) to become visible
      await this.page.locator('button#deleteContact').waitFor({ state: 'visible', timeout: this.elementTimeout });
    });
  }

  /**
     * Click on the Delete button - Step 11
     */
  async clickDeleteButton(): Promise<void> {
    await test.step('Click on the Delete button', async () => {
      await this.deleteButton.waitFor({ state: 'visible', timeout: this.elementTimeout });
      await this.deleteButton.click();
    });
  }

  /**
     * Verify confirm delete popup is visible - Step 11 Expected (rule 8: return data for verification)
     */
  async isDeleteConfirmPopupVisible(): Promise<boolean> {
    return await test.step('Verify confirm delete popup is visible', async () => {
      try {
        await this.page.locator('#modalSwitchContainer.in, .modal.in').waitFor({ state: 'visible', timeout: this.elementTimeout });
        return true;
      } catch {
        return false;
      }
    });
  }

  /**
     * Click on the Yes button to confirm deletion - Step 12
     */
  async confirmDelete(): Promise<void> {
    await test.step('Click on the Yes button to confirm deletion', async () => {
      await this.yesButton.waitFor({ state: 'visible', timeout: this.elementTimeout });
      await this.yesButton.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
     * Get toast message after successful deletion - Step 12 Expected (rule 8: return data for verification)
     */
  async getToastMessage(): Promise<string | null> {
    return await test.step('Get toast message after successful deletion', async () => {
      await this.toastMessage.waitFor({ state: 'visible', timeout: 10000 });
      return await this.getText(this.toastMessage);
    });
  }

  /**
   * Private helper to get contact row by name (dynamic locator)
   */
  private getContactRowByName(contactName: string): Locator {
    return this.page.locator(`#contactsTab table tbody tr:has-text("${contactName}")`).first();
  }

  /**
     * Click on the three vertical dots icon for specific contact - Step 12: Click three dots of contact "test1"
     */
  async clickThreeDotsIconForContact(contactName: string): Promise<void> {
    await test.step(`Click on the three vertical dots icon for contact: ${contactName}`, async () => {
      const contactRow = this.getContactRowByName(contactName);

      // Hover over the contact row to ensure visibility
      await contactRow.hover();

      // Click the three-dots button within this specific row
      const threeDotsInRow = contactRow.locator('button.table-actions_trigger').first();

      await threeDotsInRow.waitFor({ state: 'visible', timeout: this.elementTimeout });
      await threeDotsInRow.click();

      // Wait for delete button to appear in dropdown (not necessarily within the row)
      await this.deleteButton.waitFor({ state: 'visible', timeout: this.elementTimeout });
    });
  }

  /**
     * Click delete button for specific contact - Step 13: Click Delete button in dropdown
     */
  async clickDeleteButtonForContact(contactName: string): Promise<void> {
    await test.step(`Click delete button for contact: ${contactName}`, async () => {
      // Click the delete button that appeared after clicking three-dots
      await this.deleteButton.waitFor({ state: 'visible', timeout: this.elementTimeout });
      await this.deleteButton.click();
    });
  }

  /**
     * Private method to wait for loading indicators to disappear (rule 4)
     */
  private async waitForLoadingToDisappear(): Promise<void> {
    try {
      await this.waitForLocatorToDisappear(this.loadingIndicator, 10000);
    } catch {
      // Loading indicator might not be present, continue
    }
  }

  // ========================
  // Navigation
  // ========================

  /**
   * Navigate to customer detail by customer ID
   */
  async navigateToCustomerDetail(customerId: number | string): Promise<void> {
    await test.step(`Navigate to Customer Detail: ${customerId}`, async () => {
      await this.page.goto(`/Customer/Detail/${customerId}`);
      await this.waitForPageLoad();
    });
  }

  /**
   * Wait for page to fully load
   */
  async waitForPageLoad(): Promise<void> {
    await test.step('Wait for Customer Detail page to load', async () => {
      await this.page.waitForLoadState('domcontentloaded');
      await this.waitForLoadingToDisappear();
    });
  }

  /**
   * Go back to All Customers list
   */
  async goBackToCustomersList(): Promise<void> {
    await test.step('Go back to Customers list', async () => {
      await this.customersLink.click();
      await this.page.waitForURL('**/Customer**');
    });
  }

  // ========================
  // Tab Navigation
  // ========================

  /**
   * Click on a specific tab
   */
  async clickTab(tabName: CustomerDetailTab): Promise<void> {
    await test.step(`Click ${tabName} tab`, async () => {
      const tabMap: Record<CustomerDetailTab, Locator> = {
        'Details': this.detailsTab,
        'Sites': this.sitesTab,
        'Contacts': this.contactsTab,
        'History': this.historyTab,
        'Info': this.infoTab,
        'Refcom': this.refcomTab,
        'Billing': this.billingTab,
        'Invoice Details': this.invoiceDetailsTab,
        'Base Configuration': this.baseConfigurationTab,
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
   * Get customer name from page
   */
  async getCustomerName(): Promise<string | null> {
    return await test.step('Get customer name', async () => {
      return await this.customerName.textContent();
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

  /**
   * Click Add Invoice button
   */
  async clickAddInvoice(): Promise<void> {
    await test.step('Click Add Invoice button', async () => {
      await this.addInvoiceButton.click();
      await this.page.waitForURL('**/CGroupInvoice/Create**');
    });
  }

  // ========================
  // Sites Tab Actions
  // ========================

  /**
   * Open Sites tab
   */
  async openSitesTab(): Promise<void> {
    await test.step('Open Sites tab', async () => {
      await this.sitesTab.click();
      await this.sitesTable.waitFor({ state: 'visible', timeout: this.elementTimeout });
    });
  }

  /**
   * Get site row by name
   */
  private getSiteRow(siteName: string): Locator {
    return this.page.locator(`#sitesTab table tbody tr:has-text("${siteName}")`).first();
  }

  /**
   * Click on a site to view details
   */
  async clickSite(siteName: string): Promise<void> {
    await test.step(`Click on site: ${siteName}`, async () => {
      const row = this.getSiteRow(siteName);
      await row.getByRole('link').first().click();
      await this.page.waitForURL('**/Site/Detail/**');
    });
  }

  /**
   * Get sites count
   */
  async getSitesCount(): Promise<number> {
    return await test.step('Get sites count', async () => {
      return await this.sitesTableRows.count();
    });
  }

  // ========================
  // Contacts Tab Actions
  // ========================

  /**
   * Open Contacts tab
   */
  async openContactsTab(): Promise<void> {
    await test.step('Open Contacts tab', async () => {
      await this.contactsTab.click();
      await this.contactTable.waitFor({ state: 'visible', timeout: this.elementTimeout });
    });
  }

  /**
   * Delete a contact by name
   */
  async deleteContact(contactName: string): Promise<void> {
    await test.step(`Delete contact: ${contactName}`, async () => {
      await this.clickThreeDotsIconForContact(contactName);
      await this.clickDeleteButton();
      await this.confirmDelete();
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
  // Toast/Modal Helpers
  // ========================

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
      await this.yesButton.click();
      await this.waitForPageLoad();
    });
  }

  /**
   * Cancel modal action
   */
  async cancelModalAction(): Promise<void> {
    await test.step('Cancel modal action', async () => {
      await this.noButton.click();
    });
  }
}
