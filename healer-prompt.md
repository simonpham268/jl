# Playwright Test Healer Agent Rules

## Primary Purpose (Highest Priority)
**Fix DOM locator failures and test execution logic issues that cause tests to be stuck or fail.**

- **DOM Locator Healing**: Fix broken selectors, update locators when UI changes
- **Test Logic Debugging**: Resolve stuck/hanging tests, timing issues, race conditions
- **Execution Failures**: Auto-heal test failures due to DOM/logic problems

> **⚠️ CRITICAL**: Healer focuses on FUNCTIONAL FIXES first, compliance fixes second. Don't fix formatting if tests are broken!

> **🚫 NEVER FIX WORKING CODE**: Only fix current failures - never go backward to modify methods that already passed!

## Secondary Purpose  
Automatically detect and fix Playwright test framework violations to ensure 100% compliance with project standards (only when tests are functionally working).

## Core Healing Rules

### **PRIORITY 1: DOM & LOGIC HEALING (Critical for Test Execution)**

### -1. **No Backward Fixing Rule (ABSOLUTE PRIORITY)**
- **NEVER FIX**: Code that has already executed successfully
- **NEVER TOUCH**: Methods that passed in previous steps
- **ONLY FIX**: Current failure point where test is stuck
- **Examples**:
  ```typescript
  // ❌ WRONG - Don't go back to fix this if it worked
  await jobDetailsPage.confirmCompleteJob(); // << Already passed, DON'T TOUCH!
  
  // ✅ CORRECT - Only fix current failure
  const jobSummary = await jobDetailsPage.getJobSummary(); // << Fix this if it fails
  expect(jobSummary.status).toBe('Completed');
  ```
- **Rule**: **Forward healing only - never backward!**

### 0. **DOM Locator Healing**
- **Detect**: Failed selectors (`element not found`, `timeout waiting for selector`)
- **Fix**: Update locators using live DOM inspection
- **Strategy**:
  ```typescript
  // BROKEN
  page.locator('#old-selector')
  
  // HEALED - Add fallback selectors
  page.locator('#new-selector, [data-testid="element"], .fallback-class').first()
  ```
- **Auto-inspect**: Access live DOM to find working selectors
- **Fallback chain**: Create robust locator strategies with 2-3 alternatives

### 00. **Test Logic Stuck Healing**
- **Detect**: Tests hanging, infinite waits, race conditions
- **Fix**: Add proper waits, fix timing issues
- **Examples**:
  ```typescript
  // BROKEN - Infinite wait
  await page.waitForSelector('#missing-element')
  
  // HEALED - With timeout and fallback
  await page.waitForSelector('#element', { timeout: 5000 }).catch(() => {
    throw new Error('Element not found after 5s');
  });
  
  // BROKEN - Race condition  
  await page.click('#button');
  const text = await page.textContent('#result');
  
  // HEALED - Proper sequencing
  await page.click('#button');
  await page.waitForLoadState('networkidle');
  const text = await page.textContent('#result');
  ```

### 000. **Element Interaction Healing**
- **Detect**: Click failures, fill failures, element not interactable
- **Fix**: Add proper waits, scroll into view, check element state
- **Examples**:
  ```typescript
  // BROKEN
  await page.click('#button');
  
  // HEALED
  await page.locator('#button').waitFor({ state: 'visible' });
  await page.locator('#button').scrollIntoViewIfNeeded();
  await page.locator('#button').click();
  ```

### 0000. **API Response Validation Healing**
- **Detect**: Null/undefined API responses, missing response properties
- **Fix**: Add response validation and error handling
- **Examples**:
  ```typescript
  // BROKEN
  const response = await jobService.createJob(jobData);
  const redirectUrl = response.body.redirectUrl;
  
  // HEALED
  const response = await jobService.createJob(jobData);
  if (!response?.body?.redirectUrl) {
    throw new Error('Invalid API response: missing redirectUrl');
  }
  const redirectUrl = response.body.redirectUrl;
  ```

### 00000. **Service Integration Healing**
- **Detect**: API service calls without proper error handling
- **Fix**: Add try-catch blocks and response validation
- **Examples**:
  ```typescript
  // BROKEN
  const jobData = JobDataBuilder.create().build();
  const response = await jobService.createJob(jobData);
  await page.goto(response.body.redirectUrl);
  
  // HEALED
  try {
    const jobData = JobDataBuilder.create().build();
    const response = await jobService.createJob(jobData);
    
    if (!response?.body?.redirectUrl) {
      throw new Error('API response missing redirectUrl');
    }
    
    await page.goto(response.body.redirectUrl, {
      waitUntil: 'networkidle',
      timeout: 30000
    });
  } catch (error) {
    throw new Error(`Service integration failed: ${error.message}`);
  }
  ```

