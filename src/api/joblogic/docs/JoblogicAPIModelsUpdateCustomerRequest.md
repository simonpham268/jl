
# JoblogicAPIModelsUpdateCustomerRequest


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`address1` | string
`address2` | string
`address3` | string
`address4` | string
`postcode` | string
`telephone` | string
`customerType` | string
`referenceNumber` | string
`tags` | Array&lt;string&gt;
`additionalDetails` | [JoblogicAPIModelsCustomerAdditionalDetailsRequest](JoblogicAPIModelsCustomerAdditionalDetailsRequest.md)
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsUpdateCustomerRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "address1": null,
  "address2": null,
  "address3": null,
  "address4": null,
  "postcode": null,
  "telephone": null,
  "customerType": null,
  "referenceNumber": null,
  "tags": null,
  "additionalDetails": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsUpdateCustomerRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsUpdateCustomerRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


