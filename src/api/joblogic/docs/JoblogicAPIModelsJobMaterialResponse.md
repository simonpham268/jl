
# JoblogicAPIModelsJobMaterialResponse


## Properties

Name | Type
------------ | -------------
`partId` | number
`partDescription` | string
`partNumber` | string
`partCategoryId` | number
`partCategoryDescription` | string
`partLibraryId` | number
`partLibraryName` | string
`hasEquipmentType` | boolean
`assetClassId` | number
`assetClassDescription` | string
`make` | string
`model` | string
`forEquipmentUse` | boolean
`hasFixedSell` | boolean
`setupSell` | number
`stockRecordId` | number
`locationId` | number
`locationRackShelfId` | number
`locationName` | string
`rackShelfName` | string
`isIssueFromStock` | boolean
`returnToStockAllowed` | boolean
`pOLineId` | string
`pOLinePartId` | number
`pOLineQuantity` | number
`isStockSuspended` | boolean
`refcomTransactionId` | string
`isIssueFromRefcom` | boolean
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
import type { JoblogicAPIModelsJobMaterialResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "partId": null,
  "partDescription": null,
  "partNumber": null,
  "partCategoryId": null,
  "partCategoryDescription": null,
  "partLibraryId": null,
  "partLibraryName": null,
  "hasEquipmentType": null,
  "assetClassId": null,
  "assetClassDescription": null,
  "make": null,
  "model": null,
  "forEquipmentUse": null,
  "hasFixedSell": null,
  "setupSell": null,
  "stockRecordId": null,
  "locationId": null,
  "locationRackShelfId": null,
  "locationName": null,
  "rackShelfName": null,
  "isIssueFromStock": null,
  "returnToStockAllowed": null,
  "pOLineId": null,
  "pOLinePartId": null,
  "pOLineQuantity": null,
  "isStockSuspended": null,
  "refcomTransactionId": null,
  "isIssueFromRefcom": null,
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
} satisfies JoblogicAPIModelsJobMaterialResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsJobMaterialResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


