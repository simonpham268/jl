# Playwright Test Automation Framework Guide

## Core Rules

1. Generate Playwright tests using best practices
2. If locator unstable, propose 2-3 alternative locators
3. No `expect` between steps unless required in scenario
4. No exported wait methods — keep private, call before actions
5. Wrap ALL page methods in `test.step()`:
   ```typescript
   async methodName(): Promise<void> {
     await test.step('Descriptive step name', async () => { /* impl */ });
   }
   ```
6. Use robust locator strategies with multiple fallback selectors
7. Handle edge cases with try-catch and graceful fallbacks
8. Silent fallback — no `console.debug/log` in catch blocks
9. Return data from page methods for test verification when needed
10. ALL locators as `readonly` properties in constructor, never in methods
11. Arrays/selector strategies as class properties, never in methods
12. Check existing pages in relevant folders before creating new files (e.g., `src/pages/Jobs/`, `src/pages/Customers/`). Reuse/extend existing methods. Only create new files if functionality doesn't exist
13. Always re-read source files when regenerating — ensure 100% compliance
14. When user attaches `.md` files with "generate test script": follow ALL attached files STRICTLY (test cases, framework guidelines, intent-mapping). Attached docs override defaults. Never deviate
15. Auto-generate test header: `/** ID: {id} Tags: {tags} */ test('[TC{id}] @{tag} @Regression: {desc}', ...)`
16. Use Data Builder pattern — import from `data/uiData/`
17. Use high-level `createNewEntity(data)` instead of individual field methods
18. **API services for preconditions** — 3 methods:
    ```typescript
    // Method 1: Basic (env-based, no specific fields)
    const job = await jobService.createJob(createBasicApiJobData());
    // Method 2: Builder (specific fields mentioned in test case)
    const job = await jobService.createJob(
      ApiJobDataBuilder.create().description('Fix AC').priority('High').build()
    );
    // Method 3: Complex Builder (many custom fields)
    const job = await jobService.createJob(
      ApiJobDataBuilder.create().description('Emergency').priority('Critical')
        .custom('Key', 'Value').build()
    );
    // Response: response.body.Id, response.body.redirectUrl, response.body.AdditionalData
    ```
    | Scenario | Pattern |
    |----------|---------|
    | No specific fields | `createBasicApi*Data()` |
    | Specific field values | `Api*DataBuilder.create().field().build()` |
    | Many custom fields | `Api*DataBuilder.create().field().custom().build()` |
    Services: `customerService`, `siteService`, `assetService`, `jobService`, `quoteService`, `ppmQuoteService`
19. NEVER add `test.step` wrappers in spec files — page methods already wrap internally. Call directly
20. **MANDATORY login in ALL specs:**
    ```typescript
    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      await loginPage.goToBaseURL();
    });
    ```
    Import from `'@playwright/test'` or `'../fixtures/combined.fixture'`. Never skip
21. MANDATORY live application access (`BASE_URL` from `.env.uat`) before suggesting locators. Inspect real DOM. Never guess selectors
22. ALL interactions encapsulated in page object methods. NEVER use `page.getByRole()`, `page.locator()`, `page.click()` directly in specs
23. **Context ownership** — place methods in the page that contains/displays the element. Element Location → Workflow Ownership → Context Responsibility → Navigation Boundary. Never put business logic in BasePage
24. No comments in specs — no `// Step X:`, no `// Expected:`. Page method names + `test.step()` are self-documenting

---

## Code Style (ESLint)

| Rule | Example |
|------|---------|
| `semi` | `const x = 1;` |
| `quotes` (single) | `'hello'` |
| `indent` (2 spaces) | |
| `comma-spacing` | `foo(a, b)` |
| `space-infix-ops` | `x = 1` |
| `keyword-spacing` | `if (x)` |
| `object-curly-spacing` | `{ a: 1 }` |
| `arrow-spacing` | `(a) => a` |
| No trailing spaces, no multiple empty lines, no space before `()` or `.` |

---

## Project Structure

```
src/
├── api/
│   ├── base/          ApiClient.ts, ApiResponse.ts
│   ├── config/        api.config.ts
│   ├── data/          API test data
│   ├── endpoints/     {asset,customer,job,ppm-quote,quote,site}.endpoints.ts
│   ├── models/        {Asset,Customer,Job,PPMQuote,Quote,Site}.ts
│   └── services/      {Asset,Customer,Job,PPMQuote,Quote,Site}Service.ts
├── constants/         errorMessages.ts, httpStatus.ts
├── data/
│   ├── apiData/       {asset,customer,job,ppm,quote,site}.api.data.ts
│   └── uiData/        {asset,batchInvoice,customer,customerGroupedInvoice,job,ppm,quote,site,stockPO,stockReorder}.data.ts
├── fixtures/          combined.fixture.ts (API services + Azure DevOps on CI)
├── pages/             {Assets,Customers,Engineers,FormsLogbook,Invoices,Jobs,PPM,Purchasing,Quotes,Refcom,Reports,Settings,Sites,Stock}/ + BasePage, HomePage, LoginPage, Sidebar
├── tests/             Test specifications
├── utils/             auth.ts, date.util.ts, require.env.ts, tab.ts, azured-devops/, jira/
├── globalSetup.ts
└── globalTeardown.ts
```

