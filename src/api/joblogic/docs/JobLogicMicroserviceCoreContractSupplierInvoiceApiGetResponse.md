
# JobLogicMicroserviceCoreContractSupplierInvoiceApiGetResponse


## Properties

Name | Type
------------ | -------------
`id` | string
`purchaseOrderId` | string
`supplierInvoiceType` | string
`invoiceNumber` | string
`customReference` | string
`invoiceDate` | Date
`lines` | [Array&lt;JobLogicMicroserviceCoreContractPurchaseOrderSupplierInvoiceLineGetResponse&gt;](JobLogicMicroserviceCoreContractPurchaseOrderSupplierInvoiceLineGetResponse.md)

## Example

```typescript
import type { JobLogicMicroserviceCoreContractSupplierInvoiceApiGetResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "purchaseOrderId": null,
  "supplierInvoiceType": null,
  "invoiceNumber": null,
  "customReference": null,
  "invoiceDate": null,
  "lines": null,
} satisfies JobLogicMicroserviceCoreContractSupplierInvoiceApiGetResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JobLogicMicroserviceCoreContractSupplierInvoiceApiGetResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


