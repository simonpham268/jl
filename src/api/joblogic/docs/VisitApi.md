# VisitApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1VisitCancelPost**](VisitApi.md#apiv1visitcancelpost) | **POST** /api/v1/Visit/Cancel | Cancel Visit Via Visit Unique Id |
| [**apiV1VisitDelete**](VisitApi.md#apiv1visitdelete) | **DELETE** /api/v1/Visit | Delete Visit by Unique Id |
| [**apiV1VisitDeployPost**](VisitApi.md#apiv1visitdeploypost) | **POST** /api/v1/Visit/Deploy | Deploy Visit Via Visit Unique Id |
| [**apiV1VisitGetAllPost**](VisitApi.md#apiv1visitgetallpost) | **POST** /api/v1/Visit/GetAll | Search Visit by JobId and keyword |
| [**apiV1VisitGetByIdGet**](VisitApi.md#apiv1visitgetbyidget) | **GET** /api/v1/Visit/GetById | Get Visit by Auto Id and tenant id. |
| [**apiV1VisitPost**](VisitApi.md#apiv1visitpost) | **POST** /api/v1/Visit | Create Visit by Job Id |
| [**apiV1VisitPut**](VisitApi.md#apiv1visitput) | **PUT** /api/v1/Visit | Update Visit by Visit Unique Id |
| [**apiV1VisitReDeployPost**](VisitApi.md#apiv1visitredeploypost) | **POST** /api/v1/Visit/ReDeploy | Re-Deploy Visit Via Visit Unique Id |
| [**apiV1VisitSearchPlannerPost**](VisitApi.md#apiv1visitsearchplannerpost) | **POST** /api/v1/Visit/SearchPlanner | Search Visit by Start and End Date |



## apiV1VisitCancelPost

> JobLogicInfrastructureContractExtensionsSuccess apiV1VisitCancelPost(authorization, joblogicAPIModelsCancelVisitRequest)

Cancel Visit Via Visit Unique Id

### Example

```ts
import {
  Configuration,
  VisitApi,
} from '';
import type { ApiV1VisitCancelPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VisitApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCancelVisitRequest | Cancel request (optional)
    joblogicAPIModelsCancelVisitRequest: ...,
  } satisfies ApiV1VisitCancelPostRequest;

  try {
    const data = await api.apiV1VisitCancelPost(body);
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
| **joblogicAPIModelsCancelVisitRequest** | [JoblogicAPIModelsCancelVisitRequest](JoblogicAPIModelsCancelVisitRequest.md) | Cancel request | [Optional] |

### Return type

[**JobLogicInfrastructureContractExtensionsSuccess**](JobLogicInfrastructureContractExtensionsSuccess.md)

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


## apiV1VisitDelete

> JoblogicAPIModelsVisitCreateResponse apiV1VisitDelete(authorization, uniqueId, tenantId)

Delete Visit by Unique Id

### Example

```ts
import {
  Configuration,
  VisitApi,
} from '';
import type { ApiV1VisitDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VisitApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | visit unique id (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | tenant unique id (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1VisitDeleteRequest;

  try {
    const data = await api.apiV1VisitDelete(body);
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
| **uniqueId** | `string` | visit unique id | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | tenant unique id | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsVisitCreateResponse**](JoblogicAPIModelsVisitCreateResponse.md)

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


## apiV1VisitDeployPost

> JobLogicInfrastructureContractExtensionsSuccess apiV1VisitDeployPost(authorization, joblogicAPIModelsDeployVisitRequest)

Deploy Visit Via Visit Unique Id

### Example

```ts
import {
  Configuration,
  VisitApi,
} from '';
import type { ApiV1VisitDeployPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VisitApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsDeployVisitRequest | Deploy request (optional)
    joblogicAPIModelsDeployVisitRequest: ...,
  } satisfies ApiV1VisitDeployPostRequest;

  try {
    const data = await api.apiV1VisitDeployPost(body);
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
| **joblogicAPIModelsDeployVisitRequest** | [JoblogicAPIModelsDeployVisitRequest](JoblogicAPIModelsDeployVisitRequest.md) | Deploy request | [Optional] |

### Return type

[**JobLogicInfrastructureContractExtensionsSuccess**](JobLogicInfrastructureContractExtensionsSuccess.md)

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


## apiV1VisitGetAllPost

> JoblogicAPIModelsSearchVisitResponse apiV1VisitGetAllPost(authorization, joblogicAPIModelsSearchVisitRequest)

Search Visit by JobId and keyword

### Example

```ts
import {
  Configuration,
  VisitApi,
} from '';
import type { ApiV1VisitGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VisitApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchVisitRequest | search conditons (optional)
    joblogicAPIModelsSearchVisitRequest: ...,
  } satisfies ApiV1VisitGetAllPostRequest;

  try {
    const data = await api.apiV1VisitGetAllPost(body);
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
| **joblogicAPIModelsSearchVisitRequest** | [JoblogicAPIModelsSearchVisitRequest](JoblogicAPIModelsSearchVisitRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchVisitResponse**](JoblogicAPIModelsSearchVisitResponse.md)

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


## apiV1VisitGetByIdGet

> JoblogicAPIModelsGetVisitDetailResponse apiV1VisitGetByIdGet(authorization, id, tenantId, inculdeNotes)

Get Visit by Auto Id and tenant id.

### Example

```ts
import {
  Configuration,
  VisitApi,
} from '';
import type { ApiV1VisitGetByIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VisitApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // number | Visit\'s Auto Id (optional)
    id: 56,
    // string | Tenant Id (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // boolean | Inculde Notes (optional)
    inculdeNotes: true,
  } satisfies ApiV1VisitGetByIdGetRequest;

  try {
    const data = await api.apiV1VisitGetByIdGet(body);
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
| **id** | `number` | Visit\&#39;s Auto Id | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Tenant Id | [Optional] [Defaults to `undefined`] |
| **inculdeNotes** | `boolean` | Inculde Notes | [Optional] [Defaults to `false`] |

### Return type

[**JoblogicAPIModelsGetVisitDetailResponse**](JoblogicAPIModelsGetVisitDetailResponse.md)

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


## apiV1VisitPost

> JoblogicAPIModelsVisitCreateResponse apiV1VisitPost(authorization, joblogicAPIModelsCreateVisitRequest)

Create Visit by Job Id

### Example

```ts
import {
  Configuration,
  VisitApi,
} from '';
import type { ApiV1VisitPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VisitApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateVisitRequest | search conditons (optional)
    joblogicAPIModelsCreateVisitRequest: ...,
  } satisfies ApiV1VisitPostRequest;

  try {
    const data = await api.apiV1VisitPost(body);
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
| **joblogicAPIModelsCreateVisitRequest** | [JoblogicAPIModelsCreateVisitRequest](JoblogicAPIModelsCreateVisitRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsVisitCreateResponse**](JoblogicAPIModelsVisitCreateResponse.md)

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


## apiV1VisitPut

> JoblogicAPIModelsVisitCreateResponse apiV1VisitPut(authorization, joblogicAPIModelsUpdateVisitRequest)

Update Visit by Visit Unique Id

### Example

```ts
import {
  Configuration,
  VisitApi,
} from '';
import type { ApiV1VisitPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VisitApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateVisitRequest | search conditons (optional)
    joblogicAPIModelsUpdateVisitRequest: ...,
  } satisfies ApiV1VisitPutRequest;

  try {
    const data = await api.apiV1VisitPut(body);
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
| **joblogicAPIModelsUpdateVisitRequest** | [JoblogicAPIModelsUpdateVisitRequest](JoblogicAPIModelsUpdateVisitRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsVisitCreateResponse**](JoblogicAPIModelsVisitCreateResponse.md)

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


## apiV1VisitReDeployPost

> JobLogicInfrastructureContractExtensionsSuccess apiV1VisitReDeployPost(authorization, joblogicAPIModelsReDeployVisitRequest)

Re-Deploy Visit Via Visit Unique Id

### Example

```ts
import {
  Configuration,
  VisitApi,
} from '';
import type { ApiV1VisitReDeployPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VisitApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsReDeployVisitRequest | Re-deloy request request (optional)
    joblogicAPIModelsReDeployVisitRequest: ...,
  } satisfies ApiV1VisitReDeployPostRequest;

  try {
    const data = await api.apiV1VisitReDeployPost(body);
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
| **joblogicAPIModelsReDeployVisitRequest** | [JoblogicAPIModelsReDeployVisitRequest](JoblogicAPIModelsReDeployVisitRequest.md) | Re-deloy request request | [Optional] |

### Return type

[**JobLogicInfrastructureContractExtensionsSuccess**](JobLogicInfrastructureContractExtensionsSuccess.md)

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


## apiV1VisitSearchPlannerPost

> JoblogicAPIModelsSearchPlannerResponse apiV1VisitSearchPlannerPost(authorization, joblogicAPIModelsSearchPlannerRequest)

Search Visit by Start and End Date

### Example

```ts
import {
  Configuration,
  VisitApi,
} from '';
import type { ApiV1VisitSearchPlannerPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VisitApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchPlannerRequest | search conditons (optional)
    joblogicAPIModelsSearchPlannerRequest: ...,
  } satisfies ApiV1VisitSearchPlannerPostRequest;

  try {
    const data = await api.apiV1VisitSearchPlannerPost(body);
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
| **joblogicAPIModelsSearchPlannerRequest** | [JoblogicAPIModelsSearchPlannerRequest](JoblogicAPIModelsSearchPlannerRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchPlannerResponse**](JoblogicAPIModelsSearchPlannerResponse.md)

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

