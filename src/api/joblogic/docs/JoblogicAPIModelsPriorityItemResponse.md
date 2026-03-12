
# JoblogicAPIModelsPriorityItemResponse


## Properties

Name | Type
------------ | -------------
`uniqueId` | string
`intId` | number
`stringId` | string
`active` | boolean
`description` | string
`responseBreachTime` | number
`responseBreachColour` | string
`jeopardyBreachTime1` | number
`jeopardyBreachTime1Colour` | string
`jeopardyBreachTime2` | number
`jeopardyBreachTime2Colour` | string
`considerCompanyHours` | boolean
`completionTimeUntilBreach` | number
`completionBreachColor` | string
`jeopardyTimeUntilCompletionBreach1` | number
`jeopardyTimeColorUntilCompletionBreach1` | string
`jeopardyTimeUntilCompletionBreach2` | number
`jeopardyTimeColorUntilCompletionBreach2` | string

## Example

```typescript
import type { JoblogicAPIModelsPriorityItemResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "uniqueId": null,
  "intId": null,
  "stringId": null,
  "active": null,
  "description": null,
  "responseBreachTime": null,
  "responseBreachColour": null,
  "jeopardyBreachTime1": null,
  "jeopardyBreachTime1Colour": null,
  "jeopardyBreachTime2": null,
  "jeopardyBreachTime2Colour": null,
  "considerCompanyHours": null,
  "completionTimeUntilBreach": null,
  "completionBreachColor": null,
  "jeopardyTimeUntilCompletionBreach1": null,
  "jeopardyTimeColorUntilCompletionBreach1": null,
  "jeopardyTimeUntilCompletionBreach2": null,
  "jeopardyTimeColorUntilCompletionBreach2": null,
} satisfies JoblogicAPIModelsPriorityItemResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsPriorityItemResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


