
# JoblogicAPIModelsStaffApprovalLimitResponse


## Properties

Name | Type
------------ | -------------
`isNoPOApprovalLimit` | boolean
`pOApprovalLimitAmount` | number
`isNoSubcontractorPOApprovalLimit` | boolean
`subcontractorPOApprovalLimitAmount` | number

## Example

```typescript
import type { JoblogicAPIModelsStaffApprovalLimitResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "isNoPOApprovalLimit": null,
  "pOApprovalLimitAmount": null,
  "isNoSubcontractorPOApprovalLimit": null,
  "subcontractorPOApprovalLimitAmount": null,
} satisfies JoblogicAPIModelsStaffApprovalLimitResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsStaffApprovalLimitResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