---

## Data Builder Pattern

```typescript
// Template: Interface + Builder + generateUniqueName()
export interface EntityData { required1: string; optional1?: string; }
export class EntityBuilder {
  private data: EntityData;
  private constructor(r1: string) { this.data = { required1: r1 }; }
  static create(r1: string): EntityBuilder { return new EntityBuilder(r1); }
  optional1(v: string): EntityBuilder { this.data.optional1 = v; return this; }
  build(): EntityData { return { ...this.data }; }
}

// Usage
const jobData = JobBuilder.create('Customer A', 'Site A', 'Fix AC')
  .jobType('Maintenance').priorityLevel('High').build();
```

Page methods: `createNewEntity(data)` (fill + save), `fillNewEntityForm(data)` (fill only)

| Builder | Required Fields | File |
|---------|----------------|------|
| `CustomerBuilder` | customerName | customer.data.ts |
| `SiteBuilder` | customerName, siteName | site.data.ts |
| `AssetBuilder` | customer, site, description | asset.data.ts |
| `JobBuilder` | customerName, siteName, description | job.data.ts |
| `QuoteBuilder` | customer, site, description | quote.data.ts |
| `PPMBuilder` | customer, site, description, contractType | ppm.data.ts |
| `CustomerGroupedInvoiceBuilder` | customer, jobNumbers[] | customerGroupedInvoice.data.ts |
| `BatchInvoiceBuilder` | startDate, endDate, jobNumbers[] | batchInvoice.data.ts |
| `StockPOBuilder` | stockDeliveryLocation, supplier | stockPO.data.ts |
| `StockReorderBuilder` | stockIndices[] | stockReorder.data.ts |

---

## Page Object Model

Principles: one PO per page, `readonly` locators in constructor, actions only (no assertions), extend `BasePage`

Locator priority: Role-based → Data attributes → ID → CSS with fallbacks → Text (last resort)

```typescript
export class SamplePage extends BasePage {
  readonly emailInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = this.page.locator('input[type="email"], input[name*="email" i], #email');
    this.submitButton = this.page.getByRole('button', { name: /submit|save/i });
  }

  async fillEmail(email: string): Promise<void> {
    await test.step(`Fill email: ${email}`, async () => { await this.emailInput.fill(email); });
  }

  async submit(): Promise<void> {
    await test.step('Submit form', async () => {
      await this.submitButton.click();
      await this.page.waitForURL('**/success/**', { timeout: this.navigationTimeout });
    });
  }
}
```

**BasePage utilities:** `getText(locator)`, `getAttribute(locator, name)`, `waitForLocatorToDisappear(locator)`
**Timeouts:** `elementTimeout` (5s), `navigationTimeout` (60s), `waitDisappearTimeout` (10s) — from `.env.uat`

---

## Test Case Documentation Format

```markdown
# [Test Case Title]
## ID: {testCaseId}
## Tags
- {tag1}
- {tag2}
## Test Steps
Step 1: {action}
Step 2: {action}
   Expected: {result}
```

---

## Test Patterns

```typescript
// UI-only test (import from '@playwright/test')
import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
test.describe('Feature', () => {
  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToBaseURL();
  });
  test('[TC001] @Smoke @Regression: Workflow', async ({ page }) => {
    await sidebar.navigateTo('Jobs', 'Log Job');
  });
});

// API+UI test (import from '../fixtures/combined.fixture')
// Azure DevOps result push only on CI (CI=true or TF_BUILD=True)
test('[TC12345] @Regression: API precondition + UI', async ({ customerService }) => {
  const resp = await customerService.createCustomer({ Name: `Auto ${Date.now()}` });
  await detailsPage.navigateTo(resp.body.redirectUrl);
});
```

---

## Essential Commands

```bash
npx playwright test                          # Run all
npx playwright test profile.spec.ts          # Single file
npx playwright test --grep "login"           # Filter
npx playwright test --headed / --debug       # Debug
npx playwright test --workers=4              # Parallel
npx playwright test --reporter=allure-playwright  # Allure
```

## Common Issues

| Issue | Fix |
|-------|-----|
| Element timeout | Check locator in DevTools, add `waitForURL()`, use `.first()` |
| Auth failures (401/403) | Verify token in `loadAuthData()`, check API base URL |
| Env vars not loaded | Ensure `.env.uat` exists, call `dotenv.config()` before `requireEnv()` |
| Intermittent failures | Use proper waits (not `waitForTimeout()`), check race conditions, use `test.describe.serial()` |

## References
- [Playwright Docs](https://playwright.dev) · [POM](https://playwright.dev/docs/pom) · [Best Practices](https://playwright.dev/docs/best-practices)
- [Intent Mapping Rules](./intent-mapping.md)
