
# JoblogicAPIModelsGetSiteResponse


## Properties

Name | Type
------------ | -------------
`intId` | number
`id` | string
`externalId` | string
`name` | string
`address1` | string
`address2` | string
`address3` | string
`address4` | string
`postcode` | string
`telephone` | string
`region` | string
`referenceNumber` | string
`accountNumber` | string
`contacts` | [Array&lt;JoblogicAPIModelsGetContactRequest&gt;](JoblogicAPIModelsGetContactRequest.md)
`tags` | Array&lt;string&gt;
`additionalDetails` | [JoblogicAPIModelsSiteAdditionalDetails](JoblogicAPIModelsSiteAdditionalDetails.md)
`customerUniqueId` | string

## Example

```typescript
import type { JoblogicAPIModelsGetSiteResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "intId": null,
  "id": null,
  "externalId": null,
  "name": null,
  "address1": null,
  "address2": null,
  "address3": null,
  "address4": null,
  "postcode": null,
  "telephone": null,
  "region": null,
  "referenceNumber": null,
  "accountNumber": null,
  "contacts": null,
  "tags": null,
  "additionalDetails": null,
  "customerUniqueId": null,
} satisfies JoblogicAPIModelsGetSiteResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsGetSiteResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


