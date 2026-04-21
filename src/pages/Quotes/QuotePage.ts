import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Log Quote form field definitions
 */
export const LOG_QUOTE_FIELDS = {
  // Customer & Site (required)
  'Customer': { type: 'combobox', required: true },
  'Site': { type: 'combobox', required: true },
  'Log Quote from Template': { type: 'checkbox' },
  'Log Quote from Recent Quote': { type: 'checkbox' },

  // Quote Details
  'Job Type': { type: 'combobox', required: true, section: 'Quote Details' },
  'Job Category': { type: 'combobox', section: 'Quote Details' },
  'Description': { type: 'textbox', required: true, section: 'Quote Details' },
  'Tag(s)': { type: 'multiselect', section: 'Quote Details' },
  'Title': { type: 'textbox', section: 'Quote Details' },
  'Quote Reference Number': { type: 'textbox', section: 'Quote Details' },
  'Source of Enquiry': { type: 'combobox', section: 'Quote Details' },
  'Quote Trade': { type: 'combobox', section: 'Quote Details' },
  'Priority Level': { type: 'combobox', section: 'Quote Details' },
  'Quote Ref 1': { type: 'textbox', section: 'Quote Details' },
  'Quote Ref 2': { type: 'combobox', section: 'Quote Details' },
  'Expiry Date': { type: 'date', section: 'Quote Details' },
  'Quote Owner': { type: 'combobox', required: true, section: 'Quote Details' },
  'Expected Sale Date': { type: 'date', section: 'Quote Details' },
  'Chance of Sale': { type: 'slider', section: 'Quote Details' },
} as const;

/**
 * Quote data interface for type-safe form filling
 */
export interface QuoteData {
  // Customer & Site (required)
  customerName: string;
  siteName: string;
  logFromTemplate?: boolean;
  logFromRecentQuote?: boolean;

  // Quote Details
  jobType?: string;
  jobCategory?: string;
  description: string;
  tags?: string[];
  title?: string;
  quoteReferenceNumber?: string;
  sourceOfEnquiry?: string;
  quoteTrade?: string;
  priorityLevel?: string;
  quoteRef1?: string;
  quoteRef2?: string;
  expiryDate?: string;
  quoteOwner?: string;
  expectedSaleDate?: string;
  chanceOfSale?: number; // 0, 25, 50, 75, 100

  // Contacts
  contactNames?: string[];
}

/**
 * QuotePage - Page Object for Log Quote page
 * URL: /Quote/Create
 */
export class QuotePage extends BasePage {
  // ========================
  // Locators - Page Header
  // ========================
  readonly pageTitle: Locator;

  // ========================
  // Locators - Customer & Site Section
  // ========================
  readonly customerCombobox: Locator;
  readonly customerSearchbox: Locator;
  readonly customerClearButton: Locator;
  readonly siteCombobox: Locator;
  readonly siteSearchbox: Locator;
  readonly siteClearButton: Locator;
  readonly logFromTemplateCheckbox: Locator;
  readonly logFromRecentQuoteCheckbox: Locator;

  // ========================
  // Locators - Quote Details Section
  // ========================
  readonly quoteDetailsHeading: Locator;
  readonly jobTypeCombobox: Locator;
  readonly jobTypeSearchbox: Locator;
  readonly jobTypeClearButton: Locator;
  readonly jobCategoryCombobox: Locator;
  readonly jobCategorySearchbox: Locator;
  readonly descriptionTextbox: Locator;
  readonly tagsDropdown: Locator;
  readonly titleInput: Locator;
  readonly quoteReferenceNumberInput: Locator;
  readonly sourceOfEnquiryCombobox: Locator;
  readonly sourceOfEnquirySearchbox: Locator;
  readonly quoteTradeCombobox: Locator;
  readonly quoteTradeSearchbox: Locator;
  readonly priorityLevelCombobox: Locator;
  readonly priorityLevelSearchbox: Locator;
  readonly quoteRef1Input: Locator;
  readonly quoteRef2Combobox: Locator;
  readonly quoteRef2Searchbox: Locator;
  readonly expiryDateInput: Locator;
  readonly quoteOwnerCombobox: Locator;
  readonly quoteOwnerSearchbox: Locator;
  readonly quoteOwnerClearButton: Locator;
  readonly expectedSaleDateInput: Locator;
  readonly chanceOfSaleSlider: Locator;

