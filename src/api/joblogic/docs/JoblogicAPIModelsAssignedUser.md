
# JoblogicAPIModelsAssignedUser


## Properties

Name | Type
------------ | -------------
`userIdentity` | string
`emailAddress` | string
`type` | string
`assigned` | [JoblogicAPIModelsRequiredBy](JoblogicAPIModelsRequiredBy.md)

## Example

```typescript
import type { JoblogicAPIModelsAssignedUser } from ''

// TODO: Update the object below with actual values
const example = {
  "userIdentity": null,
  "emailAddress": null,
  "type": null,
  "assigned": null,
} satisfies JoblogicAPIModelsAssignedUser

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsAssignedUser
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


