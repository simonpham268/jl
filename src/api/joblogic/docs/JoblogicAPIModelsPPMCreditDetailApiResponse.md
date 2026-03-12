
# JoblogicAPIModelsPPMCreditDetailApiResponse


## Properties

Name | Type
------------ | -------------
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
`lines` | [Array&lt;JoblogicAPIModelsPPMCreditLineItemApiResponse&gt;](JoblogicAPIModelsPPMCreditLineItemApiResponse.md)
`raisedByUniqueId` | string
`raisedByName` | string
`invoiceUniqueId` | string
`invoiceId` | number

## Example

```typescript
import type { JoblogicAPIModelsPPMCreditDetailApiResponse } from ''

// TODO: Update the object below with actual values
const example = {
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
  "invoiceUniqueId": null,
  "invoiceId": null,
} satisfies JoblogicAPIModelsPPMCreditDetailApiResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsPPMCreditDetailApiResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


