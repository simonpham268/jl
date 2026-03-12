
# JoblogicAPIModelsAddStockPOItemRequest


## Properties

Name | Type
------------ | -------------
`stockPOId` | string
`description` | string
`quantity` | number
`pricePerUnit` | number
`discount` | number
`partId` | number
`equipmentId` | number
`taxCodeId` | string
`nominalCodeId` | string
`rackShelfId` | number
`refrigerantTypeId` | string
`lineType` | [JoblogicAPIPurchaseOrderLineType](JoblogicAPIPurchaseOrderLineType.md)
`tagIds` | Array&lt;string&gt;
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsAddStockPOItemRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "stockPOId": null,
  "description": null,
  "quantity": null,
  "pricePerUnit": null,
  "discount": null,
  "partId": null,
  "equipmentId": null,
  "taxCodeId": null,
  "nominalCodeId": null,
  "rackShelfId": null,
  "refrigerantTypeId": null,
  "lineType": null,
  "tagIds": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsAddStockPOItemRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsAddStockPOItemRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


