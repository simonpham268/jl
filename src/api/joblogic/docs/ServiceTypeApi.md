# ServiceTypeApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1ServiceTypeGetAllPost**](ServiceTypeApi.md#apiv1servicetypegetallpost) | **POST** /api/v1/ServiceType/GetAll | Search Service Types |
| [**apiV1ServiceTypeGetByIdGet**](ServiceTypeApi.md#apiv1servicetypegetbyidget) | **GET** /api/v1/ServiceType/GetById | Get Service Type Details by auto Id and tenant id. |
| [**apiV1ServiceTypeGetTaskFrequenciesGet**](ServiceTypeApi.md#apiv1servicetypegettaskfrequenciesget) | **GET** /api/v1/ServiceType/GetTaskFrequencies | Get Task Frequencies |



## apiV1ServiceTypeGetAllPost

> JoblogicAPIModelsSearchServiceTypeResponse apiV1ServiceTypeGetAllPost(authorization, joblogicAPIModelsSearchServiceTypeRequest)

Search Service Types

### Example

```ts
import {
  Configuration,
  ServiceTypeApi,
} from '';
import type { ApiV1ServiceTypeGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ServiceTypeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchServiceTypeRequest | Search conditions (optional)
    joblogicAPIModelsSearchServiceTypeRequest: ...,
  } satisfies ApiV1ServiceTypeGetAllPostRequest;

  try {
    const data = await api.apiV1ServiceTypeGetAllPost(body);
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
| **joblogicAPIModelsSearchServiceTypeRequest** | [JoblogicAPIModelsSearchServiceTypeRequest](JoblogicAPIModelsSearchServiceTypeRequest.md) | Search conditions | [Optional] |

### Return type

[**JoblogicAPIModelsSearchServiceTypeResponse**](JoblogicAPIModelsSearchServiceTypeResponse.md)

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
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1ServiceTypeGetByIdGet

> JoblogicAPIModelsServiceTypeResponse apiV1ServiceTypeGetByIdGet(authorization, id, tenantId)

Get Service Type Details by auto Id and tenant id.

### Example

```ts
import {
  Configuration,
  ServiceTypeApi,
} from '';
import type { ApiV1ServiceTypeGetByIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ServiceTypeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Service Type Id (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Tenant Id (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1ServiceTypeGetByIdGetRequest;

  try {
    const data = await api.apiV1ServiceTypeGetByIdGet(body);
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
| **id** | `string` | Service Type Id | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Tenant Id | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsServiceTypeResponse**](JoblogicAPIModelsServiceTypeResponse.md)

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


## apiV1ServiceTypeGetTaskFrequenciesGet

> JoblogicAPIModelsGetTaskFrequencyResponse apiV1ServiceTypeGetTaskFrequenciesGet(authorization, id, tenantId)

Get Task Frequencies

### Example

```ts
import {
  Configuration,
  ServiceTypeApi,
} from '';
import type { ApiV1ServiceTypeGetTaskFrequenciesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ServiceTypeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Service Type Id (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Tenant Id (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1ServiceTypeGetTaskFrequenciesGetRequest;

  try {
    const data = await api.apiV1ServiceTypeGetTaskFrequenciesGet(body);
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
| **id** | `string` | Service Type Id | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Tenant Id | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsGetTaskFrequencyResponse**](JoblogicAPIModelsGetTaskFrequencyResponse.md)

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
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

