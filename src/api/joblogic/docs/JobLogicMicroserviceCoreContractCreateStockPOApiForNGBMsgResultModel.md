
# JobLogicMicroserviceCoreContractCreateStockPOApiForNGBMsgResultModel


## Properties

Name | Type
------------ | -------------
`id` | string
`accountNumber` | string
`purchaseOrderType` | [JobLogicMicroserviceCoreContractPurchaseOrderType](JobLogicMicroserviceCoreContractPurchaseOrderType.md)
`estimatedDeliveryDate` | Date
`ownerId` | number
`raisedBy` | number
`resolvedByUserId` | number
`stockLocationId` | number
`supplierBranchId` | string
`supplierId` | string
`dateRaised` | Date
`deliveryName` | string
`deliveryAddress1` | string
`deliveryAddress2` | string
`deliveryAddress3` | string
`deliveryAddress4` | string
`deliveryPostcode` | string
`supplierContactId` | number
`tags` | Array&lt;string&gt;
`stockDeliveryLocation` | [JobLogicMicroserviceCoreContractPurchaseOrderStockDeliveryLocationResponse](JobLogicMicroserviceCoreContractPurchaseOrderStockDeliveryLocationResponse.md)
`supplier` | [JobLogicMicroserviceCoreContractPurchaseOrderSupplierResponse](JobLogicMicroserviceCoreContractPurchaseOrderSupplierResponse.md)
`contact` | [JobLogicMicroserviceCoreContractPurchaseOrderContactResponse](JobLogicMicroserviceCoreContractPurchaseOrderContactResponse.md)

## Example

```typescript
import type { JobLogicMicroserviceCoreContractCreateStockPOApiForNGBMsgResultModel } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "accountNumber": null,
  "purchaseOrderType": null,
  "estimatedDeliveryDate": null,
  "ownerId": null,
  "raisedBy": null,
  "resolvedByUserId": null,
  "stockLocationId": null,
  "supplierBranchId": null,
  "supplierId": null,
  "dateRaised": null,
  "deliveryName": null,
  "deliveryAddress1": null,
  "deliveryAddress2": null,
  "deliveryAddress3": null,
  "deliveryAddress4": null,
  "deliveryPostcode": null,
  "supplierContactId": null,
  "tags": null,
  "stockDeliveryLocation": null,
  "supplier": null,
  "contact": null,
} satisfies JobLogicMicroserviceCoreContractCreateStockPOApiForNGBMsgResultModel

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JobLogicMicroserviceCoreContractCreateStockPOApiForNGBMsgResultModel
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


