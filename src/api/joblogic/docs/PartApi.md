# PartApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1PartDelete**](PartApi.md#apiv1partdelete) | **DELETE** /api/v1/Part | Delete Part |
| [**apiV1PartGet**](PartApi.md#apiv1partget) | **GET** /api/v1/Part | Gets Part Details |
| [**apiV1PartGetAllPost**](PartApi.md#apiv1partgetallpost) | **POST** /api/v1/Part/GetAll | Search Parts by keyword, tags, customer and active status |
| [**apiV1PartGetByIdGet**](PartApi.md#apiv1partgetbyidget) | **GET** /api/v1/Part/GetById | Get Part Details by Id and tenant id. |
| [**apiV1PartPost**](PartApi.md#apiv1partpost) | **POST** /api/v1/Part | Create Part |
| [**apiV1PartPut**](PartApi.md#apiv1partput) | **PUT** /api/v1/Part | Update Part |



## apiV1PartDelete

> apiV1PartDelete(authorization, id, tenantId)

Delete Part

### Example

```ts
import {
  Configuration,
  PartApi,
} from '';
import type { ApiV1PartDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PartApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Id of the part to delete (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1PartDeleteRequest;

  try {
    const data = await api.apiV1PartDelete(body);
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
| **id** | `string` | Id of the part to delete | [Optional] [Defaults to `undefined`] |
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


## apiV1PartGet

> JoblogicAPIModelsGetPartResponse apiV1PartGet(authorization, id, tenantId, includeAdditionalDetails)

Gets Part Details

### Example

```ts
import {
  Configuration,
  PartApi,
} from '';
import type { ApiV1PartGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PartApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Id of the part to retrieve (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // boolean | Optional flag to include additional details of the part in the response (optional)
    includeAdditionalDetails: true,
  } satisfies ApiV1PartGetRequest;

  try {
    const data = await api.apiV1PartGet(body);
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
| **id** | `string` | Id of the part to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |
| **includeAdditionalDetails** | `boolean` | Optional flag to include additional details of the part in the response | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsGetPartResponse**](JoblogicAPIModelsGetPartResponse.md)

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


## apiV1PartGetAllPost

> JoblogicAPIModelsSearchPartResponse apiV1PartGetAllPost(authorization, joblogicAPIModelsSearchPartRequest)

Search Parts by keyword, tags, customer and active status

### Example

```ts
import {
  Configuration,
  PartApi,
} from '';
import type { ApiV1PartGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PartApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchPartRequest | search conditons (optional)
    joblogicAPIModelsSearchPartRequest: ...,
  } satisfies ApiV1PartGetAllPostRequest;

  try {
    const data = await api.apiV1PartGetAllPost(body);
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
| **joblogicAPIModelsSearchPartRequest** | [JoblogicAPIModelsSearchPartRequest](JoblogicAPIModelsSearchPartRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchPartResponse**](JoblogicAPIModelsSearchPartResponse.md)

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


## apiV1PartGetByIdGet

> JoblogicAPIModelsPartItemResponse apiV1PartGetByIdGet(authorization, id, tenantId, includeAdditionalDetails)

Get Part Details by Id and tenant id.

### Example

```ts
import {
  Configuration,
  PartApi,
} from '';
import type { ApiV1PartGetByIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PartApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // number | Part auto Id (optional)
    id: 56,
    // string | Tenant Id (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // boolean | Optional flag to include additional details of the part in the response (optional)
    includeAdditionalDetails: true,
  } satisfies ApiV1PartGetByIdGetRequest;

  try {
    const data = await api.apiV1PartGetByIdGet(body);
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
| **id** | `number` | Part auto Id | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Tenant Id | [Optional] [Defaults to `undefined`] |
| **includeAdditionalDetails** | `boolean` | Optional flag to include additional details of the part in the response | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsPartItemResponse**](JoblogicAPIModelsPartItemResponse.md)

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


## apiV1PartPost

> JoblogicAPIModelsCreatePartResponse apiV1PartPost(authorization, joblogicAPIModelsCreatePartRequest)

Create Part

### Example

```ts
import {
  Configuration,
  PartApi,
} from '';
import type { ApiV1PartPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PartApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreatePartRequest | Part to create (optional)
    joblogicAPIModelsCreatePartRequest: ...,
  } satisfies ApiV1PartPostRequest;

  try {
    const data = await api.apiV1PartPost(body);
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
| **joblogicAPIModelsCreatePartRequest** | [JoblogicAPIModelsCreatePartRequest](JoblogicAPIModelsCreatePartRequest.md) | Part to create | [Optional] |

### Return type

[**JoblogicAPIModelsCreatePartResponse**](JoblogicAPIModelsCreatePartResponse.md)

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


## apiV1PartPut

> JoblogicAPIModelsUpdatePartResponse apiV1PartPut(authorization, joblogicAPIModelsUpdatePartRequest)

Update Part

### Example

```ts
import {
  Configuration,
  PartApi,
} from '';
import type { ApiV1PartPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PartApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdatePartRequest | Part to update (optional)
    joblogicAPIModelsUpdatePartRequest: ...,
  } satisfies ApiV1PartPutRequest;

  try {
    const data = await api.apiV1PartPut(body);
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
| **joblogicAPIModelsUpdatePartRequest** | [JoblogicAPIModelsUpdatePartRequest](JoblogicAPIModelsUpdatePartRequest.md) | Part to update | [Optional] |

### Return type

[**JoblogicAPIModelsUpdatePartResponse**](JoblogicAPIModelsUpdatePartResponse.md)

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

