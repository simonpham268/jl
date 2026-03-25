import { Page, Locator } from "@playwright/test";
import { requireEnv } from "../utils/require.env";

/**
 * BasePage - Base class for all page objects
 * Provides common utilities and timeout configurations
 */
export class BasePage {
  protected page: Page;

  // ========================
  // Timeout Configurations
  // ========================
  protected elementTimeout: number;
  protected waitDisappearTimeout: number;
  protected navigationTimeout: number;

  constructor(page: Page) {
    this.page = page;
    this.elementTimeout = parseInt(process.env.TIMEOUT_ELEMENT || '5000');
    this.waitDisappearTimeout = parseInt(process.env.TIMEOUT_WAIT_DISAPPEAR || '10000');
    this.navigationTimeout = parseInt(requireEnv('TIMEOUT_NAVIGATION'));
  }

  // ========================
  // Navigation Methods
  // ========================

  async goToBaseURL(baseUrl?: string): Promise<void> {
    await this.page.goto(baseUrl || '/');
  }

  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
  }

  // ========================
  // Form Input Methods
  // ========================

  async fill(fieldName: string, value: string): Promise<void> {
    await this.page.getByLabel(fieldName).fill(value);
  }

  async selectOption(fieldName: string, value: string): Promise<void> {
    await this.page.getByLabel(fieldName).selectOption(value);
  }

  async check(fieldName: string): Promise<void> {
    await this.page.getByLabel(fieldName).check();
  }

  async uncheck(fieldName: string): Promise<void> {
    await this.page.getByLabel(fieldName).uncheck();
  }

  async toggle(fieldName: string): Promise<void> {
    await this.page.getByLabel(fieldName).click();
  }

  async uploadFile(selector: string, filePath: string | string[]): Promise<void> {
    await this.page.locator(selector).setInputFiles(filePath);
  }

  // ========================
  // Button/Click Methods
  // ========================

  async clickButton(name: string): Promise<void> {
    await this.page.getByRole('button', { name }).click();
  }

  async submit(): Promise<void> {
    await this.page.getByRole('button', { name: /Submit|Save|Create/i }).click();
  }

  // ========================
  // Text/Attribute Methods
  // ========================

  async getText(locator: Locator): Promise<string | null> {
    try {
      const text = await locator.innerText({ timeout: this.elementTimeout });
      return text?.trim() || null;
    } catch {
      return null;
    }
  }

  async getAttribute(locator: Locator, attributeName: string): Promise<string | null> {
    try {
      const value = await locator.getAttribute(attributeName, { timeout: this.elementTimeout });
      return value?.trim() || null;
    } catch {
      return null;
    }
  }

  // ========================
  // Wait Methods
  // ========================

  async waitForLocatorToDisappear(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout: timeout ?? this.waitDisappearTimeout });
  }
}
