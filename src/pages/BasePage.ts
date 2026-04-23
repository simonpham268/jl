import type { Page, Locator } from '@playwright/test';
import { test } from '@playwright/test';
import { requireEnv } from '../utils/require.env';

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
    await test.step(`Navigate to ${path}`, async () => {
      await this.page.goto(path);
      await this.page.waitForLoadState('domcontentloaded');
    });
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

  // ========================
  // Dropdown Methods
  // ========================

  async sendKeyAndSelectItemOnDropdown(
    textBoxSelector: Locator,
    optionItemSelector: Locator,
    text: string,
    textSelected?: string,
    isDelay: boolean = false,
    textBoxFocusedSelector?: string
  ): Promise<void> {
    let textBoxElement: Locator = textBoxSelector;
    try {
      await textBoxElement.scrollIntoViewIfNeeded();
      await textBoxElement.click();
      await this.page.waitForTimeout(100);

      if (textBoxFocusedSelector != null)
        textBoxElement = this.page.locator(textBoxFocusedSelector);

      await textBoxElement.clear();
      if (isDelay) {
        await textBoxElement.pressSequentially(text, { delay: 100 });
      } else {
        await textBoxElement.pressSequentially(text);
      }
    } catch (error) {
      throw new Error(`[BasePage] sendKeyAndSelectItemOnDropdown Step 1 failed - could not click/type into textbox with text "${text}": ${error}`);
    }

    const rawMatch = textSelected ?? text;
    const matchText = rawMatch.length < 30 ? rawMatch : rawMatch.substring(0, 30);
    const optionLocator = optionItemSelector.filter({ hasText: matchText });

    try {
      await optionLocator.first().waitFor({ state: 'visible', timeout: 10000 });
    } catch (error) {
      throw new Error(`[BasePage] sendKeyAndSelectItemOnDropdown Step 2 failed - option with text "${matchText}" did not appear within 10s: ${error}`);
    }

    try {
      await optionLocator.first().scrollIntoViewIfNeeded();
      await optionLocator.first().click();
    } catch (error) {
      throw new Error(`[BasePage] sendKeyAndSelectItemOnDropdown Step 2 failed - could not click option with text "${matchText}": ${error}`);
    }
  }
}
