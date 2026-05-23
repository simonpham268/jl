# Framework Rules — AIT Playwright Automation

> Conventions all specs + POMs must follow. Grouped by topic. Cross-references:
> - Intent → method translation: [`intent-mapping.md`](./intent-mapping.md)
> - When to apply which fix: [`healing-rules.md`](./healing-rules.md)
> - AIT API response shapes + validation: [`../skills/ait-api-quirks/SKILL.md`](../skills/ait-api-quirks/SKILL.md)

---

## 1. Spec Discipline (what specs MUST and MUST NOT contain)

**Spec files (`src/tests/*.spec.ts`) are orchestration only.** All interactions live in POM methods.

| MUST | MUST NOT |
|---|---|
| Test header `/** ID: {id} Tags: {tags} */` above each `test()` | `page.click()`, `page.fill()`, `page.goto()`, `page.locator()`, `page.getByRole()` |
| Test name `[TC{id}] @{tag} @Regression: {desc}` | `test.step()` wrappers (POM methods already wrap) |
| Call POM methods only | Step comments like `// Step 1: ...`, `// Expected: ...` |
| `expect()` at end of flow (mid-flow only if TC asserts mid-step) | `try/catch` around navigation/clicks |
| Single source of truth for shared data (top of `describe`) | Hardcoded duplicated data across tests |

```typescript
// ✅ Correct spec body
/** ID: TC001 Tags: Smoke, API-UI */
test('[TC001] @Smoke @Regression: Create room via API, verify on UI', async ({ roomService }) => {
  const roomData = { roomName: `QA-${Date.now()}`, type: 'Double', accessible: true, roomPrice: 150 };
  const resp = await roomService.createRoom(roomData);
  expect(resp.status).toBe(200);

  await adminRoomsPage.navigateToRooms();
  await adminRoomsPage.assertRoomDisplayed(roomData.roomName, roomData.type, roomData.roomPrice);
});
```

---

## 2. Page Object Model

**One POM per page.** Place in `src/pages/AIT/<page-name>.page.ts` (kebab-case + `.page.ts` suffix).

### Structure

```typescript
import type { Locator, Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { BasePage } from '../base.page';

export class AdminLoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = this.page.getByPlaceholder('Enter username');
    this.passwordInput = this.page.getByPlaceholder('Password');
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
  }

  async login(username: string, password: string): Promise<void> {
    await test.step(`Login as ${username}`, async () => {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
    });
  }
}
```

### POM rules

| Rule | Detail |
|---|---|
| **Extend `BasePage`** | Inherits `baseURL`, `elementTimeout`, `navigationTimeout`, `waitDisappearTimeout`, `navigateTo()`, `getText()`, `getAttribute()`, `waitForLocatorToDisappear()`, `scrollUntilVisible()` |
| **Locators as `readonly`** in constructor | NEVER define locators as local `const` in methods |
| **Method bodies wrap in `test.step()`** | One `test.step` per method body — descriptive step name |
| **Selector arrays/strategies as class props** | If you need fallbacks, store the array on the class |
| **Actions + assertions allowed** | `assert*()` methods that own their `expect()` are fine — keeps spec lean |
| **Context ownership** | Method belongs to the page that contains/displays the element |
| **Return data for verification** when the spec needs it (e.g. `getRoomCount()` returns number) |
| **Silent fallback** in `catch` blocks — no `console.log` |

### Multi-step Collapse

