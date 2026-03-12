
# JoblogicAPIModelsNGBNGBCreateVisitRequest


## Properties

Name | Type
------------ | -------------
`jobUniqueId` | string
`jobNumber` | string
`engineerUniqueId` | string
`teamId` | string
`startDateTime` | string
`endDateTime` | string
`confirmAppointment` | boolean
`sendSMSEmail` | boolean
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsNGBNGBCreateVisitRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "jobUniqueId": null,
  "jobNumber": null,
  "engineerUniqueId": null,
  "teamId": null,
  "startDateTime": null,
  "endDateTime": null,
  "confirmAppointment": null,
  "sendSMSEmail": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsNGBNGBCreateVisitRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsNGBNGBCreateVisitRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


