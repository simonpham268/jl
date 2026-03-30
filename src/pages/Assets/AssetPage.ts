import type { Locator, Page } from '@playwright/test';
import { test } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Add Asset form field definitions
 */
export const ADD_ASSET_FIELDS = {
  // Selection (required)
  'Customer': { type: 'combobox', required: true },
  'Site': { type: 'combobox', required: true },

  // Asset Details
  'Equipment Class': { type: 'combobox', section: 'Asset Details' },
  'Equipment Library': { type: 'combobox', section: 'Asset Details' },
  'Trades': { type: 'combobox', section: 'Asset Details' },
  'Service Type': { type: 'combobox', section: 'Asset Details' },
  'Description': { type: 'textbox', required: true, section: 'Asset Details' },
  'Make': { type: 'textbox', section: 'Asset Details' },
  'Model': { type: 'textbox', section: 'Asset Details' },
  'Quantity': { type: 'spinbutton', required: true, section: 'Asset Details', default: 1 },

  // Additional Information
  'Comments': { type: 'textbox', section: 'Additional Information' },
  'Does this asset contain refrigerant?': { type: 'checkbox', section: 'Additional Information' },

  // Site Asset Details
  'Number': { type: 'textbox', section: 'Site Asset Details' },
  'Location': { type: 'textbox', section: 'Site Asset Details' },
  'Serial Number': { type: 'textbox', section: 'Site Asset Details' },
  'QR Code': { type: 'textbox', section: 'Site Asset Details' },
  'Reference Number': { type: 'textbox', section: 'Site Asset Details' },
  'Installation Date': { type: 'date', section: 'Site Asset Details' },
  'Asset Quantity': { type: 'spinbutton', required: true, section: 'Site Asset Details', default: 1 },
  'Labour Warranty Expiry': { type: 'date', section: 'Site Asset Details' },
  'Asset Warranty Expiry': { type: 'date', section: 'Site Asset Details' },
  'Quoted Replacement Date': { type: 'date', section: 'Site Asset Details' },
  'Budget Replacement Cost': { type: 'spinbutton', section: 'Site Asset Details' },
  'Asset Condition': { type: 'combobox', section: 'Site Asset Details' },
} as const;

/**
 * Asset data interface for type-safe form filling
 */
export interface AssetData {
  // Required Selection
  customerName: string;
  siteName: string;

  // Asset Details
  equipmentClass?: string;
  equipmentLibrary?: string;
  trades?: string;
  serviceType?: string;
  description: string;
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
  budgetReplacementCost?: number;
  assetCondition?: string;
}

/**
 * AssetPage - Page Object for Add Asset / Asset Detail pages
 * URL: /Asset/Create (Add) or /Asset/Detail/{id} (View/Edit)
 */
export class AssetPage extends BasePage {
  // ========================
  // Locators - Selection (required)
  // ========================
  readonly customerDropdown: Locator;
  readonly customerSearchbox: Locator;
  readonly siteDropdown: Locator;
  readonly siteSearchbox: Locator;

  // ========================
  // Locators - Asset Details Section
  // ========================
  readonly equipmentClassDropdown: Locator;
  readonly equipmentClassSearchbox: Locator;
  readonly equipmentLibraryDropdown: Locator;
  readonly equipmentLibrarySearchbox: Locator;
  readonly tradesDropdown: Locator;
  readonly tradesSearchbox: Locator;
  readonly serviceTypeDropdown: Locator;
  readonly serviceTypeSearchbox: Locator;
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
  readonly createRandomQrCodeButton: Locator;
  readonly referenceNumberInput: Locator;
  readonly installationDateInput: Locator;
  readonly assetQuantityInput: Locator;
  readonly labourWarrantyExpiryInput: Locator;
  readonly assetWarrantyExpiryInput: Locator;
  readonly quotedReplacementDateInput: Locator;
  readonly budgetReplacementCostInput: Locator;
  readonly assetConditionDropdown: Locator;
  readonly assetConditionSearchbox: Locator;

