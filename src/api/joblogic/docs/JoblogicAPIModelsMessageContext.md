
# JoblogicAPIModelsMessageContext


## Properties

Name | Type
------------ | -------------
`environment` | string
`version` | string
`timestamp` | string
`messageType` | string
`uniqueId` | string
`sourceSystem` | string
`targetSystem` | string
`masterSystem` | string
`trackingId` | string
`toClient` | string

## Example

```typescript
import type { JoblogicAPIModelsMessageContext } from ''

// TODO: Update the object below with actual values
const example = {
  "environment": null,
  "version": null,
  "timestamp": null,
  "messageType": null,
  "uniqueId": null,
  "sourceSystem": null,
  "targetSystem": null,
  "masterSystem": null,
  "trackingId": null,
  "toClient": null,
} satisfies JoblogicAPIModelsMessageContext

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsMessageContext
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


