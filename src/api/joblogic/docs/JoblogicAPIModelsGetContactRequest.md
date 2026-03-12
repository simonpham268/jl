
# JoblogicAPIModelsGetContactRequest


## Properties

Name | Type
------------ | -------------
`id` | string
`firstName` | string
`lastName` | string
`telephone` | string
`email` | string
`position` | string
`isPrimary` | boolean
`contactEventDetail` | [JoblogicAPIModelsGetContactRequest ContactEventRequest](JoblogicAPIModelsGetContactRequest ContactEventRequest.md)

## Example

```typescript
import type { JoblogicAPIModelsGetContactRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "firstName": null,
  "lastName": null,
  "telephone": null,
  "email": null,
  "position": null,
  "isPrimary": null,
  "contactEventDetail": null,
} satisfies JoblogicAPIModelsGetContactRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsGetContactRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


