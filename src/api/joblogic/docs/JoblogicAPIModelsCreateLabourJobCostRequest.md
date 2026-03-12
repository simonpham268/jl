
# JoblogicAPIModelsCreateLabourJobCostRequest


## Properties

Name | Type
------------ | -------------
`endDate` | Date
`engineerId` | number
`visitLabourId` | number
`tradeId` | string
`payBandId` | string
`sellDuration` | number
`roundingType` | [JobLogicMicroserviceCoreContractRoundingType](JobLogicMicroserviceCoreContractRoundingType.md)
`roundingDuration` | number
`jobId` | number
`description` | string
`dateIncurred` | Date
`costPerUnit` | number
`sellPerUnit` | number
`isChargeable` | boolean
`priceCalculationType` | [JobLogicMicroserviceCoreContractPriceCalculationType](JobLogicMicroserviceCoreContractPriceCalculationType.md)
`taxCodeId` | string
`userId` | string
`tagIds` | Array&lt;string&gt;
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsCreateLabourJobCostRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "endDate": null,
  "engineerId": null,
  "visitLabourId": null,
  "tradeId": null,
  "payBandId": null,
  "sellDuration": null,
  "roundingType": null,
  "roundingDuration": null,
  "jobId": null,
  "description": null,
  "dateIncurred": null,
  "costPerUnit": null,
  "sellPerUnit": null,
  "isChargeable": null,
  "priceCalculationType": null,
  "taxCodeId": null,
  "userId": null,
  "tagIds": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsCreateLabourJobCostRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCreateLabourJobCostRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


