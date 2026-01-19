import { Page } from "@playwright/test";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToBaseURL() {
    const url = process.env.URL || "https://www.demoblaze.com/";
    if (!url) throw new Error("URL is not defined in environment variables");
    await this.page.goto(url);
  }

}
