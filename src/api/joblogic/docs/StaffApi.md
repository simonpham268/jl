# StaffApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1StaffGet**](StaffApi.md#apiv1staffget) | **GET** /api/v1/Staff | Gets staff details |
| [**apiV1StaffGetAllPost**](StaffApi.md#apiv1staffgetallpost) | **POST** /api/v1/Staff/GetAll | Search Staff by keyword and active status |
| [**apiV1StaffGetApprovalLimitGet**](StaffApi.md#apiv1staffgetapprovallimitget) | **GET** /api/v1/Staff/GetApprovalLimit | Gets staff details - Approval Limit |



## apiV1StaffGet

> JoblogicAPIModelsStaffDetailResponse apiV1StaffGet(authorization, uniqueId, id, tenantId)

Gets staff details

### Example

```ts
import {
  Configuration,
  StaffApi,
} from '';
import type { ApiV1StaffGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StaffApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | UniqueId of the staff to retrieve (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // number | Id of the staff to retrieve (optional)
    id: 56,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1StaffGetRequest;

  try {
    const data = await api.apiV1StaffGet(body);
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
| **uniqueId** | `string` | UniqueId of the staff to retrieve | [Optional] [Defaults to `undefined`] |
| **id** | `number` | Id of the staff to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsStaffDetailResponse**](JoblogicAPIModelsStaffDetailResponse.md)

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


## apiV1StaffGetAllPost

> JoblogicAPIModelsStaffGetDetailResponse apiV1StaffGetAllPost(authorization, joblogicAPIModelsRequestSearchStaffrequest)

Search Staff by keyword and active status

### Example

```ts
import {
  Configuration,
  StaffApi,
} from '';
import type { ApiV1StaffGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StaffApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsRequestSearchStaffrequest | search conditons (optional)
    joblogicAPIModelsRequestSearchStaffrequest: ...,
  } satisfies ApiV1StaffGetAllPostRequest;

  try {
    const data = await api.apiV1StaffGetAllPost(body);
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
| **joblogicAPIModelsRequestSearchStaffrequest** | [JoblogicAPIModelsRequestSearchStaffrequest](JoblogicAPIModelsRequestSearchStaffrequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsStaffGetDetailResponse**](JoblogicAPIModelsStaffGetDetailResponse.md)

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


## apiV1StaffGetApprovalLimitGet

> JoblogicAPIModelsStaffApprovalLimitResponse apiV1StaffGetApprovalLimitGet(authorization, id, tenantId)

Gets staff details - Approval Limit

### Example

```ts
import {
  Configuration,
  StaffApi,
} from '';
import type { ApiV1StaffGetApprovalLimitGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new StaffApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // number | Id of the staff to retrieve (optional)
    id: 56,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1StaffGetApprovalLimitGetRequest;

  try {
    const data = await api.apiV1StaffGetApprovalLimitGet(body);
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
| **id** | `number` | Id of the staff to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsStaffApprovalLimitResponse**](JoblogicAPIModelsStaffApprovalLimitResponse.md)

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

