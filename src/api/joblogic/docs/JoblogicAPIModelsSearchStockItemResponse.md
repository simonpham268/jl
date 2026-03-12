
# JoblogicAPIModelsSearchStockItemResponse


## Properties

Name | Type
------------ | -------------
`id` | number
`numberId` | number
`number` | string
`description` | string
`reference` | string
`pricePerUnit` | number
`sellPerUnit` | number
`inStock` | number
`unit` | string
`stockType` | string
`isActive` | boolean

## Example

```typescript
import type { JoblogicAPIModelsSearchStockItemResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "numberId": null,
  "number": null,
  "description": null,
  "reference": null,
  "pricePerUnit": null,
  "sellPerUnit": null,
  "inStock": null,
  "unit": null,
  "stockType": null,
  "isActive": null,
} satisfies JoblogicAPIModelsSearchStockItemResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsSearchStockItemResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


