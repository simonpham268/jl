# SupplierApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1SupplierDelete**](SupplierApi.md#apiv1supplierdelete) | **DELETE** /api/v1/Supplier | Delete Supplier |
| [**apiV1SupplierGet**](SupplierApi.md#apiv1supplierget) | **GET** /api/v1/Supplier | Gets Supplier Details |
| [**apiV1SupplierGetAllPost**](SupplierApi.md#apiv1suppliergetallpost) | **POST** /api/v1/Supplier/GetAll | Search Supplier by keyword and active status |
| [**apiV1SupplierGetByIdGet**](SupplierApi.md#apiv1suppliergetbyidget) | **GET** /api/v1/Supplier/GetById | Get Supplier Details by Id and tenant id. |
| [**apiV1SupplierPost**](SupplierApi.md#apiv1supplierpost) | **POST** /api/v1/Supplier | Create Supplier |
| [**apiV1SupplierPut**](SupplierApi.md#apiv1supplierput) | **PUT** /api/v1/Supplier | Update Supplier |



## apiV1SupplierDelete

> apiV1SupplierDelete(authorization, id, tenantId)

Delete Supplier

### Example

```ts
import {
  Configuration,
  SupplierApi,
} from '';
import type { ApiV1SupplierDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SupplierApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Id of the Supplier to delete (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1SupplierDeleteRequest;

  try {
    const data = await api.apiV1SupplierDelete(body);
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
| **id** | `string` | Id of the Supplier to delete | [Optional] [Defaults to `undefined`] |
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


## apiV1SupplierGet

> JoblogicAPIModelsGetSupplierResponse apiV1SupplierGet(authorization, id, tenantId, includeAdditionalDetails)

Gets Supplier Details

### Example

```ts
import {
  Configuration,
  SupplierApi,
} from '';
import type { ApiV1SupplierGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SupplierApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Id of the Supplier to retrieve (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // boolean | Optional flag to include additional details of the supplier in the response (optional)
    includeAdditionalDetails: true,
  } satisfies ApiV1SupplierGetRequest;

  try {
    const data = await api.apiV1SupplierGet(body);
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
| **id** | `string` | Id of the Supplier to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |
| **includeAdditionalDetails** | `boolean` | Optional flag to include additional details of the supplier in the response | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsGetSupplierResponse**](JoblogicAPIModelsGetSupplierResponse.md)

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


## apiV1SupplierGetAllPost

> JoblogicAPIModelsSearchSupplierResponse apiV1SupplierGetAllPost(authorization, joblogicAPIModelsSearchSupplierRequest)

Search Supplier by keyword and active status

### Example

```ts
import {
  Configuration,
  SupplierApi,
} from '';
import type { ApiV1SupplierGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SupplierApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchSupplierRequest | search conditons (optional)
    joblogicAPIModelsSearchSupplierRequest: ...,
  } satisfies ApiV1SupplierGetAllPostRequest;

  try {
    const data = await api.apiV1SupplierGetAllPost(body);
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
| **joblogicAPIModelsSearchSupplierRequest** | [JoblogicAPIModelsSearchSupplierRequest](JoblogicAPIModelsSearchSupplierRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchSupplierResponse**](JoblogicAPIModelsSearchSupplierResponse.md)

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


## apiV1SupplierGetByIdGet

> JoblogicAPIModelsSupplierItemResponse apiV1SupplierGetByIdGet(authorization, id, tenantId, includeAdditionalDetails)

Get Supplier Details by Id and tenant id.

### Example

```ts
import {
  Configuration,
  SupplierApi,
} from '';
import type { ApiV1SupplierGetByIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SupplierApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Supplier Guid (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Tenant Id (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // boolean | Optional flag to include additional details of the supplier in the response (optional)
    includeAdditionalDetails: true,
  } satisfies ApiV1SupplierGetByIdGetRequest;

  try {
    const data = await api.apiV1SupplierGetByIdGet(body);
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
| **id** | `string` | Supplier Guid | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Tenant Id | [Optional] [Defaults to `undefined`] |
| **includeAdditionalDetails** | `boolean` | Optional flag to include additional details of the supplier in the response | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsSupplierItemResponse**](JoblogicAPIModelsSupplierItemResponse.md)

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


## apiV1SupplierPost

> JoblogicAPIModelsCreateSupplierResponse apiV1SupplierPost(authorization, joblogicAPIModelsCreateSupplierRequest)

Create Supplier

### Example

```ts
import {
  Configuration,
  SupplierApi,
} from '';
import type { ApiV1SupplierPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SupplierApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateSupplierRequest | Supplier to create (optional)
    joblogicAPIModelsCreateSupplierRequest: ...,
  } satisfies ApiV1SupplierPostRequest;

  try {
    const data = await api.apiV1SupplierPost(body);
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
| **joblogicAPIModelsCreateSupplierRequest** | [JoblogicAPIModelsCreateSupplierRequest](JoblogicAPIModelsCreateSupplierRequest.md) | Supplier to create | [Optional] |

### Return type

[**JoblogicAPIModelsCreateSupplierResponse**](JoblogicAPIModelsCreateSupplierResponse.md)

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


## apiV1SupplierPut

> JoblogicAPIModelsUpdateSupplierResponse apiV1SupplierPut(authorization, joblogicAPIModelsUpdateSupplierRequest)

Update Supplier

### Example

```ts
import {
  Configuration,
  SupplierApi,
} from '';
import type { ApiV1SupplierPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SupplierApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateSupplierRequest | Supplier to update (optional)
    joblogicAPIModelsUpdateSupplierRequest: ...,
  } satisfies ApiV1SupplierPutRequest;

  try {
    const data = await api.apiV1SupplierPut(body);
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
| **joblogicAPIModelsUpdateSupplierRequest** | [JoblogicAPIModelsUpdateSupplierRequest](JoblogicAPIModelsUpdateSupplierRequest.md) | Supplier to update | [Optional] |

### Return type

[**JoblogicAPIModelsUpdateSupplierResponse**](JoblogicAPIModelsUpdateSupplierResponse.md)

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

