
# JobLogicMicroserviceCoreContractQuoteMaterialLineResponse


## Properties

Name | Type
------------ | -------------
`id` | number
`hasBeenInvoiced` | boolean
`lineType` | [JobLogicMicroserviceCoreContractQuoteLineOptions](JobLogicMicroserviceCoreContractQuoteLineOptions.md)
`description` | string
`quantity` | number
`cost` | number
`sell` | number
`uplift` | number
`totalCostExcludingVat` | number
`totalSellExcludingVat` | number
`totalSellIncludingVat` | number
`partId` | string
`partDescription` | string
`partNumber` | string
`isChargeable` | boolean
`taxCodeId` | string
`vatRateValue` | number
`taxCodeDescription` | string
`partCategoryId` | string
`partCategoryDescription` | string
`discountAmount` | number
`discountPercentage` | number
`hasEquipmentType` | boolean
`assetClassId` | number
`assetClassDescription` | string
`make` | string
`model` | string
`forEquipmentUse` | boolean
`priceCalculationType` | [JobLogicMicroserviceCoreContractPriceCalculationType](JobLogicMicroserviceCoreContractPriceCalculationType.md)
`hasFixedSell` | boolean
`setupSell` | number
`partLibraryId` | number
`partLibraryName` | string
`tagIds` | Array&lt;string&gt;
`uniqueId` | string
`siteId` | number

## Example

```typescript
import type { JobLogicMicroserviceCoreContractQuoteMaterialLineResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "hasBeenInvoiced": null,
  "lineType": null,
  "description": null,
  "quantity": null,
  "cost": null,
  "sell": null,
  "uplift": null,
  "totalCostExcludingVat": null,
  "totalSellExcludingVat": null,
  "totalSellIncludingVat": null,
  "partId": null,
  "partDescription": null,
  "partNumber": null,
  "isChargeable": null,
  "taxCodeId": null,
  "vatRateValue": null,
  "taxCodeDescription": null,
  "partCategoryId": null,
  "partCategoryDescription": null,
  "discountAmount": null,
  "discountPercentage": null,
  "hasEquipmentType": null,
  "assetClassId": null,
  "assetClassDescription": null,
  "make": null,
  "model": null,
  "forEquipmentUse": null,
  "priceCalculationType": null,
  "hasFixedSell": null,
  "setupSell": null,
  "partLibraryId": null,
  "partLibraryName": null,
  "tagIds": null,
  "uniqueId": null,
  "siteId": null,
} satisfies JobLogicMicroserviceCoreContractQuoteMaterialLineResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JobLogicMicroserviceCoreContractQuoteMaterialLineResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


