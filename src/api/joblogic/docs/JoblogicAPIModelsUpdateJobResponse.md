
# JoblogicAPIModelsUpdateJobResponse


## Properties

Name | Type
------------ | -------------
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
`preferredAppointmentDate` | Date
`targetCompletionDate` | Date
`targetAttendanceDate` | Date
`dateComplete` | Date
`tags` | Array&lt;string&gt;

## Example

```typescript
import type { JoblogicAPIModelsUpdateJobResponse } from ''

// TODO: Update the object below with actual values
const example = {
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
  "preferredAppointmentDate": null,
  "targetCompletionDate": null,
  "targetAttendanceDate": null,
  "dateComplete": null,
  "tags": null,
} satisfies JoblogicAPIModelsUpdateJobResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsUpdateJobResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


