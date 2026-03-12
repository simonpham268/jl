
# JoblogicAPIModelsSearchPPMContractRequest


## Properties

Name | Type
------------ | -------------
`pageIndex` | number
`pageSize` | number
`orderBy` | [JobLogicMicroserviceCoreContractPPMContractOrderBy](JobLogicMicroserviceCoreContractPPMContractOrderBy.md)
`customerContractIds` | Array&lt;number&gt;
`searchTerm` | string
`siteIds` | Array&lt;number&gt;
`customerId` | number
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsSearchPPMContractRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "pageIndex": null,
  "pageSize": null,
  "orderBy": null,
  "customerContractIds": null,
  "searchTerm": null,
  "siteIds": null,
  "customerId": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsSearchPPMContractRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsSearchPPMContractRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


