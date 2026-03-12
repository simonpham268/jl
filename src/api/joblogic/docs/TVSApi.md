# TVSApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1TvsJobPartPost**](TVSApi.md#apiv1tvsjobpartpost) | **POST** /api/v1/tvs/job/part |  |



## apiV1TvsJobPartPost

> apiV1TvsJobPartPost(authorization, joblogicAPIModelsTVSJobMessageContext)



### Example

```ts
import {
  Configuration,
  TVSApi,
} from '';
import type { ApiV1TvsJobPartPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TVSApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsTVSJobMessageContext (optional)
    joblogicAPIModelsTVSJobMessageContext: ...,
  } satisfies ApiV1TvsJobPartPostRequest;

  try {
    const data = await api.apiV1TvsJobPartPost(body);
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
| **joblogicAPIModelsTVSJobMessageContext** | [JoblogicAPIModelsTVSJobMessageContext](JoblogicAPIModelsTVSJobMessageContext.md) |  | [Optional] |

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

