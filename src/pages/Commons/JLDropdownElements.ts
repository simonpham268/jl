import type { Locator, Page } from '@playwright/test';

export class JLDropdownElements {
  readonly jlDropdownOptions: Locator;

  constructor(page: Page) {
    this.jlDropdownOptions = page.locator('.jl__dropdown-option');
  }
}
