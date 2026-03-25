import { Locator, Page } from "@playwright/test";
import { test, expect } from '@playwright/test';
import { BasePage } from "../BasePage";

/**
 * Log Job form field definitions
 */
export const LOG_JOB_FIELDS = {
  // Customer & Site (required)
  'Customer': { type: 'combobox', required: true, section: 'Customer & Site' },
  'Site': { type: 'combobox', required: true, section: 'Customer & Site' },
  'Log Job from Recent Job': { type: 'checkbox', section: 'Customer & Site' },
  'Log Job from Template': { type: 'checkbox', section: 'Customer & Site' },

  // Job Details
  'Job Type': { type: 'combobox', required: true, section: 'Job Details' },
  'Job Category': { type: 'combobox', section: 'Job Details' },
  'Description': { type: 'textbox', required: true, section: 'Job Details' },
  'Tag(s)': { type: 'multiselect', section: 'Job Details' },
  'Primary Job Trade': { type: 'combobox', section: 'Job Details' },
  'Secondary Job Trade(s)': { type: 'multiselect', section: 'Job Details' },
  'Customer Order Number': { type: 'textbox', section: 'Job Details' },
  'Reference Number': { type: 'textbox', section: 'Job Details' },
  'Job Owner': { type: 'combobox', required: true, section: 'Job Details' },
  'Date Logged': { type: 'datetime', required: true, section: 'Job Details' },

  // Job KPIs
  'Priority Level': { type: 'combobox', section: 'Job KPIs' },
  'Completion Time from Date Logged': { type: 'checkbox', section: 'Job KPIs' },

  // Job Allocation
  'Preferred Appointment Date': { type: 'datetime', section: 'Job Allocation' },
  'Engineer': { type: 'combobox', section: 'Job Allocation' },
  'Engineer Team': { type: 'combobox', section: 'Job Allocation' },
  'Start Date': { type: 'datetime', section: 'Job Allocation' },
  'End Date': { type: 'datetime', section: 'Job Allocation' },
  'Appointment': { type: 'checkbox', section: 'Job Allocation' },
  'Lock Visit Date & Time': { type: 'checkbox', section: 'Job Allocation' },
  'Deploy to Mobile': { type: 'checkbox', section: 'Job Allocation' },

  // Recur Job
  'Recur Job': { type: 'checkbox', section: 'Recur Job' },

  // Contacts
  'Search Contacts': { type: 'textbox', section: 'Contacts' },
} as const;

/**
 * Job data interface for type-safe form filling
 */
export interface JobData {
  // Customer & Site (required)
  customerName: string;
  siteName: string;
  logFromRecentJob?: boolean;
  logFromTemplate?: boolean;

  // Job Details
  jobType?: string;
  jobCategory?: string;
  description: string;
  tags?: string[];
  primaryJobTrade?: string;
  secondaryJobTrades?: string[];
  customerOrderNumber?: string;
  referenceNumber?: string;
  jobOwner?: string;
  dateLogged?: string;

  // Job KPIs
  priorityLevel?: string;
  completionTimeFromDateLogged?: boolean;

  // Job Allocation
  preferredAppointmentDate?: string;
  engineer?: string;
  engineerTeam?: string;
  startDate?: string;
  endDate?: string;
  appointment?: boolean;
  lockVisitDateTime?: boolean;
  deployToMobile?: boolean;

  // Recur Job
  recurJob?: boolean;

  // Contacts
  contactNames?: string[];
}

/**
 * Section navigation items
 */
export type JobSection = 
  | 'Customer & Site'
  | 'Job Details'
  | 'Job KPIs'
  | 'Job Allocation'
  | 'Recur Job'
  | 'Contacts'
  | 'Recent Jobs/Quotes';

/**
 * JobPage - Page Object for Log Job page
 * URL: /Job/Create
 */
export class JobPage extends BasePage {
  // ========================
  // Locators - Page Header
  // ========================
  readonly pageTitle: Locator;

  // ========================
  // Locators - Section Navigation
  // ========================
  readonly customerSiteLink: Locator;
  readonly jobDetailsLink: Locator;
  readonly jobKpisLink: Locator;
  readonly jobAllocationLink: Locator;
  readonly recurJobLink: Locator;
  readonly contactsLink: Locator;
  readonly recentJobsQuotesLink: Locator;

