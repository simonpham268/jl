import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Job Details tabs
 */
export type JobDetailTab =
  | 'Details'
  | 'Contacts'
  | 'Assets'
  | 'Tasks'
  | 'Costs'
  | 'Visits'
  | 'Subcontractor'
  | 'SOR Items'
  | 'History'
  | 'Info'
  | 'Refcom Audit'
  | 'Job Forms';

/**
 * Job status values
 */
export type JobStatus =
  | 'New Job'
  | 'In Progress'
  | 'On Hold'
  | 'Completed'
  | 'Cancelled'
  | 'Awaiting Parts'
  | 'Requires Revisit';

/**
 * Job summary information
 */
export interface JobSummaryInfo {
  jobNumber: string;
  status: JobStatus | string;
  customer: string;
  site: string;
  description?: string;
  jobType?: string;
  jobCategory?: string;
  dateLogged?: string;
  dateCompleted?: string;
  jobOwner?: string;
}

/**
 * JobDetailsPage - Page Object for Job Details page
 * URL: /Job/Detail/{id}
 */
export class JobDetailsPage extends BasePage {
  // ========================
  // Locators - Header
  // ========================
  readonly pageTitle: Locator;
  readonly jobNumberText: Locator;
  readonly jobStatusBadge: Locator;
  readonly jobsBackLink: Locator;

  // ========================
  // Locators - Header Actions
  // ========================
  readonly completeJobButton: Locator;
  readonly logRelatedWorkButton: Locator;
  readonly logRelatedWorkDropdown: Locator;
  readonly addInvoiceButton: Locator;
  readonly shareButton: Locator;
  readonly shareDropdown: Locator;
  readonly moreOptionsButton: Locator;

  // ========================
  // Locators - Tabs
  // ========================
  readonly detailsTab: Locator;
  readonly contactsTab: Locator;
  readonly assetsTab: Locator;
  readonly tasksTab: Locator;
  readonly costsTab: Locator;
  readonly visitsTab: Locator;
  readonly subcontractorTab: Locator;
  readonly sorItemsTab: Locator;
  readonly historyTab: Locator;
  readonly infoTab: Locator;
  readonly refcomAuditTab: Locator;
  readonly jobFormsTab: Locator;

  // ========================
  // Locators - Job Summary Section
  // ========================
  readonly jobSummaryHeading: Locator;
  readonly customerLink: Locator;
  readonly siteLink: Locator;
  readonly profitabilitySection: Locator;
  readonly actualProfitToDate: Locator;

  // ========================
  // Locators - Details Section
  // ========================
  readonly detailsHeading: Locator;
  readonly editButton: Locator;
  readonly undoButton: Locator;
  readonly saveButton: Locator;

  // ========================
  // Locators - Job Details Fields
  // ========================
  readonly statusCombobox: Locator;
  readonly jobTypeCombobox: Locator;
  readonly jobCategoryCombobox: Locator;
  readonly descriptionTextbox: Locator;
  readonly jobNumberField: Locator;
  readonly loggedByField: Locator;
  readonly tagsDropdown: Locator;
  readonly dateLoggedInput: Locator;
  readonly dateCompleteInput: Locator;
  readonly recurJobCheckbox: Locator;

  // ========================
  // Locators - Additional Job Details
  // ========================
  readonly primaryJobTradeCombobox: Locator;
  readonly secondaryJobTradesDropdown: Locator;
  readonly preferredAppointmentDateInput: Locator;
  readonly customerOrderNumberInput: Locator;
  readonly referenceNumberInput: Locator;
  readonly jobOwnerCombobox: Locator;
  readonly nextContactDateInput: Locator;
  readonly reqApprovalCheckbox: Locator;

  // ========================
  // Locators - Job KPIs Section
  // ========================
  readonly jobKpisHeading: Locator;
  readonly priorityLevelCombobox: Locator;
  readonly completionFromDateLoggedCheckbox: Locator;
  readonly completionFromEngineerOnsiteCheckbox: Locator;
  readonly targetCompletionDateInput: Locator;

