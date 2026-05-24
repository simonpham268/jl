/**
 * Petstore demo Swagger actually uses GET /user/login?username=X&password=Y
 * (returns a session ID string). This scaffold uses standard Bearer JWT POST pattern —
 * change LOGIN method + path if your real API differs.
 */
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REFRESH: '/auth/refresh',
} as const;
