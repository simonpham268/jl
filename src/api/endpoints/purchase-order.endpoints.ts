export const PURCHASE_ORDER_ENDPOINTS = {
  CREATE: '/PurchaseOrder/Create',
  ADD_ITEM: '/api/PurchaseOrder/InsertPOItems',
  DELIVER_LINE: '/PurchaseOrder/SaveDeliveryDate',
  RESOLVE: '/PurchaseOrder/ResolvePurchaseOrder',
} as const;

export const SUPPLIER_ENDPOINTS = {
  SEARCH: '/api/Supplier/SupplierSearchJson',
} as const;

export const TAX_CODE_ENDPOINTS = {
  GET_ALL: '/TaxCode/GetTaxCodes',
} as const;
