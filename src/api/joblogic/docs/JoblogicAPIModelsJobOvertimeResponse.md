
# JoblogicAPIModelsJobOvertimeResponse


## Properties

Name | Type
------------ | -------------
`duration` | string
`sellDuration` | string
`endDate` | Date
`linkedToCalloutCostId` | number
`calloutDuration` | string
`chargeableDuration` | string
`tradeId` | string
`tradeDescription` | string
`payBandId` | string
`payBandDescription` | string
`roundingType` | [JobLogicMicroserviceCoreContractRoundingType](JobLogicMicroserviceCoreContractRoundingType.md)
`roundingDuration` | number
`haveCostSynced` | boolean
`timeId` | number
`virtualTimeId` | number
`sellDurationHrs` | number
`sellDurationMins` | number
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
import type { JoblogicAPIModelsJobOvertimeResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "duration": null,
  "sellDuration": null,
  "endDate": null,
  "linkedToCalloutCostId": null,
  "calloutDuration": null,
  "chargeableDuration": null,
  "tradeId": null,
  "tradeDescription": null,
  "payBandId": null,
  "payBandDescription": null,
  "roundingType": null,
  "roundingDuration": null,
  "haveCostSynced": null,
  "timeId": null,
  "virtualTimeId": null,
  "sellDurationHrs": null,
  "sellDurationMins": null,
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
} satisfies JoblogicAPIModelsJobOvertimeResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsJobOvertimeResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


