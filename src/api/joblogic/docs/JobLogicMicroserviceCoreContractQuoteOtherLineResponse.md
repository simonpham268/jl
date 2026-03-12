
# JobLogicMicroserviceCoreContractQuoteOtherLineResponse


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
`isChargeable` | boolean
`taxCodeId` | string
`vatRateValue` | number
`taxCodeDescription` | string
`totalCostExcludingVat` | number
`totalSellExcludingVat` | number
`totalSellIncludingVat` | number
`discountAmount` | number
`discountPercentage` | number
`priceCalculationType` | [JobLogicMicroserviceCoreContractPriceCalculationType](JobLogicMicroserviceCoreContractPriceCalculationType.md)
`tagIds` | Array&lt;string&gt;

## Example

```typescript
import type { JobLogicMicroserviceCoreContractQuoteOtherLineResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "hasBeenInvoiced": null,
  "lineType": null,
  "description": null,
  "quantity": null,
  "cost": null,
  "sell": null,
  "isChargeable": null,
  "taxCodeId": null,
  "vatRateValue": null,
  "taxCodeDescription": null,
  "totalCostExcludingVat": null,
  "totalSellExcludingVat": null,
  "totalSellIncludingVat": null,
  "discountAmount": null,
  "discountPercentage": null,
  "priceCalculationType": null,
  "tagIds": null,
} satisfies JobLogicMicroserviceCoreContractQuoteOtherLineResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JobLogicMicroserviceCoreContractQuoteOtherLineResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