Any TC step describing numbered sub-actions → ONE POM method, not N method calls. See [`intent-mapping.md` Multi-step Collapse](./intent-mapping.md#multi-step-collapse-rule).

---

## 3. Locator Strategy

**Priority order** (try in this sequence, fall back when previous unavailable):

1. `getByRole('button|link|textbox|...', { name: '<exact>' })` — most stable
2. `getByPlaceholder('<exact>')` — AIT admin login uses placeholders, NOT linked labels
3. `getByLabel('<exact>')` — only when label is linked via `for`/`aria-labelledby`
4. `locator('[data-testid="..."]')` — verify it exists in DOM first
5. `locator('#id')`
6. `locator('div.row', { hasText: 'X' })` — for Bootstrap grid rows on admin Rooms list
7. `getByText('<exact>')` — last resort

**Inspect live DOM before guessing.** Use the `dom-inspector` agent or `browser_snapshot` MCP tool.

### AIT-specific gotchas

| Where | Gotcha |
|---|---|
| Admin login form | Label text NOT linked to input. `getByRole('textbox', { name: 'Username' })` times out. Use `getByPlaceholder('Enter username')` |
| Admin Rooms list | No `data-testid`. Each room is a Bootstrap `div.row` containing `<p>` columns. Use `locator('div.row', { hasText: roomName }).first()` |
| Multiple "Book now" on homepage | Use `.nth(i)` — first room is `.nth(0)` |
| Post-create state on admin | UI does NOT auto-refresh after API create. Use `page.goto('/admin/rooms')` not click on Rooms link (no-op if already there) |

---

## 4. Login Patterns

Choose by section, not per-test guess:

### Admin tests (`/admin/*`)

Storage state from `playwright.config.ts` default (`.auth/ait-admin.json` — saved by `global.setup.ts`).

```typescript
test.describe('Admin feature', () => {
  let adminLoginPage: AdminLoginPage;

  test.beforeEach(async ({ page }) => {
    adminLoginPage = new AdminLoginPage(page);
    await adminLoginPage.goToBaseURL();          // navigate, storage state auto-applies
  });
});
```

### Public booking tests (`/`, `/reservation/*`)

Opt out of storage state — public pages don't need (and may be confused by) admin cookies:

```typescript
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Public booking', () => {
  test.beforeEach(async ({ page }) => {
    bookingHomePage = new BookingHomePage(page);
    await bookingHomePage.goToBookingSection();
  });
});
```

---

## 5. API Services (for preconditions + cleanup)

Available services in [`src/api/services/`](../../src/api/services/):

| Service | Methods |
|---|---|
| `roomService` | `createRoom`, `listRooms`, `findRoomByName`, `deleteRoom`, `createBooking`, `deleteBooking` |

Import via fixture, not directly:

```typescript
import { test, expect } from '../fixtures/custom.fixture';

test('...', async ({ roomService }) => {
  const resp = await roomService.createRoom({ roomName: 'X', type: 'Double', accessible: true, roomPrice: 150 });
});
```

### Typed responses — never `as any`

```typescript
// ✅ Correct
if (!response.body) throw new Error('No response body');
const bookingId = response.body.bookingid;
if (!bookingId) throw new Error('Missing bookingid');

// ❌ Wrong
const bookingId = (response.body as any).bookingid;
```

If a field exists at runtime but missing from interface → **update `src/api/models/room.model.ts` first**, then access cleanly.

### AIT API response shapes + validation rules

See [`ait-api-quirks` skill](../skills/ait-api-quirks/SKILL.md) — auto-loaded when API code is touched. Top 3:

1. `POST /api/room/` → `200` + `{success: true}` (NO `roomid`). Use `findRoomByName()` to look up.
2. `POST /api/booking/` → `201` + `{bookingid, ...}`. Validation: firstname/lastname 3–30 chars, phone 11–21 chars.
3. `GET /api/booking/` requires `?roomid=N` query param.

---

## 6. Data Builders

Use when an entity has > 3 configurable fields and you write many variants across specs. Pattern:

```typescript
// src/data/room.data.ts (create when needed)
export class RoomBuilder {
  private data: CreateRoomRequest;
  private constructor(roomName: string) {
    this.data = { roomName, type: 'Single', accessible: false, roomPrice: 100 };
  }
  static create(roomName?: string): RoomBuilder {
    return new RoomBuilder(roomName ?? `QA-${Date.now()}`);
  }
  type(v: string): this { this.data.type = v; return this; }
  accessible(v: boolean): this { this.data.accessible = v; return this; }
  price(v: number): this { this.data.roomPrice = v; return this; }
  features(...v: string[]): this { this.data.features = v; return this; }
  build(): CreateRoomRequest { return { ...this.data }; }
}

// Usage
const roomData = RoomBuilder.create().type('Double').price(150).features('WiFi', 'TV').build();
```

If only 1–2 tests use the entity → inline literal is fine. Don't pre-build.

---

## 7. Live DOM Inspection (mandatory)

**Never guess selectors from TC text alone.** Inspect the live page before writing or fixing any locator.

Tools:
- `dom-inspector` agent — preferred, returns structured locator recommendations
- `mcp__playwright-test__browser_snapshot` — direct MCP call when iterating
- `test_debug` MCP tool — for healing context (captures DOM at failure point)

Skip inspection only if app is unreachable (network error) — then flag locators as `// TODO: verify in DOM`.

---

## 8. Test Header + Naming

```typescript
/** ID: TC001 Tags: Smoke, API-UI-Verify */
test('[TC001] @Smoke @Regression: Create room and booking via API, verify on Admin UI', async ({ roomService }) => {
```

| Slot | Format |
|---|---|
| ID | `TC{number}` — matches the TC file's `## ID:` |
| Tags (block comment) | comma-separated, descriptive |
| Test name prefix | `[TC{id}]` |
| Test name tags | `@Smoke`, `@Regression`, `@Validation`, ... |
| Description | What the test verifies in one line |

---

## 9. Code Style (ESLint)

| Rule | Example |
|------|---------|
| `semi` | `const x = 1;` |
| `quotes` (single) | `'hello'` |
| `indent` (2 spaces) | |
| `comma-spacing` | `foo(a, b)` |
| `space-infix-ops` | `x = 1` |
| `keyword-spacing` | `if (x)` |
| `object-curly-spacing` | `{ a: 1 }` |
| `arrow-spacing` | `(a) => a` |

No trailing spaces, no multiple empty lines, no space before `()` or `.`.

---

## 10. Project Structure Reference

```
src/
├── api/{base,config,endpoints,models,services}/
├── cases/             <feature>.md
├── constants/
├── fixtures/          custom.fixture.ts
├── pages/
│   ├── base.page.ts   BasePage with timeouts + utilities
│   └── AIT/<page>.page.ts
├── tests/             <feature>.spec.ts
├── utils/
├── global.setup.ts    Saves .auth/ait-admin.json
└── global.teardown.ts
```

App: [automationintesting.online](https://automationintesting.online) — public booking (`/`, `/#booking`, `/reservation/N`) + admin (`/admin`, `/admin/rooms`, `/admin/report`, `/admin/branding`, `/admin/message`).