  // ========================
  // Locators - Customer & Site Section
  // ========================
  readonly customerCombobox: Locator;
  readonly customerSearchbox: Locator;
  readonly customerClearButton: Locator;
  readonly siteCombobox: Locator;
  readonly siteSearchbox: Locator;
  readonly siteClearButton: Locator;
  readonly logFromRecentJobCheckbox: Locator;
  readonly logFromTemplateCheckbox: Locator;

  // ========================
  // Locators - Job Details Section
  // ========================
  readonly jobTypeCombobox: Locator;
  readonly jobTypeSearchbox: Locator;
  readonly jobTypeClearButton: Locator;
  readonly jobCategoryCombobox: Locator;
  readonly jobCategorySearchbox: Locator;
  readonly descriptionTextbox: Locator;
  readonly tagsDropdown: Locator;
  readonly primaryJobTradeCombobox: Locator;
  readonly primaryJobTradeSearchbox: Locator;
  readonly secondaryJobTradesDropdown: Locator;
  readonly customerOrderNumberInput: Locator;
  readonly referenceNumberInput: Locator;
  readonly jobOwnerCombobox: Locator;
  readonly jobOwnerSearchbox: Locator;
  readonly dateLoggedInput: Locator;
  readonly reqApprovalCheckbox: Locator;

  // ========================
  // Locators - Job KPIs Section
  // ========================
  readonly priorityLevelCombobox: Locator;
  readonly priorityLevelSearchbox: Locator;
  readonly completionFromDateLoggedCheckbox: Locator;
  readonly completionFromEngineerOnsiteCheckbox: Locator;

  // ========================
  // Locators - Job Allocation Section
  // ========================
  readonly preferredAppointmentDateInput: Locator;
  readonly engineerTab: Locator;
  readonly engineerTeamTab: Locator;
  readonly engineerCombobox: Locator;
  readonly engineerSearchbox: Locator;
  readonly startDateInput: Locator;
  readonly endDateInput: Locator;
  readonly appointmentCheckbox: Locator;
  readonly lockVisitDateTimeCheckbox: Locator;
  readonly deployToMobileCheckbox: Locator;

  // ========================
  // Locators - Recur Job Section
  // ========================
  readonly recurJobCheckbox: Locator;

  // ========================
  // Locators - Contacts Section
  // ========================
  readonly searchContactsInput: Locator;
  readonly addContactButton: Locator;
  readonly contactsTable: Locator;
  readonly selectedContactsCounter: Locator;
  readonly showSelectedContactsOnly: Locator;

  // ========================
  // Locators - Recent Jobs/Quotes Section
  // ========================
  readonly loggedWithinDropdown: Locator;
  readonly jobsTab: Locator;
  readonly quotesTab: Locator;
  readonly recentJobsTable: Locator;

