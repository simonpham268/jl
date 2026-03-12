
# JoblogicAPIModelsPurchaseOrderSupplierInvoiceLineRequest


## Properties

Name | Type
------------ | -------------
`description` | string
`quantity` | number
`pricePerUnit` | number
`taxCodeId` | string
`overriddenTaxAmount` | number
`nominalCodeId` | string
`discountAmount` | number
`discountPercentage` | number
`tags` | Array&lt;string&gt;

## Example

```typescript
import type { JoblogicAPIModelsPurchaseOrderSupplierInvoiceLineRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "description": null,
  "quantity": null,
  "pricePerUnit": null,
  "taxCodeId": null,
  "overriddenTaxAmount": null,
  "nominalCodeId": null,
  "discountAmount": null,
  "discountPercentage": null,
  "tags": null,
} satisfies JoblogicAPIModelsPurchaseOrderSupplierInvoiceLineRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsPurchaseOrderSupplierInvoiceLineRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


