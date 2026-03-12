
# JoblogicAPIModelsSearchFormsLogbookRequest


## Properties

Name | Type
------------ | -------------
`searchTerm` | string
`pageIndex` | number
`pageSize` | number
`orderBy` | [JobLogicMicroserviceLogbookContractLogbookOrderBy](JobLogicMicroserviceLogbookContractLogbookOrderBy.md)
`startDate` | Date
`endDate` | Date
`customerId` | number
`siteIds` | Array&lt;number&gt;
`jobId` | number
`assetId` | number
`showPrivate` | boolean
`excludeAttachments` | boolean
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsSearchFormsLogbookRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "searchTerm": null,
  "pageIndex": null,
  "pageSize": null,
  "orderBy": null,
  "startDate": null,
  "endDate": null,
  "customerId": null,
  "siteIds": null,
  "jobId": null,
  "assetId": null,
  "showPrivate": null,
  "excludeAttachments": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsSearchFormsLogbookRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsSearchFormsLogbookRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


