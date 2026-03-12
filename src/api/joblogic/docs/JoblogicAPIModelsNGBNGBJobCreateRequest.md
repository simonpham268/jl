
# JoblogicAPIModelsNGBNGBJobCreateRequest

NGB Job Create Request DTO - Only fields marked \"Yes\" in CREATE column

## Properties

Name | Type
------------ | -------------
`tenantId` | string
`siteId` | number
`status` | string
`primaryJobTrade` | string
`secondaryJobTrades` | Array&lt;string&gt;
`customerContractId` | number
`preferredAppointmentDate` | Date
`comprehensiveAllowance` | number
`compNotes` | string
`pPMContractId` | string
`jobType` | string
`jobCategory` | string
`customerOrderNumber` | string
`referenceNumber` | string
`jobOwnerId` | number
`jobRef1` | string
`jobRef2` | string
`description` | string
`tags` | Array&lt;string&gt;
`nGBProjectNumber` | string
`dateLogged` | Date
`dateComplete` | Date
`priorityLevel` | string
`contactEmail` | string
`nextContactDate` | Date
`targetAttendanceDate` | Date
`targetCompletionDate` | Date
`completionTimeFromDateLogged` | boolean
`notes` | [Array&lt;JoblogicAPIModelsNGBNGBJobNoteCreateRequest&gt;](JoblogicAPIModelsNGBNGBJobNoteCreateRequest.md)
`assets` | [Array&lt;JoblogicAPIModelsNGBNGBJobAssetCreateRequest&gt;](JoblogicAPIModelsNGBNGBJobAssetCreateRequest.md)

## Example

```typescript
import type { JoblogicAPIModelsNGBNGBJobCreateRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "tenantId": null,
  "siteId": null,
  "status": null,
  "primaryJobTrade": null,
  "secondaryJobTrades": null,
  "customerContractId": null,
  "preferredAppointmentDate": null,
  "comprehensiveAllowance": null,
  "compNotes": null,
  "pPMContractId": null,
  "jobType": null,
  "jobCategory": null,
  "customerOrderNumber": null,
  "referenceNumber": null,
  "jobOwnerId": null,
  "jobRef1": null,
  "jobRef2": null,
  "description": null,
  "tags": null,
  "nGBProjectNumber": null,
  "dateLogged": null,
  "dateComplete": null,
  "priorityLevel": null,
  "contactEmail": null,
  "nextContactDate": null,
  "targetAttendanceDate": null,
  "targetCompletionDate": null,
  "completionTimeFromDateLogged": null,
  "notes": null,
  "assets": null,
} satisfies JoblogicAPIModelsNGBNGBJobCreateRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsNGBNGBJobCreateRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


