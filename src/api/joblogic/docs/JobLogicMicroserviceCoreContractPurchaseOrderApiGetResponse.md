
# JobLogicMicroserviceCoreContractPurchaseOrderApiGetResponse


## Properties

Name | Type
------------ | -------------
`id` | string
`pONumber` | string
`jobId` | string
`supplierId` | string
`accountNumber` | string
`estimatedDeliveryDate` | Date
`deliveryAddressType` | string
`deliveryName` | string
`deliveryAddress1` | string
`deliveryAddress2` | string
`deliveryAddress3` | string
`deliveryAddress4` | string
`deliveryPostcode` | string
`deliveryTelephone` | string
`additionalInstructions` | string
`status` | string
`dateRaised` | Date
`resolvedReason` | string
`customReference` | string
`invoiceStatus` | string
`lines` | [Array&lt;JobLogicMicroserviceCoreContractPurchaseOrderLineGetResponse&gt;](JobLogicMicroserviceCoreContractPurchaseOrderLineGetResponse.md)
`tags` | Array&lt;string&gt;

## Example

```typescript
import type { JobLogicMicroserviceCoreContractPurchaseOrderApiGetResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "pONumber": null,
  "jobId": null,
  "supplierId": null,
  "accountNumber": null,
  "estimatedDeliveryDate": null,
  "deliveryAddressType": null,
  "deliveryName": null,
  "deliveryAddress1": null,
  "deliveryAddress2": null,
  "deliveryAddress3": null,
  "deliveryAddress4": null,
  "deliveryPostcode": null,
  "deliveryTelephone": null,
  "additionalInstructions": null,
  "status": null,
  "dateRaised": null,
  "resolvedReason": null,
  "customReference": null,
  "invoiceStatus": null,
  "lines": null,
  "tags": null,
} satisfies JobLogicMicroserviceCoreContractPurchaseOrderApiGetResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JobLogicMicroserviceCoreContractPurchaseOrderApiGetResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


