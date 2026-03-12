
# JoblogicAPIModelsGetPPMInvoiceLineDetail


## Properties

Name | Type
------------ | -------------
`lineId` | string
`description` | string
`value` | number
`discountAmount` | number
`discountPercentage` | number
`taxCodeId` | string
`taxCodeDescription` | string
`taxCodeValue` | number
`nominalCodeId` | string
`nominalCode` | string
`nominalCodeDescription` | string
`tags` | [Array&lt;JoblogicAPIModelsTagItemDetail&gt;](JoblogicAPIModelsTagItemDetail.md)

## Example

```typescript
import type { JoblogicAPIModelsGetPPMInvoiceLineDetail } from ''

// TODO: Update the object below with actual values
const example = {
  "lineId": null,
  "description": null,
  "value": null,
  "discountAmount": null,
  "discountPercentage": null,
  "taxCodeId": null,
  "taxCodeDescription": null,
  "taxCodeValue": null,
  "nominalCodeId": null,
  "nominalCode": null,
  "nominalCodeDescription": null,
  "tags": null,
} satisfies JoblogicAPIModelsGetPPMInvoiceLineDetail

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsGetPPMInvoiceLineDetail
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


