# JobApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1JobAddcontactemailnotificationsPost**](JobApi.md#apiv1jobaddcontactemailnotificationspost) | **POST** /api/v1/Job/addcontactemailnotifications |  |
| [**apiV1JobApprovePut**](JobApi.md#apiv1jobapproveput) | **PUT** /api/v1/Job/approve |  |
| [**apiV1JobAssigncontactsPost**](JobApi.md#apiv1jobassigncontactspost) | **POST** /api/v1/Job/assigncontacts | Assign Customers/Site Contact(s) to Job |
| [**apiV1JobDelete**](JobApi.md#apiv1jobdelete) | **DELETE** /api/v1/Job | Delete Job |
| [**apiV1JobGeneratejobsheetPost**](JobApi.md#apiv1jobgeneratejobsheetpost) | **POST** /api/v1/Job/generatejobsheet | Generate Downloadable Url for Jobsheet |
| [**apiV1JobGet**](JobApi.md#apiv1jobget) | **GET** /api/v1/Job | Get Job Details |
| [**apiV1JobGetByIdGet**](JobApi.md#apiv1jobgetbyidget) | **GET** /api/v1/Job/GetById | Get Job Details |
| [**apiV1JobGetallPost**](JobApi.md#apiv1jobgetallpost) | **POST** /api/v1/Job/getall | Search Jobs by conditions |
| [**apiV1JobPost**](JobApi.md#apiv1jobpost) | **POST** /api/v1/Job | Create Job |
| [**apiV1JobPut**](JobApi.md#apiv1jobput) | **PUT** /api/v1/Job | Update Job |
| [**apiV1JobRestoreRequiredRevisitPut**](JobApi.md#apiv1jobrestorerequiredrevisitput) | **PUT** /api/v1/Job/RestoreRequiredRevisit | Restore Required Revisit Jobs |
| [**apiV1JobSearchjobref2Get**](JobApi.md#apiv1jobsearchjobref2get) | **GET** /api/v1/Job/searchjobref2 |  |
| [**apiV1JobSearchtradesGet**](JobApi.md#apiv1jobsearchtradesget) | **GET** /api/v1/Job/searchtrades |  |
| [**apiV1JobUpdateprojectnumberPut**](JobApi.md#apiv1jobupdateprojectnumberput) | **PUT** /api/v1/Job/updateprojectnumber |  |
| [**apiV1JobUpdatestatusPut**](JobApi.md#apiv1jobupdatestatusput) | **PUT** /api/v1/Job/updatestatus |  |



## apiV1JobAddcontactemailnotificationsPost

> boolean apiV1JobAddcontactemailnotificationsPost(authorization, joblogicAPIModelsAddContactRequest)



### Example

```ts
import {
  Configuration,
  JobApi,
} from '';
import type { ApiV1JobAddcontactemailnotificationsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsAddContactRequest (optional)
    joblogicAPIModelsAddContactRequest: ...,
  } satisfies ApiV1JobAddcontactemailnotificationsPostRequest;

  try {
    const data = await api.apiV1JobAddcontactemailnotificationsPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **authorization** | `string` | Bearer access_token | [Defaults to `undefined`] |
| **joblogicAPIModelsAddContactRequest** | [JoblogicAPIModelsAddContactRequest](JoblogicAPIModelsAddContactRequest.md) |  | [Optional] |

### Return type

**boolean**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json-patch+json`, `application/json`, `text/json`, `application/*+json`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1JobApprovePut

> boolean apiV1JobApprovePut(authorization, joblogicAPIModelsApprovedJobRequest)



### Example

```ts
import {
  Configuration,
  JobApi,
} from '';
import type { ApiV1JobApprovePutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsApprovedJobRequest (optional)
    joblogicAPIModelsApprovedJobRequest: ...,
  } satisfies ApiV1JobApprovePutRequest;

  try {
    const data = await api.apiV1JobApprovePut(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **authorization** | `string` | Bearer access_token | [Defaults to `undefined`] |
| **joblogicAPIModelsApprovedJobRequest** | [JoblogicAPIModelsApprovedJobRequest](JoblogicAPIModelsApprovedJobRequest.md) |  | [Optional] |

### Return type

**boolean**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json-patch+json`, `application/json`, `text/json`, `application/*+json`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1JobAssigncontactsPost

> JoblogicAPIModelsAssignContactToJobResponse apiV1JobAssigncontactsPost(authorization, joblogicAPIModelsAssignContactToJobRequest)

Assign Customers/Site Contact(s) to Job

### Example

```ts
import {
  Configuration,
  JobApi,
} from '';
import type { ApiV1JobAssigncontactsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsAssignContactToJobRequest | assign contact to job request (optional)
    joblogicAPIModelsAssignContactToJobRequest: ...,
  } satisfies ApiV1JobAssigncontactsPostRequest;

  try {
    const data = await api.apiV1JobAssigncontactsPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **authorization** | `string` | Bearer access_token | [Defaults to `undefined`] |
| **joblogicAPIModelsAssignContactToJobRequest** | [JoblogicAPIModelsAssignContactToJobRequest](JoblogicAPIModelsAssignContactToJobRequest.md) | assign contact to job request | [Optional] |

### Return type

[**JoblogicAPIModelsAssignContactToJobResponse**](JoblogicAPIModelsAssignContactToJobResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json-patch+json`, `application/json`, `text/json`, `application/*+json`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful |  -  |
| **400** | Bad Request |  -  |
| **401** | Unauthorized Request |  -  |
| **404** | Not found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1JobDelete

> apiV1JobDelete(authorization, id, tenantId)

Delete Job

### Example

```ts
import {
  Configuration,
  JobApi,
} from '';
import type { ApiV1JobDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Id of the Job to delete (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1JobDeleteRequest;

  try {
    const data = await api.apiV1JobDelete(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **authorization** | `string` | Bearer access_token | [Defaults to `undefined`] |
| **id** | `string` | Id of the Job to delete | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful |  -  |
| **400** | Bad Request |  -  |
| **401** | Unauthorized Request |  -  |
| **404** | Not found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1JobGeneratejobsheetPost

> JoblogicAPIModelsGenerateJobsheetResponse apiV1JobGeneratejobsheetPost(authorization, joblogicAPIModelsGenerateJobsheetRequest)

Generate Downloadable Url for Jobsheet

### Example

```ts
import {
  Configuration,
  JobApi,
} from '';
import type { ApiV1JobGeneratejobsheetPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsGenerateJobsheetRequest | Job to download Jobsheet from (optional)
    joblogicAPIModelsGenerateJobsheetRequest: ...,
  } satisfies ApiV1JobGeneratejobsheetPostRequest;

  try {
    const data = await api.apiV1JobGeneratejobsheetPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **authorization** | `string` | Bearer access_token | [Defaults to `undefined`] |
| **joblogicAPIModelsGenerateJobsheetRequest** | [JoblogicAPIModelsGenerateJobsheetRequest](JoblogicAPIModelsGenerateJobsheetRequest.md) | Job to download Jobsheet from | [Optional] |

### Return type

[**JoblogicAPIModelsGenerateJobsheetResponse**](JoblogicAPIModelsGenerateJobsheetResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json-patch+json`, `application/json`, `text/json`, `application/*+json`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful |  -  |
| **400** | Bad Request |  -  |
| **401** | Unauthorized Request |  -  |
| **404** | Not found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1JobGet

> JoblogicAPIModelsGetJobResponse apiV1JobGet(authorization, id, tenantId, includePortalLink, includeAdditionalDetails)

Get Job Details

### Example

```ts
import {
  Configuration,
  JobApi,
} from '';
import type { ApiV1JobGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Id of the job to retrieve (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // boolean | Optional flag to include portal link URL of the job in the response (optional)
    includePortalLink: true,
    // boolean | Optional flag to include additional details of the job in the response (optional)
    includeAdditionalDetails: true,
  } satisfies ApiV1JobGetRequest;

  try {
    const data = await api.apiV1JobGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **authorization** | `string` | Bearer access_token | [Defaults to `undefined`] |
| **id** | `string` | Id of the job to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |
| **includePortalLink** | `boolean` | Optional flag to include portal link URL of the job in the response | [Optional] [Defaults to `false`] |
| **includeAdditionalDetails** | `boolean` | Optional flag to include additional details of the job in the response | [Optional] [Defaults to `false`] |

### Return type

[**JoblogicAPIModelsGetJobResponse**](JoblogicAPIModelsGetJobResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful |  -  |
| **400** | Bad Request |  -  |
| **401** | Unauthorized Request |  -  |
| **404** | Not found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1JobGetByIdGet

> JoblogicAPIModelsGetJobResponse apiV1JobGetByIdGet(authorization, id, tenantId, includePortalLink, includeAdditionalDetails)

Get Job Details

### Example

```ts
import {
  Configuration,
  JobApi,
} from '';
import type { ApiV1JobGetByIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // number | Id of the job to retrieve (optional)
    id: 56,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // boolean | Optional flag to include portal link URL of the job in the response (optional)
    includePortalLink: true,
    // boolean | Optional flag to include additional details of the job in the response (optional)
    includeAdditionalDetails: true,
  } satisfies ApiV1JobGetByIdGetRequest;

  try {
    const data = await api.apiV1JobGetByIdGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **authorization** | `string` | Bearer access_token | [Defaults to `undefined`] |
| **id** | `number` | Id of the job to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |
| **includePortalLink** | `boolean` | Optional flag to include portal link URL of the job in the response | [Optional] [Defaults to `false`] |
| **includeAdditionalDetails** | `boolean` | Optional flag to include additional details of the job in the response | [Optional] [Defaults to `false`] |

### Return type

[**JoblogicAPIModelsGetJobResponse**](JoblogicAPIModelsGetJobResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful |  -  |
| **400** | Bad Request |  -  |
| **401** | Unauthorized Request |  -  |
| **404** | Not found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1JobGetallPost

> JoblogicAPIModelsSearchJobResponse apiV1JobGetallPost(authorization, joblogicAPIModelsSearchJobRequest)

Search Jobs by conditions

### Example

```ts
import {
  Configuration,
  JobApi,
} from '';
import type { ApiV1JobGetallPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchJobRequest | search conditons (optional)
    joblogicAPIModelsSearchJobRequest: ...,
  } satisfies ApiV1JobGetallPostRequest;

  try {
    const data = await api.apiV1JobGetallPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **authorization** | `string` | Bearer access_token | [Defaults to `undefined`] |
| **joblogicAPIModelsSearchJobRequest** | [JoblogicAPIModelsSearchJobRequest](JoblogicAPIModelsSearchJobRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchJobResponse**](JoblogicAPIModelsSearchJobResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json-patch+json`, `application/json`, `text/json`, `application/*+json`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful |  -  |
| **400** | Bad Request |  -  |
| **401** | Unauthorized Request |  -  |
| **404** | Not found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1JobPost

> JoblogicAPIModelsCreateJobResponse apiV1JobPost(authorization, joblogicAPIModelsCreateJobRequest)

Create Job

Status must be one of the following: \&#39;Attended\&#39;, \&#39;Costed\&#39;, \&#39;Paid\&#39;, \&#39;Invoiced\&#39;, \&#39;New Job\&#39;, \&#39;Parts To Fit\&#39;, \&#39;Allocated\&#39;, \&#39;Reqs. Invoice\&#39;, \&#39;Awaiting Parts\&#39;, \&#39;Cancelled\&#39;, \&#39;Completed\&#39;, \&#39;Recall\&#39;

### Example

```ts
import {
  Configuration,
  JobApi,
} from '';
import type { ApiV1JobPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateJobRequest | Job to create (optional)
    joblogicAPIModelsCreateJobRequest: ...,
  } satisfies ApiV1JobPostRequest;

  try {
    const data = await api.apiV1JobPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **authorization** | `string` | Bearer access_token | [Defaults to `undefined`] |
| **joblogicAPIModelsCreateJobRequest** | [JoblogicAPIModelsCreateJobRequest](JoblogicAPIModelsCreateJobRequest.md) | Job to create | [Optional] |

### Return type

[**JoblogicAPIModelsCreateJobResponse**](JoblogicAPIModelsCreateJobResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json-patch+json`, `application/json`, `text/json`, `application/*+json`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful |  -  |
| **400** | Bad Request |  -  |
| **401** | Unauthorized Request |  -  |
| **404** | Not found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1JobPut

> JoblogicAPIModelsUpdateJobResponse apiV1JobPut(authorization, joblogicAPIModelsUpdateJobRequest)

Update Job

Status must be one of the following: \&#39;Attended\&#39;, \&#39;Costed\&#39;, \&#39;Paid\&#39;, \&#39;Invoiced\&#39;, \&#39;New Job\&#39;, \&#39;Parts To Fit\&#39;, \&#39;Allocated\&#39;, \&#39;Reqs. Invoice\&#39;, \&#39;Awaiting Parts\&#39;, \&#39;Cancelled\&#39;, \&#39;Completed\&#39;, \&#39;Recall\&#39;

### Example

```ts
import {
  Configuration,
  JobApi,
} from '';
import type { ApiV1JobPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateJobRequest | Job to update (optional)
    joblogicAPIModelsUpdateJobRequest: ...,
  } satisfies ApiV1JobPutRequest;

  try {
    const data = await api.apiV1JobPut(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **authorization** | `string` | Bearer access_token | [Defaults to `undefined`] |
| **joblogicAPIModelsUpdateJobRequest** | [JoblogicAPIModelsUpdateJobRequest](JoblogicAPIModelsUpdateJobRequest.md) | Job to update | [Optional] |

### Return type

[**JoblogicAPIModelsUpdateJobResponse**](JoblogicAPIModelsUpdateJobResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json-patch+json`, `application/json`, `text/json`, `application/*+json`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful |  -  |
| **400** | Bad Request |  -  |
| **401** | Unauthorized Request |  -  |
| **404** | Not found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1JobRestoreRequiredRevisitPut

> apiV1JobRestoreRequiredRevisitPut(authorization, joblogicAPIModelsRestoreRevisitRequest)

Restore Required Revisit Jobs

### Example

```ts
import {
  Configuration,
  JobApi,
} from '';
import type { ApiV1JobRestoreRequiredRevisitPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsRestoreRevisitRequest | Request model that use to restore Required Revisit Jobs (optional)
    joblogicAPIModelsRestoreRevisitRequest: ...,
  } satisfies ApiV1JobRestoreRequiredRevisitPutRequest;

  try {
    const data = await api.apiV1JobRestoreRequiredRevisitPut(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **authorization** | `string` | Bearer access_token | [Defaults to `undefined`] |
| **joblogicAPIModelsRestoreRevisitRequest** | [JoblogicAPIModelsRestoreRevisitRequest](JoblogicAPIModelsRestoreRevisitRequest.md) | Request model that use to restore Required Revisit Jobs | [Optional] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json-patch+json`, `application/json`, `text/json`, `application/*+json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1JobSearchjobref2Get

> JoblogicAPIModelsSearchUserReferenceResponse apiV1JobSearchjobref2Get(authorization, tenantId, userReferenceId, screen, searchTerm, orderBy)



### Example

```ts
import {
  Configuration,
  JobApi,
} from '';
import type { ApiV1JobSearchjobref2GetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string (optional)
    userReferenceId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // JobLogicMicroserviceCoreContractEntityType (optional)
    screen: ...,
    // string (optional)
    searchTerm: searchTerm_example,
    // JobLogicMicroserviceCoreContractUserReferenceListValueOrderBy (optional)
    orderBy: ...,
  } satisfies ApiV1JobSearchjobref2GetRequest;

  try {
    const data = await api.apiV1JobSearchjobref2Get(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **authorization** | `string` | Bearer access_token | [Defaults to `undefined`] |
| **tenantId** | `string` |  | [Optional] [Defaults to `undefined`] |
| **userReferenceId** | `string` |  | [Optional] [Defaults to `undefined`] |
| **screen** | `JobLogicMicroserviceCoreContractEntityType` |  | [Optional] [Defaults to `undefined`] [Enum: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 38, 39, 40, 41, 42, 43, 44, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 225, 226, 227, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 256, 257, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 275, 276, 281, 282, 283, 284, 285, 286, 287, 288, 290, 291, 292, 293, 294, 295] |
| **searchTerm** | `string` |  | [Optional] [Defaults to `undefined`] |
| **orderBy** | `JobLogicMicroserviceCoreContractUserReferenceListValueOrderBy` |  | [Optional] [Defaults to `undefined`] [Enum: 0, 1] |

### Return type

[**JoblogicAPIModelsSearchUserReferenceResponse**](JoblogicAPIModelsSearchUserReferenceResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1JobSearchtradesGet

> Array&lt;JobLogicMicroserviceCoreContractLibraryResponse&gt; apiV1JobSearchtradesGet(authorization, tenantId, searchTerm)



### Example

```ts
import {
  Configuration,
  JobApi,
} from '';
import type { ApiV1JobSearchtradesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string (optional)
    searchTerm: searchTerm_example,
  } satisfies ApiV1JobSearchtradesGetRequest;

  try {
    const data = await api.apiV1JobSearchtradesGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **authorization** | `string` | Bearer access_token | [Defaults to `undefined`] |
| **tenantId** | `string` |  | [Optional] [Defaults to `undefined`] |
| **searchTerm** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;JobLogicMicroserviceCoreContractLibraryResponse&gt;**](JobLogicMicroserviceCoreContractLibraryResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1JobUpdateprojectnumberPut

> boolean apiV1JobUpdateprojectnumberPut(authorization, joblogicAPIModelsUpdateProjectNumberRequest)



### Example

```ts
import {
  Configuration,
  JobApi,
} from '';
import type { ApiV1JobUpdateprojectnumberPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateProjectNumberRequest (optional)
    joblogicAPIModelsUpdateProjectNumberRequest: ...,
  } satisfies ApiV1JobUpdateprojectnumberPutRequest;

  try {
    const data = await api.apiV1JobUpdateprojectnumberPut(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **authorization** | `string` | Bearer access_token | [Defaults to `undefined`] |
| **joblogicAPIModelsUpdateProjectNumberRequest** | [JoblogicAPIModelsUpdateProjectNumberRequest](JoblogicAPIModelsUpdateProjectNumberRequest.md) |  | [Optional] |

### Return type

**boolean**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json-patch+json`, `application/json`, `text/json`, `application/*+json`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1JobUpdatestatusPut

> JoblogicAPIModelsUpdateJobResponse apiV1JobUpdatestatusPut(authorization, joblogicAPIModelsUpdateJobStatusRequest)



### Example

```ts
import {
  Configuration,
  JobApi,
} from '';
import type { ApiV1JobUpdatestatusPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateJobStatusRequest (optional)
    joblogicAPIModelsUpdateJobStatusRequest: ...,
  } satisfies ApiV1JobUpdatestatusPutRequest;

  try {
    const data = await api.apiV1JobUpdatestatusPut(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **authorization** | `string` | Bearer access_token | [Defaults to `undefined`] |
| **joblogicAPIModelsUpdateJobStatusRequest** | [JoblogicAPIModelsUpdateJobStatusRequest](JoblogicAPIModelsUpdateJobStatusRequest.md) |  | [Optional] |

### Return type

[**JoblogicAPIModelsUpdateJobResponse**](JoblogicAPIModelsUpdateJobResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json-patch+json`, `application/json`, `text/json`, `application/*+json`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

