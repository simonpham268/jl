# Intent Normalization Rules

This document defines how natural language test steps should be normalized to consistent method calls.

---

## Global Keyword Recognition

These keyword patterns apply to **all pages** in the application.

### Text Input Keywords → `fill*()` / `enter*()` / `type*()` methods

| Keyword | Variations | Maps to |
|---------|------------|---------|
| fill | fill in, fills, filled, filling | `fill()` |
| enter | enters, entered, entering | `fill()` |
| type | types, typed, typing | `fill()` |
| input | inputs, inputting | `fill()` |
| set | sets, setting | `fill()` or `select()` (context-dependent) |
| write | writes, wrote, writing | `fill()` |
| put | puts, putting | `fill()` |

### Dropdown/Select Keywords → `select*()` / `choose*()` methods

| Keyword | Variations | Maps to |
|---------|------------|---------|
| select | selects, selected, selecting | `select*()` |
| choose | chooses, chosen, choosing | `select*()` |
| pick | picks, picked, picking | `select*()` |
| click | clicks, clicked (dropdown item) | `select*()` |
| set | sets (dropdown context) | `select*()` |

### Checkbox Keywords → `check()` / `uncheck()` / `set*(boolean)`

| Keyword | Variations | Maps to |
|---------|------------|---------|
| check | checks, checked | `check()` or `set*(true)` |
| tick | ticks, ticked | `check()` or `set*(true)` |
| enable | enables, enabled | `check()` or `set*(true)` |
| turn on | turns on | `check()` or `set*(true)` |
| mark | marks, marked | `check()` or `set*(true)` |
| uncheck | unchecks, unchecked | `uncheck()` or `set*(false)` |
| untick | unticks, unticked | `uncheck()` or `set*(false)` |
| disable | disables, disabled | `uncheck()` or `set*(false)` |
| turn off | turns off | `uncheck()` or `set*(false)` |
| unmark | unmarks, unmarked | `uncheck()` or `set*(false)` |
| toggle | toggles, toggled | flip current state |

### Button/Action Keywords → `click*()` / `press*()` / `submit()`

| Keyword | Variations | Maps to |
|---------|------------|---------|
| click | clicks, clicked | `click*()` |
| press | presses, pressed | `click*()` |
| hit | hits | `click*()` |
| tap | taps, tapped | `click*()` |
| submit | submits, submitted | `submit()` or `save()` |
| save | saves, saved | `save()` |
| confirm | confirms, confirmed | `confirm()` or `save()` |
| cancel | cancels, cancelled | `cancel()` |

### Navigation Keywords → `navigateTo*()` / `goto()`

| Keyword | Variations | Maps to |
|---------|------------|---------|
| go | go to, goes to | `navigateTo()` |
| navigate | navigate to, navigates | `navigateTo()` |
| open | opens, opened | `navigateTo()` |
| visit | visits, visited | `navigateTo()` |
| access | accesses, accessed | `navigateTo()` |

### Field Name Detection

The system recognizes field names in various formats:

| User Input Pattern | Detected Field |
|--------------------|----------------|
| "customer name" | Customer Name |
| "CustomerName" | Customer Name |
| "customer_name" | Customer Name |
| "the customer name field" | Customer Name |
| "Customer Name field" | Customer Name |

### Value Detection

Values are typically enclosed in quotes or follow "with", "to", "as":

| User Input Pattern | Detected Value |
|--------------------|----------------|
| fill X with "ABC" | ABC |
| set X to "ABC" | ABC |
| enter "ABC" in X | ABC |
| X = "ABC" | ABC |
| choose "ABC" from X | ABC |

---

# Page-Specific Components

These rules apply to specific components/pages within the application.

---

## Sidebar Navigation

### Target Method
```typescript
await sidebar.navigateTo(menu: string, subItem: string);
```

### Pattern Recognition

Any combination of **menu action** + **menu name** + **separator/connector** + **subitem action** + **subitem name** maps to `navigateTo()`.

#### Menu Action Keywords
| Keyword | Variations |
|---------|------------|
| click | click on, clicks, clicked, clicking |
| expand | expand on, expands, expanded, expanding |
| open | open up, opens, opened, opening |
| select | select on, selects, selected, selecting |
| navigate | navigate to, navigates, navigated, navigating |
| go | go to, goes to, went to, going to |
| access | access to, accesses, accessed, accessing |
| hover | hover on, hover over, hovers, hovered |
| press | press on, presses, pressed, pressing |

#### SubItem Action Keywords
| Keyword | Variations |
|---------|------------|
| select | select on, selects, selected, selecting |
| click | click on, clicks, clicked, clicking |
| choose | choose on, chooses, chosen, choosing |
| pick | pick on, picks, picked, picking |
| open | open up, opens, opened, opening |
| access | accesses, accessed, accessing |
| go to | goes to, went to, going to |
| navigate | navigate to, navigates |

#### Separators/Connectors
| Type | Examples |
|------|----------|
| Words | then, and, and then, after that, next, subsequently |
| Punctuation | , | ; | - | → | -> | >> | > | / | \ |
| Phrases | in order to, to, from there |

### Comprehensive Examples

| User Input | Normalized Output |
|------------|-------------------|
| click on Jobs, then select Log Job | `await sidebar.navigateTo('Jobs', 'Log Job');` |
| click Jobs then click LogJob | `await sidebar.navigateTo('Jobs', 'Log Job');` |
| click Jobs, click Log Job | `await sidebar.navigateTo('Jobs', 'Log Job');` |
| expand Jobs and select Log Job | `await sidebar.navigateTo('Jobs', 'Log Job');` |
| expand Jobs, then choose Log Job | `await sidebar.navigateTo('Jobs', 'Log Job');` |
| open Jobs menu and click Log Job | `await sidebar.navigateTo('Jobs', 'Log Job');` |
| go to Jobs > Log Job | `await sidebar.navigateTo('Jobs', 'Log Job');` |
| go to Jobs >> Log Job | `await sidebar.navigateTo('Jobs', 'Log Job');` |
| navigate to Jobs → Log Job | `await sidebar.navigateTo('Jobs', 'Log Job');` |
| navigate Jobs -> Log Job | `await sidebar.navigateTo('Jobs', 'Log Job');` |
| Jobs > Log Job | `await sidebar.navigateTo('Jobs', 'Log Job');` |
| Jobs >> Log Job | `await sidebar.navigateTo('Jobs', 'Log Job');` |
| Jobs / Log Job | `await sidebar.navigateTo('Jobs', 'Log Job');` |
| select Jobs, select Log Job | `await sidebar.navigateTo('Jobs', 'Log Job');` |
| click Jobs item, then select Log Job item | `await sidebar.navigateTo('Jobs', 'Log Job');` |
| access Jobs menu and access Log Job | `await sidebar.navigateTo('Jobs', 'Log Job');` |
| hover over Jobs and click Log Job | `await sidebar.navigateTo('Jobs', 'Log Job');` |
| press Jobs then press Log Job | `await sidebar.navigateTo('Jobs', 'Log Job');` |
| expand Jobs sidebar, click on Log Job | `await sidebar.navigateTo('Jobs', 'Log Job');` |
| from Jobs select Log Job | `await sidebar.navigateTo('Jobs', 'Log Job');` |
| under Jobs click Log Job | `await sidebar.navigateTo('Jobs', 'Log Job');` |
| in Jobs menu, click Log Job | `await sidebar.navigateTo('Jobs', 'Log Job');` |
| Jobs menu - Log Job | `await sidebar.navigateTo('Jobs', 'Log Job');` |
| open Jobs; select Log Job | `await sidebar.navigateTo('Jobs', 'Log Job');` |
| User clicks on Jobs, User selects Log Job | `await sidebar.navigateTo('Jobs', 'Log Job');` |
| User expands Jobs then User clicks Log Job | `await sidebar.navigateTo('Jobs', 'Log Job');` |

### Edge Cases

| User Input | Normalized Output | Note |
|------------|-------------------|------|
| click Jobs | `await sidebar.expandMenu('Jobs');` | Only expand, no subitem |
| expand Jobs menu only | `await sidebar.expandMenu('Jobs');` | Explicit "only" |
| select Log Job from Jobs | `await sidebar.navigateTo('Jobs', 'Log Job');` | Reversed order |
| Log Job under Jobs | `await sidebar.navigateTo('Jobs', 'Log Job');` | Reversed order |
| choose Log Job in Jobs section | `await sidebar.navigateTo('Jobs', 'Log Job');` | Reversed order |

### Known Menu Structure (JobLogic UAT)

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
  'Forms Logbook': [],  // Direct link, no submenu
  'Refcom': ['Refcom Events', 'Refcom Reports'],
  'Stock': ['All Stock Records', 'Stock Locations', 'Stock Take', 'Stock Reorder Report', 'Stock Valuation Report', 'Stock Adjustment', 'Stock Bulk Transfer'],
  'Marketplace': [],    // Direct link
  'Settings': [],       // Direct link
  'News Feed': [],      // Direct link - opens /Newsfeed
  'My To-Do List': [],  // Direct link - opens /ToDo
};

// Alternative menu name variations users might use
const MENU_ALIASES = {
  'Job': 'Jobs',
  'Customer': 'Customers',
  'Site': 'Sites',
  'Asset': 'Assets',
  'Quote': 'Quotes',
  'Invoice': 'Invoices',
  'Engineer': 'Engineers',
  'Report': 'Reports',
  'Purchase Order': 'Purchasing',
  'PO': 'Purchasing',
  'PPM Contract': 'PPM',
  'Planned Maintenance': 'PPM',
  'Scheduler': 'Engineers',  // View Planner is under Engineers
  'Planner': 'Engineers',
  'To Do': 'My To-Do List',
  'ToDo': 'My To-Do List',
  'Todo': 'My To-Do List',
};

// SubItem aliases
const SUBITEM_ALIASES = {
  'Create Job': 'Log Job',
  'New Job': 'Log Job',
  'Add Job': 'Log Job',
  'Create Quote': 'Log Quote',
  'New Quote': 'Log Quote',
  'Add Quote': 'Log Quote',
  'New Customer': 'Add Customer',
  'Create Customer': 'Add Customer',
  'New Site': 'Add Site',
  'Create Site': 'Add Site',
  'New Asset': 'Add Asset',
  'Create Asset': 'Add Asset',
  'View Jobs': 'All Jobs',
  'Jobs List': 'All Jobs',
  'View Customers': 'All Customers',
  'Customers List': 'All Customers',
  'View Sites': 'All Sites',
  'Sites List': 'All Sites',
  'View Assets': 'All Assets',
  'Assets List': 'All Assets',
  'View Quotes': 'All Quotes',
  'Quotes List': 'All Quotes',
  'View Invoices': 'All Invoices',
  'Invoices List': 'All Invoices',
  'Calendar': 'View Planner',
  'Schedule': 'View Planner',
  'Staff': 'Engineers List',
  'Team': 'Engineers List',
};
```

### URL Patterns

| Menu | SubItem | URL |
|------|---------|-----|
| Dashboard | Main | / |
| Jobs | Log Job | /Job/Create |
| Jobs | All Jobs | /Job |
| Customers | Add Customer | /Customer/Create |
| Customers | All Customers | /Customer |
| Sites | Add Site | /Site/Create |
| Sites | All Sites | /Site |
| Assets | Add Asset | /Asset/Create |
| Assets | All Assets | /Asset |
| Assets | Assets & Tasks Compliance | /Asset/Compliance |
| Quotes | Log Quote | /Quote/Create |
| Quotes | All Quotes | /Quote |
| Invoices | All Invoices | /Invoice |
| Invoices | Batch Audit | /Invoice/BatchAudit |
| PPM | Add PPM | /PPMContract/Create |
| PPM | All PPM Contracts | /PPMContract |
| PPM | All PPM Quotes | /PPMQuote |
| Purchasing | All Purchase Orders | /PurchaseOrder |
| Purchasing | Create Stock PO | /PurchaseOrder/Create |
| Purchasing | Create Stock Reorder | /PurchaseOrder/Reorder |
| Purchasing | Contract Purchase Orders | /PurchaseOrder/Contract |
| Purchasing | Subcontractor PO | /PurchaseOrder/Subcontractor |
| Purchasing | All Purchase Invoices | /PurchaseInvoice |
| Reports | - | /Report |
| Engineers | Engineers List | /Staff/Engineers |
| Engineers | Non Job Expenses | /Expense |
| Engineers | All Non-Productive Time | /NonProductiveTime |
| Engineers | View Planner | /Scheduler |
| Engineers | Timesheets | /Timesheet |
| Engineers | Route Schedule | /Route |
| Engineers | Live Tracking | /Tracking/Live |
| Engineers | Historical Tracking | /Tracking/History |
| Forms Logbook | - | /Logbook |
| Stock | All Stock Records | /Stock |
| Stock | Stock Locations | /Stock/Locations |
| Stock | Stock Take | /Stock/StockTake |
| Stock | Stock Reorder Report | /Stock/Reorder |
| Stock | Stock Valuation Report | /Stock/Valuation |
| Stock | Stock Adjustment | /Stock/Adjustment |
| Stock | Stock Bulk Transfer | /Stock/Transfer |
| My To-Do List | - | /ToDo |
| News Feed | - | /Newsfeed |
| Settings | - | /Setting/ |
| Marketplace | - | /Marketplace |

---

## Customer Page

### Page URLs
- Add Customer: `/Customer/Create`
- Customer Detail/Edit: `/Customer/{id}`

### Target Class
```typescript
import { CustomerPage, CustomerData } from './pages/Customers/CustomerPage';

const customerPage = new CustomerPage(page);
```

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
| Address (street) | textbox | - | `fillAddress({ street })` |
| Area | textbox | - | `fillAddress({ area })` |
| City | textbox | - | `fillAddress({ city })` |
| County | textbox | - | `fillAddress({ county })` |
| Postcode | textbox | - | `fillAddress({ postcode })` |
| Telephone | phone | - | `fillTelephone(phone, countryCode?)` |
| First Name | textbox | - | `fillMainContact({ firstName })` |
| Last Name | textbox | - | `fillMainContact({ lastName })` |
| Contact Telephone | phone | - | `fillMainContact({ telephone, countryCode })` |
| Email | textbox | - | `fillMainContact({ email })` |
| Job Position | textbox | - | `fillMainContact({ jobPosition })` |
| Auto generate Site | checkbox | - | `setAutoGenerateSite(boolean)` |

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (fill, enter, select, choose, etc.)

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Customer Name (textbox)** | |
| fill customer name with "ABC Corp" | `fillCustomerName('ABC Corp')` |
| enter "ABC Corp" in customer name | `fillCustomerName('ABC Corp')` |
| type "ABC Corp" into customer name | `fillCustomerName('ABC Corp')` |
| input customer name "ABC Corp" | `fillCustomerName('ABC Corp')` |
| set customer name to "ABC Corp" | `fillCustomerName('ABC Corp')` |
| **Customer Type (combobox)** | |
| select customer type "Commercial" | `selectCustomerType('Commercial')` |
| choose customer type "Residential" | `selectCustomerType('Residential')` |
| pick "Commercial" from customer type | `selectCustomerType('Commercial')` |
| click customer type "Commercial" | `selectCustomerType('Commercial')` |
| set customer type to "Commercial" | `selectCustomerType('Commercial')` |
| **Tags (multiselect)** | |
| select tags "VIP" and "Priority" | `selectTags(['VIP', 'Priority'])` |
| add tags "VIP", "Priority" | `selectTags(['VIP', 'Priority'])` |
| choose tags "VIP" | `selectTags(['VIP'])` |
| **Address Fields (textbox)** | |
| fill address with "123 Main St" | `fillAddress({ street: '123 Main St' })` |
| enter city "London" | `fillAddress({ city: 'London' })` |
| type postcode "SW1A 1AA" | `fillAddress({ postcode: 'SW1A 1AA' })` |
| set area to "Westminster" | `fillAddress({ area: 'Westminster' })` |
| input county "Greater London" | `fillAddress({ county: 'Greater London' })` |
| **Telephone (phone)** | |
| fill telephone "7123456789" | `fillTelephone('7123456789')` |
| enter phone "7123456789" | `fillTelephone('7123456789')` |
| set UK phone "+44 7123456789" | `fillTelephone('7123456789', '+44')` |
| type telephone number "7123456789" | `fillTelephone('7123456789')` |
| **Account Manager (combobox)** | |
| select account manager "John Smith" | `selectAccountManager('John Smith')` |
| choose "John Smith" as account manager | `selectAccountManager('John Smith')` |
| pick account manager "John Smith" | `selectAccountManager('John Smith')` |
| **Selling Rate (combobox)** | |
| select selling rate "Standard" | `selectSellingRate('Standard')` |
| choose selling rate "Premium" | `selectSellingRate('Premium')` |
| set selling rate to "Standard" | `selectSellingRate('Standard')` |
| **Main Contact (textbox fields)** | |
| fill first name "John" | `fillMainContact({ firstName: 'John' })` |
| enter last name "Doe" | `fillMainContact({ lastName: 'Doe' })` |
| type email "john@test.com" | `fillMainContact({ email: 'john@test.com' })` |
| set job position to "Manager" | `fillMainContact({ jobPosition: 'Manager' })` |
| input contact telephone "7987654321" | `fillMainContact({ telephone: '7987654321' })` |
| **Auto Generate Site (checkbox)** | |
| check auto generate site | `setAutoGenerateSite(true)` |
| tick auto generate site | `setAutoGenerateSite(true)` |
| enable auto generate site | `setAutoGenerateSite(true)` |
| uncheck auto generate site | `setAutoGenerateSite(false)` |
| untick auto generate site | `setAutoGenerateSite(false)` |
| disable auto generate site | `setAutoGenerateSite(false)` |
| **Actions** | |
| click save | `save()` |
| press save button | `save()` |
| submit form | `save()` |
| click cancel | `cancel()` |
| press cancel | `cancel()` |
| **Navigation** | |
| go to add customer page | `navigateToAddCustomer()` |
| navigate to add customer | `navigateToAddCustomer()` |
| open add customer | `navigateToAddCustomer()` |
| navigate to customer 123 | `navigateToCustomer('123')` |
| go to customer 123 | `navigateToCustomer('123')` |
| open customer 123 | `navigateToCustomer('123')` |
| **High-Level Creation** | |
| create new customer | `createNewCustomer(data)` |
| add new customer | `createNewCustomer(data)` |
| create a customer | `createNewCustomer(data)` |
| add a customer | `createNewCustomer(data)` |
| create customer | `createNewCustomer(data)` |
| add customer | `createNewCustomer(data)` |
| fill customer form only | `fillNewCustomerForm(data)` |
| fill new customer form | `fillNewCustomerForm(data)` |

### Bulk Fill Example

```typescript
// Fill entire form with data object
await customerPage.fillCustomerForm({
  customerName: 'ABC Corporation',          // Required
  tags: ['VIP', 'Priority'],
  customerType: 'Commercial',
  referenceNumber: 'REF-001',
  accountNumber: 'ACC-001',
  sellingRate: 'Standard',
  accountManager: 'John Smith',
  
  // Address
  address: '123 Main Street',
  area: 'Westminster',
  city: 'London',
  county: 'Greater London',
  postcode: 'SW1A 1AA',
  telephone: '7123456789',
  countryCode: '+44',
  
  // Main Contact
  firstName: 'Jane',
  lastName: 'Doe',
  contactTelephone: '7987654321',
  email: 'jane.doe@abc.com',
  jobPosition: 'Manager',
  
  // Options
  autoGenerateSite: true,
});

await customerPage.save();
```

### Quick Create

```typescript
// Create customer with just required field
const customerId = await customerPage.createCustomer('ABC Corp');

// Create with full data
const customerId = await customerPage.createCustomerWithData({
  customerName: 'XYZ Ltd',
  city: 'Manchester',
  email: 'info@xyz.com',
});
```

### Data Builder Pattern (Recommended)

```typescript
import { CustomerBuilder, generateCustomerName } from '../../data/testData/customer.data';

// Navigate first, then create
await customerPage.navigateToAddCustomer();

// Simple customer with builder
const customerId = await customerPage.createNewCustomer(
  CustomerBuilder.create('ABC Company').build()
);

// Customer with more details using fluent API
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

// Generate unique customer name
const customerId = await customerPage.createNewCustomer(
  CustomerBuilder.create(generateCustomerName('Test Customer'))
    .referenceNumber(generateCustomerRef())
    .email(generateEmail('test'))
    .build()
);
```

#### CustomerBuilder Methods

| Method | Description |
|--------|-------------|
| `.create(customerName)` | Create builder with required name |
| `.tags(string[])` | Set tags |
| `.customerType(string)` | Set customer type |
| `.referenceNumber(string)` | Set reference number |
| `.accountNumber(string)` | Set account number |
| `.sellingRate(string)` | Set selling rate |
| `.accountManager(string)` | Set account manager |
| `.address(string)` | Set street address |
| `.area(string)` | Set area |
| `.city(string)` | Set city |
| `.county(string)` | Set county |
| `.postcode(string)` | Set postcode |
| `.telephone(phone, countryCode?)` | Set telephone |
| `.firstName(string)` | Set contact first name |
| `.lastName(string)` | Set contact last name |
| `.contactName(first, last)` | Set contact full name |
| `.email(string)` | Set contact email |
| `.jobPosition(string)` | Set contact job position |
| `.contactTelephone(phone, countryCode?)` | Set contact telephone |
| `.contact(first, last, email?)` | Set contact details |
| `.autoGenerateSite(boolean?)` | Enable auto-generate site |
| `.build()` | Build CustomerData object |

---

## All Customers Page (List)

### Page URL
- All Customers: `/Customer`

### Target Class
```typescript
import { AllCustomersPage, CustomerSearchOptions } from './pages/Customers/AllCustomersPage';

const allCustomersPage = new AllCustomersPage(page);
```

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (search, click, select, etc.)

### Page Structure

| Section | Elements |
|---------|----------|
| Header Actions | Add Customer, Print, Import, Export |
| Filter Section | Search input, Tags filter, Show/Hide Advanced, Reset Filter, Search button |
| Tabs | Active, Suspended, All |
| Table | Name, Account Manager, Account Number, Address, Postcode, Contact Name, Telephone, Email |
| Pagination | First, Previous, Page numbers, Next, Last, Results per page |
| Detail Sidebar | Customer info panel, View Full Customer Details |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to all customers | `navigateToAllCustomers()` |
| navigate to all customers page | `navigateToAllCustomers()` |
| open customers list | `navigateToAllCustomers()` |
| go to customer list | `navigateToAllCustomers()` |
| **Search** | |
| search for "ABC Corp" | `search('ABC Corp')` |
| search customers "ABC" | `search('ABC')` |
| find customer "John" | `search('John')` |
| look up "123 Main St" | `search('123 Main St')` |
| search by account number "ACC001" | `search('ACC001')` |
| clear search | `clearSearch()` |
| reset search | `clearSearch()` |
| **Filter - Tags** | |
| filter by tag "VIP" | `filterByTags(['VIP'])` |
| filter tags "VIP" and "Priority" | `filterByTags(['VIP', 'Priority'])` |
| select tags "Important" | `filterByTags(['Important'])` |
| **Filter - General** | |
| show advanced filters | `showAdvancedFilters()` |
| expand advanced filters | `showAdvancedFilters()` |
| hide advanced filters | `hideAdvancedFilters()` |
| collapse advanced filters | `hideAdvancedFilters()` |
| reset filters | `resetFilter()` |
| clear all filters | `resetFilter()` |
| toggle filter section | `toggleFilterSection()` |
| hide filter | `toggleFilterSection()` |
| show filter | `toggleFilterSection()` |
| **Tabs** | |
| switch to active tab | `switchToTab('Active')` |
| click active tab | `switchToTab('Active')` |
| view active customers | `switchToTab('Active')` |
| switch to suspended tab | `switchToTab('Suspended')` |
| click suspended tab | `switchToTab('Suspended')` |
| view suspended customers | `switchToTab('Suspended')` |
| switch to all tab | `switchToTab('All')` |
| click all tab | `switchToTab('All')` |
| show all customers | `switchToTab('All')` |
| **Table - Click Rows** | |
| click on customer "ABC Corp" | `clickCustomerByName('ABC Corp')` |
| select customer "ABC Corp" | `clickCustomerByName('ABC Corp')` |
| open customer "ABC Corp" | `clickCustomerByName('ABC Corp')` |
| click first row | `clickRowByIndex(0)` |
| click row 3 | `clickRowByIndex(2)` |
| select first customer | `clickRowByIndex(0)` |
| **Table - Sorting** | |
| sort by name | `sortByColumn('Name')` |
| click name column | `sortByColumn('Name')` |
| sort by account number | `sortByColumn('Account Number')` |
| sort by address | `sortByColumn('Address')` |
| sort by postcode | `sortByColumn('Postcode')` |
| **Pagination** | |
| go to first page | `goToFirstPage()` |
| go to previous page | `goToPreviousPage()` |
| go to next page | `goToNextPage()` |
| go to last page | `goToLastPage()` |
| go to page 5 | `goToPage(5)` |
| navigate to page 3 | `goToPage(3)` |
| show 20 results per page | `setResultsPerPage(20)` |
| set 50 results per page | `setResultsPerPage(50)` |
| change to 10 results | `setResultsPerPage(10)` |
| **Header Actions** | |
| click add customer | `clickAddCustomer()` |
| press add customer button | `clickAddCustomer()` |
| click print | `clickPrint()` |
| print customers | `clickPrint()` |
| click import | `clickImport()` |
| import customers | `clickImport()` |
| click export | `clickExport()` |
| export customers | `clickExport()` |
| **Detail Sidebar** | |
| view full customer details | `viewFullCustomerDetails()` |
| click view full details | `viewFullCustomerDetails()` |
| open customer details | `viewFullCustomerDetails()` |
| **Data Retrieval** | |
| get row count | `getRowCount()` |
| count customers | `getRowCount()` |
| get customer from row 1 | `getCustomerFromRow(0)` |
| get all visible customers | `getAllVisibleCustomers()` |
| check if customer exists | `customerExists('ABC Corp')` |
| **Assertions** | |
| verify page loaded | `assertPageLoaded()` |
| verify results contain "ABC" | `assertSearchResultsContain('ABC')` |
| verify no results | `assertNoResults()` |

### Table Columns

| Column | Sortable | Description |
|--------|----------|-------------|
| Name | ✓ | Customer name (link to detail) |
| Account Manager | - | Assigned account manager |
| Account Number | ✓ | Customer account number |
| Address | ✓ | Customer address |
| Postcode | ✓ | Postal code |
| Contact Name | - | Main contact name |
| Telephone | - | Phone number (link) |
| Email | - | Email address (link) |

### Tab Definitions

| Tab | Description |
|-----|-------------|
| Active | Customers with active status |
| Suspended | Customers with suspended status |
| All | All customers regardless of status |

### Results Per Page Options

| Value | Label |
|-------|-------|
| 5 | 5 Results per page |
| 10 | 10 Results per page (default) |
| 20 | 20 Results per page |
| 30 | 30 Results per page |
| 50 | 50 Results per page |

### Combined Operations

```typescript
// Search and filter
await allCustomersPage.searchWithOptions({
  query: 'ABC',
  tags: ['VIP', 'Priority'],
});

// Switch tab and search
await allCustomersPage.switchToTab('All');
await allCustomersPage.search('John');

// Paginate through results
await allCustomersPage.setResultsPerPage(50);
await allCustomersPage.goToPage(2);

// Get customer data
const customers = await allCustomersPage.getAllVisibleCustomers();
console.log(customers[0].name); // First customer's name

// Verify customer exists then click
if (await allCustomersPage.customerExists('ABC Corp')) {
  await allCustomersPage.clickCustomerByName('ABC Corp');
}
```

### Typical Flow

```typescript
// Full customer search flow
await allCustomersPage.navigateToAllCustomers();
await allCustomersPage.assertPageLoaded();

// Filter and search
await allCustomersPage.switchToTab('Active');
await allCustomersPage.search('ABC Corporation');
await allCustomersPage.assertSearchResultsContain('ABC Corporation');

// Open customer details
await allCustomersPage.clickCustomerByName('ABC Corporation');
// Now on Customer Detail page
```

---

## Site Page (Add/Edit)

### Page URL
- Add Site: `/Site/Create`
- Site Detail: `/Site/Detail/{id}`

### Target Class
```typescript
import { SitePage, SiteData } from './pages/Sites/SitePage';

const sitePage = new SitePage(page);
```

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (fill, select, enter, etc.)

### Page Structure

| Section | Fields |
|---------|--------|
| Customer Selection | Customer (required, combobox) |
| Find Address | Search box to auto-populate fields |
| Details | Site Name*, Tags, Account Manager, Postcode, Telephone, Area, Site Reference Number |
| Address | Street address, Area, City, County |
| Main Contact | First Name, Last Name, Telephone, Email, Job Position |
| Actions | Cancel, Save |

### Form Fields

| Field | Type | Required | Section |
|-------|------|----------|---------|  
| Customer | combobox | ✓ | Header |
| Find Address | searchbox | - | Header |
| Site Name | textbox | ✓ | Details |
| Tag(s) | multiselect | - | Details |
| Account Manager | combobox | - | Details |
| Postcode | textbox | - | Details |
| Telephone | phone (country code + input) | - | Details |
| Area | combobox | - | Details |
| Site Reference Number | textbox | - | Details |
| Street address | textbox | - | Address |
| Area (address) | textbox | - | Address |
| City | textbox | - | Address |
| County | textbox | - | Address |
| First Name | textbox | - | Main Contact |
| Last Name | textbox | - | Main Contact |
| Contact Telephone | phone | - | Main Contact |
| Email | textbox | - | Main Contact |
| Job Position | textbox | - | Main Contact |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to add site | `navigateToAddSite()` |
| navigate to add site page | `navigateToAddSite()` |
| open add site form | `navigateToAddSite()` |
| go to site 12345 | `navigateToSite(12345)` |
| open site detail 12345 | `navigateToSite('12345')` |
| **Customer Selection** | |
| select customer "ABC Corp" | `selectCustomer('ABC Corp')` |
| choose customer "ABC Corp" | `selectCustomer('ABC Corp')` |
| pick customer "ABC Corp" | `selectCustomer('ABC Corp')` |
| **Find Address** | |
| find address "Manchester" | `findAddress('Manchester')` |
| search address "M1 2AB" | `findAddress('M1 2AB')` |
| auto-fill address "Company Name" | `findAddress('Company Name')` |
| **Details Section** | |
| fill site name "Main Office" | `fillSiteName('Main Office')` |
| enter site name "Branch 1" | `fillSiteName('Branch 1')` |
| set site name to "Warehouse" | `fillSiteName('Warehouse')` |
| select tags "VIP", "Priority" | `selectTags(['VIP', 'Priority'])` |
| choose tags "Important" | `selectTags(['Important'])` |
| select account manager "John" | `selectAccountManager('John')` |
| fill postcode "M1 2AB" | `fillPostcode('M1 2AB')` |
| enter postcode "SW1A 1AA" | `fillPostcode('SW1A 1AA')` |
| fill telephone "1234567890" | `fillTelephone('1234567890')` |
| fill telephone "+44" "1234567890" | `fillTelephone('1234567890', '+44')` |
| select area "North" | `selectArea('North')` |
| choose area "South" | `selectArea('South')` |
| fill site reference "REF001" | `fillSiteReference('REF001')` |
| enter site reference number "SR-123" | `fillSiteReference('SR-123')` |
| **Address Section** | |
| fill address with street "123 Main St" | `fillAddress({ street: '123 Main St' })` |
| fill address fields | `fillAddress({ street, area, city, county })` |
| **Main Contact** | |
| fill main contact first name "John" | `fillMainContact({ firstName: 'John' })` |
| fill contact details | `fillMainContact({ firstName, lastName, telephone, email })` |
| **Actions** | |
| click save | `save()` |
| save site | `save()` |
| click cancel | `cancel()` |
| cancel | `cancel()` |
| **Bulk Operations** | |
| fill site form | `fillSiteForm(data)` |
| create site "Customer" "Site Name" | `createSite('Customer', 'Site Name')` |
| create site with data | `createSiteWithData(data)` |
| **High-Level Creation** | |
| create new site | `createNewSite(data)` |
| add new site | `createNewSite(data)` |
| create a site | `createNewSite(data)` |
| add a site | `createNewSite(data)` |
| create site | `createNewSite(data)` |
| add site | `createNewSite(data)` |
| fill site form only | `fillNewSiteForm(data)` |
| fill new site form | `fillNewSiteForm(data)` |

### Example Usage

```typescript
// Create site with full data
const siteData: SiteData = {
  customerName: 'ABC Corporation',
  siteName: 'Main Office',
  tags: ['VIP'],
  postcode: 'M1 2AB',
  address: '123 Main Street',
  city: 'Manchester',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
};

await sitePage.fillSiteForm(siteData);
await sitePage.save();
```

### Quick Create

```typescript
// Create site with minimal data
const siteId = await sitePage.createSite('ABC Corp', 'Main Office');

// Create with full data
const siteId = await sitePage.createSiteWithData({
  customerName: 'ABC Corp',
  siteName: 'Branch Office',
  city: 'London',
  email: 'branch@abc.com',
});
```

### Data Builder Pattern (Recommended)

```typescript
import { SiteBuilder, generateSiteName } from '../../data/testData/site.data';

// Navigate first, then create
await sitePage.navigateToAddSite();

// Simple site with builder
const siteId = await sitePage.createNewSite(
  SiteBuilder.create('ABC Corp', 'Main Office').build()
);

// Site with more details using fluent API
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

// Generate unique site name
const siteId = await sitePage.createNewSite(
  SiteBuilder.create('ABC Corp', generateSiteName('Test Site'))
    .siteReferenceNumber(generateSiteRef())
    .email(generateEmail('site'))
    .build()
);
```

#### SiteBuilder Methods

| Method | Description |
|--------|-------------|
| `.create(customerName, siteName)` | Create builder with required fields |
| `.tags(string[])` | Set tags |
| `.accountManager(string)` | Set account manager |
| `.postcode(string)` | Set postcode |
| `.telephone(phone, countryCode?)` | Set telephone |
| `.area(string)` | Set area dropdown |
| `.siteReferenceNumber(string)` | Set site reference number |
| `.address(string)` | Set street address |
| `.addressArea(string)` | Set address area |
| `.city(string)` | Set city |
| `.county(string)` | Set county |
| `.firstName(string)` | Set contact first name |
| `.lastName(string)` | Set contact last name |
| `.contactName(first, last)` | Set contact full name |
| `.email(string)` | Set contact email |
| `.jobPosition(string)` | Set contact job position |
| `.contactTelephone(phone, countryCode?)` | Set contact telephone |
| `.contact(first, last, email?)` | Set contact details |
| `.build()` | Build SiteData object |

---

## All Sites Page (List)

### Page URL
- All Sites: `/Site`

### Target Class
```typescript
import { AllSitesPage, SiteSearchOptions } from './pages/Sites/AllSitesPage';

