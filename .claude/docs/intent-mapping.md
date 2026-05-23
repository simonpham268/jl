# Intent Mapping — Natural Language → POM Method

> Translates TC step phrasing into POM method calls. Companion files:
> - Framework conventions: [`framework-rules.md`](./framework-rules.md)
> - Healing/troubleshooting: [`healing-rules.md`](./healing-rules.md)

---

## 1. Global Keyword Recognition

Same keywords across all pages — do not repeat per page.

| Action | Keywords (any tense/form) | Method Pattern |
|--------|---------------------------|----------------|
| Text Input | fill, enter, type, input, set, write, put | `fill*(value)` |
| Dropdown | select, choose, pick, set…to, change…to | `select*(value)` |
| Checkbox ON | check, tick, enable, turn on, activate | `set*(true)` |
| Checkbox OFF | uncheck, untick, disable, turn off, deactivate | `set*(false)` |
| Click | click, press, hit, tap, push | `click*()` |
| Toggle | toggle, switch, flip | `toggle*()` |
| Navigate | go to, navigate to, open, access, visit | `navigateTo*()` / `goTo*()` |
| Search | search, find, look up, query, filter | `search(value)` |
| Verify | verify, assert, check, confirm, validate, ensure, expect | `assert*()` |
| Get | get, retrieve, read, obtain, fetch | `get*()` |
| Save | save, submit, confirm, create | `save()` / `clickSave()` |
| Cancel | cancel, discard, abort, go back | `cancel()` / `clickCancel()` |

**Example**: TC writes "enter username 'admin'" → match "enter" → Text Input → `fillUsername('admin')`.
Applies to ALL form fields on ALL pages.

---

## 2. AIT Sections & Method Maps

AIT has 2 sections — pick the right login pattern (see [`framework-rules.md` §4](./framework-rules.md#4-login-patterns)).

### Public site (no auth)

| TC intent | Method |
|---|---|
| go to homepage / open booking page | `bookingHomePage.goToBookingSection()` |
| click Book now on first room / book single room | `bookingHomePage.clickBookNow(0)` |
| click Book now on Nth room | `bookingHomePage.clickBookNow(N-1)` |
| click Reserve now (open form) | `reservationPage.openReserveForm()` |
| fill reservation form + submit | `reservationPage.submitReservation(data)` |
| verify validation message "X" | `reservationPage.assertValidationError('X')` |

### Admin section (auth required)

| TC intent | Method |
|---|---|
| go to admin / login as admin / go to base URL | `adminLoginPage.goToBaseURL()` |
| log in with credentials | `adminLoginPage.login(username, password)` |
| navigate to Rooms section | `adminRoomsPage.navigateToRooms()` |
| verify room "X" with type Y, price Z | `adminRoomsPage.assertRoomDisplayed('X', 'Y', Z)` |
| navigate to Report section | `adminReportPage.navigateToReport()` |
| verify booking for "First Last" | `adminReportPage.assertBookingDisplayed('First Last')` |

### URL Patterns

| Section | URL |
|---|---|
| Homepage | `/` |
| Homepage booking anchor | `/#booking` |
| Reservation for room N | `/reservation/N?checkin=...` |
| Admin login | `/admin` |
| Admin Rooms | `/admin/rooms` |
| Admin Report | `/admin/report` |
| Admin Branding | `/admin/branding` |
| Admin Messages | `/admin/message` |

---

## 3. Reusable Method Templates

### Form page

| Intent | Method |
|---|---|
| open form | `goTo{Form}()` / `navigateTo{Form}()` |
| fill all fields with data | `fill{Entity}Form(data)` |
| submit (Save / Reserve / Create / Login) | `save()` / `clickSubmit()` / `submitReservation()` |
| cancel | `cancel()` / `clickCancel()` |
| high-level create | `create{Entity}(data)` — fill + submit |
| verify error "X" | `assertValidationError('X')` |
| verify success | `assertSubmittedSuccessfully()` |

### List page (admin Rooms, Report, Messages)

| Intent | Method |
|---|---|
| open page | `navigateTo{Section}()` |
| verify entity "X" displayed | `assert{Entity}Displayed('X', ...)` |
| click entity by name | `click{Entity}ByName('X')` |
| click row N | `clickRowByIndex(N-1)` |
| get all visible entities | `getAllVisible{Entities}()` |
| check if entity exists (boolean) | `{entity}Exists('X')` |

---

## 4. Multi-step Collapse Rule

**Trigger**: TC describes one action with numbered sub-steps (form fills, multi-click sequences, modal workflows).

**Rule**: ONE parent method call, named after the parent action. Sub-step values → single data object (3+ values) or positional params (1–2).

```
TC writes:
  Submit reservation:
    1. enter firstname "simmon"
    2. enter lastname "pham"
    3. enter email "simonpham268@gmail.com"
    4. enter phone "0905321920"
    5. click Reserve now

✅ Collapse:
  await reservationPage.submitReservation({
    firstname: 'simmon', lastname: 'pham',
    email: 'simonpham268@gmail.com', phone: '0905321920',
  });

❌ NEVER:
  await reservationPage.fillFirstname('simmon');
  await reservationPage.fillLastname('pham');
  await reservationPage.fillEmail('simonpham268@gmail.com');
  await reservationPage.fillPhone('0905321920');
  await reservationPage.clickReserveNow();
```

**If method doesn't exist**: write `// TODO: implement {methodName}(data)` and flag to user. Do NOT invent sub-calls.

---

## 5. Page Object Discovery

Per-page method lists are **not maintained here** — they drift. Discover from source:

| Section | File |
|---|---|
| Public booking home | `src/pages/AIT/booking-home.page.ts` *(create if missing)* |
| Public reservation | `src/pages/AIT/reservation.page.ts` *(create if missing)* |
| Admin Login | `src/pages/AIT/admin-login.page.ts` |
| Admin Rooms | `src/pages/AIT/admin-rooms.page.ts` |
| Admin Report | `src/pages/AIT/admin-report.page.ts` |
| Admin Branding | `src/pages/AIT/admin-branding.page.ts` *(create if missing)* |
| Admin Messages | `src/pages/AIT/admin-messages.page.ts` *(create if missing)* |

### Discovery procedure

1. `Glob src/pages/AIT/*.ts`
2. `Read` the matching file(s)
3. Extract `async` method signatures — these are the only callable methods
4. **Use exact method names** in the spec — never invent

If a needed method does not exist → add `// TODO: implement {methodName}(...)` in the spec and tell the user. Do NOT create the method during spec generation.
