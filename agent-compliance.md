# Agent Compliance Instructions

## Mandatory Attachments
Always attach ALL three when requesting test generation:
1. `gen-prompt.md` — 24 framework rules
2. `mapping-prompt.md` — method mappings
3. Test case `.md` file — specific steps

**Command:** "Generate playwright test following ALL attached files STRICTLY"

## Verification Checklist
- Rules #1-24 from gen-prompt.md all followed
- Intent mappings from mapping-prompt.md applied correctly
- ESLint compliance (semicolons, single quotes, 2-space indent)
- `npx eslint` passes on generated file
- Test executes without manual fixes

## Usage
| Scenario | Command | Attachments |
|----------|---------|-------------|
| Generate test | "Generate playwright test following ALL attached files STRICTLY" | gen-prompt.md + mapping-prompt.md + test-case.md |
| Verify compliance | "Verify the generated test follows all attached documentation" | gen-prompt.md + mapping-prompt.md + generated-test.spec.ts |

## Troubleshooting
- **Rules missed?** → Verify all 3 files attached, use exact command template, re-generate
- **Code style issues?** → Run `npx eslint --fix` on generated file