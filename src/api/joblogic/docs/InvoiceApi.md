# InvoiceApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1InvoiceCustomerGroupedGetByIdGet**](InvoiceApi.md#apiv1invoicecustomergroupedgetbyidget) | **GET** /api/v1/Invoice/CustomerGrouped/GetById | Get CGroup Invoice Details. |
| [**apiV1InvoiceDelete**](InvoiceApi.md#apiv1invoicedelete) | **DELETE** /api/v1/Invoice | Delete an Invoice |
| [**apiV1InvoiceGeneratedocumentPost**](InvoiceApi.md#apiv1invoicegeneratedocumentpost) | **POST** /api/v1/Invoice/generatedocument | Generate Downloadable Url for Invoicesheet |
| [**apiV1InvoiceGetByIdGet**](InvoiceApi.md#apiv1invoicegetbyidget) | **GET** /api/v1/Invoice/GetById | Get Invoice by Auto Id and tenant id. |
| [**apiV1InvoiceGetallPost**](InvoiceApi.md#apiv1invoicegetallpost) | **POST** /api/v1/Invoice/getall | Search Invoice by keyword and active status |
| [**apiV1InvoicePPMGetByIdGet**](InvoiceApi.md#apiv1invoiceppmgetbyidget) | **GET** /api/v1/Invoice/PPM/GetById | Get PPM Invoice Details. |
| [**apiV1InvoicePost**](InvoiceApi.md#apiv1invoicepost) | **POST** /api/v1/Invoice | Create approved Invoice by JobId |
| [**apiV1InvoicePut**](InvoiceApi.md#apiv1invoiceput) | **PUT** /api/v1/Invoice | Update Invoice information |



## apiV1InvoiceCustomerGroupedGetByIdGet

> JoblogicAPIModelsCGroupInvoiceDetailApiResponse apiV1InvoiceCustomerGroupedGetByIdGet(authorization, uniqueId, tenantId)

Get CGroup Invoice Details.

### Example

```ts
import {
  Configuration,
  InvoiceApi,
} from '';
import type { ApiV1InvoiceCustomerGroupedGetByIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InvoiceApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Invoice Id (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Tenant Id (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1InvoiceCustomerGroupedGetByIdGetRequest;

  try {
    const data = await api.apiV1InvoiceCustomerGroupedGetByIdGet(body);
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
| **uniqueId** | `string` | Invoice Id | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Tenant Id | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsCGroupInvoiceDetailApiResponse**](JoblogicAPIModelsCGroupInvoiceDetailApiResponse.md)

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


## apiV1InvoiceDelete

> apiV1InvoiceDelete(authorization, id, tenantId)

Delete an Invoice



### Example

```ts
import {
  Configuration,
  InvoiceApi,
} from '';
import type { ApiV1InvoiceDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InvoiceApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // number | Id of the Invoice to retrieve (optional)
    id: 56,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1InvoiceDeleteRequest;

  try {
    const data = await api.apiV1InvoiceDelete(body);
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
| **id** | `number` | Id of the Invoice to retrieve | [Optional] [Defaults to `undefined`] |
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


## apiV1InvoiceGeneratedocumentPost

> JoblogicAPIModelsGenerateInvoicesheetResponse apiV1InvoiceGeneratedocumentPost(authorization, joblogicAPIModelsGenerateInvoicesheetRequest)

Generate Downloadable Url for Invoicesheet

### Example

```ts
import {
  Configuration,
  InvoiceApi,
} from '';
import type { ApiV1InvoiceGeneratedocumentPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InvoiceApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsGenerateInvoicesheetRequest | Job to download Invoicesheet from (optional)
    joblogicAPIModelsGenerateInvoicesheetRequest: ...,
  } satisfies ApiV1InvoiceGeneratedocumentPostRequest;

  try {
    const data = await api.apiV1InvoiceGeneratedocumentPost(body);
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
| **joblogicAPIModelsGenerateInvoicesheetRequest** | [JoblogicAPIModelsGenerateInvoicesheetRequest](JoblogicAPIModelsGenerateInvoicesheetRequest.md) | Job to download Invoicesheet from | [Optional] |

### Return type

[**JoblogicAPIModelsGenerateInvoicesheetResponse**](JoblogicAPIModelsGenerateInvoicesheetResponse.md)

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


## apiV1InvoiceGetByIdGet

> JoblogicAPIModelsInvoiceItemApiResponse apiV1InvoiceGetByIdGet(authorization, id, tenantId)

Get Invoice by Auto Id and tenant id.

### Example

```ts
import {
  Configuration,
  InvoiceApi,
} from '';
import type { ApiV1InvoiceGetByIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InvoiceApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // number | Invoice\'s Id (optional)
    id: 56,
    // string | Tenant Id (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1InvoiceGetByIdGetRequest;

  try {
    const data = await api.apiV1InvoiceGetByIdGet(body);
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
| **id** | `number` | Invoice\&#39;s Id | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Tenant Id | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsInvoiceItemApiResponse**](JoblogicAPIModelsInvoiceItemApiResponse.md)

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


## apiV1InvoiceGetallPost

> JoblogicAPIModelsSearchInvoiceResponse apiV1InvoiceGetallPost(authorization, joblogicAPIModelsSearchInvoiceRequest)

Search Invoice by keyword and active status

### Example

```ts
import {
  Configuration,
  InvoiceApi,
} from '';
import type { ApiV1InvoiceGetallPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InvoiceApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchInvoiceRequest | search conditions (optional)
    joblogicAPIModelsSearchInvoiceRequest: ...,
  } satisfies ApiV1InvoiceGetallPostRequest;

  try {
    const data = await api.apiV1InvoiceGetallPost(body);
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
| **joblogicAPIModelsSearchInvoiceRequest** | [JoblogicAPIModelsSearchInvoiceRequest](JoblogicAPIModelsSearchInvoiceRequest.md) | search conditions | [Optional] |

### Return type

[**JoblogicAPIModelsSearchInvoiceResponse**](JoblogicAPIModelsSearchInvoiceResponse.md)

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


## apiV1InvoicePPMGetByIdGet

> JoblogicAPIModelsPPMInvoiceDetailApiResponse apiV1InvoicePPMGetByIdGet(authorization, uniqueId, tenantId)

Get PPM Invoice Details.

### Example

```ts
import {
  Configuration,
  InvoiceApi,
} from '';
import type { ApiV1InvoicePPMGetByIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InvoiceApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Invoice Unique Id (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Tenant Id (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1InvoicePPMGetByIdGetRequest;

  try {
    const data = await api.apiV1InvoicePPMGetByIdGet(body);
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
| **uniqueId** | `string` | Invoice Unique Id | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Tenant Id | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsPPMInvoiceDetailApiResponse**](JoblogicAPIModelsPPMInvoiceDetailApiResponse.md)

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


## apiV1InvoicePost

> apiV1InvoicePost(authorization, joblogicAPIModelsCreateInvoiceRequest)

Create approved Invoice by JobId



### Example

```ts
import {
  Configuration,
  InvoiceApi,
} from '';
import type { ApiV1InvoicePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InvoiceApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateInvoiceRequest | Invoice to create (optional)
    joblogicAPIModelsCreateInvoiceRequest: ...,
  } satisfies ApiV1InvoicePostRequest;

  try {
    const data = await api.apiV1InvoicePost(body);
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
| **joblogicAPIModelsCreateInvoiceRequest** | [JoblogicAPIModelsCreateInvoiceRequest](JoblogicAPIModelsCreateInvoiceRequest.md) | Invoice to create | [Optional] |

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


## apiV1InvoicePut

> apiV1InvoicePut(authorization, joblogicAPIModelsUpdateInvoiceRequest)

Update Invoice information



### Example

```ts
import {
  Configuration,
  InvoiceApi,
} from '';
import type { ApiV1InvoicePutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InvoiceApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateInvoiceRequest | Invoice to update (optional)
    joblogicAPIModelsUpdateInvoiceRequest: ...,
  } satisfies ApiV1InvoicePutRequest;

  try {
    const data = await api.apiV1InvoicePut(body);
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
| **joblogicAPIModelsUpdateInvoiceRequest** | [JoblogicAPIModelsUpdateInvoiceRequest](JoblogicAPIModelsUpdateInvoiceRequest.md) | Invoice to update | [Optional] |

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

