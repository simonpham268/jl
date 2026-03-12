
# JoblogicAPIModelsNGBNGBStaffCreateResponse

NGB Staff Create Response model

## Properties

Name | Type
------------ | -------------
`staffId` | string
`userId` | number
`isEngineer` | boolean
`engineerId` | number
`engineerStringId` | string
`name` | string
`emailAddress` | string
`invitationId` | string

## Example

```typescript
import type { JoblogicAPIModelsNGBNGBStaffCreateResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "staffId": null,
  "userId": null,
  "isEngineer": null,
  "engineerId": null,
  "engineerStringId": null,
  "name": null,
  "emailAddress": null,
  "invitationId": null,
} satisfies JoblogicAPIModelsNGBNGBStaffCreateResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsNGBNGBStaffCreateResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


