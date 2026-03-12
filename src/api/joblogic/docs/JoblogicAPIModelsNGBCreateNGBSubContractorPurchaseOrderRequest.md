
# JoblogicAPIModelsNGBCreateNGBSubContractorPurchaseOrderRequest


## Properties

Name | Type
------------ | -------------
`status` | [JoblogicAPISubContractorPOStatus](JoblogicAPISubContractorPOStatus.md)
`customReference` | string
`ownerId` | number
`subContractorContactId` | number
`additionalInstructions` | string
`tagIds` | Array&lt;string&gt;
`areaIds` | Array&lt;string&gt;
`tradeIds` | Array&lt;string&gt;
`notes` | [Array&lt;JoblogicAPIModelsNGBNoteItem&gt;](JoblogicAPIModelsNGBNoteItem.md)
`items` | [Array&lt;JoblogicAPIModelsNGBLineItem&gt;](JoblogicAPIModelsNGBLineItem.md)
`subContractorId` | string
`jobUniqueId` | string
`accountNumber` | string
`estimatedCompletionDate` | Date
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsNGBCreateNGBSubContractorPurchaseOrderRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "status": null,
  "customReference": null,
  "ownerId": null,
  "subContractorContactId": null,
  "additionalInstructions": null,
  "tagIds": null,
  "areaIds": null,
  "tradeIds": null,
  "notes": null,
  "items": null,
  "subContractorId": null,
  "jobUniqueId": null,
  "accountNumber": null,
  "estimatedCompletionDate": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsNGBCreateNGBSubContractorPurchaseOrderRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsNGBCreateNGBSubContractorPurchaseOrderRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


