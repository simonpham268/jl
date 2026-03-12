# CreditApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1CreditCustomerGroupedGetbyidGet**](CreditApi.md#apiv1creditcustomergroupedgetbyidget) | **GET** /api/v1/Credit/CustomerGrouped/getbyid | Get Customer Grouped by unique id |
| [**apiV1CreditGetallPost**](CreditApi.md#apiv1creditgetallpost) | **POST** /api/v1/Credit/getall | Search Credit by keyword and active status |
| [**apiV1CreditGetbyidGet**](CreditApi.md#apiv1creditgetbyidget) | **GET** /api/v1/Credit/getbyid | Get Credit Note by Unique Id |
| [**apiV1CreditPPMGetbyidGet**](CreditApi.md#apiv1creditppmgetbyidget) | **GET** /api/v1/Credit/PPM/getbyid | Search Credit by keyword and active status |
| [**apiV1CreditPPMGetlinebyidGet**](CreditApi.md#apiv1creditppmgetlinebyidget) | **GET** /api/v1/Credit/PPM/getlinebyid | Search Credit by keyword and active status |
| [**apiV1CreditPost**](CreditApi.md#apiv1creditpost) | **POST** /api/v1/Credit | Create approved Credit by Invoice Id |



## apiV1CreditCustomerGroupedGetbyidGet

> JoblogicAPIModelsCreditCGroupInvoiceDetailApiResponse apiV1CreditCustomerGroupedGetbyidGet(authorization, id, tenantId)

Get Customer Grouped by unique id

### Example

```ts
import {
  Configuration,
  CreditApi,
} from '';
import type { ApiV1CreditCustomerGroupedGetbyidGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CreditApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1CreditCustomerGroupedGetbyidGetRequest;

  try {
    const data = await api.apiV1CreditCustomerGroupedGetbyidGet(body);
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

[**JoblogicAPIModelsCreditCGroupInvoiceDetailApiResponse**](JoblogicAPIModelsCreditCGroupInvoiceDetailApiResponse.md)

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


## apiV1CreditGetallPost

> JoblogicAPIModelsSearchInvoiceResponse apiV1CreditGetallPost(authorization, joblogicAPIModelsSearchCreditRequest)

Search Credit by keyword and active status

### Example

```ts
import {
  Configuration,
  CreditApi,
} from '';
import type { ApiV1CreditGetallPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CreditApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchCreditRequest | search conditons (optional)
    joblogicAPIModelsSearchCreditRequest: ...,
  } satisfies ApiV1CreditGetallPostRequest;

  try {
    const data = await api.apiV1CreditGetallPost(body);
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
| **joblogicAPIModelsSearchCreditRequest** | [JoblogicAPIModelsSearchCreditRequest](JoblogicAPIModelsSearchCreditRequest.md) | search conditons | [Optional] |

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


## apiV1CreditGetbyidGet

> JoblogicAPIModelsCreditItemApiResponse apiV1CreditGetbyidGet(authorization, uniqueId, tenantId)

Get Credit Note by Unique Id

### Example

```ts
import {
  Configuration,
  CreditApi,
} from '';
import type { ApiV1CreditGetbyidGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CreditApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1CreditGetbyidGetRequest;

  try {
    const data = await api.apiV1CreditGetbyidGet(body);
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
| **uniqueId** | `string` |  | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsCreditItemApiResponse**](JoblogicAPIModelsCreditItemApiResponse.md)

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


## apiV1CreditPPMGetbyidGet

> JoblogicAPIModelsPPMCreditDetailApiResponse apiV1CreditPPMGetbyidGet(authorization, uniqueId, tenantId)

Search Credit by keyword and active status

### Example

```ts
import {
  Configuration,
  CreditApi,
} from '';
import type { ApiV1CreditPPMGetbyidGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CreditApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1CreditPPMGetbyidGetRequest;

  try {
    const data = await api.apiV1CreditPPMGetbyidGet(body);
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
| **uniqueId** | `string` |  | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsPPMCreditDetailApiResponse**](JoblogicAPIModelsPPMCreditDetailApiResponse.md)

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
| **500** | Internal Server ErrorGET /api/v1/Credit/PPM/GetById |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1CreditPPMGetlinebyidGet

> JoblogicAPIModelsPPMCreditLineApiResponse apiV1CreditPPMGetlinebyidGet(authorization, uniqueId, tenantId)

Search Credit by keyword and active status

### Example

```ts
import {
  Configuration,
  CreditApi,
} from '';
import type { ApiV1CreditPPMGetlinebyidGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CreditApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1CreditPPMGetlinebyidGetRequest;

  try {
    const data = await api.apiV1CreditPPMGetlinebyidGet(body);
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
| **uniqueId** | `string` |  | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsPPMCreditLineApiResponse**](JoblogicAPIModelsPPMCreditLineApiResponse.md)

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
| **500** | Internal Server ErrorGET /api/v1/Credit/PPM/GetById |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1CreditPost

> apiV1CreditPost(authorization, joblogicAPIModelsCreateCreditRequest)

Create approved Credit by Invoice Id



### Example

```ts
import {
  Configuration,
  CreditApi,
} from '';
import type { ApiV1CreditPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CreditApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateCreditRequest | Credit to create (optional)
    joblogicAPIModelsCreateCreditRequest: ...,
  } satisfies ApiV1CreditPostRequest;

  try {
    const data = await api.apiV1CreditPost(body);
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
| **joblogicAPIModelsCreateCreditRequest** | [JoblogicAPIModelsCreateCreditRequest](JoblogicAPIModelsCreateCreditRequest.md) | Credit to create | [Optional] |

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