  // ========================
  // Locators - Fault Code Section
  // ========================
  readonly faultCodeHeading: Locator;
  readonly noFaultCodeMessage: Locator;

  // ========================
  // Locators - AI Summarise
  // ========================
  readonly summariseButton: Locator;
  readonly regenerateButton: Locator;

  constructor(page: Page) {
    super(page);

    // Header
    this.pageTitle = page.locator('h3').first();
    this.jobNumberText = page.locator('h3').locator('text=/M\\d+/');
    this.jobStatusBadge = page.locator('h3').locator('[class*="badge"], [class*="status"]');
    this.jobsBackLink = page.getByRole('link', { name: 'Jobs' });

    // Header Actions
    this.completeJobButton = page.locator('#completeJob');
    this.logRelatedWorkButton = page.getByRole('button', { name: 'Log Related Work' });
    this.logRelatedWorkDropdown = page.locator('button:has-text("Log Related Work")').locator('..').locator('button').last();
    this.addInvoiceButton = page.getByText('Add Invoice');
    this.shareButton = page.getByRole('button', { name: 'Share' });
    this.shareDropdown = page.locator('button:has-text("Share")').locator('..').locator('button').last();
    this.moreOptionsButton = page.locator('[class*="more-options"], [class*="dropdown"]').last();

    // Tabs
    this.detailsTab = page.getByRole('link', { name: ' Details' });
    this.contactsTab = page.getByRole('link', { name: ' Contacts' });
    this.assetsTab = page.getByRole('link', { name: ' Assets' });
    this.tasksTab = page.getByRole('link', { name: ' Tasks' });
    this.costsTab = page.getByRole('link', { name: ' Costs' });
    this.visitsTab = page.getByRole('link', { name: ' Visits' });
    this.subcontractorTab = page.getByRole('link', { name: ' Subcontractor' });
    this.sorItemsTab = page.getByRole('link', { name: ' SOR Items' });
    this.historyTab = page.getByRole('button', { name: ' History' });
    this.infoTab = page.getByRole('button', { name: ' Info' });
    this.refcomAuditTab = page.getByRole('link', { name: ' Refcom Audit' });
    this.jobFormsTab = page.getByRole('link', { name: ' Job Forms' });

    // Job Summary Section
    this.jobSummaryHeading = page.locator('h4:has-text("Job Summary")');
    this.customerLink = page.locator('#customerNameLink');
    this.siteLink = page.locator('text=Site').locator('..').getByRole('link');
    this.profitabilitySection = page.locator('h3:has-text("Profitability")');
    this.actualProfitToDate = page.locator('text*=Actual Profit to Date');

    // Details Section
    this.detailsHeading = page.locator('h4:has-text("Details")');
    this.editButton = page.getByRole('button', { name: 'Edit' });
    this.undoButton = page.getByRole('button', { name: 'Undo' });
    this.saveButton = page.getByRole('button', { name: 'Save' });

    // Job Details Fields
    this.statusCombobox = page.locator('text=Status').locator('..').locator('[role="combobox"]');
    this.jobTypeCombobox = page.locator('text=Job Type *').locator('..').locator('[role="combobox"]');
    this.jobCategoryCombobox = page.locator('text=Job Category').locator('..').locator('[role="combobox"]');
    this.descriptionTextbox = page.locator('text=Description*').locator('..').locator('input[type="text"], textarea');
    this.jobNumberField = page.locator('text=Job Number').locator('..');
    this.loggedByField = page.locator('text=Logged By').locator('..');
    this.tagsDropdown = page.locator('text=Tag(s)').locator('..').locator('[class*="multiselect"]');
    this.dateLoggedInput = page.locator('text=Date Logged *').locator('..').locator('input[type="text"]');
    this.dateCompleteInput = page.locator('text=Date Complete').locator('..').locator('input[type="text"]');
    this.recurJobCheckbox = page.getByText('Recur Job');

    // Additional Job Details
    this.primaryJobTradeCombobox = page.locator('text=Primary Job Trade').locator('..').locator('[role="combobox"]');
    this.secondaryJobTradesDropdown = page.locator('text=Secondary Job Trade(s)').locator('..').locator('[class*="multiselect"]');
    this.preferredAppointmentDateInput = page.locator('text=Preferred Appointment Date').locator('..').locator('input');
    this.customerOrderNumberInput = page.locator('text=Customer Order Number').locator('..').locator('input');
    this.referenceNumberInput = page.locator('text=Reference Number').locator('..').locator('input');
    this.jobOwnerCombobox = page.locator('text=Job Owner *').locator('..').locator('[role="combobox"]');
    this.nextContactDateInput = page.locator('text=Next Contact Date').locator('..').locator('input');
    this.reqApprovalCheckbox = page.getByText('Req. Approval');

    // Job KPIs Section
    this.jobKpisHeading = page.locator('h4:has-text("Job KPIs")');
    this.priorityLevelCombobox = page.locator('text=Priority Level').locator('..').locator('[role="combobox"]');
    this.completionFromDateLoggedCheckbox = page.getByText('Completion Time from Date Logged');
    this.completionFromEngineerOnsiteCheckbox = page.getByText('Completion Time from Engineer Onsite');
    this.targetCompletionDateInput = page.locator('text=Target Completion Date').locator('..').locator('input');

    // Fault Code Section
    this.faultCodeHeading = page.locator('h4:has-text("Fault Code")');
    this.noFaultCodeMessage = page.locator('text*=No fault code library is assigned');

    // AI Summarise
    this.summariseButton = page.getByRole('button', { name: 'Summarise' });
    this.regenerateButton = page.getByRole('button', { name: 'Regenerate' });
  }

