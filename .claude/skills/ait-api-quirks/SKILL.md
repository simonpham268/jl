---
name: ait-api-quirks
description: AIT (automationintesting.online) API quirks reference. Use when writing or fixing tests that call /api/room/ or /api/booking/, or when diagnosing API failures (status 200/201/400/401). Covers response shapes, validation length rules, auth requirements, and required query params. Load this when you see roomService/bookingService calls or AIT API HTTP status assertions in code being touched.
---

# AIT API Quirks

Base URL: `https://automationintesting.online` (set via `AIT_BASE_URL` in `.env.uat`).
Auth: `token` cookie loaded from `.auth/ait-admin.json` storage state (default in `playwright.config.ts`).

---

## /api/room/

### POST /api/room/ — create room

| Aspect | Value |
|---|---|
| Success status | **200** (NOT 201) |
| Response body | `{ "success": true }` — **NO `roomid` returned** |
| To get roomid | Call `roomService.findRoomByName(name)` after create — it `GET /api/room/` then filters by `roomName` |
| Required fields | `roomName` (string), `type` (string), `accessible` (boolean), `roomPrice` (number) |
| Optional fields | `image` (url string), `description` (string), `features` (string[]) |
| Common types | `'Single'`, `'Twin'`, `'Double'`, `'Family'`, `'Suite'` |

### GET /api/room/ — list rooms

| Aspect | Value |
|---|---|
| Success status | 200 |
| Response body | `{ "rooms": Room[] }` where `Room` has `roomid`, `roomName`, `type`, `accessible`, `image`, `description`, `features`, `roomPrice` |

### DELETE /api/room/{id}

| Aspect | Value |
|---|---|
| Success status | 202 / 200 |
| Auth | required |

---

## /api/booking/

### POST /api/booking/ — create booking

| Aspect | Value |
|---|---|
| Success status | **201** |
| Response body | `{ bookingid, firstname, lastname, depositpaid, roomid, bookingdates }` (full booking object) |
| Required fields | `roomid` (number), `firstname` (string), `lastname` (string), `depositpaid` (boolean), `bookingdates: { checkin, checkout }` (YYYY-MM-DD strings) |
| Optional fields | `email`, `phone` |

**Validation rules** — violating these returns `400` with errors array:

| Field | Rule | Error text on violation |
|---|---|---|
| `firstname` | length 3–30 | `"size must be between 3 and 30"` |
| `lastname` | length 3–30 | `"size must be between 3 and 30"` |
| `phone` | length 11–21 | `"size must be between 11 and 21"` |
| `bookingdates.checkin` | YYYY-MM-DD format, valid date | `"must be a date"` / `"must not be null"` |
| `bookingdates.checkout` | same as checkin | same |

→ **Don't use `"QA"` as lastname in test data** — it's 2 chars and gets rejected. Use `"Pham"`, `"Test"`, etc.
→ **Phone `"0905321920"` is 10 chars** — gets rejected. Use `"01234567890"` (11 chars) minimum.

### GET /api/booking/

| Aspect | Value |
|---|---|
| Required query param | `?roomid=<id>` — without it returns 400 `"Room ID is required"` |
| Success status | 200 |
| Response body | `{ "bookings": Booking[] }` filtered by room |

### DELETE /api/booking/{id}

| Aspect | Value |
|---|---|
| Auth | required |

---

## Auth

| Symptom | Cause | Fix |
|---|---|---|
| `401 Unauthorized` on any `/api/*` | Missing `token` cookie | Verify `.auth/ait-admin.json` exists and has `cookies[].name === 'token'`; check `storageState` in `playwright.config.ts` points to it |
| `401` after global setup ran but storage state file is empty `{ cookies: [], origins: [] }` | Login form succeeded URL match BEFORE cookie was set | In `global.setup.ts`, do NOT `waitForURL(/admin/)` after click — wait for a post-login element like `getByRole('link', { name: 'Rooms' })` |

---

## Quick reference: typical test flow

```typescript
// Create room → look up ID → use ID for booking
const roomData = { roomName: `QA-${Date.now()}`, type: 'Double', accessible: true, roomPrice: 150 };
const createResp = await roomService.createRoom(roomData);
expect(createResp.status).toBe(200);                         // ← 200 not 201

const room = await roomService.findRoomByName(roomData.roomName);
expect(room).toBeDefined();
const roomId = room!.roomid;                                 // ← lookup, not from createResp

const bookingResp = await roomService.createBooking({
  roomid: roomId,
  firstname: 'Vien', lastname: 'Pham',                       // ← 3+ chars each
  depositpaid: true,
  email: 'test@example.com',
  phone: '01234567890',                                      // ← 11+ chars
  bookingdates: { checkin: '2026-06-01', checkout: '2026-06-05' },
});
expect(bookingResp.status).toBe(201);                        // ← 201 here
expect(bookingResp.body?.bookingid).toBeDefined();           // ← bookingid IS returned

// Cleanup (afterEach)
await roomService.deleteBooking(bookingResp.body!.bookingid);
await roomService.deleteRoom(roomId);
```
