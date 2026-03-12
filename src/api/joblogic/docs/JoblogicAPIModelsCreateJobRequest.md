
# JoblogicAPIModelsCreateJobRequest


## Properties

Name | Type
------------ | -------------
`externalId` | string
`customer` | [JoblogicAPIModelsJobCustomerRequest](JoblogicAPIModelsJobCustomerRequest.md)
`site` | [JoblogicAPIModelsJobSiteRequest](JoblogicAPIModelsJobSiteRequest.md)
`description` | string
`status` | string
`jobType` | string
`jobCategory` | string
`priorityLevel` | string
`orderNumber` | string
`referenceNumber` | string
`dateLogged` | Date
`preferredAppointmentDate` | Date
`targetCompletionDate` | Date
`targetAttendanceDate` | Date
`dateComplete` | Date
`tags` | Array&lt;string&gt;
`contacts` | [Array&lt;JoblogicAPIModelsContactModelRequest&gt;](JoblogicAPIModelsContactModelRequest.md)
`notes` | [Array&lt;JoblogicAPIModelsNoteRequest&gt;](JoblogicAPIModelsNoteRequest.md)
`additionalDetail` | [JoblogicAPIModelsJobAdditionalDetail](JoblogicAPIModelsJobAdditionalDetail.md)
`validateTelephoneNumber` | boolean
`rugbyCaptcha` | string
`validateAuthor` | boolean
`contractUniqueId` | string
`projectNumber` | string
`customerContractId` | number
`comprehensiveAllowance` | number
`compNotes` | string
`assets` | [Array&lt;JoblogicAPIModelsJobAssetDetailRequest&gt;](JoblogicAPIModelsJobAssetDetailRequest.md)
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsCreateJobRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "externalId": null,
  "customer": null,
  "site": null,
  "description": null,
  "status": null,
  "jobType": null,
  "jobCategory": null,
  "priorityLevel": null,
  "orderNumber": null,
  "referenceNumber": null,
  "dateLogged": null,
  "preferredAppointmentDate": null,
  "targetCompletionDate": null,
  "targetAttendanceDate": null,
  "dateComplete": null,
  "tags": null,
  "contacts": null,
  "notes": null,
  "additionalDetail": null,
  "validateTelephoneNumber": null,
  "rugbyCaptcha": null,
  "validateAuthor": null,
  "contractUniqueId": null,
  "projectNumber": null,
  "customerContractId": null,
  "comprehensiveAllowance": null,
  "compNotes": null,
  "assets": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsCreateJobRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCreateJobRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


