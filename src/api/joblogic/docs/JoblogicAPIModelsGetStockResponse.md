
# JoblogicAPIModelsGetStockResponse


## Properties

Name | Type
------------ | -------------
`intId` | number
`stockType` | [JobLogicMicroserviceCoreContractStockRecordType](JobLogicMicroserviceCoreContractStockRecordType.md)
`numberId` | number
`number` | string
`reference` | string
`description` | string
`category` | string
`libraryName` | string
`make` | string
`model` | string
`quantity` | number
`unitOfMeasure` | string
`pricePerUnit` | number
`sellPerUnit` | number
`taxCodeId` | string
`taxCodeDescription` | string
`taxCodeValue` | number
`refrigerantTypeEnabled` | boolean
`refrigerantCharge` | number
`refrigerantTypeId` | string
`isActive` | boolean

## Example

```typescript
import type { JoblogicAPIModelsGetStockResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "intId": null,
  "stockType": null,
  "numberId": null,
  "number": null,
  "reference": null,
  "description": null,
  "category": null,
  "libraryName": null,
  "make": null,
  "model": null,
  "quantity": null,
  "unitOfMeasure": null,
  "pricePerUnit": null,
  "sellPerUnit": null,
  "taxCodeId": null,
  "taxCodeDescription": null,
  "taxCodeValue": null,
  "refrigerantTypeEnabled": null,
  "refrigerantCharge": null,
  "refrigerantTypeId": null,
  "isActive": null,
} satisfies JoblogicAPIModelsGetStockResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsGetStockResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


