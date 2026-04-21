# Generate Playwright Test Spec

**Trigger when user says:** "gen script", "generate script", "gen test script", "generate test script",
"viết script", "viết playwright", "gen playwright", "convert TC to code", "generate playwright test",
"tạo script", "code TC này", "gen spec", "write playwright spec", "automate TC", "tự động hóa TC"

---

You are generating a Playwright test spec from a test case file. Follow these steps STRICTLY and in order.

## Step 1: Read framework rules
Read BOTH files completely before writing any code:
- `prompts/gen-prompt.md` — 24 framework rules (POM, locators, data builders, API services, ESLint)
- `prompts/mapping-prompt.md` — intent mappings (TC action phrases → page object methods)

## Step 2: Identify the TC file
The user will have attached or referenced a TC markdown file (e.g. `@TC-COP.md`).
Read that file and extract all test cases.

## Step 3: DOM Inspection (MANDATORY — per Rule 21)

**3a. Read `.env.uat`** to get `BASE_URL`, `USER_EMAIL`, `USER_PASSWORD` before navigating.

**3b. Login + navigate to target page:**

> **CRITICAL ORDER — do NOT skip or reorder:**
> 1. Call `generator_setup_page` first (required before any browser interaction)
> 2. THEN call `browser_navigate` to the target page
> 3. THEN call `browser_snapshot`
>
> `generator_setup_page` runs the seed file and lands on a different page. You MUST navigate to the correct target page AFTER setup before capturing any snapshot. Failure to do this means locators are based on the wrong DOM.

Steps:
1. Call `generator_setup_page` with the plan (Step 4) and an appropriate seed file
2. `browser_navigate(BASE_URL + /path/to/target/page)` — navigate to the EXACT page in the TC
3. `browser_snapshot()` — capture accessibility tree of the correct page

**3c. For each unique page in the TC steps:**
1. `browser_navigate(BASE_URL + navigation path from TC)`
2. `browser_snapshot()` — capture accessibility tree (roles, labels, text, input types)

Use the snapshot output to:
- Confirm element roles (`button`, `textbox`, `combobox`, `checkbox`...)
- Get exact label text for inputs — use the EXACT label string from snapshot, not from TC text
- Find `data-testid` or `id` attributes when role/label is ambiguous
- **Check label nesting depth** — if the label text is wrapped in extra `generic` elements, note how many levels up you need to go to reach the container that also holds the combobox/input. Each extra nesting level = one extra `.locator('..')` or use `xpath=../..`

**Locator priority (from Rule 6):** Role-based → Data attributes → ID → CSS → Text  
Do NOT copy raw CSS/XPath from the snapshot — use snapshot info to choose the right strategy.

**If an existing page object file exists:** compare snapshot locators against existing code. Flag any locator in the POM that does not match the live DOM — do not assume existing code is correct.

**Skip DOM inspection** only if the app is unreachable (network error) — fall back to TC text only and flag ALL locators as `// TODO: verify in DOM`.

**3d. Discover available page object methods:**
For each page involved in the TC:
1. Identify the feature folder from `prompts/mapping-prompt.md` → Page Object File Map
2. Glob the folder: `src/pages/{Feature}/*.ts`
3. Read the matching page object file(s)
4. Extract all `async` method signatures — these are the only callable methods

**Rule**: Use exact method names from source. Never invent method names. If a needed method is missing, flag as `// TODO: implement {methodName}(...)`.

## Step 4: Build initial plan + call generator_setup_page

Construct the `plan` from what you have so far (rules + TC steps + available methods):
```
[gen-prompt.md full content]
---
[mapping-prompt.md full content — Global rules, Sidebar, Reusable Templates]
---
[TC steps for the specific test case]
---
DOM snapshot: TBD — will be captured after setup
---
[Available methods per page: extracted from src/pages/{Feature}/*.ts in Step 3d]
```

Call `generator_setup_page` with this plan. Use the appropriate seed file if one exists in `src/tests/`.

## Step 5: Navigate + snapshot target pages (DOM-first)

After `generator_setup_page` completes, the browser is ready. NOW navigate to the actual target pages:

For each unique page in the TC steps:
1. `browser_navigate(BASE_URL + /path)` — using URL patterns from `mapping-prompt.md`
2. `browser_snapshot()` — capture accessibility tree

From the snapshot, extract:
- Exact label text (copy from snapshot, not from TC)
- Element roles and nesting depth for combobox/searchbox fields
- Any `data-testid` or `id` attributes

**Nesting check (mandatory for combobox/dropdown fields):**
In the snapshot, check if the label text is inside an extra wrapper `generic` element:
- Label text directly in container → `.locator('..')` is enough
- Label text inside an extra `generic` inside container → use `.locator('xpath=../..')` to reach the container that holds both label AND combobox

**If existing POM file was read in Step 3d:** cross-check each locator against the live snapshot. Flag and note any mismatch — do not assume the existing code is correct.

## Step 6: DOM Checkpoint — MUST pass before writing any code

Before calling `generator_write_test`, output this checklist and verify every item:

```
DOM CHECKPOINT
--------------
[ ] generator_setup_page called with plan
[ ] browser_navigate called → URL: _______________
[ ] browser_snapshot captured → first element in snapshot: _______________
[ ] All combobox/dropdown fields nesting checked:
    Field name | Label nesting | Locator strategy used
    -----------|---------------|---------------------
    ...
[ ] Existing POM locators cross-checked against live snapshot (or "no existing POM")
```

**If any item is unchecked or URL/snapshot fields are blank → STOP. Do not call `generator_write_test`. Go back to Step 5.**

Only proceed when all items are confirmed.

## Step 7: Call generator_write_test
Write the output to `src/tests/<feature>.spec.ts`.

## Step 8: Verify & Fix compliance (fix loop — do not skip)

Read the generated spec file. For each item below — if violation found, **fix it immediately using Edit tool**, then re-check:

| Check | Violation | Fix |
|-------|-----------|-----|
| `test.beforeEach` with login present | Missing login | Add `loginPage.login()` in beforeEach |
| No `page.click()` / `page.fill()` in spec | Direct page calls found | Move into page object method |
| No `test.step` wrappers in spec | `test.step(...)` in spec file | Remove — `test.step` only inside POM methods |
| Data Builder pattern used | Hardcoded object literals | Replace with builder pattern |
| API services for preconditions | UI-based setup in beforeEach | Replace with API service call |
| Test header present | Missing `/** ID: ... Tags: ... */` | Add above each `test()` block |
| Readonly locators in constructor (Rule 10) | Locator defined inside a method as local variable | Move to `readonly` property in constructor |
| ESLint: single quotes, semicolons, 2-space indent | Style violations | Fix in-place |
| Methods from page objects used | Invented method names not in source | Replace with actual method from Step 3d discovery |

**After all fixes:** re-read the file and confirm zero violations remain. If any violation persists after fix, fix again — do not stop until all checks pass.
