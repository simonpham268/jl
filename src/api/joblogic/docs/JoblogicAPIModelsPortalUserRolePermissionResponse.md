
# JoblogicAPIModelsPortalUserRolePermissionResponse


## Properties

Name | Type
------------ | -------------
`id` | number
`description` | string
`name` | string
`active` | boolean
`isDefault` | boolean
`permissions` | [Array&lt;JoblogicAPIModelsPortalUserPermissionResponse&gt;](JoblogicAPIModelsPortalUserPermissionResponse.md)
`isInProgress` | boolean

## Example

```typescript
import type { JoblogicAPIModelsPortalUserRolePermissionResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "description": null,
  "name": null,
  "active": null,
  "isDefault": null,
  "permissions": null,
  "isInProgress": null,
} satisfies JoblogicAPIModelsPortalUserRolePermissionResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsPortalUserRolePermissionResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


