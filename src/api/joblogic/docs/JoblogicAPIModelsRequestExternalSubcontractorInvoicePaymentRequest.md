
# JoblogicAPIModelsRequestExternalSubcontractorInvoicePaymentRequest


## Properties

Name | Type
------------ | -------------
`subcontractorJobAllocationId` | string
`invoicePaymentLines` | [Array&lt;JoblogicAPIModelsRequestExternalSubcontractorInvoicePaymentRequest InvoicePaymentLine&gt;](JoblogicAPIModelsRequestExternalSubcontractorInvoicePaymentRequest InvoicePaymentLine.md)
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsRequestExternalSubcontractorInvoicePaymentRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "subcontractorJobAllocationId": null,
  "invoicePaymentLines": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsRequestExternalSubcontractorInvoicePaymentRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsRequestExternalSubcontractorInvoicePaymentRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


