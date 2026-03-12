
# JobLogicMicroserviceCoreContractInvoiceLineResponse


## Properties

Name | Type
------------ | -------------
`isDraft` | boolean
`id` | number
`description` | string
`pricePerUnit` | number
`quantity` | number
`totalExcludingVat` | number
`totalIncludingVat` | number
`totalVatAmount` | number
`discountAmount` | number
`discountPercentage` | number
`nominalCodeId` | string
`nominalCode` | string
`nominalCodeDescription` | string
`taxCodeId` | string
`vatRateValue` | number
`taxCodeDescription` | string
`isQuotedValue` | boolean
`sORUplift` | number
`sORDiscount` | number
`sORItemId` | number
`sORItemSellValue` | number
`isDiscountLine` | boolean
`grandTotal` | number
`invoiceIndex` | number
`taxCode` | string
`invoiceUniqueId` | string
`tags` | [Array&lt;JobLogicMicroserviceCoreContractTagItemResponse&gt;](JobLogicMicroserviceCoreContractTagItemResponse.md)

## Example

```typescript
import type { JobLogicMicroserviceCoreContractInvoiceLineResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "isDraft": null,
  "id": null,
  "description": null,
  "pricePerUnit": null,
  "quantity": null,
  "totalExcludingVat": null,
  "totalIncludingVat": null,
  "totalVatAmount": null,
  "discountAmount": null,
  "discountPercentage": null,
  "nominalCodeId": null,
  "nominalCode": null,
  "nominalCodeDescription": null,
  "taxCodeId": null,
  "vatRateValue": null,
  "taxCodeDescription": null,
  "isQuotedValue": null,
  "sORUplift": null,
  "sORDiscount": null,
  "sORItemId": null,
  "sORItemSellValue": null,
  "isDiscountLine": null,
  "grandTotal": null,
  "invoiceIndex": null,
  "taxCode": null,
  "invoiceUniqueId": null,
  "tags": null,
} satisfies JobLogicMicroserviceCoreContractInvoiceLineResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JobLogicMicroserviceCoreContractInvoiceLineResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


