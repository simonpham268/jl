
# JoblogicAPIModelsStockPurchaseOrderLineResponse


## Properties

Name | Type
------------ | -------------
`id` | string
`date` | Date
`quantity` | number
`listPrice` | number
`discount` | number
`description` | string
`isDelivered` | boolean
`dateDelivered` | Date
`deliveredByUserId` | number
`deliveredByUser` | string
`totalExcludingVat` | number
`totalExcludingVatIncludingDiscount` | number
`vatRate` | number
`nominalCodeDescription` | string
`rackShelfId` | number
`rackShelfName` | string
`groupLineItemId` | string
`isNotRequired` | boolean
`deliveredQuantity` | number
`outstandingQuantity` | number
`matchedQuantity` | number
`gRNInfo` | [JoblogicAPIModelsPOGRNInfoResponse](JoblogicAPIModelsPOGRNInfoResponse.md)
`isLocked` | boolean
`invoicedQuantity` | number
`partId` | number
`carriageCost` | number
`priceAfterCarriage` | number
`deliveryStatus` | [JoblogicAPIPOLineDeliveryStatus](JoblogicAPIPOLineDeliveryStatus.md)
`refrigerantTypeId` | string

## Example

```typescript
import type { JoblogicAPIModelsStockPurchaseOrderLineResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "date": null,
  "quantity": null,
  "listPrice": null,
  "discount": null,
  "description": null,
  "isDelivered": null,
  "dateDelivered": null,
  "deliveredByUserId": null,
  "deliveredByUser": null,
  "totalExcludingVat": null,
  "totalExcludingVatIncludingDiscount": null,
  "vatRate": null,
  "nominalCodeDescription": null,
  "rackShelfId": null,
  "rackShelfName": null,
  "groupLineItemId": null,
  "isNotRequired": null,
  "deliveredQuantity": null,
  "outstandingQuantity": null,
  "matchedQuantity": null,
  "gRNInfo": null,
  "isLocked": null,
  "invoicedQuantity": null,
  "partId": null,
  "carriageCost": null,
  "priceAfterCarriage": null,
  "deliveryStatus": null,
  "refrigerantTypeId": null,
} satisfies JoblogicAPIModelsStockPurchaseOrderLineResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsStockPurchaseOrderLineResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


