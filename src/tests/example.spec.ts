import { test } from '@playwright/test';
import { openLobbyThethaoFlow, searchFlow } from '../flows/homeflow';

test.describe(`Test parallel on some flows of domain ${process.env.BRAND?.toLocaleLowerCase()}`, () => {

    test(`Search`, async ({ page }) => {
        await searchFlow(page);
    });

    test(`Lobby Game`, async ({ page }) => {
        await openLobbyThethaoFlow(page);
    });
});






