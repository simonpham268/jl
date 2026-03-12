# PayBandApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1PayBandGetAllPost**](PayBandApi.md#apiv1paybandgetallpost) | **POST** /api/v1/PayBand/GetAll | Search PayBand by keyword and additional parameters |



## apiV1PayBandGetAllPost

> JoblogicAPIModelsSearchPayBandResponse apiV1PayBandGetAllPost(authorization, joblogicAPIModelsSearchPayBandRequest)

Search PayBand by keyword and additional parameters

### Example

```ts
import {
  Configuration,
  PayBandApi,
} from '';
import type { ApiV1PayBandGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PayBandApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchPayBandRequest | search conditons (optional)
    joblogicAPIModelsSearchPayBandRequest: ...,
  } satisfies ApiV1PayBandGetAllPostRequest;

  try {
    const data = await api.apiV1PayBandGetAllPost(body);
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
| **joblogicAPIModelsSearchPayBandRequest** | [JoblogicAPIModelsSearchPayBandRequest](JoblogicAPIModelsSearchPayBandRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchPayBandResponse**](JoblogicAPIModelsSearchPayBandResponse.md)

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

