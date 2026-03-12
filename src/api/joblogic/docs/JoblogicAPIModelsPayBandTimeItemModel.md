
# JoblogicAPIModelsPayBandTimeItemModel


## Properties

Name | Type
------------ | -------------
`uniqueId` | string
`startTime` | string
`endTime` | string
`title` | string
`weekDay` | [SystemDayOfWeek](SystemDayOfWeek.md)
`day` | string
`labourCostRate` | number
`travelCostRate` | number
`mileageCostRate` | number
`payBandId` | string
`colour` | string

## Example

```typescript
import type { JoblogicAPIModelsPayBandTimeItemModel } from ''

// TODO: Update the object below with actual values
const example = {
  "uniqueId": null,
  "startTime": null,
  "endTime": null,
  "title": null,
  "weekDay": null,
  "day": null,
  "labourCostRate": null,
  "travelCostRate": null,
  "mileageCostRate": null,
  "payBandId": null,
  "colour": null,
} satisfies JoblogicAPIModelsPayBandTimeItemModel

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsPayBandTimeItemModel
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


