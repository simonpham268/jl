
# JobLogicMicroserviceCoreContractWorkingHour


## Properties

Name | Type
------------ | -------------
`dayOfWeek` | [SystemDayOfWeek](SystemDayOfWeek.md)
`start` | [JobLogicMicroserviceCoreContractTime](JobLogicMicroserviceCoreContractTime.md)
`end` | [JobLogicMicroserviceCoreContractTime](JobLogicMicroserviceCoreContractTime.md)
`closeAllDay` | boolean
`onCall` | boolean

## Example

```typescript
import type { JobLogicMicroserviceCoreContractWorkingHour } from ''

// TODO: Update the object below with actual values
const example = {
  "dayOfWeek": null,
  "start": null,
  "end": null,
  "closeAllDay": null,
  "onCall": null,
} satisfies JobLogicMicroserviceCoreContractWorkingHour

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JobLogicMicroserviceCoreContractWorkingHour
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


