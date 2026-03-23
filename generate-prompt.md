# Playwright Test Automation Framework Guide

## Core Rules

1. **Generate Playwright tests using best practices**
2. **If locator unstable, propose 2-3 alternative locators**
3. **No expect between steps unless required in scenario**
4. **No exported wait methods - keep private and call before actions**
5. **Wrap all page methods in test.step:**
   ```typescript
   async methodName(): Promise<void> {
     await test.step('Descriptive step name', async () => {
       // method implementation
     });
   }
   ```
6. **Use robust locator strategies with multiple fallback selectors**
7. **Handle edge cases with try-catch blocks and graceful fallbacks**
8. **Silent fallback handling - no console.debug/log in catch blocks for selector strategies**
9. **Return data from page methods for test verification when needed**
10. **Declare ALL locators as readonly properties in constructor, never in methods**
11. **Move arrays/selector strategies to class properties, never in methods**
12. **Check for existing methods before creating duplicates**
13. **Always re-read source files when regenerating - ensure 100% compliance**
14. **Auto-generate tests with ID and tags header in this format:**
    ```typescript
    /**
     * ID: {testCaseId}
     * Tags: {tag1}, {tag2}, {tag3}, {tag4}, {tag5}
     */
    test('[TC{testCaseId}] @{primaryTag} @Regression: {testDescription}', async ({ page }) => {
    ```

---

## Project Structure

```
src/
├── pages/           # Page Objects extending BasePage
├── tests/           # Test specifications
├── fixtures/        # API fixtures and setup
├── utils/           # Utilities (requireEnv, auth, etc.)
├── api/services/    # API service classes
└── constants/       # Application constants
```

---

## Page Object Model

**Key Principles:**
- One page object per page/component
- Locators as readonly properties in constructor
- Actions only (no assertions)
- Descriptive method names
- Extend BasePage for utilities

### Page Object Template

```typescript
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { test } from '@playwright/test';

export class SamplePage extends BasePage {
  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly selectors: string[];

  constructor(page: Page) {
    super(page);
    
    // Multiple fallback selectors
    this.emailInput = this.page.locator(
      'input[type="email"], input[name*="email" i], #email'
    );
    this.submitButton = this.page.getByRole('button', { name: /submit|save/i });
    
    // Selector strategies as class properties
    this.selectors = ['selector1', 'selector2', 'selector3'];
  }

  async fillEmail(email: string): Promise<void> {
    await test.step(`Fill email: ${email}`, async () => {
      await this.emailInput.fill(email);
    });
  }

  async submit(): Promise<void> {
    await test.step('Submit form', async () => {
      await this.submitButton.click();
      await this.page.waitForURL('**/success/**', { timeout: this.navigationTimeout });
    });
  }

  async getEmailValue(): Promise<string | null> {
    return await test.step('Get email value', async () => {
      return await this.getAttribute(this.emailInput, 'value');
    });
  }
}
```

### Locator Strategy

**Priority Order:**
1. Role-based selectors (most stable)
2. Data attributes
3. ID selectors
4. CSS selectors with fallbacks
5. Text-based (last resort)

```typescript
// ✅ Multiple fallback selectors
readonly element = this.page.locator(
  '[data-testid="element"], #element, .element, button:has-text("Element")'
).first();

// ✅ Role-based (preferred)
readonly button = this.page.getByRole('button', { name: /submit/i });

// ✅ Multiple strategies using class property
readonly itemSelectors = ['selector1', 'selector2', 'selector3'];

async selectItem(): Promise<void> {
  for (const selector of this.itemSelectors) {
    try {
      const element = this.page.locator(selector).first();
      if (await element.isVisible()) {
        await element.click();
        return;
      }
    } catch { 
      // Continue to next selector silently (rule 8)
      continue; 
    }
  }
}
```

---

## BasePage Utilities

**Available Methods:**
- `getText(locator)` - Get text content
- `getAttribute(locator, name)` - Get attribute value
- `waitForLocatorToDisappear(locator)` - Wait for element to disappear

**Timeout Properties:**
```typescript
this.elementTimeout = process.env.TIMEOUT_ELEMENT || '5000';
this.navigationTimeout = process.env.TIMEOUT_NAVIGATION || '60000';
this.waitDisappearTimeout = process.env.TIMEOUT_WAIT_DISAPPEAR || '10000';
```

**Environment (.env.uat):**
```env
BASE_URL=https://app.example.com
USR=user@example.com
PWD=password123
TIMEOUT_ELEMENT=5000
TIMEOUT_NAVIGATION=60000
```

---

## Test Case Documentation Format

When generating test cases, always include ID and tags sections in this format:

```markdown
# [Test Case Title]

## ID: {testCaseId}
## Tags
- {tag1}
- {tag2}
- {tag3}
- {tag4}
- {tag5}

## Test Steps

Step 1: {action description}
Step 2: {action description}
   Expected: {expected result}
Step 3: {action description}
```

**Example:**
```markdown
# [Add Job] - Add Contact - Delete a new contact in list

## ID: 7884
## Tags
- Add Job
- auto-jlweb
- auto-jlweb-jobs
- Automated_Smoke_CL
- Automated-Smoke
- Automation-Reviewed
- auto-regression
- Jobs
- MR
- Regression
- VNET

## Test Steps

Step 1: Access JLWeb
Step 2: Click on "Job" the left menu
Step 3: Click on "Log Job" in the left menu
```

---

## Testing Patterns

### UI Test Structure

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { requireEnv } from '../utils/require.env';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.uat' });

test.describe('Feature Tests', () => {
  let loginPage: LoginPage;
  const baseUrl = requireEnv('BASE_URL');

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToBaseURL(baseUrl);
  });

  test('TC_001: Basic workflow', async ({ page }) => {
    // Test implementation using page objects
    await loginPage.navigateToFeature();
    await expect(page).toHaveURL('**/feature');
  });
});
```

## Essential Commands

```bash
# Run tests
npx playwright test
npx playwright test profile.spec.ts
npx playwright test --grep "login"

# Debug
npx playwright test --headed
npx playwright test --debug

# Parallel execution
npx playwright test --workers=4

# Reports
npx playwright test --reporter=allure-playwright
npx allure serve allure-results
```

## Common Issues & Solutions

**Element timeout:**
- Check locator with DevTools
- Add explicit wait: `page.waitForURL()`
- Use `.first()` for multiple elements

**Authentication failures (401/403):**
- Verify token in `loadAuthData()`
- Check API base URL and headers

**Environment variables not loaded:**
- Ensure `.env.uat` exists in project root
- Call `dotenv.config()` before `requireEnv()`

**Tests failing intermittently:**
- Use proper waits instead of `waitForTimeout()`
- Check for race conditions
- Use `test.describe.serial()` for dependent tests

## References
- [Playwright Documentation](https://playwright.dev)
- [Page Object Model](https://playwright.dev/docs/pom)
- [Best Practices](https://playwright.dev/docs/best-practices)
