# Heal Playwright Test

You are fixing a failing Playwright test. Follow these steps STRICTLY and in order.

## Step 1: Read healer rules
Read this file completely before touching any code:
- `healer-prompt.md` — priority-ordered healing rules

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
- **P1 only**: Fix the single current failure point. Never touch passing code.
- **P2 only after P1 passes**: Fix compliance issues in order P2.1 → P2.8.
- NEVER fix working code. Forward healing only.

## Step 5: Validate
- [ ] Test executes without errors
- [ ] No `page.click()` / `page.fill()` directly in spec
- [ ] No `test.step` wrappers in spec
- [ ] ESLint passes: single quotes, semicolons, 2-space indent
- [ ] `expect()` assertions at end of test only (unless mid-flow required)
