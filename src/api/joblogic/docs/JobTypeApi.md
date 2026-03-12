# JobTypeApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1JobTypeGet**](JobTypeApi.md#apiv1jobtypeget) | **GET** /api/v1/JobType | Gets job type Details |
| [**apiV1JobTypeGetAllPost**](JobTypeApi.md#apiv1jobtypegetallpost) | **POST** /api/v1/JobType/GetAll | Search Job Type by keyword |



## apiV1JobTypeGet

> JoblogicAPIModelsJobTypeItemResponse apiV1JobTypeGet(authorization, uniqueId, tenantId)

Gets job type Details

### Example

```ts
import {
  Configuration,
  JobTypeApi,
} from '';
import type { ApiV1JobTypeGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobTypeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | UniqueId of the job Type to retrieve (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1JobTypeGetRequest;

  try {
    const data = await api.apiV1JobTypeGet(body);
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
| **uniqueId** | `string` | UniqueId of the job Type to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsJobTypeItemResponse**](JoblogicAPIModelsJobTypeItemResponse.md)

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


## apiV1JobTypeGetAllPost

> JoblogicAPIModelsSearchJobTypeResponse apiV1JobTypeGetAllPost(authorization, joblogicAPIModelsSearchJobTypeRequest)

Search Job Type by keyword

### Example

```ts
import {
  Configuration,
  JobTypeApi,
} from '';
import type { ApiV1JobTypeGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobTypeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchJobTypeRequest | search conditons (optional)
    joblogicAPIModelsSearchJobTypeRequest: ...,
  } satisfies ApiV1JobTypeGetAllPostRequest;

  try {
    const data = await api.apiV1JobTypeGetAllPost(body);
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
| **joblogicAPIModelsSearchJobTypeRequest** | [JoblogicAPIModelsSearchJobTypeRequest](JoblogicAPIModelsSearchJobTypeRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchJobTypeResponse**](JoblogicAPIModelsSearchJobTypeResponse.md)

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

