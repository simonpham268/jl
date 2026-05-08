import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { test } from '@playwright/test';

/**
 * HomePage - Page Object for home/dashboard page
 * Handles post-login actions and navigation
 */
export class HomePage extends BasePage {
  // ========================
  // Locators - User Menu
  // ========================
  readonly avatarButton: Locator;
  readonly logoffLink: Locator;

  // ========================
  // Locators - Login Page Elements (for verification)
  // ========================
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);

    // User Menu
    this.avatarButton = this.page.locator('#accountMenu');
    this.logoffLink = this.page.locator('#logOffMenu');

    // Login Page Elements
    this.submitButton = this.page.locator('button#loginButton, button:has-text("Log in")').first();
  }

  // ========================
  // Page Load Methods
  // ========================

  async waitForHomePageLoad(): Promise<void> {
    await test.step('Wait for home page to load', async () => {
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  // ========================
  // User Actions
  // ========================

  async logoff(): Promise<void> {
    await test.step('Perform logoff', async () => {
      await this.avatarButton.click();
      await this.logoffLink.click();
      await this.page.waitForURL(/Account\/Login/i, { timeout: this.navigationTimeout });
    });
  }

  // ========================
  // Verification Methods
  // ========================

  async isSubmitButtonVisible(): Promise<boolean> {
    return await test.step('Check if on login page', async () => {
      return await this.submitButton.isVisible().catch(() => false);
    });
  }
}
