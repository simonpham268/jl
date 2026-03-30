import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Timesheet view type
 */
export type TimesheetViewType = 'Day' | 'Week';

/**
 * TimesheetsPage - Page Object for Timesheets Overview page
 * URL: /Timesheet
 */
export class TimesheetsPage extends BasePage {
  // ========================
  // Locators - Header/Actions
  // ========================
  readonly pageTitle: Locator;
  readonly searchEngineerInput: Locator;
  readonly includeTeamMembersToggle: Locator;
  readonly addTimeButton: Locator;
  readonly exportButton: Locator;
  readonly todayButton: Locator;

  // ========================
  // Locators - View Controls
  // ========================
  readonly dayViewButton: Locator;
  readonly weekViewButton: Locator;
  readonly previousButton: Locator;
  readonly nextButton: Locator;
  readonly dateInput: Locator;

  // ========================
  // Locators - Table/Results
  // ========================
  readonly timesheetTable: Locator;
  readonly tableRows: Locator;
  readonly totalHoursSection: Locator;
  readonly labourTimeLabel: Locator;
  readonly travellingTimeLabel: Locator;
  readonly nonProductiveTimeLabel: Locator;

  constructor(page: Page) {
    super(page);

    // Header/Actions
    this.pageTitle = page.getByRole('heading', { name: 'Timesheets Overview' });
    this.searchEngineerInput = page.getByPlaceholder('Search Engineer');
    this.includeTeamMembersToggle = page.locator('text=Include Team Member(s) time').locator('..');
    this.addTimeButton = page.getByRole('button', { name: /Add Time/ });
    this.exportButton = page.getByRole('button', { name: /Export/ });
    this.todayButton = page.getByRole('button', { name: 'Today' });

    // View Controls
    this.dayViewButton = page.getByRole('button', { name: 'Day' });
    this.weekViewButton = page.getByRole('button', { name: 'Week' });
    this.previousButton = page.locator('button').filter({ has: page.locator('[class*="chevron-left"], [class*="arrow-left"]') }).first();
    this.nextButton = page.locator('button').filter({ has: page.locator('[class*="chevron-right"], [class*="arrow-right"]') }).first();
    this.dateInput = page.getByPlaceholder('DD/MM/YYYY');

    // Table/Results
    this.timesheetTable = page.locator('table').first();
    this.tableRows = page.locator('table tbody tr');
    this.totalHoursSection = page.locator('text=Total Hours').locator('..');
    this.labourTimeLabel = page.locator('text=Labour Time').locator('..');
    this.travellingTimeLabel = page.locator('text=Travelling Time').locator('..');
    this.nonProductiveTimeLabel = page.locator('text=Non-Productive Time').locator('..');
  }

  // ========================
  // Navigation Methods
  // ========================

  /**
   * Navigate to Timesheets page
   */
  async navigateToTimesheets(): Promise<void> {
    await test.step('Navigate to Timesheets page', async () => {
      await this.page.goto('/Timesheet');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Timesheets page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
    });
  }

  // ========================
  // Action Methods
  // ========================

  /**
   * Search engineer
   */
  async searchEngineer(engineerName: string): Promise<void> {
    await test.step(`Search engineer: ${engineerName}`, async () => {
      await this.searchEngineerInput.fill(engineerName);
      await this.page.waitForTimeout(500);
    });
  }

  /**
   * Toggle include team members
   */
  async toggleIncludeTeamMembers(): Promise<void> {
    await test.step('Toggle include team members', async () => {
      await this.includeTeamMembersToggle.click();
    });
  }

  /**
   * Click Add Time button
   */
  async clickAddTime(): Promise<void> {
    await test.step('Click Add Time button', async () => {
      await this.addTimeButton.click();
    });
  }

  /**
   * Click Export button
   */
  async clickExport(): Promise<void> {
    await test.step('Click Export button', async () => {
      await this.exportButton.click();
    });
  }

  /**
   * Click Today button
   */
  async clickToday(): Promise<void> {
    await test.step('Click Today button', async () => {
      await this.todayButton.click();
    });
  }

  // ========================
  // View Methods
  // ========================

  /**
   * Switch to Day view
   */
  async switchToDayView(): Promise<void> {
    await test.step('Switch to Day view', async () => {
      await this.dayViewButton.click();
      await this.page.waitForTimeout(1000);
    });
  }

  /**
   * Switch to Week view
   */
  async switchToWeekView(): Promise<void> {
    await test.step('Switch to Week view', async () => {
      await this.weekViewButton.click();
      await this.page.waitForTimeout(1000);
    });
  }

  /**
   * Switch to view type
   */
  async switchToView(viewType: TimesheetViewType): Promise<void> {
    await test.step(`Switch to ${viewType} view`, async () => {
      if (viewType === 'Day') {
        await this.switchToDayView();
      } else {
        await this.switchToWeekView();
      }
    });
  }

  /**
   * Navigate to previous day/week
   */
  async goToPrevious(): Promise<void> {
    await test.step('Go to previous day/week', async () => {
      await this.previousButton.click();
      await this.page.waitForTimeout(1000);
    });
  }

  /**
   * Navigate to next day/week
   */
  async goToNext(): Promise<void> {
    await test.step('Go to next day/week', async () => {
      await this.nextButton.click();
      await this.page.waitForTimeout(1000);
    });
  }

  /**
   * Set date
   */
  async setDate(date: string): Promise<void> {
    await test.step(`Set date: ${date}`, async () => {
      await this.dateInput.fill(date);
      await this.page.keyboard.press('Enter');
      await this.page.waitForTimeout(1000);
    });
  }

  // ========================
  // Data Methods
  // ========================

  /**
   * Get engineer row count
   */
  async getEngineerRowCount(): Promise<number> {
    return await test.step('Get engineer row count', async () => {
      return await this.tableRows.count();
    });
  }

  /**
   * Get total hours text
   */
  async getTotalHoursText(): Promise<string> {
    return await test.step('Get total hours text', async () => {
      return await this.totalHoursSection.textContent() || '';
    });
  }

  /**
   * Click on engineer row by name
   */
  async clickEngineerRow(engineerName: string): Promise<void> {
    await test.step(`Click engineer row: ${engineerName}`, async () => {
      await this.page.locator(`tr:has-text("${engineerName}")`).first().click();
    });
  }
}
