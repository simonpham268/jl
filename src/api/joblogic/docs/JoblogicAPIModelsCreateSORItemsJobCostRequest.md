
# JoblogicAPIModelsCreateSORItemsJobCostRequest


## Properties

Name | Type
------------ | -------------
`quantity` | number
`scheduleOfRateLibraryId` | number
`scheduleOfRateItemId` | number
`tradeCategoryId` | number
`itemSellValue` | number
`longDescription` | string
`comments` | string
`status` | string
`comeFromMobile` | boolean
`variations` | boolean
`createdBy` | number
`discount` | number
`uplift` | number
`limitedSORAccess` | boolean
`uniqueId` | string
`itemId` | number
`hasQuote` | boolean
`isQuotedValue` | boolean
`quotedValueTaxCodeId` | string
`quotedValueTaxCodeValue` | string
`quotedValueTaxCodeDescription` | string
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
import type { JoblogicAPIModelsCreateSORItemsJobCostRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "quantity": null,
  "scheduleOfRateLibraryId": null,
  "scheduleOfRateItemId": null,
  "tradeCategoryId": null,
  "itemSellValue": null,
  "longDescription": null,
  "comments": null,
  "status": null,
  "comeFromMobile": null,
  "variations": null,
  "createdBy": null,
  "discount": null,
  "uplift": null,
  "limitedSORAccess": null,
  "uniqueId": null,
  "itemId": null,
  "hasQuote": null,
  "isQuotedValue": null,
  "quotedValueTaxCodeId": null,
  "quotedValueTaxCodeValue": null,
  "quotedValueTaxCodeDescription": null,
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
} satisfies JoblogicAPIModelsCreateSORItemsJobCostRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCreateSORItemsJobCostRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


