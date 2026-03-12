
# JoblogicAPIModelsResponseFormsLogbookSearchResp


## Properties

Name | Type
------------ | -------------
`uniqueId` | string
`customerId` | number
`siteId` | number
`jobId` | number
`assetId` | number
`customer` | string
`site` | string
`jobNumber` | string
`formType` | string
`formName` | string
`fullFormName` | string
`dateCreated` | Date
`engineer` | string
`assetNumber` | string
`assetDescription` | string
`visitComplete` | boolean
`attachOnCompletion` | boolean
`formReady` | boolean
`isPrivate` | boolean
`isDynamicForm` | boolean
`isGeneralForm` | boolean
`isFrozenJob` | boolean

## Example

```typescript
import type { JoblogicAPIModelsResponseFormsLogbookSearchResp } from ''

// TODO: Update the object below with actual values
const example = {
  "uniqueId": null,
  "customerId": null,
  "siteId": null,
  "jobId": null,
  "assetId": null,
  "customer": null,
  "site": null,
  "jobNumber": null,
  "formType": null,
  "formName": null,
  "fullFormName": null,
  "dateCreated": null,
  "engineer": null,
  "assetNumber": null,
  "assetDescription": null,
  "visitComplete": null,
  "attachOnCompletion": null,
  "formReady": null,
  "isPrivate": null,
  "isDynamicForm": null,
  "isGeneralForm": null,
  "isFrozenJob": null,
} satisfies JoblogicAPIModelsResponseFormsLogbookSearchResp

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsResponseFormsLogbookSearchResp
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


