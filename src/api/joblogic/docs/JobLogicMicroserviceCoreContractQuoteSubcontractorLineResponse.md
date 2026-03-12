
# JobLogicMicroserviceCoreContractQuoteSubcontractorLineResponse


## Properties

Name | Type
------------ | -------------
`id` | number
`hasBeenInvoiced` | boolean
`lineType` | [JobLogicMicroserviceCoreContractQuoteLineOptions](JobLogicMicroserviceCoreContractQuoteLineOptions.md)
`description` | string
`cost` | number
`sell` | number
`uplift` | number
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
`priceCalculationType` | [JobLogicMicroserviceCoreContractPriceCalculationType](JobLogicMicroserviceCoreContractPriceCalculationType.md)
`tagIds` | Array&lt;string&gt;

## Example

```typescript
import type { JobLogicMicroserviceCoreContractQuoteSubcontractorLineResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "hasBeenInvoiced": null,
  "lineType": null,
  "description": null,
  "cost": null,
  "sell": null,
  "uplift": null,
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
  "priceCalculationType": null,
  "tagIds": null,
} satisfies JobLogicMicroserviceCoreContractQuoteSubcontractorLineResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JobLogicMicroserviceCoreContractQuoteSubcontractorLineResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


