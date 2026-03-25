import { Locator, Page } from "@playwright/test";
import { test, expect } from '@playwright/test';
import { BasePage } from "../BasePage";
import { PPMData } from '../../data/testData/ppm.data';

/**
 * PPM Contract Type
 */
export type PPMContractType = 'PPM Quote' | 'PPM Contract';

/**
 * PPM creation steps
 */
export type PPMStep = '1. PPM Description' | '2. Selling & Billing' | '3. Default Engineer' | '4. Notes & Attachments';

/**
 * PPM form data interface
 */
export interface PPMFormData {
  contractType?: PPMContractType;
  customer?: string;
  site?: string;
  planReference?: string;
  description?: string;
  jobCategory?: string;
  accountManager?: string;
  tags?: string[];
}

/**
 * PPMPage - Page Object for Add PPM page (Create PPM Quote/Contract)
 * URL: /PPMContract/Create
 */
export class PPMPage extends BasePage {
  // ========================
  // Locators - Header
  // ========================
  readonly pageTitle: Locator;
  readonly importAssetsButton: Locator;

  // ========================
  // Locators - Contract Type Selection
  // ========================
  readonly ppmQuoteRadio: Locator;
  readonly ppmContractRadio: Locator;

  // ========================
  // Locators - Customer & Site
  // ========================
  readonly customerCombobox: Locator;
  readonly customerSearchInput: Locator;
  readonly customerClearButton: Locator;
  readonly siteCombobox: Locator;
  readonly siteSearchInput: Locator;
  readonly siteClearButton: Locator;

  // ========================
  // Locators - PPM Description
  // ========================
  readonly planReferenceInput: Locator;
  readonly descriptionInput: Locator;
  readonly descriptionSpeechButton: Locator;
  readonly jobCategoryCombobox: Locator;
  readonly jobCategorySearchInput: Locator;
  readonly accountManagerCombobox: Locator;
  readonly accountManagerSearchInput: Locator;
  readonly tagsDropdown: Locator;

