export const CUSTOMER_ENDPOINTS = {
    LIST: '/api/Customer/GetCustomers',
    GET_BY_ID: (id: string | number) => `/api/Customer/GetCustomer/${id}`,
    CREATE: '/Customer/Create',
    UPDATE: (id: string | number) => `/api/Customer/UpdateCustomer/${id}`,
    DELETE: (id: string | number) => `/api/Customer/DeleteCustomer/${id}`,
    SEARCH: '/api/Customer/SearchCustomers',
} as const;
