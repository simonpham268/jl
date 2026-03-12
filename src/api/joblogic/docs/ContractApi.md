# ContractApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1ContractGet**](ContractApi.md#apiv1contractget) | **GET** /api/v1/Contract |  |
| [**apiV1ContractGetBySiteIdGet**](ContractApi.md#apiv1contractgetbysiteidget) | **GET** /api/v1/Contract/GetBySiteId |  |



## apiV1ContractGet

> apiV1ContractGet(authorization, uniqueId, tenantId, intId, isHardcoded)



### Example

```ts
import {
  Configuration,
  ContractApi,
} from '';
import type { ApiV1ContractGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ContractApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // number (optional)
    intId: 56,
    // boolean (optional)
    isHardcoded: true,
  } satisfies ApiV1ContractGetRequest;

  try {
    const data = await api.apiV1ContractGet(body);
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
| **tenantId** | `string` |  | [Optional] [Defaults to `undefined`] |
| **intId** | `number` |  | [Optional] [Defaults to `undefined`] |
| **isHardcoded** | `boolean` |  | [Optional] [Defaults to `false`] |

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
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1ContractGetBySiteIdGet

> apiV1ContractGetBySiteIdGet(authorization, siteId, tenantId)



### Example

```ts
import {
  Configuration,
  ContractApi,
} from '';
import type { ApiV1ContractGetBySiteIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ContractApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // number (optional)
    siteId: 56,
    // string (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1ContractGetBySiteIdGetRequest;

  try {
    const data = await api.apiV1ContractGetBySiteIdGet(body);
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
| **siteId** | `number` |  | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` |  | [Optional] [Defaults to `undefined`] |

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
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

