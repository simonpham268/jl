export const ASSET_ENDPOINTS = {
  LIST: '/api/Asset/GetAssets',
  GET_BY_ID: (id: string | number) => `/api/Asset/GetAsset/${id}`,
  CREATE: '/api/Asset/SaveAsset',
  UPDATE: (id: string | number) => `/api/Asset/UpdateAsset/${id}`,
  DELETE: (id: string | number) => `/api/Asset/DeleteAsset/${id}`,
  SEARCH: '/api/Asset/SearchAssets',
  GET_BY_SITE: (siteId: string | number) => `/api/Asset/GetAssetsBySite/${siteId}`,
  GET_BY_CUSTOMER: (customerId: string | number) => `/api/Asset/GetAssetsByCustomer/${customerId}`,
} as const;
