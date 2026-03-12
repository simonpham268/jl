
# JoblogicAPIModelsSubPurchaseOrderDetailResponse


## Properties

Name | Type
------------ | -------------
`uniqueId` | string
`subContractorId` | string
`accountNumber` | string
`pONumber` | string
`jobUniqueId` | string
`estimatedCompletionDate` | Date
`deliveryName` | string
`deliveryAddress1` | string
`deliveryAddress2` | string
`deliveryAddress3` | string
`deliveryAddress4` | string
`deliveryPostcode` | string
`deliveryTelephone` | string
`contactId` | string
`contactName` | string
`contactEmail` | string
`contactTelephone` | string
`customReference` | string
`additionalInstructions` | string
`status` | string
`dateRaised` | Date
`lines` | [Array&lt;JoblogicAPIModelsSubPurchaseOrderLineItemResponse&gt;](JoblogicAPIModelsSubPurchaseOrderLineItemResponse.md)
`resolutions` | [Array&lt;JoblogicAPIModelsSubPurchaseOrderResolutionItemResponse&gt;](JoblogicAPIModelsSubPurchaseOrderResolutionItemResponse.md)
`tags` | Array&lt;string&gt;
`ownerId` | number
`ownerUniqueId` | string
`ownerName` | string
`raisedById` | number
`raisedByUniqueId` | string
`raisedByName` | string
`resolvedById` | number
`resolvedByUniqueId` | string
`resolvedByName` | string
`jobType` | string
`jobTypeUniqueId` | string

## Example

```typescript
import type { JoblogicAPIModelsSubPurchaseOrderDetailResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "uniqueId": null,
  "subContractorId": null,
  "accountNumber": null,
  "pONumber": null,
  "jobUniqueId": null,
  "estimatedCompletionDate": null,
  "deliveryName": null,
  "deliveryAddress1": null,
  "deliveryAddress2": null,
  "deliveryAddress3": null,
  "deliveryAddress4": null,
  "deliveryPostcode": null,
  "deliveryTelephone": null,
  "contactId": null,
  "contactName": null,
  "contactEmail": null,
  "contactTelephone": null,
  "customReference": null,
  "additionalInstructions": null,
  "status": null,
  "dateRaised": null,
  "lines": null,
  "resolutions": null,
  "tags": null,
  "ownerId": null,
  "ownerUniqueId": null,
  "ownerName": null,
  "raisedById": null,
  "raisedByUniqueId": null,
  "raisedByName": null,
  "resolvedById": null,
  "resolvedByUniqueId": null,
  "resolvedByName": null,
  "jobType": null,
  "jobTypeUniqueId": null,
} satisfies JoblogicAPIModelsSubPurchaseOrderDetailResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsSubPurchaseOrderDetailResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


