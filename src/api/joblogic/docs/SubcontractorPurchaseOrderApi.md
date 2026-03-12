# SubcontractorPurchaseOrderApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1SubcontractorPurchaseOrderAddInvoicePost**](SubcontractorPurchaseOrderApi.md#apiv1subcontractorpurchaseorderaddinvoicepost) | **POST** /api/v1/SubcontractorPurchaseOrder/AddInvoice | Add Invoice to Subcontractor Purchase Order |
| [**apiV1SubcontractorPurchaseOrderAddPOItemPost**](SubcontractorPurchaseOrderApi.md#apiv1subcontractorpurchaseorderaddpoitempost) | **POST** /api/v1/SubcontractorPurchaseOrder/AddPOItem | Add Subcontractor Purchase Order Line Item |
| [**apiV1SubcontractorPurchaseOrderAddinvoicelineitemPost**](SubcontractorPurchaseOrderApi.md#apiv1subcontractorpurchaseorderaddinvoicelineitempost) | **POST** /api/v1/SubcontractorPurchaseOrder/addinvoicelineitem | Add line to Subcontractor Purchase Order Invoice |
| [**apiV1SubcontractorPurchaseOrderDelete**](SubcontractorPurchaseOrderApi.md#apiv1subcontractorpurchaseorderdelete) | **DELETE** /api/v1/SubcontractorPurchaseOrder | Delete Purchase Order |
| [**apiV1SubcontractorPurchaseOrderDeleteInvoiceDelete**](SubcontractorPurchaseOrderApi.md#apiv1subcontractorpurchaseorderdeleteinvoicedelete) | **DELETE** /api/v1/SubcontractorPurchaseOrder/DeleteInvoice | Delete Invoice |
| [**apiV1SubcontractorPurchaseOrderDeleteInvoiceLineItemDelete**](SubcontractorPurchaseOrderApi.md#apiv1subcontractorpurchaseorderdeleteinvoicelineitemdelete) | **DELETE** /api/v1/SubcontractorPurchaseOrder/DeleteInvoiceLineItem | Delete Subcontractor Invoice Line Item |
| [**apiV1SubcontractorPurchaseOrderDeletePOItemDelete**](SubcontractorPurchaseOrderApi.md#apiv1subcontractorpurchaseorderdeletepoitemdelete) | **DELETE** /api/v1/SubcontractorPurchaseOrder/DeletePOItem | Delete Subcontractor Purchase Order Line item |
| [**apiV1SubcontractorPurchaseOrderGet**](SubcontractorPurchaseOrderApi.md#apiv1subcontractorpurchaseorderget) | **GET** /api/v1/SubcontractorPurchaseOrder | Get Purchase Order Details |
| [**apiV1SubcontractorPurchaseOrderGetAllPost**](SubcontractorPurchaseOrderApi.md#apiv1subcontractorpurchaseordergetallpost) | **POST** /api/v1/SubcontractorPurchaseOrder/GetAll | Search Subcontractor Purchase Orders by conditions |
| [**apiV1SubcontractorPurchaseOrderGetInvoiceByPurchaseOrderIdGet**](SubcontractorPurchaseOrderApi.md#apiv1subcontractorpurchaseordergetinvoicebypurchaseorderidget) | **GET** /api/v1/SubcontractorPurchaseOrder/GetInvoiceByPurchaseOrderId | Get Invoices by Subcontractor Purchase Order Id |
| [**apiV1SubcontractorPurchaseOrderGetPOItemGet**](SubcontractorPurchaseOrderApi.md#apiv1subcontractorpurchaseordergetpoitemget) | **GET** /api/v1/SubcontractorPurchaseOrder/GetPOItem | Get Subcontractor Purchase Order Line item |
| [**apiV1SubcontractorPurchaseOrderPolineCompletedeliveryPost**](SubcontractorPurchaseOrderApi.md#apiv1subcontractorpurchaseorderpolinecompletedeliverypost) | **POST** /api/v1/SubcontractorPurchaseOrder/poline/completedelivery | Deliver Purchase Order Line item |
| [**apiV1SubcontractorPurchaseOrderPost**](SubcontractorPurchaseOrderApi.md#apiv1subcontractorpurchaseorderpost) | **POST** /api/v1/SubcontractorPurchaseOrder | Create Subcontractor Purchase Order |
| [**apiV1SubcontractorPurchaseOrderPut**](SubcontractorPurchaseOrderApi.md#apiv1subcontractorpurchaseorderput) | **PUT** /api/v1/SubcontractorPurchaseOrder | Update Subcontractor Purchase Order |
| [**apiV1SubcontractorPurchaseOrderSearchPOTemplatePost**](SubcontractorPurchaseOrderApi.md#apiv1subcontractorpurchaseordersearchpotemplatepost) | **POST** /api/v1/SubcontractorPurchaseOrder/SearchPOTemplate | Lookup Subcontractor Purchase Order Template |
| [**apiV1SubcontractorPurchaseOrderUpdateInvoiceLineItemPut**](SubcontractorPurchaseOrderApi.md#apiv1subcontractorpurchaseorderupdateinvoicelineitemput) | **PUT** /api/v1/SubcontractorPurchaseOrder/UpdateInvoiceLineItem | Update Subcontractor Invoice Line |
| [**apiV1SubcontractorPurchaseOrderUpdateInvoicePut**](SubcontractorPurchaseOrderApi.md#apiv1subcontractorpurchaseorderupdateinvoiceput) | **PUT** /api/v1/SubcontractorPurchaseOrder/UpdateInvoice | Update Subcontractor Invoice |
| [**apiV1SubcontractorPurchaseOrderUpdatePOItemPut**](SubcontractorPurchaseOrderApi.md#apiv1subcontractorpurchaseorderupdatepoitemput) | **PUT** /api/v1/SubcontractorPurchaseOrder/UpdatePOItem | Update Subcontractor Purchase Order Line item |



## apiV1SubcontractorPurchaseOrderAddInvoicePost

> JoblogicAPIModelsCreateSubcontractorPOInvoiceResponse apiV1SubcontractorPurchaseOrderAddInvoicePost(authorization, joblogicAPIModelsCreateSubcontractorPOInvoiceRequest)

Add Invoice to Subcontractor Purchase Order

### Example

```ts
import {
  Configuration,
  SubcontractorPurchaseOrderApi,
} from '';
import type { ApiV1SubcontractorPurchaseOrderAddInvoicePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubcontractorPurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateSubcontractorPOInvoiceRequest | Invoice to create (optional)
    joblogicAPIModelsCreateSubcontractorPOInvoiceRequest: ...,
  } satisfies ApiV1SubcontractorPurchaseOrderAddInvoicePostRequest;

  try {
    const data = await api.apiV1SubcontractorPurchaseOrderAddInvoicePost(body);
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
| **joblogicAPIModelsCreateSubcontractorPOInvoiceRequest** | [JoblogicAPIModelsCreateSubcontractorPOInvoiceRequest](JoblogicAPIModelsCreateSubcontractorPOInvoiceRequest.md) | Invoice to create | [Optional] |

### Return type

[**JoblogicAPIModelsCreateSubcontractorPOInvoiceResponse**](JoblogicAPIModelsCreateSubcontractorPOInvoiceResponse.md)

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


## apiV1SubcontractorPurchaseOrderAddPOItemPost

> apiV1SubcontractorPurchaseOrderAddPOItemPost(authorization, joblogicAPIModelsCreateSubPurchaseOrderLineRequest)

Add Subcontractor Purchase Order Line Item

### Example

```ts
import {
  Configuration,
  SubcontractorPurchaseOrderApi,
} from '';
import type { ApiV1SubcontractorPurchaseOrderAddPOItemPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubcontractorPurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateSubPurchaseOrderLineRequest | Subcontractor Purchase Order line item  to be created (optional)
    joblogicAPIModelsCreateSubPurchaseOrderLineRequest: ...,
  } satisfies ApiV1SubcontractorPurchaseOrderAddPOItemPostRequest;

  try {
    const data = await api.apiV1SubcontractorPurchaseOrderAddPOItemPost(body);
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
| **joblogicAPIModelsCreateSubPurchaseOrderLineRequest** | [JoblogicAPIModelsCreateSubPurchaseOrderLineRequest](JoblogicAPIModelsCreateSubPurchaseOrderLineRequest.md) | Subcontractor Purchase Order line item  to be created | [Optional] |

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


## apiV1SubcontractorPurchaseOrderAddinvoicelineitemPost

> JoblogicAPIModelsAddSubContractorInvoiceLineResponse apiV1SubcontractorPurchaseOrderAddinvoicelineitemPost(authorization, joblogicAPIModelsAddSubContractorInvoiceLineRequest)

Add line to Subcontractor Purchase Order Invoice

### Example

```ts
import {
  Configuration,
  SubcontractorPurchaseOrderApi,
} from '';
import type { ApiV1SubcontractorPurchaseOrderAddinvoicelineitemPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubcontractorPurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsAddSubContractorInvoiceLineRequest | Invoice to create (optional)
    joblogicAPIModelsAddSubContractorInvoiceLineRequest: ...,
  } satisfies ApiV1SubcontractorPurchaseOrderAddinvoicelineitemPostRequest;

  try {
    const data = await api.apiV1SubcontractorPurchaseOrderAddinvoicelineitemPost(body);
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
| **joblogicAPIModelsAddSubContractorInvoiceLineRequest** | [JoblogicAPIModelsAddSubContractorInvoiceLineRequest](JoblogicAPIModelsAddSubContractorInvoiceLineRequest.md) | Invoice to create | [Optional] |

### Return type

[**JoblogicAPIModelsAddSubContractorInvoiceLineResponse**](JoblogicAPIModelsAddSubContractorInvoiceLineResponse.md)

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


## apiV1SubcontractorPurchaseOrderDelete

> apiV1SubcontractorPurchaseOrderDelete(authorization, uniqueId, tenantId)

Delete Purchase Order

### Example

```ts
import {
  Configuration,
  SubcontractorPurchaseOrderApi,
} from '';
import type { ApiV1SubcontractorPurchaseOrderDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubcontractorPurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1SubcontractorPurchaseOrderDeleteRequest;

  try {
    const data = await api.apiV1SubcontractorPurchaseOrderDelete(body);
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
| **uniqueId** | `string` |  | [Optional] [Defaults to `undefined`] |
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


## apiV1SubcontractorPurchaseOrderDeleteInvoiceDelete

> boolean apiV1SubcontractorPurchaseOrderDeleteInvoiceDelete(authorization, invoiceUniqueId, tenantId)

Delete Invoice

### Example

```ts
import {
  Configuration,
  SubcontractorPurchaseOrderApi,
} from '';
import type { ApiV1SubcontractorPurchaseOrderDeleteInvoiceDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubcontractorPurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string (optional)
    invoiceUniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1SubcontractorPurchaseOrderDeleteInvoiceDeleteRequest;

  try {
    const data = await api.apiV1SubcontractorPurchaseOrderDeleteInvoiceDelete(body);
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
| **invoiceUniqueId** | `string` |  | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

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


## apiV1SubcontractorPurchaseOrderDeleteInvoiceLineItemDelete

> boolean apiV1SubcontractorPurchaseOrderDeleteInvoiceLineItemDelete(authorization, invoiceLineUniqueId, tenantId)

Delete Subcontractor Invoice Line Item

### Example

```ts
import {
  Configuration,
  SubcontractorPurchaseOrderApi,
} from '';
import type { ApiV1SubcontractorPurchaseOrderDeleteInvoiceLineItemDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubcontractorPurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string (optional)
    invoiceLineUniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1SubcontractorPurchaseOrderDeleteInvoiceLineItemDeleteRequest;

  try {
    const data = await api.apiV1SubcontractorPurchaseOrderDeleteInvoiceLineItemDelete(body);
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
| **invoiceLineUniqueId** | `string` |  | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

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


## apiV1SubcontractorPurchaseOrderDeletePOItemDelete

> apiV1SubcontractorPurchaseOrderDeletePOItemDelete(authorization, uniqueId, tenantId)

Delete Subcontractor Purchase Order Line item

### Example

```ts
import {
  Configuration,
  SubcontractorPurchaseOrderApi,
} from '';
import type { ApiV1SubcontractorPurchaseOrderDeletePOItemDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubcontractorPurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1SubcontractorPurchaseOrderDeletePOItemDeleteRequest;

  try {
    const data = await api.apiV1SubcontractorPurchaseOrderDeletePOItemDelete(body);
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
| **uniqueId** | `string` |  | [Optional] [Defaults to `undefined`] |
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


## apiV1SubcontractorPurchaseOrderGet

> JoblogicAPIModelsSubPurchaseOrderDetailResponse apiV1SubcontractorPurchaseOrderGet(authorization, uniqueid, tenantId)

Get Purchase Order Details

### Example

```ts
import {
  Configuration,
  SubcontractorPurchaseOrderApi,
} from '';
import type { ApiV1SubcontractorPurchaseOrderGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubcontractorPurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Id of the Subcontractor Purchase Order to retrieve (optional)
    uniqueid: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1SubcontractorPurchaseOrderGetRequest;

  try {
    const data = await api.apiV1SubcontractorPurchaseOrderGet(body);
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
| **uniqueid** | `string` | Id of the Subcontractor Purchase Order to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsSubPurchaseOrderDetailResponse**](JoblogicAPIModelsSubPurchaseOrderDetailResponse.md)

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


## apiV1SubcontractorPurchaseOrderGetAllPost

> JoblogicAPIModelsSearchSubPurchaseOrderResponse apiV1SubcontractorPurchaseOrderGetAllPost(authorization, joblogicAPIModelsSubcontractorPurchaseOrderRequest)

Search Subcontractor Purchase Orders by conditions

### Example

```ts
import {
  Configuration,
  SubcontractorPurchaseOrderApi,
} from '';
import type { ApiV1SubcontractorPurchaseOrderGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubcontractorPurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSubcontractorPurchaseOrderRequest | search conditons (optional)
    joblogicAPIModelsSubcontractorPurchaseOrderRequest: ...,
  } satisfies ApiV1SubcontractorPurchaseOrderGetAllPostRequest;

  try {
    const data = await api.apiV1SubcontractorPurchaseOrderGetAllPost(body);
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
| **joblogicAPIModelsSubcontractorPurchaseOrderRequest** | [JoblogicAPIModelsSubcontractorPurchaseOrderRequest](JoblogicAPIModelsSubcontractorPurchaseOrderRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchSubPurchaseOrderResponse**](JoblogicAPIModelsSearchSubPurchaseOrderResponse.md)

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


## apiV1SubcontractorPurchaseOrderGetInvoiceByPurchaseOrderIdGet

> JoblogicAPIModelsGetInvoiceByPurchaseOrderIdResponse apiV1SubcontractorPurchaseOrderGetInvoiceByPurchaseOrderIdGet(authorization, purchaseOrderUniqueId, tenantId)

Get Invoices by Subcontractor Purchase Order Id

### Example

```ts
import {
  Configuration,
  SubcontractorPurchaseOrderApi,
} from '';
import type { ApiV1SubcontractorPurchaseOrderGetInvoiceByPurchaseOrderIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubcontractorPurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Subcontractor Purchase Order Unique Id (optional)
    purchaseOrderUniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1SubcontractorPurchaseOrderGetInvoiceByPurchaseOrderIdGetRequest;

  try {
    const data = await api.apiV1SubcontractorPurchaseOrderGetInvoiceByPurchaseOrderIdGet(body);
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
| **purchaseOrderUniqueId** | `string` | Subcontractor Purchase Order Unique Id | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsGetInvoiceByPurchaseOrderIdResponse**](JoblogicAPIModelsGetInvoiceByPurchaseOrderIdResponse.md)

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


## apiV1SubcontractorPurchaseOrderGetPOItemGet

> JobLogicMicroserviceCoreContractPurchaseOrderLineGetResponse apiV1SubcontractorPurchaseOrderGetPOItemGet(authorization, uniqueId, tenantId)

Get Subcontractor Purchase Order Line item

### Example

```ts
import {
  Configuration,
  SubcontractorPurchaseOrderApi,
} from '';
import type { ApiV1SubcontractorPurchaseOrderGetPOItemGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubcontractorPurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1SubcontractorPurchaseOrderGetPOItemGetRequest;

  try {
    const data = await api.apiV1SubcontractorPurchaseOrderGetPOItemGet(body);
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
| **uniqueId** | `string` |  | [Optional] [Defaults to `undefined`] |
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


## apiV1SubcontractorPurchaseOrderPolineCompletedeliveryPost

> apiV1SubcontractorPurchaseOrderPolineCompletedeliveryPost(authorization, joblogicAPIModelsDeliverSubPOItemRequest)

Deliver Purchase Order Line item

### Example

```ts
import {
  Configuration,
  SubcontractorPurchaseOrderApi,
} from '';
import type { ApiV1SubcontractorPurchaseOrderPolineCompletedeliveryPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubcontractorPurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsDeliverSubPOItemRequest | Purchase Order Line item to deliver (optional)
    joblogicAPIModelsDeliverSubPOItemRequest: ...,
  } satisfies ApiV1SubcontractorPurchaseOrderPolineCompletedeliveryPostRequest;

  try {
    const data = await api.apiV1SubcontractorPurchaseOrderPolineCompletedeliveryPost(body);
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
| **joblogicAPIModelsDeliverSubPOItemRequest** | [JoblogicAPIModelsDeliverSubPOItemRequest](JoblogicAPIModelsDeliverSubPOItemRequest.md) | Purchase Order Line item to deliver | [Optional] |

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


## apiV1SubcontractorPurchaseOrderPost

> JobLogicMicroserviceCoreContractPurchaseOrderApiGetResponse apiV1SubcontractorPurchaseOrderPost(authorization, joblogicAPIModelsCreateSubPurchaseOrderRequest)

Create Subcontractor Purchase Order

### Example

```ts
import {
  Configuration,
  SubcontractorPurchaseOrderApi,
} from '';
import type { ApiV1SubcontractorPurchaseOrderPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubcontractorPurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateSubPurchaseOrderRequest | Purchase Order to create (optional)
    joblogicAPIModelsCreateSubPurchaseOrderRequest: ...,
  } satisfies ApiV1SubcontractorPurchaseOrderPostRequest;

  try {
    const data = await api.apiV1SubcontractorPurchaseOrderPost(body);
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
| **joblogicAPIModelsCreateSubPurchaseOrderRequest** | [JoblogicAPIModelsCreateSubPurchaseOrderRequest](JoblogicAPIModelsCreateSubPurchaseOrderRequest.md) | Purchase Order to create | [Optional] |

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


## apiV1SubcontractorPurchaseOrderPut

> boolean apiV1SubcontractorPurchaseOrderPut(authorization, joblogicAPIModelsUpdateSubPurchaseOrderRequest)

Update Subcontractor Purchase Order

### Example

```ts
import {
  Configuration,
  SubcontractorPurchaseOrderApi,
} from '';
import type { ApiV1SubcontractorPurchaseOrderPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubcontractorPurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateSubPurchaseOrderRequest | Purchase Order to update (optional)
    joblogicAPIModelsUpdateSubPurchaseOrderRequest: ...,
  } satisfies ApiV1SubcontractorPurchaseOrderPutRequest;

  try {
    const data = await api.apiV1SubcontractorPurchaseOrderPut(body);
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
| **joblogicAPIModelsUpdateSubPurchaseOrderRequest** | [JoblogicAPIModelsUpdateSubPurchaseOrderRequest](JoblogicAPIModelsUpdateSubPurchaseOrderRequest.md) | Purchase Order to update | [Optional] |

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


## apiV1SubcontractorPurchaseOrderSearchPOTemplatePost

> JoblogicAPIModelsSearchSubcontractorPODocumentTemplateResponse apiV1SubcontractorPurchaseOrderSearchPOTemplatePost(authorization, joblogicAPIModelsSearchSubcontractorPurchaseOrderRequest)

Lookup Subcontractor Purchase Order Template

### Example

```ts
import {
  Configuration,
  SubcontractorPurchaseOrderApi,
} from '';
import type { ApiV1SubcontractorPurchaseOrderSearchPOTemplatePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubcontractorPurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchSubcontractorPurchaseOrderRequest | search conditons (optional)
    joblogicAPIModelsSearchSubcontractorPurchaseOrderRequest: ...,
  } satisfies ApiV1SubcontractorPurchaseOrderSearchPOTemplatePostRequest;

  try {
    const data = await api.apiV1SubcontractorPurchaseOrderSearchPOTemplatePost(body);
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
| **joblogicAPIModelsSearchSubcontractorPurchaseOrderRequest** | [JoblogicAPIModelsSearchSubcontractorPurchaseOrderRequest](JoblogicAPIModelsSearchSubcontractorPurchaseOrderRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchSubcontractorPODocumentTemplateResponse**](JoblogicAPIModelsSearchSubcontractorPODocumentTemplateResponse.md)

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


## apiV1SubcontractorPurchaseOrderUpdateInvoiceLineItemPut

> boolean apiV1SubcontractorPurchaseOrderUpdateInvoiceLineItemPut(authorization, joblogicAPIModelsUpdateSubContractorInvoiceLineRequest)

Update Subcontractor Invoice Line

### Example

```ts
import {
  Configuration,
  SubcontractorPurchaseOrderApi,
} from '';
import type { ApiV1SubcontractorPurchaseOrderUpdateInvoiceLineItemPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubcontractorPurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateSubContractorInvoiceLineRequest | Subcontractor Invoice Line to update (optional)
    joblogicAPIModelsUpdateSubContractorInvoiceLineRequest: ...,
  } satisfies ApiV1SubcontractorPurchaseOrderUpdateInvoiceLineItemPutRequest;

  try {
    const data = await api.apiV1SubcontractorPurchaseOrderUpdateInvoiceLineItemPut(body);
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
| **joblogicAPIModelsUpdateSubContractorInvoiceLineRequest** | [JoblogicAPIModelsUpdateSubContractorInvoiceLineRequest](JoblogicAPIModelsUpdateSubContractorInvoiceLineRequest.md) | Subcontractor Invoice Line to update | [Optional] |

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


## apiV1SubcontractorPurchaseOrderUpdateInvoicePut

> boolean apiV1SubcontractorPurchaseOrderUpdateInvoicePut(authorization, joblogicAPIModelsUpdateSubcontractorPOInvoiceRequest)

Update Subcontractor Invoice

### Example

```ts
import {
  Configuration,
  SubcontractorPurchaseOrderApi,
} from '';
import type { ApiV1SubcontractorPurchaseOrderUpdateInvoicePutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubcontractorPurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateSubcontractorPOInvoiceRequest | Subcontractor Invoice to update (optional)
    joblogicAPIModelsUpdateSubcontractorPOInvoiceRequest: ...,
  } satisfies ApiV1SubcontractorPurchaseOrderUpdateInvoicePutRequest;

  try {
    const data = await api.apiV1SubcontractorPurchaseOrderUpdateInvoicePut(body);
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
| **joblogicAPIModelsUpdateSubcontractorPOInvoiceRequest** | [JoblogicAPIModelsUpdateSubcontractorPOInvoiceRequest](JoblogicAPIModelsUpdateSubcontractorPOInvoiceRequest.md) | Subcontractor Invoice to update | [Optional] |

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


## apiV1SubcontractorPurchaseOrderUpdatePOItemPut

> boolean apiV1SubcontractorPurchaseOrderUpdatePOItemPut(authorization, joblogicAPIModelsUpdateSubPurchaseOrderLineRequest)

Update Subcontractor Purchase Order Line item

### Example

```ts
import {
  Configuration,
  SubcontractorPurchaseOrderApi,
} from '';
import type { ApiV1SubcontractorPurchaseOrderUpdatePOItemPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SubcontractorPurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateSubPurchaseOrderLineRequest | Subcontractor Purchase Order Line item to update (optional)
    joblogicAPIModelsUpdateSubPurchaseOrderLineRequest: ...,
  } satisfies ApiV1SubcontractorPurchaseOrderUpdatePOItemPutRequest;

  try {
    const data = await api.apiV1SubcontractorPurchaseOrderUpdatePOItemPut(body);
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
| **joblogicAPIModelsUpdateSubPurchaseOrderLineRequest** | [JoblogicAPIModelsUpdateSubPurchaseOrderLineRequest](JoblogicAPIModelsUpdateSubPurchaseOrderLineRequest.md) | Subcontractor Purchase Order Line item to update | [Optional] |

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

