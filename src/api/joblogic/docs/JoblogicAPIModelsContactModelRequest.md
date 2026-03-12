
# JoblogicAPIModelsContactModelRequest


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
`events` | [Array&lt;JoblogicAPIModelsContactEvent&gt;](JoblogicAPIModelsContactEvent.md)
`visitReminders` | [JoblogicAPIModelsVisitReminders](JoblogicAPIModelsVisitReminders.md)

## Example

```typescript
import type { JoblogicAPIModelsContactModelRequest } from ''

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
} satisfies JoblogicAPIModelsContactModelRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsContactModelRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


