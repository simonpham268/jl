
# JoblogicAPIModelsCustomerAdditionalDetailsRequest


## Properties

Name | Type
------------ | -------------
`accountNumber` | string
`vATNumber` | string
`active` | boolean
`billingDetails` | [JoblogicAPIModelsCustomerAdditionalDetailsRequest CustomerBillingDetails](JoblogicAPIModelsCustomerAdditionalDetailsRequest CustomerBillingDetails.md)
`invoiceDetails` | [JoblogicAPIModelsCustomerAdditionalDetailsRequest CustomerInvoiceDetails](JoblogicAPIModelsCustomerAdditionalDetailsRequest CustomerInvoiceDetails.md)
`accountManager` | number
`warningNotes1` | [JoblogicAPIModelsCustomerAdditionalDetailsRequest WarningNotes](JoblogicAPIModelsCustomerAdditionalDetailsRequest WarningNotes.md)
`warningNotes2` | [JoblogicAPIModelsCustomerAdditionalDetailsRequest WarningNotes](JoblogicAPIModelsCustomerAdditionalDetailsRequest WarningNotes.md)
`warningNotes3` | [JoblogicAPIModelsCustomerAdditionalDetailsRequest WarningNotes](JoblogicAPIModelsCustomerAdditionalDetailsRequest WarningNotes.md)

## Example

```typescript
import type { JoblogicAPIModelsCustomerAdditionalDetailsRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "accountNumber": null,
  "vATNumber": null,
  "active": null,
  "billingDetails": null,
  "invoiceDetails": null,
  "accountManager": null,
  "warningNotes1": null,
  "warningNotes2": null,
  "warningNotes3": null,
} satisfies JoblogicAPIModelsCustomerAdditionalDetailsRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCustomerAdditionalDetailsRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


