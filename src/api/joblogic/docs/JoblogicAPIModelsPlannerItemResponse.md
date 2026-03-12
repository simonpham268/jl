
# JoblogicAPIModelsPlannerItemResponse


## Properties

Name | Type
------------ | -------------
`engineerId` | number
`engineerName` | string
`startDate` | Date
`endDate` | Date
`jobId` | number
`jobNumber` | string
`customer` | string
`site` | string
`postcode` | string
`description` | string
`statusId` | [JobLogicMicroserviceCoreContractVisitStatusOption](JobLogicMicroserviceCoreContractVisitStatusOption.md)
`statusDescription` | string
`isRejected` | boolean
`rejectReason` | string
`isAborted` | boolean
`abortReason` | string
`hasRevisit` | boolean
`revisitReason` | string
`typeOfJob` | [JobLogicMicroserviceCoreContractTypeOfJob](JobLogicMicroserviceCoreContractTypeOfJob.md)
`priorityId` | number
`hasPriority` | boolean
`isNonProductiveType` | boolean
`title` | string
`typeId` | string
`typeDescription` | string
`typeIsDeductible` | boolean
`typeIsDeductibleDescription` | string
`nonProductiveStartTime` | [JobLogicMicroserviceCoreContractNonProductiveTimeStart](JobLogicMicroserviceCoreContractNonProductiveTimeStart.md)
`startTimeDescription` | string
`nonProductiveEndTime` | [JobLogicMicroserviceCoreContractNonProductiveTimeEnd](JobLogicMicroserviceCoreContractNonProductiveTimeEnd.md)
`endTimeDescription` | string
`reason` | string

## Example

```typescript
import type { JoblogicAPIModelsPlannerItemResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "engineerId": null,
  "engineerName": null,
  "startDate": null,
  "endDate": null,
  "jobId": null,
  "jobNumber": null,
  "customer": null,
  "site": null,
  "postcode": null,
  "description": null,
  "statusId": null,
  "statusDescription": null,
  "isRejected": null,
  "rejectReason": null,
  "isAborted": null,
  "abortReason": null,
  "hasRevisit": null,
  "revisitReason": null,
  "typeOfJob": null,
  "priorityId": null,
  "hasPriority": null,
  "isNonProductiveType": null,
  "title": null,
  "typeId": null,
  "typeDescription": null,
  "typeIsDeductible": null,
  "typeIsDeductibleDescription": null,
  "nonProductiveStartTime": null,
  "startTimeDescription": null,
  "nonProductiveEndTime": null,
  "endTimeDescription": null,
  "reason": null,
} satisfies JoblogicAPIModelsPlannerItemResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsPlannerItemResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


