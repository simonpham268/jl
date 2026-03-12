# SellingRateApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1SellingRateGetAllGet**](SellingRateApi.md#apiv1sellingrategetallget) | **GET** /api/v1/SellingRate/GetAll | Get all selling rates of tenantId |



## apiV1SellingRateGetAllGet

> apiV1SellingRateGetAllGet(authorization, tenantId)

Get all selling rates of tenantId

### Example

```ts
import {
  Configuration,
  SellingRateApi,
} from '';
import type { ApiV1SellingRateGetAllGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SellingRateApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1SellingRateGetAllGetRequest;

  try {
    const data = await api.apiV1SellingRateGetAllGet(body);
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
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

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
| **200** | Successful |  -  |
| **400** | Bad Request |  -  |
| **401** | Unauthorized Request |  -  |
| **404** | Not found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

