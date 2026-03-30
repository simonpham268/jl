export const SITE_ENDPOINTS = {
  LIST: '/api/Site/GetSites',
  GET_BY_ID: (id: string | number) => `/api/Site/GetSite/${id}`,
  CREATE: '/Site/Create',
  UPDATE: (id: string | number) => `/api/Site/UpdateSite/${id}`,
  DELETE: (id: string | number) => `/api/Site/DeleteSite/${id}`,
  SEARCH: '/api/Site/SearchSites',
  GET_BY_CUSTOMER: (customerId: string | number) => `/api/Site/GetSitesByCustomer/${customerId}`,
} as const;
