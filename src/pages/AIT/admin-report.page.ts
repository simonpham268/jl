import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../base.page';

export class AdminReportPage extends BasePage {
  readonly reportNavLink: Locator;

  constructor(page: Page) {
    super(page);
    this.reportNavLink = this.page.getByRole('link', { name: 'Report' });
  }

  async navigateToReport(): Promise<void> {
    await test.step('Navigate to Report section', async () => {
      await this.page.goto(`${this.baseURL}/admin/report`);
      await expect(this.reportNavLink).toBeVisible();
    });
  }

  async assertBookingDisplayed(guestFullName: string): Promise<void> {
    await test.step(`Assert booking displayed for: ${guestFullName}`, async () => {
      await expect(this.page.getByText(guestFullName)).toBeVisible({ timeout: this.waitDisappearTimeout });
    });
  }
}
