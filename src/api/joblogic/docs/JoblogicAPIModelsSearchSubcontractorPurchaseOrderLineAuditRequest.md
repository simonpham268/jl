
# JoblogicAPIModelsSearchSubcontractorPurchaseOrderLineAuditRequest


## Properties

Name | Type
------------ | -------------
`subcontractorPurchaseOrderLineId` | string
`orderBy` | [JobLogicMicroserviceAuditContractAuditOrderBy](JobLogicMicroserviceAuditContractAuditOrderBy.md)
`pageIndex` | number
`pageSize` | number
`startDate` | Date
`endDate` | Date
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsSearchSubcontractorPurchaseOrderLineAuditRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "subcontractorPurchaseOrderLineId": null,
  "orderBy": null,
  "pageIndex": null,
  "pageSize": null,
  "startDate": null,
  "endDate": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsSearchSubcontractorPurchaseOrderLineAuditRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsSearchSubcontractorPurchaseOrderLineAuditRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


