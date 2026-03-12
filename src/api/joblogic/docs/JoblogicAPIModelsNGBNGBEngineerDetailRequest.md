
# JoblogicAPIModelsNGBNGBEngineerDetailRequest


## Properties

Name | Type
------------ | -------------
`branchId` | number
`classId` | number
`tradeIds` | Array&lt;string&gt;
`gasRegistrationNumber` | string
`electricalRegistrationNumber` | string
`oilRegistrationNumber` | string
`fgasRegistrationNumber` | string
`workingHours` | [Array&lt;JoblogicAPIModelsNGBNGBWorkingHour&gt;](JoblogicAPIModelsNGBNGBWorkingHour.md)
`deductibleDaysAllowance` | number
`isEndLocationSameStartLocation` | boolean
`startLocation` | [JoblogicAPIModelsNGBNGBEngineerRouteLocationDetail](JoblogicAPIModelsNGBNGBEngineerRouteLocationDetail.md)
`endLocation` | [JoblogicAPIModelsNGBNGBEngineerRouteLocationDetail](JoblogicAPIModelsNGBNGBEngineerRouteLocationDetail.md)
`timesheetSelfViewEnabled` | boolean

## Example

```typescript
import type { JoblogicAPIModelsNGBNGBEngineerDetailRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "branchId": null,
  "classId": null,
  "tradeIds": null,
  "gasRegistrationNumber": null,
  "electricalRegistrationNumber": null,
  "oilRegistrationNumber": null,
  "fgasRegistrationNumber": null,
  "workingHours": null,
  "deductibleDaysAllowance": null,
  "isEndLocationSameStartLocation": null,
  "startLocation": null,
  "endLocation": null,
  "timesheetSelfViewEnabled": null,
} satisfies JoblogicAPIModelsNGBNGBEngineerDetailRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsNGBNGBEngineerDetailRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


