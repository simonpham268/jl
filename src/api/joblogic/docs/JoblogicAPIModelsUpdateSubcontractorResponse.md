
# JoblogicAPIModelsUpdateSubcontractorResponse


## Properties

Name | Type
------------ | -------------
`uniqueId` | string
`name` | string
`emailAddress` | string
`address1` | string
`address2` | string
`address3` | string
`address4` | string
`postcode` | string
`telephone` | string
`accountNumber` | string
`isActive` | boolean
`taxCodeId` | string
`isSendPO` | boolean
`subcontractorTemplateId` | string
`tradeIds` | Array&lt;string&gt;
`areaIds` | Array&lt;string&gt;

## Example

```typescript
import type { JoblogicAPIModelsUpdateSubcontractorResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "uniqueId": null,
  "name": null,
  "emailAddress": null,
  "address1": null,
  "address2": null,
  "address3": null,
  "address4": null,
  "postcode": null,
  "telephone": null,
  "accountNumber": null,
  "isActive": null,
  "taxCodeId": null,
  "isSendPO": null,
  "subcontractorTemplateId": null,
  "tradeIds": null,
  "areaIds": null,
} satisfies JoblogicAPIModelsUpdateSubcontractorResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsUpdateSubcontractorResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


