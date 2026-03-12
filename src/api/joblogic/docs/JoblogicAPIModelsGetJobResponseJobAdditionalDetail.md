
# JoblogicAPIModelsGetJobResponseJobAdditionalDetail


## Properties

Name | Type
------------ | -------------
`trade` | string
`ownerUserId` | number
`nextContactDate` | Date
`isRequireApproval` | boolean
`quotedValue` | number
`jobRef1` | string
`jobRef2` | string
`secondaryTrades` | [Array&lt;JobLogicMicroserviceCoreContractTradeItemModel&gt;](JobLogicMicroserviceCoreContractTradeItemModel.md)

## Example

```typescript
import type { JoblogicAPIModelsGetJobResponseJobAdditionalDetail } from ''

// TODO: Update the object below with actual values
const example = {
  "trade": null,
  "ownerUserId": null,
  "nextContactDate": null,
  "isRequireApproval": null,
  "quotedValue": null,
  "jobRef1": null,
  "jobRef2": null,
  "secondaryTrades": null,
} satisfies JoblogicAPIModelsGetJobResponseJobAdditionalDetail

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsGetJobResponseJobAdditionalDetail
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


