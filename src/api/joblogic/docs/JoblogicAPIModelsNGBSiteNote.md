
# JoblogicAPIModelsNGBSiteNote


## Properties

Name | Type
------------ | -------------
`noteText` | string
`noteVisibility` | [JobLogicMicroserviceCoreContractNoteVisibilityOption](JobLogicMicroserviceCoreContractNoteVisibilityOption.md)
`isPinned` | boolean
`noteTags` | Array&lt;string&gt;
`noteLinks` | [Array&lt;JoblogicAPIModelsNGBSiteNote NoteLinkModel&gt;](JoblogicAPIModelsNGBSiteNote NoteLinkModel.md)

## Example

```typescript
import type { JoblogicAPIModelsNGBSiteNote } from ''

// TODO: Update the object below with actual values
const example = {
  "noteText": null,
  "noteVisibility": null,
  "isPinned": null,
  "noteTags": null,
  "noteLinks": null,
} satisfies JoblogicAPIModelsNGBSiteNote

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsNGBSiteNote
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


