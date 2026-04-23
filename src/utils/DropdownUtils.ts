import type { Locator, Page } from '@playwright/test';

export async function sendKeyAndSelectItemOnDropdown(
  page: Page,
  textBoxSelector: Locator,
  optionItemSelector: Locator,
  text: string,
  textSelected?: string,
  isDelay: boolean = false,
  textBoxFocusedSelector?: string
): Promise<void> {
  // Step 1: click and sendkey on the textbox
  let textBoxElement: Locator = textBoxSelector;
  try {
    await textBoxElement.scrollIntoViewIfNeeded();
    await textBoxElement.click();
    await page.waitForTimeout(100);

    if (textBoxFocusedSelector != null)
      textBoxElement = page.locator(textBoxFocusedSelector);

    await textBoxElement.clear();
    if (isDelay) {
      await textBoxElement.pressSequentially(text, { delay: 100 });
    } else {
      await textBoxElement.pressSequentially(text);
    }
  } catch (error) {
    throw new Error(`[DropdownUtils] Step 1 failed - could not click/type into textbox with text "${text}": ${error}`);
  }

  // Step 2: find option by text and click
  const rawMatch = textSelected ?? text;
  const matchText = rawMatch.length < 30 ? rawMatch : rawMatch.substring(0, 30);
  const optionLocator = optionItemSelector.filter({ hasText: matchText });

  try {
    await optionLocator.first().waitFor({ state: 'visible', timeout: 10000 });
  } catch (error) {
    throw new Error(`[DropdownUtils] Step 2 failed - option with text "${matchText}" did not appear within 10s: ${error}`);
  }

  try {
    await optionLocator.first().scrollIntoViewIfNeeded();
    await optionLocator.first().click();
  } catch (error) {
    throw new Error(`[DropdownUtils] Step 2 failed - could not click option with text "${matchText}": ${error}`);
  }
}
