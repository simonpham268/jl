
# JobLogicMicroserviceCoreContractJobAssetTaskModel


## Properties

Name | Type
------------ | -------------
`jobAssetTaskId` | string
`frequency` | number
`frequencyPeriod` | [JobLogicMicroserviceCoreContractFrequencyPeriod](JobLogicMicroserviceCoreContractFrequencyPeriod.md)
`serviceOrder` | number
`description` | string
`completed` | boolean
`dateCompleted` | Date
`completedById` | number
`completedBy` | string
`duration` | number
`serviceTypeLineId` | string
`isMandatory` | boolean
`reasonId` | string
`inCompleteReason` | string
`criticalityColour` | string
`smartKeywords` | string
`linkUrl` | string
`linkText` | string
`criticalityName` | string

## Example

```typescript
import type { JobLogicMicroserviceCoreContractJobAssetTaskModel } from ''

// TODO: Update the object below with actual values
const example = {
  "jobAssetTaskId": null,
  "frequency": null,
  "frequencyPeriod": null,
  "serviceOrder": null,
  "description": null,
  "completed": null,
  "dateCompleted": null,
  "completedById": null,
  "completedBy": null,
  "duration": null,
  "serviceTypeLineId": null,
  "isMandatory": null,
  "reasonId": null,
  "inCompleteReason": null,
  "criticalityColour": null,
  "smartKeywords": null,
  "linkUrl": null,
  "linkText": null,
  "criticalityName": null,
} satisfies JobLogicMicroserviceCoreContractJobAssetTaskModel

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JobLogicMicroserviceCoreContractJobAssetTaskModel
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


