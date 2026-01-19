import { expect, Page } from '@playwright/test';
import { waitLocator } from '../utils/waitUtils';
import { getStringLocator } from '../utils/locatorUtils';
import { BasePage } from './BasePage';

const url = process.env.BASE_URL || '';
export class LoginPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async navigateToPage(): Promise<void> {
        await this.page.goto(url);
    }

    async isLoginSuccessful(): Promise<void> {
        await expect.soft(this.page.locator(getStringLocator('Đăng Nhập', "", 'Verify'))).toBeVisible();
    }

    async closePopUpIfExists(): Promise<void> {
        await this.clickIfExists(getStringLocator('Đăng Nhập', "", 'ClosePopup'));
    }

    async openLoginFormIfExists(): Promise<void> {
        await this.clickIfExists(getStringLocator('Đăng Nhập', "", 'SignIn'));
    }

    async submitUserAndPassword(username: string, password: string): Promise<void> {
        await this.fillIfExists(getStringLocator('Đăng Nhập', "", 'UserName'), username);
        await this.fillIfExists(getStringLocator('Đăng Nhập', "", 'Password'), password);
        await this.clickIfExists(getStringLocator('Đăng Nhập', "", 'Submit'));
    }
}
