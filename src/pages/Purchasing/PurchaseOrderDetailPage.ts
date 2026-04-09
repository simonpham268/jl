import { type Locator, type Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Purchase Order Detail Tab options
 */
export type PurchaseOrderDetailTab =
  | 'Details'
  | 'Line Items'
  | 'Delivery'
  | 'History'
  | 'Info';

/**
 * PO Status options
 */
export type POStatus =
  | 'All'
  | 'Fully Delivered'
  | 'Partially Delivered'
  | 'Not Delivered'
  | 'In Query'
  | 'Not Applicable'
  | 'Needs Approval'
  | 'Partially Returned';

/**
 * Purchase Order summary information
 */
export interface PurchaseOrderSummaryInfo {
  supplier: string;
  jobNumber: string;
  dateRaised: string;
  status: string;
  totalAmount: string;
}

/**
 * Purchase Order data
 */
export interface PurchaseOrderData {
  supplier?: string;
  referenceNumber?: string;
  accountNumber?: string;
  purchaseOrderNumber?: string;
  deliveryAddress?: string;
  notes?: string;
  dateRaised?: string;
}

/**
 * PurchaseOrderDetailPage - Page Object for Purchase Order Detail page
 * URL Pattern: /PurchaseOrder/Detail/{poId}
 */
export class PurchaseOrderDetailPage extends BasePage {
  // ========================
  // Locators - Page Header
  // ========================
  readonly pageTitle: Locator;
  readonly breadcrumbPurchaseOrders: Locator;
  readonly poNumber: Locator;
  readonly statusBadge: Locator;

  // ========================
  // Locators - Tabs
  // ========================
  readonly detailsTab: Locator;
  readonly lineItemsTab: Locator;
  readonly deliveryTab: Locator;
  readonly historyButton: Locator;
  readonly infoButton: Locator;

  // ========================
  // Locators - Header Actions
  // ========================
  readonly editButton: Locator;
  readonly saveButton: Locator;
  readonly undoButton: Locator;
  readonly printButton: Locator;
  readonly emailButton: Locator;
  readonly shareButton: Locator;
  readonly cancelPOButton: Locator;

  // ========================
  // Locators - PO Summary
  // ========================
  readonly summaryHeading: Locator;
  readonly supplierLink: Locator;
  readonly jobLink: Locator;

  // ========================
  // Locators - PO Details Section
  // ========================
  readonly supplierDropdown: Locator;
  readonly referenceNumberInput: Locator;
  readonly accountNumberInput: Locator;
  readonly purchaseOrderNumberInput: Locator;
  readonly deliveryAddressInput: Locator;
  readonly notesInput: Locator;
  readonly dateRaisedInput: Locator;

  // ========================
  // Locators - Line Items Section
  // ========================
  readonly addLineItemButton: Locator;
  readonly lineItemsTable: Locator;
  readonly totalAmount: Locator;
  readonly vatAmount: Locator;
  readonly grandTotal: Locator;

  // ========================
  // Locators - Delivery Section
  // ========================
  readonly deliveryStatusDropdown: Locator;
  readonly deliveryDateInput: Locator;
  readonly deliveryNotesInput: Locator;

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
    this.pageTitle = page.getByRole('heading', { level: 3 }).filter({ hasText: /Purchase Order.*\// });
    this.breadcrumbPurchaseOrders = page.getByRole('link', { name: 'Purchase Orders', exact: true });
    this.poNumber = page.locator('h3').locator('span, div').filter({ hasText: /^PO\d+/ });
    this.statusBadge = page.locator('h3').locator('[class*="badge"], [class*="status"]');

    // Tabs
    this.detailsTab = page.getByRole('link', { name: 'Details', exact: true });
    this.lineItemsTab = page.getByRole('link', { name: 'Line Items' });
    this.deliveryTab = page.getByRole('link', { name: 'Delivery', exact: true });
    this.historyButton = page.getByRole('button', { name: 'History' });
    this.infoButton = page.getByRole('button', { name: 'Info' });

    // Header Actions
    this.editButton = page.getByRole('button', { name: 'Edit' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.undoButton = page.getByRole('button', { name: 'Undo' });
    this.printButton = page.getByRole('button', { name: 'Print' })
      .or(page.locator('li').filter({ hasText: 'Print' }).first());
    this.emailButton = page.getByRole('button', { name: 'Email' })
      .or(page.locator('li').filter({ hasText: 'Email' }).first());
    this.shareButton = page.getByRole('button', { name: 'Share' });
    this.cancelPOButton = page.getByRole('button', { name: /Cancel.*PO/i })
      .or(page.locator('li').filter({ hasText: /Cancel/ }).first());

    // PO Summary
    this.summaryHeading = page.getByRole('heading', { name: /Purchase Order Summary/i });
    this.supplierLink = page.locator('text=Supplier').locator('..').getByRole('link');
    this.jobLink = page.locator('text=Job').locator('..').getByRole('link');

    // PO Details Section
    this.supplierDropdown = page.locator('text=Supplier').locator('..').locator('[role="combobox"], [class*="multiselect"]');
    this.referenceNumberInput = page.locator('text=Reference Number').locator('..').getByRole('textbox');
    this.accountNumberInput = page.locator('text=Account Number').locator('..').getByRole('textbox');
    this.purchaseOrderNumberInput = page.locator('text=Purchase Order Number').locator('..').getByRole('textbox');
    this.deliveryAddressInput = page.locator('text=Delivery Address').locator('..').getByRole('textbox');
    this.notesInput = page.locator('text=Notes').locator('..').getByRole('textbox');
    this.dateRaisedInput = page.locator('text=Date Raised').locator('..').getByRole('textbox');

    // Line Items Section
    this.addLineItemButton = page.getByRole('button', { name: /Add.*Line|Add.*Item/i });
    this.lineItemsTable = page.locator('table').filter({ has: page.locator('th', { hasText: /Description|Amount|Quantity/i }) });
    this.totalAmount = page.locator('text=Total').locator('..').locator('[class*="amount"], span').last();
    this.vatAmount = page.locator('text=VAT').locator('..').locator('[class*="amount"], span').last();
    this.grandTotal = page.locator('text=Grand Total').locator('..').locator('[class*="amount"], span').last();

    // Delivery Section
    this.deliveryStatusDropdown = page.locator('text=Delivery Status').locator('..').locator('[role="combobox"], [class*="multiselect"]');
    this.deliveryDateInput = page.locator('text=Delivery Date').locator('..').getByRole('textbox');
    this.deliveryNotesInput = page.locator('text=Delivery Notes').locator('..').getByRole('textbox');

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
   * Navigate to a purchase order detail page by ID
   * @param poId - Purchase Order ID
   */
  async navigateTo(poId: string | number): Promise<void> {
    await test.step(`Navigate to purchase order: ${poId}`, async () => {
      await this.page.goto(`/PurchaseOrder/Detail/${poId}`);
      await this.waitForPageLoad();
    });
  }

  /**
   * Wait for page to finish loading
   */
  async waitForPageLoad(): Promise<void> {
    await test.step('Wait for purchase order detail page to load', async () => {
      await this.page.waitForLoadState('networkidle');
      await expect(this.pageTitle).toBeVisible({ timeout: 15000 });
    });
  }

  /**
   * Go back to Purchase Orders list
   */
  async goBackToPurchaseOrders(): Promise<void> {
    await test.step('Go back to Purchase Orders list', async () => {
      await this.breadcrumbPurchaseOrders.click();
      await this.page.waitForURL(/\/PurchaseOrder(?:\?|$)/);
    });
  }

  /**
   * Navigate to supplier page
   */
  async goToSupplier(): Promise<void> {
    await test.step('Navigate to supplier', async () => {
      await this.supplierLink.click();
    });
  }

  /**
   * Navigate to job detail page
   */
  async goToJob(): Promise<void> {
    await test.step('Navigate to job', async () => {
      await this.jobLink.click();
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
  async switchToTab(tab: PurchaseOrderDetailTab): Promise<void> {
    await test.step(`Switch to ${tab} tab`, async () => {
      const tabMap: Record<PurchaseOrderDetailTab, Locator> = {
        'Details': this.detailsTab,
        'Line Items': this.lineItemsTab,
        'Delivery': this.deliveryTab,
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
  async isTabActive(tab: PurchaseOrderDetailTab): Promise<boolean> {
    const tabMap: Record<PurchaseOrderDetailTab, Locator> = {
      'Details': this.detailsTab,
      'Line Items': this.lineItemsTab,
      'Delivery': this.deliveryTab,
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
   * Click Cancel PO button
   */
  async clickCancelPO(): Promise<void> {
    await test.step('Click Cancel PO button', async () => {
      await this.cancelPOButton.click();
    });
  }

  // ========================
  // Edit Mode
  // ========================

  /**
   * Enable edit mode
   */
  async enableEditMode(): Promise<void> {
    await test.step('Enable edit mode', async () => {
      await this.editButton.click();
      await expect(this.notesInput).toBeEnabled({ timeout: 5000 });
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
    return await this.notesInput.isEnabled();
  }

  // ========================
  // PO Details - Fill Methods
  // ========================

  /**
   * Select supplier
   */
  async selectSupplier(supplier: string): Promise<void> {
    await test.step(`Select supplier: ${supplier}`, async () => {
      await this.supplierDropdown.click();
      await this.getDropdownOption(supplier).click();
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
   * Fill account number
   */
  async fillAccountNumber(value: string): Promise<void> {
    await test.step(`Fill account number: ${value}`, async () => {
      await this.accountNumberInput.fill(value);
    });
  }

  /**
   * Fill delivery address
   */
  async fillDeliveryAddress(value: string): Promise<void> {
    await test.step(`Fill delivery address: ${value}`, async () => {
      await this.deliveryAddressInput.fill(value);
    });
  }

  /**
   * Fill notes
   */
  async fillNotes(value: string): Promise<void> {
    await test.step(`Fill notes: ${value}`, async () => {
      await this.notesInput.fill(value);
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
   * Get grand total
   */
  async getGrandTotal(): Promise<string> {
    return await test.step('Get grand total', async () => {
      const text = await this.grandTotal.textContent() || '';
      return text.trim();
    });
  }

  // ========================
  // Delivery
  // ========================

  /**
   * Select delivery status
   */
  async selectDeliveryStatus(status: string): Promise<void> {
    await test.step(`Select delivery status: ${status}`, async () => {
      await this.deliveryStatusDropdown.click();
      await this.getDropdownOption(status).click();
    });
  }

  /**
   * Fill delivery date
   */
  async fillDeliveryDate(value: string): Promise<void> {
    await test.step(`Fill delivery date: ${value}`, async () => {
      await this.deliveryDateInput.fill(value);
    });
  }

  /**
   * Fill delivery notes
   */
  async fillDeliveryNotes(value: string): Promise<void> {
    await test.step(`Fill delivery notes: ${value}`, async () => {
      await this.deliveryNotesInput.fill(value);
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
