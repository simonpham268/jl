export const PETSTORE_CONFIG = {
  defaultHeaders: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  tokenFile: '.auth/petstore-token.json',
} as const;
