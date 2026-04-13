# CLAUDE.md - Claude Code Instructions

---

## 1. Knowledge Base & MCP Tools

| Tool | Data Source | When to Use |
|------|-------------|-------------|
| `search_sharepoint_docs(query)` | BA specs, Vibe specs (docx, pdf) | Find related specs, impact analysis |
| `get_sharepoint_file_content(itemId)` | Full spec content | Deep dive into a specific spec |
| `list_sharepoint_files(folderPath?, fileType?)` | SharePoint folders | Browse available specs |
| `get_release_notes(keyword)` | JobLogic features 2019-2026, bug fixes | Check existing features, known bugs |
| `list_doc_pages()` | Release note pages | Browse documentation index |
| `search_notion_specs(query)` | Notion BA/Vibe specs (430+ pages, indexed) | Find specs, feature details, business rules |
| `get_notion_page(pageId)` | Full Notion page content | Deep dive into a specific Notion spec |
| `list_notion_specs(cursor?)` | All Notion spec titles + IDs | Browse Notion spec index |

---

## 2. Test Case Generation Workflow

### Step 1: Analyze the Spec
- Read the uploaded spec carefully
- Extract: feature name, problem statement, proposed changes, business rules

### Step 2: Extract Search Entities from Spec (MANDATORY — do before searching)

Scan the spec text and collect exact strings for each category:

| Category | What to look for | Example |
|----------|-----------------|---------|
| Workflow IDs | Alphanumeric codes like AH2.10, MP3.3 | `"AH2.10"`, `"PR2.2"` |
| Jira references | DD-XXXX ticket IDs | `"DD-6663"` |
| System/Portal names | Named systems, portals, integrations | `"RFW portal"`, `"Customer Portal"` |
| Equipment/Domain terms | Technical nouns specific to the feature | `"Gas Valve"`, `"COP date"` |
| Customer/Client name | VIP customer name if present | `"Budweiser"`, `"Linaker"` |
| Referenced spec names | Any spec file or feature name mentioned | `"Bud #23"`, `"Asset Based PPM"` |

### Step 3: Search DB for Context (MANDATORY)

For each entity extracted in Step 2, run a targeted query. Run all in parallel:

```
# Always run these 3 with the main feature keyword:
search_sharepoint_docs("<feature_keyword>")
search_notion_specs("<feature_keyword>")
get_release_notes("<feature_keyword>")

# Then run one query per extracted entity:
search_sharepoint_docs("<workflow_id>")        # e.g. "AH2.10"
search_sharepoint_docs("<system_name>")        # e.g. "RFW portal"
search_notion_specs("<customer_name>")         # e.g. "Budweiser"
search_notion_specs("<domain_term>")           # e.g. "Gas Valve COP"
```

If a result looks relevant, call `get_notion_page(pageId)` or `get_sharepoint_file_content(itemId)` to read full content.

Look for:
- Related features that interact with this one
- Impact analysis — what else might break
- Known bugs — historical issues with similar features
- Business rules defined in referenced workflow IDs

### Step 4: Generate Test Cases (15+ minimum)

Cover all categories:

| Category | Description |
|----------|-------------|
| Happy Path | Main workflow works as expected (5-7 cases) |
| Validation | Input validation, required fields |
| Edge Cases | Boundary conditions, empty states (3-4 cases) |
| Negative Tests | Error handling, invalid inputs (3-4 cases) |
| Impact Tests | Related features still work |
| Integration | End-to-end scenarios from spec examples (3-4 cases) |

### Step 5: Write Output File

---

## 3. Output Format

Save to `src/tests/test-cases/TC-<FEATURE>.md`. Each file must start with the feature header sections, followed by the test cases.

```markdown
# Test Cases: {Feature Name}
**Spec:** {spec file name}
**Jira:** {ticket ID}

---

## D1. Feature Description
{Describe the feature and its business purpose — what problem it solves, who it affects}

## D2. Impacted Modules
{List affected modules, workflows, or areas identified from context search}
- Module/Workflow 1
- Module/Workflow 2

## D3. Business Risks
{Identify risks to users or operations if this feature is broken}
- Risk 1
- Risk 2

---

## ID: TC-{FEATURE}-{NNN}
## Title: {Descriptive title}
## Tags
- smoke/regression
- {feature_tag}

## Preconditions
- {Setup requirements}

## Test Steps
Step 1: {Exact UI action — e.g., "Click 'Save' button at bottom of form"}
  Expected: {Verifiable outcome}
Step 2: {Action}
  Expected: {Outcome}

## Expected Result
- {Final verifiable outcome}
```

**ID format:** `TC-{FEATURE}-{NNN}` — e.g., `TC-COP-001`, `TC-JOBS-012`

---

## 4. Format Rules (STRICT — apply to ALL test cases)

1. Every step MUST have an Expected Result
2. One specific UI action per step (click, type, select, navigate)
3. Use exact UI element names — button text, field labels, menu names
4. Specify navigation paths — `"Jobs > Log Job"`, `"Settings > Users > Add User"`
5. Include element locations — `"left navigation sidebar"`, `"bottom of form"`
6. Minimum 5 steps per scenario
7. No vague instructions:

| Wrong | Right |
|-------|-------|
| "Navigate to Jobs" | "Click 'Jobs' menu in left navigation sidebar" |
| "Select customer" | "Click 'Customer' dropdown, then click 'ABC Corp' from list" |
| "Save the job" | "Click 'Save' button at bottom right of form" |

---

## 5. Automation Priority

| Priority | Criteria |
|----------|----------|
| High | Critical flow, frequently executed — tag `smoke` |
| Medium | Important, moderate frequency — tag `regression` |
| Low | Edge cases, unstable UI |

---

## 6. Playwright Test Script Generation (MANDATORY)

When generating Playwright test scripts (any request to convert TC → code):

### Step 1: Read framework files FIRST (before writing any code)
```
Read gen-prompt.md       — 24 framework rules (locators, POM, data builders, API services)
Read mapping-prompt.md   — intent mappings (TC action → page method)
```

### Step 2: Call generator_setup_page
Inject into `plan` parameter in this order:
1. Full content of `gen-prompt.md`
2. Full content of `mapping-prompt.md`
3. TC steps from the test case file

### Step 3: Call generator_write_test
Write output to `src/tests/` following the file naming convention in gen-prompt.md.

**Never generate Playwright code without reading both files first.**

---

## 7. Playwright Test Healing (MANDATORY)

When fixing/healing a failing Playwright test (any request to fix, heal, debug a spec):

### Step 1: Read healer rules FIRST
```
Read healer-prompt.md   — priority-ordered healing rules (P1: execution failures → P2: compliance)
```

### Step 2: Identify the failure
Run the test or read the error. Classify failure type: locator / timing / interaction / API / compliance.

### Step 3: Apply healer-prompt.md priority order
- **P1 first** — fix execution failures (broken locators, timeouts, API errors)
- **P2 second** — fix compliance issues (POM violations, missing login, test.step in spec) only after P1 passes
- NEVER fix working code. Forward healing only — only touch the current failure point.

### Step 4: Validate
Confirm test passes. Check ESLint compliance.

**Never heal a test without reading healer-prompt.md first.**


