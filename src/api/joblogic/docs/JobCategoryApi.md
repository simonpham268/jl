# JobCategoryApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1JobCategoryDelete**](JobCategoryApi.md#apiv1jobcategorydelete) | **DELETE** /api/v1/JobCategory | Delete Job category |
| [**apiV1JobCategoryGet**](JobCategoryApi.md#apiv1jobcategoryget) | **GET** /api/v1/JobCategory | Get Job Category details by Id and tenant id. |
| [**apiV1JobCategoryGetAllPost**](JobCategoryApi.md#apiv1jobcategorygetallpost) | **POST** /api/v1/JobCategory/GetAll | Search Job categories by keyword |
| [**apiV1JobCategoryPost**](JobCategoryApi.md#apiv1jobcategorypost) | **POST** /api/v1/JobCategory | Create Job Category |
| [**apiV1JobCategoryPut**](JobCategoryApi.md#apiv1jobcategoryput) | **PUT** /api/v1/JobCategory | Update Job category |



## apiV1JobCategoryDelete

> apiV1JobCategoryDelete(authorization, uniqueId, tenantId)

Delete Job category

### Example

```ts
import {
  Configuration,
  JobCategoryApi,
} from '';
import type { ApiV1JobCategoryDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobCategoryApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Guid of the part category to delete (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1JobCategoryDeleteRequest;

  try {
    const data = await api.apiV1JobCategoryDelete(body);
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
| **uniqueId** | `string` | Guid of the part category to delete | [Optional] [Defaults to `undefined`] |
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


## apiV1JobCategoryGet

> JoblogicAPIModelsJobCategoryItemResponse apiV1JobCategoryGet(authorization, uniqueId, tenantId)

Get Job Category details by Id and tenant id.

### Example

```ts
import {
  Configuration,
  JobCategoryApi,
} from '';
import type { ApiV1JobCategoryGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobCategoryApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Unique id of the job category (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Tenant Id (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1JobCategoryGetRequest;

  try {
    const data = await api.apiV1JobCategoryGet(body);
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
| **uniqueId** | `string` | Unique id of the job category | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Tenant Id | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsJobCategoryItemResponse**](JoblogicAPIModelsJobCategoryItemResponse.md)

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


## apiV1JobCategoryGetAllPost

> JoblogicAPIModelsSearchJobCategoryResponse apiV1JobCategoryGetAllPost(authorization, joblogicAPIModelsSearchJobCategoryRequest)

Search Job categories by keyword

### Example

```ts
import {
  Configuration,
  JobCategoryApi,
} from '';
import type { ApiV1JobCategoryGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobCategoryApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchJobCategoryRequest | search conditons (optional)
    joblogicAPIModelsSearchJobCategoryRequest: ...,
  } satisfies ApiV1JobCategoryGetAllPostRequest;

  try {
    const data = await api.apiV1JobCategoryGetAllPost(body);
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
| **joblogicAPIModelsSearchJobCategoryRequest** | [JoblogicAPIModelsSearchJobCategoryRequest](JoblogicAPIModelsSearchJobCategoryRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchJobCategoryResponse**](JoblogicAPIModelsSearchJobCategoryResponse.md)

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


## apiV1JobCategoryPost

> JoblogicAPIModelsJobCategoryItemResponse apiV1JobCategoryPost(authorization, joblogicAPIModelsCreateJobCategoryRequest)

Create Job Category

### Example

```ts
import {
  Configuration,
  JobCategoryApi,
} from '';
import type { ApiV1JobCategoryPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobCategoryApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateJobCategoryRequest | Job category to create (optional)
    joblogicAPIModelsCreateJobCategoryRequest: ...,
  } satisfies ApiV1JobCategoryPostRequest;

  try {
    const data = await api.apiV1JobCategoryPost(body);
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
| **joblogicAPIModelsCreateJobCategoryRequest** | [JoblogicAPIModelsCreateJobCategoryRequest](JoblogicAPIModelsCreateJobCategoryRequest.md) | Job category to create | [Optional] |

### Return type

[**JoblogicAPIModelsJobCategoryItemResponse**](JoblogicAPIModelsJobCategoryItemResponse.md)

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


## apiV1JobCategoryPut

> JoblogicAPIModelsJobCategoryItemResponse apiV1JobCategoryPut(authorization, joblogicAPIModelsUpdateJobCategoryRequest)

Update Job category

### Example

```ts
import {
  Configuration,
  JobCategoryApi,
} from '';
import type { ApiV1JobCategoryPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobCategoryApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateJobCategoryRequest | Job category to update (optional)
    joblogicAPIModelsUpdateJobCategoryRequest: ...,
  } satisfies ApiV1JobCategoryPutRequest;

  try {
    const data = await api.apiV1JobCategoryPut(body);
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
| **joblogicAPIModelsUpdateJobCategoryRequest** | [JoblogicAPIModelsUpdateJobCategoryRequest](JoblogicAPIModelsUpdateJobCategoryRequest.md) | Job category to update | [Optional] |

### Return type

[**JoblogicAPIModelsJobCategoryItemResponse**](JoblogicAPIModelsJobCategoryItemResponse.md)

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

