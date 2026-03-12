
# JoblogicAPIModelsUpdateSupplierContactRequest


## Properties

Name | Type
------------ | -------------
`id` | number
`supplierId` | string
`firstName` | string
`lastName` | string
`telephone` | string
`email` | string
`position` | string
`secondaryTelephone` | string
`isPrimary` | boolean
`validateTelephoneNumber` | boolean
`countryCode` | string
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsUpdateSupplierContactRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "supplierId": null,
  "firstName": null,
  "lastName": null,
  "telephone": null,
  "email": null,
  "position": null,
  "secondaryTelephone": null,
  "isPrimary": null,
  "validateTelephoneNumber": null,
  "countryCode": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsUpdateSupplierContactRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsUpdateSupplierContactRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


