
# JoblogicAPIModelsAddPPMInvoicePaymentRequest


## Properties

Name | Type
------------ | -------------
`pPMInvoiceId` | string
`amount` | number
`date` | Date
`addedByUserId` | number
`paymentType` | [JobLogicMicroserviceCoreContractInvoicePaymentType](JobLogicMicroserviceCoreContractInvoicePaymentType.md)
`nominalCodeId` | string
`paymentTypeOtherDescription` | string
`notes` | string
`sendReceipt` | boolean
`externalReference` | string
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsAddPPMInvoicePaymentRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "pPMInvoiceId": null,
  "amount": null,
  "date": null,
  "addedByUserId": null,
  "paymentType": null,
  "nominalCodeId": null,
  "paymentTypeOtherDescription": null,
  "notes": null,
  "sendReceipt": null,
  "externalReference": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsAddPPMInvoicePaymentRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsAddPPMInvoicePaymentRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


