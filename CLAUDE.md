# CLAUDE.md — Claude Code Instructions

> Multi-domain Playwright automation framework.
> - **AIT** (Restful Booker Platform Demo — [automationintesting.online](https://automationintesting.online)) — public booking + admin (Rooms / Report) over REST API, cookie auth via `storageState`.
> - **Petstore** (Swagger demo — [petstore.swagger.io](https://petstore.swagger.io)) — pure API, Bearer JWT auth via fixture.

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
├── api/                          AIT API (cookie auth — inherits playwright.config storageState)
│   ├── base/                     api.client.ts (HTTP wrapper), api.response.ts (ApiResponse<T>)
│   ├── config/                   api.config.ts (defaultHeaders)
│   ├── endpoints/                room.endpoints.ts (+ index.ts)
│   ├── models/                   room.model.ts — Room, Booking, RoomType union (+ index.ts)
│   └── services/                 room.service.ts — create/list/find/delete room + booking
├── petstore/                     Petstore API (Bearer JWT — token file via fixture)
│   ├── base/                     PetstoreClient (.setBearerToken), ApiResponse
│   ├── builders/                 pet.builder.ts (fluent builder)
│   ├── config/                   PETSTORE_CONFIG (tokenFile path)
│   ├── endpoints/                auth.endpoints, pet.endpoints (+ index)
│   ├── models/                   auth.model (Login req/resp), pet.model (Pet, PetStatus)
│   ├── services/                 AuthService, PetService (+ index)
│   └── index.ts                  top-level barrel
├── cases/                        {feature}.md — TC source markdown
├── constants/                    AIT_ERRORS, HTTP_STATUS, ADMIN_ROUTES (+ index barrel)
├── data/                         AIT builders — room.builder, booking.builder (+ index barrel)
├── fixtures/                     custom.fixture.ts (apiClient, roomService, petstoreClient, petService)
├── pages/AIT/                    admin-login, admin-rooms, admin-report, booking-home, reservation
├── tests/
│   ├── ait/                      AIT specs — booking.spec, api-create-ui-verify.spec
│   └── petstore/                 Petstore specs — pet.spec
├── utils/                        env.ts (requireEnv helper)
├── global.setup.ts               AIT browser login → storage state; Petstore API login → token file
└── global.teardown.ts

.claude/
├── commands/                     implement-script.md, fix-script.md
├── agents/                       dom-inspector, spec-runner, pom-discoverer, pom-author, compliance-checker, spec-evaluator
├── skills/ait-api-quirks/SKILL.md
└── docs/                         framework-rules.md, intent-mapping.md, healing-rules.md
```

---

## 3. Reading Local Files

| File type | How to read |
|-----------|------------|
| `.md`, `.txt`, `.ts`, `.json`, `.yml` | Use `Read` tool directly |
| `.docx` | `Read` cannot open binary — use Bash: `node -e "const m = require('mammoth'); m.extractRawText({path: 'FILE.docx'}).then(r => console.log(r.value))"` |
| `.pdf` | `Read` tool — for PDFs > 10 pages specify `pages` range (e.g. `"1-10"`, max 20 pages per read) |

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
| Login pattern | AIT admin: cookie via `storageState`. Public booking: `test.use({ storageState: { cookies: [], origins: [] } })`. Petstore: Bearer header via fixture |
| Test header | `/** ID: TC001 Tags: smoke, regression */` above each `test()` |
| Test name | `[TC001] @Smoke @Regression: <description>` |
| Test location | AIT specs → `src/tests/ait/`. Petstore specs → `src/tests/petstore/` |
| Data | Inline OK if 1 spec. Builders if shared: AIT in `src/data/`, Petstore in `src/petstore/builders/` |
| Constants | `AIT_ERRORS`, `HTTP_STATUS`, `ADMIN_ROUTES` — import from `src/constants` |
| Import (API + UI) | `import { test, expect } from '../../fixtures/custom.fixture';` |
| Import (UI only, opt out of storageState) | `import { test, expect } from '@playwright/test';` |

---

## 6. AIT API Quirks (top 3 — full list in `ait-api-quirks` skill)

1. **`POST /api/room/` returns 200 + `{success: true}`** — NO `roomid` in response. Use `roomService.findRoomByName(name)` to look up the ID.
2. **`POST /api/booking/` validation lengths**: `firstname`/`lastname` 3–30 chars, `phone` 11–21 chars. `'QA'` (2 chars) gets rejected with `"size must be between 3 and 30"`.
3. **`GET /api/booking/` requires `?roomid=N`** query param — without it returns `400 "Room ID is required"`.

---

## 7. Common Commands

```bash
# Run tests — by env
npm test                                              # All tests, chromium, uat env (default)
npm run test:uat | test:staging | test:prelive | test:live

# Run tests — by domain
npm run test:ait                                      # AIT specs only
npm run test:petstore                                 # Petstore specs only
npm run test:smoke                                    # @Smoke tag (cross-domain)

# Run tests — other
npm run test:firefox                                  # Firefox project
npm run test:quick                                    # Line reporter, chromium
npx playwright test src/tests/ait/<file>.spec.ts      # Single file
npx playwright test --grep "TC001" --workers=1        # Single test, sequential

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