  // ========================
  // Navigation
  // ========================

  /**
   * Navigate to Job Details page by ID
   */
  async navigateToJob(redirectUrl: string): Promise<void> {
    await test.step(`Navigate to Job ${redirectUrl}`, async () => {
      await this.page.goto(redirectUrl);
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Job Details page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
      await expect(this.detailsTab).toBeVisible();
      await expect(this.jobSummaryHeading).toBeVisible();
    });
  }

  /**
   * Navigate back to Jobs list
   */
  async navigateBackToJobs(): Promise<void> {
    await test.step('Navigate back to Jobs list', async () => {
      await this.jobsBackLink.click();
    });
  }

  // ========================
  // Tab Navigation
  // ========================

  /**
   * Switch to a specific tab
   */
  async switchToTab(tab: JobDetailTab): Promise<void> {
    await test.step(`Switch to ${tab} tab`, async () => {
      const tabMap: Record<JobDetailTab, Locator> = {
        'Details': this.detailsTab,
        'Contacts': this.contactsTab,
        'Assets': this.assetsTab,
        'Tasks': this.tasksTab,
        'Costs': this.costsTab,
        'Visits': this.visitsTab,
        'Subcontractor': this.subcontractorTab,
        'SOR Items': this.sorItemsTab,
        'History': this.historyTab,
        'Info': this.infoTab,
        'Refcom Audit': this.refcomAuditTab,
        'Job Forms': this.jobFormsTab,
      };

      await tabMap[tab].click();
    });
  }

  /**
   * Get active tab name
   */
  async getActiveTab(): Promise<string> {
    return await test.step('Get active tab', async () => {
      const activeTab = this.page.locator('[aria-selected="true"], [class*="active"]').first();

      return await activeTab.textContent() || '';
    });
  }

  // ========================
  // Header Actions
  // ========================

  /**
   * Click Complete Job button
   */
  async clickCompleteJob(): Promise<void> {
    await test.step('Click Complete Job', async () => {
      await this.completeJobButton.click();
    });
  }

  /**
   * Confirm complete job action in dialog
   */
  async confirmCompleteJob(): Promise<void> {
    await test.step('Confirm Complete Job', async () => {
      await this.page.getByRole('button', { name: 'Complete' }).click();
    });
  }

