import { type Locator, type Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Quote Detail Tab options
 */
export type QuoteDetailTab = 'Details' | 'Prices' | 'Contacts' | 'Assets' | 'History' | 'Info';

/**
 * Quote Summary information
 */
export interface QuoteSummaryInfo {
  customer: string;
  site: string;
  profitability: string;
}

/**
 * Quote Detail form data
 */
export interface QuoteDetailData {
  tags?: string[];
  title?: string;
  description?: string;
  jobType?: string;
  jobCategory?: string;
  sourceOfEnquiry?: string;
  owner?: string;
  trade?: string;
  referenceNumber?: string;
  priority?: string;
  quoteRef1?: string;
  quoteRef2?: string;
  dateLogged?: string;
  expiryDate?: string;
  nextContactDate?: string;
  expectedSaleDate?: string;
  chanceOfSale?: number;
}

/**
 * QuoteDetailPage - Page Object for Quote Detail page
 * URL Pattern: /Quote/Detail/{quoteId}
 */
export class QuoteDetailPage extends BasePage {
  // ========================
  // Locators - Page Header
  // ========================
  readonly pageTitle: Locator;
  readonly breadcrumbQuotes: Locator;
  readonly quoteNumber: Locator;
  readonly statusBadge: Locator;

  // ========================
  // Locators - Tabs
  // ========================
  readonly detailsTab: Locator;
  readonly pricesTab: Locator;
  readonly contactsTab: Locator;
  readonly assetsTab: Locator;
  readonly historyButton: Locator;
  readonly infoButton: Locator;

  // ========================
  // Locators - Header Actions
  // ========================
  readonly upgradeButton: Locator;
  readonly rejectButton: Locator;
  readonly revertButton: Locator;
  readonly publishInPortalButton: Locator;
  readonly shareButton: Locator;

  // ========================
  // Locators - Quote Summary
  // ========================
  readonly quoteSummaryHeading: Locator;
  readonly customerLink: Locator;
  readonly siteLink: Locator;
  readonly profitabilityValue: Locator;

  // ========================
  // Locators - Detail Section
  // ========================
  readonly editButton: Locator;
  readonly saveButton: Locator;
  readonly undoButton: Locator;
  readonly tagsDropdown: Locator;
  readonly titleInput: Locator;
  readonly descriptionInput: Locator;
  readonly descriptionAiButton: Locator;
  readonly quoteNumberDisplay: Locator;
  readonly jobTypeDropdown: Locator;
  readonly jobCategoryDropdown: Locator;
  readonly sourceOfEnquiryDropdown: Locator;
  readonly loggedByDisplay: Locator;
  readonly ownerDropdown: Locator;
  readonly tradeDropdown: Locator;
  readonly referenceNumberInput: Locator;
  readonly contactNameDisplay: Locator;
  readonly telephoneDisplay: Locator;
  readonly emailDisplay: Locator;
  readonly priorityDropdown: Locator;
  readonly quoteRef1Input: Locator;
  readonly quoteRef2Dropdown: Locator;
  readonly dateLoggedInput: Locator;
  readonly expiryDateInput: Locator;
  readonly nextContactDateInput: Locator;
  readonly expectedSaleDateInput: Locator;
  readonly chanceOfSaleSlider: Locator;

  // ========================
  // Locators - AI Features
  // ========================
  readonly summariseButton: Locator;
  readonly regenerateButton: Locator;

  // ========================
  // Locators - Status
  // ========================
  readonly statusBanner: Locator;

  // ========================
  // Locators - Reject Modal
  // ========================
  readonly rejectModal: Locator;
  readonly rejectModalReasonDropdown: Locator;
  readonly rejectModalTextarea: Locator;
  readonly rejectModalSaveButton: Locator;
  readonly rejectModalCloseButton: Locator;

  // ========================
  // Locators - Toast & Modal
  // ========================
  readonly toastMessage: Locator;
  readonly confirmModal: Locator;
  readonly confirmYesButton: Locator;
  readonly confirmNoButton: Locator;

  constructor(page: Page) {
    super(page);

    // Page Header
    this.pageTitle = page.getByRole('heading', { level: 3 }).filter({ hasText: 'Quotes /' });
    this.breadcrumbQuotes = page.getByRole('link', { name: 'Quotes', exact: true });
    this.quoteNumber = page.locator('h3').locator('span, div').filter({ hasText: /^\/QUO/ });
    this.statusBadge = page.locator('h3').locator('[class*="badge"], [class*="status"]');

    // Tabs
    this.detailsTab = page.getByRole('link', { name: 'Details', exact: true });
    this.pricesTab = page.getByRole('link', { name: 'Prices', exact: true });
    this.contactsTab = page.getByRole('link', { name: 'Contacts', exact: true });
    this.assetsTab = page.getByRole('link', { name: 'Assets', exact: true });
    this.historyButton = page.getByRole('button', { name: 'History' });
    this.infoButton = page.getByRole('button', { name: 'Info' });

    // Header Actions
    this.upgradeButton = page.locator('li').filter({ hasText: 'Upgrade' }).first();
    this.rejectButton = page.locator('li').filter({ hasText: 'Reject' }).first()
      .or(page.getByRole('button', { name: /^reject$/i }));
    this.revertButton = page.getByRole('link', { name: /revert/i })
      .or(page.getByRole('button', { name: /revert/i }));
    this.publishInPortalButton = page.getByRole('button', { name: 'Publish in Portal' });
    this.shareButton = page.getByRole('button', { name: 'Share' });

    // Quote Summary
    this.quoteSummaryHeading = page.getByRole('heading', { name: 'Quote Summary' });
    this.customerLink = page.locator('text=Customer').locator('..').getByRole('link');
    this.siteLink = page.locator('text=Site').locator('..').getByRole('link');
    this.profitabilityValue = page.locator('text=Profitability').locator('..').locator('div').last();

    // Detail Section
    this.editButton = page.getByRole('button', { name: 'Edit' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.undoButton = page.getByRole('button', { name: 'Undo' });
    this.tagsDropdown = page.locator('text=Tag(s)').locator('..').locator('[class*="multiselect"], [role="listbox"]');
    this.titleInput = page.locator('text=Title').locator('..').getByRole('textbox');
    this.descriptionInput = page.locator('text=Description').locator('..').getByRole('textbox');
    this.descriptionAiButton = page.locator('text=Description').locator('..').getByRole('button');
    this.quoteNumberDisplay = page.locator('text=Quote Number').locator('..');
    this.jobTypeDropdown = page.locator('text=Job Type').locator('..').locator('[class*="multiselect"], [role="combobox"]');
    this.jobCategoryDropdown = page.locator('text=Job Category').locator('..').locator('[class*="multiselect"], [role="combobox"]');
    this.sourceOfEnquiryDropdown = page.locator('text=Source of Enquiry').locator('..').locator('[class*="multiselect"], [role="combobox"]');
    this.loggedByDisplay = page.locator('text=Logged By').locator('..');
    this.ownerDropdown = page.locator('text=Owner').locator('..').locator('[class*="multiselect"], [role="combobox"]');
    this.tradeDropdown = page.locator('text=Trade').locator('..').locator('[class*="multiselect"], [role="combobox"]');
    this.referenceNumberInput = page.locator('text=Reference Number').locator('..').getByRole('textbox');
    this.contactNameDisplay = page.locator('text=Contact Name').locator('..');
    this.telephoneDisplay = page.locator('text=Telephone').locator('..');
    this.emailDisplay = page.locator('text=Email').locator('..');
    this.priorityDropdown = page.locator('text=Priority').locator('..').locator('[class*="multiselect"], [role="combobox"]');
    this.quoteRef1Input = page.locator('text=Quote Ref 1').locator('..').getByRole('textbox');
    this.quoteRef2Dropdown = page.locator('text=Quote Ref 2').locator('..').locator('[class*="multiselect"], [role="combobox"]');
    this.dateLoggedInput = page.locator('text=Date Logged').locator('..').getByRole('textbox');
    this.expiryDateInput = page.locator('text=Expiry Date').locator('..').getByRole('textbox');
    this.nextContactDateInput = page.locator('text=Next Contact Date').locator('..').getByRole('textbox');
    this.expectedSaleDateInput = page.locator('text=Expected Sale Date').locator('..').getByRole('textbox');
    this.chanceOfSaleSlider = page.getByRole('slider');

    // AI Features
    this.summariseButton = page.getByRole('button', { name: 'Summarise' });
    this.regenerateButton = page.getByRole('button', { name: 'Regenerate' });

    // Status
    this.statusBanner = page.locator(
      '.alert-danger, .alert.alert-danger, [class*="rejected"], [class*="alert"]:has-text("REJECTED")'
    ).first();

    // Reject Modal
    this.rejectModal = page.locator('.modal.show, .modal[style*="display: block"]').filter({ hasText: 'Reject' });
    this.rejectModalReasonDropdown = this.rejectModal.locator(
      '[placeholder*="option"], [placeholder*="select"], [placeholder*="Select"], .multiselect__input'
    ).first();
    this.rejectModalTextarea = this.rejectModal.locator('textarea').first();
    this.rejectModalSaveButton = this.rejectModal.getByRole('button', { name: /save/i });
    this.rejectModalCloseButton = this.rejectModal.getByRole('button', { name: /close|cancel/i });

    // Toast & Modal
    this.toastMessage = page.locator('.toast, [class*="toast"], [role="alert"]');
    this.confirmModal = page.locator('.modal.show, .modal[style*="display: block"]');
    this.confirmYesButton = this.confirmModal.getByRole('button', { name: /yes|confirm|ok/i });
    this.confirmNoButton = this.confirmModal.getByRole('button', { name: /no|cancel/i });
  }

  // ========================
  // Dynamic Locator Helpers
  // ========================

  private getDropdownOption(text: string): Locator {
    return this.page.locator(
      `.multiselect__element span:has-text("${text}"), .dropdown-item:has-text("${text}"), li:has-text("${text}"), [role="option"]:has-text("${text}")`
    ).first();
  }

  private getTableRow(identifier: string): Locator {
    return this.page.locator('tr').filter({ hasText: identifier });
  }

  // ========================
  // Navigation
  // ========================

  /**
   * Navigate to a quote detail page by ID
   * @param quoteId - Quote ID
   */
  async navigateTo(quoteId: string | number): Promise<void> {
    await test.step(`Navigate to quote detail: ${quoteId}`, async () => {
      await this.page.goto(`/Quote/Detail/${quoteId}`);
      await this.waitForPageLoad();
    });
  }

  /**
   * Wait for page to finish loading
   */
  async waitForPageLoad(): Promise<void> {
    await test.step('Wait for quote detail page to load', async () => {
      await this.page.waitForLoadState('domcontentloaded');
      await expect(this.quoteSummaryHeading).toBeVisible({ timeout: 30000 });
    });
  }

  /**
   * Go back to All Quotes list
   */
  async goBackToQuotes(): Promise<void> {
    await test.step('Go back to All Quotes', async () => {
      await this.breadcrumbQuotes.click();
      await this.page.waitForURL(/\/Quote(?:\?|$)/);
    });
  }

  /**
   * Navigate to customer detail page
   */
  async goToCustomer(): Promise<void> {
    await test.step('Navigate to customer', async () => {
      await this.customerLink.click();
      await this.page.waitForURL(/\/Customer\/Detail\/\d+/);
    });
  }

  /**
   * Navigate to site detail page
   */
  async goToSite(): Promise<void> {
    await test.step('Navigate to site', async () => {
      await this.siteLink.click();
      await this.page.waitForURL(/\/Site\/Detail\/\d+/);
    });
  }

  // ========================
  // Tab Navigation
  // ========================

  /**
   * Switch to a specific tab
   * @param tab - Tab to switch to
   */
  async switchToTab(tab: QuoteDetailTab): Promise<void> {
    await test.step(`Switch to ${tab} tab`, async () => {
      const tabMap: Record<QuoteDetailTab, Locator> = {
        'Details': this.detailsTab,
        'Prices': this.pricesTab,
        'Contacts': this.contactsTab,
        'Assets': this.assetsTab,
        'History': this.historyButton,
        'Info': this.infoButton,
      };

      await tabMap[tab].click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Check if a tab is currently active
   * @param tab - Tab to check
   */
  async isTabActive(tab: QuoteDetailTab): Promise<boolean> {
    const tabMap: Record<QuoteDetailTab, Locator> = {
      'Details': this.detailsTab,
      'Prices': this.pricesTab,
      'Contacts': this.contactsTab,
      'Assets': this.assetsTab,
      'History': this.historyButton,
      'Info': this.infoButton,
    };

    const isExpanded = await tabMap[tab].getAttribute('aria-expanded');
    const isActive = await tabMap[tab].getAttribute('class');
    return isExpanded === 'true' || (isActive?.includes('active') ?? false);
  }

  // ========================
  // Header Actions
  // ========================

  /**
   * Click Upgrade button
   */
  async clickUpgrade(): Promise<void> {
    await test.step('Click Upgrade button', async () => {
      await this.upgradeButton.click();
    });
  }

  /**
   * Click Publish in Portal button
   */
  async clickPublishInPortal(): Promise<void> {
    await test.step('Click Publish in Portal button', async () => {
      await this.publishInPortalButton.click();
    });
  }

  /**
   * Click Share button
   */
  async clickShare(): Promise<void> {
    await test.step('Click Share button', async () => {
      await this.shareButton.click();
    });
  }

  // ========================
  // Edit Mode
  // ========================

  /**
   * Enable edit mode by clicking Edit button
   */
  async enableEditMode(): Promise<void> {
    await test.step('Enable edit mode', async () => {
      await this.editButton.click();
      await expect(this.titleInput).toBeEnabled({ timeout: 5000 });
    });
  }

  /**
   * Save changes
   */
  async saveChanges(): Promise<void> {
    await test.step('Save changes', async () => {
      await this.saveButton.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Undo changes
   */
  async undoChanges(): Promise<void> {
    await test.step('Undo changes', async () => {
      await this.undoButton.click();
    });
  }

  /**
   * Check if page is in edit mode
   */
  async isInEditMode(): Promise<boolean> {
    return await this.titleInput.isEnabled();
  }

  // ========================
  // Quote Summary
  // ========================

  /**
   * Get quote summary information
   */
  async getQuoteSummary(): Promise<QuoteSummaryInfo> {
    return await test.step('Get quote summary', async () => {
      const customer = await this.customerLink.textContent() || '';
      const site = await this.siteLink.textContent() || '';
      const profitability = await this.profitabilityValue.textContent() || '';

      return {
        customer: customer.trim(),
        site: site.trim(),
        profitability: profitability.trim(),
      };
    });
  }

  // ========================
  // Detail Form - Fill Methods
  // ========================

  /**
   * Fill title field
   */
  async fillTitle(value: string): Promise<void> {
    await test.step(`Fill title: ${value}`, async () => {
      await this.titleInput.fill(value);
    });
  }

  /**
   * Fill description field
   */
  async fillDescription(value: string): Promise<void> {
    await test.step(`Fill description: ${value}`, async () => {
      await this.descriptionInput.fill(value);
    });
  }

  /**
   * Select job type
   */
  async selectJobType(value: string): Promise<void> {
    await test.step(`Select job type: ${value}`, async () => {
      await this.jobTypeDropdown.click();
      await this.getDropdownOption(value).click();
    });
  }

  /**
   * Select job category
   */
  async selectJobCategory(value: string): Promise<void> {
    await test.step(`Select job category: ${value}`, async () => {
      await this.jobCategoryDropdown.click();
      await this.getDropdownOption(value).click();
    });
  }

  /**
   * Select source of enquiry
   */
  async selectSourceOfEnquiry(value: string): Promise<void> {
    await test.step(`Select source of enquiry: ${value}`, async () => {
      await this.sourceOfEnquiryDropdown.click();
      await this.getDropdownOption(value).click();
    });
  }

  /**
   * Select owner
   */
  async selectOwner(value: string): Promise<void> {
    await test.step(`Select owner: ${value}`, async () => {
      await this.ownerDropdown.click();
      await this.getDropdownOption(value).click();
    });
  }

  /**
   * Select trade
   */
  async selectTrade(value: string): Promise<void> {
    await test.step(`Select trade: ${value}`, async () => {
      await this.tradeDropdown.click();
      await this.getDropdownOption(value).click();
    });
  }

  /**
   * Fill reference number
   */
  async fillReferenceNumber(value: string): Promise<void> {
    await test.step(`Fill reference number: ${value}`, async () => {
      await this.referenceNumberInput.fill(value);
    });
  }

  /**
   * Select priority
   */
  async selectPriority(value: string): Promise<void> {
    await test.step(`Select priority: ${value}`, async () => {
      await this.priorityDropdown.click();
      await this.getDropdownOption(value).click();
    });
  }

  /**
   * Fill quote ref 1
   */
  async fillQuoteRef1(value: string): Promise<void> {
    await test.step(`Fill quote ref 1: ${value}`, async () => {
      await this.quoteRef1Input.fill(value);
    });
  }

  /**
   * Fill expiry date
   */
  async fillExpiryDate(value: string): Promise<void> {
    await test.step(`Fill expiry date: ${value}`, async () => {
      await this.expiryDateInput.fill(value);
    });
  }

  /**
   * Fill next contact date
   */
  async fillNextContactDate(value: string): Promise<void> {
    await test.step(`Fill next contact date: ${value}`, async () => {
      await this.nextContactDateInput.fill(value);
    });
  }

  /**
   * Fill expected sale date
   */
  async fillExpectedSaleDate(value: string): Promise<void> {
    await test.step(`Fill expected sale date: ${value}`, async () => {
      await this.expectedSaleDateInput.fill(value);
    });
  }

  // ========================
  // AI Features
  // ========================

  /**
   * Click Summarise button to generate AI summary
   */
  async clickSummarise(): Promise<void> {
    await test.step('Click Summarise button', async () => {
      await this.summariseButton.click();
    });
  }

  /**
   * Click Regenerate to regenerate AI summary
   */
  async clickRegenerate(): Promise<void> {
    await test.step('Click Regenerate button', async () => {
      await this.regenerateButton.click();
    });
  }

  // ========================
  // Rejection Actions
  // ========================

  /**
   * Click Reject button to open rejection modal
   */
  async clickRejectButton(): Promise<void> {
    await test.step('Click Reject button', async () => {
      await this.rejectButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.rejectButton.click();
      await this.rejectModal.waitFor({ state: 'visible', timeout: 10000 });
    });
  }

  /**
   * Select rejection reason from dropdown
   */
  async selectRejectionReason(reason: string): Promise<void> {
    await test.step(`Select rejection reason: ${reason}`, async () => {
      await this.rejectModalReasonDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await this.rejectModalReasonDropdown.click();
      const option = this.getDropdownOption(reason);
      await option.waitFor({ state: 'visible', timeout: 5000 });
      await option.click();
    });
  }

  /**
   * Fill rejection reason text
   */
  async fillRejectionReason(rejectionText: string): Promise<void> {
    await test.step(`Fill rejection reason: ${rejectionText}`, async () => {
      await this.rejectModalTextarea.waitFor({ state: 'visible', timeout: 5000 });
      await this.rejectModalTextarea.fill(rejectionText);
    });
  }

  /**
   * Save rejection
   */
  async saveRejection(): Promise<void> {
    await test.step('Save rejection', async () => {
      await this.rejectModalSaveButton.click();
      await this.rejectModal.waitFor({ state: 'hidden', timeout: 15000 });
    });
  }

  /**
   * Close rejection modal without saving
   */
  async closeRejectionModal(): Promise<void> {
    await test.step('Close rejection modal', async () => {
      await this.rejectModalCloseButton.click();
      await this.rejectModal.waitFor({ state: 'hidden', timeout: 5000 });
    });
  }

  /**
   * Reject quote with reason
   * @param reason - Rejection reason from dropdown
   * @param details - Additional rejection details
   */
  async rejectQuote(reason: string, details?: string): Promise<void> {
    await test.step(`Reject quote with reason: ${reason}`, async () => {
      await this.clickRejectButton();
      await this.selectRejectionReason(reason);
      if (details) {
        await this.fillRejectionReason(details);
      }
      await this.saveRejection();
    });
  }

  // ========================
  // Assertions
  // ========================

  /**
   * Get quote status text
   */
  async getStatusText(): Promise<string> {
    return await test.step('Get quote status text', async () => {
      await this.statusBanner.waitFor({ state: 'visible', timeout: 10000 });
      return await this.statusBanner.textContent() || '';
    });
  }

  /**
   * Check if Revert button is visible
   */
  async isRevertButtonVisible(): Promise<boolean> {
    return await test.step('Check if Revert button is visible', async () => {
      return await this.revertButton.isVisible();
    });
  }

  /**
   * Check if quote is in rejected status
   */
  async isRejected(): Promise<boolean> {
    return await test.step('Check if quote is rejected', async () => {
      const statusText = await this.getStatusText();
      return statusText.toLowerCase().includes('rejected');
    });
  }

  // ========================
  // Toast & Modal Helpers
  // ========================

  /**
   * Wait for toast message to appear
   */
  async waitForToast(): Promise<string> {
    return await test.step('Wait for toast message', async () => {
      await this.toastMessage.waitFor({ state: 'visible', timeout: 10000 });
      return await this.toastMessage.textContent() || '';
    });
  }

  /**
   * Confirm action in modal
   */
  async confirmAction(): Promise<void> {
    await test.step('Confirm action', async () => {
      await this.confirmYesButton.click();
      await this.confirmModal.waitFor({ state: 'hidden', timeout: 5000 });
    });
  }

  /**
   * Cancel action in modal
   */
  async cancelAction(): Promise<void> {
    await test.step('Cancel action', async () => {
      await this.confirmNoButton.click();
      await this.confirmModal.waitFor({ state: 'hidden', timeout: 5000 });
    });
  }
}
