
# JoblogicAPIModelsResponseSearchJobAssetItemResponse


## Properties

Name | Type
------------ | -------------
`intId` | number
`uniqueId` | string
`siteAssetUniqueId` | string
`partUniqueId` | string
`quantity` | number
`isSuspended` | boolean
`description` | string
`classDescription` | string
`number` | string
`location` | string
`serialNumber` | string
`assetNotes` | string
`actionRequiredNotes` | string
`complete` | boolean
`dateComplete` | Date
`assetClassUniqueId` | string
`assetClassDescription` | string
`serviceTypeUniqueId` | string
`serviceTypeTitle` | string
`frequency` | [JoblogicAPIModelsResponseServiceTypeFrequency](JoblogicAPIModelsResponseServiceTypeFrequency.md)
`serviceTypeDuration` | number
`partDescription` | string
`notes` | string
`installationDate` | Date
`warrantyExpiryDate` | Date
`labourWarrantyExpiryDate` | Date
`customReference` | string
`qRCode` | string
`reasonForNotCompleting` | string
`isMandatory` | boolean
`serviceOrder` | number
`make` | string
`model` | string
`isDeployed` | boolean
`assetConditionUniqueId` | string
`assetCondition` | string
`assetConditionEnabled` | boolean
`isSuspendedCondition` | boolean
`jobAssetTasks` | [Array&lt;JobLogicMicroserviceCoreContractJobAssetTaskModel&gt;](JobLogicMicroserviceCoreContractJobAssetTaskModel.md)

## Example

```typescript
import type { JoblogicAPIModelsResponseSearchJobAssetItemResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "intId": null,
  "uniqueId": null,
  "siteAssetUniqueId": null,
  "partUniqueId": null,
  "quantity": null,
  "isSuspended": null,
  "description": null,
  "classDescription": null,
  "number": null,
  "location": null,
  "serialNumber": null,
  "assetNotes": null,
  "actionRequiredNotes": null,
  "complete": null,
  "dateComplete": null,
  "assetClassUniqueId": null,
  "assetClassDescription": null,
  "serviceTypeUniqueId": null,
  "serviceTypeTitle": null,
  "frequency": null,
  "serviceTypeDuration": null,
  "partDescription": null,
  "notes": null,
  "installationDate": null,
  "warrantyExpiryDate": null,
  "labourWarrantyExpiryDate": null,
  "customReference": null,
  "qRCode": null,
  "reasonForNotCompleting": null,
  "isMandatory": null,
  "serviceOrder": null,
  "make": null,
  "model": null,
  "isDeployed": null,
  "assetConditionUniqueId": null,
  "assetCondition": null,
  "assetConditionEnabled": null,
  "isSuspendedCondition": null,
  "jobAssetTasks": null,
} satisfies JoblogicAPIModelsResponseSearchJobAssetItemResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsResponseSearchJobAssetItemResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


