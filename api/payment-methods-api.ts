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


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { AchDebitSingleUseToken } from '../model';
// @ts-ignore
import { ListPaymentMethods200Response } from '../model';
// @ts-ignore
import { PaymentMethod } from '../model';
// @ts-ignore
import { PaymentMethodAttachParams } from '../model';
// @ts-ignore
import { PaymentMethodCreateAchDebitSingleUseTokenParams } from '../model';
// @ts-ignore
import { PaymentMethodCreateParams } from '../model';
// @ts-ignore
import { PaymentMethodUpdateParams } from '../model';
/**
 * PaymentMethodsApi - axios parameter creator
 * @export
 */
export const PaymentMethodsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Attaches a PaymentMethod to a Customer. This effectively changes the payment method from single-use to reusable.
         * @summary Attach a Payment Method to a Customer
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {PaymentMethodAttachParams} PaymentMethodAttachParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        attachPaymentMethodToCustomer: async (tilled_account: string, id: string, PaymentMethodAttachParams: PaymentMethodAttachParams, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('attachPaymentMethodToCustomer', 'tilled_account', tilled_account)
            // verify required parameter 'id' is not null or undefined
            assertParamExists('attachPaymentMethodToCustomer', 'id', id)
            // verify required parameter 'PaymentMethodAttachParams' is not null or undefined
            assertParamExists('attachPaymentMethodToCustomer', 'PaymentMethodAttachParams', PaymentMethodAttachParams)
            const localVarPath = `/v1/payment-methods/{id}/attach`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication JWT required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            // authentication TilledApiKey required
            await setApiKeyToObject(localVarHeaderParameter, "tilled-api-key", configuration)

            if (tilled_account != null) {
                localVarHeaderParameter['tilled-account'] = String(tilled_account);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(PaymentMethodAttachParams, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Creates an ACH Debit Single-Use Token, for use in creating a PaymentMethod.
         * @summary Create an ACH Debit Single-Use Token
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {PaymentMethodCreateAchDebitSingleUseTokenParams} PaymentMethodCreateAchDebitSingleUseTokenParams 
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        createAchDebitSingleUseToken: async (tilled_account: string, PaymentMethodCreateAchDebitSingleUseTokenParams: PaymentMethodCreateAchDebitSingleUseTokenParams, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('createAchDebitSingleUseToken', 'tilled_account', tilled_account)
            // verify required parameter 'PaymentMethodCreateAchDebitSingleUseTokenParams' is not null or undefined
            assertParamExists('createAchDebitSingleUseToken', 'PaymentMethodCreateAchDebitSingleUseTokenParams', PaymentMethodCreateAchDebitSingleUseTokenParams)
            const localVarPath = `/v1/payment-methods/ach-debit-token`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication JWT required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            // authentication TilledApiKey required
            await setApiKeyToObject(localVarHeaderParameter, "tilled-api-key", configuration)

            if (tilled_account != null) {
                localVarHeaderParameter['tilled-account'] = String(tilled_account);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(PaymentMethodCreateAchDebitSingleUseTokenParams, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Creates a PaymentMethod object. Read the [Tilled.js reference](#section/Tilled.js) to learn how to create PaymentMethods via Tilled.js. One of the following is required to create a payment method: `card`, `payment_token`, `ach_debit`, or `eft_debit`.  Note: If you would like to use this endpoint to submit raw cardholder data directly to Tilled\'s API (and not use Tilled.js), you must first submit your PCI Attestation of Compliance (AOC) to Tilled that shows you are currently compliant with the applicable PCI/DSS requirements. Please contact integrations@tilled.com for information on how to submit your documentation.
         * @summary Create a Payment Method
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {PaymentMethodCreateParams} PaymentMethodCreateParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createPaymentMethod: async (tilled_account: string, PaymentMethodCreateParams: PaymentMethodCreateParams, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('createPaymentMethod', 'tilled_account', tilled_account)
            // verify required parameter 'PaymentMethodCreateParams' is not null or undefined
            assertParamExists('createPaymentMethod', 'PaymentMethodCreateParams', PaymentMethodCreateParams)
            const localVarPath = `/v1/payment-methods`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication JWT required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            // authentication TilledApiKey required
            await setApiKeyToObject(localVarHeaderParameter, "tilled-api-key", configuration)

            if (tilled_account != null) {
                localVarHeaderParameter['tilled-account'] = String(tilled_account);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(PaymentMethodCreateParams, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Detaches a PaymentMethod from a Customer. Once a payment method is detached it can no longer be used to make a charge.
         * @summary Detach a Payment Method from a Customer
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        detachPaymentMethodFromCustomer: async (tilled_account: string, id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('detachPaymentMethodFromCustomer', 'tilled_account', tilled_account)
            // verify required parameter 'id' is not null or undefined
            assertParamExists('detachPaymentMethodFromCustomer', 'id', id)
            const localVarPath = `/v1/payment-methods/{id}/detach`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication JWT required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            // authentication TilledApiKey required
            await setApiKeyToObject(localVarHeaderParameter, "tilled-api-key", configuration)

            if (tilled_account != null) {
                localVarHeaderParameter['tilled-account'] = String(tilled_account);
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Retrieves a PaymentMethod object.
         * @summary Get a Payment Method
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getPaymentMethod: async (tilled_account: string, id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('getPaymentMethod', 'tilled_account', tilled_account)
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getPaymentMethod', 'id', id)
            const localVarPath = `/v1/payment-methods/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication JWT required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            // authentication TilledApiKey required
            await setApiKeyToObject(localVarHeaderParameter, "tilled-api-key", configuration)

            if (tilled_account != null) {
                localVarHeaderParameter['tilled-account'] = String(tilled_account);
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Returns a list of PaymentMethods for a given Customer.
         * @summary List a Customer\'s Payment Methods
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {'card' | 'ach_debit' | 'eft_debit'} type Only return payment methods of the given type.
         * @param {string} customer_id Customer identifier
         * @param {{ [key: string]: string; }} [metadata] &#x60;metadata&#x60; key-value pairs to filter by. Only exact matches on the key-value pair(s) will be returned. Example: &#x60;?metadata[internal_customer_id]&#x3D;7cb1159d-875e-47ae-a309-319fa7ff395b&#x60;.
         * @param {number} [offset] The (zero-based) offset of the first item in the collection to return.
         * @param {number} [limit] The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listPaymentMethods: async (tilled_account: string, type: 'card' | 'ach_debit' | 'eft_debit', customer_id: string, metadata?: { [key: string]: string; }, offset?: number, limit?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('listPaymentMethods', 'tilled_account', tilled_account)
            // verify required parameter 'type' is not null or undefined
            assertParamExists('listPaymentMethods', 'type', type)
            // verify required parameter 'customer_id' is not null or undefined
            assertParamExists('listPaymentMethods', 'customer_id', customer_id)
            const localVarPath = `/v1/payment-methods`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication JWT required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            // authentication TilledApiKey required
            await setApiKeyToObject(localVarHeaderParameter, "tilled-api-key", configuration)

            if (metadata !== undefined) {
                localVarQueryParameter['metadata'] = metadata;
            }

            if (type !== undefined) {
                localVarQueryParameter['type'] = type;
            }

            if (customer_id !== undefined) {
                localVarQueryParameter['customer_id'] = customer_id;
            }

            if (offset !== undefined) {
                localVarQueryParameter['offset'] = offset;
            }

            if (limit !== undefined) {
                localVarQueryParameter['limit'] = limit;
            }

            if (tilled_account != null) {
                localVarHeaderParameter['tilled-account'] = String(tilled_account);
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Updates a PaymentMethod object. A PaymentMethod must be attached to a customer to be updated.
         * @summary Update a Payment Method
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {PaymentMethodUpdateParams} PaymentMethodUpdateParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updatePaymentMethod: async (tilled_account: string, id: string, PaymentMethodUpdateParams: PaymentMethodUpdateParams, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('updatePaymentMethod', 'tilled_account', tilled_account)
            // verify required parameter 'id' is not null or undefined
            assertParamExists('updatePaymentMethod', 'id', id)
            // verify required parameter 'PaymentMethodUpdateParams' is not null or undefined
            assertParamExists('updatePaymentMethod', 'PaymentMethodUpdateParams', PaymentMethodUpdateParams)
            const localVarPath = `/v1/payment-methods/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication JWT required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            // authentication TilledApiKey required
            await setApiKeyToObject(localVarHeaderParameter, "tilled-api-key", configuration)

            if (tilled_account != null) {
                localVarHeaderParameter['tilled-account'] = String(tilled_account);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(PaymentMethodUpdateParams, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * PaymentMethodsApi - functional programming interface
 * @export
 */
export const PaymentMethodsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = PaymentMethodsApiAxiosParamCreator(configuration)
    return {
        /**
         * Attaches a PaymentMethod to a Customer. This effectively changes the payment method from single-use to reusable.
         * @summary Attach a Payment Method to a Customer
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {PaymentMethodAttachParams} PaymentMethodAttachParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async attachPaymentMethodToCustomer(tilled_account: string, id: string, PaymentMethodAttachParams: PaymentMethodAttachParams, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaymentMethod>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.attachPaymentMethodToCustomer(tilled_account, id, PaymentMethodAttachParams, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Creates an ACH Debit Single-Use Token, for use in creating a PaymentMethod.
         * @summary Create an ACH Debit Single-Use Token
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {PaymentMethodCreateAchDebitSingleUseTokenParams} PaymentMethodCreateAchDebitSingleUseTokenParams 
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        async createAchDebitSingleUseToken(tilled_account: string, PaymentMethodCreateAchDebitSingleUseTokenParams: PaymentMethodCreateAchDebitSingleUseTokenParams, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AchDebitSingleUseToken>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createAchDebitSingleUseToken(tilled_account, PaymentMethodCreateAchDebitSingleUseTokenParams, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Creates a PaymentMethod object. Read the [Tilled.js reference](#section/Tilled.js) to learn how to create PaymentMethods via Tilled.js. One of the following is required to create a payment method: `card`, `payment_token`, `ach_debit`, or `eft_debit`.  Note: If you would like to use this endpoint to submit raw cardholder data directly to Tilled\'s API (and not use Tilled.js), you must first submit your PCI Attestation of Compliance (AOC) to Tilled that shows you are currently compliant with the applicable PCI/DSS requirements. Please contact integrations@tilled.com for information on how to submit your documentation.
         * @summary Create a Payment Method
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {PaymentMethodCreateParams} PaymentMethodCreateParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createPaymentMethod(tilled_account: string, PaymentMethodCreateParams: PaymentMethodCreateParams, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaymentMethod>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createPaymentMethod(tilled_account, PaymentMethodCreateParams, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Detaches a PaymentMethod from a Customer. Once a payment method is detached it can no longer be used to make a charge.
         * @summary Detach a Payment Method from a Customer
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async detachPaymentMethodFromCustomer(tilled_account: string, id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaymentMethod>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.detachPaymentMethodFromCustomer(tilled_account, id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Retrieves a PaymentMethod object.
         * @summary Get a Payment Method
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getPaymentMethod(tilled_account: string, id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaymentMethod>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getPaymentMethod(tilled_account, id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns a list of PaymentMethods for a given Customer.
         * @summary List a Customer\'s Payment Methods
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {'card' | 'ach_debit' | 'eft_debit'} type Only return payment methods of the given type.
         * @param {string} customer_id Customer identifier
         * @param {{ [key: string]: string; }} [metadata] &#x60;metadata&#x60; key-value pairs to filter by. Only exact matches on the key-value pair(s) will be returned. Example: &#x60;?metadata[internal_customer_id]&#x3D;7cb1159d-875e-47ae-a309-319fa7ff395b&#x60;.
         * @param {number} [offset] The (zero-based) offset of the first item in the collection to return.
         * @param {number} [limit] The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listPaymentMethods(tilled_account: string, type: 'card' | 'ach_debit' | 'eft_debit', customer_id: string, metadata?: { [key: string]: string; }, offset?: number, limit?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ListPaymentMethods200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listPaymentMethods(tilled_account, type, customer_id, metadata, offset, limit, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Updates a PaymentMethod object. A PaymentMethod must be attached to a customer to be updated.
         * @summary Update a Payment Method
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {PaymentMethodUpdateParams} PaymentMethodUpdateParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updatePaymentMethod(tilled_account: string, id: string, PaymentMethodUpdateParams: PaymentMethodUpdateParams, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PaymentMethod>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updatePaymentMethod(tilled_account, id, PaymentMethodUpdateParams, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * PaymentMethodsApi - factory interface
 * @export
 */
export const PaymentMethodsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = PaymentMethodsApiFp(configuration)
    return {
        /**
         * Attaches a PaymentMethod to a Customer. This effectively changes the payment method from single-use to reusable.
         * @summary Attach a Payment Method to a Customer
         * @param {PaymentMethodsApiAttachPaymentMethodToCustomerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        attachPaymentMethodToCustomer(requestParameters: PaymentMethodsApiAttachPaymentMethodToCustomerRequest, options?: AxiosRequestConfig): AxiosPromise<PaymentMethod> {
            return localVarFp.attachPaymentMethodToCustomer(requestParameters.tilled_account, requestParameters.id, requestParameters.PaymentMethodAttachParams, options).then((request) => request(axios, basePath));
        },
        /**
         * Creates an ACH Debit Single-Use Token, for use in creating a PaymentMethod.
         * @summary Create an ACH Debit Single-Use Token
         * @param {PaymentMethodsApiCreateAchDebitSingleUseTokenRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @deprecated
         * @throws {RequiredError}
         */
        createAchDebitSingleUseToken(requestParameters: PaymentMethodsApiCreateAchDebitSingleUseTokenRequest, options?: AxiosRequestConfig): AxiosPromise<AchDebitSingleUseToken> {
            return localVarFp.createAchDebitSingleUseToken(requestParameters.tilled_account, requestParameters.PaymentMethodCreateAchDebitSingleUseTokenParams, options).then((request) => request(axios, basePath));
        },
        /**
         * Creates a PaymentMethod object. Read the [Tilled.js reference](#section/Tilled.js) to learn how to create PaymentMethods via Tilled.js. One of the following is required to create a payment method: `card`, `payment_token`, `ach_debit`, or `eft_debit`.  Note: If you would like to use this endpoint to submit raw cardholder data directly to Tilled\'s API (and not use Tilled.js), you must first submit your PCI Attestation of Compliance (AOC) to Tilled that shows you are currently compliant with the applicable PCI/DSS requirements. Please contact integrations@tilled.com for information on how to submit your documentation.
         * @summary Create a Payment Method
         * @param {PaymentMethodsApiCreatePaymentMethodRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createPaymentMethod(requestParameters: PaymentMethodsApiCreatePaymentMethodRequest, options?: AxiosRequestConfig): AxiosPromise<PaymentMethod> {
            return localVarFp.createPaymentMethod(requestParameters.tilled_account, requestParameters.PaymentMethodCreateParams, options).then((request) => request(axios, basePath));
        },
        /**
         * Detaches a PaymentMethod from a Customer. Once a payment method is detached it can no longer be used to make a charge.
         * @summary Detach a Payment Method from a Customer
         * @param {PaymentMethodsApiDetachPaymentMethodFromCustomerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        detachPaymentMethodFromCustomer(requestParameters: PaymentMethodsApiDetachPaymentMethodFromCustomerRequest, options?: AxiosRequestConfig): AxiosPromise<PaymentMethod> {
            return localVarFp.detachPaymentMethodFromCustomer(requestParameters.tilled_account, requestParameters.id, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieves a PaymentMethod object.
         * @summary Get a Payment Method
         * @param {PaymentMethodsApiGetPaymentMethodRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getPaymentMethod(requestParameters: PaymentMethodsApiGetPaymentMethodRequest, options?: AxiosRequestConfig): AxiosPromise<PaymentMethod> {
            return localVarFp.getPaymentMethod(requestParameters.tilled_account, requestParameters.id, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns a list of PaymentMethods for a given Customer.
         * @summary List a Customer\'s Payment Methods
         * @param {PaymentMethodsApiListPaymentMethodsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listPaymentMethods(requestParameters: PaymentMethodsApiListPaymentMethodsRequest, options?: AxiosRequestConfig): AxiosPromise<ListPaymentMethods200Response> {
            return localVarFp.listPaymentMethods(requestParameters.tilled_account, requestParameters.type, requestParameters.customer_id, requestParameters.metadata, requestParameters.offset, requestParameters.limit, options).then((request) => request(axios, basePath));
        },
        /**
         * Updates a PaymentMethod object. A PaymentMethod must be attached to a customer to be updated.
         * @summary Update a Payment Method
         * @param {PaymentMethodsApiUpdatePaymentMethodRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updatePaymentMethod(requestParameters: PaymentMethodsApiUpdatePaymentMethodRequest, options?: AxiosRequestConfig): AxiosPromise<PaymentMethod> {
            return localVarFp.updatePaymentMethod(requestParameters.tilled_account, requestParameters.id, requestParameters.PaymentMethodUpdateParams, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for attachPaymentMethodToCustomer operation in PaymentMethodsApi.
 * @export
 * @interface PaymentMethodsApiAttachPaymentMethodToCustomerRequest
 */
export interface PaymentMethodsApiAttachPaymentMethodToCustomerRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof PaymentMethodsApiAttachPaymentMethodToCustomer
     */
    readonly tilled_account: string

    /**
     * 
     * @type {string}
     * @memberof PaymentMethodsApiAttachPaymentMethodToCustomer
     */
    readonly id: string

    /**
     * 
     * @type {PaymentMethodAttachParams}
     * @memberof PaymentMethodsApiAttachPaymentMethodToCustomer
     */
    readonly PaymentMethodAttachParams: PaymentMethodAttachParams
}

/**
 * Request parameters for createAchDebitSingleUseToken operation in PaymentMethodsApi.
 * @export
 * @interface PaymentMethodsApiCreateAchDebitSingleUseTokenRequest
 */
export interface PaymentMethodsApiCreateAchDebitSingleUseTokenRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof PaymentMethodsApiCreateAchDebitSingleUseToken
     */
    readonly tilled_account: string

    /**
     * 
     * @type {PaymentMethodCreateAchDebitSingleUseTokenParams}
     * @memberof PaymentMethodsApiCreateAchDebitSingleUseToken
     */
    readonly PaymentMethodCreateAchDebitSingleUseTokenParams: PaymentMethodCreateAchDebitSingleUseTokenParams
}

/**
 * Request parameters for createPaymentMethod operation in PaymentMethodsApi.
 * @export
 * @interface PaymentMethodsApiCreatePaymentMethodRequest
 */
export interface PaymentMethodsApiCreatePaymentMethodRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof PaymentMethodsApiCreatePaymentMethod
     */
    readonly tilled_account: string

    /**
     * 
     * @type {PaymentMethodCreateParams}
     * @memberof PaymentMethodsApiCreatePaymentMethod
     */
    readonly PaymentMethodCreateParams: PaymentMethodCreateParams
}

/**
 * Request parameters for detachPaymentMethodFromCustomer operation in PaymentMethodsApi.
 * @export
 * @interface PaymentMethodsApiDetachPaymentMethodFromCustomerRequest
 */
export interface PaymentMethodsApiDetachPaymentMethodFromCustomerRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof PaymentMethodsApiDetachPaymentMethodFromCustomer
     */
    readonly tilled_account: string

    /**
     * 
     * @type {string}
     * @memberof PaymentMethodsApiDetachPaymentMethodFromCustomer
     */
    readonly id: string
}

/**
 * Request parameters for getPaymentMethod operation in PaymentMethodsApi.
 * @export
 * @interface PaymentMethodsApiGetPaymentMethodRequest
 */
export interface PaymentMethodsApiGetPaymentMethodRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof PaymentMethodsApiGetPaymentMethod
     */
    readonly tilled_account: string

    /**
     * 
     * @type {string}
     * @memberof PaymentMethodsApiGetPaymentMethod
     */
    readonly id: string
}

/**
 * Request parameters for listPaymentMethods operation in PaymentMethodsApi.
 * @export
 * @interface PaymentMethodsApiListPaymentMethodsRequest
 */
export interface PaymentMethodsApiListPaymentMethodsRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof PaymentMethodsApiListPaymentMethods
     */
    readonly tilled_account: string

    /**
     * Only return payment methods of the given type.
     * @type {'card' | 'ach_debit' | 'eft_debit'}
     * @memberof PaymentMethodsApiListPaymentMethods
     */
    readonly type: 'card' | 'ach_debit' | 'eft_debit'

    /**
     * Customer identifier
     * @type {string}
     * @memberof PaymentMethodsApiListPaymentMethods
     */
    readonly customer_id: string

    /**
     * &#x60;metadata&#x60; key-value pairs to filter by. Only exact matches on the key-value pair(s) will be returned. Example: &#x60;?metadata[internal_customer_id]&#x3D;7cb1159d-875e-47ae-a309-319fa7ff395b&#x60;.
     * @type {{ [key: string]: string; }}
     * @memberof PaymentMethodsApiListPaymentMethods
     */
    readonly metadata?: { [key: string]: string; }

    /**
     * The (zero-based) offset of the first item in the collection to return.
     * @type {number}
     * @memberof PaymentMethodsApiListPaymentMethods
     */
    readonly offset?: number

    /**
     * The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
     * @type {number}
     * @memberof PaymentMethodsApiListPaymentMethods
     */
    readonly limit?: number
}

/**
 * Request parameters for updatePaymentMethod operation in PaymentMethodsApi.
 * @export
 * @interface PaymentMethodsApiUpdatePaymentMethodRequest
 */
export interface PaymentMethodsApiUpdatePaymentMethodRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof PaymentMethodsApiUpdatePaymentMethod
     */
    readonly tilled_account: string

    /**
     * 
     * @type {string}
     * @memberof PaymentMethodsApiUpdatePaymentMethod
     */
    readonly id: string

    /**
     * 
     * @type {PaymentMethodUpdateParams}
     * @memberof PaymentMethodsApiUpdatePaymentMethod
     */
    readonly PaymentMethodUpdateParams: PaymentMethodUpdateParams
}

/**
 * PaymentMethodsApi - object-oriented interface
 * @export
 * @class PaymentMethodsApi
 * @extends {BaseAPI}
 */
export class PaymentMethodsApi extends BaseAPI {
    /**
     * Attaches a PaymentMethod to a Customer. This effectively changes the payment method from single-use to reusable.
     * @summary Attach a Payment Method to a Customer
     * @param {PaymentMethodsApiAttachPaymentMethodToCustomerRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentMethodsApi
     */
    public attachPaymentMethodToCustomer(requestParameters: PaymentMethodsApiAttachPaymentMethodToCustomerRequest, options?: AxiosRequestConfig) {
        return PaymentMethodsApiFp(this.configuration).attachPaymentMethodToCustomer(requestParameters.tilled_account, requestParameters.id, requestParameters.PaymentMethodAttachParams, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Creates an ACH Debit Single-Use Token, for use in creating a PaymentMethod.
     * @summary Create an ACH Debit Single-Use Token
     * @param {PaymentMethodsApiCreateAchDebitSingleUseTokenRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @deprecated
     * @throws {RequiredError}
     * @memberof PaymentMethodsApi
     */
    public createAchDebitSingleUseToken(requestParameters: PaymentMethodsApiCreateAchDebitSingleUseTokenRequest, options?: AxiosRequestConfig) {
        return PaymentMethodsApiFp(this.configuration).createAchDebitSingleUseToken(requestParameters.tilled_account, requestParameters.PaymentMethodCreateAchDebitSingleUseTokenParams, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Creates a PaymentMethod object. Read the [Tilled.js reference](#section/Tilled.js) to learn how to create PaymentMethods via Tilled.js. One of the following is required to create a payment method: `card`, `payment_token`, `ach_debit`, or `eft_debit`.  Note: If you would like to use this endpoint to submit raw cardholder data directly to Tilled\'s API (and not use Tilled.js), you must first submit your PCI Attestation of Compliance (AOC) to Tilled that shows you are currently compliant with the applicable PCI/DSS requirements. Please contact integrations@tilled.com for information on how to submit your documentation.
     * @summary Create a Payment Method
     * @param {PaymentMethodsApiCreatePaymentMethodRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentMethodsApi
     */
    public createPaymentMethod(requestParameters: PaymentMethodsApiCreatePaymentMethodRequest, options?: AxiosRequestConfig) {
        return PaymentMethodsApiFp(this.configuration).createPaymentMethod(requestParameters.tilled_account, requestParameters.PaymentMethodCreateParams, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Detaches a PaymentMethod from a Customer. Once a payment method is detached it can no longer be used to make a charge.
     * @summary Detach a Payment Method from a Customer
     * @param {PaymentMethodsApiDetachPaymentMethodFromCustomerRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentMethodsApi
     */
    public detachPaymentMethodFromCustomer(requestParameters: PaymentMethodsApiDetachPaymentMethodFromCustomerRequest, options?: AxiosRequestConfig) {
        return PaymentMethodsApiFp(this.configuration).detachPaymentMethodFromCustomer(requestParameters.tilled_account, requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Retrieves a PaymentMethod object.
     * @summary Get a Payment Method
     * @param {PaymentMethodsApiGetPaymentMethodRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentMethodsApi
     */
    public getPaymentMethod(requestParameters: PaymentMethodsApiGetPaymentMethodRequest, options?: AxiosRequestConfig) {
        return PaymentMethodsApiFp(this.configuration).getPaymentMethod(requestParameters.tilled_account, requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns a list of PaymentMethods for a given Customer.
     * @summary List a Customer\'s Payment Methods
     * @param {PaymentMethodsApiListPaymentMethodsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentMethodsApi
     */
    public listPaymentMethods(requestParameters: PaymentMethodsApiListPaymentMethodsRequest, options?: AxiosRequestConfig) {
        return PaymentMethodsApiFp(this.configuration).listPaymentMethods(requestParameters.tilled_account, requestParameters.type, requestParameters.customer_id, requestParameters.metadata, requestParameters.offset, requestParameters.limit, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Updates a PaymentMethod object. A PaymentMethod must be attached to a customer to be updated.
     * @summary Update a Payment Method
     * @param {PaymentMethodsApiUpdatePaymentMethodRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PaymentMethodsApi
     */
    public updatePaymentMethod(requestParameters: PaymentMethodsApiUpdatePaymentMethodRequest, options?: AxiosRequestConfig) {
        return PaymentMethodsApiFp(this.configuration).updatePaymentMethod(requestParameters.tilled_account, requestParameters.id, requestParameters.PaymentMethodUpdateParams, options).then((request) => request(this.axios, this.basePath));
    }
}
