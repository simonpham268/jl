
# JoblogicAPIModelsCreateCustomerContractRequest


## Properties

Name | Type
------------ | -------------
`startDateUTC` | Date
`endDateUTC` | Date
`reviewDateUTC` | Date
`customerId` | number
`customerOrderNumber` | string
`contractDescription` | string
`contractNumber` | string
`subDivision` | string
`assignType` | [JobLogicMicroserviceContractLayerContractAssignedType](JobLogicMicroserviceContractLayerContractAssignedType.md)
`assignedUserOrUserGroupIds` | string
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsCreateCustomerContractRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "startDateUTC": null,
  "endDateUTC": null,
  "reviewDateUTC": null,
  "customerId": null,
  "customerOrderNumber": null,
  "contractDescription": null,
  "contractNumber": null,
  "subDivision": null,
  "assignType": null,
  "assignedUserOrUserGroupIds": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsCreateCustomerContractRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCreateCustomerContractRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


