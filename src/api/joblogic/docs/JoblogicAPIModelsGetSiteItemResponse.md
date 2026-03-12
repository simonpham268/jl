
# JoblogicAPIModelsGetSiteItemResponse


## Properties

Name | Type
------------ | -------------
`contacts` | [Array&lt;JoblogicAPIModelsGetContactRequest&gt;](JoblogicAPIModelsGetContactRequest.md)
`tags` | Array&lt;string&gt;
`additionalDetails` | [JoblogicAPIModelsSiteAdditionalDetails](JoblogicAPIModelsSiteAdditionalDetails.md)
`customerUniqueId` | string
`id` | number
`uniqueId` | string
`active` | boolean
`name` | string
`address` | string
`address1` | string
`address2` | string
`address3` | string
`address4` | string
`telephone` | string
`emailAddress` | string
`referenceNumber` | string
`accountNumber` | string
`region` | string
`postcode` | string
`externalId` | string

## Example

```typescript
import type { JoblogicAPIModelsGetSiteItemResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "contacts": null,
  "tags": null,
  "additionalDetails": null,
  "customerUniqueId": null,
  "id": null,
  "uniqueId": null,
  "active": null,
  "name": null,
  "address": null,
  "address1": null,
  "address2": null,
  "address3": null,
  "address4": null,
  "telephone": null,
  "emailAddress": null,
  "referenceNumber": null,
  "accountNumber": null,
  "region": null,
  "postcode": null,
  "externalId": null,
} satisfies JoblogicAPIModelsGetSiteItemResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsGetSiteItemResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


