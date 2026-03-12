
# JobLogicMicroserviceCoreContractGetContractPurchaseOrderDetailByIdMsgContractPurchaseOrderInvoiceModel


## Properties

Name | Type
------------ | -------------
`id` | string
`purchaseOrderId` | string
`invoiceNumber` | string
`reference` | string
`isFinalInvoice` | boolean
`createdAt` | Date
`azureBlobReference` | string
`date` | Date
`type` | [JobLogicMicroserviceCoreContractContractPurchaseOrderInvoiceType](JobLogicMicroserviceCoreContractContractPurchaseOrderInvoiceType.md)
`invoiceLines` | [Array&lt;JobLogicMicroserviceCoreContractGetContractPurchaseOrderDetailByIdMsg ContractPurchaseOrderInvoiceLineModel&gt;](JobLogicMicroserviceCoreContractGetContractPurchaseOrderDetailByIdMsg ContractPurchaseOrderInvoiceLineModel.md)

## Example

```typescript
import type { JobLogicMicroserviceCoreContractGetContractPurchaseOrderDetailByIdMsgContractPurchaseOrderInvoiceModel } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "purchaseOrderId": null,
  "invoiceNumber": null,
  "reference": null,
  "isFinalInvoice": null,
  "createdAt": null,
  "azureBlobReference": null,
  "date": null,
  "type": null,
  "invoiceLines": null,
} satisfies JobLogicMicroserviceCoreContractGetContractPurchaseOrderDetailByIdMsgContractPurchaseOrderInvoiceModel

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JobLogicMicroserviceCoreContractGetContractPurchaseOrderDetailByIdMsgContractPurchaseOrderInvoiceModel
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


