# ContactApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1ContactConfigEventsPatch**](ContactApi.md#apiv1contactconfigeventspatch) | **PATCH** /api/v1/Contact/ConfigEvents | Config events and remainders to contact. |
| [**apiV1ContactDelete**](ContactApi.md#apiv1contactdelete) | **DELETE** /api/v1/Contact | Delete Contact and all contact level associated with that contact |
| [**apiV1ContactDeleteByContactLevelIdDelete**](ContactApi.md#apiv1contactdeletebycontactleveliddelete) | **DELETE** /api/v1/Contact/DeleteByContactLevelId | Delete contact by contact level id |
| [**apiV1ContactGetAllPost**](ContactApi.md#apiv1contactgetallpost) | **POST** /api/v1/Contact/GetAll | Search Contacts by keyword, tags, customer and active status |
| [**apiV1ContactGetByIdGet**](ContactApi.md#apiv1contactgetbyidget) | **GET** /api/v1/Contact/GetById | Get Contact Details by Id and tenant id. |
| [**apiV1ContactGetContactByEntityIdGet**](ContactApi.md#apiv1contactgetcontactbyentityidget) | **GET** /api/v1/Contact/GetContactByEntityId | Get list of Contacts associated by entity |
| [**apiV1ContactPost**](ContactApi.md#apiv1contactpost) | **POST** /api/v1/Contact | Create Contact |
| [**apiV1ContactPut**](ContactApi.md#apiv1contactput) | **PUT** /api/v1/Contact | Update Contact |



## apiV1ContactConfigEventsPatch

> apiV1ContactConfigEventsPatch(authorization, joblogicAPIModelsConfigContactEventsRequest)

Config events and remainders to contact.

### Example

```ts
import {
  Configuration,
  ContactApi,
} from '';
import type { ApiV1ContactConfigEventsPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ContactApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsConfigContactEventsRequest | ConfigContactEventsRequest object (optional)
    joblogicAPIModelsConfigContactEventsRequest: ...,
  } satisfies ApiV1ContactConfigEventsPatchRequest;

  try {
    const data = await api.apiV1ContactConfigEventsPatch(body);
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
| **joblogicAPIModelsConfigContactEventsRequest** | [JoblogicAPIModelsConfigContactEventsRequest](JoblogicAPIModelsConfigContactEventsRequest.md) | ConfigContactEventsRequest object | [Optional] |

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


## apiV1ContactDelete

> apiV1ContactDelete(authorization, contactId, tenantId)

Delete Contact and all contact level associated with that contact

### Example

```ts
import {
  Configuration,
  ContactApi,
} from '';
import type { ApiV1ContactDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ContactApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string (optional)
    contactId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1ContactDeleteRequest;

  try {
    const data = await api.apiV1ContactDelete(body);
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
| **contactId** | `string` |  | [Optional] [Defaults to `undefined`] |
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


## apiV1ContactDeleteByContactLevelIdDelete

> apiV1ContactDeleteByContactLevelIdDelete(authorization, contactLevelId, entityId, entityType, tenantId)

Delete contact by contact level id

### Example

```ts
import {
  Configuration,
  ContactApi,
} from '';
import type { ApiV1ContactDeleteByContactLevelIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ContactApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string (optional)
    contactLevelId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string (optional)
    entityId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // JobLogicMicroserviceCoreContractEntityType (optional)
    entityType: ...,
    // string (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1ContactDeleteByContactLevelIdDeleteRequest;

  try {
    const data = await api.apiV1ContactDeleteByContactLevelIdDelete(body);
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
| **contactLevelId** | `string` |  | [Optional] [Defaults to `undefined`] |
| **entityId** | `string` |  | [Optional] [Defaults to `undefined`] |
| **entityType** | `JobLogicMicroserviceCoreContractEntityType` |  | [Optional] [Defaults to `undefined`] [Enum: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 38, 39, 40, 41, 42, 43, 44, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 225, 226, 227, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 256, 257, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 275, 276, 281, 282, 283, 284, 285, 286, 287, 288, 290, 291, 292, 293, 294, 295] |
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
| **200** | Successful |  -  |
| **400** | Bad Request |  -  |
| **401** | Unauthorized Request |  -  |
| **404** | Not found |  -  |
| **500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## apiV1ContactGetAllPost

> JoblogicAPIModelsSearchContactResponse apiV1ContactGetAllPost(authorization, joblogicAPIModelsSearchContactRequest)

Search Contacts by keyword, tags, customer and active status

### Example

```ts
import {
  Configuration,
  ContactApi,
} from '';
import type { ApiV1ContactGetAllPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ContactApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsSearchContactRequest | search conditons (optional)
    joblogicAPIModelsSearchContactRequest: ...,
  } satisfies ApiV1ContactGetAllPostRequest;

  try {
    const data = await api.apiV1ContactGetAllPost(body);
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
| **joblogicAPIModelsSearchContactRequest** | [JoblogicAPIModelsSearchContactRequest](JoblogicAPIModelsSearchContactRequest.md) | search conditons | [Optional] |

### Return type

[**JoblogicAPIModelsSearchContactResponse**](JoblogicAPIModelsSearchContactResponse.md)

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


## apiV1ContactGetByIdGet

> JoblogicAPIModelsContactItemResponse apiV1ContactGetByIdGet(authorization, id, tenantId)

Get Contact Details by Id and tenant id.

### Example

```ts
import {
  Configuration,
  ContactApi,
} from '';
import type { ApiV1ContactGetByIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ContactApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Contact Guid (optional)
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string | Tenant Id (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1ContactGetByIdGetRequest;

  try {
    const data = await api.apiV1ContactGetByIdGet(body);
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
| **id** | `string` | Contact Guid | [Optional] [Defaults to `undefined`] |
| **tenantId** | `string` | Tenant Id | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsContactItemResponse**](JoblogicAPIModelsContactItemResponse.md)

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


## apiV1ContactGetContactByEntityIdGet

> JoblogicAPIModelsGetContactByEntityIdResponse apiV1ContactGetContactByEntityIdGet(authorization, entityId, entityType, tenantId)

Get list of Contacts associated by entity

### Example

```ts
import {
  Configuration,
  ContactApi,
} from '';
import type { ApiV1ContactGetContactByEntityIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ContactApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // string | Unique Id of the entity which the Contact is against in Joblogic (optional)
    entityId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // JobLogicMicroserviceCoreContractEntityType | The type of entity that the Contact belongs to (optional)
    entityType: ...,
    // string | Contractor Id in Joblogic (optional)
    tenantId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ApiV1ContactGetContactByEntityIdGetRequest;

  try {
    const data = await api.apiV1ContactGetContactByEntityIdGet(body);
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
| **entityId** | `string` | Unique Id of the entity which the Contact is against in Joblogic | [Optional] [Defaults to `undefined`] |
| **entityType** | `JobLogicMicroserviceCoreContractEntityType` | The type of entity that the Contact belongs to | [Optional] [Defaults to `undefined`] [Enum: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 38, 39, 40, 41, 42, 43, 44, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 225, 226, 227, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 256, 257, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 275, 276, 281, 282, 283, 284, 285, 286, 287, 288, 290, 291, 292, 293, 294, 295] |
| **tenantId** | `string` | Contractor Id in Joblogic | [Optional] [Defaults to `undefined`] |

### Return type

[**JoblogicAPIModelsGetContactByEntityIdResponse**](JoblogicAPIModelsGetContactByEntityIdResponse.md)

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


## apiV1ContactPost

> JoblogicAPIModelsCreateContactResponse apiV1ContactPost(authorization, joblogicAPIModelsCreateContactRequest)

Create Contact

### Example

```ts
import {
  Configuration,
  ContactApi,
} from '';
import type { ApiV1ContactPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ContactApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsCreateContactRequest | Contact to create (optional)
    joblogicAPIModelsCreateContactRequest: ...,
  } satisfies ApiV1ContactPostRequest;

  try {
    const data = await api.apiV1ContactPost(body);
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
| **joblogicAPIModelsCreateContactRequest** | [JoblogicAPIModelsCreateContactRequest](JoblogicAPIModelsCreateContactRequest.md) | Contact to create | [Optional] |

### Return type

[**JoblogicAPIModelsCreateContactResponse**](JoblogicAPIModelsCreateContactResponse.md)

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


## apiV1ContactPut

> JoblogicAPIModelsUpdateContactResponse apiV1ContactPut(authorization, joblogicAPIModelsUpdateContactRequest)

Update Contact

### Example

```ts
import {
  Configuration,
  ContactApi,
} from '';
import type { ApiV1ContactPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new ContactApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsUpdateContactRequest | Contact to update (optional)
    joblogicAPIModelsUpdateContactRequest: ...,
  } satisfies ApiV1ContactPutRequest;

  try {
    const data = await api.apiV1ContactPut(body);
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
| **joblogicAPIModelsUpdateContactRequest** | [JoblogicAPIModelsUpdateContactRequest](JoblogicAPIModelsUpdateContactRequest.md) | Contact to update | [Optional] |

### Return type

[**JoblogicAPIModelsUpdateContactResponse**](JoblogicAPIModelsUpdateContactResponse.md)

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

