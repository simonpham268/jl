# AuditApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1AuditGet**](AuditApi.md#apiv1auditget) | **GET** /api/v1/Audit | Get AuditEntry |
| [**apiV1AuditPurchaseOrderLineSearchAuditPost**](AuditApi.md#apiv1auditpurchaseorderlinesearchauditpost) | **POST** /api/v1/Audit/PurchaseOrderLine/SearchAudit | Search Purchase Order Line Audit entries |
| [**apiV1AuditPurchaseOrderSearchAuditPost**](AuditApi.md#apiv1auditpurchaseordersearchauditpost) | **POST** /api/v1/Audit/PurchaseOrder/SearchAudit | Search Purchase Order Audit entries |
| [**apiV1AuditSubcontractorPurchaseOrderLineSearchAuditPost**](AuditApi.md#apiv1auditsubcontractorpurchaseorderlinesearchauditpost) | **POST** /api/v1/Audit/SubcontractorPurchaseOrderLine/SearchAudit | Search Subcontractor Purchase Order Line Audit entries |
| [**apiV1AuditSubcontractorPurchaseOrderSearchAuditPost**](AuditApi.md#apiv1auditsubcontractorpurchaseordersearchauditpost) | **POST** /api/v1/Audit/SubcontractorPurchaseOrder/SearchAudit | Search Subcontractor Purchase Order Audit entries |



## apiV1AuditGet

> JoblogicAPIModelsAuditItemResponse apiV1AuditGet(authorization, id, tenantId)

Get AuditEntry

### Example

```ts
import {
  Configuration,
  AuditApi,
} from '';
import type { ApiV1AuditGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuditApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Id of the Audit entry retrieve (optional)
    id: id_example,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1AuditGetRequest;

  try {
    const data = await api.apiV1AuditGet(body);
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
| **id** | `string` | Id of the Audit entry retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsAuditItemResponse**](JoblogicAPIModelsAuditItemResponse.md)

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


## apiV1AuditPurchaseOrderLineSearchAuditPost

> JoblogicAPIModelsSearchAuditResponse apiV1AuditPurchaseOrderLineSearchAuditPost(authorization, joblogicAPIModelsSearchPurchaseOrderLineAuditRequest)

Search Purchase Order Line Audit entries

### Example

```ts
import {
  Configuration,
  AuditApi,
} from '';
import type { ApiV1AuditPurchaseOrderLineSearchAuditPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuditApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchPurchaseOrderLineAuditRequest | search conditons (optional)
    joblogicAPIModelsSearchPurchaseOrderLineAuditRequest: ...,
  } satisfies ApiV1AuditPurchaseOrderLineSearchAuditPostRequest;

  try {
    const data = await api.apiV1AuditPurchaseOrderLineSearchAuditPost(body);
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
| **joblogicAPIModelsSearchPurchaseOrderLineAuditRequest** | [JoblogicAPIModelsSearchPurchaseOrderLineAuditRequest](JoblogicAPIModelsSearchPurchaseOrderLineAuditRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchAuditResponse**](JoblogicAPIModelsSearchAuditResponse.md)

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


## apiV1AuditPurchaseOrderSearchAuditPost

> JoblogicAPIModelsSearchAuditResponse apiV1AuditPurchaseOrderSearchAuditPost(authorization, joblogicAPIModelsSearchPurchaseOrderAuditRequest)

Search Purchase Order Audit entries

### Example

```ts
import {
  Configuration,
  AuditApi,
} from '';
import type { ApiV1AuditPurchaseOrderSearchAuditPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuditApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchPurchaseOrderAuditRequest | search conditons (optional)
    joblogicAPIModelsSearchPurchaseOrderAuditRequest: ...,
  } satisfies ApiV1AuditPurchaseOrderSearchAuditPostRequest;

  try {
    const data = await api.apiV1AuditPurchaseOrderSearchAuditPost(body);
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
| **joblogicAPIModelsSearchPurchaseOrderAuditRequest** | [JoblogicAPIModelsSearchPurchaseOrderAuditRequest](JoblogicAPIModelsSearchPurchaseOrderAuditRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchAuditResponse**](JoblogicAPIModelsSearchAuditResponse.md)

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


## apiV1AuditSubcontractorPurchaseOrderLineSearchAuditPost

> JoblogicAPIModelsSearchAuditResponse apiV1AuditSubcontractorPurchaseOrderLineSearchAuditPost(authorization, joblogicAPIModelsSearchSubcontractorPurchaseOrderLineAuditRequest)

Search Subcontractor Purchase Order Line Audit entries

### Example

```ts
import {
  Configuration,
  AuditApi,
} from '';
import type { ApiV1AuditSubcontractorPurchaseOrderLineSearchAuditPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuditApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchSubcontractorPurchaseOrderLineAuditRequest | search conditons (optional)
    joblogicAPIModelsSearchSubcontractorPurchaseOrderLineAuditRequest: ...,
  } satisfies ApiV1AuditSubcontractorPurchaseOrderLineSearchAuditPostRequest;

  try {
    const data = await api.apiV1AuditSubcontractorPurchaseOrderLineSearchAuditPost(body);
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
| **joblogicAPIModelsSearchSubcontractorPurchaseOrderLineAuditRequest** | [JoblogicAPIModelsSearchSubcontractorPurchaseOrderLineAuditRequest](JoblogicAPIModelsSearchSubcontractorPurchaseOrderLineAuditRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchAuditResponse**](JoblogicAPIModelsSearchAuditResponse.md)

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


## apiV1AuditSubcontractorPurchaseOrderSearchAuditPost

> JoblogicAPIModelsSearchAuditResponse apiV1AuditSubcontractorPurchaseOrderSearchAuditPost(authorization, joblogicAPIModelsSearchSubcontractorPurchaseOrderAuditRequest)

Search Subcontractor Purchase Order Audit entries

### Example

```ts
import {
  Configuration,
  AuditApi,
} from '';
import type { ApiV1AuditSubcontractorPurchaseOrderSearchAuditPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AuditApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchSubcontractorPurchaseOrderAuditRequest | search conditons (optional)
    joblogicAPIModelsSearchSubcontractorPurchaseOrderAuditRequest: ...,
  } satisfies ApiV1AuditSubcontractorPurchaseOrderSearchAuditPostRequest;

  try {
    const data = await api.apiV1AuditSubcontractorPurchaseOrderSearchAuditPost(body);
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
| **joblogicAPIModelsSearchSubcontractorPurchaseOrderAuditRequest** | [JoblogicAPIModelsSearchSubcontractorPurchaseOrderAuditRequest](JoblogicAPIModelsSearchSubcontractorPurchaseOrderAuditRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchAuditResponse**](JoblogicAPIModelsSearchAuditResponse.md)

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

