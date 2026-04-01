# Agent Compliance Instructions

## Mandatory Files to Attach
Always attach when requesting test generation:
- `gen-prompt.md` (24 framework rules)
- `mapping-prompt.md` (method mappings)
- Test case `.md` file (specific steps)

## Command Template
"Generate playwright test following ALL attached files STRICTLY"

## Verification Checklist
✅ Rule #1: Generate Playwright tests using best practices
✅ Rule #2: If locator unstable, propose 2-3 alternative locators
✅ Rule #3: No expect between steps unless required in scenario
✅ Rule #4: No exported wait methods - keep private and call before actions
✅ Rule #5: Wrap all page methods in test.step
✅ Rule #6: Use robust locator strategies with multiple fallback selectors
✅ Rule #7: Handle edge cases with try-catch blocks and graceful fallbacks
✅ Rule #8: Silent fallback handling - no console.debug/log in catch blocks
✅ Rule #9: Return data from page methods for test verification when needed
✅ Rule #10: Declare ALL locators as readonly properties in constructor
✅ Rule #11: Move arrays/selector strategies to class properties
✅ Rule #12: Check existing pages in relevant folders before creating new files
✅ Rule #13: Always re-read source files when regenerating
✅ Rule #14: Follow ALL attached .md files STRICTLY when generating tests
✅ Rule #15: Auto-generate tests with ID and tags header format
✅ Rule #16: Use Data Builder pattern for test data creation
✅ Rule #17: Use high-level creation methods instead of individual field methods
✅ Rule #18: Use API services for preconditions (Method 1/2/3 selection)
✅ Rule #19: NEVER add test.step wrappers in spec files
✅ Rule #20: MANDATORY login setup in ALL spec files
✅ Rule #21: MANDATORY live application access for accurate locators
✅ Rule #22: Page Object Model action encapsulation
✅ Rule #23: Page Object context ownership principle
✅ Rule #24: No comments in test specifications
✅ Intent mappings applied correctly
✅ ESLint compliance (semicolons, single quotes, 2-space indent)

## Usage Examples

### Example 1: Basic Test Generation
```
Command: "Generate playwright test following ALL attached files STRICTLY"

Attachments:
📎 gen-prompt.md
📎 mapping-prompt.md  
📎 test-case-45291.md

Expected Result: Framework-compliant test with all 24 rules applied
```

### Example 2: Complex Test with API Preconditions
```
Command: "Generate scripts"

Attachments:
📎 gen-prompt.md
📎 mapping-prompt.md
📎 test-case-12345-customer-creation.md

Expected Result: Test with API preconditions, proper data builders, and UI interactions
```

### Example 3: Verification Request
```
Command: "Verify the generated test follows all attached documentation"

Attachments:
📎 gen-prompt.md
📎 mapping-prompt.md
📎 generated-test.spec.ts

Expected Result: Compliance checklist showing which rules are followed/violated
```

## Quality Gates

### Before Submission
- [ ] All mandatory files attached
- [ ] Command follows template format
- [ ] Test case scenario is clear and complete

### After Generation
- [ ] Run compliance verification
- [ ] Execute ESLint check
- [ ] Test execution validation
- [ ] Framework rule adherence confirmed

## Common Mistakes to Avoid

### ❌ Wrong Approach
```
Command: "create a test"
Attachments: only test-case.md
```

### ✅ Correct Approach  
```
Command: "Generate playwright test following ALL attached files STRICTLY"
Attachments: generate-prompt.md + intent-mapping.md + test-case.md
```

## Troubleshooting

### If Rules Are Missed
1. Verify all 3 mandatory files are attached
2. Use explicit command template
3. Request compliance verification
4. Re-generate with emphasis on missed rules

### If Code Style Issues
1. Check ESLint compliance box
2. Verify semicolons, quotes, indentation
3. Run `npx eslint` on generated file
4. Apply auto-fix if needed

## Success Metrics

- **100% Framework Compliance**: All 24 rules followed
- **Zero Manual Fixes**: Generated code runs without modifications
- **Consistent Quality**: Same standards across all generated tests
- **Fast Generation**: Single command produces complete, compliant test