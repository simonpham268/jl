# EngineerTeamApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1EngineerTeamGetAllPost**](EngineerTeamApi.md#apiv1engineerteamgetallpost) | **POST** /api/v1/EngineerTeam/GetAll | Search Engineer Team by keyword and additional parameters |



## apiV1EngineerTeamGetAllPost

> JoblogicAPIModelsSearchEngineerTeamResponse apiV1EngineerTeamGetAllPost(authorization, joblogicAPIModelsSearchEngineerTeamRequest)

Search Engineer Team by keyword and additional parameters

### Example

```ts
import {
  Configuration,
  EngineerTeamApi,
} from '';
import type { ApiV1EngineerTeamGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new EngineerTeamApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchEngineerTeamRequest | search conditons (optional)
    joblogicAPIModelsSearchEngineerTeamRequest: ...,
  } satisfies ApiV1EngineerTeamGetAllPostRequest;

  try {
    const data = await api.apiV1EngineerTeamGetAllPost(body);
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
| **joblogicAPIModelsSearchEngineerTeamRequest** | [JoblogicAPIModelsSearchEngineerTeamRequest](JoblogicAPIModelsSearchEngineerTeamRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchEngineerTeamResponse**](JoblogicAPIModelsSearchEngineerTeamResponse.md)

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

