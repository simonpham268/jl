
# JoblogicAPIModelsGetInvoiceByPurchaseOrderIdResponseInvoice


## Properties

Name | Type
------------ | -------------
`id` | string
`purchaseOrderId` | string
`invoiceNumber` | string
`referenceNumber` | string
`invoiceDate` | string
`type` | [JobLogicMicroserviceCoreContractSubContractorInvoiceType](JobLogicMicroserviceCoreContractSubContractorInvoiceType.md)
`typeDescription` | string
`lines` | [Array&lt;JoblogicAPIModelsGetInvoiceByPurchaseOrderIdResponse Invoice Line&gt;](JoblogicAPIModelsGetInvoiceByPurchaseOrderIdResponse Invoice Line.md)

## Example

```typescript
import type { JoblogicAPIModelsGetInvoiceByPurchaseOrderIdResponseInvoice } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "purchaseOrderId": null,
  "invoiceNumber": null,
  "referenceNumber": null,
  "invoiceDate": null,
  "type": null,
  "typeDescription": null,
  "lines": null,
} satisfies JoblogicAPIModelsGetInvoiceByPurchaseOrderIdResponseInvoice

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsGetInvoiceByPurchaseOrderIdResponseInvoice
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


