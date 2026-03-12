
# JoblogicAPIModelsNGBNGBJobResponse

NGB Job Response DTO - \"Yes\" fields (exist in current API) + \"No\" fields (need to add for NGB)

## Properties

Name | Type
------------ | -------------
`siteId` | number
`jobId` | number
`status` | string
`primaryJobTrade` | string
`preferredAppointmentDate` | Date
`jobTypeId` | number
`jobType` | string
`jobCategoryId` | number
`jobCategory` | string
`customerOrderNumber` | string
`referenceNumber` | string
`description` | string
`dateLogged` | Date
`dateComplete` | Date
`priorityLevelId` | number
`priorityLevel` | string
`contactEmail` | string
`primaryContact` | [JobLogicMicroserviceCoreContractContactModel](JobLogicMicroserviceCoreContractContactModel.md)
`secondaryJobTrades` | [Array&lt;JobLogicMicroserviceCoreContractTradeItemModel&gt;](JobLogicMicroserviceCoreContractTradeItemModel.md)
`customerContract` | string
`customerContractId` | number
`comprehensiveAllowance` | number
`compNotes` | string
`pPMContractId` | string
`jobOwnerId` | number
`jobOwner` | string
`jobRef1` | string
`jobRef2` | string
`nextContactDate` | Date
`tags` | [Array&lt;JobLogicMicroserviceCoreContractTagItemResponse&gt;](JobLogicMicroserviceCoreContractTagItemResponse.md)
`nGBProjectNumber` | string
`targetAttendanceDate` | Date
`targetCompletionDate` | Date
`completionTimeFromDateLogged` | boolean
`assets` | [Array&lt;JoblogicAPIModelsNGBNGBJobResponse NGBJobAsset&gt;](JoblogicAPIModelsNGBNGBJobResponse NGBJobAsset.md)
`notes` | [Array&lt;JoblogicAPIModelsNGBNGBJobResponse NGBNotes&gt;](JoblogicAPIModelsNGBNGBJobResponse NGBNotes.md)

## Example

```typescript
import type { JoblogicAPIModelsNGBNGBJobResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "siteId": null,
  "jobId": null,
  "status": null,
  "primaryJobTrade": null,
  "preferredAppointmentDate": null,
  "jobTypeId": null,
  "jobType": null,
  "jobCategoryId": null,
  "jobCategory": null,
  "customerOrderNumber": null,
  "referenceNumber": null,
  "description": null,
  "dateLogged": null,
  "dateComplete": null,
  "priorityLevelId": null,
  "priorityLevel": null,
  "contactEmail": null,
  "primaryContact": null,
  "secondaryJobTrades": null,
  "customerContract": null,
  "customerContractId": null,
  "comprehensiveAllowance": null,
  "compNotes": null,
  "pPMContractId": null,
  "jobOwnerId": null,
  "jobOwner": null,
  "jobRef1": null,
  "jobRef2": null,
  "nextContactDate": null,
  "tags": null,
  "nGBProjectNumber": null,
  "targetAttendanceDate": null,
  "targetCompletionDate": null,
  "completionTimeFromDateLogged": null,
  "assets": null,
  "notes": null,
} satisfies JoblogicAPIModelsNGBNGBJobResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsNGBNGBJobResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


