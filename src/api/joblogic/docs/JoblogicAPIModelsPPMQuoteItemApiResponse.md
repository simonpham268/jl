
# JoblogicAPIModelsPPMQuoteItemApiResponse


## Properties

Name | Type
------------ | -------------
`uniqueId` | string
`pPMQuoteNumber` | string
`planReference` | string
`customerId` | number
`customerName` | string
`siteId` | number
`siteName` | string
`description` | string
`startDate` | Date
`endDate` | Date
`createdAt` | Date
`invoiceContractValue` | number
`invoiceFrequency` | [JobLogicMicroserviceCoreContractPPMContractFrequency](JobLogicMicroserviceCoreContractPPMContractFrequency.md)
`status` | [JobLogicMicroserviceCoreContractPPMQuoteStatus](JobLogicMicroserviceCoreContractPPMQuoteStatus.md)
`tags` | string
`accountManagerId` | number
`accountManager` | string
`customerContractId` | number
`customerContractNumber` | string

## Example

```typescript
import type { JoblogicAPIModelsPPMQuoteItemApiResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "uniqueId": null,
  "pPMQuoteNumber": null,
  "planReference": null,
  "customerId": null,
  "customerName": null,
  "siteId": null,
  "siteName": null,
  "description": null,
  "startDate": null,
  "endDate": null,
  "createdAt": null,
  "invoiceContractValue": null,
  "invoiceFrequency": null,
  "status": null,
  "tags": null,
  "accountManagerId": null,
  "accountManager": null,
  "customerContractId": null,
  "customerContractNumber": null,
} satisfies JoblogicAPIModelsPPMQuoteItemApiResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsPPMQuoteItemApiResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


