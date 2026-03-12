# PriorityApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1PriorityGet**](PriorityApi.md#apiv1priorityget) | **GET** /api/v1/Priority | Gets Priority Details |
| [**apiV1PriorityGetAllPost**](PriorityApi.md#apiv1prioritygetallpost) | **POST** /api/v1/Priority/GetAll | Search Priority by keyword |



## apiV1PriorityGet

> JoblogicAPIModelsPriorityItemResponse apiV1PriorityGet(authorization, uniqueId, tenantId)

Gets Priority Details

### Example

```ts
import {
  Configuration,
  PriorityApi,
} from '';
import type { ApiV1PriorityGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PriorityApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | UniqueId of the priority to retrieve (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1PriorityGetRequest;

  try {
    const data = await api.apiV1PriorityGet(body);
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
| **uniqueId** | `string` | UniqueId of the priority to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsPriorityItemResponse**](JoblogicAPIModelsPriorityItemResponse.md)

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


## apiV1PriorityGetAllPost

> JoblogicAPIModelsSearchPriorityResponse apiV1PriorityGetAllPost(authorization, joblogicAPIModelsSearchPriorityRequest)

Search Priority by keyword

### Example

```ts
import {
  Configuration,
  PriorityApi,
} from '';
import type { ApiV1PriorityGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PriorityApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchPriorityRequest | search conditons (optional)
    joblogicAPIModelsSearchPriorityRequest: ...,
  } satisfies ApiV1PriorityGetAllPostRequest;

  try {
    const data = await api.apiV1PriorityGetAllPost(body);
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
| **joblogicAPIModelsSearchPriorityRequest** | [JoblogicAPIModelsSearchPriorityRequest](JoblogicAPIModelsSearchPriorityRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchPriorityResponse**](JoblogicAPIModelsSearchPriorityResponse.md)

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

