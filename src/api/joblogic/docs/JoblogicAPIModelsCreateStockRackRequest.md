
# JoblogicAPIModelsCreateStockRackRequest


## Properties

Name | Type
------------ | -------------
`name` | string
`description` | string
`isDefault` | boolean
`stockLocationId` | number
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsCreateStockRackRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "description": null,
  "isDefault": null,
  "stockLocationId": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsCreateStockRackRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCreateStockRackRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


