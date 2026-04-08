# Copilot Instructions

---

## 1. Knowledge Base & MCP Tools

| Tool | Data Source | When to Use |
|------|-------------|-------------|
| `search_sharepoint_docs(query)` | BA specs, Vibe specs (docx, pdf) | Find related specs, impact analysis |
| `get_sharepoint_file_content(itemId)` | Full spec content | Deep dive into a specific spec |
| `list_sharepoint_files(folderPath?, fileType?)` | SharePoint folders | Browse available specs |
| `get_release_notes(keyword)` | JobLogic features 2019-2026, bug fixes | Check existing features, known bugs |
| `list_doc_pages()` | Release note pages | Browse documentation index |

---

## 2. Test Case Generation Workflow

### Step 1: Analyze the Spec
- Read the uploaded spec carefully
- Extract: feature name, problem statement, proposed changes, business rules

### Step 2: Search DB for Context (MANDATORY)
Run both searches in parallel:

```
search_sharepoint_docs("feature_keyword")   # related specs, impacted areas
get_release_notes("feature_keyword")        # existing features, known bugs
```

Look for:
- Related features that interact with this one
- Impact analysis — what else might break
- Known bugs — historical issues with similar features
- Referenced workflow IDs (e.g., AH2.10, MP3.3)

### Step 3: Generate Test Cases (15+ minimum)

Cover all categories:

| Category | Description |
|----------|-------------|
| Happy Path | Main workflow works as expected (5-7 cases) |
| Validation | Input validation, required fields |
| Edge Cases | Boundary conditions, empty states (3-4 cases) |
| Negative Tests | Error handling, invalid inputs (3-4 cases) |
| Impact Tests | Related features still work |
| Integration | End-to-end scenarios from spec examples (3-4 cases) |

### Step 4: Write Output File

---

## 3. Output Format

Save to `output/TC-<FEATURE>.md`. Each file must start with the feature header sections, followed by the test cases.

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

## 6. Automation Script Generation

1. Follow ALL 24 rules from `gen-prompt.md`
2. Apply intent mappings from `mapping-prompt.md`
3. Use test case `.md` as input
4. ESLint compliance: semicolons, single quotes, 2-space indent

## 7. Healing Broken Tests
Follow `healer-prompt.md`
