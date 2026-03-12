
# JoblogicAPIModelsSearchJobRequest


## Properties

Name | Type
------------ | -------------
`customerId` | number
`siteId` | number
`customerUniqueId` | string
`siteUniqueId` | string
`startDate` | string
`endDate` | string
`startLoggedDate` | string
`endLoggedDate` | string
`startCompleteDate` | string
`endCompleteDate` | string
`statusIds` | string
`categoryIds` | string
`typeIds` | string
`priorityIds` | string
`ownerIds` | string
`areaIds` | string
`tradeIds` | string
`excludeTagIds` | string
`onlyIncludePrimaryJobTrade` | boolean
`includeReactiveJobs` | boolean
`includePPMJobs` | boolean
`includePortalLink` | boolean
`includeTags` | boolean
`includeContacts` | boolean
`includeNotes` | boolean
`customerContractIds` | Array&lt;number&gt;
`orderBy` | [JobLogicMicroserviceCoreContractJobOrderBy](JobLogicMicroserviceCoreContractJobOrderBy.md)
`searchTerm` | string
`searchCondition` | [JobLogicMicroserviceCoreContractEnumsSearchCondtionOption](JobLogicMicroserviceCoreContractEnumsSearchCondtionOption.md)
`tagIds` | string
`includeInactive` | boolean
`pageIndex` | number
`pageSize` | number
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsSearchJobRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "customerId": null,
  "siteId": null,
  "customerUniqueId": null,
  "siteUniqueId": null,
  "startDate": null,
  "endDate": null,
  "startLoggedDate": null,
  "endLoggedDate": null,
  "startCompleteDate": null,
  "endCompleteDate": null,
  "statusIds": null,
  "categoryIds": null,
  "typeIds": null,
  "priorityIds": null,
  "ownerIds": null,
  "areaIds": null,
  "tradeIds": null,
  "excludeTagIds": null,
  "onlyIncludePrimaryJobTrade": null,
  "includeReactiveJobs": null,
  "includePPMJobs": null,
  "includePortalLink": null,
  "includeTags": null,
  "includeContacts": null,
  "includeNotes": null,
  "customerContractIds": null,
  "orderBy": null,
  "searchTerm": null,
  "searchCondition": null,
  "tagIds": null,
  "includeInactive": null,
  "pageIndex": 1,
  "pageSize": 10,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsSearchJobRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsSearchJobRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


