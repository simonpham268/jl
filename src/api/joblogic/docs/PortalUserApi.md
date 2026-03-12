# PortalUserApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1PortalUserDelete**](PortalUserApi.md#apiv1portaluserdelete) | **DELETE** /api/v1/PortalUser | Delete a portal user |
| [**apiV1PortalUserGet**](PortalUserApi.md#apiv1portaluserget) | **GET** /api/v1/PortalUser | Gets Portal User Details |
| [**apiV1PortalUserGetAllPermissionsGet**](PortalUserApi.md#apiv1portalusergetallpermissionsget) | **GET** /api/v1/PortalUser/GetAllPermissions |  |
| [**apiV1PortalUserGetAllPost**](PortalUserApi.md#apiv1portalusergetallpost) | **POST** /api/v1/PortalUser/GetAll | Search Portal User by keyword: name, email |
| [**apiV1PortalUserPost**](PortalUserApi.md#apiv1portaluserpost) | **POST** /api/v1/PortalUser | Create Portal User |
| [**apiV1PortalUserPut**](PortalUserApi.md#apiv1portaluserput) | **PUT** /api/v1/PortalUser | Update Portal User |



## apiV1PortalUserDelete

> apiV1PortalUserDelete(authorization, uniqueId, tenantId)

Delete a portal user

### Example

```ts
import {
  Configuration,
  PortalUserApi,
} from '';
import type { ApiV1PortalUserDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PortalUserApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | UniqueId of the Portal User to Delete (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1PortalUserDeleteRequest;

  try {
    const data = await api.apiV1PortalUserDelete(body);
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
| **uniqueId** | `string` | UniqueId of the Portal User to Delete | [Optional] [Defaults to `undefined`] |
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


## apiV1PortalUserGet

> JoblogicAPIModelsGetUserPortalResponse apiV1PortalUserGet(authorization, uniqueId, tenantId)

Gets Portal User Details

### Example

```ts
import {
  Configuration,
  PortalUserApi,
} from '';
import type { ApiV1PortalUserGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PortalUserApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | UniqueId of the Portal User to retrieve (optional)
    uniqueId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in JobLogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1PortalUserGetRequest;

  try {
    const data = await api.apiV1PortalUserGet(body);
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
| **uniqueId** | `string` | UniqueId of the Portal User to retrieve | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Contractor Id in JobLogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsGetUserPortalResponse**](JoblogicAPIModelsGetUserPortalResponse.md)

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


## apiV1PortalUserGetAllPermissionsGet

> JoblogicAPIModelsPortalUserRolePermissionResponse apiV1PortalUserGetAllPermissionsGet(authorization, tenantId)



### Example

```ts
import {
  Configuration,
  PortalUserApi,
} from '';
import type { ApiV1PortalUserGetAllPermissionsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PortalUserApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1PortalUserGetAllPermissionsGetRequest;

  try {
    const data = await api.apiV1PortalUserGetAllPermissionsGet(body);
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
| **tenantId** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsPortalUserRolePermissionResponse**](JoblogicAPIModelsPortalUserRolePermissionResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/plain`, `application/json`, `text/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1PortalUserGetAllPost

> JoblogicAPIModelsSearchPortalUserResponse apiV1PortalUserGetAllPost(authorization, joblogicAPIModelsSearchPortalUserRequest)

Search Portal User by keyword: name, email

### Example

```ts
import {
  Configuration,
  PortalUserApi,
} from '';
import type { ApiV1PortalUserGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PortalUserApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchPortalUserRequest | search conditions (optional)
    joblogicAPIModelsSearchPortalUserRequest: ...,
  } satisfies ApiV1PortalUserGetAllPostRequest;

  try {
    const data = await api.apiV1PortalUserGetAllPost(body);
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
| **joblogicAPIModelsSearchPortalUserRequest** | [JoblogicAPIModelsSearchPortalUserRequest](JoblogicAPIModelsSearchPortalUserRequest.md) | search conditions | [Optional] |

### Return type

[**JoblogicAPIModelsSearchPortalUserResponse**](JoblogicAPIModelsSearchPortalUserResponse.md)

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


## apiV1PortalUserPost

> string apiV1PortalUserPost(authorization, joblogicAPIModelsCreatePortalUserRequest)

Create Portal User

### Example

```ts
import {
  Configuration,
  PortalUserApi,
} from '';
import type { ApiV1PortalUserPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PortalUserApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreatePortalUserRequest | Portal User to create (optional)
    joblogicAPIModelsCreatePortalUserRequest: ...,
  } satisfies ApiV1PortalUserPostRequest;

  try {
    const data = await api.apiV1PortalUserPost(body);
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
| **joblogicAPIModelsCreatePortalUserRequest** | [JoblogicAPIModelsCreatePortalUserRequest](JoblogicAPIModelsCreatePortalUserRequest.md) | Portal User to create | [Optional] |

### Return type

**string**

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


## apiV1PortalUserPut

> string apiV1PortalUserPut(authorization, joblogicAPIModelsUpdatePortalUserRequest)

Update Portal User

### Example

```ts
import {
  Configuration,
  PortalUserApi,
} from '';
import type { ApiV1PortalUserPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PortalUserApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdatePortalUserRequest | User portal to update (optional)
    joblogicAPIModelsUpdatePortalUserRequest: ...,
  } satisfies ApiV1PortalUserPutRequest;

  try {
    const data = await api.apiV1PortalUserPut(body);
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
| **joblogicAPIModelsUpdatePortalUserRequest** | [JoblogicAPIModelsUpdatePortalUserRequest](JoblogicAPIModelsUpdatePortalUserRequest.md) | User portal to update | [Optional] |

### Return type

**string**

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

