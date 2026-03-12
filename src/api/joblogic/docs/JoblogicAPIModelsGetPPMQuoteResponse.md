
# JoblogicAPIModelsGetPPMQuoteResponse


## Properties

Name | Type
------------ | -------------
`uniqueId` | string
`customerId` | number
`siteId` | number
`pPMQuoteNumber` | string
`billingType` | [JobLogicMicroserviceCoreContractPPMContractBillingType](JobLogicMicroserviceCoreContractPPMContractBillingType.md)
`customerOrderNumber` | string
`invoiceContractValue` | number
`invoiceFrequency` | [JobLogicMicroserviceCoreContractPPMContractFrequency](JobLogicMicroserviceCoreContractPPMContractFrequency.md)
`invoiceFirstDate` | Date
`visitDefaultValue` | number
`visitFirstDate` | Date
`visitFrequency` | [JobLogicMicroserviceCoreContractPPMContractFrequency](JobLogicMicroserviceCoreContractPPMContractFrequency.md)
`visitDescription` | string
`totalVisits` | number
`description` | string
`planReference` | string
`startDate` | Date
`endDate` | Date
`jobCategoryId` | number
`jobCategoryDescription` | string
`pPMSellingRateId` | number
`pPMSellingRateDescription` | string
`createdDate` | Date
`createdByUser` | string
`statusUpdatedDate` | Date
`statusUpdatedBy` | string
`quoteRejectReason` | string
`cancelReason` | string
`defaultEngineerId` | number
`defaultEngineerName` | string
`defaultEngineerTeamId` | number
`defaultEngineerTeamName` | string
`defaultSubcontractorId` | string
`defaultSubcontractorName` | string
`labour` | number
`overtime` | number
`travel` | number
`mileage` | number
`material` | number
`expenses` | number
`callout` | number
`subcontractor` | number
`status` | [JobLogicMicroserviceCoreContractPPMQuoteStatus](JobLogicMicroserviceCoreContractPPMQuoteStatus.md)
`name` | string
`address1` | string
`address2` | string
`address3` | string
`address4` | string
`postcode` | string
`selectedAddressType` | [JobLogicMicroserviceCoreContractInvoiceAddressTypeOption](JobLogicMicroserviceCoreContractInvoiceAddressTypeOption.md)
`firstReadReceipt` | Date
`lastReadReceipt` | Date
`tagIds` | Array&lt;string&gt;
`tags` | [Array&lt;JobLogicMicroserviceCoreContractTagItemResponse&gt;](JobLogicMicroserviceCoreContractTagItemResponse.md)
`selectedInvoiceType` | [JobLogicMicroserviceCoreContractPPMContractInvoiceType](JobLogicMicroserviceCoreContractPPMContractInvoiceType.md)
`weekNumber` | number
`visitFrequencyDescription` | string
`invoiceFrequencyDescription` | string
`accountManagerId` | number
`accountManager` | string
`assignType` | [JobLogicMicroserviceCoreContractAssignType](JobLogicMicroserviceCoreContractAssignType.md)
`fromPortal` | boolean
`noBillingContractValue` | number
`customerContractId` | number
`excludeWeekends` | boolean

## Example

```typescript
import type { JoblogicAPIModelsGetPPMQuoteResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "uniqueId": null,
  "customerId": null,
  "siteId": null,
  "pPMQuoteNumber": null,
  "billingType": null,
  "customerOrderNumber": null,
  "invoiceContractValue": null,
  "invoiceFrequency": null,
  "invoiceFirstDate": null,
  "visitDefaultValue": null,
  "visitFirstDate": null,
  "visitFrequency": null,
  "visitDescription": null,
  "totalVisits": null,
  "description": null,
  "planReference": null,
  "startDate": null,
  "endDate": null,
  "jobCategoryId": null,
  "jobCategoryDescription": null,
  "pPMSellingRateId": null,
  "pPMSellingRateDescription": null,
  "createdDate": null,
  "createdByUser": null,
  "statusUpdatedDate": null,
  "statusUpdatedBy": null,
  "quoteRejectReason": null,
  "cancelReason": null,
  "defaultEngineerId": null,
  "defaultEngineerName": null,
  "defaultEngineerTeamId": null,
  "defaultEngineerTeamName": null,
  "defaultSubcontractorId": null,
  "defaultSubcontractorName": null,
  "labour": null,
  "overtime": null,
  "travel": null,
  "mileage": null,
  "material": null,
  "expenses": null,
  "callout": null,
  "subcontractor": null,
  "status": null,
  "name": null,
  "address1": null,
  "address2": null,
  "address3": null,
  "address4": null,
  "postcode": null,
  "selectedAddressType": null,
  "firstReadReceipt": null,
  "lastReadReceipt": null,
  "tagIds": null,
  "tags": null,
  "selectedInvoiceType": null,
  "weekNumber": null,
  "visitFrequencyDescription": null,
  "invoiceFrequencyDescription": null,
  "accountManagerId": null,
  "accountManager": null,
  "assignType": null,
  "fromPortal": null,
  "noBillingContractValue": null,
  "customerContractId": null,
  "excludeWeekends": null,
} satisfies JoblogicAPIModelsGetPPMQuoteResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsGetPPMQuoteResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


