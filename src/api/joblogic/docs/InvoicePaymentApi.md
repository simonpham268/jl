# InvoicePaymentApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1InvoicePaymentCGroupDelete**](InvoicePaymentApi.md#apiv1invoicepaymentcgroupdelete) | **DELETE** /api/v1/InvoicePayment/CGroup | Delete CGroup Invoice Payment |
| [**apiV1InvoicePaymentCGroupGet**](InvoicePaymentApi.md#apiv1invoicepaymentcgroupget) | **GET** /api/v1/InvoicePayment/CGroup | Gets CGroup payments details |
| [**apiV1InvoicePaymentCGroupGetAllGet**](InvoicePaymentApi.md#apiv1invoicepaymentcgroupgetallget) | **GET** /api/v1/InvoicePayment/CGroup/GetAll | Get all payments from the CGroup Invoice |
| [**apiV1InvoicePaymentCGroupPost**](InvoicePaymentApi.md#apiv1invoicepaymentcgrouppost) | **POST** /api/v1/InvoicePayment/CGroup | Create CGroup invoice payment |
| [**apiV1InvoicePaymentCGroupPut**](InvoicePaymentApi.md#apiv1invoicepaymentcgroupput) | **PUT** /api/v1/InvoicePayment/CGroup | Update CGroup Invoice Payment |
| [**apiV1InvoicePaymentDelete**](InvoicePaymentApi.md#apiv1invoicepaymentdelete) | **DELETE** /api/v1/InvoicePayment | Delete Invoice Payment |
| [**apiV1InvoicePaymentGet**](InvoicePaymentApi.md#apiv1invoicepaymentget) | **GET** /api/v1/InvoicePayment | Gets payments details |
| [**apiV1InvoicePaymentGetAllGet**](InvoicePaymentApi.md#apiv1invoicepaymentgetallget) | **GET** /api/v1/InvoicePayment/GetAll | Get all payments from the invoice |
| [**apiV1InvoicePaymentPost**](InvoicePaymentApi.md#apiv1invoicepaymentpost) | **POST** /api/v1/InvoicePayment | Create invoice payment |
| [**apiV1InvoicePaymentPut**](InvoicePaymentApi.md#apiv1invoicepaymentput) | **PUT** /api/v1/InvoicePayment | Update Site Type |



## apiV1InvoicePaymentCGroupDelete

> apiV1InvoicePaymentCGroupDelete(authorization, uniqueId, tenantId)

Delete CGroup Invoice Payment

### Example

```ts
import {
  Configuration,
  InvoicePaymentApi,
} from '';
import type { ApiV1InvoicePaymentCGroupDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InvoicePaymentApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | UniqueId of the CGroup Invoice payment to Delete (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1InvoicePaymentCGroupDeleteRequest;

  try {
    const data = await api.apiV1InvoicePaymentCGroupDelete(body);
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
| **uniqueId** | `string` | UniqueId of the CGroup Invoice payment to Delete | [Optional] [Defaults to `undefined`] |
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


## apiV1InvoicePaymentCGroupGet

> JoblogicAPIModelsGetCGroupInvoicePaymentResponse apiV1InvoicePaymentCGroupGet(authorization, uniqueId, tenantId)

Gets CGroup payments details

### Example

```ts
import {
  Configuration,
  InvoicePaymentApi,
} from '';
import type { ApiV1InvoicePaymentCGroupGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InvoicePaymentApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | UniqueId of the CGroup payment to retrieve (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1InvoicePaymentCGroupGetRequest;

  try {
    const data = await api.apiV1InvoicePaymentCGroupGet(body);
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
| **uniqueId** | `string` | UniqueId of the CGroup payment to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsGetCGroupInvoicePaymentResponse**](JoblogicAPIModelsGetCGroupInvoicePaymentResponse.md)

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


## apiV1InvoicePaymentCGroupGetAllGet

> JoblogicAPIModelsGetAllCGroupInvoicePayments apiV1InvoicePaymentCGroupGetAllGet(authorization, cGroupInvoiceUniqueId, tenantId)

Get all payments from the CGroup Invoice

### Example

```ts
import {
  Configuration,
  InvoicePaymentApi,
} from '';
import type { ApiV1InvoicePaymentCGroupGetAllGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InvoicePaymentApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | UniqueId of the CGroup Invoice to retrieve payments (optional)
    cGroupInvoiceUniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1InvoicePaymentCGroupGetAllGetRequest;

  try {
    const data = await api.apiV1InvoicePaymentCGroupGetAllGet(body);
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
| **cGroupInvoiceUniqueId** | `string` | UniqueId of the CGroup Invoice to retrieve payments | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsGetAllCGroupInvoicePayments**](JoblogicAPIModelsGetAllCGroupInvoicePayments.md)

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


## apiV1InvoicePaymentCGroupPost

> JoblogicAPIModelsGetCGroupInvoicePaymentResponse apiV1InvoicePaymentCGroupPost(authorization, joblogicAPIModelsCreateCGroupInvoicePaymentRequest)

Create CGroup invoice payment

### Example

```ts
import {
  Configuration,
  InvoicePaymentApi,
} from '';
import type { ApiV1InvoicePaymentCGroupPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InvoicePaymentApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateCGroupInvoicePaymentRequest | CGroup Invoice Payment to create (optional)
    joblogicAPIModelsCreateCGroupInvoicePaymentRequest: ...,
  } satisfies ApiV1InvoicePaymentCGroupPostRequest;

  try {
    const data = await api.apiV1InvoicePaymentCGroupPost(body);
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
| **joblogicAPIModelsCreateCGroupInvoicePaymentRequest** | [JoblogicAPIModelsCreateCGroupInvoicePaymentRequest](JoblogicAPIModelsCreateCGroupInvoicePaymentRequest.md) | CGroup Invoice Payment to create | [Optional] |

### Return type

[**JoblogicAPIModelsGetCGroupInvoicePaymentResponse**](JoblogicAPIModelsGetCGroupInvoicePaymentResponse.md)

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


## apiV1InvoicePaymentCGroupPut

> JoblogicAPIModelsGetCGroupInvoicePaymentResponse apiV1InvoicePaymentCGroupPut(authorization, joblogicAPIModelsUpdateCGroupInvoicePaymentRequest)

Update CGroup Invoice Payment

### Example

```ts
import {
  Configuration,
  InvoicePaymentApi,
} from '';
import type { ApiV1InvoicePaymentCGroupPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InvoicePaymentApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateCGroupInvoicePaymentRequest | Cgroup Payment to update (optional)
    joblogicAPIModelsUpdateCGroupInvoicePaymentRequest: ...,
  } satisfies ApiV1InvoicePaymentCGroupPutRequest;

  try {
    const data = await api.apiV1InvoicePaymentCGroupPut(body);
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
| **joblogicAPIModelsUpdateCGroupInvoicePaymentRequest** | [JoblogicAPIModelsUpdateCGroupInvoicePaymentRequest](JoblogicAPIModelsUpdateCGroupInvoicePaymentRequest.md) | Cgroup Payment to update | [Optional] |

### Return type

[**JoblogicAPIModelsGetCGroupInvoicePaymentResponse**](JoblogicAPIModelsGetCGroupInvoicePaymentResponse.md)

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


## apiV1InvoicePaymentDelete

> apiV1InvoicePaymentDelete(authorization, uniqueId, tenantId)

Delete Invoice Payment

### Example

```ts
import {
  Configuration,
  InvoicePaymentApi,
} from '';
import type { ApiV1InvoicePaymentDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InvoicePaymentApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | UniqueId of the invoice payment to Delete (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1InvoicePaymentDeleteRequest;

  try {
    const data = await api.apiV1InvoicePaymentDelete(body);
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
| **uniqueId** | `string` | UniqueId of the invoice payment to Delete | [Optional] [Defaults to `undefined`] |
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


## apiV1InvoicePaymentGet

> JoblogicAPIModelsGetInvoicePaymentResponse apiV1InvoicePaymentGet(authorization, uniqueId, tenantId)

Gets payments details

### Example

```ts
import {
  Configuration,
  InvoicePaymentApi,
} from '';
import type { ApiV1InvoicePaymentGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InvoicePaymentApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | UniqueId of the payment to retrieve (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1InvoicePaymentGetRequest;

  try {
    const data = await api.apiV1InvoicePaymentGet(body);
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
| **uniqueId** | `string` | UniqueId of the payment to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsGetInvoicePaymentResponse**](JoblogicAPIModelsGetInvoicePaymentResponse.md)

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


## apiV1InvoicePaymentGetAllGet

> JoblogicAPIModelsGetAllInvoicePaymentsByInvoiceUniqueId apiV1InvoicePaymentGetAllGet(authorization, invoiceUniqueId, tenantId)

Get all payments from the invoice

### Example

```ts
import {
  Configuration,
  InvoicePaymentApi,
} from '';
import type { ApiV1InvoicePaymentGetAllGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InvoicePaymentApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | UniqueId of the invoice to retrieve payments (optional)
    invoiceUniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1InvoicePaymentGetAllGetRequest;

  try {
    const data = await api.apiV1InvoicePaymentGetAllGet(body);
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
| **invoiceUniqueId** | `string` | UniqueId of the invoice to retrieve payments | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsGetAllInvoicePaymentsByInvoiceUniqueId**](JoblogicAPIModelsGetAllInvoicePaymentsByInvoiceUniqueId.md)

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


## apiV1InvoicePaymentPost

> JoblogicAPIModelsCreateSiteTypeResponse apiV1InvoicePaymentPost(authorization, joblogicAPIModelsCreateInvoicePaymentRequest)

Create invoice payment

### Example

```ts
import {
  Configuration,
  InvoicePaymentApi,
} from '';
import type { ApiV1InvoicePaymentPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InvoicePaymentApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateInvoicePaymentRequest | Invoice Payment to create (optional)
    joblogicAPIModelsCreateInvoicePaymentRequest: ...,
  } satisfies ApiV1InvoicePaymentPostRequest;

  try {
    const data = await api.apiV1InvoicePaymentPost(body);
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
| **joblogicAPIModelsCreateInvoicePaymentRequest** | [JoblogicAPIModelsCreateInvoicePaymentRequest](JoblogicAPIModelsCreateInvoicePaymentRequest.md) | Invoice Payment to create | [Optional] |

### Return type

[**JoblogicAPIModelsCreateSiteTypeResponse**](JoblogicAPIModelsCreateSiteTypeResponse.md)

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


## apiV1InvoicePaymentPut

> JoblogicAPIModelsUpdateSiteTypeResponse apiV1InvoicePaymentPut(authorization, joblogicAPIModelsUpdateInvoicePaymentRequest)

Update Site Type

### Example

```ts
import {
  Configuration,
  InvoicePaymentApi,
} from '';
import type { ApiV1InvoicePaymentPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InvoicePaymentApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateInvoicePaymentRequest | Site Type to update (optional)
    joblogicAPIModelsUpdateInvoicePaymentRequest: ...,
  } satisfies ApiV1InvoicePaymentPutRequest;

  try {
    const data = await api.apiV1InvoicePaymentPut(body);
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
| **joblogicAPIModelsUpdateInvoicePaymentRequest** | [JoblogicAPIModelsUpdateInvoicePaymentRequest](JoblogicAPIModelsUpdateInvoicePaymentRequest.md) | Site Type to update | [Optional] |

### Return type

[**JoblogicAPIModelsUpdateSiteTypeResponse**](JoblogicAPIModelsUpdateSiteTypeResponse.md)

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

