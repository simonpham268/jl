
# JoblogicAPIModelsUpdateCustomerContractRequest


## Properties

Name | Type
------------ | -------------
`id` | number
`contractDescription` | string
`contractNumber` | string
`subDivision` | string
`startDateUTC` | Date
`endDateUTC` | Date
`reviewDateUTC` | Date
`customerOrderNumber` | string
`assignType` | [JobLogicMicroserviceContractLayerContractAssignedType](JobLogicMicroserviceContractLayerContractAssignedType.md)
`assignedUserOrUserGroupIds` | string
`isOrderNumberMandatory` | boolean
`roundingOption` | [JobLogicMicroserviceContractLayerContractRoundingType](JobLogicMicroserviceContractLayerContractRoundingType.md)
`roundingDuration` | number
`sellingRateId` | number
`accountNumber` | string
`vATNumber` | string
`referenceNumber` | string
`groupPriorityId` | number
`priorityId` | string
`faultCodeLibraryAutoId` | number
`impactJobPriority` | boolean
`comprehensiveContract` | [JobLogicMicroserviceContractLayerContractComprehensiveContractViewModel](JobLogicMicroserviceContractLayerContractComprehensiveContractViewModel.md)
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsUpdateCustomerContractRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "contractDescription": null,
  "contractNumber": null,
  "subDivision": null,
  "startDateUTC": null,
  "endDateUTC": null,
  "reviewDateUTC": null,
  "customerOrderNumber": null,
  "assignType": null,
  "assignedUserOrUserGroupIds": null,
  "isOrderNumberMandatory": null,
  "roundingOption": null,
  "roundingDuration": null,
  "sellingRateId": null,
  "accountNumber": null,
  "vATNumber": null,
  "referenceNumber": null,
  "groupPriorityId": null,
  "priorityId": null,
  "faultCodeLibraryAutoId": null,
  "impactJobPriority": null,
  "comprehensiveContract": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsUpdateCustomerContractRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsUpdateCustomerContractRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


