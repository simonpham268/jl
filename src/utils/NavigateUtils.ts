import type { Page } from '@playwright/test';
import { test } from '@playwright/test';

export class NavigateUtils {
  constructor(private page: Page) {}

  async navigateTo(path: string): Promise<void> {
    await test.step(`Navigate to ${path}`, async () => {
      await this.page.goto(path);
      await this.page.waitForLoadState('domcontentloaded');
    });
  }
}
