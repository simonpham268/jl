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
12. **Check existing pages in relevant folders before creating new files** - Before creating new page objects, always check existing pages in relevant folders:
    - For Job-related features → Check `src/pages/Jobs/` folder first
    - For Customer-related features → Check `src/pages/Customers/` folder first  
    - For Asset-related features → Check `src/pages/Assets/` folder first
    - Look for existing methods that can be reused or extended
    - Only create new files if functionality doesn't exist
13. **Always re-read source files when regenerating - ensure 100% compliance**
14. **When user attaches .md files with "generate test script" command - follow ALL attached files STRICTLY:**
    - If user attaches test case .md files → Implement every step exactly as documented
    - If user attaches framework guidelines → Follow every rule and pattern precisely  
    - If user attaches intent-mapping → Use exact method mappings specified
    - If user attaches multiple .md files → Combine and follow ALL requirements from ALL files
    - NEVER deviate from attached documentation - it overrides default behavior
    - Example: `generate test script` + test-case-45291.md + generate-prompt.md + intent-mapping.md = Follow ALL 3 files strictly
15. **Auto-generate tests with ID and tags header in this format:**
    ```typescript
    /**
     * ID: {testCaseId}
     * Tags: {tag1}, {tag2}, {tag3}, {tag4}, {tag5}
     */
    test('[TC{testCaseId}] @{primaryTag} @Regression: {testDescription}', async ({ page }) => {
    ```
16. **Use Data Builder pattern for test data creation** - Import from `data/uiData/`
17. **Use high-level creation methods** (`createNewEntity(data)`) instead of calling individual field methods
18. **Use API services for preconditions** - If scenario has preconditions like "use API to create Job/Quote/Customer/Site/Asset", inject the corresponding service and call it:
    ```typescript
    // Add service to test parameters
    test('[TC12345] @Regression: Test with precondition', async ({ page, jobService, customerService }) => {
      // Case 1: No specific fields mentioned -> use REQUIRED fields only
      const jobData = {
        CustomerId: 123,
        SiteId: 456,
        Description: 'Auto Test Job'
      };
      const jobResponse = await jobService.createJob(jobData);
      
      // Case 2: Specific fields mentioned -> use REQUIRED + OPTIONAL fields
      // User will modify values later
      const customerData = {
        // Required
        Name: 'Auto Customer',
        // Optional (mentioned in scenario)
        Email: 'test@example.com',
        Phone: '0123456789',
        Address: '123 Test Street'
      };
      const customerResponse = await customerService.createCustomer(customerData);
      
      // Use response data for UI navigation/verification
      // Suggest: response.body.redirectUrl - Navigate to created entity
      // Suggest: response.body.AdditionalData - Get entity details
      // Suggest: response.body.Id - Use ID for subsequent operations
      const jobId = jobResponse.body.Id;
      const redirectUrl = jobResponse.body.redirectUrl;
      
      // Navigate to created entity in UI
      await page.goto(redirectUrl);
    });
    ```
    **Available services:** `customerService`, `siteService`, `assetService`, `jobService`, `quoteService`, `ppmQuoteService`
    
    **Common response fields for UI:**
    - `response.body.Id` - Entity ID for lookups
    - `response.body.redirectUrl` - Direct URL to navigate to created entity
    - `response.body.AdditionalData` - Extra data like reference numbers, codes

19. **NEVER add test.step wrappers in spec files** - Page methods already have `test.step` internally. In spec files, call page methods directly without additional wrapping:
    ```typescript
    // **WRONG** - Redundant test.step wrapper
    await test.step('Navigate to jobs', async () => {
      await sidebar.navigateTo('Jobs', 'All Jobs'); // This method already has test.step inside
    });
    
    // **CORRECT** - Call page method directly  
    await sidebar.navigateTo('Jobs', 'All Jobs'); // Method handles test.step internally
    
    // **WRONG** - Double wrapping
    await test.step('Complete job', async () => {
      await jobDetailsPage.clickCompleteJob(); // Already wrapped internally
      await jobDetailsPage.waitForCompleteJobPopup(); // Already wrapped internally
    });
    
    // **CORRECT** - Direct method calls
    await jobDetailsPage.clickCompleteJob();
    await jobDetailsPage.waitForCompleteJobPopup();
    ```

