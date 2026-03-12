import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { test} from '@playwright/test'

export class JobsPage extends BasePage {
  // Job list page locators
  readonly jobsTable: Locator;
  readonly jobRows: Locator;
  readonly firstJobLink: Locator;
  
  // Job details page locators
  readonly jobTitle: Locator;
  readonly jobStatus: Locator;
  readonly completeJobButton: Locator;
  readonly dateCompleteInput: Locator;
  readonly completeButton: Locator;
  readonly loadingSpinner: Locator;
  readonly statusBadge: Locator;
  readonly openTab: Locator;
  readonly searchInput: Locator;
  readonly jobSelectors: string[];
    // Delete job workflow locators
  readonly threeDotsButton: Locator;
  readonly deleteJobOption: Locator;
  readonly agreeCheckbox: Locator;
  readonly deleteButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    
    // Jobs list table and rows with multiple fallback selectors
    this.jobsTable = this.page.locator(
      'table, .jobs-table, .job-list, .table, [role="table"], .grid'
    ).first();
    
    this.jobRows = this.page.locator(
      'tbody tr, .job-row, tr:has(td), .table-row, .grid-row'
    );
    
    this.firstJobLink = this.page.locator(
      'tbody tr:first-child a, .job-row:first-child a, tr:has(td):first-child a, table tr:nth-child(2) a'
    ).first();
    
    // Job details page elements
    this.jobTitle = this.page.locator(
      'h1, .job-title, [data-testid="job-title"], .page-title, .content-header h1'
    ).first();
    
    this.jobStatus = this.page.locator(
      '.status, .job-status, [data-testid="job-status"], .badge, .label, .status-badge'
    ).first();
    
    this.completeJobButton = this.page.locator(
      '#completeJob, button:has-text("Complete Job"), input[type="button"][value*="Complete Job"], [value*="Complete Job"], button[id*="complete"]'
    ).first();
    
    this.dateCompleteInput = this.page.getByRole('textbox', { name: 'Date Complete*' });
    
    this.completeButton = this.page.getByRole('button', { name: 'Complete' });
    
    this.loadingSpinner = this.page.locator(
      '.loading, .spinner, [data-testid="loading"], .fa-spinner, .progress'
    ).first();
    
    this.statusBadge = this.page.locator(
      '.status:has-text("Completed"), .badge:has-text("Completed"), [data-status="completed"], .job-status:has-text("Completed")'
    ).first();

        this.openTab = this.page.locator(
      'a:has-text("Open"), .tab:has-text("Open"), [role="tab"]:has-text("Open"), .nav-link:has-text("Open")'
    ).first();

    this.searchInput = this.page.locator(
      'input[type="search"], input[placeholder*="search"], input[name*="search"], .search-input'
    ).first();

    this.jobSelectors = [
      'tbody tr:first-child a[href*="/Job/"]',
      'tr:has(td):first-child a',
      '.job-row:first-child a',
      'table tr:nth-child(2) td:first-child a'
    ];

        // Delete job workflow elements
    this.threeDotsButton = this.page.locator(
      '.dropdown-toggle.btn-menu'
    ).first();
    
    this.deleteJobOption = this.page.locator(
      'a:has-text("Delete Job"), .dropdown-item:has-text("Delete"), [role="menuitem"]:has-text("Delete")'
    ).first();
    
    this.agreeCheckbox = this.page.locator(
      ':text("I agree and understand this action is irreversible"), :text("I agree"), .checkbox:has-text("agree"), [for*="agree"]'
    ).first();
    
    this.deleteButton = this.page.locator(
      'button:has-text("Delete"), input[type="submit"][value="Delete"], .btn-danger:has-text("Delete")'
    ).first();
    
