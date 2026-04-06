# Playwright Test Healer Agent Rules

> **GOLDEN RULE**: Fix execution failures first, compliance second. **NEVER fix working code** — forward healing only, never backward.

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