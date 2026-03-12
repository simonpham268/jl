
# JoblogicAPIModelsCreatePurchaseOrderRequest


## Properties

Name | Type
------------ | -------------
`supplierId` | string
`jobId` | string
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
`dateRaised` | Date
`supplierBranchId` | string
`referenceNumber` | string
`tags` | Array&lt;string&gt;
`ownerId` | number
`raisedBy` | number
`lines` | [Array&lt;JoblogicAPIModelsCreatePurchaseOrderLineRequest&gt;](JoblogicAPIModelsCreatePurchaseOrderLineRequest.md)
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsCreatePurchaseOrderRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "supplierId": null,
  "jobId": null,
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
  "dateRaised": null,
  "supplierBranchId": null,
  "referenceNumber": null,
  "tags": null,
  "ownerId": null,
  "raisedBy": null,
  "lines": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsCreatePurchaseOrderRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCreatePurchaseOrderRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


