
# JoblogicAPIModelsQuoteLabourCostResponse


## Properties

Name | Type
------------ | -------------
`id` | number
`hasBeenInvoiced` | boolean
`lineType` | [JoblogicAPIModelsCostEnum QuoteLineOptions](JoblogicAPIModelsCostEnum QuoteLineOptions.md)
`description` | string
`cost` | number
`sell` | number
`isChargeable` | boolean
`taxCodeId` | string
`vatRateValue` | number
`taxCodeDescription` | string
`totalCostExcludingVat` | number
`totalSellExcludingVat` | number
`totalSellIncludingVat` | number
`duration` | string
`discountAmount` | number
`discountPercentage` | number
`tradeId` | string
`tradeDescription` | string
`payBandId` | string
`payBandDescription` | string
`priceCalculationType` | [JoblogicAPIModelsCostEnum PriceCalculationType](JoblogicAPIModelsCostEnum PriceCalculationType.md)
`tagIds` | Array&lt;string&gt;

## Example

```typescript
import type { JoblogicAPIModelsQuoteLabourCostResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "hasBeenInvoiced": null,
  "lineType": null,
  "description": null,
  "cost": null,
  "sell": null,
  "isChargeable": null,
  "taxCodeId": null,
  "vatRateValue": null,
  "taxCodeDescription": null,
  "totalCostExcludingVat": null,
  "totalSellExcludingVat": null,
  "totalSellIncludingVat": null,
  "duration": null,
  "discountAmount": null,
  "discountPercentage": null,
  "tradeId": null,
  "tradeDescription": null,
  "payBandId": null,
  "payBandDescription": null,
  "priceCalculationType": null,
  "tagIds": null,
} satisfies JoblogicAPIModelsQuoteLabourCostResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsQuoteLabourCostResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


