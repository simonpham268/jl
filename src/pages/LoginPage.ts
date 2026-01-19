import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  private loginText: Locator;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private closeModalButton: Locator;
  private userWelcome: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = this.page.locator("#loginusername");
    this.passwordInput = this.page.locator("#loginpassword");
    this.loginButton = this.page.getByRole("button", { name: "Log in" });
    this.loginText = this.page.locator("#login2");
    this.closeModalButton = this.page.locator("#logInModal .close");
    this.userWelcome = this.page.locator("#nameofuser");
  }

  async openLoginModal() {
    await this.loginText.click();
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async isWrongCredentialPopupVisible(): Promise<void> {
    const dialog = await this.page.waitForEvent("dialog");
    expect(dialog.message()).toContain("Wrong password.");
    await dialog.dismiss();
  }

  async isMissingCredentialPopupVisible(): Promise<void> {
    const dialog = await this.page.waitForEvent("dialog");
    expect(dialog.message()).toContain("Please fill out Username and Password.");
    await dialog.dismiss();
  }

  async isLoggedIn(): Promise<void> {
    return await expect(this.userWelcome).toBeVisible();
  }

  async closeLoginModal() {
    await this.closeModalButton.click();
  }
}
