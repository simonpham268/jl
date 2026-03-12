# FormsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1FormsAssigntojobPost**](FormsApi.md#apiv1formsassigntojobpost) | **POST** /api/v1/Forms/assigntojob |  |
| [**apiV1FormsPost**](FormsApi.md#apiv1formspost) | **POST** /api/v1/Forms |  |



## apiV1FormsAssigntojobPost

> apiV1FormsAssigntojobPost(authorization, joblogicAPIModelsAssignJobFormsRequest)



### Example

```ts
import {
  Configuration,
  FormsApi,
} from '';
import type { ApiV1FormsAssigntojobPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FormsApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsAssignJobFormsRequest (optional)
    joblogicAPIModelsAssignJobFormsRequest: ...,
  } satisfies ApiV1FormsAssigntojobPostRequest;

  try {
    const data = await api.apiV1FormsAssigntojobPost(body);
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
| **joblogicAPIModelsAssignJobFormsRequest** | [JoblogicAPIModelsAssignJobFormsRequest](JoblogicAPIModelsAssignJobFormsRequest.md) |  | [Optional] |

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


## apiV1FormsPost

> apiV1FormsPost(authorization, joblogicAPIModelsSearchJobFormsRequest)



### Example

```ts
import {
  Configuration,
  FormsApi,
} from '';
import type { ApiV1FormsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FormsApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchJobFormsRequest (optional)
    joblogicAPIModelsSearchJobFormsRequest: ...,
  } satisfies ApiV1FormsPostRequest;

  try {
    const data = await api.apiV1FormsPost(body);
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
| **joblogicAPIModelsSearchJobFormsRequest** | [JoblogicAPIModelsSearchJobFormsRequest](JoblogicAPIModelsSearchJobFormsRequest.md) |  | [Optional] |

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

