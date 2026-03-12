
# JoblogicAPIModelsDeliverSubPOItemRequest


## Properties

Name | Type
------------ | -------------
`purchaseOrderLineUniqueId` | string
`completeDate` | Date
`addJobLine` | boolean
`setJobComplete` | boolean
`completedByUserId` | number
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsDeliverSubPOItemRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "purchaseOrderLineUniqueId": null,
  "completeDate": null,
  "addJobLine": null,
  "setJobComplete": null,
  "completedByUserId": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsDeliverSubPOItemRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsDeliverSubPOItemRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


