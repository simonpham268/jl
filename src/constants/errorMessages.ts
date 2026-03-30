export const ERROR_MESSAGES = {
  // Auth errors
  INVALID_CREDENTIALS: 'Invalid email or password',
  UNAUTHORIZED: 'You are not authorized to perform this action',
  TOKEN_EXPIRED: 'Your session has expired. Please login again',

  // Validation errors
  REQUIRED_FIELD: (field: string) => `${field} is required`,
  INVALID_EMAIL: 'Please enter a valid email address',
  PASSWORD_TOO_SHORT: 'Password must be at least 8 characters',

  // Resource errors
  NOT_FOUND: (resource: string) => `${resource} not found`,
  ALREADY_EXISTS: (resource: string) => `${resource} already exists`,

  // Server errors
  INTERNAL_ERROR: 'An unexpected error occurred. Please try again later',
  SERVICE_UNAVAILABLE: 'Service is temporarily unavailable',

  // Network errors
  NETWORK_ERROR: 'Unable to connect to the server',
  TIMEOUT: 'Request timed out. Please try again'
} as const;
