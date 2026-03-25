import { Locator, Page } from "@playwright/test";
import { test, expect } from '@playwright/test';
import { BasePage } from "../BasePage";

/**
 * Planner view type
 */
export type PlannerViewType = 'Day' | 'Week' | 'Month' | 'Agenda' | 'Timeline';

/**
 * Planner display type
 */
export type PlannerDisplayType = 'Engineer' | 'Team';

/**
 * ViewPlannerPage - Page Object for View Planner/Scheduler page
 * URL: /Scheduler
 */
export class ViewPlannerPage extends BasePage {
  // ========================
  // Locators - Header/Actions
  // ========================
  readonly filtersButton: Locator;
  readonly logJobButton: Locator;
  readonly bookNonProductiveTimeButton: Locator;
  readonly batchMoveButton: Locator;
  readonly batchDeployButton: Locator;

  // ========================
  // Locators - View Controls
  // ========================
  readonly engineerViewButton: Locator;
  readonly teamViewButton: Locator;
  readonly dayViewButton: Locator;
  readonly weekViewButton: Locator;
  readonly monthViewButton: Locator;
  readonly agendaViewButton: Locator;
  readonly timelineViewButton: Locator;

  // ========================
  // Locators - Jobs Panel
  // ========================
  readonly jobsPanelHeading: Locator;
  readonly loadingIndicator: Locator;

  constructor(page: Page) {
    super(page);

    // Header/Actions
    this.filtersButton = page.getByRole('button', { name: /Filters/ });
    this.logJobButton = page.getByRole('button', { name: /Log Job/ });
    this.bookNonProductiveTimeButton = page.getByRole('button', { name: /Book Non-Productive Time/ });
    this.batchMoveButton = page.getByRole('button', { name: /Batch Move/ });
    this.batchDeployButton = page.getByRole('button', { name: /Batch Deploy/ });

    // View Controls
    this.engineerViewButton = page.locator('text=Engineer').first();
    this.teamViewButton = page.locator('text=Team').first();
    this.dayViewButton = page.locator('text=Day').first();
    this.weekViewButton = page.locator('text=Week').first();
    this.monthViewButton = page.locator('text=Month').first();
    this.agendaViewButton = page.locator('text=Agenda').first();
    this.timelineViewButton = page.locator('text=Timeline').first();

    // Jobs Panel
    this.jobsPanelHeading = page.locator('text=Job(s) Panel');
    this.loadingIndicator = page.locator('text=Please wait a moment');
  }

  // ========================
  // Navigation Methods
  // ========================

  /**
   * Navigate to View Planner page
   */
  async navigateToViewPlanner(): Promise<void> {
    await test.step('Navigate to View Planner page', async () => {
      await this.page.goto('/Scheduler');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert View Planner page is loaded', async () => {
      await expect(this.filtersButton).toBeVisible();
    });
  }

  /**
   * Wait for planner to load
   */
  async waitForPlannerLoad(): Promise<void> {
    await test.step('Wait for planner to load', async () => {
      await this.loadingIndicator.waitFor({ state: 'hidden', timeout: 60000 }).catch(() => {});
    });
  }

  // ========================
  // Action Methods
  // ========================

  /**
   * Click Filters button
   */
  async clickFilters(): Promise<void> {
    await test.step('Click Filters button', async () => {
      await this.filtersButton.click();
    });
  }

  /**
   * Click Log Job button
   */
  async clickLogJob(): Promise<void> {
    await test.step('Click Log Job button', async () => {
      await this.logJobButton.click();
    });
  }

  /**
   * Click Book Non-Productive Time button
   */
  async clickBookNonProductiveTime(): Promise<void> {
    await test.step('Click Book Non-Productive Time button', async () => {
      await this.bookNonProductiveTimeButton.click();
    });
  }

  /**
   * Click Batch Move button
   */
  async clickBatchMove(): Promise<void> {
    await test.step('Click Batch Move button', async () => {
      await this.batchMoveButton.click();
    });
  }

  /**
   * Click Batch Deploy button
   */
  async clickBatchDeploy(): Promise<void> {
    await test.step('Click Batch Deploy button', async () => {
      await this.batchDeployButton.click();
    });
  }

  // ========================
  // View Methods
  // ========================

  /**
   * Switch to Engineer view
   */
  async switchToEngineerView(): Promise<void> {
    await test.step('Switch to Engineer view', async () => {
      await this.engineerViewButton.click();
      await this.waitForPlannerLoad();
    });
  }

  /**
   * Switch to Team view
   */
  async switchToTeamView(): Promise<void> {
    await test.step('Switch to Team view', async () => {
      await this.teamViewButton.click();
      await this.waitForPlannerLoad();
    });
  }

  /**
   * Switch to Day view
   */
  async switchToDayView(): Promise<void> {
    await test.step('Switch to Day view', async () => {
      await this.dayViewButton.click();
      await this.waitForPlannerLoad();
    });
  }

  /**
   * Switch to Week view
   */
  async switchToWeekView(): Promise<void> {
    await test.step('Switch to Week view', async () => {
      await this.weekViewButton.click();
      await this.waitForPlannerLoad();
    });
  }

  /**
   * Switch to Month view
   */
  async switchToMonthView(): Promise<void> {
    await test.step('Switch to Month view', async () => {
      await this.monthViewButton.click();
      await this.waitForPlannerLoad();
    });
  }

  /**
   * Switch to Agenda view
   */
  async switchToAgendaView(): Promise<void> {
    await test.step('Switch to Agenda view', async () => {
      await this.agendaViewButton.click();
      await this.waitForPlannerLoad();
    });
  }

  /**
   * Switch to Timeline view
   */
  async switchToTimelineView(): Promise<void> {
    await test.step('Switch to Timeline view', async () => {
      await this.timelineViewButton.click();
      await this.waitForPlannerLoad();
    });
  }

  /**
   * Switch to view type
   */
  async switchToView(viewType: PlannerViewType): Promise<void> {
    await test.step(`Switch to ${viewType} view`, async () => {
      const viewMethods = {
        'Day': () => this.switchToDayView(),
        'Week': () => this.switchToWeekView(),
        'Month': () => this.switchToMonthView(),
        'Agenda': () => this.switchToAgendaView(),
        'Timeline': () => this.switchToTimelineView(),
      };
      await viewMethods[viewType]();
    });
  }

  /**
   * Switch to display type
   */
  async switchToDisplayType(displayType: PlannerDisplayType): Promise<void> {
    await test.step(`Switch to ${displayType} display`, async () => {
      if (displayType === 'Engineer') {
        await this.switchToEngineerView();
      } else {
        await this.switchToTeamView();
      }
    });
  }
}
