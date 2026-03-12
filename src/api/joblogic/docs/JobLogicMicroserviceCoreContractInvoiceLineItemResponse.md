
# JobLogicMicroserviceCoreContractInvoiceLineItemResponse


## Properties

Name | Type
------------ | -------------
`id` | number
`uniqueId` | string
`isDraft` | boolean
`description` | string
`pricePerUnit` | number
`quantity` | number
`totalExcludingVat` | number
`totalIncludingVat` | number
`totalVatAmount` | number
`discountAmount` | number
`discountPercentage` | number
`nominalCodeId` | string
`nominalCodeDescription` | string
`taxCodeId` | string
`vatRateValue` | number
`taxCodeDescription` | string
`isDiscountLine` | boolean

## Example

```typescript
import type { JobLogicMicroserviceCoreContractInvoiceLineItemResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "uniqueId": null,
  "isDraft": null,
  "description": null,
  "pricePerUnit": null,
  "quantity": null,
  "totalExcludingVat": null,
  "totalIncludingVat": null,
  "totalVatAmount": null,
  "discountAmount": null,
  "discountPercentage": null,
  "nominalCodeId": null,
  "nominalCodeDescription": null,
  "taxCodeId": null,
  "vatRateValue": null,
  "taxCodeDescription": null,
  "isDiscountLine": null,
} satisfies JobLogicMicroserviceCoreContractInvoiceLineItemResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JobLogicMicroserviceCoreContractInvoiceLineItemResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


