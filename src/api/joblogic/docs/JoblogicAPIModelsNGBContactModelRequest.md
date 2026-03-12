
# JoblogicAPIModelsNGBContactModelRequest


## Properties

Name | Type
------------ | -------------
`firstName` | string
`lastName` | string
`telephone` | string
`countryCode` | string
`email` | string
`position` | string
`isPrimary` | boolean
`secondaryTelephone` | string
`useSecondaryTelephoneForSMS` | boolean
`receiveEmailForJob` | boolean
`receiveEmailForQuote` | boolean
`receiveEmailForAccount` | boolean
`receiveEmailForContract` | boolean
`events` | [Array&lt;JoblogicAPIModelsNGBContactEvent&gt;](JoblogicAPIModelsNGBContactEvent.md)
`visitReminders` | [JoblogicAPIModelsNGBVisitReminders](JoblogicAPIModelsNGBVisitReminders.md)

## Example

```typescript
import type { JoblogicAPIModelsNGBContactModelRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "firstName": null,
  "lastName": null,
  "telephone": null,
  "countryCode": null,
  "email": null,
  "position": null,
  "isPrimary": null,
  "secondaryTelephone": null,
  "useSecondaryTelephoneForSMS": null,
  "receiveEmailForJob": null,
  "receiveEmailForQuote": null,
  "receiveEmailForAccount": null,
  "receiveEmailForContract": null,
  "events": null,
  "visitReminders": null,
} satisfies JoblogicAPIModelsNGBContactModelRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsNGBContactModelRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


