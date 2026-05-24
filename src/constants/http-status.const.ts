/**
 * HTTP status codes used in API assertions.
 *
 * Note AIT quirk: `POST /api/room/` returns 200 (not 201). See `ait-api-quirks` skill.
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
