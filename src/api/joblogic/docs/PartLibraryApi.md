# PartLibraryApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1PartLibraryDelete**](PartLibraryApi.md#apiv1partlibrarydelete) | **DELETE** /api/v1/PartLibrary | Delete Part Library |
| [**apiV1PartLibraryGet**](PartLibraryApi.md#apiv1partlibraryget) | **GET** /api/v1/PartLibrary | Get Part Library details by Id and tenant id. |
| [**apiV1PartLibraryGetAllPost**](PartLibraryApi.md#apiv1partlibrarygetallpost) | **POST** /api/v1/PartLibrary/GetAll | Search Part categories by keyword |
| [**apiV1PartLibraryPost**](PartLibraryApi.md#apiv1partlibrarypost) | **POST** /api/v1/PartLibrary | Create Part Library |
| [**apiV1PartLibraryPut**](PartLibraryApi.md#apiv1partlibraryput) | **PUT** /api/v1/PartLibrary | Update Part Library |
| [**apiV1PartLibrarySetDefaultPatch**](PartLibraryApi.md#apiv1partlibrarysetdefaultpatch) | **PATCH** /api/v1/PartLibrary/SetDefault | Set default Part Library |



## apiV1PartLibraryDelete

> apiV1PartLibraryDelete(authorization, id, tenantId)

Delete Part Library

### Example

```ts
import {
  Configuration,
  PartLibraryApi,
} from '';
import type { ApiV1PartLibraryDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PartLibraryApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // number | Id of the Part Library to delete (optional)
    id: 56,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1PartLibraryDeleteRequest;

  try {
    const data = await api.apiV1PartLibraryDelete(body);
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
| **id** | `number` | Id of the Part Library to delete | [Optional] [Defaults to `undefined`] |
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


## apiV1PartLibraryGet

> JoblogicAPIModelsPartLibraryItemResponse apiV1PartLibraryGet(authorization, id, tenantId)

Get Part Library details by Id and tenant id.

### Example

```ts
import {
  Configuration,
  PartLibraryApi,
} from '';
import type { ApiV1PartLibraryGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PartLibraryApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // number (optional)
    id: 56,
    // string | Tenant Id (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1PartLibraryGetRequest;

  try {
    const data = await api.apiV1PartLibraryGet(body);
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
| **id** | `number` |  | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Tenant Id | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsPartLibraryItemResponse**](JoblogicAPIModelsPartLibraryItemResponse.md)

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


## apiV1PartLibraryGetAllPost

> JoblogicAPIModelsSearchPartLibraryResponse apiV1PartLibraryGetAllPost(authorization, joblogicAPIModelsSearchPartLibraryRequest)

Search Part categories by keyword

### Example

```ts
import {
  Configuration,
  PartLibraryApi,
} from '';
import type { ApiV1PartLibraryGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PartLibraryApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchPartLibraryRequest | search conditons (optional)
    joblogicAPIModelsSearchPartLibraryRequest: ...,
  } satisfies ApiV1PartLibraryGetAllPostRequest;

  try {
    const data = await api.apiV1PartLibraryGetAllPost(body);
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
| **joblogicAPIModelsSearchPartLibraryRequest** | [JoblogicAPIModelsSearchPartLibraryRequest](JoblogicAPIModelsSearchPartLibraryRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchPartLibraryResponse**](JoblogicAPIModelsSearchPartLibraryResponse.md)

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


## apiV1PartLibraryPost

> JoblogicAPIModelsPartLibraryItemResponse apiV1PartLibraryPost(authorization, joblogicAPIModelsCreatePartLibraryRequest)

Create Part Library

### Example

```ts
import {
  Configuration,
  PartLibraryApi,
} from '';
import type { ApiV1PartLibraryPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PartLibraryApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreatePartLibraryRequest | Part Library to create (optional)
    joblogicAPIModelsCreatePartLibraryRequest: ...,
  } satisfies ApiV1PartLibraryPostRequest;

  try {
    const data = await api.apiV1PartLibraryPost(body);
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
| **joblogicAPIModelsCreatePartLibraryRequest** | [JoblogicAPIModelsCreatePartLibraryRequest](JoblogicAPIModelsCreatePartLibraryRequest.md) | Part Library to create | [Optional] |

### Return type

[**JoblogicAPIModelsPartLibraryItemResponse**](JoblogicAPIModelsPartLibraryItemResponse.md)

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


## apiV1PartLibraryPut

> JoblogicAPIModelsPartLibraryItemResponse apiV1PartLibraryPut(authorization, joblogicAPIModelsUpdatePartLibraryRequest)

Update Part Library

### Example

```ts
import {
  Configuration,
  PartLibraryApi,
} from '';
import type { ApiV1PartLibraryPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PartLibraryApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdatePartLibraryRequest | Part Library to update (optional)
    joblogicAPIModelsUpdatePartLibraryRequest: ...,
  } satisfies ApiV1PartLibraryPutRequest;

  try {
    const data = await api.apiV1PartLibraryPut(body);
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
| **joblogicAPIModelsUpdatePartLibraryRequest** | [JoblogicAPIModelsUpdatePartLibraryRequest](JoblogicAPIModelsUpdatePartLibraryRequest.md) | Part Library to update | [Optional] |

### Return type

[**JoblogicAPIModelsPartLibraryItemResponse**](JoblogicAPIModelsPartLibraryItemResponse.md)

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


## apiV1PartLibrarySetDefaultPatch

> apiV1PartLibrarySetDefaultPatch(authorization, joblogicAPIModelsSetDefaultPartLibraryRequest)

Set default Part Library

### Example

```ts
import {
  Configuration,
  PartLibraryApi,
} from '';
import type { ApiV1PartLibrarySetDefaultPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PartLibraryApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSetDefaultPartLibraryRequest | Part Library to update (optional)
    joblogicAPIModelsSetDefaultPartLibraryRequest: ...,
  } satisfies ApiV1PartLibrarySetDefaultPatchRequest;

  try {
    const data = await api.apiV1PartLibrarySetDefaultPatch(body);
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
| **joblogicAPIModelsSetDefaultPartLibraryRequest** | [JoblogicAPIModelsSetDefaultPartLibraryRequest](JoblogicAPIModelsSetDefaultPartLibraryRequest.md) | Part Library to update | [Optional] |

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
| **200** | Successful |  -  |
| **400** | Bad Request |  -  |
| **401** | Unauthorized Request |  -  |
| **404** | Not found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

