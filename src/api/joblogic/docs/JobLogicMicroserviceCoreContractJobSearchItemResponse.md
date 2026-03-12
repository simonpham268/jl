
# JobLogicMicroserviceCoreContractJobSearchItemResponse


## Properties

Name | Type
------------ | -------------
`id` | number
`duration` | string
`jobNumber` | string
`customerId` | number
`customerName` | string
`customerCustomReference` | string
`customerType` | string
`siteId` | number
`siteName` | string
`siteAddress1` | string
`siteAddress2` | string
`siteAddress3` | string
`siteAddress4` | string
`sitePostcode` | string
`siteCustomReference` | string
`sitePreferredEngineerName` | string
`description` | string
`dateLogged` | Date
`appointmentDate` | Date
`dateComplete` | Date
`updatedAt` | Date
`nextContactDate` | Date
`contact` | string
`telephone` | string
`emailAddress` | string
`orderNumber` | string
`jobStatusId` | number
`jobStatusStringId` | string
`jobStatusDescription` | string
`loggedByUserName` | string
`categoryDescription` | string
`typeDescription` | string
`jobTypeDefaultServiceDuration` | number
`priorityDescription` | string
`priorityId` | number
`priorityColour` | string
`priorityRemainingResponseTime` | number
`priorityResponseTime` | number
`completionTimeSinceDateLogged` | boolean
`dateJobAttended` | Date
`hasMetPriority` | boolean
`priorityCompletionTimeColour` | string
`priorityRemainingCompletionTime` | number
`priorityCompletionTime` | number
`customReference` | string
`hasMoreThanThreeVisits` | boolean
`visitsStatus` | [Array&lt;JobLogicMicroserviceCoreContractJobVisitsStatusResponse&gt;](JobLogicMicroserviceCoreContractJobVisitsStatusResponse.md)
`typeOfJob` | [JobLogicMicroserviceCoreContractTypeOfJob](JobLogicMicroserviceCoreContractTypeOfJob.md)
`visitRevisitReason` | string
`tags` | string
`isRead` | boolean
`uniqueId` | string
`jobCategoryColour` | string
`noOfVisits` | number
`siteTypeId` | number
`siteTypeDescription` | string
`areaId` | string
`area` | string
`jobTradeId` | string
`jobTrade` | string
`secondaryJobTrades` | [Array&lt;JobLogicMicroserviceCoreContractTradeItemModel&gt;](JobLogicMicroserviceCoreContractTradeItemModel.md)
`axaRef` | string
`axaAuthorisationCode` | string
`siteLatitude` | number
`siteLongitude` | number
`hasChild` | boolean
`hasParent` | boolean
`hasRelated` | boolean
`isSuspended` | boolean
`isFrozen` | boolean
`subcontractors` | Array&lt;string&gt;
`isRequireApproval` | boolean
`approvedDate` | Date
`approvedBy` | number
`quotedValue` | number
`targetCompletetionDate` | Date
`showTransferredStatus` | boolean
`eDIReference` | string
`jobOwner` | string
`portalUserId` | number
`reportedFaultCode` | string
`reportedSubFaultCode` | string
`actualFaultCode` | string
`actualSubFaultCode` | string
`equipmentClass` | string
`jobUserReferenceFieldValue` | string
`jobUserReferenceDropdownListValue` | string
`jobUserReferenceDropdownListDescription` | string
`projectId` | string
`projectName` | string
`projectColor` | string
`projectMilestoneId` | string
`projectMilestoneName` | string
`projectMilestoneDate` | Date
`customerContractNumber` | string
`customerContractId` | number
`externalProjectNumber` | string
`formsCompleted` | number
`attributeDescriptions` | string
`assetFrequency` | string
`subJobStatuses` | [Array&lt;JobLogicMicroserviceCoreContractJobStatusResponse&gt;](JobLogicMicroserviceCoreContractJobStatusResponse.md)
`numberOfSubJobStatuses` | number
`documentName` | string

## Example

```typescript
import type { JobLogicMicroserviceCoreContractJobSearchItemResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "duration": null,
  "jobNumber": null,
  "customerId": null,
  "customerName": null,
  "customerCustomReference": null,
  "customerType": null,
  "siteId": null,
  "siteName": null,
  "siteAddress1": null,
  "siteAddress2": null,
  "siteAddress3": null,
  "siteAddress4": null,
  "sitePostcode": null,
  "siteCustomReference": null,
  "sitePreferredEngineerName": null,
  "description": null,
  "dateLogged": null,
  "appointmentDate": null,
  "dateComplete": null,
  "updatedAt": null,
  "nextContactDate": null,
  "contact": null,
  "telephone": null,
  "emailAddress": null,
  "orderNumber": null,
  "jobStatusId": null,
  "jobStatusStringId": null,
  "jobStatusDescription": null,
  "loggedByUserName": null,
  "categoryDescription": null,
  "typeDescription": null,
  "jobTypeDefaultServiceDuration": null,
  "priorityDescription": null,
  "priorityId": null,
  "priorityColour": null,
  "priorityRemainingResponseTime": null,
  "priorityResponseTime": null,
  "completionTimeSinceDateLogged": null,
  "dateJobAttended": null,
  "hasMetPriority": null,
  "priorityCompletionTimeColour": null,
  "priorityRemainingCompletionTime": null,
  "priorityCompletionTime": null,
  "customReference": null,
  "hasMoreThanThreeVisits": null,
  "visitsStatus": null,
  "typeOfJob": null,
  "visitRevisitReason": null,
  "tags": null,
  "isRead": null,
  "uniqueId": null,
  "jobCategoryColour": null,
  "noOfVisits": null,
  "siteTypeId": null,
  "siteTypeDescription": null,
  "areaId": null,
  "area": null,
  "jobTradeId": null,
  "jobTrade": null,
  "secondaryJobTrades": null,
  "axaRef": null,
  "axaAuthorisationCode": null,
  "siteLatitude": null,
  "siteLongitude": null,
  "hasChild": null,
  "hasParent": null,
  "hasRelated": null,
  "isSuspended": null,
  "isFrozen": null,
  "subcontractors": null,
  "isRequireApproval": null,
  "approvedDate": null,
  "approvedBy": null,
  "quotedValue": null,
  "targetCompletetionDate": null,
  "showTransferredStatus": null,
  "eDIReference": null,
  "jobOwner": null,
  "portalUserId": null,
  "reportedFaultCode": null,
  "reportedSubFaultCode": null,
  "actualFaultCode": null,
  "actualSubFaultCode": null,
  "equipmentClass": null,
  "jobUserReferenceFieldValue": null,
  "jobUserReferenceDropdownListValue": null,
  "jobUserReferenceDropdownListDescription": null,
  "projectId": null,
  "projectName": null,
  "projectColor": null,
  "projectMilestoneId": null,
  "projectMilestoneName": null,
  "projectMilestoneDate": null,
  "customerContractNumber": null,
  "customerContractId": null,
  "externalProjectNumber": null,
  "formsCompleted": null,
  "attributeDescriptions": null,
  "assetFrequency": null,
  "subJobStatuses": null,
  "numberOfSubJobStatuses": null,
  "documentName": null,
} satisfies JobLogicMicroserviceCoreContractJobSearchItemResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JobLogicMicroserviceCoreContractJobSearchItemResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


