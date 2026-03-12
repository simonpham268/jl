
# JoblogicAPIModelsAddress


## Properties

Name | Type
------------ | -------------
`addressLine1` | string
`addressLine2` | string
`addressLine3` | string
`townOrCity` | string
`countryOrStateName` | string
`postalCode` | string
`countryCode` | string
`addressId` | string

## Example

```typescript
import type { JoblogicAPIModelsAddress } from ''

// TODO: Update the object below with actual values
const example = {
  "addressLine1": null,
  "addressLine2": null,
  "addressLine3": null,
  "townOrCity": null,
  "countryOrStateName": null,
  "postalCode": null,
  "countryCode": null,
  "addressId": null,
} satisfies JoblogicAPIModelsAddress

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsAddress
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


