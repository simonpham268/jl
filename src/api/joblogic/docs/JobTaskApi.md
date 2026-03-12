# JobTaskApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1JobTaskGet**](JobTaskApi.md#apiv1jobtaskget) | **GET** /api/v1/JobTask | GET Job Task by Job Unique ID |
| [**apiV1JobTaskPost**](JobTaskApi.md#apiv1jobtaskpost) | **POST** /api/v1/JobTask | Create Contact |



## apiV1JobTaskGet

> Array&lt;JoblogicAPIModelsJobTaskDetailResponse&gt; apiV1JobTaskGet(authorization, uniqueId, tenantId)

GET Job Task by Job Unique ID

### Example

```ts
import {
  Configuration,
  JobTaskApi,
} from '';
import type { ApiV1JobTaskGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobTaskApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Job Unique Id (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1JobTaskGetRequest;

  try {
    const data = await api.apiV1JobTaskGet(body);
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
| **uniqueId** | `string` | Job Unique Id | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;JoblogicAPIModelsJobTaskDetailResponse&gt;**](JoblogicAPIModelsJobTaskDetailResponse.md)

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


## apiV1JobTaskPost

> JoblogicAPIModelsCreateContactResponse apiV1JobTaskPost(authorization, joblogicAPIModelsCreateJobTaskRequest)

Create Contact

### Example

```ts
import {
  Configuration,
  JobTaskApi,
} from '';
import type { ApiV1JobTaskPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobTaskApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateJobTaskRequest | Add task to job (optional)
    joblogicAPIModelsCreateJobTaskRequest: ...,
  } satisfies ApiV1JobTaskPostRequest;

  try {
    const data = await api.apiV1JobTaskPost(body);
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
| **joblogicAPIModelsCreateJobTaskRequest** | [JoblogicAPIModelsCreateJobTaskRequest](JoblogicAPIModelsCreateJobTaskRequest.md) | Add task to job | [Optional] |

### Return type

[**JoblogicAPIModelsCreateContactResponse**](JoblogicAPIModelsCreateContactResponse.md)

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

