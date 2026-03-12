
# JoblogicAPIModelsTransferStockRequest


## Properties

Name | Type
------------ | -------------
`userId` | number
`stockRecordId` | number
`sourceRackShelfId` | number
`destinationRackShelfId` | number
`quantity` | number
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsTransferStockRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "userId": null,
  "stockRecordId": null,
  "sourceRackShelfId": null,
  "destinationRackShelfId": null,
  "quantity": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsTransferStockRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsTransferStockRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


