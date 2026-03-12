
# JoblogicAPIModelsGetPartResponse


## Properties

Name | Type
------------ | -------------
`intId` | number
`id` | string
`externalId` | string
`number` | string
`description` | string
`quantity` | number
`unitOfMeasure` | string
`pricePerUnit` | number
`sellPerUnit` | number
`useAsAsset` | boolean
`additionalDetails` | [JoblogicAPIModelsGetPartResponse AdditionalDetailsResponse](JoblogicAPIModelsGetPartResponse AdditionalDetailsResponse.md)

## Example

```typescript
import type { JoblogicAPIModelsGetPartResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "intId": null,
  "id": null,
  "externalId": null,
  "number": null,
  "description": null,
  "quantity": null,
  "unitOfMeasure": null,
  "pricePerUnit": null,
  "sellPerUnit": null,
  "useAsAsset": null,
  "additionalDetails": null,
} satisfies JoblogicAPIModelsGetPartResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsGetPartResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


