export const QUOTE_ENDPOINTS = {
  LIST: '/Quote',
  GET_BY_ID: (id: string | number) => `/Quote/Detail/${id}`,
  CREATE: '/Quote/Create',
  UPDATE: (id: string | number) => `/Quote/Edit/${id}`,
  DELETE: (id: string | number) => `/Quote/Delete/${id}`,
  SEARCH: '/Quote',
  GET_BY_CUSTOMER: (customerId: string | number) => `/Quote?customerId=${customerId}`,
  GET_BY_SITE: (siteId: string | number) => `/Quote?siteId=${siteId}`,
} as const;
