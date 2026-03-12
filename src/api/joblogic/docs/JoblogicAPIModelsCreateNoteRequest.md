
# JoblogicAPIModelsCreateNoteRequest


## Properties

Name | Type
------------ | -------------
`entityId` | string
`entityType` | [JoblogicAPINoteEntityType](JoblogicAPINoteEntityType.md)
`noteText` | string
`dateAdded` | Date
`isPrivate` | boolean
`attachments` | [Array&lt;JoblogicAPIModelsAttachmentRequest&gt;](JoblogicAPIModelsAttachmentRequest.md)
`tags` | Array&lt;string&gt;
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsCreateNoteRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "entityId": null,
  "entityType": null,
  "noteText": null,
  "dateAdded": null,
  "isPrivate": null,
  "attachments": null,
  "tags": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsCreateNoteRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCreateNoteRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


