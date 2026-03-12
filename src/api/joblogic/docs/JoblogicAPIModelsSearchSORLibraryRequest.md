
# JoblogicAPIModelsSearchSORLibraryRequest


## Properties

Name | Type
------------ | -------------
`customerIdToAssign` | number
`customerContractIdToAssign` | number
`includeId` | number
`includeUnshared` | boolean
`includeUnsharedOnly` | boolean
`subcontractorToAssign` | string
`libraryIds` | Array&lt;number&gt;
`searchTerm` | string
`includeInactive` | boolean
`pageIndex` | number
`pageSize` | number
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsSearchSORLibraryRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "customerIdToAssign": null,
  "customerContractIdToAssign": null,
  "includeId": null,
  "includeUnshared": null,
  "includeUnsharedOnly": null,
  "subcontractorToAssign": null,
  "libraryIds": null,
  "searchTerm": null,
  "includeInactive": null,
  "pageIndex": null,
  "pageSize": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsSearchSORLibraryRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsSearchSORLibraryRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


