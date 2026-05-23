import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../base.page';

export class BookingHomePage extends BasePage {
  readonly roomsHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.roomsHeading = this.page.getByRole('heading', { name: 'Our Rooms', level: 2 });
  }

  async goToRoomsSection(): Promise<void> {
    await test.step('Navigate to homepage #rooms section', async () => {
      await this.navigateTo('/#rooms');
      await expect(this.roomsHeading).toBeVisible({ timeout: this.navigationTimeout });
    });
  }

  private roomCardByName(roomName: string): Locator {
    return this.page
      .locator('.room-card, .card, .room')
      .filter({ has: this.page.getByRole('heading', { level: 5, name: roomName, exact: true }) })
      .first();
  }

  async clickBookNowForRoom(roomName: string): Promise<void> {
    await test.step(`Click 'Book now' for room '${roomName}'`, async () => {
      await this.roomCardByName(roomName).getByRole('link', { name: 'Book now' }).click();
      await this.page.waitForURL(/\/reservation\/\d+/, { timeout: this.navigationTimeout });
    });
  }
}
