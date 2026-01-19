import { test } from "@playwright/test";
import { validCredentials } from "../../data/loginCredentials";
import { LoginPage } from "../../pages/LoginPage";

test.describe("Login and select category", () => {
  test.beforeEach(async ({ page }) => {
    await new LoginPage(page).goToBaseURL();
  });

  test(`Login with VALID credentials`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLoginModal();
    await loginPage.login(validCredentials.username, validCredentials.password);
    await loginPage.isLoggedIn();
  });

   test(`Login with INVALID credentials`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLoginModal();
    await loginPage.login("invalid", "123");
    await loginPage.isWrongCredentialPopupVisible();
  });

  test(`Login WITHOUT input credentials`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLoginModal();
    await loginPage.login("", "");
    await loginPage.isMissingCredentialPopupVisible();
  });
});
