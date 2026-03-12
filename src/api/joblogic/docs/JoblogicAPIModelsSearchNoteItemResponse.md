
# JoblogicAPIModelsSearchNoteItemResponse


## Properties

Name | Type
------------ | -------------
`noteText` | string
`dateAdded` | Date
`author` | string
`modifiedByUser` | string
`modifiedDate` | Date
`noteVisibility` | [JobLogicMicroserviceCoreContractNoteVisibilityOption](JobLogicMicroserviceCoreContractNoteVisibilityOption.md)
`isPinned` | boolean
`pinnedDate` | Date
`uniqueId` | string
`id` | number
`attachments` | [Array&lt;JoblogicAPIModelsSearchNoteAttachmentResponse&gt;](JoblogicAPIModelsSearchNoteAttachmentResponse.md)
`tags` | [Array&lt;JoblogicAPIModelsSearchNoteTagResponse&gt;](JoblogicAPIModelsSearchNoteTagResponse.md)
`toDoId` | string
`entityId` | string
`isFakeNote` | boolean
`isFrozen` | boolean

## Example

```typescript
import type { JoblogicAPIModelsSearchNoteItemResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "noteText": null,
  "dateAdded": null,
  "author": null,
  "modifiedByUser": null,
  "modifiedDate": null,
  "noteVisibility": null,
  "isPinned": null,
  "pinnedDate": null,
  "uniqueId": null,
  "id": null,
  "attachments": null,
  "tags": null,
  "toDoId": null,
  "entityId": null,
  "isFakeNote": null,
  "isFrozen": null,
} satisfies JoblogicAPIModelsSearchNoteItemResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsSearchNoteItemResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


