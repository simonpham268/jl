
# JoblogicAPIModelsPurchaseOrderDetailResponse


## Properties

Name | Type
------------ | -------------
`invoiceStatus` | string
`jobType` | string
`jobTypeUniqueId` | string
`id` | string
`pONumber` | string
`jobId` | string
`supplierId` | string
`accountNumber` | string
`estimatedDeliveryDate` | Date
`deliveryAddressType` | string
`deliveryName` | string
`deliveryAddress` | string
`deliveryPostcode` | string
`deliveryTelephone` | string
`additionalInstructions` | string
`status` | string
`dateRaised` | Date
`resolvedReason` | string
`customReference` | string
`lines` | [Array&lt;JoblogicAPIModelsPurchaseOrderLineItemResponse&gt;](JoblogicAPIModelsPurchaseOrderLineItemResponse.md)
`resolutions` | [Array&lt;JoblogicAPIModelsPurchaseOrderResolutionItemResponse&gt;](JoblogicAPIModelsPurchaseOrderResolutionItemResponse.md)
`tags` | Array&lt;string&gt;
`ownerId` | number
`ownerUniqueId` | string
`ownerName` | string
`raisedById` | number
`raisedByUniqueId` | string
`raisedByName` | string
`approvedById` | number
`approvedByUniqueId` | string
`approvedByName` | string
`dateApproved` | Date
`resolvedById` | number
`resolvedByUniqueId` | string
`resolvedByName` | string

## Example

```typescript
import type { JoblogicAPIModelsPurchaseOrderDetailResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "invoiceStatus": null,
  "jobType": null,
  "jobTypeUniqueId": null,
  "id": null,
  "pONumber": null,
  "jobId": null,
  "supplierId": null,
  "accountNumber": null,
  "estimatedDeliveryDate": null,
  "deliveryAddressType": null,
  "deliveryName": null,
  "deliveryAddress": null,
  "deliveryPostcode": null,
  "deliveryTelephone": null,
  "additionalInstructions": null,
  "status": null,
  "dateRaised": null,
  "resolvedReason": null,
  "customReference": null,
  "lines": null,
  "resolutions": null,
  "tags": null,
  "ownerId": null,
  "ownerUniqueId": null,
  "ownerName": null,
  "raisedById": null,
  "raisedByUniqueId": null,
  "raisedByName": null,
  "approvedById": null,
  "approvedByUniqueId": null,
  "approvedByName": null,
  "dateApproved": null,
  "resolvedById": null,
  "resolvedByUniqueId": null,
  "resolvedByName": null,
} satisfies JoblogicAPIModelsPurchaseOrderDetailResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsPurchaseOrderDetailResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


