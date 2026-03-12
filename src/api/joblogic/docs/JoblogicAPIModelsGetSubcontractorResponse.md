
# JoblogicAPIModelsGetSubcontractorResponse


## Properties

Name | Type
------------ | -------------
`intId` | number
`uniqueId` | string
`name` | string
`emailAddress` | string
`accountNumber` | string
`taxCodeUniqueId` | string
`postcode` | string
`address` | string
`address1` | string
`address2` | string
`address3` | string
`address4` | string
`isActive` | boolean
`telephone` | string
`taxCodeDescription` | string
`taxCodeValue` | number
`isSendPO` | boolean
`trades` | [Array&lt;JoblogicAPIModelsGetSubcontractorResponse Trade&gt;](JoblogicAPIModelsGetSubcontractorResponse Trade.md)
`areas` | [Array&lt;JoblogicAPIModelsGetSubcontractorResponse Area&gt;](JoblogicAPIModelsGetSubcontractorResponse Area.md)
`subcontractorTemplateUniqueId` | string
`subcontractorTemplateDescription` | string
`externalId` | string

## Example

```typescript
import type { JoblogicAPIModelsGetSubcontractorResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "intId": null,
  "uniqueId": null,
  "name": null,
  "emailAddress": null,
  "accountNumber": null,
  "taxCodeUniqueId": null,
  "postcode": null,
  "address": null,
  "address1": null,
  "address2": null,
  "address3": null,
  "address4": null,
  "isActive": null,
  "telephone": null,
  "taxCodeDescription": null,
  "taxCodeValue": null,
  "isSendPO": null,
  "trades": null,
  "areas": null,
  "subcontractorTemplateUniqueId": null,
  "subcontractorTemplateDescription": null,
  "externalId": null,
} satisfies JoblogicAPIModelsGetSubcontractorResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsGetSubcontractorResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


