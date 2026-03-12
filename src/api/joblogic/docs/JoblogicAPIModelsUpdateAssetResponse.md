
# JoblogicAPIModelsUpdateAssetResponse


## Properties

Name | Type
------------ | -------------
`id` | string
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
`referenceNumber` | string
`isSuspended` | boolean
`serviceTypeUniqueId` | string
`height` | number
`width` | number
`panelNumber` | string
`panelInformationEnabled` | boolean
`tags` | Array&lt;string&gt;
`conditionId` | number
`condition` | string

## Example

```typescript
import type { JoblogicAPIModelsUpdateAssetResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
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
  "referenceNumber": null,
  "isSuspended": null,
  "serviceTypeUniqueId": null,
  "height": null,
  "width": null,
  "panelNumber": null,
  "panelInformationEnabled": null,
  "tags": null,
  "conditionId": null,
  "condition": null,
} satisfies JoblogicAPIModelsUpdateAssetResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsUpdateAssetResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


