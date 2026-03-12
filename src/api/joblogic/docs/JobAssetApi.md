# JobAssetApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1JobAssetAssignAssetPost**](JobAssetApi.md#apiv1jobassetassignassetpost) | **POST** /api/v1/JobAsset/AssignAsset | Search Job Assets |
| [**apiV1JobAssetDelete**](JobAssetApi.md#apiv1jobassetdelete) | **DELETE** /api/v1/JobAsset | Delete Job Asset |
| [**apiV1JobAssetGetAllPost**](JobAssetApi.md#apiv1jobassetgetallpost) | **POST** /api/v1/JobAsset/GetAll | Search Job Assets |
| [**apiV1JobAssetGetByUniqueIdGet**](JobAssetApi.md#apiv1jobassetgetbyuniqueidget) | **GET** /api/v1/JobAsset/GetByUniqueId | Gets Job Asset Details |
| [**apiV1JobAssetPut**](JobAssetApi.md#apiv1jobassetput) | **PUT** /api/v1/JobAsset | Update Job Asset |



## apiV1JobAssetAssignAssetPost

> JoblogicAPIModelsResponseAssignJobAssetResponse apiV1JobAssetAssignAssetPost(authorization, joblogicAPIModelsRequestAssignJobAssetRequest)

Search Job Assets

### Example

```ts
import {
  Configuration,
  JobAssetApi,
} from '';
import type { ApiV1JobAssetAssignAssetPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobAssetApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsRequestAssignJobAssetRequest | Assign Job Assign conditons (optional)
    joblogicAPIModelsRequestAssignJobAssetRequest: ...,
  } satisfies ApiV1JobAssetAssignAssetPostRequest;

  try {
    const data = await api.apiV1JobAssetAssignAssetPost(body);
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
| **joblogicAPIModelsRequestAssignJobAssetRequest** | [JoblogicAPIModelsRequestAssignJobAssetRequest](JoblogicAPIModelsRequestAssignJobAssetRequest.md) | Assign Job Assign conditons | [Optional] |

### Return type

[**JoblogicAPIModelsResponseAssignJobAssetResponse**](JoblogicAPIModelsResponseAssignJobAssetResponse.md)

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


## apiV1JobAssetDelete

> apiV1JobAssetDelete(authorization, joblogicAPIModelsRequestDeleteJobAssetRequest)

Delete Job Asset

### Example

```ts
import {
  Configuration,
  JobAssetApi,
} from '';
import type { ApiV1JobAssetDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobAssetApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsRequestDeleteJobAssetRequest | JobAssetUniqueIds of the job assest to delete (optional)
    joblogicAPIModelsRequestDeleteJobAssetRequest: ...,
  } satisfies ApiV1JobAssetDeleteRequest;

  try {
    const data = await api.apiV1JobAssetDelete(body);
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
| **joblogicAPIModelsRequestDeleteJobAssetRequest** | [JoblogicAPIModelsRequestDeleteJobAssetRequest](JoblogicAPIModelsRequestDeleteJobAssetRequest.md) | JobAssetUniqueIds of the job assest to delete | [Optional] |

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


## apiV1JobAssetGetAllPost

> JoblogicAPIModelsResponseJobAssetResponse apiV1JobAssetGetAllPost(authorization, joblogicAPIModelsRequestSearchJobAssetRequest)

Search Job Assets

### Example

```ts
import {
  Configuration,
  JobAssetApi,
} from '';
import type { ApiV1JobAssetGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobAssetApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsRequestSearchJobAssetRequest | search conditons (optional)
    joblogicAPIModelsRequestSearchJobAssetRequest: ...,
  } satisfies ApiV1JobAssetGetAllPostRequest;

  try {
    const data = await api.apiV1JobAssetGetAllPost(body);
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
| **joblogicAPIModelsRequestSearchJobAssetRequest** | [JoblogicAPIModelsRequestSearchJobAssetRequest](JoblogicAPIModelsRequestSearchJobAssetRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsResponseJobAssetResponse**](JoblogicAPIModelsResponseJobAssetResponse.md)

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


## apiV1JobAssetGetByUniqueIdGet

> JobLogicMicroserviceCoreContractJobAssetSearchItemResponse apiV1JobAssetGetByUniqueIdGet(authorization, uniqueId, tenantId)

Gets Job Asset Details

### Example

```ts
import {
  Configuration,
  JobAssetApi,
} from '';
import type { ApiV1JobAssetGetByUniqueIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobAssetApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Id of the job Asset to retrieve (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1JobAssetGetByUniqueIdGetRequest;

  try {
    const data = await api.apiV1JobAssetGetByUniqueIdGet(body);
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
| **uniqueId** | `string` | Id of the job Asset to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JobLogicMicroserviceCoreContractJobAssetSearchItemResponse**](JobLogicMicroserviceCoreContractJobAssetSearchItemResponse.md)

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


## apiV1JobAssetPut

> boolean apiV1JobAssetPut(authorization, joblogicAPIModelsRequestUpdateJobAssetRequest)

Update Job Asset

### Example

```ts
import {
  Configuration,
  JobAssetApi,
} from '';
import type { ApiV1JobAssetPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobAssetApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsRequestUpdateJobAssetRequest | Job Asset to update (optional)
    joblogicAPIModelsRequestUpdateJobAssetRequest: ...,
  } satisfies ApiV1JobAssetPutRequest;

  try {
    const data = await api.apiV1JobAssetPut(body);
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
| **joblogicAPIModelsRequestUpdateJobAssetRequest** | [JoblogicAPIModelsRequestUpdateJobAssetRequest](JoblogicAPIModelsRequestUpdateJobAssetRequest.md) | Job Asset to update | [Optional] |

### Return type

**boolean**

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

