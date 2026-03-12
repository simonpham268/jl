
# JoblogicAPIModelsTVSJobRequest


## Properties

Name | Type
------------ | -------------
`guid` | string
`id` | string
`jobReference` | string
`externalJobReference` | string
`jobType` | [JoblogicAPIModelsJobType](JoblogicAPIModelsJobType.md)
`currentJobStatus` | [JoblogicAPIModelsJobStatus](JoblogicAPIModelsJobStatus.md)
`jobStatuses` | [JoblogicAPIModelsJobStatuses](JoblogicAPIModelsJobStatuses.md)
`jobSummary` | [JoblogicAPIModelsJobSummary](JoblogicAPIModelsJobSummary.md)
`jobDetails` | [JoblogicAPIModelsJobDetail](JoblogicAPIModelsJobDetail.md)
`scheduled` | [JoblogicAPIModelsSchedule](JoblogicAPIModelsSchedule.md)
`planned` | [JoblogicAPIModelsPlanned](JoblogicAPIModelsPlanned.md)
`requiredBy` | [JoblogicAPIModelsRequiredBy](JoblogicAPIModelsRequiredBy.md)
`client` | [JoblogicAPIModelsClient](JoblogicAPIModelsClient.md)
`customer` | [JoblogicAPIModelsCustomer](JoblogicAPIModelsCustomer.md)
`suggestedItems` | [JoblogicAPIModelsSuggestedItemes](JoblogicAPIModelsSuggestedItemes.md)
`orderedItems` | [JoblogicAPIModelsOrderedItems](JoblogicAPIModelsOrderedItems.md)
`usedItems` | [JoblogicAPIModelsUsedItems](JoblogicAPIModelsUsedItems.md)
`assignedUsers` | [JoblogicAPIModelsAssignedUsers](JoblogicAPIModelsAssignedUsers.md)
`activities` | [JoblogicAPIModelsActivities](JoblogicAPIModelsActivities.md)
`associatedJobs` | [JoblogicAPIModelsAssociatedJobs](JoblogicAPIModelsAssociatedJobs.md)
`jobNotes` | [JoblogicAPIModelsJobNotes](JoblogicAPIModelsJobNotes.md)

## Example

```typescript
import type { JoblogicAPIModelsTVSJobRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "guid": null,
  "id": null,
  "jobReference": null,
  "externalJobReference": null,
  "jobType": null,
  "currentJobStatus": null,
  "jobStatuses": null,
  "jobSummary": null,
  "jobDetails": null,
  "scheduled": null,
  "planned": null,
  "requiredBy": null,
  "client": null,
  "customer": null,
  "suggestedItems": null,
  "orderedItems": null,
  "usedItems": null,
  "assignedUsers": null,
  "activities": null,
  "associatedJobs": null,
  "jobNotes": null,
} satisfies JoblogicAPIModelsTVSJobRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as JoblogicAPIModelsTVSJobRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


