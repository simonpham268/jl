import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * LiveTrackingPage - Page Object for Live Tracking page
 * URL: /EngineerTracking/Live
 */
export class LiveTrackingPage extends BasePage {
  // ========================
  // Locators - Header/Actions
  // ========================
  readonly pageTitle: Locator;
  readonly timeRangeButton: Locator;
  readonly autoRefreshButton: Locator;
  readonly settingsButton: Locator;

  // ========================
  // Locators - Map/Content
  // ========================
  readonly mapContainer: Locator;
  readonly jobInfoPanel: Locator;
  readonly engineerTrackingDialog: Locator;
  readonly manageSettingsLink: Locator;

  constructor(page: Page) {
    super(page);

    // Header/Actions
    this.pageTitle = page.getByRole('heading', { name: 'Job Address Map' });
    this.timeRangeButton = page.locator('text=24H from now');
    this.autoRefreshButton = page.locator('text=Auto Refresh');
    this.settingsButton = page.locator('button').last();

    // Map/Content
    this.mapContainer = page.locator('[role="tabpanel"]').first();
    this.jobInfoPanel = page.locator('text=Select a Job from the map to find suitable engineers');
    this.engineerTrackingDialog = page.getByRole('dialog');
    this.manageSettingsLink = page.getByRole('link', { name: /Manage settings/ });
  }

  // ========================
  // Navigation Methods
  // ========================

  /**
   * Navigate to Live Tracking page
   */
  async navigateToLiveTracking(): Promise<void> {
    await test.step('Navigate to Live Tracking page', async () => {
      await this.page.goto('/EngineerTracking/Live');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Assert page is loaded
   */
  async assertPageLoaded(): Promise<void> {
    await test.step('Assert Live Tracking page is loaded', async () => {
      await expect(this.pageTitle).toBeVisible();
    });
  }

  // ========================
  // Action Methods
  // ========================

  /**
   * Click time range button
   */
  async clickTimeRange(): Promise<void> {
    await test.step('Click time range button', async () => {
      await this.timeRangeButton.click();
    });
  }

  /**
   * Click auto refresh button
   */
  async clickAutoRefresh(): Promise<void> {
    await test.step('Click auto refresh button', async () => {
      await this.autoRefreshButton.click();
    });
  }

  /**
   * Click manage settings link
   */
  async clickManageSettings(): Promise<void> {
    await test.step('Click manage settings link', async () => {
      await this.manageSettingsLink.click();
    });
  }

  // ========================
  // State Methods
  // ========================

  /**
   * Check if tracking dialog is visible
   */
  async isTrackingDialogVisible(): Promise<boolean> {
    return await test.step('Check if tracking dialog is visible', async () => {
      return await this.engineerTrackingDialog.isVisible();
    });
  }

  /**
   * Check if job info panel is visible
   */
  async isJobInfoPanelVisible(): Promise<boolean> {
    return await test.step('Check if job info panel is visible', async () => {
      return await this.jobInfoPanel.isVisible();
    });
  }

  /**
   * Close tracking dialog
   */
  async closeTrackingDialog(): Promise<void> {
    await test.step('Close tracking dialog', async () => {
      if (await this.isTrackingDialogVisible()) {
        await this.page.keyboard.press('Escape');
      }
    });
  }
}