const allSitesPage = new AllSitesPage(page);
```

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (search, click, select, etc.)

### Page Structure

| Section | Elements |
|---------|----------|
| Header Actions | Add Site, Print, Export |
| Filter Section | Search input, Tags filter, Area filter, Show/Hide Advanced, Reset Filter, Search button |
| Tabs | Active, Suspended, All |
| Table | Name, Account Manager, Address, Postcode, Contact Name, Telephone, Email |
| Pagination | First, Previous, Page numbers, Next, Last, Results per page |
| Detail Sidebar | Site info panel, View Full Site Details |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to all sites | `navigateToAllSites()` |
| navigate to all sites page | `navigateToAllSites()` |
| open sites list | `navigateToAllSites()` |
| go to site list | `navigateToAllSites()` |
| **Search** | |
| search for "Main Office" | `search('Main Office')` |
| search sites "Office" | `search('Office')` |
| find site "Branch" | `search('Branch')` |
| look up "M1 2AB" | `search('M1 2AB')` |
| search by customer "ABC Corp" | `search('ABC Corp')` |
| clear search | `clearSearch()` |
| reset search | `clearSearch()` |
| **Filter - Tags** | |
| filter by tag "VIP" | `filterByTags(['VIP'])` |
| filter tags "VIP" and "Priority" | `filterByTags(['VIP', 'Priority'])` |
| **Filter - Area** | |
| filter by area "North" | `filterByArea('North')` |
| select area "South" | `filterByArea('South')` |
| **Filter - General** | |
| show advanced filters | `showAdvancedFilters()` |
| expand advanced filters | `showAdvancedFilters()` |
| hide advanced filters | `hideAdvancedFilters()` |
| collapse advanced filters | `hideAdvancedFilters()` |
| reset filters | `resetFilter()` |
| clear all filters | `resetFilter()` |
| toggle filter section | `toggleFilterSection()` |
| **Tabs** | |
| switch to active tab | `switchToTab('Active')` |
| click active tab | `switchToTab('Active')` |
| view active sites | `switchToTab('Active')` |
| switch to suspended tab | `switchToTab('Suspended')` |
| click suspended tab | `switchToTab('Suspended')` |
| view suspended sites | `switchToTab('Suspended')` |
| switch to all tab | `switchToTab('All')` |
| click all tab | `switchToTab('All')` |
| show all sites | `switchToTab('All')` |
| **Table - Click Rows** | |
| click on site "Main Office" | `clickSiteByName('Main Office')` |
| select site "Branch 1" | `clickSiteByName('Branch 1')` |
| open site "Warehouse" | `clickSiteByName('Warehouse')` |
| click first row | `clickRowByIndex(0)` |
| click row 3 | `clickRowByIndex(2)` |
| select first site | `clickRowByIndex(0)` |
| **Table - Sorting** | |
| sort by name | `sortByColumn('Name')` |
| click name column | `sortByColumn('Name')` |
| sort by address | `sortByColumn('Address')` |
| sort by postcode | `sortByColumn('Postcode')` |
| **Pagination** | |
| go to first page | `goToFirstPage()` |
| go to previous page | `goToPreviousPage()` |
| go to next page | `goToNextPage()` |
| go to last page | `goToLastPage()` |
| go to page 5 | `goToPage(5)` |
| navigate to page 3 | `goToPage(3)` |
| show 20 results per page | `setResultsPerPage(20)` |
| set 50 results per page | `setResultsPerPage(50)` |
| **Header Actions** | |
| click add site | `clickAddSite()` |
| press add site button | `clickAddSite()` |
| click print | `clickPrint()` |
| print sites | `clickPrint()` |
| click export | `clickExport()` |
| export sites | `clickExport()` |
| **Detail Sidebar** | |
| view full site details | `viewFullSiteDetails()` |
| click view full details | `viewFullSiteDetails()` |
| open site details | `viewFullSiteDetails()` |
| **Data Retrieval** | |
| get row count | `getRowCount()` |
| count sites | `getRowCount()` |
| get site from row 1 | `getSiteFromRow(0)` |
| get all visible sites | `getAllVisibleSites()` |
| check if site exists | `siteExists('Main Office')` |
| **Assertions** | |
| verify page loaded | `assertPageLoaded()` |
| verify results contain "Office" | `assertSearchResultsContain('Office')` |
| verify no results | `assertNoResults()` |

### Table Columns

| Column | Sortable | Description |
|--------|----------|-------------|
| Name | ✓ | Site name (link to detail) |
| Account Manager | - | Assigned account manager |
| Address | ✓ | Site address |
| Postcode | ✓ | Postal code |
| Contact Name | - | Main contact name |
| Telephone | - | Phone number (link) |
| Email | - | Email address (link) |

### Tab Definitions

| Tab | Description |
|-----|-------------|
| Active | Sites with active status |
| Suspended | Sites with suspended status |
| All | All sites regardless of status |

### Advanced Filters

| Filter | Type | Description |
|--------|------|-------------|
| Tag(s) | multiselect | Filter by site tags |
| Area | multiselect | Filter by area |

### Combined Operations

```typescript
// Search and filter
await allSitesPage.searchWithOptions({
  query: 'Office',
  tags: ['VIP'],
});

// Filter by area
await allSitesPage.filterByArea('North');

// Switch tab and search
await allSitesPage.switchToTab('All');
await allSitesPage.search('Main Office');

// Paginate through results
await allSitesPage.setResultsPerPage(50);
await allSitesPage.goToPage(2);

// Get site data
const sites = await allSitesPage.getAllVisibleSites();
console.log(sites[0].name); // First site's name
```

### Typical Flow

```typescript
// Full site search flow
await allSitesPage.navigateToAllSites();
await allSitesPage.assertPageLoaded();

// Filter and search
await allSitesPage.switchToTab('Active');
await allSitesPage.search('Main Office');
await allSitesPage.assertSearchResultsContain('Main Office');

// Open site details
await allSitesPage.clickSiteByName('Main Office');
// Now on Site Detail page
```

---

## Asset Page (Add/Edit)

### Page URL
- Add Asset: `/Asset/Create`
- Asset Detail: `/Asset/Detail/{id}`

### Target Class
```typescript
import { AssetPage, AssetData } from './pages/Assets/AssetPage';

const assetPage = new AssetPage(page);
```

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (fill, select, enter, etc.)

### Page Structure

| Section | Fields |
|---------|--------|
| Selection (required) | Customer*, Site* |
| Asset Details | Equipment Class, Equipment Library, Trades, Service Type, Description*, Make, Model, Quantity* |
| Additional Information | Comments, Does this asset contain refrigerant? |
| Site Asset Details | Number, Location, Serial Number, QR Code, Reference Number, Installation Date, Asset Quantity*, Labour Warranty Expiry, Asset Warranty Expiry, Quoted Replacement Date, Budget Replacement Cost, Asset Condition |
| Actions | Cancel, Save |

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
| Comments | textbox | - | Additional Information |
| Contains Refrigerant | checkbox | - | Additional Information |
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

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to add asset | `navigateToAddAsset()` |
| navigate to add asset page | `navigateToAddAsset()` |
| open create asset form | `navigateToAddAsset()` |
| go to asset 12345 | `navigateToAsset(12345)` |
| open asset detail 12345 | `navigateToAsset('12345')` |
| **Selection (Required)** | |
| select customer "ABC Corp" | `selectCustomer('ABC Corp')` |
| choose customer "ABC Corp" | `selectCustomer('ABC Corp')` |
| select site "Main Office" | `selectSite('Main Office')` |
| choose site "Branch 1" | `selectSite('Branch 1')` |
| **Asset Details** | |
| select equipment class "HVAC" | `selectEquipmentClass('HVAC')` |
| choose equipment class "Electrical" | `selectEquipmentClass('Electrical')` |
| select equipment library "AC Units" | `selectEquipmentLibrary('AC Units')` |
| select trades "Plumbing" | `selectTrades('Plumbing')` |
| select service type "Maintenance" | `selectServiceType('Maintenance')` |
| fill description "Air Conditioner" | `fillDescription('Air Conditioner')` |
| enter description "Boiler Unit" | `fillDescription('Boiler Unit')` |
| fill make "Carrier" | `fillMake('Carrier')` |
| enter make "Daikin" | `fillMake('Daikin')` |
| fill model "AC-2000" | `fillModel('AC-2000')` |
| set quantity to 5 | `fillQuantity(5)` |
| fill quantity "3" | `fillQuantity(3)` |
| **Additional Information** | |
| fill comments "Needs regular servicing" | `fillComments('Needs regular servicing')` |
| check contains refrigerant | `setContainsRefrigerant(true)` |
| tick contains refrigerant | `setContainsRefrigerant(true)` |
| uncheck contains refrigerant | `setContainsRefrigerant(false)` |
| **Site Asset Details** | |
| fill number "AST-001" | `fillNumber('AST-001')` |
| enter asset number "AST-002" | `fillNumber('AST-002')` |
| fill location "Floor 2" | `fillLocation('Floor 2')` |
| enter location "Basement" | `fillLocation('Basement')` |
| fill serial number "SN123456" | `fillSerialNumber('SN123456')` |
| fill qr code "QR001" | `fillQrCode('QR001')` |
| create random qr code | `createRandomQrCode()` |
| generate qr code | `createRandomQrCode()` |
| fill reference number "REF001" | `fillReferenceNumber('REF001')` |
| fill installation date "01/01/2024" | `fillInstallationDate('01/01/2024')` |
| set installation date to "15/03/2024" | `fillInstallationDate('15/03/2024')` |
| fill asset quantity "2" | `fillAssetQuantity(2)` |
| fill labour warranty expiry "01/01/2026" | `fillLabourWarrantyExpiry('01/01/2026')` |
| fill asset warranty expiry "01/01/2027" | `fillAssetWarrantyExpiry('01/01/2027')` |
| fill quoted replacement date "01/01/2030" | `fillQuotedReplacementDate('01/01/2030')` |
| fill budget replacement cost "5000" | `fillBudgetReplacementCost(5000)` |
| select asset condition "Good" | `selectAssetCondition('Good')` |
| choose asset condition "Fair" | `selectAssetCondition('Fair')` |
| **Actions** | |
| click save | `save()` |
| save asset | `save()` |
| click cancel | `cancel()` |
| cancel | `cancel()` |
| **Bulk Operations** | |
| fill asset form | `fillAssetForm(data)` |
| create asset | `createAsset('Customer', 'Site', 'Description')` |
| create asset with data | `createAssetWithData(data)` |
| **High-Level Creation** | |
| create new asset | `createNewAsset(data)` |
| add new asset | `createNewAsset(data)` |
| create a asset | `createNewAsset(data)` |
| add a asset | `createNewAsset(data)` |
| create asset | `createNewAsset(data)` |
| add asset | `createNewAsset(data)` |
| fill asset form only | `fillNewAssetForm(data)` |
| fill new asset form | `fillNewAssetForm(data)` |

### Example Usage

```typescript
// Create asset with full data
const assetData: AssetData = {
  customerName: 'ABC Corporation',
  siteName: 'Main Office',
  equipmentClass: 'HVAC',
  description: 'Split System Air Conditioner',
  make: 'Daikin',
  model: 'FTXM50',
  quantity: 1,
  comments: 'Installed in server room',
  number: 'AST-001',
  location: 'Floor 2, Room 201',
  serialNumber: 'SN123456789',
  installationDate: '15/03/2024',
  assetCondition: 'Good',
};

await assetPage.fillAssetForm(assetData);
await assetPage.save();
```

### Quick Create

```typescript
// Create asset with minimal data
const assetId = await assetPage.createAsset('ABC Corp', 'Main Office', 'Air Conditioner');

// Create with full data
const assetId = await assetPage.createAssetWithData({
  customerName: 'ABC Corp',
  siteName: 'Branch Office',
  description: 'Boiler Unit',
  make: 'Worcester',
  model: 'GB162',
});
```

### Data Builder Pattern (Recommended)

```typescript
import { AssetBuilder, generateAssetDescription, generateSerialNumber } from '../../data/testData/asset.data';

// Navigate first, then create
await assetPage.navigateToAddAsset();

// Simple asset with builder
const assetId = await assetPage.createNewAsset(
  AssetBuilder.create('ABC Corp', 'Main Office', 'Air Conditioner').build()
);

// Asset with more details using fluent API
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

// Generate unique values
const assetId = await assetPage.createNewAsset(
  AssetBuilder.create('ABC Corp', 'Main Office', generateAssetDescription('Test Asset'))
    .serialNumber(generateSerialNumber())
    .qrCode(generateQrCode())
    .referenceNumber(generateAssetRef())
    .build()
);
```

#### AssetBuilder Methods

| Method | Description |
|--------|-------------|
| `.create(customer, site, description)` | Create builder with required fields |
| `.equipmentClass(string)` | Set equipment class |
| `.equipmentLibrary(string)` | Set equipment library |
| `.trades(string)` | Set trades |
| `.serviceType(string)` | Set service type |
| `.make(string)` | Set make |
| `.model(string)` | Set model |
| `.quantity(number)` | Set quantity |
| `.comments(string)` | Set comments |
| `.containsRefrigerant(boolean?)` | Set contains refrigerant |
| `.number(string)` | Set asset number |
| `.location(string)` | Set location |
| `.serialNumber(string)` | Set serial number |
| `.qrCode(string)` | Set QR code |
| `.referenceNumber(string)` | Set reference number |
| `.installationDate(string)` | Set installation date |
| `.assetQuantity(number)` | Set asset quantity |
| `.labourWarrantyExpiry(string)` | Set labour warranty expiry |
| `.assetWarrantyExpiry(string)` | Set asset warranty expiry |
| `.quotedReplacementDate(string)` | Set quoted replacement date |
| `.budgetReplacementCost(number)` | Set budget replacement cost |
| `.assetCondition(string)` | Set asset condition |
| `.build()` | Build AssetData object |

---

## All Assets Page (List)

### Page URL
- All Assets: `/Asset`

### Target Class
```typescript
import { AllAssetsPage, AssetSearchOptions } from './pages/Assets/AllAssetsPage';

const allAssetsPage = new AllAssetsPage(page);
```

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (search, click, select, etc.)

### Page Structure

| Section | Elements |
|---------|----------|
| Header Actions | List/Grid view toggle, Add Asset, Print, Export |
| Filter Section | Search input, Gas Type filter, Tags filter, Asset Conditions filter, Show/Hide Advanced, Reset Filter, Search button |
| Tabs | Active, Suspended, All, Hire Asset, Cross Asset |
| Table | Description, Customer Name, Site Name, Class, Location, Number, Serial No, System ID, QR Code, Asset Condition, Installation Date, Warranty Expiry Date, Labour Warranty Expiry Date, Refrigerant Type, GWP, Total Charge (kg), CO2 EQ, PPM Contract |
| Pagination | First, Previous, Page numbers, Next, Last, Results per page |
| Detail Sidebar | Asset summary panel, View Full Asset Details |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to all assets | `navigateToAllAssets()` |
| navigate to all assets page | `navigateToAllAssets()` |
| open assets list | `navigateToAllAssets()` |
| go to asset list | `navigateToAllAssets()` |
| **View Mode** | |
| switch to list view | `switchToListView()` |
| show list view | `switchToListView()` |
| switch to grid view | `switchToGridView()` |
| show grid view | `switchToGridView()` |
| **Search** | |
| search for "Air Conditioner" | `search('Air Conditioner')` |
| search assets "Boiler" | `search('Boiler')` |
| find asset "HVAC" | `search('HVAC')` |
| look up "SN123456" | `search('SN123456')` |
| search by serial number "SN001" | `search('SN001')` |
| clear search | `clearSearch()` |
| reset search | `clearSearch()` |
| **Filter - Gas Type** | |
| filter by gas type "R410A" | `filterByGasType(['R410A'])` |
| filter gas type "R32" and "R410A" | `filterByGasType(['R32', 'R410A'])` |
| **Filter - Tags** | |
| filter by tag "Critical" | `filterByTags(['Critical'])` |
| filter tags "VIP" and "Priority" | `filterByTags(['VIP', 'Priority'])` |
| **Filter - Asset Conditions** | |
| filter by condition "Good" | `filterByAssetConditions(['Good'])` |
| filter conditions "Good" and "Fair" | `filterByAssetConditions(['Good', 'Fair'])` |
| **Filter - General** | |
| show advanced filters | `showAdvancedFilters()` |
| expand advanced filters | `showAdvancedFilters()` |
| hide advanced filters | `hideAdvancedFilters()` |
| collapse advanced filters | `hideAdvancedFilters()` |
| reset filters | `resetFilter()` |
| clear all filters | `resetFilter()` |
| toggle filter section | `toggleFilterSection()` |
| **Tabs** | |
| switch to active tab | `switchToTab('Active')` |
| click active tab | `switchToTab('Active')` |
| view active assets | `switchToTab('Active')` |
| switch to suspended tab | `switchToTab('Suspended')` |
| click suspended tab | `switchToTab('Suspended')` |
| view suspended assets | `switchToTab('Suspended')` |
| switch to all tab | `switchToTab('All')` |
| click all tab | `switchToTab('All')` |
| show all assets | `switchToTab('All')` |
| switch to hire asset tab | `switchToTab('Hire Asset')` |
| click hire asset tab | `switchToTab('Hire Asset')` |
| view hire assets | `switchToTab('Hire Asset')` |
| switch to cross asset tab | `switchToTab('Cross Asset')` |
| click cross asset tab | `switchToTab('Cross Asset')` |
| view cross assets | `switchToTab('Cross Asset')` |
| **Table - Click Rows** | |
| click on asset "Air Conditioner" | `clickAssetByDescription('Air Conditioner')` |
| select asset "Boiler Unit" | `clickAssetByDescription('Boiler Unit')` |
| open asset "HVAC System" | `clickAssetByDescription('HVAC System')` |
| click asset by customer "ABC Corp" | `clickAssetByCustomerName('ABC Corp')` |
| select asset for customer "XYZ Ltd" | `clickAssetByCustomerName('XYZ Ltd')` |
| click asset by site "Main Office" | `clickAssetBySiteName('Main Office')` |
| select asset at site "Branch 1" | `clickAssetBySiteName('Branch 1')` |
| click asset by number "AST-001" | `clickAssetByNumber('AST-001')` |
| select asset number "3623" | `clickAssetByNumber('3623')` |
| click asset by serial number "SN123" | `clickAssetBySerialNumber('SN123')` |
| find asset with serial "SN456" | `clickAssetBySerialNumber('SN456')` |
| click first row | `clickRowByIndex(0)` |
| click row 3 | `clickRowByIndex(2)` |
| select first asset | `clickRowByIndex(0)` |
| **Table - Sorting** | |
| sort by description | `sortByColumn('Description')` |
| click description column | `sortByColumn('Description')` |
| sort by customer name | `sortByColumn('Customer Name')` |
| sort by site name | `sortByColumn('Site Name')` |
| sort by class | `sortByColumn('Class')` |
| sort by location | `sortByColumn('Location')` |
| sort by serial no | `sortByColumn('Serial No')` |
| sort by installation date | `sortByColumn('Installation Date')` |
| **Pagination** | |
| go to first page | `goToFirstPage()` |
| go to previous page | `goToPreviousPage()` |
| go to next page | `goToNextPage()` |
| go to last page | `goToLastPage()` |
| go to page 5 | `goToPage(5)` |
| navigate to page 3 | `goToPage(3)` |
| show 20 results per page | `setResultsPerPage(20)` |
| set 50 results per page | `setResultsPerPage(50)` |
| **Header Actions** | |
| click add asset | `clickAddAsset()` |
| press add asset button | `clickAddAsset()` |
| click print | `clickPrint()` |
| print assets | `clickPrint()` |
| click export | `clickExport()` |
| export assets | `clickExport()` |
| **Detail Sidebar** | |
| view full asset details | `viewFullAssetDetails()` |
| click view full details | `viewFullAssetDetails()` |
| open asset details | `viewFullAssetDetails()` |
| **Data Retrieval** | |
| get row count | `getRowCount()` |
| count assets | `getRowCount()` |
| get asset from row 1 | `getAssetFromRow(0)` |
| get all visible assets | `getAllVisibleAssets()` |
| check if asset exists | `assetExists('Air Conditioner')` |
| **Assertions** | |
| verify page loaded | `assertPageLoaded()` |
| verify results contain "Boiler" | `assertSearchResultsContain('Boiler')` |
| verify no results | `assertNoResults()` |

### Table Columns

| Column | Sortable | Description |
|--------|----------|-------------|
| Description | ✓ | Asset description (link to detail) |
| Customer Name | ✓ | Customer name (link) |
| Site Name | ✓ | Site name (link) |
| Class | ✓ | Equipment class |
| Location | ✓ | Asset location |
| Number | - | Asset number |
| Serial No | ✓ | Serial number |
| System ID | ✓ | System identifier |
| QR Code | - | QR code value |
| Asset Condition | - | Current condition |
| Installation Date | ✓ | Date installed |
| Warranty Expiry Date | ✓ | Warranty expiry |
| Labour Warranty Expiry Date | ✓ | Labour warranty expiry |
| Refrigerant Type | - | Type of refrigerant |
| GWP | - | Global Warming Potential |
| Total Charge (kg) | ✓ | Total refrigerant charge |
| CO2 EQ | - | CO2 equivalent |
| PPM Contract | - | PPM contract details |

### Tab Definitions

| Tab | Description |
|-----|-------------|
| Active | Assets with active status |
| Suspended | Assets with suspended status |
| All | All assets regardless of status |
| Hire Asset | Hired/rented assets |
| Cross Asset | Cross-referenced assets |

### Advanced Filters

| Filter | Type | Description |
|--------|------|-------------|
| Gas Type | multiselect | Filter by refrigerant gas type |
| Tag(s) | multiselect | Filter by asset tags |
| Asset Condition(s) | multiselect | Filter by asset condition |

### Combined Operations

```typescript
// Search and filter
await allAssetsPage.searchWithOptions({
  query: 'Air Conditioner',
  gasType: ['R410A'],
  assetConditions: ['Good'],
});

// Switch view and tab
await allAssetsPage.switchToGridView();
await allAssetsPage.switchToTab('Active');

// Paginate through results
await allAssetsPage.setResultsPerPage(50);
await allAssetsPage.goToPage(2);

// Get asset data
const assets = await allAssetsPage.getAllVisibleAssets();
console.log(assets[0].description); // First asset's description
```

### Typical Flow

```typescript
// Full asset search flow
await allAssetsPage.navigateToAllAssets();
await allAssetsPage.assertPageLoaded();

// Filter and search
await allAssetsPage.switchToTab('Active');
await allAssetsPage.search('Air Conditioner');
await allAssetsPage.assertSearchResultsContain('Air Conditioner');

// Open asset details
await allAssetsPage.clickAssetByDescription('Air Conditioner');
// Now on Asset Detail page
```

---

## Asset Details Page

### Page URL
- Asset Detail: `/Asset/Detail/{id}`

### Target Class
```typescript
import { AssetDetailsPage, AssetDetailData } from './pages/Assets/AssetDetailsPage';

const assetDetailsPage = new AssetDetailsPage(page);
```

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (fill, select, enter, etc.)

### Page Structure

| Section | Elements |
|---------|----------|
| Header | Breadcrumb (Assets / {description}), Log Job button, More Actions |
| Tabs | Details, Quotes, Jobs, Refcom Log Book, Notes, Related Assets, Forms Logbook, Asset & Task Compliance, History |
| Asset Summary | Customer link, Site link, Edit button |
| Asset Details | Tag(s), Equipment Class, Equipment Library, Trades, Service Type, Description*, Make, Model, Quantity* |
| Additional Information | Comments, Contains Refrigerant checkbox |
| Site Asset Details | Number, Location, Serial Number, QR Code, Reference Number, Installation Date, Asset Quantity*, Labour Warranty Expiry, Asset Warranty Expiry, Quoted Replacement Date, Last Service Date, Budget Replacement Cost, Asset Condition, Asset Status |
| Thumbnails | Asset Thumbnail, Equipment Thumbnail |
| Actions | Undo, Save, Summarise |

### Form Fields

| Field | Type | Required | Section |
|-------|------|----------|----------|
| Tag(s) | multiselect | - | Asset Details |
| Equipment Class | combobox | - | Asset Details |
| Equipment Library | combobox | - | Asset Details |
| Trades | combobox | - | Asset Details |
| Service Type | combobox | - | Asset Details |
| Description | textbox | ✓ | Asset Details |
| Make | textbox | - | Asset Details |
| Model | textbox | - | Asset Details |
| Quantity | spinbutton | ✓ | Asset Details |
| Comments | textbox | - | Additional Information |
| Contains Refrigerant | checkbox | - | Additional Information |
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
| Last Service Date | date | - | Site Asset Details |
| Budget Replacement Cost | spinbutton | - | Site Asset Details |
| Asset Condition | combobox | - | Site Asset Details |
| Asset Status | radio | - | Site Asset Details |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to asset 12345 | `navigateToAsset(12345)` |
| open asset detail 12345 | `navigateToAsset('12345')` |
| go back to assets | `goBackToAssets()` |
| go to customer | `goToCustomer()` |
| navigate to customer | `goToCustomer()` |
| go to site | `goToSite()` |
| navigate to site | `goToSite()` |
| **Tabs** | |
| switch to details tab | `switchToTab('Details')` |
| click details tab | `switchToTab('Details')` |
| switch to quotes tab | `switchToTab('Quotes')` |
| click quotes tab | `switchToTab('Quotes')` |
| view quotes | `switchToTab('Quotes')` |
| switch to jobs tab | `switchToTab('Jobs')` |
| click jobs tab | `switchToTab('Jobs')` |
| view jobs | `switchToTab('Jobs')` |
| switch to refcom log book | `switchToTab('Refcom Log Book')` |
| click refcom log book tab | `switchToTab('Refcom Log Book')` |
| view refcom | `switchToTab('Refcom Log Book')` |
| switch to notes tab | `switchToTab('Notes')` |
| click notes tab | `switchToTab('Notes')` |
| view notes | `switchToTab('Notes')` |
| switch to related assets | `switchToTab('Related Assets')` |
| click related assets tab | `switchToTab('Related Assets')` |
| view related assets | `switchToTab('Related Assets')` |
| switch to forms logbook | `switchToTab('Forms Logbook')` |
| click forms logbook tab | `switchToTab('Forms Logbook')` |
| switch to asset compliance | `switchToTab('Asset & Task Compliance')` |
| click asset compliance tab | `switchToTab('Asset & Task Compliance')` |
| view compliance | `switchToTab('Asset & Task Compliance')` |
| switch to history tab | `switchToTab('History')` |
| click history tab | `switchToTab('History')` |
| view history | `switchToTab('History')` |
| **Header Actions** | |
| click log job | `clickLogJob()` |
| log job for this asset | `clickLogJob()` |
| create job | `clickLogJob()` |
| **Edit Mode** | |
| click edit | `enableEditMode()` |
| enable edit | `enableEditMode()` |
| start editing | `enableEditMode()` |
| **Asset Details** | |
| select equipment class "HVAC" | `selectEquipmentClass('HVAC')` |
| choose equipment class "Electrical" | `selectEquipmentClass('Electrical')` |
| select equipment library "AC Units" | `selectEquipmentLibrary('AC Units')` |
| select trades "Plumbing" | `selectTrades('Plumbing')` |
| select service type "Maintenance" | `selectServiceType('Maintenance')` |
| fill description "Air Conditioner" | `fillDescription('Air Conditioner')` |
| enter description "Boiler Unit" | `fillDescription('Boiler Unit')` |
| fill make "Carrier" | `fillMake('Carrier')` |
| fill model "AC-2000" | `fillModel('AC-2000')` |
| set quantity to 5 | `fillQuantity(5)` |
| **Additional Information** | |
| fill comments "Needs servicing" | `fillComments('Needs servicing')` |
| check contains refrigerant | `setContainsRefrigerant(true)` |
| uncheck contains refrigerant | `setContainsRefrigerant(false)` |
| **Site Asset Details** | |
| fill number "AST-001" | `fillNumber('AST-001')` |
| fill location "Floor 2" | `fillLocation('Floor 2')` |
| fill serial number "SN123456" | `fillSerialNumber('SN123456')` |
| fill qr code "QR001" | `fillQrCode('QR001')` |
| create random qr code | `createRandomQrCode()` |
| generate qr code | `createRandomQrCode()` |
| fill reference number "REF001" | `fillReferenceNumber('REF001')` |
| fill installation date "01/01/2024" | `fillInstallationDate('01/01/2024')` |
| fill asset quantity "2" | `fillAssetQuantity(2)` |
| fill labour warranty expiry "01/01/2026" | `fillLabourWarrantyExpiry('01/01/2026')` |
| fill asset warranty expiry "01/01/2027" | `fillAssetWarrantyExpiry('01/01/2027')` |
| fill quoted replacement date "01/01/2030" | `fillQuotedReplacementDate('01/01/2030')` |
| fill last service date "15/03/2024" | `fillLastServiceDate('15/03/2024')` |
| fill budget replacement cost "5000" | `fillBudgetReplacementCost(5000)` |
| select asset condition "Good" | `selectAssetCondition('Good')` |
| set status to active | `setAssetStatus('Active')` |
| set status to suspended | `setAssetStatus('Suspended')` |
| activate asset | `setAssetStatus('Active')` |
| suspend asset | `setAssetStatus('Suspended')` |
| **Actions** | |
| click save | `save()` |
| save changes | `save()` |
| click undo | `undo()` |
| undo changes | `undo()` |
| click summarise | `clickSummarise()` |
| **Bulk Operations** | |
| fill asset details | `fillAssetDetails(data)` |
| update asset info | `fillAssetDetails(data)` |
| **Data Retrieval** | |
| get customer name | `getCustomerName()` |
| get site name | `getSiteName()` |
| get description | `getDescription()` |
| get asset number | `getNumber()` |
| get serial number | `getSerialNumber()` |
| get location | `getLocation()` |
| get asset summary | `getAssetSummary()` |
| **Assertions** | |
| verify page loaded | `assertPageLoaded()` |
| verify description is "AC Unit" | `assertDescription('AC Unit')` |
| verify customer is "ABC Corp" | `assertCustomerName('ABC Corp')` |
| verify site is "Main Office" | `assertSiteName('Main Office')` |
| verify number is "AST-001" | `assertNumber('AST-001')` |
| verify asset is active | `assertIsActive()` |
| verify asset is suspended | `assertIsSuspended()` |

### Tab Definitions

| Tab | Description |
|-----|-------------|
| Details | Main asset details (default tab) |
| Quotes | Quotes related to this asset |
| Jobs | Jobs history for this asset |
| Refcom Log Book | Refrigerant log book entries |
| Notes | Notes attached to this asset |
| Related Assets | Assets related to this one |
| Forms Logbook | Digital forms and logbook entries |
| Asset & Task Compliance | Compliance status and tasks |
| History | Audit history of changes |

### Example Usage

```typescript
// Navigate and view asset
const assetDetailsPage = new AssetDetailsPage(page);
await assetDetailsPage.navigateToAsset(12345);
await assetDetailsPage.assertPageLoaded();

// Get asset info
const summary = await assetDetailsPage.getAssetSummary();
console.log(`Asset: ${summary.description} at ${summary.siteName}`);

// Edit asset
await assetDetailsPage.enableEditMode();
await assetDetailsPage.fillDescription('Updated Air Conditioner');
await assetDetailsPage.fillMake('Daikin');
await assetDetailsPage.fillModel('FTXM50');
await assetDetailsPage.selectAssetCondition('Good');
await assetDetailsPage.save();
```

### Update Asset with Data Object

```typescript
// Update with full data
await assetDetailsPage.enableEditMode();
await assetDetailsPage.fillAssetDetails({
  description: 'Split System Air Conditioner',
  make: 'Carrier',
  model: 'AC-3000',
  quantity: 2,
  comments: 'Recently serviced',
  location: 'Floor 3, Server Room',
  serialNumber: 'SN987654321',
  assetCondition: 'Good',
  assetStatus: 'Active',
});
await assetDetailsPage.save();
```

### Typical Flow: From List to Detail

```typescript
// Start from All Assets page
const allAssetsPage = new AllAssetsPage(page);
await allAssetsPage.navigateToAllAssets();
await allAssetsPage.switchToTab('Active');
await allAssetsPage.search('Air Conditioner');

// Click on asset by description, customer, site, or number
await allAssetsPage.clickAssetByDescription('Air Conditioner');
// OR
await allAssetsPage.clickAssetByCustomerName('ABC Corp');
// OR
await allAssetsPage.clickAssetBySiteName('Main Office');
// OR
await allAssetsPage.clickAssetByNumber('AST-001');

// Now on Asset Details page
const assetDetailsPage = new AssetDetailsPage(page);
await assetDetailsPage.assertPageLoaded();

// View related data
await assetDetailsPage.switchToTab('Jobs');
// View job history...

await assetDetailsPage.switchToTab('Notes');
// View notes...

// Go back to list
await assetDetailsPage.goBackToAssets();
```

---

## Assets & Tasks Compliance Page

### Page URL
- Compliance: `/AssetTaskCompliance`

### Target Class
```typescript
import { AssetsCompliancePage, ComplianceSearchOptions } from './pages/Assets/AssetsCompliancePage';

