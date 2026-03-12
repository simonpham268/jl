# SiteTypeApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1SiteTypeDelete**](SiteTypeApi.md#apiv1sitetypedelete) | **DELETE** /api/v1/SiteType | Delete Site Type |
| [**apiV1SiteTypeGet**](SiteTypeApi.md#apiv1sitetypeget) | **GET** /api/v1/SiteType | Gets Site Type Details |
| [**apiV1SiteTypeGetAllPost**](SiteTypeApi.md#apiv1sitetypegetallpost) | **POST** /api/v1/SiteType/GetAll | Search Site Type by keyword |
| [**apiV1SiteTypePost**](SiteTypeApi.md#apiv1sitetypepost) | **POST** /api/v1/SiteType | Create Site Type |
| [**apiV1SiteTypePut**](SiteTypeApi.md#apiv1sitetypeput) | **PUT** /api/v1/SiteType | Update Site Type |



## apiV1SiteTypeDelete

> apiV1SiteTypeDelete(authorization, uniqueId, tenantId)

Delete Site Type

### Example

```ts
import {
  Configuration,
  SiteTypeApi,
} from '';
import type { ApiV1SiteTypeDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SiteTypeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | UniqueId of the Site Type to Delete (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1SiteTypeDeleteRequest;

  try {
    const data = await api.apiV1SiteTypeDelete(body);
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
| **uniqueId** | `string` | UniqueId of the Site Type to Delete | [Optional] [Defaults to `undefined`] |
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


## apiV1SiteTypeGet

> JoblogicAPIModelsGetSiteTypeResponse apiV1SiteTypeGet(authorization, uniqueId, tenantId)

Gets Site Type Details

### Example

```ts
import {
  Configuration,
  SiteTypeApi,
} from '';
import type { ApiV1SiteTypeGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SiteTypeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | UniqueId of the Site Type to retrieve (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1SiteTypeGetRequest;

  try {
    const data = await api.apiV1SiteTypeGet(body);
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
| **uniqueId** | `string` | UniqueId of the Site Type to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsGetSiteTypeResponse**](JoblogicAPIModelsGetSiteTypeResponse.md)

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


## apiV1SiteTypeGetAllPost

> JoblogicAPIModelsSearchSiteTypeResponse apiV1SiteTypeGetAllPost(authorization, joblogicAPIModelsSearchSiteTypeRequest)

Search Site Type by keyword

### Example

```ts
import {
  Configuration,
  SiteTypeApi,
} from '';
import type { ApiV1SiteTypeGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SiteTypeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchSiteTypeRequest | search conditons (optional)
    joblogicAPIModelsSearchSiteTypeRequest: ...,
  } satisfies ApiV1SiteTypeGetAllPostRequest;

  try {
    const data = await api.apiV1SiteTypeGetAllPost(body);
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
| **joblogicAPIModelsSearchSiteTypeRequest** | [JoblogicAPIModelsSearchSiteTypeRequest](JoblogicAPIModelsSearchSiteTypeRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchSiteTypeResponse**](JoblogicAPIModelsSearchSiteTypeResponse.md)

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


## apiV1SiteTypePost

> JoblogicAPIModelsCreateSiteTypeResponse apiV1SiteTypePost(authorization, joblogicAPIModelsCreateSiteTypeRequest)

Create Site Type

### Example

```ts
import {
  Configuration,
  SiteTypeApi,
} from '';
import type { ApiV1SiteTypePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SiteTypeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateSiteTypeRequest | Site Type to create (optional)
    joblogicAPIModelsCreateSiteTypeRequest: ...,
  } satisfies ApiV1SiteTypePostRequest;

  try {
    const data = await api.apiV1SiteTypePost(body);
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
| **joblogicAPIModelsCreateSiteTypeRequest** | [JoblogicAPIModelsCreateSiteTypeRequest](JoblogicAPIModelsCreateSiteTypeRequest.md) | Site Type to create | [Optional] |

### Return type

[**JoblogicAPIModelsCreateSiteTypeResponse**](JoblogicAPIModelsCreateSiteTypeResponse.md)

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


## apiV1SiteTypePut

> JoblogicAPIModelsUpdateSiteTypeResponse apiV1SiteTypePut(authorization, joblogicAPIModelsUpdateSiteTypeRequest)

Update Site Type

### Example

```ts
import {
  Configuration,
  SiteTypeApi,
} from '';
import type { ApiV1SiteTypePutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SiteTypeApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateSiteTypeRequest | Site Type to update (optional)
    joblogicAPIModelsUpdateSiteTypeRequest: ...,
  } satisfies ApiV1SiteTypePutRequest;

  try {
    const data = await api.apiV1SiteTypePut(body);
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
| **joblogicAPIModelsUpdateSiteTypeRequest** | [JoblogicAPIModelsUpdateSiteTypeRequest](JoblogicAPIModelsUpdateSiteTypeRequest.md) | Site Type to update | [Optional] |

### Return type

[**JoblogicAPIModelsUpdateSiteTypeResponse**](JoblogicAPIModelsUpdateSiteTypeResponse.md)

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

