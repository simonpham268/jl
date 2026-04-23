import type { Page } from '@playwright/test';
import { test } from '@playwright/test';

export class NavigateUtils {
  constructor(private page: Page) {}

  async navigateToSystemSetup(): Promise<void> {
    await test.step('Navigate to System Setup', async () => {
      await this.page.goto('/Setting/SystemSetup');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }
}
