# FileApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1FileDownloadAttachmentPost**](FileApi.md#apiv1filedownloadattachmentpost) | **POST** /api/v1/File/DownloadAttachment | Download Attachment |
| [**apiV1FileGenerateAttachmentUriPost**](FileApi.md#apiv1filegenerateattachmenturipost) | **POST** /api/v1/File/GenerateAttachmentUri | Get Attachment file link |
| [**apiV1FileGetUploadFileUriGet**](FileApi.md#apiv1filegetuploadfileuriget) | **GET** /api/v1/File/GetUploadFileUri | Get an Uri that can be used to upload a file to JobLogic temporary storage |



## apiV1FileDownloadAttachmentPost

> apiV1FileDownloadAttachmentPost(authorization, joblogicAPIModelsDownloadAttachmentRequest)

Download Attachment



### Example

```ts
import {
  Configuration,
  FileApi,
} from '';
import type { ApiV1FileDownloadAttachmentPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FileApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsDownloadAttachmentRequest | AttachmentId and TenantId (optional)
    joblogicAPIModelsDownloadAttachmentRequest: ...,
  } satisfies ApiV1FileDownloadAttachmentPostRequest;

  try {
    const data = await api.apiV1FileDownloadAttachmentPost(body);
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
| **joblogicAPIModelsDownloadAttachmentRequest** | [JoblogicAPIModelsDownloadAttachmentRequest](JoblogicAPIModelsDownloadAttachmentRequest.md) | AttachmentId and TenantId | [Optional] |

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
| **200** | Successful |  -  |
| **400** | Bad Request |  -  |
| **401** | Unauthorized Request |  -  |
| **404** | Not found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1FileGenerateAttachmentUriPost

> JoblogicAPIModelsNoteFileResponse apiV1FileGenerateAttachmentUriPost(authorization, joblogicAPIModelsGenerateAttachmentUriRequest)

Get Attachment file link

### Example

```ts
import {
  Configuration,
  FileApi,
} from '';
import type { ApiV1FileGenerateAttachmentUriPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FileApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsGenerateAttachmentUriRequest (optional)
    joblogicAPIModelsGenerateAttachmentUriRequest: ...,
  } satisfies ApiV1FileGenerateAttachmentUriPostRequest;

  try {
    const data = await api.apiV1FileGenerateAttachmentUriPost(body);
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
| **joblogicAPIModelsGenerateAttachmentUriRequest** | [JoblogicAPIModelsGenerateAttachmentUriRequest](JoblogicAPIModelsGenerateAttachmentUriRequest.md) |  | [Optional] |

### Return type

[**JoblogicAPIModelsNoteFileResponse**](JoblogicAPIModelsNoteFileResponse.md)

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


## apiV1FileGetUploadFileUriGet

> apiV1FileGetUploadFileUriGet(authorization, fileName, tenantId)

Get an Uri that can be used to upload a file to JobLogic temporary storage



### Example

```ts
import {
  Configuration,
  FileApi,
} from '';
import type { ApiV1FileGetUploadFileUriGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FileApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Name of the file to be upload (optional)
    fileName: fileName_example,
    // string | Tenant Id (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1FileGetUploadFileUriGetRequest;

  try {
    const data = await api.apiV1FileGetUploadFileUriGet(body);
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
| **fileName** | `string` | Name of the file to be upload | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Tenant Id | [Optional] [Defaults to `undefined`] |

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

