
# JobLogicMicroserviceCoreContractPurchaseOrderSupplierInvoiceLineGetResponse


## Properties

Name | Type
------------ | -------------
`id` | string
`supplierInvoiceId` | string
`description` | string
`quantity` | number
`pricePerUnit` | number
`taxRate` | number
`nominalCode` | string
`discount` | number
`totalExcludingVatAndDiscount` | number
`totalExcludingVat` | number
`totalIncludingVat` | number
`totalVatAmount` | number

## Example

```typescript
import type { JobLogicMicroserviceCoreContractPurchaseOrderSupplierInvoiceLineGetResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "supplierInvoiceId": null,
  "description": null,
  "quantity": null,
  "pricePerUnit": null,
  "taxRate": null,
  "nominalCode": null,
  "discount": null,
  "totalExcludingVatAndDiscount": null,
  "totalExcludingVat": null,
  "totalIncludingVat": null,
  "totalVatAmount": null,
} satisfies JobLogicMicroserviceCoreContractPurchaseOrderSupplierInvoiceLineGetResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JobLogicMicroserviceCoreContractPurchaseOrderSupplierInvoiceLineGetResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


