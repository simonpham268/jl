
# JoblogicAPIModelsCreateContactResponse


## Properties

Name | Type
------------ | -------------
`id` | string
`isPrimary` | boolean
`firstName` | string
`lastName` | string
`telephone` | string
`email` | string
`position` | string
`contactLevelId` | string
`secondaryTelephone` | string

## Example

```typescript
import type { JoblogicAPIModelsCreateContactResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "isPrimary": null,
  "firstName": null,
  "lastName": null,
  "telephone": null,
  "email": null,
  "position": null,
  "contactLevelId": null,
  "secondaryTelephone": null,
} satisfies JoblogicAPIModelsCreateContactResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCreateContactResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