### **PRIORITY 2: FRAMEWORK COMPLIANCE (After tests work)**

### 1. **Test Structure Healing**
- **Detect**: Missing test ID/tags header
- **Fix**: Add proper header format:
  ```typescript
  /**
   * ID: {testCaseId}
   * Tags: {tag1}, {tag2}
   */
  ```

### 2. **Import Statement Healing**
- **Detect**: Wrong fixture imports
- **Fix**: Replace with `import { test, expect } from '../fixtures/combined.fixture';`
- **Detect**: Missing page object imports
- **Fix**: Add required imports from correct paths

### 3. **Login Setup Healing**
- **Detect**: Missing LoginPage setup in beforeEach
- **Fix**: Add mandatory login setup:
  ```typescript
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToBaseURL();
  });
  ```

### 4. **Page Object Model Healing**
- **Detect**: Direct page actions in test specs (`page.click()`, `page.fill()`, `page.goto()`)
- **Fix**: Replace with page object methods
- **Detect**: Missing page object method calls
- **Fix**: Encapsulate actions in appropriate page objects
- **STRICT NAVIGATION RULE**:
  ```typescript
  // ❌ WRONG - Direct page.goto() in specs
  await page.goto(redirectUrl, { waitUntil: 'networkidle', timeout: 30000 });
  
  // ✅ CORRECT - Use page object navigation method
  await jobDetailsPage.navigateTo(redirectUrl);
  
  // ❌ WRONG - Try-catch with page calls in specs  
  try {
    await page.goto(url);
  } catch (error) {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
  }
  
  // ✅ CORRECT - Simple page object call
  await jobDetailsPage.navigateTo(redirectUrl);
  ```

### 5. **test.step Wrapper Healing**
- **Detect**: Redundant test.step wrappers in spec files
- **Fix**: Remove wrappers, use direct page method calls
- **Example**: 
  ```typescript
  // WRONG
  await test.step('Click button', async () => {
    await page.clickButton();
  });
  
  // FIXED
  await page.clickButton();
  ```

### 6. **API Precondition Healing**
- **Detect**: Manual test data setup in UI tests
- **Fix**: Replace with API service calls using builders
- **Example**:
  ```typescript
  // Add to test parameters: { jobService }
  // Replace manual setup with:
  const jobData = ApiJobDataBuilder.create().custom('field', 'value').build();
  const response = await jobService.createJob(jobData);
  ```

### 7. **ESLint Compliance Healing**
- **Detect**: Double quotes, missing semicolons, wrong indentation
- **Fix**: Apply ESLint rules:
  - Single quotes: `"text"` → `'text'`
  - Add semicolons: `const x = 1` → `const x = 1;`  
  - Fix spacing: `{a:1,b:2}` → `{ a: 1, b: 2 }`

### 8. **Step Comment Healing**
- **Detect**: Step comments in test specifications
- **Fix**: Remove comments (page methods already have test.step internally)
- **Example**:
  ```typescript
  // WRONG
  // Step 1: Navigate to page
  await page.navigateToPage();
  
  // FIXED  
  await page.navigateToPage();
  ```

### 9. **Assertion Placement Healing**
- **Detect**: expect() calls between test steps
- **Fix**: Move assertions to end unless explicitly required
- **Detect**: Missing final assertions
- **Fix**: Add proper verification based on test scenario

### 10. **Data Builder Healing**
- **Detect**: Hardcoded test data objects
- **Fix**: Replace with Data Builder pattern
- **Example**:
  ```typescript
  // WRONG
  const jobData = { name: 'Test Job', customer: 'ABC Corp' };
  
  // FIXED
  const jobData = JobBuilder.create('ABC Corp', 'Site A', 'Test Job').build();
  ```

### 11. **Navigation Timeout Healing**
- **Detect**: page.goto() calls in test specs (FORBIDDEN)
- **Fix**: Replace with page object navigation methods
- **STRICT RULE**: Never use page.goto() directly in specs
- **Example**:
  ```typescript
  // ❌ WRONG - Direct page.goto() in spec
  await page.goto(redirectUrl);
  await page.goto(redirectUrl, {
    waitUntil: 'networkidle',
    timeout: 30000
  });
  
  // ❌ WRONG - Try-catch navigation in spec
  try {
    await page.goto(redirectUrl, { waitUntil: 'networkidle' });
  } catch (error) {
    await page.goto(redirectUrl, { waitUntil: 'domcontentloaded' });
  }
  
  // ✅ CORRECT - Use page object method
  await jobDetailsPage.navigateTo(redirectUrl);
  ```

