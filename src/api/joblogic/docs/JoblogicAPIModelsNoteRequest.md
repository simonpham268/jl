
# JoblogicAPIModelsNoteRequest


## Properties

Name | Type
------------ | -------------
`privateMode` | [JobLogicMicroserviceCoreContractPrivateMode](JobLogicMicroserviceCoreContractPrivateMode.md)
`noteText` | string
`author` | string
`dateAdded` | Date
`isPrivate` | boolean
`authorId` | number

## Example

```typescript
import type { JoblogicAPIModelsNoteRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "privateMode": null,
  "noteText": null,
  "author": null,
  "dateAdded": null,
  "isPrivate": null,
  "authorId": null,
} satisfies JoblogicAPIModelsNoteRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsNoteRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


