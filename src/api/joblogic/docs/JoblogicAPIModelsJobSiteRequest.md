
# JoblogicAPIModelsJobSiteRequest


## Properties

Name | Type
------------ | -------------
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
`tags` | Array&lt;string&gt;
`contacts` | [Array&lt;JoblogicAPIModelsContactModelRequest&gt;](JoblogicAPIModelsContactModelRequest.md)
`validateTelephone` | boolean
`areaUniqueId` | string

## Example

```typescript
import type { JoblogicAPIModelsJobSiteRequest } from ''

// TODO: Update the object below with actual values
const example = {
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
  "tags": null,
  "contacts": null,
  "validateTelephone": null,
  "areaUniqueId": null,
} satisfies JoblogicAPIModelsJobSiteRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsJobSiteRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


