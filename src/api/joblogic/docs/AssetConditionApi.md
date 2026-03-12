# AssetConditionApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1AssetConditionDelete**](AssetConditionApi.md#apiv1assetconditiondelete) | **DELETE** /api/v1/AssetCondition | Delete Asset Condition |
| [**apiV1AssetConditionGet**](AssetConditionApi.md#apiv1assetconditionget) | **GET** /api/v1/AssetCondition | Gets Asset Condition Details |
| [**apiV1AssetConditionGetAllPost**](AssetConditionApi.md#apiv1assetconditiongetallpost) | **POST** /api/v1/AssetCondition/GetAll | Search Asset Condition by keyword |
| [**apiV1AssetConditionPost**](AssetConditionApi.md#apiv1assetconditionpost) | **POST** /api/v1/AssetCondition | Create Asset Condition |
| [**apiV1AssetConditionPut**](AssetConditionApi.md#apiv1assetconditionput) | **PUT** /api/v1/AssetCondition | Update Asset Condition |



## apiV1AssetConditionDelete

> apiV1AssetConditionDelete(authorization, uniqueId, tenantId)

Delete Asset Condition

### Example

```ts
import {
  Configuration,
  AssetConditionApi,
} from '';
import type { ApiV1AssetConditionDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AssetConditionApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | UniqueId of the Asset Condition to Delete (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1AssetConditionDeleteRequest;

  try {
    const data = await api.apiV1AssetConditionDelete(body);
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
| **uniqueId** | `string` | UniqueId of the Asset Condition to Delete | [Optional] [Defaults to `undefined`] |
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


## apiV1AssetConditionGet

> JoblogicAPIModelsGetAssetConditionResponse apiV1AssetConditionGet(authorization, uniqueId, tenantId)

Gets Asset Condition Details

### Example

```ts
import {
  Configuration,
  AssetConditionApi,
} from '';
import type { ApiV1AssetConditionGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AssetConditionApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | UniqueId of the Asset Condition to retrieve (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1AssetConditionGetRequest;

  try {
    const data = await api.apiV1AssetConditionGet(body);
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
| **uniqueId** | `string` | UniqueId of the Asset Condition to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsGetAssetConditionResponse**](JoblogicAPIModelsGetAssetConditionResponse.md)

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


## apiV1AssetConditionGetAllPost

> JoblogicAPIModelsSearchAssetConditionResponse apiV1AssetConditionGetAllPost(authorization, joblogicAPIModelsSearchAssetConditionRequest)

Search Asset Condition by keyword

### Example

```ts
import {
  Configuration,
  AssetConditionApi,
} from '';
import type { ApiV1AssetConditionGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AssetConditionApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchAssetConditionRequest | search conditons (optional)
    joblogicAPIModelsSearchAssetConditionRequest: ...,
  } satisfies ApiV1AssetConditionGetAllPostRequest;

  try {
    const data = await api.apiV1AssetConditionGetAllPost(body);
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
| **joblogicAPIModelsSearchAssetConditionRequest** | [JoblogicAPIModelsSearchAssetConditionRequest](JoblogicAPIModelsSearchAssetConditionRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchAssetConditionResponse**](JoblogicAPIModelsSearchAssetConditionResponse.md)

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


## apiV1AssetConditionPost

> JoblogicAPIModelsCreateAssetConditionResponse apiV1AssetConditionPost(authorization, joblogicAPIModelsCreateAssetConditionRequest)

Create Asset Condition

### Example

```ts
import {
  Configuration,
  AssetConditionApi,
} from '';
import type { ApiV1AssetConditionPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AssetConditionApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateAssetConditionRequest | Asset Condition to create (optional)
    joblogicAPIModelsCreateAssetConditionRequest: ...,
  } satisfies ApiV1AssetConditionPostRequest;

  try {
    const data = await api.apiV1AssetConditionPost(body);
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
| **joblogicAPIModelsCreateAssetConditionRequest** | [JoblogicAPIModelsCreateAssetConditionRequest](JoblogicAPIModelsCreateAssetConditionRequest.md) | Asset Condition to create | [Optional] |

### Return type

[**JoblogicAPIModelsCreateAssetConditionResponse**](JoblogicAPIModelsCreateAssetConditionResponse.md)

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


## apiV1AssetConditionPut

> JoblogicAPIModelsUpdateAssetConditionResponse apiV1AssetConditionPut(authorization, joblogicAPIModelsUpdateAssetConditionRequest)

Update Asset Condition

### Example

```ts
import {
  Configuration,
  AssetConditionApi,
} from '';
import type { ApiV1AssetConditionPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AssetConditionApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateAssetConditionRequest | Asset Condition to update (optional)
    joblogicAPIModelsUpdateAssetConditionRequest: ...,
  } satisfies ApiV1AssetConditionPutRequest;

  try {
    const data = await api.apiV1AssetConditionPut(body);
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
| **joblogicAPIModelsUpdateAssetConditionRequest** | [JoblogicAPIModelsUpdateAssetConditionRequest](JoblogicAPIModelsUpdateAssetConditionRequest.md) | Asset Condition to update | [Optional] |

### Return type

[**JoblogicAPIModelsUpdateAssetConditionResponse**](JoblogicAPIModelsUpdateAssetConditionResponse.md)

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

