# MiscApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**apiV1MiscValidatephonenumberbytwilioPost**](MiscApi.md#apiv1miscvalidatephonenumberbytwiliopost) | **POST** /api/v1/Misc/validatephonenumberbytwilio |  |



## apiV1MiscValidatephonenumberbytwilioPost

> JoblogicAPIModelsValidatePhoneNumberResponse apiV1MiscValidatephonenumberbytwilioPost(authorization, joblogicAPIModelsValidatePhoneNumberByTwilioRequest)



### Example

```ts
import {
  Configuration,
  MiscApi,
} from '';
import type { ApiV1MiscValidatephonenumberbytwilioPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new MiscApi();

  const body = {
    // string | Bearer access_token
    authorization: authorization_example,
    // JoblogicAPIModelsValidatePhoneNumberByTwilioRequest (optional)
    joblogicAPIModelsValidatePhoneNumberByTwilioRequest: ...,
  } satisfies ApiV1MiscValidatephonenumberbytwilioPostRequest;

  try {
    const data = await api.apiV1MiscValidatephonenumberbytwilioPost(body);
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
| **joblogicAPIModelsValidatePhoneNumberByTwilioRequest** | [JoblogicAPIModelsValidatePhoneNumberByTwilioRequest](JoblogicAPIModelsValidatePhoneNumberByTwilioRequest.md) |  | [Optional] |

### Return type

[**JoblogicAPIModelsValidatePhoneNumberResponse**](JoblogicAPIModelsValidatePhoneNumberResponse.md)

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

