# SubcontractorApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1SubcontractorDelete**](SubcontractorApi.md#apiv1subcontractordelete) | **DELETE** /api/v1/Subcontractor | Delete Subcontractor |
| [**apiV1SubcontractorGet**](SubcontractorApi.md#apiv1subcontractorget) | **GET** /api/v1/Subcontractor | Gets Subcontractor Details |
| [**apiV1SubcontractorGetAllPost**](SubcontractorApi.md#apiv1subcontractorgetallpost) | **POST** /api/v1/Subcontractor/GetAll | Search Subcontractor by keyword |
| [**apiV1SubcontractorPost**](SubcontractorApi.md#apiv1subcontractorpost) | **POST** /api/v1/Subcontractor | Create Subcontractor |
| [**apiV1SubcontractorPut**](SubcontractorApi.md#apiv1subcontractorput) | **PUT** /api/v1/Subcontractor | Update Subcontractor |



## apiV1SubcontractorDelete

> apiV1SubcontractorDelete(authorization, uniqueId, tenantId)

Delete Subcontractor

### Example

```ts
import {
  Configuration,
  SubcontractorApi,
} from '';
import type { ApiV1SubcontractorDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubcontractorApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Id of the Subcontractor to delete (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1SubcontractorDeleteRequest;

  try {
    const data = await api.apiV1SubcontractorDelete(body);
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
| **uniqueId** | `string` | Id of the Subcontractor to delete | [Optional] [Defaults to `undefined`] |
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


## apiV1SubcontractorGet

> JoblogicAPIModelsGetSubcontractorResponse apiV1SubcontractorGet(authorization, uniqueId, tenantId)

Gets Subcontractor Details

### Example

```ts
import {
  Configuration,
  SubcontractorApi,
} from '';
import type { ApiV1SubcontractorGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubcontractorApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | UniqueId of the Subcontractor to retrieve (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1SubcontractorGetRequest;

  try {
    const data = await api.apiV1SubcontractorGet(body);
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
| **uniqueId** | `string` | UniqueId of the Subcontractor to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsGetSubcontractorResponse**](JoblogicAPIModelsGetSubcontractorResponse.md)

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


## apiV1SubcontractorGetAllPost

> JoblogicAPIModelsSearchCustomerTypeResponse apiV1SubcontractorGetAllPost(authorization, joblogicAPIModelsSearchSubcontractorRequest)

Search Subcontractor by keyword

### Example

```ts
import {
  Configuration,
  SubcontractorApi,
} from '';
import type { ApiV1SubcontractorGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubcontractorApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchSubcontractorRequest | search conditons (optional)
    joblogicAPIModelsSearchSubcontractorRequest: ...,
  } satisfies ApiV1SubcontractorGetAllPostRequest;

  try {
    const data = await api.apiV1SubcontractorGetAllPost(body);
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
| **joblogicAPIModelsSearchSubcontractorRequest** | [JoblogicAPIModelsSearchSubcontractorRequest](JoblogicAPIModelsSearchSubcontractorRequest.md) | search conditons | [Optional] |

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


## apiV1SubcontractorPost

> JoblogicAPIModelsCreateSubcontractorResponse apiV1SubcontractorPost(authorization, joblogicAPIModelsCreateSubcontractorRequest)

Create Subcontractor

### Example

```ts
import {
  Configuration,
  SubcontractorApi,
} from '';
import type { ApiV1SubcontractorPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubcontractorApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateSubcontractorRequest | Subcontractor to create (optional)
    joblogicAPIModelsCreateSubcontractorRequest: ...,
  } satisfies ApiV1SubcontractorPostRequest;

  try {
    const data = await api.apiV1SubcontractorPost(body);
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
| **joblogicAPIModelsCreateSubcontractorRequest** | [JoblogicAPIModelsCreateSubcontractorRequest](JoblogicAPIModelsCreateSubcontractorRequest.md) | Subcontractor to create | [Optional] |

### Return type

[**JoblogicAPIModelsCreateSubcontractorResponse**](JoblogicAPIModelsCreateSubcontractorResponse.md)

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


## apiV1SubcontractorPut

> JoblogicAPIModelsUpdateSubcontractorResponse apiV1SubcontractorPut(authorization, joblogicAPIModelsUpdateSubcontractorRequest)

Update Subcontractor

### Example

```ts
import {
  Configuration,
  SubcontractorApi,
} from '';
import type { ApiV1SubcontractorPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubcontractorApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateSubcontractorRequest | Subcontractor to update (optional)
    joblogicAPIModelsUpdateSubcontractorRequest: ...,
  } satisfies ApiV1SubcontractorPutRequest;

  try {
    const data = await api.apiV1SubcontractorPut(body);
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
| **joblogicAPIModelsUpdateSubcontractorRequest** | [JoblogicAPIModelsUpdateSubcontractorRequest](JoblogicAPIModelsUpdateSubcontractorRequest.md) | Subcontractor to update | [Optional] |

### Return type

[**JoblogicAPIModelsUpdateSubcontractorResponse**](JoblogicAPIModelsUpdateSubcontractorResponse.md)

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

