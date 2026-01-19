import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  private placeOrderButton: Locator;
  private nameInput: Locator;
  private countryInput: Locator;
  private cityInput: Locator;
  private cardInput: Locator;
  private monthInput: Locator;
  private yearInput: Locator;
  private purchaseButton: Locator;
  private orderModal: Locator;
  private orderSuccessTitle: Locator;
  private orderSuccessOkButton: Locator;

  constructor(page: Page) {
    super(page);
    this.placeOrderButton = this.page.getByRole("button", { name: "Place Order" });
    this.nameInput = this.page.locator("#name");
    this.countryInput = this.page.locator("#country");
    this.cityInput = this.page.locator("#city");
    this.cardInput = this.page.locator("#card");
    this.monthInput = this.page.locator("#month");
    this.yearInput = this.page.locator("#year");
    this.purchaseButton = this.page.getByRole("button", { name: "Purchase" });
    this.orderModal = this.page.locator(".sweet-alert.showSweetAlert.visible");
    this.orderSuccessTitle = this.orderModal.locator("h2");
    this.orderSuccessOkButton = this.page.getByRole("button", { name: "OK" });
  }

  async checkout({ name, country, city, creditCard, month, year }: { name: string, country: string, city: string, creditCard: string, month: string, year: string }) {
    await this.placeOrderButton.click();
    await this.nameInput.fill(name);
    await this.countryInput.fill(country);
    await this.cityInput.fill(city);
    await this.cardInput.fill(creditCard);
    await this.monthInput.fill(month);
    await this.yearInput.fill(year);
    await this.purchaseButton.click();
  }

  async verifyOrderSuccess() {
    await expect(this.orderModal).toBeVisible();
    await expect(this.orderSuccessTitle).toHaveText("Thank you for your purchase!");
    await this.orderSuccessOkButton.click();
  }

  async checkoutExpectFailure() {
    await this.placeOrderButton.click();
    await this.purchaseButton.click();
    let alertShown = false;
    this.page.once("dialog", async dialog => {
      alertShown = true;
      expect(dialog.message().toLowerCase()).toContain("fill");
      await dialog.accept();
    });
    await this.page.waitForTimeout(1000);
    expect(alertShown).toBeTruthy();
  }
}
