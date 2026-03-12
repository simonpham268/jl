# JobSubcontractorApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1JobSubcontractorAcceptPost**](JobSubcontractorApi.md#apiv1jobsubcontractoracceptpost) | **POST** /api/v1/JobSubcontractor/Accept | Accepts a subcontractor allocation job. |
| [**apiV1JobSubcontractorAllocatePost**](JobSubcontractorApi.md#apiv1jobsubcontractorallocatepost) | **POST** /api/v1/JobSubcontractor/Allocate | Subcontractor Visit Allocation |
| [**apiV1JobSubcontractorGet**](JobSubcontractorApi.md#apiv1jobsubcontractorget) | **GET** /api/v1/JobSubcontractor | Get Job Subcontractor by Job Unique Id |
| [**apiV1JobSubcontractorRejectPost**](JobSubcontractorApi.md#apiv1jobsubcontractorrejectpost) | **POST** /api/v1/JobSubcontractor/Reject | Rejects a subcontractor allocation job. |
| [**apiV1JobSubcontractorTransferPost**](JobSubcontractorApi.md#apiv1jobsubcontractortransferpost) | **POST** /api/v1/JobSubcontractor/Transfer | Transfers a subcontractor job. |



## apiV1JobSubcontractorAcceptPost

> string apiV1JobSubcontractorAcceptPost(authorization, joblogicAPIModelsSubcontractorJobAcceptRequest)

Accepts a subcontractor allocation job.

### Example

```ts
import {
  Configuration,
  JobSubcontractorApi,
} from '';
import type { ApiV1JobSubcontractorAcceptPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobSubcontractorApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSubcontractorJobAcceptRequest | The accept request containing JobId and TenantId. (optional)
    joblogicAPIModelsSubcontractorJobAcceptRequest: ...,
  } satisfies ApiV1JobSubcontractorAcceptPostRequest;

  try {
    const data = await api.apiV1JobSubcontractorAcceptPost(body);
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
| **joblogicAPIModelsSubcontractorJobAcceptRequest** | [JoblogicAPIModelsSubcontractorJobAcceptRequest](JoblogicAPIModelsSubcontractorJobAcceptRequest.md) | The accept request containing JobId and TenantId. | [Optional] |

### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json-patch+json`, `application/json`, `text/json`, `application/*+json`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful operation |  -  |
| **400** | Bad Request - Validation errors |  -  |
| **401** | Unauthorized Request |  -  |
| **404** | Resource not found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1JobSubcontractorAllocatePost

> JoblogicAPIModelsSubcontractorAllocateRequest apiV1JobSubcontractorAllocatePost(authorization, joblogicAPIModelsSubcontractorAllocateRequest)

Subcontractor Visit Allocation

### Example

```ts
import {
  Configuration,
  JobSubcontractorApi,
} from '';
import type { ApiV1JobSubcontractorAllocatePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobSubcontractorApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSubcontractorAllocateRequest | Subconctractor Allocation (optional)
    joblogicAPIModelsSubcontractorAllocateRequest: ...,
  } satisfies ApiV1JobSubcontractorAllocatePostRequest;

  try {
    const data = await api.apiV1JobSubcontractorAllocatePost(body);
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
| **joblogicAPIModelsSubcontractorAllocateRequest** | [JoblogicAPIModelsSubcontractorAllocateRequest](JoblogicAPIModelsSubcontractorAllocateRequest.md) | Subconctractor Allocation | [Optional] |

### Return type

[**JoblogicAPIModelsSubcontractorAllocateRequest**](JoblogicAPIModelsSubcontractorAllocateRequest.md)

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


## apiV1JobSubcontractorGet

> Array&lt;JoblogicAPIModelsGetJobSubcontractorResponse&gt; apiV1JobSubcontractorGet(authorization, id, tenantId)

Get Job Subcontractor by Job Unique Id

### Example

```ts
import {
  Configuration,
  JobSubcontractorApi,
} from '';
import type { ApiV1JobSubcontractorGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobSubcontractorApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Unique Id of the job (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1JobSubcontractorGetRequest;

  try {
    const data = await api.apiV1JobSubcontractorGet(body);
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
| **id** | `string` | Unique Id of the job | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;JoblogicAPIModelsGetJobSubcontractorResponse&gt;**](JoblogicAPIModelsGetJobSubcontractorResponse.md)

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


## apiV1JobSubcontractorRejectPost

> boolean apiV1JobSubcontractorRejectPost(authorization, joblogicAPIModelsSubcontractorJobRejectRequest)

Rejects a subcontractor allocation job.

### Example

```ts
import {
  Configuration,
  JobSubcontractorApi,
} from '';
import type { ApiV1JobSubcontractorRejectPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobSubcontractorApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSubcontractorJobRejectRequest | The reject request containing JobId, Reason and TenantId. (optional)
    joblogicAPIModelsSubcontractorJobRejectRequest: ...,
  } satisfies ApiV1JobSubcontractorRejectPostRequest;

  try {
    const data = await api.apiV1JobSubcontractorRejectPost(body);
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
| **joblogicAPIModelsSubcontractorJobRejectRequest** | [JoblogicAPIModelsSubcontractorJobRejectRequest](JoblogicAPIModelsSubcontractorJobRejectRequest.md) | The reject request containing JobId, Reason and TenantId. | [Optional] |

### Return type

**boolean**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json-patch+json`, `application/json`, `text/json`, `application/*+json`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful operation |  -  |
| **400** | Bad Request - Validation errors |  -  |
| **401** | Unauthorized Request |  -  |
| **404** | Resource not found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1JobSubcontractorTransferPost

> boolean apiV1JobSubcontractorTransferPost(authorization, joblogicAPIModelsSubcontractorJobTransferRequest)

Transfers a subcontractor job.

### Example

```ts
import {
  Configuration,
  JobSubcontractorApi,
} from '';
import type { ApiV1JobSubcontractorTransferPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobSubcontractorApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSubcontractorJobTransferRequest | The transfer request containing JobId and TenantId. (optional)
    joblogicAPIModelsSubcontractorJobTransferRequest: ...,
  } satisfies ApiV1JobSubcontractorTransferPostRequest;

  try {
    const data = await api.apiV1JobSubcontractorTransferPost(body);
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
| **joblogicAPIModelsSubcontractorJobTransferRequest** | [JoblogicAPIModelsSubcontractorJobTransferRequest](JoblogicAPIModelsSubcontractorJobTransferRequest.md) | The transfer request containing JobId and TenantId. | [Optional] |

### Return type

**boolean**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json-patch+json`, `application/json`, `text/json`, `application/*+json`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful operation |  -  |
| **400** | Bad Request - Validation errors |  -  |
| **401** | Unauthorized Request |  -  |
| **404** | Resource not found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

