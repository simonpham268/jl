import type { Locator, Page } from '@playwright/test';
import { test } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Add Customer form field definitions
 */
export const ADD_CUSTOMER_FIELDS = {
  // Header Section
  'Find Address': { type: 'searchbox', selector: '[placeholder*="Start Typing Company Name"]' },

  // Details Section
  'Tag(s)': { type: 'multiselect', section: 'Details' },
  'Customer Name': { type: 'textbox', required: true, section: 'Details' },
  'Customer Type': { type: 'combobox', section: 'Details' },
  'Reference Number': { type: 'textbox', section: 'Details' },
  'Account Number': { type: 'textbox', section: 'Details' },
  'Selling Rate': { type: 'combobox', section: 'Details' },
  'Account Manager': { type: 'combobox', section: 'Details' },

  // Address Section
  'Company name, building, Street address': { type: 'textbox', section: 'Address', order: 1 },
  'Area': { type: 'textbox', section: 'Address', order: 2 },
  'City': { type: 'textbox', section: 'Address', order: 3 },
  'County': { type: 'textbox', section: 'Address', order: 4, aliases: ['County, State/Province/Region', 'State', 'Province', 'Region'] },
  'Postcode': { type: 'textbox', section: 'Address' },
  'Telephone': { type: 'phone', section: 'Details' }, // country code + textbox

  // Main Contact Section
  'First Name': { type: 'textbox', section: 'Main Contact' },
  'Last Name': { type: 'textbox', section: 'Main Contact' },
  'Contact Telephone': { type: 'phone', section: 'Main Contact' },
  'Email': { type: 'textbox', section: 'Main Contact' },
  'Job Position': { type: 'textbox', section: 'Main Contact' },

  // Options
  'Auto generate a Site for this customer': { type: 'checkbox', section: 'Options' },
} as const;

/**
 * Customer data interface for type-safe form filling
 */
export interface CustomerData {
  // Details
  customerName: string;
  tags?: string[];
  customerType?: string;
  referenceNumber?: string;
  accountNumber?: string;
  sellingRate?: string;
  accountManager?: string;

  // Address
  address?: string;
  area?: string;
  city?: string;
  county?: string;
  postcode?: string;
  telephone?: string;
  countryCode?: string; // e.g., '+44'

  // Main Contact
  firstName?: string;
  lastName?: string;
  contactTelephone?: string;
  contactCountryCode?: string;
  email?: string;
  jobPosition?: string;

  // Options
  autoGenerateSite?: boolean;
}

/**
 * CustomerPage - Page Object for Add Customer / Customer Detail pages
 * URL: /Customer/Create (Add) or /Customer/{id} (Edit)
 */
export class CustomerPage extends BasePage {
  // Locators - Details Section
  readonly findAddressInput: Locator;
  readonly customerNameInput: Locator;
  readonly tagsDropdown: Locator;
  readonly customerTypeDropdown: Locator;
  readonly referenceNumberInput: Locator;
  readonly accountNumberInput: Locator;
  readonly sellingRateDropdown: Locator;
  readonly accountManagerDropdown: Locator;

  // Locators - Address Section
  readonly addressInput: Locator;
  readonly areaInput: Locator;
  readonly cityInput: Locator;
  readonly countyInput: Locator;
  readonly postcodeInput: Locator;
  readonly telephoneCountryCode: Locator;
  readonly telephoneInput: Locator;

  // Locators - Main Contact Section
  readonly mainContactSection: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly contactTelephoneCountryCode: Locator;
  readonly contactTelephoneInput: Locator;
  readonly emailInput: Locator;
  readonly jobPositionInput: Locator;

