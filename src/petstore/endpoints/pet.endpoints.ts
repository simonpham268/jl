export const PET_ENDPOINTS = {
  CREATE: '/pet',
  GET_BY_ID: (id: string | number) => `/pet/${id}`,
  UPDATE: '/pet',
  DELETE: (id: string | number) => `/pet/${id}`,
  FIND_BY_STATUS: '/pet/findByStatus',
} as const;
