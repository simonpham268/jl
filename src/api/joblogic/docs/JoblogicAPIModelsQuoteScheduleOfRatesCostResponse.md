
# JoblogicAPIModelsQuoteScheduleOfRatesCostResponse


## Properties

Name | Type
------------ | -------------
`scheduleOfRateLibraryId` | number
`scheduleOfRateLibraryDescription` | string
`tradeCategoryId` | number
`tradeCategoryDescription` | string
`tradeCategoryCode` | string
`scheduleOfRateItemId` | number
`scheduleOfRateItemCode` | string
`scheduleOfRateItemDescription` | string
`scheduleOfRateItemCommentsRequired` | boolean
`scheduleOfRateItemSell` | number
`scheduleOfRateItemCost` | number
`scheduleOfRateItemHasChangedPrice` | boolean
`comments` | string
`longDescription` | string
`itemSellValue` | number
`id` | number
`lineType` | [JoblogicAPIModelsCostEnum QuoteLineOptions](JoblogicAPIModelsCostEnum QuoteLineOptions.md)
`description` | string
`quantity` | number
`cost` | number
`sell` | number
`uplift` | number
`discount` | number
`hasBeenInvoiced` | boolean
`totalCostExcludingVat` | number
`totalSellExcludingVat` | number
`totalSellIncludingVat` | number
`isChargeable` | boolean
`taxCodeId` | string
`vatRateValue` | number
`taxCodeDescription` | string
`isQuotedValue` | boolean
`priceCalculationType` | [JoblogicAPIModelsCostEnum PriceCalculationType](JoblogicAPIModelsCostEnum PriceCalculationType.md)
`tagIds` | Array&lt;string&gt;
`fixedValueRate` | boolean
`quoteCostScheduleOfRateItemSplits` | [Array&lt;JoblogicAPIModelsQuoteScheduleOfRatesCostResponse QuoteCostScheduleOfRateItemSplitResponse&gt;](JoblogicAPIModelsQuoteScheduleOfRatesCostResponse QuoteCostScheduleOfRateItemSplitResponse.md)

## Example

```typescript
import type { JoblogicAPIModelsQuoteScheduleOfRatesCostResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "scheduleOfRateLibraryId": null,
  "scheduleOfRateLibraryDescription": null,
  "tradeCategoryId": null,
  "tradeCategoryDescription": null,
  "tradeCategoryCode": null,
  "scheduleOfRateItemId": null,
  "scheduleOfRateItemCode": null,
  "scheduleOfRateItemDescription": null,
  "scheduleOfRateItemCommentsRequired": null,
  "scheduleOfRateItemSell": null,
  "scheduleOfRateItemCost": null,
  "scheduleOfRateItemHasChangedPrice": null,
  "comments": null,
  "longDescription": null,
  "itemSellValue": null,
  "id": null,
  "lineType": null,
  "description": null,
  "quantity": null,
  "cost": null,
  "sell": null,
  "uplift": null,
  "discount": null,
  "hasBeenInvoiced": null,
  "totalCostExcludingVat": null,
  "totalSellExcludingVat": null,
  "totalSellIncludingVat": null,
  "isChargeable": null,
  "taxCodeId": null,
  "vatRateValue": null,
  "taxCodeDescription": null,
  "isQuotedValue": null,
  "priceCalculationType": null,
  "tagIds": null,
  "fixedValueRate": null,
  "quoteCostScheduleOfRateItemSplits": null,
} satisfies JoblogicAPIModelsQuoteScheduleOfRatesCostResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsQuoteScheduleOfRatesCostResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


