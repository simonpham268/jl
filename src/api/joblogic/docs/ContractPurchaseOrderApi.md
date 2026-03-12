# ContractPurchaseOrderApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1ContractPurchaseOrderGet**](ContractPurchaseOrderApi.md#apiv1contractpurchaseorderget) | **GET** /api/v1/ContractPurchaseOrder | Get Contract Purchase Order Details |
| [**apiV1ContractPurchaseOrderGetAllPost**](ContractPurchaseOrderApi.md#apiv1contractpurchaseordergetallpost) | **POST** /api/v1/ContractPurchaseOrder/GetAll | Search Contract Purchase Orders by conditions |



## apiV1ContractPurchaseOrderGet

> JoblogicAPIModelsContractPurchaseOrderDetailResponse apiV1ContractPurchaseOrderGet(authorization, uniqueid, tenantId)

Get Contract Purchase Order Details

### Example

```ts
import {
  Configuration,
  ContractPurchaseOrderApi,
} from '';
import type { ApiV1ContractPurchaseOrderGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ContractPurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Id of the contract Purchase Order to retrieve (optional)
    uniqueid: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1ContractPurchaseOrderGetRequest;

  try {
    const data = await api.apiV1ContractPurchaseOrderGet(body);
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
| **uniqueid** | `string` | Id of the contract Purchase Order to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsContractPurchaseOrderDetailResponse**](JoblogicAPIModelsContractPurchaseOrderDetailResponse.md)

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


## apiV1ContractPurchaseOrderGetAllPost

> JoblogicAPIModelsSearchContractPurchaseOrderResponse apiV1ContractPurchaseOrderGetAllPost(authorization, joblogicAPIModelsSearchContractPurchaseOrderRequest)

Search Contract Purchase Orders by conditions

### Example

```ts
import {
  Configuration,
  ContractPurchaseOrderApi,
} from '';
import type { ApiV1ContractPurchaseOrderGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ContractPurchaseOrderApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchContractPurchaseOrderRequest | search conditons (optional)
    joblogicAPIModelsSearchContractPurchaseOrderRequest: ...,
  } satisfies ApiV1ContractPurchaseOrderGetAllPostRequest;

  try {
    const data = await api.apiV1ContractPurchaseOrderGetAllPost(body);
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
| **joblogicAPIModelsSearchContractPurchaseOrderRequest** | [JoblogicAPIModelsSearchContractPurchaseOrderRequest](JoblogicAPIModelsSearchContractPurchaseOrderRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchContractPurchaseOrderResponse**](JoblogicAPIModelsSearchContractPurchaseOrderResponse.md)

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

