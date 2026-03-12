# ExpenseApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1ExpenseDelete**](ExpenseApi.md#apiv1expensedelete) | **DELETE** /api/v1/Expense | Delete Expense |
| [**apiV1ExpenseGet**](ExpenseApi.md#apiv1expenseget) | **GET** /api/v1/Expense | Get Expense details by Unique Id and tenant id. |
| [**apiV1ExpenseGetAllPost**](ExpenseApi.md#apiv1expensegetallpost) | **POST** /api/v1/Expense/GetAll | Search Expense by keyword |
| [**apiV1ExpensePostPost**](ExpenseApi.md#apiv1expensepostpost) | **POST** /api/v1/Expense/Post | Create Expense |
| [**apiV1ExpensePut**](ExpenseApi.md#apiv1expenseput) | **PUT** /api/v1/Expense | Update Expense |



## apiV1ExpenseDelete

> apiV1ExpenseDelete(authorization, uniqueId, tenantId)

Delete Expense

### Example

```ts
import {
  Configuration,
  ExpenseApi,
} from '';
import type { ApiV1ExpenseDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ExpenseApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Guid of the Expense to delete (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1ExpenseDeleteRequest;

  try {
    const data = await api.apiV1ExpenseDelete(body);
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
| **uniqueId** | `string` | Guid of the Expense to delete | [Optional] [Defaults to `undefined`] |
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


## apiV1ExpenseGet

> JoblogicAPIModelsExpenseItemResponse apiV1ExpenseGet(authorization, uniqueId, tenantId)

Get Expense details by Unique Id and tenant id.

### Example

```ts
import {
  Configuration,
  ExpenseApi,
} from '';
import type { ApiV1ExpenseGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ExpenseApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Unique id of the Expense (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Tenant Id (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1ExpenseGetRequest;

  try {
    const data = await api.apiV1ExpenseGet(body);
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
| **uniqueId** | `string` | Unique id of the Expense | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Tenant Id | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsExpenseItemResponse**](JoblogicAPIModelsExpenseItemResponse.md)

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


## apiV1ExpenseGetAllPost

> JoblogicAPIModelsSearchExpenseResponse apiV1ExpenseGetAllPost(authorization, joblogicAPIModelsRequestSearchExpenseRequest)

Search Expense by keyword

### Example

```ts
import {
  Configuration,
  ExpenseApi,
} from '';
import type { ApiV1ExpenseGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ExpenseApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsRequestSearchExpenseRequest | search conditons (optional)
    joblogicAPIModelsRequestSearchExpenseRequest: ...,
  } satisfies ApiV1ExpenseGetAllPostRequest;

  try {
    const data = await api.apiV1ExpenseGetAllPost(body);
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
| **joblogicAPIModelsRequestSearchExpenseRequest** | [JoblogicAPIModelsRequestSearchExpenseRequest](JoblogicAPIModelsRequestSearchExpenseRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchExpenseResponse**](JoblogicAPIModelsSearchExpenseResponse.md)

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


## apiV1ExpensePostPost

> JoblogicAPIModelsExpenseItemResponse apiV1ExpensePostPost(authorization, joblogicAPIModelsRequestCreateExpenseRequest)

Create Expense

### Example

```ts
import {
  Configuration,
  ExpenseApi,
} from '';
import type { ApiV1ExpensePostPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ExpenseApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsRequestCreateExpenseRequest | Expense to create (optional)
    joblogicAPIModelsRequestCreateExpenseRequest: ...,
  } satisfies ApiV1ExpensePostPostRequest;

  try {
    const data = await api.apiV1ExpensePostPost(body);
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
| **joblogicAPIModelsRequestCreateExpenseRequest** | [JoblogicAPIModelsRequestCreateExpenseRequest](JoblogicAPIModelsRequestCreateExpenseRequest.md) | Expense to create | [Optional] |

### Return type

[**JoblogicAPIModelsExpenseItemResponse**](JoblogicAPIModelsExpenseItemResponse.md)

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


## apiV1ExpensePut

> JoblogicAPIModelsExpenseItemResponse apiV1ExpensePut(authorization, joblogicAPIModelsRequestUpdateExpenseRequest)

Update Expense

### Example

```ts
import {
  Configuration,
  ExpenseApi,
} from '';
import type { ApiV1ExpensePutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ExpenseApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsRequestUpdateExpenseRequest | Expense to update (optional)
    joblogicAPIModelsRequestUpdateExpenseRequest: ...,
  } satisfies ApiV1ExpensePutRequest;

  try {
    const data = await api.apiV1ExpensePut(body);
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
| **joblogicAPIModelsRequestUpdateExpenseRequest** | [JoblogicAPIModelsRequestUpdateExpenseRequest](JoblogicAPIModelsRequestUpdateExpenseRequest.md) | Expense to update | [Optional] |

### Return type

[**JoblogicAPIModelsExpenseItemResponse**](JoblogicAPIModelsExpenseItemResponse.md)

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

