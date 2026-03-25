import { Page, Locator } from '@playwright/test';
import { test } from '@playwright/test';

/**
 * Company Setup Page Object
 * URL: /Setting/CompanySetup
 * Company name, address, contact info, business hours and logo settings
 */
export class CompanySetupPage {
  readonly page: Page;

  // Breadcrumb
  readonly settingsLink: Locator;

  // Tabs
  readonly detailsTab: Locator;
  readonly businessHoursTab: Locator;

  // Actions
  readonly editButton: Locator;
  readonly undoButton: Locator;
  readonly saveButton: Locator;

  // Details Section
  readonly detailsHeading: Locator;
  readonly companyNumberInput: Locator;
  readonly nameInput: Locator;
  readonly industryDropdown: Locator;
  readonly addressLine1Input: Locator;
  readonly areaInput: Locator;
  readonly cityInput: Locator;
  readonly countyInput: Locator;
  readonly postcodeInput: Locator;
  readonly countryDisplay: Locator;

  // Other Section
  readonly otherHeading: Locator;
  readonly emailInput: Locator;
  readonly telephoneInput: Locator;
  readonly websiteInput: Locator;
  readonly callingCodeDropdown: Locator;

  // Logo Section
  readonly currentLogoHeading: Locator;
  readonly uploadNewLogoHeading: Locator;
  readonly browseButton: Locator;
  readonly dropZone: Locator;

  constructor(page: Page) {
    this.page = page;

    // Breadcrumb
    this.settingsLink = page.locator('a[href="https://uat.joblogic.com/Setting"]');

    // Tabs
    this.detailsTab = page.locator('a[href="#detailsTab"]');
    this.businessHoursTab = page.locator('a[href="#businessHoursTab"]');

    // Actions
    this.editButton = page.getByRole('button', { name: 'Edit' });
    this.undoButton = page.getByRole('button', { name: 'Undo' });
    this.saveButton = page.getByRole('button', { name: 'Save' });

    // Details Section
    this.detailsHeading = page.locator('h4:has-text("Details")');
    this.companyNumberInput = page.locator('input').filter({ hasText: /Company Number/i }).first();
    this.nameInput = page.locator('input[placeholder*="Name"], input').nth(1);
    this.industryDropdown = page.locator('select').first();
    this.addressLine1Input = page.getByPlaceholder('Company name, building, Street address');
    this.areaInput = page.getByPlaceholder('Area');
    this.cityInput = page.getByPlaceholder('City');
    this.countyInput = page.getByPlaceholder('County, State/Province/Region');
    this.postcodeInput = page.getByPlaceholder('Postcode');
    this.countryDisplay = page.locator('p:has-text("United Kingdom")');

    // Other Section
    this.otherHeading = page.locator('h4:has-text("Other")');
    this.emailInput = page.locator('input[type="email"], input').filter({ hasText: /@/ }).first();
    this.telephoneInput = page.locator('input[type="tel"]').first();
    this.websiteInput = page.locator('input').filter({ hasText: '' }).nth(5);
    this.callingCodeDropdown = page.locator('select').nth(1);

    // Logo Section
    this.currentLogoHeading = page.locator('h4:has-text("Current Logo")');
    this.uploadNewLogoHeading = page.locator('h4:has-text("Upload New Logo")');
    this.browseButton = page.getByRole('button', { name: 'Browse' });
    this.dropZone = page.locator('text=Drop file to upload');
  }

  // Navigation
  async navigateToCompanySetup(): Promise<void> {
    await test.step('Navigate to Company Setup page', async () => {
      await this.page.goto('/Setting/CompanySetup');
      await this.page.waitForLoadState('networkidle');
    });
  }

  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Company Setup page is loaded', async () => {
      await this.detailsHeading.waitFor({ state: 'visible' });
    });
  }

  async goBackToSettings(): Promise<void> {
    await test.step('Go back to Settings page', async () => {
      await this.settingsLink.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  // Tab Navigation
  async switchToDetailsTab(): Promise<void> {
    await test.step('Switch to Details tab', async () => {
      await this.detailsTab.click();
    });
  }

  async switchToBusinessHoursTab(): Promise<void> {
    await test.step('Switch to Business Hours tab', async () => {
      await this.businessHoursTab.click();
    });
  }

  // Actions
  async clickEdit(): Promise<void> {
    await test.step('Click Edit button', async () => {
      await this.editButton.click();
    });
  }

  async clickUndo(): Promise<void> {
    await test.step('Click Undo button', async () => {
      await this.undoButton.click();
    });
  }

  async clickSave(): Promise<void> {
    await test.step('Click Save button', async () => {
      await this.saveButton.click();
      await this.page.waitForLoadState('networkidle');
    });
  }

  // Field Interactions
  async setCompanyName(name: string): Promise<void> {
    await test.step(`Set company name to "${name}"`, async () => {
      await this.nameInput.fill(name);
    });
  }

  async selectIndustry(industry: string): Promise<void> {
    await test.step(`Select industry "${industry}"`, async () => {
      await this.industryDropdown.selectOption({ label: industry });
    });
  }

  async setAddress(options: {
    line1?: string;
    area?: string;
    city?: string;
    county?: string;
    postcode?: string;
  }): Promise<void> {
    await test.step('Set company address', async () => {
      if (options.line1) await this.addressLine1Input.fill(options.line1);
      if (options.area) await this.areaInput.fill(options.area);
      if (options.city) await this.cityInput.fill(options.city);
      if (options.county) await this.countyInput.fill(options.county);
      if (options.postcode) await this.postcodeInput.fill(options.postcode);
    });
  }

  async setEmail(email: string): Promise<void> {
    await test.step(`Set email to "${email}"`, async () => {
      await this.emailInput.fill(email);
    });
  }

  async setTelephone(telephone: string): Promise<void> {
    await test.step(`Set telephone to "${telephone}"`, async () => {
      await this.telephoneInput.fill(telephone);
    });
  }

  async setWebsite(website: string): Promise<void> {
    await test.step(`Set website to "${website}"`, async () => {
      await this.websiteInput.fill(website);
    });
  }

  async selectCallingCode(callingCode: string): Promise<void> {
    await test.step(`Select calling code "${callingCode}"`, async () => {
      await this.callingCodeDropdown.selectOption({ label: callingCode });
    });
  }

  // Logo Upload
  async uploadLogo(filePath: string): Promise<void> {
    await test.step('Upload company logo', async () => {
      const fileInput = this.page.locator('input[type="file"]');
      await fileInput.setInputFiles(filePath);
    });
  }

  // Getters
  async getCompanyName(): Promise<string> {
    return await test.step('Get company name', async () => {
      return await this.nameInput.inputValue();
    });
  }

  async getEmail(): Promise<string> {
    return await test.step('Get email', async () => {
      return await this.emailInput.inputValue();
    });
  }

  async getCountry(): Promise<string> {
    return await test.step('Get country', async () => {
      return await this.countryDisplay.textContent() || '';
    });
  }

  // Validation
  async isEditMode(): Promise<boolean> {
    return await test.step('Check if in edit mode', async () => {
      const nameInputDisabled = await this.nameInput.isDisabled();
      return !nameInputDisabled;
    });
  }
}