20. **MANDATORY login setup in ALL spec files** - Every test spec must include LoginPage in beforeEach with goToBaseURL():
    ```typescript
    import { test, expect } from '@playwright/test'; // or '../fixtures/combined.fixture'
    import { LoginPage } from '../pages/LoginPage';
    
    test.describe('Feature Tests', () => {
      let loginPage: LoginPage;
      
      test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goToBaseURL();
      });
      
      test('TC_001: Test description', async ({ page }) => {
        // Test implementation - user already authenticated
      });
    });
    ```
    
    **Enforcement rules:**
    - **MUST** declare `loginPage` variable in describe block
    - **MUST** initialize LoginPage in beforeEach 
    - **MUST** call `await loginPage.goToBaseURL()` in beforeEach
    - **MUST** import LoginPage from correct path
    - **NEVER** skip login setup - every spec needs authentication
    - **NEVER** use different authentication patterns

21. **MANDATORY live application access for accurate locators** - When no specific agent is selected OR when using "playwright-test-generator" agent, MUST access the live application to get accurate selectors:
    ```typescript
    // Agent must navigate to BASE_URL from .env.uat before suggesting locators
    // BASE_URL=https://jluateventbasedjlweb.azurewebsites.net
    
    // Step 1: Access live application
    await page.goto(process.env.BASE_URL || 'https://jluateventbasedjlweb.azurewebsites.net');
    
    // Step 4: Generate locators based on REAL DOM structure
    const actualElements = await page.locator('role=button').all();
    ```
    
    **Enforcement rules:**
    - **MUST** access BASE_URL from .env.uat file before generating locators
    - **MUST** inspect actual DOM elements on live application
    - **MUST** suggest locators based on REAL element structure
    - **MUST** verify element visibility and accessibility on live page
    - **NEVER** guess or assume element selectors without live verification
    - **NEVER** use generic locators without testing on actual application
    ```

22. **Page Object Model action encapsulation** - ALL user interactions must be encapsulated in page object methods, NEVER use direct page actions in test specs:
    ```typescript
    // WRONG: Direct page actions in test spec
    test('Complete job', async ({ page }) => {
      await page.getByRole('button', { name: 'Complete' }).click();
    });
  
    ```
    
    **Enforcement rules:**
    - **NEVER** use `page.getByRole()`, `page.locator()`, `page.click()` etc. directly in test specs
    - **ALWAYS** create dedicated methods in appropriate page objects for all interactions
    - **MUST** add missing methods to page objects when encountered
    - **MUST** use descriptive method names that express user intent
    ```

