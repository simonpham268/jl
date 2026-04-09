# Generate Playwright Test Spec

You are generating a Playwright test spec from a test case file. Follow these steps STRICTLY and in order.

## Step 1: Read framework rules
Read BOTH files completely before writing any code:
- `gen-prompt.md` — 24 framework rules (POM, locators, data builders, API services, ESLint)
- `mapping-prompt.md` — intent mappings (TC action phrases → page object methods)

## Step 2: Identify the TC file
The user will have attached or referenced a TC markdown file (e.g. `@TC-COP.md`).
Read that file and extract all test cases.

## Step 3: Build the plan
Construct the `plan` for `generator_setup_page` as:
```
[gen-prompt.md full content]
---
[mapping-prompt.md full content]
---
[TC steps for the specific test case]
```

## Step 4: Call generator_setup_page
Pass the plan above. Use the appropriate seed file if one exists in `src/tests/`.

## Step 5: Call generator_write_test
Write the output to `src/tests/<feature>.spec.ts`.

## Step 6: Verify compliance
Check the generated code against this list before finishing:
- [ ] 24 rules from gen-prompt.md all followed
- [ ] Intent mappings from mapping-prompt.md applied
- [ ] `test.beforeEach` with login present
- [ ] No `page.click()` / `page.fill()` directly in spec
- [ ] No `test.step` wrappers in spec (only inside page methods)
- [ ] Data Builder pattern used (not hardcoded objects)
- [ ] API services used for preconditions (not UI setup)
- [ ] ESLint: single quotes, semicolons, 2-space indent
- [ ] Test header: `/** ID: {id} Tags: {tags} */`
