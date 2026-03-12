
# JoblogicAPIModelsCreateMaterialJobCostRequest


## Properties

Name | Type
------------ | -------------
`engineerId` | number
`partId` | number
`partNumber` | string
`jobPartId` | number
`forEquipmentUse` | boolean
`isIssueFromStock` | boolean
`locationRackShelfId` | number
`locationId` | number
`lineId` | number
`quantity` | number
`jobLogicUserId` | number
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
import type { JoblogicAPIModelsCreateMaterialJobCostRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "engineerId": null,
  "partId": null,
  "partNumber": null,
  "jobPartId": null,
  "forEquipmentUse": null,
  "isIssueFromStock": null,
  "locationRackShelfId": null,
  "locationId": null,
  "lineId": null,
  "quantity": null,
  "jobLogicUserId": null,
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
} satisfies JoblogicAPIModelsCreateMaterialJobCostRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCreateMaterialJobCostRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


