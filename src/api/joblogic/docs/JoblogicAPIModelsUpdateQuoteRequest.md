
# JoblogicAPIModelsUpdateQuoteRequest


## Properties

Name | Type
------------ | -------------
`id` | number
`uniqueId` | string
`dateLogged` | string
`jobType` | string
`assignedToUserId` | number
`jobCategory` | string
`title` | string
`description` | string
`customReference` | string
`sourceId` | string
`priorityLevel` | string
`tradeId` | string
`expiryDate` | string
`saleDate` | string
`nextContactDate` | string
`chanceOfSale` | number
`validateChanceOfSale` | boolean
`tags` | Array&lt;string&gt;
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsUpdateQuoteRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "uniqueId": null,
  "dateLogged": null,
  "jobType": null,
  "assignedToUserId": null,
  "jobCategory": null,
  "title": null,
  "description": null,
  "customReference": null,
  "sourceId": null,
  "priorityLevel": null,
  "tradeId": null,
  "expiryDate": null,
  "saleDate": null,
  "nextContactDate": null,
  "chanceOfSale": null,
  "validateChanceOfSale": null,
  "tags": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsUpdateQuoteRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsUpdateQuoteRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


