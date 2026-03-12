
# JoblogicAPIModelsAssetAdditionalDetailsModel


## Properties

Name | Type
------------ | -------------
`equipmentLibrary` | string
`qRCode` | string
`estimatedReplacementDate` | Date
`containRefrigerant` | boolean
`totalCharge` | number
`gasType` | string
`budgetReplacementCost` | number
`assetConditionUniqueId` | string
`systemId` | string
`serviceTypeUniqueId` | string

## Example

```typescript
import type { JoblogicAPIModelsAssetAdditionalDetailsModel } from ''

// TODO: Update the object below with actual values
const example = {
  "equipmentLibrary": null,
  "qRCode": null,
  "estimatedReplacementDate": null,
  "containRefrigerant": null,
  "totalCharge": null,
  "gasType": null,
  "budgetReplacementCost": null,
  "assetConditionUniqueId": null,
  "systemId": null,
  "serviceTypeUniqueId": null,
} satisfies JoblogicAPIModelsAssetAdditionalDetailsModel

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsAssetAdditionalDetailsModel
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


