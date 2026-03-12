
# JobLogicMicroserviceCoreContractVisitExpenseResponse


## Properties

Name | Type
------------ | -------------
`uniqueId` | string
`id` | number
`visitId` | number
`description` | string
`quantity` | number
`costPerUnit` | number
`hasBeenCosted` | boolean
`dateAdded` | Date
`expenseId` | number
`expenseDescription` | string

## Example

```typescript
import type { JobLogicMicroserviceCoreContractVisitExpenseResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "uniqueId": null,
  "id": null,
  "visitId": null,
  "description": null,
  "quantity": null,
  "costPerUnit": null,
  "hasBeenCosted": null,
  "dateAdded": null,
  "expenseId": null,
  "expenseDescription": null,
} satisfies JobLogicMicroserviceCoreContractVisitExpenseResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JobLogicMicroserviceCoreContractVisitExpenseResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


