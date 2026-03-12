
# JoblogicAPIModelsStockPurchaseOrderLineDetailResponse


## Properties

Name | Type
------------ | -------------
`id` | string
`purchaseOrderId` | string
`date` | Date
`partId` | number
`partNumber` | string
`quantity` | number
`listPrice` | number
`discount` | number
`taxCodeId` | string
`description` | string
`isDelivered` | boolean
`dateDelivered` | Date
`deliveredByUserId` | number
`deliveredByUser` | string
`deliveredToAddressType` | [JoblogicAPIPurchaseOrderAddressTypeOption](JoblogicAPIPurchaseOrderAddressTypeOption.md)
`deliveredToName` | string
`deliveredToAddress1` | string
`deliveredToAddress2` | string
`deliveredToAddress3` | string
`deliveredToAddress4` | string
`deliveredToPostcode` | string
`totalVatAmount` | number
`totalDiscountAmount` | number
`totalExcludingVat` | number
`totalExcludingVatIncludingDiscount` | number
`totalIncludingVat` | number
`vatRate` | number
`taxCodeValue` | number
`taxCodeDescription` | string
`partDescription` | string
`partUseAsAsset` | boolean
`forEquipmentUse` | boolean
`partLibraryId` | number
`partLibraryName` | string
`partCategoryId` | number
`partCategoryDescription` | string
`assetClassId` | number
`assetClassDescription` | string
`make` | string
`model` | string
`nominalCodeId` | string
`nominalCodeDescription` | string
`rackShelfId` | number
`rackShelfName` | string
`updatedBy` | string
`groupLineItemId` | string
`isNotRequired` | boolean
`deliveredQuantity` | number
`outstandingQuantity` | number
`matchedQuantity` | number
`gRNUniqueId` | string
`gRNNumber` | string
`totalGRNs` | number
`deliveryStatus` | [JoblogicAPIPOLineDeliveryStatus](JoblogicAPIPOLineDeliveryStatus.md)
`tagIds` | Array&lt;string&gt;
`refrigerantTypeId` | string
`gasTypeId` | number
`isLocked` | boolean
`invoicedQuantity` | number
`carriageCost` | number
`priceAfterCarriage` | number

## Example

```typescript
import type { JoblogicAPIModelsStockPurchaseOrderLineDetailResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "purchaseOrderId": null,
  "date": null,
  "partId": null,
  "partNumber": null,
  "quantity": null,
  "listPrice": null,
  "discount": null,
  "taxCodeId": null,
  "description": null,
  "isDelivered": null,
  "dateDelivered": null,
  "deliveredByUserId": null,
  "deliveredByUser": null,
  "deliveredToAddressType": null,
  "deliveredToName": null,
  "deliveredToAddress1": null,
  "deliveredToAddress2": null,
  "deliveredToAddress3": null,
  "deliveredToAddress4": null,
  "deliveredToPostcode": null,
  "totalVatAmount": null,
  "totalDiscountAmount": null,
  "totalExcludingVat": null,
  "totalExcludingVatIncludingDiscount": null,
  "totalIncludingVat": null,
  "vatRate": null,
  "taxCodeValue": null,
  "taxCodeDescription": null,
  "partDescription": null,
  "partUseAsAsset": null,
  "forEquipmentUse": null,
  "partLibraryId": null,
  "partLibraryName": null,
  "partCategoryId": null,
  "partCategoryDescription": null,
  "assetClassId": null,
  "assetClassDescription": null,
  "make": null,
  "model": null,
  "nominalCodeId": null,
  "nominalCodeDescription": null,
  "rackShelfId": null,
  "rackShelfName": null,
  "updatedBy": null,
  "groupLineItemId": null,
  "isNotRequired": null,
  "deliveredQuantity": null,
  "outstandingQuantity": null,
  "matchedQuantity": null,
  "gRNUniqueId": null,
  "gRNNumber": null,
  "totalGRNs": null,
  "deliveryStatus": null,
  "tagIds": null,
  "refrigerantTypeId": null,
  "gasTypeId": null,
  "isLocked": null,
  "invoicedQuantity": null,
  "carriageCost": null,
  "priceAfterCarriage": null,
} satisfies JoblogicAPIModelsStockPurchaseOrderLineDetailResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsStockPurchaseOrderLineDetailResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


