
# JoblogicAPIModelsAuditItemResponse


## Properties

Name | Type
------------ | -------------
`id` | string
`type` | string
`entityId` | string
`entityStringId` | string
`action` | string
`detail` | any
`operationTime` | Date
`userId` | string
`userName` | string

## Example

```typescript
import type { JoblogicAPIModelsAuditItemResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "type": null,
  "entityId": null,
  "entityStringId": null,
  "action": null,
  "detail": null,
  "operationTime": null,
  "userId": null,
  "userName": null,
} satisfies JoblogicAPIModelsAuditItemResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsAuditItemResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


