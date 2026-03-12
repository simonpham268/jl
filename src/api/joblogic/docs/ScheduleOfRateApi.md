# ScheduleOfRateApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1ScheduleOfRateGetAllLibraryPost**](ScheduleOfRateApi.md#apiv1scheduleofrategetalllibrarypost) | **POST** /api/v1/ScheduleOfRate/GetAll-Library | Search ScheduleOfRate Library by keyword and additional parameters |
| [**apiV1ScheduleOfRateGetAllPost**](ScheduleOfRateApi.md#apiv1scheduleofrategetallpost) | **POST** /api/v1/ScheduleOfRate/GetAll | Search ScheduleOfRate by keyword and additional parameters |



## apiV1ScheduleOfRateGetAllLibraryPost

> JoblogicAPIModelsSearchSORLibraryResponse apiV1ScheduleOfRateGetAllLibraryPost(authorization, joblogicAPIModelsSearchSORLibraryRequest)

Search ScheduleOfRate Library by keyword and additional parameters

### Example

```ts
import {
  Configuration,
  ScheduleOfRateApi,
} from '';
import type { ApiV1ScheduleOfRateGetAllLibraryPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ScheduleOfRateApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchSORLibraryRequest | search conditons (optional)
    joblogicAPIModelsSearchSORLibraryRequest: ...,
  } satisfies ApiV1ScheduleOfRateGetAllLibraryPostRequest;

  try {
    const data = await api.apiV1ScheduleOfRateGetAllLibraryPost(body);
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
| **joblogicAPIModelsSearchSORLibraryRequest** | [JoblogicAPIModelsSearchSORLibraryRequest](JoblogicAPIModelsSearchSORLibraryRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchSORLibraryResponse**](JoblogicAPIModelsSearchSORLibraryResponse.md)

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


## apiV1ScheduleOfRateGetAllPost

> JoblogicAPIModelsSearchScheduleOfRateResponse apiV1ScheduleOfRateGetAllPost(authorization, joblogicAPIModelsSearchScheduleOfRateRequest)

Search ScheduleOfRate by keyword and additional parameters

### Example

```ts
import {
  Configuration,
  ScheduleOfRateApi,
} from '';
import type { ApiV1ScheduleOfRateGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ScheduleOfRateApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchScheduleOfRateRequest | search conditons (optional)
    joblogicAPIModelsSearchScheduleOfRateRequest: ...,
  } satisfies ApiV1ScheduleOfRateGetAllPostRequest;

  try {
    const data = await api.apiV1ScheduleOfRateGetAllPost(body);
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
| **joblogicAPIModelsSearchScheduleOfRateRequest** | [JoblogicAPIModelsSearchScheduleOfRateRequest](JoblogicAPIModelsSearchScheduleOfRateRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchScheduleOfRateResponse**](JoblogicAPIModelsSearchScheduleOfRateResponse.md)

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

