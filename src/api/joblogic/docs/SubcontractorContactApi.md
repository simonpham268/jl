# SubcontractorContactApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1SubcontractorContactDelete**](SubcontractorContactApi.md#apiv1subcontractorcontactdelete) | **DELETE** /api/v1/SubcontractorContact | Delete Contact and all contact level associated with that contact |
| [**apiV1SubcontractorContactGetAllGet**](SubcontractorContactApi.md#apiv1subcontractorcontactgetallget) | **GET** /api/v1/SubcontractorContact/GetAll | Get Contact Details by Id and tenant id. |
| [**apiV1SubcontractorContactPost**](SubcontractorContactApi.md#apiv1subcontractorcontactpost) | **POST** /api/v1/SubcontractorContact | Create Supplier Contact |
| [**apiV1SubcontractorContactPut**](SubcontractorContactApi.md#apiv1subcontractorcontactput) | **PUT** /api/v1/SubcontractorContact | Update Contact |



## apiV1SubcontractorContactDelete

> apiV1SubcontractorContactDelete(authorization, id, tenantId)

Delete Contact and all contact level associated with that contact

### Example

```ts
import {
  Configuration,
  SubcontractorContactApi,
} from '';
import type { ApiV1SubcontractorContactDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubcontractorContactApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // number | UniqueId of the Contact to Delete (optional)
    id: 56,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1SubcontractorContactDeleteRequest;

  try {
    const data = await api.apiV1SubcontractorContactDelete(body);
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


## apiV1SubcontractorContactGetAllGet

> JoblogicAPIModelsContactItemResponse apiV1SubcontractorContactGetAllGet(authorization, subcontractorId, tenantId)

Get Contact Details by Id and tenant id.

### Example

```ts
import {
  Configuration,
  SubcontractorContactApi,
} from '';
import type { ApiV1SubcontractorContactGetAllGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubcontractorContactApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Contact Guid (optional)
    subcontractorId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Tenant Id (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1SubcontractorContactGetAllGetRequest;

  try {
    const data = await api.apiV1SubcontractorContactGetAllGet(body);
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
| **subcontractorId** | `string` | Contact Guid | [Optional] [Defaults to `undefined`] |
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


## apiV1SubcontractorContactPost

> JoblogicAPIModelsCreateContactResponse apiV1SubcontractorContactPost(authorization, joblogicAPIModelsCreateSubcontractorContactRequest)

Create Supplier Contact

### Example

```ts
import {
  Configuration,
  SubcontractorContactApi,
} from '';
import type { ApiV1SubcontractorContactPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubcontractorContactApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateSubcontractorContactRequest | Supplier Contact to create (optional)
    joblogicAPIModelsCreateSubcontractorContactRequest: ...,
  } satisfies ApiV1SubcontractorContactPostRequest;

  try {
    const data = await api.apiV1SubcontractorContactPost(body);
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
| **joblogicAPIModelsCreateSubcontractorContactRequest** | [JoblogicAPIModelsCreateSubcontractorContactRequest](JoblogicAPIModelsCreateSubcontractorContactRequest.md) | Supplier Contact to create | [Optional] |

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


## apiV1SubcontractorContactPut

> JobLogicInfrastructureContractExtensionsSuccess apiV1SubcontractorContactPut(authorization, joblogicAPIModelsUpdateSubcontractorContactRequest)

Update Contact

### Example

```ts
import {
  Configuration,
  SubcontractorContactApi,
} from '';
import type { ApiV1SubcontractorContactPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubcontractorContactApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateSubcontractorContactRequest | Supplier Contact to update (optional)
    joblogicAPIModelsUpdateSubcontractorContactRequest: ...,
  } satisfies ApiV1SubcontractorContactPutRequest;

  try {
    const data = await api.apiV1SubcontractorContactPut(body);
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
| **joblogicAPIModelsUpdateSubcontractorContactRequest** | [JoblogicAPIModelsUpdateSubcontractorContactRequest](JoblogicAPIModelsUpdateSubcontractorContactRequest.md) | Supplier Contact to update | [Optional] |

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

