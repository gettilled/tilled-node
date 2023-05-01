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
import { ListPaymentIntents200Response } from "../model";
// @ts-ignore
import { PaymentIntent } from "../model";
// @ts-ignore
import { PaymentIntentCancelParams } from "../model";
// @ts-ignore
import { PaymentIntentCaptureParams } from "../model";
// @ts-ignore
import { PaymentIntentConfirmParams } from "../model";
// @ts-ignore
import { PaymentIntentCreateParams } from "../model";
// @ts-ignore
import { PaymentIntentUpdateParams } from "../model";
/**
 * PaymentIntentsApi - axios parameter creator
 * @export
 */
export const PaymentIntentsApiAxiosParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     * A PaymentIntent object can be canceled when it is in one of these statuses: `requires_payment_method`, `requires_capture`, `requires_confirmation`, or `requires_action`.  Once canceled, no additional charges will be made by the PaymentIntent and any operations on the PaymentIntent will fail with an error.
     * @summary Cancel a Payment Intent
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {string} id
     * @param {PaymentIntentCancelParams} PaymentIntentCancelParams
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cancelPaymentIntent: async (
      tilled_account: string,
      id: string,
      PaymentIntentCancelParams: PaymentIntentCancelParams,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'tilled_account' is not null or undefined
      assertParamExists(
        "cancelPaymentIntent",
        "tilled_account",
        tilled_account
      );
      // verify required parameter 'id' is not null or undefined
      assertParamExists("cancelPaymentIntent", "id", id);
      // verify required parameter 'PaymentIntentCancelParams' is not null or undefined
      assertParamExists(
        "cancelPaymentIntent",
        "PaymentIntentCancelParams",
        PaymentIntentCancelParams
      );
      const localVarPath = `/v1/payment-intents/{id}/cancel`.replace(
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
        PaymentIntentCancelParams,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Capture the funds of an existing uncaptured PaymentIntent when its status is `requires_capture`. Uncaptured PaymentIntents will be canceled exactly 7 days after they are created.
     * @summary Capture a Payment Intent
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {string} id
     * @param {PaymentIntentCaptureParams} PaymentIntentCaptureParams
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    capturePaymentIntent: async (
      tilled_account: string,
      id: string,
      PaymentIntentCaptureParams: PaymentIntentCaptureParams,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'tilled_account' is not null or undefined
      assertParamExists(
        "capturePaymentIntent",
        "tilled_account",
        tilled_account
      );
      // verify required parameter 'id' is not null or undefined
      assertParamExists("capturePaymentIntent", "id", id);
      // verify required parameter 'PaymentIntentCaptureParams' is not null or undefined
      assertParamExists(
        "capturePaymentIntent",
        "PaymentIntentCaptureParams",
        PaymentIntentCaptureParams
      );
      const localVarPath = `/v1/payment-intents/{id}/capture`.replace(
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
        PaymentIntentCaptureParams,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Confirm that your customer intends to pay with current or provided payment method. Upon confirmation, the PaymentIntent will attempt to initiate a payment.  If the selected payment method requires additional steps, the PaymentIntent will transition to the `requires_action` status. If payment fails, the PaymentIntent will transition to the `requires_payment_method` status. If payment succeeds, the PaymentIntent will transition to the `succeeded` status (or `requires_capture`, if `capture_method` is set to `manual`).  Payment may be attempted using our `tilled.js` and the PaymentIntent’s `client_secret`.
     * @summary Confirm a Payment Intent
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {string} id
     * @param {PaymentIntentConfirmParams} PaymentIntentConfirmParams
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    confirmPaymentIntent: async (
      tilled_account: string,
      id: string,
      PaymentIntentConfirmParams: PaymentIntentConfirmParams,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'tilled_account' is not null or undefined
      assertParamExists(
        "confirmPaymentIntent",
        "tilled_account",
        tilled_account
      );
      // verify required parameter 'id' is not null or undefined
      assertParamExists("confirmPaymentIntent", "id", id);
      // verify required parameter 'PaymentIntentConfirmParams' is not null or undefined
      assertParamExists(
        "confirmPaymentIntent",
        "PaymentIntentConfirmParams",
        PaymentIntentConfirmParams
      );
      const localVarPath = `/v1/payment-intents/{id}/confirm`.replace(
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
        PaymentIntentConfirmParams,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * After the PaymentIntent is created, attach a payment method and confirm to continue the payment. You can read more about the different payment flows available via the Payment Intents API here<TBD>.  When `confirm=true` is used during creation, it is equivalent to creating and confirming the PaymentIntent in the same call. You may use any parameters available in the confirm API when `confirm=true` is supplied.
     * @summary Create a Payment Intent
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {PaymentIntentCreateParams} PaymentIntentCreateParams
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createPaymentIntent: async (
      tilled_account: string,
      PaymentIntentCreateParams: PaymentIntentCreateParams,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'tilled_account' is not null or undefined
      assertParamExists(
        "createPaymentIntent",
        "tilled_account",
        tilled_account
      );
      // verify required parameter 'PaymentIntentCreateParams' is not null or undefined
      assertParamExists(
        "createPaymentIntent",
        "PaymentIntentCreateParams",
        PaymentIntentCreateParams
      );
      const localVarPath = `/v1/payment-intents`;
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
        PaymentIntentCreateParams,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * Retrieves the details of a PaymentIntent that has previously been created.
     * @summary Get a Payment Intent
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getPaymentIntent: async (
      tilled_account: string,
      id: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'tilled_account' is not null or undefined
      assertParamExists("getPaymentIntent", "tilled_account", tilled_account);
      // verify required parameter 'id' is not null or undefined
      assertParamExists("getPaymentIntent", "id", id);
      const localVarPath = `/v1/payment-intents/{id}`.replace(
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
     * Returns a list of PaymentIntents.
     * @summary List all Payment Intents
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {{ [key: string]: string; }} [metadata] &#x60;metadata&#x60; key-value pairs to filter by. Only exact matches on the key-value pair(s) will be returned. Example: &#x60;?metadata[internal_customer_id]&#x3D;7cb1159d-875e-47ae-a309-319fa7ff395b&#x60;.
     * @param {string} [created_at_gte] Minimum &#x60;created_at&#x60; value to filter by (inclusive).
     * @param {string} [created_at_lte] Maximum &#x60;created_at&#x60; value to filter by (inclusive).
     * @param {Array<'canceled' | 'processing' | 'requires_action' | 'requires_capture' | 'requires_confirmation' | 'requires_payment_method' | 'succeeded'>} [status] Only return PaymentIntents whose status is included by this array. Examples: &#x60;/v1/payment-intents?status&#x3D;succeeded,requires_payment_method&#x60; and &#x60;/v1/payment-intents?status&#x3D;succeeded&amp;status&#x3D;requires_payment_method&#x60;.
     * @param {boolean} [include_connected_accounts] Whether or not to include the results from any connected accounts.
     * @param {string} [subscription_id] The ID of the subscription whose payment intents will be retrieved.
     * @param {string} [q] Supports searching by &#x60;payment_intent.id&#x60;, &#x60;payment_intent.amount&#x60;, &#x60;payment_method.billing_details.name&#x60;, &#x60;payment_method.details.last4&#x60;, &#x60;payment_method.details.last2&#x60;, &#x60;customer.first_name&#x60;, &#x60;customer.last_name&#x60;
     * @param {string} [customer_id] The ID of the customer whose payment intents will be retrieved.
     * @param {number} [offset] The (zero-based) offset of the first item in the collection to return.
     * @param {number} [limit] The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listPaymentIntents: async (
      tilled_account: string,
      metadata?: { [key: string]: string },
      created_at_gte?: string,
      created_at_lte?: string,
      status?: Array<
        | "canceled"
        | "processing"
        | "requires_action"
        | "requires_capture"
        | "requires_confirmation"
        | "requires_payment_method"
        | "succeeded"
      >,
      include_connected_accounts?: boolean,
      subscription_id?: string,
      q?: string,
      customer_id?: string,
      offset?: number,
      limit?: number,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'tilled_account' is not null or undefined
      assertParamExists("listPaymentIntents", "tilled_account", tilled_account);
      const localVarPath = `/v1/payment-intents`;
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

      if (created_at_gte !== undefined) {
        localVarQueryParameter["created_at_gte"] =
          (created_at_gte as any) instanceof Date
            ? (created_at_gte as any).toISOString()
            : created_at_gte;
      }

      if (created_at_lte !== undefined) {
        localVarQueryParameter["created_at_lte"] =
          (created_at_lte as any) instanceof Date
            ? (created_at_lte as any).toISOString()
            : created_at_lte;
      }

      if (status) {
        localVarQueryParameter["status"] = status;
      }

      if (include_connected_accounts !== undefined) {
        localVarQueryParameter["include_connected_accounts"] =
          include_connected_accounts;
      }

      if (subscription_id !== undefined) {
        localVarQueryParameter["subscription_id"] = subscription_id;
      }

      if (q !== undefined) {
        localVarQueryParameter["q"] = q;
      }

      if (customer_id !== undefined) {
        localVarQueryParameter["customer_id"] = customer_id;
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
     * Updates properties on a PaymentIntent object without confirming.  Depending on which properties you update, you may need to confirm the PaymentIntent again.
     * @summary Update a Payment Intent
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {string} id
     * @param {PaymentIntentUpdateParams} PaymentIntentUpdateParams
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updatePaymentIntent: async (
      tilled_account: string,
      id: string,
      PaymentIntentUpdateParams: PaymentIntentUpdateParams,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'tilled_account' is not null or undefined
      assertParamExists(
        "updatePaymentIntent",
        "tilled_account",
        tilled_account
      );
      // verify required parameter 'id' is not null or undefined
      assertParamExists("updatePaymentIntent", "id", id);
      // verify required parameter 'PaymentIntentUpdateParams' is not null or undefined
      assertParamExists(
        "updatePaymentIntent",
        "PaymentIntentUpdateParams",
        PaymentIntentUpdateParams
      );
      const localVarPath = `/v1/payment-intents/{id}`.replace(
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
        PaymentIntentUpdateParams,
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
 * PaymentIntentsApi - functional programming interface
 * @export
 */
export const PaymentIntentsApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator =
    PaymentIntentsApiAxiosParamCreator(configuration);
  return {
    /**
     * A PaymentIntent object can be canceled when it is in one of these statuses: `requires_payment_method`, `requires_capture`, `requires_confirmation`, or `requires_action`.  Once canceled, no additional charges will be made by the PaymentIntent and any operations on the PaymentIntent will fail with an error.
     * @summary Cancel a Payment Intent
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {string} id
     * @param {PaymentIntentCancelParams} PaymentIntentCancelParams
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async cancelPaymentIntent(
      tilled_account: string,
      id: string,
      PaymentIntentCancelParams: PaymentIntentCancelParams,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaymentIntent>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.cancelPaymentIntent(
          tilled_account,
          id,
          PaymentIntentCancelParams,
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
     * Capture the funds of an existing uncaptured PaymentIntent when its status is `requires_capture`. Uncaptured PaymentIntents will be canceled exactly 7 days after they are created.
     * @summary Capture a Payment Intent
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {string} id
     * @param {PaymentIntentCaptureParams} PaymentIntentCaptureParams
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async capturePaymentIntent(
      tilled_account: string,
      id: string,
      PaymentIntentCaptureParams: PaymentIntentCaptureParams,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaymentIntent>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.capturePaymentIntent(
          tilled_account,
          id,
          PaymentIntentCaptureParams,
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
     * Confirm that your customer intends to pay with current or provided payment method. Upon confirmation, the PaymentIntent will attempt to initiate a payment.  If the selected payment method requires additional steps, the PaymentIntent will transition to the `requires_action` status. If payment fails, the PaymentIntent will transition to the `requires_payment_method` status. If payment succeeds, the PaymentIntent will transition to the `succeeded` status (or `requires_capture`, if `capture_method` is set to `manual`).  Payment may be attempted using our `tilled.js` and the PaymentIntent’s `client_secret`.
     * @summary Confirm a Payment Intent
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {string} id
     * @param {PaymentIntentConfirmParams} PaymentIntentConfirmParams
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async confirmPaymentIntent(
      tilled_account: string,
      id: string,
      PaymentIntentConfirmParams: PaymentIntentConfirmParams,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaymentIntent>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.confirmPaymentIntent(
          tilled_account,
          id,
          PaymentIntentConfirmParams,
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
     * After the PaymentIntent is created, attach a payment method and confirm to continue the payment. You can read more about the different payment flows available via the Payment Intents API here<TBD>.  When `confirm=true` is used during creation, it is equivalent to creating and confirming the PaymentIntent in the same call. You may use any parameters available in the confirm API when `confirm=true` is supplied.
     * @summary Create a Payment Intent
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {PaymentIntentCreateParams} PaymentIntentCreateParams
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createPaymentIntent(
      tilled_account: string,
      PaymentIntentCreateParams: PaymentIntentCreateParams,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaymentIntent>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.createPaymentIntent(
          tilled_account,
          PaymentIntentCreateParams,
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
     * Retrieves the details of a PaymentIntent that has previously been created.
     * @summary Get a Payment Intent
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getPaymentIntent(
      tilled_account: string,
      id: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaymentIntent>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.getPaymentIntent(
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
     * Returns a list of PaymentIntents.
     * @summary List all Payment Intents
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {{ [key: string]: string; }} [metadata] &#x60;metadata&#x60; key-value pairs to filter by. Only exact matches on the key-value pair(s) will be returned. Example: &#x60;?metadata[internal_customer_id]&#x3D;7cb1159d-875e-47ae-a309-319fa7ff395b&#x60;.
     * @param {string} [created_at_gte] Minimum &#x60;created_at&#x60; value to filter by (inclusive).
     * @param {string} [created_at_lte] Maximum &#x60;created_at&#x60; value to filter by (inclusive).
     * @param {Array<'canceled' | 'processing' | 'requires_action' | 'requires_capture' | 'requires_confirmation' | 'requires_payment_method' | 'succeeded'>} [status] Only return PaymentIntents whose status is included by this array. Examples: &#x60;/v1/payment-intents?status&#x3D;succeeded,requires_payment_method&#x60; and &#x60;/v1/payment-intents?status&#x3D;succeeded&amp;status&#x3D;requires_payment_method&#x60;.
     * @param {boolean} [include_connected_accounts] Whether or not to include the results from any connected accounts.
     * @param {string} [subscription_id] The ID of the subscription whose payment intents will be retrieved.
     * @param {string} [q] Supports searching by &#x60;payment_intent.id&#x60;, &#x60;payment_intent.amount&#x60;, &#x60;payment_method.billing_details.name&#x60;, &#x60;payment_method.details.last4&#x60;, &#x60;payment_method.details.last2&#x60;, &#x60;customer.first_name&#x60;, &#x60;customer.last_name&#x60;
     * @param {string} [customer_id] The ID of the customer whose payment intents will be retrieved.
     * @param {number} [offset] The (zero-based) offset of the first item in the collection to return.
     * @param {number} [limit] The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async listPaymentIntents(
      tilled_account: string,
      metadata?: { [key: string]: string },
      created_at_gte?: string,
      created_at_lte?: string,
      status?: Array<
        | "canceled"
        | "processing"
        | "requires_action"
        | "requires_capture"
        | "requires_confirmation"
        | "requires_payment_method"
        | "succeeded"
      >,
      include_connected_accounts?: boolean,
      subscription_id?: string,
      q?: string,
      customer_id?: string,
      offset?: number,
      limit?: number,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<ListPaymentIntents200Response>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.listPaymentIntents(
          tilled_account,
          metadata,
          created_at_gte,
          created_at_lte,
          status,
          include_connected_accounts,
          subscription_id,
          q,
          customer_id,
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
     * Updates properties on a PaymentIntent object without confirming.  Depending on which properties you update, you may need to confirm the PaymentIntent again.
     * @summary Update a Payment Intent
     * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @param {string} id
     * @param {PaymentIntentUpdateParams} PaymentIntentUpdateParams
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async updatePaymentIntent(
      tilled_account: string,
      id: string,
      PaymentIntentUpdateParams: PaymentIntentUpdateParams,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaymentIntent>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.updatePaymentIntent(
          tilled_account,
          id,
          PaymentIntentUpdateParams,
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
 * PaymentIntentsApi - factory interface
 * @export
 */
export const PaymentIntentsApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  const localVarFp = PaymentIntentsApiFp(configuration);
  return {
    /**
     * A PaymentIntent object can be canceled when it is in one of these statuses: `requires_payment_method`, `requires_capture`, `requires_confirmation`, or `requires_action`.  Once canceled, no additional charges will be made by the PaymentIntent and any operations on the PaymentIntent will fail with an error.
     * @summary Cancel a Payment Intent
     * @param {PaymentIntentsApiCancelPaymentIntentRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    cancelPaymentIntent(
      requestParameters: PaymentIntentsApiCancelPaymentIntentRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<PaymentIntent> {
      return localVarFp
        .cancelPaymentIntent(
          requestParameters.tilled_account,
          requestParameters.id,
          requestParameters.PaymentIntentCancelParams,
          options
        )
        .then((request) => request(axios, basePath));
    },
    /**
     * Capture the funds of an existing uncaptured PaymentIntent when its status is `requires_capture`. Uncaptured PaymentIntents will be canceled exactly 7 days after they are created.
     * @summary Capture a Payment Intent
     * @param {PaymentIntentsApiCapturePaymentIntentRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    capturePaymentIntent(
      requestParameters: PaymentIntentsApiCapturePaymentIntentRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<PaymentIntent> {
      return localVarFp
        .capturePaymentIntent(
          requestParameters.tilled_account,
          requestParameters.id,
          requestParameters.PaymentIntentCaptureParams,
          options
        )
        .then((request) => request(axios, basePath));
    },
    /**
     * Confirm that your customer intends to pay with current or provided payment method. Upon confirmation, the PaymentIntent will attempt to initiate a payment.  If the selected payment method requires additional steps, the PaymentIntent will transition to the `requires_action` status. If payment fails, the PaymentIntent will transition to the `requires_payment_method` status. If payment succeeds, the PaymentIntent will transition to the `succeeded` status (or `requires_capture`, if `capture_method` is set to `manual`).  Payment may be attempted using our `tilled.js` and the PaymentIntent’s `client_secret`.
     * @summary Confirm a Payment Intent
     * @param {PaymentIntentsApiConfirmPaymentIntentRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    confirmPaymentIntent(
      requestParameters: PaymentIntentsApiConfirmPaymentIntentRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<PaymentIntent> {
      return localVarFp
        .confirmPaymentIntent(
          requestParameters.tilled_account,
          requestParameters.id,
          requestParameters.PaymentIntentConfirmParams,
          options
        )
        .then((request) => request(axios, basePath));
    },
    /**
     * After the PaymentIntent is created, attach a payment method and confirm to continue the payment. You can read more about the different payment flows available via the Payment Intents API here<TBD>.  When `confirm=true` is used during creation, it is equivalent to creating and confirming the PaymentIntent in the same call. You may use any parameters available in the confirm API when `confirm=true` is supplied.
     * @summary Create a Payment Intent
     * @param {PaymentIntentsApiCreatePaymentIntentRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createPaymentIntent(
      requestParameters: PaymentIntentsApiCreatePaymentIntentRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<PaymentIntent> {
      return localVarFp
        .createPaymentIntent(
          requestParameters.tilled_account,
          requestParameters.PaymentIntentCreateParams,
          options
        )
        .then((request) => request(axios, basePath));
    },
    /**
     * Retrieves the details of a PaymentIntent that has previously been created.
     * @summary Get a Payment Intent
     * @param {PaymentIntentsApiGetPaymentIntentRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getPaymentIntent(
      requestParameters: PaymentIntentsApiGetPaymentIntentRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<PaymentIntent> {
      return localVarFp
        .getPaymentIntent(
          requestParameters.tilled_account,
          requestParameters.id,
          options
        )
        .then((request) => request(axios, basePath));
    },
    /**
     * Returns a list of PaymentIntents.
     * @summary List all Payment Intents
     * @param {PaymentIntentsApiListPaymentIntentsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    listPaymentIntents(
      requestParameters: PaymentIntentsApiListPaymentIntentsRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<ListPaymentIntents200Response> {
      return localVarFp
        .listPaymentIntents(
          requestParameters.tilled_account,
          requestParameters.metadata,
          requestParameters.created_at_gte,
          requestParameters.created_at_lte,
          requestParameters.status,
          requestParameters.include_connected_accounts,
          requestParameters.subscription_id,
          requestParameters.q,
          requestParameters.customer_id,
          requestParameters.offset,
          requestParameters.limit,
          options
        )
        .then((request) => request(axios, basePath));
    },
    /**
     * Updates properties on a PaymentIntent object without confirming.  Depending on which properties you update, you may need to confirm the PaymentIntent again.
     * @summary Update a Payment Intent
     * @param {PaymentIntentsApiUpdatePaymentIntentRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updatePaymentIntent(
      requestParameters: PaymentIntentsApiUpdatePaymentIntentRequest,
      options?: AxiosRequestConfig
    ): AxiosPromise<PaymentIntent> {
      return localVarFp
        .updatePaymentIntent(
          requestParameters.tilled_account,
          requestParameters.id,
          requestParameters.PaymentIntentUpdateParams,
          options
        )
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * Request parameters for cancelPaymentIntent operation in PaymentIntentsApi.
 * @export
 * @interface PaymentIntentsApiCancelPaymentIntentRequest
 */
export interface PaymentIntentsApiCancelPaymentIntentRequest {
  /**
   * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @type {string}
   * @memberof PaymentIntentsApiCancelPaymentIntent
   */
  readonly tilled_account: string;

  /**
   *
   * @type {string}
   * @memberof PaymentIntentsApiCancelPaymentIntent
   */
  readonly id: string;

  /**
   *
   * @type {PaymentIntentCancelParams}
   * @memberof PaymentIntentsApiCancelPaymentIntent
   */
  readonly PaymentIntentCancelParams: PaymentIntentCancelParams;
}

/**
 * Request parameters for capturePaymentIntent operation in PaymentIntentsApi.
 * @export
 * @interface PaymentIntentsApiCapturePaymentIntentRequest
 */
export interface PaymentIntentsApiCapturePaymentIntentRequest {
  /**
   * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @type {string}
   * @memberof PaymentIntentsApiCapturePaymentIntent
   */
  readonly tilled_account: string;

  /**
   *
   * @type {string}
   * @memberof PaymentIntentsApiCapturePaymentIntent
   */
  readonly id: string;

  /**
   *
   * @type {PaymentIntentCaptureParams}
   * @memberof PaymentIntentsApiCapturePaymentIntent
   */
  readonly PaymentIntentCaptureParams: PaymentIntentCaptureParams;
}

/**
 * Request parameters for confirmPaymentIntent operation in PaymentIntentsApi.
 * @export
 * @interface PaymentIntentsApiConfirmPaymentIntentRequest
 */
export interface PaymentIntentsApiConfirmPaymentIntentRequest {
  /**
   * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @type {string}
   * @memberof PaymentIntentsApiConfirmPaymentIntent
   */
  readonly tilled_account: string;

  /**
   *
   * @type {string}
   * @memberof PaymentIntentsApiConfirmPaymentIntent
   */
  readonly id: string;

  /**
   *
   * @type {PaymentIntentConfirmParams}
   * @memberof PaymentIntentsApiConfirmPaymentIntent
   */
  readonly PaymentIntentConfirmParams: PaymentIntentConfirmParams;
}

/**
 * Request parameters for createPaymentIntent operation in PaymentIntentsApi.
 * @export
 * @interface PaymentIntentsApiCreatePaymentIntentRequest
 */
export interface PaymentIntentsApiCreatePaymentIntentRequest {
  /**
   * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @type {string}
   * @memberof PaymentIntentsApiCreatePaymentIntent
   */
  readonly tilled_account: string;

  /**
   *
   * @type {PaymentIntentCreateParams}
   * @memberof PaymentIntentsApiCreatePaymentIntent
   */
  readonly PaymentIntentCreateParams: PaymentIntentCreateParams;
}

/**
 * Request parameters for getPaymentIntent operation in PaymentIntentsApi.
 * @export
 * @interface PaymentIntentsApiGetPaymentIntentRequest
 */
export interface PaymentIntentsApiGetPaymentIntentRequest {
  /**
   * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @type {string}
   * @memberof PaymentIntentsApiGetPaymentIntent
   */
  readonly tilled_account: string;

  /**
   *
   * @type {string}
   * @memberof PaymentIntentsApiGetPaymentIntent
   */
  readonly id: string;
}

/**
 * Request parameters for listPaymentIntents operation in PaymentIntentsApi.
 * @export
 * @interface PaymentIntentsApiListPaymentIntentsRequest
 */
export interface PaymentIntentsApiListPaymentIntentsRequest {
  /**
   * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @type {string}
   * @memberof PaymentIntentsApiListPaymentIntents
   */
  readonly tilled_account: string;

  /**
   * &#x60;metadata&#x60; key-value pairs to filter by. Only exact matches on the key-value pair(s) will be returned. Example: &#x60;?metadata[internal_customer_id]&#x3D;7cb1159d-875e-47ae-a309-319fa7ff395b&#x60;.
   * @type {{ [key: string]: string; }}
   * @memberof PaymentIntentsApiListPaymentIntents
   */
  readonly metadata?: { [key: string]: string };

  /**
   * Minimum &#x60;created_at&#x60; value to filter by (inclusive).
   * @type {string}
   * @memberof PaymentIntentsApiListPaymentIntents
   */
  readonly created_at_gte?: string;

  /**
   * Maximum &#x60;created_at&#x60; value to filter by (inclusive).
   * @type {string}
   * @memberof PaymentIntentsApiListPaymentIntents
   */
  readonly created_at_lte?: string;

  /**
   * Only return PaymentIntents whose status is included by this array. Examples: &#x60;/v1/payment-intents?status&#x3D;succeeded,requires_payment_method&#x60; and &#x60;/v1/payment-intents?status&#x3D;succeeded&amp;status&#x3D;requires_payment_method&#x60;.
   * @type {Array<'canceled' | 'processing' | 'requires_action' | 'requires_capture' | 'requires_confirmation' | 'requires_payment_method' | 'succeeded'>}
   * @memberof PaymentIntentsApiListPaymentIntents
   */
  readonly status?: Array<
    | "canceled"
    | "processing"
    | "requires_action"
    | "requires_capture"
    | "requires_confirmation"
    | "requires_payment_method"
    | "succeeded"
  >;

  /**
   * Whether or not to include the results from any connected accounts.
   * @type {boolean}
   * @memberof PaymentIntentsApiListPaymentIntents
   */
  readonly include_connected_accounts?: boolean;

  /**
   * The ID of the subscription whose payment intents will be retrieved.
   * @type {string}
   * @memberof PaymentIntentsApiListPaymentIntents
   */
  readonly subscription_id?: string;

  /**
   * Supports searching by &#x60;payment_intent.id&#x60;, &#x60;payment_intent.amount&#x60;, &#x60;payment_method.billing_details.name&#x60;, &#x60;payment_method.details.last4&#x60;, &#x60;payment_method.details.last2&#x60;, &#x60;customer.first_name&#x60;, &#x60;customer.last_name&#x60;
   * @type {string}
   * @memberof PaymentIntentsApiListPaymentIntents
   */
  readonly q?: string;

  /**
   * The ID of the customer whose payment intents will be retrieved.
   * @type {string}
   * @memberof PaymentIntentsApiListPaymentIntents
   */
  readonly customer_id?: string;

  /**
   * The (zero-based) offset of the first item in the collection to return.
   * @type {number}
   * @memberof PaymentIntentsApiListPaymentIntents
   */
  readonly offset?: number;

  /**
   * The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
   * @type {number}
   * @memberof PaymentIntentsApiListPaymentIntents
   */
  readonly limit?: number;
}

/**
 * Request parameters for updatePaymentIntent operation in PaymentIntentsApi.
 * @export
 * @interface PaymentIntentsApiUpdatePaymentIntentRequest
 */
export interface PaymentIntentsApiUpdatePaymentIntentRequest {
  /**
   * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @type {string}
   * @memberof PaymentIntentsApiUpdatePaymentIntent
   */
  readonly tilled_account: string;

  /**
   *
   * @type {string}
   * @memberof PaymentIntentsApiUpdatePaymentIntent
   */
  readonly id: string;

  /**
   *
   * @type {PaymentIntentUpdateParams}
   * @memberof PaymentIntentsApiUpdatePaymentIntent
   */
  readonly PaymentIntentUpdateParams: PaymentIntentUpdateParams;
}

/**
 * PaymentIntentsApi - object-oriented interface
 * @export
 * @class PaymentIntentsApi
 * @extends {BaseAPI}
 */
export class PaymentIntentsApi extends BaseAPI {
  /**
   * A PaymentIntent object can be canceled when it is in one of these statuses: `requires_payment_method`, `requires_capture`, `requires_confirmation`, or `requires_action`.  Once canceled, no additional charges will be made by the PaymentIntent and any operations on the PaymentIntent will fail with an error.
   * @summary Cancel a Payment Intent
   * @param {PaymentIntentsApiCancelPaymentIntentRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PaymentIntentsApi
   */
  public cancelPaymentIntent(
    requestParameters: PaymentIntentsApiCancelPaymentIntentRequest,
    options?: AxiosRequestConfig
  ) {
    return PaymentIntentsApiFp(this.configuration)
      .cancelPaymentIntent(
        requestParameters.tilled_account,
        requestParameters.id,
        requestParameters.PaymentIntentCancelParams,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Capture the funds of an existing uncaptured PaymentIntent when its status is `requires_capture`. Uncaptured PaymentIntents will be canceled exactly 7 days after they are created.
   * @summary Capture a Payment Intent
   * @param {PaymentIntentsApiCapturePaymentIntentRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PaymentIntentsApi
   */
  public capturePaymentIntent(
    requestParameters: PaymentIntentsApiCapturePaymentIntentRequest,
    options?: AxiosRequestConfig
  ) {
    return PaymentIntentsApiFp(this.configuration)
      .capturePaymentIntent(
        requestParameters.tilled_account,
        requestParameters.id,
        requestParameters.PaymentIntentCaptureParams,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Confirm that your customer intends to pay with current or provided payment method. Upon confirmation, the PaymentIntent will attempt to initiate a payment.  If the selected payment method requires additional steps, the PaymentIntent will transition to the `requires_action` status. If payment fails, the PaymentIntent will transition to the `requires_payment_method` status. If payment succeeds, the PaymentIntent will transition to the `succeeded` status (or `requires_capture`, if `capture_method` is set to `manual`).  Payment may be attempted using our `tilled.js` and the PaymentIntent’s `client_secret`.
   * @summary Confirm a Payment Intent
   * @param {PaymentIntentsApiConfirmPaymentIntentRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PaymentIntentsApi
   */
  public confirmPaymentIntent(
    requestParameters: PaymentIntentsApiConfirmPaymentIntentRequest,
    options?: AxiosRequestConfig
  ) {
    return PaymentIntentsApiFp(this.configuration)
      .confirmPaymentIntent(
        requestParameters.tilled_account,
        requestParameters.id,
        requestParameters.PaymentIntentConfirmParams,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * After the PaymentIntent is created, attach a payment method and confirm to continue the payment. You can read more about the different payment flows available via the Payment Intents API here<TBD>.  When `confirm=true` is used during creation, it is equivalent to creating and confirming the PaymentIntent in the same call. You may use any parameters available in the confirm API when `confirm=true` is supplied.
   * @summary Create a Payment Intent
   * @param {PaymentIntentsApiCreatePaymentIntentRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PaymentIntentsApi
   */
  public createPaymentIntent(
    requestParameters: PaymentIntentsApiCreatePaymentIntentRequest,
    options?: AxiosRequestConfig
  ) {
    return PaymentIntentsApiFp(this.configuration)
      .createPaymentIntent(
        requestParameters.tilled_account,
        requestParameters.PaymentIntentCreateParams,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Retrieves the details of a PaymentIntent that has previously been created.
   * @summary Get a Payment Intent
   * @param {PaymentIntentsApiGetPaymentIntentRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PaymentIntentsApi
   */
  public getPaymentIntent(
    requestParameters: PaymentIntentsApiGetPaymentIntentRequest,
    options?: AxiosRequestConfig
  ) {
    return PaymentIntentsApiFp(this.configuration)
      .getPaymentIntent(
        requestParameters.tilled_account,
        requestParameters.id,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Returns a list of PaymentIntents.
   * @summary List all Payment Intents
   * @param {PaymentIntentsApiListPaymentIntentsRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PaymentIntentsApi
   */
  public listPaymentIntents(
    requestParameters: PaymentIntentsApiListPaymentIntentsRequest,
    options?: AxiosRequestConfig
  ) {
    return PaymentIntentsApiFp(this.configuration)
      .listPaymentIntents(
        requestParameters.tilled_account,
        requestParameters.metadata,
        requestParameters.created_at_gte,
        requestParameters.created_at_lte,
        requestParameters.status,
        requestParameters.include_connected_accounts,
        requestParameters.subscription_id,
        requestParameters.q,
        requestParameters.customer_id,
        requestParameters.offset,
        requestParameters.limit,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Updates properties on a PaymentIntent object without confirming.  Depending on which properties you update, you may need to confirm the PaymentIntent again.
   * @summary Update a Payment Intent
   * @param {PaymentIntentsApiUpdatePaymentIntentRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PaymentIntentsApi
   */
  public updatePaymentIntent(
    requestParameters: PaymentIntentsApiUpdatePaymentIntentRequest,
    options?: AxiosRequestConfig
  ) {
    return PaymentIntentsApiFp(this.configuration)
      .updatePaymentIntent(
        requestParameters.tilled_account,
        requestParameters.id,
        requestParameters.PaymentIntentUpdateParams,
        options
      )
      .then((request) => request(this.axios, this.basePath));
  }
}
