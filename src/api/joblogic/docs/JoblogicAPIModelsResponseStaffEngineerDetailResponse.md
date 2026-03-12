
# JoblogicAPIModelsResponseStaffEngineerDetailResponse


## Properties

Name | Type
------------ | -------------
`isEngineer` | boolean
`branchId` | number
`branchDescription` | string
`classId` | number
`classDescription` | string
`trades` | [Array&lt;JoblogicAPIModelsResponseTradeListViewModel&gt;](JoblogicAPIModelsResponseTradeListViewModel.md)
`gasRegistrationNumber` | string
`electricalRegistrationNumber` | string
`oilRegistrationNumber` | string
`fgasRegistrationNumber` | string
`workingHours` | [Array&lt;JoblogicAPIModelsResponseEngineerWorkingHourResponse&gt;](JoblogicAPIModelsResponseEngineerWorkingHourResponse.md)
`isEndLocationSameStartLocation` | boolean
`startLocation` | [JoblogicAPIModelsResponseEngineerRouteLocationDetailResponse](JoblogicAPIModelsResponseEngineerRouteLocationDetailResponse.md)
`endLocation` | [JoblogicAPIModelsResponseEngineerRouteLocationDetailResponse](JoblogicAPIModelsResponseEngineerRouteLocationDetailResponse.md)
`timesheetSelfViewEnabled` | boolean
`timesheetSelfViewValue` | boolean

## Example

```typescript
import type { JoblogicAPIModelsResponseStaffEngineerDetailResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "isEngineer": null,
  "branchId": null,
  "branchDescription": null,
  "classId": null,
  "classDescription": null,
  "trades": null,
  "gasRegistrationNumber": null,
  "electricalRegistrationNumber": null,
  "oilRegistrationNumber": null,
  "fgasRegistrationNumber": null,
  "workingHours": null,
  "isEndLocationSameStartLocation": null,
  "startLocation": null,
  "endLocation": null,
  "timesheetSelfViewEnabled": null,
  "timesheetSelfViewValue": null,
} satisfies JoblogicAPIModelsResponseStaffEngineerDetailResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsResponseStaffEngineerDetailResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


