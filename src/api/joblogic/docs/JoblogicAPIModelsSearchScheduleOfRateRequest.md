
# JoblogicAPIModelsSearchScheduleOfRateRequest


## Properties

Name | Type
------------ | -------------
`libraryId` | number
`tradeCategoryId` | number
`scheduleOfRateIds` | Array&lt;number&gt;
`orderBy` | [JobLogicMicroserviceCoreContractScheduleOfRateItemOrderBy](JobLogicMicroserviceCoreContractScheduleOfRateItemOrderBy.md)
`searchTerm` | string
`pageIndex` | number
`pageSize` | number
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsSearchScheduleOfRateRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "libraryId": null,
  "tradeCategoryId": null,
  "scheduleOfRateIds": null,
  "orderBy": null,
  "searchTerm": null,
  "pageIndex": null,
  "pageSize": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsSearchScheduleOfRateRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsSearchScheduleOfRateRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


