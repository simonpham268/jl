import { Page } from '@playwright/test';
import { waitLocator } from '../utils/waitUtils';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickIfExists(stringLocator: string): Promise<void> {
        const locator = this.page.locator(stringLocator);
        if (stringLocator !== '' && await waitLocator(locator, 'visible')) {
            await locator.click();
        }
    }

    async fillIfExists(stringLocator: string, value: string): Promise<void> {
        const locator = this.page.locator(stringLocator);
        if (stringLocator !== '' && await waitLocator(locator, 'visible')) {
            await locator.fill(value);
        }
    }
}