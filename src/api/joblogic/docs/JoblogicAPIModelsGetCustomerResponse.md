
# JoblogicAPIModelsGetCustomerResponse


## Properties

Name | Type
------------ | -------------
`intId` | number
`id` | string
`externalId` | string
`name` | string
`address` | string
`address1` | string
`address2` | string
`address3` | string
`address4` | string
`postcode` | string
`telephone` | string
`customerType` | string
`accountNumber` | string
`referenceNumber` | string
`contacts` | [Array&lt;JoblogicAPIModelsGetContactRequest&gt;](JoblogicAPIModelsGetContactRequest.md)
`tags` | Array&lt;string&gt;
`additionalDetails` | [JoblogicAPIModelsCustomerAdditionalDetails](JoblogicAPIModelsCustomerAdditionalDetails.md)

## Example

```typescript
import type { JoblogicAPIModelsGetCustomerResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "intId": null,
  "id": null,
  "externalId": null,
  "name": null,
  "address": null,
  "address1": null,
  "address2": null,
  "address3": null,
  "address4": null,
  "postcode": null,
  "telephone": null,
  "customerType": null,
  "accountNumber": null,
  "referenceNumber": null,
  "contacts": null,
  "tags": null,
  "additionalDetails": null,
} satisfies JoblogicAPIModelsGetCustomerResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsGetCustomerResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


