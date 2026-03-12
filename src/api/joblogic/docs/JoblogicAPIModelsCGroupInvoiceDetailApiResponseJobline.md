
# JoblogicAPIModelsCGroupInvoiceDetailApiResponseJobline


## Properties

Name | Type
------------ | -------------
`uniqueId` | string
`jobUniqueId` | string
`jobNumber` | string
`description` | string
`pricePerUnit` | number
`quantity` | number
`totalExcludingVat` | number
`totalIncludingVat` | number
`totalVatAmount` | number
`discountAmount` | number
`discountPercentage` | number
`nominalCodeUniqueId` | string
`taxCodeUniqueId` | string

## Example

```typescript
import type { JoblogicAPIModelsCGroupInvoiceDetailApiResponseJobline } from ''

// TODO: Update the object below with actual values
const example = {
  "uniqueId": null,
  "jobUniqueId": null,
  "jobNumber": null,
  "description": null,
  "pricePerUnit": null,
  "quantity": null,
  "totalExcludingVat": null,
  "totalIncludingVat": null,
  "totalVatAmount": null,
  "discountAmount": null,
  "discountPercentage": null,
  "nominalCodeUniqueId": null,
  "taxCodeUniqueId": null,
} satisfies JoblogicAPIModelsCGroupInvoiceDetailApiResponseJobline

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCGroupInvoiceDetailApiResponseJobline
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


