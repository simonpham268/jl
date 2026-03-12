# CustomerTypeApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1CustomerTypeDelete**](CustomerTypeApi.md#apiv1customertypedelete) | **DELETE** /api/v1/CustomerType | Delete Customer Type |
| [**apiV1CustomerTypeGet**](CustomerTypeApi.md#apiv1customertypeget) | **GET** /api/v1/CustomerType | Gets Customer Type Details |
| [**apiV1CustomerTypeGetAllPost**](CustomerTypeApi.md#apiv1customertypegetallpost) | **POST** /api/v1/CustomerType/GetAll | Search Customer Type by keyword |
| [**apiV1CustomerTypePost**](CustomerTypeApi.md#apiv1customertypepost) | **POST** /api/v1/CustomerType | Create Customer Type |
| [**apiV1CustomerTypePut**](CustomerTypeApi.md#apiv1customertypeput) | **PUT** /api/v1/CustomerType | Update Customer Type |



## apiV1CustomerTypeDelete

> apiV1CustomerTypeDelete(authorization, uniqueId, tenantId)

Delete Customer Type

### Example

```ts
import {
  Configuration,
  CustomerTypeApi,
} from '';
import type { ApiV1CustomerTypeDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CustomerTypeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | UniqueId of the Customer Type to Delete (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1CustomerTypeDeleteRequest;

  try {
    const data = await api.apiV1CustomerTypeDelete(body);
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
| **uniqueId** | `string` | UniqueId of the Customer Type to Delete | [Optional] [Defaults to `undefined`] |
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


## apiV1CustomerTypeGet

> JoblogicAPIModelsGetCustomerTypeResponse apiV1CustomerTypeGet(authorization, uniqueId, tenantId)

Gets Customer Type Details

### Example

```ts
import {
  Configuration,
  CustomerTypeApi,
} from '';
import type { ApiV1CustomerTypeGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CustomerTypeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | UniqueId of the Customer Type to retrieve (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1CustomerTypeGetRequest;

  try {
    const data = await api.apiV1CustomerTypeGet(body);
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
| **uniqueId** | `string` | UniqueId of the Customer Type to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsGetCustomerTypeResponse**](JoblogicAPIModelsGetCustomerTypeResponse.md)

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


## apiV1CustomerTypeGetAllPost

> JoblogicAPIModelsSearchCustomerTypeResponse apiV1CustomerTypeGetAllPost(authorization, joblogicAPIModelsSearchCustomerTypeRequest)

Search Customer Type by keyword

### Example

```ts
import {
  Configuration,
  CustomerTypeApi,
} from '';
import type { ApiV1CustomerTypeGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CustomerTypeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchCustomerTypeRequest | search conditons (optional)
    joblogicAPIModelsSearchCustomerTypeRequest: ...,
  } satisfies ApiV1CustomerTypeGetAllPostRequest;

  try {
    const data = await api.apiV1CustomerTypeGetAllPost(body);
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
| **joblogicAPIModelsSearchCustomerTypeRequest** | [JoblogicAPIModelsSearchCustomerTypeRequest](JoblogicAPIModelsSearchCustomerTypeRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchCustomerTypeResponse**](JoblogicAPIModelsSearchCustomerTypeResponse.md)

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


## apiV1CustomerTypePost

> JoblogicAPIModelsCreateCustomerTypeResponse apiV1CustomerTypePost(authorization, joblogicAPIModelsCreateCustomerTypeRequest)

Create Customer Type

### Example

```ts
import {
  Configuration,
  CustomerTypeApi,
} from '';
import type { ApiV1CustomerTypePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CustomerTypeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateCustomerTypeRequest | Customer Type to create (optional)
    joblogicAPIModelsCreateCustomerTypeRequest: ...,
  } satisfies ApiV1CustomerTypePostRequest;

  try {
    const data = await api.apiV1CustomerTypePost(body);
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
| **joblogicAPIModelsCreateCustomerTypeRequest** | [JoblogicAPIModelsCreateCustomerTypeRequest](JoblogicAPIModelsCreateCustomerTypeRequest.md) | Customer Type to create | [Optional] |

### Return type

[**JoblogicAPIModelsCreateCustomerTypeResponse**](JoblogicAPIModelsCreateCustomerTypeResponse.md)

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


## apiV1CustomerTypePut

> JoblogicAPIModelsUpdateCustomerTypeResponse apiV1CustomerTypePut(authorization, joblogicAPIModelsUpdateCustomerTypeRequest)

Update Customer Type

### Example

```ts
import {
  Configuration,
  CustomerTypeApi,
} from '';
import type { ApiV1CustomerTypePutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CustomerTypeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateCustomerTypeRequest | Customer Type to update (optional)
    joblogicAPIModelsUpdateCustomerTypeRequest: ...,
  } satisfies ApiV1CustomerTypePutRequest;

  try {
    const data = await api.apiV1CustomerTypePut(body);
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
| **joblogicAPIModelsUpdateCustomerTypeRequest** | [JoblogicAPIModelsUpdateCustomerTypeRequest](JoblogicAPIModelsUpdateCustomerTypeRequest.md) | Customer Type to update | [Optional] |

### Return type

[**JoblogicAPIModelsUpdateCustomerTypeResponse**](JoblogicAPIModelsUpdateCustomerTypeResponse.md)

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

