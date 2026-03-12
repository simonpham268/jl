
# JoblogicAPIModelsScheduleOfRateSplitConditionalModel


## Properties

Name | Type
------------ | -------------
`scheduleOfRateItemSplitId` | number
`scheduleOfRateSplitConditionPriceId` | number
`condition` | [JobLogicMicroserviceCoreContractSubContractorConditionalPriceType](JobLogicMicroserviceCoreContractSubContractorConditionalPriceType.md)
`fromDate` | Date
`toDate` | Date
`createdAt` | Date
`sell` | number
`cost` | number

## Example

```typescript
import type { JoblogicAPIModelsScheduleOfRateSplitConditionalModel } from ''

// TODO: Update the object below with actual values
const example = {
  "scheduleOfRateItemSplitId": null,
  "scheduleOfRateSplitConditionPriceId": null,
  "condition": null,
  "fromDate": null,
  "toDate": null,
  "createdAt": null,
  "sell": null,
  "cost": null,
} satisfies JoblogicAPIModelsScheduleOfRateSplitConditionalModel

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsScheduleOfRateSplitConditionalModel
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