23. **Page Object context ownership principle** - Methods should be placed in page objects with context ownership - methods should be located in the page where users interact and can see those elements:
    ```typescript
    // ✅ CORRECT: Method in page that contains the element
    // JobDetailsPage.ts - Complete Job button is on Job Detail page  
    async clickCompleteJob(): Promise<void> {
      await this.completeJobButton.click();
    }
    
    // ✅ CORRECT: Dialog method in page that initiates dialog
    // JobDetailsPage.ts - Complete dialog appears from Job Detail page
    async confirmCompleteJob(): Promise<void> {
      await this.page.getByRole('button', { name: 'Complete' }).click();
    }
    ```
    
    **Context ownership rules:**
    - **Element Location Rule**: Method should be in the page that contains the element
    - **Workflow Ownership Rule**: Workflow belongs to the page that initiates it
    - **Context Responsibility Rule**: The page that displays content is responsible for it  
    - **Navigation Boundary Rule**: Whoever navigates is responsible for it
    - **NEVER** place methods in pages without visual context with elements
    - **NEVER** place business logic in BasePage (only for utilities)
    ```

24. **No comments in test specifications** - Test spec files should NOT contain step comments since page methods already have descriptive test.step names:
    ```typescript
    // ❌ WRONG: Comments in spec file
    test('Complete job workflow', async ({ page }) => {
      // Step 2: User navigate to all jobs
      await sidebar.navigateTo('Jobs', 'All Jobs');
      
      // Step 3: User click 'Open' tab and then select jobNo = M0000264
      await allJobsPage.switchToTab('Open');
      await allJobsPage.clickJobByJobNo('M0000264');
      
      // Step 4: User select Complete Job
      //         Expected: show complete job pop-up
      await jobDetailsPage.clickCompleteJob();
    });
    
    // ✅ CORRECT: Clean spec without comments
    test('Complete job workflow', async ({ page }) => {
      await sidebar.navigateTo('Jobs', 'All Jobs');
      await allJobsPage.switchToTab('Open');
      await allJobsPage.clickJobByJobNo('M0000264');
      await jobDetailsPage.clickCompleteJob();
    });
    ```
    
    **Reasoning:**
    - Page methods already contain descriptive `test.step()` names
    - Test steps are documented in test case .md files
    - Comments make specs verbose and harder to maintain
    - Page object method names should be self-documenting
    
    **Enforcement rules:**
    - **NEVER** add `// Step X:` comments in test specs
    - **NEVER** add `// Expected:` comments in test specs
    - **NEVER** add action description comments in test specs
    - **ONLY** exception: Complex business logic explanations (rare)
    ```

---

## Code Style Rules (ESLint)

Follow these formatting rules strictly when generating code:

| Rule | Description | Example |
|------|-------------|---------|
| `semi` | Require semicolons at end of statements | `const x = 1;` |
| `quotes` | Use single quotes | `'hello'` |
| `indent` | 2 spaces indentation | |
| `no-trailing-spaces` | No trailing spaces at end of lines | |
| `no-multiple-empty-lines` | Maximum 1 empty line | |
| `comma-spacing` | Space after comma | `foo(a, b)` |
| `space-infix-ops` | Space around operators | `x = 1` |
| `keyword-spacing` | Space after keywords | `if (x)` |
| `object-curly-spacing` | Space inside `{}` | `{ a: 1 }` |
| `arrow-spacing` | Space around `=>` | `(a) => a` |
| `func-call-spacing` | No space before `()` | `test()` |
| `no-multi-spaces` | No multiple consecutive spaces | `x = 1` |
| `no-whitespace-before-property` | No space around `.` | `obj.method()` |

**Quick Reference:**
```typescript
// Correct
const name = 'John';
const obj = { a: 1, b: 2 };
if (condition) {
  return true;
}
const fn = (a, b) => a + b;
await page.click();

