# TimesheetApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1TimesheetAddNonProductiveDataPost**](TimesheetApi.md#apiv1timesheetaddnonproductivedatapost) | **POST** /api/v1/Timesheet/AddNonProductiveData | Create Non-Productive data to timesheets |
| [**apiV1TimesheetGet**](TimesheetApi.md#apiv1timesheetget) | **GET** /api/v1/Timesheet | Get timesheet details by timesheet ID |
| [**apiV1TimesheetGetAllPost**](TimesheetApi.md#apiv1timesheetgetallpost) | **POST** /api/v1/Timesheet/GetAll | Get all timesheets for the specified date range and engineer criteria |
| [**apiV1TimesheetGetNonProductiveTypesGet**](TimesheetApi.md#apiv1timesheetgetnonproductivetypesget) | **GET** /api/v1/Timesheet/GetNonProductiveTypes | Get Non-Productive types |
| [**apiV1TimesheetPost**](TimesheetApi.md#apiv1timesheetpost) | **POST** /api/v1/Timesheet | Add time entry for different timesheet types (Jobs, Non-Productive, Travel Home) |
| [**apiV1TimesheetPut**](TimesheetApi.md#apiv1timesheetput) | **PUT** /api/v1/Timesheet | Update an existing timesheet entry with the specified details |



## apiV1TimesheetAddNonProductiveDataPost

> JoblogicAPIModelsNonProductiveTimeSheetResponse apiV1TimesheetAddNonProductiveDataPost(authorization, joblogicAPIModelsAddNonProductiveTimeSheetRequest)

Create Non-Productive data to timesheets

### Example

```ts
import {
  Configuration,
  TimesheetApi,
} from '';
import type { ApiV1TimesheetAddNonProductiveDataPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TimesheetApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsAddNonProductiveTimeSheetRequest | Time to create (optional)
    joblogicAPIModelsAddNonProductiveTimeSheetRequest: ...,
  } satisfies ApiV1TimesheetAddNonProductiveDataPostRequest;

  try {
    const data = await api.apiV1TimesheetAddNonProductiveDataPost(body);
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
| **joblogicAPIModelsAddNonProductiveTimeSheetRequest** | [JoblogicAPIModelsAddNonProductiveTimeSheetRequest](JoblogicAPIModelsAddNonProductiveTimeSheetRequest.md) | Time to create | [Optional] |

### Return type

[**JoblogicAPIModelsNonProductiveTimeSheetResponse**](JoblogicAPIModelsNonProductiveTimeSheetResponse.md)

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


## apiV1TimesheetGet

> JoblogicAPIModelsTimeResponse apiV1TimesheetGet(tenantId, authorization, uniqueId)

Get timesheet details by timesheet ID

### Example

```ts
import {
  Configuration,
  TimesheetApi,
} from '';
import type { ApiV1TimesheetGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TimesheetApi();

  const body = {
    // string | Contractor Id in Joblogic
    tenantId: bf299948-f401-4bde-924c-ed445193f80b,
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Timesheet unique identifier (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1TimesheetGetRequest;

  try {
    const data = await api.apiV1TimesheetGet(body);
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
| **tenantId** | `string` | Contractor Id in Joblogic | [Defaults to `undefined`] |
| **authorization** | `string` | Bearer access_token | [Defaults to `undefined`] |
| **uniqueId** | `string` | Timesheet unique identifier | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsTimeResponse**](JoblogicAPIModelsTimeResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful operation - Returns timesheet details |  -  |
| **400** | Bad Request - Validation errors |  -  |
| **401** | Unauthorized Request |  -  |
| **404** | Resource not found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TimesheetGetAllPost

> any apiV1TimesheetGetAllPost(authorization, joblogicAPIModelsGetAllTimesheetsRequest)

Get all timesheets for the specified date range and engineer criteria

### Example

```ts
import {
  Configuration,
  TimesheetApi,
} from '';
import type { ApiV1TimesheetGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TimesheetApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsGetAllTimesheetsRequest | Request containing date range and optional engineer filters (optional)
    joblogicAPIModelsGetAllTimesheetsRequest: ...,
  } satisfies ApiV1TimesheetGetAllPostRequest;

  try {
    const data = await api.apiV1TimesheetGetAllPost(body);
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
| **joblogicAPIModelsGetAllTimesheetsRequest** | [JoblogicAPIModelsGetAllTimesheetsRequest](JoblogicAPIModelsGetAllTimesheetsRequest.md) | Request containing date range and optional engineer filters | [Optional] |

### Return type

**any**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json-patch+json`, `application/json`, `text/json`, `application/*+json`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Successful operation - Returns day timesheets if start and end dates are the same, otherwise returns week timesheets |  -  |
| **400** | Bad Request - Validation errors |  -  |
| **401** | Unauthorized Request |  -  |
| **404** | Resource not found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TimesheetGetNonProductiveTypesGet

> JoblogicAPIModelsNonProductiveTimeTypeResponse apiV1TimesheetGetNonProductiveTypesGet(authorization, tenantId)

Get Non-Productive types

### Example

```ts
import {
  Configuration,
  TimesheetApi,
} from '';
import type { ApiV1TimesheetGetNonProductiveTypesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TimesheetApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | TenantId (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1TimesheetGetNonProductiveTypesGetRequest;

  try {
    const data = await api.apiV1TimesheetGetNonProductiveTypesGet(body);
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
| **tenantId** | `string` | TenantId | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsNonProductiveTimeTypeResponse**](JoblogicAPIModelsNonProductiveTimeTypeResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TimesheetPost

> JoblogicAPIModelsTimeResponse apiV1TimesheetPost(authorization, joblogicAPIModelsCreateTimeRequest)

Add time entry for different timesheet types (Jobs, Non-Productive, Travel Home)

### Example

```ts
import {
  Configuration,
  TimesheetApi,
} from '';
import type { ApiV1TimesheetPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TimesheetApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateTimeRequest | Time entry request with timesheet type and related data (optional)
    joblogicAPIModelsCreateTimeRequest: ...,
  } satisfies ApiV1TimesheetPostRequest;

  try {
    const data = await api.apiV1TimesheetPost(body);
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
| **joblogicAPIModelsCreateTimeRequest** | [JoblogicAPIModelsCreateTimeRequest](JoblogicAPIModelsCreateTimeRequest.md) | Time entry request with timesheet type and related data | [Optional] |

### Return type

[**JoblogicAPIModelsTimeResponse**](JoblogicAPIModelsTimeResponse.md)

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
| **404** | Resource not found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1TimesheetPut

> JoblogicAPIModelsTimeResponse apiV1TimesheetPut(authorization, joblogicAPIModelsUpdateTimeRequest)

Update an existing timesheet entry with the specified details

### Example

```ts
import {
  Configuration,
  TimesheetApi,
} from '';
import type { ApiV1TimesheetPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TimesheetApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateTimeRequest | Timesheet update request with timesheet type and related data (optional)
    joblogicAPIModelsUpdateTimeRequest: ...,
  } satisfies ApiV1TimesheetPutRequest;

  try {
    const data = await api.apiV1TimesheetPut(body);
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
| **joblogicAPIModelsUpdateTimeRequest** | [JoblogicAPIModelsUpdateTimeRequest](JoblogicAPIModelsUpdateTimeRequest.md) | Timesheet update request with timesheet type and related data | [Optional] |

### Return type

[**JoblogicAPIModelsTimeResponse**](JoblogicAPIModelsTimeResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json-patch+json`, `application/json`, `text/json`, `application/*+json`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Timesheet updated successfully and returned |  -  |
| **400** | Bad Request - Validation errors |  -  |
| **401** | Unauthorized Request |  -  |
| **404** | Timesheet not found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

