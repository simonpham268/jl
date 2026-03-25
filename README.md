# Playwright Auto Draft Framework

## Framework Structure

```text
playwright-auto/
├─ .auth/                       # Authentication storage state
├─ .github/                     # CI/CD workflows (if available)
├─ .vscode/                     # VS Code settings
├─ allure-results/              # Allure test report results
├─ build/                       # Build outputs
├─ input/                       # Input files for test generation
├─ output/                      # Generated test case markdown files
├─ test-results/                # Playwright test results
├─ src/
│  ├─ api/
│  │  ├─ base/                  # API client foundation
│  │  │  ├─ ApiClient.ts        # HTTP client wrapper
│  │  │  └─ ApiResponse.ts      # Response type definitions
│  │  ├─ config/                # API configuration
│  │  │  └─ api.config.ts       # Default headers, timeouts
│  │  ├─ data/                  # API test data factories
│  │  ├─ endpoints/             # Endpoint URL definitions
│  │  │  ├─ asset.endpoints.ts
│  │  │  ├─ customer.endpoints.ts
│  │  │  ├─ job.endpoints.ts
│  │  │  ├─ ppm-quote.endpoints.ts
│  │  │  ├─ quote.endpoints.ts
│  │  │  ├─ site.endpoints.ts
│  │  │  └─ index.ts
│  │  ├─ models/                # API domain models
│  │  │  ├─ Asset.ts
│  │  │  ├─ Customer.ts
│  │  │  ├─ Job.ts
│  │  │  ├─ PPMQuote.ts
│  │  │  ├─ Quote.ts
│  │  │  ├─ Site.ts
│  │  │  └─ index.ts
│  │  └─ services/              # Service layer for API calls
│  │     ├─ AssetService.ts
│  │     ├─ CustomerService.ts
│  │     ├─ JobService.ts
│  │     ├─ PPMQuoteService.ts
│  │     ├─ QuoteService.ts
│  │     ├─ SiteService.ts
│  │     └─ index.ts
│  ├─ constants/                # Shared constants
│  │  ├─ errorMessages.ts       # Error message constants
│  │  └─ httpStatus.ts          # HTTP status codes
│  ├─ data/                     # Test data layer
│  │  └─ testData/              # Data builders (Builder pattern)
│  │     ├─ asset.data.ts
│  │     ├─ batchInvoice.data.ts
│  │     ├─ customer.data.ts
│  │     ├─ customerGroupedInvoice.data.ts
│  │     ├─ job.data.ts
│  │     ├─ ppm.data.ts
│  │     ├─ quote.data.ts
│  │     ├─ site.data.ts
│  │     ├─ stockPO.data.ts
│  │     ├─ stockReorder.data.ts
│  │     └─ index.ts
│  ├─ fixtures/                 # Playwright fixtures
│  │  └─ combined.fixture.ts    # API services + Azure DevOps (CI only)
│  ├─ pages/                    # Page Object Model for UI tests
│  │  ├─ Assets/
│  │  ├─ Customers/
│  │  ├─ Engineers/
│  │  ├─ FormsLogbook/
│  │  ├─ Invoices/
│  │  ├─ Jobs/
│  │  ├─ PPM/
│  │  ├─ Purchasing/
│  │  ├─ Quotes/
│  │  ├─ Refcom/
│  │  ├─ Reports/
│  │  ├─ Settings/
│  │  ├─ Sites/
│  │  ├─ Stock/
│  │  ├─ BasePage.ts            # Base page class
│  │  ├─ HomePage.ts            # Home page
│  │  ├─ LoginPage.ts           # Login page
│  │  ├─ Sidebar.ts             # Sidebar navigation
│  │  └─ index.ts               # Barrel exports
│  ├─ tests/
│  │  ├─ api/                   # API test specs
│  │  │  ├─ job.api.spec.ts
│  │  │  ├─ job.rest.api.spec.ts
│  │  │  └─ user.api.spec.ts
│  │  └─ *.spec.ts              # UI/flow test specs
│  ├─ utils/                    # Utilities
│  │  ├─ azured-devops/         # Azure DevOps integration
│  │  │  ├─ azure.ts            # Azure client
│  │  │  └─ get.azure.tc.ts     # Test case retrieval
│  │  ├─ jira/                  # Jira integration
│  │  │  ├─ jira.ts             # Jira client
│  │  │  └─ jira.azure.integration.ts
│  │  ├─ auth.ts                # Authentication helpers
│  │  ├─ date.util.ts           # Date formatting utilities
│  │  ├─ require.env.ts         # Environment variable validation
│  │  └─ tab.ts                 # Tab/window utilities
│  ├─ globalSetup.ts            # Global setup before test execution
│  └─ globalTeardown.ts         # Global teardown after test execution
├─ azure-pipelines.yml          # Azure Pipelines CI/CD
├─ playwright.config.ts         # Playwright project configuration
├─ generate-prompt.md           # Test generation instructions
├─ swagger.json                 # OpenAPI source
├─ openapitools.json            # OpenAPI generator configuration
├─ package.json                 # Scripts + dependencies
├─ tsconfig.json                # TypeScript configuration
├─ .env.staging                 # Env staging
└─ .env.uat                     # Env UAT
```

