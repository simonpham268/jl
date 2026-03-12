
# JoblogicAPIModelsGetNGBPPMInvoiceItemResponse


## Properties

Name | Type
------------ | -------------
`pPMInvoiceId` | string
`autoId` | number
`pPMContractId` | string
`pPMContractNumber` | string
`customerId` | number
`customerName` | string
`siteId` | number
`siteName` | string
`tags` | [Array&lt;JoblogicAPIModelsTagItemDetail&gt;](JoblogicAPIModelsTagItemDetail.md)
`dateRaise` | Date
`paymentDueDate` | Date
`accountNumber` | string
`orderNumber` | string
`lines` | [Array&lt;JoblogicAPIModelsGetPPMInvoiceLineDetail&gt;](JoblogicAPIModelsGetPPMInvoiceLineDetail.md)

## Example

```typescript
import type { JoblogicAPIModelsGetNGBPPMInvoiceItemResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "pPMInvoiceId": null,
  "autoId": null,
  "pPMContractId": null,
  "pPMContractNumber": null,
  "customerId": null,
  "customerName": null,
  "siteId": null,
  "siteName": null,
  "tags": null,
  "dateRaise": null,
  "paymentDueDate": null,
  "accountNumber": null,
  "orderNumber": null,
  "lines": null,
} satisfies JoblogicAPIModelsGetNGBPPMInvoiceItemResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsGetNGBPPMInvoiceItemResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


