# Healing Rules — AIT Playwright Automation

> Priority-ordered playbook for fixing failing tests. Companion files:
> - Conventions code must follow: [`framework-rules.md`](./framework-rules.md)
> - Intent → method translation: [`intent-mapping.md`](./intent-mapping.md)
> - AIT API response shapes + validation: [`../skills/ait-api-quirks/SKILL.md`](../skills/ait-api-quirks/SKILL.md)

---

## Golden rules

| Rule | Detail |
|---|---|
| **Execution before compliance** | Fix P1 (broken tests) first. P2 (style) only AFTER P1 passes |
| **Forward healing only** | NEVER touch code that already passes — only the current failure point |
| **Verify consequence, not absence of error** | A fix is complete when the UI/state changed as expected, NOT just when no error was thrown |

### What to verify after each fix type

| Action fixed | Must verify after |
|---|---|
| Click row / list item | Detail panel or expected next element appeared (`waitFor visible`) |
| Click button (Save / Submit / Reserve / Login) | Success message, URL change, OR expected validation error displayed |
| Fill form field | Field contains expected value |
| Navigate to page | Page title or key element visible (e.g. Rooms link for admin) |
| Click admin nav link | URL contains `/admin/{section}` AND section heading visible |

---

## P1 — Execution Healing (fix the broken test)

### P1.1 — DOM Locator

**Triggers**: `element not found`, `timeout waiting for selector`, `strict mode violation`

