
# JoblogicAPIModelsApproveQuoteRequest


## Properties

Name | Type
------------ | -------------
`id` | string
`approvedByUserId` | number
`orderNumber` | string
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsApproveQuoteRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "approvedByUserId": null,
  "orderNumber": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsApproveQuoteRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsApproveQuoteRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


