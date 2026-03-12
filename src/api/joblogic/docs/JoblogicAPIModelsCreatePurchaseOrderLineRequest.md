
# JoblogicAPIModelsCreatePurchaseOrderLineRequest


## Properties

Name | Type
------------ | -------------
`purchaseOrderId` | string
`description` | string
`quantity` | number
`pricePerUnit` | number
`taxRate` | number
`partId` | string
`number` | string
`discount` | number
`nominalCode` | string
`taxCodeUniqueId` | string
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsCreatePurchaseOrderLineRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "purchaseOrderId": null,
  "description": null,
  "quantity": null,
  "pricePerUnit": null,
  "taxRate": null,
  "partId": null,
  "number": null,
  "discount": null,
  "nominalCode": null,
  "taxCodeUniqueId": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsCreatePurchaseOrderLineRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCreatePurchaseOrderLineRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


