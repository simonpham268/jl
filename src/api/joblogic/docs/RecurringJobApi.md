# RecurringJobApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1RecurringJobPost**](RecurringJobApi.md#apiv1recurringjobpost) | **POST** /api/v1/RecurringJob | Create Recurring Job |



## apiV1RecurringJobPost

> JoblogicAPIModelsCreateJobRecurResponse apiV1RecurringJobPost(authorization, joblogicAPIModelsRequestCreateJobRecurRequest)

Create Recurring Job

### Example

```ts
import {
  Configuration,
  RecurringJobApi,
} from '';
import type { ApiV1RecurringJobPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new RecurringJobApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsRequestCreateJobRecurRequest | Job Recur to create (optional)
    joblogicAPIModelsRequestCreateJobRecurRequest: ...,
  } satisfies ApiV1RecurringJobPostRequest;

  try {
    const data = await api.apiV1RecurringJobPost(body);
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
| **joblogicAPIModelsRequestCreateJobRecurRequest** | [JoblogicAPIModelsRequestCreateJobRecurRequest](JoblogicAPIModelsRequestCreateJobRecurRequest.md) | Job Recur to create | [Optional] |

### Return type

[**JoblogicAPIModelsCreateJobRecurResponse**](JoblogicAPIModelsCreateJobRecurResponse.md)

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

