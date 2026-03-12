
# JoblogicAPIModelsCustomerAdditionalDetails


## Properties

Name | Type
------------ | -------------
`vATNumber` | string
`billingDetails` | [JoblogicAPIModelsCustomerAdditionalDetails CustomerBillingDetails](JoblogicAPIModelsCustomerAdditionalDetails CustomerBillingDetails.md)
`invoiceDetails` | [JoblogicAPIModelsCustomerAdditionalDetails CustomerInvoiceDetails](JoblogicAPIModelsCustomerAdditionalDetails CustomerInvoiceDetails.md)
`accountManager` | number
`active` | boolean
`warningNotes1` | [JoblogicAPIModelsCustomerAdditionalDetails WarningNotes](JoblogicAPIModelsCustomerAdditionalDetails WarningNotes.md)
`warningNotes2` | [JoblogicAPIModelsCustomerAdditionalDetails WarningNotes](JoblogicAPIModelsCustomerAdditionalDetails WarningNotes.md)
`warningNotes3` | [JoblogicAPIModelsCustomerAdditionalDetails WarningNotes](JoblogicAPIModelsCustomerAdditionalDetails WarningNotes.md)

## Example

```typescript
import type { JoblogicAPIModelsCustomerAdditionalDetails } from ''

// TODO: Update the object below with actual values
const example = {
  "vATNumber": null,
  "billingDetails": null,
  "invoiceDetails": null,
  "accountManager": null,
  "active": null,
  "warningNotes1": null,
  "warningNotes2": null,
  "warningNotes3": null,
} satisfies JoblogicAPIModelsCustomerAdditionalDetails

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCustomerAdditionalDetails
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


