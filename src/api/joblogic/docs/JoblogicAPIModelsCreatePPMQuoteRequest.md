
# JoblogicAPIModelsCreatePPMQuoteRequest


## Properties

Name | Type
------------ | -------------
`customerId` | number
`siteId` | number
`planReference` | string
`description` | string
`jobCategoryId` | number
`accountManagerId` | number
`tagIds` | Array&lt;string&gt;
`startDate` | Date
`endDate` | Date
`sellingRateId` | number
`billingType` | [JobLogicMicroserviceCoreContractPPMContractBillingType](JobLogicMicroserviceCoreContractPPMContractBillingType.md)
`invoiceType` | [JobLogicMicroserviceCoreContractPPMContractInvoiceType](JobLogicMicroserviceCoreContractPPMContractInvoiceType.md)
`invoiceContractValue` | number
`visitDefaultValue` | number
`invoiceFirstDate` | Date
`invoiceFrequency` | [JobLogicMicroserviceCoreContractPPMContractFrequency](JobLogicMicroserviceCoreContractPPMContractFrequency.md)
`weekNumber` | number
`visitFirstDate` | Date
`visitFrequency` | [JobLogicMicroserviceCoreContractPPMContractFrequency](JobLogicMicroserviceCoreContractPPMContractFrequency.md)
`visitDescription` | string
`selectedAddressType` | [JobLogicMicroserviceCoreContractInvoiceAddressTypeOption](JobLogicMicroserviceCoreContractInvoiceAddressTypeOption.md)
`addressName` | string
`address1` | string
`address2` | string
`address3` | string
`address4` | string
`postcode` | string
`defaultEngineerId` | number
`labour` | number
`overtime` | number
`travel` | number
`mileage` | number
`material` | number
`expenses` | number
`callout` | number
`subcontractor` | number
`invoiceHeader` | [JobLogicMicroserviceCoreContractPPMQuoteInvoiceHeaderCreateRequest](JobLogicMicroserviceCoreContractPPMQuoteInvoiceHeaderCreateRequest.md)
`noBillingContractValue` | number
`customerContractId` | number
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsCreatePPMQuoteRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "customerId": null,
  "siteId": null,
  "planReference": null,
  "description": null,
  "jobCategoryId": null,
  "accountManagerId": null,
  "tagIds": null,
  "startDate": null,
  "endDate": null,
  "sellingRateId": null,
  "billingType": null,
  "invoiceType": null,
  "invoiceContractValue": null,
  "visitDefaultValue": null,
  "invoiceFirstDate": null,
  "invoiceFrequency": null,
  "weekNumber": null,
  "visitFirstDate": null,
  "visitFrequency": null,
  "visitDescription": null,
  "selectedAddressType": null,
  "addressName": null,
  "address1": null,
  "address2": null,
  "address3": null,
  "address4": null,
  "postcode": null,
  "defaultEngineerId": null,
  "labour": null,
  "overtime": null,
  "travel": null,
  "mileage": null,
  "material": null,
  "expenses": null,
  "callout": null,
  "subcontractor": null,
  "invoiceHeader": null,
  "noBillingContractValue": null,
  "customerContractId": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsCreatePPMQuoteRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCreatePPMQuoteRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


