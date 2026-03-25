import { Locator, Page } from "@playwright/test";
import { test, expect } from '@playwright/test';
import { BasePage } from "../BasePage";
import { StockPOData } from '../../data/testData/stockPO.data';

/**
 * Stock PO form data interface
 */
export interface StockPOFormData {
  stockDeliveryLocation: string;
  supplier: string;
  contact?: string;
  accountNumber?: string;
  estimatedDeliveryDate?: string;
  tags?: string[];
}

/**
 * CreateStockPOPage - Page Object for Create Stock Purchase Order page
 * URL: /PurchaseOrder/Create
 */
export class CreateStockPOPage extends BasePage {
  // ========================
  // Locators - Header
  // ========================
  readonly pageTitle: Locator;

  // ========================
  // Locators - Form Fields
  // ========================
  readonly stockDeliveryLocationInput: Locator;
  readonly supplierInput: Locator;
  readonly addSupplierButton: Locator;
  readonly contactInput: Locator;
  readonly addContactButton: Locator;
  readonly accountNumberInput: Locator;
  readonly estimatedDeliveryDateInput: Locator;
  readonly tagsDropdown: Locator;

  // ========================
  // Locators - Address Sections
  // ========================
  readonly locationAddressSection: Locator;
  readonly supplierAddressSection: Locator;
  readonly contactDetailsSection: Locator;

