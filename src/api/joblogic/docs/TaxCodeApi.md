# TaxCodeApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1TaxCodeDelete**](TaxCodeApi.md#apiv1taxcodedelete) | **DELETE** /api/v1/TaxCode | Delete  Tax Code |
| [**apiV1TaxCodeGet**](TaxCodeApi.md#apiv1taxcodeget) | **GET** /api/v1/TaxCode | Gets  Tax Code Details |
| [**apiV1TaxCodeGetAllPost**](TaxCodeApi.md#apiv1taxcodegetallpost) | **POST** /api/v1/TaxCode/GetAll | Search  Tax Code by keyword |
| [**apiV1TaxCodePost**](TaxCodeApi.md#apiv1taxcodepost) | **POST** /api/v1/TaxCode | Create  Tax Code |
| [**apiV1TaxCodePut**](TaxCodeApi.md#apiv1taxcodeput) | **PUT** /api/v1/TaxCode | Update  Tax Code |



## apiV1TaxCodeDelete

> apiV1TaxCodeDelete(authorization, uniqueId, tenantId)

Delete  Tax Code

### Example

```ts
import {
  Configuration,
  TaxCodeApi,
} from '';
import type { ApiV1TaxCodeDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TaxCodeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | UniqueId of the  Tax Code to delete (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1TaxCodeDeleteRequest;

  try {
    const data = await api.apiV1TaxCodeDelete(body);
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
| **uniqueId** | `string` | UniqueId of the  Tax Code to delete | [Optional] [Defaults to `undefined`] |
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


## apiV1TaxCodeGet

> JoblogicAPIModelsTaxCodeItemResponse apiV1TaxCodeGet(authorization, uniqueId, tenantId)

Gets  Tax Code Details

### Example

```ts
import {
  Configuration,
  TaxCodeApi,
} from '';
import type { ApiV1TaxCodeGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TaxCodeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | UniqueId of the  Tax Code to retrieve (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1TaxCodeGetRequest;

  try {
    const data = await api.apiV1TaxCodeGet(body);
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
| **uniqueId** | `string` | UniqueId of the  Tax Code to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsTaxCodeItemResponse**](JoblogicAPIModelsTaxCodeItemResponse.md)

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


## apiV1TaxCodeGetAllPost

> JoblogicAPIModelsSearchTaxCodeResponse apiV1TaxCodeGetAllPost(authorization, joblogicAPIModelsSearchTaxCodeRequest)

Search  Tax Code by keyword

### Example

```ts
import {
  Configuration,
  TaxCodeApi,
} from '';
import type { ApiV1TaxCodeGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TaxCodeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchTaxCodeRequest | search conditons (optional)
    joblogicAPIModelsSearchTaxCodeRequest: ...,
  } satisfies ApiV1TaxCodeGetAllPostRequest;

  try {
    const data = await api.apiV1TaxCodeGetAllPost(body);
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
| **joblogicAPIModelsSearchTaxCodeRequest** | [JoblogicAPIModelsSearchTaxCodeRequest](JoblogicAPIModelsSearchTaxCodeRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchTaxCodeResponse**](JoblogicAPIModelsSearchTaxCodeResponse.md)

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


## apiV1TaxCodePost

> JoblogicAPIModelsTaxCodeItemResponse apiV1TaxCodePost(authorization, joblogicAPIModelsCreateTaxCodeRequest)

Create  Tax Code

### Example

```ts
import {
  Configuration,
  TaxCodeApi,
} from '';
import type { ApiV1TaxCodePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TaxCodeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateTaxCodeRequest | Tax Code to create (optional)
    joblogicAPIModelsCreateTaxCodeRequest: ...,
  } satisfies ApiV1TaxCodePostRequest;

  try {
    const data = await api.apiV1TaxCodePost(body);
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
| **joblogicAPIModelsCreateTaxCodeRequest** | [JoblogicAPIModelsCreateTaxCodeRequest](JoblogicAPIModelsCreateTaxCodeRequest.md) | Tax Code to create | [Optional] |

### Return type

[**JoblogicAPIModelsTaxCodeItemResponse**](JoblogicAPIModelsTaxCodeItemResponse.md)

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


## apiV1TaxCodePut

> JoblogicAPIModelsTaxCodeItemResponse apiV1TaxCodePut(authorization, joblogicAPIModelsUpdateTaxCodeRequest)

Update  Tax Code

### Example

```ts
import {
  Configuration,
  TaxCodeApi,
} from '';
import type { ApiV1TaxCodePutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TaxCodeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateTaxCodeRequest | Tax Code to update (optional)
    joblogicAPIModelsUpdateTaxCodeRequest: ...,
  } satisfies ApiV1TaxCodePutRequest;

  try {
    const data = await api.apiV1TaxCodePut(body);
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
| **joblogicAPIModelsUpdateTaxCodeRequest** | [JoblogicAPIModelsUpdateTaxCodeRequest](JoblogicAPIModelsUpdateTaxCodeRequest.md) | Tax Code to update | [Optional] |

### Return type

[**JoblogicAPIModelsTaxCodeItemResponse**](JoblogicAPIModelsTaxCodeItemResponse.md)

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

