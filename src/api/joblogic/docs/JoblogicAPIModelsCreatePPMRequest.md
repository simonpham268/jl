
# JoblogicAPIModelsCreatePPMRequest


## Properties

Name | Type
------------ | -------------
`siteId` | number
`startDate` | Date
`endDate` | Date
`pPMSellingRateId` | number
`billingType` | [JobLogicMicroserviceCoreContractPPMContractBillingType](JobLogicMicroserviceCoreContractPPMContractBillingType.md)
`fixedPriceDefaultValue` | number
`invoiceType` | [JobLogicMicroserviceCoreContractPPMContractInvoiceType](JobLogicMicroserviceCoreContractPPMContractInvoiceType.md)
`contractValue` | number
`firstInvoiceDate` | Date
`billingFrequency` | [JobLogicMicroserviceCoreContractPPMContractFrequency](JobLogicMicroserviceCoreContractPPMContractFrequency.md)
`billingFrequencyOther` | number
`description` | string
`addressType` | [JobLogicMicroserviceCoreContractInvoiceAddressTypeOption](JobLogicMicroserviceCoreContractInvoiceAddressTypeOption.md)
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsCreatePPMRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "siteId": null,
  "startDate": null,
  "endDate": null,
  "pPMSellingRateId": null,
  "billingType": null,
  "fixedPriceDefaultValue": null,
  "invoiceType": null,
  "contractValue": null,
  "firstInvoiceDate": null,
  "billingFrequency": null,
  "billingFrequencyOther": null,
  "description": null,
  "addressType": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsCreatePPMRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCreatePPMRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


