# StockLocationApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1StockLocationDelete**](StockLocationApi.md#apiv1stocklocationdelete) | **DELETE** /api/v1/StockLocation | Delete Stock Location |
| [**apiV1StockLocationGet**](StockLocationApi.md#apiv1stocklocationget) | **GET** /api/v1/StockLocation | Gets Stock Location Details |
| [**apiV1StockLocationGetAllPost**](StockLocationApi.md#apiv1stocklocationgetallpost) | **POST** /api/v1/StockLocation/GetAll | Search Stock Location by keyword |
| [**apiV1StockLocationPost**](StockLocationApi.md#apiv1stocklocationpost) | **POST** /api/v1/StockLocation | Create Stock Location |
| [**apiV1StockLocationPut**](StockLocationApi.md#apiv1stocklocationput) | **PUT** /api/v1/StockLocation | Update Stock Location |



## apiV1StockLocationDelete

> apiV1StockLocationDelete(authorization, id, tenantId)

Delete Stock Location

### Example

```ts
import {
  Configuration,
  StockLocationApi,
} from '';
import type { ApiV1StockLocationDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StockLocationApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // number | Id of the Stock Location to Delete (optional)
    id: 56,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1StockLocationDeleteRequest;

  try {
    const data = await api.apiV1StockLocationDelete(body);
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
| **id** | `number` | Id of the Stock Location to Delete | [Optional] [Defaults to `undefined`] |
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


## apiV1StockLocationGet

> JoblogicAPIModelsGetStockLocationResponse apiV1StockLocationGet(authorization, id, tenantId)

Gets Stock Location Details

### Example

```ts
import {
  Configuration,
  StockLocationApi,
} from '';
import type { ApiV1StockLocationGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StockLocationApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // number | Id of the Stock Location to retrieve (optional)
    id: 56,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1StockLocationGetRequest;

  try {
    const data = await api.apiV1StockLocationGet(body);
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
| **id** | `number` | Id of the Stock Location to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsGetStockLocationResponse**](JoblogicAPIModelsGetStockLocationResponse.md)

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


## apiV1StockLocationGetAllPost

> JoblogicAPIModelsSearchStockLocationResponse apiV1StockLocationGetAllPost(authorization, joblogicAPIModelsSearchStockLocationRequest)

Search Stock Location by keyword

### Example

```ts
import {
  Configuration,
  StockLocationApi,
} from '';
import type { ApiV1StockLocationGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StockLocationApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchStockLocationRequest | search conditons (optional)
    joblogicAPIModelsSearchStockLocationRequest: ...,
  } satisfies ApiV1StockLocationGetAllPostRequest;

  try {
    const data = await api.apiV1StockLocationGetAllPost(body);
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
| **joblogicAPIModelsSearchStockLocationRequest** | [JoblogicAPIModelsSearchStockLocationRequest](JoblogicAPIModelsSearchStockLocationRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchStockLocationResponse**](JoblogicAPIModelsSearchStockLocationResponse.md)

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


## apiV1StockLocationPost

> JoblogicAPIModelsCreateStockLocationResponse apiV1StockLocationPost(authorization, joblogicAPIModelsCreateStockLocationRequest)

Create Stock Location

### Example

```ts
import {
  Configuration,
  StockLocationApi,
} from '';
import type { ApiV1StockLocationPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StockLocationApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateStockLocationRequest | Stock Location to create (optional)
    joblogicAPIModelsCreateStockLocationRequest: ...,
  } satisfies ApiV1StockLocationPostRequest;

  try {
    const data = await api.apiV1StockLocationPost(body);
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
| **joblogicAPIModelsCreateStockLocationRequest** | [JoblogicAPIModelsCreateStockLocationRequest](JoblogicAPIModelsCreateStockLocationRequest.md) | Stock Location to create | [Optional] |

### Return type

[**JoblogicAPIModelsCreateStockLocationResponse**](JoblogicAPIModelsCreateStockLocationResponse.md)

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


## apiV1StockLocationPut

> apiV1StockLocationPut(authorization, joblogicAPIModelsUpdateStockLocationRequest)

Update Stock Location

### Example

```ts
import {
  Configuration,
  StockLocationApi,
} from '';
import type { ApiV1StockLocationPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StockLocationApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateStockLocationRequest | Stock Location to update (optional)
    joblogicAPIModelsUpdateStockLocationRequest: ...,
  } satisfies ApiV1StockLocationPutRequest;

  try {
    const data = await api.apiV1StockLocationPut(body);
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
| **joblogicAPIModelsUpdateStockLocationRequest** | [JoblogicAPIModelsUpdateStockLocationRequest](JoblogicAPIModelsUpdateStockLocationRequest.md) | Stock Location to update | [Optional] |

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

