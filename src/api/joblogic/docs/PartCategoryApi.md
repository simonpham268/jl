# PartCategoryApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1PartCategoryDelete**](PartCategoryApi.md#apiv1partcategorydelete) | **DELETE** /api/v1/PartCategory | Delete Part category |
| [**apiV1PartCategoryGet**](PartCategoryApi.md#apiv1partcategoryget) | **GET** /api/v1/PartCategory | Get Part Category details by Id and tenant id. |
| [**apiV1PartCategoryGetAllPost**](PartCategoryApi.md#apiv1partcategorygetallpost) | **POST** /api/v1/PartCategory/GetAll | Search Part categories by keyword |
| [**apiV1PartCategoryPost**](PartCategoryApi.md#apiv1partcategorypost) | **POST** /api/v1/PartCategory | Create Part Category |
| [**apiV1PartCategoryPut**](PartCategoryApi.md#apiv1partcategoryput) | **PUT** /api/v1/PartCategory | Update Part category |



## apiV1PartCategoryDelete

> apiV1PartCategoryDelete(authorization, id, tenantId)

Delete Part category

### Example

```ts
import {
  Configuration,
  PartCategoryApi,
} from '';
import type { ApiV1PartCategoryDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PartCategoryApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1PartCategoryDeleteRequest;

  try {
    const data = await api.apiV1PartCategoryDelete(body);
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
| **id** | `string` |  | [Optional] [Defaults to `undefined`] |
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


## apiV1PartCategoryGet

> JoblogicAPIModelsPartCategoryItemResponse apiV1PartCategoryGet(authorization, id, tenantId)

Get Part Category details by Id and tenant id.

### Example

```ts
import {
  Configuration,
  PartCategoryApi,
} from '';
import type { ApiV1PartCategoryGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PartCategoryApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Part Unique Id (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Tenant Id (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1PartCategoryGetRequest;

  try {
    const data = await api.apiV1PartCategoryGet(body);
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
| **id** | `string` | Part Unique Id | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Tenant Id | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsPartCategoryItemResponse**](JoblogicAPIModelsPartCategoryItemResponse.md)

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


## apiV1PartCategoryGetAllPost

> JoblogicAPIModelsSearchPartCategoryResponse apiV1PartCategoryGetAllPost(authorization, joblogicAPIModelsSearchPartCategoryRequest)

Search Part categories by keyword

### Example

```ts
import {
  Configuration,
  PartCategoryApi,
} from '';
import type { ApiV1PartCategoryGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PartCategoryApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchPartCategoryRequest | search conditons (optional)
    joblogicAPIModelsSearchPartCategoryRequest: ...,
  } satisfies ApiV1PartCategoryGetAllPostRequest;

  try {
    const data = await api.apiV1PartCategoryGetAllPost(body);
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
| **joblogicAPIModelsSearchPartCategoryRequest** | [JoblogicAPIModelsSearchPartCategoryRequest](JoblogicAPIModelsSearchPartCategoryRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchPartCategoryResponse**](JoblogicAPIModelsSearchPartCategoryResponse.md)

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


## apiV1PartCategoryPost

> JoblogicAPIModelsPartCategoryItemResponse apiV1PartCategoryPost(authorization, joblogicAPIModelsCreatePartCategoryRequest)

Create Part Category

### Example

```ts
import {
  Configuration,
  PartCategoryApi,
} from '';
import type { ApiV1PartCategoryPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PartCategoryApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreatePartCategoryRequest | Part category to create (optional)
    joblogicAPIModelsCreatePartCategoryRequest: ...,
  } satisfies ApiV1PartCategoryPostRequest;

  try {
    const data = await api.apiV1PartCategoryPost(body);
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
| **joblogicAPIModelsCreatePartCategoryRequest** | [JoblogicAPIModelsCreatePartCategoryRequest](JoblogicAPIModelsCreatePartCategoryRequest.md) | Part category to create | [Optional] |

### Return type

[**JoblogicAPIModelsPartCategoryItemResponse**](JoblogicAPIModelsPartCategoryItemResponse.md)

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


## apiV1PartCategoryPut

> JoblogicAPIModelsPartCategoryItemResponse apiV1PartCategoryPut(authorization, joblogicAPIModelsUpdatePartCategoryRequest)

Update Part category

### Example

```ts
import {
  Configuration,
  PartCategoryApi,
} from '';
import type { ApiV1PartCategoryPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PartCategoryApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdatePartCategoryRequest | Part category to update (optional)
    joblogicAPIModelsUpdatePartCategoryRequest: ...,
  } satisfies ApiV1PartCategoryPutRequest;

  try {
    const data = await api.apiV1PartCategoryPut(body);
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
| **joblogicAPIModelsUpdatePartCategoryRequest** | [JoblogicAPIModelsUpdatePartCategoryRequest](JoblogicAPIModelsUpdatePartCategoryRequest.md) | Part category to update | [Optional] |

### Return type

[**JoblogicAPIModelsPartCategoryItemResponse**](JoblogicAPIModelsPartCategoryItemResponse.md)

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

