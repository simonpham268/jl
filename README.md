# Playwright Auto Draft Framework

## Framework Structure

```text
playwright-auto/
├─ .github/                     # CI/CD workflows (if available)
├─ .vscode/                     # VS Code settings
├─ docs/                        # Framework documentation
├─ specs/                       # Test business specs
├─ src/
│  ├─ api/
│  │  ├─ endpoints.ts           # Shared endpoint definitions
│  │  ├─ joblogic/              # OpenAPI generated client (apis/models/runtime)
│  │  ├─ models/                # Custom domain models
│  │  └─ services/              # Service layer for API calls (job, rfq, notification...)
│  ├─ constants/                # Shared constants
│  ├─ data/                     # Static test data
│  ├─ fixtures/                 # Playwright fixtures
│  ├─ pages/                    # Page Object Model for UI tests
│  ├─ tests/
│  │  ├─ api/                   # API test specs
│  │  └─ *.spec.ts              # UI/flow test specs
│  ├─ utils/                    # Utilities (auth, wait, tab, env...)
│  ├─ globalSetup.ts            # Global setup before test execution
│  ├─ globalTeardown.ts         # Global teardown after test execution
│  └─ draft.ts                  # Draft/entry file for development
├─ playwright.config.ts         # Playwright project configuration
├─ swagger.json                 # OpenAPI source
├─ openapitools.json            # OpenAPI generator configuration
├─ package.json                 # Scripts + dependencies
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
- Use `prompt.md` as the main instruction source when creating new test scripts.
- Use Generator Agent to generate test scripts from test-case-<testid>.md
- Save generated tests under `src/tests` 
- Use Healer Agent to automatically fix broken locators, flaky steps, and execution issues in generated scripts.
- After healing, re-run tests and keep only stable final scripts in the test folders.
