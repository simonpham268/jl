
# JoblogicAPIModelsTaskItemResponse


## Properties

Name | Type
------------ | -------------
`id` | string
`active` | boolean
`task` | string
`summary` | string
`totalTask` | number
`totalDuration` | number
`subTasks` | [Array&lt;JoblogicAPIModelsTaskLineResponse&gt;](JoblogicAPIModelsTaskLineResponse.md)

## Example

```typescript
import type { JoblogicAPIModelsTaskItemResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "active": null,
  "task": null,
  "summary": null,
  "totalTask": null,
  "totalDuration": null,
  "subTasks": null,
} satisfies JoblogicAPIModelsTaskItemResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsTaskItemResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


