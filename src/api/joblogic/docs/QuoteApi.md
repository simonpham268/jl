# QuoteApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1QuoteApprovePost**](QuoteApi.md#apiv1quoteapprovepost) | **POST** /api/v1/Quote/approve | Approve quote |
| [**apiV1QuoteAssigncontactsPost**](QuoteApi.md#apiv1quoteassigncontactspost) | **POST** /api/v1/Quote/assigncontacts | Assign Customers/Site Contact(s) to Quote |
| [**apiV1QuoteCancelPost**](QuoteApi.md#apiv1quotecancelpost) | **POST** /api/v1/Quote/cancel | Cancel quote |
| [**apiV1QuoteDelete**](QuoteApi.md#apiv1quotedelete) | **DELETE** /api/v1/Quote | Delete Quote by AutoId |
| [**apiV1QuoteDeleteByUniqueIdDelete**](QuoteApi.md#apiv1quotedeletebyuniqueiddelete) | **DELETE** /api/v1/Quote/DeleteByUniqueId | Delete Quote by UniqueId |
| [**apiV1QuoteGeneratedocumentPost**](QuoteApi.md#apiv1quotegeneratedocumentpost) | **POST** /api/v1/Quote/generatedocument | Generate Downloadable Url for Quotesheet |
| [**apiV1QuoteGetAllPost**](QuoteApi.md#apiv1quotegetallpost) | **POST** /api/v1/Quote/GetAll | Search Quote by keyword, tags, active status, date,... |
| [**apiV1QuoteGetByIdGet**](QuoteApi.md#apiv1quotegetbyidget) | **GET** /api/v1/Quote/GetById | Get Quote by auto Id and tenant id. |
| [**apiV1QuoteGetCostsGet**](QuoteApi.md#apiv1quotegetcostsget) | **GET** /api/v1/Quote/GetCosts | Get quote costs grouped by type with profitability data |
| [**apiV1QuotePost**](QuoteApi.md#apiv1quotepost) | **POST** /api/v1/Quote | Create Quote Item |
| [**apiV1QuotePut**](QuoteApi.md#apiv1quoteput) | **PUT** /api/v1/Quote | Update Quote |
| [**apiV1QuoteRejectPost**](QuoteApi.md#apiv1quoterejectpost) | **POST** /api/v1/Quote/reject | Reject quote |
| [**apiV1QuoteRevertPost**](QuoteApi.md#apiv1quoterevertpost) | **POST** /api/v1/Quote/revert | Revert quote |



## apiV1QuoteApprovePost

> boolean apiV1QuoteApprovePost(authorization, joblogicAPIModelsApproveQuoteRequest)

Approve quote

### Example

```ts
import {
  Configuration,
  QuoteApi,
} from '';
import type { ApiV1QuoteApprovePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new QuoteApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsApproveQuoteRequest | Quote to approve (optional)
    joblogicAPIModelsApproveQuoteRequest: ...,
  } satisfies ApiV1QuoteApprovePostRequest;

  try {
    const data = await api.apiV1QuoteApprovePost(body);
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
| **joblogicAPIModelsApproveQuoteRequest** | [JoblogicAPIModelsApproveQuoteRequest](JoblogicAPIModelsApproveQuoteRequest.md) | Quote to approve | [Optional] |

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


## apiV1QuoteAssigncontactsPost

> JoblogicAPIModelsAssignContactToQuoteResponse apiV1QuoteAssigncontactsPost(authorization, joblogicAPIModelsAssignContactToQuoteRequest)

Assign Customers/Site Contact(s) to Quote

### Example

```ts
import {
  Configuration,
  QuoteApi,
} from '';
import type { ApiV1QuoteAssigncontactsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new QuoteApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsAssignContactToQuoteRequest | assign contact to quote request (optional)
    joblogicAPIModelsAssignContactToQuoteRequest: ...,
  } satisfies ApiV1QuoteAssigncontactsPostRequest;

  try {
    const data = await api.apiV1QuoteAssigncontactsPost(body);
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
| **joblogicAPIModelsAssignContactToQuoteRequest** | [JoblogicAPIModelsAssignContactToQuoteRequest](JoblogicAPIModelsAssignContactToQuoteRequest.md) | assign contact to quote request | [Optional] |

### Return type

[**JoblogicAPIModelsAssignContactToQuoteResponse**](JoblogicAPIModelsAssignContactToQuoteResponse.md)

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


## apiV1QuoteCancelPost

> boolean apiV1QuoteCancelPost(authorization, joblogicAPIModelsCancelQuoteRequest)

Cancel quote

### Example

```ts
import {
  Configuration,
  QuoteApi,
} from '';
import type { ApiV1QuoteCancelPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new QuoteApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCancelQuoteRequest | Quote to cancel (optional)
    joblogicAPIModelsCancelQuoteRequest: ...,
  } satisfies ApiV1QuoteCancelPostRequest;

  try {
    const data = await api.apiV1QuoteCancelPost(body);
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
| **joblogicAPIModelsCancelQuoteRequest** | [JoblogicAPIModelsCancelQuoteRequest](JoblogicAPIModelsCancelQuoteRequest.md) | Quote to cancel | [Optional] |

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


## apiV1QuoteDelete

> apiV1QuoteDelete(authorization, id, tenantId)

Delete Quote by AutoId

### Example

```ts
import {
  Configuration,
  QuoteApi,
} from '';
import type { ApiV1QuoteDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new QuoteApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // number | Auto Id (int) of the Quote to delete (optional)
    id: 56,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1QuoteDeleteRequest;

  try {
    const data = await api.apiV1QuoteDelete(body);
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
| **id** | `number` | Auto Id (int) of the Quote to delete | [Optional] [Defaults to `undefined`] |
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


## apiV1QuoteDeleteByUniqueIdDelete

> apiV1QuoteDeleteByUniqueIdDelete(authorization, uniqueId, tenantId)

Delete Quote by UniqueId

### Example

```ts
import {
  Configuration,
  QuoteApi,
} from '';
import type { ApiV1QuoteDeleteByUniqueIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new QuoteApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Unique Id (GUID) of the Quote to delete (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1QuoteDeleteByUniqueIdDeleteRequest;

  try {
    const data = await api.apiV1QuoteDeleteByUniqueIdDelete(body);
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
| **uniqueId** | `string` | Unique Id (GUID) of the Quote to delete | [Optional] [Defaults to `undefined`] |
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


## apiV1QuoteGeneratedocumentPost

> JoblogicAPIModelsGenerateQuotesheetResponse apiV1QuoteGeneratedocumentPost(authorization, joblogicAPIModelsGenerateQuotesheetRequest)

Generate Downloadable Url for Quotesheet

### Example

```ts
import {
  Configuration,
  QuoteApi,
} from '';
import type { ApiV1QuoteGeneratedocumentPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new QuoteApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsGenerateQuotesheetRequest | Job to download Quotesheet from (optional)
    joblogicAPIModelsGenerateQuotesheetRequest: ...,
  } satisfies ApiV1QuoteGeneratedocumentPostRequest;

  try {
    const data = await api.apiV1QuoteGeneratedocumentPost(body);
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
| **joblogicAPIModelsGenerateQuotesheetRequest** | [JoblogicAPIModelsGenerateQuotesheetRequest](JoblogicAPIModelsGenerateQuotesheetRequest.md) | Job to download Quotesheet from | [Optional] |

### Return type

[**JoblogicAPIModelsGenerateQuotesheetResponse**](JoblogicAPIModelsGenerateQuotesheetResponse.md)

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


## apiV1QuoteGetAllPost

> JoblogicAPIModelsSearchQuoteResponse apiV1QuoteGetAllPost(authorization, joblogicAPIModelsSearchQuoteRequest)

Search Quote by keyword, tags, active status, date,...

### Example

```ts
import {
  Configuration,
  QuoteApi,
} from '';
import type { ApiV1QuoteGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new QuoteApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchQuoteRequest | search conditons (optional)
    joblogicAPIModelsSearchQuoteRequest: ...,
  } satisfies ApiV1QuoteGetAllPostRequest;

  try {
    const data = await api.apiV1QuoteGetAllPost(body);
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
| **joblogicAPIModelsSearchQuoteRequest** | [JoblogicAPIModelsSearchQuoteRequest](JoblogicAPIModelsSearchQuoteRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchQuoteResponse**](JoblogicAPIModelsSearchQuoteResponse.md)

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


## apiV1QuoteGetByIdGet

> JoblogicAPIModelsQuoteItemApiResponse apiV1QuoteGetByIdGet(authorization, id, tenantId, includeLines)

Get Quote by auto Id and tenant id.

### Example

```ts
import {
  Configuration,
  QuoteApi,
} from '';
import type { ApiV1QuoteGetByIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new QuoteApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // number | Quote\'s auto Id (optional)
    id: 56,
    // string | Tenant Id (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // boolean | include lines (optional)
    includeLines: true,
  } satisfies ApiV1QuoteGetByIdGetRequest;

  try {
    const data = await api.apiV1QuoteGetByIdGet(body);
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
| **id** | `number` | Quote\&#39;s auto Id | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Tenant Id | [Optional] [Defaults to `undefined`] |
| **includeLines** | `boolean` | include lines | [Optional] [Defaults to `false`] |

### Return type

[**JoblogicAPIModelsQuoteItemApiResponse**](JoblogicAPIModelsQuoteItemApiResponse.md)

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


## apiV1QuoteGetCostsGet

> JoblogicAPIModelsGetQuoteLinesResponse apiV1QuoteGetCostsGet(authorization, quoteId, tenantId)

Get quote costs grouped by type with profitability data

### Example

```ts
import {
  Configuration,
  QuoteApi,
} from '';
import type { ApiV1QuoteGetCostsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new QuoteApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // number | Quote ID to get costs for (optional)
    quoteId: 56,
    // string | Tenant ID (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1QuoteGetCostsGetRequest;

  try {
    const data = await api.apiV1QuoteGetCostsGet(body);
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
| **quoteId** | `number` | Quote ID to get costs for | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Tenant ID | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsGetQuoteLinesResponse**](JoblogicAPIModelsGetQuoteLinesResponse.md)

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


## apiV1QuotePost

> JoblogicAPIModelsQuoteItemApiResponse apiV1QuotePost(authorization, joblogicAPIModelsCreateQuoteRequest)

Create Quote Item

### Example

```ts
import {
  Configuration,
  QuoteApi,
} from '';
import type { ApiV1QuotePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new QuoteApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateQuoteRequest | Quote to create (optional)
    joblogicAPIModelsCreateQuoteRequest: ...,
  } satisfies ApiV1QuotePostRequest;

  try {
    const data = await api.apiV1QuotePost(body);
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
| **joblogicAPIModelsCreateQuoteRequest** | [JoblogicAPIModelsCreateQuoteRequest](JoblogicAPIModelsCreateQuoteRequest.md) | Quote to create | [Optional] |

### Return type

[**JoblogicAPIModelsQuoteItemApiResponse**](JoblogicAPIModelsQuoteItemApiResponse.md)

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


## apiV1QuotePut

> JoblogicAPIModelsQuoteItemApiResponse apiV1QuotePut(authorization, joblogicAPIModelsUpdateQuoteRequest)

Update Quote

### Example

```ts
import {
  Configuration,
  QuoteApi,
} from '';
import type { ApiV1QuotePutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new QuoteApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateQuoteRequest | Purchase Order to update (optional)
    joblogicAPIModelsUpdateQuoteRequest: ...,
  } satisfies ApiV1QuotePutRequest;

  try {
    const data = await api.apiV1QuotePut(body);
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
| **joblogicAPIModelsUpdateQuoteRequest** | [JoblogicAPIModelsUpdateQuoteRequest](JoblogicAPIModelsUpdateQuoteRequest.md) | Purchase Order to update | [Optional] |

### Return type

[**JoblogicAPIModelsQuoteItemApiResponse**](JoblogicAPIModelsQuoteItemApiResponse.md)

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


## apiV1QuoteRejectPost

> boolean apiV1QuoteRejectPost(authorization, joblogicAPIModelsRejectQuoteRequest)

Reject quote

### Example

```ts
import {
  Configuration,
  QuoteApi,
} from '';
import type { ApiV1QuoteRejectPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new QuoteApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsRejectQuoteRequest | Quote to reject (optional)
    joblogicAPIModelsRejectQuoteRequest: ...,
  } satisfies ApiV1QuoteRejectPostRequest;

  try {
    const data = await api.apiV1QuoteRejectPost(body);
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
| **joblogicAPIModelsRejectQuoteRequest** | [JoblogicAPIModelsRejectQuoteRequest](JoblogicAPIModelsRejectQuoteRequest.md) | Quote to reject | [Optional] |

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


## apiV1QuoteRevertPost

> boolean apiV1QuoteRevertPost(authorization, joblogicAPIModelsRevertQuoteRequest)

Revert quote

### Example

```ts
import {
  Configuration,
  QuoteApi,
} from '';
import type { ApiV1QuoteRevertPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new QuoteApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsRevertQuoteRequest | Quote to revert (optional)
    joblogicAPIModelsRevertQuoteRequest: ...,
  } satisfies ApiV1QuoteRevertPostRequest;

  try {
    const data = await api.apiV1QuoteRevertPost(body);
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
| **joblogicAPIModelsRevertQuoteRequest** | [JoblogicAPIModelsRevertQuoteRequest](JoblogicAPIModelsRevertQuoteRequest.md) | Quote to revert | [Optional] |

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

