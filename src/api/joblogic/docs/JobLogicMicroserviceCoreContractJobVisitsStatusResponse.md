
# JobLogicMicroserviceCoreContractJobVisitsStatusResponse


## Properties

Name | Type
------------ | -------------
`id` | [JobLogicMicroserviceCoreContractVisitStatusOption](JobLogicMicroserviceCoreContractVisitStatusOption.md)
`statusDescription` | string
`engineerId` | number
`engineerName` | string
`engineerTeamId` | number
`engineerTeamName` | string
`startDate` | Date
`visitId` | number
`endDate` | Date

## Example

```typescript
import type { JobLogicMicroserviceCoreContractJobVisitsStatusResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "statusDescription": null,
  "engineerId": null,
  "engineerName": null,
  "engineerTeamId": null,
  "engineerTeamName": null,
  "startDate": null,
  "visitId": null,
  "endDate": null,
} satisfies JobLogicMicroserviceCoreContractJobVisitsStatusResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JobLogicMicroserviceCoreContractJobVisitsStatusResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


