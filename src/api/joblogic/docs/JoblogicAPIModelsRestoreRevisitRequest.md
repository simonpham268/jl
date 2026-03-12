
# JoblogicAPIModelsRestoreRevisitRequest


## Properties

Name | Type
------------ | -------------
`restoreRevisitType` | [JoblogicAPIModelsRestoreRevisitType](JoblogicAPIModelsRestoreRevisitType.md)
`jobIds` | Array&lt;number&gt;
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsRestoreRevisitRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "restoreRevisitType": null,
  "jobIds": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsRestoreRevisitRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsRestoreRevisitRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


