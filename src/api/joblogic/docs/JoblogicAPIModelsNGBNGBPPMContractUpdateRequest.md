
# JoblogicAPIModelsNGBNGBPPMContractUpdateRequest


## Properties

Name | Type
------------ | -------------
`id` | string
`description` | string
`startDate` | Date
`endDate` | Date
`planReference` | string
`fixedPriceValue` | number
`jobCategoryId` | number
`sellingRateId` | number
`defaultEngineerId` | number
`labour` | number
`overtime` | number
`travel` | number
`mileage` | number
`material` | number
`expenses` | number
`callout` | number
`subcontractor` | number
`tagIds` | Array&lt;string&gt;
`isPPMScheduleImport` | boolean
`accountManagerId` | number
`engineerTeamId` | number
`defaultSubcontractorId` | string
`customerOrderNumber` | string
`engineerType` | string
`noBillingContractValue` | number
`customerContractId` | number
`addressType` | [JobLogicMicroserviceCoreContractInvoiceAddressTypeOption](JobLogicMicroserviceCoreContractInvoiceAddressTypeOption.md)
`accountNumber` | string
`orderNumber` | string
`name` | string
`address1` | string
`address2` | string
`address3` | string
`address4` | string
`postcode` | string
`terms` | string
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsNGBNGBPPMContractUpdateRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "description": null,
  "startDate": null,
  "endDate": null,
  "planReference": null,
  "fixedPriceValue": null,
  "jobCategoryId": null,
  "sellingRateId": null,
  "defaultEngineerId": null,
  "labour": null,
  "overtime": null,
  "travel": null,
  "mileage": null,
  "material": null,
  "expenses": null,
  "callout": null,
  "subcontractor": null,
  "tagIds": null,
  "isPPMScheduleImport": null,
  "accountManagerId": null,
  "engineerTeamId": null,
  "defaultSubcontractorId": null,
  "customerOrderNumber": null,
  "engineerType": null,
  "noBillingContractValue": null,
  "customerContractId": null,
  "addressType": null,
  "accountNumber": null,
  "orderNumber": null,
  "name": null,
  "address1": null,
  "address2": null,
  "address3": null,
  "address4": null,
  "postcode": null,
  "terms": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsNGBNGBPPMContractUpdateRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsNGBNGBPPMContractUpdateRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


