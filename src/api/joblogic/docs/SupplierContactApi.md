# SupplierContactApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1SupplierContactDelete**](SupplierContactApi.md#apiv1suppliercontactdelete) | **DELETE** /api/v1/SupplierContact | Delete Contact and all contact level associated with that contact |
| [**apiV1SupplierContactGetAllGet**](SupplierContactApi.md#apiv1suppliercontactgetallget) | **GET** /api/v1/SupplierContact/GetAll | Get Contact Details by Id and tenant id. |
| [**apiV1SupplierContactPost**](SupplierContactApi.md#apiv1suppliercontactpost) | **POST** /api/v1/SupplierContact | Create Supplier Contact |
| [**apiV1SupplierContactPut**](SupplierContactApi.md#apiv1suppliercontactput) | **PUT** /api/v1/SupplierContact | Update Contact |



## apiV1SupplierContactDelete

> apiV1SupplierContactDelete(authorization, id, tenantId)

Delete Contact and all contact level associated with that contact

### Example

```ts
import {
  Configuration,
  SupplierContactApi,
} from '';
import type { ApiV1SupplierContactDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SupplierContactApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // number | UniqueId of the Contact to Delete (optional)
    id: 56,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1SupplierContactDeleteRequest;

  try {
    const data = await api.apiV1SupplierContactDelete(body);
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
| **id** | `number` | UniqueId of the Contact to Delete | [Optional] [Defaults to `undefined`] |
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


## apiV1SupplierContactGetAllGet

> JoblogicAPIModelsContactItemResponse apiV1SupplierContactGetAllGet(authorization, supplierId, tenantId)

Get Contact Details by Id and tenant id.

### Example

```ts
import {
  Configuration,
  SupplierContactApi,
} from '';
import type { ApiV1SupplierContactGetAllGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SupplierContactApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Contact Guid (optional)
    supplierId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Tenant Id (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1SupplierContactGetAllGetRequest;

  try {
    const data = await api.apiV1SupplierContactGetAllGet(body);
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
| **supplierId** | `string` | Contact Guid | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Tenant Id | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsContactItemResponse**](JoblogicAPIModelsContactItemResponse.md)

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


## apiV1SupplierContactPost

> JoblogicAPIModelsCreateContactResponse apiV1SupplierContactPost(authorization, joblogicAPIModelsCreateSupplierContactRequest)

Create Supplier Contact

### Example

```ts
import {
  Configuration,
  SupplierContactApi,
} from '';
import type { ApiV1SupplierContactPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SupplierContactApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateSupplierContactRequest | Supplier Contact to create (optional)
    joblogicAPIModelsCreateSupplierContactRequest: ...,
  } satisfies ApiV1SupplierContactPostRequest;

  try {
    const data = await api.apiV1SupplierContactPost(body);
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
| **joblogicAPIModelsCreateSupplierContactRequest** | [JoblogicAPIModelsCreateSupplierContactRequest](JoblogicAPIModelsCreateSupplierContactRequest.md) | Supplier Contact to create | [Optional] |

### Return type

[**JoblogicAPIModelsCreateContactResponse**](JoblogicAPIModelsCreateContactResponse.md)

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


## apiV1SupplierContactPut

> JobLogicInfrastructureContractExtensionsSuccess apiV1SupplierContactPut(authorization, joblogicAPIModelsUpdateSupplierContactRequest)

Update Contact

### Example

```ts
import {
  Configuration,
  SupplierContactApi,
} from '';
import type { ApiV1SupplierContactPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SupplierContactApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateSupplierContactRequest | Supplier Contact to update (optional)
    joblogicAPIModelsUpdateSupplierContactRequest: ...,
  } satisfies ApiV1SupplierContactPutRequest;

  try {
    const data = await api.apiV1SupplierContactPut(body);
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
| **joblogicAPIModelsUpdateSupplierContactRequest** | [JoblogicAPIModelsUpdateSupplierContactRequest](JoblogicAPIModelsUpdateSupplierContactRequest.md) | Supplier Contact to update | [Optional] |

### Return type

[**JobLogicInfrastructureContractExtensionsSuccess**](JobLogicInfrastructureContractExtensionsSuccess.md)

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

