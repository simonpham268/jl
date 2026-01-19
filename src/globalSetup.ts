import { chromium } from "@playwright/test";
import fs from 'fs';
import { LoginPage } from "./pages/LoginPage";

const username = process.env.USRNAME || '';
const password = process.env.PASSWORD || '';

export default async function globalSetup() {
    const folders = ['allure-results', 'allure-report','storage'];
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);

    for (const folder of folders) {
        if (fs.existsSync(folder)) {
            fs.rmSync(folder, { recursive: true, force: true });
        }
    }

    await loginPage.navigateToPage();
    await loginPage.closePopUpIfExists();
    await loginPage.openLoginFormIfExists();
    await loginPage.submitUserAndPassword(username, password);
    await loginPage.isLoginSuccessful();
    await page.context().storageState({
        path: 'storage/auth.json',
    });

}