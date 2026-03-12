
# JoblogicAPIModelsSearchStockAdjustmentItemResponse


## Properties

Name | Type
------------ | -------------
`id` | string
`createdBy` | string
`locationId` | number
`location` | string
`documentNumber` | string
`adjustmentDate` | Date
`adjustmentDiffValue` | number
`adjustmentDiffString` | string
`noOfItems` | number

## Example

```typescript
import type { JoblogicAPIModelsSearchStockAdjustmentItemResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "createdBy": null,
  "locationId": null,
  "location": null,
  "documentNumber": null,
  "adjustmentDate": null,
  "adjustmentDiffValue": null,
  "adjustmentDiffString": null,
  "noOfItems": null,
} satisfies JoblogicAPIModelsSearchStockAdjustmentItemResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsSearchStockAdjustmentItemResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


