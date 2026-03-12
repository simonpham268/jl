# VehicleApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1VehicleDelete**](VehicleApi.md#apiv1vehicledelete) | **DELETE** /api/v1/Vehicle | Delete Vehicle |
| [**apiV1VehicleGetAllPost**](VehicleApi.md#apiv1vehiclegetallpost) | **POST** /api/v1/Vehicle/GetAll | Search vehicle by conditions |
| [**apiV1VehicleGetByIdGet**](VehicleApi.md#apiv1vehiclegetbyidget) | **GET** /api/v1/Vehicle/GetById | Get Vehicle Details |
| [**apiV1VehiclePost**](VehicleApi.md#apiv1vehiclepost) | **POST** /api/v1/Vehicle | Create Vehicle |
| [**apiV1VehiclePut**](VehicleApi.md#apiv1vehicleput) | **PUT** /api/v1/Vehicle | Update Vehicle |



## apiV1VehicleDelete

> apiV1VehicleDelete(authorization, id, tenantid)

Delete Vehicle

### Example

```ts
import {
  Configuration,
  VehicleApi,
} from '';
import type { ApiV1VehicleDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VehicleApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // number | Id of the Vehicle to Delete (optional)
    id: 56,
    // string | Contractor Id in Joblogic (optional)
    tenantid: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1VehicleDeleteRequest;

  try {
    const data = await api.apiV1VehicleDelete(body);
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
| **id** | `number` | Id of the Vehicle to Delete | [Optional] [Defaults to `undefined`] |
| **tenantid** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

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


## apiV1VehicleGetAllPost

> JoblogicAPIModelsVehicleSearchResponse apiV1VehicleGetAllPost(authorization, joblogicAPIModelsSearchVehicleRequest)

Search vehicle by conditions

### Example

```ts
import {
  Configuration,
  VehicleApi,
} from '';
import type { ApiV1VehicleGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VehicleApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchVehicleRequest | search conditons (optional)
    joblogicAPIModelsSearchVehicleRequest: ...,
  } satisfies ApiV1VehicleGetAllPostRequest;

  try {
    const data = await api.apiV1VehicleGetAllPost(body);
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
| **joblogicAPIModelsSearchVehicleRequest** | [JoblogicAPIModelsSearchVehicleRequest](JoblogicAPIModelsSearchVehicleRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsVehicleSearchResponse**](JoblogicAPIModelsVehicleSearchResponse.md)

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


## apiV1VehicleGetByIdGet

> JobLogicMicroserviceCoreContractStockVehicleModel apiV1VehicleGetByIdGet(authorization, id, tenantid)

Get Vehicle Details

### Example

```ts
import {
  Configuration,
  VehicleApi,
} from '';
import type { ApiV1VehicleGetByIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VehicleApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // number | Id of the Vehicle to retrieve (optional)
    id: 56,
    // string | Contractor Id in Joblogic (optional)
    tenantid: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1VehicleGetByIdGetRequest;

  try {
    const data = await api.apiV1VehicleGetByIdGet(body);
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
| **id** | `number` | Id of the Vehicle to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantid** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JobLogicMicroserviceCoreContractStockVehicleModel**](JobLogicMicroserviceCoreContractStockVehicleModel.md)

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


## apiV1VehiclePost

> JobLogicMicroserviceCoreContractStockVehicleModel apiV1VehiclePost(authorization, joblogicAPIModelsSaveVehicleRequest)

Create Vehicle

### Example

```ts
import {
  Configuration,
  VehicleApi,
} from '';
import type { ApiV1VehiclePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VehicleApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSaveVehicleRequest | Vehicle to create (optional)
    joblogicAPIModelsSaveVehicleRequest: ...,
  } satisfies ApiV1VehiclePostRequest;

  try {
    const data = await api.apiV1VehiclePost(body);
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
| **joblogicAPIModelsSaveVehicleRequest** | [JoblogicAPIModelsSaveVehicleRequest](JoblogicAPIModelsSaveVehicleRequest.md) | Vehicle to create | [Optional] |

### Return type

[**JobLogicMicroserviceCoreContractStockVehicleModel**](JobLogicMicroserviceCoreContractStockVehicleModel.md)

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


## apiV1VehiclePut

> JobLogicMicroserviceCoreContractStockVehicleModel apiV1VehiclePut(authorization, joblogicAPIModelsSaveVehicleRequest)

Update Vehicle

### Example

```ts
import {
  Configuration,
  VehicleApi,
} from '';
import type { ApiV1VehiclePutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new VehicleApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSaveVehicleRequest | Vehicle to update (optional)
    joblogicAPIModelsSaveVehicleRequest: ...,
  } satisfies ApiV1VehiclePutRequest;

  try {
    const data = await api.apiV1VehiclePut(body);
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
| **joblogicAPIModelsSaveVehicleRequest** | [JoblogicAPIModelsSaveVehicleRequest](JoblogicAPIModelsSaveVehicleRequest.md) | Vehicle to update | [Optional] |

### Return type

[**JobLogicMicroserviceCoreContractStockVehicleModel**](JobLogicMicroserviceCoreContractStockVehicleModel.md)

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

