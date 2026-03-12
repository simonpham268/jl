
# JoblogicAPIModelsCreditCGroupInvoiceDetailApiResponse


## Properties

Name | Type
------------ | -------------
`intId` | number
`uniqueId` | string
`creditNumber` | string
`dateRaised` | Date
`isDraft` | boolean
`addressType` | [JobLogicMicroserviceCoreContractInvoiceAddressTypeOption](JobLogicMicroserviceCoreContractInvoiceAddressTypeOption.md)
`name` | string
`address` | string
`postcode` | string
`orderNumber` | string
`accountNumber` | string
`creditReason` | string
`notes` | string
`lines` | [Array&lt;JoblogicAPIModelsCreditCGroupInvoiceDetailApiResponse Line&gt;](JoblogicAPIModelsCreditCGroupInvoiceDetailApiResponse Line.md)
`raisedByUniqueId` | string
`raisedByName` | string
`originalInvoiceNumber` | string
`customerId` | number
`customerName` | string

## Example

```typescript
import type { JoblogicAPIModelsCreditCGroupInvoiceDetailApiResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "intId": null,
  "uniqueId": null,
  "creditNumber": null,
  "dateRaised": null,
  "isDraft": null,
  "addressType": null,
  "name": null,
  "address": null,
  "postcode": null,
  "orderNumber": null,
  "accountNumber": null,
  "creditReason": null,
  "notes": null,
  "lines": null,
  "raisedByUniqueId": null,
  "raisedByName": null,
  "originalInvoiceNumber": null,
  "customerId": null,
  "customerName": null,
} satisfies JoblogicAPIModelsCreditCGroupInvoiceDetailApiResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCreditCGroupInvoiceDetailApiResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


