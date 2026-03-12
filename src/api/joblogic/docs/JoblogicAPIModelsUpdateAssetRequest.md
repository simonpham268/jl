
# JoblogicAPIModelsUpdateAssetRequest


## Properties

Name | Type
------------ | -------------
`id` | string
`equipmentClass` | string
`description` | string
`number` | string
`notes` | string
`make` | string
`model` | string
`location` | string
`serialNumber` | string
`installationDate` | Date
`labourWarrantyExpiryDate` | Date
`assetWarrantyExpiryDate` | Date
`quantity` | number
`referenceNumber` | string
`isSuspended` | boolean
`tags` | Array&lt;string&gt;
`additionalDetails` | [JoblogicAPIModelsAssetAdditionalDetailsModel](JoblogicAPIModelsAssetAdditionalDetailsModel.md)
`height` | number
`width` | number
`panelNumber` | string
`panelInformationEnabled` | boolean
`relatedAssetIds` | Array&lt;number&gt;
`assetConditionId` | number
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsUpdateAssetRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "equipmentClass": null,
  "description": null,
  "number": null,
  "notes": null,
  "make": null,
  "model": null,
  "location": null,
  "serialNumber": null,
  "installationDate": null,
  "labourWarrantyExpiryDate": null,
  "assetWarrantyExpiryDate": null,
  "quantity": null,
  "referenceNumber": null,
  "isSuspended": null,
  "tags": null,
  "additionalDetails": null,
  "height": null,
  "width": null,
  "panelNumber": null,
  "panelInformationEnabled": null,
  "relatedAssetIds": null,
  "assetConditionId": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsUpdateAssetRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsUpdateAssetRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


