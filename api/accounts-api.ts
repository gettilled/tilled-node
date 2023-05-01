/* tslint:disable */
/* eslint-disable */
/**
 * Tilled API
 * The Tilled API is organized around [REST](http://en.wikipedia.org/wiki/Representational_State_Transfer). Our API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.  You can use the Tilled API in test mode, which does not affect your live data or interact with the banking networks. The API key you use to authenticate the request determines whether the request is live mode or test mode. Before your account is activated you will only be able to interact with test mode.  Authentication uses a standard web token schema.  **Notice**: The Tilled API treats HTTP status `401` to mean `Unauthenticated` and not the HTTP standard name of `Unauthorized`. Requests made for materials the requester does not have permission to access, the API will respond with `403: Forbidden`.  # Authentication  The tilled API uses API keys to authenticate requests. You can view and manage your API keys in the Tilled Dashboard.  Test mode secret keys have the prefix sk*test* and live mode secret keys have the prefix sk*live*. Alternatively, you can use restricted API keys for granular permissions.  Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.  Authentication to the API is performed via custom HTTP Header `tilled-api-key`. Provide your API key as the value.  All API requests must be made over HTTPS. Calls made over plain HTTP will fail. API requests without authentication will also fail.  <!-- ReDoc-Inject: <security-definitions> -->  # Errors  Tilled uses conventional HTTP response codes to indicate the success or failure of an API request. In general: Codes in the `2xx` range indicate success. Codes in the `4xx` range indicate an error that failed given the information provided (e.g., a required parameter was omitted, a charge failed, etc.). Codes in the `5xx` range indicate an error with Tilled\'s servers (these are rare).  Some `4xx` errors that could be handled programmatically (e.g., a card is declined) include an error code that briefly explains the error reported.  # Request IDs  Each API request has an associated request identifier. You can find this value in the response headers, under `request-id`. If you need to contact us about a specific request, providing the request identifier will ensure the fastest possible resolution.  # Metadata  Updatable Tilled objects—including [Account](#tag/Accounts), [Customer](#tag/Customers), [PaymentIntent](#tag/PaymentIntents), [Refund](#tag/Refunds), and [Subscription](#tag/Subscriptions)—have a `metadata` parameter. You can use this parameter to attach key-value data to these Tilled objects.  You can specify up to 50 keys, with key names up to 40 characters long and values up to 500 characters long.  Metadata is useful for storing additional, structured information on an object. As an example, you could store your user\'s full name and corresponding unique identifier from your system on a Tilled [Customer](#tag/Customers) object. Metadata is not used by Tilled—for example, not used to authorize or decline a charge—and won\'t be seen by your users unless you choose to show it to them. Do not store any sensitive information (bank account numbers, card details, etc.) as metadata.  # Apple Pay  Tilled supports Apple Pay through the Tilled.js [`PaymentRequest`](https://docs.tilled.com/tilledjs/#paymentrequest-ie-apple-pay) object.  In order to start accepting payments with Apple Pay, you will first need to validate the domains you plan to host the Apple Pay Button on by:  - Hosting Tilled\'s Apple Domain Verification File on the domain - Use the Tilled API to register the domain  ## Domain Verification File  Domains hosting an Apple Pay Button must be secured with HTTPS (TLS 1.2 or later) and have a valid SSL certificate.  Before [registering your domain](#operation/CreateApplePayDomain) with the Tilled API, you need to host Tilled\'s [Apple Domain Verification File](https://api.tilled.com/apple-developer-merchantid-domain-association) on the domain at the path: `/.well-known/apple-developer-merchantid-domain-association`  # Tilled.js  Tilled.js is the easiest way to get started collecting payments. It allows you to embed a payments form in your application and stores credit card information securely on remote servers instead of passing through your network. View the documentation [here](https://docs.tilled.com/tilledjs/).  # Webhooks  ## Receive event notifications with webhooks  Listen for events on your Tilled account so your integration can automatically trigger reactions.  Tilled uses webhooks to notify your application when an event happens in your account. Webhooks are particularly useful for asynchronous events like when a customer’s bank confirms a payment, a customer disputes a charge, or a recurring payment succeeds.  Begin using webhooks with your Tilled integration in just a couple steps:  - Create a webhook endpoint on your server. - Register the endpoint with Tilled to go live.  Not all Tilled integrations require webhooks. Keep reading to learn more about what webhooks are and when you should use them.  ### What are webhooks  _Webhooks_ refers to a combination of elements that collectively create a notification and reaction system within a larger integration.  Metaphorically, webhooks are like a phone number that Tilled calls to notify you of activity in your Tilled account. The activity could be the creation of a new customer or the payout of funds to your bank account. The webhook endpoint is the person answering that call who takes actions based upon the specific information it receives.  Non-metaphorically, the webhook endpoint is just more code on your server, which could be written in Ruby, PHP, Node.js, or whatever. The webhook endpoint has an associated URL (e.g., https://example.com/webhooks). The Tilled notifications are Event objects. This Event object contains all the relevant information about what just happened, including the type of event and the data associated with that event. The webhook endpoint uses the event details to take any required actions, such as indicating that an order should be fulfilled.  ### When to use webhooks  Many events that occur within a Tilled account have synchronous results–immediate and direct–to an executed request. For example, a successful request to create a customer immediately returns a Customer object. Such requests don’t require webhooks, as the key information is already available.  Other events that occur within a Tilled account are asynchronous: happening at a later time and not directly in response to your code’s execution. Most commonly these involve:  - The [Payment Intents API](#tag/PaymentIntents)  With these and similar APIs, Tilled needs to notify your integration about changes to the status of an object so your integration can take subsequent steps.  The specific actions your webhook endpoint may take differs based upon the event. Some examples include:  - Updating a customer’s membership record in your database when a subscription payment succeeds - Logging an accounting entry when a transfer is paid - Indicating that an order can be fulfilled (i.e., boxed and shipped)  ## Verifying signatures manually  The `tilled-signature` header included in each signed event contains a timestamp and one or more signatures. The timestamp is prefixed by `t=`, and each signature is prefixed by a `scheme`. Schemes start with `v`, followed by an integer. Currently, the only valid live signature scheme is `v1`.  ``` tilled-signature:t=1614049713663,v1=8981f5902896f479fa9079eec71fca01e9a065c5b59a96b221544023ce994b02 ```  Tilled generates signatures using a hash-based message authentication code ([HMAC](https://en.wikipedia.org/wiki/Hash-based_message_authentication_code)) with [SHA-256](https://en.wikipedia.org/wiki/SHA-2). You should ignore all schemes that are not `v1`.  You can verify the webhook event signature by following these steps.  ### Step 1: Extract the timestamp and signatures from the header  Split the header, using the `,` character as the separator, to get a list of elements. Then split each element, using the `=` character as the separator, to get a prefix and value pair.  The value for the prefix `t` corresponds to the timestamp, and `v1` corresponds to the signature (or signatures). You can discard all other elements.  ### Step 2: Prepare the signed_payload string  The `signed_payload` string is created by concatenating:  - The timestamp (as a string) - The character `.` - The actual JSON payload (i.e., the request body)  ### Step 3: Determine the expected signature  Compute an HMAC with the SHA256 hash function. Use the endpoint’s signing secret as the key, and use the `signed_payload` string as the message.  ### Step 4: Compare the signatures  Compare the signature (or signatures) in the header to the expected signature. For an equality match, compute the difference between the current timestamp and the received timestamp, then decide if the difference is within your tolerance.  To protect against timing attacks, use a constant-time string comparison to compare the expected signature to each of the received signatures.
 *
 * The version of the OpenAPI document: 1.0
 * Contact: integrations@tilled.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import type { Configuration } from "../configuration";
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from "axios";
import globalAxios from "axios";
// Some imports not used depending on template conditions
// @ts-ignore
import {
  DUMMY_BASE_URL,
  assertParamExists,
  setApiKeyToObject,
  setBasicAuthToObject,
  setBearerAuthToObject,
  setOAuthToObject,
  setSearchParams,
  serializeDataIfNeeded,
  toPathString,
  createRequestFunction,
} from "../common";
// @ts-ignore
import {
  BASE_PATH,
  COLLECTION_FORMATS,
  RequestArgs,
  BaseAPI,
  RequiredError,
} from "../base";
// @ts-ignore
import { Account } from "../model";
// @ts-ignore
import { AccountCapabilityCreateParams } from "../model";
// @ts-ignore
import { AccountCapabilityUpdateParams } from "../model";
// @ts-ignore
import { AccountCreateParams } from "../model";
// @ts-ignore
import { AccountUpdateParams } from "../model";
// @ts-ignore
import { ListConnectedAccounts200Response } from "../model";
/**
 * AccountsApi - axios parameter creator
 * @export
 */
