import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  private cartButton: Locator;
  private productLink: (name: string) => Locator;
  private addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartButton = this.page.locator('a#cartur');
    this.productLink = (name: string) => this.page.locator(`a:has-text("${name}")`);
    this.addToCartButton = this.page.locator("a:has-text('Add to cart')");
  }

  async addProductToCart(productName: string) {
    await this.productLink(productName).click();
    await this.addToCartButton.click();
  }

  async acceptAddToCartAlert() {
    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });
    await this.page.waitForTimeout(1000);
  }

  async goToCart() {
    await this.cartButton.click();
  }
}

