
# JoblogicAPIModelsCreateSupplierInvoice


## Properties

Name | Type
------------ | -------------
`purchaseOrderId` | string
`base64File` | string
`fileName` | string
`invoiceNumber` | string
`invoiceDate` | Date
`taxRate` | number
`amount` | number
`discount` | number
`nominalCode` | string
`referenceNumber` | string
`type` | [JobLogicMicroserviceCoreContractSupplierInvoiceType](JobLogicMicroserviceCoreContractSupplierInvoiceType.md)
`lines` | [Array&lt;JoblogicAPIModelsCreateSupplierInvoiceLineRequest&gt;](JoblogicAPIModelsCreateSupplierInvoiceLineRequest.md)
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsCreateSupplierInvoice } from ''

// TODO: Update the object below with actual values
const example = {
  "purchaseOrderId": null,
  "base64File": null,
  "fileName": null,
  "invoiceNumber": null,
  "invoiceDate": null,
  "taxRate": null,
  "amount": null,
  "discount": null,
  "nominalCode": null,
  "referenceNumber": null,
  "type": null,
  "lines": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsCreateSupplierInvoice

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCreateSupplierInvoice
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


