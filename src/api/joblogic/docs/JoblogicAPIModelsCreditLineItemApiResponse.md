
# JoblogicAPIModelsCreditLineItemApiResponse


## Properties

Name | Type
------------ | -------------
`id` | number
`uniqueId` | string
`description` | string
`pricePerUnit` | number
`quantity` | number
`totalExcludingVat` | number
`totalIncludingVat` | number
`totalVatAmount` | number
`nominalCodeUniqueId` | string
`nominalCodeDescription` | string
`taxCodeUniqueId` | string
`taxCodeDescription` | string
`originalInvoiceLineUniqueId` | string

## Example

```typescript
import type { JoblogicAPIModelsCreditLineItemApiResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "uniqueId": null,
  "description": null,
  "pricePerUnit": null,
  "quantity": null,
  "totalExcludingVat": null,
  "totalIncludingVat": null,
  "totalVatAmount": null,
  "nominalCodeUniqueId": null,
  "nominalCodeDescription": null,
  "taxCodeUniqueId": null,
  "taxCodeDescription": null,
  "originalInvoiceLineUniqueId": null,
} satisfies JoblogicAPIModelsCreditLineItemApiResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCreditLineItemApiResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


