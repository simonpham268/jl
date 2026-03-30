import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Asset detail tabs
 */
export type AssetDetailTab = 'Details' | 'Quotes' | 'Jobs' | 'Refcom Log Book' | 'Notes' | 'Related Assets' | 'Forms Logbook' | 'Asset & Task Compliance' | 'History';

/**
 * Asset status
 */
export type AssetStatus = 'Active' | 'Suspended';

/**
 * Asset detail data interface (for updates)
 */
export interface AssetDetailData {
  // Asset Details
  equipmentClass?: string;
  equipmentLibrary?: string;
  trades?: string;
  serviceType?: string;
  description?: string;
  make?: string;
  model?: string;
  quantity?: number;

  // Additional Information
  comments?: string;
  containsRefrigerant?: boolean;

  // Site Asset Details
  number?: string;
  location?: string;
  serialNumber?: string;
  qrCode?: string;
  referenceNumber?: string;
  installationDate?: string;
  assetQuantity?: number;
  labourWarrantyExpiry?: string;
  assetWarrantyExpiry?: string;
  quotedReplacementDate?: string;
  lastServiceDate?: string;
  budgetReplacementCost?: number;
  assetCondition?: string;
  assetStatus?: AssetStatus;
}

/**
 * Asset summary info from the details page
 */
export interface AssetSummaryInfo {
  customerName: string;
  siteName: string;
  description: string;
  equipmentClass?: string;
  equipmentLibrary?: string;
  make?: string;
  model?: string;
  number?: string;
  assetCondition?: string;
  assetStatus?: AssetStatus;
}

/**
 * AssetDetailsPage - Page Object for Asset Details page
 * URL: /Asset/Detail/{id}
 */
export class AssetDetailsPage extends BasePage {
  // ========================
  // Locators - Page Header
  // ========================
  readonly pageTitle: Locator;
  readonly breadcrumbAssets: Locator;
  readonly breadcrumbAssetName: Locator;
  readonly logJobButton: Locator;
  readonly moreActionsButton: Locator;

  // ========================
  // Locators - Tabs
  // ========================
  readonly detailsTab: Locator;
  readonly quotesTab: Locator;
  readonly jobsTab: Locator;
  readonly refcomLogBookTab: Locator;
  readonly notesTab: Locator;
  readonly relatedAssetsTab: Locator;
  readonly formsLogbookTab: Locator;
  readonly assetTaskComplianceTab: Locator;
  readonly historyTab: Locator;

  // ========================
  // Locators - Asset Summary
  // ========================
  readonly assetSummaryHeading: Locator;
  readonly customerLink: Locator;
  readonly siteLink: Locator;
  readonly editButton: Locator;

  // ========================
  // Locators - Asset Details Section
  // ========================
  readonly tagsDropdown: Locator;
  readonly equipmentClassDropdown: Locator;
  readonly equipmentLibraryDropdown: Locator;
  readonly tradesDropdown: Locator;
  readonly serviceTypeDropdown: Locator;
  readonly descriptionInput: Locator;
  readonly makeInput: Locator;
  readonly modelInput: Locator;
  readonly quantityInput: Locator;

  // ========================
  // Locators - Additional Information
  // ========================
  readonly commentsInput: Locator;
  readonly containsRefrigerantCheckbox: Locator;

  // ========================
  // Locators - Site Asset Details
  // ========================
  readonly numberInput: Locator;
  readonly locationInput: Locator;
  readonly serialNumberInput: Locator;
  readonly qrCodeInput: Locator;
  readonly createQrCodeButton: Locator;
  readonly referenceNumberInput: Locator;
  readonly installationDateInput: Locator;
  readonly assetQuantityInput: Locator;
  readonly labourWarrantyExpiryInput: Locator;
  readonly assetWarrantyExpiryInput: Locator;
  readonly quotedReplacementDateInput: Locator;
  readonly lastServiceDateInput: Locator;
  readonly budgetReplacementCostInput: Locator;
  readonly assetConditionDropdown: Locator;
  readonly activeStatusButton: Locator;
  readonly suspendedStatusButton: Locator;

  // ========================
  // Locators - Thumbnails
  // ========================
  readonly assetThumbnail: Locator;
  readonly equipmentThumbnail: Locator;

