
# JoblogicAPIModelsAssignJobFormsRequest


## Properties

Name | Type
------------ | -------------
`jobUniqueId` | string
`formUniqueGuid` | string
`showOnRules` | Array&lt;string&gt;
`isRequired` | boolean
`isRequiredOnAsset` | boolean
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsAssignJobFormsRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "jobUniqueId": null,
  "formUniqueGuid": null,
  "showOnRules": null,
  "isRequired": null,
  "isRequiredOnAsset": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsAssignJobFormsRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsAssignJobFormsRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


