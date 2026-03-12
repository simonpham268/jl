
# JoblogicAPIModelsUpdateContactRequest


## Properties

Name | Type
------------ | -------------
`id` | string
`firstName` | string
`lastName` | string
`telephone` | string
`secondaryTelephone` | string
`countryCode` | string
`email` | string
`position` | string
`validateTelephoneNumber` | boolean
`isPrimary` | boolean
`entityType` | number
`entityId` | string
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsUpdateContactRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "firstName": null,
  "lastName": null,
  "telephone": null,
  "secondaryTelephone": null,
  "countryCode": null,
  "email": null,
  "position": null,
  "validateTelephoneNumber": null,
  "isPrimary": null,
  "entityType": null,
  "entityId": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsUpdateContactRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsUpdateContactRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