const compliancePage = new AssetsCompliancePage(page);
```

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (search, click, select, etc.)

### Page Structure

| Section | Elements |
|---------|----------|
| Header Actions | Print, Export |
| Filter Section | Search input, List By, Date Logged (Start/End), Preferred Appointment Date (Start/End), Job Category, Job Type, Show Mandatory, Reset Filter, Search button |
| Tabs | All, Open, Completed |
| Table | Compliance data rows |

### Form Fields (Filters)

| Field | Type | Description |
|-------|------|-------------|
| Search | textbox | Search by Customer/Site/Job Number/Assets Description/Task/Asset Number/Serial Number/Asset Reference Number |
| List By | combobox | Filter by Assets & Tasks, Assets Only, Tasks Only |
| Date Logged | date range | Start and End dates for Date Logged |
| Preferred Appointment Date | date range | Start and End dates for Preferred Appointment |
| Job Category | multiselect | Filter by job categories |
| Job Type | multiselect | Filter by job types |
| Show Mandatory | checkbox | Toggle to show only mandatory items |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to compliance | `navigateToCompliance()` |
| navigate to assets compliance | `navigateToCompliance()` |
| open assets & tasks compliance | `navigateToCompliance()` |
| **Search** | |
| search for "Job-001" | `search('Job-001')` |
| search compliance "Asset Description" | `search('Asset Description')` |
| find by job number "12345" | `search('12345')` |
| clear search | `clearSearch()` |
| **Filter - List By** | |
| select list by "Assets & Tasks" | `selectListBy('Assets & Tasks')` |
| choose list by "Assets Only" | `selectListBy('Assets Only')` |
| set list by to "Tasks Only" | `selectListBy('Tasks Only')` |
| **Filter - Date Logged** | |
| set date logged from "01/01/2024" to "31/12/2024" | `setDateLoggedRange('01/01/2024', '31/12/2024')` |
| filter by date logged "01/03/2024" - "31/03/2024" | `setDateLoggedRange('01/03/2024', '31/03/2024')` |
| **Filter - Preferred Date** | |
| set preferred date from "01/01/2024" to "31/12/2024" | `setPreferredDateRange('01/01/2024', '31/12/2024')` |
| filter by preferred appointment date | `setPreferredDateRange(start, end)` |
| **Filter - Job Category** | |
| filter by job category "Maintenance" | `filterByJobCategory(['Maintenance'])` |
| select job categories "Repair", "Service" | `filterByJobCategory(['Repair', 'Service'])` |
| **Filter - Job Type** | |
| filter by job type "Reactive" | `filterByJobType(['Reactive'])` |
| select job types "PPM", "Emergency" | `filterByJobType(['PPM', 'Emergency'])` |
| **Filter - Mandatory** | |
| check show mandatory | `setShowMandatory(true)` |
| show only mandatory items | `setShowMandatory(true)` |
| uncheck show mandatory | `setShowMandatory(false)` |
| show all items | `setShowMandatory(false)` |
| **Filter - General** | |
| reset filters | `resetFilter()` |
| clear all filters | `resetFilter()` |
| toggle filter section | `toggleFilterSection()` |
| apply filters | `applyFilters()` |
| search with filters | `applyFilters()` |
| **Tabs** | |
| switch to all tab | `switchToTab('All')` |
| click all tab | `switchToTab('All')` |
| view all compliance | `switchToTab('All')` |
| switch to open tab | `switchToTab('Open')` |
| click open tab | `switchToTab('Open')` |
| view open items | `switchToTab('Open')` |
| switch to completed tab | `switchToTab('Completed')` |
| click completed tab | `switchToTab('Completed')` |
| view completed items | `switchToTab('Completed')` |
| **Table Actions** | |
| click first row | `clickRowByIndex(0)` |
| click row 3 | `clickRowByIndex(2)` |
| get row count | `getRowCount()` |
| get all visible items | `getAllVisibleItems()` |
| **Header Actions** | |
| click print | `clickPrint()` |
| print compliance | `clickPrint()` |
| click export | `clickExport()` |
| export compliance | `clickExport()` |
| **Assertions** | |
| verify page loaded | `assertPageLoaded()` |
| verify no results | `assertNoResults()` |

### Tab Definitions

| Tab | Description |
|-----|-------------|
| All | All compliance items |
| Open | Open/pending compliance items |
| Completed | Completed compliance items |

### Combined Operations

```typescript
// Search with multiple filters
await compliancePage.searchWithOptions({
  query: 'Air Conditioner',
  listBy: 'Assets & Tasks',
  dateLoggedStart: '01/01/2024',
  dateLoggedEnd: '31/12/2024',
  jobCategory: ['Maintenance'],
  showMandatory: true,
});

// Switch tab and search
await compliancePage.switchToTab('Open');
await compliancePage.search('Job-001');

// Get compliance data
const items = await compliancePage.getAllVisibleItems();
console.log(items.length); // Number of compliance items
```

### Typical Flow

```typescript
// Full compliance review flow
await compliancePage.navigateToCompliance();
await compliancePage.assertPageLoaded();

// Set date range and search
await compliancePage.setDateLoggedRange('01/01/2024', '31/03/2024');
await compliancePage.switchToTab('Open');
await compliancePage.applyFilters();

// Review items
const openItems = await compliancePage.getAllVisibleItems();
console.log(`Found ${openItems.length} open items`);
```

---

## Log Job Page (Create)

### Page URL
- Log Job: `/Job/Create`

### Target Class
```typescript
import { JobPage, JobData, JobSection } from './pages/Jobs/JobPage';

const jobPage = new JobPage(page);
```

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (search, click, select, etc.)

### Page Structure

| Section | Elements |
|---------|----------|
| Header | Log Job title, Save button, Cancel button |
| Section Navigation | Customer & Site, Job Details, Job KPIs, Job Allocation, Recur Job, Contacts, Recent Jobs/Quotes |
| Customer & Site | Customer* combobox, Site* combobox, Log Job from Recent Job checkbox, Log Job from Template checkbox |
| Job Details | Job Type* combobox, Job Category combobox, Description* textbox, Tags multiselect, Primary Job Trade combobox, Secondary Job Trades multiselect, Customer Order Number input, Reference Number input, Job Owner* combobox, Date Logged* datetime, Req. Approval checkbox |
| Job KPIs | Priority Level combobox, Completion Time from Date Logged checkbox, Completion Time from Engineer Onsite checkbox |
| Job Allocation | Preferred Appointment Date datetime, Engineer/Engineer Team tabs, Engineer combobox, Start Date datetime, End Date datetime, Appointment checkbox, Lock Visit Date & Time checkbox, Deploy to Mobile checkbox |
| Recur Job | Recur Job checkbox |
| Contacts | Search Contacts input, Add Contact button, Contacts table, Selected contacts counter, Show Selected Contacts Only |
| Recent Jobs/Quotes | Logged Within dropdown, Jobs/Quotes tabs, Recent jobs table |

### Form Fields

| Field | Required | Type | Locator Key |
|-------|----------|------|-------------|
| Customer | Yes | Combobox | customerCombobox |
| Site | Yes | Combobox | siteCombobox |
| Job Type | Yes | Combobox | jobTypeCombobox |
| Description | Yes | Textbox | descriptionTextbox |
| Job Owner | Yes | Combobox | jobOwnerCombobox |
| Date Logged | Yes | Datetime | dateLoggedInput |
| Job Category | No | Combobox | jobCategoryCombobox |
| Primary Job Trade | No | Combobox | primaryJobTradeCombobox |
| Customer Order Number | No | Textbox | customerOrderNumberInput |
| Reference Number | No | Textbox | referenceNumberInput |
| Priority Level | No | Combobox | priorityLevelCombobox |
| Engineer | No | Combobox | engineerCombobox |

### Intent → Method Mapping

#### Navigation
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| go to log job page | `navigateToLogJob()` | - | Navigate to Log Job page |
| verify page loaded | `assertPageLoaded()` | - | Assert Log Job page is loaded |
| navigate to section "Job Details" | `navigateToSection(section)` | `section: JobSection` | Scroll to specific section |

#### Customer & Site Section
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| select customer "ABC Corp" | `selectCustomer(customerName)` | `customerName: string` | Search and select customer by name |
| clear customer | `clearCustomer()` | - | Clear selected customer |
| get selected customer | `getSelectedCustomer()` | - | Get selected customer name (returns string) |
| select site "Main Office" | `selectSite(siteName)` | `siteName: string` | Search and select site by name |
| clear site | `clearSite()` | - | Clear selected site |
| enable log from recent job | `setLogFromRecentJob(enable)` | `enable: boolean` | Toggle Log Job from Recent Job |
| enable log from template | `setLogFromTemplate(enable)` | `enable: boolean` | Toggle Log Job from Template |

#### Job Details Section
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| select job type "Maintenance" | `selectJobType(jobType)` | `jobType: string` | Select job type from dropdown |
| clear job type | `clearJobType()` | - | Clear selected job type |
| select job category "HVAC" | `selectJobCategory(category)` | `category: string` | Select job category |
| fill description "Repair AC unit" | `fillDescription(description)` | `description: string` | Fill description field |
| get description | `getDescription()` | - | Get description value (returns string) |
| select primary job trade "Electrical" | `selectPrimaryJobTrade(trade)` | `trade: string` | Select primary job trade |
| fill customer order number "PO-123" | `fillCustomerOrderNumber(orderNumber)` | `orderNumber: string` | Fill customer order number |
| fill reference number "REF-456" | `fillReferenceNumber(referenceNumber)` | `referenceNumber: string` | Fill reference number |
| select job owner "John Smith" | `selectJobOwner(jobOwner)` | `jobOwner: string` | Select job owner |
| get selected job owner | `getSelectedJobOwner()` | - | Get selected job owner (returns string) |
| set date logged "23/03/2026 09:00 AM" | `setDateLogged(dateTime)` | `dateTime: string` | Set date logged |
| toggle req approval | `toggleReqApproval()` | - | Toggle Req. Approval checkbox |

#### Job KPIs Section
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| select priority level "High" | `selectPriorityLevel(priority)` | `priority: string` | Select priority level |
| select completion time from "Date Logged" | `selectCompletionTimeFrom(source)` | `source: 'Date Logged' \| 'Engineer Onsite'` | Select completion time source |

#### Job Allocation Section
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| set preferred appointment date "25/03/2026 10:00 AM" | `setPreferredAppointmentDate(dateTime)` | `dateTime: string` | Set preferred appointment date |
| select engineer tab | `selectEngineerTab()` | - | Switch to Engineer tab |
| select engineer team tab | `selectEngineerTeamTab()` | - | Switch to Engineer Team tab |
| select engineer "Mike Wilson" | `selectEngineer(engineer)` | `engineer: string` | Select engineer |
| set start date "25/03/2026 09:00 AM" | `setStartDate(dateTime)` | `dateTime: string` | Set visit start date |
| set end date "25/03/2026 11:00 AM" | `setEndDate(dateTime)` | `dateTime: string` | Set visit end date |
| toggle appointment | `toggleAppointment()` | - | Toggle Appointment checkbox |
| toggle lock visit date time | `toggleLockVisitDateTime()` | - | Toggle Lock Visit Date & Time checkbox |
| toggle deploy to mobile | `toggleDeployToMobile()` | - | Toggle Deploy to Mobile checkbox |

#### Recur Job Section
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| enable recur job | `setRecurJob(enable)` | `enable: boolean` | Toggle Recur Job checkbox |

#### Contacts Section
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| search contact "John" | `searchContact(contactName)` | `contactName: string` | Search for contact |
| click add contact | `clickAddContact()` | - | Click Add Contact button |
| select contact "John Doe" | `selectContactByName(contactName)` | `contactName: string` | Select contact by name in table |
| select first contact | `selectFirstContact()` | - | Select first contact in table |
| get selected contacts count | `getSelectedContactsCount()` | - | Get number of selected contacts (returns number) |
| toggle show selected contacts only | `toggleShowSelectedContactsOnly()` | - | Filter to show selected contacts |

#### Recent Jobs/Quotes Section
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| switch to jobs tab | `switchToJobsTab()` | - | Switch to Jobs tab |
| switch to quotes tab | `switchToQuotesTab()` | - | Switch to Quotes tab |
| click recent job "M0000264" | `clickRecentJob(jobNumber)` | `jobNumber: string` | Click on recent job |
| get recent jobs count | `getRecentJobsCount()` | - | Get count of recent jobs (returns number) |

#### Form Actions
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| click cancel | `clickCancel()` | - | Click Cancel button |
| click save | `clickSave()` | - | Click Save button |
| wait for job details page | `waitForJobDetailsNavigation()` | - | Wait for redirect to Job Details (returns job ID) |
| create job quickly | `createJobQuick(customerName, siteName, description)` | `customerName: string, siteName: string, description: string` | Fill minimal fields and save (returns job ID) |
| fill job form | `fillJobForm(data)` | `data: Partial<JobData>` | Fill all provided job data fields |

#### High-Level Creation
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| create new job | `createNewJob(data)` | `data: JobData` | Fill form and save job |
| add new job | `createNewJob(data)` | `data: JobData` | Fill form and save job |
| create a job | `createNewJob(data)` | `data: JobData` | Fill form and save job |
| add a job | `createNewJob(data)` | `data: JobData` | Fill form and save job |
| create job | `createNewJob(data)` | `data: JobData` | Fill form and save job |
| add job | `createNewJob(data)` | `data: JobData` | Fill form and save job |
| log new job | `createNewJob(data)` | `data: JobData` | Fill form and save job |
| log a job | `createNewJob(data)` | `data: JobData` | Fill form and save job |
| fill job form only | `fillNewJobForm(data)` | `data: JobData` | Fill form only (does not save) |
| fill new job form | `fillNewJobForm(data)` | `data: JobData` | Fill form only (does not save) |

### Sample Usage

```typescript
// Basic job creation with specific customer/site
await jobPage.selectCustomer('Sauer - ThielEino5zpbp');
await jobPage.selectSite('Main Office');
await jobPage.fillDescription('Repair HVAC system');
await jobPage.clickSave();
const jobId = await jobPage.waitForJobDetailsNavigation();
console.log(`Created job ID: ${jobId}`);
```

### Typical Flow

```typescript
// Full job creation flow
await jobPage.navigateToLogJob();
await jobPage.assertPageLoaded();

// Select customer and site
await jobPage.selectCustomer('ABC Corporation');
await jobPage.selectSite('Head Office');

// Fill job details
await jobPage.selectJobType('Maintenance');
await jobPage.fillDescription('Annual boiler service');
await jobPage.fillCustomerOrderNumber('PO-2026-001');
await jobPage.selectPriorityLevel('High');

// Set job allocation
await jobPage.selectEngineer('Mike Wilson');
await jobPage.setStartDate('25/03/2026 09:00 AM');
await jobPage.setEndDate('25/03/2026 11:00 AM');

// Select contact
await jobPage.selectContactByName('John Doe');

// Save and verify
await jobPage.clickSave();
const jobId = await jobPage.waitForJobDetailsNavigation();
console.log(`Job created with ID: ${jobId}`);
```

### Quick Job Creation

```typescript
// Use createJobQuick for minimal required fields
const jobId = await jobPage.createJobQuick(
  'ABC Corporation',
  'Main Office',
  'Emergency repair needed'
);
```

### Fill Form with Data Object

```typescript
// Use fillJobForm for comprehensive data
await jobPage.fillJobForm({
  customerName: 'ABC Corporation',
  siteName: 'Head Office',
  description: 'Quarterly maintenance check',
  jobType: 'Maintenance',
  priorityLevel: 'Medium',
  engineer: 'Mike Wilson',
  contactNames: ['John Doe', 'Jane Smith']
});
await jobPage.clickSave();
```

### Data Builder Pattern (Recommended)

```typescript
import { JobBuilder, generateDescription, generateRefNumber } from '../../data/testData/job.data';

// Navigate first, then create
await jobPage.navigateToLogJob();

// Simple job with builder
const jobId = await jobPage.createNewJob(
  JobBuilder.create('Customer A', 'Site A', 'Fix AC').build()
);

// Job with more details using fluent API
const jobId = await jobPage.createNewJob(
  JobBuilder.create('ABC Company', 'Main Office', 'Repair HVAC system')
    .jobType('Maintenance')
    .jobCategory('HVAC')
    .priorityLevel('Urgent')
    .engineer('John Doe')
    .deployToMobile()
    .build()
);

// Generate unique description and reference
const jobId = await jobPage.createNewJob(
  JobBuilder.create('Customer A', 'Site A', generateDescription('Test Job'))
    .referenceNumber(generateRefNumber())
    .customerOrderNumber('PO-2026-001')
    .build()
);
```

#### JobBuilder Methods

| Method | Description |
|--------|-------------|
| `.create(customer, site, description)` | Create builder with required fields |
| `.logFromRecentJob(boolean?)` | Enable log from recent job |
| `.logFromTemplate(boolean?)` | Enable log from template |
| `.jobType(string)` | Set job type |
| `.jobCategory(string)` | Set job category |
| `.tags(string[])` | Set tags |
| `.primaryJobTrade(string)` | Set primary job trade |
| `.secondaryJobTrades(string[])` | Set secondary job trades |
| `.customerOrderNumber(string)` | Set customer order number |
| `.referenceNumber(string)` | Set reference number |
| `.jobOwner(string)` | Set job owner |
| `.dateLogged(string)` | Set date logged |
| `.priorityLevel(string)` | Set priority level |
| `.completionTimeFromDateLogged(boolean?)` | Enable completion from date logged |
| `.preferredAppointmentDate(string)` | Set preferred appointment date |
| `.engineer(string)` | Set engineer |
| `.engineerTeam(string)` | Set engineer team |
| `.startDate(string)` | Set start date |
| `.endDate(string)` | Set end date |
| `.appointment(boolean?)` | Enable appointment |
| `.lockVisitDateTime(boolean?)` | Enable lock visit date/time |
| `.deployToMobile(boolean?)` | Enable deploy to mobile |
| `.recurJob(boolean?)` | Enable recurring job |
| `.contactNames(string[])` | Set contact names |
| `.build()` | Build JobData object |

---

## All Jobs Page (List)

### Page URL
- All Jobs: `/Job`

### Target Class
```typescript
import { AllJobsPage, JobSearchOptions } from './pages/Jobs/AllJobsPage';

const allJobsPage = new AllJobsPage(page);
```

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (search, click, select, etc.)

### Page Structure

| Section | Elements |
|---------|----------|
| Header Actions | Log Job, Print, Import, Export |
| Filter Section | Search input, Status dropdown, Date Logged (Start/End), Appointment Date (Start/End), Show Advanced, Reset Filter, Search button, Quick Filters |
| Tabs | All, Open, In Jeopardy, Requires Allocation, Completed Today, Requires Invoicing, Requires Revisit, Suspended, Requires Approval, Approved |
| Table | Job No., Customer Name, Site Name, Status, Visits, Priority, Remaining, Job Category, Customer Order Number, Date Logged, Date Completed, Job Type, Reference No., Contact, Description, Revisit Reason, Appointment Date, Postcode, Tags, Target Completion Date, Total Invoiced Value, Quoted Value, JobTrade, Customer Type, Job Owner, Sub Job Status |
| Pagination | First, Previous, Page numbers, Next, Last, Results per page |
| Detail Sidebar | Job details panel, View Full Job Details |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to all jobs | `navigateToAllJobs()` |
| navigate to all jobs page | `navigateToAllJobs()` |
| open jobs list | `navigateToAllJobs()` |
| go to job list | `navigateToAllJobs()` |
| **Search** | |
| search for "M0000264" | `search('M0000264')` |
| search jobs "Maintenance" | `search('Maintenance')` |
| find job "Description" | `search('Description')` |
| clear search | `clearSearch()` |
| reset search | `clearSearch()` |
| **Filter - Status** | |
| filter by status "Open" | `filterByStatus(['Open'])` |
| filter status "Completed" and "Invoiced" | `filterByStatus(['Completed', 'Invoiced'])` |
| **Filter - Date Logged** | |
| set date logged from "01/01/2024" to "31/12/2024" | `setDateLoggedRange('01/01/2024', '31/12/2024')` |
| filter by date logged "01/03/2024" - "31/03/2024" | `setDateLoggedRange('01/03/2024', '31/03/2024')` |
| **Filter - Appointment Date** | |
| set appointment date from "01/01/2024" to "31/12/2024" | `setAppointmentDateRange('01/01/2024', '31/12/2024')` |
| **Filter - General** | |
| show advanced filters | `showAdvancedFilters()` |
| expand advanced filters | `showAdvancedFilters()` |
| hide advanced filters | `hideAdvancedFilters()` |
| collapse advanced filters | `hideAdvancedFilters()` |
| reset filters | `resetFilter()` |
| clear all filters | `resetFilter()` |
| toggle filter section | `toggleFilterSection()` |
| apply filters | `applyFilters()` |
| search with filters | `applyFilters()` |
| **Tabs** | |
| switch to all tab | `switchToTab('All')` |
| click all tab | `switchToTab('All')` |
| view all jobs | `switchToTab('All')` |
| switch to open tab | `switchToTab('Open')` |
| click open tab | `switchToTab('Open')` |
| view open jobs | `switchToTab('Open')` |
| switch to in jeopardy tab | `switchToTab('In Jeopardy')` |
| click in jeopardy tab | `switchToTab('In Jeopardy')` |
| switch to requires allocation tab | `switchToTab('Requires Allocation')` |
| click requires allocation tab | `switchToTab('Requires Allocation')` |
| switch to completed today tab | `switchToTab('Completed Today')` |
| click completed today tab | `switchToTab('Completed Today')` |
| switch to requires invoicing tab | `switchToTab('Requires Invoicing')` |
| click requires invoicing tab | `switchToTab('Requires Invoicing')` |
| switch to requires revisit tab | `switchToTab('Requires Revisit')` |
| click requires revisit tab | `switchToTab('Requires Revisit')` |
| switch to suspended tab | `switchToTab('Suspended')` |
| click suspended tab | `switchToTab('Suspended')` |
| switch to requires approval tab | `switchToTab('Requires Approval')` |
| click requires approval tab | `switchToTab('Requires Approval')` |
| switch to approved tab | `switchToTab('Approved')` |
| click approved tab | `switchToTab('Approved')` |
| **Table - Click Jobs** | |
| click on job "M0000264" | `clickJobByJobNo('M0000264')` |
| select job "M0000263" | `clickJobByJobNo('M0000263')` |
| open job "M0000262" | `clickJobByJobNo('M0000262')` |
| click job by customer "ABC Corp" | `clickJobByCustomerName('ABC Corp')` |
| select job for customer "XYZ Ltd" | `clickJobByCustomerName('XYZ Ltd')` |
| click job by site "Main Office" | `clickJobBySiteName('Main Office')` |
| select job at site "Branch 1" | `clickJobBySiteName('Branch 1')` |
| click job by description "Maintenance" | `clickJobByDescription('Maintenance')` |
| click job by status "New Job" | `clickJobByStatus('New Job')` |
| click first row | `clickRowByIndex(0)` |
| click row 3 | `clickRowByIndex(2)` |
| select first job | `clickRowByIndex(0)` |
| **Table - Sorting** | |
| sort by job no | `sortByColumn('Job No.')` |
| click job no column | `sortByColumn('Job No.')` |
| sort by customer name | `sortByColumn('Customer Name')` |
| sort by site name | `sortByColumn('Site Name')` |
| sort by priority | `sortByColumn('Priority')` |
| sort by date logged | `sortByColumn('Date Logged')` |
| sort by date completed | `sortByColumn('Date Completed')` |
| sort by appointment date | `sortByColumn('Appointment Date')` |
| **Pagination** | |
| go to first page | `goToFirstPage()` |
| go to previous page | `goToPreviousPage()` |
| go to next page | `goToNextPage()` |
| go to last page | `goToLastPage()` |
| go to page 5 | `goToPage(5)` |
| navigate to page 3 | `goToPage(3)` |
| show 20 results per page | `setResultsPerPage(20)` |
| set 50 results per page | `setResultsPerPage(50)` |
| **Header Actions** | |
| click log job | `clickLogJob()` |
| press log job button | `clickLogJob()` |
| click print | `clickPrint()` |
| print jobs | `clickPrint()` |
| click export | `clickExport()` |
| export jobs | `clickExport()` |
| click import | `clickImport()` |
| import jobs | `clickImport()` |
| **Detail Sidebar** | |
| view full job details | `viewFullJobDetails()` |
| click view full details | `viewFullJobDetails()` |
| open job details | `viewFullJobDetails()` |
| **Data Retrieval** | |
| get row count | `getRowCount()` |
| count jobs | `getRowCount()` |
| get job from row 1 | `getJobFromRow(0)` |
| get all visible jobs | `getAllVisibleJobs()` |
| check if job exists | `jobExists('M0000264')` |
| **Assertions** | |
| verify page loaded | `assertPageLoaded()` |
| verify results contain "M0000264" | `assertSearchResultsContain('M0000264')` |
| verify no results | `assertNoResults()` |

### Tab Definitions

| Tab | Description |
|-----|-------------|
| All | All jobs regardless of status |
| Open | Jobs with open status |
| In Jeopardy | Jobs at risk of SLA breach |
| Requires Allocation | Jobs needing engineer assignment |
| Completed Today | Jobs completed today |
| Requires Invoicing | Jobs ready for invoicing |
| Requires Revisit | Jobs needing follow-up visit |
| Suspended | Suspended/on-hold jobs |
| Requires Approval | Jobs pending approval |
| Approved | Approved jobs |

### Example Usage

```typescript
// Navigate and filter jobs
const allJobsPage = new AllJobsPage(page);
await allJobsPage.navigateToAllJobs();
await allJobsPage.assertPageLoaded();

// Switch to Open tab and search
await allJobsPage.switchToTab('Open');
await allJobsPage.search('M0000264');

// Click on job by job number
await allJobsPage.clickJobByJobNo('M0000264');
// Now on Job Details page
```

### Typical Flow

```typescript
// Full job search flow
await allJobsPage.navigateToAllJobs();
await allJobsPage.assertPageLoaded();

// Filter and search
await allJobsPage.switchToTab('Open');
await allJobsPage.setDateLoggedRange('01/01/2024', '31/03/2024');
await allJobsPage.applyFilters();

// Open job details by job number, customer, site, or description
await allJobsPage.clickJobByJobNo('M0000264');
// OR
await allJobsPage.clickJobByCustomerName('ABC Corp');
// OR
await allJobsPage.clickJobBySiteName('Main Office');
// OR
await allJobsPage.clickJobByDescription('Maintenance task');
```

---

## Job Details Page

### Page URL
- Job Detail: `/Job/Detail/{id}`

### Target Class
```typescript
import { JobDetailsPage, JobSummaryInfo } from './pages/Jobs/JobDetailsPage';

const jobDetailsPage = new JobDetailsPage(page);
```

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (fill, select, enter, etc.)

### Page Structure

| Section | Elements |
|---------|----------|
| Header | Breadcrumb (Jobs / {jobNo} {status}), Add New Item, Log Related Work, Add Invoice, Share, More Actions |
| Tabs | Details, Contacts, Assets, Tasks, Costs, Visits, Subcontractor, SOR Items, History, Info, Refcom Audit, Job Forms |
| Job Summary | Customer link, Site link, Description, Tags, Logged By, Job Type, Job Category, Job Trade, Preferred Appt. Date, Customer Order Number, Reference Number, Job Owner, Date Logged, Date Completed, Next Contact Date |
| Primary Contact | Name, Telephone, Email |
| Actions | Complete Job, Delete Job (via three dots menu) |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to job 12345 | `navigateToJob(12345)` |
| open job detail 12345 | `navigateToJob('12345')` |
| go back to jobs | `goBackToJobs()` |
| go to customer | `goToCustomer()` |
| navigate to customer | `goToCustomer()` |
| go to site | `goToSite()` |
| navigate to site | `goToSite()` |
| **Tabs** | |
| switch to details tab | `switchToTab('Details')` |
| click details tab | `switchToTab('Details')` |
| switch to contacts tab | `switchToTab('Contacts')` |
| click contacts tab | `switchToTab('Contacts')` |
| view contacts | `switchToTab('Contacts')` |
| switch to assets tab | `switchToTab('Assets')` |
| click assets tab | `switchToTab('Assets')` |
| view assets | `switchToTab('Assets')` |
| switch to tasks tab | `switchToTab('Tasks')` |
| click tasks tab | `switchToTab('Tasks')` |
| view tasks | `switchToTab('Tasks')` |
| switch to costs tab | `switchToTab('Costs')` |
| click costs tab | `switchToTab('Costs')` |
| view costs | `switchToTab('Costs')` |
| switch to visits tab | `switchToTab('Visits')` |
| click visits tab | `switchToTab('Visits')` |
| view visits | `switchToTab('Visits')` |
| switch to subcontractor tab | `switchToTab('Subcontractor')` |
| click subcontractor tab | `switchToTab('Subcontractor')` |
| view subcontractor | `switchToTab('Subcontractor')` |
| switch to sor items tab | `switchToTab('SOR Items')` |
| click sor items tab | `switchToTab('SOR Items')` |
| view sor items | `switchToTab('SOR Items')` |
| switch to history tab | `switchToTab('History')` |
| click history tab | `switchToTab('History')` |
| view history | `switchToTab('History')` |
| switch to info tab | `switchToTab('Info')` |
| click info tab | `switchToTab('Info')` |
| view info | `switchToTab('Info')` |
| switch to refcom audit tab | `switchToTab('Refcom Audit')` |
| click refcom audit tab | `switchToTab('Refcom Audit')` |
| view refcom audit | `switchToTab('Refcom Audit')` |
| switch to job forms tab | `switchToTab('Job Forms')` |
| click job forms tab | `switchToTab('Job Forms')` |
| view job forms | `switchToTab('Job Forms')` |
| **Header Actions** | |
| click add new item | `clickAddNewItem()` |
| add new item | `clickAddNewItem()` |
| click log related work | `clickLogRelatedWork()` |
| log related work | `clickLogRelatedWork()` |
| click add invoice | `clickAddInvoice()` |
| add invoice | `clickAddInvoice()` |
| click share | `clickShare()` |
| share job | `clickShare()` |
| **Complete Job** | |
| click complete job | `clickCompleteJob()` |
| complete job | `completeJob()` |
| complete job with date "01/01/2024 10:00 AM" | `completeJob('01/01/2024 10:00 AM')` |
| fill date complete "01/01/2024 10:00 AM" | `fillDateComplete('01/01/2024 10:00 AM')` |
| click complete button | `clickComplete()` |
| **Delete Job** | |
| click three dots menu | `clickThreeDots()` |
| select delete job | `selectDeleteJob()` |
| click i agree | `clickIAgree()` |
| click delete button | `clickDelete()` |
| delete job | `deleteJob()` |
| **Data Retrieval** | |
| get job number | `getJobNo()` |
| get customer name | `getCustomerName()` |
| get site name | `getSiteName()` |
| get job status | `getJobStatus()` |
| get description | `getDescription()` |
| get job type | `getJobType()` |
| get job category | `getJobCategory()` |
| get date logged | `getDateLogged()` |
| get date completed | `getDateCompleted()` |
| get job summary | `getJobSummary()` |
| get success message | `getSuccessMessage()` |
| **Assertions** | |
| verify page loaded | `assertPageLoaded()` |
| verify job number is "M0000264" | `assertJobNo('M0000264')` |
| verify customer is "ABC Corp" | `assertCustomerName('ABC Corp')` |
| verify site is "Main Office" | `assertSiteName('Main Office')` |
| verify status is "Open" | `assertJobStatus('Open')` |
| verify job is completed | `assertIsCompleted()` |

### Tab Definitions

| Tab | Description |
|-----|-------------|
| Details | Main job details (default tab) |
| Contacts | Contacts associated with this job |
| Assets | Assets linked to this job |
| Tasks | Tasks/work items for this job |
| Costs | Cost breakdown (parts, labor, etc.) |
| Visits | Engineer visit records |
| Subcontractor | Subcontractor information |
| SOR Items | Schedule of Rates items |
| History | Audit history of changes |
| Info | Additional job information |
| Refcom Audit | Refrigerant compliance audit |
| Job Forms | Digital forms for this job |

### Example Usage

```typescript
// Navigate and view job
const jobDetailsPage = new JobDetailsPage(page);
await jobDetailsPage.navigateToJob(12345);
await jobDetailsPage.assertPageLoaded();

// Get job info
const summary = await jobDetailsPage.getJobSummary();
console.log(`Job: ${summary.jobNo} - ${summary.status}`);

// Complete job
await jobDetailsPage.completeJob('23/03/2024 10:00 AM');
await jobDetailsPage.assertIsCompleted();
```

### Complete Job Workflow

```typescript
// Step-by-step complete job
await jobDetailsPage.clickCompleteJob();
await jobDetailsPage.fillDateComplete('23/03/2024 10:00 AM');
await jobDetailsPage.clickComplete();
await jobDetailsPage.assertIsCompleted();
```

### Delete Job Workflow

```typescript
// Delete job
await jobDetailsPage.deleteJob(); // Full workflow
// OR step-by-step:
await jobDetailsPage.clickThreeDots();
await jobDetailsPage.selectDeleteJob();
await jobDetailsPage.clickIAgree();
await jobDetailsPage.clickDelete();
const message = await jobDetailsPage.getSuccessMessage();
```

### Typical Flow: From List to Detail

```typescript
// Start from All Jobs page
const allJobsPage = new AllJobsPage(page);
await allJobsPage.navigateToAllJobs();
await allJobsPage.switchToTab('Open');
await allJobsPage.search('M0000264');

// Click on job by job number
await allJobsPage.clickJobByJobNo('M0000264');

// Now on Job Details page
const jobDetailsPage = new JobDetailsPage(page);
await jobDetailsPage.assertPageLoaded();

// View related data
await jobDetailsPage.switchToTab('Tasks');
// View tasks...

await jobDetailsPage.switchToTab('Costs');
// View costs...

// Go back to list
await jobDetailsPage.goBackToJobs();
```

---

## Service Job Letters Page

### Page URL
- Service Job Letters: `/Job/ServiceLetterIndex`

### Target Class
```typescript
import { ServiceJobLettersPage, ServiceJobLetterSearchOptions } from './pages/Jobs/ServiceJobLettersPage';