  // ========================
  // Locators - Action Buttons
  // ========================
  readonly cancelButton: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);

    // Header
    this.pageTitle = page.getByRole('heading', { name: 'Add Stock Purchase Order' });

    // Form Fields
    this.stockDeliveryLocationInput = page.locator('text=Stock Delivery Location').locator('..').locator('input');
    this.supplierInput = page.locator('text=Supplier').locator('..').locator('input').first();
    this.addSupplierButton = page.locator('text=Supplier').locator('..').getByRole('button');
    this.contactInput = page.locator('text="Contact:"').locator('..').locator('input');
    this.addContactButton = page.locator('text="Contact:"').locator('..').getByRole('button');
    this.accountNumberInput = page.getByPlaceholder('Account Number');
    this.estimatedDeliveryDateInput = page.getByPlaceholder('DD/MM/YYYY');
    this.tagsDropdown = page.locator('text=Tag(s)').locator('..');

    // Address Sections
    this.locationAddressSection = page.getByRole('heading', { name: 'Location Address' }).locator('..');
    this.supplierAddressSection = page.getByRole('heading', { name: 'Supplier Address' }).locator('..');
    this.contactDetailsSection = page.getByRole('heading', { name: 'Contact Details' }).locator('..');

    // Action Buttons
    this.cancelButton = page.getByRole('link', { name: 'Cancel' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  // ========================
  // Navigation Methods
  // ========================

  /**
   * Navigate to Create Stock PO page
   */
  async navigateToCreateStockPO(): Promise<void> {
    await test.step('Navigate to Create Stock PO page', async () => {
      await this.page.goto('/PurchaseOrder/Create');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Create Stock PO page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
    });
  }

  // ========================
  // Form Methods
  // ========================

  /**
   * Select stock delivery location
   */
  async selectStockDeliveryLocation(location: string): Promise<void> {
    await test.step(`Select stock delivery location: ${location}`, async () => {
      await this.stockDeliveryLocationInput.fill(location);
      await this.page.waitForTimeout(500);
      await this.page.getByRole('option', { name: new RegExp(location, 'i') }).first().click();
    });
  }

  /**
   * Select supplier
   */
  async selectSupplier(supplier: string): Promise<void> {
    await test.step(`Select supplier: ${supplier}`, async () => {
      await this.supplierInput.fill(supplier);
      await this.page.waitForTimeout(500);
      await this.page.getByRole('option', { name: new RegExp(supplier, 'i') }).first().click();
    });
  }

  /**
   * Click add supplier button
   */
  async clickAddSupplier(): Promise<void> {
    await test.step('Click add supplier button', async () => {
      await this.addSupplierButton.click();
    });
  }

  /**
   * Select contact
   */
  async selectContact(contact: string): Promise<void> {
    await test.step(`Select contact: ${contact}`, async () => {
      await this.contactInput.fill(contact);
      await this.page.waitForTimeout(500);
      await this.page.getByRole('option', { name: new RegExp(contact, 'i') }).first().click();
    });
  }

  /**
   * Click add contact button
   */
  async clickAddContact(): Promise<void> {
    await test.step('Click add contact button', async () => {
      await this.addContactButton.click();
    });
  }

  /**
   * Fill account number
   */
  async fillAccountNumber(accountNumber: string): Promise<void> {
    await test.step(`Fill account number: ${accountNumber}`, async () => {
      await this.accountNumberInput.fill(accountNumber);
    });
  }

  /**
   * Fill estimated delivery date
   */
  async fillEstimatedDeliveryDate(date: string): Promise<void> {
    await test.step(`Fill estimated delivery date: ${date}`, async () => {
      await this.estimatedDeliveryDateInput.fill(date);
    });
  }

  /**
   * Select tags
   */
  async selectTags(tags: string[]): Promise<void> {
    await test.step(`Select tags: ${tags.join(', ')}`, async () => {
      await this.tagsDropdown.click();
      for (const tag of tags) {
        await this.page.getByRole('option', { name: new RegExp(tag, 'i') }).click();
      }
      await this.page.keyboard.press('Escape');
    });
  }

  // ========================
  // Action Methods
  // ========================

  /**
   * Click cancel button
   */
  async clickCancel(): Promise<void> {
    await test.step('Click cancel button', async () => {
      await this.cancelButton.click();
    });
  }

  /**
   * Click save button
   */
  async clickSave(): Promise<void> {
    await test.step('Click save button', async () => {
      await this.saveButton.click();
    });
  }

  /**
   * Check if save button is enabled
   */
  async isSaveEnabled(): Promise<boolean> {
    return await test.step('Check if save button is enabled', async () => {
      return await this.saveButton.isEnabled();
    });
  }

  // ========================
  // Combined Methods
  // ========================

  /**
   * Fill stock PO form
   */
  async fillStockPOForm(data: StockPOFormData): Promise<void> {
    await test.step('Fill stock PO form', async () => {
      await this.selectStockDeliveryLocation(data.stockDeliveryLocation);
      await this.selectSupplier(data.supplier);
      
      if (data.contact) {
        await this.selectContact(data.contact);
      }
      if (data.accountNumber) {
        await this.fillAccountNumber(data.accountNumber);
      }
      if (data.estimatedDeliveryDate) {
        await this.fillEstimatedDeliveryDate(data.estimatedDeliveryDate);
      }
      if (data.tags) {
        await this.selectTags(data.tags);
      }
    });
  }

  /**
   * Create stock PO
   */
  async createStockPO(data: StockPOFormData): Promise<void> {
    await test.step('Create stock PO', async () => {
      await this.fillStockPOForm(data);
      await this.clickSave();
    });
  }

  // ========================
  // High-Level Methods (Data Builder Pattern)
  // ========================

  /**
   * Fill the Stock PO form with data (does not save)
   * Use this when you need to fill the form but not submit yet
   * @param data - StockPOData object from builder
   */
  async fillNewStockPOForm(data: StockPOData): Promise<void> {
    await test.step('Fill new Stock PO form', async () => {
      await this.selectStockDeliveryLocation(data.stockDeliveryLocation);
      await this.selectSupplier(data.supplier);
      
      if (data.contact) await this.selectContact(data.contact);
      if (data.accountNumber) await this.fillAccountNumber(data.accountNumber);
      if (data.estimatedDeliveryDate) await this.fillEstimatedDeliveryDate(data.estimatedDeliveryDate);
      if (data.tags && data.tags.length > 0) await this.selectTags(data.tags);
    });
  }

  /**
   * Create a new Stock PO with the provided data
   * Fills the form and saves it
   * @param data - StockPOData object from builder
   */
  async createNewStockPO(data: StockPOData): Promise<void> {
    await test.step('Create new Stock PO', async () => {
      await this.fillNewStockPOForm(data);
      await this.clickSave();
    });
  }
}