  /**
   * Click Log Related Work button
   */
  async clickLogRelatedWork(): Promise<void> {
    await test.step('Click Log Related Work', async () => {
      await this.logRelatedWorkButton.click();
    });
  }

  /**
   * Click Add Invoice button
   */
  async clickAddInvoice(): Promise<void> {
    await test.step('Click Add Invoice', async () => {
      await this.addInvoiceButton.click();
    });
  }

  /**
   * Click Share button
   */
  async clickShare(): Promise<void> {
    await test.step('Click Share', async () => {
      await this.shareButton.click();
    });
  }

  // ========================
  // Job Summary
  // ========================

  /**
   * Get job number from page
   */
  async getJobNumber(): Promise<string> {
    return await test.step('Get job number', async () => {
      const titleText = await this.pageTitle.textContent() || '';
      const match = titleText.match(/M\d+/);

      return match ? match[0] : '';
    });
  }

  /**
   * Get job status from page
   */
  async getJobStatus(): Promise<string> {
    return await test.step('Get job status', async () => {
      const titleText = await this.pageTitle.textContent() || '';
      // Status is usually after the job number
      const parts = titleText.split('/');

      if (parts.length > 1) {
        const afterJobNumber = parts[1].trim();
        const statusMatch = afterJobNumber.match(/M\d+\s+(.+)/);

        return statusMatch ? statusMatch[1].trim() : '';
      }
      return '';
    });
  }

  /**
   * Get customer name
   */
  async getCustomerName(): Promise<string> {
    return await test.step('Get customer name', async () => {
      return await this.customerLink.textContent() || '';
    });
  }

  /**
   * Get site name
   */
  async getSiteName(): Promise<string> {
    return await test.step('Get site name', async () => {
      return await this.siteLink.textContent() || '';
    });
  }

  /**
   * Click customer link to navigate
   */
  async clickCustomerLink(): Promise<void> {
    await test.step('Click customer link', async () => {
      await this.customerLink.click();
    });
  }

  /**
   * Click site link to navigate
   */
  async clickSiteLink(): Promise<void> {
    await test.step('Click site link', async () => {
      await this.siteLink.click();
    });
  }

  /**
   * Get job summary information
   */
  async getJobSummary(): Promise<JobSummaryInfo> {
    return await test.step('Get job summary', async () => {
      const [jobNumber, status, customer, site] = await Promise.all([
        this.getJobNumber(),
        this.getJobStatus(),
        this.getCustomerName(),
        this.getSiteName(),
      ]);

      return { jobNumber, status, customer, site };
    });
  }

  // ========================
  // Details Section - Edit Mode
  // ========================

  /**
   * Click Edit button to enable editing
   */
  async clickEdit(): Promise<void> {
    await test.step('Click Edit', async () => {
      await this.editButton.click();
    });
  }

  /**
   * Click Undo button to cancel changes
   */
  async clickUndo(): Promise<void> {
    await test.step('Click Undo', async () => {
      await this.undoButton.click();
    });
  }

  /**
   * Click Save button to save changes
   */
  async clickSave(): Promise<void> {
    await test.step('Click Save', async () => {
      await this.saveButton.click();
    });
  }

  /**
   * Check if in edit mode
   */
  async isInEditMode(): Promise<boolean> {
    return await test.step('Check if in edit mode', async () => {
      return await this.undoButton.isVisible();
    });
  }

  // ========================
  // Job Details Fields - Read
  // ========================

  /**
   * Get Description value
   */
  async getDescription(): Promise<string> {
    return await test.step('Get Description', async () => {
      return await this.descriptionTextbox.inputValue();
    });
  }

  /**
   * Get Job Number field value
   */
  async getJobNumberFieldValue(): Promise<string> {
    return await test.step('Get Job Number field', async () => {
      const text = await this.jobNumberField.textContent() || '';
      const match = text.match(/M\d+/);

      return match ? match[0] : '';
    });
  }

  /**
   * Get Logged By value
   */
  async getLoggedBy(): Promise<string> {
    return await test.step('Get Logged By', async () => {
      const text = await this.loggedByField.textContent() || '';

      return text.replace('Logged By', '').trim();
    });
  }

