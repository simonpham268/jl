
# JoblogicAPIModelsUpdatePartRequest


## Properties

Name | Type
------------ | -------------
`id` | string
`number` | string
`description` | string
`quantity` | number
`unitOfMeasure` | string
`pricePerUnit` | number
`sellPerUnit` | number
`additionalDetails` | [JoblogicAPIModelsPartAdditionalDetailsRequest](JoblogicAPIModelsPartAdditionalDetailsRequest.md)
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsUpdatePartRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "number": null,
  "description": null,
  "quantity": null,
  "unitOfMeasure": null,
  "pricePerUnit": null,
  "sellPerUnit": null,
  "additionalDetails": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsUpdatePartRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsUpdatePartRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


