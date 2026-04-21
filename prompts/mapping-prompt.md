# Intent Normalization Rules — JobLogic UAT Page Object Mapping

> This file maps natural language test steps to Playwright page object methods. An AI agent uses it to generate executable test scripts from human-readable instructions.

---

## Global Keyword Recognition

All pages share these keyword-to-action mappings. **Do not repeat them per page.**

| Action | Keywords (any tense/form) | Maps To |
|--------|---------------------------|---------|
| Text Input | fill, enter, type, input, set, write, put | `fill*(value)` |
| Dropdown | select, choose, pick, set…to, change…to | `select*(value)` |
| Checkbox ON | check, tick, enable, turn on, activate | `set*(true)` |
| Checkbox OFF | uncheck, untick, disable, turn off, deactivate | `set*(false)` |
| Click | click, press, hit, tap, push | `click*()` |
| Toggle | toggle, switch, flip | `toggle*()` |
| Navigate | go to, navigate to, open, access, visit | `navigateTo*()` |
| Search | search, find, look up, look for, query, filter | `search(value)` |
| Sort | sort by, order by, click {column} column header | `sortByColumn(col)` |
| Verify | verify, assert, check, confirm, validate, ensure, expect | `assert*()` |
| Get | get, retrieve, read, obtain, fetch | `get*()` |
| Save | save, submit, confirm | `save()` / `clickSave()` |
| Cancel | cancel, discard, abort, go back | `cancel()` / `clickCancel()` |

**Rule**: When a user writes e.g. "enter customer name 'ABC'" → match "enter" → Text Input → `fillCustomerName('ABC')`. This applies to ALL form fields on ALL pages.

---

## Sidebar Navigation

```typescript
import { Sidebar } from './pages/Sidebar';
const sidebar = new Sidebar(page);
await sidebar.navigateTo(menu: string, subItem: string);
```

**Pattern**: Any combination of **action** + **menu** + **separator** + **subitem** → `navigateTo(menu, subItem)`

- Actions: click, expand, open, select, navigate, go to, hover, press, access
- Separators: then, and, `,`, `>`, `>>`, `→`, `->`, `/`, `;`, `-`
- Reversed order also works: "select Log Job from Jobs" → `navigateTo('Jobs', 'Log Job')`
- Menu only: "click Jobs" → `expandMenu('Jobs')`
- **No sub-item specified**: "go to Customer" / "go to Jobs" → default to `navigateTo(menu, 'All {Entities}')` e.g. `navigateTo('Customers', 'All Customers')`

### Menu Structure

```typescript
const SIDEBAR_MENUS = {
  'Dashboard': ['Main', 'Service Job Letters'],
  'Customers': ['Add Customer', 'All Customers'],
  'Sites': ['Add Site', 'All Sites'],
  'Assets': ['Add Asset', 'All Assets', 'Assets & Tasks Compliance'],
  'Jobs': ['Log Job', 'All Jobs', 'Service Job Letters'],
  'Quotes': ['Log Quote', 'All Quotes'],
  'Invoices': ['Create Customer Grouped', 'Create Batch of Invoices', 'Batch Audit', 'All Invoices'],
  'PPM': ['Add PPM', 'All PPM Contracts', 'All PPM Quotes', 'Batch Deploy Subcontractor PPM Visits', 'PPM Parts Required'],
  'Purchasing': ['All Purchase Orders', 'Create Stock PO', 'Create Stock Reorder', 'Contract Purchase Orders', 'Subcontractor PO', 'All Purchase Invoices'],
  'Reports': ['Dynamic Reports', 'External Links and Dashboards'],
  'Engineers': ['Engineers List', 'Non Job Expenses', 'All Non-Productive Time', 'View Planner', 'Timesheets', 'Route Schedule', 'Live Tracking', 'Historical Tracking'],
  'Forms Logbook': [],
  'Refcom': ['Refcom Events', 'Refcom Reports'],
  'Stock': ['All Stock Records', 'Stock Locations', 'Stock Take', 'Stock Reorder Report', 'Stock Valuation Report', 'Stock Adjustment', 'Stock Bulk Transfer'],
  'Marketplace': [],
  'Settings': [],
  'News Feed': [],
  'My To-Do List': [],
};
```

