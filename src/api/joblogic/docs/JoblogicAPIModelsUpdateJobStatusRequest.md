
# JoblogicAPIModelsUpdateJobStatusRequest


## Properties

Name | Type
------------ | -------------
`jobId` | number
`statusId` | string
`updatedBy` | number
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsUpdateJobStatusRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "jobId": null,
  "statusId": null,
  "updatedBy": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsUpdateJobStatusRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsUpdateJobStatusRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


