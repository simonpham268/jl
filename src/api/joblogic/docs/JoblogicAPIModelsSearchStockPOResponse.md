
# JoblogicAPIModelsSearchStockPOResponse


## Properties

Name | Type
------------ | -------------
`items` | [Array&lt;JoblogicAPIModelsStockPOItemResponse&gt;](JoblogicAPIModelsStockPOItemResponse.md)
`totalCount` | number
`pageIndex` | number
`pageSize` | number

## Example

```typescript
import type { JoblogicAPIModelsSearchStockPOResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "items": null,
  "totalCount": null,
  "pageIndex": null,
  "pageSize": null,
} satisfies JoblogicAPIModelsSearchStockPOResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsSearchStockPOResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


