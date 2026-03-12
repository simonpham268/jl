
# JoblogicAPIModelsVisitCreateResponse


## Properties

Name | Type
------------ | -------------
`id` | number
`uniqueId` | string
`jobId` | number
`engineerStringId` | string
`engineerId` | number
`engineerName` | string
`statusId` | [JobLogicMicroserviceCoreContractVisitStatusOption](JobLogicMicroserviceCoreContractVisitStatusOption.md)
`statusDescription` | string
`appointment` | [JobLogicMicroserviceCoreContractAppointmentStatus](JobLogicMicroserviceCoreContractAppointmentStatus.md)
`startDate` | Date
`endDate` | Date
`isRejected` | boolean
`rejectReason` | string
`isAborted` | boolean
`abortReason` | string
`hasRevisit` | boolean
`revisitReason` | string

## Example

```typescript
import type { JoblogicAPIModelsVisitCreateResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "uniqueId": null,
  "jobId": null,
  "engineerStringId": null,
  "engineerId": null,
  "engineerName": null,
  "statusId": null,
  "statusDescription": null,
  "appointment": null,
  "startDate": null,
  "endDate": null,
  "isRejected": null,
  "rejectReason": null,
  "isAborted": null,
  "abortReason": null,
  "hasRevisit": null,
  "revisitReason": null,
} satisfies JoblogicAPIModelsVisitCreateResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsVisitCreateResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