export const AccountsApiAxiosParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     * Adds an account capability, account capabilities can only be managed prior to onboarding application submission.
     * @summary Add an Account Capability
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {AccountCapabilityCreateParams} AccountCapabilityCreateParams
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    addAccountCapability: async (
      tilled_account: string,
      AccountCapabilityCreateParams: AccountCapabilityCreateParams,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'tilled_account' is not null or undefined
      assertParamExists(
        "addAccountCapability",
        "tilled_account",
        tilled_account
      );
      // verify required parameter 'AccountCapabilityCreateParams' is not null or undefined
      assertParamExists(
        "addAccountCapability",
        "AccountCapabilityCreateParams",
        AccountCapabilityCreateParams
      );
      const localVarPath = `/v1/accounts/capabilities`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "POST",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication JWT required
      // http bearer authentication required
      await setBearerAuthToObject(localVarHeaderParameter, configuration);

      // authentication TilledApiKey required
      await setApiKeyToObject(
        localVarHeaderParameter,
        "tilled-api-key",
        configuration
      );

      if (tilled_account != null) {
        localVarHeaderParameter["tilled-account"] = String(tilled_account);
      }

      localVarHeaderParameter["Content-Type"] = "application/json";

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      localVarRequestOptions.data = serializeDataIfNeeded(
        AccountCapabilityCreateParams,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Creates a merchant account associated to your partner account.
     * @summary Create a Connected Account
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {AccountCreateParams} AccountCreateParams
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createConnectedAccount: async (
      tilled_account: string,
      AccountCreateParams: AccountCreateParams,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'tilled_account' is not null or undefined
      assertParamExists(
        "createConnectedAccount",
        "tilled_account",
        tilled_account
      );
      // verify required parameter 'AccountCreateParams' is not null or undefined
      assertParamExists(
        "createConnectedAccount",
        "AccountCreateParams",
        AccountCreateParams
      );
      const localVarPath = `/v1/accounts/connected`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "POST",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication JWT required
      // http bearer authentication required
      await setBearerAuthToObject(localVarHeaderParameter, configuration);

      // authentication TilledApiKey required
      await setApiKeyToObject(
        localVarHeaderParameter,
        "tilled-api-key",
        configuration
      );

      if (tilled_account != null) {
        localVarHeaderParameter["tilled-account"] = String(tilled_account);
      }

      localVarHeaderParameter["Content-Type"] = "application/json";

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      localVarRequestOptions.data = serializeDataIfNeeded(
        AccountCreateParams,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Removes an account capability, account capabilities can only be managed prior to onboarding application submission.
     * @summary Delete an Account Capability
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteAccountCapability: async (
      tilled_account: string,
      id: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'tilled_account' is not null or undefined
      assertParamExists(
        "deleteAccountCapability",
        "tilled_account",
        tilled_account
      );
      // verify required parameter 'id' is not null or undefined
      assertParamExists("deleteAccountCapability", "id", id);
      const localVarPath = `/v1/accounts/capabilities/{id}`.replace(
        `{${"id"}}`,
        encodeURIComponent(String(id))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "DELETE",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication JWT required
      // http bearer authentication required
      await setBearerAuthToObject(localVarHeaderParameter, configuration);

      // authentication TilledApiKey required
      await setApiKeyToObject(
        localVarHeaderParameter,
        "tilled-api-key",
        configuration
      );

      if (tilled_account != null) {
        localVarHeaderParameter["tilled-account"] = String(tilled_account);
      }

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Deletes a merchant account.
     * @summary Delete a Connected Account
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteConnectedAccount: async (
      tilled_account: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'tilled_account' is not null or undefined
      assertParamExists(
        "deleteConnectedAccount",
        "tilled_account",
        tilled_account
      );
      const localVarPath = `/v1/accounts/connected`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "DELETE",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication JWT required
      // http bearer authentication required
      await setBearerAuthToObject(localVarHeaderParameter, configuration);

      // authentication TilledApiKey required
      await setApiKeyToObject(
        localVarHeaderParameter,
        "tilled-api-key",
        configuration
      );

      if (tilled_account != null) {
        localVarHeaderParameter["tilled-account"] = String(tilled_account);
      }

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Retrieves the details of an account.
     * @summary Get an Account
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getAccount: async (
      tilled_account: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'tilled_account' is not null or undefined
      assertParamExists("getAccount", "tilled_account", tilled_account);
      const localVarPath = `/v1/accounts`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "GET",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication JWT required
      // http bearer authentication required
      await setBearerAuthToObject(localVarHeaderParameter, configuration);

      // authentication TilledApiKey required
      await setApiKeyToObject(
        localVarHeaderParameter,
        "tilled-api-key",
        configuration
      );

      if (tilled_account != null) {
        localVarHeaderParameter["tilled-account"] = String(tilled_account);
      }

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns a list of accounts connected to your account. For merchant accounts, the list is empty.
     * @summary List all Connected Accounts
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {{ [key: string]: string; }} [metadata] &#x60;metadata&#x60; key-value pairs to filter by. Only exact matches on the key-value pair(s) will be returned. Example: &#x60;?metadata[internal_customer_id]&#x3D;7cb1159d-875e-47ae-a309-319fa7ff395b&#x60;.
     * @param {string} [q] The partial search of text fields. Supports searching by &#x60;account.name&#x60;, &#x60;account.business_profile.legal_name&#x60;, &#x60;account.id&#x60;, &#x60;account.email&#x60;, &#x60;user.name&#x60;, &#x60;user.email&#x60;
     * @param {string} [sort] The sort parameters, value:direction. Possible values: &#x60;name&#x60;, &#x60;created_at&#x60;. Possible directions:  &#x60;asc&#x60;, &#x60;desc&#x60;  For example &#x60;name:asc&#x60;.  Default: &#x60;created_at:desc&#x60;
     * @param {number} [offset] The (zero-based) offset of the first item in the collection to return.
     * @param {number} [limit] The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listConnectedAccounts: async (
      tilled_account: string,
      metadata?: { [key: string]: string },
      q?: string,
      sort?: string,
      offset?: number,
      limit?: number,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'tilled_account' is not null or undefined
      assertParamExists(
        "listConnectedAccounts",
        "tilled_account",
        tilled_account
      );
      const localVarPath = `/v1/accounts/connected`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "GET",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication JWT required
      // http bearer authentication required
      await setBearerAuthToObject(localVarHeaderParameter, configuration);

      // authentication TilledApiKey required
      await setApiKeyToObject(
        localVarHeaderParameter,
        "tilled-api-key",
        configuration
      );

      if (metadata !== undefined) {
        localVarQueryParameter["metadata"] = metadata;
      }

      if (q !== undefined) {
        localVarQueryParameter["q"] = q;
      }

      if (sort !== undefined) {
        localVarQueryParameter["sort"] = sort;
      }

      if (offset !== undefined) {
        localVarQueryParameter["offset"] = offset;
      }

      if (limit !== undefined) {
        localVarQueryParameter["limit"] = limit;
      }

      if (tilled_account != null) {
        localVarHeaderParameter["tilled-account"] = String(tilled_account);
      }

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Updates an account by setting the values of the parameters passed. Any parameters not provided are left unchanged.
     * @summary Update an Account
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {AccountUpdateParams} AccountUpdateParams
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateAccount: async (
      tilled_account: string,
      AccountUpdateParams: AccountUpdateParams,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'tilled_account' is not null or undefined
      assertParamExists("updateAccount", "tilled_account", tilled_account);
      // verify required parameter 'AccountUpdateParams' is not null or undefined
      assertParamExists(
        "updateAccount",
        "AccountUpdateParams",
        AccountUpdateParams
      );
      const localVarPath = `/v1/accounts`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "PATCH",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication JWT required
      // http bearer authentication required
      await setBearerAuthToObject(localVarHeaderParameter, configuration);

      // authentication TilledApiKey required
      await setApiKeyToObject(
        localVarHeaderParameter,
        "tilled-api-key",
        configuration
      );

      if (tilled_account != null) {
        localVarHeaderParameter["tilled-account"] = String(tilled_account);
      }

      localVarHeaderParameter["Content-Type"] = "application/json";

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      localVarRequestOptions.data = serializeDataIfNeeded(
        AccountUpdateParams,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Updates an account capability, account capabilities can only be managed prior to onboarding application submission.
     * @summary Update an Account Capability
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {string} id
     * @param {AccountCapabilityUpdateParams} AccountCapabilityUpdateParams
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateAccountCapability: async (
      tilled_account: string,
      id: string,
      AccountCapabilityUpdateParams: AccountCapabilityUpdateParams,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'tilled_account' is not null or undefined
      assertParamExists(
        "updateAccountCapability",
        "tilled_account",
        tilled_account
      );
      // verify required parameter 'id' is not null or undefined
      assertParamExists("updateAccountCapability", "id", id);
      // verify required parameter 'AccountCapabilityUpdateParams' is not null or undefined
      assertParamExists(
        "updateAccountCapability",
        "AccountCapabilityUpdateParams",
        AccountCapabilityUpdateParams
      );
      const localVarPath = `/v1/accounts/capabilities/{id}`.replace(
        `{${"id"}}`,
        encodeURIComponent(String(id))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "POST",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication JWT required
      // http bearer authentication required
      await setBearerAuthToObject(localVarHeaderParameter, configuration);

      // authentication TilledApiKey required
      await setApiKeyToObject(
        localVarHeaderParameter,
        "tilled-api-key",
        configuration
      );

      if (tilled_account != null) {
        localVarHeaderParameter["tilled-account"] = String(tilled_account);
      }

      localVarHeaderParameter["Content-Type"] = "application/json";

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      localVarRequestOptions.data = serializeDataIfNeeded(
        AccountCapabilityUpdateParams,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * AccountsApi - functional programming interface
 * @export
 */
export const AccountsApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator = AccountsApiAxiosParamCreator(configuration);
  return {
    /**
     * Adds an account capability, account capabilities can only be managed prior to onboarding application submission.
     * @summary Add an Account Capability
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {AccountCapabilityCreateParams} AccountCapabilityCreateParams
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async addAccountCapability(
      tilled_account: string,
      AccountCapabilityCreateParams: AccountCapabilityCreateParams,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.addAccountCapability(
          tilled_account,
          AccountCapabilityCreateParams,
          options
        );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
    /**
     * Creates a merchant account associated to your partner account.
     * @summary Create a Connected Account
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {AccountCreateParams} AccountCreateParams
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createConnectedAccount(
      tilled_account: string,
      AccountCreateParams: AccountCreateParams,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Account>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.createConnectedAccount(
          tilled_account,
          AccountCreateParams,
          options
        );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
    /**
     * Removes an account capability, account capabilities can only be managed prior to onboarding application submission.
     * @summary Delete an Account Capability
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async deleteAccountCapability(
      tilled_account: string,
      id: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.deleteAccountCapability(
          tilled_account,
          id,
          options
        );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
    /**
     * Deletes a merchant account.
     * @summary Delete a Connected Account
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async deleteConnectedAccount(
      tilled_account: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.deleteConnectedAccount(
          tilled_account,
          options
        );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
    /**
     * Retrieves the details of an account.
     * @summary Get an Account
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getAccount(
      tilled_account: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Account>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getAccount(
        tilled_account,
        options
      );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
    /**
     * Returns a list of accounts connected to your account. For merchant accounts, the list is empty.
     * @summary List all Connected Accounts
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {{ [key: string]: string; }} [metadata] &#x60;metadata&#x60; key-value pairs to filter by. Only exact matches on the key-value pair(s) will be returned. Example: &#x60;?metadata[internal_customer_id]&#x3D;7cb1159d-875e-47ae-a309-319fa7ff395b&#x60;.
     * @param {string} [q] The partial search of text fields. Supports searching by &#x60;account.name&#x60;, &#x60;account.business_profile.legal_name&#x60;, &#x60;account.id&#x60;, &#x60;account.email&#x60;, &#x60;user.name&#x60;, &#x60;user.email&#x60;
     * @param {string} [sort] The sort parameters, value:direction. Possible values: &#x60;name&#x60;, &#x60;created_at&#x60;. Possible directions:  &#x60;asc&#x60;, &#x60;desc&#x60;  For example &#x60;name:asc&#x60;.  Default: &#x60;created_at:desc&#x60;
     * @param {number} [offset] The (zero-based) offset of the first item in the collection to return.
     * @param {number} [limit] The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async listConnectedAccounts(
      tilled_account: string,
      metadata?: { [key: string]: string },
      q?: string,
      sort?: string,
      offset?: number,
      limit?: number,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<ListConnectedAccounts200Response>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.listConnectedAccounts(
          tilled_account,
          metadata,
          q,
          sort,
          offset,
          limit,
          options
        );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
    /**
     * Updates an account by setting the values of the parameters passed. Any parameters not provided are left unchanged.
     * @summary Update an Account
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {AccountUpdateParams} AccountUpdateParams
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async updateAccount(
      tilled_account: string,
      AccountUpdateParams: AccountUpdateParams,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Account>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.updateAccount(
        tilled_account,
        AccountUpdateParams,
        options
      );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
    /**
     * Updates an account capability, account capabilities can only be managed prior to onboarding application submission.
     * @summary Update an Account Capability
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {string} id
     * @param {AccountCapabilityUpdateParams} AccountCapabilityUpdateParams
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async updateAccountCapability(
      tilled_account: string,
      id: string,
      AccountCapabilityUpdateParams: AccountCapabilityUpdateParams,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.updateAccountCapability(
          tilled_account,
          id,
          AccountCapabilityUpdateParams,
          options
        );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
  };
};

/**
 * AccountsApi - factory interface
 * @export
 */
export const AccountsApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  const localVarFp = AccountsApiFp(configuration);
  return {
    /**
     * Adds an account capability, account capabilities can only be managed prior to onboarding application submission.
     * @summary Add an Account Capability
     * @param {AccountsApiAddAccountCapabilityRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    addAccountCapability(
      requestParameters: AccountsApiAddAccountCapabilityRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<void> {
      return localVarFp
        .addAccountCapability(
          requestParameters.tilled_account,
          requestParameters.AccountCapabilityCreateParams,
          options
        )
        .then((request) => request(axios, basePath));
    },
    /**
     * Creates a merchant account associated to your partner account.
     * @summary Create a Connected Account
     * @param {AccountsApiCreateConnectedAccountRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createConnectedAccount(
      requestParameters: AccountsApiCreateConnectedAccountRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<Account> {
      return localVarFp
        .createConnectedAccount(
          requestParameters.tilled_account,
          requestParameters.AccountCreateParams,
          options
        )
        .then((request) => request(axios, basePath));
    },
    /**
     * Removes an account capability, account capabilities can only be managed prior to onboarding application submission.
     * @summary Delete an Account Capability
     * @param {AccountsApiDeleteAccountCapabilityRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteAccountCapability(
      requestParameters: AccountsApiDeleteAccountCapabilityRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<void> {
      return localVarFp
        .deleteAccountCapability(
          requestParameters.tilled_account,
          requestParameters.id,
          options
        )
        .then((request) => request(axios, basePath));
    },
    /**
     * Deletes a merchant account.
     * @summary Delete a Connected Account
     * @param {AccountsApiDeleteConnectedAccountRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteConnectedAccount(
      requestParameters: AccountsApiDeleteConnectedAccountRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<void> {
      return localVarFp
        .deleteConnectedAccount(requestParameters.tilled_account, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Retrieves the details of an account.
     * @summary Get an Account
     * @param {AccountsApiGetAccountRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getAccount(
      requestParameters: AccountsApiGetAccountRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<Account> {
      return localVarFp
        .getAccount(requestParameters.tilled_account, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Returns a list of accounts connected to your account. For merchant accounts, the list is empty.
     * @summary List all Connected Accounts
     * @param {AccountsApiListConnectedAccountsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listConnectedAccounts(
      requestParameters: AccountsApiListConnectedAccountsRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<ListConnectedAccounts200Response> {
      return localVarFp
        .listConnectedAccounts(
          requestParameters.tilled_account,
          requestParameters.metadata,
          requestParameters.q,
          requestParameters.sort,
          requestParameters.offset,
          requestParameters.limit,
          options
        )
        .then((request) => request(axios, basePath));
    },
    /**
     * Updates an account by setting the values of the parameters passed. Any parameters not provided are left unchanged.
     * @summary Update an Account
     * @param {AccountsApiUpdateAccountRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateAccount(
      requestParameters: AccountsApiUpdateAccountRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<Account> {
      return localVarFp
        .updateAccount(
          requestParameters.tilled_account,
          requestParameters.AccountUpdateParams,
          options
        )
        .then((request) => request(axios, basePath));
    },
    /**
     * Updates an account capability, account capabilities can only be managed prior to onboarding application submission.
     * @summary Update an Account Capability
     * @param {AccountsApiUpdateAccountCapabilityRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateAccountCapability(
      requestParameters: AccountsApiUpdateAccountCapabilityRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<void> {
      return localVarFp
        .updateAccountCapability(
          requestParameters.tilled_account,
          requestParameters.id,
          requestParameters.AccountCapabilityUpdateParams,
          options
        )
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * Request parameters for addAccountCapability operation in AccountsApi.
 * @export
 * @interface AccountsApiAddAccountCapabilityRequest
 */
export interface AccountsApiAddAccountCapabilityRequest {
  /**
   * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @type {string}
   * @memberof AccountsApiAddAccountCapability
   */
  readonly tilled_account: string;

  /**
   *
   * @type {AccountCapabilityCreateParams}
   * @memberof AccountsApiAddAccountCapability
   */
  readonly AccountCapabilityCreateParams: AccountCapabilityCreateParams;
}

/**
 * Request parameters for createConnectedAccount operation in AccountsApi.
 * @export
 * @interface AccountsApiCreateConnectedAccountRequest
 */
export interface AccountsApiCreateConnectedAccountRequest {
  /**
   * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @type {string}
   * @memberof AccountsApiCreateConnectedAccount
   */
  readonly tilled_account: string;

  /**
   *
   * @type {AccountCreateParams}
   * @memberof AccountsApiCreateConnectedAccount
   */
  readonly AccountCreateParams: AccountCreateParams;
}

/**
 * Request parameters for deleteAccountCapability operation in AccountsApi.
 * @export
 * @interface AccountsApiDeleteAccountCapabilityRequest
 */
export interface AccountsApiDeleteAccountCapabilityRequest {
  /**
   * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @type {string}
   * @memberof AccountsApiDeleteAccountCapability
   */
  readonly tilled_account: string;

  /**
   *
   * @type {string}
   * @memberof AccountsApiDeleteAccountCapability
   */
  readonly id: string;
}

/**
 * Request parameters for deleteConnectedAccount operation in AccountsApi.
 * @export
 * @interface AccountsApiDeleteConnectedAccountRequest
 */
export interface AccountsApiDeleteConnectedAccountRequest {
  /**
   * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @type {string}
   * @memberof AccountsApiDeleteConnectedAccount
   */
  readonly tilled_account: string;
}

/**
 * Request parameters for getAccount operation in AccountsApi.
 * @export
 * @interface AccountsApiGetAccountRequest
 */
export interface AccountsApiGetAccountRequest {
  /**
   * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @type {string}
   * @memberof AccountsApiGetAccount
   */
  readonly tilled_account: string;
}

/**
 * Request parameters for listConnectedAccounts operation in AccountsApi.
 * @export
 * @interface AccountsApiListConnectedAccountsRequest
 */
export interface AccountsApiListConnectedAccountsRequest {
  /**
   * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @type {string}
   * @memberof AccountsApiListConnectedAccounts
   */
  readonly tilled_account: string;

  /**
   * &#x60;metadata&#x60; key-value pairs to filter by. Only exact matches on the key-value pair(s) will be returned. Example: &#x60;?metadata[internal_customer_id]&#x3D;7cb1159d-875e-47ae-a309-319fa7ff395b&#x60;.
   * @type {{ [key: string]: string; }}
   * @memberof AccountsApiListConnectedAccounts
   */
  readonly metadata?: { [key: string]: string };

  /**
   * The partial search of text fields. Supports searching by &#x60;account.name&#x60;, &#x60;account.business_profile.legal_name&#x60;, &#x60;account.id&#x60;, &#x60;account.email&#x60;, &#x60;user.name&#x60;, &#x60;user.email&#x60;
   * @type {string}
   * @memberof AccountsApiListConnectedAccounts
   */
  readonly q?: string;

  /**
   * The sort parameters, value:direction. Possible values: &#x60;name&#x60;, &#x60;created_at&#x60;. Possible directions:  &#x60;asc&#x60;, &#x60;desc&#x60;  For example &#x60;name:asc&#x60;.  Default: &#x60;created_at:desc&#x60;
   * @type {string}
   * @memberof AccountsApiListConnectedAccounts
   */
  readonly sort?: string;

  /**
   * The (zero-based) offset of the first item in the collection to return.
   * @type {number}
   * @memberof AccountsApiListConnectedAccounts
   */
  readonly offset?: number;

  /**
   * The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
   * @type {number}
   * @memberof AccountsApiListConnectedAccounts
   */
  readonly limit?: number;
}

/**
 * Request parameters for updateAccount operation in AccountsApi.
 * @export
 * @interface AccountsApiUpdateAccountRequest
 */
export interface AccountsApiUpdateAccountRequest {
  /**
   * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @type {string}
   * @memberof AccountsApiUpdateAccount
   */
  readonly tilled_account: string;

  /**
   *
   * @type {AccountUpdateParams}
   * @memberof AccountsApiUpdateAccount
   */
  readonly AccountUpdateParams: AccountUpdateParams;
}

/**
 * Request parameters for updateAccountCapability operation in AccountsApi.
 * @export
 * @interface AccountsApiUpdateAccountCapabilityRequest
 */
export interface AccountsApiUpdateAccountCapabilityRequest {
  /**
   * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @type {string}
   * @memberof AccountsApiUpdateAccountCapability
   */
  readonly tilled_account: string;

  /**
   *
   * @type {string}
   * @memberof AccountsApiUpdateAccountCapability
   */
  readonly id: string;

  /**
   *
   * @type {AccountCapabilityUpdateParams}
   * @memberof AccountsApiUpdateAccountCapability
   */
  readonly AccountCapabilityUpdateParams: AccountCapabilityUpdateParams;
}

/**
 * AccountsApi - object-oriented interface
 * @export
 * @class AccountsApi
 * @extends {BaseAPI}
 */
export class AccountsApi extends BaseAPI {
  /**
   * Adds an account capability, account capabilities can only be managed prior to onboarding application submission.
   * @summary Add an Account Capability
   * @param {AccountsApiAddAccountCapabilityRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountsApi
   */
  public addAccountCapability(
    requestParameters: AccountsApiAddAccountCapabilityRequest,
    options?: AxiosRequestConfig
  ) {
    return AccountsApiFp(this.configuration)
      .addAccountCapability(
        requestParameters.tilled_account,
        requestParameters.AccountCapabilityCreateParams,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Creates a merchant account associated to your partner account.
   * @summary Create a Connected Account
   * @param {AccountsApiCreateConnectedAccountRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountsApi
   */
  public createConnectedAccount(
    requestParameters: AccountsApiCreateConnectedAccountRequest,
    options?: AxiosRequestConfig
  ) {
    return AccountsApiFp(this.configuration)
      .createConnectedAccount(
        requestParameters.tilled_account,
        requestParameters.AccountCreateParams,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Removes an account capability, account capabilities can only be managed prior to onboarding application submission.
   * @summary Delete an Account Capability
   * @param {AccountsApiDeleteAccountCapabilityRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountsApi
   */
  public deleteAccountCapability(
    requestParameters: AccountsApiDeleteAccountCapabilityRequest,
    options?: AxiosRequestConfig
  ) {
    return AccountsApiFp(this.configuration)
      .deleteAccountCapability(
        requestParameters.tilled_account,
        requestParameters.id,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Deletes a merchant account.
   * @summary Delete a Connected Account
   * @param {AccountsApiDeleteConnectedAccountRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountsApi
   */
  public deleteConnectedAccount(
    requestParameters: AccountsApiDeleteConnectedAccountRequest,
    options?: AxiosRequestConfig
  ) {
    return AccountsApiFp(this.configuration)
      .deleteConnectedAccount(requestParameters.tilled_account, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Retrieves the details of an account.
   * @summary Get an Account
   * @param {AccountsApiGetAccountRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountsApi
   */
  public getAccount(
    requestParameters: AccountsApiGetAccountRequest,
    options?: AxiosRequestConfig
  ) {
    return AccountsApiFp(this.configuration)
      .getAccount(requestParameters.tilled_account, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Returns a list of accounts connected to your account. For merchant accounts, the list is empty.
   * @summary List all Connected Accounts
   * @param {AccountsApiListConnectedAccountsRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountsApi
   */
  public listConnectedAccounts(
    requestParameters: AccountsApiListConnectedAccountsRequest,
    options?: AxiosRequestConfig
  ) {
    return AccountsApiFp(this.configuration)
      .listConnectedAccounts(
        requestParameters.tilled_account,
        requestParameters.metadata,
        requestParameters.q,
        requestParameters.sort,
        requestParameters.offset,
        requestParameters.limit,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Updates an account by setting the values of the parameters passed. Any parameters not provided are left unchanged.
   * @summary Update an Account
   * @param {AccountsApiUpdateAccountRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountsApi
   */
  public updateAccount(
    requestParameters: AccountsApiUpdateAccountRequest,
    options?: AxiosRequestConfig
  ) {
    return AccountsApiFp(this.configuration)
      .updateAccount(
        requestParameters.tilled_account,
        requestParameters.AccountUpdateParams,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Updates an account capability, account capabilities can only be managed prior to onboarding application submission.
   * @summary Update an Account Capability
   * @param {AccountsApiUpdateAccountCapabilityRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountsApi
   */
  public updateAccountCapability(
    requestParameters: AccountsApiUpdateAccountCapabilityRequest,
    options?: AxiosRequestConfig
  ) {
    return AccountsApiFp(this.configuration)
      .updateAccountCapability(
        requestParameters.tilled_account,
        requestParameters.id,
        requestParameters.AccountCapabilityUpdateParams,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }
}
