
# JobLogicMicroserviceCoreContractInvoiceSearchItemResponse


## Properties

Name | Type
------------ | -------------
`type` | [JobLogicMicroserviceCoreContractInvoiceType](JobLogicMicroserviceCoreContractInvoiceType.md)
`id` | number
`uniqueId` | string
`invoiceNumber` | string
`customerId` | number
`customerName` | string
`siteId` | number
`siteName` | string
`jobId` | number
`pPMContractId` | string
`hireContractId` | number
`jobNumber` | string
`dateRaised` | Date
`description` | string
`jobDescription` | string
`orderNumber` | string
`accountNumber` | string
`totalExcludingVat` | number
`totalIncludingVat` | number
`totalVatAmount` | number
`globalDiscount` | number
`grandTotal` | number
`name` | string
`address1` | string
`address2` | string
`address3` | string
`address4` | string
`postcode` | string
`isDraft` | boolean
`isCredit` | boolean
`creditReason` | string
`invoiceLineExist` | boolean
`credits` | [Array&lt;JobLogicMicroserviceCoreContractInvoiceSearchCreditItemResponse&gt;](JobLogicMicroserviceCoreContractInvoiceSearchCreditItemResponse.md)
`axaAuthorisationCode` | string
`axaRef` | string
`isSuspended` | boolean
`isFrozen` | boolean
`paymentDueDate` | Date
`tags` | string
`batchInvoiceNumber` | string
`batchInvoiceId` | number
`emailStatus` | [JobLogicMicroserviceCoreContractInvoiceEmailStatus](JobLogicMicroserviceCoreContractInvoiceEmailStatus.md)
`invoiceLines` | [Array&lt;JobLogicMicroserviceCoreContractInvoiceLineResponse&gt;](JobLogicMicroserviceCoreContractInvoiceLineResponse.md)
`customerAccountNumber` | string
`siteAddress1` | string
`siteAddress2` | string
`siteAddress3` | string
`siteAddress4` | string
`sitePostCode` | string
`seqId` | number

## Example

```typescript
import type { JobLogicMicroserviceCoreContractInvoiceSearchItemResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "id": null,
  "uniqueId": null,
  "invoiceNumber": null,
  "customerId": null,
  "customerName": null,
  "siteId": null,
  "siteName": null,
  "jobId": null,
  "pPMContractId": null,
  "hireContractId": null,
  "jobNumber": null,
  "dateRaised": null,
  "description": null,
  "jobDescription": null,
  "orderNumber": null,
  "accountNumber": null,
  "totalExcludingVat": null,
  "totalIncludingVat": null,
  "totalVatAmount": null,
  "globalDiscount": null,
  "grandTotal": null,
  "name": null,
  "address1": null,
  "address2": null,
  "address3": null,
  "address4": null,
  "postcode": null,
  "isDraft": null,
  "isCredit": null,
  "creditReason": null,
  "invoiceLineExist": null,
  "credits": null,
  "axaAuthorisationCode": null,
  "axaRef": null,
  "isSuspended": null,
  "isFrozen": null,
  "paymentDueDate": null,
  "tags": null,
  "batchInvoiceNumber": null,
  "batchInvoiceId": null,
  "emailStatus": null,
  "invoiceLines": null,
  "customerAccountNumber": null,
  "siteAddress1": null,
  "siteAddress2": null,
  "siteAddress3": null,
  "siteAddress4": null,
  "sitePostCode": null,
  "seqId": null,
} satisfies JobLogicMicroserviceCoreContractInvoiceSearchItemResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JobLogicMicroserviceCoreContractInvoiceSearchItemResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


