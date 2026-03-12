
# JoblogicAPIModelsGetInvoiceByPurchaseOrderIdResponseInvoiceLine


## Properties

Name | Type
------------ | -------------
`id` | string
`description` | string
`pricePerUnit` | number
`taxRateUniqueId` | string
`nominalCodeUniqueId` | string
`totalExcludingVat` | number
`totalIncludingVat` | number
`totalVatAmount` | number

## Example

```typescript
import type { JoblogicAPIModelsGetInvoiceByPurchaseOrderIdResponseInvoiceLine } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "description": null,
  "pricePerUnit": null,
  "taxRateUniqueId": null,
  "nominalCodeUniqueId": null,
  "totalExcludingVat": null,
  "totalIncludingVat": null,
  "totalVatAmount": null,
} satisfies JoblogicAPIModelsGetInvoiceByPurchaseOrderIdResponseInvoiceLine

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsGetInvoiceByPurchaseOrderIdResponseInvoiceLine
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


