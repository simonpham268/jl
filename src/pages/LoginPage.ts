import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { requireEnv } from '../utils/require.env';
import { test } from '@playwright/test';

/**
 * LoginPage - Page Object for login page
 * Handles authentication actions
 */
export class LoginPage extends BasePage {
  // ========================
  // Locators - Form Elements
  // ========================
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);

    // Form Elements with fallback selectors
    this.usernameInput = this.page.locator(
      'input[type="email"], input[name*="username" i], input[name*="email" i], input[id*="username" i], input[id*="email" i]'
    );
    this.passwordInput = this.page.locator('input[type="password"]');
    this.loginButton = this.page.locator('button#loginButton, button:has-text("Log in")').first();
  }

  // ========================
  // Authentication Methods
  // ========================

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL(requireEnv('BASE_URL'), { timeout: this.navigationTimeout });
    await this.page.waitForLoadState('domcontentloaded');
  }

  // async fillUsername(username: string): Promise<void> {
  //   await test.step(`Fill username: ${username}`, async () => {
  //     await this.usernameInput.fill(username);
  //   });
  // }

  // async fillPassword(password: string): Promise<void> {
  //   await test.step('Fill password', async () => {
  //     await this.passwordInput.fill(password);
  //   });
  // }

  // async clickLogin(): Promise<void> {
  //   await test.step('Click login button', async () => {
  //     await this.loginButton.click();
  //   });
  // }
}
