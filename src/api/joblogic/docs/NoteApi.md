# NoteApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1NoteGetAllPost**](NoteApi.md#apiv1notegetallpost) | **POST** /api/v1/Note/GetAll | Gets Job Or Quote Note Details |
| [**apiV1NotePost**](NoteApi.md#apiv1notepost) | **POST** /api/v1/Note | Create Note |



## apiV1NoteGetAllPost

> JoblogicAPIModelsSearchNoteResponse apiV1NoteGetAllPost(authorization, joblogicAPIModelsSearchNoteRequest)

Gets Job Or Quote Note Details

### Example

```ts
import {
  Configuration,
  NoteApi,
} from '';
import type { ApiV1NoteGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NoteApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchNoteRequest | Search conditons (optional)
    joblogicAPIModelsSearchNoteRequest: ...,
  } satisfies ApiV1NoteGetAllPostRequest;

  try {
    const data = await api.apiV1NoteGetAllPost(body);
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
| **joblogicAPIModelsSearchNoteRequest** | [JoblogicAPIModelsSearchNoteRequest](JoblogicAPIModelsSearchNoteRequest.md) | Search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchNoteResponse**](JoblogicAPIModelsSearchNoteResponse.md)

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


## apiV1NotePost

> JoblogicAPIModelsCreateSiteResponse apiV1NotePost(authorization, joblogicAPIModelsCreateNoteRequest)

Create Note

### Example

```ts
import {
  Configuration,
  NoteApi,
} from '';
import type { ApiV1NotePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new NoteApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateNoteRequest | Note to create (optional)
    joblogicAPIModelsCreateNoteRequest: ...,
  } satisfies ApiV1NotePostRequest;

  try {
    const data = await api.apiV1NotePost(body);
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
| **joblogicAPIModelsCreateNoteRequest** | [JoblogicAPIModelsCreateNoteRequest](JoblogicAPIModelsCreateNoteRequest.md) | Note to create | [Optional] |

### Return type

[**JoblogicAPIModelsCreateSiteResponse**](JoblogicAPIModelsCreateSiteResponse.md)

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

