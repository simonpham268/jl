# AssetClassApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1AssetClassDelete**](AssetClassApi.md#apiv1assetclassdelete) | **DELETE** /api/v1/AssetClass | Delete Asset Class |
| [**apiV1AssetClassGet**](AssetClassApi.md#apiv1assetclassget) | **GET** /api/v1/AssetClass | Gets Asset Class Details |
| [**apiV1AssetClassGetAllPost**](AssetClassApi.md#apiv1assetclassgetallpost) | **POST** /api/v1/AssetClass/GetAll | Search Asset Class by keyword |
| [**apiV1AssetClassPost**](AssetClassApi.md#apiv1assetclasspost) | **POST** /api/v1/AssetClass | Create Asset Class |
| [**apiV1AssetClassPut**](AssetClassApi.md#apiv1assetclassput) | **PUT** /api/v1/AssetClass | Update Asset Class |



## apiV1AssetClassDelete

> apiV1AssetClassDelete(authorization, uniqueId, tenantId)

Delete Asset Class

### Example

```ts
import {
  Configuration,
  AssetClassApi,
} from '';
import type { ApiV1AssetClassDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AssetClassApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | UniqueId of the Asset Class to delete (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1AssetClassDeleteRequest;

  try {
    const data = await api.apiV1AssetClassDelete(body);
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
| **uniqueId** | `string` | UniqueId of the Asset Class to delete | [Optional] [Defaults to `undefined`] |
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


## apiV1AssetClassGet

> JoblogicAPIModelsGetAssetClassResponse apiV1AssetClassGet(authorization, uniqueId, tenantId)

Gets Asset Class Details

### Example

```ts
import {
  Configuration,
  AssetClassApi,
} from '';
import type { ApiV1AssetClassGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AssetClassApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | UniqueId of the Asset Class to retrieve (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1AssetClassGetRequest;

  try {
    const data = await api.apiV1AssetClassGet(body);
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
| **uniqueId** | `string` | UniqueId of the Asset Class to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsGetAssetClassResponse**](JoblogicAPIModelsGetAssetClassResponse.md)

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


## apiV1AssetClassGetAllPost

> JoblogicAPIModelsSearchAssetClassResponse apiV1AssetClassGetAllPost(authorization, joblogicAPIModelsSearchAssetClassRequest)

Search Asset Class by keyword

### Example

```ts
import {
  Configuration,
  AssetClassApi,
} from '';
import type { ApiV1AssetClassGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AssetClassApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchAssetClassRequest | search conditons (optional)
    joblogicAPIModelsSearchAssetClassRequest: ...,
  } satisfies ApiV1AssetClassGetAllPostRequest;

  try {
    const data = await api.apiV1AssetClassGetAllPost(body);
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
| **joblogicAPIModelsSearchAssetClassRequest** | [JoblogicAPIModelsSearchAssetClassRequest](JoblogicAPIModelsSearchAssetClassRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchAssetClassResponse**](JoblogicAPIModelsSearchAssetClassResponse.md)

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


## apiV1AssetClassPost

> JoblogicAPIModelsCreateAssetClassResponse apiV1AssetClassPost(authorization, joblogicAPIModelsCreateAssetClassRequest)

Create Asset Class

### Example

```ts
import {
  Configuration,
  AssetClassApi,
} from '';
import type { ApiV1AssetClassPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AssetClassApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateAssetClassRequest | Asset Class to create (optional)
    joblogicAPIModelsCreateAssetClassRequest: ...,
  } satisfies ApiV1AssetClassPostRequest;

  try {
    const data = await api.apiV1AssetClassPost(body);
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
| **joblogicAPIModelsCreateAssetClassRequest** | [JoblogicAPIModelsCreateAssetClassRequest](JoblogicAPIModelsCreateAssetClassRequest.md) | Asset Class to create | [Optional] |

### Return type

[**JoblogicAPIModelsCreateAssetClassResponse**](JoblogicAPIModelsCreateAssetClassResponse.md)

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


## apiV1AssetClassPut

> JoblogicAPIModelsUpdateAssetClassResponse apiV1AssetClassPut(authorization, joblogicAPIModelsUpdateAssetClassRequest)

Update Asset Class

### Example

```ts
import {
  Configuration,
  AssetClassApi,
} from '';
import type { ApiV1AssetClassPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AssetClassApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateAssetClassRequest | Asset Class to update (optional)
    joblogicAPIModelsUpdateAssetClassRequest: ...,
  } satisfies ApiV1AssetClassPutRequest;

  try {
    const data = await api.apiV1AssetClassPut(body);
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
| **joblogicAPIModelsUpdateAssetClassRequest** | [JoblogicAPIModelsUpdateAssetClassRequest](JoblogicAPIModelsUpdateAssetClassRequest.md) | Asset Class to update | [Optional] |

### Return type

[**JoblogicAPIModelsUpdateAssetClassResponse**](JoblogicAPIModelsUpdateAssetClassResponse.md)

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

