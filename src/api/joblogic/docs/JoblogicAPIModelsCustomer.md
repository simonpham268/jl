
# JoblogicAPIModelsCustomer


## Properties

Name | Type
------------ | -------------
`name` | string
`guid` | string
`externalCustomerNumber` | string
`address` | [JoblogicAPIModelsAddress](JoblogicAPIModelsAddress.md)

## Example

```typescript
import type { JoblogicAPIModelsCustomer } from ''

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "guid": null,
  "externalCustomerNumber": null,
  "address": null,
} satisfies JoblogicAPIModelsCustomer

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCustomer
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


