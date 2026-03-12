# FormsLogbookApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1FormsLogbookDownloadPost**](FormsLogbookApi.md#apiv1formslogbookdownloadpost) | **POST** /api/v1/FormsLogbook/download |  |
| [**apiV1FormsLogbookGetallPost**](FormsLogbookApi.md#apiv1formslogbookgetallpost) | **POST** /api/v1/FormsLogbook/getall | Search Forms Logbooks |
| [**apiV1FormsLogbookGetformdataGet**](FormsLogbookApi.md#apiv1formslogbookgetformdataget) | **GET** /api/v1/FormsLogbook/getformdata | Get Forms Logbook Data |
| [**apiV1FormsLogbookPost**](FormsLogbookApi.md#apiv1formslogbookpost) | **POST** /api/v1/FormsLogbook | Add a new Form Logbook item |



## apiV1FormsLogbookDownloadPost

> JoblogicAPIModelsResponseGenerateFormsLogbookResponse apiV1FormsLogbookDownloadPost(authorization, joblogicAPIModelsFormsLogbookRequest)



### Example

```ts
import {
  Configuration,
  FormsLogbookApi,
} from '';
import type { ApiV1FormsLogbookDownloadPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FormsLogbookApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsFormsLogbookRequest (optional)
    joblogicAPIModelsFormsLogbookRequest: ...,
  } satisfies ApiV1FormsLogbookDownloadPostRequest;

  try {
    const data = await api.apiV1FormsLogbookDownloadPost(body);
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
| **joblogicAPIModelsFormsLogbookRequest** | [JoblogicAPIModelsFormsLogbookRequest](JoblogicAPIModelsFormsLogbookRequest.md) |  | [Optional] |

### Return type

[**JoblogicAPIModelsResponseGenerateFormsLogbookResponse**](JoblogicAPIModelsResponseGenerateFormsLogbookResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json-patch+json`, `application/json`, `text/json`, `application/*+json`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1FormsLogbookGetallPost

> Array&lt;JoblogicAPIModelsResponseFormsLogbookSearchResp&gt; apiV1FormsLogbookGetallPost(authorization, joblogicAPIModelsSearchFormsLogbookRequest)

Search Forms Logbooks

### Example

```ts
import {
  Configuration,
  FormsLogbookApi,
} from '';
import type { ApiV1FormsLogbookGetallPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FormsLogbookApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchFormsLogbookRequest | search conditons (optional)
    joblogicAPIModelsSearchFormsLogbookRequest: ...,
  } satisfies ApiV1FormsLogbookGetallPostRequest;

  try {
    const data = await api.apiV1FormsLogbookGetallPost(body);
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
| **joblogicAPIModelsSearchFormsLogbookRequest** | [JoblogicAPIModelsSearchFormsLogbookRequest](JoblogicAPIModelsSearchFormsLogbookRequest.md) | search conditons | [Optional] |

### Return type

[**Array&lt;JoblogicAPIModelsResponseFormsLogbookSearchResp&gt;**](JoblogicAPIModelsResponseFormsLogbookSearchResp.md)

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


## apiV1FormsLogbookGetformdataGet

> JoblogicAPIModelsResponseGetFormDataResponse apiV1FormsLogbookGetformdataGet(authorization, uniqueId, tenantId)

Get Forms Logbook Data

### Example

```ts
import {
  Configuration,
  FormsLogbookApi,
} from '';
import type { ApiV1FormsLogbookGetformdataGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FormsLogbookApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | logbook UniqueId (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | tenantId (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1FormsLogbookGetformdataGetRequest;

  try {
    const data = await api.apiV1FormsLogbookGetformdataGet(body);
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
| **uniqueId** | `string` | logbook UniqueId | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | tenantId | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsResponseGetFormDataResponse**](JoblogicAPIModelsResponseGetFormDataResponse.md)

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


## apiV1FormsLogbookPost

> string apiV1FormsLogbookPost(authorization, joblogicAPIModelsAddFormLogbookRequest)

Add a new Form Logbook item

### Example

```ts
import {
  Configuration,
  FormsLogbookApi,
} from '';
import type { ApiV1FormsLogbookPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new FormsLogbookApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsAddFormLogbookRequest | Form details and attachment (optional)
    joblogicAPIModelsAddFormLogbookRequest: ...,
  } satisfies ApiV1FormsLogbookPostRequest;

  try {
    const data = await api.apiV1FormsLogbookPost(body);
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
| **joblogicAPIModelsAddFormLogbookRequest** | [JoblogicAPIModelsAddFormLogbookRequest](JoblogicAPIModelsAddFormLogbookRequest.md) | Form details and attachment | [Optional] |

### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json-patch+json`, `application/json`, `text/json`, `application/*+json`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful operation |  -  |
| **400** | Bad Request - Validation errors |  -  |
| **401** | Unauthorized Request |  -  |
| **404** | Not Found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

