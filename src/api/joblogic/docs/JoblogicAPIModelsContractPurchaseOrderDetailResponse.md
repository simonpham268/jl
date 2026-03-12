
# JoblogicAPIModelsContractPurchaseOrderDetailResponse


## Properties

Name | Type
------------ | -------------
`id` | string
`pONumber` | string
`pPMContractId` | string
`status` | [JobLogicMicroserviceCoreContractEnumsContractPurchaseOrderStatus](JobLogicMicroserviceCoreContractEnumsContractPurchaseOrderStatus.md)
`subContractorName` | string
`ownerId` | number
`ownerName` | string
`accountNumber` | string
`pPMContractNumber` | string
`isPPMSuspended` | boolean
`hasFinalInvoice` | boolean
`subContractorId` | string
`estimatedCompletionDate` | Date
`actualCompletionDate` | Date
`startDate` | Date
`endDate` | Date
`deliveryName` | string
`deliveryAddress1` | string
`deliveryAddress2` | string
`deliveryAddress3` | string
`deliveryAddress4` | string
`deliveryPostcode` | string
`deliveryTelephone` | string
`assignContactName` | string
`assignContactEmail` | string
`assignContactTelephone` | string
`assignContactId` | string
`invoiceStatus` | [JobLogicMicroserviceCoreContractInvoiceStatus](JobLogicMicroserviceCoreContractInvoiceStatus.md)
`additionalInstructions` | string
`dateRaised` | Date
`raisedBy` | number
`raisedByUserName` | string
`resolvedByUserId` | number
`resolvedByUserName` | string
`resolvedReason` | string
`customReference` | string
`lines` | [Array&lt;JobLogicMicroserviceCoreContractGetContractPurchaseOrderDetailByIdMsg ContractPurchaseOrderLineModel&gt;](JobLogicMicroserviceCoreContractGetContractPurchaseOrderDetailByIdMsg ContractPurchaseOrderLineModel.md)
`invoices` | [Array&lt;JobLogicMicroserviceCoreContractGetContractPurchaseOrderDetailByIdMsg ContractPurchaseOrderInvoiceModel&gt;](JobLogicMicroserviceCoreContractGetContractPurchaseOrderDetailByIdMsg ContractPurchaseOrderInvoiceModel.md)
`resolvedPurchaseOrder` | [Array&lt;JobLogicMicroserviceCoreContractGetContractPurchaseOrderDetailByIdMsg ContractPurchaseOrderResolvedModel&gt;](JobLogicMicroserviceCoreContractGetContractPurchaseOrderDetailByIdMsg ContractPurchaseOrderResolvedModel.md)
`tagIds` | Array&lt;string&gt;
`tags` | [Array&lt;JobLogicMicroserviceCoreContractTagItemResponse&gt;](JobLogicMicroserviceCoreContractTagItemResponse.md)
`subContractorContactId` | number
`subContractorContact` | [JobLogicMicroserviceCoreContractSubContractorContactModel](JobLogicMicroserviceCoreContractSubContractorContactModel.md)
`discrepancyExcludingVAT` | number
`discrepancyOfVAT` | number
`discrepancyIncludingVAT` | number
`adjustmentTotalExcludingVAT` | number
`completionStatus` | [JobLogicMicroserviceCoreContractEnumsContractPurchaseOrderCompletionStatus](JobLogicMicroserviceCoreContractEnumsContractPurchaseOrderCompletionStatus.md)
`dateApproved` | Date
`approvedBy` | number
`approvedByUserName` | string
`purchaseOrderUrl` | string
`totalVatAmount` | number
`totalDiscountAmount` | number
`totalExcludingVat` | number
`totalExcludingVatIncludingDiscount` | number
`totalIncludingVat` | number
`totalInvoicedAmount` | number
`totalInvoicedExcludingVat` | number
`totalCreditedAmount` | number
`totalInvoicedMinusTotalCreditedAmount` | number
`totalResolvedIncludingVAT` | number

## Example

```typescript
import type { JoblogicAPIModelsContractPurchaseOrderDetailResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "pONumber": null,
  "pPMContractId": null,
  "status": null,
  "subContractorName": null,
  "ownerId": null,
  "ownerName": null,
  "accountNumber": null,
  "pPMContractNumber": null,
  "isPPMSuspended": null,
  "hasFinalInvoice": null,
  "subContractorId": null,
  "estimatedCompletionDate": null,
  "actualCompletionDate": null,
  "startDate": null,
  "endDate": null,
  "deliveryName": null,
  "deliveryAddress1": null,
  "deliveryAddress2": null,
  "deliveryAddress3": null,
  "deliveryAddress4": null,
  "deliveryPostcode": null,
  "deliveryTelephone": null,
  "assignContactName": null,
  "assignContactEmail": null,
  "assignContactTelephone": null,
  "assignContactId": null,
  "invoiceStatus": null,
  "additionalInstructions": null,
  "dateRaised": null,
  "raisedBy": null,
  "raisedByUserName": null,
  "resolvedByUserId": null,
  "resolvedByUserName": null,
  "resolvedReason": null,
  "customReference": null,
  "lines": null,
  "invoices": null,
  "resolvedPurchaseOrder": null,
  "tagIds": null,
  "tags": null,
  "subContractorContactId": null,
  "subContractorContact": null,
  "discrepancyExcludingVAT": null,
  "discrepancyOfVAT": null,
  "discrepancyIncludingVAT": null,
  "adjustmentTotalExcludingVAT": null,
  "completionStatus": null,
  "dateApproved": null,
  "approvedBy": null,
  "approvedByUserName": null,
  "purchaseOrderUrl": null,
  "totalVatAmount": null,
  "totalDiscountAmount": null,
  "totalExcludingVat": null,
  "totalExcludingVatIncludingDiscount": null,
  "totalIncludingVat": null,
  "totalInvoicedAmount": null,
  "totalInvoicedExcludingVat": null,
  "totalCreditedAmount": null,
  "totalInvoicedMinusTotalCreditedAmount": null,
  "totalResolvedIncludingVAT": null,
} satisfies JoblogicAPIModelsContractPurchaseOrderDetailResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsContractPurchaseOrderDetailResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


