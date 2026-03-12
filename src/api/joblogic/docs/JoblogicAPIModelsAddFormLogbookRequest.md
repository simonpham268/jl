
# JoblogicAPIModelsAddFormLogbookRequest


## Properties

Name | Type
------------ | -------------
`jobId` | number
`engineerId` | number
`assetId` | number
`formDate` | Date
`formName` | string
`fileSourceType` | [JoblogicAPIFormsLogbookFileSourceType](JoblogicAPIFormsLogbookFileSourceType.md)
`fileBinary` | string
`fileBase64` | string
`fileName` | string
`fileUrl` | string
`isPublic` | boolean
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsAddFormLogbookRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "jobId": null,
  "engineerId": null,
  "assetId": null,
  "formDate": null,
  "formName": null,
  "fileSourceType": null,
  "fileBinary": null,
  "fileBase64": null,
  "fileName": null,
  "fileUrl": null,
  "isPublic": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsAddFormLogbookRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsAddFormLogbookRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


