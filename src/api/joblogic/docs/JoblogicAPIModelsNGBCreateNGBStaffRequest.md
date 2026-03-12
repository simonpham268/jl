
# JoblogicAPIModelsNGBCreateNGBStaffRequest

Create NGB Staff Request model

## Properties

Name | Type
------------ | -------------
`tenantId` | string
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
`userType` | [JoblogicAPIModelsNGBUserType](JoblogicAPIModelsNGBUserType.md)
`isEngineer` | boolean
`latitude` | number
`longitude` | number
`tagIds` | Array&lt;string&gt;
`role` | [JoblogicAPIModelsNGBAssignRolesModel](JoblogicAPIModelsNGBAssignRolesModel.md)
`notes` | [Array&lt;JoblogicAPIModelsNGBNoteItem&gt;](JoblogicAPIModelsNGBNoteItem.md)
`engineerDetail` | [JoblogicAPIModelsNGBNGBEngineerDetailRequest](JoblogicAPIModelsNGBNGBEngineerDetailRequest.md)

## Example

```typescript
import type { JoblogicAPIModelsNGBCreateNGBStaffRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "tenantId": null,
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
  "userType": null,
  "isEngineer": null,
  "latitude": null,
  "longitude": null,
  "tagIds": null,
  "role": null,
  "notes": null,
  "engineerDetail": null,
} satisfies JoblogicAPIModelsNGBCreateNGBStaffRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsNGBCreateNGBStaffRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


