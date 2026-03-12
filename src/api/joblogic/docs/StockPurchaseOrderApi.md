# StockPurchaseOrderApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1StockPOAddPOItemPost**](StockPurchaseOrderApi.md#apiv1stockpoaddpoitempost) | **POST** /api/v1/StockPO/AddPOItem | Add item to Stock Purchase Order |
| [**apiV1StockPODelete**](StockPurchaseOrderApi.md#apiv1stockpodelete) | **DELETE** /api/v1/StockPO |  |
| [**apiV1StockPODeletePOItemDelete**](StockPurchaseOrderApi.md#apiv1stockpodeletepoitemdelete) | **DELETE** /api/v1/StockPO/DeletePOItem | Delete Purchase Order Line item |
| [**apiV1StockPOGetLineGet**](StockPurchaseOrderApi.md#apiv1stockpogetlineget) | **GET** /api/v1/StockPO/GetLine | Get Stock Purchase Order Line Detail by Line ID |
| [**apiV1StockPOGetLinesGet**](StockPurchaseOrderApi.md#apiv1stockpogetlinesget) | **GET** /api/v1/StockPO/GetLines | Get Stock Purchase Order Lines by Stock Purchase Order ID |
| [**apiV1StockPOGetallPost**](StockPurchaseOrderApi.md#apiv1stockpogetallpost) | **POST** /api/v1/StockPO/getall | Search Stock Purchase Orders by conditions |
| [**apiV1StockPOPost**](StockPurchaseOrderApi.md#apiv1stockpopost) | **POST** /api/v1/StockPO | Create Stock Purchase Order |
| [**apiV1StockPOPut**](StockPurchaseOrderApi.md#apiv1stockpoput) | **PUT** /api/v1/StockPO | Update Purchase Order |
| [**apiV1StockPOUpdatePOItemPut**](StockPurchaseOrderApi.md#apiv1stockpoupdatepoitemput) | **PUT** /api/v1/StockPO/UpdatePOItem | Update Stock Purchase Order Line item |



## apiV1StockPOAddPOItemPost

> string apiV1StockPOAddPOItemPost(authorization, joblogicAPIModelsAddStockPOItemRequest)

Add item to Stock Purchase Order

### Example

```ts
import {
  Configuration,
  StockPurchaseOrderApi,
} from '';
import type { ApiV1StockPOAddPOItemPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StockPurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsAddStockPOItemRequest | Stock Purchase Order item to add (optional)
    joblogicAPIModelsAddStockPOItemRequest: ...,
  } satisfies ApiV1StockPOAddPOItemPostRequest;

  try {
    const data = await api.apiV1StockPOAddPOItemPost(body);
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
| **joblogicAPIModelsAddStockPOItemRequest** | [JoblogicAPIModelsAddStockPOItemRequest](JoblogicAPIModelsAddStockPOItemRequest.md) | Stock Purchase Order item to add | [Optional] |

### Return type

**string**

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


## apiV1StockPODelete

> apiV1StockPODelete(authorization, id, tenantId)



### Example

```ts
import {
  Configuration,
  StockPurchaseOrderApi,
} from '';
import type { ApiV1StockPODeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StockPurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1StockPODeleteRequest;

  try {
    const data = await api.apiV1StockPODelete(body);
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
| **id** | `string` |  | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` |  | [Optional] [Defaults to `undefined`] |

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
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1StockPODeletePOItemDelete

> apiV1StockPODeletePOItemDelete(authorization, id, tenantId)

Delete Purchase Order Line item

### Example

```ts
import {
  Configuration,
  StockPurchaseOrderApi,
} from '';
import type { ApiV1StockPODeletePOItemDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StockPurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Id of the Stock Purchase Order Line item to delete (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1StockPODeletePOItemDeleteRequest;

  try {
    const data = await api.apiV1StockPODeletePOItemDelete(body);
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
| **id** | `string` | Id of the Stock Purchase Order Line item to delete | [Optional] [Defaults to `undefined`] |
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


## apiV1StockPOGetLineGet

> JoblogicAPIModelsStockPurchaseOrderLineDetailResponse apiV1StockPOGetLineGet(authorization, lineId, tenantId)

Get Stock Purchase Order Line Detail by Line ID

### Example

```ts
import {
  Configuration,
  StockPurchaseOrderApi,
} from '';
import type { ApiV1StockPOGetLineGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StockPurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Stock Purchase Order Line ID (optional)
    lineId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Tenant ID (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1StockPOGetLineGetRequest;

  try {
    const data = await api.apiV1StockPOGetLineGet(body);
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
| **lineId** | `string` | Stock Purchase Order Line ID | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Tenant ID | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsStockPurchaseOrderLineDetailResponse**](JoblogicAPIModelsStockPurchaseOrderLineDetailResponse.md)

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


## apiV1StockPOGetLinesGet

> Array&lt;JoblogicAPIModelsStockPurchaseOrderLineResponse&gt; apiV1StockPOGetLinesGet(authorization, stockPOId, tenantId)

Get Stock Purchase Order Lines by Stock Purchase Order ID

### Example

```ts
import {
  Configuration,
  StockPurchaseOrderApi,
} from '';
import type { ApiV1StockPOGetLinesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StockPurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Stock Purchase Order ID (optional)
    stockPOId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Tenant ID (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1StockPOGetLinesGetRequest;

  try {
    const data = await api.apiV1StockPOGetLinesGet(body);
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
| **stockPOId** | `string` | Stock Purchase Order ID | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Tenant ID | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;JoblogicAPIModelsStockPurchaseOrderLineResponse&gt;**](JoblogicAPIModelsStockPurchaseOrderLineResponse.md)

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


## apiV1StockPOGetallPost

> JoblogicAPIModelsSearchStockPOResponse apiV1StockPOGetallPost(authorization, joblogicAPIModelsSearchStockPurchaseOrderRequest)

Search Stock Purchase Orders by conditions

### Example

```ts
import {
  Configuration,
  StockPurchaseOrderApi,
} from '';
import type { ApiV1StockPOGetallPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StockPurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchStockPurchaseOrderRequest | search conditions (optional)
    joblogicAPIModelsSearchStockPurchaseOrderRequest: ...,
  } satisfies ApiV1StockPOGetallPostRequest;

  try {
    const data = await api.apiV1StockPOGetallPost(body);
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
| **joblogicAPIModelsSearchStockPurchaseOrderRequest** | [JoblogicAPIModelsSearchStockPurchaseOrderRequest](JoblogicAPIModelsSearchStockPurchaseOrderRequest.md) | search conditions | [Optional] |

### Return type

[**JoblogicAPIModelsSearchStockPOResponse**](JoblogicAPIModelsSearchStockPOResponse.md)

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


## apiV1StockPOPost

> JoblogicAPIModelsCreateStockPOResponse apiV1StockPOPost(authorization, joblogicAPIModelsCreateStockPORequest)

Create Stock Purchase Order

### Example

```ts
import {
  Configuration,
  StockPurchaseOrderApi,
} from '';
import type { ApiV1StockPOPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StockPurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateStockPORequest | Stock Purchase Order to create (optional)
    joblogicAPIModelsCreateStockPORequest: ...,
  } satisfies ApiV1StockPOPostRequest;

  try {
    const data = await api.apiV1StockPOPost(body);
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
| **joblogicAPIModelsCreateStockPORequest** | [JoblogicAPIModelsCreateStockPORequest](JoblogicAPIModelsCreateStockPORequest.md) | Stock Purchase Order to create | [Optional] |

### Return type

[**JoblogicAPIModelsCreateStockPOResponse**](JoblogicAPIModelsCreateStockPOResponse.md)

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


## apiV1StockPOPut

> JobLogicMicroserviceCoreContractPurchaseOrderApiGetResponse apiV1StockPOPut(authorization, tenantId, id, joblogicAPIModelsUpdateStockPORequest)

Update Purchase Order

### Example

```ts
import {
  Configuration,
  StockPurchaseOrderApi,
} from '';
import type { ApiV1StockPOPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StockPurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | TenantId (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string |  (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // JoblogicAPIModelsUpdateStockPORequest | Stock Purchase Order to update (optional)
    joblogicAPIModelsUpdateStockPORequest: ...,
  } satisfies ApiV1StockPOPutRequest;

  try {
    const data = await api.apiV1StockPOPut(body);
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
| **tenantId** | `string` | TenantId | [Optional] [Defaults to `undefined`] |
| **id** | `string` |  | [Optional] [Defaults to `undefined`] |
| **joblogicAPIModelsUpdateStockPORequest** | [JoblogicAPIModelsUpdateStockPORequest](JoblogicAPIModelsUpdateStockPORequest.md) | Stock Purchase Order to update | [Optional] |

### Return type

[**JobLogicMicroserviceCoreContractPurchaseOrderApiGetResponse**](JobLogicMicroserviceCoreContractPurchaseOrderApiGetResponse.md)

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


## apiV1StockPOUpdatePOItemPut

> boolean apiV1StockPOUpdatePOItemPut(authorization, joblogicAPIModelsUpdateStockPOItemRequest)

Update Stock Purchase Order Line item

### Example

```ts
import {
  Configuration,
  StockPurchaseOrderApi,
} from '';
import type { ApiV1StockPOUpdatePOItemPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StockPurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateStockPOItemRequest | Stock Purchase Order Line item to update (optional)
    joblogicAPIModelsUpdateStockPOItemRequest: ...,
  } satisfies ApiV1StockPOUpdatePOItemPutRequest;

  try {
    const data = await api.apiV1StockPOUpdatePOItemPut(body);
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
| **joblogicAPIModelsUpdateStockPOItemRequest** | [JoblogicAPIModelsUpdateStockPOItemRequest](JoblogicAPIModelsUpdateStockPOItemRequest.md) | Stock Purchase Order Line item to update | [Optional] |

### Return type

**boolean**

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

