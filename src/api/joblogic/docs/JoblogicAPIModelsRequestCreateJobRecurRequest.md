
# JoblogicAPIModelsRequestCreateJobRecurRequest


## Properties

Name | Type
------------ | -------------
`jobId` | number
`startRecur` | string
`endRecur` | string
`iterateJobType` | [JobLogicMicroserviceScheduleContractRecurringJobCycleType](JobLogicMicroserviceScheduleContractRecurringJobCycleType.md)
`iterateUnit` | number
`iterateTime` | string
`monday` | boolean
`tuesday` | boolean
`wednesday` | boolean
`thursday` | boolean
`friday` | boolean
`saturday` | boolean
`sunday` | boolean
`jobDescription` | string
`orderNumber` | string
`quotedValue` | number
`jobTypeId` | number
`fixedPriceInvoice` | boolean
`fixedPriceValue` | number
`copyNotesAndAttachments` | boolean
`copyAssets` | boolean
`copyTasks` | boolean
`copyOtherDetails` | boolean
`deployToMobile` | boolean
`requireApproval` | boolean
`copyJobForms` | boolean
`invoiceAddressTypeOption` | [JobLogicMicroserviceScheduleContractInvoiceAddressScheduleTypeOption](JobLogicMicroserviceScheduleContractInvoiceAddressScheduleTypeOption.md)
`invoiceAddressName` | string
`invoiceAddress1` | string
`invoiceAddress2` | string
`invoiceAddress3` | string
`invoiceAddress4` | string
`postCode` | string
`accountNumber` | string
`invoiceOrderNumber` | string
`invoiceHeaderId` | number
`invoiceHeader` | string
`notes` | string
`terms` | string
`sendNotifyToCustomer` | boolean
`engineerIds` | Array&lt;number&gt;
`daysOfMonth` | [Array&lt;JobLogicMicroserviceScheduleContractEnumsDayOfMonth&gt;](JobLogicMicroserviceScheduleContractEnumsDayOfMonth.md)
`annualDay` | number
`annualMonth` | number
`sendJobRecuredEmailToCustomer` | boolean
`allocationTarget` | [JoblogicAPIModelsRequestJobRecurAllocationTarget](JoblogicAPIModelsRequestJobRecurAllocationTarget.md)
`engineerTeamId` | number
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsRequestCreateJobRecurRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "jobId": null,
  "startRecur": null,
  "endRecur": null,
  "iterateJobType": null,
  "iterateUnit": null,
  "iterateTime": null,
  "monday": null,
  "tuesday": null,
  "wednesday": null,
  "thursday": null,
  "friday": null,
  "saturday": null,
  "sunday": null,
  "jobDescription": null,
  "orderNumber": null,
  "quotedValue": null,
  "jobTypeId": null,
  "fixedPriceInvoice": null,
  "fixedPriceValue": null,
  "copyNotesAndAttachments": null,
  "copyAssets": null,
  "copyTasks": null,
  "copyOtherDetails": null,
  "deployToMobile": null,
  "requireApproval": null,
  "copyJobForms": null,
  "invoiceAddressTypeOption": null,
  "invoiceAddressName": null,
  "invoiceAddress1": null,
  "invoiceAddress2": null,
  "invoiceAddress3": null,
  "invoiceAddress4": null,
  "postCode": null,
  "accountNumber": null,
  "invoiceOrderNumber": null,
  "invoiceHeaderId": null,
  "invoiceHeader": null,
  "notes": null,
  "terms": null,
  "sendNotifyToCustomer": null,
  "engineerIds": null,
  "daysOfMonth": null,
  "annualDay": null,
  "annualMonth": null,
  "sendJobRecuredEmailToCustomer": null,
  "allocationTarget": null,
  "engineerTeamId": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsRequestCreateJobRecurRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsRequestCreateJobRecurRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


