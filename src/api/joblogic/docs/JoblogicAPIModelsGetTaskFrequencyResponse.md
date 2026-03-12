
# JoblogicAPIModelsGetTaskFrequencyResponse


## Properties

Name | Type
------------ | -------------
`frequency` | number
`frequencyPeriodNonNA` | boolean
`frequencyPeriod` | [JobLogicMicroserviceCoreContractFrequencyPeriod](JobLogicMicroserviceCoreContractFrequencyPeriod.md)
`serviceKitId` | string
`description` | string

## Example

```typescript
import type { JoblogicAPIModelsGetTaskFrequencyResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "frequency": null,
  "frequencyPeriodNonNA": null,
  "frequencyPeriod": null,
  "serviceKitId": null,
  "description": null,
} satisfies JoblogicAPIModelsGetTaskFrequencyResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsGetTaskFrequencyResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


