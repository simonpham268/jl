import type { Locator, Page } from '@playwright/test';
import { test } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Add Site form field definitions
 */
export const ADD_SITE_FIELDS = {
  // Customer Selection
  'Customer': { type: 'combobox', required: true },

  // Header Section
  'Find Address': { type: 'searchbox', selector: '[placeholder*="Start Typing Company Name, Address, Postcode"]' },

  // Details Section
  'Site Name': { type: 'textbox', required: true, section: 'Details' },
  'Tag(s)': { type: 'multiselect', section: 'Details' },
  'Account Manager': { type: 'combobox', section: 'Details' },
  'Postcode': { type: 'textbox', section: 'Details' },
  'Telephone': { type: 'phone', section: 'Details' },
  'Area': { type: 'combobox', section: 'Details' }, // For filtering/categorization
  'Site Reference Number': { type: 'textbox', section: 'Details' },

  // Address Section
  'Company name, building, Street address': { type: 'textbox', section: 'Address', order: 1 },
  'Address Area': { type: 'textbox', section: 'Address', order: 2, aliases: ['Area'] },
  'City': { type: 'textbox', section: 'Address', order: 3 },
  'County': { type: 'textbox', section: 'Address', order: 4, aliases: ['County, State/Province/Region', 'State', 'Province', 'Region'] },

  // Main Contact Section
  'First Name': { type: 'textbox', section: 'Main Contact' },
  'Last Name': { type: 'textbox', section: 'Main Contact' },
  'Contact Telephone': { type: 'phone', section: 'Main Contact' },
  'Email': { type: 'textbox', section: 'Main Contact' },
  'Job Position': { type: 'textbox', section: 'Main Contact' },
} as const;

/**
 * Site data interface for type-safe form filling
 */
export interface SiteData {
  // Customer (required)
  customerId?: string;
  customerName?: string;

  // Details
  siteName: string;
  tags?: string[];
  accountManager?: string;
  postcode?: string;
  telephone?: string;
  countryCode?: string;
  area?: string; // Area dropdown
  siteReferenceNumber?: string;

  // Address
  address?: string;
  addressArea?: string;
  city?: string;
  county?: string;

  // Main Contact
  firstName?: string;
  lastName?: string;
  contactTelephone?: string;
  contactCountryCode?: string;
  email?: string;
  jobPosition?: string;
}

/**
 * SitePage - Page Object for Add Site / Site Detail pages
 * URL: /Site/Create (Add) or /Site/Detail/{id} (View/Edit)
 */
export class SitePage extends BasePage {
  // ========================
  // Locators - Customer Selection
  // ========================
  readonly customerDropdown: Locator;
  readonly customerSearchbox: Locator;
  readonly addCustomerButton: Locator;

  // ========================
  // Locators - Find Address
  // ========================
  readonly findAddressInput: Locator;

  // ========================
  // Locators - Details Section
  // ========================
  readonly siteNameInput: Locator;
  readonly tagsDropdown: Locator;
  readonly accountManagerDropdown: Locator;
  readonly postcodeInput: Locator;
  readonly telephoneCountryCode: Locator;
  readonly telephoneInput: Locator;
  readonly areaDropdown: Locator;
  readonly siteReferenceInput: Locator;

  // ========================
  // Locators - Address Section
  // ========================
  readonly addressInput: Locator;
  readonly addressAreaInput: Locator;
  readonly cityInput: Locator;
  readonly countyInput: Locator;

  // ========================
  // Locators - Main Contact Section
  // ========================
  readonly mainContactSection: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly contactTelephoneCountryCode: Locator;
  readonly contactTelephoneInput: Locator;
  readonly emailInput: Locator;
  readonly jobPositionInput: Locator;

