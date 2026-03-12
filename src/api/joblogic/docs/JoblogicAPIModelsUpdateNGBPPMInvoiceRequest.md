
# JoblogicAPIModelsUpdateNGBPPMInvoiceRequest


## Properties

Name | Type
------------ | -------------
`id` | string
`dateRaise` | Date
`paymentDueDate` | Date
`accountNumber` | string
`orderNumber` | string
`lines` | [Array&lt;JoblogicAPIModelsUpdatePPMInvoiceLineDetail&gt;](JoblogicAPIModelsUpdatePPMInvoiceLineDetail.md)
`tags` | Array&lt;string&gt;
`invoiceNotes` | [JoblogicAPIModelsUpsertPPMInvoiceNoteDetail](JoblogicAPIModelsUpsertPPMInvoiceNoteDetail.md)
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsUpdateNGBPPMInvoiceRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "dateRaise": null,
  "paymentDueDate": null,
  "accountNumber": null,
  "orderNumber": null,
  "lines": null,
  "tags": null,
  "invoiceNotes": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsUpdateNGBPPMInvoiceRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsUpdateNGBPPMInvoiceRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


