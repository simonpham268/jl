# InvoiceLineApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1InvoiceLineDelete**](InvoiceLineApi.md#apiv1invoicelinedelete) | **DELETE** /api/v1/InvoiceLine | Delete an Invoice |
| [**apiV1InvoiceLinePost**](InvoiceLineApi.md#apiv1invoicelinepost) | **POST** /api/v1/InvoiceLine | Create Invoice Line by JobId, Invoice Id |
| [**apiV1InvoiceLinePut**](InvoiceLineApi.md#apiv1invoicelineput) | **PUT** /api/v1/InvoiceLine | Update Invoice line information |



## apiV1InvoiceLineDelete

> apiV1InvoiceLineDelete(authorization, id, invoiceId, tenantId)

Delete an Invoice



### Example

```ts
import {
  Configuration,
  InvoiceLineApi,
} from '';
import type { ApiV1InvoiceLineDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InvoiceLineApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // number | Id of the Line to retrieve (optional)
    id: 56,
    // number | Id of the Invoice (optional)
    invoiceId: 56,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1InvoiceLineDeleteRequest;

  try {
    const data = await api.apiV1InvoiceLineDelete(body);
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
| **id** | `number` | Id of the Line to retrieve | [Optional] [Defaults to `undefined`] |
| **invoiceId** | `number` | Id of the Invoice | [Optional] [Defaults to `undefined`] |
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


## apiV1InvoiceLinePost

> JobLogicMicroserviceCoreContractInvoiceLineItemResponse apiV1InvoiceLinePost(authorization, joblogicAPIModelsCreateInvoiceLineRequest)

Create Invoice Line by JobId, Invoice Id



### Example

```ts
import {
  Configuration,
  InvoiceLineApi,
} from '';
import type { ApiV1InvoiceLinePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InvoiceLineApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateInvoiceLineRequest | Invoice to create (optional)
    joblogicAPIModelsCreateInvoiceLineRequest: ...,
  } satisfies ApiV1InvoiceLinePostRequest;

  try {
    const data = await api.apiV1InvoiceLinePost(body);
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
| **joblogicAPIModelsCreateInvoiceLineRequest** | [JoblogicAPIModelsCreateInvoiceLineRequest](JoblogicAPIModelsCreateInvoiceLineRequest.md) | Invoice to create | [Optional] |

### Return type

[**JobLogicMicroserviceCoreContractInvoiceLineItemResponse**](JobLogicMicroserviceCoreContractInvoiceLineItemResponse.md)

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


## apiV1InvoiceLinePut

> JobLogicMicroserviceCoreContractInvoiceLineItemResponse apiV1InvoiceLinePut(authorization, joblogicAPIModelsUpdateInvoiceLineRequest)

Update Invoice line information



### Example

```ts
import {
  Configuration,
  InvoiceLineApi,
} from '';
import type { ApiV1InvoiceLinePutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new InvoiceLineApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateInvoiceLineRequest | Invoice Line to update (optional)
    joblogicAPIModelsUpdateInvoiceLineRequest: ...,
  } satisfies ApiV1InvoiceLinePutRequest;

  try {
    const data = await api.apiV1InvoiceLinePut(body);
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
| **joblogicAPIModelsUpdateInvoiceLineRequest** | [JoblogicAPIModelsUpdateInvoiceLineRequest](JoblogicAPIModelsUpdateInvoiceLineRequest.md) | Invoice Line to update | [Optional] |

### Return type

[**JobLogicMicroserviceCoreContractInvoiceLineItemResponse**](JobLogicMicroserviceCoreContractInvoiceLineItemResponse.md)

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