const serviceJobLettersPage = new ServiceJobLettersPage(page);
```

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (search, click, select, etc.)

### Page Structure

| Section | Elements |
|---------|----------|
| Header Actions | Batch Print, Batch Email |
| Filter Section | Search input, Letter Stage, Scheduled Date (Start/End), Job Type(s), Compliance Status, Reset Filter, Search button |
| Table | Checkbox, Job No., Customer Name, Site Name, Service Description, Letter Stage, Scheduled Date, Job Type, Compliance Status |

### Form Fields (Filters)

| Field | Type | Description |
|-------|------|-------------|
| Search | textbox | Search by Customer / Site / Job Number / Service Description |
| Letter Stage | combobox | Filter by letter stage (All, Letter 1-4) |
| Scheduled Date | date range | Start and End dates for scheduled service |
| Job Type(s) | multiselect | Filter by job types |
| Compliance Status | combobox | Filter by compliance status |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to service job letters | `navigateToServiceJobLetters()` |
| navigate to service letters | `navigateToServiceJobLetters()` |
| open service job letters | `navigateToServiceJobLetters()` |
| **Search** | |
| search for "M0000264" | `search('M0000264')` |
| search service letters "Customer Name" | `search('Customer Name')` |
| clear search | `clearSearch()` |
| **Filter - Letter Stage** | |
| select letter stage "Letter 1" | `selectLetterStage('Letter 1')` |
| choose letter stage "All" | `selectLetterStage('All')` |
| **Filter - Scheduled Date** | |
| set scheduled date from "01/01/2024" to "31/12/2024" | `setScheduledDateRange('01/01/2024', '31/12/2024')` |
| **Filter - Job Types** | |
| filter by job type "Maintenance" | `filterByJobTypes(['Maintenance'])` |
| select job types "Service", "PPM" | `filterByJobTypes(['Service', 'PPM'])` |
| **Filter - Compliance Status** | |
| select compliance status "Compliant" | `selectComplianceStatus('Compliant')` |
| filter by "Non-Compliant" | `selectComplianceStatus('Non-Compliant')` |
| **Filter - General** | |
| reset filters | `resetFilter()` |
| clear all filters | `resetFilter()` |
| toggle filter section | `toggleFilterSection()` |
| apply filters | `applyFilters()` |
| **Table - Click Jobs** | |
| click on job "M0000264" | `clickJobByJobNo('M0000264')` |
| select job "M0000263" | `clickJobByJobNo('M0000263')` |
| click first row | `clickRowByIndex(0)` |
| click row 3 | `clickRowByIndex(2)` |
| **Table - Selection** | |
| select row 1 | `selectRow(0)` |
| select row 3 | `selectRow(2)` |
| unselect row 1 | `unselectRow(0)` |
| select all rows | `selectAllRows()` |
| unselect all rows | `unselectAllRows()` |
| **Batch Actions** | |
| click batch print | `clickBatchPrint()` |
| batch print | `clickBatchPrint()` |
| click batch email | `clickBatchEmail()` |
| batch email | `clickBatchEmail()` |
| check if batch print enabled | `isBatchPrintEnabled()` |
| check if batch email enabled | `isBatchEmailEnabled()` |
| **Data Retrieval** | |
| get row count | `getRowCount()` |
| get letter from row 1 | `getLetterFromRow(0)` |
| get all visible letters | `getAllVisibleLetters()` |
| **Assertions** | |
| verify page loaded | `assertPageLoaded()` |
| verify results contain "M0000264" | `assertSearchResultsContain('M0000264')` |
| verify no results | `assertNoResults()` |

### Letter Stage Options

| Stage | Description |
|-------|-------------|
| All | All letter stages |
| Letter 1 | First service letter |
| Letter 2 | Second service letter |
| Letter 3 | Third service letter |
| Letter 4 | Fourth service letter |

### Compliance Status Options

| Status | Description |
|--------|-------------|
| All | All compliance statuses |
| Compliant | Service is compliant |
| Non-Compliant | Service is non-compliant |
| Not Applicable | Compliance not applicable |

### Example Usage

```typescript
// Navigate and search
const serviceJobLettersPage = new ServiceJobLettersPage(page);
await serviceJobLettersPage.navigateToServiceJobLetters();
await serviceJobLettersPage.assertPageLoaded();

// Filter by letter stage and compliance
await serviceJobLettersPage.selectLetterStage('Letter 1');
await serviceJobLettersPage.selectComplianceStatus('Non-Compliant');
await serviceJobLettersPage.applyFilters();

// Select rows for batch action
await serviceJobLettersPage.selectRow(0);
await serviceJobLettersPage.selectRow(1);
await serviceJobLettersPage.clickBatchEmail();
```

### Typical Flow

```typescript
// Full service job letters flow
await serviceJobLettersPage.navigateToServiceJobLetters();
await serviceJobLettersPage.assertPageLoaded();

// Search and filter
await serviceJobLettersPage.searchWithOptions({
  query: 'Customer Name',
  letterStage: 'Letter 1',
  scheduledStartDate: '01/01/2024',
  scheduledEndDate: '31/12/2024',
  complianceStatus: 'Compliant',
});

// Get letter data
const letters = await serviceJobLettersPage.getAllVisibleLetters();
console.log(`Found ${letters.length} service job letters`);

// Click on job to view details
await serviceJobLettersPage.clickJobByJobNo('M0000264');
```

---

## Log Quote Page (Create)

### Page URL
- Log Quote: `/Quote/Create`

### Target Class
```typescript
import { QuotePage, QuoteData } from './pages/Quotes/QuotePage';

const quotePage = new QuotePage(page);
```

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (search, click, select, etc.)

### Page Structure

| Section | Elements |
|---------|----------|
| Header | Log Quote title, Save button, Cancel link |
| Customer & Site | Customer* combobox, Site* combobox, Log Quote from Template checkbox, Log Quote from Recent Quote checkbox |
| Quote Details | Job Type* combobox, Job Category combobox, Description* textbox, Tags multiselect, Title input, Quote Reference Number input, Source of Enquiry combobox, Quote Trade combobox, Priority Level combobox, Quote Ref 1 input, Quote Ref 2 combobox, Expiry Date date, Quote Owner* combobox, Expected Sale Date date, Chance of Sale slider (0-100%) |
| Contacts | Add Contact button, Contacts table |
| Recent Jobs/Quotes | Logged Within dropdown, Jobs/Quotes tabs, Recent table |

### Form Fields

| Field | Required | Type | Locator Key |
|-------|----------|------|-------------|
| Customer | Yes | Combobox | customerCombobox |
| Site | Yes | Combobox | siteCombobox |
| Job Type | Yes | Combobox | jobTypeCombobox |
| Description | Yes | Textbox | descriptionTextbox |
| Quote Owner | Yes | Combobox | quoteOwnerCombobox |
| Job Category | No | Combobox | jobCategoryCombobox |
| Title | No | Textbox | titleInput |
| Quote Reference Number | No | Textbox | quoteReferenceNumberInput |
| Source of Enquiry | No | Combobox | sourceOfEnquiryCombobox |
| Quote Trade | No | Combobox | quoteTradeCombobox |
| Priority Level | No | Combobox | priorityLevelCombobox |
| Quote Ref 1 | No | Textbox | quoteRef1Input |
| Quote Ref 2 | No | Combobox | quoteRef2Combobox |
| Expiry Date | No | Date | expiryDateInput |
| Expected Sale Date | No | Date | expectedSaleDateInput |
| Chance of Sale | No | Slider | chanceOfSaleSlider |

### Intent → Method Mapping

#### Navigation
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| go to log quote page | `navigateToLogQuote()` | - | Navigate to Log Quote page |
| verify page loaded | `assertPageLoaded()` | - | Assert Log Quote page is loaded |

#### Customer & Site Section
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| select customer "ABC Corp" | `selectCustomer(customerName)` | `customerName: string` | Search and select customer by name |
| clear customer | `clearCustomer()` | - | Clear selected customer |
| get selected customer | `getSelectedCustomer()` | - | Get selected customer name (returns string) |
| select site "Main Office" | `selectSite(siteName)` | `siteName: string` | Search and select site by name |
| clear site | `clearSite()` | - | Clear selected site |
| enable log from template | `setLogFromTemplate(enable)` | `enable: boolean` | Toggle Log Quote from Template |
| enable log from recent quote | `setLogFromRecentQuote(enable)` | `enable: boolean` | Toggle Log Quote from Recent Quote |

#### Quote Details Section
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| select job type "Maintenance" | `selectJobType(jobType)` | `jobType: string` | Select job type from dropdown |
| clear job type | `clearJobType()` | - | Clear selected job type |
| select job category "HVAC" | `selectJobCategory(category)` | `category: string` | Select job category |
| fill description "Quote for repairs" | `fillDescription(description)` | `description: string` | Fill description field |
| get description | `getDescription()` | - | Get description value (returns string) |
| fill title "Q-2026-001" | `fillTitle(title)` | `title: string` | Fill quote title |
| fill quote reference number "REF-001" | `fillQuoteReferenceNumber(refNumber)` | `refNumber: string` | Fill quote reference number |
| select source of enquiry "Website" | `selectSourceOfEnquiry(source)` | `source: string` | Select source of enquiry |
| select quote trade "Electrical" | `selectQuoteTrade(trade)` | `trade: string` | Select quote trade |
| select priority level "High" | `selectPriorityLevel(priority)` | `priority: string` | Select priority level |
| fill quote ref 1 "Ref-A" | `fillQuoteRef1(ref)` | `ref: string` | Fill Quote Ref 1 |
| select quote ref 2 "Option-B" | `selectQuoteRef2(ref)` | `ref: string` | Select Quote Ref 2 |
| set expiry date "31/12/2026" | `setExpiryDate(date)` | `date: string` | Set quote expiry date |
| select quote owner "John Smith" | `selectQuoteOwner(owner)` | `owner: string` | Select quote owner |
| get selected quote owner | `getSelectedQuoteOwner()` | - | Get selected quote owner (returns string) |
| clear quote owner | `clearQuoteOwner()` | - | Clear selected quote owner |
| set expected sale date "15/04/2026" | `setExpectedSaleDate(date)` | `date: string` | Set expected sale date |
| set chance of sale 75 | `setChanceOfSale(percentage)` | `percentage: number` | Set chance of sale (0, 25, 50, 75, 100) |

#### Contacts Section
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| click add contact | `clickAddContact()` | - | Click Add Contact button |
| select contact "John Doe" | `selectContactByName(contactName)` | `contactName: string` | Select contact by name in table |
| check contacts empty | `isContactsEmpty()` | - | Check if contacts table is empty (returns boolean) |

#### Recent Jobs/Quotes Section
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| switch to jobs tab | `switchToJobsTab()` | - | Switch to Jobs tab |
| switch to quotes tab | `switchToQuotesTab()` | - | Switch to Quotes tab |
| click recent job "M0000264" | `clickRecentJob(jobNumber)` | `jobNumber: string` | Click on recent job |
| click recent quote "Q0000001" | `clickRecentQuote(quoteNumber)` | `quoteNumber: string` | Click on recent quote |

#### Form Actions
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| click cancel | `clickCancel()` | - | Click Cancel link |
| click save | `clickSave()` | - | Click Save button |
| wait for quote details page | `waitForQuoteDetailsNavigation()` | - | Wait for redirect to Quote Details (returns quote ID) |
| create quote quickly | `createQuoteQuick(customerName, siteName, description)` | `customerName: string, siteName: string, description: string` | Fill minimal fields and save (returns quote ID) |
| fill quote form | `fillQuoteForm(data)` | `data: Partial<QuoteData>` | Fill all provided quote data fields |

#### High-Level Creation
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| create new quote | `createNewQuote(data)` | `data: QuoteData` | Fill form and save quote |
| add new quote | `createNewQuote(data)` | `data: QuoteData` | Fill form and save quote |
| create a quote | `createNewQuote(data)` | `data: QuoteData` | Fill form and save quote |
| add a quote | `createNewQuote(data)` | `data: QuoteData` | Fill form and save quote |
| create quote | `createNewQuote(data)` | `data: QuoteData` | Fill form and save quote |
| add quote | `createNewQuote(data)` | `data: QuoteData` | Fill form and save quote |
| log new quote | `createNewQuote(data)` | `data: QuoteData` | Fill form and save quote |
| log a quote | `createNewQuote(data)` | `data: QuoteData` | Fill form and save quote |
| fill quote form only | `fillNewQuoteForm(data)` | `data: QuoteData` | Fill form only (does not save) |
| fill new quote form | `fillNewQuoteForm(data)` | `data: QuoteData` | Fill form only (does not save) |

### Sample Usage

```typescript
// Basic quote creation
await quotePage.selectCustomer('ABC Corporation');
await quotePage.selectSite('Main Office');
await quotePage.fillDescription('Quote for HVAC maintenance');
await quotePage.clickSave();
const quoteId = await quotePage.waitForQuoteDetailsNavigation();
console.log(`Created quote ID: ${quoteId}`);
```

### Typical Flow

```typescript
// Full quote creation flow
await quotePage.navigateToLogQuote();
await quotePage.assertPageLoaded();

// Select customer and site
await quotePage.selectCustomer('ABC Corporation');
await quotePage.selectSite('Head Office');

// Fill quote details
await quotePage.selectJobType('Maintenance');
await quotePage.fillDescription('Annual maintenance quote');
await quotePage.fillTitle('Q-2026-Annual');
await quotePage.fillQuoteReferenceNumber('REF-2026-001');
await quotePage.selectPriorityLevel('High');
await quotePage.setExpiryDate('31/12/2026');
await quotePage.setChanceOfSale(75);

// Save and verify
await quotePage.clickSave();
const quoteId = await quotePage.waitForQuoteDetailsNavigation();
console.log(`Quote created with ID: ${quoteId}`);
```

### Quick Quote Creation

```typescript
// Use createQuoteQuick for minimal required fields
const quoteId = await quotePage.createQuoteQuick(
  'ABC Corporation',
  'Main Office',
  'Emergency repair quote'
);
```

### Fill Form with Data Object

```typescript
// Use fillQuoteForm for comprehensive data
await quotePage.fillQuoteForm({
  customerName: 'ABC Corporation',
  siteName: 'Head Office',
  description: 'Quarterly maintenance quote',
  jobType: 'Maintenance',
  priorityLevel: 'Medium',
  expiryDate: '31/12/2026',
  chanceOfSale: 50,
  contactNames: ['John Doe']
});
await quotePage.clickSave();
```

### Data Builder Pattern (Recommended)

```typescript
import { QuoteBuilder, generateQuoteDescription, generateQuoteRef } from '../../data/testData/quote.data';

// Navigate first, then create
await quotePage.navigateToLogQuote();

// Simple quote with builder
const quoteId = await quotePage.createNewQuote(
  QuoteBuilder.create('ABC Corp', 'Main Office', 'HVAC Maintenance Quote').build()
);

// Quote with more details using fluent API
const quoteId = await quotePage.createNewQuote(
  QuoteBuilder.create('ABC Corp', 'Main Office', 'Annual Maintenance Quote')
    .jobType('Maintenance')
    .title('Q-2026-Annual')
    .priorityLevel('High')
    .expiryDate('31/12/2026')
    .expectedSaleDate('15/12/2026')
    .chanceOfSale(75)
    .sourceOfEnquiry('Phone Call')
    .quoteOwner('John Smith')
    .build()
);

// Generate unique values
const quoteId = await quotePage.createNewQuote(
  QuoteBuilder.create('ABC Corp', 'Main Office', generateQuoteDescription('Test Quote'))
    .title(generateQuoteTitle())
    .quoteReferenceNumber(generateQuoteRef())
    .build()
);
```

#### QuoteBuilder Methods

| Method | Description |
|--------|-------------|
| `.create(customer, site, description)` | Create builder with required fields |
| `.logFromTemplate(boolean?)` | Enable log from template |
| `.logFromRecentQuote(boolean?)` | Enable log from recent quote |
| `.jobType(string)` | Set job type |
| `.jobCategory(string)` | Set job category |
| `.tags(string[])` | Set tags |
| `.title(string)` | Set title |
| `.quoteReferenceNumber(string)` | Set quote reference number |
| `.sourceOfEnquiry(string)` | Set source of enquiry |
| `.quoteTrade(string)` | Set quote trade |
| `.priorityLevel(string)` | Set priority level |
| `.quoteRef1(string)` | Set quote ref 1 |
| `.quoteRef2(string)` | Set quote ref 2 |
| `.expiryDate(string)` | Set expiry date |
| `.quoteOwner(string)` | Set quote owner |
| `.expectedSaleDate(string)` | Set expected sale date |
| `.chanceOfSale(number)` | Set chance of sale (0, 25, 50, 75, 100) |
| `.contactNames(string[])` | Set contact names |
| `.build()` | Build QuoteData object |

---

## All Quotes Page (List)
### Page URL
- All Quotes: `/Quote`

### Target Class
```typescript
import { AllQuotesPage, QuoteSearchOptions, QuoteTab } from './pages/Quotes/AllQuotesPage';

const allQuotesPage = new AllQuotesPage(page);
```

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (search, click, select, etc.)

### Page Structure

| Section | Elements |
|---------|----------|
| Header Actions | Log Quote, Print, Import, Export |
| Empty State | "Create beautifully branded quotes" heading, Create first quote link |
| Filter Section | Search input, Status dropdown, Date Logged (Start/End), Expiry Date (Start/End), Show Advanced, Reset Filter, Search button |
| Tabs | All, Open, Won, Lost, Expired |
| Table | Quote No., Customer Name, Site Name, Status, Priority, Title, Description, Date Logged, Expiry Date, Quote Owner, Job Type, Job Category, Quote Trade, Quote Value, Chance of Sale |
| Pagination | First, Previous, Page numbers, Next, Last, Results per page |
| Detail Sidebar | Quote details panel, View Full Quote Details |

### Filter Fields

| Field | Type | Description |
|-------|------|-------------|
| Search | Text | Customer / Site / Quote Number / Description |
| Status | Multiselect | Filter by quote status |
| Date Logged | Date Range | Start and End date for date logged |
| Expiry Date | Date Range | Start and End date for expiry |

### Tabs

| Tab | Description |
|-----|-------------|
| All | All quotes |
| Open | Quotes still in progress |
| Won | Quotes that won |
| Lost | Quotes that lost |
| Expired | Quotes that expired |

### Intent → Method Mapping

#### Navigation
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| go to all quotes page | `navigateToAllQuotes()` | - | Navigate to All Quotes page |
| verify page loaded | `assertPageLoaded()` | - | Assert All Quotes page is loaded |
| check empty state | `isEmptyState()` | - | Check if no quotes exist (returns boolean) |
| click log quote | `clickLogQuote()` | - | Click Log Quote button or create first quote link |

#### Search and Filter
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| search "customer name" | `search(query)` | `query: string` | Search for quotes |
| reset filters | `resetFilters()` | - | Reset all filters to default |
| show advanced filters | `showAdvancedFilters()` | - | Show advanced filter options |
| hide advanced filters | `hideAdvancedFilters()` | - | Hide advanced filter options |
| set date logged range | `setDateLoggedRange(startDate, endDate)` | `startDate: string, endDate: string` | Set date logged filter range |
| set expiry date range | `setExpiryDateRange(startDate, endDate)` | `startDate: string, endDate: string` | Set expiry date filter range |
| apply filters | `applyFilters()` | - | Apply current filters |

#### Tab Navigation
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| switch/ or click to All tab | `switchToTab('All')` | `tab: QuoteTab` | Switch to All tab |
| switch/ or click to Open tab | `switchToTab('Open')` | `tab: QuoteTab` | Switch to Open tab |
| switch/ or click to Won tab | `switchToTab('Won')` | `tab: QuoteTab` | Switch to Won tab |
| switch/ or click to Lost tab | `switchToTab('Lost')` | `tab: QuoteTab` | Switch to Lost tab |
| switch/ or click to Expired tab | `switchToTab('Expired')` | `tab: QuoteTab` | Switch to Expired tab |
| get tab count | `getTabCount(tab)` | `tab: QuoteTab` | Get count of quotes in tab (returns number) |

#### Table Operations
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| wait for table load | `waitForTableLoad()` | - | Wait for table to finish loading |
| get row count | `getRowCount()` | - | Get number of visible rows (returns number) |
| click quote "Q0000001" | `clickQuoteByQuoteNo(quoteNo)` | `quoteNo: string` | Click quote row by quote number |
| click quote by customer "ABC Corp" | `clickQuoteByCustomerName(customerName)` | `customerName: string` | Click quote row by customer name |
| click quote by site "Main Office" | `clickQuoteBySiteName(siteName)` | `siteName: string` | Click quote row by site name |
| click quote by description "text" | `clickQuoteByDescription(description)` | `description: string` | Click quote row by description |
| click quote by status "Open" | `clickQuoteByStatus(status)` | `status: string` | Click first quote with matching status |
| click row at index 0 | `clickRowByIndex(index)` | `index: number` | Click row by 0-based index |
| get all visible items | `getAllVisibleItems()` | - | Get all visible quote items (returns QuoteListItem[]) |

#### Sorting
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| sort by quote number | `sortByColumn('Quote No.')` | `column: QuoteSortableColumn` | Sort by Quote No. column |
| sort by customer name | `sortByColumn('Customer Name')` | `column: QuoteSortableColumn` | Sort by Customer Name column |
| sort by date logged | `sortByColumn('Date Logged')` | `column: QuoteSortableColumn` | Sort by Date Logged column |
| sort by expiry date | `sortByColumn('Expiry Date')` | `column: QuoteSortableColumn` | Sort by Expiry Date column |
| sort by quote value | `sortByColumn('Quote Value')` | `column: QuoteSortableColumn` | Sort by Quote Value column |

#### Pagination
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| go to first page | `goToFirstPage()` | - | Navigate to first page |
| go to previous page | `goToPreviousPage()` | - | Navigate to previous page |
| go to next page | `goToNextPage()` | - | Navigate to next page |
| go to last page | `goToLastPage()` | - | Navigate to last page |
| show 20 results per page | `setResultsPerPage(20)` | `count: QuoteResultsPerPage` | Set results per page (5, 10, 20, 30, 50) |

#### Detail Sidebar & Actions
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| view full quote details | `viewFullQuoteDetails()` | - | Click View Full Quote Details button |
| click export | `clickExport()` | - | Click Export button |
| click import | `clickImport()` | - | Click Import button |
| click print | `clickPrint()` | - | Click Print button |

### Sample Usage

```typescript
// Navigate and search
await allQuotesPage.navigateToAllQuotes();
await allQuotesPage.assertPageLoaded();

// Check for empty state
if (await allQuotesPage.isEmptyState()) {
  await allQuotesPage.clickLogQuote(); // Will click "Create your first quote" link
} else {
  // Search for quotes
  await allQuotesPage.search('ABC Corporation');
  
  // Click on specific quote
  await allQuotesPage.clickQuoteByQuoteNo('Q0000001');
}
```

### Typical Flow

```typescript
// Full quotes list flow
await allQuotesPage.navigateToAllQuotes();
await allQuotesPage.assertPageLoaded();

// Filter by open quotes
await allQuotesPage.switchToTab('Open');
await allQuotesPage.setExpiryDateRange('01/01/2026', '31/12/2026');
await allQuotesPage.applyFilters();

// Get count and items
const openCount = await allQuotesPage.getTabCount('Open');
console.log(`Found ${openCount} open quotes`);

// Sort by expiry date
await allQuotesPage.sortByColumn('Expiry Date');

// Click on first quote
await allQuotesPage.clickRowByIndex(0);
await allQuotesPage.viewFullQuoteDetails();
```

### Working with Quote Data

```typescript
// Get all visible quotes
const quotes = await allQuotesPage.getAllVisibleItems();
console.log(`Showing ${quotes.length} quotes`);

// Process each quote
for (const quote of quotes) {
  console.log(`Quote: ${quote.quoteNo}`);
}

// Navigate to specific quote by customer
await allQuotesPage.clickQuoteByCustomerName('Sauer - ThielEino5zpbp');
```

---


## Create Customer Grouped Invoice Page

### Page URL
- Create Customer Grouped Invoice: `/CGroupInvoice/Create`

### Target Class
```typescript
import { CustomerGroupedInvoicePage, CustomerGroupedSearchOptions } from './pages/Invoices/CustomerGroupedInvoicePage';

const customerGroupedInvoicePage = new CustomerGroupedInvoicePage(page);
```

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (search, click, select, etc.)

### Page Structure

| Section | Elements |
|---------|----------|
| Header | Create Customer Grouped Invoice title, Export button |
| Tab Navigation | Jobs tab, Draft Invoices tab |
| Filter | Customer* combobox, Search Jobs textbox, Date Logged (Start/End), Status multiselect, Order By combobox, Show Advanced button, Reset Filter button, Search button |
| Results | All (count) tab, Selected (count) tab, Results table |
| Footer | Total Outstanding Cost, Cancel link, Save button |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to create customer grouped invoice | `navigateToCustomerGroupedInvoice()` |
| navigate to customer grouped invoice | `navigateToCustomerGroupedInvoice()` |
| open customer grouped invoice page | `navigateToCustomerGroupedInvoice()` |
| verify page loaded | `assertPageLoaded()` |
| **Tab Navigation** | |
| switch to jobs tab | `switchToTab('Jobs')` |
| click jobs tab | `switchToTab('Jobs')` |
| switch to draft invoices tab | `switchToTab('Draft Invoices')` |
| click draft invoices tab | `switchToTab('Draft Invoices')` |
| **Filter - Customer** | |
| select customer "ABC Corp" | `selectCustomer('ABC Corp')` |
| choose customer "XYZ Ltd" | `selectCustomer('XYZ Ltd')` |
| **Filter - Search** | |
| search jobs "M0000264" | `searchJobs('M0000264')` |
| search for "Maintenance" | `searchJobs('Maintenance')` |
| find jobs "Description" | `searchJobs('Description')` |
| **Filter - Date** | |
| set date logged from "01/01/2026" to "31/03/2026" | `setDateLoggedRange('01/01/2026', '31/03/2026')` |
| filter by date "01/01/2026" - "31/12/2026" | `setDateLoggedRange('01/01/2026', '31/12/2026')` |
| set start date "01/01/2026" | `setStartDate('01/01/2026')` |
| set end date "31/03/2026" | `setEndDate('31/03/2026')` |
| **Filter - Order By** | |
| select order by "Job Number (A-Z)" | `selectOrderBy('Job Number (A-Z)')` |
| sort by "Date Logged (Newest)" | `selectOrderBy('Date Logged (Newest)')` |
| **Filter - Actions** | |
| click show advanced | `clickShowAdvanced()` |
| show advanced filters | `clickShowAdvanced()` |
| click reset filter | `clickResetFilter()` |
| reset filters | `clickResetFilter()` |
| clear all filters | `clickResetFilter()` |
| click search | `clickSearch()` |
| search | `clickSearch()` |
| apply filters | `applyFilters(options)` |
| **Results - Tabs** | |
| switch to all results | `switchToAllResults()` |
| view all results | `switchToAllResults()` |
| switch to selected results | `switchToSelectedResults()` |
| view selected only | `switchToSelectedResults()` |
| **Results - Data** | |
| get all jobs count | `getAllJobsCount()` |
| count all jobs | `getAllJobsCount()` |
| get selected jobs count | `getSelectedJobsCount()` |
| count selected jobs | `getSelectedJobsCount()` |
| check no matching jobs | `isNoMatchingJobsVisible()` |
| **Results - Selection** | |
| select job "M0000264" | `selectJobByNumber('M0000264')` |
| choose job "M0000263" | `selectJobByNumber('M0000263')` |
| select all jobs | `selectAllJobs()` |
| check all jobs | `selectAllJobs()` |
| **Footer** | |
| get total outstanding cost | `getTotalOutstandingCost()` |
| click cancel | `clickCancel()` |
| cancel | `clickCancel()` |
| click save | `clickSave()` |
| save invoice | `clickSave()` |
| check save enabled | `isSaveEnabled()` |
| create invoice for "ABC Corp" with jobs | `createInvoice('ABC Corp', ['M0000264', 'M0000265'])` |

### Sample Usage

```typescript
// Navigate and create customer grouped invoice
await customerGroupedInvoicePage.navigateToCustomerGroupedInvoice();
await customerGroupedInvoicePage.assertPageLoaded();

// Select customer and search for jobs
await customerGroupedInvoicePage.selectCustomer('ABC Corporation');
await customerGroupedInvoicePage.clickSearch();

// Select specific jobs
await customerGroupedInvoicePage.selectJobByNumber('J0000001');
await customerGroupedInvoicePage.selectJobByNumber('J0000002');

// Save invoice
await customerGroupedInvoicePage.clickSave();
```

---

## Create Batch of Invoices Page

### Page URL
- Batch of Invoices: `/BatchInvoice/Create`

### Target Class
```typescript
import { BatchInvoicePage, BatchInvoiceSearchOptions } from './pages/Invoices/BatchInvoicePage';

const batchInvoicePage = new BatchInvoicePage(page);
```

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (search, click, select, etc.)

### Page Structure

| Section | Elements |
|---------|----------|
| Header | Batch of Invoices title |
| Tab Navigation | Jobs tab, Draft Invoices tab |
| Filter | Hide Filter button, Customers multiselect, Search Jobs textbox, Date Logged* (Start/End), Status multiselect, Job Category multiselect, Show Advanced button, Reset Filter button, Search button |
| Results | All (count) tab, Selected (count) tab, Results table |
| Footer | Total Outstanding Cost, Cancel button, Save button |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to batch invoice | `navigateToBatchInvoice()` |
| navigate to batch of invoices | `navigateToBatchInvoice()` |
| open create batch invoices page | `navigateToBatchInvoice()` |
| verify page loaded | `assertPageLoaded()` |
| **Tab Navigation** | |
| switch to jobs tab | `switchToTab('Jobs')` |
| click jobs tab | `switchToTab('Jobs')` |
| switch to draft invoices tab | `switchToTab('Draft Invoices')` |
| click draft invoices tab | `switchToTab('Draft Invoices')` |
| **Filter - Toggle** | |
| toggle filter | `toggleFilter()` |
| hide filter | `toggleFilter()` |
| show filter | `toggleFilter()` |
| **Filter - Search** | |
| search jobs "M0000264" | `searchJobs('M0000264')` |
| search for "Maintenance" | `searchJobs('Maintenance')` |
| find jobs "Description" | `searchJobs('Description')` |
| **Filter - Date** | |
| set date logged from "01/01/2026" to "31/03/2026" | `setDateLoggedRange('01/01/2026', '31/03/2026')` |
| filter by date "01/01/2026" - "31/12/2026" | `setDateLoggedRange('01/01/2026', '31/12/2026')` |
| set start date "01/01/2026" | `setStartDate('01/01/2026')` |
| set end date "31/03/2026" | `setEndDate('31/03/2026')` |
| **Filter - Actions** | |
| click show advanced | `clickShowAdvanced()` |
| show advanced filters | `clickShowAdvanced()` |
| click reset filter | `clickResetFilter()` |
| reset filters | `clickResetFilter()` |
| clear all filters | `clickResetFilter()` |
| click search | `clickSearch()` |
| search | `clickSearch()` |
| apply filters | `applyFilters(options)` |
| **Results - Tabs** | |
| switch to all results | `switchToAllResults()` |
| view all results | `switchToAllResults()` |
| switch to selected results | `switchToSelectedResults()` |
| view selected only | `switchToSelectedResults()` |
| **Results - Data** | |
| get all items count | `getAllItemsCount()` |
| count all items | `getAllItemsCount()` |
| get selected items count | `getSelectedItemsCount()` |
| count selected items | `getSelectedItemsCount()` |
| check no matching results | `isNoMatchingResultsVisible()` |
| **Results - Selection** | |
| select job "M0000264" | `selectJobByNumber('M0000264')` |
| choose job "M0000263" | `selectJobByNumber('M0000263')` |
| select all jobs | `selectAllJobs()` |
| check all jobs | `selectAllJobs()` |
| **Footer** | |
| get total outstanding cost | `getTotalOutstandingCost()` |
| click cancel | `clickCancel()` |
| cancel | `clickCancel()` |
| click save | `clickSave()` |
| save batch invoice | `clickSave()` |
| check save enabled | `isSaveEnabled()` |
| create batch invoice with jobs | `createBatchInvoice(['M0000264', 'M0000265'])` |

### Sample Usage

```typescript
// Navigate and create batch invoice
await batchInvoicePage.navigateToBatchInvoice();
await batchInvoicePage.assertPageLoaded();

// Set date range and search
await batchInvoicePage.setDateLoggedRange('01/01/2026', '31/03/2026');
await batchInvoicePage.clickSearch();

// Select jobs and save
await batchInvoicePage.selectAllJobs();
await batchInvoicePage.clickSave();
```

---

## Batch Audit Page

### Page URL
- Batch Audit: `/BatchInvoice/Audit`

### Target Class
```typescript
import { BatchAuditPage, BatchAuditSearchOptions } from './pages/Invoices/BatchAuditPage';

const batchAuditPage = new BatchAuditPage(page);
```

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (search, click, select, etc.)

### Page Structure

| Section | Elements |
|---------|----------|
| Header | Batch Audit title |
| Filter | Action multiselect, Operation Time (Start/End), User multiselect, Reset Filter button, Search button |
| Results | Results table, Loading message |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to batch audit | `navigateToBatchAudit()` |
| navigate to batch audit | `navigateToBatchAudit()` |
| open batch audit page | `navigateToBatchAudit()` |
| verify page loaded | `assertPageLoaded()` |
| **Filter - Date** | |
| set operation time from "01/01/2026" to "31/03/2026" | `setOperationTimeRange('01/01/2026', '31/03/2026')` |
| filter by operation time "01/01/2026" - "31/12/2026" | `setOperationTimeRange('01/01/2026', '31/12/2026')` |
| set start date "01/01/2026" | `setStartDate('01/01/2026')` |
| set end date "31/03/2026" | `setEndDate('31/03/2026')` |
| **Filter - Actions** | |
| click reset filter | `clickResetFilter()` |
| reset filters | `clickResetFilter()` |
| clear all filters | `clickResetFilter()` |
| click search | `clickSearch()` |
| search | `clickSearch()` |
| apply filters | `applyFilters(options)` |
| **Results - Loading** | |
| wait for data load | `waitForDataLoad()` |
| wait for loading | `waitForDataLoad()` |
| check is loading | `isLoading()` |
| **Results - Data** | |
| check no results | `isNoResultsVisible()` |
| verify no results | `isNoResultsVisible()` |
| get audit records count | `getAuditRecordsCount()` |
| count audit records | `getAuditRecordsCount()` |
| **Results - Click** | |
| click audit record at row 1 | `clickAuditRecord(0)` |
| click audit record at row 3 | `clickAuditRecord(2)` |
| select first audit record | `clickAuditRecord(0)` |
| **Combined Actions** | |
| search and wait | `searchAndWait()` |
| search and wait for results | `searchAndWait(options)` |

### Sample Usage

```typescript
// Navigate and search audit records
await batchAuditPage.navigateToBatchAudit();
await batchAuditPage.assertPageLoaded();

// Set date range and search
await batchAuditPage.setOperationTimeRange('01/01/2026', '31/03/2026');
await batchAuditPage.searchAndWait();

// Get count
const count = await batchAuditPage.getAuditRecordsCount();
console.log(`Found ${count} audit records`);
```

---

## All Invoices Page (List)

### Page URL
- All Invoices: `/Invoice`

### Target Class
```typescript
import { AllInvoicesPage, InvoiceSearchOptions } from './pages/Invoices/AllInvoicesPage';