    this.successMessage = this.page.locator(
      'h3:has-text("successfully deleted"), .alert-success, .toast-success, .notification-success, [role="alert"]:has-text("successfully")'
    ).first();
  }

  /**
   * Navigate to All Jobs page
   */
  async navigateToAllJobs(): Promise<void> {
    await test.step('Navigate to All Jobs page', async () => {
      await this.page.waitForURL('**/Job**', { timeout: this.navigationTimeout });
      await this.page.waitForLoadState('domcontentloaded');
      
      // Wait for jobs table to load
      await this.jobsTable.waitFor({ state: 'visible', timeout: 10000 });
    });
  }

  /**
   * Navigate to Jobs section (general)
   */
  async navigateToJobs(): Promise<void> {
    await test.step('Navigate to Jobs section', async () => {
      await this.page.waitForURL('**/Job**', { timeout: this.navigationTimeout });
    });
  }

  /**
   * Select the first available job from the jobs list
   */
  async selectFirstJob(): Promise<void> {
    await test.step('Select the first available job from the jobs list', async () => {
      // Wait for jobs table to be visible
      await this.jobsTable.waitFor({ state: 'visible', timeout: 10000 });
      
      // Try multiple strategies to select first job
      for (const selector of this.jobSelectors) {
        try {
          const jobLink = this.page.locator(selector).first();
          if (await jobLink.isVisible()) {
            await jobLink.click();
            await this.page.waitForURL('**/Job/**', { timeout: this.navigationTimeout });
            return;
          }
        } catch {
          continue;
        }
      }
      
      // Fallback: click first row if no link found
      const firstRow = this.jobRows.first();
      await firstRow.click();
      await this.page.waitForURL('**/Job/**', { timeout: this.navigationTimeout });
    });
  }

  /**
   * Get the job title from job details page
   */
  async getJobTitle(): Promise<string | null> {
    return await test.step('Get the job title from job details page', async () => {
      return await this.getText(this.jobTitle);
    });
  }

  /**
   * Get the current job status
   */
  async getJobStatus(): Promise<string | null> {
    return await test.step('Get the current job status', async () => {
      return await this.getText(this.jobStatus);
    });
  }

  /**
   * Click the Complete Job button
   */
  async clickCompleteJobButton(): Promise<void> {
    await test.step('Click the Complete Job button', async () => {
      await this.completeJobButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.completeJobButton.click();
      
      // Wait for completion form/modal to appear
      await this.dateCompleteInput.waitFor({ state: 'visible', timeout: 5000 });
    });
  }

  /**
   * Select completion date in the date picker
   */
  async selectDateComplete(date: string): Promise<void> {
    await test.step('Select completion date in the date picker', async () => {
      await this.dateCompleteInput.waitFor({ state: 'visible', timeout: 5000 });
      
      // Clear the field and enter the date in DD/MM/YYYY format
      await this.dateCompleteInput.clear();
      
      // Convert ISO date (YYYY-MM-DD) to DD/MM/YYYY format
      const [year, month, day] = date.split('-');
      const formattedDate = `${day}/${month}/${year} 10:39 AM`;
      
      await this.dateCompleteInput.fill(formattedDate);
    });
  }

  /**
   * Click the Complete button to finalize job completion
   */
  async clickCompleteButton(): Promise<void> {
    await test.step('Click the Complete button to finalize job completion', async () => {
      await this.completeButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.completeButton.click();
    });
  }

  /**
   * Wait for job completion update to process
   */
  async waitForJobCompletionUpdate(): Promise<void> {
    await test.step('Wait for job completion update to process', async () => {
      // Wait for loading spinner to disappear if present
      const hasSpinner = await this.loadingSpinner.isVisible().catch(() => false);
      if (hasSpinner) {
        await this.waitForLocatorToDisappear(this.loadingSpinner);
      }
      
      // Wait for page to settle after completion
      await this.page.waitForLoadState('domcontentloaded');
      
      // Additional wait for any async status updates
      await this.page.waitForTimeout(2000);
    });
  }

  /**
   * Check if job is marked as completed
   */
  async isJobCompleted(): Promise<boolean> {
    return await test.step('Check if job is marked as completed', async () => {
      // Multiple strategies to check completion status
      const completionChecks = [
        async () => await this.statusBadge.isVisible(),
        async () => {
          const status = await this.getJobStatus();
          return status?.toLowerCase().includes('completed') || false;
        },
        async () => {
          const pageContent = await this.page.textContent('body');
          return pageContent?.toLowerCase().includes('completed') || false;
        }
      ];
      
      for (const check of completionChecks) {
        try {
          const result = await check();
          if (result) return true;
        } catch {
          continue;
        }
      }
      
      return false;
    });
  }

  /**
   * Get count of jobs in the list
   */
  async getJobCount(): Promise<number> {
    return await test.step('Get count of jobs in the list', async () => {
      const rows = await this.jobRows.count();
      return rows;
    });
  }

  /**
   * Check if jobs table is loaded and has data
   */
  async hasJobs(): Promise<boolean> {
    return await test.step('Check if jobs table is loaded and has data', async () => {
      const count = await this.getJobCount();
      return count > 0;
    });
  }

  /**
   * Search for a job by title or reference
   */
  async searchJob(searchTerm: string): Promise<void> {
    await test.step('Search for a job by title or reference', async () => {
      if (await this.searchInput.isVisible()) {
        await this.searchInput.fill(searchTerm);
        await this.page.keyboard.press('Enter');
        await this.page.waitForLoadState('domcontentloaded');
      }
    });
  }

    /**
   * Click on Open tab to filter jobs
   */
  async clickOpenTab(): Promise<void> {
    await test.step('Click on Open tab to filter jobs', async () => {
      await this.openTab.waitFor({ state: 'visible', timeout: 5000 });
      await this.openTab.click();
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

    /**
   * Click three dots menu button
   */
  async clickThreeDots(): Promise<void> {
    await test.step('Click three dots menu button', async () => {
      await this.threeDotsButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.threeDotsButton.click();
    });
  }

  /**
   * Select Delete Job from dropdown menu
   */
  async selectDeleteJob(): Promise<void> {
    await test.step('Select Delete Job from dropdown menu', async () => {
      await this.deleteJobOption.waitFor({ state: 'visible', timeout: 5000 });
      await this.deleteJobOption.click();
    });
  }

  /**
   * Click I agree checkbox or button
   */
  async clickIAgree(): Promise<void> {
    await test.step('Click I agree checkbox or button', async () => {
      await this.agreeCheckbox.waitFor({ state: 'visible', timeout: 5000 });
      await this.agreeCheckbox.click();
    });
  }

  /**
   * Click Delete button to confirm deletion
   */
  async clickDeleteButton(): Promise<void> {
    await test.step('Click Delete button to confirm deletion', async () => {
      await this.deleteButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.deleteButton.click();
      
      // Wait for deletion to process
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Get success message after deletion
   */
  async getSuccessMessage(): Promise<string | null> {
    return await test.step('Get success message after deletion', async () => {
      await this.successMessage.waitFor({ state: 'visible', timeout: 10000 });
      return await this.getText(this.successMessage);
    });
  }
}