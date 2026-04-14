# Playwright Auto Draft Framework

## Framework Structure

```text
playwright-auto/
├─ .auth/                       # Authentication storage state
├─ .github/
│  ├─ agents/                   # Copilot Chat agents
│  │  ├─ playwright-test-generator.agent.md
│  │  ├─ playwright-test-healer.agent.md
│  │  └─ playwright-test-planner.agent.md
│  └─ copilot-instructions.md   # Copilot global instructions
├─ .vscode/
│  └─ mcp.json                  # MCP server config (GitHub Copilot)
├─ .mcp.json                     # MCP server config (Claude Code)
├─ CLAUDE.md                     # Claude Code instructions
├─ mcp-servers/                  # MCP servers for AI knowledge
│  ├─ data/                      # SQLite FTS5 database (gitignored)
│  │  └─ index.db               # ~100MB indexed content
│  ├─ crawler.ts                 # Crawl release notes + SharePoint
│  ├─ release-notes-server.ts   # MCP server for release notes
│  └─ sharepoint-server.ts      # MCP server for SharePoint specs
├─ allure-results/              # Allure test report results
├─ build/                       # Build outputs
├─ docs/                        # Test case documents (gitignored: .md, .xlsx, .csv, .docx, .pdf)
│  └─ TC-*.md                   # Generated test cases
├─ input/                       # Input files for test generation
├─ output/                      # Other generated outputs
├─ template/                    # Excel templates
│  └─ Template TC.xlsx          # Test case export template
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
  │  ├─ apiData/               # API request helpers for preconditions
  │  │  ├─ asset.api.data.ts
  │  │  ├─ customer.api.data.ts
  │  │  ├─ job.api.data.ts
  │  │  ├─ ppm.api.data.ts
  │  │  ├─ quote.api.data.ts
  │  │  ├─ site.api.data.ts
  │  │  └─ index.ts
  │  └─ uiData/                # UI form builders (Builder pattern)
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
├─ prompts/                     # Agent prompt files
│  ├─ gen-prompt.md             # 24 framework rules for test generation
│  ├─ mapping-prompt.md         # Intent → page object method mappings
│  └─ healer-prompt.md          # Rules for auto-healing broken tests
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
│          src/data/apiData/  |  src/data/uiData/                │
│    (API request helpers)   | (Builder pattern: JobBuilder...) │
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

# Install Copilot agents for VS Code
npx playwright init-agents --loop=vscode

# Install Allure CLI (for test reports)
npm install -g allure-commandline

# Create new branch
git checkout -b feature/your-feature-name
```

### Generate Test Script

#### Agent Instructions (Auto-loaded)
Instructions are automatically loaded by agents from:
- **Claude Code:** `CLAUDE.md` 
- **GitHub Copilot:** `.github/copilot-instructions.md`

No need to manually attach prompt files — agents read `prompts/gen-prompt.md`, `prompts/mapping-prompt.md`, and `prompts/healer-prompt.md` automatically.

#### Step 1: Get Test Case from Azure DevOps
```bash
npm run generate -- <testid>
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

### Step 2: Refine Test Case
- Review generated markdown
- Clarify ambiguous steps
- Add missing expected results

### Step 3: Generate Script with Agent
1. Select **playwright-test-generator** Agent in Copilot
2. Attach: `output/test-case-<testid>.md` (or scenario.md file)
3. Prompt: `Generate playwright test script`
4. Save generated test to `src/tests/`

### Step 4: Fix Issues with Healer Agent
1. Select **playwright-test-healer** Agent
2. Attach: Failing test file
3. Prompt: `Fix this failing test`
4. Re-run tests until stable

### Step 5: Finalize
```bash
# Run test
npx playwright test src/tests/your-test.spec.ts

