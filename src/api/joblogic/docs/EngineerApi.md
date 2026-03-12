# EngineerApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1EngineerGetAllPost**](EngineerApi.md#apiv1engineergetallpost) | **POST** /api/v1/Engineer/GetAll | Search Engineer by keyword and active status |
| [**apiV1EngineerGetByIdGet**](EngineerApi.md#apiv1engineergetbyidget) | **GET** /api/v1/Engineer/GetById | Get engineer by auto Id and tenant id. |
| [**apiV1EngineerGetSchedulerSearchPost**](EngineerApi.md#apiv1engineergetschedulersearchpost) | **POST** /api/v1/Engineer/GetSchedulerSearch |  |
| [**apiV1EngineerMarkOnCallPost**](EngineerApi.md#apiv1engineermarkoncallpost) | **POST** /api/v1/Engineer/MarkOnCall | Mark Engineer as On-Call. |
| [**apiV1EngineerUpdateRegNumberPut**](EngineerApi.md#apiv1engineerupdateregnumberput) | **PUT** /api/v1/Engineer/UpdateRegNumber | Update Engineer Registration Number. |



## apiV1EngineerGetAllPost

> JoblogicAPIModelsSearchEngineerResponse apiV1EngineerGetAllPost(authorization, joblogicAPIModelsSearchEngineerRequest)

Search Engineer by keyword and active status

### Example

```ts
import {
  Configuration,
  EngineerApi,
} from '';
import type { ApiV1EngineerGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EngineerApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchEngineerRequest | search conditons (optional)
    joblogicAPIModelsSearchEngineerRequest: ...,
  } satisfies ApiV1EngineerGetAllPostRequest;

  try {
    const data = await api.apiV1EngineerGetAllPost(body);
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
| **joblogicAPIModelsSearchEngineerRequest** | [JoblogicAPIModelsSearchEngineerRequest](JoblogicAPIModelsSearchEngineerRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchEngineerResponse**](JoblogicAPIModelsSearchEngineerResponse.md)

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


## apiV1EngineerGetByIdGet

> JoblogicAPIModelsEngineerGetByIdResponse apiV1EngineerGetByIdGet(authorization, id, tenantId, includeWorkingHours)

Get engineer by auto Id and tenant id.

### Example

```ts
import {
  Configuration,
  EngineerApi,
} from '';
import type { ApiV1EngineerGetByIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EngineerApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // number | Engineer auto Id (optional)
    id: 56,
    // string | Tenant Id (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // boolean | Retrieve Engineer Working Hours (optional)
    includeWorkingHours: true,
  } satisfies ApiV1EngineerGetByIdGetRequest;

  try {
    const data = await api.apiV1EngineerGetByIdGet(body);
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
| **id** | `number` | Engineer auto Id | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Tenant Id | [Optional] [Defaults to `undefined`] |
| **includeWorkingHours** | `boolean` | Retrieve Engineer Working Hours | [Optional] [Defaults to `false`] |

### Return type

[**JoblogicAPIModelsEngineerGetByIdResponse**](JoblogicAPIModelsEngineerGetByIdResponse.md)

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


## apiV1EngineerGetSchedulerSearchPost

> apiV1EngineerGetSchedulerSearchPost(authorization, joblogicAPIModelsSearchEngineerSchedulerRequest)



### Example

```ts
import {
  Configuration,
  EngineerApi,
} from '';
import type { ApiV1EngineerGetSchedulerSearchPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EngineerApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchEngineerSchedulerRequest (optional)
    joblogicAPIModelsSearchEngineerSchedulerRequest: ...,
  } satisfies ApiV1EngineerGetSchedulerSearchPostRequest;

  try {
    const data = await api.apiV1EngineerGetSchedulerSearchPost(body);
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
| **joblogicAPIModelsSearchEngineerSchedulerRequest** | [JoblogicAPIModelsSearchEngineerSchedulerRequest](JoblogicAPIModelsSearchEngineerSchedulerRequest.md) |  | [Optional] |

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
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1EngineerMarkOnCallPost

> JobLogicInfrastructureContractExtensionsSuccess apiV1EngineerMarkOnCallPost(authorization, joblogicAPIModelsMarkOnCallRequest)

Mark Engineer as On-Call.

### Example

```ts
import {
  Configuration,
  EngineerApi,
} from '';
import type { ApiV1EngineerMarkOnCallPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EngineerApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsMarkOnCallRequest | Mark On Call Engineer (optional)
    joblogicAPIModelsMarkOnCallRequest: ...,
  } satisfies ApiV1EngineerMarkOnCallPostRequest;

  try {
    const data = await api.apiV1EngineerMarkOnCallPost(body);
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
| **joblogicAPIModelsMarkOnCallRequest** | [JoblogicAPIModelsMarkOnCallRequest](JoblogicAPIModelsMarkOnCallRequest.md) | Mark On Call Engineer | [Optional] |

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


## apiV1EngineerUpdateRegNumberPut

> apiV1EngineerUpdateRegNumberPut(authorization, joblogicAPIModelsUpdateEngineerRegNumberRequest)

Update Engineer Registration Number.

### Example

```ts
import {
  Configuration,
  EngineerApi,
} from '';
import type { ApiV1EngineerUpdateRegNumberPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EngineerApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateEngineerRegNumberRequest | Engineer to update (optional)
    joblogicAPIModelsUpdateEngineerRegNumberRequest: ...,
  } satisfies ApiV1EngineerUpdateRegNumberPutRequest;

  try {
    const data = await api.apiV1EngineerUpdateRegNumberPut(body);
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
| **joblogicAPIModelsUpdateEngineerRegNumberRequest** | [JoblogicAPIModelsUpdateEngineerRegNumberRequest](JoblogicAPIModelsUpdateEngineerRegNumberRequest.md) | Engineer to update | [Optional] |

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

