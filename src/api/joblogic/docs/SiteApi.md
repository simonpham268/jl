# SiteApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1SiteConfigureWarningsPatch**](SiteApi.md#apiv1siteconfigurewarningspatch) | **PATCH** /api/v1/Site/ConfigureWarnings | Configure Site Warnings by site unique Id and tenant id. |
| [**apiV1SiteDelete**](SiteApi.md#apiv1sitedelete) | **DELETE** /api/v1/Site | Delete Site |
| [**apiV1SiteGet**](SiteApi.md#apiv1siteget) | **GET** /api/v1/Site | Get Site Details |
| [**apiV1SiteGetAllPost**](SiteApi.md#apiv1sitegetallpost) | **POST** /api/v1/Site/GetAll | Search Sites by keyword, tags, customer and active status |
| [**apiV1SiteGetByIdGet**](SiteApi.md#apiv1sitegetbyidget) | **GET** /api/v1/Site/GetById | Get Site Details by Id and tenant id. |
| [**apiV1SiteGetWarningsGet**](SiteApi.md#apiv1sitegetwarningsget) | **GET** /api/v1/Site/GetWarnings | Get Site Warnings by site unique Id and tenant id. |
| [**apiV1SitePost**](SiteApi.md#apiv1sitepost) | **POST** /api/v1/Site | Create Site |
| [**apiV1SitePut**](SiteApi.md#apiv1siteput) | **PUT** /api/v1/Site | Update Site |



## apiV1SiteConfigureWarningsPatch

> JoblogicAPIModelsGetSiteWarningResponse apiV1SiteConfigureWarningsPatch(authorization, id, tenantId, microsoftAspNetCoreJsonPatchOperationsOperation)

Configure Site Warnings by site unique Id and tenant id.

### Example

```ts
import {
  Configuration,
  SiteApi,
} from '';
import type { ApiV1SiteConfigureWarningsPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SiteApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Site unique Id (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Tenant Id (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // Array<MicrosoftAspNetCoreJsonPatchOperationsOperation> (optional)
    microsoftAspNetCoreJsonPatchOperationsOperation: ...,
  } satisfies ApiV1SiteConfigureWarningsPatchRequest;

  try {
    const data = await api.apiV1SiteConfigureWarningsPatch(body);
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
| **id** | `string` | Site unique Id | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Tenant Id | [Optional] [Defaults to `undefined`] |
| **microsoftAspNetCoreJsonPatchOperationsOperation** | `Array<MicrosoftAspNetCoreJsonPatchOperationsOperation>` |  | [Optional] |

### Return type

[**JoblogicAPIModelsGetSiteWarningResponse**](JoblogicAPIModelsGetSiteWarningResponse.md)

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


## apiV1SiteDelete

> apiV1SiteDelete(authorization, id, tenantId)

Delete Site

### Example

```ts
import {
  Configuration,
  SiteApi,
} from '';
import type { ApiV1SiteDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SiteApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Id of the Site to delete (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1SiteDeleteRequest;

  try {
    const data = await api.apiV1SiteDelete(body);
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
| **id** | `string` | Id of the Site to delete | [Optional] [Defaults to `undefined`] |
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


## apiV1SiteGet

> JoblogicAPIModelsGetSiteResponse apiV1SiteGet(authorization, id, tenantId, includeAdditionalDetails)

Get Site Details

### Example

```ts
import {
  Configuration,
  SiteApi,
} from '';
import type { ApiV1SiteGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SiteApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Id of the Site to retrieve (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // boolean | Optional flag to include additional details of the site in the response (optional)
    includeAdditionalDetails: true,
  } satisfies ApiV1SiteGetRequest;

  try {
    const data = await api.apiV1SiteGet(body);
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
| **id** | `string` | Id of the Site to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |
| **includeAdditionalDetails** | `boolean` | Optional flag to include additional details of the site in the response | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsGetSiteResponse**](JoblogicAPIModelsGetSiteResponse.md)

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


## apiV1SiteGetAllPost

> JoblogicAPIModelsSearchSiteResponse apiV1SiteGetAllPost(authorization, joblogicAPIModelsSearchSiteRequest)

Search Sites by keyword, tags, customer and active status

### Example

```ts
import {
  Configuration,
  SiteApi,
} from '';
import type { ApiV1SiteGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SiteApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchSiteRequest | search conditons (optional)
    joblogicAPIModelsSearchSiteRequest: ...,
  } satisfies ApiV1SiteGetAllPostRequest;

  try {
    const data = await api.apiV1SiteGetAllPost(body);
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
| **joblogicAPIModelsSearchSiteRequest** | [JoblogicAPIModelsSearchSiteRequest](JoblogicAPIModelsSearchSiteRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchSiteResponse**](JoblogicAPIModelsSearchSiteResponse.md)

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


## apiV1SiteGetByIdGet

> JoblogicAPIModelsGetSiteItemResponse apiV1SiteGetByIdGet(authorization, id, tenantId, includeAdditionalDetails)

Get Site Details by Id and tenant id.

### Example

```ts
import {
  Configuration,
  SiteApi,
} from '';
import type { ApiV1SiteGetByIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SiteApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // number | Site auto Id (optional)
    id: 56,
    // string | Tenant Id (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // boolean | Optional flag to include additional details of the site in the response (optional)
    includeAdditionalDetails: true,
  } satisfies ApiV1SiteGetByIdGetRequest;

  try {
    const data = await api.apiV1SiteGetByIdGet(body);
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
| **id** | `number` | Site auto Id | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Tenant Id | [Optional] [Defaults to `undefined`] |
| **includeAdditionalDetails** | `boolean` | Optional flag to include additional details of the site in the response | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsGetSiteItemResponse**](JoblogicAPIModelsGetSiteItemResponse.md)

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


## apiV1SiteGetWarningsGet

> JoblogicAPIModelsGetSiteWarningResponse apiV1SiteGetWarningsGet(authorization, id, tenantId)

Get Site Warnings by site unique Id and tenant id.

### Example

```ts
import {
  Configuration,
  SiteApi,
} from '';
import type { ApiV1SiteGetWarningsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SiteApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Site unique Id (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Tenant Id (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1SiteGetWarningsGetRequest;

  try {
    const data = await api.apiV1SiteGetWarningsGet(body);
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
| **id** | `string` | Site unique Id | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Tenant Id | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsGetSiteWarningResponse**](JoblogicAPIModelsGetSiteWarningResponse.md)

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


## apiV1SitePost

> JoblogicAPIModelsCreateSiteResponse apiV1SitePost(authorization, joblogicAPIModelsCreateSiteRequest)

Create Site

### Example

```ts
import {
  Configuration,
  SiteApi,
} from '';
import type { ApiV1SitePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SiteApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateSiteRequest | Site to create (optional)
    joblogicAPIModelsCreateSiteRequest: ...,
  } satisfies ApiV1SitePostRequest;

  try {
    const data = await api.apiV1SitePost(body);
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
| **joblogicAPIModelsCreateSiteRequest** | [JoblogicAPIModelsCreateSiteRequest](JoblogicAPIModelsCreateSiteRequest.md) | Site to create | [Optional] |

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


## apiV1SitePut

> JoblogicAPIModelsUpdateSiteResponse apiV1SitePut(authorization, joblogicAPIModelsUpdateSiteRequest)

Update Site

### Example

```ts
import {
  Configuration,
  SiteApi,
} from '';
import type { ApiV1SitePutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SiteApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateSiteRequest | Site to update (optional)
    joblogicAPIModelsUpdateSiteRequest: ...,
  } satisfies ApiV1SitePutRequest;

  try {
    const data = await api.apiV1SitePut(body);
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
| **joblogicAPIModelsUpdateSiteRequest** | [JoblogicAPIModelsUpdateSiteRequest](JoblogicAPIModelsUpdateSiteRequest.md) | Site to update | [Optional] |

### Return type

[**JoblogicAPIModelsUpdateSiteResponse**](JoblogicAPIModelsUpdateSiteResponse.md)

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

