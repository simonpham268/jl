
# JoblogicAPIModelsPurchaseOrderItemResponse


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

## Example

```typescript
import type { JoblogicAPIModelsPurchaseOrderItemResponse } from ''

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
} satisfies JoblogicAPIModelsPurchaseOrderItemResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsPurchaseOrderItemResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


