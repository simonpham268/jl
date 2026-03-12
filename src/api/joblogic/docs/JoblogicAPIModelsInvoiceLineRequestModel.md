
# JoblogicAPIModelsInvoiceLineRequestModel


## Properties

Name | Type
------------ | -------------
`description` | string
`pricePerUnit` | number
`quantity` | number
`taxCodeId` | string
`nominalCodeId` | string
`discountAmount` | number
`discountPercentage` | number

## Example

```typescript
import type { JoblogicAPIModelsInvoiceLineRequestModel } from ''

// TODO: Update the object below with actual values
const example = {
  "description": null,
  "pricePerUnit": null,
  "quantity": null,
  "taxCodeId": null,
  "nominalCodeId": null,
  "discountAmount": null,
  "discountPercentage": null,
} satisfies JoblogicAPIModelsInvoiceLineRequestModel

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsInvoiceLineRequestModel
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


