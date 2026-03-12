
# JoblogicAPIModelsStaffGetDetailResponse


## Properties

Name | Type
------------ | -------------
`uniqueId` | string
`name` | string
`address1` | string
`address2` | string
`address3` | string
`address4` | string
`postcode` | string
`emailAddress` | string
`telephone` | string
`mobile` | string
`active` | boolean
`staffType` | number
`roles` | [Array&lt;JoblogicAPIModelsStaffRoleModel&gt;](JoblogicAPIModelsStaffRoleModel.md)
`tags` | [Array&lt;JoblogicAPIModelsTagModel&gt;](JoblogicAPIModelsTagModel.md)

## Example

```typescript
import type { JoblogicAPIModelsStaffGetDetailResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "uniqueId": null,
  "name": null,
  "address1": null,
  "address2": null,
  "address3": null,
  "address4": null,
  "postcode": null,
  "emailAddress": null,
  "telephone": null,
  "mobile": null,
  "active": null,
  "staffType": null,
  "roles": null,
  "tags": null,
} satisfies JoblogicAPIModelsStaffGetDetailResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsStaffGetDetailResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


