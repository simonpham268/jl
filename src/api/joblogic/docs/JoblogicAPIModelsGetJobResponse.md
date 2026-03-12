
# JoblogicAPIModelsGetJobResponse


## Properties

Name | Type
------------ | -------------
`intId` | number
`id` | string
`externalId` | string
`jobNumber` | string
`description` | string
`status` | string
`jobType` | string
`jobCategory` | string
`priorityLevel` | string
`orderNumber` | string
`referenceNumber` | string
`dateLogged` | Date
`owner` | string
`preferredAppointmentDate` | Date
`targetCompletionDate` | Date
`targetAttendanceDate` | Date
`dateComplete` | Date
`tags` | Array&lt;string&gt;
`contacts` | [Array&lt;JoblogicAPIModelsGetContactRequest&gt;](JoblogicAPIModelsGetContactRequest.md)
`notes` | [Array&lt;JoblogicAPIModelsNoteRequest&gt;](JoblogicAPIModelsNoteRequest.md)
`customer` | [JoblogicAPIModelsGetJobCustomerResponse](JoblogicAPIModelsGetJobCustomerResponse.md)
`site` | [JoblogicAPIModelsGetJobSiteResponse](JoblogicAPIModelsGetJobSiteResponse.md)
`portalLink` | string
`additionalDetail` | [JoblogicAPIModelsGetJobResponse JobAdditionalDetail](JoblogicAPIModelsGetJobResponse JobAdditionalDetail.md)
`projectNumber` | string
`pPMContractId` | string
`contractUniqueId` | string
`contractNumber` | string

## Example

```typescript
import type { JoblogicAPIModelsGetJobResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "intId": null,
  "id": null,
  "externalId": null,
  "jobNumber": null,
  "description": null,
  "status": null,
  "jobType": null,
  "jobCategory": null,
  "priorityLevel": null,
  "orderNumber": null,
  "referenceNumber": null,
  "dateLogged": null,
  "owner": null,
  "preferredAppointmentDate": null,
  "targetCompletionDate": null,
  "targetAttendanceDate": null,
  "dateComplete": null,
  "tags": null,
  "contacts": null,
  "notes": null,
  "customer": null,
  "site": null,
  "portalLink": null,
  "additionalDetail": null,
  "projectNumber": null,
  "pPMContractId": null,
  "contractUniqueId": null,
  "contractNumber": null,
} satisfies JoblogicAPIModelsGetJobResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsGetJobResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


