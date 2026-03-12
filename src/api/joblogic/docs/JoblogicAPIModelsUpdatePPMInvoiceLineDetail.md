
# JoblogicAPIModelsUpdatePPMInvoiceLineDetail


## Properties

Name | Type
------------ | -------------
`lineId` | string
`description` | string
`value` | number
`discountAmount` | number
`discountPercentage` | number
`taxCodeId` | string
`nominalCodeId` | string
`tags` | Array&lt;string&gt;

## Example

```typescript
import type { JoblogicAPIModelsUpdatePPMInvoiceLineDetail } from ''

// TODO: Update the object below with actual values
const example = {
  "lineId": null,
  "description": null,
  "value": null,
  "discountAmount": null,
  "discountPercentage": null,
  "taxCodeId": null,
  "nominalCodeId": null,
  "tags": null,
} satisfies JoblogicAPIModelsUpdatePPMInvoiceLineDetail

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsUpdatePPMInvoiceLineDetail
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


