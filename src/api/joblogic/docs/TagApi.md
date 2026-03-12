# TagApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1TagGetAllPost**](TagApi.md#apiv1taggetallpost) | **POST** /api/v1/Tag/GetAll | Search Tag by title |
| [**apiV1TagGetByIdGet**](TagApi.md#apiv1taggetbyidget) | **GET** /api/v1/Tag/GetById | Get Tag by Unique Id and tenant id. |
| [**apiV1TagUpdateTagPost**](TagApi.md#apiv1tagupdatetagpost) | **POST** /api/v1/Tag/UpdateTag | Update Tag |



## apiV1TagGetAllPost

> JobLogicMicroserviceCoreContractTagSearchResponse apiV1TagGetAllPost(authorization, joblogicAPIModelsRequestSearchTagRequest)

Search Tag by title

### Example

```ts
import {
  Configuration,
  TagApi,
} from '';
import type { ApiV1TagGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TagApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsRequestSearchTagRequest | search conditons (optional)
    joblogicAPIModelsRequestSearchTagRequest: ...,
  } satisfies ApiV1TagGetAllPostRequest;

  try {
    const data = await api.apiV1TagGetAllPost(body);
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
| **joblogicAPIModelsRequestSearchTagRequest** | [JoblogicAPIModelsRequestSearchTagRequest](JoblogicAPIModelsRequestSearchTagRequest.md) | search conditons | [Optional] |

### Return type

[**JobLogicMicroserviceCoreContractTagSearchResponse**](JobLogicMicroserviceCoreContractTagSearchResponse.md)

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


## apiV1TagGetByIdGet

> JobLogicMicroserviceCoreContractTagItemResponse apiV1TagGetByIdGet(authorization, uniqueId, tenantId)

Get Tag by Unique Id and tenant id.

### Example

```ts
import {
  Configuration,
  TagApi,
} from '';
import type { ApiV1TagGetByIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TagApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Tag\'s UniqueId (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Tenant Id (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1TagGetByIdGetRequest;

  try {
    const data = await api.apiV1TagGetByIdGet(body);
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
| **uniqueId** | `string` | Tag\&#39;s UniqueId | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Tenant Id | [Optional] [Defaults to `undefined`] |

### Return type

[**JobLogicMicroserviceCoreContractTagItemResponse**](JobLogicMicroserviceCoreContractTagItemResponse.md)

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


## apiV1TagUpdateTagPost

> MicrosoftAspNetCoreMvcOkObjectResult apiV1TagUpdateTagPost(authorization, joblogicAPIModelsRequestTagAssociationRequest)

Update Tag

### Example

```ts
import {
  Configuration,
  TagApi,
} from '';
import type { ApiV1TagUpdateTagPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TagApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsRequestTagAssociationRequest | Tag data to update (optional)
    joblogicAPIModelsRequestTagAssociationRequest: ...,
  } satisfies ApiV1TagUpdateTagPostRequest;

  try {
    const data = await api.apiV1TagUpdateTagPost(body);
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
| **joblogicAPIModelsRequestTagAssociationRequest** | [JoblogicAPIModelsRequestTagAssociationRequest](JoblogicAPIModelsRequestTagAssociationRequest.md) | Tag data to update | [Optional] |

### Return type

[**MicrosoftAspNetCoreMvcOkObjectResult**](MicrosoftAspNetCoreMvcOkObjectResult.md)

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

