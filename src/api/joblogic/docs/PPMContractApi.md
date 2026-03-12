# PPMContractApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1PPMContractAddvisitPost**](PPMContractApi.md#apiv1ppmcontractaddvisitpost) | **POST** /api/v1/PPMContract/addvisit |  |
| [**apiV1PPMContractGetAllPost**](PPMContractApi.md#apiv1ppmcontractgetallpost) | **POST** /api/v1/PPMContract/GetAll | Search PPM Contracts |
| [**apiV1PPMContractGetCustomerContractIdGet**](PPMContractApi.md#apiv1ppmcontractgetcustomercontractidget) | **GET** /api/v1/PPMContract/GetCustomerContractId |  |
| [**apiV1PPMContractPost**](PPMContractApi.md#apiv1ppmcontractpost) | **POST** /api/v1/PPMContract |  |



## apiV1PPMContractAddvisitPost

> apiV1PPMContractAddvisitPost(authorization, joblogicAPIModelsRequestCreatePPMVisitRequest)



### Example

```ts
import {
  Configuration,
  PPMContractApi,
} from '';
import type { ApiV1PPMContractAddvisitPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PPMContractApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsRequestCreatePPMVisitRequest (optional)
    joblogicAPIModelsRequestCreatePPMVisitRequest: ...,
  } satisfies ApiV1PPMContractAddvisitPostRequest;

  try {
    const data = await api.apiV1PPMContractAddvisitPost(body);
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
| **joblogicAPIModelsRequestCreatePPMVisitRequest** | [JoblogicAPIModelsRequestCreatePPMVisitRequest](JoblogicAPIModelsRequestCreatePPMVisitRequest.md) |  | [Optional] |

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


## apiV1PPMContractGetAllPost

> JoblogicAPIModelsResponseSearchPPMContractResponse apiV1PPMContractGetAllPost(authorization, joblogicAPIModelsSearchPPMContractRequest)

Search PPM Contracts

### Example

```ts
import {
  Configuration,
  PPMContractApi,
} from '';
import type { ApiV1PPMContractGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PPMContractApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchPPMContractRequest | Search conditions (optional)
    joblogicAPIModelsSearchPPMContractRequest: ...,
  } satisfies ApiV1PPMContractGetAllPostRequest;

  try {
    const data = await api.apiV1PPMContractGetAllPost(body);
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
| **joblogicAPIModelsSearchPPMContractRequest** | [JoblogicAPIModelsSearchPPMContractRequest](JoblogicAPIModelsSearchPPMContractRequest.md) | Search conditions | [Optional] |

### Return type

[**JoblogicAPIModelsResponseSearchPPMContractResponse**](JoblogicAPIModelsResponseSearchPPMContractResponse.md)

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


## apiV1PPMContractGetCustomerContractIdGet

> apiV1PPMContractGetCustomerContractIdGet(authorization, uniqueId, tenantId)



### Example

```ts
import {
  Configuration,
  PPMContractApi,
} from '';
import type { ApiV1PPMContractGetCustomerContractIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PPMContractApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1PPMContractGetCustomerContractIdGetRequest;

  try {
    const data = await api.apiV1PPMContractGetCustomerContractIdGet(body);
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
| **uniqueId** | `string` |  | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` |  | [Optional] [Defaults to `undefined`] |

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
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1PPMContractPost

> apiV1PPMContractPost(authorization, joblogicAPIModelsCreatePPMRequest)



### Example

```ts
import {
  Configuration,
  PPMContractApi,
} from '';
import type { ApiV1PPMContractPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PPMContractApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreatePPMRequest (optional)
    joblogicAPIModelsCreatePPMRequest: ...,
  } satisfies ApiV1PPMContractPostRequest;

  try {
    const data = await api.apiV1PPMContractPost(body);
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
| **joblogicAPIModelsCreatePPMRequest** | [JoblogicAPIModelsCreatePPMRequest](JoblogicAPIModelsCreatePPMRequest.md) |  | [Optional] |

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