// Wrong
const name = "John"    // double quotes, no semicolon
const obj = {a:1,b:2}  // no spaces
if(condition){         // no space after if
  return true
}
const fn = (a,b)=>a+b  // no spaces around arrow/comma
await page .click()    // space before property
```

---

## Project Structure

```
src/
├── api/                    # API layer
│   ├── base/               # Base API client and response classes
│   │   ├── ApiClient.ts
│   │   └── ApiResponse.ts
│   ├── config/             # API configuration
│   │   └── api.config.ts
│   ├── data/               # API test data
│   ├── endpoints/          # API endpoint definitions
│   │   ├── asset.endpoints.ts
│   │   ├── customer.endpoints.ts
│   │   ├── job.endpoints.ts
│   │   ├── ppm-quote.endpoints.ts
│   │   ├── quote.endpoints.ts
│   │   ├── site.endpoints.ts
│   │   └── index.ts
│   ├── models/             # API models
│   │   ├── Asset.ts
│   │   ├── Customer.ts
│   │   ├── Job.ts
│   │   ├── PPMQuote.ts
│   │   ├── Quote.ts
│   │   ├── Site.ts
│   │   └── index.ts
│   └── services/           # API service classes
│       ├── AssetService.ts
│       ├── CustomerService.ts
│       ├── JobService.ts
│       ├── PPMQuoteService.ts
│       ├── QuoteService.ts
│       ├── SiteService.ts
│       └── index.ts
├── constants/              # Application constants (errorMessages, httpStatus)
├── data/                   # Test data layer
│   └── testData/           # Data builders (Builder pattern)
│       ├── asset.data.ts
│       ├── batchInvoice.data.ts
│       ├── customer.data.ts
│       ├── customerGroupedInvoice.data.ts
│       ├── job.data.ts
│       ├── ppm.data.ts
│       ├── quote.data.ts
│       ├── site.data.ts
│       ├── stockPO.data.ts
│       ├── stockReorder.data.ts
│       └── index.ts        # Barrel exports
├── fixtures/               # Playwright fixtures
│   └── combined.fixture.ts # API services + Azure DevOps integration (CI only)
├── pages/                  # Page Objects (organized by domain)
│   ├── Assets/
│   ├── Customers/
│   ├── Engineers/
│   ├── FormsLogbook/
│   ├── Invoices/
│   ├── Jobs/
│   ├── PPM/
│   ├── Purchasing/
│   ├── Quotes/
│   ├── Refcom/
│   ├── Reports/
│   ├── Settings/
│   ├── Sites/
│   ├── Stock/
│   ├── BasePage.ts         # Base class with utilities
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   ├── Sidebar.ts
│   └── index.ts            # Barrel exports
├── tests/                  # Test specifications
│   └── api/                # API tests
├── utils/                  # Utilities
│   ├── azured-devops/      # Azure DevOps integration
│   ├── jira/               # Jira integration
│   ├── auth.ts
│   ├── date.util.ts
│   ├── require.env.ts
│   └── tab.ts
├── globalSetup.ts
└── globalTeardown.ts
```

---

## Data Builder Pattern

Test data is managed using the Builder pattern with fluent API for creating test data objects.

### Data Builder Template

```typescript
/**
 * Entity Data Module
 * Builder pattern for creating test data for EntityPage
 */

export interface EntityData {
  requiredField1: string;
  requiredField2: string;
  optionalField1?: string;
  optionalField2?: string[];
}

export class EntityBuilder {
  private data: EntityData;

  private constructor(requiredField1: string, requiredField2: string) {
    this.data = {
      requiredField1,
      requiredField2
    };
  }

  static create(requiredField1: string, requiredField2: string): EntityBuilder {
    return new EntityBuilder(requiredField1, requiredField2);
  }

  optionalField1(value: string): EntityBuilder {
    this.data.optionalField1 = value;
    return this;
  }

  optionalField2(values: string[]): EntityBuilder {
    this.data.optionalField2 = values;
    return this;
  }

  build(): EntityData {
    return { ...this.data };
  }
}

// Helper functions
export function generateUniqueName(prefix: string = 'Auto'): string {
  return `${prefix} - ${Date.now()}`;
}
```

### Using Data Builders in Tests

```typescript
import { JobBuilder, generateDescription } from '../data/uiData/job.data';

// Simple creation with required fields only
const jobData = JobBuilder.create('Customer A', 'Site A', 'Fix AC').build();

// With additional fields using fluent API
const jobData = JobBuilder.create('Customer A', 'Site A', 'Fix AC')
  .jobType('Maintenance')
  .priorityLevel('High')
  .engineer('John Doe')
  .tags(['Urgent', 'HVAC'])
  .build();

// With generated unique values
const jobData = JobBuilder.create('Customer A', 'Site A', generateDescription('Test Job'))
  .referenceNumber(generateRefNumber())
  .build();
