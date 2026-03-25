export const QUOTE_ENDPOINTS = {
    LIST: '/api/Quote/GetQuotes',
    GET_BY_ID: (id: string | number) => `/api/Quote/GetQuote/${id}`,
    CREATE: '/api/Quote/CreateQuote',
    UPDATE: (id: string | number) => `/api/Quote/UpdateQuote/${id}`,
    DELETE: (id: string | number) => `/api/Quote/DeleteQuote/${id}`,
    SEARCH: '/api/Quote/SearchQuotes',
    GET_BY_CUSTOMER: (customerId: string | number) => `/api/Quote/GetQuotesByCustomer/${customerId}`,
    GET_BY_SITE: (siteId: string | number) => `/api/Quote/GetQuotesBySite/${siteId}`,
} as const;