const allInvoicesPage = new AllInvoicesPage(page);
```

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (search, click, select, etc.)

### Page Structure

| Section | Elements |
|---------|----------|
| Header | Invoice(s) title, Create Customer Grouped button, Print button, Export button |
| Filter | Hide Filter button, Search Invoices textbox, Start Date, End Date, Show Advanced button, Reset Filter button, Search button |
| Tabs | Invoices (count), Draft Invoices (count), Credits (count), Draft Credits (count) |
| Results | Results table, Loading message |
| Sidebar | Invoice Summary (Customer Name, Site Name, Job Number), Invoice Details (Status, Payment Status, Date Raised, Payment Due Date) |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to all invoices | `navigateToAllInvoices()` |
| navigate to all invoices | `navigateToAllInvoices()` |
| open invoices page | `navigateToAllInvoices()` |
| open invoice list | `navigateToAllInvoices()` |
| verify page loaded | `assertPageLoaded()` |
| click create customer grouped | `clickCreateCustomerGrouped()` |
| create customer grouped invoice | `clickCreateCustomerGrouped()` |
| **Tab Navigation** | |
| switch to invoices tab | `switchToTab('Invoices')` |
| click invoices tab | `switchToTab('Invoices')` |
| view invoices | `switchToTab('Invoices')` |
| switch to draft invoices tab | `switchToTab('Draft Invoices')` |
| click draft invoices tab | `switchToTab('Draft Invoices')` |
| view draft invoices | `switchToTab('Draft Invoices')` |
| switch to credits tab | `switchToTab('Credits')` |
| click credits tab | `switchToTab('Credits')` |
| view credits | `switchToTab('Credits')` |
| switch to draft credits tab | `switchToTab('Draft Credits')` |
| click draft credits tab | `switchToTab('Draft Credits')` |
| view draft credits | `switchToTab('Draft Credits')` |
| **Tab Counts** | |
| get invoices count | `getInvoicesCount()` |
| count invoices | `getInvoicesCount()` |
| get draft invoices count | `getDraftInvoicesCount()` |
| count draft invoices | `getDraftInvoicesCount()` |
| get credits count | `getCreditsCount()` |
| count credits | `getCreditsCount()` |
| get draft credits count | `getDraftCreditsCount()` |
| count draft credits | `getDraftCreditsCount()` |
| **Filter - Toggle** | |
| toggle filter | `toggleFilter()` |
| hide filter | `toggleFilter()` |
| show filter | `toggleFilter()` |
| **Filter - Search** | |
| search invoices "INV-2026-001" | `searchInvoices('INV-2026-001')` |
| search for "ABC Corp" | `searchInvoices('ABC Corp')` |
| find invoice "M0000264" | `searchInvoices('M0000264')` |
| **Filter - Date** | |
| set date range from "01/01/2026" to "31/03/2026" | `setDateRange('01/01/2026', '31/03/2026')` |
| filter by date "01/01/2026" - "31/12/2026" | `setDateRange('01/01/2026', '31/12/2026')` |
| set start date "01/01/2026" | `setStartDate('01/01/2026')` |
| set end date "31/03/2026" | `setEndDate('31/03/2026')` |
| **Filter - Actions** | |
| click show advanced | `clickShowAdvanced()` |
| show advanced filters | `clickShowAdvanced()` |
| click reset filter | `clickResetFilter()` |
| reset filters | `clickResetFilter()` |
| clear all filters | `clickResetFilter()` |
| click search | `clickSearch()` |
| search | `clickSearch()` |
| apply filters | `applyFilters(options)` |
| **Results - Loading** | |
| wait for data load | `waitForDataLoad()` |
| wait for loading | `waitForDataLoad()` |
| check is loading | `isLoading()` |
| **Results - Data** | |
| check no results | `isNoResultsVisible()` |
| verify no results | `isNoResultsVisible()` |
| get invoice records count | `getInvoiceRecordsCount()` |
| count invoice records | `getInvoiceRecordsCount()` |
| **Results - Click** | |
| click invoice "INV-2026-001" | `clickInvoiceByNumber('INV-2026-001')` |
| select invoice "INV-2026-002" | `clickInvoiceByNumber('INV-2026-002')` |
| open invoice "INV-2026-003" | `clickInvoiceByNumber('INV-2026-003')` |
| click invoice by customer "ABC Corp" | `clickInvoiceByCustomerName('ABC Corp')` |
| select invoice for customer "XYZ Ltd" | `clickInvoiceByCustomerName('XYZ Ltd')` |
| **Combined Actions** | |
| search and wait | `searchAndWait()` |
| search and wait for results | `searchAndWait(options)` |
| **Print/Export** | |
| click print | `clickPrint()` |
| print invoices | `clickPrint()` |
| click export | `clickExport()` |
| export invoices | `clickExport()` |
| **Sidebar** | |
| get invoice summary | `getInvoiceSummary()` |
| click customer in sidebar | `clickCustomerInSidebar()` |
| go to customer from sidebar | `clickCustomerInSidebar()` |
| click site in sidebar | `clickSiteInSidebar()` |
| go to site from sidebar | `clickSiteInSidebar()` |
| click job in sidebar | `clickJobInSidebar()` |
| go to job from sidebar | `clickJobInSidebar()` |

### Sample Usage

```typescript
// Navigate and search invoices
await allInvoicesPage.navigateToAllInvoices();
await allInvoicesPage.assertPageLoaded();

// Search for specific invoice
await allInvoicesPage.searchInvoices('INV-2026-001');
await allInvoicesPage.searchAndWait();

// Click on invoice and view details
await allInvoicesPage.clickInvoiceByNumber('INV-2026-001');
const summary = await allInvoicesPage.getInvoiceSummary();
console.log(`Customer: ${summary.customerName}`);
```

### Typical Flow

```typescript
// Full invoice list flow
await allInvoicesPage.navigateToAllInvoices();
await allInvoicesPage.assertPageLoaded();

// Check counts
const invoicesCount = await allInvoicesPage.getInvoicesCount();
const draftCount = await allInvoicesPage.getDraftInvoicesCount();
console.log(`Invoices: ${invoicesCount}, Drafts: ${draftCount}`);

// Filter by date range
await allInvoicesPage.setDateRange('01/01/2026', '31/03/2026');
await allInvoicesPage.searchAndWait();

// Switch to credits tab
await allInvoicesPage.switchToTab('Credits');
await allInvoicesPage.waitForDataLoad();

// Export data
await allInvoicesPage.clickExport();
```

---

# PPM Pages

## Add PPM Page (Create PPM Quote/Contract)

### Page URL
- Add PPM Quote: `/PPMContract/Create#ppmquote`
- Add PPM Contract: `/PPMContract/Create#ppmcontract`

### Target Class
```typescript
import { PPMPage, PPMFormData, PPMContractType } from './pages/PPM/PPMPage';

const ppmPage = new PPMPage(page);
```

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (search, click, select, etc.)

### Page Structure

| Section | Elements |
|---------|----------|
| Header | Add PPM Quote/Contract title, Import Assets button |
| Steps | 1. PPM Description, 2. Selling & Billing, 3. Default Engineer, 4. Notes & Attachments |
| Contract Type | PPM Quote radio, PPM Contract radio |
| Customer & Site | Customer* combobox, Site* combobox |
| PPM Description | Plan Reference, Description, Job Category, PPM Quote Account Manager, Tag(s) |
| Footer | *Required Fields, Back button, Next button, Cancel button, Save button |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to add ppm quote | `navigateToAddPPMQuote()` |
| navigate to add ppm | `navigateToAddPPMQuote()` |
| go to add ppm contract | `navigateToAddPPMContract()` |
| verify page loaded | `assertPageLoaded()` |
| **Contract Type** | |
| select ppm quote | `selectContractType('PPM Quote')` |
| click ppm quote radio | `selectContractType('PPM Quote')` |
| select ppm contract | `selectContractType('PPM Contract')` |
| click ppm contract radio | `selectContractType('PPM Contract')` |
| check if ppm quote selected | `isPPMQuoteSelected()` |
| check if ppm contract selected | `isPPMContractSelected()` |
| **Customer & Site** | |
| select customer "ABC Corp" | `selectCustomer('ABC Corp')` |
| choose customer "XYZ Ltd" | `selectCustomer('XYZ Ltd')` |
| clear customer | `clearCustomer()` |
| select site "Main Office" | `selectSite('Main Office')` |
| choose site "Branch 1" | `selectSite('Branch 1')` |
| clear site | `clearSite()` |
| **PPM Description** | |
| fill plan reference "PPM-2026-001" | `fillPlanReference('PPM-2026-001')` |
| enter plan reference "REF123" | `fillPlanReference('REF123')` |
| fill description "Monthly maintenance" | `fillDescription('Monthly maintenance')` |
| enter description "Quarterly service" | `fillDescription('Quarterly service')` |
| select job category "Maintenance" | `selectJobCategory('Maintenance')` |
| choose job category "Service" | `selectJobCategory('Service')` |
| select account manager "John Smith" | `selectAccountManager('John Smith')` |
| select tags "HVAC", "Priority" | `selectTags(['HVAC', 'Priority'])` |
| **Navigation Buttons** | |
| click next | `clickNext()` |
| click back | `clickBack()` |
| click cancel | `clickCancel()` |
| click save | `clickSave()` |
| check if next enabled | `isNextEnabled()` |
| check if save enabled | `isSaveEnabled()` |
| check if import assets enabled | `isImportAssetsEnabled()` |
| **Combined Actions** | |
| fill ppm description | `fillPPMDescription(data)` |
| create ppm quote | `createPPMQuote(customer, site, description)` |
| create ppm contract | `createPPMContract(customer, site, description)` |
| **High-Level Creation** | |
| create new ppm | `createNewPPM(data)` |
| add new ppm | `createNewPPM(data)` |
| create a ppm | `createNewPPM(data)` |
| add a ppm | `createNewPPM(data)` |
| create ppm | `createNewPPM(data)` |
| add ppm | `createNewPPM(data)` |
| fill ppm form only | `fillNewPPMForm(data)` |
| fill new ppm form | `fillNewPPMForm(data)` |

### Sample Usage

```typescript
// Navigate and create PPM Quote
await ppmPage.navigateToAddPPMQuote();
await ppmPage.assertPageLoaded();

// Select contract type and fill details
await ppmPage.selectContractType('PPM Quote');
await ppmPage.selectCustomer('ABC Corporation');
await ppmPage.selectSite('Main Office');
await ppmPage.fillDescription('Monthly HVAC maintenance');
await ppmPage.selectJobCategory('Maintenance');

// Proceed to next step
await ppmPage.clickNext();
```

### Data Builder Pattern (Recommended)

```typescript
import { PPMBuilder, generatePPMDescription, generatePlanReference } from '../../data/testData/ppm.data';

// Navigate first, then create
await ppmPage.navigateToAddPPMQuote();

// Simple PPM Quote with builder
await ppmPage.createNewPPM(
  PPMBuilder.createQuote('ABC Corp', 'Main Office', 'Annual HVAC Maintenance').build()
);

// PPM Contract with more details using fluent API
await ppmPage.navigateToAddPPMContract();
await ppmPage.createNewPPM(
  PPMBuilder.createContract('ABC Corp', 'Main Office', 'Quarterly Fire Safety Inspection')
    .planReference('PPM-2024-001')
    .jobCategory('Fire Safety')
    .accountManager('John Smith')
    .tags(['Priority', 'Annual'])
    .build()
);

// Generate unique values
await ppmPage.createNewPPM(
  PPMBuilder.createQuote('ABC Corp', 'Main Office', generatePPMDescription('Test PPM'))
    .planReference(generatePlanReference())
    .build()
);

// Fill form only (without proceeding to next step)
await ppmPage.fillNewPPMForm(
  PPMBuilder.createQuote('ABC Corp', 'Main Office', 'Maintenance Plan')
    .jobCategory('HVAC')
    .build()
);
```

#### PPMBuilder Methods

| Method | Description |
|--------|-------------|
| `.createQuote(customer, site, description)` | Create PPM Quote builder with required fields |
| `.createContract(customer, site, description)` | Create PPM Contract builder with required fields |
| `.planReference(string)` | Set plan reference |
| `.jobCategory(string)` | Set job category |
| `.accountManager(string)` | Set account manager |
| `.tags(string[])` | Set tags |
| `.build()` | Build PPMData object |

### High-Level Methods (PPMPage)

| Method | Parameters | Description |
|--------|------------|-------------|
| `createNewPPM(data)` | `data: PPMData` | Fill form and proceed to next step |
| `fillNewPPMForm(data)` | `data: PPMData` | Fill form only (does not proceed) |
| `createPPMQuote(customer, site, description)` | string params | Legacy method - navigate, fill and proceed |
| `createPPMContract(customer, site, description)` | string params | Legacy method - navigate, fill and proceed |

---

## All PPM Contracts Page (List)

### Page URL
- All PPM Contracts: `/PPMContract`

### Target Class
```typescript
import { AllPPMContractsPage, PPMContractSearchOptions, PPMContractTab } from './pages/PPM/AllPPMContractsPage';

const allPPMContractsPage = new AllPPMContractsPage(page);
```

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (search, click, select, etc.)

### Page Structure

| Section | Elements |
|---------|----------|
| Header | PPM Contracts title, Add PPM button, Print button, Import PPM button, Export button |
| Filter | Hide Filter button, Search textbox, Show Advanced button, Reset Filter button, Search button |
| Tabs | In Progress, Completed, Suspended, All |
| Results | Results table, Loading message |
| Sidebar | PPM Contract summary (Customer Name, Site Name), PPM Contract Details (Description, Billing Type, Start Date, End Date, Job Category, Plan Reference, Selling Rate) |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to all ppm contracts | `navigateToAllPPMContracts()` |
| navigate to ppm contracts | `navigateToAllPPMContracts()` |
| open ppm contracts page | `navigateToAllPPMContracts()` |
| verify page loaded | `assertPageLoaded()` |
| click add ppm | `clickAddPPM()` |
| click print | `clickPrint()` |
| click import ppm | `clickImportPPM()` |
| click export | `clickExport()` |
| **Tab Navigation** | |
| switch to in progress tab | `switchToTab('In Progress')` |
| click in progress tab | `switchToTab('In Progress')` |
| switch to completed tab | `switchToTab('Completed')` |
| click completed tab | `switchToTab('Completed')` |
| switch to suspended tab | `switchToTab('Suspended')` |
| click suspended tab | `switchToTab('Suspended')` |
| switch to all tab | `switchToTab('All')` |
| click all tab | `switchToTab('All')` |
| get active tab | `getActiveTab()` |
| **Filter** | |
| toggle filter | `toggleFilter()` |
| hide filter | `toggleFilter()` |
| search "ABC Corp" | `search('ABC Corp')` |
| find ppm contract "PPM-001" | `search('PPM-001')` |
| click show advanced | `clickShowAdvanced()` |
| click reset filter | `clickResetFilter()` |
| reset filters | `clickResetFilter()` |
| click search | `clickSearch()` |
| search and wait | `searchAndWait(query)` |
| apply filters | `applyFilters(options)` |
| **Results** | |
| wait for data load | `waitForDataLoad()` |
| check is loading | `isLoading()` |
| check no results | `isNoResultsVisible()` |
| get row count | `getRowCount()` |
| click contract "PPM-001" | `clickContractByNumber('PPM-001')` |
| click contract by customer "ABC Corp" | `clickContractByCustomerName('ABC Corp')` |
| click row 0 | `clickRowByIndex(0)` |
| get all visible items | `getAllVisibleItems()` |
| **Sidebar** | |
| get sidebar customer name | `getSidebarCustomerName()` |
| get sidebar site name | `getSidebarSiteName()` |
| click view full details | `clickViewFullDetails()` |

### Sample Usage

```typescript
// Navigate and search PPM contracts
await allPPMContractsPage.navigateToAllPPMContracts();
await allPPMContractsPage.assertPageLoaded();

// Switch to In Progress tab and search
await allPPMContractsPage.switchToTab('In Progress');
await allPPMContractsPage.searchAndWait('ABC Corporation');

// Click on contract
await allPPMContractsPage.clickContractByNumber('PPM-001');
const customerName = await allPPMContractsPage.getSidebarCustomerName();
```

---

## All PPM Quotes Page (List)

### Page URL
- All PPM Quotes: `/PPMQuote`

### Target Class
```typescript
import { AllPPMQuotesPage, PPMQuoteSearchOptions, PPMQuoteTab, PPMQuoteStatus } from './pages/PPM/AllPPMQuotesPage';

const allPPMQuotesPage = new AllPPMQuotesPage(page);
```

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (search, click, select, etc.)

### Page Structure

| Section | Elements |
|---------|----------|
| Header | PPM Quotes title, Add PPM button, Print button, Export button |
| Filter | Hide Filter button, Search textbox, Status multiselect, Show Advanced button, Reset Filter button, Search button |
| Tabs | Quote Design, Outstanding, Sent, Accepted, Rejected, All |
| Results | Results table, Loading message |
| Sidebar | PPM Quote summary (Customer Name, Site Name), PPM Quote Details (Status, Logged by, Job Category, Quote Description, Billing Type, Start Date, End Date, Plan Reference, Selling Rate) |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to all ppm quotes | `navigateToAllPPMQuotes()` |
| navigate to ppm quotes | `navigateToAllPPMQuotes()` |
| open ppm quotes page | `navigateToAllPPMQuotes()` |
| verify page loaded | `assertPageLoaded()` |
| click add ppm | `clickAddPPM()` |
| click print | `clickPrint()` |
| click export | `clickExport()` |
| **Tab Navigation** | |
| switch to quote design tab | `switchToTab('Quote Design')` |
| click quote design tab | `switchToTab('Quote Design')` |
| switch to outstanding tab | `switchToTab('Outstanding')` |
| click outstanding tab | `switchToTab('Outstanding')` |
| switch to sent tab | `switchToTab('Sent')` |
| click sent tab | `switchToTab('Sent')` |
| switch to accepted tab | `switchToTab('Accepted')` |
| click accepted tab | `switchToTab('Accepted')` |
| switch to rejected tab | `switchToTab('Rejected')` |
| click rejected tab | `switchToTab('Rejected')` |
| switch to all tab | `switchToTab('All')` |
| click all tab | `switchToTab('All')` |
| get active tab | `getActiveTab()` |
| **Filter** | |
| toggle filter | `toggleFilter()` |
| hide filter | `toggleFilter()` |
| search "ABC Corp" | `search('ABC Corp')` |
| find ppm quote "PPMQ-001" | `search('PPMQ-001')` |
| select status "Outstanding", "Sent" | `selectStatus(['Outstanding', 'Sent'])` |
| filter by status "Accepted" | `selectStatus(['Accepted'])` |
| click show advanced | `clickShowAdvanced()` |
| click reset filter | `clickResetFilter()` |
| reset filters | `clickResetFilter()` |
| click search | `clickSearch()` |
| search and wait | `searchAndWait(query)` |
| apply filters | `applyFilters(options)` |
| **Results** | |
| wait for data load | `waitForDataLoad()` |
| check is loading | `isLoading()` |
| check no results | `isNoResultsVisible()` |
| get row count | `getRowCount()` |
| click quote "PPMQ-001" | `clickQuoteByNumber('PPMQ-001')` |
| click quote by customer "ABC Corp" | `clickQuoteByCustomerName('ABC Corp')` |
| click row 0 | `clickRowByIndex(0)` |
| get all visible items | `getAllVisibleItems()` |
| **Sidebar** | |
| get sidebar customer name | `getSidebarCustomerName()` |
| get sidebar site name | `getSidebarSiteName()` |
| get sidebar quote status | `getSidebarQuoteStatus()` |
| click view full details | `clickViewFullDetails()` |

### Sample Usage

```typescript
// Navigate and search PPM quotes
await allPPMQuotesPage.navigateToAllPPMQuotes();
await allPPMQuotesPage.assertPageLoaded();

// Switch to Outstanding tab and filter
await allPPMQuotesPage.switchToTab('Outstanding');
await allPPMQuotesPage.selectStatus(['Outstanding', 'Sent']);
await allPPMQuotesPage.searchAndWait('ABC Corporation');

// Click on quote and check status
await allPPMQuotesPage.clickQuoteByNumber('PPMQ-001');
const status = await allPPMQuotesPage.getSidebarQuoteStatus();
```

---

## Batch Deploy Subcontractor PPM Visits Page

### Page URL
- Batch Deploy: `/PPMContract/BatchDeploy`

### Target Class
```typescript
import { BatchDeployPage, BatchDeploySearchOptions, PPMVisitItem } from './pages/PPM/BatchDeployPage';

const batchDeployPage = new BatchDeployPage(page);
```

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (search, click, select, etc.)

### Page Structure

| Section | Elements |
|---------|----------|
| Header | Batch Deploy Subcontractor PPM Visits title |
| Filter | Subcontractor combobox, Customer combobox, Site combobox, PPM Contract combobox, Date Allocated (Start/End), Site Area(s) multiselect, Subcontractor Area(s) multiselect, Visit Due Date (Start/End), Reset Filter button, Search button |
| Selection Bar | "X Visit(s) Selected" text, Batch Deploy button |
| Results | Results table, No matching results message |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to batch deploy | `navigateToBatchDeploy()` |
| navigate to batch deploy ppm visits | `navigateToBatchDeploy()` |
| open batch deploy page | `navigateToBatchDeploy()` |
| verify page loaded | `assertPageLoaded()` |
| **Filter - Selection** | |
| select subcontractor "ABC Contractors" | `selectSubcontractor('ABC Contractors')` |
| choose subcontractor "XYZ Services" | `selectSubcontractor('XYZ Services')` |
| select customer "ABC Corp" | `selectCustomer('ABC Corp')` |
| choose customer "XYZ Ltd" | `selectCustomer('XYZ Ltd')` |
| select site "Main Office" | `selectSite('Main Office')` |
| choose site "Branch 1" | `selectSite('Branch 1')` |
| select ppm contract "PPM-001" | `selectPPMContract('PPM-001')` |
| choose ppm contract "PPM-002" | `selectPPMContract('PPM-002')` |
| **Filter - Date Range** | |
| set date allocated from "01/01/2026" to "31/03/2026" | `setDateAllocatedRange('01/01/2026', '31/03/2026')` |
| filter date allocated "01/01/2026" - "31/12/2026" | `setDateAllocatedRange('01/01/2026', '31/12/2026')` |
| set visit due date from "01/01/2026" to "31/03/2026" | `setVisitDueDateRange('01/01/2026', '31/03/2026')` |
| filter visit due date "01/01/2026" - "31/12/2026" | `setVisitDueDateRange('01/01/2026', '31/12/2026')` |
| **Filter - Areas** | |
| select site areas "North", "South" | `selectSiteAreas(['North', 'South'])` |
| filter by site areas "East", "West" | `selectSiteAreas(['East', 'West'])` |
| select subcontractor areas "Region 1", "Region 2" | `selectSubcontractorAreas(['Region 1', 'Region 2'])` |
| **Filter - Actions** | |
| click reset filter | `clickResetFilter()` |
| reset filters | `clickResetFilter()` |
| click search | `clickSearch()` |
| search and wait | `searchAndWait()` |
| apply filters | `applyFilters(options)` |
| **Results** | |
| wait for data load | `waitForDataLoad()` |
| check no results | `isNoResultsVisible()` |
| get row count | `getRowCount()` |
| select visit at row 0 | `selectVisitByIndex(0)` |
| deselect visit at row 0 | `deselectVisitByIndex(0)` |
| select all visits | `selectAllVisits()` |
| deselect all visits | `deselectAllVisits()` |
| **Selection Bar** | |
| get selected visits count | `getSelectedVisitsCount()` |
| check if batch deploy enabled | `isBatchDeployEnabled()` |
| click batch deploy | `clickBatchDeploy()` |
| deploy selected visits | `deploySelectedVisits()` |
| **Combined Actions** | |
| select and deploy visits | `selectAndDeployVisits(indices)` |

### Sample Usage

```typescript
// Navigate to batch deploy page
await batchDeployPage.navigateToBatchDeploy();
await batchDeployPage.assertPageLoaded();

// Filter by subcontractor and date range
await batchDeployPage.selectSubcontractor('ABC Contractors');
await batchDeployPage.setVisitDueDateRange('01/01/2026', '31/03/2026');
await batchDeployPage.searchAndWait();

// Select visits and deploy
await batchDeployPage.selectAllVisits();
const count = await batchDeployPage.getSelectedVisitsCount();
console.log(`${count} visits selected`);
await batchDeployPage.clickBatchDeploy();
```

---

## PPM Parts Required Page

### Page URL
- PPM Parts Required: `/PPMPartRequired`

### Target Class
```typescript
import { PPMPartsRequiredPage, PPMPartsSearchOptions, PPMPartItem } from './pages/PPM/PPMPartsRequiredPage';

const ppmPartsRequiredPage = new PPMPartsRequiredPage(page);
```

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (search, click, select, etc.)

### Page Structure

| Section | Elements |
|---------|----------|
| Header | PPM Parts Required title, Print button, Export button |
| Filter | Hide Filter button, Search textbox (Part Number / Part Description), Engineer multiselect, Customer multiselect, Site multiselect, PPM Contract multiselect, Visit Due Date (Start/End), Reset Filter button, Search button |
| Results | Results table, Loading message, Pagination |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to ppm parts required | `navigateToPPMPartsRequired()` |
| navigate to ppm parts | `navigateToPPMPartsRequired()` |
| open ppm parts required page | `navigateToPPMPartsRequired()` |
| verify page loaded | `assertPageLoaded()` |
| click print | `clickPrint()` |
| click export | `clickExport()` |
| **Filter - Toggle** | |
| toggle filter | `toggleFilter()` |
| hide filter | `toggleFilter()` |
| show filter | `toggleFilter()` |
| **Filter - Search** | |
| search "PN-001" | `search('PN-001')` |
| find part "Filter Element" | `search('Filter Element')` |
| **Filter - Selection** | |
| select engineer "John Smith", "Jane Doe" | `selectEngineer(['John Smith', 'Jane Doe'])` |
| filter by engineer "John Smith" | `selectEngineer(['John Smith'])` |
| select customer "ABC Corp", "XYZ Ltd" | `selectCustomer(['ABC Corp', 'XYZ Ltd'])` |
| filter by customer "ABC Corp" | `selectCustomer(['ABC Corp'])` |
| select site "Main Office", "Branch 1" | `selectSite(['Main Office', 'Branch 1'])` |
| filter by site "Main Office" | `selectSite(['Main Office'])` |
| select ppm contract "PPM-001", "PPM-002" | `selectPPMContract(['PPM-001', 'PPM-002'])` |
| filter by ppm contract "PPM-001" | `selectPPMContract(['PPM-001'])` |
| **Filter - Date Range** | |
| set visit due date from "01/01/2026" to "31/03/2026" | `setVisitDueDateRange('01/01/2026', '31/03/2026')` |
| filter visit due date "01/01/2026" - "31/12/2026" | `setVisitDueDateRange('01/01/2026', '31/12/2026')` |
| get start date | `getStartDate()` |
| get end date | `getEndDate()` |
| **Filter - Actions** | |
| click reset filter | `clickResetFilter()` |
| reset filters | `clickResetFilter()` |
| click search | `clickSearch()` |
| search and wait | `searchAndWait(query)` |
| apply filters | `applyFilters(options)` |
| **Results** | |
| wait for data load | `waitForDataLoad()` |
| check is loading | `isLoading()` |
| check no results | `isNoResultsVisible()` |
| get row count | `getRowCount()` |
| click row 0 | `clickRowByIndex(0)` |
| click part "PN-001" | `clickPartByNumber('PN-001')` |
| get all visible items | `getAllVisibleItems()` |

### Sample Usage

```typescript
// Navigate to PPM Parts Required page
await ppmPartsRequiredPage.navigateToPPMPartsRequired();
await ppmPartsRequiredPage.assertPageLoaded();

// Search for parts by description
await ppmPartsRequiredPage.search('Filter Element');
await ppmPartsRequiredPage.searchAndWait();

// Filter by engineer and date range
await ppmPartsRequiredPage.selectEngineer(['John Smith']);
await ppmPartsRequiredPage.setVisitDueDateRange('01/01/2026', '30/06/2026');
await ppmPartsRequiredPage.clickSearch();
await ppmPartsRequiredPage.waitForDataLoad();

// Get all visible parts
const parts = await ppmPartsRequiredPage.getAllVisibleItems();
console.log(`Found ${parts.length} parts`);
```

### Typical Flow

```typescript
// Full PPM parts required flow
await ppmPartsRequiredPage.navigateToPPMPartsRequired();
await ppmPartsRequiredPage.assertPageLoaded();

// Apply filters
await ppmPartsRequiredPage.applyFilters({
  engineer: ['John Smith'],
  customer: ['ABC Corporation'],
  visitDueDateStart: '01/01/2026',
  visitDueDateEnd: '31/03/2026',
});

// Check results
const rowCount = await ppmPartsRequiredPage.getRowCount();
console.log(`Found ${rowCount} parts required`);

// Export data
await ppmPartsRequiredPage.clickExport();
```

---

# Purchasing Pages

## All Purchase Orders Page

### Page URL
- All Purchase Orders: `/PurchaseOrder`

### Target Class
```typescript
import { AllPurchaseOrdersPage, PurchaseOrderListItem, PurchaseOrderSearchOptions, PurchaseOrderTab } from './pages/Purchasing/AllPurchaseOrdersPage';

const allPurchaseOrdersPage = new AllPurchaseOrdersPage(page);
```

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (search, click, select, etc.)

### Page Structure

| Section | Elements |
|---------|----------|
| Header | Purchase Orders title, Create Stock PO button, Export button |
| Filter | Hide Filter button, Search textbox (PO Number / Job Number / Supplier Name / Account Number / Reference Number), PO Type(s) multiselect, Date Raised (Start/End), Show Advanced button, Reset Filter button, Search button |
| Tabs | All, Fully Delivered, Partially Delivered, Not Delivered, In Query, Not Applicable, Needs Approval, Partially Returned |
| Results | Results table, Loading message, No results message |
| Sidebar | PO Summary, PO Details (Supplier Name, Owner, Raised By, PO Type, Estimated Delivery, Account Number, Actual Delivery, Date Raised, Delivery Status, Status, Invoice Status), View Full Details button |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to all purchase orders | `navigateToAllPurchaseOrders()` |
| navigate to purchase orders | `navigateToAllPurchaseOrders()` |
| open purchase orders page | `navigateToAllPurchaseOrders()` |
| verify page loaded | `assertPageLoaded()` |
| click create stock po | `clickCreateStockPO()` |
| click export | `clickExport()` |
| **Tab Navigation** | |
| switch to all tab | `switchToTab('All')` |
| switch to fully delivered tab | `switchToTab('Fully Delivered')` |
| switch to partially delivered tab | `switchToTab('Partially Delivered')` |
| switch to not delivered tab | `switchToTab('Not Delivered')` |
| switch to in query tab | `switchToTab('In Query')` |
| switch to not applicable tab | `switchToTab('Not Applicable')` |
| switch to needs approval tab | `switchToTab('Needs Approval')` |
| switch to partially returned tab | `switchToTab('Partially Returned')` |
| **Filter** | |
| toggle filter | `toggleFilter()` |
| hide filter | `toggleFilter()` |
| search "PO-001" | `search('PO-001')` |
| find po "PO-001" | `search('PO-001')` |
| select po types "Stock", "Job" | `selectPOTypes(['Stock', 'Job'])` |
| set date raised from "01/01/2026" to "31/03/2026" | `setDateRaisedRange('01/01/2026', '31/03/2026')` |
| click show advanced | `clickShowAdvanced()` |
| click reset filter | `clickResetFilter()` |
| click search | `clickSearch()` |
| search and wait | `searchAndWait(query)` |
| apply filters | `applyFilters(options)` |
| **Results** | |
| wait for data load | `waitForDataLoad()` |
| check no results | `isNoResultsVisible()` |
| get row count | `getRowCount()` |
| click row 0 | `clickRowByIndex(0)` |
| click po "PO-001" | `clickPurchaseOrderByNumber('PO-001')` |
| **Sidebar** | |
| click view full details | `clickViewFullDetails()` |
| get sidebar supplier name | `getSidebarSupplierName()` |
| get sidebar po type | `getSidebarPOType()` |

### Sample Usage

```typescript
// Navigate and search purchase orders
await allPurchaseOrdersPage.navigateToAllPurchaseOrders();
await allPurchaseOrdersPage.assertPageLoaded();

// Switch to Not Delivered tab and filter
await allPurchaseOrdersPage.switchToTab('Not Delivered');
await allPurchaseOrdersPage.selectPOTypes(['Stock']);
await allPurchaseOrdersPage.searchAndWait('ABC Supplier');

// Click on PO and view details
await allPurchaseOrdersPage.clickPurchaseOrderByNumber('PO-001');
await allPurchaseOrdersPage.clickViewFullDetails();
```

---

## Create Stock PO Page

### Page URL
- Create Stock PO: `/PurchaseOrder/Create`

### Target Class
```typescript
import { CreateStockPOPage, StockPOFormData } from './pages/Purchasing/CreateStockPOPage';

const createStockPOPage = new CreateStockPOPage(page);
```

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (fill, select, click, etc.)

### Page Structure

| Section | Elements |
|---------|----------|
| Header | Add Stock Purchase Order title |
| Form | Stock Delivery Location combobox (required), Supplier combobox (required), Contact combobox, Account Number textbox, Estimated Delivery Date datepicker, Tag(s) multiselect |
| Address Sections | Location Address, Supplier Address, Contact Details |
| Actions | Cancel link, Save button |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to create stock po | `navigateToCreateStockPO()` |
| navigate to add stock po | `navigateToCreateStockPO()` |
| open create stock purchase order | `navigateToCreateStockPO()` |
| verify page loaded | `assertPageLoaded()` |
| **Form - Selection** | |
| select stock delivery location "Main Warehouse" | `selectStockDeliveryLocation('Main Warehouse')` |
| choose delivery location "Branch Stock" | `selectStockDeliveryLocation('Branch Stock')` |
| select supplier "ABC Supplier" | `selectSupplier('ABC Supplier')` |
| choose supplier "XYZ Parts" | `selectSupplier('XYZ Parts')` |
| click add supplier | `clickAddSupplier()` |
| select contact "John Smith" | `selectContact('John Smith')` |
| choose contact "Jane Doe" | `selectContact('Jane Doe')` |
| click add contact | `clickAddContact()` |
| **Form - Input** | |
| fill account number "ACC-001" | `fillAccountNumber('ACC-001')` |
| enter account number "ACC-002" | `fillAccountNumber('ACC-002')` |
| fill estimated delivery date "15/03/2026" | `fillEstimatedDeliveryDate('15/03/2026')` |
| set delivery date "20/03/2026" | `fillEstimatedDeliveryDate('20/03/2026')` |
| select tags "Urgent", "Priority" | `selectTags(['Urgent', 'Priority'])` |
| **Actions** | |
| click cancel | `clickCancel()` |
| click save | `clickSave()` |
| check is save enabled | `isSaveEnabled()` |
| **Combined** | |
| fill stock po form | `fillStockPOForm(data)` |
| create stock po | `createStockPO(data)` |
| **High-Level Creation** | |
| create new stock po | `createNewStockPO(data)` |
| add new stock po | `createNewStockPO(data)` |
| create a stock po | `createNewStockPO(data)` |
| add a stock po | `createNewStockPO(data)` |
| create stock purchase order | `createNewStockPO(data)` |
| add stock purchase order | `createNewStockPO(data)` |
| fill stock po form only | `fillNewStockPOForm(data)` |
| fill new stock po form | `fillNewStockPOForm(data)` |

