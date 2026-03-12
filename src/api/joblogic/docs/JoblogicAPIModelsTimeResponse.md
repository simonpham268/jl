
# JoblogicAPIModelsTimeResponse


## Properties

Name | Type
------------ | -------------
`uniqueId` | string
`engineerId` | number
`timesheetType` | [JoblogicAPITimesheetTypeResponse](JoblogicAPITimesheetTypeResponse.md)
`jobId` | number
`jobNumber` | string
`siteName` | string
`travelStart` | Date
`labourStart` | Date
`labourEnd` | Date
`mileage` | number
`visitId` | number
`isCostSynced` | boolean
`nonProductiveTypeId` | string
`isDeductible` | boolean
`startTime` | [JobLogicMicroserviceCoreContractNonProductiveTimeStart](JobLogicMicroserviceCoreContractNonProductiveTimeStart.md)
`endTime` | [JobLogicMicroserviceCoreContractNonProductiveTimeEnd](JobLogicMicroserviceCoreContractNonProductiveTimeEnd.md)
`reason` | string
`engineerName` | string

## Example

```typescript
import type { JoblogicAPIModelsTimeResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "uniqueId": null,
  "engineerId": null,
  "timesheetType": null,
  "jobId": null,
  "jobNumber": null,
  "siteName": null,
  "travelStart": null,
  "labourStart": null,
  "labourEnd": null,
  "mileage": null,
  "visitId": null,
  "isCostSynced": null,
  "nonProductiveTypeId": null,
  "isDeductible": null,
  "startTime": null,
  "endTime": null,
  "reason": null,
  "engineerName": null,
} satisfies JoblogicAPIModelsTimeResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsTimeResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


