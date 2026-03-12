
# JoblogicAPIModelsSearchAssetItemResponse


## Properties

Name | Type
------------ | -------------
`id` | number
`uniqueId` | string
`active` | boolean
`description` | string
`number` | string
`location` | string
`serialNumber` | string
`quantity` | number
`installationDate` | Date
`warrantyExpiryDate` | Date
`labourWarrantyExpiryDate` | Date
`refrigerantTypeId` | string
`refrigerantTypeEnabled` | boolean
`siteId` | number
`siteName` | string
`siteAddress` | string
`make` | string
`model` | string
`conditionId` | number
`condition` | string
`qRCode` | string
`externalId` | string
`customReference` | string
`panelNumber` | string
`panelInformationEnabled` | boolean
`width` | number
`height` | number
`relatedAssetIds` | Array&lt;number&gt;
`additionalDetails` | [JoblogicAPIModelsAssetAdditionalDetails](JoblogicAPIModelsAssetAdditionalDetails.md)
`equipmentClass` | string

## Example

```typescript
import type { JoblogicAPIModelsSearchAssetItemResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "uniqueId": null,
  "active": null,
  "description": null,
  "number": null,
  "location": null,
  "serialNumber": null,
  "quantity": null,
  "installationDate": null,
  "warrantyExpiryDate": null,
  "labourWarrantyExpiryDate": null,
  "refrigerantTypeId": null,
  "refrigerantTypeEnabled": null,
  "siteId": null,
  "siteName": null,
  "siteAddress": null,
  "make": null,
  "model": null,
  "conditionId": null,
  "condition": null,
  "qRCode": null,
  "externalId": null,
  "customReference": null,
  "panelNumber": null,
  "panelInformationEnabled": null,
  "width": null,
  "height": null,
  "relatedAssetIds": null,
  "additionalDetails": null,
  "equipmentClass": null,
} satisfies JoblogicAPIModelsSearchAssetItemResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsSearchAssetItemResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