### Sample Usage

```typescript
// Navigate to create stock PO page
await createStockPOPage.navigateToCreateStockPO();
await createStockPOPage.assertPageLoaded();

// Fill form and create
await createStockPOPage.createStockPO({
  stockDeliveryLocation: 'Main Warehouse',
  supplier: 'ABC Supplier',
  contact: 'John Smith',
  accountNumber: 'ACC-001',
  estimatedDeliveryDate: '15/03/2026',
  tags: ['Urgent'],
});
```

### Data Builder Pattern (Recommended)

```typescript
import { StockPOBuilder, generateAccountNumber } from '../../data/testData/stockPO.data';

// Navigate first, then create
await createStockPOPage.navigateToCreateStockPO();

// Simple stock PO with builder
await createStockPOPage.createNewStockPO(
  StockPOBuilder.create('Main Warehouse', 'ABC Supplier').build()
);

// Stock PO with more details using fluent API
await createStockPOPage.createNewStockPO(
  StockPOBuilder.create('Main Warehouse', 'ABC Supplier')
    .contact('John Smith')
    .accountNumber('ACC-001')
    .estimatedDeliveryDate('31/12/2024')
    .tags(['Urgent', 'Priority'])
    .build()
);

// Generate unique account number
await createStockPOPage.createNewStockPO(
  StockPOBuilder.create('Main Warehouse', 'ABC Supplier')
    .accountNumber(generateAccountNumber())
    .build()
);

// Fill form only (without saving)
await createStockPOPage.fillNewStockPOForm(
  StockPOBuilder.create('Main Warehouse', 'ABC Supplier')
    .contact('John Smith')
    .build()
);
```

#### StockPOBuilder Methods

| Method | Description |
|--------|-------------|
| `.create(stockDeliveryLocation, supplier)` | Create builder with required fields |
| `.contact(string)` | Set contact |
| `.accountNumber(string)` | Set account number |
| `.estimatedDeliveryDate(string)` | Set estimated delivery date |
| `.tags(string[])` | Set tags |
| `.build()` | Build StockPOData object |

### High-Level Methods (CreateStockPOPage)

| Method | Parameters | Description |
|--------|------------|-------------|
| `createNewStockPO(data)` | `data: StockPOData` | Fill form and save stock PO |
| `fillNewStockPOForm(data)` | `data: StockPOData` | Fill form only (does not save) |
| `createStockPO(data)` | `data: StockPOFormData` | Legacy method - fill and save |

---

## Create Stock Reorder Page

### Page URL
- Create Stock Reorder: `/StockPurchaseOrder/AutoStockReorder`

### Target Class
```typescript
import { CreateStockReorderPage, StockReorderItem, StockReorderSearchOptions } from './pages/Purchasing/CreateStockReorderPage';

const createStockReorderPage = new CreateStockReorderPage(page);
```

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (search, select, click, etc.)

### Page Structure

| Section | Elements |
|---------|----------|
| Header | Create Stock Reorder title |
| Steps | Step 1: Select Stock to Reorder, Step 2: Supplier Information |
| Step 1 Filter | Search Stock Records textbox (Number / Description / Reference), Location(s) multiselect, Reset Filter button, Search button |
| Step 1 Stock List | Stock List heading, Show selected only toggle, Stock table with checkboxes |
| Navigation | Cancel button, Next button (Step 1), Back button (Step 2), Create PO button (Step 2) |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to create stock reorder | `navigateToCreateStockReorder()` |
| navigate to stock reorder | `navigateToCreateStockReorder()` |
| open auto stock reorder | `navigateToCreateStockReorder()` |
| verify page loaded | `assertPageLoaded()` |
| **Filter** | |
| search stock "STK-001" | `searchStock('STK-001')` |
| find stock "Filter Element" | `searchStock('Filter Element')` |
| select locations "Main Warehouse", "Branch Stock" | `selectLocations(['Main Warehouse', 'Branch Stock'])` |
| click reset filter | `clickResetFilter()` |
| click search | `clickSearch()` |
| search and wait | `searchAndWait(options)` |
| **Stock List** | |
| wait for data load | `waitForDataLoad()` |
| check no results | `isNoResultsVisible()` |
| get stock row count | `getStockRowCount()` |
| toggle show selected only | `toggleShowSelectedOnly()` |
| select stock at row 0 | `selectStockByIndex(0)` |
| deselect stock at row 0 | `deselectStockByIndex(0)` |
| **Navigation** | |
| click cancel | `clickCancel()` |
| click next | `clickNext()` |
| check is next enabled | `isNextEnabled()` |
| click back | `clickBack()` |
| click create po | `clickCreatePO()` |
| **Combined** | |
| select stocks and proceed | `selectStocksAndProceed(indices)` |
| **High-Level Creation** | |
| create new stock reorder | `createNewStockReorder(data)` |
| add new stock reorder | `createNewStockReorder(data)` |
| create a stock reorder | `createNewStockReorder(data)` |
| add a stock reorder | `createNewStockReorder(data)` |
| create stock reorder | `createNewStockReorder(data)` |
| add stock reorder | `createNewStockReorder(data)` |
| fill stock reorder form only | `fillNewStockReorderForm(data)` |
| fill new stock reorder form | `fillNewStockReorderForm(data)` |

### Sample Usage

```typescript
// Navigate to create stock reorder page
await createStockReorderPage.navigateToCreateStockReorder();
await createStockReorderPage.assertPageLoaded();

// Search for stock and select
await createStockReorderPage.selectLocations(['Main Warehouse']);
await createStockReorderPage.searchStock('Filter Element');
await createStockReorderPage.clickSearch();
await createStockReorderPage.waitForDataLoad();

// Select stocks and proceed to next step
await createStockReorderPage.selectStocksAndProceed([0, 1, 2]);
```

### Data Builder Pattern (Recommended)

```typescript
import { StockReorderBuilder } from '../../data/testData/stockReorder.data';

// Navigate first, then create
await createStockReorderPage.navigateToCreateStockReorder();

// Simple stock reorder with builder (select first 3 items)
await createStockReorderPage.createNewStockReorder(
  StockReorderBuilder.create([0, 1, 2]).build()
);

// Stock reorder with search filter using fluent API
await createStockReorderPage.createNewStockReorder(
  StockReorderBuilder.create([0, 1])
    .withSearchQuery('Widget')
    .withLocations(['Main Warehouse', 'Branch Stock'])
    .build()
);

// Fill form only (without proceeding to next step)
await createStockReorderPage.fillNewStockReorderForm(
  StockReorderBuilder.create([0, 1, 2])
    .withLocations(['Main Warehouse'])
    .build()
);
```

#### StockReorderBuilder Methods

| Method | Description |
|--------|-------------|
| `.create(stockIndices)` | Create builder with required fields (array of row indices to select) |
| `.withSearchQuery(string)` | Add search query filter |
| `.withLocations(string[])` | Add locations filter |
| `.withAdditionalIndices(number[])` | Add additional stock indices to select |
| `.build()` | Build StockReorderData object |

### High-Level Methods (CreateStockReorderPage)

| Method | Parameters | Description |
|--------|------------|-------------|
| `createNewStockReorder(data)` | `data: StockReorderData` | Search, select stocks and proceed to next step |
| `fillNewStockReorderForm(data)` | `data: StockReorderData` | Search and select stocks only (does not proceed) |
| `selectStocksAndProceed(indices)` | `indices: number[]` | Legacy method - select by indices and proceed |

---

## Contract Purchase Orders Page

### Page URL
- Contract Purchase Orders: `/ContractPurchaseOrder`

### Target Class
```typescript
import { ContractPurchaseOrdersPage, ContractPOListItem, ContractPOSearchOptions, ContractPOTab } from './pages/Purchasing/ContractPurchaseOrdersPage';

const contractPurchaseOrdersPage = new ContractPurchaseOrdersPage(page);
```

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (search, click, select, etc.)

### Page Structure

| Section | Elements |
|---------|----------|
| Header | Contract Purchase Orders title, Create Contract PO button, Export button |
| Filter | Hide Filter button, Search textbox (PO Number / Subcontractor Name / Account Number), Date Raised (Start/End), Show Advanced button, Reset Filter button, Search button |
| Tabs | All, Fully Completed, Not Completed |
| Results | Results table, Loading message, No results message |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to contract purchase orders | `navigateToContractPurchaseOrders()` |
| navigate to contract po | `navigateToContractPurchaseOrders()` |
| open contract purchase orders page | `navigateToContractPurchaseOrders()` |
| verify page loaded | `assertPageLoaded()` |
| click create contract po | `clickCreateContractPO()` |
| click export | `clickExport()` |
| **Tab Navigation** | |
| switch to all tab | `switchToTab('All')` |
| switch to fully completed tab | `switchToTab('Fully Completed')` |
| switch to not completed tab | `switchToTab('Not Completed')` |
| **Filter** | |
| toggle filter | `toggleFilter()` |
| hide filter | `toggleFilter()` |
| search "CPO-001" | `search('CPO-001')` |
| find contract po "CPO-001" | `search('CPO-001')` |
| set date raised from "01/01/2026" to "31/03/2026" | `setDateRaisedRange('01/01/2026', '31/03/2026')` |
| click show advanced | `clickShowAdvanced()` |
| click reset filter | `clickResetFilter()` |
| click search | `clickSearch()` |
| search and wait | `searchAndWait(query)` |
| apply filters | `applyFilters(options)` |
| **Results** | |
| wait for data load | `waitForDataLoad()` |
| check no results | `isNoResultsVisible()` |
| get row count | `getRowCount()` |
| click row 0 | `clickRowByIndex(0)` |
| click contract po "CPO-001" | `clickContractPOByNumber('CPO-001')` |

### Sample Usage

```typescript
// Navigate and search contract purchase orders
await contractPurchaseOrdersPage.navigateToContractPurchaseOrders();
await contractPurchaseOrdersPage.assertPageLoaded();

// Switch to Not Completed tab and filter
await contractPurchaseOrdersPage.switchToTab('Not Completed');
await contractPurchaseOrdersPage.setDateRaisedRange('01/01/2026', '31/03/2026');
await contractPurchaseOrdersPage.searchAndWait('ABC Subcontractor');

// Click on contract PO
await contractPurchaseOrdersPage.clickContractPOByNumber('CPO-001');
```

---

## Subcontractor PO Page

### Page URL
- Subcontractor PO: `/SubContractorPO`

### Target Class
```typescript
import { SubcontractorPOPage, SubcontractorPOListItem, SubcontractorPOSearchOptions, SubcontractorPOTab } from './pages/Purchasing/SubcontractorPOPage';

const subcontractorPOPage = new SubcontractorPOPage(page);
```

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (search, click, select, etc.)

### Page Structure

| Section | Elements |
|---------|----------|
| Header | Subcontractor Purchase Orders title, Export button |
| Filter | Hide Filter button, Search textbox (PO Number / Job Number / Subcontractor Name / Account Number / Reference Number), Date Raised (Start/End), Show Advanced button, Reset Filter button, Search button, Filters Applied indicator |
| Tabs | All, Fully Completed, Partially Completed, Not Completed, Not Applicable, Needs Approval |
| Results | Results table, Loading message, No results message |
| Sidebar | Sub Contractor PO Summary (Job Number), PO Details (Subcontractor Name, Owner, Raised By, PO Type, Estimated Delivery, Account Number, Actual Delivery, Date Raised, Delivery Status, Status, Invoice Status), View Full Details button |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to subcontractor po | `navigateToSubcontractorPO()` |
| navigate to subcontractor purchase orders | `navigateToSubcontractorPO()` |
| open subcontractor po page | `navigateToSubcontractorPO()` |
| verify page loaded | `assertPageLoaded()` |
| click export | `clickExport()` |
| **Tab Navigation** | |
| switch to all tab | `switchToTab('All')` |
| switch to fully completed tab | `switchToTab('Fully Completed')` |
| switch to partially completed tab | `switchToTab('Partially Completed')` |
| switch to not completed tab | `switchToTab('Not Completed')` |
| switch to not applicable tab | `switchToTab('Not Applicable')` |
| switch to needs approval tab | `switchToTab('Needs Approval')` |
| **Filter** | |
| toggle filter | `toggleFilter()` |
| hide filter | `toggleFilter()` |
| search "SPO-001" | `search('SPO-001')` |
| find subcontractor po "SPO-001" | `search('SPO-001')` |
| set date raised from "01/01/2026" to "31/03/2026" | `setDateRaisedRange('01/01/2026', '31/03/2026')` |
| click show advanced | `clickShowAdvanced()` |
| click reset filter | `clickResetFilter()` |
| click search | `clickSearch()` |
| check filters applied | `isFiltersApplied()` |
| search and wait | `searchAndWait(query)` |
| apply filters | `applyFilters(options)` |
| **Results** | |
| wait for data load | `waitForDataLoad()` |
| check no results | `isNoResultsVisible()` |
| get row count | `getRowCount()` |
| click row 0 | `clickRowByIndex(0)` |
| click subcontractor po "SPO-001" | `clickSubcontractorPOByNumber('SPO-001')` |
| **Sidebar** | |
| click view full details | `clickViewFullDetails()` |
| get sidebar job number | `getSidebarJobNumber()` |
| get sidebar subcontractor name | `getSidebarSubcontractorName()` |

### Sample Usage

```typescript
// Navigate and search subcontractor POs
await subcontractorPOPage.navigateToSubcontractorPO();
await subcontractorPOPage.assertPageLoaded();

// Switch to Needs Approval tab and filter
await subcontractorPOPage.switchToTab('Needs Approval');
await subcontractorPOPage.setDateRaisedRange('01/01/2026', '31/03/2026');
await subcontractorPOPage.searchAndWait('ABC Subcontractor');

// Click on PO and view details
await subcontractorPOPage.clickSubcontractorPOByNumber('SPO-001');
const jobNumber = await subcontractorPOPage.getSidebarJobNumber();
await subcontractorPOPage.clickViewFullDetails();
```

---

## All Purchase Invoices Page

### Page URL
- All Purchase Invoices: `/PurchaseInvoice`

### Target Class
```typescript
import { AllPurchaseInvoicesPage, PurchaseInvoiceListItem, PurchaseInvoiceSearchOptions, PurchaseInvoiceTab } from './pages/Purchasing/AllPurchaseInvoicesPage';

const allPurchaseInvoicesPage = new AllPurchaseInvoicesPage(page);
```

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (search, click, select, etc.)

### Page Structure

| Section | Elements |
|---------|----------|
| Header | Purchase Invoices title |
| Filter | Search textbox (Invoice Number / Supplier Name / PO Number / Reference / Job Number), Date Raised (Start/End DD/MM/YYYY), Reset Filter button, Search button |
| Tabs | Stock Purchase Invoices, Job Purchase Invoices, Subcontractor Purchase Invoices |
| Results | Results table, Loading message, No results message |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to all purchase invoices | `navigateToAllPurchaseInvoices()` |
| navigate to purchase invoices | `navigateToAllPurchaseInvoices()` |
| open purchase invoices page | `navigateToAllPurchaseInvoices()` |
| verify page loaded | `assertPageLoaded()` |
| **Tab Navigation** | |
| switch to stock purchase invoices tab | `switchToTab('Stock Purchase Invoices')` |
| click stock invoices tab | `switchToTab('Stock Purchase Invoices')` |
| switch to job purchase invoices tab | `switchToTab('Job Purchase Invoices')` |
| click job invoices tab | `switchToTab('Job Purchase Invoices')` |
| switch to subcontractor purchase invoices tab | `switchToTab('Subcontractor Purchase Invoices')` |
| click subcontractor invoices tab | `switchToTab('Subcontractor Purchase Invoices')` |
| **Filter** | |
| search "INV-001" | `search('INV-001')` |
| find invoice "INV-001" | `search('INV-001')` |
| set date raised from "01/01/2026" to "31/03/2026" | `setDateRaisedRange('01/01/2026', '31/03/2026')` |
| click reset filter | `clickResetFilter()` |
| click search | `clickSearch()` |
| search and wait | `searchAndWait(query)` |
| apply filters | `applyFilters(options)` |
| **Results** | |
| wait for data load | `waitForDataLoad()` |
| check no results | `isNoResultsVisible()` |
| get row count | `getRowCount()` |
| click row 0 | `clickRowByIndex(0)` |
| click invoice "INV-001" | `clickInvoiceByNumber('INV-001')` |

### Sample Usage

```typescript
// Navigate and search purchase invoices
await allPurchaseInvoicesPage.navigateToAllPurchaseInvoices();
await allPurchaseInvoicesPage.assertPageLoaded();

// Switch to Job Purchase Invoices tab
await allPurchaseInvoicesPage.switchToTab('Job Purchase Invoices');

// Filter by date and search
await allPurchaseInvoicesPage.setDateRaisedRange('01/01/2026', '31/03/2026');
await allPurchaseInvoicesPage.searchAndWait('ABC Supplier');

// Click on invoice
await allPurchaseInvoicesPage.clickInvoiceByNumber('INV-001');
```

### Typical Flow

```typescript
// Full purchase invoices review flow
await allPurchaseInvoicesPage.navigateToAllPurchaseInvoices();
await allPurchaseInvoicesPage.assertPageLoaded();

// Review each invoice type
for (const tab of ['Stock Purchase Invoices', 'Job Purchase Invoices', 'Subcontractor Purchase Invoices'] as const) {
  await allPurchaseInvoicesPage.switchToTab(tab);
  await allPurchaseInvoicesPage.applyFilters({
    dateRaisedStart: '01/01/2026',
    dateRaisedEnd: '31/03/2026',
  });
  const count = await allPurchaseInvoicesPage.getRowCount();
  console.log(`${tab}: ${count} invoices`);
}
```

---

# Reports Pages

## Dynamic Reports Page

### Page URL
- Dynamic Reports: `/Report`

### Target Class
```typescript
import { DynamicReportsPage, ReportItem, ReportSearchOptions, ReportTab } from './pages/Reports/DynamicReportsPage';

const dynamicReportsPage = new DynamicReportsPage(page);
```

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (search, click, select, etc.)

### Page Structure

| Section | Elements |
|---------|----------|
| Header | Reports title, Create Dynamic Dashboard button |
| Description | Informational text about reports |
| Filter | Category dropdown (multiselect), Search textbox (Enter search term / ref. No., etc...), Schedule Status, Reset Filter button, Search button |
| Tabs | All Reports (count), Favourite Reports (count), Dynamic Dashboard (count) |
| Results | Reports list/grid, No results message, Pagination |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to dynamic reports | `navigateToDynamicReports()` |
| navigate to reports | `navigateToDynamicReports()` |
| open reports page | `navigateToDynamicReports()` |
| verify page loaded | `assertPageLoaded()` |
| click create dynamic dashboard | `clickCreateDynamicDashboard()` |
| **Tab Navigation** | |
| switch to all reports tab | `switchToTab('All Reports')` |
| click all reports tab | `switchToTab('All Reports')` |
| switch to favourite reports tab | `switchToTab('Favourite Reports')` |
| click favourite reports tab | `switchToTab('Favourite Reports')` |
| switch to dynamic dashboard tab | `switchToTab('Dynamic Dashboard')` |
| click dynamic dashboard tab | `switchToTab('Dynamic Dashboard')` |
| get all reports count | `getTabCount('All Reports')` |
| get favourite reports count | `getTabCount('Favourite Reports')` |
| **Filter** | |
| select categories "Jobs", "Invoices" | `selectCategories(['Jobs', 'Invoices'])` |
| filter by category "Jobs" | `selectCategories(['Jobs'])` |
| search "monthly report" | `search('monthly report')` |
| find report "ABC" | `search('ABC')` |
| click reset filter | `clickResetFilter()` |
| reset filters | `clickResetFilter()` |
| click search | `clickSearch()` |
| search and wait | `searchAndWait(query)` |
| apply filters | `applyFilters(options)` |
| **Results** | |
| wait for data load | `waitForDataLoad()` |
| check no results | `isNoResultsVisible()` |
| click report "Monthly Job Report" | `clickReportByName('Monthly Job Report')` |
| toggle favourite "Monthly Job Report" | `toggleFavourite('Monthly Job Report')` |

### Sample Usage

```typescript
// Navigate and search reports
await dynamicReportsPage.navigateToDynamicReports();
await dynamicReportsPage.assertPageLoaded();

// Switch to Favourite Reports tab
await dynamicReportsPage.switchToTab('Favourite Reports');

// Search for specific report
await dynamicReportsPage.selectCategories(['Jobs', 'Invoices']);
await dynamicReportsPage.searchAndWait('monthly');

// Click on a report
await dynamicReportsPage.clickReportByName('Monthly Job Report');
```

### Typical Flow

```typescript
// Full reports exploration flow
await dynamicReportsPage.navigateToDynamicReports();
await dynamicReportsPage.assertPageLoaded();

// Get counts for each tab
const allCount = await dynamicReportsPage.getTabCount('All Reports');
const favCount = await dynamicReportsPage.getTabCount('Favourite Reports');
console.log(`All Reports: ${allCount}, Favourites: ${favCount}`);

// Search and filter reports
await dynamicReportsPage.applyFilters({
  categories: ['Jobs'],
  query: 'monthly',
});

// Toggle favourite for a report
await dynamicReportsPage.toggleFavourite('Monthly Job Summary');
```

---

## External Links and Dashboards Page

### Page URL
- External Links: `/Report/ExternalLinkAndDashboard`

### Target Class
```typescript
import { ExternalLinksPage, ExternalLinkItem, ExternalLinkSearchOptions, ExternalLinkTab } from './pages/Reports/ExternalLinksPage';

const externalLinksPage = new ExternalLinksPage(page);
```

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (search, click, select, etc.)

### Page Structure

| Section | Elements |
|---------|----------|
| Header | External Links and Dashboards title, Add Link button |
| Description | Informational text about external links |
| Filter | Search Link textbox (Link Title), Added By dropdown (multiselect), Added On date range (Start/End), Link Type dropdown (multiselect), Source dropdown (multiselect), Reset Filter button, Search button |
| Tabs | All Links (count), Favourite (count) |
| Results | Links list, No results message |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to external links | `navigateToExternalLinks()` |
| navigate to external dashboards | `navigateToExternalLinks()` |
| open external links page | `navigateToExternalLinks()` |
| verify page loaded | `assertPageLoaded()` |
| click add link | `clickAddLink()` |
| **Tab Navigation** | |
| switch to all links tab | `switchToTab('All Links')` |
| click all links tab | `switchToTab('All Links')` |
| switch to favourite tab | `switchToTab('Favourite')` |
| click favourite tab | `switchToTab('Favourite')` |
| get all links count | `getTabCount('All Links')` |
| get favourite count | `getTabCount('Favourite')` |
| **Filter - Search** | |
| search link title "Dashboard" | `searchLinkTitle('Dashboard')` |
| find link "Power BI" | `searchLinkTitle('Power BI')` |
| **Filter - Selection** | |
| select added by "John Smith", "Jane Doe" | `selectAddedBy(['John Smith', 'Jane Doe'])` |
| filter by added by "John Smith" | `selectAddedBy(['John Smith'])` |
| select link type "External", "Dashboard" | `selectLinkType(['External', 'Dashboard'])` |
| filter by link type "External" | `selectLinkType(['External'])` |
| select source "Power BI", "Tableau" | `selectSource(['Power BI', 'Tableau'])` |
| filter by source "Power BI" | `selectSource(['Power BI'])` |
| **Filter - Date Range** | |
| set added on from "01/01/2026" to "31/03/2026" | `setAddedOnRange('01/01/2026', '31/03/2026')` |
| filter added on "01/01/2026" - "31/12/2026" | `setAddedOnRange('01/01/2026', '31/12/2026')` |
| **Filter - Actions** | |
| click reset filter | `clickResetFilter()` |
| reset filters | `clickResetFilter()` |
| click search | `clickSearch()` |
| search and wait | `searchAndWait(title)` |
| apply filters | `applyFilters(options)` |
| **Results** | |
| wait for data load | `waitForDataLoad()` |
| check no results | `isNoResultsVisible()` |
| click link "Power BI Dashboard" | `clickLinkByTitle('Power BI Dashboard')` |
| toggle favourite "Power BI Dashboard" | `toggleFavourite('Power BI Dashboard')` |

### Sample Usage

```typescript
// Navigate and search external links
await externalLinksPage.navigateToExternalLinks();
await externalLinksPage.assertPageLoaded();

// Switch to Favourite tab
await externalLinksPage.switchToTab('Favourite');

// Search for specific link
await externalLinksPage.searchLinkTitle('Dashboard');
await externalLinksPage.clickSearch();
await externalLinksPage.waitForDataLoad();

// Click on a link
await externalLinksPage.clickLinkByTitle('Power BI Dashboard');
```

### Typical Flow

```typescript
// Full external links management flow
await externalLinksPage.navigateToExternalLinks();
await externalLinksPage.assertPageLoaded();

// Get counts for each tab
const allCount = await externalLinksPage.getTabCount('All Links');
const favCount = await externalLinksPage.getTabCount('Favourite');
console.log(`All Links: ${allCount}, Favourites: ${favCount}`);

// Apply filters
await externalLinksPage.applyFilters({
  addedBy: ['John Smith'],
  addedOnStart: '01/01/2026',
  addedOnEnd: '31/03/2026',
  linkType: ['Dashboard'],
});

// Add new link
await externalLinksPage.clickAddLink();
```


---

# Engineers Pages

This section covers the Engineers sidebar menu pages.

## EngineersListPage

**URL:** `/Staff/Engineers`

**Sidebar Path:** Engineers > Engineers List

### Page Elements

| Section | Elements |
|---------|----------|
| Header | Engineers title, Add Engineer button, Engineer Teams button |
| Filter | Search/Filter textbox, Search button |
| Results | Engineers table, No results message, Pagination |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to engineers | `navigateToEngineersList()` |
| open engineers list | `navigateToEngineersList()` |
| navigate to staff engineers | `navigateToEngineersList()` |
| verify page loaded | `assertPageLoaded()` |
| **Actions** | |
| click add engineer | `clickAddEngineer()` |
| add new engineer | `clickAddEngineer()` |
| click engineer teams | `clickEngineerTeams()` |
| manage engineer teams | `clickEngineerTeams()` |
| **Search** | |
| search "John Smith" | `search('John Smith')` |
| filter engineers "John" | `search('John')` |
| click search | `clickSearch()` |
| search and wait "John" | `searchAndWait('John')` |
| **Results** | |
| get row count | `getRowCount()` |
| click engineer "John Smith" | `clickEngineerByName('John Smith')` |
| wait for data | `waitForDataLoad()` |

### Sample Usage

```typescript
await engineersListPage.navigateToEngineersList();
await engineersListPage.assertPageLoaded();
await engineersListPage.searchAndWait('John Smith');
await engineersListPage.clickEngineerByName('John Smith');
```

---

## NonJobExpensesPage

**URL:** `/NonJobExpense`

**Sidebar Path:** Engineers > Non Job Expenses

### Page Elements

| Section | Elements |
|---------|----------|
| Header | Non Job Expenses title, Add Non Job Expense button, Print button, Export button |
| Filter | Search textbox, Date Incurred range (Start/End), Date Raised range (Start/End), Engineer dropdown, Expense Type dropdown, Reset Filter button, Search button |
| Results | Expenses table, No results message, Pagination |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to non job expenses | `navigateToNonJobExpenses()` |
| open non-job expenses | `navigateToNonJobExpenses()` |
| navigate to expenses | `navigateToNonJobExpenses()` |
| verify page loaded | `assertPageLoaded()` |
| **Actions** | |
| click add non job expense | `clickAddNonJobExpense()` |
| add new expense | `clickAddNonJobExpense()` |
| click print | `clickPrint()` |
| click export | `clickExport()` |
| **Filter** | |
| search "Fuel" | `search('Fuel')` |
| set date incurred "01/01/2026" to "31/03/2026" | `setDateIncurred('01/01/2026', '31/03/2026')` |
| filter date raised "01/01/2026" - "31/12/2026" | `setDateRaised('01/01/2026', '31/12/2026')` |
| select engineer "John Smith" | `selectEngineer(['John Smith'])` |
| select expense type "Fuel", "Travel" | `selectExpenseType(['Fuel', 'Travel'])` |
| reset filters | `clickResetFilter()` |
| click search | `clickSearch()` |
| apply filters | `applyFilters(options)` |
| **Results** | |
| get row count | `getRowCount()` |
| click row 0 | `clickRowByIndex(0)` |
| wait for data | `waitForDataLoad()` |

### Sample Usage

```typescript
await nonJobExpensesPage.navigateToNonJobExpenses();
await nonJobExpensesPage.assertPageLoaded();
await nonJobExpensesPage.applyFilters({
  engineer: ['John Smith'],
  dateIncurredStart: '01/01/2026',
  dateIncurredEnd: '31/03/2026',
  expenseType: ['Fuel'],
});
```

---

## NonProductiveTimePage

**URL:** `/NonProductiveTime`

**Sidebar Path:** Engineers > All Non-Productive Time

### Page Elements

| Section | Elements |
|---------|----------|
| Header | Non-Productive Time title, Add Non-Productive Time button, Print button, Export button |
| Filter | Search textbox, Engineer dropdown (multiselect), Date range (Start/End), Type dropdown (multiselect), Reset Filter button, Search button |
| Results | Time entries table, No results message, Pagination |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to non-productive time | `navigateToNonProductiveTime()` |
| open all non-productive time | `navigateToNonProductiveTime()` |
| navigate to non productive time | `navigateToNonProductiveTime()` |
| verify page loaded | `assertPageLoaded()` |
| **Actions** | |
| click add non-productive time | `clickAddNonProductiveTime()` |
| add new non-productive time | `clickAddNonProductiveTime()` |
| click print | `clickPrint()` |
| click export | `clickExport()` |
| **Filter** | |
| search "Holiday" | `search('Holiday')` |
| select engineer "John Smith", "Jane Doe" | `selectEngineer(['John Smith', 'Jane Doe'])` |
| set date range "01/01/2026" to "31/03/2026" | `setDateRange('01/01/2026', '31/03/2026')` |
| select type "Holiday", "Sick Leave" | `selectType(['Holiday', 'Sick Leave'])` |
| reset filters | `clickResetFilter()` |
| click search | `clickSearch()` |
| search and wait "Holiday" | `searchAndWait('Holiday')` |
| apply filters | `applyFilters(options)` |
| **Results** | |
| get row count | `getRowCount()` |
| click row 0 | `clickRowByIndex(0)` |
| wait for data | `waitForDataLoad()` |

### Sample Usage

```typescript
await nonProductiveTimePage.navigateToNonProductiveTime();
await nonProductiveTimePage.assertPageLoaded();
await nonProductiveTimePage.applyFilters({
  engineer: ['John Smith'],
  dateStart: '01/01/2026',
  dateEnd: '31/03/2026',
  type: ['Holiday'],
});
```

---

## ViewPlannerPage

**URL:** `/Scheduler`

**Sidebar Path:** Engineers > View Planner

### Page Elements

| Section | Elements |
|---------|----------|
| Header | View Planner title, Filters button |
| Actions | Log Job button, Book Non Productive Time button, Batch Move button, Batch Deploy button |
| View Controls | Day/Week/Month view switcher, Today button, Previous/Next navigation, Planner/Schedule/Jobs display type |
| Main Content | Calendar/Planner view with engineer schedules |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to view planner | `navigateToViewPlanner()` |
| open scheduler | `navigateToViewPlanner()` |
| navigate to planner | `navigateToViewPlanner()` |
| verify page loaded | `assertPageLoaded()` |
| **Actions** | |
| click filters | `clickFilters()` |
| open filters | `clickFilters()` |
| click log job | `clickLogJob()` |
| log new job | `clickLogJob()` |
| click book non productive time | `clickBookNonProductiveTime()` |
| book time | `clickBookNonProductiveTime()` |
| click batch move | `clickBatchMove()` |
| click batch deploy | `clickBatchDeploy()` |
| **View Controls** | |
| switch to day view | `switchToView('Day')` |
| switch to week view | `switchToView('Week')` |
| switch to month view | `switchToView('Month')` |
| click today | `clickToday()` |
| go to previous | `goToPrevious()` |
| go to next | `goToNext()` |
| **Display Type** | |
| switch to planner display | `switchToDisplayType('Planner')` |
| switch to schedule display | `switchToDisplayType('Schedule')` |
| switch to jobs display | `switchToDisplayType('Jobs')` |

### Sample Usage

```typescript
await viewPlannerPage.navigateToViewPlanner();
await viewPlannerPage.assertPageLoaded();
await viewPlannerPage.switchToView('Week');
await viewPlannerPage.switchToDisplayType('Planner');
await viewPlannerPage.clickFilters();
```

### Typical Flow

```typescript
// View engineer schedules for the week
await viewPlannerPage.navigateToViewPlanner();
await viewPlannerPage.switchToView('Week');
await viewPlannerPage.clickFilters();
// Select specific engineers in filter panel

// Log a new job from planner
await viewPlannerPage.clickLogJob();
```

---

## TimesheetsPage

**URL:** `/Timesheet`

**Sidebar Path:** Engineers > Timesheets

### Page Elements

| Section | Elements |
|---------|----------|
| Header | Timesheets title |
| Filter | Engineer search, Include Team Members checkbox |
| View Controls | Day/Week/Month view switcher, Date input, Previous/Next navigation |
| Actions | Add Time button, Export button |
| Main Content | Timesheet grid with hours by date |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to timesheets | `navigateToTimesheets()` |
| open timesheet | `navigateToTimesheets()` |
| navigate to timesheets | `navigateToTimesheets()` |
| verify page loaded | `assertPageLoaded()` |
| **Filter** | |
| search engineer "John Smith" | `searchEngineer('John Smith')` |
| find engineer "John" | `searchEngineer('John')` |
| toggle include team members | `toggleIncludeTeamMembers()` |
| check include team members | `setIncludeTeamMembers(true)` |
| uncheck include team members | `setIncludeTeamMembers(false)` |
| **Actions** | |
| click add time | `clickAddTime()` |
| add new time entry | `clickAddTime()` |
| click export | `clickExport()` |
| export timesheet | `clickExport()` |
| **View Controls** | |
| switch to day view | `switchToView('Day')` |
| switch to week view | `switchToView('Week')` |
| switch to month view | `switchToView('Month')` |
| set date "15/01/2026" | `setDate('15/01/2026')` |
| go to previous | `goToPrevious()` |
| go to next | `goToNext()` |

### Sample Usage

