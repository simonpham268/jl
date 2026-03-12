# CustomerApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1CustomerDelete**](CustomerApi.md#apiv1customerdelete) | **DELETE** /api/v1/Customer | Delete Customer |
| [**apiV1CustomerGet**](CustomerApi.md#apiv1customerget) | **GET** /api/v1/Customer | Gets Customer Details |
| [**apiV1CustomerGetAllPost**](CustomerApi.md#apiv1customergetallpost) | **POST** /api/v1/Customer/GetAll | Search Customer by keyword, tags and active status |
| [**apiV1CustomerGetByIdGet**](CustomerApi.md#apiv1customergetbyidget) | **GET** /api/v1/Customer/GetById | Get customer by auto Id and tenant id. |
| [**apiV1CustomerPost**](CustomerApi.md#apiv1customerpost) | **POST** /api/v1/Customer | Create Customer |
| [**apiV1CustomerPut**](CustomerApi.md#apiv1customerput) | **PUT** /api/v1/Customer | Update Customer |



## apiV1CustomerDelete

> apiV1CustomerDelete(authorization, id, tenantId)

Delete Customer

### Example

```ts
import {
  Configuration,
  CustomerApi,
} from '';
import type { ApiV1CustomerDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CustomerApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Id of the customer to delete (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1CustomerDeleteRequest;

  try {
    const data = await api.apiV1CustomerDelete(body);
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
| **id** | `string` | Id of the customer to delete | [Optional] [Defaults to `undefined`] |
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


## apiV1CustomerGet

> JoblogicAPIModelsGetCustomerResponse apiV1CustomerGet(authorization, id, tenantId, includeAdditionalDetails)

Gets Customer Details

### Example

```ts
import {
  Configuration,
  CustomerApi,
} from '';
import type { ApiV1CustomerGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CustomerApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Id of the customer to retrieve (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // boolean | Optional flag to include additional details of the customer in the response (optional)
    includeAdditionalDetails: true,
  } satisfies ApiV1CustomerGetRequest;

  try {
    const data = await api.apiV1CustomerGet(body);
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
| **id** | `string` | Id of the customer to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |
| **includeAdditionalDetails** | `boolean` | Optional flag to include additional details of the customer in the response | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsGetCustomerResponse**](JoblogicAPIModelsGetCustomerResponse.md)

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


## apiV1CustomerGetAllPost

> JoblogicAPIModelsSearchCustomerResponse apiV1CustomerGetAllPost(authorization, joblogicAPIModelsSearchCustomerRequest)

Search Customer by keyword, tags and active status

### Example

```ts
import {
  Configuration,
  CustomerApi,
} from '';
import type { ApiV1CustomerGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CustomerApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchCustomerRequest | search conditons (optional)
    joblogicAPIModelsSearchCustomerRequest: ...,
  } satisfies ApiV1CustomerGetAllPostRequest;

  try {
    const data = await api.apiV1CustomerGetAllPost(body);
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
| **joblogicAPIModelsSearchCustomerRequest** | [JoblogicAPIModelsSearchCustomerRequest](JoblogicAPIModelsSearchCustomerRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchCustomerResponse**](JoblogicAPIModelsSearchCustomerResponse.md)

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


## apiV1CustomerGetByIdGet

> JoblogicAPIModelsGetCustomerResponse apiV1CustomerGetByIdGet(authorization, id, tenantId, includeAdditionalDetails)

Get customer by auto Id and tenant id.

### Example

```ts
import {
  Configuration,
  CustomerApi,
} from '';
import type { ApiV1CustomerGetByIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CustomerApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // number | Customer auto Id (optional)
    id: 56,
    // string | Tenant Id (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // boolean | Optional flag to include additional details of the customer in the response (optional)
    includeAdditionalDetails: true,
  } satisfies ApiV1CustomerGetByIdGetRequest;

  try {
    const data = await api.apiV1CustomerGetByIdGet(body);
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
| **id** | `number` | Customer auto Id | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Tenant Id | [Optional] [Defaults to `undefined`] |
| **includeAdditionalDetails** | `boolean` | Optional flag to include additional details of the customer in the response | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsGetCustomerResponse**](JoblogicAPIModelsGetCustomerResponse.md)

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


## apiV1CustomerPost

> JoblogicAPIModelsCreateCustomerResponse apiV1CustomerPost(authorization, joblogicAPIModelsCreateCustomerRequest)

Create Customer

### Example

```ts
import {
  Configuration,
  CustomerApi,
} from '';
import type { ApiV1CustomerPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CustomerApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateCustomerRequest | Customer to create (optional)
    joblogicAPIModelsCreateCustomerRequest: ...,
  } satisfies ApiV1CustomerPostRequest;

  try {
    const data = await api.apiV1CustomerPost(body);
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
| **joblogicAPIModelsCreateCustomerRequest** | [JoblogicAPIModelsCreateCustomerRequest](JoblogicAPIModelsCreateCustomerRequest.md) | Customer to create | [Optional] |

### Return type

[**JoblogicAPIModelsCreateCustomerResponse**](JoblogicAPIModelsCreateCustomerResponse.md)

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


## apiV1CustomerPut

> JoblogicAPIModelsUpdateCustomerResponse apiV1CustomerPut(authorization, joblogicAPIModelsUpdateCustomerRequest)

Update Customer

### Example

```ts
import {
  Configuration,
  CustomerApi,
} from '';
import type { ApiV1CustomerPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CustomerApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateCustomerRequest | Customer to update (optional)
    joblogicAPIModelsUpdateCustomerRequest: ...,
  } satisfies ApiV1CustomerPutRequest;

  try {
    const data = await api.apiV1CustomerPut(body);
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
| **joblogicAPIModelsUpdateCustomerRequest** | [JoblogicAPIModelsUpdateCustomerRequest](JoblogicAPIModelsUpdateCustomerRequest.md) | Customer to update | [Optional] |

### Return type

[**JoblogicAPIModelsUpdateCustomerResponse**](JoblogicAPIModelsUpdateCustomerResponse.md)

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

