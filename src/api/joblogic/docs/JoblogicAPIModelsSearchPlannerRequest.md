
# JoblogicAPIModelsSearchPlannerRequest


## Properties

Name | Type
------------ | -------------
`startDate` | string
`endDate` | string
`engineerIds` | Array&lt;number&gt;
`includeCancelledVisits` | boolean
`includeCompletedVisits` | boolean
`includeRejectedVisits` | boolean
`includeReactiveVisits` | boolean
`includePPMVisits` | boolean
`includeNonProductiveTime` | boolean
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsSearchPlannerRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "startDate": null,
  "endDate": null,
  "engineerIds": null,
  "includeCancelledVisits": null,
  "includeCompletedVisits": null,
  "includeRejectedVisits": null,
  "includeReactiveVisits": null,
  "includePPMVisits": null,
  "includeNonProductiveTime": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsSearchPlannerRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsSearchPlannerRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


