# Playwright Automation Project

This project is a Playwright-based automation framework for UI, API, and performance testing. It is organized for scalability and maintainability, with a clear separation of concerns and reusable utilities.

## Project Structure

```
playwright-auto/
├── package.json                # Project dependencies and scripts
├── playwright.config.ts        # Playwright configuration
├── src/
│   ├── globalSetup.ts          # Global setup for Playwright tests
│   ├── globalTeardown.ts       # Global teardown for Playwright tests
│   ├── data/
│   │   └── testData.ts         # Test data definitions
│   ├── flows/
│   │   ├── commonflow.ts       # Common test flows
│   │   └── homeflow.ts         # Home page specific flows
│   ├── google/
│   │   └── googleapis-services.json # Google API service definitions
│   ├── locators/               # Element locators (files not shown)
│   ├── pages/
│   │   ├── BasePage.ts         # Base page object
│   │   ├── CartPage.ts         # Cart page object
│   │   ├── HomePage.ts         # Home page object
│   │   └── LoginPage.ts        # Login page object
│   ├── tests/
│   │   ├── api/
│   │   │   └── apiRegression.spec.ts # API regression tests
│   │   ├── performance/
│   │   │   └── performance.spec.ts   # Performance tests
│   │   └── ui/
│   │       └── login.spec.ts         # UI login tests
│   └── utils/
│       ├── googleUtils.ts      # Google-related utilities
│       ├── reportUtils.ts      # Reporting utilities
│       ├── tabUtils.ts         # Tab management utilities
│       └── waitUtils.ts        # Wait utilities
├── allure-results/             # Allure test result files
├── test-results/               # Playwright test result files
```

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run tests:**
   ```sh
   npx playwright test
   ```
3. **View Allure reports:**
   - Generate and open the Allure report after running tests:
     ```sh
     npx allure serve allure-results
     ```

## Key Folders
- **src/pages/**: Page Object Model classes for UI automation.
- **src/flows/**: Common and feature-specific test flows.
- **src/tests/**: Test specifications for UI, API, and performance.
- **src/utils/**: Utility functions for various test operations.
- **src/data/**: Centralized test data.
- **allure-results/**: Allure test results for reporting.
- **test-results/**: Playwright's raw test results.

## Configuration
- **playwright.config.ts**: Main configuration for Playwright (browsers, test settings, etc).
- **globalSetup.ts / globalTeardown.ts**: Scripts for setup and teardown logic before/after all tests.

## Customization
- Add new page objects in `src/pages/` for new UI sections.
- Add new flows in `src/flows/` for reusable test steps.
- Add or update test data in `src/data/testData.ts`.
- Add new tests in the appropriate folder under `src/tests/`.

## Dependencies
- [Playwright](https://playwright.dev/)
- [Allure Reporter](https://docs.qameta.io/allure/)

---

Feel free to update this README as your project evolves!
