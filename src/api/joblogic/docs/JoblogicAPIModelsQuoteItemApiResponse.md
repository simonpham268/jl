
# JoblogicAPIModelsQuoteItemApiResponse


## Properties

Name | Type
------------ | -------------
`id` | number
`uniqueId` | string
`quoteNumber` | string
`customerId` | number
`customerName` | string
`customerCustomReference` | string
`siteId` | number
`siteName` | string
`siteCustomReference` | string
`description` | string
`dateLogged` | Date
`contact` | string
`telephone` | string
`emailAddress` | string
`quoteStatusId` | number
`quoteStatusDescription` | string
`isUpgraded` | boolean
`orderNumber` | string
`isRejected` | boolean
`isCancelled` | boolean
`ownerName` | string
`customReference` | string
`parentJobStringId` | string
`parentJobAutoId` | number
`quoteValue` | number
`quoteValueExcludingVat` | number
`expiryDate` | Date
`approvedDatetime` | Date
`nextContactDate` | Date
`hasRelated` | boolean
`sitePostcode` | string
`tags` | Array&lt;string&gt;
`lines` | [JobLogicMicroserviceCoreContractQuoteLineResponse](JobLogicMicroserviceCoreContractQuoteLineResponse.md)
`jobType` | string
`assignedToUserId` | number
`jobCategory` | string
`title` | string
`sourceId` | string
`priorityLevel` | string
`tradeId` | string
`saleDate` | Date
`chanceOfSale` | number

## Example

```typescript
import type { JoblogicAPIModelsQuoteItemApiResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "uniqueId": null,
  "quoteNumber": null,
  "customerId": null,
  "customerName": null,
  "customerCustomReference": null,
  "siteId": null,
  "siteName": null,
  "siteCustomReference": null,
  "description": null,
  "dateLogged": null,
  "contact": null,
  "telephone": null,
  "emailAddress": null,
  "quoteStatusId": null,
  "quoteStatusDescription": null,
  "isUpgraded": null,
  "orderNumber": null,
  "isRejected": null,
  "isCancelled": null,
  "ownerName": null,
  "customReference": null,
  "parentJobStringId": null,
  "parentJobAutoId": null,
  "quoteValue": null,
  "quoteValueExcludingVat": null,
  "expiryDate": null,
  "approvedDatetime": null,
  "nextContactDate": null,
  "hasRelated": null,
  "sitePostcode": null,
  "tags": null,
  "lines": null,
  "jobType": null,
  "assignedToUserId": null,
  "jobCategory": null,
  "title": null,
  "sourceId": null,
  "priorityLevel": null,
  "tradeId": null,
  "saleDate": null,
  "chanceOfSale": null,
} satisfies JoblogicAPIModelsQuoteItemApiResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsQuoteItemApiResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


