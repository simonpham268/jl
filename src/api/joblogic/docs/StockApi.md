# StockApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1StockDelete**](StockApi.md#apiv1stockdelete) | **DELETE** /api/v1/Stock | Delete Stock |
| [**apiV1StockGet**](StockApi.md#apiv1stockget) | **GET** /api/v1/Stock | Gets Stock Details |
| [**apiV1StockGetAllPost**](StockApi.md#apiv1stockgetallpost) | **POST** /api/v1/Stock/GetAll | Search Stock by keyword |
| [**apiV1StockPost**](StockApi.md#apiv1stockpost) | **POST** /api/v1/Stock | Create Stock |
| [**apiV1StockPut**](StockApi.md#apiv1stockput) | **PUT** /api/v1/Stock | Update Stock |
| [**apiV1StockTransferPost**](StockApi.md#apiv1stocktransferpost) | **POST** /api/v1/Stock/transfer | Stock Transfer |



## apiV1StockDelete

> apiV1StockDelete(authorization, id, tenantId)

Delete Stock

### Example

```ts
import {
  Configuration,
  StockApi,
} from '';
import type { ApiV1StockDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StockApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // number | Id of the Stock to Delete (optional)
    id: 56,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1StockDeleteRequest;

  try {
    const data = await api.apiV1StockDelete(body);
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
| **id** | `number` | Id of the Stock to Delete | [Optional] [Defaults to `undefined`] |
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


## apiV1StockGet

> JoblogicAPIModelsGetStockResponse apiV1StockGet(authorization, id, tenantId)

Gets Stock Details

### Example

```ts
import {
  Configuration,
  StockApi,
} from '';
import type { ApiV1StockGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StockApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // number | Id of the Stock to retrieve (optional)
    id: 56,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1StockGetRequest;

  try {
    const data = await api.apiV1StockGet(body);
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
| **id** | `number` | Id of the Stock to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsGetStockResponse**](JoblogicAPIModelsGetStockResponse.md)

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


## apiV1StockGetAllPost

> JoblogicAPIModelsSearchStockResponse apiV1StockGetAllPost(authorization, joblogicAPIModelsSearchStockRequest)

Search Stock by keyword

### Example

```ts
import {
  Configuration,
  StockApi,
} from '';
import type { ApiV1StockGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StockApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchStockRequest | search conditons (optional)
    joblogicAPIModelsSearchStockRequest: ...,
  } satisfies ApiV1StockGetAllPostRequest;

  try {
    const data = await api.apiV1StockGetAllPost(body);
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
| **joblogicAPIModelsSearchStockRequest** | [JoblogicAPIModelsSearchStockRequest](JoblogicAPIModelsSearchStockRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchStockResponse**](JoblogicAPIModelsSearchStockResponse.md)

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


## apiV1StockPost

> JoblogicAPIModelsGetStockResponse apiV1StockPost(authorization, joblogicAPIModelsCreateStockRequest)

Create Stock

### Example

```ts
import {
  Configuration,
  StockApi,
} from '';
import type { ApiV1StockPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StockApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateStockRequest | Stock to create (optional)
    joblogicAPIModelsCreateStockRequest: ...,
  } satisfies ApiV1StockPostRequest;

  try {
    const data = await api.apiV1StockPost(body);
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
| **joblogicAPIModelsCreateStockRequest** | [JoblogicAPIModelsCreateStockRequest](JoblogicAPIModelsCreateStockRequest.md) | Stock to create | [Optional] |

### Return type

[**JoblogicAPIModelsGetStockResponse**](JoblogicAPIModelsGetStockResponse.md)

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


## apiV1StockPut

> apiV1StockPut(authorization, joblogicAPIModelsUpdateStockRequest)

Update Stock

### Example

```ts
import {
  Configuration,
  StockApi,
} from '';
import type { ApiV1StockPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StockApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateStockRequest | Stock to update (optional)
    joblogicAPIModelsUpdateStockRequest: ...,
  } satisfies ApiV1StockPutRequest;

  try {
    const data = await api.apiV1StockPut(body);
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
| **joblogicAPIModelsUpdateStockRequest** | [JoblogicAPIModelsUpdateStockRequest](JoblogicAPIModelsUpdateStockRequest.md) | Stock to update | [Optional] |

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


## apiV1StockTransferPost

> apiV1StockTransferPost(authorization, joblogicAPIModelsTransferStockRequest)

Stock Transfer

### Example

```ts
import {
  Configuration,
  StockApi,
} from '';
import type { ApiV1StockTransferPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StockApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsTransferStockRequest | Stock Transfer (optional)
    joblogicAPIModelsTransferStockRequest: ...,
  } satisfies ApiV1StockTransferPostRequest;

  try {
    const data = await api.apiV1StockTransferPost(body);
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
| **joblogicAPIModelsTransferStockRequest** | [JoblogicAPIModelsTransferStockRequest](JoblogicAPIModelsTransferStockRequest.md) | Stock Transfer | [Optional] |

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

