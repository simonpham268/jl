# StockRackApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1StockRackDelete**](StockRackApi.md#apiv1stockrackdelete) | **DELETE** /api/v1/StockRack | Delete Stock Rack |
| [**apiV1StockRackGet**](StockRackApi.md#apiv1stockrackget) | **GET** /api/v1/StockRack | Gets Stock Rack Details |
| [**apiV1StockRackGetAllPost**](StockRackApi.md#apiv1stockrackgetallpost) | **POST** /api/v1/StockRack/GetAll | Search Stock Rack by keyword |
| [**apiV1StockRackPost**](StockRackApi.md#apiv1stockrackpost) | **POST** /api/v1/StockRack | Create Stock Rack |
| [**apiV1StockRackPut**](StockRackApi.md#apiv1stockrackput) | **PUT** /api/v1/StockRack | Update Stock Rack |



## apiV1StockRackDelete

> apiV1StockRackDelete(authorization, id, tenantId)

Delete Stock Rack

### Example

```ts
import {
  Configuration,
  StockRackApi,
} from '';
import type { ApiV1StockRackDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StockRackApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // number | Id of the Stock Rack to Delete (optional)
    id: 56,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1StockRackDeleteRequest;

  try {
    const data = await api.apiV1StockRackDelete(body);
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
| **id** | `number` | Id of the Stock Rack to Delete | [Optional] [Defaults to `undefined`] |
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


## apiV1StockRackGet

> JoblogicAPIModelsGetStockRackResponse apiV1StockRackGet(authorization, id, tenantId)

Gets Stock Rack Details

### Example

```ts
import {
  Configuration,
  StockRackApi,
} from '';
import type { ApiV1StockRackGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StockRackApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // number | Id of the Stock Rack to retrieve (optional)
    id: 56,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1StockRackGetRequest;

  try {
    const data = await api.apiV1StockRackGet(body);
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
| **id** | `number` | Id of the Stock Rack to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsGetStockRackResponse**](JoblogicAPIModelsGetStockRackResponse.md)

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


## apiV1StockRackGetAllPost

> JoblogicAPIModelsSearchStockRackResponse apiV1StockRackGetAllPost(authorization, joblogicAPIModelsSearchStockRackRequest)

Search Stock Rack by keyword

### Example

```ts
import {
  Configuration,
  StockRackApi,
} from '';
import type { ApiV1StockRackGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StockRackApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchStockRackRequest | search conditons (optional)
    joblogicAPIModelsSearchStockRackRequest: ...,
  } satisfies ApiV1StockRackGetAllPostRequest;

  try {
    const data = await api.apiV1StockRackGetAllPost(body);
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
| **joblogicAPIModelsSearchStockRackRequest** | [JoblogicAPIModelsSearchStockRackRequest](JoblogicAPIModelsSearchStockRackRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchStockRackResponse**](JoblogicAPIModelsSearchStockRackResponse.md)

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


## apiV1StockRackPost

> JoblogicAPIModelsCreateStockRackResponse apiV1StockRackPost(authorization, joblogicAPIModelsCreateStockRackRequest)

Create Stock Rack

### Example

```ts
import {
  Configuration,
  StockRackApi,
} from '';
import type { ApiV1StockRackPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StockRackApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateStockRackRequest | Stock Rack to create (optional)
    joblogicAPIModelsCreateStockRackRequest: ...,
  } satisfies ApiV1StockRackPostRequest;

  try {
    const data = await api.apiV1StockRackPost(body);
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
| **joblogicAPIModelsCreateStockRackRequest** | [JoblogicAPIModelsCreateStockRackRequest](JoblogicAPIModelsCreateStockRackRequest.md) | Stock Rack to create | [Optional] |

### Return type

[**JoblogicAPIModelsCreateStockRackResponse**](JoblogicAPIModelsCreateStockRackResponse.md)

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


## apiV1StockRackPut

> JoblogicAPIModelsUpdateStockRackResponse apiV1StockRackPut(authorization, joblogicAPIModelsUpdateStockRackRequest)

Update Stock Rack

### Example

```ts
import {
  Configuration,
  StockRackApi,
} from '';
import type { ApiV1StockRackPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StockRackApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateStockRackRequest | Stock Rack to update (optional)
    joblogicAPIModelsUpdateStockRackRequest: ...,
  } satisfies ApiV1StockRackPutRequest;

  try {
    const data = await api.apiV1StockRackPut(body);
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
| **joblogicAPIModelsUpdateStockRackRequest** | [JoblogicAPIModelsUpdateStockRackRequest](JoblogicAPIModelsUpdateStockRackRequest.md) | Stock Rack to update | [Optional] |

### Return type

[**JoblogicAPIModelsUpdateStockRackResponse**](JoblogicAPIModelsUpdateStockRackResponse.md)

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

