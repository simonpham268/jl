
# JoblogicAPIModelsCreateAssetResponse


## Properties

Name | Type
------------ | -------------
`id` | string
`externalId` | string
`equipmentClass` | string
`description` | string
`make` | string
`model` | string
`location` | string
`number` | string
`notes` | string
`serialNumber` | string
`installationDate` | Date
`labourWarrantyExpiryDate` | Date
`assetWarrantyExpiryDate` | Date
`quantity` | number
`serviceTypeUniqueId` | string
`height` | number
`width` | number
`panelNumber` | string
`panelInformationEnabled` | boolean
`conditionId` | number
`condition` | string
`referenceNumber` | string
`tags` | Array&lt;string&gt;
`relatedAssetIds` | Array&lt;number&gt;

## Example

```typescript
import type { JoblogicAPIModelsCreateAssetResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "externalId": null,
  "equipmentClass": null,
  "description": null,
  "make": null,
  "model": null,
  "location": null,
  "number": null,
  "notes": null,
  "serialNumber": null,
  "installationDate": null,
  "labourWarrantyExpiryDate": null,
  "assetWarrantyExpiryDate": null,
  "quantity": null,
  "serviceTypeUniqueId": null,
  "height": null,
  "width": null,
  "panelNumber": null,
  "panelInformationEnabled": null,
  "conditionId": null,
  "condition": null,
  "referenceNumber": null,
  "tags": null,
  "relatedAssetIds": null,
} satisfies JoblogicAPIModelsCreateAssetResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCreateAssetResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