## Architecture Layers

```
┌─────────────────────────────────────────────────────────────────┐
│                        Test Layer                               │
│                    src/tests/*.spec.ts                          │
│              (UI tests, API tests, E2E flows)                   │
├─────────────────────────────────────────────────────────────────┤
│                       Page Layer                                │
│                      src/pages/                                 │
│           (Page Object Model for UI interactions)               │
├─────────────────────────────────────────────────────────────────┤
│                      Fixture Layer                              │
│                    src/fixtures/                                │
│       (Inject context, auth, API services into tests)           │
├─────────────────────────────────────────────────────────────────┤
│                   Service/API Layer                             │
│                   src/api/services/                             │
│    (CustomerService, JobService, SiteService, QuoteService...)  │
├─────────────────────────────────────────────────────────────────┤
│                       Data Layer                                │
│                   src/data/testData/                            │
│         (Builder pattern: JobBuilder, CustomerBuilder...)       │
├─────────────────────────────────────────────────────────────────┤
│                      Shared Layer                               │
│              src/utils/  |  src/constants/                      │
│        (Utilities, helpers, error messages, HTTP status)        │
└─────────────────────────────────────────────────────────────────┘
```

## Development Workflow

### Prerequisites
1. Git installed
2. Node.js installed (v18+)
3. VS Code with Copilot extension

### Setup
```bash
# Clone repository
git clone https://joblogicltd.visualstudio.com/TMS/_git/Playwright-Automation

# Install dependencies
npm install

# Create new branch
git checkout -b feature/your-feature-name
```

### Generate Test Script

#### Step 1: Get Test Case from Azure DevOps
```bash
npx tsx generate.md.ts <testid>
```
This generates `output/test-case-<testid>.md` with format:
```markdown
## ID: 107370
## Tags
- Regression
- Smoke

## Test Steps
### Step 1: Navigate to Jobs page
    Expected: Jobs page loads
### Step 2: Click Log Job
    Expected: Job form opens
```

#### Step 2: Refine Test Case
- Review generated markdown
- Clarify ambiguous steps
- Add missing expected results

#### Step 3: Generate Script with Agent
1. Select **playwright-test-generator** Agent in Copilot
2. Attach files:
   - `output/test-case-<testid>.md`
   - `generate-prompt.md`
   - `intent-mapping.md`
3. Prompt: `Generate script and follow strictly these md files`
4. Save generated test to `src/tests/`

#### Step 4: Fix Issues with Healer Agent
1. Select **playwright-test-healer** Agent
2. Attach failing test file
3. Prompt: `Fix broken locators and flaky steps`
4. Re-run tests until stable

#### Step 5: Finalize
```bash
# Run test
npx playwright test src/tests/your-test.spec.ts

# Commit when stable
git add .
git commit -m "feat: add TC<testid> - description"
git push origin feature/your-feature-name
```
