# VisitExpenseApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1VisitExpenseDelete**](VisitExpenseApi.md#apiv1visitexpensedelete) | **DELETE** /api/v1/VisitExpense | Delete Visit Expense |
| [**apiV1VisitExpenseGet**](VisitExpenseApi.md#apiv1visitexpenseget) | **GET** /api/v1/VisitExpense | Gets Visit Expense Details |
| [**apiV1VisitExpensePost**](VisitExpenseApi.md#apiv1visitexpensepost) | **POST** /api/v1/VisitExpense | Create Visit Expense |
| [**apiV1VisitExpensePut**](VisitExpenseApi.md#apiv1visitexpenseput) | **PUT** /api/v1/VisitExpense | Update Visit Expense |



## apiV1VisitExpenseDelete

> apiV1VisitExpenseDelete(authorization, id, tenantId)

Delete Visit Expense

### Example

```ts
import {
  Configuration,
  VisitExpenseApi,
} from '';
import type { ApiV1VisitExpenseDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VisitExpenseApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Id of the Visit Expense to delete (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1VisitExpenseDeleteRequest;

  try {
    const data = await api.apiV1VisitExpenseDelete(body);
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
| **id** | `string` | Id of the Visit Expense to delete | [Optional] [Defaults to `undefined`] |
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


## apiV1VisitExpenseGet

> JobLogicMicroserviceCoreContractVisitExpenseResponse apiV1VisitExpenseGet(authorization, uniqueId, tenantId)

Gets Visit Expense Details

### Example

```ts
import {
  Configuration,
  VisitExpenseApi,
} from '';
import type { ApiV1VisitExpenseGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VisitExpenseApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Unique id of the Visit Expense to retrieve (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1VisitExpenseGetRequest;

  try {
    const data = await api.apiV1VisitExpenseGet(body);
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
| **uniqueId** | `string` | Unique id of the Visit Expense to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JobLogicMicroserviceCoreContractVisitExpenseResponse**](JobLogicMicroserviceCoreContractVisitExpenseResponse.md)

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


## apiV1VisitExpensePost

> JobLogicMicroserviceCoreContractVisitExpenseResponse apiV1VisitExpensePost(authorization, joblogicAPIModelsRequestCreateVisitExpense)

Create Visit Expense

### Example

```ts
import {
  Configuration,
  VisitExpenseApi,
} from '';
import type { ApiV1VisitExpensePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VisitExpenseApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsRequestCreateVisitExpense | Part to create (optional)
    joblogicAPIModelsRequestCreateVisitExpense: ...,
  } satisfies ApiV1VisitExpensePostRequest;

  try {
    const data = await api.apiV1VisitExpensePost(body);
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
| **joblogicAPIModelsRequestCreateVisitExpense** | [JoblogicAPIModelsRequestCreateVisitExpense](JoblogicAPIModelsRequestCreateVisitExpense.md) | Part to create | [Optional] |

### Return type

[**JobLogicMicroserviceCoreContractVisitExpenseResponse**](JobLogicMicroserviceCoreContractVisitExpenseResponse.md)

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


## apiV1VisitExpensePut

> JobLogicMicroserviceCoreContractVisitExpenseResponse apiV1VisitExpensePut(authorization, joblogicAPIModelsRequestUpdateVisitExpense)

Update Visit Expense

### Example

```ts
import {
  Configuration,
  VisitExpenseApi,
} from '';
import type { ApiV1VisitExpensePutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VisitExpenseApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsRequestUpdateVisitExpense | Visit Expense to update (optional)
    joblogicAPIModelsRequestUpdateVisitExpense: ...,
  } satisfies ApiV1VisitExpensePutRequest;

  try {
    const data = await api.apiV1VisitExpensePut(body);
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
| **joblogicAPIModelsRequestUpdateVisitExpense** | [JoblogicAPIModelsRequestUpdateVisitExpense](JoblogicAPIModelsRequestUpdateVisitExpense.md) | Visit Expense to update | [Optional] |

### Return type

[**JobLogicMicroserviceCoreContractVisitExpenseResponse**](JobLogicMicroserviceCoreContractVisitExpenseResponse.md)

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

