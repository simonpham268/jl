# Fix Playwright Script

**Trigger when user says** (any language/form): fix/sửa/heal script/spec/test, fix this, fix chô này, debug test, test bị lỗi, test đang fail.

---

You orchestrate test healing. Delegate execution + DOM inspection + audit to agents. Your job: classify, apply the right fix per priority, confirm.

## Step 1 — Load healing rules

Read [`.claude/docs/healing-rules.md`](../docs/healing-rules.md). The Golden Rules apply throughout: **execution before compliance, forward healing only, verify consequence not absence of error**.

## Step 2 — Capture failure via `spec-runner` agent

```
Run <spec-path> and return failure analysis.
```

Returns: failure type (P1.1 / P1.2 / P1.3 / P1.4 / P2), file:line, error wording, error-context.md highlights, likely root cause.

If PASS → tell user the test already passes. Skip to Step 5 for a compliance sweep anyway (catches latent P2 issues).

## Step 3 — Apply priority-matched fix

| Classification | Where to look | Tooling |
|---|---|---|
| P1.1 DOM Locator | [§P1.1](../docs/healing-rules.md#p11--dom-locator) | Spawn `dom-inspector` — NEVER guess locators |
| P1.2 Timing | [§P1.2](../docs/healing-rules.md#p12--timing--stuck-test) | Replace `waitForURL` races with element-based waits |
| P1.3 Interaction | [§P1.3](../docs/healing-rules.md#p13--element-interaction) | `dom-inspector` + `waitFor` + `scrollIntoViewIfNeeded` |
| P1.4 API Response | [§P1.4](../docs/healing-rules.md#p14--api-response) | Load [`ait-api-quirks`](../skills/ait-api-quirks/SKILL.md), match quirks |
| P2 Compliance | (see Step 5) | Only AFTER P1 passes |

For P1.1/P1.3: if you don't know which POM owns the failing locator, spawn `pom-discoverer` first to see the catalog.

Touch only the failure point. Never refactor passing code.

## Step 4 — Confirm execution via `spec-runner` re-run

```
Run <spec-path> and report pass/fail.
```

- FAIL → re-classify and loop Step 3.
- PASS → proceed to Step 5.

## Step 5 — Compliance sweep via `compliance-checker` agent

```
Audit <spec-path> (POMs auto-discovered).
```

For each `✗` violation in the report, fix immediately (per row's "Suggested fix"), then re-spawn the agent. Loop until `Verdict: clean`.

**Do not stop until both `spec-runner` reports PASS AND `compliance-checker` reports clean.**

## Step 6 — Quality scorecard via `spec-evaluator` agent

```
Evaluate <spec-path> (3-run stability included).
```

Heal isn't done until quality is restored, not just execution. The agent returns scorecard + Verdict.

| Verdict | Action |
|---|---|
| `ship it.` (≥ 95) | Done. Surface scorecard to user. |
| `good, minor improvements possible.` (85–94) | Surface to user — ask if they want to apply top suggestions. |
| `needs attention.` (70–84) | Apply top 2 fixes, re-run `spec-evaluator`. Loop until ≥ 85. |
| `do NOT commit.` (< 70) | Stop, surface report — likely deeper issue surfaced by healing. |

If stability < 100% (intermittent pass): the fix may have masked a race condition. Re-examine timing per `healing-rules §P1.2`.

## Step 7 — Stale-cache check (if a correct-looking fix doesn't take effect)

See [§Stale-cache](../docs/healing-rules.md#stale-cache-troubleshooting). Most common: restart Claude Code if `global.setup.ts` / `playwright.config.ts` was changed (MCP caches modules).
