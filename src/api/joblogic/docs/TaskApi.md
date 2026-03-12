# TaskApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1TaskGetAllPost**](TaskApi.md#apiv1taskgetallpost) | **POST** /api/v1/Task/GetAll | Search Task by keyword and active status |
| [**apiV1TaskGetByIdGet**](TaskApi.md#apiv1taskgetbyidget) | **GET** /api/v1/Task/GetById | Get task by Unique Id and tenant id. |
| [**apiV1TaskLibraryPost**](TaskApi.md#apiv1tasklibrarypost) | **POST** /api/v1/Task/Library | Add new task library |



## apiV1TaskGetAllPost

> JoblogicAPIModelsSearchTaskResponse apiV1TaskGetAllPost(authorization, joblogicAPIModelsSearchTaskRequest)

Search Task by keyword and active status

### Example

```ts
import {
  Configuration,
  TaskApi,
} from '';
import type { ApiV1TaskGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TaskApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchTaskRequest | search conditons (optional)
    joblogicAPIModelsSearchTaskRequest: ...,
  } satisfies ApiV1TaskGetAllPostRequest;

  try {
    const data = await api.apiV1TaskGetAllPost(body);
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
| **joblogicAPIModelsSearchTaskRequest** | [JoblogicAPIModelsSearchTaskRequest](JoblogicAPIModelsSearchTaskRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchTaskResponse**](JoblogicAPIModelsSearchTaskResponse.md)

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


## apiV1TaskGetByIdGet

> JoblogicAPIModelsTaskItemResponse apiV1TaskGetByIdGet(authorization, id, tenantId)

Get task by Unique Id and tenant id.

### Example

```ts
import {
  Configuration,
  TaskApi,
} from '';
import type { ApiV1TaskGetByIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TaskApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Task\'s UniqueId (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Tenant Id (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1TaskGetByIdGetRequest;

  try {
    const data = await api.apiV1TaskGetByIdGet(body);
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
| **id** | `string` | Task\&#39;s UniqueId | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Tenant Id | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsTaskItemResponse**](JoblogicAPIModelsTaskItemResponse.md)

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


## apiV1TaskLibraryPost

> JoblogicAPIModelsTaskItemResponse apiV1TaskLibraryPost(authorization, joblogicAPIModelsCreateTaskRequest)

Add new task library

### Example

```ts
import {
  Configuration,
  TaskApi,
} from '';
import type { ApiV1TaskLibraryPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TaskApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateTaskRequest | Task to add library (optional)
    joblogicAPIModelsCreateTaskRequest: ...,
  } satisfies ApiV1TaskLibraryPostRequest;

  try {
    const data = await api.apiV1TaskLibraryPost(body);
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
| **joblogicAPIModelsCreateTaskRequest** | [JoblogicAPIModelsCreateTaskRequest](JoblogicAPIModelsCreateTaskRequest.md) | Task to add library | [Optional] |

### Return type

[**JoblogicAPIModelsTaskItemResponse**](JoblogicAPIModelsTaskItemResponse.md)

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