# Commit when stable
git add .
git commit -m "feat: add TC<testid> - description"
git push origin feature/your-feature-name
```

---

## Import Test Cases to Azure DevOps Suite

Import test cases from Azure DevOps to a test suite with filters.

### Usage
```bash
npm run import-suite -- planId=<id> suiteId=<id> tags=[...] priorities=[...] excludePaths=[...] excludeAuto=[...]
```

### Parameters
| Parameter | Description | Example |
|-----------|-------------|---------|
| `planId` | Azure DevOps Test Plan ID | `planId=109583` |
| `suiteId` | Azure DevOps Test Suite ID | `suiteId=109584` |
| `tags` | Array of tags to include (OR logic) | `tags=[auto,regression]` |
| `priorities` | Array of priorities (1-4) | `priorities=[1,2]` |
| `excludePaths` | Array of area paths to EXCLUDE | `excludePaths=[TMS\QC Team\Bin]` |
| `excludeAuto` | (Optional) Array of automation statuses to EXCLUDE | `excludeAuto=[Automated]` |

### Examples
```bash
# Import test cases with tags "auto" OR "regression", priority 1 or 2
npm run import-suite -- planId=107558 suiteId=107559 tags=[auto,regression] priorities=[1,2] excludePaths=[]

# Import all except "Automated" test cases
npm run import-suite -- planId=107558 suiteId=107559 tags=[regression] priorities=[1] excludePaths=[] excludeAuto=[Automated]

# Exclude test cases under specific area path
npm run import-suite -- planId=107558 suiteId=107559 tags=[smoke] priorities=[] excludePaths=[TMS\QC Team\Bin]

# Combine multiple filters
npm run import-suite -- planId=109583 suiteId=109584 tags=[vienpham,vientesttest] priorities=[1,2,3] excludePaths=[TMS\QC Team\Bin] excludeAuto=[Automated]
```

### Automation Status Values
- `Automated` - Test case is automated
- `Not Automated` - Test case is not automated
- `Planned` - Automation is planned

---

## Scan Regression Plans

Scan Azure DevOps regression test plans and report coverage.

```bash
npm run scan                # All plans
npm run scan:web            # Web only (exclude mobile)
npm run scan:mobile         # Mobile only
npm run scan:active         # All + active test cases only
npm run scan:web:active     # Web + active
npm run scan:mobile:active  # Mobile + active
```

---

## MCP Servers & Knowledge Base

MCP (Model Context Protocol) servers provide indexed knowledge to AI assistants for test case generation with context.

### Knowledge Base (Pre-indexed SQLite FTS5)

| Source | Content | Size | Tool |
|--------|---------|------|------|
| Release Notes | JobLogic features 2019-2026, bug fixes | ~879 chunks | `get_release_notes(keyword)` |
| SharePoint Specs | BA specs, Vibe specs (docx, pdf) | ~663 chunks | `search_sharepoint_docs(query)` |
| Notion Specs | BA specs, Vibe specs (430+ pages, indexed) | ~4000+ chunks | `search_notion_specs(query)` |

**Database location:** `mcp-servers/data/index.db` (~150MB, gitignored)

### Quick Start for Team Members

After cloning the repo, **copy the database file** to use MCP tools immediately (no need to re-crawl):

```bash
# 1. Create data folder if not exists
mkdir -p mcp-servers/data

# 2. Copy database from shared location
# Option A: Download from SharePoint (recommended)
# Link: https://joblogicltd.sharepoint.com/db%20resource/Forms/AllItems.aspx
# Download all and save to: mcp-servers/data/

# Option B: Build from scratch (~5-10 mins, requires Azure credentials)
npx tsx mcp-servers/crawler.ts release-notes
npx tsx mcp-servers/crawler.ts sharepoint
npx tsx mcp-servers/crawler.ts notion
```

**Verify database:**
```bash
# Check file size (~150MB with Notion)
ls -lh mcp-servers/data/index.db

