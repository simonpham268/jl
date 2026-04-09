import { type Locator, type Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Invoice Detail Tab options
 */
export type InvoiceDetailTab =
  | 'Details'
  | 'Line Items'
  | 'History'
  | 'Info';

/**
 * Invoice Summary information
 */
export interface InvoiceSummaryInfo {
  customer: string;
  site: string;
  jobNumber: string;
  invoiceStatus: string;
  paymentStatus: string;
  dateRaised: string;
  paymentDueDate: string;
}

/**
 * Invoice Detail form data
 */
export interface InvoiceDetailData {
  tags?: string[];
  invoiceStatus?: string;
  paymentStatus?: string;
  customerOrderNumber?: string;
  accountNumber?: string;
  dateRaised?: string;
  paymentDueDate?: string;
}

/**
 * InvoiceDetailPage - Page Object for Invoice Detail page
 * URL Pattern: /Invoice/Detail/{invoiceId}
 */
export class InvoiceDetailPage extends BasePage {
  // ========================
  // Locators - Page Header
  // ========================
  readonly pageTitle: Locator;
  readonly breadcrumbInvoices: Locator;
  readonly invoiceNumber: Locator;
  readonly statusBadge: Locator;

  // ========================
  // Locators - Tabs
  // ========================
  readonly detailsTab: Locator;
  readonly lineItemsTab: Locator;
  readonly historyButton: Locator;
  readonly infoButton: Locator;

  // ========================
  // Locators - Header Actions
  // ========================
  readonly printButton: Locator;
  readonly emailButton: Locator;
  readonly shareButton: Locator;
  readonly creditButton: Locator;
  readonly downloadPdfButton: Locator;

  // ========================
  // Locators - Invoice Summary
  // ========================
  readonly summaryHeading: Locator;
  readonly customerLink: Locator;
  readonly siteLink: Locator;
  readonly jobNumberLink: Locator;

  // ========================
  // Locators - Invoice Details Section
  // ========================
  readonly editButton: Locator;
  readonly saveButton: Locator;
  readonly undoButton: Locator;
  readonly tagsDropdown: Locator;
  readonly invoiceStatusDisplay: Locator;
  readonly paymentStatusDisplay: Locator;
  readonly dateRaisedInput: Locator;
  readonly paymentDueDateInput: Locator;
  readonly customerOrderNumberInput: Locator;
  readonly accountNumberInput: Locator;

  // ========================
  // Locators - Line Items Section
  // ========================
  readonly addLineItemButton: Locator;
  readonly lineItemsTable: Locator;
  readonly totalAmount: Locator;
  readonly vatAmount: Locator;
  readonly grandTotal: Locator;

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
    this.pageTitle = page.getByRole('heading', { level: 3 }).filter({ hasText: /Invoice.*\// });
    this.breadcrumbInvoices = page.getByRole('link', { name: 'Invoices', exact: true })
      .or(page.getByRole('link', { name: 'Invoice(s)', exact: true }));
    this.invoiceNumber = page.locator('h3').locator('span, div').filter({ hasText: /^INV\d+/ });
    this.statusBadge = page.locator('h3').locator('[class*="badge"], [class*="status"]');

    // Tabs
    this.detailsTab = page.getByRole('link', { name: 'Details', exact: true });
    this.lineItemsTab = page.getByRole('link', { name: 'Line Items' });
    this.historyButton = page.getByRole('button', { name: 'History' });
    this.infoButton = page.getByRole('button', { name: 'Info' });

    // Header Actions
    this.printButton = page.getByRole('button', { name: 'Print' })
      .or(page.locator('li').filter({ hasText: 'Print' }).first());
    this.emailButton = page.getByRole('button', { name: 'Email' })
      .or(page.locator('li').filter({ hasText: 'Email' }).first());
    this.shareButton = page.getByRole('button', { name: 'Share' });
    this.creditButton = page.getByRole('button', { name: 'Credit' })
      .or(page.locator('li').filter({ hasText: 'Credit' }).first());
    this.downloadPdfButton = page.getByRole('link', { name: /download|pdf/i });

    // Invoice Summary
    this.summaryHeading = page.getByRole('heading', { name: 'Invoice Summary' });
    this.customerLink = page.locator('text=Customer').locator('..').getByRole('link')
      .or(page.locator('text=Customer Name').locator('..').getByRole('link'));
    this.siteLink = page.locator('text=Site').locator('..').getByRole('link')
      .or(page.locator('text=Site Name').locator('..').getByRole('link'));
    this.jobNumberLink = page.locator('text=Job Number').locator('..').getByRole('link');

    // Invoice Details Section
    this.editButton = page.getByRole('button', { name: 'Edit' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.undoButton = page.getByRole('button', { name: 'Undo' });
    this.tagsDropdown = page.locator('text=Tag(s)').locator('..').locator('listbox, [role="listbox"], [class*="multiselect"]');
    this.invoiceStatusDisplay = page.locator('text=Invoice Status').locator('..').locator('p, span').last();
    this.paymentStatusDisplay = page.locator('text=Payment Status').locator('..').locator('p, span').last();
    this.dateRaisedInput = page.locator('text=Date Raised').locator('..').getByRole('textbox');
    this.paymentDueDateInput = page.locator('text=Payment Due Date').locator('..').getByRole('textbox');
    this.customerOrderNumberInput = page.locator('text=Customer Order Number').locator('..').getByRole('textbox');
    this.accountNumberInput = page.locator('text=Account Number').locator('..').getByRole('textbox');

    // Line Items Section
    this.addLineItemButton = page.getByRole('button', { name: /Add.*Line|Add.*Item/i });
    this.lineItemsTable = page.locator('table').filter({ has: page.locator('th', { hasText: /Description|Amount/i }) });
    this.totalAmount = page.locator('text=Total').locator('..').locator('[class*="amount"], span').last();
    this.vatAmount = page.locator('text=VAT').locator('..').locator('[class*="amount"], span').last();
    this.grandTotal = page.locator('text=Grand Total').locator('..').locator('[class*="amount"], span').last();

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
      `[role="option"]:has-text("${text}"), .dropdown-item:has-text("${text}"), li:has-text("${text}")`
    ).first();
  }

  private getLineItemRow(description: string): Locator {
    return this.lineItemsTable.locator('tr').filter({ hasText: description });
  }

  // ========================
  // Navigation
  // ========================

  /**
   * Navigate to an invoice detail page by ID
   * @param invoiceId - Invoice ID
   */
  async navigateTo(invoiceId: string | number): Promise<void> {
    await test.step(`Navigate to invoice: ${invoiceId}`, async () => {
      await this.page.goto(`/Invoice/Detail/${invoiceId}`);
      await this.waitForPageLoad();
    });
  }

  /**
   * Wait for page to finish loading
   */
  async waitForPageLoad(): Promise<void> {
    await test.step('Wait for invoice detail page to load', async () => {
      await this.page.waitForLoadState('networkidle');
      await expect(this.summaryHeading).toBeVisible({ timeout: 15000 });
    });
  }

  /**
   * Go back to All Invoices list
   */
  async goBackToInvoices(): Promise<void> {
    await test.step('Go back to All Invoices', async () => {
      await this.breadcrumbInvoices.click();
      await this.page.waitForURL(/\/Invoice(?:\?|$)/);
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

  /**
   * Navigate to job detail page
   */
  async goToJob(): Promise<void> {
    await test.step('Navigate to job', async () => {
      await this.jobNumberLink.click();
      await this.page.waitForURL(/\/Job\/Detail\/\d+/);
    });
  }

  // ========================
  // Tab Navigation
  // ========================

  /**
   * Switch to a specific tab
   * @param tab - Tab to switch to
   */
  async switchToTab(tab: InvoiceDetailTab): Promise<void> {
    await test.step(`Switch to ${tab} tab`, async () => {
      const tabMap: Record<InvoiceDetailTab, Locator> = {
        'Details': this.detailsTab,
        'Line Items': this.lineItemsTab,
        'History': this.historyButton,
        'Info': this.infoButton,
      };

      await tabMap[tab].click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  /**
   * Check if a tab is currently active
   * @param tab - Tab to check
   */
  async isTabActive(tab: InvoiceDetailTab): Promise<boolean> {
    const tabMap: Record<InvoiceDetailTab, Locator> = {
      'Details': this.detailsTab,
      'Line Items': this.lineItemsTab,
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
   * Click Print button
   */
  async clickPrint(): Promise<void> {
    await test.step('Click Print button', async () => {
      await this.printButton.click();
    });
  }

  /**
   * Click Email button
   */
  async clickEmail(): Promise<void> {
    await test.step('Click Email button', async () => {
      await this.emailButton.click();
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

  /**
   * Click Credit button
   */
  async clickCredit(): Promise<void> {
    await test.step('Click Credit button', async () => {
      await this.creditButton.click();
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
      await expect(this.customerOrderNumberInput).toBeEnabled({ timeout: 5000 });
    });
  }

  /**
   * Save changes
   */
  async saveChanges(): Promise<void> {
    await test.step('Save changes', async () => {
      await this.saveButton.click();
      await this.page.waitForLoadState('networkidle');
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
    return await this.customerOrderNumberInput.isEnabled();
  }

  // ========================
  // Invoice Summary
  // ========================

  /**
   * Get invoice summary information
   */
  async getSummary(): Promise<InvoiceSummaryInfo> {
    return await test.step('Get invoice summary', async () => {
      const customer = await this.customerLink.textContent() || '';
      const site = await this.siteLink.textContent() || '';
      const jobNumber = await this.jobNumberLink.textContent() || '';
      const invoiceStatus = await this.invoiceStatusDisplay.textContent() || '';
      const paymentStatus = await this.paymentStatusDisplay.textContent() || '';
      const dateRaised = await this.dateRaisedInput.inputValue().catch(() => '');
      const paymentDueDate = await this.paymentDueDateInput.inputValue().catch(() => '');

      return {
        customer: customer.trim(),
        site: site.trim(),
        jobNumber: jobNumber.trim(),
        invoiceStatus: invoiceStatus.trim(),
        paymentStatus: paymentStatus.trim(),
        dateRaised: dateRaised.trim(),
        paymentDueDate: paymentDueDate.trim(),
      };
    });
  }

  // ========================
  // Invoice Details - Fill Methods
  // ========================

  /**
   * Fill customer order number
   */
  async fillCustomerOrderNumber(value: string): Promise<void> {
    await test.step(`Fill customer order number: ${value}`, async () => {
      await this.customerOrderNumberInput.fill(value);
    });
  }

  /**
   * Fill account number
   */
  async fillAccountNumber(value: string): Promise<void> {
    await test.step(`Fill account number: ${value}`, async () => {
      await this.accountNumberInput.fill(value);
    });
  }

  /**
   * Fill date raised
   */
  async fillDateRaised(value: string): Promise<void> {
    await test.step(`Fill date raised: ${value}`, async () => {
      await this.dateRaisedInput.fill(value);
    });
  }

  /**
   * Fill payment due date
   */
  async fillPaymentDueDate(value: string): Promise<void> {
    await test.step(`Fill payment due date: ${value}`, async () => {
      await this.paymentDueDateInput.fill(value);
    });
  }

  // ========================
  // Line Items
  // ========================

  /**
   * Click Add Line Item button
   */
  async clickAddLineItem(): Promise<void> {
    await test.step('Click Add Line Item button', async () => {
      await this.addLineItemButton.click();
    });
  }

  /**
   * Get total amount
   */
  async getTotalAmount(): Promise<string> {
    return await test.step('Get total amount', async () => {
      const text = await this.totalAmount.textContent() || '';
      return text.trim();
    });
  }

  /**
   * Get VAT amount
   */
  async getVatAmount(): Promise<string> {
    return await test.step('Get VAT amount', async () => {
      const text = await this.vatAmount.textContent() || '';
      return text.trim();
    });
  }

  /**
   * Get grand total
   */
  async getGrandTotal(): Promise<string> {
    return await test.step('Get grand total', async () => {
      const text = await this.grandTotal.textContent() || '';
      return text.trim();
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
