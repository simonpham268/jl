
# JoblogicAPIModelsNGBSiteAdditionalDetailsRequest


## Properties

Name | Type
------------ | -------------
`siteTypeUniqueId` | string
`accountManager` | number
`billingDetails` | [JoblogicAPIModelsNGBSiteAdditionalDetailsRequest SiteBillingDetails](JoblogicAPIModelsNGBSiteAdditionalDetailsRequest SiteBillingDetails.md)
`parentSiteUniqueId` | string
`warning1` | [JoblogicAPIModelsNGBSiteAdditionalDetailsRequest Warning](JoblogicAPIModelsNGBSiteAdditionalDetailsRequest Warning.md)
`warning2` | [JoblogicAPIModelsNGBSiteAdditionalDetailsRequest Warning](JoblogicAPIModelsNGBSiteAdditionalDetailsRequest Warning.md)
`warning3` | [JoblogicAPIModelsNGBSiteAdditionalDetailsRequest Warning](JoblogicAPIModelsNGBSiteAdditionalDetailsRequest Warning.md)
`accountNumber` | string
`preferredEngineerId` | number
`autoPopulatePreferredEngineer` | boolean
`autoPopulatePreferredSubcontractor` | boolean
`preferredSubcontractorId` | string
`roundingType` | [JobLogicMicroserviceCoreContractRoundingType](JobLogicMicroserviceCoreContractRoundingType.md)
`roundingDuration` | number
`orderNumber` | string
`isJobOrderNumberMandatory` | boolean
`sellingRateIds` | Array&lt;number&gt;
`customReference` | string
`priorityId` | string
`sellingRateId` | number
`siteConfigurationDefaultTemplate` | [JoblogicAPIModelsNGBSiteConfigurationDefaultTemplate](JoblogicAPIModelsNGBSiteConfigurationDefaultTemplate.md)
`siteConfigurationNominalCode` | [JoblogicAPIModelsNGBSiteConfigurationNominalCode](JoblogicAPIModelsNGBSiteConfigurationNominalCode.md)
`siteJobTypeCategory` | [JoblogicAPIModelsNGBSiteJobTypeCategory](JoblogicAPIModelsNGBSiteJobTypeCategory.md)
`notes` | [Array&lt;JoblogicAPIModelsNGBSiteNote&gt;](JoblogicAPIModelsNGBSiteNote.md)

## Example

```typescript
import type { JoblogicAPIModelsNGBSiteAdditionalDetailsRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "siteTypeUniqueId": null,
  "accountManager": null,
  "billingDetails": null,
  "parentSiteUniqueId": null,
  "warning1": null,
  "warning2": null,
  "warning3": null,
  "accountNumber": null,
  "preferredEngineerId": null,
  "autoPopulatePreferredEngineer": null,
  "autoPopulatePreferredSubcontractor": null,
  "preferredSubcontractorId": null,
  "roundingType": null,
  "roundingDuration": null,
  "orderNumber": null,
  "isJobOrderNumberMandatory": null,
  "sellingRateIds": null,
  "customReference": null,
  "priorityId": null,
  "sellingRateId": null,
  "siteConfigurationDefaultTemplate": null,
  "siteConfigurationNominalCode": null,
  "siteJobTypeCategory": null,
  "notes": null,
} satisfies JoblogicAPIModelsNGBSiteAdditionalDetailsRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsNGBSiteAdditionalDetailsRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


