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
import { ListSubscriptions200Response } from "../model";
// @ts-ignore
import { Subscription } from "../model";
// @ts-ignore
import { SubscriptionCreateParams } from "../model";
// @ts-ignore
import { SubscriptionPauseParams } from "../model";
// @ts-ignore
import { SubscriptionRetryParams } from "../model";
// @ts-ignore
import { SubscriptionUpdateParams } from "../model";
/**
 * SubscriptionsApi - axios parameter creator
 * @export
 */
export const SubscriptionsApiAxiosParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     * Cancels a customer\'s subscription immediately. The customer will not be charged again for the subscription.
     * @summary Cancel a Subscription
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cancelSubscription: async (
      tilled_account: string,
      id: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'tilled_account' is not null or undefined
      assertParamExists("cancelSubscription", "tilled_account", tilled_account);
      // verify required parameter 'id' is not null or undefined
      assertParamExists("cancelSubscription", "id", id);
      const localVarPath = `/v1/subscriptions/{id}/cancel`.replace(
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
     * Creates a new subscription on an existing customer.
     * @summary Create a Subscription
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {SubscriptionCreateParams} SubscriptionCreateParams
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createSubscription: async (
      tilled_account: string,
      SubscriptionCreateParams: SubscriptionCreateParams,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'tilled_account' is not null or undefined
      assertParamExists("createSubscription", "tilled_account", tilled_account);
      // verify required parameter 'SubscriptionCreateParams' is not null or undefined
      assertParamExists(
        "createSubscription",
        "SubscriptionCreateParams",
        SubscriptionCreateParams
      );
      const localVarPath = `/v1/subscriptions`;
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
        SubscriptionCreateParams,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Retrieves the subscription with the given ID.
     * @summary Get a Subscription
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getSubscription: async (
      tilled_account: string,
      id: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'tilled_account' is not null or undefined
      assertParamExists("getSubscription", "tilled_account", tilled_account);
      // verify required parameter 'id' is not null or undefined
      assertParamExists("getSubscription", "id", id);
      const localVarPath = `/v1/subscriptions/{id}`.replace(
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
     * Returns a list of your subscriptions.
     * @summary List all Subscriptions
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {{ [key: string]: string; }} [metadata] &#x60;metadata&#x60; key-value pairs to filter by. Only exact matches on the key-value pair(s) will be returned. Example: &#x60;?metadata[internal_customer_id]&#x3D;7cb1159d-875e-47ae-a309-319fa7ff395b&#x60;.
     * @param {string} [customer_id] The ID of the customer whose subscriptions will be retrieved.
     * @param {'active' | 'canceled' | 'past_due' | 'paused' | 'pending'} [status] The status of the subscriptions to retrieve.
     * @param {string} [next_payment_at_lte] Maximum &#x60;next_payment_at&#x60; value to filter by (inclusive).
     * @param {string} [next_payment_at_gte] Minimum &#x60;next_payment_at&#x60; value to filter by (inclusive).
     * @param {number} [offset] The (zero-based) offset of the first item in the collection to return.
     * @param {number} [limit] The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listSubscriptions: async (
      tilled_account: string,
      metadata?: { [key: string]: string },
      customer_id?: string,
      status?: "active" | "canceled" | "past_due" | "paused" | "pending",
      next_payment_at_lte?: string,
      next_payment_at_gte?: string,
      offset?: number,
      limit?: number,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'tilled_account' is not null or undefined
      assertParamExists("listSubscriptions", "tilled_account", tilled_account);
      const localVarPath = `/v1/subscriptions`;
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

      if (customer_id !== undefined) {
        localVarQueryParameter["customer_id"] = customer_id;
      }

      if (status !== undefined) {
        localVarQueryParameter["status"] = status;
      }

      if (next_payment_at_lte !== undefined) {
        localVarQueryParameter["next_payment_at_lte"] =
          (next_payment_at_lte as any) instanceof Date
            ? (next_payment_at_lte as any).toISOString()
            : next_payment_at_lte;
      }

      if (next_payment_at_gte !== undefined) {
        localVarQueryParameter["next_payment_at_gte"] =
          (next_payment_at_gte as any) instanceof Date
            ? (next_payment_at_gte as any).toISOString()
            : next_payment_at_gte;
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
     * Pauses a subscription from generating payments until the (optionally) specified `resumes_at` date.
     * @summary Pause a Subscription
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {string} id
     * @param {SubscriptionPauseParams} SubscriptionPauseParams
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    pauseSubscription: async (
      tilled_account: string,
      id: string,
      SubscriptionPauseParams: SubscriptionPauseParams,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'tilled_account' is not null or undefined
      assertParamExists("pauseSubscription", "tilled_account", tilled_account);
      // verify required parameter 'id' is not null or undefined
      assertParamExists("pauseSubscription", "id", id);
      // verify required parameter 'SubscriptionPauseParams' is not null or undefined
      assertParamExists(
        "pauseSubscription",
        "SubscriptionPauseParams",
        SubscriptionPauseParams
      );
      const localVarPath = `/v1/subscriptions/{id}/pause`.replace(
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
        SubscriptionPauseParams,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Resumes a paused subscription immediately. The next charge will occur on the normally scheduled billing cycle.
     * @summary Resume a Subscription
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    resumeSubscription: async (
      tilled_account: string,
      id: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'tilled_account' is not null or undefined
      assertParamExists("resumeSubscription", "tilled_account", tilled_account);
      // verify required parameter 'id' is not null or undefined
      assertParamExists("resumeSubscription", "id", id);
      const localVarPath = `/v1/subscriptions/{id}/resume`.replace(
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
     * Retry a subscription payment at the (optionally) specified `next_payment_at` date.
     * @summary Retry a Subscription
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {string} id
     * @param {SubscriptionRetryParams} SubscriptionRetryParams
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    retrySubscription: async (
      tilled_account: string,
      id: string,
      SubscriptionRetryParams: SubscriptionRetryParams,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'tilled_account' is not null or undefined
      assertParamExists("retrySubscription", "tilled_account", tilled_account);
      // verify required parameter 'id' is not null or undefined
      assertParamExists("retrySubscription", "id", id);
      // verify required parameter 'SubscriptionRetryParams' is not null or undefined
      assertParamExists(
        "retrySubscription",
        "SubscriptionRetryParams",
        SubscriptionRetryParams
      );
      const localVarPath = `/v1/subscriptions/{id}/retry`.replace(
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
        SubscriptionRetryParams,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Update an existing subscription to match the specified parameters.
     * @summary Update a Subscription
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {string} id
     * @param {SubscriptionUpdateParams} SubscriptionUpdateParams
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateSubscription: async (
      tilled_account: string,
      id: string,
      SubscriptionUpdateParams: SubscriptionUpdateParams,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'tilled_account' is not null or undefined
      assertParamExists("updateSubscription", "tilled_account", tilled_account);
      // verify required parameter 'id' is not null or undefined
      assertParamExists("updateSubscription", "id", id);
      // verify required parameter 'SubscriptionUpdateParams' is not null or undefined
      assertParamExists(
        "updateSubscription",
        "SubscriptionUpdateParams",
        SubscriptionUpdateParams
      );
      const localVarPath = `/v1/subscriptions/{id}`.replace(
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
        SubscriptionUpdateParams,
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
 * SubscriptionsApi - functional programming interface
 * @export
 */
export const SubscriptionsApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator =
    SubscriptionsApiAxiosParamCreator(configuration);
  return {
    /**
     * Cancels a customer\'s subscription immediately. The customer will not be charged again for the subscription.
     * @summary Cancel a Subscription
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async cancelSubscription(
      tilled_account: string,
      id: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Subscription>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.cancelSubscription(
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
     * Creates a new subscription on an existing customer.
     * @summary Create a Subscription
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {SubscriptionCreateParams} SubscriptionCreateParams
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createSubscription(
      tilled_account: string,
      SubscriptionCreateParams: SubscriptionCreateParams,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Subscription>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.createSubscription(
          tilled_account,
          SubscriptionCreateParams,
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
     * Retrieves the subscription with the given ID.
     * @summary Get a Subscription
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getSubscription(
      tilled_account: string,
      id: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Subscription>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getSubscription(
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
     * Returns a list of your subscriptions.
     * @summary List all Subscriptions
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {{ [key: string]: string; }} [metadata] &#x60;metadata&#x60; key-value pairs to filter by. Only exact matches on the key-value pair(s) will be returned. Example: &#x60;?metadata[internal_customer_id]&#x3D;7cb1159d-875e-47ae-a309-319fa7ff395b&#x60;.
     * @param {string} [customer_id] The ID of the customer whose subscriptions will be retrieved.
     * @param {'active' | 'canceled' | 'past_due' | 'paused' | 'pending'} [status] The status of the subscriptions to retrieve.
     * @param {string} [next_payment_at_lte] Maximum &#x60;next_payment_at&#x60; value to filter by (inclusive).
     * @param {string} [next_payment_at_gte] Minimum &#x60;next_payment_at&#x60; value to filter by (inclusive).
     * @param {number} [offset] The (zero-based) offset of the first item in the collection to return.
     * @param {number} [limit] The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async listSubscriptions(
      tilled_account: string,
      metadata?: { [key: string]: string },
      customer_id?: string,
      status?: "active" | "canceled" | "past_due" | "paused" | "pending",
      next_payment_at_lte?: string,
      next_payment_at_gte?: string,
      offset?: number,
      limit?: number,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<ListSubscriptions200Response>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.listSubscriptions(
          tilled_account,
          metadata,
          customer_id,
          status,
          next_payment_at_lte,
          next_payment_at_gte,
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
     * Pauses a subscription from generating payments until the (optionally) specified `resumes_at` date.
     * @summary Pause a Subscription
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {string} id
     * @param {SubscriptionPauseParams} SubscriptionPauseParams
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async pauseSubscription(
      tilled_account: string,
      id: string,
      SubscriptionPauseParams: SubscriptionPauseParams,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Subscription>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.pauseSubscription(
          tilled_account,
          id,
          SubscriptionPauseParams,
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
     * Resumes a paused subscription immediately. The next charge will occur on the normally scheduled billing cycle.
     * @summary Resume a Subscription
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async resumeSubscription(
      tilled_account: string,
      id: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Subscription>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.resumeSubscription(
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
     * Retry a subscription payment at the (optionally) specified `next_payment_at` date.
     * @summary Retry a Subscription
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {string} id
     * @param {SubscriptionRetryParams} SubscriptionRetryParams
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async retrySubscription(
      tilled_account: string,
      id: string,
      SubscriptionRetryParams: SubscriptionRetryParams,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Subscription>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.retrySubscription(
          tilled_account,
          id,
          SubscriptionRetryParams,
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
     * Update an existing subscription to match the specified parameters.
     * @summary Update a Subscription
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {string} id
     * @param {SubscriptionUpdateParams} SubscriptionUpdateParams
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async updateSubscription(
      tilled_account: string,
      id: string,
      SubscriptionUpdateParams: SubscriptionUpdateParams,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<Subscription>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.updateSubscription(
          tilled_account,
          id,
          SubscriptionUpdateParams,
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
 * SubscriptionsApi - factory interface
 * @export
 */
export const SubscriptionsApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  const localVarFp = SubscriptionsApiFp(configuration);
  return {
    /**
     * Cancels a customer\'s subscription immediately. The customer will not be charged again for the subscription.
     * @summary Cancel a Subscription
     * @param {SubscriptionsApiCancelSubscriptionRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cancelSubscription(
      requestParameters: SubscriptionsApiCancelSubscriptionRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<Subscription> {
      return localVarFp
        .cancelSubscription(
          requestParameters.tilled_account,
          requestParameters.id,
          options
        )
        .then((request) => request(axios, basePath));
    },
    /**
     * Creates a new subscription on an existing customer.
     * @summary Create a Subscription
     * @param {SubscriptionsApiCreateSubscriptionRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createSubscription(
      requestParameters: SubscriptionsApiCreateSubscriptionRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<Subscription> {
      return localVarFp
        .createSubscription(
          requestParameters.tilled_account,
          requestParameters.SubscriptionCreateParams,
          options
        )
        .then((request) => request(axios, basePath));
    },
    /**
     * Retrieves the subscription with the given ID.
     * @summary Get a Subscription
     * @param {SubscriptionsApiGetSubscriptionRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getSubscription(
      requestParameters: SubscriptionsApiGetSubscriptionRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<Subscription> {
      return localVarFp
        .getSubscription(
          requestParameters.tilled_account,
          requestParameters.id,
          options
        )
        .then((request) => request(axios, basePath));
    },
    /**
     * Returns a list of your subscriptions.
     * @summary List all Subscriptions
     * @param {SubscriptionsApiListSubscriptionsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listSubscriptions(
      requestParameters: SubscriptionsApiListSubscriptionsRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<ListSubscriptions200Response> {
      return localVarFp
        .listSubscriptions(
          requestParameters.tilled_account,
          requestParameters.metadata,
          requestParameters.customer_id,
          requestParameters.status,
          requestParameters.next_payment_at_lte,
          requestParameters.next_payment_at_gte,
          requestParameters.offset,
          requestParameters.limit,
          options
        )
        .then((request) => request(axios, basePath));
    },
    /**
     * Pauses a subscription from generating payments until the (optionally) specified `resumes_at` date.
     * @summary Pause a Subscription
     * @param {SubscriptionsApiPauseSubscriptionRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    pauseSubscription(
      requestParameters: SubscriptionsApiPauseSubscriptionRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<Subscription> {
      return localVarFp
        .pauseSubscription(
          requestParameters.tilled_account,
          requestParameters.id,
          requestParameters.SubscriptionPauseParams,
          options
        )
        .then((request) => request(axios, basePath));
    },
    /**
     * Resumes a paused subscription immediately. The next charge will occur on the normally scheduled billing cycle.
     * @summary Resume a Subscription
     * @param {SubscriptionsApiResumeSubscriptionRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    resumeSubscription(
      requestParameters: SubscriptionsApiResumeSubscriptionRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<Subscription> {
      return localVarFp
        .resumeSubscription(
          requestParameters.tilled_account,
          requestParameters.id,
          options
        )
        .then((request) => request(axios, basePath));
    },
    /**
     * Retry a subscription payment at the (optionally) specified `next_payment_at` date.
     * @summary Retry a Subscription
     * @param {SubscriptionsApiRetrySubscriptionRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    retrySubscription(
      requestParameters: SubscriptionsApiRetrySubscriptionRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<Subscription> {
      return localVarFp
        .retrySubscription(
          requestParameters.tilled_account,
          requestParameters.id,
          requestParameters.SubscriptionRetryParams,
          options
        )
        .then((request) => request(axios, basePath));
    },
    /**
     * Update an existing subscription to match the specified parameters.
     * @summary Update a Subscription
     * @param {SubscriptionsApiUpdateSubscriptionRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateSubscription(
      requestParameters: SubscriptionsApiUpdateSubscriptionRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<Subscription> {
      return localVarFp
        .updateSubscription(
          requestParameters.tilled_account,
          requestParameters.id,
          requestParameters.SubscriptionUpdateParams,
          options
        )
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * Request parameters for cancelSubscription operation in SubscriptionsApi.
 * @export
 * @interface SubscriptionsApiCancelSubscriptionRequest
 */
export interface SubscriptionsApiCancelSubscriptionRequest {
  /**
   * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @type {string}
   * @memberof SubscriptionsApiCancelSubscription
   */
  readonly tilled_account: string;

  /**
   *
   * @type {string}
   * @memberof SubscriptionsApiCancelSubscription
   */
  readonly id: string;
}

/**
 * Request parameters for createSubscription operation in SubscriptionsApi.
 * @export
 * @interface SubscriptionsApiCreateSubscriptionRequest
 */
export interface SubscriptionsApiCreateSubscriptionRequest {
  /**
   * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @type {string}
   * @memberof SubscriptionsApiCreateSubscription
   */
  readonly tilled_account: string;

  /**
   *
   * @type {SubscriptionCreateParams}
   * @memberof SubscriptionsApiCreateSubscription
   */
  readonly SubscriptionCreateParams: SubscriptionCreateParams;
}

/**
 * Request parameters for getSubscription operation in SubscriptionsApi.
 * @export
 * @interface SubscriptionsApiGetSubscriptionRequest
 */
export interface SubscriptionsApiGetSubscriptionRequest {
  /**
   * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @type {string}
   * @memberof SubscriptionsApiGetSubscription
   */
  readonly tilled_account: string;

  /**
   *
   * @type {string}
   * @memberof SubscriptionsApiGetSubscription
   */
  readonly id: string;
}

/**
 * Request parameters for listSubscriptions operation in SubscriptionsApi.
 * @export
 * @interface SubscriptionsApiListSubscriptionsRequest
 */
export interface SubscriptionsApiListSubscriptionsRequest {
  /**
   * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @type {string}
   * @memberof SubscriptionsApiListSubscriptions
   */
  readonly tilled_account: string;

  /**
   * &#x60;metadata&#x60; key-value pairs to filter by. Only exact matches on the key-value pair(s) will be returned. Example: &#x60;?metadata[internal_customer_id]&#x3D;7cb1159d-875e-47ae-a309-319fa7ff395b&#x60;.
   * @type {{ [key: string]: string; }}
   * @memberof SubscriptionsApiListSubscriptions
   */
  readonly metadata?: { [key: string]: string };

  /**
   * The ID of the customer whose subscriptions will be retrieved.
   * @type {string}
   * @memberof SubscriptionsApiListSubscriptions
   */
  readonly customer_id?: string;

  /**
   * The status of the subscriptions to retrieve.
   * @type {'active' | 'canceled' | 'past_due' | 'paused' | 'pending'}
   * @memberof SubscriptionsApiListSubscriptions
   */
  readonly status?: "active" | "canceled" | "past_due" | "paused" | "pending";

  /**
   * Maximum &#x60;next_payment_at&#x60; value to filter by (inclusive).
   * @type {string}
   * @memberof SubscriptionsApiListSubscriptions
   */
  readonly next_payment_at_lte?: string;

  /**
   * Minimum &#x60;next_payment_at&#x60; value to filter by (inclusive).
   * @type {string}
   * @memberof SubscriptionsApiListSubscriptions
   */
  readonly next_payment_at_gte?: string;

  /**
   * The (zero-based) offset of the first item in the collection to return.
   * @type {number}
   * @memberof SubscriptionsApiListSubscriptions
   */
  readonly offset?: number;

  /**
   * The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
   * @type {number}
   * @memberof SubscriptionsApiListSubscriptions
   */
  readonly limit?: number;
}

/**
 * Request parameters for pauseSubscription operation in SubscriptionsApi.
 * @export
 * @interface SubscriptionsApiPauseSubscriptionRequest
 */
export interface SubscriptionsApiPauseSubscriptionRequest {
  /**
   * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @type {string}
   * @memberof SubscriptionsApiPauseSubscription
   */
  readonly tilled_account: string;

  /**
   *
   * @type {string}
   * @memberof SubscriptionsApiPauseSubscription
   */
  readonly id: string;

  /**
   *
   * @type {SubscriptionPauseParams}
   * @memberof SubscriptionsApiPauseSubscription
   */
  readonly SubscriptionPauseParams: SubscriptionPauseParams;
}

/**
 * Request parameters for resumeSubscription operation in SubscriptionsApi.
 * @export
 * @interface SubscriptionsApiResumeSubscriptionRequest
 */
export interface SubscriptionsApiResumeSubscriptionRequest {
  /**
   * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @type {string}
   * @memberof SubscriptionsApiResumeSubscription
   */
  readonly tilled_account: string;

  /**
   *
   * @type {string}
   * @memberof SubscriptionsApiResumeSubscription
   */
  readonly id: string;
}

/**
 * Request parameters for retrySubscription operation in SubscriptionsApi.
 * @export
 * @interface SubscriptionsApiRetrySubscriptionRequest
 */
export interface SubscriptionsApiRetrySubscriptionRequest {
  /**
   * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @type {string}
   * @memberof SubscriptionsApiRetrySubscription
   */
  readonly tilled_account: string;

  /**
   *
   * @type {string}
   * @memberof SubscriptionsApiRetrySubscription
   */
  readonly id: string;

  /**
   *
   * @type {SubscriptionRetryParams}
   * @memberof SubscriptionsApiRetrySubscription
   */
  readonly SubscriptionRetryParams: SubscriptionRetryParams;
}

/**
 * Request parameters for updateSubscription operation in SubscriptionsApi.
 * @export
 * @interface SubscriptionsApiUpdateSubscriptionRequest
 */
export interface SubscriptionsApiUpdateSubscriptionRequest {
  /**
   * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @type {string}
   * @memberof SubscriptionsApiUpdateSubscription
   */
  readonly tilled_account: string;

  /**
   *
   * @type {string}
   * @memberof SubscriptionsApiUpdateSubscription
   */
  readonly id: string;

  /**
   *
   * @type {SubscriptionUpdateParams}
   * @memberof SubscriptionsApiUpdateSubscription
   */
  readonly SubscriptionUpdateParams: SubscriptionUpdateParams;
}

/**
 * SubscriptionsApi - object-oriented interface
 * @export
 * @class SubscriptionsApi
 * @extends {BaseAPI}
 */
export class SubscriptionsApi extends BaseAPI {
  /**
   * Cancels a customer\'s subscription immediately. The customer will not be charged again for the subscription.
   * @summary Cancel a Subscription
   * @param {SubscriptionsApiCancelSubscriptionRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SubscriptionsApi
   */
  public cancelSubscription(
    requestParameters: SubscriptionsApiCancelSubscriptionRequest,
    options?: AxiosRequestConfig
  ) {
    return SubscriptionsApiFp(this.configuration)
      .cancelSubscription(
        requestParameters.tilled_account,
        requestParameters.id,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Creates a new subscription on an existing customer.
   * @summary Create a Subscription
   * @param {SubscriptionsApiCreateSubscriptionRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SubscriptionsApi
   */
  public createSubscription(
    requestParameters: SubscriptionsApiCreateSubscriptionRequest,
    options?: AxiosRequestConfig
  ) {
    return SubscriptionsApiFp(this.configuration)
      .createSubscription(
        requestParameters.tilled_account,
        requestParameters.SubscriptionCreateParams,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Retrieves the subscription with the given ID.
   * @summary Get a Subscription
   * @param {SubscriptionsApiGetSubscriptionRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SubscriptionsApi
   */
  public getSubscription(
    requestParameters: SubscriptionsApiGetSubscriptionRequest,
    options?: AxiosRequestConfig
  ) {
    return SubscriptionsApiFp(this.configuration)
      .getSubscription(
        requestParameters.tilled_account,
        requestParameters.id,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Returns a list of your subscriptions.
   * @summary List all Subscriptions
   * @param {SubscriptionsApiListSubscriptionsRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SubscriptionsApi
   */
  public listSubscriptions(
    requestParameters: SubscriptionsApiListSubscriptionsRequest,
    options?: AxiosRequestConfig
  ) {
    return SubscriptionsApiFp(this.configuration)
      .listSubscriptions(
        requestParameters.tilled_account,
        requestParameters.metadata,
        requestParameters.customer_id,
        requestParameters.status,
        requestParameters.next_payment_at_lte,
        requestParameters.next_payment_at_gte,
        requestParameters.offset,
        requestParameters.limit,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Pauses a subscription from generating payments until the (optionally) specified `resumes_at` date.
   * @summary Pause a Subscription
   * @param {SubscriptionsApiPauseSubscriptionRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SubscriptionsApi
   */
  public pauseSubscription(
    requestParameters: SubscriptionsApiPauseSubscriptionRequest,
    options?: AxiosRequestConfig
  ) {
    return SubscriptionsApiFp(this.configuration)
      .pauseSubscription(
        requestParameters.tilled_account,
        requestParameters.id,
        requestParameters.SubscriptionPauseParams,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Resumes a paused subscription immediately. The next charge will occur on the normally scheduled billing cycle.
   * @summary Resume a Subscription
   * @param {SubscriptionsApiResumeSubscriptionRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SubscriptionsApi
   */
  public resumeSubscription(
    requestParameters: SubscriptionsApiResumeSubscriptionRequest,
    options?: AxiosRequestConfig
  ) {
    return SubscriptionsApiFp(this.configuration)
      .resumeSubscription(
        requestParameters.tilled_account,
        requestParameters.id,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Retry a subscription payment at the (optionally) specified `next_payment_at` date.
   * @summary Retry a Subscription
   * @param {SubscriptionsApiRetrySubscriptionRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SubscriptionsApi
   */
  public retrySubscription(
    requestParameters: SubscriptionsApiRetrySubscriptionRequest,
    options?: AxiosRequestConfig
  ) {
    return SubscriptionsApiFp(this.configuration)
      .retrySubscription(
        requestParameters.tilled_account,
        requestParameters.id,
        requestParameters.SubscriptionRetryParams,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Update an existing subscription to match the specified parameters.
   * @summary Update a Subscription
   * @param {SubscriptionsApiUpdateSubscriptionRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SubscriptionsApi
   */
  public updateSubscription(
    requestParameters: SubscriptionsApiUpdateSubscriptionRequest,
    options?: AxiosRequestConfig
  ) {
    return SubscriptionsApiFp(this.configuration)
      .updateSubscription(
        requestParameters.tilled_account,
        requestParameters.id,
        requestParameters.SubscriptionUpdateParams,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }
}
