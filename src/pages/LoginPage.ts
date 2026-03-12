import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { test } from '@playwright/test'

export class LoginPage extends BasePage {
  // Form Elements - declared directly in constructor
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators directly with improved selector for login button
    this.usernameInput = this.page.locator('input[type="email"], input[name*="username" i], input[name*="email" i], input[id*="username" i], input[id*="email" i]');
    this.passwordInput = this.page.locator('input[type="password"]');
    // Use only the main login button (not Microsoft Entra)
    this.loginButton = this.page.locator('button#loginButton, button:has-text("Log in")').first();
  }

  /**
   * Login with provided credentials and wait for home page to load
   */
  async login(username: string, password: string): Promise<void> {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
      // Wait for home page/dashboard to load after login
      await this.page.waitForURL('https://jluateventbasedjlweb.azurewebsites.net/', { timeout: this.navigationTimeout });
      await this.page.waitForLoadState('domcontentloaded');
  }

}
