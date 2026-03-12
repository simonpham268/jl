
# JoblogicAPIModelsResponseCustomerContractWorkTypeResponse


## Properties

Name | Type
------------ | -------------
`id` | number
`contractId` | number
`description` | string
`projectNumber` | string
`costingMethod` | number
`jobTypeIds` | string
`jobTypes` | [Array&lt;JoblogicAPIModelsRequestJobTypeItemModel&gt;](JoblogicAPIModelsRequestJobTypeItemModel.md)
`sellingRateId` | number
`sellingRateDescription` | string
`isDeleteEnabled` | boolean
`workTypePriorities` | [Array&lt;JoblogicAPIModelsResponseCustomerContractWorkTypePriorityItemResponse&gt;](JoblogicAPIModelsResponseCustomerContractWorkTypePriorityItemResponse.md)

## Example

```typescript
import type { JoblogicAPIModelsResponseCustomerContractWorkTypeResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "contractId": null,
  "description": null,
  "projectNumber": null,
  "costingMethod": null,
  "jobTypeIds": null,
  "jobTypes": null,
  "sellingRateId": null,
  "sellingRateDescription": null,
  "isDeleteEnabled": null,
  "workTypePriorities": null,
} satisfies JoblogicAPIModelsResponseCustomerContractWorkTypeResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsResponseCustomerContractWorkTypeResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