# Test MCP tools in VS Code Copilot/Claude Code
# Type: "Get release notes for November 2024"
# Type: "Search Notion for PPM"
```

> ⚠️ **Note:** Database file is gitignored. Each machine needs to copy or build it.

### Available MCP Tools

| Tool | Purpose | When to Use |
|------|---------|-------------|
| `search_sharepoint_docs(query)` | Search BA specs by keyword | Find related specs, impact analysis |
| `get_sharepoint_file_content(itemId)` | Read full spec content | Deep dive into specific spec |
| `list_sharepoint_files(folderPath?, fileType?)` | Browse spec folders | Explore available specs |
| `search_notion_specs(query)` | Search Notion specs (FTS5) | Find specs, feature details, business rules |
| `get_notion_page(pageId)` | Read full Notion page content | Deep dive into specific Notion spec |
| `list_notion_specs(cursor?)` | List all Notion spec titles + IDs | Browse Notion spec index |
| `refresh_notion_index(force?)` | Re-crawl and rebuild Notion index | Update index with new specs |
| `get_release_notes(keyword)` | Search release notes | Check existing features, known bugs |
| `list_doc_pages()` | List release note pages | Browse documentation index |

### Initial Setup

#### 1. SharePoint Azure AD Credentials
```env
# .env
AZURE_TENANT_ID=xxx
AZURE_CLIENT_ID=xxx
AZURE_CLIENT_SECRET=xxx
```

#### 2. Build the Knowledge Base (First time only)
```bash
# Install dependencies
cd mcp-servers && npm install && cd ..

# Crawl release notes (public URL)
npx tsx mcp-servers/crawler.ts release-notes

# Crawl SharePoint specs (requires Azure credentials)
npx tsx mcp-servers/crawler.ts sharepoint

# Crawl Notion specs (uses Playwright to browse Notion)
npx tsx mcp-servers/crawler.ts notion

# Force full re-index (skip delta sync)
npx tsx mcp-servers/crawler.ts sharepoint --force
npx tsx mcp-servers/crawler.ts notion --force
```

**Delta sync:** Crawler only re-indexes files with newer `modified_at` timestamp.

### Extension Config Files

| Extension | MCP Config | Instructions File |
|-----------|------------|-------------------|
| **GitHub Copilot** | `.vscode/mcp.json` | `.github/copilot-instructions.md` |
| **Claude Code** | `.mcp.json` | `CLAUDE.md` |

### Test Case Generation Workflow

When uploading a spec and asking to generate test cases:

1. **Analyze Spec** — Extract feature name, problem, proposed changes
2. **Search DB for Context** (Automatic via MCP):
   ```
   search_sharepoint_docs("feature_keyword")  → Related specs, impacts
   search_notion_specs("feature_keyword")     → BA specs, business rules
   get_release_notes("feature_keyword")       → Known bugs, existing features
   ```
3. **Generate Test Cases** — Categories: Happy Path, Edge Cases, Negative, Impact, Integration
4. **Output** — Save to `output/test-case-<feature>.md`

### Example Prompts

```
# Generate test cases from spec
Generate test cases cho spec này [attach file]

# Search for related specs (SharePoint + Notion)
Search SharePoint for "COP Date Changes"
Search Notion for "suspended asset"

# Get release notes
Get release notes for November 2024

# Impact analysis
Tìm các specs liên quan đến feature "suspended asset"
```

Verify MCP servers: `Ctrl+Shift+P` → `MCP: List Servers`

---

## ESLint - Code Formatting

Lint and auto-fix code to ensure consistent code style across the project.

### Usage

```bash
# Lint all files in src/
npm run lint

# Fix all files in src/
npm run lint:fix

# Lint specific file
npm run lint:file -- src/tests/api.spec.ts

# Fix specific file
npm run lint:file:fix -- src/tests/api.spec.ts

# Lint multiple files (using glob pattern)
npm run lint:file -- "src/tests/*.spec.ts"
npm run lint:file:fix -- "src/pages/**/*.ts"
```

### Rules Applied

| Rule | Description | Example |
|------|-------------|---------|
| `semi` | Require semicolons at end of statements | `const x = 1;` |
| `quotes` | Use single quotes | `'hello'` |
| `indent` | 2 spaces indentation | ` ` |
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
