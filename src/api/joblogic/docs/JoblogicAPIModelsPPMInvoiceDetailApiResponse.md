
# JoblogicAPIModelsPPMInvoiceDetailApiResponse


## Properties

Name | Type
------------ | -------------
`uniqueId` | string
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
`line` | [JoblogicAPIModelsPPMInvoiceDetailApiResponse LineData](JoblogicAPIModelsPPMInvoiceDetailApiResponse LineData.md)
`raisedByUniqueId` | string
`raisedByName` | string
`batchStringId` | string
`batchAutoId` | number
`pPMContractId` | string

## Example

```typescript
import type { JoblogicAPIModelsPPMInvoiceDetailApiResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "uniqueId": null,
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
  "line": null,
  "raisedByUniqueId": null,
  "raisedByName": null,
  "batchStringId": null,
  "batchAutoId": null,
  "pPMContractId": null,
} satisfies JoblogicAPIModelsPPMInvoiceDetailApiResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsPPMInvoiceDetailApiResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


