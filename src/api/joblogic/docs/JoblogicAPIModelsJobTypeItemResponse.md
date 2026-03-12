
# JoblogicAPIModelsJobTypeItemResponse


## Properties

Name | Type
------------ | -------------
`uniqueId` | string
`id` | number
`description` | string
`defaultServiceDuration` | number
`isDefault` | boolean
`isRequireApproval` | boolean
`isSubcontractorType` | boolean
`prefix` | string
`nextNumber` | string
`nextNumberQueued` | string

## Example

```typescript
import type { JoblogicAPIModelsJobTypeItemResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "uniqueId": null,
  "id": null,
  "description": null,
  "defaultServiceDuration": null,
  "isDefault": null,
  "isRequireApproval": null,
  "isSubcontractorType": null,
  "prefix": null,
  "nextNumber": null,
  "nextNumberQueued": null,
} satisfies JoblogicAPIModelsJobTypeItemResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsJobTypeItemResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


