
# JoblogicAPIModelsInvoiceLineItemApiResponse


## Properties

Name | Type
------------ | -------------
`isDraft` | boolean
`id` | number
`uniqueId` | string
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

## Example

```typescript
import type { JoblogicAPIModelsInvoiceLineItemApiResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "isDraft": null,
  "id": null,
  "uniqueId": null,
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
} satisfies JoblogicAPIModelsInvoiceLineItemApiResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsInvoiceLineItemApiResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


