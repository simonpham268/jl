# Generate Test Cases

**Trigger when user says:** "generate test cases", "gen TC", "gen test case", "tạo test case",
"viết test case", "generate TC", "create test cases", "write test cases", "gen tests"

---

You are generating test cases from a spec document. Follow these steps STRICTLY and in order.

## Step 1: Analyze the Spec

Read the uploaded/referenced spec carefully. Extract:
- Feature name, problem statement, proposed changes, business rules

## Step 2: Extract Search Entities (MANDATORY — do before searching)

For each category below, find the relevant section or label in the spec and extract whatever values appear there. Do not try to guess format — extract exactly what is written.

| Category | Where to look | What to extract |
|----------|--------------|-----------------|
| Workflow IDs | Sections labelled "Affected Workflows", "Related Workflows", "Impacted Workflows" | All codes listed, in whatever format they appear |
| User Story / Persona codes | Labels "User Story Code", "Persona(s)", "User Stories" | All short codes listed |
| Jira tickets | Labels "Jira", "Ticket", "Reference", "Issue" — or any `XX-####` pattern in the header | All ticket IDs found — there may be more than one |
| Systems / Portals | Quoted names, capitalised proper nouns for external systems | Any named third-party system, portal, or integration |
| Domain terms | Capitalised nouns that are specific to this feature's domain | Process names, equipment names, field names not found in everyday language |
| Customer / Client | Title or heading of the spec, or explicitly named client | The VIP customer this spec is written for, if any |
| Referenced specs | In-text citations of other specs or feature names | Any `#XX`, spec title, or linked document mentioned |

## Step 3: Search DB for Context (MANDATORY — run all in parallel)

```
search_sharepoint_docs("<feature_keyword>")
search_notion_specs("<feature_keyword>")
get_release_notes("<feature_keyword>")

# One query per extracted entity:
search_sharepoint_docs("<workflow_id>")
search_sharepoint_docs("<system_name>")
search_notion_specs("<customer_name>")
search_notion_specs("<domain_term>")
```

If a result looks relevant → call `get_notion_page(pageId)` or `get_sharepoint_file_content(itemId)` for full content.

Look for: related features, impact analysis, known bugs, business rules from workflow IDs.

## Step 4: Generate Test Cases (15+ minimum)

| Category | Description |
|----------|-------------|
| Happy Path | Main workflow works as expected (5–7 cases) |
| Validation | Input validation, required fields |
| Edge Cases | Boundary conditions, empty states (3–4 cases) |
| Negative Tests | Error handling, invalid inputs (3–4 cases) |
| Impact Tests | Related features still work |
| Integration | End-to-end scenarios from spec examples (3–4 cases) |

## Step 5: Write Output File

Save to `docs/TC-<FEATURE>.md` using this format:

```markdown
# Test Cases: {Feature Name}
**Spec:** {spec file name}
**Jira:** {ticket ID}

---

## D1. Feature Description
{Describe the feature and its business purpose}

## D2. Impacted Modules
- Module/Workflow 1

## D3. Business Risks
- Risk 1

---

## ID: TC-{FEATURE}-{NNN}
## Title: {Descriptive title}
## Tags
- smoke/regression
- {feature_tag}

## Preconditions
- {Setup requirements}

## Test Steps
Step 1: {Exact UI action}
  Expected: {Verifiable outcome}

## Expected Result
- {Final verifiable outcome}
```

**ID format:** `TC-{FEATURE}-{NNN}` — e.g., `TC-COP-001`, `TC-JOBS-012`

## Format Rules (apply to ALL test cases)

1. Every step MUST have an Expected result
2. One specific UI action per step (click, type, select, navigate)
3. Use exact UI element names — button text, field labels, menu names
4. Specify navigation paths — `"Jobs > Log Job"`, `"Settings > Users > Add User"`
5. Include element locations — `"left navigation sidebar"`, `"bottom of form"`
6. Minimum 5 steps per scenario
7. No vague instructions — "Click 'Save' button at bottom right of form" not "Save the job"

## Automation Priority Tags

| Priority | Criteria | Tag |
|----------|----------|-----|
| High | Critical flow, frequently executed | `smoke` |
| Medium | Important, moderate frequency | `regression` |
| Low | Edge cases, unstable UI | _(no tag)_ |
