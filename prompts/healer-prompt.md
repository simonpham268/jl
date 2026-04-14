# Playwright Test Healer Agent Rules

> **GOLDEN RULE**: Fix execution failures first, compliance second. **NEVER fix working code** — forward healing only, never backward.

> **VERIFICATION RULE**: After fixing any interaction (click, fill, navigate), you MUST verify a state change occurred before concluding the fix worked. A fix is only complete when the **consequence** of the action is confirmed — not just that the action executed without throwing.

| Action Fixed | Must Verify After |
|---|---|
| Click a row / list item | Sidebar or detail panel appeared (`waitFor visible`) |
| Click a button (Save, Submit) | Success message, URL change, or element disappeared |
| Fill a form field | Field contains expected value |
| Navigate to page | Page title or key element is visible |
| Click tab | Tab is active AND table/content reloaded |

**Never declare a fix complete based solely on "no error thrown". Confirm the UI changed as expected.**

## Priority 1: Execution Healing (Fix Broken Tests)

Fix these in order. Only touch the **current failure point**, never code that already passed.

### P1.1 — DOM Locator Healing

**Trigger**: `element not found`, `timeout waiting for selector`

Inspect live DOM, update locators with 2-3 fallback selectors:
```typescript
// ❌ page.locator('#old-selector')
// ✅ page.locator('#new-selector, [data-testid="element"], .fallback-class').first()
```

### P1.2 — Stuck Test / Timing Healing

**Trigger**: Hanging tests, infinite waits, race conditions

- Add explicit timeouts to waits: `{ timeout: 5000 }`
- Add `waitForLoadState('networkidle')` between action and assertion
- Replace bare `waitForSelector` with `.catch(() => throw)`

### P1.3 — Element Interaction Healing

**Trigger**: Click/fill failures, element not interactable

Before interacting: `waitFor({ state: 'visible' })` → `scrollIntoViewIfNeeded()` → action.

### P1.4 — API Response & Service Healing

**Trigger**: Null/undefined responses, missing properties, unhandled service errors

- Always use optional chaining: `response?.body?.redirectUrl`
- Validate before use: `if (!value) throw new Error('Missing X')`
- Wrap service calls in try-catch with descriptive errors
- Never call services without proper builder data:
```typescript
const jobData = ApiJobDataBuilder.create().withCustomer(id).withSite(id).build();
const response = await jobService.createJob(jobData);
if (!response?.body?.redirectUrl) throw new Error('Missing redirectUrl');
```

**When fixing null/missing field errors on API responses:**

Step 1 — Confirm the real JSON path by running the api.spec.ts logger:
```typescript
// src/tests/api.spec.ts already has: console.log(JSON.stringify(response))
// Run it to see exact field names and nesting
```

Step 2 — **Preferred fix: update the TypeScript model**, then access cleanly:
```typescript
// In src/api/models/Quote.ts — add the missing field
export interface CreateQuoteResponse {
  AdditionalData?: { QuoteId: number; QuoteNumber: string; };
  // ...other fields
}

// In spec — clean typed access with guards
if (!response.body) throw new Error('No response body');
const quoteId = response.body.AdditionalData?.QuoteId;
if (!quoteId) throw new Error('Missing QuoteId in AdditionalData');
```

Step 3 — **Fallback only**: if the model is from a 3rd party or cannot be changed, use type cast:
```typescript
const quoteId = (response.body as any).AdditionalData?.QuoteId;
if (!quoteId) throw new Error('Missing QuoteId');
```

| Wrong | Right |
|---|---|
| `response.body.AdditionalData.QuoteId` (no guard) | Guard body + optional chain |
| `as any` as first choice | Update model first, `as any` is last resort |
| Assume field name from TC description | Verify via `api.spec.ts` log before accessing |

---

## Priority 2: Framework Compliance (After Tests Pass)

### P2.1 — Test Structure
- Add test header: `/** ID: {testCaseId} \n Tags: {tag1}, {tag2} */`
- Use fixture import: `import { test, expect } from '../fixtures/combined.fixture';`

### P2.2 — Login Setup (Required)
```typescript
test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goToBaseURL();
});
```

### P2.3 — Page Object Model (Strict)
- **FORBIDDEN in specs**: `page.click()`, `page.fill()`, `page.goto()`, `page.waitForSelector()`
- **Replace with**: Page object methods (e.g. `await jobDetailsPage.navigateTo(url)`)
- No try-catch navigation wrappers in specs — use single page object call
- **FORBIDDEN in page methods**: defining locators as local `const` variables inside methods. Move ALL locators to `readonly` class properties in the constructor:
```typescript
// ❌ Wrong — locator inside method (common healing mistake)
async clickRejectButton(): Promise<void> {
  const btn = this.page.getByRole('button', { name: /reject/i });
  await btn.click();
}

// ✅ Correct — locator in constructor, method uses `this`
readonly rejectButton: Locator;
// constructor: this.rejectButton = this.page.getByRole('button', { name: /reject/i });
async clickRejectButton(): Promise<void> {
  await this.rejectButton.waitFor({ state: 'visible' });
  await this.rejectButton.click();
}
```

### P2.4 — Remove test.step Wrappers
Page methods already contain `test.step` internally. Remove wrappers in specs:
```typescript
// ❌ await test.step('Click', async () => { await page.clickButton(); });
// ✅ await page.clickButton();
```

### P2.5 — API Preconditions
Replace manual UI data setup with API service calls using builders:
```typescript
const jobData = ApiJobDataBuilder.create().custom('field', 'value').build();
const response = await jobService.createJob(jobData);
```

### P2.6 — Data Builders
Replace hardcoded data objects with builder pattern:
```typescript
// ❌ const data = { name: 'Test', customer: 'ABC' };
// ✅ const data = JobBuilder.create('ABC', 'Site A', 'Test').build();
```

### P2.7 — ESLint
Single quotes, semicolons, proper spacing: `{ a: 1, b: 2 }`

### P2.8 — Clean Specs
- Remove step comments (`// Step 1: ...`) — page methods self-document via test.step
- Move `expect()` assertions to end of test unless explicitly required mid-flow

---

## Healing Workflow

1. **Detect** — Identify failure type from error message/stack trace
2. **Analyze** — Check page objects for available methods, verify imports
3. **Heal** — Apply fixes: imports → structure → logic → assertions
4. **Validate** — Run ESLint, verify test executes successfully

---

## When to Use test_debug MCP Tool

Use `test_debug` at specific checkpoints — not as a first resort.

| Checkpoint | When | Why |
|------------|------|-----|
| After P1.1 fix | Locator updated in code | Verify new locator resolves in live DOM before committing |
| After P1.3 fix | Interaction fixed | Confirm element is visible + interactable in real browser state |
| Before P2 fixes | P1 fix applied | Confirm test passes execution — only then proceed to compliance |
| When locator is ambiguous | Multiple candidates found | Use live DOM inspection to pick correct selector |

### How to use

```
# Run the failing test in debug mode to inspect live DOM:
test_debug → src/tests/<file>.spec.ts

# Then inspect snapshot to verify locator exists and is unique
# Update locator in page object if needed
# Re-run to confirm P1 resolved before moving to P2
```

### Do NOT use test_debug when
- Test is already passing (no need to inspect)
- Failure is clearly a P2 compliance issue (no DOM involved)
- Error is an import or TypeScript compilation error — fix code directly