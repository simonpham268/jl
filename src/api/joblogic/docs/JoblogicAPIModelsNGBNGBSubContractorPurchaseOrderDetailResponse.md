
# JoblogicAPIModelsNGBNGBSubContractorPurchaseOrderDetailResponse


## Properties

Name | Type
------------ | -------------
`uniqueId` | string
`subContractorId` | string
`accountNumber` | string
`pONumber` | string
`jobUniqueId` | string
`estimatedCompletionDate` | Date
`contactId` | number
`contactName` | string
`contactEmail` | string
`contactTelephone` | string
`customReference` | string
`additionalInstructions` | string
`status` | string
`dateRaised` | Date
`items` | [Array&lt;JoblogicAPIModelsSubPurchaseOrderLineItemResponse&gt;](JoblogicAPIModelsSubPurchaseOrderLineItemResponse.md)
`tags` | Array&lt;string&gt;
`ownerId` | number
`ownerUniqueId` | string
`ownerName` | string
`jobType` | string
`jobTypeUniqueId` | string
`invoiceStatus` | string
`areas` | [Array&lt;JoblogicAPIModelsNGBSubContractorPOAreaItemResponse&gt;](JoblogicAPIModelsNGBSubContractorPOAreaItemResponse.md)
`trades` | [Array&lt;JoblogicAPIModelsNGBSubContractorPOTradeItemResponse&gt;](JoblogicAPIModelsNGBSubContractorPOTradeItemResponse.md)
`jobNumber` | string
`notes` | [Array&lt;JoblogicAPIModelsNGBSubContractorPONoteItemResponse&gt;](JoblogicAPIModelsNGBSubContractorPONoteItemResponse.md)
`subContractorName` | string

## Example

```typescript
import type { JoblogicAPIModelsNGBNGBSubContractorPurchaseOrderDetailResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "uniqueId": null,
  "subContractorId": null,
  "accountNumber": null,
  "pONumber": null,
  "jobUniqueId": null,
  "estimatedCompletionDate": null,
  "contactId": null,
  "contactName": null,
  "contactEmail": null,
  "contactTelephone": null,
  "customReference": null,
  "additionalInstructions": null,
  "status": null,
  "dateRaised": null,
  "items": null,
  "tags": null,
  "ownerId": null,
  "ownerUniqueId": null,
  "ownerName": null,
  "jobType": null,
  "jobTypeUniqueId": null,
  "invoiceStatus": null,
  "areas": null,
  "trades": null,
  "jobNumber": null,
  "notes": null,
  "subContractorName": null,
} satisfies JoblogicAPIModelsNGBNGBSubContractorPurchaseOrderDetailResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsNGBNGBSubContractorPurchaseOrderDetailResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


