export const BASE_URL = __ENV.PETSTORE_BASE_URL || 'https://petstore.swagger.io/v2';

export const HEADERS: Record<string, string> = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
