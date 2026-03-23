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
│  │  │  └─ job.data.ts         # Job data with createJobData()
│  │  ├─ endpoints/             # Endpoint URL definitions
│  │  │  └─ job.endpoints.ts    # Job API endpoints
│  │  ├─ joblogic/              # OpenAPI generated client
│  │  ├─ models/                # Custom domain models
│  │  │  └─ Job.ts              # Job interfaces
│  │  └─ services/              # Service layer for API calls
│  │     └─ JobService.ts       # Job CRUD operations
│  ├─ constants/                # Shared constants
│  │  ├─ errorMessages.ts       # Error message constants
│  │  └─ httpStatus.ts          # HTTP status codes
│  ├─ data/                     # Static test data
│  │  └─ testData/              # Test data files
│  ├─ fixtures/                 # Playwright fixtures
│  │  ├─ api.fixture.ts         # API client/service fixtures
│  │  └─ azure-push.fixture.ts  # Azure DevOps integration
│  ├─ pages/                    # Page Object Model for UI tests
│  │  ├─ BasePage.ts            # Base page class
│  │  ├─ HomePage.ts            # Home page
│  │  ├─ LoginPage.ts           # Login page
│  │  ├─ Sidebar.ts             # Sidebar navigation
│  │  └─ ...                    # Other page objects
│  ├─ tests/
│  │  ├─ api/                   # API test specs
│  │  │  ├─ job.api.spec.ts     # Job API tests
│  │  │  └─ user.api.spec.ts    # User API tests
│  │  └─ *.spec.ts              # UI/flow test specs
│  ├─ utils/                    # Utilities
│  │  ├─ auth.ts                # Authentication helpers
│  │  ├─ date.util.ts           # Date formatting utilities
│  │  ├─ require.env.ts         # Environment variable validation
│  │  ├─ tab.ts                 # Tab/window utilities
│  │  ├─ azure-devops/          # Azure DevOps integration
│  │  │  ├─ azure.ts            # Azure client
│  │  │  └─ get.azure.tc.ts     # Test case retrieval
│  │  └─ jira/                  # Jira integration
│  │     ├─ jira.ts             # Jira client
│  │     └─ jira.azure.integration.ts
│  ├─ globalSetup.ts            # Global setup before test execution
│  └─ globalTeardown.ts         # Global teardown after test execution
├─ azure-pipelines.yml          # Azure Pipelines CI/CD
├─ playwright.config.ts         # Playwright project configuration
├─ swagger.json                 # OpenAPI source
├─ openapitools.json            # OpenAPI generator configuration
├─ package.json                 # Scripts + dependencies
├─ tsconfig.json                # TypeScript configuration
├─ .env.staging                 # Env staging
└─ .env.uat                     # Env UAT
```

## Architecture Layers

- Test Layer: `src/tests` (test cases).
- Page Layer: `src/pages` (POM for UI).
- Fixture Layer: `src/fixtures` (inject context, auth, data).
- Service/API Layer: `src/api/services` + `src/api/joblogic`.
- Shared Layer: `src/utils`, `src/constants`, `src/data`.

## Agent Workflow
- Use 'npx tsx generate.md.ts <testid>' to generate file test-case-<testid>.md
- Use `generate-prompt.md` as the main instruction source when creating new test scripts.
- Use Generator Agent to generate test scripts from test-case-<testid>.md
- Save generated tests under `src/tests` 
- Use Healer Agent to automatically fix broken locators, flaky steps, and execution issues in generated scripts.
- After healing, re-run tests and keep only stable final scripts in the test folders.
