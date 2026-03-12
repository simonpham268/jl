
# JobLogicMicroserviceCoreContractJobAssetSearchItemResponse


## Properties

Name | Type
------------ | -------------
`id` | number
`isSuspended` | boolean
`description` | string
`classDescription` | string
`number` | string
`location` | string
`serialNumber` | string
`complete` | boolean
`status` | string
`dateComplete` | Date
`assetNotes` | string
`actionRequiredNotes` | string
`referenceNumber` | string
`make` | string
`model` | string
`quantity` | string
`installationDate` | Date
`warrantyExpiryDate` | Date
`labourWarrantyExpiryDate` | Date
`refrigerantCharge` | number
`gasTypeDescription` | string

## Example

```typescript
import type { JobLogicMicroserviceCoreContractJobAssetSearchItemResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "isSuspended": null,
  "description": null,
  "classDescription": null,
  "number": null,
  "location": null,
  "serialNumber": null,
  "complete": null,
  "status": null,
  "dateComplete": null,
  "assetNotes": null,
  "actionRequiredNotes": null,
  "referenceNumber": null,
  "make": null,
  "model": null,
  "quantity": null,
  "installationDate": null,
  "warrantyExpiryDate": null,
  "labourWarrantyExpiryDate": null,
  "refrigerantCharge": null,
  "gasTypeDescription": null,
} satisfies JobLogicMicroserviceCoreContractJobAssetSearchItemResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JobLogicMicroserviceCoreContractJobAssetSearchItemResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