  // ========================
  // Locators - Footer
  // ========================
  readonly requiredFieldsText: Locator;
  readonly nextButton: Locator;
  readonly backButton: Locator;
  readonly cancelButton: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);

    // Header
    this.pageTitle = page.getByRole('heading', { name: /Add PPM/ });
    this.importAssetsButton = page.getByRole('button', { name: /Import Assets/ });

    // Contract Type Selection
    this.ppmQuoteRadio = page.locator('text=PPM Quote').first();
    this.ppmContractRadio = page.locator('text=PPM Contract').first();

    // Customer & Site
    this.customerCombobox = page.locator('text=Customer *').locator('..').locator('[class*="vs__dropdown"]').first();
    this.customerSearchInput = page.locator('text=Customer *').locator('..').getByRole('searchbox');
    this.customerClearButton = page.locator('text=Customer *').locator('..').getByRole('button', { name: '' });
    this.siteCombobox = page.locator('text=Site *').locator('..').locator('[class*="vs__dropdown"]').first();
    this.siteSearchInput = page.locator('text=Site *').locator('..').getByRole('searchbox');
    this.siteClearButton = page.locator('text=Site *').locator('..').getByRole('button', { name: '' });

    // PPM Description
    this.planReferenceInput = page.locator('text=Plan Reference').locator('..').getByRole('textbox');
    this.descriptionInput = page.locator('text=Description').locator('..').getByRole('textbox').first();
    this.descriptionSpeechButton = page.locator('text=Description').locator('..').getByRole('button');
    this.jobCategoryCombobox = page.locator('text=Job Category').locator('..').locator('[class*="vs__dropdown"]');
    this.jobCategorySearchInput = page.locator('text=Job Category').locator('..').getByRole('searchbox');
    this.accountManagerCombobox = page.locator('text=Account Manager').locator('..').locator('[class*="vs__dropdown"]');
    this.accountManagerSearchInput = page.locator('text=Account Manager').locator('..').getByRole('searchbox');
    this.tagsDropdown = page.locator('text=Tag(s)').locator('..');

    // Footer
    this.requiredFieldsText = page.locator('text=*Required Fields');
    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.backButton = page.getByRole('button', { name: 'Back' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  // ========================
  // Navigation Methods
  // ========================

  /**
   * Navigate to Add PPM page (Quote)
   */
  async navigateToAddPPMQuote(): Promise<void> {
    await test.step('Navigate to Add PPM Quote page', async () => {
      await this.page.goto('/PPMContract/Create#ppmquote');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Navigate to Add PPM page (Contract)
   */
  async navigateToAddPPMContract(): Promise<void> {
    await test.step('Navigate to Add PPM Contract page', async () => {
      await this.page.goto('/PPMContract/Create#ppmcontract');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Add PPM page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
    });
  }

  // ========================
  // Contract Type Methods
  // ========================

  /**
   * Select PPM contract type
   */
  async selectContractType(type: PPMContractType): Promise<void> {
    await test.step(`Select contract type: ${type}`, async () => {
      if (type === 'PPM Quote') {
        await this.ppmQuoteRadio.click();
      } else {
        await this.ppmContractRadio.click();
      }
    });
  }

  /**
   * Check if PPM Quote is selected
   */
  async isPPMQuoteSelected(): Promise<boolean> {
    const parent = this.ppmQuoteRadio.locator('..');
    const isActive = await parent.getAttribute('class');
    return isActive?.includes('active') ?? false;
  }

  /**
   * Check if PPM Contract is selected
   */
  async isPPMContractSelected(): Promise<boolean> {
    const parent = this.ppmContractRadio.locator('..');
    const isActive = await parent.getAttribute('class');
    return isActive?.includes('active') ?? false;
  }

  // ========================
  // Customer & Site Methods
  // ========================

  /**
   * Select customer by name
   */
  async selectCustomer(customerName: string): Promise<void> {
    await test.step(`Select customer: ${customerName}`, async () => {
      await this.customerSearchInput.fill(customerName);
      await this.page.waitForTimeout(500);
      await this.page.getByRole('option', { name: new RegExp(customerName, 'i') }).first().click();
    });
  }

  /**
   * Clear customer selection
   */
  async clearCustomer(): Promise<void> {
    await test.step('Clear customer selection', async () => {
      await this.customerClearButton.click();
    });
  }

  /**
   * Select site by name
   */
  async selectSite(siteName: string): Promise<void> {
    await test.step(`Select site: ${siteName}`, async () => {
      await this.siteSearchInput.fill(siteName);
      await this.page.waitForTimeout(500);
      await this.page.getByRole('option', { name: new RegExp(siteName, 'i') }).first().click();
    });
  }

  /**
   * Clear site selection
   */
  async clearSite(): Promise<void> {
    await test.step('Clear site selection', async () => {
      await this.siteClearButton.click();
    });
  }

  // ========================
  // PPM Description Methods
  // ========================

  /**
   * Fill plan reference
   */
  async fillPlanReference(reference: string): Promise<void> {
    await test.step(`Fill plan reference: ${reference}`, async () => {
      await this.planReferenceInput.fill(reference);
    });
  }

  /**
   * Fill description
   */
  async fillDescription(description: string): Promise<void> {
    await test.step(`Fill description: ${description}`, async () => {
      await this.descriptionInput.fill(description);
    });
  }

  /**
   * Select job category
   */
  async selectJobCategory(category: string): Promise<void> {
    await test.step(`Select job category: ${category}`, async () => {
      await this.jobCategorySearchInput.fill(category);
      await this.page.waitForTimeout(500);
      await this.page.getByRole('option', { name: new RegExp(category, 'i') }).first().click();
    });
  }

  /**
   * Select account manager
   */
  async selectAccountManager(manager: string): Promise<void> {
    await test.step(`Select account manager: ${manager}`, async () => {
      await this.accountManagerSearchInput.fill(manager);
      await this.page.waitForTimeout(500);
      await this.page.getByRole('option', { name: new RegExp(manager, 'i') }).first().click();
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
      // Close dropdown
      await this.page.keyboard.press('Escape');
    });
  }

  // ========================
  // Navigation Button Methods
  // ========================

  /**
   * Click Next button
   */
  async clickNext(): Promise<void> {
    await test.step('Click Next button', async () => {
      await this.nextButton.click();
    });
  }

  /**
   * Click Back button
   */
  async clickBack(): Promise<void> {
    await test.step('Click Back button', async () => {
      await this.backButton.click();
    });
  }

  /**
   * Click Cancel button
   */
  async clickCancel(): Promise<void> {
    await test.step('Click Cancel button', async () => {
      await this.cancelButton.click();
    });
  }

  /**
   * Click Save button
   */
  async clickSave(): Promise<void> {
    await test.step('Click Save button', async () => {
      await this.saveButton.click();
    });
  }

  /**
   * Check if Next button is enabled
   */
  async isNextEnabled(): Promise<boolean> {
    return await this.nextButton.isEnabled();
  }

  /**
   * Check if Save button is enabled
   */
  async isSaveEnabled(): Promise<boolean> {
    return await this.saveButton.isEnabled();
  }

  /**
   * Check if Import Assets button is enabled
   */
  async isImportAssetsEnabled(): Promise<boolean> {
    return await this.importAssetsButton.isEnabled();
  }

  // ========================
  // Combined Methods
  // ========================

  /**
   * Fill PPM form data (Step 1)
   */
  async fillPPMDescription(data: PPMFormData): Promise<void> {
    await test.step('Fill PPM Description', async () => {
      if (data.contractType) {
        await this.selectContractType(data.contractType);
      }
      if (data.customer) {
        await this.selectCustomer(data.customer);
      }
      if (data.site) {
        await this.selectSite(data.site);
      }
      if (data.planReference) {
        await this.fillPlanReference(data.planReference);
      }
      if (data.description) {
        await this.fillDescription(data.description);
      }
      if (data.jobCategory) {
        await this.selectJobCategory(data.jobCategory);
      }
      if (data.accountManager) {
        await this.selectAccountManager(data.accountManager);
      }
      if (data.tags && data.tags.length > 0) {
        await this.selectTags(data.tags);
      }
    });
  }

  /**
   * Create PPM Quote with basic info
   */
  async createPPMQuote(customer: string, site: string, description: string): Promise<void> {
    await test.step(`Create PPM Quote for ${customer}`, async () => {
      await this.navigateToAddPPMQuote();
      await this.selectContractType('PPM Quote');
      await this.selectCustomer(customer);
      await this.selectSite(site);
      await this.fillDescription(description);
      await this.clickNext();
    });
  }

  /**
   * Create PPM Contract with basic info
   */
  async createPPMContract(customer: string, site: string, description: string): Promise<void> {
    await test.step(`Create PPM Contract for ${customer}`, async () => {
      await this.navigateToAddPPMContract();
      await this.selectContractType('PPM Contract');
      await this.selectCustomer(customer);
      await this.selectSite(site);
      await this.fillDescription(description);
      await this.clickNext();
    });
  }

  // ========================
  // High-Level Methods (Data Builder Pattern)
  // ========================

  /**
   * Fill the PPM form with data (does not save)
   * Use this when you need to fill the form but not submit yet
   * @param data - PPMData object from builder
   */
  async fillNewPPMForm(data: PPMData): Promise<void> {
    await test.step('Fill new PPM form', async () => {
      await this.selectContractType(data.contractType);
      await this.selectCustomer(data.customer);
      await this.selectSite(data.site);
      await this.fillDescription(data.description);
      
      if (data.planReference) await this.fillPlanReference(data.planReference);
      if (data.jobCategory) await this.selectJobCategory(data.jobCategory);
      if (data.accountManager) await this.selectAccountManager(data.accountManager);
      if (data.tags && data.tags.length > 0) await this.selectTags(data.tags);
    });
  }

  /**
   * Create a new PPM (Quote or Contract) with the provided data
   * Fills the form and proceeds to next step
   * @param data - PPMData object from builder
   */
  async createNewPPM(data: PPMData): Promise<void> {
    await test.step(`Create new ${data.contractType}`, async () => {
      await this.fillNewPPMForm(data);
      await this.clickNext();
    });
  }
}
