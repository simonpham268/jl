# CLAUDE.md — Claude Code Instructions

> Playwright automation framework for **AIT** (Restful Booker Platform Demo — [automationintesting.online](https://automationintesting.online)).
> Public booking flow + admin section (Rooms / Report / Branding / Messages) over REST API.

---

## 1. Skills & Commands — When to Invoke

| User intent | Skill / Command |
|---|---|
| Convert a TC `.md` → Playwright spec | `implement-script` |
| Fix a failing spec, diagnose flake | `fix-script` (delegates to `spec-runner` agent — never guess-fix) |
| Reference AIT API quirks (status codes, validation lengths, lookup patterns) | `ait-api-quirks` skill (auto-loads when `roomService` / `/api/*` appears in code) |

Full command instructions live in `.claude/commands/`. They internally delegate to:

| Helper | Role | Location |
|---|---|---|
| `dom-inspector` agent | Drives Playwright MCP → returns locator recommendations | `.claude/agents/dom-inspector.md` |
| `spec-runner` agent | Runs spec + parses failure → returns root-cause analysis | `.claude/agents/spec-runner.md` |
| `pom-discoverer` agent | Scans POMs → returns class/method signatures table (use BEFORE writing/fixing a spec) | `.claude/agents/pom-discoverer.md` |
| `pom-author` agent | Creates/extends POM files from a locator table + method intents | `.claude/agents/pom-author.md` |
| `compliance-checker` agent | Audits a spec + its POMs against framework-rules conventions | `.claude/agents/compliance-checker.md` |
| `spec-evaluator` agent | Computes a quality scorecard (pass/stability/coverage/lint) for a spec | `.claude/agents/spec-evaluator.md` |
| `ait-api-quirks` skill | API response shapes + validation rules (room/booking) | `.claude/skills/ait-api-quirks/` |

Framework rules live in `.claude/docs/`:
- `framework-rules.md` — 10 sections covering spec discipline, POM, locators, login, API services, builders, DOM inspection, naming, ESLint, project layout
- `intent-mapping.md` — intent → method mappings, AIT URL patterns
- `healing-rules.md` — priority-ordered healing rules + AIT API quirks table

---

## 2. Project Structure

```
src/
├── api/
│   ├── base/          api.client.ts, api.response.ts
│   ├── config/        api.config.ts
│   ├── endpoints/     room.endpoints.ts (+ index.ts)
│   ├── models/        room.model.ts (+ index.ts)
│   └── services/      room.service.ts (createRoom, listRooms, findRoomByName, deleteRoom, createBooking, deleteBooking)
├── cases/             {feature}.md — TC source markdown (currently booking.md)
├── constants/         error-messages, http-status, rounding, route constants
├── fixtures/          custom.fixture.ts (apiClient + roomService)
├── pages/AIT/         admin-login, admin-rooms, admin-report, booking-home, reservation page objects
├── tests/             {feature}.spec.ts — Playwright specs (booking, api-create-ui-verify, seed)
├── utils/             require.env.ts
├── global.setup.ts    Saves AIT admin storage state → .auth/ait-admin.json
└── global.teardown.ts

.claude/
├── commands/          implement-script.md, fix-script.md
├── agents/            dom-inspector.md, spec-runner.md, pom-discoverer.md, pom-author.md, compliance-checker.md, spec-evaluator.md
├── skills/ait-api-quirks/SKILL.md
└── docs/              framework-rules.md, intent-mapping.md, healing-rules.md
```

---

## 3. Reading Local Files

| File type | How to read |
|-----------|------------|
| `.md`, `.txt`, `.ts`, `.json`, `.yml` | Use `Read` tool directly |
| `.docx` | `Read` cannot open binary — use Bash: `node -e "const m = require('mammoth'); m.extractRawText({path: 'FILE.docx'}).then(r => console.log(r.value))"` |
| `.pdf` | `Read` tool — for PDFs > 10 pages specify `pages` range (e.g. `"1-10"`, max 20 pages per read) |
| `.xlsx` | Bash: `node -e "const x = require('xlsx'); const wb = x.readFile('FILE.xlsx'); console.log(x.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]]))"` |

---

## 4. Test Case Format Rules

Every TC (`src/cases/<feature>.md`) MUST follow:

1. Every step has an `Expected` result
2. One specific UI action per step (click, type, select, navigate)
3. Use exact UI element names — `'Reserve now'` button, `'Enter username'` placeholder
4. Specify navigation paths — `"Admin > Rooms"`, `"Homepage > #booking section"`
5. Include element locations when ambiguous — `"top-right of admin nav"`, `"first room card"`
6. Minimum 5 steps per scenario
7. No vague instructions:

| Wrong | Right |
|-------|-------|
| "Navigate to admin" | "Click `'Login'` button after entering credentials on `/admin`" |
| "Fill the form" | "Enter `'simmon'` in firstname, `'pham'` in lastname, `'01234567890'` in phone" |
| "Click submit" | "Click `'Reserve now'` button at the bottom of the reservation form" |

---

## 5. Key Framework Conventions (cheatsheet)

| Rule | Detail |
|---|---|
| Locator priority | Role → Placeholder → Label → data-testid → ID → CSS → Text |
| POM locators | ALL `readonly` in constructor, NEVER local `const` in methods |
| POM methods | Wrap in `await test.step('...', async () => { ... })` |
| Spec body | NO `page.click/fill/locator/goto` — only POM method calls. NO `test.step` wrappers. NO step comments |
| Login pattern | Admin: `adminLoginPage.goToBaseURL()` in `beforeEach`. Public: `test.use({ storageState: { cookies: [], origins: [] } })` |
| Test header | `/** ID: TC001 Tags: smoke, regression */` above each `test()` |
| Test name | `[TC001] @Smoke @Regression: <description>` |
| Import (API + UI) | `import { test, expect } from '../fixtures/custom.fixture';` |
| Import (UI only) | `import { test, expect } from '@playwright/test';` |

---

## 6. AIT API Quirks (top 3 — full list in `ait-api-quirks` skill)

1. **`POST /api/room/` returns 200 + `{success: true}`** — NO `roomid` in response. Use `roomService.findRoomByName(name)` to look up the ID.
2. **`POST /api/booking/` validation lengths**: `firstname`/`lastname` 3–30 chars, `phone` 11–21 chars. `'QA'` (2 chars) gets rejected with `"size must be between 3 and 30"`.
3. **`GET /api/booking/` requires `?roomid=N`** query param — without it returns `400 "Room ID is required"`.

---

## 7. Common Commands

```bash
# Run tests
npm test                                              # All tests, chromium, uat env (config default)
npm run test:uat                                      # Explicit uat env
npm run test:staging                                  # Staging env
npm run test:prelive                                  # Prelive env
npm run test:live                                     # Live env
npm run test:firefox                                  # Firefox project
npm run test:quick                                    # Line reporter, chromium
npx playwright test src/tests/<file>.spec.ts          # Single file
npx playwright test --grep "TC001" --workers=1       # Single test, sequential

# Lint
npm run lint                                          # ESLint over src/
npm run lint:fix                                      # ESLint with --fix

# Reports
npm run allure:generate                               # Build Allure report
npm run allure                                        # Generate + open

# Browser install (once per machine)
npm run install:browsers
```

---

## 8. Stale-cache Troubleshooting

If a code change doesn't take effect:

1. Verify the file on disk matches your edit (`Read` it back)
2. Clear Playwright transform cache: `rm -rf c:/Users/$USER/AppData/Local/Temp/playwright-transform-cache`
3. If `global.setup.ts` or `playwright.config.ts` changed but MCP still uses old version → restart Claude Code (MCP server caches modules in Node `require.cache`)
