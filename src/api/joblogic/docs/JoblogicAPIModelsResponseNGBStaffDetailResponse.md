
# JoblogicAPIModelsResponseNGBStaffDetailResponse


## Properties

Name | Type
------------ | -------------
`engineerDetail` | [JoblogicAPIModelsResponseStaffEngineerDetailResponse](JoblogicAPIModelsResponseStaffEngineerDetailResponse.md)
`misc` | [JoblogicAPIModelsResponseStaffMiscResponse](JoblogicAPIModelsResponseStaffMiscResponse.md)
`userRoles` | [Array&lt;JoblogicAPIModelsResponseStaffRoleDetailResponse&gt;](JoblogicAPIModelsResponseStaffRoleDetailResponse.md)
`tags` | [Array&lt;JoblogicAPIModelsResponseStaffTagResponse&gt;](JoblogicAPIModelsResponseStaffTagResponse.md)
`payBands` | [Array&lt;JoblogicAPIModelsResponseStaffPayBandResponse&gt;](JoblogicAPIModelsResponseStaffPayBandResponse.md)
`intId` | number
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
`reference` | string
`other` | string
`active` | boolean
`staffType` | number

## Example

```typescript
import type { JoblogicAPIModelsResponseNGBStaffDetailResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "engineerDetail": null,
  "misc": null,
  "userRoles": null,
  "tags": null,
  "payBands": null,
  "intId": null,
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
  "reference": null,
  "other": null,
  "active": null,
  "staffType": null,
} satisfies JoblogicAPIModelsResponseNGBStaffDetailResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsResponseNGBStaffDetailResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


