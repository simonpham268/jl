
# JoblogicAPIModelsCreateInvoiceLineRequest


## Properties

Name | Type
------------ | -------------
`invoiceId` | number
`description` | string
`pricePerUnit` | number
`quantity` | number
`taxCodeId` | string
`nominalCodeId` | string
`discountAmount` | number
`discountPercentage` | number
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsCreateInvoiceLineRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "invoiceId": null,
  "description": null,
  "pricePerUnit": null,
  "quantity": null,
  "taxCodeId": null,
  "nominalCodeId": null,
  "discountAmount": null,
  "discountPercentage": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsCreateInvoiceLineRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCreateInvoiceLineRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


