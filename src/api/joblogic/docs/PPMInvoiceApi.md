# PPMInvoiceApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1PPMInvoicePaymentDelete**](PPMInvoiceApi.md#apiv1ppminvoicepaymentdelete) | **DELETE** /api/v1/PPMInvoice/payment | Update PPM Invoice Payment |
| [**apiV1PPMInvoicePaymentGet**](PPMInvoiceApi.md#apiv1ppminvoicepaymentget) | **GET** /api/v1/PPMInvoice/payment | Get PPM Invoice Payment by Unique Identifier |
| [**apiV1PPMInvoicePaymentGetAllGet**](PPMInvoiceApi.md#apiv1ppminvoicepaymentgetallget) | **GET** /api/v1/PPMInvoice/payment/getAll | Get PPM Invoice Payments by PPM Invoice Id |
| [**apiV1PPMInvoicePaymentPost**](PPMInvoiceApi.md#apiv1ppminvoicepaymentpost) | **POST** /api/v1/PPMInvoice/payment | Create PPM Invoice Payment |
| [**apiV1PPMInvoicePaymentPut**](PPMInvoiceApi.md#apiv1ppminvoicepaymentput) | **PUT** /api/v1/PPMInvoice/payment | Update PPM Invoice Payment |



## apiV1PPMInvoicePaymentDelete

> boolean apiV1PPMInvoicePaymentDelete(authorization, paymentId, deletedByUserId, tenantId)

Update PPM Invoice Payment

### Example

```ts
import {
  Configuration,
  PPMInvoiceApi,
} from '';
import type { ApiV1PPMInvoicePaymentDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PPMInvoiceApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Payment Unique Identifier (optional)
    paymentId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // number | User Id (optional)
    deletedByUserId: 56,
    // string | Contractor Id (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1PPMInvoicePaymentDeleteRequest;

  try {
    const data = await api.apiV1PPMInvoicePaymentDelete(body);
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
| **paymentId** | `string` | Payment Unique Identifier | [Optional] [Defaults to `undefined`] |
| **deletedByUserId** | `number` | User Id | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id | [Optional] [Defaults to `undefined`] |

### Return type

**boolean**

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


## apiV1PPMInvoicePaymentGet

> JoblogicAPIModelsPPMInvoicePayment apiV1PPMInvoicePaymentGet(authorization, paymentId, tenantId)

Get PPM Invoice Payment by Unique Identifier

### Example

```ts
import {
  Configuration,
  PPMInvoiceApi,
} from '';
import type { ApiV1PPMInvoicePaymentGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PPMInvoiceApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Payment Unique Identifier (optional)
    paymentId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1PPMInvoicePaymentGetRequest;

  try {
    const data = await api.apiV1PPMInvoicePaymentGet(body);
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
| **paymentId** | `string` | Payment Unique Identifier | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsPPMInvoicePayment**](JoblogicAPIModelsPPMInvoicePayment.md)

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


## apiV1PPMInvoicePaymentGetAllGet

> JoblogicAPIModelsPPMInvoicePaymentItems apiV1PPMInvoicePaymentGetAllGet(authorization, pPMInvoiceId, tenantId)

Get PPM Invoice Payments by PPM Invoice Id

### Example

```ts
import {
  Configuration,
  PPMInvoiceApi,
} from '';
import type { ApiV1PPMInvoicePaymentGetAllGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PPMInvoiceApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | PPM Invoice Unique Identifier (optional)
    pPMInvoiceId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1PPMInvoicePaymentGetAllGetRequest;

  try {
    const data = await api.apiV1PPMInvoicePaymentGetAllGet(body);
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
| **pPMInvoiceId** | `string` | PPM Invoice Unique Identifier | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsPPMInvoicePaymentItems**](JoblogicAPIModelsPPMInvoicePaymentItems.md)

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


## apiV1PPMInvoicePaymentPost

> JoblogicAPIModelsPPMInvoicePayment apiV1PPMInvoicePaymentPost(authorization, joblogicAPIModelsAddPPMInvoicePaymentRequest)

Create PPM Invoice Payment

### Example

```ts
import {
  Configuration,
  PPMInvoiceApi,
} from '';
import type { ApiV1PPMInvoicePaymentPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PPMInvoiceApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsAddPPMInvoicePaymentRequest | Create PPM Invoice Payment request (optional)
    joblogicAPIModelsAddPPMInvoicePaymentRequest: ...,
  } satisfies ApiV1PPMInvoicePaymentPostRequest;

  try {
    const data = await api.apiV1PPMInvoicePaymentPost(body);
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
| **joblogicAPIModelsAddPPMInvoicePaymentRequest** | [JoblogicAPIModelsAddPPMInvoicePaymentRequest](JoblogicAPIModelsAddPPMInvoicePaymentRequest.md) | Create PPM Invoice Payment request | [Optional] |

### Return type

[**JoblogicAPIModelsPPMInvoicePayment**](JoblogicAPIModelsPPMInvoicePayment.md)

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


## apiV1PPMInvoicePaymentPut

> JoblogicAPIModelsPPMInvoicePayment apiV1PPMInvoicePaymentPut(authorization, joblogicAPIModelsUpdatePPMInvoicePaymentRequest)

Update PPM Invoice Payment

### Example

```ts
import {
  Configuration,
  PPMInvoiceApi,
} from '';
import type { ApiV1PPMInvoicePaymentPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PPMInvoiceApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdatePPMInvoicePaymentRequest | Update PPM Invoice Payment request (optional)
    joblogicAPIModelsUpdatePPMInvoicePaymentRequest: ...,
  } satisfies ApiV1PPMInvoicePaymentPutRequest;

  try {
    const data = await api.apiV1PPMInvoicePaymentPut(body);
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
| **joblogicAPIModelsUpdatePPMInvoicePaymentRequest** | [JoblogicAPIModelsUpdatePPMInvoicePaymentRequest](JoblogicAPIModelsUpdatePPMInvoicePaymentRequest.md) | Update PPM Invoice Payment request | [Optional] |

### Return type

[**JoblogicAPIModelsPPMInvoicePayment**](JoblogicAPIModelsPPMInvoicePayment.md)

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

