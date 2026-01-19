import { expect, Page } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { getStringLocator } from "../utils/locatorUtils";
import { waitNewTab } from "../utils/tabUtils";

export const logoutFlow = async (page: Page) => {
    const homePage = new HomePage(page);
    await homePage.navigateToPage();
    await homePage.logout();
    await expect.soft(page.locator(getStringLocator('Đăng Xuất', '', 'Verify'))).toBeVisible();
}

export const registerFlow = async (page: Page) => {
    const homePage = new HomePage(page);
    await homePage.navigateToPage();
}

export const searchFlow = async (page: Page) => {
    const homePage = new HomePage(page);
    await homePage.navigateToPage();
    await homePage.closePopUpIfExists();
    const [_, newPage] = await Promise.all([
        homePage.search(),
        waitNewTab(page)
    ]);
    await expect.soft(newPage.locator(getStringLocator('Homepage', 'Tìm Kiếm', 'Verify'))).toBeVisible();
    await newPage.close();
    await page.bringToFront();
}

export const openLobbyThethaoFlow = async (page: Page) => {
    const homePage = new HomePage(page);
    await homePage.navigateToPage();
    await page.locator(getStringLocator('Homepage', 'Lobby Thể Thao', 'Step_1')).click();
    await expect.soft(page).toHaveURL(/\/the-thao\/?$/);
}