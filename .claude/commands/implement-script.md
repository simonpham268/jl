# Implement Playwright Script from TC

**Trigger when user says** (any language/form): implement script, gen/write/code/automate script/spec/TC, convert TC to code, viết script, viết playwright, tạo script, code TC này.

---

You orchestrate spec generation from a TC markdown file. Delegate heavy work to agents — your job is to compose the spec and confirm it works.

## Step 1 — Load context

Read in this order:
1. The TC file (`src/cases/<feature>.md` — fallback `docs/TC-*.md` for legacy)
2. [`.claude/docs/framework-rules.md`](../docs/framework-rules.md) — conventions the spec MUST follow
3. [`.claude/docs/intent-mapping.md`](../docs/intent-mapping.md) — TC phrasing → method names

From the TC, extract:
- **Section**: public booking / admin login / admin rooms / admin report / ...
- **Step sequence** + expected outcomes
- **Test data + intents needed** (list method names you'll call, e.g. `goToBookingSection`, `clickBookNow`, `submitReservation`)

## Step 2 — Inspect live DOM via `dom-inspector` agent

Spawn with URL(s) + target elements. Skip only if app unreachable — then flag locators `// TODO: verify`.

## Step 3 — Discover existing POMs via `pom-discoverer` agent

```
Discover src/pages/AIT/. Intents needed: <list from Step 1>.
Return: existing methods table + missing intents flagged.
```

The agent returns: available class+method catalog + which intents are missing + suggested new POM file paths.

## Step 4 — Author missing POMs via `pom-author` agent (if needed)

For each missing POM in Step 3's output, spawn `pom-author`:

```
Create src/pages/AIT/<file>.page.ts:
- className: <Name>Page
- locators: <table from dom-inspector Step 2>
- methods: [
    { name: 'goToBookingSection', signature: '(): Promise<void>', description: '...', body: 'goto + assert' },
    ...
  ]
```

Agent writes the file. Returns summary. Repeat for each missing POM.

## Step 5 — Load API context (if TC calls services)

If TC uses `roomService` / asserts API status → load the [`ait-api-quirks` skill](../skills/ait-api-quirks/SKILL.md).

## Step 6 — Write the spec

Compose per [`framework-rules.md`](../docs/framework-rules.md):
- §1 Spec discipline (no `page.*`, no `test.step` wrappers, no comments)
- §4 Login pattern (admin: `goToBaseURL`; public: opt out of storage state)
- §8 Test header + name format

Write to `src/tests/<feature>.spec.ts` via the `Write` tool. Use ONLY method names from Step 3/4 — never invent.

## Step 7 — Audit via `compliance-checker` agent

```
Audit src/tests/<feature>.spec.ts (POMs auto-discovered from imports).
```

Agent walks P2.1 → P2.10. For each `✗` violation, fix immediately, then re-spawn the agent to confirm clean. Loop until `Verdict: clean`.

## Step 8 — Confirm execution via `spec-runner` agent (auto-fix loop)

```
Run src/tests/<feature>.spec.ts and report pass/fail.
```

- **PASS** → Proceed to Step 9 for full quality evaluation.
- **FAIL** → Apply priority-matched fix using `spec-runner`'s classification, then re-spawn `spec-runner` to confirm. Loop until PASS or 3 consecutive fails (then stop and tell user).

| Classification | Fix approach | Tools |
|---|---|---|
| P1.1 DOM Locator | Re-spawn `dom-inspector` for failing element → `Edit` POM locator | `dom-inspector` agent |
| P1.2 Timing | Replace `waitForURL` with element-based wait (e.g. `expect(...).toBeVisible()`) | Edit POM |
| P1.3 Interaction | `dom-inspector` to verify state → add `waitFor({ state: 'visible' })` + `scrollIntoViewIfNeeded()` before action | `dom-inspector` agent + Edit POM |
| P1.4 API Response | Load [`ait-api-quirks`](../skills/ait-api-quirks/SKILL.md) skill → match quirk → Edit assertion (status code, `findRoomByName`, lastname length, etc.) | `ait-api-quirks` skill |
| P2 Compliance | Should have been caught in Step 7. Re-run `compliance-checker`, apply fixes from violations table | `compliance-checker` agent |

Forward healing only — never touch passing code. See [healing-rules.md](../docs/healing-rules.md) for full priority playbook.

**Stop conditions:**
- PASS achieved → Step 9.
- 3 consecutive fails with same classification → stop, surface the issue to user (likely needs human review).
- Stale cache suspected (same error after correct-looking fix) → see [healing-rules §Stale-cache](../docs/healing-rules.md#stale-cache-troubleshooting).

## Step 9 — Quality scorecard via `spec-evaluator` agent

```
Evaluate src/tests/<feature>.spec.ts against src/cases/<feature>.md (3-run stability).
```

The agent runs the spec 3 times (stability check), measures code metrics + coverage + lint, and returns a multi-dimensional scorecard with `Verdict`.

| Verdict | Action |
|---|---|
| `ship it.` (≥ 95) | Done. Show user the scorecard + spec path. |
| `good, minor improvements possible.` (85–94) | Show user. Ask if they want to apply suggestions or commit as-is. |
| `needs attention.` (70–84) | Apply top 2 fixes from the report, re-run `spec-evaluator`. Loop until ≥ 85. |
| `do NOT commit.` (< 70) | Stop, surface report to user. Likely model output drifted from rules — needs human review. |

For unstable specs (stability < 100% in 3 runs): consider adding `page.reload()` before assertion, or extending element-wait timeouts. See `healing-rules §P1.2`.
