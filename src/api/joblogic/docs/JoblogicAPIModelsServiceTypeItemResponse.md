
# JoblogicAPIModelsServiceTypeItemResponse


## Properties

Name | Type
------------ | -------------
`uniqueId` | string
`title` | string
`description` | string
`assetClassDescription` | string
`serviceTypeLineCount` | number
`totalDuration` | number
`serviceTypeLineSummary` | string
`assetClassId` | number
`isMandatory` | boolean
`serviceTypeCode` | string
`serviceTypeVersion` | string

## Example

```typescript
import type { JoblogicAPIModelsServiceTypeItemResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "uniqueId": null,
  "title": null,
  "description": null,
  "assetClassDescription": null,
  "serviceTypeLineCount": null,
  "totalDuration": null,
  "serviceTypeLineSummary": null,
  "assetClassId": null,
  "isMandatory": null,
  "serviceTypeCode": null,
  "serviceTypeVersion": null,
} satisfies JoblogicAPIModelsServiceTypeItemResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsServiceTypeItemResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


