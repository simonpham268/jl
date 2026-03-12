
# JoblogicAPIModelsUpdateStockPORequest


## Properties

Name | Type
------------ | -------------
`accountNumber` | string
`estimatedDeliveryDate` | Date
`referenceNumber` | string
`additionalInstructions` | string
`tags` | Array&lt;string&gt;
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsUpdateStockPORequest } from ''

// TODO: Update the object below with actual values
const example = {
  "accountNumber": null,
  "estimatedDeliveryDate": null,
  "referenceNumber": null,
  "additionalInstructions": null,
  "tags": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsUpdateStockPORequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsUpdateStockPORequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


