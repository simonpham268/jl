# PPMQuoteApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1PPMQuoteDelete**](PPMQuoteApi.md#apiv1ppmquotedelete) | **DELETE** /api/v1/PPMQuote | Delete PPM Quote |
| [**apiV1PPMQuoteGet**](PPMQuoteApi.md#apiv1ppmquoteget) | **GET** /api/v1/PPMQuote | Gets PPM Quote Details |
| [**apiV1PPMQuoteGetAllPost**](PPMQuoteApi.md#apiv1ppmquotegetallpost) | **POST** /api/v1/PPMQuote/GetAll | Search PPM Quote by keyword, tags, active status, date,... |
| [**apiV1PPMQuotePost**](PPMQuoteApi.md#apiv1ppmquotepost) | **POST** /api/v1/PPMQuote | Create PPM Quote |
| [**apiV1PPMQuotePut**](PPMQuoteApi.md#apiv1ppmquoteput) | **PUT** /api/v1/PPMQuote | Update PPM Quote |



## apiV1PPMQuoteDelete

> apiV1PPMQuoteDelete(authorization, uniqueId, tenantId)

Delete PPM Quote

### Example

```ts
import {
  Configuration,
  PPMQuoteApi,
} from '';
import type { ApiV1PPMQuoteDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PPMQuoteApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Unique Id of the PPM Quote to delete (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1PPMQuoteDeleteRequest;

  try {
    const data = await api.apiV1PPMQuoteDelete(body);
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
| **uniqueId** | `string` | Unique Id of the PPM Quote to delete | [Optional] [Defaults to `undefined`] |
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


## apiV1PPMQuoteGet

> JoblogicAPIModelsGetPPMQuoteResponse apiV1PPMQuoteGet(authorization, uniqueId, tenantId)

Gets PPM Quote Details

### Example

```ts
import {
  Configuration,
  PPMQuoteApi,
} from '';
import type { ApiV1PPMQuoteGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PPMQuoteApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Unique Id of the PPM Quote to retrieve (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1PPMQuoteGetRequest;

  try {
    const data = await api.apiV1PPMQuoteGet(body);
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
| **uniqueId** | `string` | Unique Id of the PPM Quote to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsGetPPMQuoteResponse**](JoblogicAPIModelsGetPPMQuoteResponse.md)

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


## apiV1PPMQuoteGetAllPost

> JoblogicAPIModelsSearchPPMQuoteResponse apiV1PPMQuoteGetAllPost(authorization, joblogicAPIModelsSearchPPMQuoteRequest)

Search PPM Quote by keyword, tags, active status, date,...

### Example

```ts
import {
  Configuration,
  PPMQuoteApi,
} from '';
import type { ApiV1PPMQuoteGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PPMQuoteApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchPPMQuoteRequest | search conditions (optional)
    joblogicAPIModelsSearchPPMQuoteRequest: ...,
  } satisfies ApiV1PPMQuoteGetAllPostRequest;

  try {
    const data = await api.apiV1PPMQuoteGetAllPost(body);
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
| **joblogicAPIModelsSearchPPMQuoteRequest** | [JoblogicAPIModelsSearchPPMQuoteRequest](JoblogicAPIModelsSearchPPMQuoteRequest.md) | search conditions | [Optional] |

### Return type

[**JoblogicAPIModelsSearchPPMQuoteResponse**](JoblogicAPIModelsSearchPPMQuoteResponse.md)

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


## apiV1PPMQuotePost

> object apiV1PPMQuotePost(authorization, joblogicAPIModelsCreatePPMQuoteRequest)

Create PPM Quote

### Example

```ts
import {
  Configuration,
  PPMQuoteApi,
} from '';
import type { ApiV1PPMQuotePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PPMQuoteApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreatePPMQuoteRequest | PPM Quote to create (optional)
    joblogicAPIModelsCreatePPMQuoteRequest: ...,
  } satisfies ApiV1PPMQuotePostRequest;

  try {
    const data = await api.apiV1PPMQuotePost(body);
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
| **joblogicAPIModelsCreatePPMQuoteRequest** | [JoblogicAPIModelsCreatePPMQuoteRequest](JoblogicAPIModelsCreatePPMQuoteRequest.md) | PPM Quote to create | [Optional] |

### Return type

**object**

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


## apiV1PPMQuotePut

> apiV1PPMQuotePut(authorization, joblogicAPIModelsUpdatePPMQuoteRequest)

Update PPM Quote

### Example

```ts
import {
  Configuration,
  PPMQuoteApi,
} from '';
import type { ApiV1PPMQuotePutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PPMQuoteApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdatePPMQuoteRequest | PPM Quote to update (optional)
    joblogicAPIModelsUpdatePPMQuoteRequest: ...,
  } satisfies ApiV1PPMQuotePutRequest;

  try {
    const data = await api.apiV1PPMQuotePut(body);
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
| **joblogicAPIModelsUpdatePPMQuoteRequest** | [JoblogicAPIModelsUpdatePPMQuoteRequest](JoblogicAPIModelsUpdatePPMQuoteRequest.md) | PPM Quote to update | [Optional] |

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