**Procedure:**
1. Spawn `dom-inspector` agent (or use `test_debug` MCP tool) to capture live DOM at failure point
2. Find the real element: role, placeholder, label, `data-testid`, `id`
3. Update the POM locator per priority order in [`framework-rules.md` §3](./framework-rules.md#3-locator-strategy)

**AIT gotchas** (see [`framework-rules.md` §3](./framework-rules.md#ait-specific-gotchas) for full list):
- Admin login labels NOT linked → use `getByPlaceholder`, not `getByRole({ name: ... })`
- Admin Rooms list: no `data-testid` → use `locator('div.row', { hasText: name }).first()`
- After API create, click on already-active nav link is no-op → `page.goto(URL)` to force refresh

### P1.2 — Timing / Stuck Test

**Triggers**: Hanging tests, infinite waits, race conditions, `Timeout exceeded` on navigation

**Fixes:**
- Add explicit timeout to wait: `{ timeout: 5_000 }`
- Add `await this.page.waitForLoadState('networkidle')` between action and assertion (use sparingly)
- **DO NOT** `waitForURL(/.*\/admin/)` right after login — URL may already match. Wait for a post-login element instead:

```typescript
// ❌ Race condition — /admin URL matches before login completes
await this.loginButton.click();
await this.page.waitForURL(/.*\/admin/);

// ✅ Wait for post-login content
await this.loginButton.click();
await expect(this.roomsNavLink).toBeVisible({ timeout: this.navigationTimeout });
```

### P1.3 — Element Interaction

**Triggers**: `not interactable`, `not enabled`, `not visible`

**Procedure:**
1. Inspect DOM via `dom-inspector` / `test_debug` — understand WHY:
   - Hidden behind another element?
   - Disabled (e.g. Reserve button before form filled)?
   - Off-screen / not rendered?
2. Add proper wait/scroll before interaction:

```typescript
await this.targetElement.waitFor({ state: 'visible' });
await this.targetElement.scrollIntoViewIfNeeded();
await this.targetElement.click();
```

### P1.4 — API Response

**Triggers**: Wrong status code, missing body field, `as any` access errors

1. Log the response to confirm the JSON path:
   ```typescript
   console.log('response:', JSON.stringify(response));
   ```
2. Cross-check against [`ait-api-quirks` skill](../skills/ait-api-quirks/SKILL.md). Most AIT API "failures" are one of:
   - Asserting `201` for room create (actual: `200`)
   - Reading `roomid` from `createRoom` response (not returned — use `findRoomByName()`)
   - `firstname`/`lastname` < 3 chars → 400 with `"size must be between 3 and 30"`
   - `phone` outside 11–21 chars → 400 with `"size must be between 11 and 21"`
   - `GET /api/booking/` without `?roomid=N` → 400 `"Room ID is required"`
3. If a real-runtime field is missing from the TypeScript interface → **update `src/api/models/room.model.ts` first**, then access cleanly. NEVER use `as any` as first choice.

```typescript
// ✅ Correct
if (!response.body) throw new Error('No response body');
const id = response.body.bookingid;
if (!id) throw new Error('Missing bookingid');

// ❌ Wrong
const id = (response.body as any).bookingid;
```

---

## P2 — Framework Compliance (only after P1 passes)

Cross-references → [`framework-rules.md`](./framework-rules.md). Apply in order:

| Step | Check | See |
|---|---|---|
| P2.1 | Test header `/** ID: ... Tags: ... */` + test name `[TC{id}] @Tag: desc` | [§8](./framework-rules.md#8-test-header--naming) |
| P2.2 | Import path correct (`'../fixtures/custom.fixture'` if API, else `'@playwright/test'`) | [§5](./framework-rules.md#5-api-services-for-preconditions--cleanup) |
| P2.3 | Login pattern matches section (admin: `goToBaseURL`; public: opt out of storage state) | [§4](./framework-rules.md#4-login-patterns) |
| P2.4 | No `page.*` calls in spec — only POM methods | [§1](./framework-rules.md#1-spec-discipline-what-specs-must-and-must-not-contain) |
| P2.5 | No `test.step` wrappers in spec — POM methods wrap internally | [§1](./framework-rules.md#1-spec-discipline-what-specs-must-and-must-not-contain) |
| P2.6 | POM locators `readonly` in constructor, NOT inside methods | [§2](./framework-rules.md#pom-rules) |
| P2.7 | API preconditions via `roomService` not UI setup | [§5](./framework-rules.md#5-api-services-for-preconditions--cleanup) |
| P2.8 | Data Builder pattern if entity > 3 fields used across specs | [§6](./framework-rules.md#6-data-builders) |
| P2.9 | ESLint passes — single quotes, semicolons, 2-space indent | [§9](./framework-rules.md#9-code-style-eslint) |
| P2.10 | No step comments — `test.step()` self-documents | [§1](./framework-rules.md#1-spec-discipline-what-specs-must-and-must-not-contain) |

---

## Healing Workflow

```
1. Detect    → Run via spec-runner agent, get classified failure (P1.1 / P1.2 / P1.3 / P1.4 / P2)
2. Analyze   → For P1.1/P1.3 spawn dom-inspector. For P1.4 check ait-api-quirks skill.
3. Heal      → Touch only the failure point. Forward only. Verify consequence.
4. Validate  → Re-run via spec-runner. If still failing, re-classify and loop.
5. Compliance → Once green, walk P2 list top-to-bottom.
```

---

## When to use `test_debug` MCP tool

Use at specific checkpoints, NOT first resort:

| Checkpoint | Why |
|---|---|
| After P1.1 fix | Verify new locator resolves in live DOM |
| After P1.3 fix | Confirm element interactable in real browser state |
| Before P2 fixes | Confirm test passes execution first |
| When multiple locator candidates | Pick the correct one from live DOM |

**Do NOT use `test_debug` when:**
- Test already passes
- Failure is clearly P2 (no DOM involved)
- Error is TypeScript / import — fix code directly

> `test_debug` vs `browser_snapshot`: `test_debug` captures DOM state AFTER prior test steps ran — gives real context of the failure. `browser_snapshot` only shows the page from a fresh navigation. Use `test_debug` for healing; `browser_snapshot` for initial generation.

---

## Stale-cache troubleshooting

If your code change appears correct but the failure recurs verbatim:

1. **Read the file back** — confirm disk matches your edit
2. **Clear Playwright transform cache**: `rm -rf c:/Users/$USER/AppData/Local/Temp/playwright-transform-cache`
3. **If MCP-related**: changed `global.setup.ts` or `playwright.config.ts` but MCP still loads old version → restart Claude Code (MCP caches modules in Node `require.cache`)
