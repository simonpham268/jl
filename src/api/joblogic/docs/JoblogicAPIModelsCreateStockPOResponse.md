
# JoblogicAPIModelsCreateStockPOResponse


## Properties

Name | Type
------------ | -------------
`purchaseOrderType` | [JobLogicMicroserviceCoreContractPurchaseOrderType](JobLogicMicroserviceCoreContractPurchaseOrderType.md)
`id` | string
`stockLocationId` | number
`supplierId` | string
`accountNumber` | string
`estimatedDeliveryDate` | Date
`raisedBy` | number
`ownerId` | number
`deliveryName` | string
`deliveryPostcode` | string
`deliveryAddress1` | string
`deliveryAddress2` | string
`deliveryAddress3` | string
`deliveryAddress4` | string
`tags` | Array&lt;string&gt;
`supplierContactId` | number

## Example

```typescript
import type { JoblogicAPIModelsCreateStockPOResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "purchaseOrderType": null,
  "id": null,
  "stockLocationId": null,
  "supplierId": null,
  "accountNumber": null,
  "estimatedDeliveryDate": null,
  "raisedBy": null,
  "ownerId": null,
  "deliveryName": null,
  "deliveryPostcode": null,
  "deliveryAddress1": null,
  "deliveryAddress2": null,
  "deliveryAddress3": null,
  "deliveryAddress4": null,
  "tags": null,
  "supplierContactId": null,
} satisfies JoblogicAPIModelsCreateStockPOResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCreateStockPOResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


