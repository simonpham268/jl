
# JoblogicAPIModelsJobTasksItemResponse


## Properties

Name | Type
------------ | -------------
`id` | string
`taskTitle` | string
`summary` | string
`isMandatory` | boolean
`subTasks` | [Array&lt;JoblogicAPIModelsJobTaskSubTasksItemResponse&gt;](JoblogicAPIModelsJobTaskSubTasksItemResponse.md)

## Example

```typescript
import type { JoblogicAPIModelsJobTasksItemResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "taskTitle": null,
  "summary": null,
  "isMandatory": null,
  "subTasks": null,
} satisfies JoblogicAPIModelsJobTasksItemResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsJobTasksItemResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


