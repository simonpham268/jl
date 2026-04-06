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

## Customer Page

**URL**: `/Customer/Create` (add) · `/Customer/{id}` (edit)

```typescript
import { CustomerPage, CustomerData } from './pages/Customers/CustomerPage';
```

> See [Global Keyword Recognition](#global-keyword-recognition) for fill/select/check keyword patterns.

### Form Fields

| Field | Type | Required | Method |
|-------|------|----------|--------|
| Find Address | searchbox | - | `findAddress(text)` |
| Tag(s) | multiselect | - | `selectTags([tags])` |
| Customer Name | textbox | ✓ | `fillCustomerName(name)` |
| Customer Type | combobox | - | `selectCustomerType(type)` |
| Reference Number | textbox | - | `fillReferenceNumber(ref)` |
| Account Number | textbox | - | `fillAccountNumber(acc)` |
| Selling Rate | combobox | - | `selectSellingRate(rate)` |
| Account Manager | combobox | - | `selectAccountManager(mgr)` |
| Address fields | textbox | - | `fillAddress({ street, area, city, county, postcode })` |
| Telephone | phone | - | `fillTelephone(phone, countryCode?)` |
| Main Contact | textbox | - | `fillMainContact({ firstName, lastName, telephone, email, jobPosition, countryCode })` |
| Auto generate Site | checkbox | - | `setAutoGenerateSite(boolean)` |

### Page-Specific Methods

| Intent | Method |
|--------|--------|
| navigate to customer {id} | `navigateToCustomer(id)` |

### Data Builder Pattern

```typescript
import { CustomerBuilder, generateCustomerName } from '../../data/uiData/customer.data';

await customerPage.navigateToAddCustomer();

const customerId = await customerPage.createNewCustomer(
  CustomerBuilder.create('ABC Company')
    .customerType('Commercial')
    .address('123 Main Street')
    .city('London')
    .postcode('SW1A 1AA')
    .contact('John', 'Doe', 'john@abc.com')
    .telephone('020 1234 5678', '+44')
    .autoGenerateSite()
    .build()
);
```

#### CustomerBuilder Methods

| Method | Description |
|--------|-------------|
| `.create(customerName)` | Required name |
| `.tags(string[])` | `.customerType(string)` | `.referenceNumber(string)` | `.accountNumber(string)` |
| `.sellingRate(string)` | `.accountManager(string)` |
| `.address(string)` | `.area(string)` | `.city(string)` | `.county(string)` | `.postcode(string)` |
| `.telephone(phone, countryCode?)` | `.contactTelephone(phone, countryCode?)` |
| `.firstName(string)` | `.lastName(string)` | `.contactName(first, last)` |
| `.email(string)` | `.jobPosition(string)` | `.contact(first, last, email?)` |
| `.autoGenerateSite(boolean?)` | `.build()` → `CustomerData` |

---

## All Customers Page (List)

**URL**: `/Customer`

```typescript
import { AllCustomersPage, CustomerSearchOptions } from './pages/Customers/AllCustomersPage';
```

> Inherits all [Standard List Page](#template-standard-list-page) methods.

### Page-Specific Elements

| Section | Elements |
|---------|----------|
| Header Actions | Add Customer, Print, Import, Export |
| Filters | Search, Tags, Show/Hide Advanced, Reset, Search button |
| Tabs | Active, Suspended, All |
| Table Columns | Name✓, Account Manager, Account Number✓, Address✓, Postcode✓, Contact Name, Telephone, Email |
| Sidebar | Customer info, View Full Customer Details |

### Page-Specific Methods

| Intent | Method |
|--------|--------|
| filter by tag "VIP" | `filterByTags(['VIP'])` |
| click on customer "ABC" | `clickCustomerByName('ABC')` |
| check if customer exists | `customerExists('ABC')` |
| get customer from row N | `getCustomerFromRow(N)` |
| get all visible customers | `getAllVisibleCustomers()` |

### Typical Flow

```typescript
await allCustomersPage.navigateToAllCustomers();
await allCustomersPage.switchToTab('Active');
await allCustomersPage.search('ABC Corporation');
await allCustomersPage.clickCustomerByName('ABC Corporation');
```

---

## Site Page (Add/Edit)

**URL**: `/Site/Create` (add) · `/Site/Detail/{id}` (edit)

```typescript
import { SitePage, SiteData } from './pages/Sites/SitePage';
```

### Form Fields

| Field | Type | Required | Method |
|-------|------|----------|--------|
| Customer | combobox | ✓ | `selectCustomer(name)` |
| Find Address | searchbox | - | `findAddress(text)` |
| Site Name | textbox | ✓ | `fillSiteName(name)` |
| Tag(s) | multiselect | - | `selectTags([tags])` |
| Account Manager | combobox | - | `selectAccountManager(mgr)` |
| Postcode | textbox | - | `fillPostcode(code)` |
| Telephone | phone | - | `fillTelephone(phone, countryCode?)` |
| Area | combobox | - | `selectArea(area)` |
| Site Reference Number | textbox | - | `fillSiteReference(ref)` |
| Address fields | textbox | - | `fillAddress({ street, area, city, county })` |
| Main Contact | textbox | - | `fillMainContact({ firstName, lastName, telephone, email, jobPosition })` |

### Data Builder Pattern

```typescript
import { SiteBuilder, generateSiteName } from '../../data/uiData/site.data';

await sitePage.navigateToAddSite();

const siteId = await sitePage.createNewSite(
  SiteBuilder.create('ABC Corp', 'Branch Office')
    .address('123 Main Street')
    .city('London')
    .postcode('SW1A 1AA')
    .contact('John', 'Doe', 'john@abc.com')
    .telephone('020 1234 5678', '+44')
    .accountManager('Jane Smith')
    .build()
);
```

#### SiteBuilder Methods

| Method | Description |
|--------|-------------|
| `.create(customerName, siteName)` | Required fields |
| `.tags(string[])` | `.accountManager(string)` | `.postcode(string)` | `.telephone(phone, countryCode?)` |
| `.area(string)` | `.siteReferenceNumber(string)` |
| `.address(string)` | `.addressArea(string)` | `.city(string)` | `.county(string)` |
| `.firstName(string)` | `.lastName(string)` | `.contactName(first, last)` |
| `.email(string)` | `.jobPosition(string)` | `.contact(first, last, email?)` |
| `.contactTelephone(phone, countryCode?)` | `.build()` → `SiteData` |

---

## All Sites Page (List)

**URL**: `/Site`

```typescript
import { AllSitesPage, SiteSearchOptions } from './pages/Sites/AllSitesPage';
```

> Inherits all [Standard List Page](#template-standard-list-page) methods.

### Page-Specific Elements

| Section | Elements |
|---------|----------|
| Header Actions | Add Site, Print, Export |
| Filters | Search, Tags, Area, Show/Hide Advanced, Reset, Search button |
| Tabs | Active, Suspended, All |
| Table Columns | Name✓, Account Manager, Address✓, Postcode✓, Contact Name, Telephone, Email |

### Page-Specific Methods

| Intent | Method |
|--------|--------|
| filter by tag "VIP" | `filterByTags(['VIP'])` |
| filter by area "North" | `filterByArea('North')` |
| click on site "Main Office" | `clickSiteByName('Main Office')` |
| check if site exists | `siteExists('Main Office')` |

---

## Asset Page (Add/Edit)

**URL**: `/Asset/Create` (add) · `/Asset/Detail/{id}` (edit)

```typescript
import { AssetPage, AssetData } from './pages/Assets/AssetPage';
```

### Form Fields

| Field | Type | Required | Section |
|-------|------|----------|---------|
| Customer | combobox | ✓ | Selection |
| Site | combobox | ✓ | Selection |
| Equipment Class | combobox | - | Asset Details |
| Equipment Library | combobox | - | Asset Details |
| Trades | combobox | - | Asset Details |
| Service Type | combobox | - | Asset Details |
| Description | textbox | ✓ | Asset Details |
| Make | textbox | - | Asset Details |
| Model | textbox | - | Asset Details |
| Quantity | spinbutton | ✓ | Asset Details |
| Comments | textbox | - | Additional Info |
| Contains Refrigerant | checkbox | - | Additional Info |
| Number | textbox | - | Site Asset Details |
| Location | textbox | - | Site Asset Details |
| Serial Number | textbox | - | Site Asset Details |
| QR Code | textbox | - | Site Asset Details |
| Reference Number | textbox | - | Site Asset Details |
| Installation Date | date | - | Site Asset Details |
| Asset Quantity | spinbutton | ✓ | Site Asset Details |
| Labour Warranty Expiry | date | - | Site Asset Details |
| Asset Warranty Expiry | date | - | Site Asset Details |
| Quoted Replacement Date | date | - | Site Asset Details |
| Budget Replacement Cost | spinbutton | - | Site Asset Details |
| Asset Condition | combobox | - | Site Asset Details |

**Method naming convention**: `fill{FieldName}(value)` for textbox/spinbutton/date, `select{FieldName}(value)` for combobox, `set{FieldName}(boolean)` for checkbox. Additional: `createRandomQrCode()` / `generateQrCode()` → `createRandomQrCode()`.

### Data Builder Pattern

```typescript
import { AssetBuilder, generateSerialNumber } from '../../data/uiData/asset.data';

await assetPage.navigateToAddAsset();

const assetId = await assetPage.createNewAsset(
  AssetBuilder.create('ABC Corp', 'Main Office', 'Air Conditioner')
    .equipmentClass('HVAC')
    .make('Daikin')
    .model('FTX25')
    .serialNumber('SN-12345')
    .location('Roof Level')
    .installationDate('01/01/2024')
    .assetCondition('Good')
    .containsRefrigerant()
    .build()
);
```

#### AssetBuilder Methods

| Method | Description |
|--------|-------------|
| `.create(customer, site, description)` | Required fields |
| `.equipmentClass(string)` | `.equipmentLibrary(string)` | `.trades(string)` | `.serviceType(string)` |
| `.make(string)` | `.model(string)` | `.quantity(number)` |
| `.comments(string)` | `.containsRefrigerant(boolean?)` |
| `.number(string)` | `.location(string)` | `.serialNumber(string)` | `.qrCode(string)` | `.referenceNumber(string)` |
| `.installationDate(string)` | `.assetQuantity(number)` |
| `.labourWarrantyExpiry(string)` | `.assetWarrantyExpiry(string)` | `.quotedReplacementDate(string)` |
| `.budgetReplacementCost(number)` | `.assetCondition(string)` |
| `.build()` → `AssetData` |

---

## All Assets Page (List)

**URL**: `/Asset`

```typescript
import { AllAssetsPage, AssetSearchOptions } from './pages/Assets/AllAssetsPage';
```

> Inherits all [Standard List Page](#template-standard-list-page) methods.

### Page-Specific Elements

| Section | Elements |
|---------|----------|
| Header Actions | List/Grid toggle, Add Asset, Print, Export |
| Filters | Search, Gas Type, Tags, Asset Conditions, Show/Hide Advanced, Reset, Search |
| Tabs | Active, Suspended, All, Hire Asset, Cross Asset |
| Table Columns | Description✓, Customer Name✓, Site Name✓, Class✓, Location✓, Number, Serial No✓, System ID✓, QR Code, Asset Condition, Installation Date✓, Warranty Expiry Date✓, Labour Warranty Expiry Date✓, Refrigerant Type, GWP, Total Charge (kg)✓, CO2 EQ, PPM Contract |

### Page-Specific Methods

| Intent | Method |
|--------|--------|
| switch to list/grid view | `switchToListView()` / `switchToGridView()` |
| filter by gas type "R410A" | `filterByGasType(['R410A'])` |
| filter by condition "Good" | `filterByAssetConditions(['Good'])` |
| click asset by description "AC" | `clickAssetByDescription('AC')` |
| click asset by customer "ABC" | `clickAssetByCustomerName('ABC')` |
| click asset by site "Office" | `clickAssetBySiteName('Office')` |
| click asset by number "AST-001" | `clickAssetByNumber('AST-001')` |
| click asset by serial "SN123" | `clickAssetBySerialNumber('SN123')` |

---

## Asset Details Page

**URL**: `/Asset/Detail/{id}`

```typescript
import { AssetDetailsPage, AssetDetailData } from './pages/Assets/AssetDetailsPage';
```

> Inherits all [Standard Detail Page](#template-standard-detail-page) methods.

### Tabs

Details, Quotes, Jobs, Refcom Log Book, Notes, Related Assets, Forms Logbook, Asset & Task Compliance, History

### Page-Specific Methods

| Intent | Method |
|--------|--------|
| click log job | `clickLogJob()` |
| click edit / enable edit | `enableEditMode()` |
| fill asset details (bulk) | `fillAssetDetails(data)` |
| set status active/suspended | `setAssetStatus('Active')` / `setAssetStatus('Suspended')` |
| click undo | `undo()` |
| click summarise | `clickSummarise()` |
| get customer/site/description/number/serial/location | `getCustomerName()` / `getSiteName()` / `getDescription()` / `getNumber()` / `getSerialNumber()` / `getLocation()` |
| verify active/suspended | `assertIsActive()` / `assertIsSuspended()` |

> Same form fields as Asset Page (Add/Edit), plus: Last Service Date (`fillLastServiceDate`), Asset Status radio (`setAssetStatus`).

---

## Assets & Tasks Compliance Page

**URL**: `/AssetTaskCompliance`

```typescript
import { AssetsCompliancePage, ComplianceSearchOptions } from './pages/Assets/AssetsCompliancePage';
```

> Inherits all [Standard List Page](#template-standard-list-page) methods.

### Page-Specific Elements

| Section | Elements |
|---------|----------|
| Header Actions | Print, Export |
| Filters | Search, List By, Date Logged range, Preferred Appointment Date range, Job Category, Job Type, Show Mandatory |
| Tabs | All, Open, Completed |

### Page-Specific Methods

| Intent | Method |
|--------|--------|
| select list by "Assets & Tasks" | `selectListBy('Assets & Tasks')` |
| set date logged range | `setDateLoggedRange(start, end)` |
| set preferred date range | `setPreferredDateRange(start, end)` |
| filter by job category | `filterByJobCategory([...])` |
| filter by job type | `filterByJobType([...])` |
| check/uncheck show mandatory | `setShowMandatory(boolean)` |

---

## Log Job Page (Create)

**URL**: `/Job/Create`

```typescript
import { JobPage, JobData, JobSection } from './pages/Jobs/JobPage';
```

### Sections & Form Fields

| Section | Field | Required | Type | Method |
|---------|-------|----------|------|--------|
| Customer & Site | Customer | ✓ | combobox | `selectCustomer(name)` |
| | Site | ✓ | combobox | `selectSite(name)` |
| | Log from Recent Job | - | checkbox | `setLogFromRecentJob(bool)` |
| | Log from Template | - | checkbox | `setLogFromTemplate(bool)` |
| Job Details | Job Type | ✓ | combobox | `selectJobType(type)` |
| | Job Category | - | combobox | `selectJobCategory(cat)` |
| | Description | ✓ | textbox | `fillDescription(text)` |
| | Tags | - | multiselect | `selectTags([...])` |
| | Primary Job Trade | - | combobox | `selectPrimaryJobTrade(trade)` |
| | Customer Order Number | - | textbox | `fillCustomerOrderNumber(num)` |
| | Reference Number | - | textbox | `fillReferenceNumber(ref)` |
| | Job Owner | ✓ | combobox | `selectJobOwner(name)` |
| | Date Logged | ✓ | datetime | `setDateLogged(dateTime)` |
| | Req. Approval | - | checkbox | `toggleReqApproval()` |
| Job KPIs | Priority Level | - | combobox | `selectPriorityLevel(level)` |
| | Completion Time From | - | radio | `selectCompletionTimeFrom('Date Logged' \| 'Engineer Onsite')` |
| Job Allocation | Preferred Appt Date | - | datetime | `setPreferredAppointmentDate(dt)` |
| | Engineer | - | combobox | `selectEngineer(name)` |
| | Start/End Date | - | datetime | `setStartDate(dt)` / `setEndDate(dt)` |
| | Appointment | - | checkbox | `toggleAppointment()` |
| | Lock Visit Date & Time | - | checkbox | `toggleLockVisitDateTime()` |
| | Deploy to Mobile | - | checkbox | `toggleDeployToMobile()` |
| Recur Job | Recur Job | - | checkbox | `setRecurJob(bool)` |
| Contacts | Search/Select Contact | - | - | `searchContact(name)` / `selectContactByName(name)` / `selectFirstContact()` |
| Recent Jobs | Switch tabs | - | - | `switchToJobsTab()` / `switchToQuotesTab()` / `clickRecentJob(num)` |

### Additional Methods

| Intent | Method |
|--------|--------|
| navigate to section "Job Details" | `navigateToSection(section)` |
| select engineer tab/team tab | `selectEngineerTab()` / `selectEngineerTeamTab()` |
| get selected customer/job owner/contacts count | `getSelectedCustomer()` / `getSelectedJobOwner()` / `getSelectedContactsCount()` |
| get recent jobs count | `getRecentJobsCount()` |
| clear customer/site/job type | `clearCustomer()` / `clearSite()` / `clearJobType()` |
| wait for job details page | `waitForJobDetailsNavigation()` → returns job ID |
| create job quickly | `createJobQuick(customer, site, description)` → returns job ID |

### Data Builder Pattern

```typescript
import { JobBuilder, generateDescription } from '../../data/uiData/job.data';

await jobPage.navigateToLogJob();

const jobId = await jobPage.createNewJob(
  JobBuilder.create('ABC Company', 'Main Office', 'Repair HVAC system')
    .jobType('Maintenance')
    .jobCategory('HVAC')
    .priorityLevel('Urgent')
    .engineer('John Doe')
    .deployToMobile()
    .build()
);
```

#### JobBuilder Methods

| Method | Description |
|--------|-------------|
| `.create(customer, site, description)` | Required fields |
| `.logFromRecentJob(bool?)` | `.logFromTemplate(bool?)` |
| `.jobType(string)` | `.jobCategory(string)` | `.tags(string[])` |
| `.primaryJobTrade(string)` | `.secondaryJobTrades(string[])` |
| `.customerOrderNumber(string)` | `.referenceNumber(string)` |
| `.jobOwner(string)` | `.dateLogged(string)` |
| `.priorityLevel(string)` | `.completionTimeFromDateLogged(bool?)` |
| `.preferredAppointmentDate(string)` | `.engineer(string)` | `.engineerTeam(string)` |
| `.startDate(string)` | `.endDate(string)` |
| `.appointment(bool?)` | `.lockVisitDateTime(bool?)` | `.deployToMobile(bool?)` |
| `.recurJob(bool?)` | `.contactNames(string[])` |
| `.build()` → `JobData` |

---

## All Jobs Page (List)

**URL**: `/Job`

```typescript
import { AllJobsPage, JobSearchOptions } from './pages/Jobs/AllJobsPage';
```

> Inherits all [Standard List Page](#template-standard-list-page) methods.

### Page-Specific Elements

| Section | Elements |
|---------|----------|
| Header Actions | Log Job, Print, Import, Export |
| Filters | Search, Status, Date Logged range, Appointment Date range, Show Advanced, Reset, Search, Quick Filters |
| Tabs | All, Open, In Jeopardy, Requires Allocation, Completed Today, Requires Invoicing, Requires Revisit, Suspended, Requires Approval, Approved |
| Table Columns | Job No.✓, Customer Name✓, Site Name✓, Status, Visits, Priority✓, Remaining, Job Category, Customer Order Number, Date Logged✓, Date Completed✓, Job Type, Reference No., Contact, Description, Revisit Reason, Appointment Date✓, Postcode, Tags, Target Completion Date, Total Invoiced Value, Quoted Value, JobTrade, Customer Type, Job Owner, Sub Job Status |

### Page-Specific Methods

| Intent | Method |
|--------|--------|
| filter by status "Open" | `filterByStatus(['Open'])` |
| set date logged range | `setDateLoggedRange(start, end)` |
| set appointment date range | `setAppointmentDateRange(start, end)` |
| click job "M0000264" | `clickJobByJobNo('M0000264')` |
| click job by customer "ABC" | `clickJobByCustomerName('ABC')` |
| click job by site "Office" | `clickJobBySiteName('Office')` |
| click job by description "text" | `clickJobByDescription('text')` |
| click job by status "New Job" | `clickJobByStatus('New Job')` |

---

## Job Details Page

**URL**: `/Job/Detail/{id}`

```typescript
import { JobDetailsPage, JobSummaryInfo } from './pages/Jobs/JobDetailsPage';
```

> Inherits all [Standard Detail Page](#template-standard-detail-page) methods.

### Tabs

Details, Contacts, Assets, Tasks, Costs, Visits, Subcontractor, SOR Items, History, Info, Refcom Audit, Job Forms

### Header Actions

| Intent | Method |
|--------|--------|
| click add new item | `clickAddNewItem()` |
| click log related work | `clickLogRelatedWork()` |
| click add invoice | `clickAddInvoice()` |
| click share | `clickShare()` |

### Complete Job

| Intent | Method |
|--------|--------|
| click complete job | `clickCompleteJob()` |
| complete job | `completeJob()` |
| complete job with date | `completeJob('01/01/2024 10:00 AM')` |
| fill date complete | `fillDateComplete(dateTime)` |
| click complete button | `clickComplete()` |

### Delete Job

| Intent | Method |
|--------|--------|
| click three dots menu | `clickThreeDots()` |
| select delete job | `selectDeleteJob()` |
| click I agree | `clickIAgree()` |
| click delete | `clickDelete()` |
| delete job (full workflow) | `deleteJob()` |

### Data Retrieval & Assertions

| Intent | Method |
|--------|--------|
| get job number/customer/site/status/description/type/category/date logged/date completed/summary/success message | `getJobNo()` / `getCustomerName()` / `getSiteName()` / `getJobStatus()` / `getDescription()` / `getJobType()` / `getJobCategory()` / `getDateLogged()` / `getDateCompleted()` / `getJobSummary()` / `getSuccessMessage()` |
| verify job number "M0000264" | `assertJobNo('M0000264')` |
| verify status "Open" | `assertJobStatus('Open')` |
| verify completed | `assertIsCompleted()` |

---

## Service Job Letters Page

**URL**: `/Job/ServiceLetterIndex`

```typescript
import { ServiceJobLettersPage } from './pages/Jobs/ServiceJobLettersPage';
```

> Inherits all [Standard List Page](#template-standard-list-page) methods.

### Page-Specific Elements

| Filters | Letter Stage (All, Letter 1-4), Scheduled Date range, Job Type(s), Compliance Status |
| Table | Checkbox, Job No., Customer Name, Site Name, Service Description, Letter Stage, Scheduled Date, Job Type, Compliance Status |
| Batch Actions | Batch Print, Batch Email |

### Page-Specific Methods

| Intent | Method |
|--------|--------|
| select letter stage | `selectLetterStage('Letter 1')` |
| set scheduled date range | `setScheduledDateRange(start, end)` |
| filter by job types | `filterByJobTypes([...])` |
| select compliance status | `selectComplianceStatus('Compliant')` |
| select/unselect row N | `selectRow(N)` / `unselectRow(N)` |
| select/unselect all | `selectAllRows()` / `unselectAllRows()` |
| batch print/email | `clickBatchPrint()` / `clickBatchEmail()` |
| check batch enabled | `isBatchPrintEnabled()` / `isBatchEmailEnabled()` |

---

## Log Quote Page (Create)

**URL**: `/Quote/Create`

```typescript
import { QuotePage, QuoteData } from './pages/Quotes/QuotePage';
```

### Sections & Form Fields

| Section | Field | Required | Type | Method |
|---------|-------|----------|------|--------|
| Customer & Site | Customer | ✓ | combobox | `selectCustomer(name)` |
| | Site | ✓ | combobox | `selectSite(name)` |
| | Log from Template | - | checkbox | `setLogFromTemplate(bool)` |
| | Log from Recent Quote | - | checkbox | `setLogFromRecentQuote(bool)` |
| Quote Details | Job Type | ✓ | combobox | `selectJobType(type)` |
| | Job Category | - | combobox | `selectJobCategory(cat)` |
| | Description | ✓ | textbox | `fillDescription(text)` |
| | Tags | - | multiselect | `selectTags([...])` |
| | Title | - | textbox | `fillTitle(title)` |
| | Quote Reference Number | - | textbox | `fillQuoteReferenceNumber(ref)` |
| | Source of Enquiry | - | combobox | `selectSourceOfEnquiry(source)` |
| | Quote Trade | - | combobox | `selectQuoteTrade(trade)` |
| | Priority Level | - | combobox | `selectPriorityLevel(level)` |
| | Quote Ref 1 | - | textbox | `fillQuoteRef1(ref)` |
| | Quote Ref 2 | - | combobox | `selectQuoteRef2(ref)` |
| | Expiry Date | - | date | `setExpiryDate(date)` |
| | Quote Owner | ✓ | combobox | `selectQuoteOwner(owner)` |
| | Expected Sale Date | - | date | `setExpectedSaleDate(date)` |
| | Chance of Sale | - | slider | `setChanceOfSale(0\|25\|50\|75\|100)` |
| Contacts | Add/Select Contact | - | - | `clickAddContact()` / `selectContactByName(name)` |
| Recent | Switch tabs / Click recent | - | - | `switchToJobsTab()` / `switchToQuotesTab()` / `clickRecentJob(num)` / `clickRecentQuote(num)` |

### Additional Methods

| Intent | Method |
|--------|--------|
| get selected customer/quote owner | `getSelectedCustomer()` / `getSelectedQuoteOwner()` |
| clear customer/site/job type/quote owner | `clearCustomer()` / `clearSite()` / `clearJobType()` / `clearQuoteOwner()` |
| check contacts empty | `isContactsEmpty()` |
| wait for quote details | `waitForQuoteDetailsNavigation()` → returns quote ID |
| create quote quickly | `createQuoteQuick(customer, site, description)` → returns quote ID |

### Data Builder Pattern

```typescript
import { QuoteBuilder, generateQuoteDescription } from '../../data/uiData/quote.data';

await quotePage.navigateToLogQuote();

const quoteId = await quotePage.createNewQuote(
  QuoteBuilder.create('ABC Corp', 'Main Office', 'Annual Maintenance Quote')
    .jobType('Maintenance')
    .title('Q-2026-Annual')
    .priorityLevel('High')
    .expiryDate('31/12/2026')
    .chanceOfSale(75)
    .quoteOwner('John Smith')
    .build()
);
```

#### QuoteBuilder Methods

| Method | Description |
|--------|-------------|
| `.create(customer, site, description)` | Required fields |
| `.logFromTemplate(bool?)` | `.logFromRecentQuote(bool?)` |
| `.jobType(string)` | `.jobCategory(string)` | `.tags(string[])` |
| `.title(string)` | `.quoteReferenceNumber(string)` | `.sourceOfEnquiry(string)` |
| `.quoteTrade(string)` | `.priorityLevel(string)` | `.quoteRef1(string)` | `.quoteRef2(string)` |
| `.expiryDate(string)` | `.quoteOwner(string)` | `.expectedSaleDate(string)` | `.chanceOfSale(number)` |
| `.contactNames(string[])` | `.build()` → `QuoteData` |

---

## All Quotes Page (List)

**URL**: `/Quote`

```typescript
import { AllQuotesPage, QuoteSearchOptions, QuoteTab } from './pages/Quotes/AllQuotesPage';
```

> Inherits all [Standard List Page](#template-standard-list-page) methods.

### Page-Specific Elements

| Section | Elements |
|---------|----------|
| Header Actions | Log Quote, Print, Import, Export |
| Empty State | "Create beautifully branded quotes" heading, Create first quote link |
| Filters | Search, Status, Date Logged range, Expiry Date range, Show Advanced, Reset, Search |
| Tabs | All, Open, Won, Lost, Expired |
| Table Columns | Quote No., Customer Name, Site Name, Status, Priority, Title, Description, Date Logged, Expiry Date, Quote Owner, Job Type, Job Category, Quote Trade, Quote Value, Chance of Sale |

### Page-Specific Methods

| Intent | Method |
|--------|--------|
| check empty state | `isEmptyState()` |
| set date logged range | `setDateLoggedRange(start, end)` |
| set expiry date range | `setExpiryDateRange(start, end)` |
| get tab count | `getTabCount(tab)` |
| click quote "Q0001" | `clickQuoteByQuoteNo('Q0001')` |
| click quote by customer/site/description/status | `clickQuoteByCustomerName(n)` / `clickQuoteBySiteName(n)` / `clickQuoteByDescription(d)` / `clickQuoteByStatus(s)` |
| wait for table load | `waitForTableLoad()` |

---

## Customer Grouped Invoice Page

**URL**: `/CGroupInvoice/Create`

```typescript
import { CustomerGroupedInvoicePage, CustomerGroupedSearchOptions, CustomerGroupedTab } from './pages/Invoices/CustomerGroupedInvoicePage';
```

### Page Structure

| Section | Elements |
|---------|----------|
| Tabs | Jobs, Draft Invoices |
| Filters | Customer* dropdown, Search, Date Logged range, Status multiselect, Order By dropdown |
| Results | All tab (count), Selected tab (count), Results table |
| Footer | Total Outstanding Cost, Cancel, Save |

### Intent → Method Mapping

| Intent | Method |
|--------|--------|
| navigate | `navigateToCustomerGroupedInvoice()` |
| switch tab | `switchToTab('Jobs' \| 'Draft Invoices')` |
| select customer | `selectCustomer(name)` |
| search jobs | `searchJobs(text)` |
| set date range | `setDateLoggedRange(start, end)` / `setStartDate(d)` / `setEndDate(d)` |
| select order by | `selectOrderBy(option)` |
| apply filters | `applyFilters(options)` |
| switch All/Selected results | `switchToAllResults()` / `switchToSelectedResults()` |
| get counts | `getAllJobsCount()` / `getSelectedJobsCount()` |
| select job "JOB001" | `selectJobByNumber('JOB001')` |
| select all jobs | `selectAllJobs()` |
| get total cost | `getTotalOutstandingCost()` |
| check save enabled | `isSaveEnabled()` |
| create invoice | `createInvoice(customer, [jobNumbers])` |

### Data Builder Pattern

```typescript
import { CustomerGroupedInvoiceBuilder } from '../../data/uiData/customerGroupedInvoice.data';

await customerGroupedInvoicePage.navigateToCustomerGroupedInvoice();
await customerGroupedInvoicePage.createNewCustomerGroupedInvoice(
  CustomerGroupedInvoiceBuilder.create('ABC Corp', ['JOB-001', 'JOB-002'])
    .withDateRange('01/01/2024', '31/12/2024')
    .withOrderBy('Date Logged (Newest)')
    .build()
);
```

#### Builder Methods

`.create(customer, jobNumbers)` | `.withSearchText(s)` | `.withDateRange(start, end)` | `.withStartDate(s)` | `.withEndDate(s)` | `.withStatuses([])` | `.withOrderBy(s)` | `.withAdditionalJobs([])` | `.build()`

---

## Batch Invoice Page

**URL**: `/BatchInvoice/Create`

```typescript
import { BatchInvoicePage, BatchInvoiceSearchOptions, BatchInvoiceTab } from './pages/Invoices/BatchInvoicePage';
```

### Page Structure

| Section | Elements |
|---------|----------|
| Tabs | Jobs, Draft Invoices |
| Filters | Customers multiselect, Search, Date Logged* range, Status multiselect, Job Category multiselect |
| Results | All tab (count), Selected tab (count), Results table |
| Footer | Total Outstanding Cost, Cancel, Save |

### Intent → Method Mapping

| Intent | Method |
|--------|--------|
| navigate | `navigateToBatchInvoice()` |
| switch tab | `switchToTab('Jobs' \| 'Draft Invoices')` |
| toggle filter | `toggleFilter()` |
| search jobs | `searchJobs(text)` |
| set date range | `setDateLoggedRange(start, end)` / `setStartDate(d)` / `setEndDate(d)` |
| apply filters | `applyFilters(options)` |
| switch All/Selected results | `switchToAllResults()` / `switchToSelectedResults()` |
| get counts | `getAllItemsCount()` / `getSelectedItemsCount()` |
| select job "JOB001" | `selectJobByNumber('JOB001')` |
| select all jobs | `selectAllJobs()` |
| get total cost | `getTotalOutstandingCost()` |
| check save enabled | `isSaveEnabled()` |
| create batch invoice | `createBatchInvoice([jobNumbers])` |

### Data Builder Pattern

```typescript
import { BatchInvoiceBuilder } from '../../data/uiData/batchInvoice.data';

await batchInvoicePage.navigateToBatchInvoice();
await batchInvoicePage.createNewBatchOfInvoices(
  BatchInvoiceBuilder.create('01/01/2024', '31/12/2024', ['JOB-001', 'JOB-002'])
    .withCustomers(['ABC Corp'])
    .withStatuses(['Complete'])
    .build()
);
```

#### Builder Methods

`.create(startDate, endDate, jobNumbers)` | `.withCustomers([])` | `.withSearchText(s)` | `.withStatuses([])` | `.withJobCategories([])` | `.withAdditionalJobs([])` | `.build()`

---

## Batch Audit Page

**URL**: `/BatchInvoice/Audit`

```typescript
import { BatchAuditPage, BatchAuditSearchOptions } from './pages/Invoices/BatchAuditPage';
```

### Page-Specific Methods

| Intent | Method |
|--------|--------|
| navigate | `navigateToBatchAudit()` |
| set operation time range | `setOperationTimeRange(start, end)` / `setStartDate(d)` / `setEndDate(d)` |
| apply filters | `applyFilters(options)` |
| wait for data | `waitForDataLoad()` |
| check loading/no results | `isLoading()` / `isNoResultsVisible()` |
| get count | `getAuditRecordsCount()` |
| click audit record | `clickAuditRecord(index)` |
| search and wait | `searchAndWait()` / `searchAndWait(options)` |

---

## All Invoices Page (List)

**URL**: `/Invoice`

```typescript
import { AllInvoicesPage, InvoiceSearchOptions } from './pages/Invoices/AllInvoicesPage';
```

### Page-Specific Elements

| Section | Elements |
|---------|----------|
| Header | Invoice(s), Create Customer Grouped, Print, Export |
| Filters | Toggle filter, Search Invoices, Date range, Show Advanced, Reset, Search |
| Tabs | Invoices (count), Draft Invoices (count), Credits (count), Draft Credits (count) |
| Sidebar | Customer Name, Site Name, Job Number, Status, Payment Status, Date Raised, Payment Due Date |

### Page-Specific Methods

| Intent | Method |
|--------|--------|
| navigate | `navigateToAllInvoices()` |
| click create customer grouped | `clickCreateCustomerGrouped()` |
| toggle filter | `toggleFilter()` |
| search invoices | `searchInvoices(text)` |
| set date range | `setDateRange(start, end)` / `setStartDate(d)` / `setEndDate(d)` |
| get tab counts | `getInvoicesCount()` / `getDraftInvoicesCount()` / `getCreditsCount()` / `getDraftCreditsCount()` |
| click invoice "INV-001" | `clickInvoiceByNumber('INV-001')` |
| click invoice by customer | `clickInvoiceByCustomerName(name)` |
| search and wait | `searchAndWait()` / `searchAndWait(options)` |
| sidebar links | `clickCustomerInSidebar()` / `clickSiteInSidebar()` / `clickJobInSidebar()` |
| get invoice summary | `getInvoiceSummary()` |

---

## Add PPM Page (Create)

**URL**: `/PPMContract/Create#ppmquote` · `/PPMContract/Create#ppmcontract`

```typescript
import { PPMPage, PPMFormData, PPMContractType } from './pages/PPM/PPMPage';
```

### Form Fields

| Field | Required | Type | Method |
|-------|----------|------|--------|
| Contract Type | - | radio | `selectContractType('PPM Quote' \| 'PPM Contract')` |
| Customer | ✓ | combobox | `selectCustomer(name)` |
| Site | ✓ | combobox | `selectSite(name)` |
| Plan Reference | - | textbox | `fillPlanReference(ref)` |
| Description | - | textbox | `fillDescription(text)` |
| Job Category | - | combobox | `selectJobCategory(cat)` |
| Account Manager | - | combobox | `selectAccountManager(mgr)` |
| Tag(s) | - | multiselect | `selectTags([...])` |

### Additional Methods

| Intent | Method |
|--------|--------|
| check ppm quote/contract selected | `isPPMQuoteSelected()` / `isPPMContractSelected()` |
| click next/back/cancel/save | `clickNext()` / `clickBack()` / `clickCancel()` / `clickSave()` |
| check next/save/import enabled | `isNextEnabled()` / `isSaveEnabled()` / `isImportAssetsEnabled()` |
| fill ppm description | `fillPPMDescription(data)` |
| create ppm quote/contract | `createPPMQuote(customer, site, desc)` / `createPPMContract(customer, site, desc)` |

### Data Builder Pattern

```typescript
import { PPMBuilder } from '../../data/uiData/ppm.data';

await ppmPage.navigateToAddPPMQuote();
await ppmPage.createNewPPM(
  PPMBuilder.createQuote('ABC Corp', 'Main Office', 'Annual HVAC Maintenance')
    .planReference('PPM-2024-001')
    .jobCategory('Fire Safety')
    .accountManager('John Smith')
    .tags(['Priority'])
    .build()
);
```

#### Builder Methods

`.createQuote(customer, site, description)` | `.createContract(customer, site, description)` | `.planReference(s)` | `.jobCategory(s)` | `.accountManager(s)` | `.tags([])` | `.build()`

---

## All PPM Contracts Page (List)

**URL**: `/PPMContract`

```typescript
import { AllPPMContractsPage, PPMContractSearchOptions, PPMContractTab } from './pages/PPM/AllPPMContractsPage';
```

> Inherits all [Standard List Page](#template-standard-list-page) methods.

### Page-Specific Elements

| Header Actions | Add PPM, Print, Import PPM, Export |
| Filters | Toggle filter, Search, Show Advanced, Reset, Search |
| Tabs | In Progress, Completed, Suspended, All |
| Sidebar | Customer Name, Site Name, Description, Billing Type, Start/End Date, Job Category, Plan Reference, Selling Rate |

### Page-Specific Methods

| Intent | Method |
|--------|--------|
| get active tab | `getActiveTab()` |
| click contract "PPM-001" | `clickContractByNumber('PPM-001')` |
| click by customer | `clickContractByCustomerName(name)` |
| sidebar data | `getSidebarCustomerName()` / `getSidebarSiteName()` |

---

## All PPM Quotes Page (List)

**URL**: `/PPMQuote`

```typescript
import { AllPPMQuotesPage, PPMQuoteSearchOptions, PPMQuoteTab, PPMQuoteStatus } from './pages/PPM/AllPPMQuotesPage';
```

> Inherits all [Standard List Page](#template-standard-list-page) methods.

### Page-Specific Elements

| Header Actions | Add PPM, Print, Export |
| Filters | Toggle filter, Search, Status multiselect, Show Advanced, Reset, Search |
| Tabs | Quote Design, Outstanding, Sent, Accepted, Rejected, All |

### Page-Specific Methods

| Intent | Method |
|--------|--------|
| select status filter | `selectStatus([...])` |
| get active tab | `getActiveTab()` |
| click quote "PPMQ-001" | `clickQuoteByNumber('PPMQ-001')` |
| click by customer | `clickQuoteByCustomerName(name)` |
| sidebar data | `getSidebarCustomerName()` / `getSidebarSiteName()` / `getSidebarQuoteStatus()` |

---

## Batch Deploy Subcontractor PPM Visits Page

**URL**: `/PPMContract/BatchDeploy`

```typescript
import { BatchDeployPage, BatchDeploySearchOptions, PPMVisitItem } from './pages/PPM/BatchDeployPage';
```

### Filters

| Field | Method |
|-------|--------|
| Subcontractor | `selectSubcontractor(name)` |
| Customer | `selectCustomer(name)` |
| Site | `selectSite(name)` |
| PPM Contract | `selectPPMContract(name)` |
| Date Allocated range | `setDateAllocatedRange(start, end)` |
| Visit Due Date range | `setVisitDueDateRange(start, end)` |
| Site Area(s) | `selectSiteAreas([...])` |
| Subcontractor Area(s) | `selectSubcontractorAreas([...])` |

### Results & Actions

| Intent | Method |
|--------|--------|
| select/deselect visit N | `selectVisitByIndex(N)` / `deselectVisitByIndex(N)` |
| select/deselect all | `selectAllVisits()` / `deselectAllVisits()` |
| get selected count | `getSelectedVisitsCount()` |
| check batch deploy enabled | `isBatchDeployEnabled()` |
| click batch deploy | `clickBatchDeploy()` |
| deploy selected | `deploySelectedVisits()` |
| select and deploy | `selectAndDeployVisits(indices)` |

---

## PPM Parts Required Page

**URL**: `/PPMPartRequired`

```typescript
import { PPMPartsRequiredPage, PPMPartsSearchOptions } from './pages/PPM/PPMPartsRequiredPage';
```

### Filters

| Field | Method |
|-------|--------|
| Search (Part Number/Description) | `search(text)` |
| Engineer | `selectEngineer([...])` |
| Customer | `selectCustomer([...])` |
| Site | `selectSite([...])` |
| PPM Contract | `selectPPMContract([...])` |
| Visit Due Date range | `setVisitDueDateRange(start, end)` |

### Page-Specific Methods

Header: Print, Export. Standard list results: `waitForDataLoad()`, `getRowCount()`, `clickRowByIndex(N)`, `clickPartByNumber(num)`, `getAllVisibleItems()`.

---

## All Purchase Orders Page

**URL**: `/PurchaseOrder`

```typescript
import { AllPurchaseOrdersPage, PurchaseOrderSearchOptions, PurchaseOrderTab } from './pages/Purchasing/AllPurchaseOrdersPage';
```

> Inherits all [Standard List Page](#template-standard-list-page) methods.

### Page-Specific Elements

| Header Actions | Create Stock PO, Export |
| Filters | Toggle filter, Search, PO Type(s), Date Raised range, Show Advanced, Reset, Search |
| Tabs | All, Fully Delivered, Partially Delivered, Not Delivered, In Query, Not Applicable, Needs Approval, Partially Returned |
| Sidebar | Supplier Name, Owner, Raised By, PO Type, Estimated/Actual Delivery, Account Number, Date Raised, Delivery/Invoice Status |

### Page-Specific Methods

| Intent | Method |
|--------|--------|
| select PO types | `selectPOTypes([...])` |
| set date raised range | `setDateRaisedRange(start, end)` |
| click PO "PO-001" | `clickPurchaseOrderByNumber('PO-001')` |
| sidebar data | `getSidebarSupplierName()` / `getSidebarPOType()` |

---

## Create Stock PO Page

**URL**: `/PurchaseOrder/Create`

```typescript
import { CreateStockPOPage, StockPOFormData } from './pages/Purchasing/CreateStockPOPage';
```

### Form Fields

| Field | Required | Type | Method |
|-------|----------|------|--------|
| Stock Delivery Location | ✓ | combobox | `selectStockDeliveryLocation(loc)` |
| Supplier | ✓ | combobox | `selectSupplier(name)` |
| Contact | - | combobox | `selectContact(name)` |
| Account Number | - | textbox | `fillAccountNumber(num)` |
| Estimated Delivery Date | - | date | `fillEstimatedDeliveryDate(date)` |
| Tag(s) | - | multiselect | `selectTags([...])` |

Additional: `clickAddSupplier()`, `clickAddContact()`, `isSaveEnabled()`.

### Data Builder Pattern

```typescript
import { StockPOBuilder } from '../../data/uiData/stockPO.data';

await createStockPOPage.navigateToCreateStockPO();
await createStockPOPage.createNewStockPO(
  StockPOBuilder.create('Main Warehouse', 'ABC Supplier')
    .contact('John Smith')
    .estimatedDeliveryDate('31/12/2024')
    .tags(['Urgent'])
    .build()
);
```

#### Builder Methods

`.create(location, supplier)` | `.contact(s)` | `.accountNumber(s)` | `.estimatedDeliveryDate(s)` | `.tags([])` | `.build()`

---

## Create Stock Reorder Page

**URL**: `/StockPurchaseOrder/AutoStockReorder`

```typescript
import { CreateStockReorderPage, StockReorderSearchOptions } from './pages/Purchasing/CreateStockReorderPage';
```

### Steps

1. **Select Stock to Reorder**: Search, Location filter, Stock table with checkboxes
2. **Supplier Information**: Back, Create PO

### Methods

| Intent | Method |
|--------|--------|
| search stock | `searchStock(text)` |
| select locations | `selectLocations([...])` |
| toggle show selected only | `toggleShowSelectedOnly()` |
| select/deselect stock N | `selectStockByIndex(N)` / `deselectStockByIndex(N)` |
| get stock row count | `getStockRowCount()` |
| click next/back/cancel/create PO | `clickNext()` / `clickBack()` / `clickCancel()` / `clickCreatePO()` |
| select stocks and proceed | `selectStocksAndProceed(indices)` |

### Data Builder Pattern

```typescript
import { StockReorderBuilder } from '../../data/uiData/stockReorder.data';

await createStockReorderPage.navigateToCreateStockReorder();
await createStockReorderPage.createNewStockReorder(
  StockReorderBuilder.create([0, 1, 2])
    .withLocations(['Main Warehouse'])
    .build()
);
```

#### Builder Methods

`.create(stockIndices)` | `.withSearchQuery(s)` | `.withLocations([])` | `.withAdditionalIndices([])` | `.build()`

---

## Contract Purchase Orders Page

**URL**: `/ContractPurchaseOrder`

```typescript
import { ContractPurchaseOrdersPage, ContractPOSearchOptions, ContractPOTab } from './pages/Purchasing/ContractPurchaseOrdersPage';
```

> Inherits all [Standard List Page](#template-standard-list-page) methods.

| Header Actions | Create Contract PO, Export |
| Filters | Toggle filter, Search, Date Raised range, Show Advanced, Reset, Search |
| Tabs | All, Fully Completed, Not Completed |

Page-specific: `clickCreateContractPO()`, `setDateRaisedRange(start, end)`, `clickContractPOByNumber(num)`.

---

## Subcontractor PO Page

**URL**: `/SubContractorPO`

```typescript
import { SubcontractorPOPage, SubcontractorPOSearchOptions, SubcontractorPOTab } from './pages/Purchasing/SubcontractorPOPage';
```

> Inherits all [Standard List Page](#template-standard-list-page) methods.

| Header Actions | Export |
| Filters | Toggle filter, Search, Date Raised range, Show Advanced, Reset, Search, Filters Applied indicator |
| Tabs | All, Fully Completed, Partially Completed, Not Completed, Not Applicable, Needs Approval |
| Sidebar | Job Number, Subcontractor Name, Owner, Raised By, PO Type, Delivery dates, Account Number, Status, Invoice Status |

Page-specific: `setDateRaisedRange(start, end)`, `isFiltersApplied()`, `clickSubcontractorPOByNumber(num)`, `getSidebarJobNumber()`, `getSidebarSubcontractorName()`.

---

## All Purchase Invoices Page

**URL**: `/PurchaseInvoice`

```typescript
import { AllPurchaseInvoicesPage, PurchaseInvoiceSearchOptions, PurchaseInvoiceTab } from './pages/Purchasing/AllPurchaseInvoicesPage';
```

> Inherits all [Standard List Page](#template-standard-list-page) methods.

| Filters | Search, Date Raised range, Reset, Search |
| Tabs | Stock Purchase Invoices, Job Purchase Invoices, Subcontractor Purchase Invoices |

Page-specific: `setDateRaisedRange(start, end)`, `clickInvoiceByNumber(num)`.

---

## Dynamic Reports Page

**URL**: `/Report`

```typescript
import { DynamicReportsPage, ReportSearchOptions, ReportTab } from './pages/Reports/DynamicReportsPage';
```

### Page-Specific Elements

| Header Actions | Create Dynamic Dashboard |
| Filters | Category multiselect, Search, Schedule Status, Reset, Search |
| Tabs | All Reports (count), Favourite Reports (count), Dynamic Dashboard (count) |

### Page-Specific Methods

| Intent | Method |
|--------|--------|
| select categories | `selectCategories([...])` |
| get tab count | `getTabCount(tab)` |
| click report | `clickReportByName(name)` |
| toggle favourite | `toggleFavourite(name)` |

---

## External Links and Dashboards Page

**URL**: `/Report/ExternalLinkAndDashboard`

```typescript
import { ExternalLinksPage, ExternalLinkSearchOptions, ExternalLinkTab } from './pages/Reports/ExternalLinksPage';
```

### Page-Specific Elements

| Header Actions | Add Link |
| Filters | Search Link title, Added By multiselect, Added On date range, Link Type multiselect, Source multiselect |
| Tabs | All Links (count), Favourite (count) |

### Page-Specific Methods

| Intent | Method |
|--------|--------|
| search link title | `searchLinkTitle(text)` |
| select added by | `selectAddedBy([...])` |
| select link type | `selectLinkType([...])` |
| select source | `selectSource([...])` |
| set added on range | `setAddedOnRange(start, end)` |
| get tab count | `getTabCount(tab)` |
| click link | `clickLinkByTitle(name)` |
| toggle favourite | `toggleFavourite(name)` |

---

## EngineersListPage

**URL**: `/Staff/Engineers` · **Sidebar**: Engineers > Engineers List

```typescript
import { EngineersListPage } from './pages/Engineers/EngineersListPage';
```

| Actions | Add Engineer, Engineer Teams |
| Filter | Search textbox |

Methods: `navigateToEngineersList()`, `clickAddEngineer()`, `clickEngineerTeams()`, `search(text)`, `searchAndWait(text)`, `clickEngineerByName(name)`.

---

## NonJobExpensesPage

**URL**: `/NonJobExpense` · **Sidebar**: Engineers > Non Job Expenses

```typescript
import { NonJobExpensesPage } from './pages/Engineers/NonJobExpensesPage';
```

| Actions | Add Non Job Expense, Print, Export |
| Filters | Search, Date Incurred range, Date Raised range, Engineer, Expense Type |

Methods: `navigateToNonJobExpenses()`, `clickAddNonJobExpense()`, `setDateIncurred(start, end)`, `setDateRaised(start, end)`, `selectEngineer([...])`, `selectExpenseType([...])`, `applyFilters(options)`.

---

## NonProductiveTimePage

**URL**: `/NonProductiveTime` · **Sidebar**: Engineers > All Non-Productive Time

```typescript
import { NonProductiveTimePage } from './pages/Engineers/NonProductiveTimePage';
```

| Actions | Add Non-Productive Time, Print, Export |
| Filters | Search, Engineer multiselect, Date range, Type multiselect |

Methods: `navigateToNonProductiveTime()`, `clickAddNonProductiveTime()`, `selectEngineer([...])`, `setDateRange(start, end)`, `selectType([...])`, `applyFilters(options)`, `searchAndWait(text)`.

---

## ViewPlannerPage

**URL**: `/Scheduler` · **Sidebar**: Engineers > View Planner

```typescript
import { ViewPlannerPage } from './pages/Engineers/ViewPlannerPage';
```

| Actions | Filters button, Log Job, Book Non Productive Time, Batch Move, Batch Deploy |
| View Controls | Day/Week/Month switcher, Today, Previous/Next, Planner/Schedule/Jobs display type |

Methods: `navigateToViewPlanner()`, `clickFilters()`, `clickLogJob()`, `clickBookNonProductiveTime()`, `clickBatchMove()`, `clickBatchDeploy()`, `switchToView('Day' \| 'Week' \| 'Month')`, `clickToday()`, `goToPrevious()`, `goToNext()`, `switchToDisplayType('Planner' \| 'Schedule' \| 'Jobs')`.

---

## TimesheetsPage

**URL**: `/Timesheet` · **Sidebar**: Engineers > Timesheets

```typescript
import { TimesheetsPage } from './pages/Engineers/TimesheetsPage';
```

| Filter | Engineer search, Include Team Members checkbox |
| View Controls | Day/Week/Month, Date input, Previous/Next |
| Actions | Add Time, Export |

Methods: `navigateToTimesheets()`, `searchEngineer(name)`, `toggleIncludeTeamMembers()`, `setIncludeTeamMembers(bool)`, `clickAddTime()`, `clickExport()`, `switchToView('Day' \| 'Week' \| 'Month')`, `setDate(date)`, `goToPrevious()`, `goToNext()`.

---

## RouteSchedulePage

**URL**: `/EngineerTracking/RouteSchedule` · **Sidebar**: Engineers > Route Schedule

```typescript
import { RouteSchedulePage } from './pages/Engineers/RouteSchedulePage';
```

Methods: `navigateToRouteSchedule()`, `selectEngineer(name)`, `setDate(date)`, `searchRouteSchedule()`, `waitForDataLoad()`.

---

## LiveTrackingPage

**URL**: `/EngineerTracking/Live` · **Sidebar**: Engineers > Live Tracking

```typescript
import { LiveTrackingPage } from './pages/Engineers/LiveTrackingPage';
```

| Controls | Time Range, Auto Refresh, Manage Settings |

Methods: `navigateToLiveTracking()`, `clickTimeRange()`, `clickAutoRefresh()`, `clickManageSettings()`, `isTrackingDialogVisible()`, `closeTrackingDialog()`.

---

## HistoricalTrackingPage

**URL**: `/EngineerTracking/Historical` · **Sidebar**: Engineers > Historical Tracking

```typescript
import { HistoricalTrackingPage } from './pages/Engineers/HistoricalTrackingPage';
```

Methods: `navigateToHistoricalTracking()`, `selectEngineer(name)`, `setDate(date)`, `searchTrackingData()`, `waitForDataLoad()`.

---

## FormsLogbookPage

**URL**: `/Logbook` · **Sidebar**: Forms Logbook

```typescript
import { FormsLogbookPage } from './pages/FormsLogbook/FormsLogbookPage';
```

| Actions | Add New Item, Print |
| Filters | Search (Job No./Customer/Site/Postcode/Form Name/Type/Engineer/Asset), Date range, Show Private toggle |

Methods: `navigateToFormsLogbook()`, `clickAddNewItem()`, `clickPrint()`, `searchLogbook(text)`, `setStartDate(d)`, `setEndDate(d)`, `setDateRange(start, end)`, `toggleShowPrivate()`, `setShowPrivate(bool)`, `searchAndWait(text)`, `applyFilters(options)`, `clickFormByJobNo(num)`, `clickFormByName(name)`.

---

## GasCylindersPage (Refcom Events)

**URL**: `/Refcom` · **Sidebar**: Refcom > Refcom Events

```typescript
import { GasCylindersPage } from './pages/Refcom/GasCylindersPage';
```

| Actions | Add Cylinder |
| Filters | Search Cylinder (Serial/QR), Cylinder Type, Refrigerant Type, Return Date range, Site, Engineers, Supplier, Location toggles (Storeroom/Engineer/Site/Stock Location) |
| Tabs | Active (count), All (count), Overdue (count), Empty And Full (count), Deleted (count), Returned (count) |

Methods: `navigateToGasCylinders()`, `clickAddCylinder()`, `searchCylinder(text)`, `selectCylinderType(type)`, `selectRefrigerantTypes([...])`, `setReturnDateRange(start, end)`, `searchSite(name)`, `selectEngineers([...])`, `selectSuppliers([...])`, `toggleLocation('Storeroom' \| 'Engineer' \| 'Site' \| 'Stock Location')`, `getTabCount(tab)`, `clickCylinderBySerialNumber(num)`, `applyFilters(options)`.

---

## RefcomAuditPage (Refcom Reports)

**URL**: `/Refcom/LogBook` · **Sidebar**: Refcom > Refcom Reports

```typescript
import { RefcomAuditPage } from './pages/Refcom/RefcomAuditPage';
```

| Actions | Swap Cylinder, Print, Export |
| Filters | Search Terms (Customer/Site/Job/Asset), Asset Description multiselect, Date range, Log Type multiselect, Engineer multiselect, Show Advanced |

Methods: `navigateToRefcomAudit()`, `clickSwapCylinder()`, `searchTerms(text)`, `selectAssetDescriptions([...])`, `setStartDate(d)`, `setEndDate(d)`, `setDateRange(start, end)`, `selectLogTypes([...])`, `selectEngineers([...])`, `toggleShowAdvanced()`, `getRecordCountText()`, `applyFilters(options)`.

---

## RefrigerantAuditPage

**URL**: `/Refcom/RefrigerantAudit`

```typescript
import { RefrigerantAuditPage } from './pages/Refcom/RefrigerantAuditPage';
```

| Actions | Print, Export |
| Filters | Search Terms (Customer/Site), Asset Description multiselect, Refrigerant Type multiselect |

Methods: `navigateToRefrigerantAudit()`, `searchTerms(text)`, `selectAssetDescriptions([...])`, `selectRefrigerantTypes([...])`, `applyFilters(options)`.

---

## StockRecordsPage

**URL**: `/Stock` · **Sidebar**: Stock > All Stock Records

```typescript
import { StockRecordsPage } from './pages/Stock/StockRecordsPage';
```

| Actions | Add Stock Record, Export |
| Filter | Search (Number/Description/Reference) |
| Tabs | All (count), Active (count), Suspended (count) |

Methods: `navigateToStockRecords()`, `clickAddStockRecord()`, `search(text)`, `searchAndWait(text)`, `getTabCount(tab)`, `clickStockRecordByNumber(num)`.

---

## StockLocationsPage

**URL**: `/Location` · **Sidebar**: Stock > Stock Locations

```typescript
import { StockLocationsPage } from './pages/Stock/StockLocationsPage';
```

| Actions | Add Location, Import |
| Filter | Search (Name/Address/Vehicle Reg/Engineer), Include Inactive checkbox |

Methods: `navigateToStockLocations()`, `clickAddLocation()`, `clickImport()`, `search(text)`, `toggleIncludeInactive()`, `setIncludeInactive(bool)`, `searchAndWait(text)`, `applyFilters(options)`, `clickLocationByName(name)`.

---

## StockTakePage

**URL**: `/StockTake` · **Sidebar**: Stock > Stock Take

```typescript
import { StockTakePage } from './pages/Stock/StockTakePage';
```

| Actions | Add Stock Take, Export |
| Filters | Location multiselect, Date Created range, Date Completed range |
| Tabs | Open (count), Completed (count), All (count) |

Methods: `navigateToStockTake()`, `clickAddStockTake()`, `selectLocations([...])`, `setDateCreatedRange(start, end)`, `setDateCompletedRange(start, end)`, `getTabCount(tab)`, `applyFilters(options)`.

---

## StockReorderReportPage

**URL**: `/StockReorder` · **Sidebar**: Stock > Stock Reorder Report

```typescript
import { StockReorderReportPage } from './pages/Stock/StockReorderReportPage';
```

| Actions | Create Stock Reorder |
| Filters | Search (Description/Location/Item Number), Item Description multiselect, Location(s) multiselect |

Methods: `navigateToStockReorderReport()`, `clickCreateStockReorder()`, `search(text)`, `selectItemDescriptions([...])`, `selectLocations([...])`, `searchAndWait(text)`, `applyFilters(options)`.

---

## StockValuationReportPage

**URL**: `/Stock/StockValuationReport` · **Sidebar**: Stock > Stock Valuation Report

```typescript
import { StockValuationReportPage } from './pages/Stock/StockValuationReportPage';
```

| Actions | Print, Export |
| Filters | Search (Number/Description/Reference), Location(s) multiselect, Rack/Shelf(s) multiselect |
| Totals | Total Cost, Total Sell |

Methods: `navigateToStockValuationReport()`, `search(text)`, `selectLocations([...])`, `selectRackShelves([...])`, `searchAndWait(text)`, `applyFilters(options)`, `getTotalCost()`, `getTotalSell()`.

---

## StockAdjustmentPage

**URL**: `/StockAdjustment` · **Sidebar**: Stock > Stock Adjustment

```typescript
import { StockAdjustmentPage } from './pages/Stock/StockAdjustmentPage';
```

| Actions | Add Stock Adjustment, Export |
| Filters | Location multiselect, Date range, Created By multiselect |

Methods: `navigateToStockAdjustment()`, `clickAddStockAdjustment()`, `selectLocations([...])`, `setDateRange(start, end)`, `selectCreatedBy([...])`, `applyFilters(options)`.

---

## StockBulkTransferPage

**URL**: `/Stock/StockBulkTransfer` · **Sidebar**: Stock > Stock Bulk Transfer

```typescript
import { StockBulkTransferPage } from './pages/Stock/StockBulkTransferPage';
```

| Filters | Search (Number/Description/Reference), Location multiselect |
| Form | Cancel, Transfer |

Methods: `navigateToStockBulkTransfer()`, `search(text)`, `selectLocations([...])`, `searchAndWait(text)`, `applyFilters(options)`, `clickCancel()`, `clickTransfer()`, `isTransferEnabled()`, `isCancelEnabled()`, `selectRowByIndex(N)`, `deselectRowByIndex(N)`.

---

## SettingsPage

**URL**: `/Setting/` · **Sidebar**: Settings

```typescript
import { SettingsPage } from './pages/Settings/SettingsPage';
```

### Tiles

Activate, Company Setup, System Setup, Staff, Credit Card Payments, Electronic Forms, Library, Account Integration, Scheme Providers, Customer Portal Access, Sync History, Audit, History of Imports, Document Templates, Company Documentation, Outbound Emails, Subcontractors, Email, Email Notification, FTP Accounts

Methods: `navigateToSettings()`, `click{TileName}()` (e.g. `clickCompanySetup()`, `clickStaff()`, `clickLibrary()`), `isTileVisible(name)`.

---

## CompanySetupPage

**URL**: `/Setting/CompanySetup` · **Sidebar**: Settings > Company Setup

```typescript
import { CompanySetupPage } from './pages/Settings/CompanySetupPage';
```

| Tabs | Details, Business Hours |
| Actions | Edit, Undo, Save |
| Form | Company Number, Name, Industry, Address fields, Country, Email, Telephone, Website, Calling Code, Logo upload |

Methods: `navigateToCompanySetup()`, `goBackToSettings()`, `switchToDetailsTab()`, `switchToBusinessHoursTab()`, `clickEdit()`, `clickUndo()`, `clickSave()`, `setCompanyName(name)`, `selectIndustry(val)`, `setAddress(obj)`, `setEmail(val)`, `setTelephone(val)`, `uploadLogo(path)`, `getCompanyName()`, `getEmail()`, `isEditMode()`.

---

## StaffPage

**URL**: `/Staff` · **Sidebar**: Settings > Staff

```typescript
import { StaffPage } from './pages/Settings/StaffPage';
```

| Actions | User Access Log, Add User, Engineer Teams, Manage User Roles, Import Users, Print, Export |
| Filter | Search Users, Include Inactive checkbox |

Methods: `navigateToStaff()`, `goBackToSettings()`, `clickUserAccessLog()`, `clickAddUser()`, `clickEngineerTeams()`, `clickManageUserRoles()`, `clickImportUsers()`, `search(text)`, `toggleIncludeInactive()`, `setIncludeInactive(bool)`, `searchAndWait(text)`, `applyFilters(options)`, `clickUserByName(name)`.

---

## ElectronicFormsPage

**URL**: `/CompanyForm` · **Sidebar**: Settings > Electronic Forms

```typescript
import { ElectronicFormsPage } from './pages/Settings/ElectronicFormsPage';
```

| Tabs | Electronic Forms, Naming Convention |
| Actions | Add Custom Form |
| Filter | Select Forms by Industry, Search textbox |
| Form Types | Available Forms, Deployed Forms, Custom Forms tabs |
| Toggles | Job Form, General Form |

Methods: `navigateToElectronicForms()`, `goBackToSettings()`, `switchToElectronicFormsTab()`, `switchToNamingConventionTab()`, `clickAddCustomForm()`, `selectIndustry([...])`, `search(text)`, `searchAndWait(text)`, `switchToAvailableForms()`, `switchToDeployedForms()`, `switchToCustomForms()`, `toggleJobForm()`, `toggleGeneralForm()`, `setJobForm(bool)`, `applyFilters(options)`.

---

## LibraryPage

**URL**: `/Library` · **Sidebar**: Settings > Library

```typescript
import { LibraryPage } from './pages/Settings/LibraryPage';
```

### Tiles

Credit Reasons, Parts, Equipment, Gas Types, Selling Rates, Schedule of Rates, Tasks, Phrasebook, Fault Code Library, Service Types, Service Kits, Tax Rates, Nominal Codes, Refcom Transaction Reasons, Service Jobs, Suppliers, Priorities, Tags, Non-Productive Time Types, Sources, Quote Reject Reasons, Incomplete Task Reasons, Engineer Trades, Pay Bands, Company Document Types, Vehicles, Locations, Purchase Order Templates, Quote Templates, Report Templates, Misc, Job Templates, User References

Methods: `navigateToLibrary()`, `goBackToSettings()`, `click{TileName}()` (e.g. `clickParts()`, `clickEquipment()`, `clickTags()`), `isTileVisible(name)`.

---

## AuditPage

**URL**: `/Audit` · **Sidebar**: Settings > Audit

```typescript
import { AuditPage } from './pages/Settings/AuditPage';
```

| Filters | Audit Type multiselect, Action multiselect, Operation Time range, Audit Entry User multiselect |

Methods: `navigateToAudit()`, `goBackToSettings()`, `selectAuditTypes([...])`, `selectActions([...])`, `setOperationTimeRange(start, end)`, `selectAuditEntryUsers([...])`, `applyFilters(options)`.

---

## PortalUsersPage

**URL**: `/Portal` · **Sidebar**: Settings > Customer Portal Access

```typescript
import { PortalUsersPage } from './pages/Settings/PortalUsersPage';
```

| Actions | Add Portal Users, Manage Portal Roles, Import Portal Users, Print, Export |
| Filters | Search, Assigned Roles multiselect, Include Inactive checkbox |

Methods: `navigateToPortalUsers()`, `goBackToSettings()`, `clickAddPortalUsers()`, `clickManagePortalRoles()`, `clickImportPortalUsers()`, `search(text)`, `selectAssignedRoles([...])`, `toggleIncludeInactive()`, `applyFilters(options)`, `clickUserByName(name)`.

---

## DocumentTemplatesPage

**URL**: `/Template` · **Sidebar**: Settings > Document Templates

```typescript
import { DocumentTemplatesPage } from './pages/Settings/DocumentTemplatesPage';
```

| Tabs | Jobsheet, Quotes, Invoice & Credit, PPMs, Purchase Orders, Service Letters, Goods Received Notes, Asset & Task Compliance |
| Actions | Add Template, Download Guidelines |
| Filter | Search Templates |

Methods: `navigateToDocumentTemplates()`, `goBackToSettings()`, `switchToTab(tab)`, `clickAddTemplate()`, `clickDownloadGuidelines()`, `search(text)`, `searchAndWait(text)`, `clickTemplateByName(name)`.

---

## SubcontractorsPage

**URL**: `/Subcontractor` · **Sidebar**: Settings > Subcontractors

```typescript
import { SubcontractorsPage } from './pages/Settings/SubcontractorsPage';
```

| Tabs | Subcontractors, Subcontractor Template |
| Actions | Add Subcontractor, Import |
| Filter | Search, Include Inactive checkbox |

Methods: `navigateToSubcontractors()`, `goBackToSettings()`, `switchToSubcontractorsTab()`, `switchToSubcontractorTemplateTab()`, `clickAddSubcontractor()`, `clickImport()`, `search(text)`, `toggleIncludeInactive()`, `applyFilters(options)`, `clickSubcontractorByName(name)`.

---

## EmailTemplatePage

**URL**: `/EmailTemplate` · **Sidebar**: Settings > Email

```typescript
import { EmailTemplatePage } from './pages/Settings/EmailTemplatePage';
```

| Tabs | Job, Quotes, Invoices, PPMs, Purchase Orders, Service Letters, Documents |
| Actions | Add Template |
| Filter | Search Template |
| Pagination | Results per page, Page navigation |

Methods: `navigateToEmailTemplate()`, `goBackToSettings()`, `switchToTab(tab)`, `clickAddTemplate()`, `search(text)`, `searchAndWait(text)`, `selectResultsPerPage(N)`, `goToPage(N)`, `goToNextPage()`, `goToPreviousPage()`, `clickTemplateByName(name)`.

---

## OutboundEmailsPage

**URL**: `/OutboundEmailHistory/OutboundEmails` · **Sidebar**: Settings > Outbound Emails

```typescript
import { OutboundEmailsPage } from './pages/Settings/OutboundEmailsPage';
```

| Filters | Search (To/Subject), Email Type multiselect, Status multiselect, Sent Date range |

Methods: `navigateToOutboundEmails()`, `goBackToSettings()`, `search(text)`, `selectEmailTypes([...])`, `selectStatuses([...])`, `setSentDateRange(start, end)`, `applyFilters(options)`.

---

## SyncHistoryPage

**URL**: `/AccountIntegration/SyncHistory` · **Sidebar**: Settings > Sync History

```typescript
import { SyncHistoryPage } from './pages/Settings/SyncHistoryPage';
```

| Filters | Sync Type multiselect, Sync Status multiselect, Sync Date range |

Methods: `navigateToSyncHistory()`, `goBackToSettings()`, `selectSyncTypes([...])`, `selectSyncStatuses([...])`, `setSyncDateRange(start, end)`, `applyFilters(options)`.

---

## ImportHistoryPage

**URL**: `/Import/History` · **Sidebar**: Settings > History of Imports

```typescript
import { ImportHistoryPage } from './pages/Settings/ImportHistoryPage';
```

| Filters | Import Type multiselect, Import Status multiselect, Import Date range |

Methods: `navigateToImportHistory()`, `goBackToSettings()`, `selectImportTypes([...])`, `selectImportStatuses([...])`, `setImportDateRange(start, end)`, `applyFilters(options)`.
