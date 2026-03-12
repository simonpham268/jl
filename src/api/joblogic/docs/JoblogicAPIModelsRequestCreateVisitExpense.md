
# JoblogicAPIModelsRequestCreateVisitExpense


## Properties

Name | Type
------------ | -------------
`visitId` | number
`dateAdded` | Date
`expenseId` | number
`description` | string
`quantity` | number
`costPerUnit` | number
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsRequestCreateVisitExpense } from ''

// TODO: Update the object below with actual values
const example = {
  "visitId": null,
  "dateAdded": null,
  "expenseId": null,
  "description": null,
  "quantity": null,
  "costPerUnit": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsRequestCreateVisitExpense

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsRequestCreateVisitExpense
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


