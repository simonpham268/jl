
# JoblogicAPIModelsPPMInvoicePayment


## Properties

Name | Type
------------ | -------------
`pPMInvoiceId` | string
`id` | string
`amount` | number
`date` | Date
`notes` | string
`addedByUserId` | number
`addedByUser` | string
`nominalCode` | [JoblogicAPIModelsNominalCodeSearchItem](JoblogicAPIModelsNominalCodeSearchItem.md)
`paymentType` | [JobLogicMicroserviceCoreContractInvoicePaymentType](JobLogicMicroserviceCoreContractInvoicePaymentType.md)
`paymentTypeOtherDescription` | string
`externalReference` | string

## Example

```typescript
import type { JoblogicAPIModelsPPMInvoicePayment } from ''

// TODO: Update the object below with actual values
const example = {
  "pPMInvoiceId": null,
  "id": null,
  "amount": null,
  "date": null,
  "notes": null,
  "addedByUserId": null,
  "addedByUser": null,
  "nominalCode": null,
  "paymentType": null,
  "paymentTypeOtherDescription": null,
  "externalReference": null,
} satisfies JoblogicAPIModelsPPMInvoicePayment

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsPPMInvoicePayment
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


