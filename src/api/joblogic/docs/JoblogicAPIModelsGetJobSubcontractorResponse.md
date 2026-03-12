
# JoblogicAPIModelsGetJobSubcontractorResponse


## Properties

Name | Type
------------ | -------------
`id` | string
`subContractorId` | string
`allocatedDate` | Date
`allocatedBy` | number
`allocatedByUser` | string
`preferAppointmentDate` | Date
`targetCompletionDate` | Date
`priority` | string
`status` | [JobLogicMicroserviceCoreContractSubContractorJobAllocationStatus](JobLogicMicroserviceCoreContractSubContractorJobAllocationStatus.md)
`subContractorName` | string
`isActiveSubcontractor` | boolean
`isSendPO` | boolean
`isSendWorkDescription` | boolean
`pONumber` | string
`purchaseOrderId` | string
`jobMappingId` | string
`subcontractorJobNumber` | string
`subcontractorJobUniqueId` | string

## Example

```typescript
import type { JoblogicAPIModelsGetJobSubcontractorResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "subContractorId": null,
  "allocatedDate": null,
  "allocatedBy": null,
  "allocatedByUser": null,
  "preferAppointmentDate": null,
  "targetCompletionDate": null,
  "priority": null,
  "status": null,
  "subContractorName": null,
  "isActiveSubcontractor": null,
  "isSendPO": null,
  "isSendWorkDescription": null,
  "pONumber": null,
  "purchaseOrderId": null,
  "jobMappingId": null,
  "subcontractorJobNumber": null,
  "subcontractorJobUniqueId": null,
} satisfies JoblogicAPIModelsGetJobSubcontractorResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsGetJobSubcontractorResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