### Menu Aliases

| Alias | Maps To |
|-------|---------|
| Job → Jobs | Customer → Customers | Site → Sites | Asset → Assets | Quote → Quotes |
| Invoice → Invoices | Engineer → Engineers | Report → Reports | PO / Purchase Order → Purchasing |
| PPM Contract / Planned Maintenance → PPM | Scheduler / Planner → Engineers | To Do / ToDo / Todo → My To-Do List |

### SubItem Aliases

| Alias | Maps To |
|-------|---------|
| Create/New/Add Job → Log Job | Create/New/Add Quote → Log Quote |
| New/Create Customer → Add Customer | New/Create Site → Add Site | New/Create Asset → Add Asset |
| View/List Jobs → All Jobs | View/List Customers → All Customers | View/List Sites → All Sites |
| View/List Assets → All Assets | View/List Quotes → All Quotes | View/List Invoices → All Invoices |
| Calendar/Schedule → View Planner | Staff/Team → Engineers List |

### URL Patterns

| Menu > SubItem | URL |
|----------------|-----|
| Dashboard > Main | `/` |
| Jobs > Log Job | `/Job/Create` |
| Jobs > All Jobs | `/Job` |
| Customers > Add Customer | `/Customer/Create` |
| Customers > All Customers | `/Customer` |
| Sites > Add Site | `/Site/Create` |
| Sites > All Sites | `/Site` |
| Assets > Add Asset | `/Asset/Create` |
| Assets > All Assets | `/Asset` |
| Assets > Compliance | `/Asset/Compliance` |
| Quotes > Log Quote | `/Quote/Create` |
| Quotes > All Quotes | `/Quote` |
| Invoices > All Invoices | `/Invoice` |
| Invoices > Batch Audit | `/Invoice/BatchAudit` |
| PPM > Add PPM | `/PPMContract/Create` |
| PPM > All PPM Contracts | `/PPMContract` |
| PPM > All PPM Quotes | `/PPMQuote` |
| Purchasing > All Purchase Orders | `/PurchaseOrder` |
| Purchasing > Create Stock PO | `/PurchaseOrder/Create` |
| Purchasing > Create Stock Reorder | `/PurchaseOrder/Reorder` |
| Purchasing > Contract PO | `/PurchaseOrder/Contract` |
| Purchasing > Subcontractor PO | `/PurchaseOrder/Subcontractor` |
| Purchasing > All Purchase Invoices | `/PurchaseInvoice` |
| Reports | `/Report` |
| Engineers > Engineers List | `/Staff/Engineers` |
| Engineers > Non Job Expenses | `/Expense` |
| Engineers > All Non-Productive Time | `/NonProductiveTime` |
| Engineers > View Planner | `/Scheduler` |
| Engineers > Timesheets | `/Timesheet` |
| Engineers > Route Schedule | `/Route` |
| Engineers > Live Tracking | `/Tracking/Live` |
| Engineers > Historical Tracking | `/Tracking/History` |
| Forms Logbook | `/Logbook` |
| Stock > All Stock Records | `/Stock` |
| Stock > Stock Locations | `/Stock/Locations` |
| Stock > Stock Take | `/Stock/StockTake` |
| Stock > Stock Reorder Report | `/Stock/Reorder` |
| Stock > Stock Valuation Report | `/Stock/Valuation` |
| Stock > Stock Adjustment | `/Stock/Adjustment` |
| Stock > Stock Bulk Transfer | `/Stock/Transfer` |
| My To-Do List | `/ToDo` |
| News Feed | `/Newsfeed` |
| Settings | `/Setting/` |

