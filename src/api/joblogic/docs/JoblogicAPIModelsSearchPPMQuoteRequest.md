
# JoblogicAPIModelsSearchPPMQuoteRequest


## Properties

Name | Type
------------ | -------------
`orderBy` | [JobLogicMicroserviceCoreContractPPMQuoteOrderBy](JobLogicMicroserviceCoreContractPPMQuoteOrderBy.md)
`startDate` | string
`endDate` | string
`contractStartDateStart` | string
`contractStartDateEnd` | string
`contractEndDateStart` | string
`contractEndDateEnd` | string
`customerContractIds` | Array&lt;number&gt;
`statusIds` | [Array&lt;JobLogicMicroserviceCoreContractPPMQuoteStatus&gt;](JobLogicMicroserviceCoreContractPPMQuoteStatus.md)
`searchTerm` | string
`searchCondition` | [JobLogicMicroserviceCoreContractEnumsSearchCondtionOption](JobLogicMicroserviceCoreContractEnumsSearchCondtionOption.md)
`tagIds` | string
`includeInactive` | boolean
`pageIndex` | number
`pageSize` | number
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsSearchPPMQuoteRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "orderBy": null,
  "startDate": null,
  "endDate": null,
  "contractStartDateStart": null,
  "contractStartDateEnd": null,
  "contractEndDateStart": null,
  "contractEndDateEnd": null,
  "customerContractIds": null,
  "statusIds": null,
  "searchTerm": null,
  "searchCondition": null,
  "tagIds": null,
  "includeInactive": null,
  "pageIndex": 1,
  "pageSize": 10,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsSearchPPMQuoteRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsSearchPPMQuoteRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