  // ========================
  // Locators - Contacts Section
  // ========================
  readonly contactsHeading: Locator;
  readonly addContactButton: Locator;
  readonly contactsTable: Locator;
  readonly noContactsMessage: Locator;

  // ========================
  // Locators - Recent Jobs/Quotes Section
  // ========================
  readonly recentJobsQuotesHeading: Locator;
  readonly loggedWithinDropdown: Locator;
  readonly jobsTab: Locator;
  readonly quotesTab: Locator;
  readonly recentTable: Locator;

  // ========================
  // Locators - Footer Buttons
  // ========================
  readonly cancelButton: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);

    // Page Header
    this.pageTitle = page.locator('h3').filter({ hasText: 'Log Quote' });

    // Customer & Site Section
    this.customerCombobox = page.locator('text=Customer *').locator('..').locator('[role="combobox"]');
    this.customerSearchbox = page.locator('text=Customer *').locator('..').getByRole('searchbox');
    this.customerClearButton = page.locator('text=Customer *').locator('..').getByRole('button', { name: 'Clear Selected' });
    this.siteCombobox = page.locator('text=Site *').locator('..').locator('[role="combobox"]');
    this.siteSearchbox = page.locator('text=Site *').locator('..').getByRole('searchbox');
    this.siteClearButton = page.locator('text=Site *').locator('..').getByRole('button', { name: 'Clear Selected' });
    this.logFromTemplateCheckbox = page.getByText('Log Quote from Template').locator('..').locator('input[type="checkbox"]');
    this.logFromRecentQuoteCheckbox = page.getByText('Log Quote from Recent Quote').locator('..').locator('input[type="checkbox"]');

    // Quote Details Section
    this.quoteDetailsHeading = page.locator('h4:has-text("Quote Details")');
    this.jobTypeCombobox = page.locator('text=Job Type *').locator('xpath=../..').locator('[role="combobox"]');
    this.jobTypeSearchbox = page.locator('text=Job Type *').locator('xpath=../..').getByRole('searchbox');
    this.jobTypeClearButton = page.locator('text=Job Type *').locator('xpath=../..').getByRole('button', { name: 'Clear Selected' });
    this.jobCategoryCombobox = page.locator('text=Job Category').locator('..').locator('[role="combobox"]');
    this.jobCategorySearchbox = page.locator('text=Job Category').locator('..').getByRole('searchbox');
    this.descriptionTextbox = page.locator('text=Description*').locator('..').locator('input[type="text"], textarea');
    this.tagsDropdown = page.locator('text=Tag(s)').locator('..').locator('[class*="multiselect"]');
    this.titleInput = page.locator('text=Title').locator('..').locator('input[type="text"]');
    this.quoteReferenceNumberInput = page.locator('text=Quote Reference Number').locator('..').locator('input[type="text"]');
    this.sourceOfEnquiryCombobox = page.locator('text=Source of Enquiry').locator('..').locator('[role="combobox"]');
    this.sourceOfEnquirySearchbox = page.locator('text=Source of Enquiry').locator('..').getByRole('searchbox');
    this.quoteTradeCombobox = page.locator('text=Quote Trade').locator('..').locator('[role="combobox"]');
    this.quoteTradeSearchbox = page.locator('text=Quote Trade').locator('..').getByRole('searchbox');
    this.priorityLevelCombobox = page.locator('text=Priority Level').locator('..').locator('[role="combobox"]');
    this.priorityLevelSearchbox = page.locator('text=Priority Level').locator('..').getByRole('searchbox');
    this.quoteRef1Input = page.locator('text=Quote Ref 1').locator('..').locator('input[type="text"]');
    this.quoteRef2Combobox = page.locator('text=Quote Ref 2').locator('..').locator('[role="combobox"]');
    this.quoteRef2Searchbox = page.locator('text=Quote Ref 2').locator('..').getByRole('searchbox');
    this.expiryDateInput = page.getByPlaceholder('DD/MM/YYYY').first();
    this.quoteOwnerCombobox = page.locator('text=Quote Owner *').locator('..').locator('[role="combobox"]');
    this.quoteOwnerSearchbox = page.locator('text=Quote Owner *').locator('..').getByRole('searchbox');
    this.quoteOwnerClearButton = page.locator('text=Quote Owner *').locator('..').getByRole('button', { name: 'Clear Selected' });
    this.expectedSaleDateInput = page.locator('text=Expected Sale Date').locator('..').locator('input[placeholder="DD/MM/YYYY"]');
    this.chanceOfSaleSlider = page.locator('text=Chance of Sale').locator('..').locator('[role="slider"], input[type="range"]');

    // Contacts Section
    this.contactsHeading = page.locator('h4:has-text("Contacts")');
    this.addContactButton = page.getByRole('button', { name: 'Add Contact' });
    this.contactsTable = page.locator('h4:has-text("Contacts")').locator('..').locator('table');
    this.noContactsMessage = page.getByText('No matching results found.');

    // Recent Jobs/Quotes Section
    this.recentJobsQuotesHeading = page.locator('h4:has-text("Recent Jobs/Quotes")');
    this.loggedWithinDropdown = page.locator('text=Logged Within Last / Next').locator('..').locator('[role="combobox"]');
    this.jobsTab = page.locator('text*=Jobs (');
    this.quotesTab = page.locator('text*=Quotes (');
    this.recentTable = page.locator('h4:has-text("Recent Jobs/Quotes")').locator('..').locator('table');

    // Footer Buttons
    this.cancelButton = page.getByRole('link', { name: 'Cancel' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  // ========================
  // Navigation
  // ========================

  /**
   * Navigate to Log Quote page
   */
  async navigateToLogQuote(): Promise<void> {
    await test.step('Navigate to Log Quote page', async () => {
      await this.page.goto('/Quote/Create');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Log Quote page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
      await expect(this.customerCombobox).toBeVisible();
      await expect(this.saveButton).toBeVisible();
    });
  }

  // ========================
  // Customer & Site Section
  // ========================

  /**
   * Select customer from dropdown
   */
  async selectCustomer(customerName: string): Promise<void> {
    await test.step(`Select customer: ${customerName}`, async () => {
      await this.customerCombobox.click();
      await this.customerSearchbox.fill(customerName);
      await this.page.getByRole('option', { name: customerName }).click();
    });
  }

  /**
   * Clear selected customer
   */
  async clearCustomer(): Promise<void> {
    await test.step('Clear selected customer', async () => {
      await this.customerClearButton.click();
    });
  }

  /**
   * Get selected customer name
   */
  async getSelectedCustomer(): Promise<string> {
    return await test.step('Get selected customer', async () => {
      const text = await this.customerCombobox.textContent();

      return text?.trim() || '';
    });
  }

  /**
   * Select site from dropdown
   */
  async selectSite(siteName: string): Promise<void> {
    await test.step(`Select site: ${siteName}`, async () => {
      await this.siteCombobox.click();
      await this.siteSearchbox.fill(siteName);
      await this.page.getByRole('option', { name: siteName }).click();
    });
  }

  /**
   * Clear selected site
   */
  async clearSite(): Promise<void> {
    await test.step('Clear selected site', async () => {
      await this.siteClearButton.click();
    });
  }

  /**
   * Toggle Log Quote from Template checkbox
   */
  async setLogFromTemplate(enable: boolean): Promise<void> {
    await test.step(`Set Log from Template: ${enable}`, async () => {
      if (enable) {
        await this.logFromTemplateCheckbox.check();
      } else {
        await this.logFromTemplateCheckbox.uncheck();
      }
    });
  }

  /**
   * Toggle Log Quote from Recent Quote checkbox
   */
  async setLogFromRecentQuote(enable: boolean): Promise<void> {
    await test.step(`Set Log from Recent Quote: ${enable}`, async () => {
      if (enable) {
        await this.logFromRecentQuoteCheckbox.check();
      } else {
        await this.logFromRecentQuoteCheckbox.uncheck();
      }
    });
  }

  // ========================
  // Quote Details Section
  // ========================

  /**
   * Select Job Type from dropdown
   */
  async selectJobType(jobType: string): Promise<void> {
    await test.step(`Select Job Type: ${jobType}`, async () => {
      await this.jobTypeCombobox.click();
      await this.jobTypeSearchbox.fill(jobType);
      await this.page.getByRole('option', { name: jobType }).click();
    });
  }

  /**
   * Clear selected Job Type
   */
  async clearJobType(): Promise<void> {
    await test.step('Clear Job Type', async () => {
      await this.jobTypeClearButton.click();
    });
  }

  /**
   * Select Job Category from dropdown
   */
  async selectJobCategory(category: string): Promise<void> {
    await test.step(`Select Job Category: ${category}`, async () => {
      await this.jobCategoryCombobox.click();
      await this.jobCategorySearchbox.fill(category);
      await this.page.getByRole('option', { name: category }).click();
    });
  }

  /**
   * Fill Description (required)
   */
  async fillDescription(description: string): Promise<void> {
    await test.step(`Fill Description: ${description}`, async () => {
      await this.descriptionTextbox.fill(description);
    });
  }

  /**
   * Get Description value
   */
  async getDescription(): Promise<string> {
    return await test.step('Get Description', async () => {
      return await this.descriptionTextbox.inputValue();
    });
  }

  /**
   * Fill Title
   */
  async fillTitle(title: string): Promise<void> {
    await test.step(`Fill Title: ${title}`, async () => {
      await this.titleInput.fill(title);
    });
  }

  /**
   * Fill Quote Reference Number
   */
  async fillQuoteReferenceNumber(refNumber: string): Promise<void> {
    await test.step(`Fill Quote Reference Number: ${refNumber}`, async () => {
      await this.quoteReferenceNumberInput.fill(refNumber);
    });
  }

  /**
   * Select Source of Enquiry
   */
  async selectSourceOfEnquiry(source: string): Promise<void> {
    await test.step(`Select Source of Enquiry: ${source}`, async () => {
      await this.sourceOfEnquiryCombobox.click();
      await this.sourceOfEnquirySearchbox.fill(source);
      await this.page.getByRole('option', { name: source }).click();
    });
  }

  /**
   * Select Quote Trade
   */
  async selectQuoteTrade(trade: string): Promise<void> {
    await test.step(`Select Quote Trade: ${trade}`, async () => {
      await this.quoteTradeCombobox.click();
      await this.quoteTradeSearchbox.fill(trade);
      await this.page.getByRole('option', { name: trade }).click();
    });
  }

  /**
   * Select Priority Level
   */
  async selectPriorityLevel(priority: string): Promise<void> {
    await test.step(`Select Priority Level: ${priority}`, async () => {
      await this.priorityLevelCombobox.click();
      await this.priorityLevelSearchbox.fill(priority);
      await this.page.getByRole('option', { name: priority }).click();
    });
  }

  /**
   * Fill Quote Ref 1
   */
  async fillQuoteRef1(ref: string): Promise<void> {
    await test.step(`Fill Quote Ref 1: ${ref}`, async () => {
      await this.quoteRef1Input.fill(ref);
    });
  }

  /**
   * Select Quote Ref 2
   */
  async selectQuoteRef2(ref: string): Promise<void> {
    await test.step(`Select Quote Ref 2: ${ref}`, async () => {
      await this.quoteRef2Combobox.click();
      await this.quoteRef2Searchbox.fill(ref);
      await this.page.getByRole('option', { name: ref }).click();
    });
  }

  /**
   * Set Expiry Date
   */
  async setExpiryDate(date: string): Promise<void> {
    await test.step(`Set Expiry Date: ${date}`, async () => {
      await this.expiryDateInput.clear();
      await this.expiryDateInput.fill(date);
    });
  }

  /**
   * Select Quote Owner from dropdown
   */
  async selectQuoteOwner(owner: string): Promise<void> {
    await test.step(`Select Quote Owner: ${owner}`, async () => {
      await this.quoteOwnerCombobox.click();
      await this.quoteOwnerSearchbox.fill(owner);
      await this.page.getByRole('option', { name: owner }).click();
    });
  }

  /**
   * Get selected Quote Owner
   */
  async getSelectedQuoteOwner(): Promise<string> {
    return await test.step('Get selected Quote Owner', async () => {
      const text = await this.quoteOwnerCombobox.textContent();

      return text?.trim() || '';
    });
  }

  /**
   * Clear selected Quote Owner
   */
  async clearQuoteOwner(): Promise<void> {
    await test.step('Clear Quote Owner', async () => {
      await this.quoteOwnerClearButton.click();
    });
  }

  /**
   * Set Expected Sale Date
   */
  async setExpectedSaleDate(date: string): Promise<void> {
    await test.step(`Set Expected Sale Date: ${date}`, async () => {
      await this.expectedSaleDateInput.clear();
      await this.expectedSaleDateInput.fill(date);
    });
  }

  /**
   * Set Chance of Sale (0, 25, 50, 75, 100)
   */
  async setChanceOfSale(percentage: number): Promise<void> {
    await test.step(`Set Chance of Sale: ${percentage}%`, async () => {
      // The slider has 5 positions: 0%, 25%, 50%, 75%, 100%
      const slider = this.chanceOfSaleSlider;

      await slider.click();
      // Use keyboard to navigate to desired position
      const steps = percentage / 25;

      for (let i = 0; i < steps; i++) {
        await slider.press('ArrowRight');
      }
    });
  }

  // ========================
  // Contacts Section
  // ========================

  /**
   * Click Add Contact button
   */
  async clickAddContact(): Promise<void> {
    await test.step('Click Add Contact', async () => {
      await this.addContactButton.click();
    });
  }

  /**
   * Select contact by name in table
   */
  async selectContactByName(contactName: string): Promise<void> {
    await test.step(`Select contact: ${contactName}`, async () => {
      const row = this.contactsTable.locator(`tr:has-text("${contactName}")`);

      await row.click();
    });
  }

  /**
   * Check if contacts table is empty
   */
  async isContactsEmpty(): Promise<boolean> {
    return await test.step('Check if contacts empty', async () => {
      return await this.noContactsMessage.isVisible();
    });
  }

  // ========================
  // Recent Jobs/Quotes Section
  // ========================

  /**
   * Switch to Jobs tab
   */
  async switchToJobsTab(): Promise<void> {
    await test.step('Switch to Jobs tab', async () => {
      await this.jobsTab.click();
    });
  }

  /**
   * Switch to Quotes tab
   */
  async switchToQuotesTab(): Promise<void> {
    await test.step('Switch to Quotes tab', async () => {
      await this.quotesTab.click();
    });
  }

  /**
   * Click on recent job by job number
   */
  async clickRecentJob(jobNumber: string): Promise<void> {
    await test.step(`Click recent job: ${jobNumber}`, async () => {
      await this.recentTable.getByRole('link', { name: jobNumber }).click();
    });
  }

  /**
   * Click on recent quote by quote number
   */
  async clickRecentQuote(quoteNumber: string): Promise<void> {
    await test.step(`Click recent quote: ${quoteNumber}`, async () => {
      await this.recentTable.getByRole('link', { name: quoteNumber }).click();
    });
  }

  // ========================
  // Form Actions
  // ========================

  /**
   * Click Cancel button
   */
  async clickCancel(): Promise<void> {
    await test.step('Click Cancel', async () => {
      await this.cancelButton.click();
    });
  }

  /**
   * Click Save button
   */
  async clickSave(): Promise<void> {
    await test.step('Click Save', async () => {
      await this.saveButton.click();
    });
  }

  /**
   * Wait for navigation to Quote Details after save
   */
  async waitForQuoteDetailsNavigation(): Promise<string> {
    return await test.step('Wait for Quote Details navigation', async () => {
      await this.page.waitForURL(/\/Quote\/Detail\/\d+/);
      const url = this.page.url();
      const match = url.match(/\/Quote\/Detail\/(\d+)/);

      return match ? match[1] : '';
    });
  }

  /**
   * Fill minimal required fields and save
   */
  async createQuoteQuick(customerName: string, siteName: string, description: string): Promise<string> {
    return await test.step('Create quote quickly', async () => {
      await this.selectCustomer(customerName);
      await this.selectSite(siteName);
      await this.fillDescription(description);
      await this.clickSave();
      return await this.waitForQuoteDetailsNavigation();
    });
  }

  /**
   * Fill form with quote data
   */
  async fillQuoteForm(data: Partial<QuoteData>): Promise<void> {
    await test.step('Fill quote form', async () => {
      // Customer & Site
      if (data.customerName) await this.selectCustomer(data.customerName);
      if (data.siteName) await this.selectSite(data.siteName);
      if (data.logFromTemplate !== undefined) await this.setLogFromTemplate(data.logFromTemplate);
      if (data.logFromRecentQuote !== undefined) await this.setLogFromRecentQuote(data.logFromRecentQuote);

      // Quote Details
      if (data.jobType) await this.selectJobType(data.jobType);
      if (data.jobCategory) await this.selectJobCategory(data.jobCategory);
      if (data.description) await this.fillDescription(data.description);
      if (data.title) await this.fillTitle(data.title);
      if (data.quoteReferenceNumber) await this.fillQuoteReferenceNumber(data.quoteReferenceNumber);
      if (data.sourceOfEnquiry) await this.selectSourceOfEnquiry(data.sourceOfEnquiry);
      if (data.quoteTrade) await this.selectQuoteTrade(data.quoteTrade);
      if (data.priorityLevel) await this.selectPriorityLevel(data.priorityLevel);
      if (data.quoteRef1) await this.fillQuoteRef1(data.quoteRef1);
      if (data.quoteRef2) await this.selectQuoteRef2(data.quoteRef2);
      if (data.expiryDate) await this.setExpiryDate(data.expiryDate);
      if (data.quoteOwner) await this.selectQuoteOwner(data.quoteOwner);
      if (data.expectedSaleDate) await this.setExpectedSaleDate(data.expectedSaleDate);
      if (data.chanceOfSale !== undefined) await this.setChanceOfSale(data.chanceOfSale);

      // Contacts
      if (data.contactNames) {
        for (const contact of data.contactNames) {
          await this.selectContactByName(contact);
        }
      }
    });
  }

  // ========================
  // High-Level Actions
  // ========================

  /**
   * Create a new quote with data-driven approach
   * Fills all provided fields, saves, and returns Quote ID
   *
   * @param data - Quote data object (use QuoteBuilder from quote.data.ts)
   * @returns Quote ID after successful creation
   *
   * @example
   * import { QuoteBuilder } from '../../data/uiData/quote.data';
   *
   * // Navigate first
   * await quotePage.navigateToLogQuote();
   *
   * // Simple quote
   * const quoteId = await quotePage.createNewQuote(
   *   QuoteBuilder.create('ABC Corp', 'Main Office', 'HVAC Maintenance Quote').build()
   * );
   *
   * // Quote with more details
   * const quoteId = await quotePage.createNewQuote(
   *   QuoteBuilder.create('ABC Corp', 'Main Office', 'Annual Maintenance Quote')
   *     .jobType('Maintenance')
   *     .priorityLevel('High')
   *     .expiryDate('31/12/2026')
   *     .chanceOfSale(75)
   *     .quoteOwner('John Smith')
   *     .build()
   * );
   */
  async createNewQuote(data: QuoteData): Promise<string> {
    return await test.step(`Create new quote: ${data.description}`, async () => {
      // Fill all form fields using data
      await this.fillQuoteForm(data);

      // Save the quote
      await this.clickSave();

      // Wait for navigation and return Quote ID
      const quoteId = await this.waitForQuoteDetailsNavigation();

      return quoteId;
    });
  }

  /**
   * Fill quote form without saving (for validation tests)
   *
   * @param data - Quote data object
   */
  async fillNewQuoteForm(data: QuoteData): Promise<void> {
    await test.step(`Fill quote form: ${data.description}`, async () => {
      // Fill all form fields
      await this.fillQuoteForm(data);
    });
  }
}
