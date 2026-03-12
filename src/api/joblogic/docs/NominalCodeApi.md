# NominalCodeApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1NominalCodeDelete**](NominalCodeApi.md#apiv1nominalcodedelete) | **DELETE** /api/v1/NominalCode | Delete  Nominal Code |
| [**apiV1NominalCodeGet**](NominalCodeApi.md#apiv1nominalcodeget) | **GET** /api/v1/NominalCode | Gets  Nominal Code Details |
| [**apiV1NominalCodeGetAllPost**](NominalCodeApi.md#apiv1nominalcodegetallpost) | **POST** /api/v1/NominalCode/GetAll | Search  Nominal Code by keyword |
| [**apiV1NominalCodePost**](NominalCodeApi.md#apiv1nominalcodepost) | **POST** /api/v1/NominalCode | Create  Nominal Code |
| [**apiV1NominalCodePut**](NominalCodeApi.md#apiv1nominalcodeput) | **PUT** /api/v1/NominalCode | Update  Nominal Code |



## apiV1NominalCodeDelete

> apiV1NominalCodeDelete(authorization, uniqueId, tenantId)

Delete  Nominal Code

### Example

```ts
import {
  Configuration,
  NominalCodeApi,
} from '';
import type { ApiV1NominalCodeDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NominalCodeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | UniqueId of the  Nominal Code to delete (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1NominalCodeDeleteRequest;

  try {
    const data = await api.apiV1NominalCodeDelete(body);
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
| **uniqueId** | `string` | UniqueId of the  Nominal Code to delete | [Optional] [Defaults to `undefined`] |
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


## apiV1NominalCodeGet

> JoblogicAPIModelsNominalCodeItemResponse apiV1NominalCodeGet(authorization, uniqueId, tenantId)

Gets  Nominal Code Details

### Example

```ts
import {
  Configuration,
  NominalCodeApi,
} from '';
import type { ApiV1NominalCodeGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NominalCodeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | UniqueId of the  Nominal Code to retrieve (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1NominalCodeGetRequest;

  try {
    const data = await api.apiV1NominalCodeGet(body);
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
| **uniqueId** | `string` | UniqueId of the  Nominal Code to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsNominalCodeItemResponse**](JoblogicAPIModelsNominalCodeItemResponse.md)

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


## apiV1NominalCodeGetAllPost

> JoblogicAPIModelsSearchNominalCodeResponse apiV1NominalCodeGetAllPost(authorization, joblogicAPIModelsSearchNominalCodeRequest)

Search  Nominal Code by keyword

### Example

```ts
import {
  Configuration,
  NominalCodeApi,
} from '';
import type { ApiV1NominalCodeGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NominalCodeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchNominalCodeRequest | search conditons (optional)
    joblogicAPIModelsSearchNominalCodeRequest: ...,
  } satisfies ApiV1NominalCodeGetAllPostRequest;

  try {
    const data = await api.apiV1NominalCodeGetAllPost(body);
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
| **joblogicAPIModelsSearchNominalCodeRequest** | [JoblogicAPIModelsSearchNominalCodeRequest](JoblogicAPIModelsSearchNominalCodeRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchNominalCodeResponse**](JoblogicAPIModelsSearchNominalCodeResponse.md)

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


## apiV1NominalCodePost

> JoblogicAPIModelsNominalCodeItemResponse apiV1NominalCodePost(authorization, joblogicAPIModelsCreateNominalCodeRequest)

Create  Nominal Code

### Example

```ts
import {
  Configuration,
  NominalCodeApi,
} from '';
import type { ApiV1NominalCodePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NominalCodeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateNominalCodeRequest | Nominal Code to create (optional)
    joblogicAPIModelsCreateNominalCodeRequest: ...,
  } satisfies ApiV1NominalCodePostRequest;

  try {
    const data = await api.apiV1NominalCodePost(body);
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
| **joblogicAPIModelsCreateNominalCodeRequest** | [JoblogicAPIModelsCreateNominalCodeRequest](JoblogicAPIModelsCreateNominalCodeRequest.md) | Nominal Code to create | [Optional] |

### Return type

[**JoblogicAPIModelsNominalCodeItemResponse**](JoblogicAPIModelsNominalCodeItemResponse.md)

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


## apiV1NominalCodePut

> JoblogicAPIModelsNominalCodeItemResponse apiV1NominalCodePut(authorization, joblogicAPIModelsUpdateNominalCodeRequest)

Update  Nominal Code

### Example

```ts
import {
  Configuration,
  NominalCodeApi,
} from '';
import type { ApiV1NominalCodePutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NominalCodeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateNominalCodeRequest | Nominal Code to update (optional)
    joblogicAPIModelsUpdateNominalCodeRequest: ...,
  } satisfies ApiV1NominalCodePutRequest;

  try {
    const data = await api.apiV1NominalCodePut(body);
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
| **joblogicAPIModelsUpdateNominalCodeRequest** | [JoblogicAPIModelsUpdateNominalCodeRequest](JoblogicAPIModelsUpdateNominalCodeRequest.md) | Nominal Code to update | [Optional] |

### Return type

[**JoblogicAPIModelsNominalCodeItemResponse**](JoblogicAPIModelsNominalCodeItemResponse.md)

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

