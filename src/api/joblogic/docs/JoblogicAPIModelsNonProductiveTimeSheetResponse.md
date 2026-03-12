
# JoblogicAPIModelsNonProductiveTimeSheetResponse


## Properties

Name | Type
------------ | -------------
`id` | string
`engineerId` | number
`engineerName` | string
`startDate` | Date
`endDate` | Date
`nonProductiveTypeId` | string
`isDeductible` | boolean
`startTime` | [JobLogicMicroserviceCoreContractNonProductiveTimeStart](JobLogicMicroserviceCoreContractNonProductiveTimeStart.md)
`endTime` | [JobLogicMicroserviceCoreContractNonProductiveTimeEnd](JobLogicMicroserviceCoreContractNonProductiveTimeEnd.md)
`reason` | string

## Example

```typescript
import type { JoblogicAPIModelsNonProductiveTimeSheetResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "engineerId": null,
  "engineerName": null,
  "startDate": null,
  "endDate": null,
  "nonProductiveTypeId": null,
  "isDeductible": null,
  "startTime": null,
  "endTime": null,
  "reason": null,
} satisfies JoblogicAPIModelsNonProductiveTimeSheetResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsNonProductiveTimeSheetResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


