
# JoblogicAPIModelsRequestWorkTypeRequest


## Properties

Name | Type
------------ | -------------
`workTypeId` | number
`customerContractId` | number
`workTypeDescription` | string
`projectNumber` | string
`workTypeJobTypes` | Array&lt;number&gt;
`costingMethod` | string
`sellingRate` | number
`workTypePriorities` | [Array&lt;JoblogicAPIModelsRequestWorkTypePriorityItemRequest&gt;](JoblogicAPIModelsRequestWorkTypePriorityItemRequest.md)
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsRequestWorkTypeRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "workTypeId": null,
  "customerContractId": null,
  "workTypeDescription": null,
  "projectNumber": null,
  "workTypeJobTypes": null,
  "costingMethod": null,
  "sellingRate": null,
  "workTypePriorities": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsRequestWorkTypeRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsRequestWorkTypeRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


