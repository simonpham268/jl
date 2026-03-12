
# JoblogicAPIModelsRequestCreatePPMVisitRequest


## Properties

Name | Type
------------ | -------------
`pPMUniqueId` | string
`description` | string
`dueDate` | Date
`duration` | number
`tradeId` | string
`jobAssets` | [Array&lt;JoblogicAPIModelsRequestPPMVisitsJobAsset&gt;](JoblogicAPIModelsRequestPPMVisitsJobAsset.md)
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsRequestCreatePPMVisitRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "pPMUniqueId": null,
  "description": null,
  "dueDate": null,
  "duration": null,
  "tradeId": null,
  "jobAssets": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsRequestCreatePPMVisitRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsRequestCreatePPMVisitRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


