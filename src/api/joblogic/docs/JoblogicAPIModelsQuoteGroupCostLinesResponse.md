
# JoblogicAPIModelsQuoteGroupCostLinesResponse


## Properties

Name | Type
------------ | -------------
`materialLines` | [Array&lt;JoblogicAPIModelsQuoteMaterialCostResponse&gt;](JoblogicAPIModelsQuoteMaterialCostResponse.md)
`expenseLines` | [Array&lt;JoblogicAPIModelsQuoteExpenseCostResponse&gt;](JoblogicAPIModelsQuoteExpenseCostResponse.md)
`calloutLines` | [Array&lt;JoblogicAPIModelsQuoteCalloutCostResponse&gt;](JoblogicAPIModelsQuoteCalloutCostResponse.md)
`travelLines` | [Array&lt;JoblogicAPIModelsQuoteTravelCostResponse&gt;](JoblogicAPIModelsQuoteTravelCostResponse.md)
`labourLines` | [Array&lt;JoblogicAPIModelsQuoteLabourCostResponse&gt;](JoblogicAPIModelsQuoteLabourCostResponse.md)
`otherLines` | [Array&lt;JoblogicAPIModelsQuoteOtherCostResponse&gt;](JoblogicAPIModelsQuoteOtherCostResponse.md)
`subcontractorLines` | [Array&lt;JoblogicAPIModelsQuoteSubcontractorCostResponse&gt;](JoblogicAPIModelsQuoteSubcontractorCostResponse.md)
`scheduleOfRatesLines` | [Array&lt;JoblogicAPIModelsQuoteScheduleOfRatesCostResponse&gt;](JoblogicAPIModelsQuoteScheduleOfRatesCostResponse.md)

## Example

```typescript
import type { JoblogicAPIModelsQuoteGroupCostLinesResponse } from ''

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
} satisfies JoblogicAPIModelsQuoteGroupCostLinesResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsQuoteGroupCostLinesResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


