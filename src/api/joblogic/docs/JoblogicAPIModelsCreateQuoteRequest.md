
# JoblogicAPIModelsCreateQuoteRequest


## Properties

Name | Type
------------ | -------------
`customerId` | number
`siteId` | number
`siteUniqueId` | string
`contact` | string
`telephone` | string
`emailAddress` | string
`parentJobId` | number
`parentJobUniqueId` | string
`jobType` | string
`jobCategory` | string
`assignedToUserId` | number
`title` | string
`description` | string
`customReference` | string
`priorityLevel` | string
`sourceId` | string
`tradeId` | string
`chanceOfSale` | number
`expiryDate` | string
`saleDate` | string
`tags` | Array&lt;string&gt;
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsCreateQuoteRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "customerId": null,
  "siteId": null,
  "siteUniqueId": null,
  "contact": null,
  "telephone": null,
  "emailAddress": null,
  "parentJobId": null,
  "parentJobUniqueId": null,
  "jobType": null,
  "jobCategory": null,
  "assignedToUserId": null,
  "title": null,
  "description": null,
  "customReference": null,
  "priorityLevel": null,
  "sourceId": null,
  "tradeId": null,
  "chanceOfSale": null,
  "expiryDate": null,
  "saleDate": null,
  "tags": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsCreateQuoteRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCreateQuoteRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