  // ========================
  // Locators - Buttons
  // ========================
  readonly cancelButton: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);

    // Selection
    this.customerDropdown = page.locator('text=Customer *').locator('..').locator('[role="combobox"]');
    this.customerSearchbox = page.locator('text=Customer *').locator('..').locator('input[role="searchbox"]');
    this.siteDropdown = page.locator('text=Site *').locator('..').locator('[role="combobox"]');
    this.siteSearchbox = page.locator('text=Site *').locator('..').locator('input[role="searchbox"]');

    // Asset Details
    const assetDetailsSection = page.locator('text=Asset Details').locator('..');

    this.equipmentClassDropdown = page.locator('text=Equipment Class').locator('..').locator('[role="combobox"]');
    this.equipmentClassSearchbox = page.locator('text=Equipment Class').locator('..').locator('input[role="searchbox"]');
    this.equipmentLibraryDropdown = page.locator('text=Equipment Library').locator('..').locator('[role="combobox"]');
    this.equipmentLibrarySearchbox = page.locator('text=Equipment Library').locator('..').locator('input[role="searchbox"]');
    this.tradesDropdown = page.locator('text=Trades').locator('..').locator('[role="combobox"]');
    this.tradesSearchbox = page.locator('text=Trades').locator('..').locator('input[role="searchbox"]');
    this.serviceTypeDropdown = page.locator('text=Service Type').locator('..').locator('[role="combobox"]');
    this.serviceTypeSearchbox = page.locator('text=Service Type').locator('..').locator('input[role="searchbox"]');
    this.descriptionInput = page.locator('text=Description').locator('..').locator('input[type="text"]').first();
    this.makeInput = page.locator('text=Make').locator('..').locator('input');
    this.modelInput = page.locator('text=Model').locator('..').locator('input');
    this.quantityInput = page.locator('text=Quantity *').locator('..').locator('input[type="number"]');

    // Additional Information
    this.commentsInput = page.locator('text=Comments').locator('..').locator('input, textarea');
    this.containsRefrigerantCheckbox = page.locator('text=Does this asset contain refrigerant?');

    // Site Asset Details
    this.numberInput = page.locator('text=Number').first().locator('..').locator('input');
    this.locationInput = page.locator('text=Location').locator('..').locator('input');
    this.serialNumberInput = page.locator('text=Serial Number').locator('..').locator('input');
    this.qrCodeInput = page.locator('text=QR Code').locator('..').locator('input');
    this.createRandomQrCodeButton = page.getByRole('button', { name: 'Create Random QR Code' });
    this.referenceNumberInput = page.locator('text=Reference Number').locator('..').locator('input');
    this.installationDateInput = page.locator('text=Installation Date').locator('..').locator('input');
    this.assetQuantityInput = page.locator('text=Asset Quantity').locator('..').locator('input[type="number"]');
    this.labourWarrantyExpiryInput = page.locator('text=Labour Warranty Expiry').locator('..').locator('input');
    this.assetWarrantyExpiryInput = page.locator('text=Asset Warranty Expiry').locator('..').locator('input');
    this.quotedReplacementDateInput = page.getByPlaceholder('DD/MM/YYYY').nth(3);
    this.budgetReplacementCostInput = page.locator('text=Budget Replacement Cost').locator('..').locator('input[type="number"]');
    this.assetConditionDropdown = page.locator('text=Asset Condition').locator('..').locator('[role="combobox"]');
    this.assetConditionSearchbox = page.locator('text=Asset Condition').locator('..').locator('input[role="searchbox"]');

    // Buttons
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  // ========================
  // Navigation
  // ========================

  /**
   * Navigate to Add Asset page
   */
  async navigateToAddAsset(): Promise<void> {
    await test.step('Navigate to Add Asset page', async () => {
      await this.page.goto('/Asset/Create');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Navigate to Asset detail page
   * @param assetId - Asset ID
   */
  async navigateToAsset(assetId: string | number): Promise<void> {
    await test.step(`Navigate to Asset ${assetId}`, async () => {
      await this.page.goto(`/Asset/Detail/${assetId}`);
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  // ========================
  // Selection (Required)
  // ========================

  /**
   * Select customer from dropdown
   * @param customerName - Customer name to search and select
   */
  async selectCustomer(customerName: string): Promise<void> {
    await test.step(`Select customer: ${customerName}`, async () => {
      await this.customerDropdown.click();
      await this.customerSearchbox.fill(customerName);
      await this.page.getByRole('option', { name: customerName }).click();
    });
  }

  /**
   * Select site from dropdown
   * @param siteName - Site name to search and select
   */
  async selectSite(siteName: string): Promise<void> {
    await test.step(`Select site: ${siteName}`, async () => {
      await this.siteDropdown.click();
      await this.siteSearchbox.fill(siteName);
      await this.page.getByRole('option', { name: siteName }).click();
    });
  }

  // ========================
  // Asset Details Section
  // ========================

  /**
   * Select Equipment Class
   */
  async selectEquipmentClass(equipmentClass: string): Promise<void> {
    await test.step(`Select Equipment Class: ${equipmentClass}`, async () => {
      await this.equipmentClassDropdown.click();
      await this.equipmentClassSearchbox.fill(equipmentClass);
      await this.page.getByRole('option', { name: equipmentClass }).click();
    });
  }

  /**
   * Select Equipment Library
   */
  async selectEquipmentLibrary(library: string): Promise<void> {
    await test.step(`Select Equipment Library: ${library}`, async () => {
      await this.equipmentLibraryDropdown.click();
      await this.equipmentLibrarySearchbox.fill(library);
      await this.page.getByRole('option', { name: library }).click();
    });
  }

  /**
   * Select Trades
   */
  async selectTrades(trades: string): Promise<void> {
    await test.step(`Select Trades: ${trades}`, async () => {
      await this.tradesDropdown.click();
      await this.tradesSearchbox.fill(trades);
      await this.page.getByRole('option', { name: trades }).click();
    });
  }

  /**
   * Select Service Type
   */
  async selectServiceType(serviceType: string): Promise<void> {
    await test.step(`Select Service Type: ${serviceType}`, async () => {
      await this.serviceTypeDropdown.click();
      await this.serviceTypeSearchbox.fill(serviceType);
      await this.page.getByRole('option', { name: serviceType }).click();
    });
  }

  /**
   * Fill Description (required)
   */
  async fillDescription(description: string): Promise<void> {
    await test.step(`Fill Description: ${description}`, async () => {
      await this.descriptionInput.fill(description);
    });
  }

  /**
   * Fill Make
   */
  async fillMake(make: string): Promise<void> {
    await test.step(`Fill Make: ${make}`, async () => {
      await this.makeInput.fill(make);
    });
  }

  /**
   * Fill Model
   */
  async fillModel(model: string): Promise<void> {
    await test.step(`Fill Model: ${model}`, async () => {
      await this.modelInput.fill(model);
    });
  }

  /**
   * Fill Quantity
   */
  async fillQuantity(quantity: number): Promise<void> {
    await test.step(`Fill Quantity: ${quantity}`, async () => {
      await this.quantityInput.fill(quantity.toString());
    });
  }

  // ========================
  // Additional Information
  // ========================

  /**
   * Fill Comments
   */
  async fillComments(comments: string): Promise<void> {
    await test.step(`Fill Comments: ${comments}`, async () => {
      await this.commentsInput.fill(comments);
    });
  }

  /**
   * Toggle contains refrigerant checkbox
   */
  async setContainsRefrigerant(enable: boolean): Promise<void> {
    await test.step(`Set Contains Refrigerant: ${enable}`, async () => {
      if (enable) {
        await this.containsRefrigerantCheckbox.check();
      } else {
        await this.containsRefrigerantCheckbox.uncheck();
      }
    });
  }

  // ========================
  // Site Asset Details
  // ========================

  /**
   * Fill Number
   */
  async fillNumber(number: string): Promise<void> {
    await test.step(`Fill Number: ${number}`, async () => {
      await this.numberInput.fill(number);
    });
  }

  /**
   * Fill Location
   */
  async fillLocation(location: string): Promise<void> {
    await test.step(`Fill Location: ${location}`, async () => {
      await this.locationInput.fill(location);
    });
  }

  /**
   * Fill Serial Number
   */
  async fillSerialNumber(serialNumber: string): Promise<void> {
    await test.step(`Fill Serial Number: ${serialNumber}`, async () => {
      await this.serialNumberInput.fill(serialNumber);
    });
  }

  /**
   * Fill QR Code
   */
  async fillQrCode(qrCode: string): Promise<void> {
    await test.step(`Fill QR Code: ${qrCode}`, async () => {
      await this.qrCodeInput.fill(qrCode);
    });
  }

  /**
   * Create random QR Code
   */
  async createRandomQrCode(): Promise<void> {
    await test.step('Create Random QR Code', async () => {
      await this.createRandomQrCodeButton.click();
    });
  }

  /**
   * Fill Reference Number
   */
  async fillReferenceNumber(refNumber: string): Promise<void> {
    await test.step(`Fill Reference Number: ${refNumber}`, async () => {
      await this.referenceNumberInput.fill(refNumber);
    });
  }

  /**
   * Fill Installation Date
   * @param date - Date in DD/MM/YYYY format
   */
  async fillInstallationDate(date: string): Promise<void> {
    await test.step(`Fill Installation Date: ${date}`, async () => {
      await this.installationDateInput.fill(date);
    });
  }

  /**
   * Fill Asset Quantity
   */
  async fillAssetQuantity(quantity: number): Promise<void> {
    await test.step(`Fill Asset Quantity: ${quantity}`, async () => {
      await this.assetQuantityInput.fill(quantity.toString());
    });
  }

  /**
   * Fill Labour Warranty Expiry
   * @param date - Date in DD/MM/YYYY format
   */
  async fillLabourWarrantyExpiry(date: string): Promise<void> {
    await test.step(`Fill Labour Warranty Expiry: ${date}`, async () => {
      await this.labourWarrantyExpiryInput.fill(date);
    });
  }

  /**
   * Fill Asset Warranty Expiry
   * @param date - Date in DD/MM/YYYY format
   */
  async fillAssetWarrantyExpiry(date: string): Promise<void> {
    await test.step(`Fill Asset Warranty Expiry: ${date}`, async () => {
      await this.assetWarrantyExpiryInput.fill(date);
    });
  }

  /**
   * Fill Quoted Replacement Date
   * @param date - Date in DD/MM/YYYY format
   */
  async fillQuotedReplacementDate(date: string): Promise<void> {
    await test.step(`Fill Quoted Replacement Date: ${date}`, async () => {
      await this.quotedReplacementDateInput.fill(date);
    });
  }

  /**
   * Fill Budget Replacement Cost
   */
  async fillBudgetReplacementCost(cost: number): Promise<void> {
    await test.step(`Fill Budget Replacement Cost: ${cost}`, async () => {
      await this.budgetReplacementCostInput.fill(cost.toString());
    });
  }

  /**
   * Select Asset Condition
   */
  async selectAssetCondition(condition: string): Promise<void> {
    await test.step(`Select Asset Condition: ${condition}`, async () => {
      await this.assetConditionDropdown.click();
      await this.assetConditionSearchbox.fill(condition);
      await this.page.getByRole('option', { name: condition }).click();
    });
  }

  // ========================
  // Actions
  // ========================

  /**
   * Click Save button
   */
  async save(): Promise<void> {
    await test.step('Click Save button', async () => {
      await this.saveButton.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  /**
   * Click Cancel button
   */
  async cancel(): Promise<void> {
    await test.step('Click Cancel button', async () => {
      await this.cancelButton.click();
    });
  }

  // ========================
  // Bulk Fill
  // ========================

  /**
   * Fill entire asset form from data object
   * @param data - Asset data object
   */
  async fillAssetForm(data: AssetData): Promise<void> {
    await test.step('Fill complete asset form', async () => {
      // Required Selection
      await this.selectCustomer(data.customerName);
      await this.selectSite(data.siteName);

      // Asset Details
      if (data.equipmentClass) await this.selectEquipmentClass(data.equipmentClass);
      if (data.equipmentLibrary) await this.selectEquipmentLibrary(data.equipmentLibrary);
      if (data.trades) await this.selectTrades(data.trades);
      if (data.serviceType) await this.selectServiceType(data.serviceType);
      await this.fillDescription(data.description);
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
      if (data.budgetReplacementCost !== undefined) await this.fillBudgetReplacementCost(data.budgetReplacementCost);
      if (data.assetCondition) await this.selectAssetCondition(data.assetCondition);
    });
  }

  /**
   * Create a new asset with minimal required data
   * @param customerName - Customer name
   * @param siteName - Site name
   * @param description - Asset description (required)
   * @returns Asset ID from URL after save
   */
  async createAsset(customerName: string, siteName: string, description: string): Promise<string | null> {
    await this.navigateToAddAsset();
    await this.selectCustomer(customerName);
    await this.selectSite(siteName);
    await this.fillDescription(description);
    await this.save();

    const url = this.page.url();
    const match = url.match(/\/Asset\/Detail\/(\d+)/);

    return match ? match[1] : null;
  }

  /**
   * Create asset with full data
   * @param data - Complete asset data
   * @returns Asset ID from URL after save
   */
  async createAssetWithData(data: AssetData): Promise<string | null> {
    await this.navigateToAddAsset();
    await this.fillAssetForm(data);
    await this.save();

    const url = this.page.url();
    const match = url.match(/\/Asset\/Detail\/(\d+)/);

    return match ? match[1] : null;
  }

  // ========================
  // High-Level Actions
  // ========================

  /**
   * Create a new asset with data-driven approach
   * Fills all provided fields, saves, and returns Asset ID
   *
   * @param data - Asset data object (use AssetBuilder from asset.data.ts)
   * @returns Asset ID after successful creation
   *
   * @example
   * import { AssetBuilder } from '../../data/testData/asset.data';
   *
   * // Navigate first
   * await assetPage.navigateToAddAsset();
   *
   * // Simple asset
   * const assetId = await assetPage.createNewAsset(
   *   AssetBuilder.create('ABC Corp', 'Main Office', 'Air Conditioner').build()
   * );
   *
   * // Asset with more details
   * const assetId = await assetPage.createNewAsset(
   *   AssetBuilder.create('ABC Corp', 'Main Office', 'Air Conditioner')
   *     .equipmentClass('HVAC')
   *     .make('Daikin')
   *     .model('FTX25')
   *     .serialNumber('SN-12345')
   *     .location('Roof Level')
   *     .assetCondition('Good')
   *     .build()
   * );
   */
  async createNewAsset(data: AssetData): Promise<string> {
    return await test.step(`Create new asset: ${data.description}`, async () => {
      // Fill all form fields using data
      await this.fillAssetForm(data);

      // Save the asset
      await this.save();

      // Extract and return Asset ID from URL
      const url = this.page.url();
      const match = url.match(/\/Asset\/Detail\/(\d+)/);

      return match ? match[1] : '';
    });
  }

  /**
   * Fill asset form without saving (for validation tests)
   *
   * @param data - Asset data object
   */
  async fillNewAssetForm(data: AssetData): Promise<void> {
    await test.step(`Fill asset form: ${data.description}`, async () => {
      // Fill all form fields
      await this.fillAssetForm(data);
    });
  }
}
