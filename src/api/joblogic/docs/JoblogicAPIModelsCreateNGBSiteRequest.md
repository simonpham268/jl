
# JoblogicAPIModelsCreateNGBSiteRequest


## Properties

Name | Type
------------ | -------------
`customerId` | string
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
`contacts` | [Array&lt;JoblogicAPIModelsNGBContactModelRequest&gt;](JoblogicAPIModelsNGBContactModelRequest.md)
`tags` | Array&lt;string&gt;
`additionalDetails` | [JoblogicAPIModelsNGBSiteAdditionalDetailsRequest](JoblogicAPIModelsNGBSiteAdditionalDetailsRequest.md)
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsCreateNGBSiteRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "customerId": null,
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
  "contacts": null,
  "tags": null,
  "additionalDetails": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsCreateNGBSiteRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCreateNGBSiteRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