---

## Reusable Templates

### Template: Standard List Page

All list pages (All Customers, All Sites, All Assets, All Jobs, All Quotes, All Invoices, All PPM Contracts, All PPM Quotes, All Purchase Orders, etc.) share these common methods. **Only page-specific additions are documented per page.**

| Category | Intent Pattern | Method Pattern |
|----------|---------------|----------------|
| Navigation | go to all {entities} / open {entity} list | `navigateToAll{Entities}()` |
| Search | search for "X" / find {entity} "X" / look up "X" | `search('X')` |
| Clear Search | clear search / reset search | `clearSearch()` |
| Filter Toggle | show/hide/toggle filter | `toggleFilterSection()` / `toggleFilter()` |
| Advanced Filters | show/expand advanced filters | `showAdvancedFilters()` |
| | hide/collapse advanced filters | `hideAdvancedFilters()` |
| Reset Filters | reset/clear filters | `resetFilter()` / `clickResetFilter()` |
| Apply Filters | apply filters / click search | `applyFilters()` / `clickSearch()` |
| Tabs | switch to {tab} / click {tab} tab / view {tab} | `switchToTab('{tab}')` |
| Row Click | click on {entity} "X" / select {entity} "X" | `click{Entity}ByName('X')` |
| Row Index | click first row / click row N | `clickRowByIndex(N-1)` |
| Sort | sort by {column} / click {column} column | `sortByColumn('{column}')` |
| Pagination | go to first/previous/next/last page | `goToFirstPage()` / `goToPreviousPage()` / `goToNextPage()` / `goToLastPage()` |
| | go to page N | `goToPage(N)` |
| | show N results per page | `setResultsPerPage(N)` |
| Header Actions | click add {entity} / click print / click export / click import | `clickAdd{Entity}()` / `clickPrint()` / `clickExport()` / `clickImport()` |
| Detail Sidebar | view full {entity} details / click view full details | `viewFull{Entity}Details()` / `clickViewFullDetails()` |
| Data Retrieval | get row count / count {entities} | `getRowCount()` |
| | get {entity} from row N | `get{Entity}FromRow(N-1)` |
| | get all visible {entities} | `getAllVisible{Entities}()` |
| | check if {entity} exists | `{entity}Exists('X')` |
| Assertions | verify page loaded | `assertPageLoaded()` |
| | verify results contain "X" | `assertSearchResultsContain('X')` |
| | verify no results | `assertNoResults()` |
| Wait | wait for data load | `waitForDataLoad()` |

### Template: Standard Create/Edit Page

All create/edit pages share these common methods:

| Category | Intent Pattern | Method Pattern |
|----------|---------------|----------------|
| Navigation | go to add/create {entity} | `navigateToAdd{Entity}()` |
| | go to {entity} {id} | `navigateTo{Entity}(id)` |
| Save | click save / save / submit | `save()` / `clickSave()` |
| Cancel | click cancel / cancel | `cancel()` / `clickCancel()` |
| Bulk Fill | fill {entity} form | `fill{Entity}Form(data)` |
| High-Level Create | create/add/new/log {entity} | `createNew{Entity}(data)` |
| Fill Only | fill {entity} form only | `fillNew{Entity}Form(data)` |

**High-Level Creation rule**: Any of these intents map to the same method:
- "create new X" / "add new X" / "create a X" / "add a X" / "create X" / "add X" / "log new X" / "log a X" → `createNew{X}(data)`
- "fill X form only" / "fill new X form" → `fillNew{X}Form(data)`

### Multi-step Collapse Rule

**Trigger**: Any action described with numbered sub-steps — regardless of whether it is a form, a workflow step, a modal, or a multi-click sequence.

**Rule**: Collapse ALL numbered sub-steps into ONE parent method call. The method name comes from the parent action label. Input values become a single data object or positional parameters. Do NOT generate individual method calls per sub-step.