  // ========================
  // Locators - Buttons
  // ========================
  readonly cancelButton: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);

    // Customer Selection
    this.customerDropdown = page.locator('text=Customer *').locator('..').locator('[role="combobox"], .select2-selection');
    this.customerSearchbox = page.locator('text=Customer *').locator('..').locator('input[role="searchbox"], .select2-search__field');
    this.addCustomerButton = page.locator('text=Customer *').locator('..').locator('button');

    // Find Address
    this.findAddressInput = page.getByPlaceholder('Start Typing Company Name, Address, Postcode');

    // Details Section
    this.siteNameInput = page.locator('text=Site Name *').locator('..').locator('input');
    this.tagsDropdown = page.locator('text=Tag(s)').locator('..').locator('[class*="multiselect"], [role="listbox"]');
    this.accountManagerDropdown = page.locator('text=Account Manager').locator('..').locator('input[role="searchbox"]');
    this.postcodeInput = page.locator('text=Postcode').locator('..').locator('input');

    // Telephone (Site)
    const telephoneSection = page.locator('text=Telephone').first().locator('..');

    this.telephoneCountryCode = telephoneSection.locator('[role="combobox"]').first();
    this.telephoneInput = telephoneSection.locator('input[type="text"], input[type="tel"]').first();

    // Area (dropdown)
    this.areaDropdown = page.locator('text=Area').first().locator('..').locator('input[role="searchbox"]');
    this.siteReferenceInput = page.locator('text=Site Reference Number').locator('..').locator('input');

    // Address Section - use placeholder text
    this.addressInput = page.getByPlaceholder('Company name, building, Street address');
    this.addressAreaInput = page.getByPlaceholder('Area');
    this.cityInput = page.getByPlaceholder('City');
    this.countyInput = page.getByPlaceholder('County, State/Province/Region');

    // Main Contact Section
    this.mainContactSection = page.locator('text=Main Contact Person').locator('..');
    this.firstNameInput = page.locator('text=First Name').locator('..').locator('input');
    this.lastNameInput = page.locator('text=Last Name').locator('..').locator('input');

    // Contact Telephone (in Main Contact section)
    const contactTelSection = this.mainContactSection.locator('text=Telephone').locator('..');

    this.contactTelephoneCountryCode = contactTelSection.locator('[role="combobox"]').first();
    this.contactTelephoneInput = contactTelSection.locator('input[type="text"], input[type="tel"]').first();

    this.emailInput = page.locator('text=Email').locator('..').locator('input');
    this.jobPositionInput = page.locator('text=Job Position').locator('..').locator('input');

    // Buttons
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  // ========================
  // Navigation
  // ========================

  /**
   * Navigate to Add Site page
   */
  async navigateToAddSite(): Promise<void> {
    await test.step('Navigate to Add Site page', async () => {
      await this.page.goto('/Site/Create');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Navigate to Site detail/edit page
   * @param siteId - Site ID
   */
  async navigateToSite(siteId: string | number): Promise<void> {
    await test.step(`Navigate to Site ${siteId}`, async () => {
      await this.page.goto(`/Site/Detail/${siteId}`);
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  // ========================
  // Customer Selection
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
      await this.page.waitForSelector('.pac-item, .address-suggestion', { timeout: 5000 }).catch(() => {});
      await this.page.locator('.pac-item, .address-suggestion').first().click().catch(() => {});
    });
  }

  // ========================
  // Details Section
  // ========================

  /**
   * Fill Site Name (required)
   */
  async fillSiteName(name: string): Promise<void> {
    await test.step(`Fill Site Name: ${name}`, async () => {
      await this.siteNameInput.fill(name);
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
      await this.page.keyboard.press('Escape');
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

  /**
   * Fill Postcode
   */
  async fillPostcode(postcode: string): Promise<void> {
    await test.step(`Fill Postcode: ${postcode}`, async () => {
      await this.postcodeInput.fill(postcode);
    });
  }

  /**
   * Fill telephone with optional country code
   */
  async fillTelephone(telephone: string, countryCode?: string): Promise<void> {
    await test.step(`Fill Telephone: ${countryCode || ''} ${telephone}`, async () => {
      if (countryCode) {
        await this.telephoneCountryCode.selectOption({ label: countryCode });
      }
      await this.telephoneInput.fill(telephone);
    });
  }

  /**
   * Select Area from dropdown
   */
  async selectArea(area: string): Promise<void> {
    await test.step(`Select Area: ${area}`, async () => {
      await this.areaDropdown.click();
      await this.areaDropdown.fill(area);
      await this.page.getByRole('option', { name: area }).click();
    });
  }

  /**
   * Fill Site Reference Number
   */
  async fillSiteReference(reference: string): Promise<void> {
    await test.step(`Fill Site Reference: ${reference}`, async () => {
      await this.siteReferenceInput.fill(reference);
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
  }): Promise<void> {
    await test.step('Fill address fields', async () => {
      if (address.street) await this.addressInput.fill(address.street);
      if (address.area) await this.addressAreaInput.fill(address.area);
      if (address.city) await this.cityInput.fill(address.city);
      if (address.county) await this.countyInput.fill(address.county);
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
   * Fill entire site form from data object
   * @param data - Site data object
   */
  async fillSiteForm(data: SiteData): Promise<void> {
    await test.step('Fill complete site form', async () => {
      // Customer (required)
      if (data.customerName) await this.selectCustomer(data.customerName);

      // Site Name (required)
      await this.fillSiteName(data.siteName);

      // Optional Details
      if (data.tags?.length) await this.selectTags(data.tags);
      if (data.accountManager) await this.selectAccountManager(data.accountManager);
      if (data.postcode) await this.fillPostcode(data.postcode);
      if (data.telephone) await this.fillTelephone(data.telephone, data.countryCode);
      if (data.area) await this.selectArea(data.area);
      if (data.siteReferenceNumber) await this.fillSiteReference(data.siteReferenceNumber);

      // Address
      await this.fillAddress({
        street: data.address,
        area: data.addressArea,
        city: data.city,
        county: data.county,
      });

      // Main Contact
      await this.fillMainContact({
        firstName: data.firstName,
        lastName: data.lastName,
        telephone: data.contactTelephone,
        countryCode: data.contactCountryCode,
        email: data.email,
        jobPosition: data.jobPosition,
      });
    });
  }

  /**
   * Create a new site with minimal required data
   * @param customerName - Customer to link to
   * @param siteName - Required site name
   * @returns Site ID from URL after save
   */
  async createSite(customerName: string, siteName: string): Promise<string | null> {
    await this.navigateToAddSite();
    await this.selectCustomer(customerName);
    await this.fillSiteName(siteName);
    await this.save();

    const url = this.page.url();
    const match = url.match(/\/Site\/Detail\/(\d+)/);

    return match ? match[1] : null;
  }

  /**
   * Create site with full data
   * @param data - Complete site data
   * @returns Site ID from URL after save
   */
  async createSiteWithData(data: SiteData): Promise<string | null> {
    await this.navigateToAddSite();
    await this.fillSiteForm(data);
    await this.save();

    const url = this.page.url();
    const match = url.match(/\/Site\/Detail\/(\d+)/);

    return match ? match[1] : null;
  }

  // ========================
  // High-Level Actions
  // ========================

  /**
   * Create a new site with data-driven approach
   * Fills all provided fields, saves, and returns Site ID
   *
   * @param data - Site data object (use SiteBuilder from site.data.ts)
   * @returns Site ID after successful creation
   *
   * @example
   * import { SiteBuilder } from '../../data/uiData/site.data';
   *
   * // Navigate first
   * await sitePage.navigateToAddSite();
   *
   * // Simple site
   * const siteId = await sitePage.createNewSite(
   *   SiteBuilder.create('ABC Corp', 'Main Office').build()
   * );
   *
   * // Site with more details
   * const siteId = await sitePage.createNewSite(
   *   SiteBuilder.create('ABC Corp', 'Branch Office')
   *     .address('123 Main Street')
   *     .city('London')
   *     .postcode('SW1A 1AA')
   *     .contact('John', 'Doe', 'john@abc.com')
   *     .build()
   * );
   */
  async createNewSite(data: SiteData): Promise<string> {
    return await test.step(`Create new site: ${data.siteName}`, async () => {
      // Fill all form fields using data
      await this.fillSiteForm(data);

      // Save the site
      await this.save();

      // Extract and return Site ID from URL
      const url = this.page.url();
      const match = url.match(/\/Site\/Detail\/(\d+)/);

      return match ? match[1] : '';
    });
  }

  /**
   * Fill site form without saving (for validation tests)
   *
   * @param data - Site data object
   */
  async fillNewSiteForm(data: SiteData): Promise<void> {
    await test.step(`Fill site form: ${data.siteName}`, async () => {
      // Fill all form fields
      await this.fillSiteForm(data);
    });
  }
}
