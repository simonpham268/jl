# PurchaseOrderApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1PurchaseorderAddmultisupplierinvoicelinePost**](PurchaseOrderApi.md#apiv1purchaseorderaddmultisupplierinvoicelinepost) | **POST** /api/v1/purchaseorder/addmultisupplierinvoiceline | Add multi supplier invoice lines |
| [**apiV1PurchaseorderAddpoitemPost**](PurchaseOrderApi.md#apiv1purchaseorderaddpoitempost) | **POST** /api/v1/purchaseorder/addpoitem | Add Purchase Order Line Item |
| [**apiV1PurchaseorderAddsupplierinvoicePost**](PurchaseOrderApi.md#apiv1purchaseorderaddsupplierinvoicepost) | **POST** /api/v1/purchaseorder/addsupplierinvoice | Add Supplier Invoice to Purchase Order |
| [**apiV1PurchaseorderApprovePost**](PurchaseOrderApi.md#apiv1purchaseorderapprovepost) | **POST** /api/v1/purchaseorder/approve | Approve Purchase Order |
| [**apiV1PurchaseorderDelete**](PurchaseOrderApi.md#apiv1purchaseorderdelete) | **DELETE** /api/v1/purchaseorder | Delete Purchase Order |
| [**apiV1PurchaseorderDeletepoitemDelete**](PurchaseOrderApi.md#apiv1purchaseorderdeletepoitemdelete) | **DELETE** /api/v1/purchaseorder/deletepoitem | Delete Purchase Order Line item |
| [**apiV1PurchaseorderDeletesupplierinvoiceDelete**](PurchaseOrderApi.md#apiv1purchaseorderdeletesupplierinvoicedelete) | **DELETE** /api/v1/purchaseorder/deletesupplierinvoice | Delete Supplier Invoice |
| [**apiV1PurchaseorderGeneratedocumentPost**](PurchaseOrderApi.md#apiv1purchaseordergeneratedocumentpost) | **POST** /api/v1/purchaseorder/generatedocument | Generate Downloadable Url for PurchaseOrder |
| [**apiV1PurchaseorderGet**](PurchaseOrderApi.md#apiv1purchaseorderget) | **GET** /api/v1/purchaseorder | Get Purchase Order Details |
| [**apiV1PurchaseorderGetByJobIdPost**](PurchaseOrderApi.md#apiv1purchaseordergetbyjobidpost) | **POST** /api/v1/purchaseorder/GetByJobId | Get Purchase Order by Job Id |
| [**apiV1PurchaseorderGetallPost**](PurchaseOrderApi.md#apiv1purchaseordergetallpost) | **POST** /api/v1/purchaseorder/getall | Search Purchase Orders by conditions |
| [**apiV1PurchaseorderGetbyidGet**](PurchaseOrderApi.md#apiv1purchaseordergetbyidget) | **GET** /api/v1/purchaseorder/getbyid | Get Purchase Order Details |
| [**apiV1PurchaseorderGetpoitemGet**](PurchaseOrderApi.md#apiv1purchaseordergetpoitemget) | **GET** /api/v1/purchaseorder/getpoitem | Get Purchase Order Line item |
| [**apiV1PurchaseorderGetsupplierinvoicebypurchaseorderidPost**](PurchaseOrderApi.md#apiv1purchaseordergetsupplierinvoicebypurchaseorderidpost) | **POST** /api/v1/purchaseorder/getsupplierinvoicebypurchaseorderid | Get Supplier Invoices by Purchase Order Id |
| [**apiV1PurchaseorderMarkassentPost**](PurchaseOrderApi.md#apiv1purchaseordermarkassentpost) | **POST** /api/v1/purchaseorder/markassent |  |
| [**apiV1PurchaseorderPolineCompletedeliveryPost**](PurchaseOrderApi.md#apiv1purchaseorderpolinecompletedeliverypost) | **POST** /api/v1/purchaseorder/poline/completedelivery | Deliver Purchase Order Line item |
| [**apiV1PurchaseorderPost**](PurchaseOrderApi.md#apiv1purchaseorderpost) | **POST** /api/v1/purchaseorder | Create Purchase Order |
| [**apiV1PurchaseorderPut**](PurchaseOrderApi.md#apiv1purchaseorderput) | **PUT** /api/v1/purchaseorder | Update Purchase Order |
| [**apiV1PurchaseorderResolvePost**](PurchaseOrderApi.md#apiv1purchaseorderresolvepost) | **POST** /api/v1/purchaseorder/resolve | Resolve Purchase Order |
| [**apiV1PurchaseorderUpdatepoitemPut**](PurchaseOrderApi.md#apiv1purchaseorderupdatepoitemput) | **PUT** /api/v1/purchaseorder/updatepoitem | Update Purchase Order Line item |
| [**apiV1PurchaseorderUpdatesupplierinvoicePut**](PurchaseOrderApi.md#apiv1purchaseorderupdatesupplierinvoiceput) | **PUT** /api/v1/purchaseorder/updatesupplierinvoice | Update Supplier Invoice |



## apiV1PurchaseorderAddmultisupplierinvoicelinePost

> apiV1PurchaseorderAddmultisupplierinvoicelinePost(authorization, joblogicAPIModelsPurchaseOrderMultiSupplierInvoiceLinesRequest)

Add multi supplier invoice lines

### Example

```ts
import {
  Configuration,
  PurchaseOrderApi,
} from '';
import type { ApiV1PurchaseorderAddmultisupplierinvoicelinePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsPurchaseOrderMultiSupplierInvoiceLinesRequest |  (optional)
    joblogicAPIModelsPurchaseOrderMultiSupplierInvoiceLinesRequest: ...,
  } satisfies ApiV1PurchaseorderAddmultisupplierinvoicelinePostRequest;

  try {
    const data = await api.apiV1PurchaseorderAddmultisupplierinvoicelinePost(body);
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
| **joblogicAPIModelsPurchaseOrderMultiSupplierInvoiceLinesRequest** | [JoblogicAPIModelsPurchaseOrderMultiSupplierInvoiceLinesRequest](JoblogicAPIModelsPurchaseOrderMultiSupplierInvoiceLinesRequest.md) |  | [Optional] |

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
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1PurchaseorderAddpoitemPost

> JobLogicMicroserviceCoreContractPurchaseOrderLineGetResponse apiV1PurchaseorderAddpoitemPost(authorization, joblogicAPIModelsCreatePurchaseOrderLineRequest)

Add Purchase Order Line Item

### Example

```ts
import {
  Configuration,
  PurchaseOrderApi,
} from '';
import type { ApiV1PurchaseorderAddpoitemPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreatePurchaseOrderLineRequest | Purchase Order line item  to be created (optional)
    joblogicAPIModelsCreatePurchaseOrderLineRequest: ...,
  } satisfies ApiV1PurchaseorderAddpoitemPostRequest;

  try {
    const data = await api.apiV1PurchaseorderAddpoitemPost(body);
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
| **joblogicAPIModelsCreatePurchaseOrderLineRequest** | [JoblogicAPIModelsCreatePurchaseOrderLineRequest](JoblogicAPIModelsCreatePurchaseOrderLineRequest.md) | Purchase Order line item  to be created | [Optional] |

### Return type

[**JobLogicMicroserviceCoreContractPurchaseOrderLineGetResponse**](JobLogicMicroserviceCoreContractPurchaseOrderLineGetResponse.md)

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


## apiV1PurchaseorderAddsupplierinvoicePost

> JobLogicMicroserviceCoreContractSupplierInvoiceApiGetResponse apiV1PurchaseorderAddsupplierinvoicePost(authorization, joblogicAPIModelsCreateSupplierInvoice)

Add Supplier Invoice to Purchase Order

### Example

```ts
import {
  Configuration,
  PurchaseOrderApi,
} from '';
import type { ApiV1PurchaseorderAddsupplierinvoicePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateSupplierInvoice | Supplier Invoice to create (optional)
    joblogicAPIModelsCreateSupplierInvoice: ...,
  } satisfies ApiV1PurchaseorderAddsupplierinvoicePostRequest;

  try {
    const data = await api.apiV1PurchaseorderAddsupplierinvoicePost(body);
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
| **joblogicAPIModelsCreateSupplierInvoice** | [JoblogicAPIModelsCreateSupplierInvoice](JoblogicAPIModelsCreateSupplierInvoice.md) | Supplier Invoice to create | [Optional] |

### Return type

[**JobLogicMicroserviceCoreContractSupplierInvoiceApiGetResponse**](JobLogicMicroserviceCoreContractSupplierInvoiceApiGetResponse.md)

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


## apiV1PurchaseorderApprovePost

> JoblogicAPIModelsApprovePurchaseOrderRequest apiV1PurchaseorderApprovePost(authorization, joblogicAPIModelsApprovePurchaseOrderRequest)

Approve Purchase Order

### Example

```ts
import {
  Configuration,
  PurchaseOrderApi,
} from '';
import type { ApiV1PurchaseorderApprovePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsApprovePurchaseOrderRequest | Purchase Order to Approve (optional)
    joblogicAPIModelsApprovePurchaseOrderRequest: ...,
  } satisfies ApiV1PurchaseorderApprovePostRequest;

  try {
    const data = await api.apiV1PurchaseorderApprovePost(body);
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
| **joblogicAPIModelsApprovePurchaseOrderRequest** | [JoblogicAPIModelsApprovePurchaseOrderRequest](JoblogicAPIModelsApprovePurchaseOrderRequest.md) | Purchase Order to Approve | [Optional] |

### Return type

[**JoblogicAPIModelsApprovePurchaseOrderRequest**](JoblogicAPIModelsApprovePurchaseOrderRequest.md)

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


## apiV1PurchaseorderDelete

> apiV1PurchaseorderDelete(authorization, id, tenantId)

Delete Purchase Order

### Example

```ts
import {
  Configuration,
  PurchaseOrderApi,
} from '';
import type { ApiV1PurchaseorderDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Id of the Purchase Order to delete (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1PurchaseorderDeleteRequest;

  try {
    const data = await api.apiV1PurchaseorderDelete(body);
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
| **id** | `string` | Id of the Purchase Order to delete | [Optional] [Defaults to `undefined`] |
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


## apiV1PurchaseorderDeletepoitemDelete

> apiV1PurchaseorderDeletepoitemDelete(authorization, id, tenantId)

Delete Purchase Order Line item

### Example

```ts
import {
  Configuration,
  PurchaseOrderApi,
} from '';
import type { ApiV1PurchaseorderDeletepoitemDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Id of the Purchase Order Line item to delete (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1PurchaseorderDeletepoitemDeleteRequest;

  try {
    const data = await api.apiV1PurchaseorderDeletepoitemDelete(body);
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
| **id** | `string` | Id of the Purchase Order Line item to delete | [Optional] [Defaults to `undefined`] |
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


## apiV1PurchaseorderDeletesupplierinvoiceDelete

> apiV1PurchaseorderDeletesupplierinvoiceDelete(authorization, id, tenantId)

Delete Supplier Invoice

### Example

```ts
import {
  Configuration,
  PurchaseOrderApi,
} from '';
import type { ApiV1PurchaseorderDeletesupplierinvoiceDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Id of theSupplier Invoice to delete (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1PurchaseorderDeletesupplierinvoiceDeleteRequest;

  try {
    const data = await api.apiV1PurchaseorderDeletesupplierinvoiceDelete(body);
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
| **id** | `string` | Id of theSupplier Invoice to delete | [Optional] [Defaults to `undefined`] |
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


## apiV1PurchaseorderGeneratedocumentPost

> JoblogicAPIModelsGeneratePurchaseOrdersheetResponse apiV1PurchaseorderGeneratedocumentPost(authorization, joblogicAPIModelsGeneratePurchaseOrdersheetRequest)

Generate Downloadable Url for PurchaseOrder

### Example

```ts
import {
  Configuration,
  PurchaseOrderApi,
} from '';
import type { ApiV1PurchaseorderGeneratedocumentPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsGeneratePurchaseOrdersheetRequest | Job to download PurchaseOrder from (optional)
    joblogicAPIModelsGeneratePurchaseOrdersheetRequest: ...,
  } satisfies ApiV1PurchaseorderGeneratedocumentPostRequest;

  try {
    const data = await api.apiV1PurchaseorderGeneratedocumentPost(body);
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
| **joblogicAPIModelsGeneratePurchaseOrdersheetRequest** | [JoblogicAPIModelsGeneratePurchaseOrdersheetRequest](JoblogicAPIModelsGeneratePurchaseOrdersheetRequest.md) | Job to download PurchaseOrder from | [Optional] |

### Return type

[**JoblogicAPIModelsGeneratePurchaseOrdersheetResponse**](JoblogicAPIModelsGeneratePurchaseOrdersheetResponse.md)

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


## apiV1PurchaseorderGet

> JoblogicAPIModelsPurchaseOrderDetailResponse apiV1PurchaseorderGet(authorization, id, tenantId)

Get Purchase Order Details

### Example

```ts
import {
  Configuration,
  PurchaseOrderApi,
} from '';
import type { ApiV1PurchaseorderGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Id of the Purchase Order to retrieve (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1PurchaseorderGetRequest;

  try {
    const data = await api.apiV1PurchaseorderGet(body);
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
| **id** | `string` | Id of the Purchase Order to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsPurchaseOrderDetailResponse**](JoblogicAPIModelsPurchaseOrderDetailResponse.md)

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


## apiV1PurchaseorderGetByJobIdPost

> JoblogicAPIModelsBaseListResponse1JobLogicMicroserviceCoreContractGetPurchaseOrderByJobIdResponse apiV1PurchaseorderGetByJobIdPost(authorization, joblogicAPIModelsGetPurchaseOrderByJobIdRequest)

Get Purchase Order by Job Id

### Example

```ts
import {
  Configuration,
  PurchaseOrderApi,
} from '';
import type { ApiV1PurchaseorderGetByJobIdPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsGetPurchaseOrderByJobIdRequest | UniqueId of the Job and TenantId to retrieve Purchase Order (optional)
    joblogicAPIModelsGetPurchaseOrderByJobIdRequest: ...,
  } satisfies ApiV1PurchaseorderGetByJobIdPostRequest;

  try {
    const data = await api.apiV1PurchaseorderGetByJobIdPost(body);
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
| **joblogicAPIModelsGetPurchaseOrderByJobIdRequest** | [JoblogicAPIModelsGetPurchaseOrderByJobIdRequest](JoblogicAPIModelsGetPurchaseOrderByJobIdRequest.md) | UniqueId of the Job and TenantId to retrieve Purchase Order | [Optional] |

### Return type

[**JoblogicAPIModelsBaseListResponse1JobLogicMicroserviceCoreContractGetPurchaseOrderByJobIdResponse**](JoblogicAPIModelsBaseListResponse1JobLogicMicroserviceCoreContractGetPurchaseOrderByJobIdResponse.md)

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


## apiV1PurchaseorderGetallPost

> JoblogicAPIModelsSearchPurchaseOrderResponse apiV1PurchaseorderGetallPost(authorization, joblogicAPIModelsSearchPurchaseOrderRequest)

Search Purchase Orders by conditions

### Example

```ts
import {
  Configuration,
  PurchaseOrderApi,
} from '';
import type { ApiV1PurchaseorderGetallPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchPurchaseOrderRequest | search conditons (optional)
    joblogicAPIModelsSearchPurchaseOrderRequest: ...,
  } satisfies ApiV1PurchaseorderGetallPostRequest;

  try {
    const data = await api.apiV1PurchaseorderGetallPost(body);
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
| **joblogicAPIModelsSearchPurchaseOrderRequest** | [JoblogicAPIModelsSearchPurchaseOrderRequest](JoblogicAPIModelsSearchPurchaseOrderRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchPurchaseOrderResponse**](JoblogicAPIModelsSearchPurchaseOrderResponse.md)

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


## apiV1PurchaseorderGetbyidGet

> JoblogicAPIModelsPurchaseOrderDetailResponse apiV1PurchaseorderGetbyidGet(authorization, id, tenantId)

Get Purchase Order Details

### Example

```ts
import {
  Configuration,
  PurchaseOrderApi,
} from '';
import type { ApiV1PurchaseorderGetbyidGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Id of the Purchase Order to retrieve (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1PurchaseorderGetbyidGetRequest;

  try {
    const data = await api.apiV1PurchaseorderGetbyidGet(body);
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
| **id** | `string` | Id of the Purchase Order to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsPurchaseOrderDetailResponse**](JoblogicAPIModelsPurchaseOrderDetailResponse.md)

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


## apiV1PurchaseorderGetpoitemGet

> JobLogicMicroserviceCoreContractPurchaseOrderLineGetResponse apiV1PurchaseorderGetpoitemGet(authorization, id, tenantId)

Get Purchase Order Line item

### Example

```ts
import {
  Configuration,
  PurchaseOrderApi,
} from '';
import type { ApiV1PurchaseorderGetpoitemGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Id of the Purchase Order Line item to retrieve (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1PurchaseorderGetpoitemGetRequest;

  try {
    const data = await api.apiV1PurchaseorderGetpoitemGet(body);
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
| **id** | `string` | Id of the Purchase Order Line item to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JobLogicMicroserviceCoreContractPurchaseOrderLineGetResponse**](JobLogicMicroserviceCoreContractPurchaseOrderLineGetResponse.md)

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


## apiV1PurchaseorderGetsupplierinvoicebypurchaseorderidPost

> JobLogicMicroserviceCoreContractGetSupplierInvoicesByPurchaseOrderIdMsg ResultModel apiV1PurchaseorderGetsupplierinvoicebypurchaseorderidPost(authorization, purchaseOrderId, tenantId)

Get Supplier Invoices by Purchase Order Id

### Example

```ts
import {
  Configuration,
  PurchaseOrderApi,
} from '';
import type { ApiV1PurchaseorderGetsupplierinvoicebypurchaseorderidPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Purchase Order Guid (optional)
    purchaseOrderId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1PurchaseorderGetsupplierinvoicebypurchaseorderidPostRequest;

  try {
    const data = await api.apiV1PurchaseorderGetsupplierinvoicebypurchaseorderidPost(body);
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
| **purchaseOrderId** | `string` | Purchase Order Guid | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JobLogicMicroserviceCoreContractGetSupplierInvoicesByPurchaseOrderIdMsg ResultModel**](JobLogicMicroserviceCoreContractGetSupplierInvoicesByPurchaseOrderIdMsg ResultModel.md)

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


## apiV1PurchaseorderMarkassentPost

> boolean apiV1PurchaseorderMarkassentPost(authorization, joblogicAPIModelsMarkPurchaseOrderAsSentRequest)



### Example

```ts
import {
  Configuration,
  PurchaseOrderApi,
} from '';
import type { ApiV1PurchaseorderMarkassentPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsMarkPurchaseOrderAsSentRequest (optional)
    joblogicAPIModelsMarkPurchaseOrderAsSentRequest: ...,
  } satisfies ApiV1PurchaseorderMarkassentPostRequest;

  try {
    const data = await api.apiV1PurchaseorderMarkassentPost(body);
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
| **joblogicAPIModelsMarkPurchaseOrderAsSentRequest** | [JoblogicAPIModelsMarkPurchaseOrderAsSentRequest](JoblogicAPIModelsMarkPurchaseOrderAsSentRequest.md) |  | [Optional] |

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
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1PurchaseorderPolineCompletedeliveryPost

> apiV1PurchaseorderPolineCompletedeliveryPost(authorization, joblogicAPIModelsDeliverPOItemRequest)

Deliver Purchase Order Line item

### Example

```ts
import {
  Configuration,
  PurchaseOrderApi,
} from '';
import type { ApiV1PurchaseorderPolineCompletedeliveryPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsDeliverPOItemRequest | Purchase Order Line item to deliver (optional)
    joblogicAPIModelsDeliverPOItemRequest: ...,
  } satisfies ApiV1PurchaseorderPolineCompletedeliveryPostRequest;

  try {
    const data = await api.apiV1PurchaseorderPolineCompletedeliveryPost(body);
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
| **joblogicAPIModelsDeliverPOItemRequest** | [JoblogicAPIModelsDeliverPOItemRequest](JoblogicAPIModelsDeliverPOItemRequest.md) | Purchase Order Line item to deliver | [Optional] |

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


## apiV1PurchaseorderPost

> JobLogicMicroserviceCoreContractPurchaseOrderApiGetResponse apiV1PurchaseorderPost(authorization, joblogicAPIModelsCreatePurchaseOrderRequest)

Create Purchase Order

### Example

```ts
import {
  Configuration,
  PurchaseOrderApi,
} from '';
import type { ApiV1PurchaseorderPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreatePurchaseOrderRequest | Purchase Order to create (optional)
    joblogicAPIModelsCreatePurchaseOrderRequest: ...,
  } satisfies ApiV1PurchaseorderPostRequest;

  try {
    const data = await api.apiV1PurchaseorderPost(body);
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
| **joblogicAPIModelsCreatePurchaseOrderRequest** | [JoblogicAPIModelsCreatePurchaseOrderRequest](JoblogicAPIModelsCreatePurchaseOrderRequest.md) | Purchase Order to create | [Optional] |

### Return type

[**JobLogicMicroserviceCoreContractPurchaseOrderApiGetResponse**](JobLogicMicroserviceCoreContractPurchaseOrderApiGetResponse.md)

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


## apiV1PurchaseorderPut

> JobLogicMicroserviceCoreContractPurchaseOrderApiGetResponse apiV1PurchaseorderPut(authorization, joblogicAPIModelsUpdatePurchaseOrderRequest)

Update Purchase Order

### Example

```ts
import {
  Configuration,
  PurchaseOrderApi,
} from '';
import type { ApiV1PurchaseorderPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdatePurchaseOrderRequest | Purchase Order to update (optional)
    joblogicAPIModelsUpdatePurchaseOrderRequest: ...,
  } satisfies ApiV1PurchaseorderPutRequest;

  try {
    const data = await api.apiV1PurchaseorderPut(body);
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
| **joblogicAPIModelsUpdatePurchaseOrderRequest** | [JoblogicAPIModelsUpdatePurchaseOrderRequest](JoblogicAPIModelsUpdatePurchaseOrderRequest.md) | Purchase Order to update | [Optional] |

### Return type

[**JobLogicMicroserviceCoreContractPurchaseOrderApiGetResponse**](JobLogicMicroserviceCoreContractPurchaseOrderApiGetResponse.md)

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


## apiV1PurchaseorderResolvePost

> boolean apiV1PurchaseorderResolvePost(authorization, joblogicAPIModelsResolvePurchaseOrderRequest)

Resolve Purchase Order

### Example

```ts
import {
  Configuration,
  PurchaseOrderApi,
} from '';
import type { ApiV1PurchaseorderResolvePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsResolvePurchaseOrderRequest | Purchase Order to resolve (optional)
    joblogicAPIModelsResolvePurchaseOrderRequest: ...,
  } satisfies ApiV1PurchaseorderResolvePostRequest;

  try {
    const data = await api.apiV1PurchaseorderResolvePost(body);
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
| **joblogicAPIModelsResolvePurchaseOrderRequest** | [JoblogicAPIModelsResolvePurchaseOrderRequest](JoblogicAPIModelsResolvePurchaseOrderRequest.md) | Purchase Order to resolve | [Optional] |

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


## apiV1PurchaseorderUpdatepoitemPut

> JobLogicMicroserviceCoreContractPurchaseOrderLineGetResponse apiV1PurchaseorderUpdatepoitemPut(authorization, joblogicAPIModelsUpdatePurchaseOrderLineRequest)

Update Purchase Order Line item

### Example

```ts
import {
  Configuration,
  PurchaseOrderApi,
} from '';
import type { ApiV1PurchaseorderUpdatepoitemPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdatePurchaseOrderLineRequest | Purchase Order Line item to update (optional)
    joblogicAPIModelsUpdatePurchaseOrderLineRequest: ...,
  } satisfies ApiV1PurchaseorderUpdatepoitemPutRequest;

  try {
    const data = await api.apiV1PurchaseorderUpdatepoitemPut(body);
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
| **joblogicAPIModelsUpdatePurchaseOrderLineRequest** | [JoblogicAPIModelsUpdatePurchaseOrderLineRequest](JoblogicAPIModelsUpdatePurchaseOrderLineRequest.md) | Purchase Order Line item to update | [Optional] |

### Return type

[**JobLogicMicroserviceCoreContractPurchaseOrderLineGetResponse**](JobLogicMicroserviceCoreContractPurchaseOrderLineGetResponse.md)

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


## apiV1PurchaseorderUpdatesupplierinvoicePut

> JobLogicMicroserviceCoreContractSupplierInvoiceApiGetResponse apiV1PurchaseorderUpdatesupplierinvoicePut(authorization, joblogicAPIModelsUpdateSupplierInvoice)

Update Supplier Invoice

### Example

```ts
import {
  Configuration,
  PurchaseOrderApi,
} from '';
import type { ApiV1PurchaseorderUpdatesupplierinvoicePutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateSupplierInvoice | Supplier Invoice to update (optional)
    joblogicAPIModelsUpdateSupplierInvoice: ...,
  } satisfies ApiV1PurchaseorderUpdatesupplierinvoicePutRequest;

  try {
    const data = await api.apiV1PurchaseorderUpdatesupplierinvoicePut(body);
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
| **joblogicAPIModelsUpdateSupplierInvoice** | [JoblogicAPIModelsUpdateSupplierInvoice](JoblogicAPIModelsUpdateSupplierInvoice.md) | Supplier Invoice to update | [Optional] |

### Return type

[**JobLogicMicroserviceCoreContractSupplierInvoiceApiGetResponse**](JobLogicMicroserviceCoreContractSupplierInvoiceApiGetResponse.md)

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

