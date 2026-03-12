
# JoblogicAPIModelsScheduleOfRateSplitModel


## Properties

Name | Type
------------ | -------------
`scheduleOfRateItemSplitId` | number
`scheduleOfRateItemId` | number
`scheduleOfRateSplitId` | number
`scheduleOfRateSplitDescription` | string
`scheduleOfRateSplitSell` | number
`scheduleOfRateSplitCost` | number
`createdAt` | Date
`conditionalPrices` | [Array&lt;JoblogicAPIModelsScheduleOfRateSplitConditionalModel&gt;](JoblogicAPIModelsScheduleOfRateSplitConditionalModel.md)

## Example

```typescript
import type { JoblogicAPIModelsScheduleOfRateSplitModel } from ''

// TODO: Update the object below with actual values
const example = {
  "scheduleOfRateItemSplitId": null,
  "scheduleOfRateItemId": null,
  "scheduleOfRateSplitId": null,
  "scheduleOfRateSplitDescription": null,
  "scheduleOfRateSplitSell": null,
  "scheduleOfRateSplitCost": null,
  "createdAt": null,
  "conditionalPrices": null,
} satisfies JoblogicAPIModelsScheduleOfRateSplitModel

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsScheduleOfRateSplitModel
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


