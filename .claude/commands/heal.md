# Heal Playwright Test

**Trigger when user says:** "heal test", "fix test", "sửa test", "fix script", "sửa script",
"test bị lỗi", "test đang fail", "debug test", "fix failing test", "heal spec", "fix spec"

---

You are fixing a failing Playwright test. Follow these steps STRICTLY and in order.

## Step 1: Read healer rules
Read this file completely before touching any code:
- `prompts/healer-prompt.md` — priority-ordered healing rules

## Step 2: Get the failure
The user will have attached or referenced a failing spec file (e.g. `@quote-reject.spec.ts`).
If no error message is provided, run the test first to get the actual failure:
```
npx playwright test <file> --reporter=list
```

## Step 3: Classify the failure type
Map error to healer priority:
| Error | Priority |
|-------|----------|
| `element not found`, `timeout waiting for selector` | P1.1 — DOM Locator |
| Hanging test, infinite wait, race condition | P1.2 — Timing |
| Click/fill failures, element not interactable | P1.3 — Element Interaction |
| Null/undefined response, missing property | P1.4 — API Response |
| POM violation, missing login, test.step in spec | P2 — Compliance |

## Step 4: Apply fix (healer-prompt.md rules)

> **DOM-FIRST RULE — NO EXCEPTIONS**: Before changing ANY locator, interaction, or page object method, you MUST run `test_debug` first. Never assume the root cause. Never change code based on reading alone.

**ALWAYS — for any P1 failure involving locators or interactions:**
1. Run `test_debug → src/tests/<file>.spec.ts` — captures DOM at the exact failure point
2. Use snapshot to find the real element: role, label, `data-testid`, `id`
3. Write correct fix based only on what the snapshot shows

> Use `test_debug` not `browser_snapshot` — test_debug captures DOM state after prior test steps run, giving the real context of the failure.

**Classification still applies — but does NOT skip test_debug:**
| Error | Priority |
|-------|----------|
| `element not found`, `timeout waiting for selector` | P1.1 — run `test_debug` |
| Click/fill failures, element not interactable | P1.3 — run `test_debug` |
| Hanging test, race condition | P1.2 — add explicit wait after inspecting |
| Null/undefined response | P1.4 — check API response log |

**For all P1 failures:**
- Fix the single current failure point. Never touch passing code.

**P2 only after P1 passes:**
- Fix compliance issues in order P2.1 → P2.8.

**NEVER fix working code. NEVER guess. Forward healing only.**

## Step 5: Validate & Fix (fix loop — do not skip)

Run the test first:
```
npx playwright test <file> --reporter=list
```

Then read the spec file. For each item below — if violation found, **fix immediately**, then re-check:

| Check | Violation | Fix |
|-------|-----------|-----|
| Test passes | Still failing | Re-classify failure type and re-apply P1 fix |
| No `page.click()` / `page.fill()` in spec | Direct page calls | Move into page object method |
| No `test.step` wrappers in spec | `test.step(...)` in spec | Remove — only allowed inside POM methods |
| ESLint: single quotes, semicolons, 2-space indent | Style violations | Fix in-place |
| `expect()` at end of test only | Mid-flow assertions (unless required) | Move to end |

**Do not stop until test passes and all checks are clean.**
