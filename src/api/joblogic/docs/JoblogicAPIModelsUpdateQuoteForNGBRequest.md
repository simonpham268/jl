
# JoblogicAPIModelsUpdateQuoteForNGBRequest


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
`customerContractId` | number
`comprehensiveAllowance` | number
`comprehensiveNotes` | string
`quoteUserReferenceFieldValue` | string
`quoteUserReferenceDropdownListValue` | string
`approvedBy` | number
`rejectedBy` | number
`rejectReasonId` | string
`orderNumber` | string
`contact` | string
`telephone` | string
`emailAddress` | string
`notes` | [Array&lt;JobLogicMicroserviceCoreContractQuoteNoteRequest&gt;](JobLogicMicroserviceCoreContractQuoteNoteRequest.md)
`assets` | [Array&lt;JobLogicMicroserviceCoreContractQuoteAssetRequest&gt;](JobLogicMicroserviceCoreContractQuoteAssetRequest.md)
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsUpdateQuoteForNGBRequest } from ''

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
  "customerContractId": null,
  "comprehensiveAllowance": null,
  "comprehensiveNotes": null,
  "quoteUserReferenceFieldValue": null,
  "quoteUserReferenceDropdownListValue": null,
  "approvedBy": null,
  "rejectedBy": null,
  "rejectReasonId": null,
  "orderNumber": null,
  "contact": null,
  "telephone": null,
  "emailAddress": null,
  "notes": null,
  "assets": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsUpdateQuoteForNGBRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsUpdateQuoteForNGBRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


