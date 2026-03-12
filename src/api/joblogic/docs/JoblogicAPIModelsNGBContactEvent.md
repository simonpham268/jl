
# JoblogicAPIModelsNGBContactEvent


## Properties

Name | Type
------------ | -------------
`eventType` | number
`isSmsActive` | boolean
`isEmailActive` | boolean
`id` | string
`visitReminders` | [Array&lt;JoblogicAPIModelsNGBVisitReminders ReminderItem&gt;](JoblogicAPIModelsNGBVisitReminders ReminderItem.md)

## Example

```typescript
import type { JoblogicAPIModelsNGBContactEvent } from ''

// TODO: Update the object below with actual values
const example = {
  "eventType": null,
  "isSmsActive": null,
  "isEmailActive": null,
  "id": null,
  "visitReminders": null,
} satisfies JoblogicAPIModelsNGBContactEvent

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsNGBContactEvent
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


