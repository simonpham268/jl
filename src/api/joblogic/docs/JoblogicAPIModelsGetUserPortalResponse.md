
# JoblogicAPIModelsGetUserPortalResponse


## Properties

Name | Type
------------ | -------------
`intId` | number
`type` | [JobLogicMicroserviceRoleContractPortalUserType](JobLogicMicroserviceRoleContractPortalUserType.md)
`userTypeDescription` | string
`uniqueId` | string
`name` | string
`emailAddress` | string
`assignedEntityIds` | Array&lt;number&gt;
`active` | boolean
`pendingActivation` | boolean
`pendingVerification` | boolean
`pendingActivationEmail` | boolean
`address1` | string
`address2` | string
`address3` | string
`address4` | string
`postcode` | string
`telephone` | string
`mobile` | string
`portalLink` | string
`userGuideLink` | string
`assignedPermissions` | [JoblogicAPIModelsPortalAssignedUserRoleResponse](JoblogicAPIModelsPortalAssignedUserRoleResponse.md)

## Example

```typescript
import type { JoblogicAPIModelsGetUserPortalResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "intId": null,
  "type": null,
  "userTypeDescription": null,
  "uniqueId": null,
  "name": null,
  "emailAddress": null,
  "assignedEntityIds": null,
  "active": null,
  "pendingActivation": null,
  "pendingVerification": null,
  "pendingActivationEmail": null,
  "address1": null,
  "address2": null,
  "address3": null,
  "address4": null,
  "postcode": null,
  "telephone": null,
  "mobile": null,
  "portalLink": null,
  "userGuideLink": null,
  "assignedPermissions": null,
} satisfies JoblogicAPIModelsGetUserPortalResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsGetUserPortalResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


