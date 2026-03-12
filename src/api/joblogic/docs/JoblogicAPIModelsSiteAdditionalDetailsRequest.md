
# JoblogicAPIModelsSiteAdditionalDetailsRequest


## Properties

Name | Type
------------ | -------------
`accountNumber` | string
`billingDetails` | [JoblogicAPIModelsSiteAdditionalDetailsRequest SiteBillingDetails](JoblogicAPIModelsSiteAdditionalDetailsRequest SiteBillingDetails.md)
`accountManager` | number
`orderNumber` | string
`siteTypeUniqueId` | string
`preferredEngineerId` | number
`sellingRateId` | number
`parentSiteUniqueId` | string

## Example

```typescript
import type { JoblogicAPIModelsSiteAdditionalDetailsRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "accountNumber": null,
  "billingDetails": null,
  "accountManager": null,
  "orderNumber": null,
  "siteTypeUniqueId": null,
  "preferredEngineerId": null,
  "sellingRateId": null,
  "parentSiteUniqueId": null,
} satisfies JoblogicAPIModelsSiteAdditionalDetailsRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsSiteAdditionalDetailsRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


