
# JobLogicMicroserviceCoreContractQuoteExpenseLineResponse


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
`expenseId` | number
`expenseDescription` | string
`isChargeable` | boolean
`taxCodeId` | string
`vatRateValue` | number
`taxCodeDescription` | string
`discountAmount` | number
`discountPercentage` | number
`priceCalculationType` | [JobLogicMicroserviceCoreContractPriceCalculationType](JobLogicMicroserviceCoreContractPriceCalculationType.md)
`tagIds` | Array&lt;string&gt;

## Example

```typescript
import type { JobLogicMicroserviceCoreContractQuoteExpenseLineResponse } from ''

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
  "expenseId": null,
  "expenseDescription": null,
  "isChargeable": null,
  "taxCodeId": null,
  "vatRateValue": null,
  "taxCodeDescription": null,
  "discountAmount": null,
  "discountPercentage": null,
  "priceCalculationType": null,
  "tagIds": null,
} satisfies JobLogicMicroserviceCoreContractQuoteExpenseLineResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JobLogicMicroserviceCoreContractQuoteExpenseLineResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


