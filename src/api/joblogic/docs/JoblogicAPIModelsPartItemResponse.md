
# JoblogicAPIModelsPartItemResponse


## Properties

Name | Type
------------ | -------------
`id` | number
`uniqueId` | string
`active` | boolean
`description` | string
`number` | string
`quantity` | number
`unit` | string
`pricePerUnit` | number
`sellPerUnit` | number
`make` | string
`model` | string
`externalId` | string
`partLibraryId` | number
`additionalDetails` | [JoblogicAPIModelsPartItemResponse AdditionalDetailsResponse](JoblogicAPIModelsPartItemResponse AdditionalDetailsResponse.md)

## Example

```typescript
import type { JoblogicAPIModelsPartItemResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "uniqueId": null,
  "active": null,
  "description": null,
  "number": null,
  "quantity": null,
  "unit": null,
  "pricePerUnit": null,
  "sellPerUnit": null,
  "make": null,
  "model": null,
  "externalId": null,
  "partLibraryId": null,
  "additionalDetails": null,
} satisfies JoblogicAPIModelsPartItemResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsPartItemResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