  // Locators - Options & Buttons
  readonly autoGenerateSiteCheckbox: Locator;
  readonly cancelButton: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);

    // Details Section
    this.findAddressInput = page.getByPlaceholder('Start Typing Company Name');
    this.customerNameInput = page.locator('text=Customer Name *').locator('..').locator('input');
    this.tagsDropdown = page.locator('text=Tag(s)').locator('..').locator('..');
    this.customerTypeDropdown = page.locator('text=Customer Type').locator('..').locator('input[role="searchbox"]');
    this.referenceNumberInput = page.locator('text=Reference Number').locator('..').locator('input');
    this.accountNumberInput = page.locator('text=Account Number').locator('..').locator('input');
    this.sellingRateDropdown = page.locator('text=Selling Rate').locator('..').locator('input[role="searchbox"]');
    this.accountManagerDropdown = page.locator('text=Account Manager').locator('..').locator('input[role="searchbox"]');

    // Address Section - use placeholder text
    this.addressInput = page.getByPlaceholder('Company name, building, Street address');
    this.areaInput = page.getByPlaceholder('Area');
    this.cityInput = page.getByPlaceholder('City');
    this.countyInput = page.getByPlaceholder('County, State/Province/Region');
    this.postcodeInput = page.locator('text=Postcode').locator('..').locator('input');

    // First telephone field (customer)
    this.telephoneCountryCode = page.locator('text=Telephone').first().locator('..').locator('select, [role="combobox"]').first();
    this.telephoneInput = page.locator('text=Telephone').first().locator('..').locator('input[type="text"], input[type="tel"]').first();

    // Main Contact Section
    this.mainContactSection = page.locator('text=Main Contact').locator('..');
    this.firstNameInput = page.locator('text=First Name').locator('..').locator('input');
    this.lastNameInput = page.locator('text=Last Name').locator('..').locator('input');
    this.contactTelephoneCountryCode = this.mainContactSection.locator('text=Telephone').locator('..').locator('select, [role="combobox"]').first();
    this.contactTelephoneInput = this.mainContactSection.locator('input[type="text"], input[type="tel"]').first();
    this.emailInput = page.locator('text=Email').locator('..').locator('input');
    this.jobPositionInput = page.locator('text=Job Position').locator('..').locator('input');

    // Options & Buttons
    this.autoGenerateSiteCheckbox = page.locator('text=Auto generate a Site for this customer');
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  // ========================
  // Navigation
  // ========================

  /**
   * Navigate to Add Customer page
   */
  async navigateToAddCustomer(): Promise<void> {
    await test.step('Navigate to Add Customer page', async () => {
      await this.page.goto('/Customer/Create');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Navigate to Customer detail/edit page
   * @param customerId - Customer ID
   */
  async navigateToCustomer(customerId: string | number): Promise<void> {
    await test.step(`Navigate to Customer ${customerId}`, async () => {
      await this.page.goto(`/Customer/${customerId}`);
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  // ========================
  // Find Address (Auto-fill)
  // ========================

  /**
   * Use Find Address to auto-populate fields
   * @param searchText - Company name, address, or postcode
   */
  async findAddress(searchText: string): Promise<void> {
    await test.step(`Find address: ${searchText}`, async () => {
      await this.findAddressInput.fill(searchText);
      // Wait for suggestions and click first result
      await this.page.waitForSelector('.pac-item, .address-suggestion', { timeout: 5000 }).catch(() => {});
      await this.page.locator('.pac-item, .address-suggestion').first().click().catch(() => {});
    });
  }

  // ========================
  // Details Section
  // ========================

  /**
   * Fill Customer Name (required)
   */
  async fillCustomerName(name: string): Promise<void> {
    await test.step(`Fill Customer Name: ${name}`, async () => {
      await this.customerNameInput.fill(name);
    });
  }

  /**
   * Select tags
   * @param tags - Array of tag names to select
   */
  async selectTags(tags: string[]): Promise<void> {
    await test.step(`Select tags: ${tags.join(', ')}`, async () => {
      await this.tagsDropdown.click();
      for (const tag of tags) {
        await this.page.getByRole('option', { name: tag }).click();
      }
      // Click outside to close
      await this.page.keyboard.press('Escape');
    });
  }

  /**
   * Select Customer Type from dropdown
   */
  async selectCustomerType(type: string): Promise<void> {
    await test.step(`Select Customer Type: ${type}`, async () => {
      await this.customerTypeDropdown.click();
      await this.customerTypeDropdown.fill(type);
      await this.page.getByRole('option', { name: type }).click();
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
   * Fill Account Number
   */
  async fillAccountNumber(accountNumber: string): Promise<void> {
    await test.step(`Fill Account Number: ${accountNumber}`, async () => {
      await this.accountNumberInput.fill(accountNumber);
    });
  }

  /**
   * Select Selling Rate
   */
  async selectSellingRate(rate: string): Promise<void> {
    await test.step(`Select Selling Rate: ${rate}`, async () => {
      await this.sellingRateDropdown.click();
      await this.sellingRateDropdown.fill(rate);
      await this.page.getByRole('option', { name: rate }).click();
    });
  }

  /**
   * Select Account Manager
   */
  async selectAccountManager(manager: string): Promise<void> {
    await test.step(`Select Account Manager: ${manager}`, async () => {
      await this.accountManagerDropdown.click();
      await this.accountManagerDropdown.fill(manager);
      await this.page.getByRole('option', { name: manager }).click();
    });
  }

  // ========================
  // Address Section
  // ========================

  /**
   * Fill complete address
   */
  async fillAddress(address: {
    street?: string;
    area?: string;
    city?: string;
    county?: string;
    postcode?: string;
  }): Promise<void> {
    await test.step('Fill address fields', async () => {
      if (address.street) await this.addressInput.fill(address.street);
      if (address.area) await this.areaInput.fill(address.area);
      if (address.city) await this.cityInput.fill(address.city);
      if (address.county) await this.countyInput.fill(address.county);
      if (address.postcode) await this.postcodeInput.fill(address.postcode);
    });
  }

  /**
   * Fill telephone with optional country code
   * @param telephone - Phone number
   * @param countryCode - Country code (e.g., '+44')
   */
  async fillTelephone(telephone: string, countryCode?: string): Promise<void> {
    await test.step(`Fill Telephone: ${countryCode || ''} ${telephone}`, async () => {
      if (countryCode) {
        await this.telephoneCountryCode.selectOption({ label: countryCode });
      }
      await this.telephoneInput.fill(telephone);
    });
  }

  // ========================
  // Main Contact Section
  // ========================

  /**
   * Fill Main Contact details
   */
  async fillMainContact(contact: {
    firstName?: string;
    lastName?: string;
    telephone?: string;
    countryCode?: string;
    email?: string;
    jobPosition?: string;
  }): Promise<void> {
    await test.step('Fill Main Contact details', async () => {
      if (contact.firstName) await this.firstNameInput.fill(contact.firstName);
      if (contact.lastName) await this.lastNameInput.fill(contact.lastName);
      if (contact.countryCode) {
        await this.contactTelephoneCountryCode.selectOption({ label: contact.countryCode });
      }
      if (contact.telephone) await this.contactTelephoneInput.fill(contact.telephone);
      if (contact.email) await this.emailInput.fill(contact.email);
      if (contact.jobPosition) await this.jobPositionInput.fill(contact.jobPosition);
    });
  }

  // ========================
  // Options
  // ========================

  /**
   * Toggle auto-generate site checkbox
   * @param enable - true to check, false to uncheck
   */
  async setAutoGenerateSite(enable: boolean): Promise<void> {
    await test.step(`Set Auto generate Site: ${enable}`, async () => {
      if (enable) {
        await this.autoGenerateSiteCheckbox.check();
      } else {
        await this.autoGenerateSiteCheckbox.uncheck();
      }
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
   * Fill entire customer form from data object
   * @param data - Customer data object
   */
  async fillCustomerForm(data: CustomerData): Promise<void> {
    await test.step('Fill complete customer form', async () => {
      // Required field
      await this.fillCustomerName(data.customerName);

      // Optional Details
      if (data.tags?.length) await this.selectTags(data.tags);
      if (data.customerType) await this.selectCustomerType(data.customerType);
      if (data.referenceNumber) await this.fillReferenceNumber(data.referenceNumber);
      if (data.accountNumber) await this.fillAccountNumber(data.accountNumber);
      if (data.sellingRate) await this.selectSellingRate(data.sellingRate);
      if (data.accountManager) await this.selectAccountManager(data.accountManager);

      // Address
      await this.fillAddress({
        street: data.address,
        area: data.area,
        city: data.city,
        county: data.county,
        postcode: data.postcode,
      });

      if (data.telephone) await this.fillTelephone(data.telephone, data.countryCode);

      // Main Contact
      await this.fillMainContact({
        firstName: data.firstName,
        lastName: data.lastName,
        telephone: data.contactTelephone,
        countryCode: data.contactCountryCode,
        email: data.email,
        jobPosition: data.jobPosition,
      });

      // Options
      if (data.autoGenerateSite !== undefined) {
        await this.setAutoGenerateSite(data.autoGenerateSite);
      }
    });
  }

  /**
   * Create a new customer with minimal required data
   * @param customerName - Required customer name
   * @returns Customer ID from URL after save
   */
  async createCustomer(customerName: string): Promise<string | null> {
    await this.navigateToAddCustomer();
    await this.fillCustomerName(customerName);
    await this.save();

    // Extract customer ID from URL
    const url = this.page.url();
    const match = url.match(/\/Customer\/(\d+)/);

    return match ? match[1] : null;
  }

  /**
   * Create customer with full data
   * @param data - Complete customer data
   * @returns Customer ID from URL after save
   */
  async createCustomerWithData(data: CustomerData): Promise<string | null> {
    await this.navigateToAddCustomer();
    await this.fillCustomerForm(data);
    await this.save();

    const url = this.page.url();
    const match = url.match(/\/Customer\/(\d+)/);

    return match ? match[1] : null;
  }

  // ========================
  // High-Level Actions
  // ========================

  /**
   * Add a new customer with data-driven approach
   * Navigates to Add Customer, fills all provided fields, saves, and returns Customer ID
   *
   * @param data - Customer data object (use CustomerBuilder from customer.data.ts)
   * @returns Customer ID after successful creation
   *
   * @example
   * import { CustomerBuilder } from '../../data/testData/customer.data';
   *
   * // Simple customer
   * const customerId = await customerPage.createNewCustomer(
   *   CustomerBuilder.create('ABC Company').build()
   * );
   *
   * // Customer with more details
   * const customerId = await customerPage.createNewCustomer(
   *   CustomerBuilder.create('ABC Company')
   *     .customerType('Commercial')
   *     .address('123 Main Street')
   *     .city('London')
   *     .postcode('SW1A 1AA')
   *     .contact('John', 'Doe', 'john@abc.com')
   *     .autoGenerateSite()
   *     .build()
   * );
   */
  async createNewCustomer(data: CustomerData): Promise<string> {
    return await test.step(`Create new customer: ${data.customerName}`, async () => {
      // Fill all form fields using data
      await this.fillCustomerForm(data);

      // Save the customer
      await this.save();

      // Extract and return Customer ID from URL
      const url = this.page.url();
      const match = url.match(/\/Customer\/(\d+)/);

      return match ? match[1] : '';
    });
  }

  /**
   * Add customer without navigation (assumes already on Add Customer page)
   *
   * @param data - Customer data object
   * @returns Customer ID after successful creation
   */
  async addCustomerFromCurrentPage(data: CustomerData): Promise<string> {
    return await test.step(`Add customer from current page: ${data.customerName}`, async () => {
      // Fill all form fields
      await this.fillCustomerForm(data);

      // Save the customer
      await this.save();

      // Extract and return Customer ID
      const url = this.page.url();
      const match = url.match(/\/Customer\/(\d+)/);

      return match ? match[1] : '';
    });
  }

  /**
   * Fill customer form without saving (for validation tests)
   *
   * @param data - Customer data object
   */
  async fillNewCustomerForm(data: CustomerData): Promise<void> {
    await test.step(`Fill customer form: ${data.customerName}`, async () => {
      // Fill all form fields
      await this.fillCustomerForm(data);
    });
  }
}
