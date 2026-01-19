import { test } from "@playwright/test";
import { CartPage } from "../../pages/CartPage";
import { HomePage } from "../../pages/HomePage";
import { LoginPage } from "../../pages/LoginPage";
import { validCredentials } from "../../data/loginCredentials";

const productName = "Samsung galaxy s6";

// Happy path: Login, add product to cart, checkout

test.describe("E2E: Login, Add to Cart, Checkout", () => {
  test("Happy case: login, add product, checkout", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    // Go to site and login
    await loginPage.goToBaseURL();
    await loginPage.openLoginModal();
    await loginPage.login(validCredentials.username, validCredentials.password);
    await loginPage.isLoggedIn();

    // Add product to cart
    await homePage.addProductToCart(productName);
    await homePage.acceptAddToCartAlert();

    // Go to cart and checkout
    await homePage.goToCart();
    await cartPage.checkout({
      name: "John Doe",
      country: "USA",
      city: "New York",
      creditCard: "4111111111111111",
      month: "01",
      year: "2026",
    });
    await cartPage.verifyOrderSuccess();
  });

  // Negative case: Add to cart without login
  test("Edge case: add to cart without login", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goToBaseURL();
    await homePage.addProductToCart(productName);
    // Expect alert or redirect to login
    await homePage.acceptAddToCartAlert();
  });

  // Negative case: Checkout with empty cart
  test("Negative case: checkout with empty cart", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    await loginPage.goToBaseURL();
    await loginPage.openLoginModal();
    await loginPage.login(validCredentials.username, validCredentials.password);
    await loginPage.isLoggedIn();
    await homePage.goToCart();
    await cartPage.checkoutExpectFailure();
  });
});
