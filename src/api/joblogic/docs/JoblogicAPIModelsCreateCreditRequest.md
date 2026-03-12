
# JoblogicAPIModelsCreateCreditRequest


## Properties

Name | Type
------------ | -------------
`invoiceId` | number
`raisedByUserId` | number
`creditOutstandingInvoiceLines` | boolean
`creditReason` | string
`lines` | [Array&lt;JoblogicAPIModelsCreditLineRequestModel&gt;](JoblogicAPIModelsCreditLineRequestModel.md)
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsCreateCreditRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "invoiceId": null,
  "raisedByUserId": null,
  "creditOutstandingInvoiceLines": null,
  "creditReason": null,
  "lines": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsCreateCreditRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCreateCreditRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


