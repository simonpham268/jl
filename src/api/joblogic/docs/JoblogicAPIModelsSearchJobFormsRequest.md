
# JoblogicAPIModelsSearchJobFormsRequest


## Properties

Name | Type
------------ | -------------
`searchTerm` | string
`jobUniqueId` | string
`isForAssign` | boolean
`orderBy` | [JobLogicMicroserviceLogbookContractCompanyFormEntitySearchOrderBy](JobLogicMicroserviceLogbookContractCompanyFormEntitySearchOrderBy.md)
`pageIndex` | number
`pageSize` | number
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsSearchJobFormsRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "searchTerm": null,
  "jobUniqueId": null,
  "isForAssign": null,
  "orderBy": null,
  "pageIndex": null,
  "pageSize": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsSearchJobFormsRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsSearchJobFormsRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


