
# JoblogicAPIModelsCreateJobRecurResponse


## Properties

Name | Type
------------ | -------------
`recurringId` | number
`jobId` | number
`nextJobStringId` | string
`nextJobId` | number
`startRecur` | Date
`endRecur` | Date
`iterateJobType` | [JobLogicMicroserviceScheduleContractRecurringJobCycleType](JobLogicMicroserviceScheduleContractRecurringJobCycleType.md)
`status` | [JobLogicMicroserviceScheduleContractIterateJobStatus](JobLogicMicroserviceScheduleContractIterateJobStatus.md)
`recuringStatus` | [JobLogicMicroserviceScheduleContractJobRecuringStatus](JobLogicMicroserviceScheduleContractJobRecuringStatus.md)
`statusDate` | Date
`iterateUnit` | number
`iterateTime` | string
`monday` | boolean
`tuesday` | boolean
`wednesday` | boolean
`thursday` | boolean
`friday` | boolean
`saturday` | boolean
`sunday` | boolean
`customFrequency` | boolean
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
`engineers` | [Array&lt;JoblogicAPIModelsJobRecurEngineerViewModel&gt;](JoblogicAPIModelsJobRecurEngineerViewModel.md)
`daysOfMonth` | [Array&lt;JobLogicMicroserviceScheduleContractEnumsDayOfMonth&gt;](JobLogicMicroserviceScheduleContractEnumsDayOfMonth.md)
`annualDay` | number
`annualMonth` | number
`sendJobRecuredEmailToCustomer` | boolean
`allocationTarget` | [JoblogicAPIModelsRequestJobRecurAllocationTarget](JoblogicAPIModelsRequestJobRecurAllocationTarget.md)
`engineerTeamId` | number

## Example

```typescript
import type { JoblogicAPIModelsCreateJobRecurResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "recurringId": null,
  "jobId": null,
  "nextJobStringId": null,
  "nextJobId": null,
  "startRecur": null,
  "endRecur": null,
  "iterateJobType": null,
  "status": null,
  "recuringStatus": null,
  "statusDate": null,
  "iterateUnit": null,
  "iterateTime": null,
  "monday": null,
  "tuesday": null,
  "wednesday": null,
  "thursday": null,
  "friday": null,
  "saturday": null,
  "sunday": null,
  "customFrequency": null,
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
  "engineers": null,
  "daysOfMonth": null,
  "annualDay": null,
  "annualMonth": null,
  "sendJobRecuredEmailToCustomer": null,
  "allocationTarget": null,
  "engineerTeamId": null,
} satisfies JoblogicAPIModelsCreateJobRecurResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsCreateJobRecurResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