  // ========================
  // Locators - Actions
  // ========================
  readonly undoButton: Locator;
  readonly saveButton: Locator;
  readonly summariseButton: Locator;

  constructor(page: Page) {
    super(page);

    // Page Header
    this.pageTitle = page.getByRole('heading', { level: 3 }).filter({ hasText: 'Assets /' });
    this.breadcrumbAssets = page.getByRole('link', { name: 'Assets', exact: true });
    this.breadcrumbAssetName = page.locator('h3').locator('[class*="asset-name"], span, div').last();
    this.logJobButton = page.getByRole('link', { name: 'Log Job' });
    this.moreActionsButton = page.locator('button').filter({ has: page.locator('[class*="more"], [class*="ellipsis"]') });

    // Tabs
    this.detailsTab = page.getByRole('link', { name: 'Details', exact: true });
    this.quotesTab = page.getByRole('link', { name: 'Quotes', exact: true });
    this.jobsTab = page.getByRole('link', { name: 'Jobs', exact: true });
    this.refcomLogBookTab = page.getByRole('link', { name: 'Refcom Log Book' });
    this.notesTab = page.getByRole('link', { name: 'Notes', exact: true });
    this.relatedAssetsTab = page.getByRole('link', { name: 'Related Assets' });
    this.formsLogbookTab = page.getByRole('link', { name: 'Forms Logbook' });
    this.assetTaskComplianceTab = page.getByRole('link', { name: 'Asset & Task Compliance' });
    this.historyTab = page.getByRole('button', { name: 'History' });

    // Asset Summary
    this.assetSummaryHeading = page.getByRole('heading', { name: 'Asset Summary' });
    this.customerLink = page.locator('text=Customer').locator('..').getByRole('link');
    this.siteLink = page.locator('text=Site').locator('..').getByRole('link');
    this.editButton = page.getByRole('button', { name: 'Edit' });

    // Asset Details Section
    this.tagsDropdown = page.locator('text=Tag(s)').locator('..').locator('[class*="multiselect"], [role="listbox"]');
    this.equipmentClassDropdown = page.getByRole('combobox', { name: 'Equipment Class' }).or(page.locator('text=Equipment Class').locator('..').getByRole('combobox'));
    this.equipmentLibraryDropdown = page.getByRole('combobox', { name: 'Equipment Library' }).or(page.locator('text=Equipment Library').locator('..').getByRole('combobox'));
    this.tradesDropdown = page.getByRole('combobox', { name: 'Trades' }).or(page.locator('text=Trades').locator('..').getByRole('combobox'));
    this.serviceTypeDropdown = page.getByRole('combobox', { name: 'Service Type' }).or(page.locator('text=Service Type').locator('..').getByRole('combobox'));
    this.descriptionInput = page.locator('text=Description').locator('..').getByRole('textbox');
    this.makeInput = page.locator('text=Make').locator('..').getByRole('textbox');
    this.modelInput = page.locator('text=Model').locator('..').getByRole('textbox');
    this.quantityInput = page.locator('text=Quantity').first().locator('..').getByRole('spinbutton');

    // Additional Information
    this.commentsInput = page.locator('text=Comments').locator('..').getByRole('textbox');
    this.containsRefrigerantCheckbox = page.locator('text=Does this asset contain refrigerant?').locator('..');

    // Site Asset Details
    this.numberInput = page.locator('text=Number').first().locator('..').getByRole('textbox');
    this.locationInput = page.locator('text=Location').locator('..').getByRole('textbox');
    this.serialNumberInput = page.locator('text=Serial Number').locator('..').getByRole('textbox');
    this.qrCodeInput = page.locator('text=QR Code').locator('..').getByRole('textbox');
    this.createQrCodeButton = page.getByRole('button', { name: 'Create Random QR Code' });
    this.referenceNumberInput = page.locator('text=Reference Number').locator('..').getByRole('textbox');
    this.installationDateInput = page.locator('text=Installation Date').locator('..').getByRole('textbox');
    this.assetQuantityInput = page.locator('text=Asset Quantity').locator('..').getByRole('spinbutton');
    this.labourWarrantyExpiryInput = page.locator('text=Labour Warranty Expiry').locator('..').getByRole('textbox');
    this.assetWarrantyExpiryInput = page.locator('text=Asset Warranty Expiry').locator('..').getByRole('textbox');
    this.quotedReplacementDateInput = page.getByRole('textbox', { name: 'Quoted Replacement Date' });
    this.lastServiceDateInput = page.locator('text=Last Service Date').locator('..').getByRole('textbox');
    this.budgetReplacementCostInput = page.getByRole('spinbutton', { name: 'Budget Replacement Cost' });
    this.assetConditionDropdown = page.locator('text=Asset Condition').locator('..').getByRole('combobox');
    this.activeStatusButton = page.locator('text=Active').filter({ has: page.locator('[class*="radio"], [role="radio"]') }).or(page.getByText('Active', { exact: true }));
    this.suspendedStatusButton = page.locator('text=Suspended').filter({ has: page.locator('[class*="radio"], [role="radio"]') }).or(page.getByText('Suspended', { exact: true }));

    // Thumbnails
    this.assetThumbnail = page.locator('text=Asset Thumbnail').locator('..').locator('img');
    this.equipmentThumbnail = page.locator('text=Equipment Thumbnail').locator('..').locator('img');

    // Actions
    this.undoButton = page.getByRole('button', { name: 'Undo' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.summariseButton = page.getByRole('button', { name: 'Summarise' });
  }

  // ========================
  // Navigation
  // ========================

  /**
   * Navigate to an asset detail page by ID
   * @param assetId - Asset ID
   */
  async navigateToAsset(assetId: string | number): Promise<void> {
    await test.step(`Navigate to asset ${assetId}`, async () => {
      await this.page.goto(`/Asset/Detail/${assetId}`);
      await this.waitForPageLoad();
    });
  }

  /**
   * Wait for page to finish loading
   */
  async waitForPageLoad(): Promise<void> {
    await test.step('Wait for asset detail page to load', async () => {
      await this.page.waitForLoadState('networkidle');
      await expect(this.assetSummaryHeading).toBeVisible({ timeout: 15000 });
    });
  }

  /**
   * Go back to All Assets list
   */
  async goBackToAssets(): Promise<void> {
    await test.step('Go back to All Assets', async () => {
      await this.breadcrumbAssets.click();
      await this.page.waitForURL(/\/Asset(?:\?|$)/);
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
  async switchToTab(tab: AssetDetailTab): Promise<void> {
    await test.step(`Switch to ${tab} tab`, async () => {
      switch (tab) {
      case 'Details':
        await this.detailsTab.click();
        break;
      case 'Quotes':
        await this.quotesTab.click();
        break;
      case 'Jobs':
        await this.jobsTab.click();
        break;
      case 'Refcom Log Book':
        await this.refcomLogBookTab.click();
        break;
      case 'Notes':
        await this.notesTab.click();
        break;
      case 'Related Assets':
        await this.relatedAssetsTab.click();
        break;
      case 'Forms Logbook':
        await this.formsLogbookTab.click();
        break;
      case 'Asset & Task Compliance':
        await this.assetTaskComplianceTab.click();
        break;
      case 'History':
        await this.historyTab.click();
        break;
      }
      await this.page.waitForLoadState('networkidle');
    });
  }

  /**
   * Get current active tab
   */
  async getCurrentTab(): Promise<string> {
    const tabs = [
      { name: 'Details', locator: this.detailsTab },
      { name: 'Quotes', locator: this.quotesTab },
      { name: 'Jobs', locator: this.jobsTab },
      { name: 'Refcom Log Book', locator: this.refcomLogBookTab },
      { name: 'Notes', locator: this.notesTab },
      { name: 'Related Assets', locator: this.relatedAssetsTab },
      { name: 'Forms Logbook', locator: this.formsLogbookTab },
      { name: 'Asset & Task Compliance', locator: this.assetTaskComplianceTab },
    ];

    for (const tab of tabs) {
      const isExpanded = await tab.locator.getAttribute('aria-expanded');

      if (isExpanded === 'true') {
        return tab.name;
      }
    }
    return 'Details';
  }

  // ========================
  // Header Actions
  // ========================

  /**
   * Click Log Job button (navigates to create job for this asset)
   */
  async clickLogJob(): Promise<void> {
    await test.step('Click Log Job', async () => {
      await this.logJobButton.click();
      await this.page.waitForURL(/\/Job\/Create\?/);
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
      // Wait for inputs to become enabled
      await expect(this.descriptionInput).toBeEnabled({ timeout: 5000 });
    });
  }

  /**
   * Check if page is in edit mode
   */
  async isInEditMode(): Promise<boolean> {
    return await this.descriptionInput.isEnabled();
  }

  // ========================
  // Asset Details - Fill Methods
  // ========================

  /**
   * Select equipment class
   */
  async selectEquipmentClass(value: string): Promise<void> {
    await test.step(`Select equipment class: ${value}`, async () => {
      await this.equipmentClassDropdown.click();
      await this.page.getByRole('option', { name: value }).click();
    });
  }

  /**
   * Select equipment library
   */
  async selectEquipmentLibrary(value: string): Promise<void> {
    await test.step(`Select equipment library: ${value}`, async () => {
      await this.equipmentLibraryDropdown.click();
      await this.page.getByRole('option', { name: value }).click();
    });
  }

  /**
   * Select trades
   */
  async selectTrades(value: string): Promise<void> {
    await test.step(`Select trades: ${value}`, async () => {
      await this.tradesDropdown.click();
      await this.page.getByRole('option', { name: value }).click();
    });
  }

  /**
   * Select service type
   */
  async selectServiceType(value: string): Promise<void> {
    await test.step(`Select service type: ${value}`, async () => {
      await this.serviceTypeDropdown.click();
      await this.page.getByRole('option', { name: value }).click();
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
   * Fill make field
   */
  async fillMake(value: string): Promise<void> {
    await test.step(`Fill make: ${value}`, async () => {
      await this.makeInput.fill(value);
    });
  }

  /**
   * Fill model field
   */
  async fillModel(value: string): Promise<void> {
    await test.step(`Fill model: ${value}`, async () => {
      await this.modelInput.fill(value);
    });
  }

  /**
   * Fill quantity field
   */
  async fillQuantity(value: number): Promise<void> {
    await test.step(`Fill quantity: ${value}`, async () => {
      await this.quantityInput.fill(value.toString());
    });
  }

  // ========================
  // Additional Information - Fill Methods
  // ========================

  /**
   * Fill comments field
   */
  async fillComments(value: string): Promise<void> {
    await test.step(`Fill comments: ${value}`, async () => {
      await this.commentsInput.fill(value);
    });
  }

  /**
   * Set contains refrigerant checkbox
   */
  async setContainsRefrigerant(checked: boolean): Promise<void> {
    await test.step(`${checked ? 'Check' : 'Uncheck'} contains refrigerant`, async () => {
      const checkbox = this.containsRefrigerantCheckbox.getByRole('checkbox');

      if (checked) {
        await checkbox.check();
      } else {
        await checkbox.uncheck();
      }
    });
  }

  // ========================
  // Site Asset Details - Fill Methods
  // ========================

  /**
   * Fill number field
   */
  async fillNumber(value: string): Promise<void> {
    await test.step(`Fill number: ${value}`, async () => {
      await this.numberInput.fill(value);
    });
  }

  /**
   * Fill location field
   */
  async fillLocation(value: string): Promise<void> {
    await test.step(`Fill location: ${value}`, async () => {
      await this.locationInput.fill(value);
    });
  }

  /**
   * Fill serial number field
   */
  async fillSerialNumber(value: string): Promise<void> {
    await test.step(`Fill serial number: ${value}`, async () => {
      await this.serialNumberInput.fill(value);
    });
  }

  /**
   * Fill QR code field
   */
  async fillQrCode(value: string): Promise<void> {
    await test.step(`Fill QR code: ${value}`, async () => {
      await this.qrCodeInput.fill(value);
    });
  }

  /**
   * Create a random QR code
   */
  async createRandomQrCode(): Promise<string> {
    return await test.step('Create random QR code', async () => {
      await this.createQrCodeButton.click();
      const qrCode = await this.qrCodeInput.inputValue();

      return qrCode;
    });
  }

  /**
   * Fill reference number field
   */
  async fillReferenceNumber(value: string): Promise<void> {
    await test.step(`Fill reference number: ${value}`, async () => {
      await this.referenceNumberInput.fill(value);
    });
  }

  /**
   * Fill installation date field
   */
  async fillInstallationDate(value: string): Promise<void> {
    await test.step(`Fill installation date: ${value}`, async () => {
      await this.installationDateInput.fill(value);
    });
  }

  /**
   * Fill asset quantity field
   */
  async fillAssetQuantity(value: number): Promise<void> {
    await test.step(`Fill asset quantity: ${value}`, async () => {
      await this.assetQuantityInput.fill(value.toString());
    });
  }

  /**
   * Fill labour warranty expiry date
   */
  async fillLabourWarrantyExpiry(value: string): Promise<void> {
    await test.step(`Fill labour warranty expiry: ${value}`, async () => {
      await this.labourWarrantyExpiryInput.fill(value);
    });
  }

  /**
   * Fill asset warranty expiry date
   */
  async fillAssetWarrantyExpiry(value: string): Promise<void> {
    await test.step(`Fill asset warranty expiry: ${value}`, async () => {
      await this.assetWarrantyExpiryInput.fill(value);
    });
  }

  /**
   * Fill quoted replacement date
   */
  async fillQuotedReplacementDate(value: string): Promise<void> {
    await test.step(`Fill quoted replacement date: ${value}`, async () => {
      await this.quotedReplacementDateInput.fill(value);
    });
  }

  /**
   * Fill last service date
   */
  async fillLastServiceDate(value: string): Promise<void> {
    await test.step(`Fill last service date: ${value}`, async () => {
      await this.lastServiceDateInput.fill(value);
    });
  }

  /**
   * Fill budget replacement cost
   */
  async fillBudgetReplacementCost(value: number): Promise<void> {
    await test.step(`Fill budget replacement cost: ${value}`, async () => {
      await this.budgetReplacementCostInput.fill(value.toString());
    });
  }

  /**
   * Select asset condition
   */
  async selectAssetCondition(value: string): Promise<void> {
    await test.step(`Select asset condition: ${value}`, async () => {
      await this.assetConditionDropdown.click();
      await this.page.getByRole('option', { name: value }).click();
    });
  }

  /**
   * Set asset status
   */
  async setAssetStatus(status: AssetStatus): Promise<void> {
    await test.step(`Set asset status: ${status}`, async () => {
      if (status === 'Active') {
        await this.activeStatusButton.click();
      } else {
        await this.suspendedStatusButton.click();
      }
    });
  }

  // ========================
  // Bulk Operations
  // ========================

  /**
   * Fill multiple asset detail fields
   */
  async fillAssetDetails(data: Partial<AssetDetailData>): Promise<void> {
    await test.step('Fill asset details', async () => {
      // Asset Details
      if (data.equipmentClass) await this.selectEquipmentClass(data.equipmentClass);
      if (data.equipmentLibrary) await this.selectEquipmentLibrary(data.equipmentLibrary);
      if (data.trades) await this.selectTrades(data.trades);
      if (data.serviceType) await this.selectServiceType(data.serviceType);
      if (data.description) await this.fillDescription(data.description);
      if (data.make) await this.fillMake(data.make);
      if (data.model) await this.fillModel(data.model);
      if (data.quantity !== undefined) await this.fillQuantity(data.quantity);

      // Additional Information
      if (data.comments) await this.fillComments(data.comments);
      if (data.containsRefrigerant !== undefined) await this.setContainsRefrigerant(data.containsRefrigerant);

      // Site Asset Details
      if (data.number) await this.fillNumber(data.number);
      if (data.location) await this.fillLocation(data.location);
      if (data.serialNumber) await this.fillSerialNumber(data.serialNumber);
      if (data.qrCode) await this.fillQrCode(data.qrCode);
      if (data.referenceNumber) await this.fillReferenceNumber(data.referenceNumber);
      if (data.installationDate) await this.fillInstallationDate(data.installationDate);
      if (data.assetQuantity !== undefined) await this.fillAssetQuantity(data.assetQuantity);
      if (data.labourWarrantyExpiry) await this.fillLabourWarrantyExpiry(data.labourWarrantyExpiry);
      if (data.assetWarrantyExpiry) await this.fillAssetWarrantyExpiry(data.assetWarrantyExpiry);
      if (data.quotedReplacementDate) await this.fillQuotedReplacementDate(data.quotedReplacementDate);
      if (data.lastServiceDate) await this.fillLastServiceDate(data.lastServiceDate);
      if (data.budgetReplacementCost !== undefined) await this.fillBudgetReplacementCost(data.budgetReplacementCost);
      if (data.assetCondition) await this.selectAssetCondition(data.assetCondition);
      if (data.assetStatus) await this.setAssetStatus(data.assetStatus);
    });
  }

  // ========================
  // Actions
  // ========================

  /**
   * Save changes
   */
  async save(): Promise<void> {
    await test.step('Save asset changes', async () => {
      await this.saveButton.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  /**
   * Undo changes
   */
  async undo(): Promise<void> {
    await test.step('Undo asset changes', async () => {
      await this.undoButton.click();
    });
  }

  /**
   * Click summarise button (AI summary feature)
   */
  async clickSummarise(): Promise<void> {
    await test.step('Click Summarise', async () => {
      await this.summariseButton.click();
    });
  }

  // ========================
  // Data Retrieval
  // ========================

  /**
   * Get customer name from summary
   */
  async getCustomerName(): Promise<string> {
    return await test.step('Get customer name', async () => {
      return await this.customerLink.textContent() || '';
    });
  }

  /**
   * Get site name from summary
   */
  async getSiteName(): Promise<string> {
    return await test.step('Get site name', async () => {
      return await this.siteLink.textContent() || '';
    });
  }

  /**
   * Get asset description
   */
  async getDescription(): Promise<string> {
    return await test.step('Get description', async () => {
      return await this.descriptionInput.inputValue();
    });
  }

  /**
   * Get asset number
   */
  async getNumber(): Promise<string> {
    return await test.step('Get number', async () => {
      return await this.numberInput.inputValue();
    });
  }

  /**
   * Get asset serial number
   */
  async getSerialNumber(): Promise<string> {
    return await test.step('Get serial number', async () => {
      return await this.serialNumberInput.inputValue();
    });
  }

  /**
   * Get asset location
   */
  async getLocation(): Promise<string> {
    return await test.step('Get location', async () => {
      return await this.locationInput.inputValue();
    });
  }

  /**
   * Get asset summary info
   */
  async getAssetSummary(): Promise<AssetSummaryInfo> {
    return await test.step('Get asset summary', async () => {
      const customerName = await this.getCustomerName();
      const siteName = await this.getSiteName();
      const description = await this.getDescription();
      const number = await this.getNumber();

      return {
        customerName,
        siteName,
        description,
        number: number || undefined,
      };
    });
  }

  // ========================
  // Assertions
  // ========================

  /**
   * Assert page is loaded correctly
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Asset Details page is loaded', async () => {
      await expect(this.assetSummaryHeading).toBeVisible();
      await expect(this.detailsTab).toBeVisible();
    });
  }

  /**
   * Assert asset description matches
   */
  async assertDescription(expected: string): Promise<void> {
    await test.step(`Assert description is: ${expected}`, async () => {
      await expect(this.descriptionInput).toHaveValue(expected);
    });
  }

  /**
   * Assert customer name matches
   */
  async assertCustomerName(expected: string): Promise<void> {
    await test.step(`Assert customer name is: ${expected}`, async () => {
      await expect(this.customerLink).toHaveText(expected);
    });
  }

  /**
   * Assert site name matches
   */
  async assertSiteName(expected: string): Promise<void> {
    await test.step(`Assert site name is: ${expected}`, async () => {
      await expect(this.siteLink).toHaveText(expected);
    });
  }

  /**
   * Assert asset number matches
   */
  async assertNumber(expected: string): Promise<void> {
    await test.step(`Assert number is: ${expected}`, async () => {
      await expect(this.numberInput).toHaveValue(expected);
    });
  }

  /**
   * Assert asset is active
   */
  async assertIsActive(): Promise<void> {
    await test.step('Assert asset is active', async () => {
      await expect(this.activeStatusButton).toHaveAttribute('aria-checked', 'true');
    });
  }

  /**
   * Assert asset is suspended
   */
  async assertIsSuspended(): Promise<void> {
    await test.step('Assert asset is suspended', async () => {
      await expect(this.suspendedStatusButton).toHaveAttribute('aria-checked', 'true');
    });
  }
}
