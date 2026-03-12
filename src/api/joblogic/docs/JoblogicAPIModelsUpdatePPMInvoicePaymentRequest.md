
# JoblogicAPIModelsUpdatePPMInvoicePaymentRequest


## Properties

Name | Type
------------ | -------------
`paymentId` | string
`amount` | number
`date` | Date
`addedByUserId` | number
`paymentType` | [JobLogicMicroserviceCoreContractInvoicePaymentType](JobLogicMicroserviceCoreContractInvoicePaymentType.md)
`nominalCodeId` | string
`paymentTypeOtherDescription` | string
`notes` | string
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsUpdatePPMInvoicePaymentRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "paymentId": null,
  "amount": null,
  "date": null,
  "addedByUserId": null,
  "paymentType": null,
  "nominalCodeId": null,
  "paymentTypeOtherDescription": null,
  "notes": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsUpdatePPMInvoicePaymentRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsUpdatePPMInvoicePaymentRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


