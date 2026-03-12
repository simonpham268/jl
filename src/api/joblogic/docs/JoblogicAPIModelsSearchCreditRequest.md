
# JoblogicAPIModelsSearchCreditRequest


## Properties

Name | Type
------------ | -------------
`searchTerm` | string
`tagIds` | string
`pageIndex` | number
`pageSize` | number
`startDate` | string
`endDate` | string
`customerId` | number
`siteId` | number
`jobId` | number
`pPMContractId` | string
`excludeCreditId` | string
`includeStandardCredits` | boolean
`includePPMCredits` | boolean
`includeCGroupCredits` | boolean
`includeSORCredits` | boolean
`getSummary` | boolean
`orderBy` | [JobLogicMicroserviceCoreContractInvoiceOrderBy](JobLogicMicroserviceCoreContractInvoiceOrderBy.md)
`customerContractIds` | Array&lt;number&gt;
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsSearchCreditRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "searchTerm": null,
  "tagIds": null,
  "pageIndex": null,
  "pageSize": null,
  "startDate": null,
  "endDate": null,
  "customerId": null,
  "siteId": null,
  "jobId": null,
  "pPMContractId": null,
  "excludeCreditId": null,
  "includeStandardCredits": null,
  "includePPMCredits": null,
  "includeCGroupCredits": null,
  "includeSORCredits": null,
  "getSummary": null,
  "orderBy": null,
  "customerContractIds": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsSearchCreditRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsSearchCreditRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


