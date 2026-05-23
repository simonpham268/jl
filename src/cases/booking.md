# Booking — Phone Validation

## TC001 — Reservation rejects phone shorter than 11 digits

| # | Action | Expected |
|---|--------|----------|
| 1 | Navigate to `https://automationintesting.online/#rooms` | Homepage loads and `#rooms` section is visible |
| 2 | Click the `'Book now'` button on the card has title Single | URL changes to `https://automationintesting.online/reservation/1?checkin=...` |
| 3 | Click the `'Reserve Now'` button on the reservation page | Reservation form appears with inputs: firstname, lastname, email, phone |
| 4 | Enter `'simmon'` in firstname, `'pham'` in lastname, `'simonpham268@gmail.com'` in email, `'0905321920'` in phone | All fields accept the input |
| 5 | Click the `'Reserve Now'` button at the bottom of the form | Red validation warning appears: `"size must be between 11 and 21"` (phone is 10 chars — below minimum) |
