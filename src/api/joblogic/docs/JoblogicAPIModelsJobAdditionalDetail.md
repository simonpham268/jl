
# JoblogicAPIModelsJobAdditionalDetail


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
`secondaryTradeIds` | Array&lt;string&gt;

## Example

```typescript
import type { JoblogicAPIModelsJobAdditionalDetail } from ''

// TODO: Update the object below with actual values
const example = {
  "trade": null,
  "ownerUserId": null,
  "nextContactDate": null,
  "isRequireApproval": null,
  "quotedValue": null,
  "jobRef1": null,
  "jobRef2": null,
  "secondaryTradeIds": null,
} satisfies JoblogicAPIModelsJobAdditionalDetail

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsJobAdditionalDetail
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


