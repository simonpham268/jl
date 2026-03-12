
# JoblogicAPIModelsStockAdjustmentItemsSearchRequest


## Properties

Name | Type
------------ | -------------
`stockAdjustmentId` | string
`searchTerm` | string
`includeInactive` | boolean
`pageIndex` | number
`pageSize` | number
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsStockAdjustmentItemsSearchRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "stockAdjustmentId": null,
  "searchTerm": null,
  "includeInactive": null,
  "pageIndex": null,
  "pageSize": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsStockAdjustmentItemsSearchRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsStockAdjustmentItemsSearchRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


