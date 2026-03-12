# AssetApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1AssetDelete**](AssetApi.md#apiv1assetdelete) | **DELETE** /api/v1/Asset | Delete Asset |
| [**apiV1AssetGet**](AssetApi.md#apiv1assetget) | **GET** /api/v1/Asset | Gets Asset Details |
| [**apiV1AssetGetAllPost**](AssetApi.md#apiv1assetgetallpost) | **POST** /api/v1/Asset/GetAll | Search Assets by keyword, tags, condition, reference type and active status |
| [**apiV1AssetGetByIdGet**](AssetApi.md#apiv1assetgetbyidget) | **GET** /api/v1/Asset/GetById | Get Asset Details by auto Id and tenant id. |
| [**apiV1AssetPost**](AssetApi.md#apiv1assetpost) | **POST** /api/v1/Asset | Create Asset |
| [**apiV1AssetPut**](AssetApi.md#apiv1assetput) | **PUT** /api/v1/Asset | Update Asset |



## apiV1AssetDelete

> apiV1AssetDelete(authorization, id, tenantId)

Delete Asset

### Example

```ts
import {
  Configuration,
  AssetApi,
} from '';
import type { ApiV1AssetDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AssetApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Id of the Asset to delete (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1AssetDeleteRequest;

  try {
    const data = await api.apiV1AssetDelete(body);
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
| **id** | `string` | Id of the Asset to delete | [Optional] [Defaults to `undefined`] |
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


## apiV1AssetGet

> JoblogicAPIModelsGetAssetResponse apiV1AssetGet(authorization, id, tenantId, includeAdditionalDetails)

Gets Asset Details

### Example

```ts
import {
  Configuration,
  AssetApi,
} from '';
import type { ApiV1AssetGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AssetApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Id of the asset to retrieve (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // boolean | Optional flag to include additional details of the asset in the response (optional)
    includeAdditionalDetails: true,
  } satisfies ApiV1AssetGetRequest;

  try {
    const data = await api.apiV1AssetGet(body);
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
| **id** | `string` | Id of the asset to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |
| **includeAdditionalDetails** | `boolean` | Optional flag to include additional details of the asset in the response | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsGetAssetResponse**](JoblogicAPIModelsGetAssetResponse.md)

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


## apiV1AssetGetAllPost

> JoblogicAPIModelsSearchAssetResponse apiV1AssetGetAllPost(authorization, joblogicAPIModelsSearchAssetRequest)

Search Assets by keyword, tags, condition, reference type and active status

### Example

```ts
import {
  Configuration,
  AssetApi,
} from '';
import type { ApiV1AssetGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AssetApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchAssetRequest | search conditons (optional)
    joblogicAPIModelsSearchAssetRequest: ...,
  } satisfies ApiV1AssetGetAllPostRequest;

  try {
    const data = await api.apiV1AssetGetAllPost(body);
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
| **joblogicAPIModelsSearchAssetRequest** | [JoblogicAPIModelsSearchAssetRequest](JoblogicAPIModelsSearchAssetRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchAssetResponse**](JoblogicAPIModelsSearchAssetResponse.md)

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


## apiV1AssetGetByIdGet

> JoblogicAPIModelsGetAssetItemResponse apiV1AssetGetByIdGet(authorization, id, tenantId, includeAdditionalDetails)

Get Asset Details by auto Id and tenant id.

### Example

```ts
import {
  Configuration,
  AssetApi,
} from '';
import type { ApiV1AssetGetByIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AssetApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // number | Asset auto Id (optional)
    id: 56,
    // string | Tenant Id (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // boolean | Optional flag to include additional details of the asset in the response (optional)
    includeAdditionalDetails: true,
  } satisfies ApiV1AssetGetByIdGetRequest;

  try {
    const data = await api.apiV1AssetGetByIdGet(body);
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
| **id** | `number` | Asset auto Id | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Tenant Id | [Optional] [Defaults to `undefined`] |
| **includeAdditionalDetails** | `boolean` | Optional flag to include additional details of the asset in the response | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsGetAssetItemResponse**](JoblogicAPIModelsGetAssetItemResponse.md)

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


## apiV1AssetPost

> JoblogicAPIModelsCreateAssetResponse apiV1AssetPost(authorization, joblogicAPIModelsCreateSiteAssetRequest)

Create Asset

### Example

```ts
import {
  Configuration,
  AssetApi,
} from '';
import type { ApiV1AssetPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AssetApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateSiteAssetRequest | Asset to create (optional)
    joblogicAPIModelsCreateSiteAssetRequest: ...,
  } satisfies ApiV1AssetPostRequest;

  try {
    const data = await api.apiV1AssetPost(body);
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
| **joblogicAPIModelsCreateSiteAssetRequest** | [JoblogicAPIModelsCreateSiteAssetRequest](JoblogicAPIModelsCreateSiteAssetRequest.md) | Asset to create | [Optional] |

### Return type

[**JoblogicAPIModelsCreateAssetResponse**](JoblogicAPIModelsCreateAssetResponse.md)

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


## apiV1AssetPut

> JoblogicAPIModelsUpdateAssetResponse apiV1AssetPut(authorization, joblogicAPIModelsUpdateAssetRequest)

Update Asset

### Example

```ts
import {
  Configuration,
  AssetApi,
} from '';
import type { ApiV1AssetPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AssetApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateAssetRequest | Asset to update (optional)
    joblogicAPIModelsUpdateAssetRequest: ...,
  } satisfies ApiV1AssetPutRequest;

  try {
    const data = await api.apiV1AssetPut(body);
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
| **joblogicAPIModelsUpdateAssetRequest** | [JoblogicAPIModelsUpdateAssetRequest](JoblogicAPIModelsUpdateAssetRequest.md) | Asset to update | [Optional] |

### Return type

[**JoblogicAPIModelsUpdateAssetResponse**](JoblogicAPIModelsUpdateAssetResponse.md)

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

