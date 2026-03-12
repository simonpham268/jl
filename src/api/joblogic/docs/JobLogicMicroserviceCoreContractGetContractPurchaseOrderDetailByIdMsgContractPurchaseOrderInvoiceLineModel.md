
# JobLogicMicroserviceCoreContractGetContractPurchaseOrderDetailByIdMsgContractPurchaseOrderInvoiceLineModel


## Properties

Name | Type
------------ | -------------
`id` | string
`purchaseOrderId` | string
`invoiceId` | string
`isFinalInvoice` | boolean
`description` | string
`quantity` | number
`pricePerUnit` | number
`type` | [JobLogicMicroserviceCoreContractContractPurchaseOrderInvoiceType](JobLogicMicroserviceCoreContractContractPurchaseOrderInvoiceType.md)
`taxCodeId` | string
`vatRate` | number
`taxCodeDescription` | string
`overriddenTaxAmount` | number
`nominalCodeId` | string
`nominalCodeValue` | string
`nominalCodeDescription` | string
`totalExcludingVatAndDiscount` | number
`totalExcludingVat` | number
`totalIncludingVat` | number
`totalVatAmount` | number

## Example

```typescript
import type { JobLogicMicroserviceCoreContractGetContractPurchaseOrderDetailByIdMsgContractPurchaseOrderInvoiceLineModel } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "purchaseOrderId": null,
  "invoiceId": null,
  "isFinalInvoice": null,
  "description": null,
  "quantity": null,
  "pricePerUnit": null,
  "type": null,
  "taxCodeId": null,
  "vatRate": null,
  "taxCodeDescription": null,
  "overriddenTaxAmount": null,
  "nominalCodeId": null,
  "nominalCodeValue": null,
  "nominalCodeDescription": null,
  "totalExcludingVatAndDiscount": null,
  "totalExcludingVat": null,
  "totalIncludingVat": null,
  "totalVatAmount": null,
} satisfies JobLogicMicroserviceCoreContractGetContractPurchaseOrderDetailByIdMsgContractPurchaseOrderInvoiceLineModel

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JobLogicMicroserviceCoreContractGetContractPurchaseOrderDetailByIdMsgContractPurchaseOrderInvoiceLineModel
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