```typescript
await timesheetsPage.navigateToTimesheets();
await timesheetsPage.assertPageLoaded();
await timesheetsPage.searchEngineer('John Smith');
await timesheetsPage.switchToView('Week');
await timesheetsPage.clickAddTime();
```

---

## RouteSchedulePage

**URL:** `/EngineerTracking/RouteSchedule`

**Sidebar Path:** Engineers > Route Schedule

### Page Elements

| Section | Elements |
|---------|----------|
| Header | Route Schedule title |
| Filter | Engineer dropdown, Date picker, Search button |
| Main Content | Map view with route visualization |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to route schedule | `navigateToRouteSchedule()` |
| open route schedule | `navigateToRouteSchedule()` |
| navigate to engineer route | `navigateToRouteSchedule()` |
| verify page loaded | `assertPageLoaded()` |
| **Filter** | |
| select engineer "John Smith" | `selectEngineer('John Smith')` |
| choose engineer "John" | `selectEngineer('John')` |
| set date "15/01/2026" | `setDate('15/01/2026')` |
| search route schedule | `searchRouteSchedule()` |
| wait for data | `waitForDataLoad()` |

### Sample Usage

```typescript
await routeSchedulePage.navigateToRouteSchedule();
await routeSchedulePage.assertPageLoaded();
await routeSchedulePage.selectEngineer('John Smith');
await routeSchedulePage.setDate('15/01/2026');
await routeSchedulePage.searchRouteSchedule();
await routeSchedulePage.waitForDataLoad();
```

---

## LiveTrackingPage

**URL:** `/EngineerTracking/Live`

**Sidebar Path:** Engineers > Live Tracking

### Page Elements

| Section | Elements |
|---------|----------|
| Header | Live Tracking title |
| Controls | Time Range button, Auto Refresh button, Manage Settings button |
| Main Content | Map view with real-time engineer locations |
| Dialog | Tracking consent/settings dialog |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to live tracking | `navigateToLiveTracking()` |
| open live tracking | `navigateToLiveTracking()` |
| navigate to engineer tracking | `navigateToLiveTracking()` |
| verify page loaded | `assertPageLoaded()` |
| **Controls** | |
| click time range | `clickTimeRange()` |
| select time range | `clickTimeRange()` |
| click auto refresh | `clickAutoRefresh()` |
| toggle auto refresh | `clickAutoRefresh()` |
| click manage settings | `clickManageSettings()` |
| open tracking settings | `clickManageSettings()` |
| **Dialog** | |
| check tracking dialog visible | `isTrackingDialogVisible()` |
| close tracking dialog | `closeTrackingDialog()` |

### Sample Usage

```typescript
await liveTrackingPage.navigateToLiveTracking();
await liveTrackingPage.assertPageLoaded();

// Handle tracking consent dialog if present
if (await liveTrackingPage.isTrackingDialogVisible()) {
  await liveTrackingPage.closeTrackingDialog();
}

await liveTrackingPage.clickManageSettings();
```

---

## HistoricalTrackingPage

**URL:** `/EngineerTracking/Historical`

**Sidebar Path:** Engineers > Historical Tracking

### Page Elements

| Section | Elements |
|---------|----------|
| Header | Historical Tracking title |
| Filter | Engineer dropdown, Date picker, Search button |
| Main Content | Map view with historical route visualization |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to historical tracking | `navigateToHistoricalTracking()` |
| open historical tracking | `navigateToHistoricalTracking()` |
| navigate to tracking history | `navigateToHistoricalTracking()` |
| verify page loaded | `assertPageLoaded()` |
| **Filter** | |
| select engineer "John Smith" | `selectEngineer('John Smith')` |
| choose engineer "John" | `selectEngineer('John')` |
| set date "15/01/2026" | `setDate('15/01/2026')` |
| search tracking data | `searchTrackingData()` |
| wait for data | `waitForDataLoad()` |

### Sample Usage

```typescript
await historicalTrackingPage.navigateToHistoricalTracking();
await historicalTrackingPage.assertPageLoaded();
await historicalTrackingPage.selectEngineer('John Smith');
await historicalTrackingPage.setDate('15/01/2026');
await historicalTrackingPage.searchTrackingData();
await historicalTrackingPage.waitForDataLoad();
```

### Typical Flow

```typescript
// View engineer tracking history for a specific date
await historicalTrackingPage.navigateToHistoricalTracking();
await historicalTrackingPage.selectEngineer('John Smith');
await historicalTrackingPage.setDate('15/01/2026');
await historicalTrackingPage.searchTrackingData();
await historicalTrackingPage.waitForDataLoad();
// Inspect route on map
```

---

# Forms Logbook Pages

This section covers the Forms Logbook sidebar menu page.

## FormsLogbookPage

**URL:** `/Logbook`

**Sidebar Path:** Forms Logbook

### Page Elements

| Section | Elements |
|---------|----------|
| Header | Forms Logbook title |
| Actions | Add New Item button, Print button |
| Filter | Search Logbook textbox (Job No./Customer/Site/Postcode/Form Name/Form Type/Engineer/Asset Description/Asset Number), Start Date input (DD/MM/YYYY), End Date input (DD/MM/YYYY), Show Private toggle, Reset Filter button, Search button |
| Results | Forms Logbook list heading, Column Settings button, Results table, No matching results found message, Pagination |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to forms logbook | `navigateToFormsLogbook()` |
| open logbook | `navigateToFormsLogbook()` |
| navigate to forms logbook | `navigateToFormsLogbook()` |
| verify page loaded | `assertPageLoaded()` |
| **Actions** | |
| click add new item | `clickAddNewItem()` |
| add new logbook item | `clickAddNewItem()` |
| click print | `clickPrint()` |
| print logbook | `clickPrint()` |
| **Filter - Search** | |
| search logbook "JOB-001" | `searchLogbook('JOB-001')` |
| search "Customer Name" | `searchLogbook('Customer Name')` |
| find form "Safety Check" | `searchLogbook('Safety Check')` |
| **Filter - Date Range** | |
| set start date "01/01/2026" | `setStartDate('01/01/2026')` |
| set end date "31/03/2026" | `setEndDate('31/03/2026')` |
| set date range "01/01/2026" to "31/03/2026" | `setDateRange('01/01/2026', '31/03/2026')` |
| filter by date "01/01/2026" - "31/12/2026" | `setDateRange('01/01/2026', '31/12/2026')` |
| **Filter - Toggle** | |
| toggle show private | `toggleShowPrivate()` |
| show private forms | `setShowPrivate(true)` |
| hide private forms | `setShowPrivate(false)` |
| **Filter - Actions** | |
| click reset filter | `clickResetFilter()` |
| reset filters | `clickResetFilter()` |
| click search | `clickSearch()` |
| search and wait | `searchAndWait(query)` |
| apply filters | `applyFilters(options)` |
| **Results** | |
| wait for data load | `waitForDataLoad()` |
| check no results | `isNoResultsVisible()` |
| get row count | `getRowCount()` |
| click row 0 | `clickRowByIndex(0)` |
| click form with job no "JOB-001" | `clickFormByJobNo('JOB-001')` |
| click form "Safety Check" | `clickFormByName('Safety Check')` |

### Sample Usage

```typescript
// Navigate and search forms logbook
await formsLogbookPage.navigateToFormsLogbook();
await formsLogbookPage.assertPageLoaded();

// Search for specific form
await formsLogbookPage.searchLogbook('JOB-001');
await formsLogbookPage.clickSearch();
await formsLogbookPage.waitForDataLoad();

// Click on form result
await formsLogbookPage.clickFormByJobNo('JOB-001');
```

### Typical Flow

```typescript
// Full forms logbook search flow
await formsLogbookPage.navigateToFormsLogbook();
await formsLogbookPage.assertPageLoaded();

// Apply filters
await formsLogbookPage.applyFilters({
  query: 'Safety Check',
  startDate: '01/01/2026',
  endDate: '31/03/2026',
  showPrivate: true,
});

// Check results
const rowCount = await formsLogbookPage.getRowCount();
console.log(`Found ${rowCount} forms`);

// Click on first form
if (rowCount > 0) {
  await formsLogbookPage.clickRowByIndex(0);
}

// Add new item
await formsLogbookPage.clickAddNewItem();
```


---

# Refcom Pages

This section covers the Refcom sidebar menu pages.

## GasCylindersPage

**URL:** `/Refcom`

**Sidebar Path:** Refcom > Gas Cylinders

### Page Elements

| Section | Elements |
|---------|----------|
| Header | Gas Cylinders title, Add Cylinder button |
| Filter | Search Cylinder textbox (Serial Number / QR Code), Cylinder Type dropdown (Recovery/Receiver, Virgin, Waste, Non-Refrigerant), Refrigerant Type multiselect, Return Date Range (Start/End), Site combobox, Engineers multiselect, Supplier multiselect, Location toggles (Storeroom, Engineer, Site, Stock Location), Reset Filter button, Search button |
| Tabs | Active (count), All (count), Overdue (count), Empty And Full (count), Deleted (count), Returned (count) |
| Results | Data table, Loading indicator, No matching results message |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to gas cylinders | `navigateToGasCylinders()` |
| open gas cylinders | `navigateToGasCylinders()` |
| navigate to refcom | `navigateToGasCylinders()` |
| verify page loaded | `assertPageLoaded()` |
| **Actions** | |
| click add cylinder | `clickAddCylinder()` |
| add new cylinder | `clickAddCylinder()` |
| **Filter - Search** | |
| search cylinder "CYL-001" | `searchCylinder('CYL-001')` |
| search serial number "12345" | `searchCylinder('12345')` |
| search qr code "QR123" | `searchCylinder('QR123')` |
| **Filter - Selection** | |
| select cylinder type "Virgin" | `selectCylinderType('Virgin')` |
| select refrigerant type "R410A", "R32" | `selectRefrigerantTypes(['R410A', 'R32'])` |
| set return date range "01/01/2026" to "31/03/2026" | `setReturnDateRange('01/01/2026', '31/03/2026')` |
| search site "Building A" | `searchSite('Building A')` |
| select engineers "John Smith", "Jane Doe" | `selectEngineers(['John Smith', 'Jane Doe'])` |
| select suppliers "Supplier A" | `selectSuppliers(['Supplier A'])` |
| **Filter - Location** | |
| toggle storeroom | `toggleLocation('Storeroom')` |
| toggle engineer location | `toggleLocation('Engineer')` |
| toggle site location | `toggleLocation('Site')` |
| toggle stock location | `toggleLocation('Stock Location')` |
| **Filter - Actions** | |
| click reset filter | `clickResetFilter()` |
| reset filters | `clickResetFilter()` |
| click search | `clickSearch()` |
| search and wait "CYL-001" | `searchAndWait('CYL-001')` |
| apply filters | `applyFilters(options)` |
| **Tabs** | |
| switch to active tab | `switchToTab('Active')` |
| switch to all tab | `switchToTab('All')` |
| switch to overdue tab | `switchToTab('Overdue')` |
| switch to empty and full tab | `switchToTab('Empty And Full')` |
| switch to deleted tab | `switchToTab('Deleted')` |
| switch to returned tab | `switchToTab('Returned')` |
| get active count | `getTabCount('Active')` |
| get overdue count | `getTabCount('Overdue')` |
| **Results** | |
| wait for data load | `waitForDataLoad()` |
| check no results | `isNoResultsVisible()` |
| get row count | `getRowCount()` |
| click row 0 | `clickRowByIndex(0)` |
| click cylinder "CYL-001" | `clickCylinderBySerialNumber('CYL-001')` |

### Sample Usage

```typescript
// Navigate and search gas cylinders
await gasCylindersPage.navigateToGasCylinders();
await gasCylindersPage.assertPageLoaded();

// Search for specific cylinder
await gasCylindersPage.searchCylinder('CYL-001');
await gasCylindersPage.clickSearch();
await gasCylindersPage.waitForDataLoad();

// Click on cylinder result
await gasCylindersPage.clickCylinderBySerialNumber('CYL-001');
```

### Typical Flow

```typescript
// Full gas cylinders search flow
await gasCylindersPage.navigateToGasCylinders();
await gasCylindersPage.assertPageLoaded();

// Check tab counts
const overdueCount = await gasCylindersPage.getTabCount('Overdue');
console.log(`Overdue cylinders: ${overdueCount}`);

// Apply filters
await gasCylindersPage.applyFilters({
  cylinderType: 'Virgin',
  refrigerantType: ['R410A'],
  locations: ['Storeroom', 'Engineer'],
});

// Switch to overdue tab
await gasCylindersPage.switchToTab('Overdue');

// Add new cylinder
await gasCylindersPage.clickAddCylinder();
```

---

## RefcomAuditPage

**URL:** `/Refcom/LogBook`

**Sidebar Path:** Refcom > Refcom Audit

### Page Elements

| Section | Elements |
|---------|----------|
| Header | Refcom Audit title |
| Actions | Swap Cylinder link, Print button, Export button |
| Filter | Search Terms textbox (Customer/Site/Job Number/Asset Description), Asset Description multiselect, Start Date input, End Date input, Log Type multiselect, Engineer multiselect, Show Advanced toggle, Reset Filter button, Search button |
| Results | Record count, Column settings button, Data table, Loading indicator |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to refcom audit | `navigateToRefcomAudit()` |
| open refcom audit | `navigateToRefcomAudit()` |
| navigate to refcom logbook | `navigateToRefcomAudit()` |
| verify page loaded | `assertPageLoaded()` |
| **Actions** | |
| click swap cylinder | `clickSwapCylinder()` |
| swap cylinders | `clickSwapCylinder()` |
| click print | `clickPrint()` |
| click export | `clickExport()` |
| **Filter - Search** | |
| search terms "Customer A" | `searchTerms('Customer A')` |
| search "JOB-001" | `searchTerms('JOB-001')` |
| **Filter - Selection** | |
| select asset description "HVAC Unit" | `selectAssetDescriptions(['HVAC Unit'])` |
| set start date "01/01/2026" | `setStartDate('01/01/2026')` |
| set end date "31/03/2026" | `setEndDate('31/03/2026')` |
| set date range "01/01/2026" to "31/03/2026" | `setDateRange('01/01/2026', '31/03/2026')` |
| select log type "Recovery", "Charge" | `selectLogTypes(['Recovery', 'Charge'])` |
| select engineer "John Smith" | `selectEngineers(['John Smith'])` |
| **Filter - Toggle** | |
| toggle show advanced | `toggleShowAdvanced()` |
| show advanced filters | `toggleShowAdvanced()` |
| **Filter - Actions** | |
| click reset filter | `clickResetFilter()` |
| reset filters | `clickResetFilter()` |
| click search | `clickSearch()` |
| search and wait "Customer A" | `searchAndWait('Customer A')` |
| apply filters | `applyFilters(options)` |
| **Results** | |
| wait for data load | `waitForDataLoad()` |
| get record count | `getRecordCountText()` |
| check no results | `isNoResultsVisible()` |
| get row count | `getRowCount()` |
| click row 0 | `clickRowByIndex(0)` |

### Sample Usage

```typescript
// Navigate and search refcom audit
await refcomAuditPage.navigateToRefcomAudit();
await refcomAuditPage.assertPageLoaded();

// Search for specific customer
await refcomAuditPage.searchTerms('Customer A');
await refcomAuditPage.clickSearch();
await refcomAuditPage.waitForDataLoad();

// Get record count
const recordText = await refcomAuditPage.getRecordCountText();
console.log(recordText);
```

### Typical Flow

```typescript
// Full refcom audit search flow
await refcomAuditPage.navigateToRefcomAudit();
await refcomAuditPage.assertPageLoaded();

// Apply filters
await refcomAuditPage.applyFilters({
  searchTerms: 'Customer A',
  startDate: '01/01/2026',
  endDate: '31/03/2026',
  logType: ['Recovery'],
  engineer: ['John Smith'],
});

// Export results
await refcomAuditPage.clickExport();

// Swap cylinders
await refcomAuditPage.clickSwapCylinder();
```

---

## RefrigerantAuditPage

**URL:** `/Refcom/RefrigerantAudit`

**Sidebar Path:** Refcom > Refrigerant Audit

### Page Elements

| Section | Elements |
|---------|----------|
| Header | Refrigerant Audit title |
| Actions | Print button, Export button |
| Filter | Search Terms textbox (Customer/Site), Asset Description multiselect, Refrigerant Type multiselect, Reset Filter button, Search button |
| Results | Data table, Loading indicator, No matching results message |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to refrigerant audit | `navigateToRefrigerantAudit()` |
| open refrigerant audit | `navigateToRefrigerantAudit()` |
| navigate to refrigerant audit | `navigateToRefrigerantAudit()` |
| verify page loaded | `assertPageLoaded()` |
| **Actions** | |
| click print | `clickPrint()` |
| print audit | `clickPrint()` |
| click export | `clickExport()` |
| export audit | `clickExport()` |
| **Filter - Search** | |
| search terms "Customer A" | `searchTerms('Customer A')` |
| search "Site B" | `searchTerms('Site B')` |
| **Filter - Selection** | |
| select asset description "HVAC Unit", "Chiller" | `selectAssetDescriptions(['HVAC Unit', 'Chiller'])` |
| select refrigerant type "R410A", "R32" | `selectRefrigerantTypes(['R410A', 'R32'])` |
| **Filter - Actions** | |
| click reset filter | `clickResetFilter()` |
| reset filters | `clickResetFilter()` |
| click search | `clickSearch()` |
| search and wait "Customer A" | `searchAndWait('Customer A')` |
| apply filters | `applyFilters(options)` |
| **Results** | |
| wait for data load | `waitForDataLoad()` |
| check no results | `isNoResultsVisible()` |
| get row count | `getRowCount()` |
| click row 0 | `clickRowByIndex(0)` |

### Sample Usage

```typescript
// Navigate and search refrigerant audit
await refrigerantAuditPage.navigateToRefrigerantAudit();
await refrigerantAuditPage.assertPageLoaded();

// Search for specific customer
await refrigerantAuditPage.searchTerms('Customer A');
await refrigerantAuditPage.clickSearch();
await refrigerantAuditPage.waitForDataLoad();
```

### Typical Flow

```typescript
// Full refrigerant audit search flow
await refrigerantAuditPage.navigateToRefrigerantAudit();
await refrigerantAuditPage.assertPageLoaded();

// Apply filters
await refrigerantAuditPage.applyFilters({
  searchTerms: 'Customer A',
  assetDescription: ['HVAC Unit'],
  refrigerantType: ['R410A'],
});

// Check results
const rowCount = await refrigerantAuditPage.getRowCount();
console.log(`Found ${rowCount} records`);

// Export results
await refrigerantAuditPage.clickExport();
```


---

# Stock Pages

This section covers the Stock sidebar menu pages.

## StockRecordsPage

**URL:** `/Stock`

**Sidebar Path:** Stock > All Stock Records

### Page Elements

| Section | Elements |
|---------|----------|
| Header | Stock Records title |
| Actions | Add Stock Record link, Export link |
| Filter | Search Stock Records textbox (Number/Description/Reference), Reset Filter button, Search button |
| Tabs | All (count), Active (count), Suspended (count) |
| Results | Column settings button, Data table, Loading indicator |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to stock records | `navigateToStockRecords()` |
| open all stock records | `navigateToStockRecords()` |
| navigate to stock | `navigateToStockRecords()` |
| verify page loaded | `assertPageLoaded()` |
| **Actions** | |
| click add stock record | `clickAddStockRecord()` |
| add new stock record | `clickAddStockRecord()` |
| click export | `clickExport()` |
| export stock records | `clickExport()` |
| **Filter** | |
| search "ITEM-001" | `search('ITEM-001')` |
| search stock "Widget" | `search('Widget')` |
| reset filters | `clickResetFilter()` |
| click search | `clickSearch()` |
| search and wait "Widget" | `searchAndWait('Widget')` |
| **Tabs** | |
| switch to all tab | `switchToTab('All')` |
| switch to active tab | `switchToTab('Active')` |
| switch to suspended tab | `switchToTab('Suspended')` |
| get all count | `getTabCount('All')` |
| get active count | `getTabCount('Active')` |
| **Results** | |
| wait for data load | `waitForDataLoad()` |
| check no results | `isNoResultsVisible()` |
| get row count | `getRowCount()` |
| click row 0 | `clickRowByIndex(0)` |
| click stock record "ITEM-001" | `clickStockRecordByNumber('ITEM-001')` |

### Sample Usage

```typescript
await stockRecordsPage.navigateToStockRecords();
await stockRecordsPage.assertPageLoaded();
await stockRecordsPage.searchAndWait('Widget');
await stockRecordsPage.clickStockRecordByNumber('ITEM-001');
```

---

## StockLocationsPage

**URL:** `/Location`

**Sidebar Path:** Stock > Stock Locations

### Page Elements

| Section | Elements |
|---------|----------|
| Header | Stock Locations title |
| Actions | Add Location link, Import button |
| Filter | Search Locations textbox (Name/Address/Vehicle Reg/Engineer), Include Inactive checkbox, Reset Filter button, Search button |
| Results | Locations List heading, Column settings button, Data table, Loading indicator |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to stock locations | `navigateToStockLocations()` |
| open stock locations | `navigateToStockLocations()` |
| navigate to locations | `navigateToStockLocations()` |
| verify page loaded | `assertPageLoaded()` |
| **Actions** | |
| click add location | `clickAddLocation()` |
| add new location | `clickAddLocation()` |
| click import | `clickImport()` |
| import locations | `clickImport()` |
| **Filter** | |
| search "Warehouse A" | `search('Warehouse A')` |
| search location "Van" | `search('Van')` |
| toggle include inactive | `toggleIncludeInactive()` |
| include inactive locations | `setIncludeInactive(true)` |
| exclude inactive locations | `setIncludeInactive(false)` |
| reset filters | `clickResetFilter()` |
| click search | `clickSearch()` |
| search and wait "Warehouse" | `searchAndWait('Warehouse')` |
| apply filters | `applyFilters(options)` |
| **Results** | |
| wait for data load | `waitForDataLoad()` |
| check no results | `isNoResultsVisible()` |
| get row count | `getRowCount()` |
| click row 0 | `clickRowByIndex(0)` |
| click location "Warehouse A" | `clickLocationByName('Warehouse A')` |

### Sample Usage

```typescript
await stockLocationsPage.navigateToStockLocations();
await stockLocationsPage.assertPageLoaded();
await stockLocationsPage.applyFilters({
  query: 'Warehouse',
  includeInactive: true,
});
await stockLocationsPage.clickLocationByName('Warehouse A');
```

---

## StockTakePage

**URL:** `/StockTake`

**Sidebar Path:** Stock > Stock Take

### Page Elements

| Section | Elements |
|---------|----------|
| Header | Stock Take title |
| Actions | Add Stock Take link, Export link |
| Filter | Location multiselect, Date Created range (Start/End), Date Completed range (Start/End), Reset Filter button, Search button |
| Tabs | Open (count), Completed (count), All (count) |
| Results | Column settings button, Data table, Loading indicator, Pagination |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to stock take | `navigateToStockTake()` |
| open stock take | `navigateToStockTake()` |
| navigate to stock take | `navigateToStockTake()` |
| verify page loaded | `assertPageLoaded()` |
| **Actions** | |
| click add stock take | `clickAddStockTake()` |
| add new stock take | `clickAddStockTake()` |
| click export | `clickExport()` |
| export stock take | `clickExport()` |
| **Filter** | |
| select locations "Warehouse A", "Van 1" | `selectLocations(['Warehouse A', 'Van 1'])` |
| set date created range "01/01/2026" to "31/03/2026" | `setDateCreatedRange('01/01/2026', '31/03/2026')` |
| set date completed range "01/01/2026" to "31/03/2026" | `setDateCompletedRange('01/01/2026', '31/03/2026')` |
| reset filters | `clickResetFilter()` |
| click search | `clickSearch()` |
| apply filters | `applyFilters(options)` |
| **Tabs** | |
| switch to open tab | `switchToTab('Open')` |
| switch to completed tab | `switchToTab('Completed')` |
| switch to all tab | `switchToTab('All')` |
| get open count | `getTabCount('Open')` |
| get completed count | `getTabCount('Completed')` |
| **Results** | |
| wait for data load | `waitForDataLoad()` |
| check no results | `isNoResultsVisible()` |
| get row count | `getRowCount()` |
| click row 0 | `clickRowByIndex(0)` |

### Sample Usage

```typescript
await stockTakePage.navigateToStockTake();
await stockTakePage.assertPageLoaded();
await stockTakePage.switchToTab('Open');
await stockTakePage.applyFilters({
  locations: ['Warehouse A'],
  dateCreatedStart: '01/01/2026',
  dateCreatedEnd: '31/03/2026',
});
```

---

## StockReorderReportPage

**URL:** `/StockReorder`

**Sidebar Path:** Stock > Stock Reorder Report

### Page Elements

| Section | Elements |
|---------|----------|
| Header | Stock Reorder Report title |
| Actions | Create Stock Reorder link |
| Filter | Search Stock item textbox (Description/Location/Item Number), Item Description multiselect, Location(s) multiselect, Reset Filter button, Search button |
| Results | Stocks Lists heading, Column settings button, Data table, Loading indicator |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to stock reorder report | `navigateToStockReorderReport()` |
| open stock reorder | `navigateToStockReorderReport()` |
| navigate to reorder report | `navigateToStockReorderReport()` |
| verify page loaded | `assertPageLoaded()` |
| **Actions** | |
| click create stock reorder | `clickCreateStockReorder()` |
| create reorder | `clickCreateStockReorder()` |
| **Filter** | |
| search "Widget" | `search('Widget')` |
| search stock item "ITEM-001" | `search('ITEM-001')` |
| select item descriptions "Widget", "Gadget" | `selectItemDescriptions(['Widget', 'Gadget'])` |
| select locations "Warehouse A" | `selectLocations(['Warehouse A'])` |
| reset filters | `clickResetFilter()` |
| click search | `clickSearch()` |
| search and wait "Widget" | `searchAndWait('Widget')` |
| apply filters | `applyFilters(options)` |
| **Results** | |
| wait for data load | `waitForDataLoad()` |
| check no results | `isNoResultsVisible()` |
| get row count | `getRowCount()` |
| click row 0 | `clickRowByIndex(0)` |

### Sample Usage

```typescript
await stockReorderReportPage.navigateToStockReorderReport();
await stockReorderReportPage.assertPageLoaded();
await stockReorderReportPage.applyFilters({
  itemDescriptions: ['Widget'],
  locations: ['Warehouse A'],
});
await stockReorderReportPage.clickCreateStockReorder();
```

---

## StockValuationReportPage

**URL:** `/Stock/StockValuationReport`

**Sidebar Path:** Stock > Stock Valuation Report

### Page Elements

| Section | Elements |
|---------|----------|
| Header | Stock Valuation Report title |
| Actions | Print dropdown, Export button |
| Filter | Search Stock textbox (Number/Description/Reference), Location(s) multiselect, Rack/Shelf(s) multiselect, Reset Filter button, Search button |
| Results | Stocks Lists heading, Column settings button, Data table, Loading indicator, Grand Total section (Total Cost, Total Sell), Pagination |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to stock valuation report | `navigateToStockValuationReport()` |
| open stock valuation | `navigateToStockValuationReport()` |
| navigate to valuation report | `navigateToStockValuationReport()` |
| verify page loaded | `assertPageLoaded()` |
| **Actions** | |
| click print | `clickPrint()` |
| print valuation | `clickPrint()` |
| click export | `clickExport()` |
| export valuation | `clickExport()` |
| **Filter** | |
| search "Widget" | `search('Widget')` |
| search stock "ITEM-001" | `search('ITEM-001')` |
| select locations "Warehouse A", "Warehouse B" | `selectLocations(['Warehouse A', 'Warehouse B'])` |
| select rack/shelves "A1", "B2" | `selectRackShelves(['A1', 'B2'])` |
| reset filters | `clickResetFilter()` |
| click search | `clickSearch()` |
| search and wait "Widget" | `searchAndWait('Widget')` |
| apply filters | `applyFilters(options)` |
| **Results** | |
| wait for data load | `waitForDataLoad()` |
| check no results | `isNoResultsVisible()` |
| get row count | `getRowCount()` |
| click row 0 | `clickRowByIndex(0)` |
| get total cost | `getTotalCost()` |
| get total sell | `getTotalSell()` |

### Sample Usage

```typescript
await stockValuationReportPage.navigateToStockValuationReport();
await stockValuationReportPage.assertPageLoaded();
await stockValuationReportPage.applyFilters({
  locations: ['Warehouse A'],
  rackShelves: ['A1'],
});
const totalCost = await stockValuationReportPage.getTotalCost();
const totalSell = await stockValuationReportPage.getTotalSell();
console.log(`Total Cost: ${totalCost}, Total Sell: ${totalSell}`);
```

---

## StockAdjustmentPage

**URL:** `/StockAdjustment`

**Sidebar Path:** Stock > Stock Adjustment

### Page Elements

| Section | Elements |
|---------|----------|
| Header | Stock Adjustment Report title |
| Actions | Add Stock Adjustment button, Export button |
| Filter | Location multiselect, Date Range (Start/End), Created By multiselect, Reset Filter button, Search button |
| Results | Data table, Loading indicator, Pagination |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to stock adjustment | `navigateToStockAdjustment()` |
| open stock adjustment | `navigateToStockAdjustment()` |
| navigate to adjustment | `navigateToStockAdjustment()` |
| verify page loaded | `assertPageLoaded()` |
| **Actions** | |
| click add stock adjustment | `clickAddStockAdjustment()` |
| add new adjustment | `clickAddStockAdjustment()` |
| click export | `clickExport()` |
| export adjustments | `clickExport()` |
| **Filter** | |
| select locations "Warehouse A" | `selectLocations(['Warehouse A'])` |
| set date range "01/01/2026" to "31/03/2026" | `setDateRange('01/01/2026', '31/03/2026')` |
| select created by "John Smith" | `selectCreatedBy(['John Smith'])` |
| reset filters | `clickResetFilter()` |
| click search | `clickSearch()` |
| apply filters | `applyFilters(options)` |
| **Results** | |
| wait for data load | `waitForDataLoad()` |
| check no results | `isNoResultsVisible()` |
| get row count | `getRowCount()` |
| click row 0 | `clickRowByIndex(0)` |

### Sample Usage

```typescript
await stockAdjustmentPage.navigateToStockAdjustment();
await stockAdjustmentPage.assertPageLoaded();
await stockAdjustmentPage.applyFilters({
  locations: ['Warehouse A'],
  dateStart: '01/01/2026',
  dateEnd: '31/03/2026',
});
await stockAdjustmentPage.clickAddStockAdjustment();
```

---

## StockBulkTransferPage

**URL:** `/Stock/StockBulkTransfer`

**Sidebar Path:** Stock > Stock Bulk Transfer

### Page Elements

| Section | Elements |
|---------|----------|
| Header | Stock Bulk Transfer title |
| Filter | Search Stock Records textbox (Number/Description/Reference), Location multiselect, Reset Filter button, Search button |
| Form | Required Fields indicator, Cancel button, Transfer button |
| Results | Data table, Loading indicator |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to stock bulk transfer | `navigateToStockBulkTransfer()` |
| open bulk transfer | `navigateToStockBulkTransfer()` |
| navigate to bulk transfer | `navigateToStockBulkTransfer()` |
| verify page loaded | `assertPageLoaded()` |
| **Filter** | |
| search "Widget" | `search('Widget')` |
| search stock "ITEM-001" | `search('ITEM-001')` |
| select locations "Warehouse A" | `selectLocations(['Warehouse A'])` |
| reset filters | `clickResetFilter()` |
| click search | `clickSearch()` |
| search and wait "Widget" | `searchAndWait('Widget')` |
| apply filters | `applyFilters(options)` |
| **Form** | |
| click cancel | `clickCancel()` |
| cancel transfer | `clickCancel()` |
| click transfer | `clickTransfer()` |
| transfer stock | `clickTransfer()` |
| check transfer enabled | `isTransferEnabled()` |
| check cancel enabled | `isCancelEnabled()` |
| **Results** | |
| wait for data load | `waitForDataLoad()` |
| check no results | `isNoResultsVisible()` |
| get row count | `getRowCount()` |
| click row 0 | `clickRowByIndex(0)` |
| select row 0 | `selectRowByIndex(0)` |
| deselect row 0 | `deselectRowByIndex(0)` |

### Sample Usage

```typescript
await stockBulkTransferPage.navigateToStockBulkTransfer();
await stockBulkTransferPage.assertPageLoaded();
await stockBulkTransferPage.applyFilters({
  query: 'Widget',
  locations: ['Warehouse A'],
});

// Select items to transfer
await stockBulkTransferPage.selectRowByIndex(0);
await stockBulkTransferPage.selectRowByIndex(1);

// Check if transfer is enabled
if (await stockBulkTransferPage.isTransferEnabled()) {
  await stockBulkTransferPage.clickTransfer();
}
```

### Typical Flow

```typescript
// Full stock bulk transfer flow
await stockBulkTransferPage.navigateToStockBulkTransfer();
await stockBulkTransferPage.assertPageLoaded();

// Search for stock items
await stockBulkTransferPage.searchAndWait('Widget');

// Select items to transfer
const rowCount = await stockBulkTransferPage.getRowCount();
for (let i = 0; i < Math.min(rowCount, 5); i++) {
  await stockBulkTransferPage.selectRowByIndex(i);
}

// Transfer selected items
await stockBulkTransferPage.clickTransfer();
```


---

# Settings Pages

This section covers the Settings sidebar menu pages. Settings is a hub page that links to various configuration and setup pages.

## SettingsPage

**URL:** `/Setting/`

**Sidebar Path:** Settings

### Page Elements

| Section | Elements |
|---------|----------|
| Header | Settings title |
| Tiles | Activate, Company Setup, System Setup, Staff, Credit Card Payments, Electronic Forms, Library, Account Integration, Scheme Providers, Customer Portal Access, Sync History, Audit, History of Imports, Document Templates, Company Documentation, Outbound Emails, Subcontractors, Email, Email Notification, FTP Accounts |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to settings | `navigateToSettings()` |
| open settings | `navigateToSettings()` |
| verify page loaded | `assertPageLoaded()` |
| **Tile Navigation** | |
| click activate | `clickActivate()` |
| click company setup | `clickCompanySetup()` |
| click system setup | `clickSystemSetup()` |
| click staff | `clickStaff()` |
| click credit card payments | `clickCreditCardPayments()` |
| click electronic forms | `clickElectronicForms()` |
| click library | `clickLibrary()` |
| click account integration | `clickAccountIntegration()` |
| click scheme providers | `clickSchemeProviders()` |
| click customer portal access | `clickCustomerPortalAccess()` |
| click sync history | `clickSyncHistory()` |
| click audit | `clickAudit()` |
| click history of imports | `clickHistoryOfImports()` |
| click document templates | `clickDocumentTemplates()` |
| click company documentation | `clickCompanyDocumentation()` |
| click outbound emails | `clickOutboundEmails()` |
| click subcontractors | `clickSubcontractors()` |
| click email | `clickEmail()` |
| click email notification | `clickEmailNotification()` |
| click ftp accounts | `clickFTPAccounts()` |
| **Visibility** | |
| check tile visible "Staff" | `isTileVisible('Staff')` |

