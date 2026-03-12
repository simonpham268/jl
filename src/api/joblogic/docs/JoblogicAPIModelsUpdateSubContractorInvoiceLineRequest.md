
# JoblogicAPIModelsUpdateSubContractorInvoiceLineRequest


## Properties

Name | Type
------------ | -------------
`invoiceLineUniqueId` | string
`description` | string
`pricePerUnit` | number
`taxCodeUniqueId` | string
`nominalCodeUniqueId` | string
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsUpdateSubContractorInvoiceLineRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "invoiceLineUniqueId": null,
  "description": null,
  "pricePerUnit": null,
  "taxCodeUniqueId": null,
  "nominalCodeUniqueId": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsUpdateSubContractorInvoiceLineRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsUpdateSubContractorInvoiceLineRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


