
# JoblogicAPIModelsSubcontractorAllocateRequest


## Properties

Name | Type
------------ | -------------
`jobUniqueId` | string
`subcontractorUniqueId` | string
`priorityId` | string
`preferredAppointmentDate` | Date
`targetCompletionDate` | Date
`sendPO` | boolean
`subcontractorContactId` | number
`purchaseOrderTemplateId` | string
`areas` | Array&lt;string&gt;
`tradeUniqueIds` | Array&lt;string&gt;
`tags` | Array&lt;string&gt;
`notes` | Array&lt;string&gt;
`hasAttachment` | boolean
`lines` | [Array&lt;JoblogicAPIModelsSubcontractorAllocateRequest WorkItem&gt;](JoblogicAPIModelsSubcontractorAllocateRequest WorkItem.md)
`workInstructions` | string
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsSubcontractorAllocateRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "jobUniqueId": null,
  "subcontractorUniqueId": null,
  "priorityId": null,
  "preferredAppointmentDate": null,
  "targetCompletionDate": null,
  "sendPO": null,
  "subcontractorContactId": null,
  "purchaseOrderTemplateId": null,
  "areas": null,
  "tradeUniqueIds": null,
  "tags": null,
  "notes": null,
  "hasAttachment": null,
  "lines": null,
  "workInstructions": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsSubcontractorAllocateRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsSubcontractorAllocateRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


