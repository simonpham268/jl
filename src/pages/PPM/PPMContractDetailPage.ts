import { type Locator, type Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * PPM Contract Detail Tab options
 */
export type PPMContractDetailTab =
  | 'Details'
  | 'Visits'
  | 'Costs'
  | 'Invoice Header'
  | 'Invoices'
  | 'Notes'
  | 'Schedule'
  | 'History'
  | 'Contract Purchase Order';

/**
 * PPM Contract Summary information
 */
export interface PPMContractSummaryInfo {
  customer: string;
  site: string;
}

/**
 * PPM Contract Detail form data
 */
export interface PPMContractDetailData {
  planReference?: string;
  description?: string;
  jobCategory?: string;
  accountManager?: string;
  tags?: string[];
  customerOrderNumber?: string;
  startDate?: string;
  endDate?: string;
  sellingRate?: string;
}

/**
 * PPMContractDetailPage - Page Object for PPM Contract Detail page
 * URL Pattern: /PPMContract/Detail/{contractId}
 */
export class PPMContractDetailPage extends BasePage {
  // ========================
  // Locators - Page Header
  // ========================
  readonly pageTitle: Locator;
  readonly breadcrumbPPMContracts: Locator;
  readonly contractNumber: Locator;

  // ========================
  // Locators - Tabs
  // ========================
  readonly detailsTab: Locator;
  readonly visitsTab: Locator;
  readonly costsTab: Locator;
  readonly invoiceHeaderTab: Locator;
  readonly invoicesTab: Locator;
  readonly notesTab: Locator;
  readonly scheduleTab: Locator;
  readonly historyButton: Locator;
  readonly contractPurchaseOrderTab: Locator;

  // ========================
  // Locators - Header Actions
  // ========================
  readonly addInvoiceButton: Locator;
  readonly renewContractButton: Locator;
  readonly exportButton: Locator;
  readonly shareButton: Locator;

  // ========================
  // Locators - PPM Contract Summary
  // ========================
  readonly summaryHeading: Locator;
  readonly customerLink: Locator;
  readonly siteLink: Locator;

  // ========================
  // Locators - PPM Contract Details Section
  // ========================
  readonly editButton: Locator;
  readonly undoButton: Locator;
  readonly saveButton: Locator;
  readonly contractNumberDisplay: Locator;
  readonly planReferenceInput: Locator;
  readonly descriptionInput: Locator;
  readonly descriptionAiButton: Locator;
  readonly jobCategoryDropdown: Locator;
  readonly accountManagerDropdown: Locator;
  readonly tagsDropdown: Locator;
  readonly customerOrderNumberInput: Locator;
  readonly startDateInput: Locator;
  readonly endDateInput: Locator;

  // ========================
  // Locators - Selling Rate Section
  // ========================
  readonly sellingRateDropdown: Locator;
  readonly totalContractValue: Locator;

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
    this.pageTitle = page.getByRole('heading', { level: 3 }).filter({ hasText: 'PPM Contracts /' });
    this.breadcrumbPPMContracts = page.getByRole('link', { name: 'PPM Contracts', exact: true });
    this.contractNumber = page.locator('h3').locator('span, div').filter({ hasText: /^PM\d+/ });

    // Tabs
    this.detailsTab = page.getByRole('link', { name: 'Details', exact: true });
    this.visitsTab = page.getByRole('link', { name: 'Visits', exact: true });
    this.costsTab = page.getByRole('link', { name: 'Costs', exact: true });
    this.invoiceHeaderTab = page.getByRole('link', { name: 'Invoice Header' });
    this.invoicesTab = page.getByRole('link', { name: 'Invoices', exact: true });
    this.notesTab = page.getByRole('link', { name: 'Notes', exact: true });
    this.scheduleTab = page.getByRole('link', { name: 'Schedule', exact: true });
    this.historyButton = page.getByRole('button', { name: 'History' });
    this.contractPurchaseOrderTab = page.getByRole('link', { name: 'Contract Purchase Order' });

    // Header Actions
    this.addInvoiceButton = page.locator('li').filter({ hasText: 'Add Invoice' }).first();
    this.renewContractButton = page.getByRole('link', { name: 'Renew Contract' });
    this.exportButton = page.getByRole('link', { name: 'Export' });
    this.shareButton = page.getByRole('button', { name: 'Share' });

    // PPM Contract Summary
    this.summaryHeading = page.getByRole('heading', { name: 'PPM Contracts Summary' });
    this.customerLink = page.locator('text=Customer').locator('..').getByRole('link');
    this.siteLink = page.locator('text=Site').locator('..').getByRole('link');

    // PPM Contract Details Section
    this.editButton = page.getByRole('button', { name: 'Edit' });
    this.undoButton = page.getByRole('button', { name: 'Undo' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.contractNumberDisplay = page.locator('text=PPM Contract Number').locator('..');
    this.planReferenceInput = page.getByRole('textbox', { name: 'Plan Reference' });
    this.descriptionInput = page.getByRole('textbox', { name: 'Description' });
    this.descriptionAiButton = page.locator('text=Description').locator('..').locator('button').filter({ has: page.locator('img') });
    this.jobCategoryDropdown = page.getByRole('combobox', { name: 'Job Category' });
    this.accountManagerDropdown = page.getByRole('combobox', { name: 'PPM Contract Account Manager' });
    this.tagsDropdown = page.locator('text=Tag(s)').locator('..').locator('listbox, [role="listbox"]');
    this.customerOrderNumberInput = page.getByRole('textbox', { name: 'Customer Order Number' });
    this.startDateInput = page.getByRole('textbox', { name: 'Start Date' });
    this.endDateInput = page.getByRole('textbox', { name: 'End Date' });

    // Selling Rate Section
    this.sellingRateDropdown = page.getByRole('combobox', { name: 'Selling Rate' });
    this.totalContractValue = page.locator('text=Total Contract Value').locator('..');

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

  private getTableRow(identifier: string): Locator {
    return this.page.locator('tr').filter({ hasText: identifier });
  }

  // ========================
  // Navigation
  // ========================

  /**
   * Navigate to a PPM Contract detail page by ID
   * @param contractId - PPM Contract ID (GUID)
   */
  async navigateTo(contractId: string): Promise<void> {
    await test.step(`Navigate to PPM Contract: ${contractId}`, async () => {
      await this.page.goto(`/PPMContract/Detail/${contractId}`);
      await this.waitForPageLoad();
    });
  }

  /**
   * Wait for page to finish loading
   */
  async waitForPageLoad(): Promise<void> {
    await test.step('Wait for PPM Contract detail page to load', async () => {
      await this.page.waitForLoadState('domcontentloaded');
      await expect(this.summaryHeading).toBeVisible({ timeout: 15000 });
    });
  }

  /**
   * Go back to All PPM Contracts list
   */
  async goBackToPPMContracts(): Promise<void> {
    await test.step('Go back to All PPM Contracts', async () => {
      await this.breadcrumbPPMContracts.click();
      await this.page.waitForURL(/\/PPMContract(?:\?|$)/);
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
  async switchToTab(tab: PPMContractDetailTab): Promise<void> {
    await test.step(`Switch to ${tab} tab`, async () => {
      const tabMap: Record<PPMContractDetailTab, Locator> = {
        'Details': this.detailsTab,
        'Visits': this.visitsTab,
        'Costs': this.costsTab,
        'Invoice Header': this.invoiceHeaderTab,
        'Invoices': this.invoicesTab,
        'Notes': this.notesTab,
        'Schedule': this.scheduleTab,
        'History': this.historyButton,
        'Contract Purchase Order': this.contractPurchaseOrderTab,
      };

      await tabMap[tab].click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Check if a tab is currently active
   * @param tab - Tab to check
   */
  async isTabActive(tab: PPMContractDetailTab): Promise<boolean> {
    const tabMap: Record<PPMContractDetailTab, Locator> = {
      'Details': this.detailsTab,
      'Visits': this.visitsTab,
      'Costs': this.costsTab,
      'Invoice Header': this.invoiceHeaderTab,
      'Invoices': this.invoicesTab,
      'Notes': this.notesTab,
      'Schedule': this.scheduleTab,
      'History': this.historyButton,
      'Contract Purchase Order': this.contractPurchaseOrderTab,
    };

    const isExpanded = await tabMap[tab].getAttribute('aria-expanded');
    const isActive = await tabMap[tab].getAttribute('class');
    return isExpanded === 'true' || (isActive?.includes('active') ?? false);
  }

  // ========================
  // Header Actions
  // ========================

  /**
   * Click Add Invoice button
   */
  async clickAddInvoice(): Promise<void> {
    await test.step('Click Add Invoice button', async () => {
      await this.addInvoiceButton.click();
    });
  }

  /**
   * Click Renew Contract button
   */
  async clickRenewContract(): Promise<void> {
    await test.step('Click Renew Contract button', async () => {
      await this.renewContractButton.click();
      await this.page.waitForURL(/\/PPMContract\/Renew/);
    });
  }

  /**
   * Click Export button
   */
  async clickExport(): Promise<void> {
    await test.step('Click Export button', async () => {
      await this.exportButton.click();
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
      await expect(this.descriptionInput).toBeEnabled({ timeout: 5000 });
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
    return await this.descriptionInput.isEnabled();
  }

  // ========================
  // PPM Contract Summary
  // ========================

  /**
   * Get PPM Contract summary information
   */
  async getSummary(): Promise<PPMContractSummaryInfo> {
    return await test.step('Get PPM Contract summary', async () => {
      const customer = await this.customerLink.textContent() || '';
      const site = await this.siteLink.textContent() || '';

      return {
        customer: customer.trim(),
        site: site.trim(),
      };
    });
  }

  // ========================
  // PPM Contract Details - Fill Methods
  // ========================

  /**
   * Fill plan reference field
   */
  async fillPlanReference(value: string): Promise<void> {
    await test.step(`Fill plan reference: ${value}`, async () => {
      await this.planReferenceInput.fill(value);
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
   * Select job category
   */
  async selectJobCategory(value: string): Promise<void> {
    await test.step(`Select job category: ${value}`, async () => {
      await this.jobCategoryDropdown.click();
      await this.getDropdownOption(value).click();
    });
  }

  /**
   * Select account manager
   */
  async selectAccountManager(value: string): Promise<void> {
    await test.step(`Select account manager: ${value}`, async () => {
      await this.accountManagerDropdown.click();
      await this.getDropdownOption(value).click();
    });
  }

  /**
   * Fill customer order number
   */
  async fillCustomerOrderNumber(value: string): Promise<void> {
    await test.step(`Fill customer order number: ${value}`, async () => {
      await this.customerOrderNumberInput.fill(value);
    });
  }

  /**
   * Fill start date
   */
  async fillStartDate(value: string): Promise<void> {
    await test.step(`Fill start date: ${value}`, async () => {
      await this.startDateInput.fill(value);
    });
  }

  /**
   * Fill end date
   */
  async fillEndDate(value: string): Promise<void> {
    await test.step(`Fill end date: ${value}`, async () => {
      await this.endDateInput.fill(value);
    });
  }

  /**
   * Select selling rate
   */
  async selectSellingRate(value: string): Promise<void> {
    await test.step(`Select selling rate: ${value}`, async () => {
      await this.sellingRateDropdown.click();
      await this.getDropdownOption(value).click();
    });
  }

  /**
   * Get total contract value
   */
  async getTotalContractValue(): Promise<string> {
    return await test.step('Get total contract value', async () => {
      const text = await this.totalContractValue.textContent() || '';
      const match = text.match(/£[\d,.]+/);
      return match ? match[0] : '';
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
