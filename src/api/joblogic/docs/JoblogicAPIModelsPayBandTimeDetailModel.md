
# JoblogicAPIModelsPayBandTimeDetailModel


## Properties

Name | Type
------------ | -------------
`uniqueId` | string
`payBand` | string
`startTime` | string
`endTime` | string
`payBandId` | string
`paybandName` | string
`weekDay` | [SystemDayOfWeek](SystemDayOfWeek.md)
`day` | string
`labourCostRate` | number
`travelCostRate` | number
`mileageCostRate` | number
`colour` | string
`contractSiteId` | number
`siteId` | number
`type` | [JoblogicAPIPaybandTimeType](JoblogicAPIPaybandTimeType.md)
`contractNumber` | string

## Example

```typescript
import type { JoblogicAPIModelsPayBandTimeDetailModel } from ''

// TODO: Update the object below with actual values
const example = {
  "uniqueId": null,
  "payBand": null,
  "startTime": null,
  "endTime": null,
  "payBandId": null,
  "paybandName": null,
  "weekDay": null,
  "day": null,
  "labourCostRate": null,
  "travelCostRate": null,
  "mileageCostRate": null,
  "colour": null,
  "contractSiteId": null,
  "siteId": null,
  "type": null,
  "contractNumber": null,
} satisfies JoblogicAPIModelsPayBandTimeDetailModel

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsPayBandTimeDetailModel
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


