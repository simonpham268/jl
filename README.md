# Playwright Automation Framework

Multi-domain Playwright TypeScript framework demonstrating two distinct auth patterns side-by-side:

| Domain | Auth | Files |
|---|---|---|
| **AIT** ([Restful Booker Platform Demo](https://automationintesting.online)) | Cookie via `storageState` | `src/api/`, `src/pages/AIT/`, `src/tests/ait/` |
| **Petstore** ([Swagger v2 demo](https://petstore.swagger.io)) | Bearer JWT via fixture | `src/petstore/`, `src/tests/petstore/` |

Built to demonstrate end-to-end patterns: API preconditions + UI verification, POM with strict locator discipline, data builders, agentic test generation/healing via Claude Code.

---

## Quick start

```bash
# 1. Install
npm install
npm run install:browsers          # one-time per machine

# 2. Configure secrets (one-time)
cp .env.local.example .env.local  # then fill PETSTORE_USERNAME/PASSWORD if testing real Petstore

# 3. Run tests
npm test                          # all specs, uat env
npm run test:ait                  # AIT only
npm run test:petstore             # Petstore only
npm run test:smoke                # @Smoke tag across domains

# 4. Reports
npm run allure                    # generate + open Allure
```

First run takes longer — `global.setup.ts` opens a browser, logs into AIT admin (saves cookie to `.auth/ait-admin.json`), then calls Petstore login (saves Bearer token to `.auth/petstore-token.json`). Subsequent runs reuse both.

---

## Repo structure

```
.
├─ .auth/                       # Saved auth state (gitignored)
│  ├─ ait-admin.json            # AIT cookie storageState
│  └─ petstore-token.json       # Petstore Bearer JWT
├─ .claude/                     # Claude Code workspace
│  ├─ commands/                 # Slash commands: implement-script, fix-script
│  ├─ agents/                   # dom-inspector, spec-runner, pom-discoverer, pom-author, compliance-checker, spec-evaluator
│  ├─ skills/ait-api-quirks/    # AIT API response/validation reference
│  └─ docs/                     # framework-rules.md, intent-mapping.md, healing-rules.md
├─ .env.{uat,staging,prelive}   # Public env configs (URLs, timeouts) — committed
├─ .env.local.example           # Schema template — committed
├─ .env.local                   # Real credentials — gitignored
├─ .github/workflows/           # CI (playwright.yml) — auto-deploys Allure report to GitHub Pages
├─ allure-report/               # Generated HTML (gitignored)
├─ allure-results/              # Raw results (gitignored)
├─ test-results/                # Playwright traces/screenshots
├─ src/
│  ├─ api/                      # AIT API module (cookie auth)
│  │  ├─ base/                  # api.client.ts, api.response.ts
│  │  ├─ config/                # defaultHeaders
│  │  ├─ endpoints/             # room.endpoints.ts (+ index)
│  │  ├─ models/                # room.model.ts (Room, Booking, RoomType union)
│  │  └─ services/              # room.service.ts (createRoom, findRoomByName, createBooking, ...)
│  ├─ petstore/                 # Petstore module (Bearer JWT)
│  │  ├─ base/                  # PetstoreClient (.setBearerToken)
│  │  ├─ builders/              # pet.builder.ts
│  │  ├─ config/                # PETSTORE_CONFIG (tokenFile path)
│  │  ├─ endpoints/             # auth.endpoints, pet.endpoints
│  │  ├─ models/                # auth.model, pet.model
│  │  ├─ services/              # AuthService, PetService
│  │  └─ index.ts               # top-level barrel
│  ├─ cases/                    # TC source markdown
│  ├─ constants/                # AIT_ERRORS, HTTP_STATUS, ADMIN_ROUTES (+ index)
│  ├─ data/                     # AIT builders — room.builder, booking.builder (+ index)
│  ├─ fixtures/
│  │  └─ custom.fixture.ts      # apiClient, roomService, petstoreClient, petService
│  ├─ pages/
│  │  ├─ base.page.ts           # Shared timeouts + utilities
│  │  └─ AIT/                   # admin-login, admin-rooms, admin-report, booking-home, reservation
│  ├─ tests/
│  │  ├─ ait/                   # AIT specs (api-create-ui-verify, booking)
│  │  └─ petstore/              # Petstore specs (pet)
│  ├─ utils/                    # env.ts (requireEnv helper)
│  ├─ global.setup.ts           # AIT browser login + Petstore API login
│  └─ global.teardown.ts
├─ CLAUDE.md                    # Claude Code instructions (auto-loaded)
├─ package.json
└─ playwright.config.ts
```

---

## Test architecture

| Layer | Where | Convention |
|---|---|---|
| **TC source** | `src/cases/<feature>.md` | Plain markdown — one feature per file |
| **Spec** | `src/tests/{ait,petstore}/<feature>.spec.ts` | NO `page.*` calls — only POM/service calls + assertions |
| **POM (AIT)** | `src/pages/AIT/<page>.page.ts` | All locators `readonly` in constructor; methods wrap in `test.step()` |
| **Service (AIT)** | `src/api/services/<entity>.service.ts` | Typed `ApiClient` wrapper; returns `ApiResponse<T>` |
| **Service (Petstore)** | `src/petstore/services/<entity>.service.ts` | Typed `PetstoreClient` wrapper |
| **Data builders** | `src/data/` (AIT) · `src/petstore/builders/` (Petstore) | Fluent builders for entities with > 3 fields |
| **Constants** | `src/constants/` | `AIT_ERRORS`, `HTTP_STATUS`, `ADMIN_ROUTES` — `as const` |
| **Fixtures** | `src/fixtures/custom.fixture.ts` | `apiClient`, `roomService`, `petstoreClient`, `petService` |

### Auth patterns — 3 distinct flows

| Flow | Where | How |
|---|---|---|
| **AIT admin** (cookie) | `playwright.config.ts:use.storageState` | `global.setup.ts` does UI login → saves to `.auth/ait-admin.json`. All AIT page+API requests auto-attach cookie via domain match. |
| **AIT public booking** (no auth) | Spec-level | `test.use({ storageState: { cookies: [], origins: [] } })` opts out per file |
| **Petstore** (Bearer JWT) | `custom.fixture.ts:petstoreClient` | `global.setup.ts` POSTs `/auth/login` → token file. Fixture reads token + `setBearerToken()` per test. |

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
# Tests — by env
npm test                                              # All specs, uat env (default)
npm run test:uat | test:staging | test:prelive | test:live

# Tests — by domain
npm run test:ait                                      # AIT specs only
npm run test:petstore                                 # Petstore specs only
npm run test:smoke                                    # @Smoke tag (cross-domain)

# Tests — other
npm run test:firefox                                  # Firefox project
npm run test:quick                                    # Line reporter
npx playwright test src/tests/ait/<file>.spec.ts      # Single file
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
| `Missing required env: AIT_ADMIN_USERNAME` (or similar) | Create `.env.local` from `.env.local.example` and fill credentials |
| `401 Unauthorized` on AIT `/api/*` | Verify `.auth/ait-admin.json` exists + has `token` cookie. Check `storageState` in `playwright.config.ts` |
| `401 Unauthorized` on Petstore `/pet` etc. | Verify `.auth/petstore-token.json` exists. Check `global.setup.ts` Petstore login step ran successfully |
| `globalSetup` times out at AIT login | Inspect actual locators — placeholder/label may not be linked. See `.claude/docs/healing-rules.md` P1.1 |
| Create room returns 200 but spec asserts 201 | AIT API quirk — use 200. See `ait-api-quirks` skill |
| Booking create returns 400 "size between 3 and 30" | `firstname`/`lastname` < 3 chars |
| Booking create returns 400 "size between 11 and 21" | `phone` outside 11-21 chars |
| Petstore POST /pet returns 500 (transient) | Petstore demo server hiccup — re-run. Persistent 500 = use v2 (`petstore.swagger.io/v2`) not v3 |
| Petstore POST /pet pass but afterEach DELETE 404 | JS loses precision on int64 IDs — provide own `id: Date.now()` in builder |
| MCP `generator_setup_page` uses stale `global.setup.ts` | Restart Claude Code (MCP caches modules in `require.cache`) |
| Playwright transform cache stuck | `rm -rf c:/Users/$USER/AppData/Local/Temp/playwright-transform-cache` |

---

## References

- [Playwright Docs](https://playwright.dev) · [POM](https://playwright.dev/docs/pom) · [Best Practices](https://playwright.dev/docs/best-practices)
- [Restful Booker Platform API Swagger](https://automationintesting.online/auth/swagger-ui/index.html)
- [Petstore Swagger v2](https://petstore.swagger.io/) · [v3](https://petstore3.swagger.io/)
- [Claude Code](https://docs.claude.com/en/docs/claude-code)
