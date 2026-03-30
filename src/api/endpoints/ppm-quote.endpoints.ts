export const PPM_QUOTE_ENDPOINTS = {
  CREATE: '/api/PPMQuote/Create',
  LIST: '/api/PPMQuote/List',
  GET_BY_ID: (id: string | number) => `/api/PPMQuote/${id}`,
  GET_BY_CUSTOMER: (customerId: string | number) => `/api/PPMQuote/Customer/${customerId}`,
  GET_BY_SITE: (siteId: string | number) => `/api/PPMQuote/Site/${siteId}`,
  UPDATE: (id: string | number) => `/api/PPMQuote/${id}`,
  DELETE: (id: string | number) => `/api/PPMQuote/${id}`,
  SEARCH: '/api/PPMQuote/Search',
} as const;
