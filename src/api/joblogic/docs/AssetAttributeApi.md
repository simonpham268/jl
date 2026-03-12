# AssetAttributeApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1AssetAttributeDeleteAssetAttributeByAssetIdPost**](AssetAttributeApi.md#apiv1assetattributedeleteassetattributebyassetidpost) | **POST** /api/v1/AssetAttribute/DeleteAssetAttributeByAssetId | Delete Asset Attributes to asset by asset id |
| [**apiV1AssetAttributeDeleteAssetAttributeByAssetUniqueIdPost**](AssetAttributeApi.md#apiv1assetattributedeleteassetattributebyassetuniqueidpost) | **POST** /api/v1/AssetAttribute/DeleteAssetAttributeByAssetUniqueId | Delete Asset Attributes to asset by asset unique id |
| [**apiV1AssetAttributeGetAllLibraryAssetAttributePost**](AssetAttributeApi.md#apiv1assetattributegetalllibraryassetattributepost) | **POST** /api/v1/AssetAttribute/GetAllLibraryAssetAttribute | Search Library Assets Attribute by keyword |
| [**apiV1AssetAttributeGetByAssetIdGet**](AssetAttributeApi.md#apiv1assetattributegetbyassetidget) | **GET** /api/v1/AssetAttribute/GetByAssetId | Get all asset attribute of an asset by asset id |
| [**apiV1AssetAttributeGetByAssetUniqueIdGet**](AssetAttributeApi.md#apiv1assetattributegetbyassetuniqueidget) | **GET** /api/v1/AssetAttribute/GetByAssetUniqueId | Get all asset attribute of an asset by asset unique id |
| [**apiV1AssetAttributeUpsertAssetAttributeByAssetIdPost**](AssetAttributeApi.md#apiv1assetattributeupsertassetattributebyassetidpost) | **POST** /api/v1/AssetAttribute/UpsertAssetAttributeByAssetId | Upsert Asset Attributes to asset by asset id |
| [**apiV1AssetAttributeUpsertAssetAttributeByAssetUniqueIdPost**](AssetAttributeApi.md#apiv1assetattributeupsertassetattributebyassetuniqueidpost) | **POST** /api/v1/AssetAttribute/UpsertAssetAttributeByAssetUniqueId | Upsert Asset Attributes to asset by asset unique id |



## apiV1AssetAttributeDeleteAssetAttributeByAssetIdPost

> JoblogicAPIModelsGetAssetAttributeByAssetIdResponse apiV1AssetAttributeDeleteAssetAttributeByAssetIdPost(authorization, joblogicAPIModelsDeleteAssetAttributeByAssetIdRequest)

Delete Asset Attributes to asset by asset id

### Example

```ts
import {
  Configuration,
  AssetAttributeApi,
} from '';
import type { ApiV1AssetAttributeDeleteAssetAttributeByAssetIdPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AssetAttributeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsDeleteAssetAttributeByAssetIdRequest | Delete Asset Attributes to asset by asset id (optional)
    joblogicAPIModelsDeleteAssetAttributeByAssetIdRequest: ...,
  } satisfies ApiV1AssetAttributeDeleteAssetAttributeByAssetIdPostRequest;

  try {
    const data = await api.apiV1AssetAttributeDeleteAssetAttributeByAssetIdPost(body);
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
| **joblogicAPIModelsDeleteAssetAttributeByAssetIdRequest** | [JoblogicAPIModelsDeleteAssetAttributeByAssetIdRequest](JoblogicAPIModelsDeleteAssetAttributeByAssetIdRequest.md) | Delete Asset Attributes to asset by asset id | [Optional] |

### Return type

[**JoblogicAPIModelsGetAssetAttributeByAssetIdResponse**](JoblogicAPIModelsGetAssetAttributeByAssetIdResponse.md)

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


## apiV1AssetAttributeDeleteAssetAttributeByAssetUniqueIdPost

> JoblogicAPIModelsGetAssetAttributeByAssetUniqueIdResponse apiV1AssetAttributeDeleteAssetAttributeByAssetUniqueIdPost(authorization, joblogicAPIModelsDeleteAssetAttributeByAssetUniqueIdRequest)

Delete Asset Attributes to asset by asset unique id

### Example

```ts
import {
  Configuration,
  AssetAttributeApi,
} from '';
import type { ApiV1AssetAttributeDeleteAssetAttributeByAssetUniqueIdPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AssetAttributeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsDeleteAssetAttributeByAssetUniqueIdRequest | Upsert Asset Attributes to asset by asset unique id (optional)
    joblogicAPIModelsDeleteAssetAttributeByAssetUniqueIdRequest: ...,
  } satisfies ApiV1AssetAttributeDeleteAssetAttributeByAssetUniqueIdPostRequest;

  try {
    const data = await api.apiV1AssetAttributeDeleteAssetAttributeByAssetUniqueIdPost(body);
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
| **joblogicAPIModelsDeleteAssetAttributeByAssetUniqueIdRequest** | [JoblogicAPIModelsDeleteAssetAttributeByAssetUniqueIdRequest](JoblogicAPIModelsDeleteAssetAttributeByAssetUniqueIdRequest.md) | Upsert Asset Attributes to asset by asset unique id | [Optional] |

### Return type

[**JoblogicAPIModelsGetAssetAttributeByAssetUniqueIdResponse**](JoblogicAPIModelsGetAssetAttributeByAssetUniqueIdResponse.md)

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


## apiV1AssetAttributeGetAllLibraryAssetAttributePost

> JoblogicAPIModelsSearchLibraryAssetAttributeResponse apiV1AssetAttributeGetAllLibraryAssetAttributePost(authorization, joblogicAPIModelsSearchLibraryAssetAttributeRequest)

Search Library Assets Attribute by keyword

### Example

```ts
import {
  Configuration,
  AssetAttributeApi,
} from '';
import type { ApiV1AssetAttributeGetAllLibraryAssetAttributePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AssetAttributeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchLibraryAssetAttributeRequest | search conditons (optional)
    joblogicAPIModelsSearchLibraryAssetAttributeRequest: ...,
  } satisfies ApiV1AssetAttributeGetAllLibraryAssetAttributePostRequest;

  try {
    const data = await api.apiV1AssetAttributeGetAllLibraryAssetAttributePost(body);
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
| **joblogicAPIModelsSearchLibraryAssetAttributeRequest** | [JoblogicAPIModelsSearchLibraryAssetAttributeRequest](JoblogicAPIModelsSearchLibraryAssetAttributeRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchLibraryAssetAttributeResponse**](JoblogicAPIModelsSearchLibraryAssetAttributeResponse.md)

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


## apiV1AssetAttributeGetByAssetIdGet

> JoblogicAPIModelsGetAssetAttributeByAssetIdResponse apiV1AssetAttributeGetByAssetIdGet(authorization, assetId, tenantId)

Get all asset attribute of an asset by asset id

### Example

```ts
import {
  Configuration,
  AssetAttributeApi,
} from '';
import type { ApiV1AssetAttributeGetByAssetIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AssetAttributeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // number | asset id (optional)
    assetId: 56,
    // string | tenant id (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1AssetAttributeGetByAssetIdGetRequest;

  try {
    const data = await api.apiV1AssetAttributeGetByAssetIdGet(body);
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
| **assetId** | `number` | asset id | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | tenant id | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsGetAssetAttributeByAssetIdResponse**](JoblogicAPIModelsGetAssetAttributeByAssetIdResponse.md)

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


## apiV1AssetAttributeGetByAssetUniqueIdGet

> JoblogicAPIModelsGetAssetAttributeByAssetUniqueIdResponse apiV1AssetAttributeGetByAssetUniqueIdGet(authorization, assetUniqueId, tenantId)

Get all asset attribute of an asset by asset unique id

### Example

```ts
import {
  Configuration,
  AssetAttributeApi,
} from '';
import type { ApiV1AssetAttributeGetByAssetUniqueIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AssetAttributeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | asset unique id (optional)
    assetUniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | tenant id (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1AssetAttributeGetByAssetUniqueIdGetRequest;

  try {
    const data = await api.apiV1AssetAttributeGetByAssetUniqueIdGet(body);
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
| **assetUniqueId** | `string` | asset unique id | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | tenant id | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsGetAssetAttributeByAssetUniqueIdResponse**](JoblogicAPIModelsGetAssetAttributeByAssetUniqueIdResponse.md)

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


## apiV1AssetAttributeUpsertAssetAttributeByAssetIdPost

> JoblogicAPIModelsGetAssetAttributeByAssetIdResponse apiV1AssetAttributeUpsertAssetAttributeByAssetIdPost(authorization, joblogicAPIModelsUpsertAssetAttributeByAssetIdRequest)

Upsert Asset Attributes to asset by asset id

### Example

```ts
import {
  Configuration,
  AssetAttributeApi,
} from '';
import type { ApiV1AssetAttributeUpsertAssetAttributeByAssetIdPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AssetAttributeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpsertAssetAttributeByAssetIdRequest | Upsert Asset Attributes to asset by asset id (optional)
    joblogicAPIModelsUpsertAssetAttributeByAssetIdRequest: ...,
  } satisfies ApiV1AssetAttributeUpsertAssetAttributeByAssetIdPostRequest;

  try {
    const data = await api.apiV1AssetAttributeUpsertAssetAttributeByAssetIdPost(body);
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
| **joblogicAPIModelsUpsertAssetAttributeByAssetIdRequest** | [JoblogicAPIModelsUpsertAssetAttributeByAssetIdRequest](JoblogicAPIModelsUpsertAssetAttributeByAssetIdRequest.md) | Upsert Asset Attributes to asset by asset id | [Optional] |

### Return type

[**JoblogicAPIModelsGetAssetAttributeByAssetIdResponse**](JoblogicAPIModelsGetAssetAttributeByAssetIdResponse.md)

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


## apiV1AssetAttributeUpsertAssetAttributeByAssetUniqueIdPost

> JoblogicAPIModelsGetAssetAttributeByAssetUniqueIdResponse apiV1AssetAttributeUpsertAssetAttributeByAssetUniqueIdPost(authorization, joblogicAPIModelsUpsertAssetAttributeByAssetUniqueIdRequest)

Upsert Asset Attributes to asset by asset unique id

### Example

```ts
import {
  Configuration,
  AssetAttributeApi,
} from '';
import type { ApiV1AssetAttributeUpsertAssetAttributeByAssetUniqueIdPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AssetAttributeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpsertAssetAttributeByAssetUniqueIdRequest | Upsert Asset Attributes to asset by asset unique id (optional)
    joblogicAPIModelsUpsertAssetAttributeByAssetUniqueIdRequest: ...,
  } satisfies ApiV1AssetAttributeUpsertAssetAttributeByAssetUniqueIdPostRequest;

  try {
    const data = await api.apiV1AssetAttributeUpsertAssetAttributeByAssetUniqueIdPost(body);
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
| **joblogicAPIModelsUpsertAssetAttributeByAssetUniqueIdRequest** | [JoblogicAPIModelsUpsertAssetAttributeByAssetUniqueIdRequest](JoblogicAPIModelsUpsertAssetAttributeByAssetUniqueIdRequest.md) | Upsert Asset Attributes to asset by asset unique id | [Optional] |

### Return type

[**JoblogicAPIModelsGetAssetAttributeByAssetUniqueIdResponse**](JoblogicAPIModelsGetAssetAttributeByAssetUniqueIdResponse.md)

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

