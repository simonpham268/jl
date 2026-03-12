
# JoblogicAPIModelsSubPurchaseOrderLineItemResponse


## Properties

Name | Type
------------ | -------------
`id` | string
`purchaseOrderId` | string
`date` | Date
`pricePerUnit` | number
`quantity` | number
`description` | string
`taxCodeUniqueId` | string
`nominalCodeUniqueId` | string
`tags` | [Array&lt;JoblogicAPIModelsResponseTagItemResponse&gt;](JoblogicAPIModelsResponseTagItemResponse.md)

## Example

```typescript
import type { JoblogicAPIModelsSubPurchaseOrderLineItemResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "purchaseOrderId": null,
  "date": null,
  "pricePerUnit": null,
  "quantity": null,
  "description": null,
  "taxCodeUniqueId": null,
  "nominalCodeUniqueId": null,
  "tags": null,
} satisfies JoblogicAPIModelsSubPurchaseOrderLineItemResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsSubPurchaseOrderLineItemResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


