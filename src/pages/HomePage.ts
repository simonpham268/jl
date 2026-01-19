import { Page } from '@playwright/test';
import { getStringLocator } from '../utils/locatorUtils';
import { BasePage } from './BasePage';
import { waitLocator } from '../utils/waitUtils';

const url = process.env.BASE_URL || 'https://net88.com/';

export class HomePage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  async navigateToPage(): Promise<void> {
    console.log(url);
    await this.page.goto(url);
  }

  async search(): Promise<void> {
    await this.clickIfExists(getStringLocator('Homepage', 'Tìm Kiếm', 'Step_1'));
    await this.clickIfExists(getStringLocator('Homepage', 'Tìm Kiếm', 'Step_2'));
    await waitLocator(this.page.locator(getStringLocator('Homepage', 'Tìm Kiếm', 'LoadingIcon')), 'hidden');
    await this.clickIfExists(getStringLocator('Homepage', 'Tìm Kiếm', 'Step_3'));
  }

  async logout(): Promise<void> {
    await this.clickIfExists(getStringLocator('Đăng Xuất', '', 'Avatar'));
    await this.clickIfExists(getStringLocator('Đăng Xuất', '', 'Logout'));
  }

  async closePopUpIfExists(): Promise<void> {
    this.clickIfExists(getStringLocator('Đăng Nhập', "", 'ClosePopup'));
  }

}
