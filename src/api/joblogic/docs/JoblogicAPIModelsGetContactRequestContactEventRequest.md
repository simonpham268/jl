
# JoblogicAPIModelsGetContactRequestContactEventRequest


## Properties

Name | Type
------------ | -------------
`secondaryTelephone` | string
`useSecondaryTelephoneForSMS` | boolean
`receiveEmailForJob` | boolean
`receiveEmailForQuote` | boolean
`receiveEmailForAccount` | boolean
`receiveEmailForContract` | boolean
`events` | Array&lt;any&gt;

## Example

```typescript
import type { JoblogicAPIModelsGetContactRequestContactEventRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "secondaryTelephone": null,
  "useSecondaryTelephoneForSMS": null,
  "receiveEmailForJob": null,
  "receiveEmailForQuote": null,
  "receiveEmailForAccount": null,
  "receiveEmailForContract": null,
  "events": null,
} satisfies JoblogicAPIModelsGetContactRequestContactEventRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsGetContactRequestContactEventRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


