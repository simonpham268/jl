# TypeScript Playwright Automation Project

This project is a browser automation framework using [Playwright](https://playwright.dev/) with TypeScript. It is structured for scalable, maintainable end-to-end (E2E) testing, and includes utilities, flows, page object models, and Google Sheets reporting integration.

## Project Structure

```
ts/
├── package.json                # Project dependencies and scripts
├── playwright.config.ts        # Playwright configuration
├── src/
│   ├── globalSetup.ts          # Global setup for Playwright
│   ├── data/                   # Test data files
│   ├── flows/                  # Business logic flows
│   │   ├── commonflow.ts
│   │   └── homeflow.ts
│   ├── google/
│   │   └── googleapis-services.json
│   ├── locators/               # Element locator files
│   │   ├── bachkhoalocators.json
│   │   └── dongalocators.json
│   ├── pages/                  # Page Object Model classes
│   │   ├── BasePage.ts
│   │   ├── HomePage.ts
│   │   └── LoginPage.ts
│   ├── tests/                  # Test specs
│   │   └── example.spec.ts
│   └── utils/                  # Utility functions
│       ├── locatorUtils.ts
│       ├── tabUtils.ts
│       ├── waitUtils.ts
│       └── googleUtils.ts      # Google Sheets reporting integration
├── storage/
│   └── auth.json               # Storage state for authentication
├── allure-results/             # Allure test results (generated)
├── playwright-report/          # Playwright HTML reports (generated)
├── test-results/               # Test result artifacts (generated)
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)

### Install Dependencies
```bash
npm install
```

### Run Tests
- Run all tests:
  ```bash
  npx playwright test
  ```
- Run with a specific browser (example: Chrome):
  ```bash
  npm run chrome:donga
  ```

### Generate and View Reports
- After running tests, view the Playwright report:
  ```bash
  npx playwright show-report
  ```
- Allure results are in the `allure-results/` folder (if configured).

## Key Concepts
- **Page Object Model (POM):** Encapsulates page structure and actions in `src/pages/`.
- **Flows:** Business logic and user flows in `src/flows/`.
- **Locators:** Centralized element selectors in `src/locators/`.
- **Utils:** Reusable utility functions in `src/utils/`.
- **Google Sheet Integration:** `src/utils/googleUtils.ts` enables sending test reports to Google Sheets using the Google Sheets API for automated reporting.

## Customization
- Add new tests in `src/tests/`.
- Add new pages in `src/pages/` and update locators as needed.
- Update Playwright settings in `playwright.config.ts`.
- Configure Google Sheets integration in `src/utils/googleUtils.ts` and `src/google/googleapis-services.json` for automated report uploads.

## Google Sheets Integration

`src/utils/googleUtils.ts` enables sending test results to a Google Sheet for centralized reporting. The integration uses the Google Sheets API.

### Setup Google Sheets Integration
1. **Google API Credentials:**
   - Place your Google API service account credentials in `src/google/googleapis-services.json`.
2. **Configure Sheet Details:**
   - Update `googleUtils.ts` with your target Google Sheet ID and range.
3. **Send Report Example:**
   - After your tests, call the reporting function in `googleUtils.ts` to upload results:
     ```ts
     import { sendReportToGoogleSheet } from './utils/googleUtils';
     // ...after tests
     await sendReportToGoogleSheet(reportData);
     ```

### Notes
- Ensure your Google service account has access to the target Google Sheet.
- Refer to comments in `googleUtils.ts` for usage details and customization.

## License
This project is for internal use. Add a license if distributing externally.
