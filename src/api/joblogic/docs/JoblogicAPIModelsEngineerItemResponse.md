
# JoblogicAPIModelsEngineerItemResponse


## Properties

Name | Type
------------ | -------------
`id` | number
`uniqueId` | string
`stringId` | string
`active` | boolean
`name` | string
`emailAddress` | string
`address1` | string
`address2` | string
`address3` | string
`address4` | string
`postcode` | string
`telephone` | string
`isMobile` | boolean
`staffTypeId` | [JobLogicMicroserviceCoreContractStaffType](JobLogicMicroserviceCoreContractStaffType.md)
`staffId` | number
`staffUniqueId` | string
`workingHours` | [Array&lt;JobLogicMicroserviceCoreContractWorkingHour&gt;](JobLogicMicroserviceCoreContractWorkingHour.md)

## Example

```typescript
import type { JoblogicAPIModelsEngineerItemResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "uniqueId": null,
  "stringId": null,
  "active": null,
  "name": null,
  "emailAddress": null,
  "address1": null,
  "address2": null,
  "address3": null,
  "address4": null,
  "postcode": null,
  "telephone": null,
  "isMobile": null,
  "staffTypeId": null,
  "staffId": null,
  "staffUniqueId": null,
  "workingHours": null,
} satisfies JoblogicAPIModelsEngineerItemResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsEngineerItemResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


