
# JoblogicAPIModelsCreateSupplierInvoiceLineRequest


## Properties

Name | Type
------------ | -------------
`description` | string
`quantity` | number
`pricePerUnit` | number
`taxRate` | number
`discount` | number
`nominalCode` | string
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsCreateSupplierInvoiceLineRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "description": null,
  "quantity": null,
  "pricePerUnit": null,
  "taxRate": null,
  "discount": null,
  "nominalCode": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsCreateSupplierInvoiceLineRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCreateSupplierInvoiceLineRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


