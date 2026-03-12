
# JoblogicAPIModelsNGBNGBPPMContractCreateRequest


## Properties

Name | Type
------------ | -------------
`siteId` | number
`customerId` | number
`customerContractId` | number
`userId` | number
`startDate` | Date
`endDate` | Date
`pPMSellingRateId` | number
`billingType` | [JobLogicMicroserviceCoreContractPPMContractBillingType](JobLogicMicroserviceCoreContractPPMContractBillingType.md)
`fixedPriceDefaultValue` | number
`invoiceType` | [JobLogicMicroserviceCoreContractPPMContractInvoiceType](JobLogicMicroserviceCoreContractPPMContractInvoiceType.md)
`contractValue` | number
`firstInvoiceDate` | Date
`visitFirstDate` | Date
`visitFrequency` | [JobLogicMicroserviceCoreContractPPMContractFrequency](JobLogicMicroserviceCoreContractPPMContractFrequency.md)
`billingFrequency` | [JobLogicMicroserviceCoreContractPPMContractFrequency](JobLogicMicroserviceCoreContractPPMContractFrequency.md)
`billingFrequencyOther` | number
`description` | string
`defaultEngineerId` | number
`addressType` | [JobLogicMicroserviceCoreContractInvoiceAddressTypeOption](JobLogicMicroserviceCoreContractInvoiceAddressTypeOption.md)
`planReference` | string
`invoiceHeaderText` | string
`terms` | string
`notes` | string
`accountNumber` | string
`orderNumber` | string
`name` | string
`address1` | string
`address2` | string
`address3` | string
`address4` | string
`postcode` | string
`tags` | Array&lt;string&gt;
`engineerTeamId` | number
`defaultSubcontractorId` | string
`assets` | [Array&lt;JobLogicMicroserviceCoreContractPPMSaveVisitsRequestJobAsset&gt;](JobLogicMicroserviceCoreContractPPMSaveVisitsRequestJobAsset.md)
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsNGBNGBPPMContractCreateRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "siteId": null,
  "customerId": null,
  "customerContractId": null,
  "userId": null,
  "startDate": null,
  "endDate": null,
  "pPMSellingRateId": null,
  "billingType": null,
  "fixedPriceDefaultValue": null,
  "invoiceType": null,
  "contractValue": null,
  "firstInvoiceDate": null,
  "visitFirstDate": null,
  "visitFrequency": null,
  "billingFrequency": null,
  "billingFrequencyOther": null,
  "description": null,
  "defaultEngineerId": null,
  "addressType": null,
  "planReference": null,
  "invoiceHeaderText": null,
  "terms": null,
  "notes": null,
  "accountNumber": null,
  "orderNumber": null,
  "name": null,
  "address1": null,
  "address2": null,
  "address3": null,
  "address4": null,
  "postcode": null,
  "tags": null,
  "engineerTeamId": null,
  "defaultSubcontractorId": null,
  "assets": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsNGBNGBPPMContractCreateRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsNGBNGBPPMContractCreateRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


