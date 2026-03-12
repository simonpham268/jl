
# JoblogicAPIModelsCGroupInvoiceDetailApiResponse


## Properties

Name | Type
------------ | -------------
`intId` | number
`uniqueId` | string
`customerUniqueId` | string
`invoiceNumber` | string
`dateRaised` | Date
`isDraft` | boolean
`addressType` | number
`name` | string
`address` | string
`postcode` | string
`orderNumber` | string
`accountNumber` | string
`headerDescription` | string
`header` | string
`terms` | string
`notes` | string
`paymentDue` | Date
`jobLines` | [Array&lt;JoblogicAPIModelsCGroupInvoiceDetailApiResponse Jobline&gt;](JoblogicAPIModelsCGroupInvoiceDetailApiResponse Jobline.md)
`additionalLines` | [Array&lt;JoblogicAPIModelsCGroupInvoiceDetailApiResponse Additionalline&gt;](JoblogicAPIModelsCGroupInvoiceDetailApiResponse Additionalline.md)
`raisedByUniqueId` | string
`raisedByName` | string
`batchStringId` | string
`batchAutoId` | number

## Example

```typescript
import type { JoblogicAPIModelsCGroupInvoiceDetailApiResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "intId": null,
  "uniqueId": null,
  "customerUniqueId": null,
  "invoiceNumber": null,
  "dateRaised": null,
  "isDraft": null,
  "addressType": null,
  "name": null,
  "address": null,
  "postcode": null,
  "orderNumber": null,
  "accountNumber": null,
  "headerDescription": null,
  "header": null,
  "terms": null,
  "notes": null,
  "paymentDue": null,
  "jobLines": null,
  "additionalLines": null,
  "raisedByUniqueId": null,
  "raisedByName": null,
  "batchStringId": null,
  "batchAutoId": null,
} satisfies JoblogicAPIModelsCGroupInvoiceDetailApiResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCGroupInvoiceDetailApiResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


