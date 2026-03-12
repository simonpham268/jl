
# JoblogicAPIModelsRequestUpdatePaybandRateRequest


## Properties

Name | Type
------------ | -------------
`id` | string
`siteId` | number
`contractSiteId` | number
`type` | [JoblogicAPIPaybandTimeType](JoblogicAPIPaybandTimeType.md)
`labourCostRate` | number
`travelCostRate` | number
`mileageCostRate` | number
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsRequestUpdatePaybandRateRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "siteId": null,
  "contractSiteId": null,
  "type": null,
  "labourCostRate": null,
  "travelCostRate": null,
  "mileageCostRate": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsRequestUpdatePaybandRateRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsRequestUpdatePaybandRateRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


