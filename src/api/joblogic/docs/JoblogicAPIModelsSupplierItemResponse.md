
# JoblogicAPIModelsSupplierItemResponse


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`address` | string
`postcode` | string
`telephone` | string
`email` | string
`accountNumber` | string
`active` | boolean
`customReference` | string
`externalId` | string
`partLibraryId` | number
`libraryName` | string
`additionalDetails` | [JoblogicAPIModelsSupplierItemResponse AdditionalDetailsResponse](JoblogicAPIModelsSupplierItemResponse AdditionalDetailsResponse.md)

## Example

```typescript
import type { JoblogicAPIModelsSupplierItemResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "address": null,
  "postcode": null,
  "telephone": null,
  "email": null,
  "accountNumber": null,
  "active": null,
  "customReference": null,
  "externalId": null,
  "partLibraryId": null,
  "libraryName": null,
  "additionalDetails": null,
} satisfies JoblogicAPIModelsSupplierItemResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsSupplierItemResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


