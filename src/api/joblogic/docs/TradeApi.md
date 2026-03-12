# TradeApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1TradeDelete**](TradeApi.md#apiv1tradedelete) | **DELETE** /api/v1/Trade | Delete an existing Trade using core service |
| [**apiV1TradeGet**](TradeApi.md#apiv1tradeget) | **GET** /api/v1/Trade | Get Trade by Id |
| [**apiV1TradeGetAllPost**](TradeApi.md#apiv1tradegetallpost) | **POST** /api/v1/Trade/GetAll | Search Trade by keyword |
| [**apiV1TradePost**](TradeApi.md#apiv1tradepost) | **POST** /api/v1/Trade | Create a new Trade using core service |
| [**apiV1TradePut**](TradeApi.md#apiv1tradeput) | **PUT** /api/v1/Trade | Update an existing Trade using core service |



## apiV1TradeDelete

> JoblogicAPIModelsDeleteTradeResponse apiV1TradeDelete(authorization, joblogicAPIModelsDeleteTradeRequest)

Delete an existing Trade using core service

### Example

```ts
import {
  Configuration,
  TradeApi,
} from '';
import type { ApiV1TradeDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TradeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsDeleteTradeRequest | Trade deletion request (optional)
    joblogicAPIModelsDeleteTradeRequest: ...,
  } satisfies ApiV1TradeDeleteRequest;

  try {
    const data = await api.apiV1TradeDelete(body);
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
| **joblogicAPIModelsDeleteTradeRequest** | [JoblogicAPIModelsDeleteTradeRequest](JoblogicAPIModelsDeleteTradeRequest.md) | Trade deletion request | [Optional] |

### Return type

[**JoblogicAPIModelsDeleteTradeResponse**](JoblogicAPIModelsDeleteTradeResponse.md)

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


## apiV1TradeGet

> JoblogicAPIModelsGetTradeResponse apiV1TradeGet(authorization, tenantId, id)

Get Trade by Id

### Example

```ts
import {
  Configuration,
  TradeApi,
} from '';
import type { ApiV1TradeGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TradeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Tenant ID (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Trade ID (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1TradeGetRequest;

  try {
    const data = await api.apiV1TradeGet(body);
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
| **tenantId** | `string` | Tenant ID | [Optional] [Defaults to `undefined`] |
| **id** | `string` | Trade ID | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsGetTradeResponse**](JoblogicAPIModelsGetTradeResponse.md)

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


## apiV1TradeGetAllPost

> JoblogicAPIModelsSearchTradeResponse apiV1TradeGetAllPost(authorization, joblogicAPIModelsSearchTradeRequest)

Search Trade by keyword

### Example

```ts
import {
  Configuration,
  TradeApi,
} from '';
import type { ApiV1TradeGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TradeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchTradeRequest | search conditions (optional)
    joblogicAPIModelsSearchTradeRequest: ...,
  } satisfies ApiV1TradeGetAllPostRequest;

  try {
    const data = await api.apiV1TradeGetAllPost(body);
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
| **joblogicAPIModelsSearchTradeRequest** | [JoblogicAPIModelsSearchTradeRequest](JoblogicAPIModelsSearchTradeRequest.md) | search conditions | [Optional] |

### Return type

[**JoblogicAPIModelsSearchTradeResponse**](JoblogicAPIModelsSearchTradeResponse.md)

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


## apiV1TradePost

> JoblogicAPIModelsCreateTradeResponse apiV1TradePost(authorization, joblogicAPIModelsCreateTradeRequest)

Create a new Trade using core service

### Example

```ts
import {
  Configuration,
  TradeApi,
} from '';
import type { ApiV1TradePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TradeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateTradeRequest | Trade creation request (optional)
    joblogicAPIModelsCreateTradeRequest: ...,
  } satisfies ApiV1TradePostRequest;

  try {
    const data = await api.apiV1TradePost(body);
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
| **joblogicAPIModelsCreateTradeRequest** | [JoblogicAPIModelsCreateTradeRequest](JoblogicAPIModelsCreateTradeRequest.md) | Trade creation request | [Optional] |

### Return type

[**JoblogicAPIModelsCreateTradeResponse**](JoblogicAPIModelsCreateTradeResponse.md)

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
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TradePut

> JoblogicAPIModelsUpdateTradeResponse apiV1TradePut(authorization, joblogicAPIModelsUpdateTradeRequest)

Update an existing Trade using core service

### Example

```ts
import {
  Configuration,
  TradeApi,
} from '';
import type { ApiV1TradePutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TradeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateTradeRequest | Trade update request (optional)
    joblogicAPIModelsUpdateTradeRequest: ...,
  } satisfies ApiV1TradePutRequest;

  try {
    const data = await api.apiV1TradePut(body);
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
| **joblogicAPIModelsUpdateTradeRequest** | [JoblogicAPIModelsUpdateTradeRequest](JoblogicAPIModelsUpdateTradeRequest.md) | Trade update request | [Optional] |

### Return type

[**JoblogicAPIModelsUpdateTradeResponse**](JoblogicAPIModelsUpdateTradeResponse.md)

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

