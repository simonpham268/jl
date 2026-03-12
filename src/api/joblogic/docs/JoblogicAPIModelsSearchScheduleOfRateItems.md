
# JoblogicAPIModelsSearchScheduleOfRateItems


## Properties

Name | Type
------------ | -------------
`id` | number
`uniqueId` | string
`code` | string
`description` | string
`sell` | number
`cost` | number
`libraryId` | number
`tradeCategoryId` | number
`tradeCategoryCode` | string
`tradeCategoryDescription` | string
`createdAt` | Date
`createdByUserName` | string
`tagIds` | Array&lt;string&gt;
`longDescription` | string
`commentsRequired` | boolean
`fixedValueRate` | boolean
`hasChangedPrice` | boolean
`scheduleOfRateItemSplits` | [Array&lt;JoblogicAPIModelsScheduleOfRateSplitModel&gt;](JoblogicAPIModelsScheduleOfRateSplitModel.md)

## Example

```typescript
import type { JoblogicAPIModelsSearchScheduleOfRateItems } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "uniqueId": null,
  "code": null,
  "description": null,
  "sell": null,
  "cost": null,
  "libraryId": null,
  "tradeCategoryId": null,
  "tradeCategoryCode": null,
  "tradeCategoryDescription": null,
  "createdAt": null,
  "createdByUserName": null,
  "tagIds": null,
  "longDescription": null,
  "commentsRequired": null,
  "fixedValueRate": null,
  "hasChangedPrice": null,
  "scheduleOfRateItemSplits": null,
} satisfies JoblogicAPIModelsSearchScheduleOfRateItems

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsSearchScheduleOfRateItems
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


