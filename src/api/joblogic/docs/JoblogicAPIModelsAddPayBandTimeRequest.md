
# JoblogicAPIModelsAddPayBandTimeRequest


## Properties

Name | Type
------------ | -------------
`type` | [JoblogicAPIPaybandTimeType](JoblogicAPIPaybandTimeType.md)
`dayOfWeek` | [SystemDayOfWeek](SystemDayOfWeek.md)
`startTime` | string
`endTime` | string
`payBandId` | string
`siteId` | number
`contractSiteId` | number
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsAddPayBandTimeRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "dayOfWeek": null,
  "startTime": null,
  "endTime": null,
  "payBandId": null,
  "siteId": null,
  "contractSiteId": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsAddPayBandTimeRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsAddPayBandTimeRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


