
# JoblogicAPIModelsContactItemResponse


## Properties

Name | Type
------------ | -------------
`id` | string
`firstName` | string
`lastName` | string
`isVisible` | boolean
`position` | string
`telephone` | string
`email` | string
`version` | string
`externalId` | string
`eDIAdditionalData` | string
`secondaryTelephone` | string
`useSecondaryTelephoneForSMS` | boolean
`contactLevels` | [Array&lt;JoblogicAPIModelsContactItemResponse ContactLevelItemResponse&gt;](JoblogicAPIModelsContactItemResponse ContactLevelItemResponse.md)

## Example

```typescript
import type { JoblogicAPIModelsContactItemResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "firstName": null,
  "lastName": null,
  "isVisible": null,
  "position": null,
  "telephone": null,
  "email": null,
  "version": null,
  "externalId": null,
  "eDIAdditionalData": null,
  "secondaryTelephone": null,
  "useSecondaryTelephoneForSMS": null,
  "contactLevels": null,
} satisfies JoblogicAPIModelsContactItemResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsContactItemResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


