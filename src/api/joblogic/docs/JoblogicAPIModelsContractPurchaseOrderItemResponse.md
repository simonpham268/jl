
# JoblogicAPIModelsContractPurchaseOrderItemResponse


## Properties

Name | Type
------------ | -------------
`id` | string
`pONumber` | string
`pPMContractId` | string
`pPMContractNumber` | string
`subContractorName` | string
`subContractorId` | string
`accountNumber` | string
`status` | [JobLogicMicroserviceCoreContractEnumsContractPurchaseOrderStatus](JobLogicMicroserviceCoreContractEnumsContractPurchaseOrderStatus.md)
`completionStatus` | [JobLogicMicroserviceCoreContractEnumsContractPurchaseOrderCompletionStatus](JobLogicMicroserviceCoreContractEnumsContractPurchaseOrderCompletionStatus.md)
`invoiceStatus` | [JobLogicMicroserviceCoreContractInvoiceStatus](JobLogicMicroserviceCoreContractInvoiceStatus.md)
`totalExcludingVat` | number
`totalIncludingVat` | number
`totalInvoicedExcludingVat` | number
`totalInvoicedIncludingVAT` | number
`dateRaised` | Date
`estimationCompletionDate` | Date
`actualCompletionDate` | Date
`endDate` | Date
`startDate` | Date
`customReference` | string
`raisedByUserName` | string
`ownerName` | string
`tagsJson` | string

## Example

```typescript
import type { JoblogicAPIModelsContractPurchaseOrderItemResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "pONumber": null,
  "pPMContractId": null,
  "pPMContractNumber": null,
  "subContractorName": null,
  "subContractorId": null,
  "accountNumber": null,
  "status": null,
  "completionStatus": null,
  "invoiceStatus": null,
  "totalExcludingVat": null,
  "totalIncludingVat": null,
  "totalInvoicedExcludingVat": null,
  "totalInvoicedIncludingVAT": null,
  "dateRaised": null,
  "estimationCompletionDate": null,
  "actualCompletionDate": null,
  "endDate": null,
  "startDate": null,
  "customReference": null,
  "raisedByUserName": null,
  "ownerName": null,
  "tagsJson": null,
} satisfies JoblogicAPIModelsContractPurchaseOrderItemResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsContractPurchaseOrderItemResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


