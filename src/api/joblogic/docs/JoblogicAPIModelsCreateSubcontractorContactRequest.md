
# JoblogicAPIModelsCreateSubcontractorContactRequest


## Properties

Name | Type
------------ | -------------
`subcontractorId` | string
`isPrimary` | boolean
`firstName` | string
`lastName` | string
`telephone` | string
`secondaryTelephone` | string
`email` | string
`position` | string
`validateTelephoneNumber` | boolean
`countryCode` | string
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsCreateSubcontractorContactRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "subcontractorId": null,
  "isPrimary": null,
  "firstName": null,
  "lastName": null,
  "telephone": null,
  "secondaryTelephone": null,
  "email": null,
  "position": null,
  "validateTelephoneNumber": null,
  "countryCode": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsCreateSubcontractorContactRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCreateSubcontractorContactRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


