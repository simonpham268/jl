
# JoblogicAPIModelsCreateExpenseJobCostRequest


## Properties

Name | Type
------------ | -------------
`quantity` | number
`engineerId` | number
`expenseId` | number
`jobExpenseId` | number
`jobId` | number
`description` | string
`dateIncurred` | Date
`costPerUnit` | number
`sellPerUnit` | number
`isChargeable` | boolean
`priceCalculationType` | [JobLogicMicroserviceCoreContractPriceCalculationType](JobLogicMicroserviceCoreContractPriceCalculationType.md)
`taxCodeId` | string
`userId` | string
`tagIds` | Array&lt;string&gt;
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsCreateExpenseJobCostRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "quantity": null,
  "engineerId": null,
  "expenseId": null,
  "jobExpenseId": null,
  "jobId": null,
  "description": null,
  "dateIncurred": null,
  "costPerUnit": null,
  "sellPerUnit": null,
  "isChargeable": null,
  "priceCalculationType": null,
  "taxCodeId": null,
  "userId": null,
  "tagIds": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsCreateExpenseJobCostRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCreateExpenseJobCostRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


