import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { test } from '@playwright/test';

export class HomePage extends BasePage {
  // Dashboard/Home Elements
  readonly avatarButton: Locator;
  readonly logoffLink: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators directly
    this.avatarButton = this.page.getByRole('link', { name: 'Q', exact: true });
    // Logoff link - matches various text patterns (Logoff, Log off, Logout, Sign out, etc.)
    this.logoffLink = this.page.getByRole('link', { name: /logoff|log off|logout|sign out/i });
    this.submitButton = this.page.locator('button#loginButton, button:has-text("Log in")').first();
  }

  /**
   * Wait for home page/dashboard to load after login
   */
  async waitForHomePageLoad(): Promise<void> {
    await test.step('Wait for home page/dashboard to load after login', async () => {
      await this.page.waitForURL('https://uat.joblogic.com/', { timeout: this.navigationTimeout });
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Perform logoff action - click avatar menu, then click logoff link
   */
  async logoff(): Promise<void> {
    await test.step('Perform logoff action - click avatar menu, then click logoff link', async () => {
      await this.avatarButton.click();
      await this.logoffLink.click();
      // Wait for redirect to login page
      await this.page.waitForURL('**/account/login', { timeout: this.navigationTimeout });
    });
  }

  /**
   * Check if login submit button is visible (indicates we're back on login page)
   */
  async isSubmitButtonVisible(): Promise<boolean> {
    return await test.step('Check if login submit button is visible (indicates we\'re back on login page)', async () => {
      return await this.submitButton.isVisible().catch(() => false);
    });
  }
}

