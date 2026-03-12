
# JobLogicMicroserviceCoreContractInvoiceSearchCreditItemResponse


## Properties

Name | Type
------------ | -------------
`id` | number
`invoiceId` | number
`creditNumber` | string
`isDraft` | boolean
`dateRaised` | Date
`totalExcludingVat` | number
`totalIncludingVat` | number
`totalVatAmount` | number

## Example

```typescript
import type { JobLogicMicroserviceCoreContractInvoiceSearchCreditItemResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "invoiceId": null,
  "creditNumber": null,
  "isDraft": null,
  "dateRaised": null,
  "totalExcludingVat": null,
  "totalIncludingVat": null,
  "totalVatAmount": null,
} satisfies JobLogicMicroserviceCoreContractInvoiceSearchCreditItemResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JobLogicMicroserviceCoreContractInvoiceSearchCreditItemResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


