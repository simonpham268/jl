
# JoblogicAPIModelsJobOtherResponse


## Properties

Name | Type
------------ | -------------
`id` | number
`dateIncurred` | Date
`description` | string
`quantity` | number
`cost` | number
`sell` | number
`uplift` | number
`engineerId` | number
`engineerName` | string
`engineerTeamId` | number
`engineerTeamName` | string
`statusDescription` | string
`hasBeenInvoiced` | boolean
`invoiceId` | number
`invoiceGuid` | string
`totalCostExcludingVat` | number
`totalSellExcludingVat` | number
`isChargeable` | boolean
`taxCodeId` | string
`vatRateValue` | number
`taxCodeDescription` | string
`isQuotedValue` | boolean
`assignType` | [JobLogicMicroserviceCoreContractAssignType](JobLogicMicroserviceCoreContractAssignType.md)
`priceCalculationType` | [JobLogicMicroserviceCoreContractPriceCalculationType](JobLogicMicroserviceCoreContractPriceCalculationType.md)
`tagIds` | Array&lt;string&gt;

## Example

```typescript
import type { JoblogicAPIModelsJobOtherResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "dateIncurred": null,
  "description": null,
  "quantity": null,
  "cost": null,
  "sell": null,
  "uplift": null,
  "engineerId": null,
  "engineerName": null,
  "engineerTeamId": null,
  "engineerTeamName": null,
  "statusDescription": null,
  "hasBeenInvoiced": null,
  "invoiceId": null,
  "invoiceGuid": null,
  "totalCostExcludingVat": null,
  "totalSellExcludingVat": null,
  "isChargeable": null,
  "taxCodeId": null,
  "vatRateValue": null,
  "taxCodeDescription": null,
  "isQuotedValue": null,
  "assignType": null,
  "priceCalculationType": null,
  "tagIds": null,
} satisfies JoblogicAPIModelsJobOtherResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsJobOtherResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


