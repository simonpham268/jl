
# JoblogicAPIModelsGetJobCostResponse


## Properties

Name | Type
------------ | -------------
`materialLines` | [Array&lt;JoblogicAPIModelsJobMaterialResponse&gt;](JoblogicAPIModelsJobMaterialResponse.md)
`expenseLines` | [Array&lt;JoblogicAPIModelsJobExpenseResponse&gt;](JoblogicAPIModelsJobExpenseResponse.md)
`calloutLines` | [Array&lt;JoblogicAPIModelsJobCalloutResponse&gt;](JoblogicAPIModelsJobCalloutResponse.md)
`mileageLines` | [Array&lt;JoblogicAPIModelsJobMileageResponse&gt;](JoblogicAPIModelsJobMileageResponse.md)
`travelLines` | [Array&lt;JoblogicAPIModelsJobTravelResponse&gt;](JoblogicAPIModelsJobTravelResponse.md)
`labourLines` | [Array&lt;JoblogicAPIModelsJobLabourResponse&gt;](JoblogicAPIModelsJobLabourResponse.md)
`overtimeLines` | [Array&lt;JoblogicAPIModelsJobOvertimeResponse&gt;](JoblogicAPIModelsJobOvertimeResponse.md)
`subcontractorLines` | [Array&lt;JoblogicAPIModelsJobSubcontractorResponse&gt;](JoblogicAPIModelsJobSubcontractorResponse.md)
`scheduleOfRatesLines` | [Array&lt;JoblogicAPIModelsJobScheduleOfRatesResponse&gt;](JoblogicAPIModelsJobScheduleOfRatesResponse.md)
`otherLines` | [Array&lt;JoblogicAPIModelsJobOtherResponse&gt;](JoblogicAPIModelsJobOtherResponse.md)
`totalCostIncludingVAT` | number
`totalCostExcludingVAT` | number
`totalSellIncludingVAT` | number
`totalSellExcludingVAT` | number

## Example

```typescript
import type { JoblogicAPIModelsGetJobCostResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "materialLines": null,
  "expenseLines": null,
  "calloutLines": null,
  "mileageLines": null,
  "travelLines": null,
  "labourLines": null,
  "overtimeLines": null,
  "subcontractorLines": null,
  "scheduleOfRatesLines": null,
  "otherLines": null,
  "totalCostIncludingVAT": null,
  "totalCostExcludingVAT": null,
  "totalSellIncludingVAT": null,
  "totalSellExcludingVAT": null,
} satisfies JoblogicAPIModelsGetJobCostResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsGetJobCostResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