```

### High-Level Page Methods

Each page with creation forms should have:
- `createNewEntity(data)` - Fill form and save
- `fillNewEntityForm(data)` - Fill form only (no save)

```typescript
// In Page Object
async createNewJob(data: JobData): Promise<void> {
  await test.step('Create new Job', async () => {
    await this.fillNewJobForm(data);
    await this.clickSave();
  });
}

async fillNewJobForm(data: JobData): Promise<void> {
  await test.step('Fill new Job form', async () => {
    await this.selectCustomer(data.customerName);
    await this.selectSite(data.siteName);
    await this.fillDescription(data.description);
    if (data.jobType) await this.selectJobType(data.jobType);
    // ... other optional fields
  });
}
```

### Available Data Builders

| Builder | Required Fields | File |
|---------|----------------|------|
| `CustomerBuilder` | customerName | customer.data.ts |
| `SiteBuilder` | customerName, siteName | site.data.ts |
| `AssetBuilder` | customer, site, description | asset.data.ts |
| `JobBuilder` | customerName, siteName, description | job.data.ts |
| `QuoteBuilder` | customer, site, description | quote.data.ts |
| `PPMBuilder` | customer, site, description (+ contractType) | ppm.data.ts |
| `CustomerGroupedInvoiceBuilder` | customer, jobNumbers[] | customerGroupedInvoice.data.ts |
| `BatchInvoiceBuilder` | startDate, endDate, jobNumbers[] | batchInvoice.data.ts |
| `StockPOBuilder` | stockDeliveryLocation, supplier | stockPO.data.ts |
| `StockReorderBuilder` | stockIndices[] | stockReorder.data.ts |

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
// Multiple fallback selectors
readonly element = this.page.locator(
  '[data-testid="element"], #element, .element, button:has-text("Element")'
).first();

// Role-based (preferred)
readonly button = this.page.getByRole('button', { name: /submit/i });

// Multiple strategies using class property
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
import { Sidebar } from '../pages/Sidebar';

test.describe('Feature Tests', () => {
  let loginPage: LoginPage;
  let sidebar: Sidebar;
  
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToBaseURL();
    sidebar = new Sidebar(page);
  });

  test('TC_001: Basic workflow', async ({ page }) => {
    // Test implementation using page objects - user already authenticated
    await sidebar.navigateTo('Jobs','Log Job');
  });
});
```

### Combined Fixture (API + UI + Azure DevOps)

Use `combined.fixture.ts` for tests that need both API services and UI interactions.
Azure DevOps result push only runs on CI (`CI=true` or `TF_BUILD=True`).

```typescript
import { test, expect } from '../fixtures/combined.fixture';
import { LoginPage } from '../pages/LoginPage';

test.describe('API + UI Tests', () => {
  let loginPage: LoginPage;
  
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToBaseURL();
  });
  
  /**
   * ID: 12345
   * Tags: Smoke, Regression
   */
  test('[TC12345] @Smoke @Regression: Create customer via API and verify in UI', async ({ 
    customerService, 
    siteService 
  }) => {
    // Create data via API (faster setup)
    const customerResponse = await customerService.createCustomer({ 
      Name: `Auto Customer ${Date.now()}` 
    });
    
    const siteResponse = await siteService.createSite({
      CustomerId: customerResponse.body.Id,
      CustomerName: 'Auto Customer',
      Name: 'Main Site'
    });
    
    // Verify in UI - user already authenticated via beforeEach
    
    // Result auto-pushed to Azure DevOps on CI
  });
});
```

**Available API Services in Fixture:**
- `customerService` - Customer CRUD
- `siteService` - Site CRUD  
- `assetService` - Asset CRUD
- `jobService` - Job CRUD
- `quoteService` - Quote CRUD
- `ppmQuoteService` - PPM Quote CRUD
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
- [Intent Mapping Rules](./intent-mapping.md) - Page-specific method mapping documentation
