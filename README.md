# AIT Playwright Automation

Playwright TypeScript framework testing the **Restful Booker Platform Demo** ([automationintesting.online](https://automationintesting.online)) — a public hotel booking site with admin section (Rooms, Report, Branding, Messages) over REST API.

Built to demonstrate end-to-end automation patterns: API preconditions + UI verification, POM with strict locator discipline, agentic test generation/healing via Claude Code.

---

## Quick start

```bash
# 1. Install
npm install
npm run install:browsers          # one-time per machine

# 2. Configure env (defaults to uat)
# .env.uat already contains AIT_BASE_URL=https://automationintesting.online

# 3. Run tests
npm test                          # all specs
npx playwright test src/tests/api-create-ui-verify.spec.ts --workers=1
npx playwright test --grep "TC001" --headed

# 4. Reports
npm run allure                    # generate + open Allure
```

First run takes longer — `global.setup.ts` opens a browser, logs into AIT admin, and saves storage state to `.auth/ait-admin.json`. Subsequent runs reuse the saved session.

---

## Repo structure

```
.
├─ .auth/                    # Saved storage state (gitignored)
│  └─ ait-admin.json         # Token cookie for AIT admin
├─ .claude/                  # Claude Code workspace
│  ├─ commands/              # User-invocable slash commands
│  │  ├─ implement-script.md   # Convert TC.md → Playwright spec
│  │  └─ fix-script.md         # Heal a failing spec
│  ├─ agents/                # Specialized subagents
│  │  ├─ dom-inspector.md      # Drives Playwright MCP, returns locator info
│  │  └─ spec-runner.md        # Runs spec + parses failure
│  ├─ skills/                # Lazy-loaded knowledge
│  │  └─ ait-api-quirks/       # AIT API response/validation reference
│  └─ docs/                  # Framework reference (read by commands)
│     ├─ framework-rules.md    # 24 rules: POM, locators, ESLint, ...
│     ├─ intent-mapping.md     # Keyword → method mapping
│     └─ healing-rules.md      # Priority-ordered healing playbook
├─ .env.{uat,staging,prelive} # Environment configs (AIT_BASE_URL, PETSTORE_BASE_URL, ...)
├─ allure-report/            # Generated Allure HTML (gitignored)
├─ allure-results/           # Raw Allure result files (gitignored)
├─ template/                 # Excel templates for test case export
├─ test-results/             # Playwright failure traces/screenshots
├─ src/
│  ├─ api/
│  │  ├─ base/               # api.client.ts, api.response.ts
│  │  ├─ config/             # api.config.ts (default headers, timeouts)
│  │  ├─ endpoints/          # room.endpoints.ts
│  │  ├─ models/             # room.model.ts (request/response interfaces)
│  │  └─ services/           # room.service.ts (createRoom, findRoomByName, createBooking, ...)
│  ├─ cases/                 # Test case source markdown
│  │  └─ booking.md
│  ├─ constants/             # error-messages.const.ts, http-status.const.ts, ...
│  ├─ fixtures/
│  │  └─ custom.fixture.ts   # Exports apiClient + roomService fixtures
│  ├─ pages/
│  │  ├─ base.page.ts        # Shared timeouts + utilities
│  │  ├─ sample.page.ts      # Reference POM
│  │  └─ AIT/                # AIT-specific POMs
│  │     ├─ admin-login.page.ts
│  │     ├─ admin-rooms.page.ts
│  │     └─ admin-report.page.ts
│  ├─ tests/                 # Spec files
│  │  ├─ api-create-ui-verify.spec.ts
│  │  └─ seed.spec.ts
│  ├─ utils/                 # require.env.ts, date.util.ts, currency.util.ts, azured-devops/, jira/
│  ├─ global.setup.ts        # Admin login → save .auth/ait-admin.json
│  └─ global.teardown.ts
├─ CLAUDE.md                 # Claude Code instructions (auto-loaded)
├─ package.json
└─ playwright.config.ts
```

---

## Test architecture

| Layer | Where | Convention |
|---|---|---|
| **TC source** | `src/cases/<feature>.md` | Plain markdown — one feature per file |
| **Spec** | `src/tests/<feature>.spec.ts` | NO `page.*` calls — only POM method calls + assertions |
| **POM** | `src/pages/AIT/<page>.page.ts` | All locators `readonly` in constructor; methods wrap in `test.step()` |
| **Service** | `src/api/services/<entity>.service.ts` | Typed `ApiClient` wrapper; returns `ApiResponse<T>` |
| **Endpoints** | `src/api/endpoints/<entity>.endpoints.ts` | Plain string/function constants |
| **Models** | `src/api/models/<entity>.model.ts` | Request + response interfaces |
| **Fixtures** | `src/fixtures/custom.fixture.ts` | `apiClient`, `roomService` — extend Playwright base test |

### Login patterns

- **Admin tests** → use config-default `storageState: '.auth/ait-admin.json'` + call `adminLoginPage.goToBaseURL()` in `beforeEach`.
- **Public booking tests** → opt out with `test.use({ storageState: { cookies: [], origins: [] } })`.

### AIT API quirks (top 3 — full list in [`.claude/skills/ait-api-quirks/SKILL.md`](.claude/skills/ait-api-quirks/SKILL.md))

1. `POST /api/room/` returns **200** + `{success: true}` — **NO `roomid`**. Call `roomService.findRoomByName()` to look up.
2. `POST /api/booking/`: `firstname`/`lastname` 3-30 chars, `phone` 11-21 chars.
3. `GET /api/booking/` requires `?roomid=N` query param.

---

## Working with Claude Code

This repo is configured for Claude Code as an opinionated automation framework.

| Slash | When | What it does |
|---|---|---|
| `/implement-script booking.md` | Convert a TC → Playwright spec | Reads TC, inspects live DOM via `dom-inspector` agent, looks up existing POM methods, generates spec, runs `spec-runner` to confirm pass |
| `/fix-script src/tests/<file>.spec.ts` | Fix a failing test | Runs spec via `spec-runner`, classifies failure (P1.1-P1.4 or P2 compliance), inspects DOM if needed, applies fix per `healing-rules.md`, re-runs to confirm |

Full rules:
- [`.claude/docs/framework-rules.md`](.claude/docs/framework-rules.md) — 24 framework rules (POM, locators, builders, ESLint)
- [`.claude/docs/intent-mapping.md`](.claude/docs/intent-mapping.md) — natural language → method mapping
- [`.claude/docs/healing-rules.md`](.claude/docs/healing-rules.md) — priority-ordered healing playbook

---

## Common commands

```bash
# Tests
npm test                                              # All specs, uat env
npm run test:uat | test:staging | test:live | test:prelive
npx playwright test src/tests/<file>.spec.ts          # Single file
npx playwright test --grep "TC001" --workers=1        # Single test, sequential
npx playwright test --headed                          # Headed mode
npx playwright test --debug                           # Inspector

# Reports
npm run allure:generate                               # Build Allure HTML
npm run allure                                        # Generate + open

# Lint
npm run lint                                          # ESLint check
npm run lint:fix                                      # Auto-fix

# Browser install (once per machine)
npm run install:browsers
```

---

## Environment variables

### Public config — committed in `.env.{uat,staging,prelive}`

| Variable | Purpose |
|---|---|
| `AIT_BASE_URL` | AIT site URL per environment |
| `PETSTORE_BASE_URL` | Petstore API URL per environment |
| `TIMEOUT_ELEMENT` | Default element wait (ms, default 5000) |
| `TIMEOUT_NAVIGATION` | Page navigation wait (ms, default 60000) |
| `TIMEOUT_WAIT_DISAPPEAR` | Wait-for-hidden timeout (ms, default 10000) |

### Secrets — NOT committed

Schema lives in [`.env.local.example`](.env.local.example). Setup:

**Local dev (one-time):**
```bash
cp .env.local.example .env.local      # then fill credentials
```
`.env.local` is gitignored; dotenv merges it on top of `.env.{environment}` automatically.

**CI:** add the same vars as GitHub Secrets (repo Settings → Secrets and variables → Actions). The workflow injects them as job env.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| `401 Unauthorized` on any `/api/*` | Verify `.auth/ait-admin.json` exists; check `storageState` in `playwright.config.ts` |
| `globalSetup` times out at login | Inspect actual locators — placeholder/label may not be linked. See `.claude/docs/healing-rules.md` P1.1 |
| Create room returns 200 but spec asserts 201 | AIT API quirk — use 200. See `ait-api-quirks` skill |
| Booking create returns 400 "size between 3 and 30" | `firstname`/`lastname` < 3 chars |
| Booking create returns 400 "size between 11 and 21" | `phone` outside 11-21 chars |
| MCP `generator_setup_page` uses stale `global.setup.ts` | Restart Claude Code (MCP caches modules in `require.cache`) |
| Playwright transform cache stuck | `rm -rf c:/Users/$USER/AppData/Local/Temp/playwright-transform-cache` |

---

## References

- [Playwright Docs](https://playwright.dev) · [POM](https://playwright.dev/docs/pom) · [Best Practices](https://playwright.dev/docs/best-practices)
- [Restful Booker Platform API Swagger](https://automationintesting.online/auth/swagger-ui/index.html)
- [Claude Code](https://docs.claude.com/en/docs/claude-code)
