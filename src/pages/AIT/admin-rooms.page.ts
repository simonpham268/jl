import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../base.page';

export class AdminRoomsPage extends BasePage {
  readonly roomsNavLink: Locator;

  constructor(page: Page) {
    super(page);
    this.roomsNavLink = this.page.getByRole('link', { name: 'Rooms' });
  }

  async navigateToRooms(): Promise<void> {
    await test.step('Navigate to Rooms section', async () => {
      await this.page.goto(`${this.baseURL}/admin/rooms`);
      await expect(this.roomsNavLink).toBeVisible();
    });
  }

  private roomRow(roomName: string): Locator {
    return this.page.locator('div.row', { hasText: roomName }).first();
  }

  async assertRoomDisplayed(roomName: string, type: string, price: string | number): Promise<void> {
    await test.step(`Assert room displayed: ${roomName} (${type}, ${price})`, async () => {
      const row = this.roomRow(roomName);
      await expect(row).toBeVisible();
      await expect(row).toContainText(type);
      await expect(row).toContainText(String(price));
    });
  }
}
