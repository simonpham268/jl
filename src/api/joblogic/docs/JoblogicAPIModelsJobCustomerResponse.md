
# JoblogicAPIModelsJobCustomerResponse


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
`customerType` | string
`referenceNumber` | string
`contacts` | [Array&lt;JoblogicAPIModelsGetContactRequest&gt;](JoblogicAPIModelsGetContactRequest.md)
`tags` | Array&lt;string&gt;

## Example

```typescript
import type { JoblogicAPIModelsJobCustomerResponse } from ''

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
  "customerType": null,
  "referenceNumber": null,
  "contacts": null,
  "tags": null,
} satisfies JoblogicAPIModelsJobCustomerResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsJobCustomerResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


