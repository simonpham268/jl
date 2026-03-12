
# JoblogicAPIModelsGetAssetAttributeByAssetIdResponse


## Properties

Name | Type
------------ | -------------
`assetId` | number
`assetUniqueId` | string
`assetDescription` | string
`attributes` | [Array&lt;JoblogicAPIModelsAssetAttributeDetail&gt;](JoblogicAPIModelsAssetAttributeDetail.md)

## Example

```typescript
import type { JoblogicAPIModelsGetAssetAttributeByAssetIdResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "assetId": null,
  "assetUniqueId": null,
  "assetDescription": null,
  "attributes": null,
} satisfies JoblogicAPIModelsGetAssetAttributeByAssetIdResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsGetAssetAttributeByAssetIdResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


