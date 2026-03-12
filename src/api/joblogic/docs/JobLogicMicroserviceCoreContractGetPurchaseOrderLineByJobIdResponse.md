
# JobLogicMicroserviceCoreContractGetPurchaseOrderLineByJobIdResponse


## Properties

Name | Type
------------ | -------------
`id` | string
`purchaseOrderId` | string
`date` | Date
`quantity` | number
`discount` | number
`description` | string
`isDelivered` | boolean
`dateDelivered` | Date
`number` | string
`totalVatAmount` | number
`totalDiscountAmount` | number
`totalExcludingVat` | number
`totalExcludingVatIncludingDiscount` | number
`taxRateValue` | number
`nominalCode` | string
`pricePerUnit` | number
`partId` | string

## Example

```typescript
import type { JobLogicMicroserviceCoreContractGetPurchaseOrderLineByJobIdResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "purchaseOrderId": null,
  "date": null,
  "quantity": null,
  "discount": null,
  "description": null,
  "isDelivered": null,
  "dateDelivered": null,
  "number": null,
  "totalVatAmount": null,
  "totalDiscountAmount": null,
  "totalExcludingVat": null,
  "totalExcludingVatIncludingDiscount": null,
  "taxRateValue": null,
  "nominalCode": null,
  "pricePerUnit": null,
  "partId": null,
} satisfies JobLogicMicroserviceCoreContractGetPurchaseOrderLineByJobIdResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JobLogicMicroserviceCoreContractGetPurchaseOrderLineByJobIdResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


