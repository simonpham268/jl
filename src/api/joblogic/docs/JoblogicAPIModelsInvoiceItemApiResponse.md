
# JoblogicAPIModelsInvoiceItemApiResponse


## Properties

Name | Type
------------ | -------------
`id` | number
`uniqueId` | string
`invoiceNumber` | string
`dateRaised` | Date
`isDraft` | boolean
`customerId` | number
`siteId` | number
`jobId` | number
`addressType` | [JobLogicMicroserviceCoreContractInvoiceAddressTypeOption](JobLogicMicroserviceCoreContractInvoiceAddressTypeOption.md)
`name` | string
`address` | string
`postcode` | string
`orderNumber` | string
`accountNumber` | string
`headerId` | number
`headerDescription` | string
`header` | string
`terms` | string
`notes` | string
`paymentDue` | Date
`wasVATRegistered` | boolean
`approveType` | [JobLogicMicroserviceCoreContractApproveType](JobLogicMicroserviceCoreContractApproveType.md)
`tags` | Array&lt;string&gt;
`lines` | [Array&lt;JoblogicAPIModelsInvoiceLineItemApiResponse&gt;](JoblogicAPIModelsInvoiceLineItemApiResponse.md)
`raisedById` | number
`raisedByUniqueId` | string
`raisedByName` | string
`isSORInvoice` | boolean
`batchStringId` | string
`batchAutoId` | number

## Example

```typescript
import type { JoblogicAPIModelsInvoiceItemApiResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "uniqueId": null,
  "invoiceNumber": null,
  "dateRaised": null,
  "isDraft": null,
  "customerId": null,
  "siteId": null,
  "jobId": null,
  "addressType": null,
  "name": null,
  "address": null,
  "postcode": null,
  "orderNumber": null,
  "accountNumber": null,
  "headerId": null,
  "headerDescription": null,
  "header": null,
  "terms": null,
  "notes": null,
  "paymentDue": null,
  "wasVATRegistered": null,
  "approveType": null,
  "tags": null,
  "lines": null,
  "raisedById": null,
  "raisedByUniqueId": null,
  "raisedByName": null,
  "isSORInvoice": null,
  "batchStringId": null,
  "batchAutoId": null,
} satisfies JoblogicAPIModelsInvoiceItemApiResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsInvoiceItemApiResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


