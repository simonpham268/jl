# StockAdjustmentApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1StockAdjustmentGet**](StockAdjustmentApi.md#apiv1stockadjustmentget) | **GET** /api/v1/StockAdjustment | Get Stock Adjustment by Id |
| [**apiV1StockAdjustmentGetAllItemPost**](StockAdjustmentApi.md#apiv1stockadjustmentgetallitempost) | **POST** /api/v1/StockAdjustment/GetAllItem | Search Stock Adjustment Items |
| [**apiV1StockAdjustmentGetAllPost**](StockAdjustmentApi.md#apiv1stockadjustmentgetallpost) | **POST** /api/v1/StockAdjustment/GetAll | Search Stock Adjustments |
| [**apiV1StockAdjustmentPost**](StockAdjustmentApi.md#apiv1stockadjustmentpost) | **POST** /api/v1/StockAdjustment | Create Stock Adjustment |



## apiV1StockAdjustmentGet

> JoblogicAPIModelsSearchStockAdjustmentDetailResponse apiV1StockAdjustmentGet(authorization, id, tenantId)

Get Stock Adjustment by Id

### Example

```ts
import {
  Configuration,
  StockAdjustmentApi,
} from '';
import type { ApiV1StockAdjustmentGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StockAdjustmentApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Stock Adjustment Id (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1StockAdjustmentGetRequest;

  try {
    const data = await api.apiV1StockAdjustmentGet(body);
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
| **id** | `string` | Stock Adjustment Id | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsSearchStockAdjustmentDetailResponse**](JoblogicAPIModelsSearchStockAdjustmentDetailResponse.md)

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


## apiV1StockAdjustmentGetAllItemPost

> JoblogicAPIModelsSearchStockAdjustmentItemsResponse apiV1StockAdjustmentGetAllItemPost(authorization, joblogicAPIModelsStockAdjustmentItemsSearchRequest)

Search Stock Adjustment Items

### Example

```ts
import {
  Configuration,
  StockAdjustmentApi,
} from '';
import type { ApiV1StockAdjustmentGetAllItemPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StockAdjustmentApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsStockAdjustmentItemsSearchRequest | search (optional)
    joblogicAPIModelsStockAdjustmentItemsSearchRequest: ...,
  } satisfies ApiV1StockAdjustmentGetAllItemPostRequest;

  try {
    const data = await api.apiV1StockAdjustmentGetAllItemPost(body);
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
| **joblogicAPIModelsStockAdjustmentItemsSearchRequest** | [JoblogicAPIModelsStockAdjustmentItemsSearchRequest](JoblogicAPIModelsStockAdjustmentItemsSearchRequest.md) | search | [Optional] |

### Return type

[**JoblogicAPIModelsSearchStockAdjustmentItemsResponse**](JoblogicAPIModelsSearchStockAdjustmentItemsResponse.md)

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


## apiV1StockAdjustmentGetAllPost

> JoblogicAPIModelsSearchStockAdjustmentResponse apiV1StockAdjustmentGetAllPost(authorization, joblogicAPIModelsStockAdjustmentSearchRequest)

Search Stock Adjustments

### Example

```ts
import {
  Configuration,
  StockAdjustmentApi,
} from '';
import type { ApiV1StockAdjustmentGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StockAdjustmentApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsStockAdjustmentSearchRequest | Search conditions (optional)
    joblogicAPIModelsStockAdjustmentSearchRequest: ...,
  } satisfies ApiV1StockAdjustmentGetAllPostRequest;

  try {
    const data = await api.apiV1StockAdjustmentGetAllPost(body);
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
| **joblogicAPIModelsStockAdjustmentSearchRequest** | [JoblogicAPIModelsStockAdjustmentSearchRequest](JoblogicAPIModelsStockAdjustmentSearchRequest.md) | Search conditions | [Optional] |

### Return type

[**JoblogicAPIModelsSearchStockAdjustmentResponse**](JoblogicAPIModelsSearchStockAdjustmentResponse.md)

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


## apiV1StockAdjustmentPost

> JoblogicAPIModelsStockAdjustmentCreateRequest apiV1StockAdjustmentPost(authorization, joblogicAPIModelsStockAdjustmentCreateRequest)

Create Stock Adjustment

### Example

```ts
import {
  Configuration,
  StockAdjustmentApi,
} from '';
import type { ApiV1StockAdjustmentPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StockAdjustmentApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsStockAdjustmentCreateRequest | Create Stock Adjustment (optional)
    joblogicAPIModelsStockAdjustmentCreateRequest: ...,
  } satisfies ApiV1StockAdjustmentPostRequest;

  try {
    const data = await api.apiV1StockAdjustmentPost(body);
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
| **joblogicAPIModelsStockAdjustmentCreateRequest** | [JoblogicAPIModelsStockAdjustmentCreateRequest](JoblogicAPIModelsStockAdjustmentCreateRequest.md) | Create Stock Adjustment | [Optional] |

### Return type

[**JoblogicAPIModelsStockAdjustmentCreateRequest**](JoblogicAPIModelsStockAdjustmentCreateRequest.md)

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

