import { Page } from "@playwright/test";

/**
 * wait for a new tab to be opened. Should use Promsise.all to run with the previous action that opens the new tab
 * @param page 
 * @returns 
 */
export const waitNewTab = async (page: Page): Promise<Page> => {
    const newPage = await page.context().waitForEvent('page');
    return newPage;
}