  // ========================
  // Locators - Footer Buttons
  // ========================
  readonly cancelButton: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);

    // Page Header
    this.pageTitle = page.locator('h3').filter({ hasText: 'Log Job' });

    // Section Navigation
    this.customerSiteLink = page.getByRole('link', { name: 'Customer & Site' });
    this.jobDetailsLink = page.getByRole('link', { name: 'Job Details' });
    this.jobKpisLink = page.getByRole('link', { name: 'Job KPIs' });
    this.jobAllocationLink = page.getByRole('link', { name: 'Job Allocation' });
    this.recurJobLink = page.getByRole('link', { name: 'Recur Job' });
    this.contactsLink = page.getByRole('link', { name: 'Contacts' });
    this.recentJobsQuotesLink = page.getByRole('link', { name: 'Recent Jobs/Quotes' });

    // Customer & Site Section
    this.customerCombobox = page.locator('#jlCustomerJob_Id__combobox');
    this.customerSearchbox = page.locator('#jlCustomerJob_Id__combobox').locator('input[role="searchbox"]');
    this.customerClearButton = page.locator('#jlCustomerJob_Id__combobox').getByRole('button', { name: 'Clear Selected' });
    this.siteCombobox = page.locator('#jlSiteJob_Id__combobox');
    this.siteSearchbox = page.locator('#jlSiteJob_Id__combobox').locator('input[role="searchbox"]');
    this.siteClearButton = page.locator('#jlSiteJob_Id__combobox').getByRole('button', { name: 'Clear Selected' });
    this.logFromRecentJobCheckbox = page.getByText('Log Job from Recent Job').locator('..').locator('input[type="checkbox"]');
    this.logFromTemplateCheckbox = page.getByText('Log Job from Template').locator('..').locator('input[type="checkbox"]');

    // Job Details Section
    this.jobTypeCombobox = page.locator('text=Job Type *').locator('..').locator('[role="combobox"]');
    this.jobTypeSearchbox = page.locator('text=Job Type *').locator('..').locator('input[role="searchbox"]');
    this.jobTypeClearButton = page.locator('text=Job Type *').locator('..').getByRole('button', { name: 'Clear Selected' });
    this.jobCategoryCombobox = page.locator('text=Job Category').locator('..').locator('[role="combobox"]');
    this.jobCategorySearchbox = page.locator('text=Job Category').locator('..').locator('input[role="searchbox"]');
    this.descriptionTextbox = page.locator('#logjob_Description');
    this.tagsDropdown = page.locator('text=Tag(s)').locator('..').locator('[class*="multiselect"]');
    this.primaryJobTradeCombobox = page.locator('text=Primary Job Trade').locator('..').locator('[role="combobox"]');
    this.primaryJobTradeSearchbox = page.locator('text=Primary Job Trade').locator('..').locator('input[role="searchbox"]');
    this.secondaryJobTradesDropdown = page.locator('text=Secondary Job Trade(s)').locator('..').locator('[class*="multiselect"]');
    this.customerOrderNumberInput = page.locator('text=Customer Order Number').locator('..').locator('input[type="text"]');
    this.referenceNumberInput = page.locator('text=Reference Number').locator('..').locator('input[type="text"]');
    this.jobOwnerCombobox = page.locator('text=Job Owner *').locator('..').locator('[role="combobox"]');
    this.jobOwnerSearchbox = page.locator('text=Job Owner *').locator('..').locator('input[role="searchbox"]');
    this.dateLoggedInput = page.locator('text=Date Logged *').locator('..').locator('input[type="text"]');
    this.reqApprovalCheckbox = page.getByText('Req. Approval');

    // Job KPIs Section
    this.priorityLevelCombobox = page.locator('text=Priority Level').locator('..').locator('[role="combobox"]');
    this.priorityLevelSearchbox = page.locator('text=Priority Level').locator('..').locator('input[role="searchbox"]');
    this.completionFromDateLoggedCheckbox = page.getByText('Completion Time from Date Logged');
    this.completionFromEngineerOnsiteCheckbox = page.getByText('Completion Time from Engineer Onsite');

    // Job Allocation Section
    this.preferredAppointmentDateInput = page.locator('text=Preferred Appointment Date').locator('..').locator('input[type="text"]');
    this.engineerTab = page.getByText('Engineer').first();
    this.engineerTeamTab = page.getByText('Engineer Team');
    this.engineerCombobox = page.locator('h4:has-text("Job Allocation")').locator('..').locator('[role="combobox"]').first();
    this.engineerSearchbox = page.locator('h4:has-text("Job Allocation")').locator('..').locator('input[role="searchbox"]').first();
    this.startDateInput = page.getByPlaceholder('DD/MM/YYYY hh:mm A').filter({ hasText: '' }).nth(1);
    this.endDateInput = page.getByPlaceholder('DD/MM/YYYY hh:mm A').filter({ hasText: '' }).nth(2);
    this.appointmentCheckbox = page.getByText('Appointment').locator('..').locator('img');
    this.lockVisitDateTimeCheckbox = page.getByText('Lock Visit Date & Time');
    this.deployToMobileCheckbox = page.getByText('Deploy to Mobile');

    // Recur Job Section
    this.recurJobCheckbox = page.locator('h4:has-text("Recur Job")').locator('..').locator('input[type="checkbox"]');

    // Contacts Section
    this.searchContactsInput = page.getByPlaceholder('Search Contacts');
    this.addContactButton = page.getByRole('button', { name: 'Add Contact' });
    this.contactsTable = page.locator('h4:has-text("Contacts")').locator('..').locator('table');
    this.selectedContactsCounter = page.locator('text*=of').filter({ hasText: 'contact(s) selected' });
    this.showSelectedContactsOnly = page.getByText('Show Selected Contact(s) Only');

    // Recent Jobs/Quotes Section
    this.loggedWithinDropdown = page.locator('text=Logged Within Last / Next').locator('..').locator('[role="combobox"]');
    this.jobsTab = page.locator('text*=Jobs (');
    this.quotesTab = page.locator('text*=Quotes (');
    this.recentJobsTable = page.locator('h4:has-text("Recent Jobs/Quotes")').locator('..').locator('table');

    // Footer Buttons
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  // ========================
  // Navigation
  // ========================

  /**
   * Navigate to Log Job page
   */
  async navigateToLogJob(): Promise<void> {
    await test.step('Navigate to Log Job page', async () => {
      await this.page.goto('/Job/Create');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Log Job page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
      await expect(this.customerCombobox).toBeVisible();
      await expect(this.saveButton).toBeVisible();
    });
  }

  /**
   * Navigate to a specific section
   */
  async navigateToSection(section: JobSection): Promise<void> {
    await test.step(`Navigate to section: ${section}`, async () => {
      const sectionLinks: Record<JobSection, Locator> = {
        'Customer & Site': this.customerSiteLink,
        'Job Details': this.jobDetailsLink,
        'Job KPIs': this.jobKpisLink,
        'Job Allocation': this.jobAllocationLink,
        'Recur Job': this.recurJobLink,
        'Contacts': this.contactsLink,
        'Recent Jobs/Quotes': this.recentJobsQuotesLink,
      };
      await sectionLinks[section].click();
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
   * Toggle Log Job from Recent Job checkbox
   */
  async setLogFromRecentJob(enable: boolean): Promise<void> {
    await test.step(`Set Log from Recent Job: ${enable}`, async () => {
      if (enable) {
        await this.logFromRecentJobCheckbox.check();
      } else {
        await this.logFromRecentJobCheckbox.uncheck();
      }
    });
  }

  /**
   * Toggle Log Job from Template checkbox
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

  // ========================
  // Job Details Section
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
   * Select first Job Type from dropdown
   */
  async selectFirstJobType(): Promise<void> {
    await test.step('Select first Job Type', async () => {
      await this.jobTypeCombobox.click();
      await this.page.waitForTimeout(500);
      await this.page.getByRole('option').first().click();
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
   * Select Primary Job Trade
   */
  async selectPrimaryJobTrade(trade: string): Promise<void> {
    await test.step(`Select Primary Job Trade: ${trade}`, async () => {
      await this.primaryJobTradeCombobox.click();
      await this.primaryJobTradeSearchbox.fill(trade);
      await this.page.getByRole('option', { name: trade }).click();
    });
  }

  /**
   * Fill Customer Order Number
   */
  async fillCustomerOrderNumber(orderNumber: string): Promise<void> {
    await test.step(`Fill Customer Order Number: ${orderNumber}`, async () => {
      await this.customerOrderNumberInput.fill(orderNumber);
    });
  }

  /**
   * Fill Reference Number
   */
  async fillReferenceNumber(referenceNumber: string): Promise<void> {
    await test.step(`Fill Reference Number: ${referenceNumber}`, async () => {
      await this.referenceNumberInput.fill(referenceNumber);
    });
  }

  /**
   * Select Job Owner from dropdown
   */
  async selectJobOwner(jobOwner: string): Promise<void> {
    await test.step(`Select Job Owner: ${jobOwner}`, async () => {
      await this.jobOwnerCombobox.click();
      await this.jobOwnerSearchbox.fill(jobOwner);
      await this.page.getByRole('option', { name: jobOwner }).click();
    });
  }

  /**
   * Get selected Job Owner
   */
  async getSelectedJobOwner(): Promise<string> {
    return await test.step('Get selected Job Owner', async () => {
      const text = await this.jobOwnerCombobox.textContent();
      return text?.trim() || '';
    });
  }

  /**
   * Set Date Logged
   */
  async setDateLogged(dateTime: string): Promise<void> {
    await test.step(`Set Date Logged: ${dateTime}`, async () => {
      await this.dateLoggedInput.clear();
      await this.dateLoggedInput.fill(dateTime);
    });
  }

  /**
   * Toggle Req. Approval checkbox
   */
  async toggleReqApproval(): Promise<void> {
    await test.step('Toggle Req. Approval', async () => {
      await this.reqApprovalCheckbox.click();
    });
  }

  // ========================
  // Job KPIs Section
  // ========================

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
   * Select completion time source
   */
  async selectCompletionTimeFrom(source: 'Date Logged' | 'Engineer Onsite'): Promise<void> {
    await test.step(`Select Completion Time from: ${source}`, async () => {
      if (source === 'Date Logged') {
        await this.completionFromDateLoggedCheckbox.click();
      } else {
        await this.completionFromEngineerOnsiteCheckbox.click();
      }
    });
  }

  // ========================
  // Job Allocation Section
  // ========================

  /**
   * Set Preferred Appointment Date
   */
  async setPreferredAppointmentDate(dateTime: string): Promise<void> {
    await test.step(`Set Preferred Appointment Date: ${dateTime}`, async () => {
      await this.preferredAppointmentDateInput.clear();
      await this.preferredAppointmentDateInput.fill(dateTime);
    });
  }

  /**
   * Select Engineer tab
   */
  async selectEngineerTab(): Promise<void> {
    await test.step('Select Engineer tab', async () => {
      await this.engineerTab.click();
    });
  }

  /**
   * Select Engineer Team tab
   */
  async selectEngineerTeamTab(): Promise<void> {
    await test.step('Select Engineer Team tab', async () => {
      await this.engineerTeamTab.click();
    });
  }

  /**
   * Select Engineer
   */
  async selectEngineer(engineer: string): Promise<void> {
    await test.step(`Select Engineer: ${engineer}`, async () => {
      await this.selectEngineerTab();
      await this.engineerCombobox.click();
      await this.engineerSearchbox.fill(engineer);
      await this.page.getByRole('option', { name: engineer }).click();
    });
  }

  /**
   * Set Start Date
   */
  async setStartDate(dateTime: string): Promise<void> {
    await test.step(`Set Start Date: ${dateTime}`, async () => {
      await this.startDateInput.clear();
      await this.startDateInput.fill(dateTime);
    });
  }

  /**
   * Set End Date
   */
  async setEndDate(dateTime: string): Promise<void> {
    await test.step(`Set End Date: ${dateTime}`, async () => {
      await this.endDateInput.clear();
      await this.endDateInput.fill(dateTime);
    });
  }

  /**
   * Toggle Appointment checkbox
   */
  async toggleAppointment(): Promise<void> {
    await test.step('Toggle Appointment', async () => {
      await this.appointmentCheckbox.click();
    });
  }

  /**
   * Toggle Lock Visit Date & Time checkbox
   */
  async toggleLockVisitDateTime(): Promise<void> {
    await test.step('Toggle Lock Visit Date & Time', async () => {
      await this.lockVisitDateTimeCheckbox.click();
    });
  }

  /**
   * Toggle Deploy to Mobile checkbox
   */
  async toggleDeployToMobile(): Promise<void> {
    await test.step('Toggle Deploy to Mobile', async () => {
      await this.deployToMobileCheckbox.click();
    });
  }

  // ========================
  // Recur Job Section
  // ========================

  /**
   * Toggle Recur Job checkbox
   */
  async setRecurJob(enable: boolean): Promise<void> {
    await test.step(`Set Recur Job: ${enable}`, async () => {
      if (enable) {
        await this.recurJobCheckbox.check();
      } else {
        await this.recurJobCheckbox.uncheck();
      }
    });
  }

  // ========================
  // Contacts Section
  // ========================

  /**
   * Search for contact
   */
  async searchContact(contactName: string): Promise<void> {
    await test.step(`Search contact: ${contactName}`, async () => {
      await this.searchContactsInput.fill(contactName);
    });
  }

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
   * Select first contact in table
   */
  async selectFirstContact(): Promise<void> {
    await test.step('Select first contact', async () => {
      const firstRow = this.contactsTable.locator('tbody tr').first();
      await firstRow.click();
    });
  }

  /**
   * Get selected contacts count
   */
  async getSelectedContactsCount(): Promise<number> {
    return await test.step('Get selected contacts count', async () => {
      const text = await this.selectedContactsCounter.textContent();
      const match = text?.match(/(\d+) of/);
      return match ? parseInt(match[1]) : 0;
    });
  }

  /**
   * Toggle Show Selected Contacts Only
   */
  async toggleShowSelectedContactsOnly(): Promise<void> {
    await test.step('Toggle Show Selected Contacts Only', async () => {
      await this.showSelectedContactsOnly.click();
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
      await this.recentJobsTable.getByRole('link', { name: jobNumber }).click();
    });
  }

  /**
   * Get recent jobs count
   */
  async getRecentJobsCount(): Promise<number> {
    return await test.step('Get recent jobs count', async () => {
      const text = await this.jobsTab.textContent();
      const match = text?.match(/Jobs \((\d+)\)/);
      return match ? parseInt(match[1]) : 0;
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
   * Wait for navigation to Job Details after save
   */
  async waitForJobDetailsNavigation(): Promise<string> {
    return await test.step('Wait for Job Details navigation', async () => {
      await this.page.waitForURL(/\/Job\/Detail\/\d+/);
      const url = this.page.url();
      const match = url.match(/\/Job\/Detail\/(\d+)/);
      return match ? match[1] : '';
    });
  }

  /**
   * Fill minimal required fields and save
   */
  async createJobQuick(customerName: string, siteName: string, description: string): Promise<string> {
    return await test.step('Create job quickly', async () => {
      await this.selectCustomer(customerName);
      await this.selectSite(siteName);
      await this.fillDescription(description);
      await this.clickSave();
      return await this.waitForJobDetailsNavigation();
    });
  }

  /**
   * Fill form with job data
   */
  async fillJobForm(data: Partial<JobData>): Promise<void> {
    await test.step('Fill job form', async () => {
      // Customer & Site
      if (data.customerName) await this.selectCustomer(data.customerName);
      if (data.siteName) await this.selectSite(data.siteName);
      if (data.logFromRecentJob !== undefined) await this.setLogFromRecentJob(data.logFromRecentJob);
      if (data.logFromTemplate !== undefined) await this.setLogFromTemplate(data.logFromTemplate);

      // Job Details
      if (data.jobType) await this.selectJobType(data.jobType);
      if (data.jobCategory) await this.selectJobCategory(data.jobCategory);
      if (data.description) await this.fillDescription(data.description);
      if (data.primaryJobTrade) await this.selectPrimaryJobTrade(data.primaryJobTrade);
      if (data.customerOrderNumber) await this.fillCustomerOrderNumber(data.customerOrderNumber);
      if (data.referenceNumber) await this.fillReferenceNumber(data.referenceNumber);
      if (data.jobOwner) await this.selectJobOwner(data.jobOwner);
      if (data.dateLogged) await this.setDateLogged(data.dateLogged);

      // Job KPIs
      if (data.priorityLevel) await this.selectPriorityLevel(data.priorityLevel);

      // Job Allocation
      if (data.preferredAppointmentDate) await this.setPreferredAppointmentDate(data.preferredAppointmentDate);
      if (data.engineer) await this.selectEngineer(data.engineer);
      if (data.startDate) await this.setStartDate(data.startDate);
      if (data.endDate) await this.setEndDate(data.endDate);

      // Recur Job
      if (data.recurJob !== undefined) await this.setRecurJob(data.recurJob);

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
   * Create a new job with complete data-driven approach
   * Navigates to Log Job, fills all provided fields, saves, and returns Job ID
   * 
   * @param data - Job data object (use createJobData from job.data.ts for defaults)
   * @returns Job ID after successful creation
   * 
   * @example
   * // Using data factory from job.data.ts
   * import { JOB_TEST_DATA, createJobData } from '../../data/testData/job.data';
   * 
   * // Minimal job
   * const jobId = await jobPage.createNewJob(JOB_TEST_DATA.minimal('Customer A', 'Site A'));
   * 
   * // Reactive job with defaults
   * const jobId = await jobPage.createNewJob(JOB_TEST_DATA.reactive('Customer A', 'Site A'));
   * 
   * // Custom job with specific fields
   * const jobId = await jobPage.createNewJob(createJobData(
   *   { customerName: 'Customer A', siteName: 'Site A', description: 'Test Job' },
   *   { jobType: 'Reactive', priorityLevel: 'Urgent', engineer: 'John Doe' }
   * ));
   */
  async createNewJob(data: JobData): Promise<string> {
    return await test.step(`Create new job for customer: ${data.customerName}`, async () => {
      // Fill all form fields using data
      await this.fillJobForm(data);

      // Save the job
      await this.clickSave();

      // Wait for navigation and return Job ID
      const jobId = await this.waitForJobDetailsNavigation();
      return jobId;
    });
  }

  /**
   * Create a new job without navigation (assumes already on Log Job page)
   * Use this when you're already on the Log Job page
   * 
   * @param data - Job data object
   * @returns Job ID after successful creation
   */
  async createNewJobFromCurrentPage(data: JobData): Promise<string> {
    return await test.step(`Create new job from current page for customer: ${data.customerName}`, async () => {
      // Fill all form fields
      await this.fillJobForm(data);

      // Save the job
      await this.clickSave();

      // Wait for navigation and return Job ID
      const jobId = await this.waitForJobDetailsNavigation();
      return jobId;
    });
  }

  /**
   * Fill job form and verify before saving (for validation tests)
   * Does not save - allows for additional verification
   * 
   * @param data - Job data object
   */
  async fillNewJobForm(data: JobData): Promise<void> {
    await test.step(`Fill job form for customer: ${data.customerName}`, async () => {

      // Fill all form fields
      await this.fillJobForm(data);
    });
  }
}
