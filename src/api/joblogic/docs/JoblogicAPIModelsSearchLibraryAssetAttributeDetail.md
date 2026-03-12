
# JoblogicAPIModelsSearchLibraryAssetAttributeDetail


## Properties

Name | Type
------------ | -------------
`id` | string
`description` | string
`dataType` | [JobLogicMicroserviceAttributeContractAttributeDataType](JobLogicMicroserviceAttributeContractAttributeDataType.md)
`types` | [Array&lt;JobLogicMicroserviceAttributeContractAttributeTypeModel&gt;](JobLogicMicroserviceAttributeContractAttributeTypeModel.md)
`listValues` | [Array&lt;JobLogicMicroserviceAttributeContractAttributeListValueModel&gt;](JobLogicMicroserviceAttributeContractAttributeListValueModel.md)
`dataTypeDescription` | string

## Example

```typescript
import type { JoblogicAPIModelsSearchLibraryAssetAttributeDetail } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "description": null,
  "dataType": null,
  "types": null,
  "listValues": null,
  "dataTypeDescription": null,
} satisfies JoblogicAPIModelsSearchLibraryAssetAttributeDetail

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsSearchLibraryAssetAttributeDetail
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


