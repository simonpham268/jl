
# JoblogicAPIModelsUserPermissionResponse


## Properties

Name | Type
------------ | -------------
`userId` | number
`roleIds` | Array&lt;number&gt;
`permissions` | [Array&lt;JoblogicAPIModelsPermissionResponse&gt;](JoblogicAPIModelsPermissionResponse.md)

## Example

```typescript
import type { JoblogicAPIModelsUserPermissionResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "userId": null,
  "roleIds": null,
  "permissions": null,
} satisfies JoblogicAPIModelsUserPermissionResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsUserPermissionResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


