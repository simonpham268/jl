
# JoblogicAPIModelsVehicleItemSearchResponse


## Properties

Name | Type
------------ | -------------
`id` | number
`regNumber` | string
`make` | string
`model` | string
`vIN` | string
`serviceDueDate` | Date
`mOTDueDate` | Date
`isActive` | boolean
`engineerName` | string
`engineerId` | number
`roadFundLicenceDueDate` | Date
`leaseRenewalDueDate` | Date
`trackingDeviceIMEI` | string

## Example

```typescript
import type { JoblogicAPIModelsVehicleItemSearchResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "regNumber": null,
  "make": null,
  "model": null,
  "vIN": null,
  "serviceDueDate": null,
  "mOTDueDate": null,
  "isActive": null,
  "engineerName": null,
  "engineerId": null,
  "roadFundLicenceDueDate": null,
  "leaseRenewalDueDate": null,
  "trackingDeviceIMEI": null,
} satisfies JoblogicAPIModelsVehicleItemSearchResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsVehicleItemSearchResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


