
# JobLogicMicroserviceCoreContractStockVehicleModel


## Properties

Name | Type
------------ | -------------
`id` | number
`regNumber` | string
`make` | string
`model` | string
`vIN` | string
`engineerId` | number
`engineerName` | string
`serviceDueDate` | Date
`mOTDueDate` | Date
`lastKnownMileage` | number
`maximumMileage` | number
`additionalInfo` | string
`isActive` | boolean
`isAuditCreated` | boolean
`roadFundLicenceDueDate` | Date
`leaseRenewalDueDate` | Date
`trackingDeviceIMEI` | string

## Example

```typescript
import type { JobLogicMicroserviceCoreContractStockVehicleModel } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "regNumber": null,
  "make": null,
  "model": null,
  "vIN": null,
  "engineerId": null,
  "engineerName": null,
  "serviceDueDate": null,
  "mOTDueDate": null,
  "lastKnownMileage": null,
  "maximumMileage": null,
  "additionalInfo": null,
  "isActive": null,
  "isAuditCreated": null,
  "roadFundLicenceDueDate": null,
  "leaseRenewalDueDate": null,
  "trackingDeviceIMEI": null,
} satisfies JobLogicMicroserviceCoreContractStockVehicleModel

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JobLogicMicroserviceCoreContractStockVehicleModel
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


