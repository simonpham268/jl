import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../base.page';

export class ReservationPage extends BasePage {
  readonly openFormButton: Locator;
  readonly firstnameInput: Locator;
  readonly lastnameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly submitButton: Locator;
  readonly validationAlert: Locator;

  constructor(page: Page) {
    super(page);
    this.openFormButton = this.page.getByRole('button', { name: 'Reserve Now' });
    this.firstnameInput = this.page.getByRole('textbox', { name: 'Firstname' });
    this.lastnameInput = this.page.getByRole('textbox', { name: 'Lastname' });
    this.emailInput = this.page.getByRole('textbox', { name: 'Email' });
    this.phoneInput = this.page.getByRole('textbox', { name: 'Phone' });
    this.submitButton = this.page.getByRole('button', { name: 'Reserve Now' });
    this.validationAlert = this.page.getByRole('alert');
  }

  async openReservationForm(): Promise<void> {
    await test.step('Open reservation form', async () => {
      await this.openFormButton.click();
      await expect(this.firstnameInput).toBeVisible({ timeout: this.elementTimeout });
    });
  }

  async submitReservation(data: {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
  }): Promise<void> {
    await test.step(`Submit reservation for ${data.firstname} ${data.lastname}`, async () => {
      await this.firstnameInput.fill(data.firstname);
      await this.lastnameInput.fill(data.lastname);
      await this.emailInput.fill(data.email);
      await this.phoneInput.fill(data.phone);
      await this.submitButton.click();
    });
  }

  async assertValidationError(message: string): Promise<void> {
    await test.step(`Assert validation error contains "${message}"`, async () => {
      const item = this.validationAlert.locator('li', { hasText: message });
      await expect(item).toBeVisible({ timeout: this.elementTimeout });
    });
  }
}