  /**
   * Get Date Logged value
   */
  async getDateLogged(): Promise<string> {
    return await test.step('Get Date Logged', async () => {
      return await this.dateLoggedInput.inputValue();
    });
  }

  /**
   * Get Date Complete value
   */
  async getDateComplete(): Promise<string> {
    return await test.step('Get Date Complete', async () => {
      return await this.dateCompleteInput.inputValue();
    });
  }

  /**
   * Get Job Owner value
   */
  async getJobOwner(): Promise<string> {
    return await test.step('Get Job Owner', async () => {
      const text = await this.jobOwnerCombobox.textContent();

      return text?.trim() || '';
    });
  }

  // ========================
  // Job Details Fields - Edit
  // ========================

  /**
   * Update Description
   */
  async updateDescription(description: string): Promise<void> {
    await test.step(`Update Description: ${description}`, async () => {
      await this.clickEdit();
      await this.descriptionTextbox.clear();
      await this.descriptionTextbox.fill(description);
    });
  }

  /**
   * Update Customer Order Number
   */
  async updateCustomerOrderNumber(orderNumber: string): Promise<void> {
    await test.step(`Update Customer Order Number: ${orderNumber}`, async () => {
      await this.customerOrderNumberInput.clear();
      await this.customerOrderNumberInput.fill(orderNumber);
    });
  }

  /**
   * Update Reference Number
   */
  async updateReferenceNumber(referenceNumber: string): Promise<void> {
    await test.step(`Update Reference Number: ${referenceNumber}`, async () => {
      await this.referenceNumberInput.clear();
      await this.referenceNumberInput.fill(referenceNumber);
    });
  }

  /**
   * Update Next Contact Date
   */
  async updateNextContactDate(date: string): Promise<void> {
    await test.step(`Update Next Contact Date: ${date}`, async () => {
      await this.nextContactDateInput.clear();
      await this.nextContactDateInput.fill(date);
    });
  }

  /**
   * Save changes after editing
   */
  async saveChanges(): Promise<void> {
    await test.step('Save changes', async () => {
      await this.clickSave();
      await this.page.waitForLoadState('networkidle');
    });
  }

  // ========================
  // Job KPIs Section
  // ========================

  /**
   * Get Priority Level value
   */
  async getPriorityLevel(): Promise<string> {
    return await test.step('Get Priority Level', async () => {
      const text = await this.priorityLevelCombobox.textContent();

      return text?.trim() || '';
    });
  }

  /**
   * Get Target Completion Date
   */
  async getTargetCompletionDate(): Promise<string> {
    return await test.step('Get Target Completion Date', async () => {
      return await this.targetCompletionDateInput.inputValue();
    });
  }

  // ========================
  // AI Summarise
  // ========================

  /**
   * Click Summarise button
   */
  async clickSummarise(): Promise<void> {
    await test.step('Click Summarise', async () => {
      await this.summariseButton.click();
    });
  }

  /**
   * Click Regenerate button
   */
  async clickRegenerate(): Promise<void> {
    await test.step('Click Regenerate', async () => {
      await this.regenerateButton.click();
    });
  }

  // ========================
  // Contacts Tab
  // ========================

  /**
   * Get contacts table in Contacts tab
   */
  async getContactsTabTable(): Promise<Locator> {
    return this.page.locator('#contactsTab table');
  }

  /**
   * Click contact by name in Contacts tab
   */
  async clickContactByName(contactName: string): Promise<void> {
    await test.step(`Click contact: ${contactName}`, async () => {
      await this.switchToTab('Contacts');
      const table = await this.getContactsTabTable();

      await table.locator(`tr:has-text("${contactName}")`).click();
    });
  }

  // ========================
  // Assets Tab
  // ========================

  /**
   * Get assets table in Assets tab
   */
  async getAssetsTabTable(): Promise<Locator> {
    return this.page.locator('#assetsTab table');
  }

