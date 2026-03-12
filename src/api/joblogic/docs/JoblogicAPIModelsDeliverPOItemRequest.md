
# JoblogicAPIModelsDeliverPOItemRequest


## Properties

Name | Type
------------ | -------------
`purchaseOrderLineUniqueId` | string
`quantity` | number
`deliveryDate` | Date
`setJobAsPartToFit` | boolean
`passDicount` | boolean
`deliveredByUserId` | number
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsDeliverPOItemRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "purchaseOrderLineUniqueId": null,
  "quantity": null,
  "deliveryDate": null,
  "setJobAsPartToFit": null,
  "passDicount": null,
  "deliveredByUserId": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsDeliverPOItemRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsDeliverPOItemRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


