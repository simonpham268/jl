export const SUBCONTRACTOR_PO_ENDPOINTS = {
  CREATE: '/SubContractorPO/Create',
  SAVE_ITEM: '/SubContractorPO/SavePOItem',
  COMPLETE_LINE: '/SubContractorPO/SaveCompleteDate',
  RESOLVE: '/SubContractorPO/ResolvePurchaseOrder',
} as const;

export const SUBCONTRACTOR_ENDPOINTS = {
  SEARCH: '/api/Subcontractor/Search',
} as const;
