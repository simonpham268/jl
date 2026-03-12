
# JoblogicAPIModelsResponsePPMContractItemModel


## Properties

Name | Type
------------ | -------------
`uniqueId` | string
`pPMContractNumber` | string
`customerOrderNumber` | string
`planReference` | string
`customerId` | number
`customerName` | string
`siteId` | number
`siteName` | string
`area` | string
`startDate` | Date
`endDate` | Date
`description` | string
`totalNumberOfVisits` | number
`numberOfCompletedVisits` | number
`percentageCompleted` | number
`percentageCompletedWithSign` | string
`isCancelled` | boolean
`isSuspended` | boolean
`jobCategory` | string
`accountManagerId` | number
`accountManager` | string
`customerContractId` | number
`customerContractNumber` | string
`sourceContractId` | string

## Example

```typescript
import type { JoblogicAPIModelsResponsePPMContractItemModel } from ''

// TODO: Update the object below with actual values
const example = {
  "uniqueId": null,
  "pPMContractNumber": null,
  "customerOrderNumber": null,
  "planReference": null,
  "customerId": null,
  "customerName": null,
  "siteId": null,
  "siteName": null,
  "area": null,
  "startDate": null,
  "endDate": null,
  "description": null,
  "totalNumberOfVisits": null,
  "numberOfCompletedVisits": null,
  "percentageCompleted": null,
  "percentageCompletedWithSign": null,
  "isCancelled": null,
  "isSuspended": null,
  "jobCategory": null,
  "accountManagerId": null,
  "accountManager": null,
  "customerContractId": null,
  "customerContractNumber": null,
  "sourceContractId": null,
} satisfies JoblogicAPIModelsResponsePPMContractItemModel

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsResponsePPMContractItemModel
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


