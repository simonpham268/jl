# JobCostApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1JobCostCalloutPost**](JobCostApi.md#apiv1jobcostcalloutpost) | **POST** /api/v1/JobCost/Callout | Create Callout Job Cost |
| [**apiV1JobCostCalloutPut**](JobCostApi.md#apiv1jobcostcalloutput) | **PUT** /api/v1/JobCost/Callout | Update Callout Job Cost |
| [**apiV1JobCostExpensePost**](JobCostApi.md#apiv1jobcostexpensepost) | **POST** /api/v1/JobCost/Expense | Create Expense Job Cost |
| [**apiV1JobCostExpensePut**](JobCostApi.md#apiv1jobcostexpenseput) | **PUT** /api/v1/JobCost/Expense | Update Expense Job Cost |
| [**apiV1JobCostGet**](JobCostApi.md#apiv1jobcostget) | **GET** /api/v1/JobCost | Get Job Cost by Job Unique Id |
| [**apiV1JobCostLabourPost**](JobCostApi.md#apiv1jobcostlabourpost) | **POST** /api/v1/JobCost/Labour | Create Labour Job Cost |
| [**apiV1JobCostLabourPut**](JobCostApi.md#apiv1jobcostlabourput) | **PUT** /api/v1/JobCost/Labour | Update Labour Job Cost |
| [**apiV1JobCostLineDelete**](JobCostApi.md#apiv1jobcostlinedelete) | **DELETE** /api/v1/JobCost/Line | Delete Job Cost |
| [**apiV1JobCostMaterialPost**](JobCostApi.md#apiv1jobcostmaterialpost) | **POST** /api/v1/JobCost/Material | Create Material Job Cost |
| [**apiV1JobCostMaterialPut**](JobCostApi.md#apiv1jobcostmaterialput) | **PUT** /api/v1/JobCost/Material | Update Material Job Cost |
| [**apiV1JobCostMileagePost**](JobCostApi.md#apiv1jobcostmileagepost) | **POST** /api/v1/JobCost/Mileage | Create Mileage Job Cost |
| [**apiV1JobCostMileagePut**](JobCostApi.md#apiv1jobcostmileageput) | **PUT** /api/v1/JobCost/Mileage | Update Mileage Job Cost |
| [**apiV1JobCostOtherPost**](JobCostApi.md#apiv1jobcostotherpost) | **POST** /api/v1/JobCost/Other | Create Other Job Cost |
| [**apiV1JobCostOtherPut**](JobCostApi.md#apiv1jobcostotherput) | **PUT** /api/v1/JobCost/Other | Update Other Job Cost |
| [**apiV1JobCostOvertimePost**](JobCostApi.md#apiv1jobcostovertimepost) | **POST** /api/v1/JobCost/Overtime | Create Overtime Job Cost |
| [**apiV1JobCostOvertimePut**](JobCostApi.md#apiv1jobcostovertimeput) | **PUT** /api/v1/JobCost/Overtime | Update Overtime Job Cost |
| [**apiV1JobCostSORItemsPost**](JobCostApi.md#apiv1jobcostsoritemspost) | **POST** /api/v1/JobCost/SORItems | Create SORItems Job Cost |
| [**apiV1JobCostSORItemsPut**](JobCostApi.md#apiv1jobcostsoritemsput) | **PUT** /api/v1/JobCost/SORItems | Update SORItems Job Cost |
| [**apiV1JobCostSubcontractorPost**](JobCostApi.md#apiv1jobcostsubcontractorpost) | **POST** /api/v1/JobCost/Subcontractor | Create Subcontractor Job Cost |
| [**apiV1JobCostSubcontractorPut**](JobCostApi.md#apiv1jobcostsubcontractorput) | **PUT** /api/v1/JobCost/Subcontractor | Update Subcontractor Job Cost |
| [**apiV1JobCostTravelPost**](JobCostApi.md#apiv1jobcosttravelpost) | **POST** /api/v1/JobCost/Travel | Create Travel Job Cost |
| [**apiV1JobCostTravelPut**](JobCostApi.md#apiv1jobcosttravelput) | **PUT** /api/v1/JobCost/Travel | Update Travel Job Cost |



## apiV1JobCostCalloutPost

> JoblogicAPIModelsJobCalloutResponse apiV1JobCostCalloutPost(authorization, joblogicAPIModelsCreateCalloutJobCostRequest)

Create Callout Job Cost

### Example

```ts
import {
  Configuration,
  JobCostApi,
} from '';
import type { ApiV1JobCostCalloutPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobCostApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateCalloutJobCostRequest | Callout Job Cost Line Information (optional)
    joblogicAPIModelsCreateCalloutJobCostRequest: ...,
  } satisfies ApiV1JobCostCalloutPostRequest;

  try {
    const data = await api.apiV1JobCostCalloutPost(body);
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
| **joblogicAPIModelsCreateCalloutJobCostRequest** | [JoblogicAPIModelsCreateCalloutJobCostRequest](JoblogicAPIModelsCreateCalloutJobCostRequest.md) | Callout Job Cost Line Information | [Optional] |

### Return type

[**JoblogicAPIModelsJobCalloutResponse**](JoblogicAPIModelsJobCalloutResponse.md)

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


## apiV1JobCostCalloutPut

> JoblogicAPIModelsJobCalloutResponse apiV1JobCostCalloutPut(authorization, joblogicAPIModelsUpdateCalloutJobCostRequest)

Update Callout Job Cost

### Example

```ts
import {
  Configuration,
  JobCostApi,
} from '';
import type { ApiV1JobCostCalloutPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobCostApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateCalloutJobCostRequest | Callout Job Cost Line Information (optional)
    joblogicAPIModelsUpdateCalloutJobCostRequest: ...,
  } satisfies ApiV1JobCostCalloutPutRequest;

  try {
    const data = await api.apiV1JobCostCalloutPut(body);
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
| **joblogicAPIModelsUpdateCalloutJobCostRequest** | [JoblogicAPIModelsUpdateCalloutJobCostRequest](JoblogicAPIModelsUpdateCalloutJobCostRequest.md) | Callout Job Cost Line Information | [Optional] |

### Return type

[**JoblogicAPIModelsJobCalloutResponse**](JoblogicAPIModelsJobCalloutResponse.md)

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


## apiV1JobCostExpensePost

> JoblogicAPIModelsJobExpenseResponse apiV1JobCostExpensePost(authorization, joblogicAPIModelsCreateExpenseJobCostRequest)

Create Expense Job Cost

### Example

```ts
import {
  Configuration,
  JobCostApi,
} from '';
import type { ApiV1JobCostExpensePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobCostApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateExpenseJobCostRequest | Expense Job Cost Line Information (optional)
    joblogicAPIModelsCreateExpenseJobCostRequest: ...,
  } satisfies ApiV1JobCostExpensePostRequest;

  try {
    const data = await api.apiV1JobCostExpensePost(body);
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
| **joblogicAPIModelsCreateExpenseJobCostRequest** | [JoblogicAPIModelsCreateExpenseJobCostRequest](JoblogicAPIModelsCreateExpenseJobCostRequest.md) | Expense Job Cost Line Information | [Optional] |

### Return type

[**JoblogicAPIModelsJobExpenseResponse**](JoblogicAPIModelsJobExpenseResponse.md)

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


## apiV1JobCostExpensePut

> JoblogicAPIModelsJobExpenseResponse apiV1JobCostExpensePut(authorization, joblogicAPIModelsUpdateExpenseJobCostRequest)

Update Expense Job Cost

### Example

```ts
import {
  Configuration,
  JobCostApi,
} from '';
import type { ApiV1JobCostExpensePutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobCostApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateExpenseJobCostRequest | Expense Job Cost Line Information (optional)
    joblogicAPIModelsUpdateExpenseJobCostRequest: ...,
  } satisfies ApiV1JobCostExpensePutRequest;

  try {
    const data = await api.apiV1JobCostExpensePut(body);
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
| **joblogicAPIModelsUpdateExpenseJobCostRequest** | [JoblogicAPIModelsUpdateExpenseJobCostRequest](JoblogicAPIModelsUpdateExpenseJobCostRequest.md) | Expense Job Cost Line Information | [Optional] |

### Return type

[**JoblogicAPIModelsJobExpenseResponse**](JoblogicAPIModelsJobExpenseResponse.md)

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


## apiV1JobCostGet

> JoblogicAPIModelsGetJobCostResponse apiV1JobCostGet(authorization, id, tenantId)

Get Job Cost by Job Unique Id

### Example

```ts
import {
  Configuration,
  JobCostApi,
} from '';
import type { ApiV1JobCostGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobCostApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Unique Id of the job (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1JobCostGetRequest;

  try {
    const data = await api.apiV1JobCostGet(body);
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
| **id** | `string` | Unique Id of the job | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsGetJobCostResponse**](JoblogicAPIModelsGetJobCostResponse.md)

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


## apiV1JobCostLabourPost

> JoblogicAPIModelsJobLabourResponse apiV1JobCostLabourPost(authorization, joblogicAPIModelsCreateLabourJobCostRequest)

Create Labour Job Cost

### Example

```ts
import {
  Configuration,
  JobCostApi,
} from '';
import type { ApiV1JobCostLabourPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobCostApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateLabourJobCostRequest | Labour Job Cost Line Information (optional)
    joblogicAPIModelsCreateLabourJobCostRequest: ...,
  } satisfies ApiV1JobCostLabourPostRequest;

  try {
    const data = await api.apiV1JobCostLabourPost(body);
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
| **joblogicAPIModelsCreateLabourJobCostRequest** | [JoblogicAPIModelsCreateLabourJobCostRequest](JoblogicAPIModelsCreateLabourJobCostRequest.md) | Labour Job Cost Line Information | [Optional] |

### Return type

[**JoblogicAPIModelsJobLabourResponse**](JoblogicAPIModelsJobLabourResponse.md)

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


## apiV1JobCostLabourPut

> JoblogicAPIModelsJobLabourResponse apiV1JobCostLabourPut(authorization, joblogicAPIModelsUpdateLabourJobCostRequest)

Update Labour Job Cost

### Example

```ts
import {
  Configuration,
  JobCostApi,
} from '';
import type { ApiV1JobCostLabourPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobCostApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateLabourJobCostRequest | Labour Job Cost Line Information (optional)
    joblogicAPIModelsUpdateLabourJobCostRequest: ...,
  } satisfies ApiV1JobCostLabourPutRequest;

  try {
    const data = await api.apiV1JobCostLabourPut(body);
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
| **joblogicAPIModelsUpdateLabourJobCostRequest** | [JoblogicAPIModelsUpdateLabourJobCostRequest](JoblogicAPIModelsUpdateLabourJobCostRequest.md) | Labour Job Cost Line Information | [Optional] |

### Return type

[**JoblogicAPIModelsJobLabourResponse**](JoblogicAPIModelsJobLabourResponse.md)

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


## apiV1JobCostLineDelete

> boolean apiV1JobCostLineDelete(authorization, jobId, lineId, userId, tenantId)

Delete Job Cost

### Example

```ts
import {
  Configuration,
  JobCostApi,
} from '';
import type { ApiV1JobCostLineDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobCostApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // number | Job AutoId (optional)
    jobId: 56,
    // number | Job Line AutoId to Delete (optional)
    lineId: 56,
    // string | User Unique Id (optional)
    userId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Tenant Id (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1JobCostLineDeleteRequest;

  try {
    const data = await api.apiV1JobCostLineDelete(body);
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
| **jobId** | `number` | Job AutoId | [Optional] [Defaults to `undefined`] |
| **lineId** | `number` | Job Line AutoId to Delete | [Optional] [Defaults to `undefined`] |
| **userId** | `string` | User Unique Id | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Tenant Id | [Optional] [Defaults to `undefined`] |

### Return type

**boolean**

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


## apiV1JobCostMaterialPost

> JoblogicAPIModelsJobMaterialResponse apiV1JobCostMaterialPost(authorization, joblogicAPIModelsCreateMaterialJobCostRequest)

Create Material Job Cost

### Example

```ts
import {
  Configuration,
  JobCostApi,
} from '';
import type { ApiV1JobCostMaterialPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobCostApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateMaterialJobCostRequest | Material Job Cost Line Information (optional)
    joblogicAPIModelsCreateMaterialJobCostRequest: ...,
  } satisfies ApiV1JobCostMaterialPostRequest;

  try {
    const data = await api.apiV1JobCostMaterialPost(body);
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
| **joblogicAPIModelsCreateMaterialJobCostRequest** | [JoblogicAPIModelsCreateMaterialJobCostRequest](JoblogicAPIModelsCreateMaterialJobCostRequest.md) | Material Job Cost Line Information | [Optional] |

### Return type

[**JoblogicAPIModelsJobMaterialResponse**](JoblogicAPIModelsJobMaterialResponse.md)

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


## apiV1JobCostMaterialPut

> JoblogicAPIModelsJobMaterialResponse apiV1JobCostMaterialPut(authorization, joblogicAPIModelsUpdateMaterialJobCostRequest)

Update Material Job Cost

### Example

```ts
import {
  Configuration,
  JobCostApi,
} from '';
import type { ApiV1JobCostMaterialPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobCostApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateMaterialJobCostRequest | Material Job Cost Line Information (optional)
    joblogicAPIModelsUpdateMaterialJobCostRequest: ...,
  } satisfies ApiV1JobCostMaterialPutRequest;

  try {
    const data = await api.apiV1JobCostMaterialPut(body);
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
| **joblogicAPIModelsUpdateMaterialJobCostRequest** | [JoblogicAPIModelsUpdateMaterialJobCostRequest](JoblogicAPIModelsUpdateMaterialJobCostRequest.md) | Material Job Cost Line Information | [Optional] |

### Return type

[**JoblogicAPIModelsJobMaterialResponse**](JoblogicAPIModelsJobMaterialResponse.md)

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


## apiV1JobCostMileagePost

> JoblogicAPIModelsJobMileageResponse apiV1JobCostMileagePost(authorization, joblogicAPIModelsCreateMileageJobCostRequest)

Create Mileage Job Cost

### Example

```ts
import {
  Configuration,
  JobCostApi,
} from '';
import type { ApiV1JobCostMileagePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobCostApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateMileageJobCostRequest | Mileage Job Cost Line Information (optional)
    joblogicAPIModelsCreateMileageJobCostRequest: ...,
  } satisfies ApiV1JobCostMileagePostRequest;

  try {
    const data = await api.apiV1JobCostMileagePost(body);
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
| **joblogicAPIModelsCreateMileageJobCostRequest** | [JoblogicAPIModelsCreateMileageJobCostRequest](JoblogicAPIModelsCreateMileageJobCostRequest.md) | Mileage Job Cost Line Information | [Optional] |

### Return type

[**JoblogicAPIModelsJobMileageResponse**](JoblogicAPIModelsJobMileageResponse.md)

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


## apiV1JobCostMileagePut

> JoblogicAPIModelsJobMileageResponse apiV1JobCostMileagePut(authorization, joblogicAPIModelsUpdateMileageJobCostRequest)

Update Mileage Job Cost

### Example

```ts
import {
  Configuration,
  JobCostApi,
} from '';
import type { ApiV1JobCostMileagePutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobCostApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateMileageJobCostRequest | Mileage Job Cost Line Information (optional)
    joblogicAPIModelsUpdateMileageJobCostRequest: ...,
  } satisfies ApiV1JobCostMileagePutRequest;

  try {
    const data = await api.apiV1JobCostMileagePut(body);
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
| **joblogicAPIModelsUpdateMileageJobCostRequest** | [JoblogicAPIModelsUpdateMileageJobCostRequest](JoblogicAPIModelsUpdateMileageJobCostRequest.md) | Mileage Job Cost Line Information | [Optional] |

### Return type

[**JoblogicAPIModelsJobMileageResponse**](JoblogicAPIModelsJobMileageResponse.md)

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


## apiV1JobCostOtherPost

> JoblogicAPIModelsJobOtherResponse apiV1JobCostOtherPost(authorization, joblogicAPIModelsCreateOtherJobCostRequest)

Create Other Job Cost

### Example

```ts
import {
  Configuration,
  JobCostApi,
} from '';
import type { ApiV1JobCostOtherPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobCostApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateOtherJobCostRequest | Other Job Cost Line Information (optional)
    joblogicAPIModelsCreateOtherJobCostRequest: ...,
  } satisfies ApiV1JobCostOtherPostRequest;

  try {
    const data = await api.apiV1JobCostOtherPost(body);
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
| **joblogicAPIModelsCreateOtherJobCostRequest** | [JoblogicAPIModelsCreateOtherJobCostRequest](JoblogicAPIModelsCreateOtherJobCostRequest.md) | Other Job Cost Line Information | [Optional] |

### Return type

[**JoblogicAPIModelsJobOtherResponse**](JoblogicAPIModelsJobOtherResponse.md)

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


## apiV1JobCostOtherPut

> JoblogicAPIModelsJobOtherResponse apiV1JobCostOtherPut(authorization, joblogicAPIModelsUpdateOtherJobCostRequest)

Update Other Job Cost

### Example

```ts
import {
  Configuration,
  JobCostApi,
} from '';
import type { ApiV1JobCostOtherPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobCostApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateOtherJobCostRequest | Other Job Cost Line Information (optional)
    joblogicAPIModelsUpdateOtherJobCostRequest: ...,
  } satisfies ApiV1JobCostOtherPutRequest;

  try {
    const data = await api.apiV1JobCostOtherPut(body);
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
| **joblogicAPIModelsUpdateOtherJobCostRequest** | [JoblogicAPIModelsUpdateOtherJobCostRequest](JoblogicAPIModelsUpdateOtherJobCostRequest.md) | Other Job Cost Line Information | [Optional] |

### Return type

[**JoblogicAPIModelsJobOtherResponse**](JoblogicAPIModelsJobOtherResponse.md)

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


## apiV1JobCostOvertimePost

> JoblogicAPIModelsJobOvertimeResponse apiV1JobCostOvertimePost(authorization, joblogicAPIModelsCreateOvertimeJobCostRequest)

Create Overtime Job Cost

### Example

```ts
import {
  Configuration,
  JobCostApi,
} from '';
import type { ApiV1JobCostOvertimePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobCostApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateOvertimeJobCostRequest | Overtime Job Cost Line Information (optional)
    joblogicAPIModelsCreateOvertimeJobCostRequest: ...,
  } satisfies ApiV1JobCostOvertimePostRequest;

  try {
    const data = await api.apiV1JobCostOvertimePost(body);
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
| **joblogicAPIModelsCreateOvertimeJobCostRequest** | [JoblogicAPIModelsCreateOvertimeJobCostRequest](JoblogicAPIModelsCreateOvertimeJobCostRequest.md) | Overtime Job Cost Line Information | [Optional] |

### Return type

[**JoblogicAPIModelsJobOvertimeResponse**](JoblogicAPIModelsJobOvertimeResponse.md)

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


## apiV1JobCostOvertimePut

> JoblogicAPIModelsJobOvertimeResponse apiV1JobCostOvertimePut(authorization, joblogicAPIModelsUpdateOvertimeJobCostRequest)

Update Overtime Job Cost

### Example

```ts
import {
  Configuration,
  JobCostApi,
} from '';
import type { ApiV1JobCostOvertimePutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobCostApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateOvertimeJobCostRequest | Overtime Job Cost Line Information (optional)
    joblogicAPIModelsUpdateOvertimeJobCostRequest: ...,
  } satisfies ApiV1JobCostOvertimePutRequest;

  try {
    const data = await api.apiV1JobCostOvertimePut(body);
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
| **joblogicAPIModelsUpdateOvertimeJobCostRequest** | [JoblogicAPIModelsUpdateOvertimeJobCostRequest](JoblogicAPIModelsUpdateOvertimeJobCostRequest.md) | Overtime Job Cost Line Information | [Optional] |

### Return type

[**JoblogicAPIModelsJobOvertimeResponse**](JoblogicAPIModelsJobOvertimeResponse.md)

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


## apiV1JobCostSORItemsPost

> number apiV1JobCostSORItemsPost(authorization, joblogicAPIModelsCreateSORItemsJobCostRequest)

Create SORItems Job Cost

### Example

```ts
import {
  Configuration,
  JobCostApi,
} from '';
import type { ApiV1JobCostSORItemsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobCostApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateSORItemsJobCostRequest | SORItems Job Cost Line Information (optional)
    joblogicAPIModelsCreateSORItemsJobCostRequest: ...,
  } satisfies ApiV1JobCostSORItemsPostRequest;

  try {
    const data = await api.apiV1JobCostSORItemsPost(body);
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
| **joblogicAPIModelsCreateSORItemsJobCostRequest** | [JoblogicAPIModelsCreateSORItemsJobCostRequest](JoblogicAPIModelsCreateSORItemsJobCostRequest.md) | SORItems Job Cost Line Information | [Optional] |

### Return type

**number**

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


## apiV1JobCostSORItemsPut

> JoblogicAPIModelsJobScheduleOfRatesResponse apiV1JobCostSORItemsPut(authorization, joblogicAPIModelsUpdateSORItemsJobCostRequest)

Update SORItems Job Cost

### Example

```ts
import {
  Configuration,
  JobCostApi,
} from '';
import type { ApiV1JobCostSORItemsPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobCostApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateSORItemsJobCostRequest | SORItems Job Cost Line Information (optional)
    joblogicAPIModelsUpdateSORItemsJobCostRequest: ...,
  } satisfies ApiV1JobCostSORItemsPutRequest;

  try {
    const data = await api.apiV1JobCostSORItemsPut(body);
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
| **joblogicAPIModelsUpdateSORItemsJobCostRequest** | [JoblogicAPIModelsUpdateSORItemsJobCostRequest](JoblogicAPIModelsUpdateSORItemsJobCostRequest.md) | SORItems Job Cost Line Information | [Optional] |

### Return type

[**JoblogicAPIModelsJobScheduleOfRatesResponse**](JoblogicAPIModelsJobScheduleOfRatesResponse.md)

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


## apiV1JobCostSubcontractorPost

> JoblogicAPIModelsJobSubcontractorResponse apiV1JobCostSubcontractorPost(authorization, joblogicAPIModelsCreateSubcontractorJobCostRequest)

Create Subcontractor Job Cost

### Example

```ts
import {
  Configuration,
  JobCostApi,
} from '';
import type { ApiV1JobCostSubcontractorPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobCostApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateSubcontractorJobCostRequest | Subcontractor Job Cost Line Information (optional)
    joblogicAPIModelsCreateSubcontractorJobCostRequest: ...,
  } satisfies ApiV1JobCostSubcontractorPostRequest;

  try {
    const data = await api.apiV1JobCostSubcontractorPost(body);
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
| **joblogicAPIModelsCreateSubcontractorJobCostRequest** | [JoblogicAPIModelsCreateSubcontractorJobCostRequest](JoblogicAPIModelsCreateSubcontractorJobCostRequest.md) | Subcontractor Job Cost Line Information | [Optional] |

### Return type

[**JoblogicAPIModelsJobSubcontractorResponse**](JoblogicAPIModelsJobSubcontractorResponse.md)

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


## apiV1JobCostSubcontractorPut

> JoblogicAPIModelsJobSubcontractorResponse apiV1JobCostSubcontractorPut(authorization, joblogicAPIModelsUpdateSubcontractorJobCostRequest)

Update Subcontractor Job Cost

### Example

```ts
import {
  Configuration,
  JobCostApi,
} from '';
import type { ApiV1JobCostSubcontractorPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobCostApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateSubcontractorJobCostRequest | Subcontractor Job Cost Line Information (optional)
    joblogicAPIModelsUpdateSubcontractorJobCostRequest: ...,
  } satisfies ApiV1JobCostSubcontractorPutRequest;

  try {
    const data = await api.apiV1JobCostSubcontractorPut(body);
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
| **joblogicAPIModelsUpdateSubcontractorJobCostRequest** | [JoblogicAPIModelsUpdateSubcontractorJobCostRequest](JoblogicAPIModelsUpdateSubcontractorJobCostRequest.md) | Subcontractor Job Cost Line Information | [Optional] |

### Return type

[**JoblogicAPIModelsJobSubcontractorResponse**](JoblogicAPIModelsJobSubcontractorResponse.md)

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


## apiV1JobCostTravelPost

> JoblogicAPIModelsJobTravelResponse apiV1JobCostTravelPost(authorization, joblogicAPIModelsCreateTravelJobCostRequest)

Create Travel Job Cost

### Example

```ts
import {
  Configuration,
  JobCostApi,
} from '';
import type { ApiV1JobCostTravelPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobCostApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateTravelJobCostRequest | Travel Job Cost Line Information (optional)
    joblogicAPIModelsCreateTravelJobCostRequest: ...,
  } satisfies ApiV1JobCostTravelPostRequest;

  try {
    const data = await api.apiV1JobCostTravelPost(body);
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
| **joblogicAPIModelsCreateTravelJobCostRequest** | [JoblogicAPIModelsCreateTravelJobCostRequest](JoblogicAPIModelsCreateTravelJobCostRequest.md) | Travel Job Cost Line Information | [Optional] |

### Return type

[**JoblogicAPIModelsJobTravelResponse**](JoblogicAPIModelsJobTravelResponse.md)

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


## apiV1JobCostTravelPut

> JoblogicAPIModelsJobTravelResponse apiV1JobCostTravelPut(authorization, joblogicAPIModelsUpdateTravelJobCostRequest)

Update Travel Job Cost

### Example

```ts
import {
  Configuration,
  JobCostApi,
} from '';
import type { ApiV1JobCostTravelPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new JobCostApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateTravelJobCostRequest | Travel Job Cost Line Information (optional)
    joblogicAPIModelsUpdateTravelJobCostRequest: ...,
  } satisfies ApiV1JobCostTravelPutRequest;

  try {
    const data = await api.apiV1JobCostTravelPut(body);
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
| **joblogicAPIModelsUpdateTravelJobCostRequest** | [JoblogicAPIModelsUpdateTravelJobCostRequest](JoblogicAPIModelsUpdateTravelJobCostRequest.md) | Travel Job Cost Line Information | [Optional] |

### Return type

[**JoblogicAPIModelsJobTravelResponse**](JoblogicAPIModelsJobTravelResponse.md)

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

