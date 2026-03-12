
# JoblogicAPIModelsActivity


## Properties

Name | Type
------------ | -------------
`attributeValue` | string
`userIdentity` | string
`emailAddress` | string
`type` | string
`effort` | [JoblogicAPIModelsEffort](JoblogicAPIModelsEffort.md)
`start` | [JoblogicAPIModelsPlanned](JoblogicAPIModelsPlanned.md)
`end` | [JoblogicAPIModelsPlanned](JoblogicAPIModelsPlanned.md)

## Example

```typescript
import type { JoblogicAPIModelsActivity } from ''

// TODO: Update the object below with actual values
const example = {
  "attributeValue": null,
  "userIdentity": null,
  "emailAddress": null,
  "type": null,
  "effort": null,
  "start": null,
  "end": null,
} satisfies JoblogicAPIModelsActivity

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsActivity
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


