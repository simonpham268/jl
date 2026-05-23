import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../base.page';

export class AdminLoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly roomsNavLink: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = this.page.getByPlaceholder('Enter username');
    this.passwordInput = this.page.getByPlaceholder('Password');
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
    this.roomsNavLink = this.page.getByRole('link', { name: 'Rooms' });
  }

  async goToBaseURL(): Promise<void> {
    await test.step('Go to AIT admin base URL', async () => {
      await this.page.goto(`${this.baseURL}/admin`);
      await expect(this.roomsNavLink).toBeVisible({ timeout: this.navigationTimeout });
    });
  }

  async login(username: string, password: string): Promise<void> {
    await test.step(`Login as ${username}`, async () => {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
      await expect(this.roomsNavLink).toBeVisible({ timeout: this.navigationTimeout });
    });
  }
}
