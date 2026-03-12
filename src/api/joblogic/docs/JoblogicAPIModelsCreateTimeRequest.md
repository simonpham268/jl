
# JoblogicAPIModelsCreateTimeRequest


## Properties

Name | Type
------------ | -------------
`engineerId` | number
`jobId` | number
`timesheetType` | [JoblogicAPITimesheetTypeRequest](JoblogicAPITimesheetTypeRequest.md)
`nonProductiveTypeId` | string
`travelStart` | Date
`labourStart` | Date
`labourEnd` | Date
`mileage` | number
`startTime` | [JobLogicMicroserviceCoreContractNonProductiveTimeStart](JobLogicMicroserviceCoreContractNonProductiveTimeStart.md)
`endTime` | [JobLogicMicroserviceCoreContractNonProductiveTimeEnd](JobLogicMicroserviceCoreContractNonProductiveTimeEnd.md)
`reason` | string
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsCreateTimeRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "engineerId": null,
  "jobId": null,
  "timesheetType": null,
  "nonProductiveTypeId": null,
  "travelStart": null,
  "labourStart": null,
  "labourEnd": null,
  "mileage": null,
  "startTime": null,
  "endTime": null,
  "reason": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsCreateTimeRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCreateTimeRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


