import { Page, Locator } from "@playwright/test";
import { requireEnv } from "../utils/require.env";

export class BasePage {
  protected page: Page;
  protected elementTimeout: number;
  protected waitDisappearTimeout: number;
  protected navigationTimeout: number;

  constructor(page: Page) {
    this.page = page;
    this.elementTimeout = parseInt(process.env.TIMEOUT_ELEMENT || '5000');
    this.waitDisappearTimeout = parseInt(process.env.TIMEOUT_WAIT_DISAPPEAR || '10000');
    this.navigationTimeout = parseInt(requireEnv('TIMEOUT_NAVIGATION'));
  }

  async goToBaseURL(baseUrl?: string): Promise<void> {
    await this.page.goto(baseUrl || '/');
  }

  /**
   * Get text content from a locator
   * @param locator - The locator element
   * @returns The text content or null if not found
   */
  async getText(locator: Locator): Promise<string | null> {
    try {
      const text = await locator.innerText({ timeout: this.elementTimeout });
      return text && text.trim() ? text.trim() : null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Get attribute value from a locator
   * @param locator - The locator element
   * @param attributeName - The name of the attribute
   * @returns The attribute value or null if not found
   */
  async getAttribute(locator: Locator, attributeName: string): Promise<string | null> {
    try {
      const value = await locator.getAttribute(attributeName, { timeout: this.elementTimeout });
      return value && value.trim() ? value.trim() : null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Wait for a locator to disappear from the page
   * @param locator - The locator element to wait for
   * @param timeout - Timeout in milliseconds (uses TIMEOUT_WAIT_DISAPPEAR from env if not provided)
   */
  async waitForLocatorToDisappear(locator: Locator, timeout?: number): Promise<void> {
    const timeoutMs = timeout ?? this.waitDisappearTimeout;
    await locator.waitFor({ state: 'hidden', timeout: timeoutMs });
  }

}
