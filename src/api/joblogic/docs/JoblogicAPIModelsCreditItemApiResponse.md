
# JoblogicAPIModelsCreditItemApiResponse


## Properties

Name | Type
------------ | -------------
`intId` | number
`id` | number
`uniqueId` | string
`creditNumber` | string
`customerUniqueId` | string
`siteUniqueId` | string
`jobUniqueId` | string
`invoiceId` | number
`dateRaised` | Date
`orderNumber` | string
`accountNumber` | string
`name` | string
`address` | string
`postcode` | string
`isDraft` | boolean
`creditReason` | string
`notes` | string
`raisedByUniqueId` | string
`raisedByName` | string
`lines` | [Array&lt;JoblogicAPIModelsCreditLineItemApiResponse&gt;](JoblogicAPIModelsCreditLineItemApiResponse.md)

## Example

```typescript
import type { JoblogicAPIModelsCreditItemApiResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "intId": null,
  "id": null,
  "uniqueId": null,
  "creditNumber": null,
  "customerUniqueId": null,
  "siteUniqueId": null,
  "jobUniqueId": null,
  "invoiceId": null,
  "dateRaised": null,
  "orderNumber": null,
  "accountNumber": null,
  "name": null,
  "address": null,
  "postcode": null,
  "isDraft": null,
  "creditReason": null,
  "notes": null,
  "raisedByUniqueId": null,
  "raisedByName": null,
  "lines": null,
} satisfies JoblogicAPIModelsCreditItemApiResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCreditItemApiResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


