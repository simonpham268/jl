
# JoblogicAPIModelsJobTaskDetailResponse


## Properties

Name | Type
------------ | -------------
`id` | string
`task` | string
`summary` | string
`subTask` | string
`complete` | boolean
`dateComplete` | Date
`isMandatory` | boolean
`reasonForNotCompleting` | string
`systemDefaultMandatory` | boolean
`taskItem` | [JoblogicAPIModelsJobTasksItemResponse](JoblogicAPIModelsJobTasksItemResponse.md)

## Example

```typescript
import type { JoblogicAPIModelsJobTaskDetailResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "task": null,
  "summary": null,
  "subTask": null,
  "complete": null,
  "dateComplete": null,
  "isMandatory": null,
  "reasonForNotCompleting": null,
  "systemDefaultMandatory": null,
  "taskItem": null,
} satisfies JoblogicAPIModelsJobTaskDetailResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsJobTaskDetailResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


