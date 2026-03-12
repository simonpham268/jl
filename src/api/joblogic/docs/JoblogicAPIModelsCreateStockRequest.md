
# JoblogicAPIModelsCreateStockRequest


## Properties

Name | Type
------------ | -------------
`partId` | number
`equipmentId` | number
`locationId` | number
`rackShelfId` | number
`quantityInStock` | number
`minimumHolding` | number
`reorderQuantity` | number
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsCreateStockRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "partId": null,
  "equipmentId": null,
  "locationId": null,
  "rackShelfId": null,
  "quantityInStock": null,
  "minimumHolding": null,
  "reorderQuantity": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsCreateStockRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCreateStockRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


