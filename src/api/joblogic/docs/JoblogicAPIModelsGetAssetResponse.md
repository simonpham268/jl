
# JoblogicAPIModelsGetAssetResponse


## Properties

Name | Type
------------ | -------------
`intId` | number
`id` | string
`equipmentClass` | string
`description` | string
`make` | string
`model` | string
`location` | string
`serialNumber` | string
`siteId` | number
`siteAddress` | string
`installationDate` | Date
`labourWarrantyExpiryDate` | Date
`assetWarrantyExpiryDate` | Date
`quantity` | number
`referenceNumber` | string
`tags` | Array&lt;string&gt;
`panelNumber` | string
`panelInformationEnabled` | boolean
`width` | number
`height` | number
`relatedAssetIds` | Array&lt;number&gt;
`conditionId` | number
`condition` | string
`additionalDetails` | [JoblogicAPIModelsAssetAdditionalDetails](JoblogicAPIModelsAssetAdditionalDetails.md)

## Example

```typescript
import type { JoblogicAPIModelsGetAssetResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "intId": null,
  "id": null,
  "equipmentClass": null,
  "description": null,
  "make": null,
  "model": null,
  "location": null,
  "serialNumber": null,
  "siteId": null,
  "siteAddress": null,
  "installationDate": null,
  "labourWarrantyExpiryDate": null,
  "assetWarrantyExpiryDate": null,
  "quantity": null,
  "referenceNumber": null,
  "tags": null,
  "panelNumber": null,
  "panelInformationEnabled": null,
  "width": null,
  "height": null,
  "relatedAssetIds": null,
  "conditionId": null,
  "condition": null,
  "additionalDetails": null,
} satisfies JoblogicAPIModelsGetAssetResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsGetAssetResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


