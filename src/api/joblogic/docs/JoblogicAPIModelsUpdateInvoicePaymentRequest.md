
# JoblogicAPIModelsUpdateInvoicePaymentRequest


## Properties

Name | Type
------------ | -------------
`uniqueId` | string
`date` | Date
`amount` | number
`paymentType` | [JobLogicMicroserviceCoreContractInvoicePaymentType](JobLogicMicroserviceCoreContractInvoicePaymentType.md)
`nominalCodeUniqueId` | string
`notes` | string
`paymentTypeOtherDescription` | string
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsUpdateInvoicePaymentRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "uniqueId": null,
  "date": null,
  "amount": null,
  "paymentType": null,
  "nominalCodeUniqueId": null,
  "notes": null,
  "paymentTypeOtherDescription": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsUpdateInvoicePaymentRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsUpdateInvoicePaymentRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


