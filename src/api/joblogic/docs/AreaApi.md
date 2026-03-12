# AreaApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1AreaDelete**](AreaApi.md#apiv1areadelete) | **DELETE** /api/v1/Area | Delete Area |
| [**apiV1AreaGet**](AreaApi.md#apiv1areaget) | **GET** /api/v1/Area | Gets Area Details |
| [**apiV1AreaGetAllPost**](AreaApi.md#apiv1areagetallpost) | **POST** /api/v1/Area/GetAll | Search Area by keyword |
| [**apiV1AreaPost**](AreaApi.md#apiv1areapost) | **POST** /api/v1/Area | Create Area |
| [**apiV1AreaPut**](AreaApi.md#apiv1areaput) | **PUT** /api/v1/Area | Update Area |



## apiV1AreaDelete

> apiV1AreaDelete(authorization, uniqueId, tenantId)

Delete Area

### Example

```ts
import {
  Configuration,
  AreaApi,
} from '';
import type { ApiV1AreaDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AreaApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | UniqueId of the Area to Delete (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1AreaDeleteRequest;

  try {
    const data = await api.apiV1AreaDelete(body);
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
| **uniqueId** | `string` | UniqueId of the Area to Delete | [Optional] [Defaults to `undefined`] |
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


## apiV1AreaGet

> JoblogicAPIModelsGetAreaResponse apiV1AreaGet(authorization, uniqueId, tenantId)

Gets Area Details

### Example

```ts
import {
  Configuration,
  AreaApi,
} from '';
import type { ApiV1AreaGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AreaApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | UniqueId of the Area to retrieve (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1AreaGetRequest;

  try {
    const data = await api.apiV1AreaGet(body);
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
| **uniqueId** | `string` | UniqueId of the Area to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsGetAreaResponse**](JoblogicAPIModelsGetAreaResponse.md)

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


## apiV1AreaGetAllPost

> JoblogicAPIModelsSearchAreaResponse apiV1AreaGetAllPost(authorization, joblogicAPIModelsSearchAreaRequest)

Search Area by keyword

### Example

```ts
import {
  Configuration,
  AreaApi,
} from '';
import type { ApiV1AreaGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AreaApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchAreaRequest | search conditons (optional)
    joblogicAPIModelsSearchAreaRequest: ...,
  } satisfies ApiV1AreaGetAllPostRequest;

  try {
    const data = await api.apiV1AreaGetAllPost(body);
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
| **joblogicAPIModelsSearchAreaRequest** | [JoblogicAPIModelsSearchAreaRequest](JoblogicAPIModelsSearchAreaRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchAreaResponse**](JoblogicAPIModelsSearchAreaResponse.md)

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


## apiV1AreaPost

> JoblogicAPIModelsCreateAreaResponse apiV1AreaPost(authorization, joblogicAPIModelsCreateAreaRequest)

Create Area

### Example

```ts
import {
  Configuration,
  AreaApi,
} from '';
import type { ApiV1AreaPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AreaApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateAreaRequest | Area to create (optional)
    joblogicAPIModelsCreateAreaRequest: ...,
  } satisfies ApiV1AreaPostRequest;

  try {
    const data = await api.apiV1AreaPost(body);
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
| **joblogicAPIModelsCreateAreaRequest** | [JoblogicAPIModelsCreateAreaRequest](JoblogicAPIModelsCreateAreaRequest.md) | Area to create | [Optional] |

### Return type

[**JoblogicAPIModelsCreateAreaResponse**](JoblogicAPIModelsCreateAreaResponse.md)

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


## apiV1AreaPut

> JoblogicAPIModelsUpdateAreaResponse apiV1AreaPut(authorization, joblogicAPIModelsUpdateAreaRequest)

Update Area

### Example

```ts
import {
  Configuration,
  AreaApi,
} from '';
import type { ApiV1AreaPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AreaApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateAreaRequest | Area to update (optional)
    joblogicAPIModelsUpdateAreaRequest: ...,
  } satisfies ApiV1AreaPutRequest;

  try {
    const data = await api.apiV1AreaPut(body);
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
| **joblogicAPIModelsUpdateAreaRequest** | [JoblogicAPIModelsUpdateAreaRequest](JoblogicAPIModelsUpdateAreaRequest.md) | Area to update | [Optional] |

### Return type

[**JoblogicAPIModelsUpdateAreaResponse**](JoblogicAPIModelsUpdateAreaResponse.md)

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

