
# JoblogicAPIModelsNGBUpdateNGBStaffRequest


## Properties

Name | Type
------------ | -------------
`tenantId` | string
`userId` | string
`name` | string
`address1` | string
`address2` | string
`address3` | string
`address4` | string
`postcode` | string
`reference` | string
`emailAddress` | string
`telephone` | string
`mobile` | string
`other` | string
`hasWebAccess` | boolean
`isEngineer` | boolean
`hasMobileAccess` | boolean
`isNonLoginUser` | boolean
`tagIds` | Array&lt;string&gt;
`role` | [JoblogicAPIModelsNGBAssignRolesModel](JoblogicAPIModelsNGBAssignRolesModel.md)
`notes` | [Array&lt;JoblogicAPIModelsNGBNoteItem&gt;](JoblogicAPIModelsNGBNoteItem.md)
`engineerDetail` | [JoblogicAPIModelsNGBNGBEngineerDetailRequest](JoblogicAPIModelsNGBNGBEngineerDetailRequest.md)

## Example

```typescript
import type { JoblogicAPIModelsNGBUpdateNGBStaffRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "tenantId": null,
  "userId": null,
  "name": null,
  "address1": null,
  "address2": null,
  "address3": null,
  "address4": null,
  "postcode": null,
  "reference": null,
  "emailAddress": null,
  "telephone": null,
  "mobile": null,
  "other": null,
  "hasWebAccess": null,
  "isEngineer": null,
  "hasMobileAccess": null,
  "isNonLoginUser": null,
  "tagIds": null,
  "role": null,
  "notes": null,
  "engineerDetail": null,
} satisfies JoblogicAPIModelsNGBUpdateNGBStaffRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsNGBUpdateNGBStaffRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