  /**
   * Click asset by description in Assets tab
   */
  async clickAssetByDescription(description: string): Promise<void> {
    await test.step(`Click asset: ${description}`, async () => {
      await this.switchToTab('Assets');
      const table = await this.getAssetsTabTable();

      await table.locator(`tr:has-text("${description}")`).click();
    });
  }

  // ========================
  // Tasks Tab
  // ========================

  /**
   * Get tasks table in Tasks tab
   */
  async getTasksTabTable(): Promise<Locator> {
    return this.page.locator('#tasksTab table');
  }

  /**
   * Add new task
   */
  async addTask(): Promise<void> {
    await test.step('Add task', async () => {
      await this.switchToTab('Tasks');
      const addButton = this.page.getByRole('button', { name: /Add Task/i });

      await addButton.click();
    });
  }

  // ========================
  // Costs Tab
  // ========================

  /**
   * Get costs table in Costs tab
   */
  async getCostsTabTable(): Promise<Locator> {
    return this.page.locator('#costTab table');
  }

  /**
   * Add new cost
   */
  async addCost(): Promise<void> {
    await test.step('Add cost', async () => {
      await this.switchToTab('Costs');
      const addButton = this.page.getByRole('button', { name: /Add Cost/i });

      await addButton.click();
    });
  }

  // ========================
  // Visits Tab
  // ========================

  /**
   * Get visits table in Visits tab
   */
  async getVisitsTabTable(): Promise<Locator> {
    return this.page.locator('#visitsTab table');
  }

  /**
   * Add new visit
   */
  async addVisit(): Promise<void> {
    await test.step('Add visit', async () => {
      await this.switchToTab('Visits');
      const addButton = this.page.getByRole('button', { name: /Add Visit/i });

      await addButton.click();
    });
  }

  // ========================
  // Subcontractor Tab
  // ========================

  /**
   * Get subcontractor table in Subcontractor tab
   */
  async getSubcontractorTabTable(): Promise<Locator> {
    return this.page.locator('#subcontractorTab table');
  }

  /**
   * Add subcontractor visit
   */
  async addSubcontractorVisit(): Promise<void> {
    await test.step('Add subcontractor visit', async () => {
      await this.switchToTab('Subcontractor');
      const addButton = this.page.getByRole('button', { name: /Add.*Visit/i });

      await addButton.click();
    });
  }

  // ========================
  // History Tab
  // ========================

  /**
   * Open History panel
   */
  async openHistory(): Promise<void> {
    await test.step('Open History', async () => {
      await this.historyTab.click();
    });
  }

  // ========================
  // Info Tab
  // ========================

  /**
   * Open Info panel
   */
  async openInfo(): Promise<void> {
    await test.step('Open Info', async () => {
      await this.infoTab.click();
    });
  }

  // ========================
  // Job Forms Tab
  // ========================

  /**
   * Get job forms table in Job Forms tab
   */
  async getJobFormsTabTable(): Promise<Locator> {
    return this.page.locator('#jobFormsTab table');
  }

  /**
   * Add new form
   */
  async addJobForm(): Promise<void> {
    await test.step('Add job form', async () => {
      await this.switchToTab('Job Forms');
      const addButton = this.page.getByRole('button', { name: /Add Form/i });

      await addButton.click();
    });
  }

  // ========================
  // Complete Job Flow
  // ========================

  /**
   * Complete job (simplified flow)
   */
  async completeJob(): Promise<void> {
    await test.step('Complete job', async () => {
      await this.clickCompleteJob();
      // Wait for confirmation modal or status change
      await this.page.waitForLoadState('networkidle');
    });
  }

  /**
   * Delete job (if available)
   */
  async deleteJob(): Promise<void> {
    await test.step('Delete job', async () => {
      await this.moreOptionsButton.click();
      const deleteOption = this.page.getByText('Delete Job');

      await deleteOption.click();
      // Confirm deletion if modal appears
      const confirmButton = this.page.getByRole('button', { name: 'Confirm' });

      if (await confirmButton.isVisible()) {
        await confirmButton.click();
      }
    });
  }
}
