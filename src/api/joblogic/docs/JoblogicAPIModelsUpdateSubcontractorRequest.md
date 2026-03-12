
# JoblogicAPIModelsUpdateSubcontractorRequest


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
`taxCodeUniqueId` | string
`isSendPO` | boolean
`subcontractorTemplateUniqueId` | string
`tradeUniqueIds` | Array&lt;string&gt;
`areaUniqueIds` | Array&lt;string&gt;
`externalId` | string
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsUpdateSubcontractorRequest } from ''

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
  "taxCodeUniqueId": null,
  "isSendPO": null,
  "subcontractorTemplateUniqueId": null,
  "tradeUniqueIds": null,
  "areaUniqueIds": null,
  "externalId": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsUpdateSubcontractorRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsUpdateSubcontractorRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


