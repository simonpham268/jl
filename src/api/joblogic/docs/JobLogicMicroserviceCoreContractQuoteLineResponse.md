
# JobLogicMicroserviceCoreContractQuoteLineResponse


## Properties

Name | Type
------------ | -------------
`materialLines` | [Array&lt;JobLogicMicroserviceCoreContractQuoteMaterialLineResponse&gt;](JobLogicMicroserviceCoreContractQuoteMaterialLineResponse.md)
`expenseLines` | [Array&lt;JobLogicMicroserviceCoreContractQuoteExpenseLineResponse&gt;](JobLogicMicroserviceCoreContractQuoteExpenseLineResponse.md)
`calloutLines` | [Array&lt;JobLogicMicroserviceCoreContractQuoteCalloutLineResponse&gt;](JobLogicMicroserviceCoreContractQuoteCalloutLineResponse.md)
`travelLines` | [Array&lt;JobLogicMicroserviceCoreContractQuoteTravelLineResponse&gt;](JobLogicMicroserviceCoreContractQuoteTravelLineResponse.md)
`labourLines` | [Array&lt;JobLogicMicroserviceCoreContractQuoteLabourLineResponse&gt;](JobLogicMicroserviceCoreContractQuoteLabourLineResponse.md)
`otherLines` | [Array&lt;JobLogicMicroserviceCoreContractQuoteOtherLineResponse&gt;](JobLogicMicroserviceCoreContractQuoteOtherLineResponse.md)
`subcontractorLines` | [Array&lt;JobLogicMicroserviceCoreContractQuoteSubcontractorLineResponse&gt;](JobLogicMicroserviceCoreContractQuoteSubcontractorLineResponse.md)
`scheduleOfRatesLines` | [Array&lt;JobLogicMicroserviceCoreContractQuoteScheduleOfRatesLineResponse&gt;](JobLogicMicroserviceCoreContractQuoteScheduleOfRatesLineResponse.md)

## Example

```typescript
import type { JobLogicMicroserviceCoreContractQuoteLineResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "materialLines": null,
  "expenseLines": null,
  "calloutLines": null,
  "travelLines": null,
  "labourLines": null,
  "otherLines": null,
  "subcontractorLines": null,
  "scheduleOfRatesLines": null,
} satisfies JobLogicMicroserviceCoreContractQuoteLineResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JobLogicMicroserviceCoreContractQuoteLineResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