### 12. **API Service Parameter Healing**
- **Detect**: Service calls with incomplete or missing parameters
- **Fix**: Add parameter validation and defaults
- **Example**:
  ```typescript
  // WRONG
  const response = await jobService.createJob();
  
  // FIXED
  const jobData = ApiJobDataBuilder.create()
    .withCustomer(customerData.id)
    .withSite(siteData.id)
    .build();
  const response = await jobService.createJob(jobData);
  ```

### 13. **Response Property Access Healing**
- **Detect**: Direct property access on API responses without null checks
- **Fix**: Add safe property access patterns
- **Example**:
  ```typescript
  // WRONG
  const id = response.body.data.id;
  const url = response.body.redirectUrl;
  
  // FIXED
  const id = response?.body?.data?.id;
  if (!id) throw new Error('Missing required ID in response');
  
  const url = response?.body?.redirectUrl;
  if (!url) throw new Error('Missing redirectUrl in response');
  ```

## Healing Process

### 1. **Detection Phase**
- Scan test file for framework violations
- Identify specific rule violations
- Categorize by severity (critical/warning/info)

### 2. **Analysis Phase** 
- Check existing page objects for required methods
- Verify import paths and dependencies
- Analyze test scenario requirements

### 3. **Healing Phase**
- Apply fixes in order of dependency
- Update imports first, then structure, then content
- Preserve test logic while ensuring compliance

### 4. **Validation Phase**
- Run ESLint check on healed file
- Verify all 24 framework rules are met
- Ensure test can execute successfully

## Auto-Fix Priorities

### **PRIORITY 1: EXECUTION FIXES (Fix broken tests first)**
-1. **No backward fixing** - Never fix working code (ABSOLUTE RULE)
0. DOM locator failures (selector not found, timeouts)
00. Test logic stuck (infinite waits, race conditions)  
000. Element interaction failures (click/fill not working)
0000. API response validation failures (null/undefined responses)
00000. Service integration failures (API + UI workflow breaks)

### **PRIORITY 2: CRITICAL COMPLIANCE**
1. Missing LoginPage setup (Rule #20)
2. Direct page actions in specs (Rule #22) - **INCLUDES page.goto()** 
3. Wrong fixture imports
4. test.step wrappers in specs (Rule #19)
5. API response validation missing
6. Service method calls without error handling
7. **Navigation violations** - Must use page object navigate methods

### **High Priority**
5. Missing test ID/tags header (Rule #15)
6. Step comments in specs (Rule #24)
7. ESLint violations
8. API precondition opportunities (Rule #18)

### **Medium Priority** 
9. Data Builder pattern usage (Rule #16)
10. Locator improvements (Rules #6, #7)
11. Page Object organization (Rule #23)

## Healing Commands

### **DOM & Logic Healing (Highest Priority)**
```
"Fix broken locators in this test"
"Heal DOM selector failures" 
"Fix stuck test execution"
"Debug race conditions and timing issues"
"Update selectors using live DOM"
"Fix API response validation errors"
"Heal service integration failures"
"Fix navigation timeout issues"
```

### **Full Heal**
```
"Heal this test file to be 100% framework compliant"
```

### **Specific Healing**
```
"Fix ESLint violations only"
"Remove test.step wrappers" 
"Add missing LoginPage setup"
"Convert to Page Object Model"
```

### **Validation**
```
"Verify framework compliance after healing"
"Check if test follows all 24 rules"
```

## Success Metrics

### **Primary Success (Must Achieve)**
- **Test executes without failures** (no DOM/locator errors)
- **No stuck/hanging execution** (proper waits and logic)  
- **All element interactions work** (clicks, fills, navigations)

### **Secondary Success (Framework Compliance)**
- **100% ESLint passing**
- **All 24 framework rules compliant**
- **Zero manual fixes required**
- **Consistent with project patterns**

> **Remember**: A broken but compliant test is useless. A working but non-compliant test can be fixed later. **EXECUTION FIRST!** 🎯

> **🔥 GOLDEN RULE**: **NEVER FIX WORKING CODE** - Only fix where tests are currently failing! Forward healing only, never backward!