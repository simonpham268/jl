
# JoblogicAPIModelsSearchInvoiceRequest


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
`excludeInvoiceId` | string
`paymentStatuses` | string
`getSummary` | boolean
`includeStandardInvoices` | boolean
`includePPMInvoices` | boolean
`includeCGroupInvoices` | boolean
`includeSORInvoices` | boolean
`orderBy` | [JobLogicMicroserviceCoreContractInvoiceOrderBy](JobLogicMicroserviceCoreContractInvoiceOrderBy.md)
`customerContractIds` | Array&lt;number&gt;
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsSearchInvoiceRequest } from ''

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
  "excludeInvoiceId": null,
  "paymentStatuses": null,
  "getSummary": null,
  "includeStandardInvoices": null,
  "includePPMInvoices": null,
  "includeCGroupInvoices": null,
  "includeSORInvoices": null,
  "orderBy": null,
  "customerContractIds": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsSearchInvoiceRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsSearchInvoiceRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


