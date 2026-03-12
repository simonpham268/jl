
# JobLogicMicroserviceCoreContractContactModel


## Properties

Name | Type
------------ | -------------
`id` | string
`firstName` | string
`lastName` | string
`telephone` | string
`email` | string
`position` | string
`secondaryTelephone` | string
`useSecondaryTelephoneForSMS` | boolean
`receiveEmailForJob` | boolean
`receiveEmailForQuote` | boolean
`receiveEmailForAccount` | boolean
`receiveEmailForContract` | boolean
`fullName` | string
`isPrimary` | boolean

## Example

```typescript
import type { JobLogicMicroserviceCoreContractContactModel } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "firstName": null,
  "lastName": null,
  "telephone": null,
  "email": null,
  "position": null,
  "secondaryTelephone": null,
  "useSecondaryTelephoneForSMS": null,
  "receiveEmailForJob": null,
  "receiveEmailForQuote": null,
  "receiveEmailForAccount": null,
  "receiveEmailForContract": null,
  "fullName": null,
  "isPrimary": null,
} satisfies JobLogicMicroserviceCoreContractContactModel

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JobLogicMicroserviceCoreContractContactModel
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