```
TC writes:
  Log new job:
    1. select customer "ABC Corp"
    2. select site "Main Office"
    3. input description "Fix AC"

→ Collapse:                                              ✅
  const jobData = JobBuilder.create('ABC Corp', 'Main Office', 'Fix AC').build();
  await logJobPage.createNewJob(jobData);

TC writes:
  Reject quote:
    1. click Reject button
    2. fill rejection reason "Out of budget"
    3. click Confirm

→ Collapse:                                              ✅
  await quoteDetailPage.rejectQuote('Out of budget');

TC writes:
  Assign engineer to job:
    1. click Assign Engineer
    2. select engineer "John Smith"
    3. set scheduled date "2024-06-01"
    4. click Save

→ Collapse:                                              ✅
  await jobDetailsPage.assignEngineer({ engineer: 'John Smith', date: '2024-06-01' });

→ NEVER generate individual calls:                       ❌
  await jobDetailsPage.clickAssignEngineer();
  await jobDetailsPage.selectEngineer('John Smith');
  await jobDetailsPage.setScheduledDate('2024-06-01');
  await jobDetailsPage.clickSave();
```

**How to name the parent method**: use the parent action label from the TC (e.g. "Reject quote" → `rejectQuote()`, "Log new job" → `createNewJob()`, "Assign engineer" → `assignEngineer()`).

**How to pass data**: if 1-2 values → positional params. If 3+ values → single data object `{ field: value }`.

**If the method does not exist in the page object**: do not invent sub-calls. Write `// TODO: implement methodName(data)` and flag to user.

**Applies to**: any page, any action type — form fill, modal workflow, multi-click confirmation, tab interaction, etc.

### Template: Standard Detail Page

All detail pages share these common methods:

| Category | Intent Pattern | Method Pattern |
|----------|---------------|----------------|
| Navigation | go to {entity} {id} | `navigateTo{Entity}(id)` |
| | go back to {entities} | `goBackTo{Entities}()` |
| | go to customer/site | `goToCustomer()` / `goToSite()` |
| Tabs | switch to {tab} tab / click {tab} tab / view {tab} | `switchToTab('{tab}')` |
| Data Retrieval | get {field} | `get{Field}()` |
| | get {entity} summary | `get{Entity}Summary()` |
| Assertions | verify page loaded | `assertPageLoaded()` |

---

## Page Object Discovery

Per-page method tables are **not maintained here** — they go stale as page objects evolve. Instead, discover available methods directly from source before generating.

### Page Object File Map

| Feature | Folder |
|---------|--------|
| Customers | `src/pages/Customers/` |
| Sites | `src/pages/Sites/` |
| Assets | `src/pages/Assets/` |
| Jobs | `src/pages/Jobs/` |
| Quotes | `src/pages/Quotes/` |
| Invoices | `src/pages/Invoices/` |
| PPM | `src/pages/PPM/` |
| Purchasing | `src/pages/Purchasing/` |
| Engineers | `src/pages/Engineers/` |
| Stock | `src/pages/Stock/` |
| Reports | `src/pages/Reports/` |
| Settings | `src/pages/Settings/` |
| Forms Logbook | `src/pages/FormsLogbook/` |
| Refcom | `src/pages/Refcom/` |
| Shared | `src/pages/BasePage.ts`, `src/pages/Sidebar.ts`, `src/pages/LoginPage.ts`, `src/pages/HomePage.ts` |

### How to discover methods (Step 3d in gen-spec.md)

For each page involved in the TC:
1. Glob the relevant folder: `src/pages/{Feature}/*.ts`
2. Read the matching file(s)
3. Extract `async` method signatures — these are the callable methods
4. Use exact method names in the generated spec — **never invent method names**

**If a needed method does not exist**: note it as `// TODO: implement {methodName}(...)` and flag it to the user after generation — do not create the method during spec generation.
