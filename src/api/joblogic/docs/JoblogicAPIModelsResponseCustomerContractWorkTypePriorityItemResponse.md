
# JoblogicAPIModelsResponseCustomerContractWorkTypePriorityItemResponse


## Properties

Name | Type
------------ | -------------
`id` | number
`workTypeId` | number
`workTypeDescription` | string
`jobCategoryIds` | string
`jobCategories` | [Array&lt;JoblogicAPIModelsRequestJobCategoryItemModel&gt;](JoblogicAPIModelsRequestJobCategoryItemModel.md)
`priorityId` | number
`priorityDescription` | string
`sellingRateId` | number
`sellingRateDescription` | string

## Example

```typescript
import type { JoblogicAPIModelsResponseCustomerContractWorkTypePriorityItemResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "workTypeId": null,
  "workTypeDescription": null,
  "jobCategoryIds": null,
  "jobCategories": null,
  "priorityId": null,
  "priorityDescription": null,
  "sellingRateId": null,
  "sellingRateDescription": null,
} satisfies JoblogicAPIModelsResponseCustomerContractWorkTypePriorityItemResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsResponseCustomerContractWorkTypePriorityItemResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