### Sample Usage

```typescript
await settingsPage.navigateToSettings();
await settingsPage.assertPageLoaded();
await settingsPage.clickStaff();
```

---

## CompanySetupPage

**URL:** `/Setting/CompanySetup`

**Sidebar Path:** Settings > Company Setup

### Page Elements

| Section | Elements |
|---------|----------|
| Tabs | Details, Business Hours |
| Actions | Edit button, Undo button, Save button |
| Details | Company Number, Name, Industry dropdown, Address fields, Country |
| Other | Email, Telephone, Website, Calling Code |
| Logo | Current Logo, Upload New Logo with drag-drop |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to company setup | `navigateToCompanySetup()` |
| verify page loaded | `assertPageLoaded()` |
| go back to settings | `goBackToSettings()` |
| **Tabs** | |
| switch to details tab | `switchToDetailsTab()` |
| switch to business hours tab | `switchToBusinessHoursTab()` |
| **Actions** | |
| click edit | `clickEdit()` |
| click undo | `clickUndo()` |
| click save | `clickSave()` |
| **Form** | |
| set company name "Test Company" | `setCompanyName('Test Company')` |
| select industry "Plumbing & Heating" | `selectIndustry('Plumbing & Heating')` |
| set address | `setAddress({ line1: '123 Main St', city: 'London', postcode: 'SW1A 1AA' })` |
| set email | `setEmail('test@test.com')` |
| set telephone | `setTelephone('0123456789')` |
| upload logo | `uploadLogo('path/to/logo.png')` |
| **Getters** | |
| get company name | `getCompanyName()` |
| get email | `getEmail()` |
| check edit mode | `isEditMode()` |

### Sample Usage

```typescript
await companySetupPage.navigateToCompanySetup();
await companySetupPage.clickEdit();
await companySetupPage.setCompanyName('My Company Ltd');
await companySetupPage.setEmail('info@mycompany.com');
await companySetupPage.clickSave();
```

---

## StaffPage

**URL:** `/Staff`

**Sidebar Path:** Settings > Staff

### Page Elements

| Section | Elements |
|---------|----------|
| Header | Users title |
| Actions | User Access Log, Add User, Engineer Teams, Manage User Roles, Import Users, Print, Export |
| Filter | Search Users textbox, Include Inactive checkbox |
| Results | Staff list heading, Data table |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to staff | `navigateToStaff()` |
| verify page loaded | `assertPageLoaded()` |
| go back to settings | `goBackToSettings()` |
| **Actions** | |
| click user access log | `clickUserAccessLog()` |
| click add user | `clickAddUser()` |
| click engineer teams | `clickEngineerTeams()` |
| click manage user roles | `clickManageUserRoles()` |
| click import users | `clickImportUsers()` |
| click print | `clickPrint()` |
| click export | `clickExport()` |
| **Filter** | |
| search "John" | `search('John')` |
| toggle include inactive | `toggleIncludeInactive()` |
| include inactive | `setIncludeInactive(true)` |
| reset filter | `clickResetFilter()` |
| click search | `clickSearch()` |
| search and wait | `searchAndWait('John')` |
| apply filters | `applyFilters({ query: 'John', includeInactive: true })` |
| **Results** | |
| wait for data load | `waitForDataLoad()` |
| get row count | `getRowCount()` |
| click row 0 | `clickRowByIndex(0)` |
| click user "John Smith" | `clickUserByName('John Smith')` |

### Sample Usage

```typescript
await staffPage.navigateToStaff();
await staffPage.assertPageLoaded();
await staffPage.applyFilters({ query: 'John', includeInactive: true });
await staffPage.clickUserByName('John Smith');
```

---

## ElectronicFormsPage

**URL:** `/CompanyForm`

**Sidebar Path:** Settings > Electronic Forms

### Page Elements

| Section | Elements |
|---------|----------|
| Tabs | Electronic Forms, Naming Convention |
| Header | Electronic Forms title |
| Actions | Add Custom Form |
| Filter | Select Forms by Industry, Search textbox |
| Form Types | Available Forms, Deployed Forms, Custom Forms tabs |
| Toggles | Job Form checkbox, General Form checkbox |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to electronic forms | `navigateToElectronicForms()` |
| verify page loaded | `assertPageLoaded()` |
| go back to settings | `goBackToSettings()` |
| **Tabs** | |
| switch to electronic forms tab | `switchToElectronicFormsTab()` |
| switch to naming convention tab | `switchToNamingConventionTab()` |
| **Actions** | |
| click add custom form | `clickAddCustomForm()` |
| **Filter** | |
| select industry "Fire & Safety" | `selectIndustry(['Fire & Safety'])` |
| search "inspection" | `search('inspection')` |
| search and wait | `searchAndWait('inspection')` |
| **Form Types** | |
| switch to available forms | `switchToAvailableForms()` |
| switch to deployed forms | `switchToDeployedForms()` |
| switch to custom forms | `switchToCustomForms()` |
| **Toggles** | |
| toggle job form | `toggleJobForm()` |
| toggle general form | `toggleGeneralForm()` |
| set job form true | `setJobForm(true)` |
| apply filters | `applyFilters({ industries: ['Fire & Safety'], query: 'inspection' })` |

### Sample Usage

```typescript
await electronicFormsPage.navigateToElectronicForms();
await electronicFormsPage.assertPageLoaded();
await electronicFormsPage.switchToDeployedForms();
await electronicFormsPage.applyFilters({ industries: ['Fire & Safety'], jobForm: true });
```

---

## LibraryPage

**URL:** `/Library`

**Sidebar Path:** Settings > Library

### Page Elements

| Section | Elements |
|---------|----------|
| Header | Library title |
| Tiles | Credit Reasons, Parts, Equipment, Gas Types, Selling Rates, Schedule of Rates, Tasks, Phrasebook, Fault Code Library, Service Types, Service Kits, Tax Rates, Nominal Codes, Refcom Transaction Reasons, Service Jobs, Suppliers, Priorities, Tags, Non-Productive Time Types, Sources, Quote Reject Reasons, Incomplete Task Reasons, Engineer Trades, Pay Bands, Company Document Types, Vehicles, Locations, Purchase Order Templates, Quote Templates, Report Templates, Misc, Job Templates, User References |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to library | `navigateToLibrary()` |
| verify page loaded | `assertPageLoaded()` |
| go back to settings | `goBackToSettings()` |
| **Tile Navigation** | |
| click credit reasons | `clickCreditReasons()` |
| click parts | `clickParts()` |
| click equipment | `clickEquipment()` |
| click gas types | `clickGasTypes()` |
| click selling rates | `clickSellingRates()` |
| click schedule of rates | `clickScheduleOfRates()` |
| click tasks | `clickTasks()` |
| click phrasebook | `clickPhrasebook()` |
| click fault code library | `clickFaultCodeLibrary()` |
| click service types | `clickServiceTypes()` |
| click service kits | `clickServiceKits()` |
| click tax rates | `clickTaxRates()` |
| click nominal codes | `clickNominalCodes()` |
| click suppliers | `clickSuppliers()` |
| click priorities | `clickPriorities()` |
| click tags | `clickTags()` |
| click vehicles | `clickVehicles()` |
| click locations | `clickLocations()` |
| click misc | `clickMisc()` |
| click job templates | `clickJobTemplates()` |
| click user references | `clickUserReferences()` |
| **Visibility** | |
| check tile visible "Parts" | `isTileVisible('Parts')` |

### Sample Usage

```typescript
await libraryPage.navigateToLibrary();
await libraryPage.assertPageLoaded();
await libraryPage.clickParts();
```

---

## AuditPage

**URL:** `/Audit`

**Sidebar Path:** Settings > Audit

### Page Elements

| Section | Elements |
|---------|----------|
| Header | Audit title |
| Filter | Audit Type multiselect, Action multiselect, Operation Time range, Audit Entry User multiselect |
| Results | Data table |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to audit | `navigateToAudit()` |
| verify page loaded | `assertPageLoaded()` |
| go back to settings | `goBackToSettings()` |
| **Filter** | |
| select audit types | `selectAuditTypes(['Job', 'Invoice'])` |
| select actions | `selectActions(['Create', 'Update'])` |
| set operation time range | `setOperationTimeRange('01/01/2026', '31/03/2026')` |
| select audit entry users | `selectAuditEntryUsers(['John Smith'])` |
| reset filter | `clickResetFilter()` |
| click search | `clickSearch()` |
| apply filters | `applyFilters({ auditTypes: ['Job'], actions: ['Create'] })` |
| **Results** | |
| wait for data load | `waitForDataLoad()` |
| get row count | `getRowCount()` |
| click row 0 | `clickRowByIndex(0)` |

### Sample Usage

```typescript
await auditPage.navigateToAudit();
await auditPage.assertPageLoaded();
await auditPage.applyFilters({
  auditTypes: ['Job'],
  actions: ['Create', 'Update'],
  operationTimeStart: '01/01/2026',
  operationTimeEnd: '31/03/2026',
});
```

---

## PortalUsersPage

**URL:** `/Portal`

**Sidebar Path:** Settings > Customer Portal Access

### Page Elements

| Section | Elements |
|---------|----------|
| Header | Portal Users title |
| Actions | Add Portal Users, Manage Portal Roles, Import Portal Users, Print, Export |
| Filter | Search textbox, Assigned Roles multiselect, Include Inactive checkbox |
| Results | Data table, Pagination |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to portal users | `navigateToPortalUsers()` |
| verify page loaded | `assertPageLoaded()` |
| go back to settings | `goBackToSettings()` |
| **Actions** | |
| click add portal users | `clickAddPortalUsers()` |
| click manage portal roles | `clickManagePortalRoles()` |
| click import portal users | `clickImportPortalUsers()` |
| click print | `clickPrint()` |
| click export | `clickExport()` |
| **Filter** | |
| search "test@test.com" | `search('test@test.com')` |
| select assigned roles | `selectAssignedRoles(['Admin', 'Viewer'])` |
| toggle include inactive | `toggleIncludeInactive()` |
| apply filters | `applyFilters({ query: 'test', includeInactive: true })` |
| **Results** | |
| wait for data load | `waitForDataLoad()` |
| get row count | `getRowCount()` |
| click user "Test User" | `clickUserByName('Test User')` |

### Sample Usage

```typescript
await portalUsersPage.navigateToPortalUsers();
await portalUsersPage.assertPageLoaded();
await portalUsersPage.applyFilters({ query: 'test@test.com', includeInactive: true });
await portalUsersPage.clickAddPortalUsers();
```

---

## DocumentTemplatesPage

**URL:** `/Template`

**Sidebar Path:** Settings > Document Templates

### Page Elements

| Section | Elements |
|---------|----------|
| Tabs | Jobsheet, Quotes, Invoice & Credit, PPMs, Purchase Orders, Service Letters, Goods Received Notes, Asset & Task Compliance |
| Actions | Add Template, Download Guidelines |
| Filter | Search Templates textbox |
| Results | Data table |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to document templates | `navigateToDocumentTemplates()` |
| verify page loaded | `assertPageLoaded()` |
| go back to settings | `goBackToSettings()` |
| **Tabs** | |
| switch to jobsheet | `switchToJobsheet()` |
| switch to quotes | `switchToQuotes()` |
| switch to invoice credit | `switchToInvoiceCredit()` |
| switch to ppms | `switchToPPMs()` |
| switch to purchase orders | `switchToPurchaseOrders()` |
| switch to service letters | `switchToServiceLetters()` |
| switch to goods received notes | `switchToGoodsReceivedNotes()` |
| switch to asset task compliance | `switchToAssetTaskCompliance()` |
| switch to tab "Quotes" | `switchToTab('Quotes')` |
| **Actions** | |
| click add template | `clickAddTemplate()` |
| download guidelines | `clickDownloadGuidelines()` |
| **Filter** | |
| search "Invoice" | `search('Invoice')` |
| search and wait | `searchAndWait('Invoice')` |
| **Results** | |
| wait for data load | `waitForDataLoad()` |
| get row count | `getRowCount()` |
| click template "My Template" | `clickTemplateByName('My Template')` |

### Sample Usage

```typescript
await documentTemplatesPage.navigateToDocumentTemplates();
await documentTemplatesPage.switchToTab('Invoice & Credit');
await documentTemplatesPage.searchAndWait('Custom Template');
await documentTemplatesPage.clickAddTemplate();
```

---

## SubcontractorsPage

**URL:** `/Subcontractor`

**Sidebar Path:** Settings > Subcontractors

### Page Elements

| Section | Elements |
|---------|----------|
| Tabs | Subcontractors, Subcontractor Template |
| Header | Subcontractors title |
| Actions | Add Subcontractor, Import |
| Filter | Search textbox, Include Inactive checkbox |
| Results | Subcontractor list heading, Data table |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to subcontractors | `navigateToSubcontractors()` |
| verify page loaded | `assertPageLoaded()` |
| go back to settings | `goBackToSettings()` |
| **Tabs** | |
| switch to subcontractors tab | `switchToSubcontractorsTab()` |
| switch to subcontractor template tab | `switchToSubcontractorTemplateTab()` |
| **Actions** | |
| click add subcontractor | `clickAddSubcontractor()` |
| click import | `clickImport()` |
| **Filter** | |
| search "ABC Contractors" | `search('ABC Contractors')` |
| toggle include inactive | `toggleIncludeInactive()` |
| apply filters | `applyFilters({ query: 'ABC', includeInactive: true })` |
| **Results** | |
| wait for data load | `waitForDataLoad()` |
| get row count | `getRowCount()` |
| click subcontractor "ABC" | `clickSubcontractorByName('ABC')` |

### Sample Usage

```typescript
await subcontractorsPage.navigateToSubcontractors();
await subcontractorsPage.assertPageLoaded();
await subcontractorsPage.searchAndWait('ABC Contractors');
await subcontractorsPage.clickAddSubcontractor();
```

---

## EmailTemplatePage

**URL:** `/EmailTemplate`

**Sidebar Path:** Settings > Email

### Page Elements

| Section | Elements |
|---------|----------|
| Tabs | Job, Quotes, Invoices, PPMs, Purchase Orders, Service Letters, Documents |
| Header | Email Template title |
| Actions | Add Template |
| Filter | Search Template textbox |
| Results | Data table, Pagination, Results per page dropdown |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to email template | `navigateToEmailTemplate()` |
| verify page loaded | `assertPageLoaded()` |
| go back to settings | `goBackToSettings()` |
| **Tabs** | |
| switch to job tab | `switchToJobTab()` |
| switch to quotes tab | `switchToQuotesTab()` |
| switch to invoices tab | `switchToInvoicesTab()` |
| switch to ppms tab | `switchToPPMsTab()` |
| switch to purchase orders tab | `switchToPurchaseOrdersTab()` |
| switch to service letters tab | `switchToServiceLettersTab()` |
| switch to documents tab | `switchToDocumentsTab()` |
| switch to tab "Invoices" | `switchToTab('Invoices')` |
| **Actions** | |
| click add template | `clickAddTemplate()` |
| **Filter** | |
| search "welcome" | `search('welcome')` |
| search and wait | `searchAndWait('welcome')` |
| **Pagination** | |
| select results per page 20 | `selectResultsPerPage(20)` |
| go to page 2 | `goToPage(2)` |
| go to next page | `goToNextPage()` |
| go to previous page | `goToPreviousPage()` |
| **Results** | |
| wait for data load | `waitForDataLoad()` |
| get row count | `getRowCount()` |
| click template "Welcome" | `clickTemplateByName('Welcome')` |

### Sample Usage

```typescript
await emailTemplatePage.navigateToEmailTemplate();
await emailTemplatePage.switchToTab('Invoices');
await emailTemplatePage.searchAndWait('invoice notification');
await emailTemplatePage.clickAddTemplate();
```

---

## OutboundEmailsPage

**URL:** `/OutboundEmailHistory/OutboundEmails`

**Sidebar Path:** Settings > Outbound Emails

### Page Elements

| Section | Elements |
|---------|----------|
| Header | Outbound Emails title |
| Filter | Search textbox (To/Subject), Email Type multiselect, Status multiselect, Sent Date range |
| Results | Data table, Pagination |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to outbound emails | `navigateToOutboundEmails()` |
| verify page loaded | `assertPageLoaded()` |
| go back to settings | `goBackToSettings()` |
| **Filter** | |
| search "test@test.com" | `search('test@test.com')` |
| select email types | `selectEmailTypes(['Invoice', 'Quote'])` |
| select statuses | `selectStatuses(['Sent', 'Failed'])` |
| set sent date range | `setSentDateRange('01/01/2026', '31/03/2026')` |
| apply filters | `applyFilters({ query: 'test', emailTypes: ['Invoice'] })` |
| **Results** | |
| wait for data load | `waitForDataLoad()` |
| get row count | `getRowCount()` |
| click row 0 | `clickRowByIndex(0)` |

### Sample Usage

```typescript
await outboundEmailsPage.navigateToOutboundEmails();
await outboundEmailsPage.assertPageLoaded();
await outboundEmailsPage.applyFilters({
  query: 'invoice',
  emailTypes: ['Invoice'],
  statuses: ['Sent'],
  sentDateStart: '01/01/2026',
  sentDateEnd: '31/03/2026',
});
```

---

## SyncHistoryPage

**URL:** `/AccountIntegration/SyncHistory`

**Sidebar Path:** Settings > Sync History

### Page Elements

| Section | Elements |
|---------|----------|
| Header | Sync History title |
| Filter | Sync Type multiselect, Sync Status multiselect, Sync Date range |
| Results | Data table, Pagination |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to sync history | `navigateToSyncHistory()` |
| verify page loaded | `assertPageLoaded()` |
| go back to settings | `goBackToSettings()` |
| **Filter** | |
| select sync types | `selectSyncTypes(['Customer', 'Invoice'])` |
| select sync statuses | `selectSyncStatuses(['Success', 'Failed'])` |
| set sync date range | `setSyncDateRange('01/01/2026', '31/03/2026')` |
| apply filters | `applyFilters({ syncTypes: ['Customer'] })` |
| **Results** | |
| wait for data load | `waitForDataLoad()` |
| get row count | `getRowCount()` |
| click row 0 | `clickRowByIndex(0)` |

### Sample Usage

```typescript
await syncHistoryPage.navigateToSyncHistory();
await syncHistoryPage.assertPageLoaded();
await syncHistoryPage.applyFilters({
  syncTypes: ['Customer', 'Invoice'],
  syncStatuses: ['Success'],
  syncDateStart: '01/01/2026',
  syncDateEnd: '31/03/2026',
});
```

---

## ImportHistoryPage

**URL:** `/Import/History`

**Sidebar Path:** Settings > History of Imports

### Page Elements

| Section | Elements |
|---------|----------|
| Header | History of Imports title |
| Filter | Import Type multiselect, Import Status multiselect, Import Date range |
| Results | Data table, Pagination |

### Intent → Method Mapping

| User Input | Method |
|------------|--------|
| **Navigation** | |
| go to import history | `navigateToImportHistory()` |
| verify page loaded | `assertPageLoaded()` |
| go back to settings | `goBackToSettings()` |
| **Filter** | |
| select import types | `selectImportTypes(['Customer', 'Site'])` |
| select import statuses | `selectImportStatuses(['Success', 'Failed'])` |
| set import date range | `setImportDateRange('01/01/2026', '31/03/2026')` |
| apply filters | `applyFilters({ importTypes: ['Customer'] })` |
| **Results** | |
| wait for data load | `waitForDataLoad()` |
| get row count | `getRowCount()` |
| click row 0 | `clickRowByIndex(0)` |

### Sample Usage

```typescript
await importHistoryPage.navigateToImportHistory();
await importHistoryPage.assertPageLoaded();
await importHistoryPage.applyFilters({
  importTypes: ['Customer', 'Site'],
  importStatuses: ['Success'],
  importDateStart: '01/01/2026',
  importDateEnd: '31/03/2026',
});
```

---

## Customer Grouped Invoice Page

### Page URL
- Create Customer Grouped Invoice: `/CGroupInvoice/Create`

### Target Class
```typescript
import { CustomerGroupedInvoicePage, CustomerGroupedSearchOptions, CustomerGroupedTab } from './pages/Invoices/CustomerGroupedInvoicePage';

const customerGroupedInvoicePage = new CustomerGroupedInvoicePage(page);
```

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (search, click, select, etc.)

### Page Structure

| Section | Elements |
|---------|----------|
| Page Header | Page title, Export button |
| Tab Navigation | Jobs tab, Draft Invoices tab |
| Filter Section | Customer dropdown, Search textbox, Start Date, End Date, Status multiselect, Order By dropdown, Show Advanced, Reset Filter, Search button |
| Results Section | All tab (with count), Selected tab (with count), Results table |
| Footer | Total Outstanding Cost, Cancel button, Save button |

### Filter Fields

| Field | Type | Description |
|-------|------|-------------|
| Customer | Dropdown (required) | Select customer to filter jobs |
| Search | Text | Site / Contact / Description / Order No. / Reference |
| Date Logged | Date Range | Start and End date for date logged |
| Status | Multiselect | Open, Complete, Cancelled, On Hold |
| Order By | Dropdown | Job Number (A-Z), Job Number (Z-A), Date Logged (Newest), Date Logged (Oldest) |

### Tabs

| Tab | Description |
|-----|-------------|
| Jobs | View jobs to create invoices |
| Draft Invoices | View draft invoices |

### Intent → Method Mapping

#### Navigation
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| go to customer grouped invoice | `navigateToCustomerGroupedInvoice()` | - | Navigate to Create Customer Grouped Invoice page |
| verify page loaded | `assertPageLoaded()` | - | Assert page is loaded |
| switch to jobs tab | `switchToTab('Jobs')` | `tab: CustomerGroupedTab` | Switch to Jobs tab |
| switch to draft invoices tab | `switchToTab('Draft Invoices')` | `tab: CustomerGroupedTab` | Switch to Draft Invoices tab |

#### Filter Methods
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| select customer "ABC Corp" | `selectCustomer(customerName)` | `customerName: string` | Select customer from dropdown |
| search jobs "repair" | `searchJobs(searchText)` | `searchText: string` | Search jobs by text |
| set date range | `setDateLoggedRange(startDate, endDate)` | `startDate: string, endDate: string` | Set date logged range |
| set start date | `setStartDate(date)` | `date: string` | Set start date |
| set end date | `setEndDate(date)` | `date: string` | Set end date |
| select order by "Date Logged (Newest)" | `selectOrderBy(orderBy)` | `orderBy: InvoiceOrderBy` | Select order by option |
| click show advanced | `clickShowAdvanced()` | - | Click Show Advanced button |
| click reset filter | `clickResetFilter()` | - | Click Reset Filter button |
| click search | `clickSearch()` | - | Click Search button |
| apply filters | `applyFilters(options)` | `options: CustomerGroupedSearchOptions` | Apply all filters at once |

#### Results Methods
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| switch to all results | `switchToAllResults()` | - | Switch to All results tab |
| switch to selected results | `switchToSelectedResults()` | - | Switch to Selected results tab |
| get all jobs count | `getAllJobsCount()` | - | Get count of all jobs (returns number) |
| get selected jobs count | `getSelectedJobsCount()` | - | Get count of selected jobs (returns number) |
| check no matching jobs | `isNoMatchingJobsVisible()` | - | Check if no matching jobs message visible (returns boolean) |
| select job "JOB001" | `selectJobByNumber(jobNumber)` | `jobNumber: string` | Select job by job number |
| select all jobs | `selectAllJobs()` | - | Select all jobs |

#### Footer Methods
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| get total outstanding cost | `getTotalOutstandingCost()` | - | Get total outstanding cost (returns string) |
| click cancel | `clickCancel()` | - | Click Cancel button |
| click save | `clickSave()` | - | Click Save button |
| check if save enabled | `isSaveEnabled()` | - | Check if Save button is enabled (returns boolean) |

#### High-Level Creation
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| create new customer grouped invoice | `createNewCustomerGroupedInvoice(data)` | `data: CustomerGroupedInvoiceData` | Fill form and save invoice |
| add new customer grouped invoice | `createNewCustomerGroupedInvoice(data)` | `data: CustomerGroupedInvoiceData` | Fill form and save invoice |
| create a customer grouped invoice | `createNewCustomerGroupedInvoice(data)` | `data: CustomerGroupedInvoiceData` | Fill form and save invoice |
| add a customer grouped invoice | `createNewCustomerGroupedInvoice(data)` | `data: CustomerGroupedInvoiceData` | Fill form and save invoice |
| create customer grouped invoice | `createNewCustomerGroupedInvoice(data)` | `data: CustomerGroupedInvoiceData` | Fill form and save invoice |
| add customer grouped invoice | `createNewCustomerGroupedInvoice(data)` | `data: CustomerGroupedInvoiceData` | Fill form and save invoice |
| fill customer grouped invoice form only | `fillCustomerGroupedInvoiceForm(data)` | `data: CustomerGroupedInvoiceData` | Fill form only (does not save) |
| fill new customer grouped invoice form | `fillCustomerGroupedInvoiceForm(data)` | `data: CustomerGroupedInvoiceData` | Fill form only (does not save) |

### Data Builder Pattern (Recommended)

```typescript
import { CustomerGroupedInvoiceBuilder } from '../../data/testData/customerGroupedInvoice.data';

// Navigate first, then create
await customerGroupedInvoicePage.navigateToCustomerGroupedInvoice();

// Simple invoice with builder
await customerGroupedInvoicePage.createNewCustomerGroupedInvoice(
  CustomerGroupedInvoiceBuilder.create('ABC Corp', ['JOB-001', 'JOB-002']).build()
);

// Invoice with filters using fluent API
await customerGroupedInvoicePage.createNewCustomerGroupedInvoice(
  CustomerGroupedInvoiceBuilder.create('ABC Corp', ['JOB-001'])
    .withSearchText('Repair')
    .withDateRange('01/01/2024', '31/12/2024')
    .withOrderBy('Date Logged (Newest)')
    .build()
);

// Fill form only (without saving)
await customerGroupedInvoicePage.fillCustomerGroupedInvoiceForm(
  CustomerGroupedInvoiceBuilder.create('ABC Corp', ['JOB-001', 'JOB-002'])
    .withStartDate('01/01/2024')
    .build()
);
```

#### CustomerGroupedInvoiceBuilder Methods

| Method | Description |
|--------|-------------|
| `.create(customer, jobNumbers)` | Create builder with required fields (customer name and array of job numbers) |
| `.withSearchText(string)` | Add search text filter |
| `.withDateRange(startDate, endDate)` | Add date range filter |
| `.withStartDate(string)` | Add start date filter |
| `.withEndDate(string)` | Add end date filter |
| `.withStatuses(InvoiceJobStatus[])` | Add status filters |
| `.withOrderBy(InvoiceOrderBy)` | Add order by option |
| `.withAdditionalJobs(string[])` | Add additional job numbers |
| `.build()` | Build CustomerGroupedInvoiceData object |

### High-Level Methods (CustomerGroupedInvoicePage)

| Method | Parameters | Description |
|--------|------------|-------------|
| `createNewCustomerGroupedInvoice(data)` | `data: CustomerGroupedInvoiceData` | Fill form and save invoice |
| `fillCustomerGroupedInvoiceForm(data)` | `data: CustomerGroupedInvoiceData` | Fill form only (does not save) |
| `createInvoice(customerName, jobNumbers)` | `customerName: string, jobNumbers: string[]` | Legacy method - select customer, jobs and save |

---

## Batch Invoice Page

### Page URL
- Create Batch of Invoices: `/BatchInvoice/Create`

### Target Class
```typescript
import { BatchInvoicePage, BatchInvoiceSearchOptions, BatchInvoiceTab } from './pages/Invoices/BatchInvoicePage';

const batchInvoicePage = new BatchInvoicePage(page);
```

> **Note**: See [Global Keyword Recognition](#global-keyword-recognition) for keyword patterns (search, click, select, etc.)

### Page Structure

| Section | Elements |
|---------|----------|
| Page Header | Batch of Invoices title |
| Tab Navigation | Jobs tab, Draft Invoices tab |
| Filter Section | Hide Filter button, Customers multiselect, Search textbox, Date Logged (Start/End - required), Status multiselect, Job Category multiselect, Show Advanced, Reset Filter, Search button |
| Results Section | All tab (with count), Selected tab (with count), Results table |
| Footer | Total Outstanding Cost, Cancel button, Save button |

### Filter Fields

| Field | Type | Description |
|-------|------|-------------|
| Customer(s) | Multiselect | Select multiple customers |
| Search | Text | Site / Contact / Description / Order No. / Reference |
| Date Logged | Date Range (required) | Start and End date for date logged |
| Status | Multiselect | Open, Complete, Cancelled, On Hold |
| Job Category | Multiselect | Filter by job categories |

### Tabs

| Tab | Description |
|-----|-------------|
| Jobs | View jobs to create invoices |
| Draft Invoices | View draft invoices |

### Intent → Method Mapping

#### Navigation
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| go to batch invoice | `navigateToBatchInvoice()` | - | Navigate to Create Batch of Invoices page |
| verify page loaded | `assertPageLoaded()` | - | Assert page is loaded |
| switch to jobs tab | `switchToTab('Jobs')` | `tab: BatchInvoiceTab` | Switch to Jobs tab |
| switch to draft invoices tab | `switchToTab('Draft Invoices')` | `tab: BatchInvoiceTab` | Switch to Draft Invoices tab |

#### Filter Methods
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| toggle filter | `toggleFilter()` | - | Toggle filter visibility |
| search jobs "maintenance" | `searchJobs(searchText)` | `searchText: string` | Search jobs by text |
| set date range | `setDateLoggedRange(startDate, endDate)` | `startDate: string, endDate: string` | Set date logged range |
| set start date | `setStartDate(date)` | `date: string` | Set start date |
| set end date | `setEndDate(date)` | `date: string` | Set end date |
| click show advanced | `clickShowAdvanced()` | - | Click Show Advanced button |
| click reset filter | `clickResetFilter()` | - | Click Reset Filter button |
| click search | `clickSearch()` | - | Click Search button |
| apply filters | `applyFilters(options)` | `options: BatchInvoiceSearchOptions` | Apply all filters at once |

#### Results Methods
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| switch to all results | `switchToAllResults()` | - | Switch to All results tab |
| switch to selected results | `switchToSelectedResults()` | - | Switch to Selected results tab |
| get all items count | `getAllItemsCount()` | - | Get count of all items (returns number) |
| get selected items count | `getSelectedItemsCount()` | - | Get count of selected items (returns number) |
| check no matching results | `isNoMatchingResultsVisible()` | - | Check if no matching results message visible (returns boolean) |
| select job "JOB001" | `selectJobByNumber(jobNumber)` | `jobNumber: string` | Select job by job number |
| select all jobs | `selectAllJobs()` | - | Select all jobs |

#### Footer Methods
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| get total outstanding cost | `getTotalOutstandingCost()` | - | Get total outstanding cost (returns string) |
| click cancel | `clickCancel()` | - | Click Cancel button |
| click save | `clickSave()` | - | Click Save button |
| check if save enabled | `isSaveEnabled()` | - | Check if Save button is enabled (returns boolean) |

#### High-Level Creation
| User Intent | Method | Parameters | Description |
|-------------|--------|------------|-------------|
| create new batch of invoices | `createNewBatchOfInvoices(data)` | `data: BatchInvoiceData` | Fill form and save batch invoices |
| add new batch of invoices | `createNewBatchOfInvoices(data)` | `data: BatchInvoiceData` | Fill form and save batch invoices |
| create a batch of invoices | `createNewBatchOfInvoices(data)` | `data: BatchInvoiceData` | Fill form and save batch invoices |
| add a batch of invoices | `createNewBatchOfInvoices(data)` | `data: BatchInvoiceData` | Fill form and save batch invoices |
| create batch invoices | `createNewBatchOfInvoices(data)` | `data: BatchInvoiceData` | Fill form and save batch invoices |
| add batch invoices | `createNewBatchOfInvoices(data)` | `data: BatchInvoiceData` | Fill form and save batch invoices |
| fill batch invoice form only | `fillBatchInvoiceForm(data)` | `data: BatchInvoiceData` | Fill form only (does not save) |
| fill new batch invoice form | `fillBatchInvoiceForm(data)` | `data: BatchInvoiceData` | Fill form only (does not save) |

### Data Builder Pattern (Recommended)

```typescript
import { BatchInvoiceBuilder } from '../../data/testData/batchInvoice.data';

// Navigate first, then create
await batchInvoicePage.navigateToBatchInvoice();

// Simple batch invoice with builder
await batchInvoicePage.createNewBatchOfInvoices(
  BatchInvoiceBuilder.create('01/01/2024', '31/12/2024', ['JOB-001', 'JOB-002']).build()
);

// Batch invoice with filters using fluent API
await batchInvoicePage.createNewBatchOfInvoices(
  BatchInvoiceBuilder.create('01/01/2024', '31/12/2024', ['JOB-001'])
    .withCustomers(['ABC Corp', 'Tech Ltd'])
    .withSearchText('Maintenance')
    .withStatuses(['Complete'])
    .build()
);

// Fill form only (without saving)
await batchInvoicePage.fillBatchInvoiceForm(
  BatchInvoiceBuilder.create('01/01/2024', '31/12/2024', ['JOB-001', 'JOB-002'])
    .withJobCategories(['Repair', 'Maintenance'])
    .build()
);
```

#### BatchInvoiceBuilder Methods

| Method | Description |
|--------|-------------|
| `.create(startDate, endDate, jobNumbers)` | Create builder with required fields (date range and array of job numbers) |
| `.withCustomers(string[])` | Add customers filter |
| `.withSearchText(string)` | Add search text filter |
| `.withStatuses(BatchJobStatus[])` | Add status filters |
| `.withJobCategories(string[])` | Add job category filters |
| `.withAdditionalJobs(string[])` | Add additional job numbers |
| `.build()` | Build BatchInvoiceData object |

### High-Level Methods (BatchInvoicePage)

| Method | Parameters | Description |
|--------|------------|-------------|
| `createNewBatchOfInvoices(data)` | `data: BatchInvoiceData` | Fill form and save batch invoices |
| `fillBatchInvoiceForm(data)` | `data: BatchInvoiceData` | Fill form only (does not save) |
| `createBatchInvoice(jobNumbers)` | `jobNumbers: string[]` | Legacy method - select jobs and save |

