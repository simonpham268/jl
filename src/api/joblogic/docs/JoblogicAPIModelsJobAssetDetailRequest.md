
# JoblogicAPIModelsJobAssetDetailRequest


## Properties

Name | Type
------------ | -------------
`siteAssetId` | number
`serviceTypeId` | string
`frequency` | number
`frequencyPeriod` | [JobLogicMicroserviceCoreContractFrequencyPeriod](JobLogicMicroserviceCoreContractFrequencyPeriod.md)

## Example

```typescript
import type { JoblogicAPIModelsJobAssetDetailRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "siteAssetId": null,
  "serviceTypeId": null,
  "frequency": null,
  "frequencyPeriod": null,
} satisfies JoblogicAPIModelsJobAssetDetailRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsJobAssetDetailRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


