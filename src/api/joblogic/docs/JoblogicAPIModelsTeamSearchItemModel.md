
# JoblogicAPIModelsTeamSearchItemModel


## Properties

Name | Type
------------ | -------------
`teamName` | string
`teamId` | number
`_class` | string
`inActive` | boolean
`trades` | Array&lt;string&gt;
`areas` | Array&lt;string&gt;
`numbOfTeamMember` | number
`leaderId` | number

## Example

```typescript
import type { JoblogicAPIModelsTeamSearchItemModel } from ''

// TODO: Update the object below with actual values
const example = {
  "teamName": null,
  "teamId": null,
  "_class": null,
  "inActive": null,
  "trades": null,
  "areas": null,
  "numbOfTeamMember": null,
  "leaderId": null,
} satisfies JoblogicAPIModelsTeamSearchItemModel

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsTeamSearchItemModel
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


