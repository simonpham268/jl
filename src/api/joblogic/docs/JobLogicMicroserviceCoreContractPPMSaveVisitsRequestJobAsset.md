
# JobLogicMicroserviceCoreContractPPMSaveVisitsRequestJobAsset


## Properties

Name | Type
------------ | -------------
`assetId` | number
`siteId` | number
`jobAssetId` | number
`jobAssetClassId` | number
`frequency` | [JobLogicMicroserviceCoreContractServiceTypeFrequency](JobLogicMicroserviceCoreContractServiceTypeFrequency.md)
`jobAssetNotes` | string
`jobActionRequiredNotes` | string
`jobAssetComplete` | boolean
`completionDate` | Date
`jobAssetServiceTypeId` | string
`jobAssetDuration` | number
`isServiceTypeChanged` | boolean
`jobAssetServiceTypeTasks` | [Array&lt;JobLogicMicroserviceCoreContractPPMSaveVisitsRequestJobAssetServiceTypeTask&gt;](JobLogicMicroserviceCoreContractPPMSaveVisitsRequestJobAssetServiceTypeTask.md)
`assetConditionId` | number
`isMandatory` | boolean
`serviceOrder` | number
`isServiceKitChanged` | boolean
`jobAssetServiceKitId` | string
`pPMStartDate` | Date
`pPMEndDate` | Date
`pPMServiceFee` | number
`jobAssetServiceKitTasks` | [Array&lt;JobLogicMicroserviceCoreContractPPMSaveVisitsRequestJobAssetServiceKitTask&gt;](JobLogicMicroserviceCoreContractPPMSaveVisitsRequestJobAssetServiceKitTask.md)
`isNew` | boolean
`isDeleted` | boolean
`isEdited` | boolean

## Example

```typescript
import type { JobLogicMicroserviceCoreContractPPMSaveVisitsRequestJobAsset } from ''

// TODO: Update the object below with actual values
const example = {
  "assetId": null,
  "siteId": null,
  "jobAssetId": null,
  "jobAssetClassId": null,
  "frequency": null,
  "jobAssetNotes": null,
  "jobActionRequiredNotes": null,
  "jobAssetComplete": null,
  "completionDate": null,
  "jobAssetServiceTypeId": null,
  "jobAssetDuration": null,
  "isServiceTypeChanged": null,
  "jobAssetServiceTypeTasks": null,
  "assetConditionId": null,
  "isMandatory": null,
  "serviceOrder": null,
  "isServiceKitChanged": null,
  "jobAssetServiceKitId": null,
  "pPMStartDate": null,
  "pPMEndDate": null,
  "pPMServiceFee": null,
  "jobAssetServiceKitTasks": null,
  "isNew": null,
  "isDeleted": null,
  "isEdited": null,
} satisfies JobLogicMicroserviceCoreContractPPMSaveVisitsRequestJobAsset

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JobLogicMicroserviceCoreContractPPMSaveVisitsRequestJobAsset
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


