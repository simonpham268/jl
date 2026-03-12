# ReportApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1ReportExportToFilePost**](ReportApi.md#apiv1reportexporttofilepost) | **POST** /api/v1/Report/ExportToFile | The API is asynchronous. When the API is called, it triggers an export job. After triggering an export job, use GetExportToFileStatus API to track the job status. |
| [**apiV1ReportGetAllPost**](ReportApi.md#apiv1reportgetallpost) | **POST** /api/v1/Report/GetAll | Search Reports by description |
| [**apiV1ReportGetExportToFileStatusGet**](ReportApi.md#apiv1reportgetexporttofilestatusget) | **GET** /api/v1/Report/GetExportToFileStatus | This API method retrieves the current status of an \&quot;Export to File\&quot; job for a specified report. If the job status is \&quot;Succeeded,\&quot; it returns a temporary file URL. You can use this URL to download the exported data. Please note that the file link is valid for up to seven days. |



## apiV1ReportExportToFilePost

> JoblogicAPIModelsExportReportToFileJobResponse apiV1ReportExportToFilePost(authorization, joblogicAPIModelsExportReportToFileJobRequest)

The API is asynchronous. When the API is called, it triggers an export job. After triggering an export job, use GetExportToFileStatus API to track the job status.

### Example

```ts
import {
  Configuration,
  ReportApi,
} from '';
import type { ApiV1ReportExportToFilePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ReportApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsExportReportToFileJobRequest (optional)
    joblogicAPIModelsExportReportToFileJobRequest: ...,
  } satisfies ApiV1ReportExportToFilePostRequest;

  try {
    const data = await api.apiV1ReportExportToFilePost(body);
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
| **joblogicAPIModelsExportReportToFileJobRequest** | [JoblogicAPIModelsExportReportToFileJobRequest](JoblogicAPIModelsExportReportToFileJobRequest.md) |  | [Optional] |

### Return type

[**JoblogicAPIModelsExportReportToFileJobResponse**](JoblogicAPIModelsExportReportToFileJobResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json-patch+json`, `application/json`, `text/json`, `application/*+json`
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **202** | Accepted |  -  |
| **400** | Bad Request |  -  |
| **401** | Unauthorized Request |  -  |
| **404** | Not found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1ReportGetAllPost

> JobLogicMicroserviceLogbookContractReportSearchResponse apiV1ReportGetAllPost(authorization, joblogicAPIModelsSearchReportRequest)

Search Reports by description

### Example

```ts
import {
  Configuration,
  ReportApi,
} from '';
import type { ApiV1ReportGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ReportApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchReportRequest | search conditons (optional)
    joblogicAPIModelsSearchReportRequest: ...,
  } satisfies ApiV1ReportGetAllPostRequest;

  try {
    const data = await api.apiV1ReportGetAllPost(body);
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
| **joblogicAPIModelsSearchReportRequest** | [JoblogicAPIModelsSearchReportRequest](JoblogicAPIModelsSearchReportRequest.md) | search conditons | [Optional] |

### Return type

[**JobLogicMicroserviceLogbookContractReportSearchResponse**](JobLogicMicroserviceLogbookContractReportSearchResponse.md)

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


## apiV1ReportGetExportToFileStatusGet

> JoblogicAPIModelsExportToFileStatusReponse apiV1ReportGetExportToFileStatusGet(authorization, exportid, tenantId)

This API method retrieves the current status of an \&quot;Export to File\&quot; job for a specified report. If the job status is \&quot;Succeeded,\&quot; it returns a temporary file URL. You can use this URL to download the exported data. Please note that the file link is valid for up to seven days.

### Example

```ts
import {
  Configuration,
  ReportApi,
} from '';
import type { ApiV1ReportGetExportToFileStatusGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ReportApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | export id (optional)
    exportid: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | The identifier of the tenant (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1ReportGetExportToFileStatusGetRequest;

  try {
    const data = await api.apiV1ReportGetExportToFileStatusGet(body);
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
| **exportid** | `string` | export id | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | The identifier of the tenant | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsExportToFileStatusReponse**](JoblogicAPIModelsExportToFileStatusReponse.md)

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

