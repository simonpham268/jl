
# JoblogicAPIModelsSearchStockAdjustmentItemsResponseResponseItem


## Properties

Name | Type
------------ | -------------
`id` | string
`stockId` | number
`description` | string
`rackShelf` | string
`rackShelfId` | number
`number` | string
`unit` | string
`pricePerUnit` | number
`inStock` | number
`adjustedQuantity` | number
`partEquipment` | [JobLogicMicroserviceCoreContractStockRecordType](JobLogicMicroserviceCoreContractStockRecordType.md)

## Example

```typescript
import type { JoblogicAPIModelsSearchStockAdjustmentItemsResponseResponseItem } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "stockId": null,
  "description": null,
  "rackShelf": null,
  "rackShelfId": null,
  "number": null,
  "unit": null,
  "pricePerUnit": null,
  "inStock": null,
  "adjustedQuantity": null,
  "partEquipment": null,
} satisfies JoblogicAPIModelsSearchStockAdjustmentItemsResponseResponseItem

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsSearchStockAdjustmentItemsResponseResponseItem
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


