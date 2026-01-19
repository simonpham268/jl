import { Page, Locator } from '@playwright/test';

/**
 * Wait for a locator to meet a specific condition within a timeout period.
 * @param page 
 * @param locator 
 * @param condition 
 * @param timeout 
 * @returns 
 */
export async function waitLocator(locator: Locator, condition: 'visible' | 'hidden' | 'attached' | 'detached' | 'attached', timeout = 10000): Promise<boolean> {
  try {
    switch (condition) {
      case 'visible':
        await locator.waitFor({ state: 'visible', timeout });
        return true;
      case 'attached':
        await locator.waitFor({ state: 'attached', timeout });
        return true;
      case 'hidden':
        await locator.waitFor({ state: 'hidden', timeout });
        return true;
      case 'attached':
        await locator.waitFor({ state: 'attached', timeout });
        return true;
      case 'detached':
        await locator.waitFor({ state: 'detached', timeout });
        return true;
    }
  } catch (error) {
    return false;
  }

}
