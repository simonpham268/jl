
# JoblogicAPIModelsSaveVehicleRequest


## Properties

Name | Type
------------ | -------------
`id` | number
`registrationNumber` | string
`make` | string
`model` | string
`vIN` | string
`linkedEngineerId` | string
`trackingDeviceIMEI` | string
`mOTDueDate` | Date
`serviceDueDate` | Date
`lastKnownMileage` | number
`maximumMileage` | number
`roadFundLicenceDueDate` | Date
`leaseRenewalDueDate` | Date
`additionalInformation` | string
`tenantId` | string

## Example

```typescript
import type { JoblogicAPIModelsSaveVehicleRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "registrationNumber": null,
  "make": null,
  "model": null,
  "vIN": null,
  "linkedEngineerId": null,
  "trackingDeviceIMEI": null,
  "mOTDueDate": null,
  "serviceDueDate": null,
  "lastKnownMileage": null,
  "maximumMileage": null,
  "roadFundLicenceDueDate": null,
  "leaseRenewalDueDate": null,
  "additionalInformation": null,
  "tenantId": bf299948-f401-4bde-924c-ed445193f80b,
} satisfies JoblogicAPIModelsSaveVehicleRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsSaveVehicleRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


