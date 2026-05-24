/**
 * AIT API validation error messages.
 *
 * Returned by `/api/booking/`, `/api/room/` when payload violates length/format rules.
 * See `.claude/skills/ait-api-quirks/SKILL.md` for the full validation table.
 */
export const AIT_ERRORS = {
  NAME_SIZE: 'size must be between 3 and 30',
  PHONE_SIZE: 'size must be between 11 and 21',
  ROOM_ID_REQUIRED: 'Room ID is required',
  DATE_REQUIRED: 'must not be null',
  DATE_INVALID: 'must be a date',
} as const;
