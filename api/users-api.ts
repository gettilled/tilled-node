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
import { AccessTokenRefreshParams } from '../model';
// @ts-ignore
import { ForgotPasswordParams } from '../model';
// @ts-ignore
import { ListUserInvitations200Response } from '../model';
// @ts-ignore
import { ListUsers200Response } from '../model';
// @ts-ignore
import { LoginDto } from '../model';
// @ts-ignore
import { LoginParams } from '../model';
// @ts-ignore
import { RegisterDto } from '../model';
// @ts-ignore
import { RegisterParams } from '../model';
// @ts-ignore
import { User } from '../model';
// @ts-ignore
import { UserCreateParams } from '../model';
// @ts-ignore
import { UserInvitation } from '../model';
// @ts-ignore
import { UserInvitationCheck } from '../model';
// @ts-ignore
import { UserInvitationCreateParams } from '../model';
// @ts-ignore
import { UserResetPasswordParams } from '../model';
// @ts-ignore
import { UserUpdateParams } from '../model';
/**
 * UsersApi - axios parameter creator
 * @export
 */
export const UsersApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Checks the existence of the user invitation with the given ID.
         * @summary Check a User Invitation
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        checkUserInvitation: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('checkUserInvitation', 'id', id)
            const localVarPath = `/v1/user-invitations/check/{id}`
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


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Creates a user.
         * @summary Create a User
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {UserCreateParams} UserCreateParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createUser: async (tilled_account: string, UserCreateParams: UserCreateParams, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('createUser', 'tilled_account', tilled_account)
            // verify required parameter 'UserCreateParams' is not null or undefined
            assertParamExists('createUser', 'UserCreateParams', UserCreateParams)
            const localVarPath = `/v1/users`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(UserCreateParams, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Creates a user invitation that is subsequently sent to the specified `email`. Once the user registers for an account, the invitation is deleted.
         * @summary Create a User Invitation
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {UserInvitationCreateParams} UserInvitationCreateParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createUserInvitation: async (tilled_account: string, UserInvitationCreateParams: UserInvitationCreateParams, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('createUserInvitation', 'tilled_account', tilled_account)
            // verify required parameter 'UserInvitationCreateParams' is not null or undefined
            assertParamExists('createUserInvitation', 'UserInvitationCreateParams', UserInvitationCreateParams)
            const localVarPath = `/v1/user-invitations`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(UserInvitationCreateParams, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Permanently deletes a user. It cannot be undone.
         * @summary Delete a User
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteUser: async (tilled_account: string, id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('deleteUser', 'tilled_account', tilled_account)
            // verify required parameter 'id' is not null or undefined
            assertParamExists('deleteUser', 'id', id)
            const localVarPath = `/v1/users/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
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
         * Permanently deletes a user invitation.
         * @summary Delete a User Invitation
         * @param {string} id 
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteUserInvitation: async (id: string, tilled_account: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('deleteUserInvitation', 'id', id)
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('deleteUserInvitation', 'tilled_account', tilled_account)
            const localVarPath = `/v1/user-invitations/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
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
         * Request a temporary link be sent to the supplied email address that will allow the user to reset their password.
         * @summary Forgot Password
         * @param {ForgotPasswordParams} ForgotPasswordParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        forgotPassword: async (ForgotPasswordParams: ForgotPasswordParams, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'ForgotPasswordParams' is not null or undefined
            assertParamExists('forgotPassword', 'ForgotPasswordParams', ForgotPasswordParams)
            const localVarPath = `/v1/auth/forgot`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(ForgotPasswordParams, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Retrieves the user with the given ID.
         * @summary Get a User
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUser: async (tilled_account: string, id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('getUser', 'tilled_account', tilled_account)
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getUser', 'id', id)
            const localVarPath = `/v1/users/{id}`
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
         * Retrieves the user invitation with the given ID.
         * @summary Get a User Invitation
         * @param {string} id 
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUserInvitation: async (id: string, tilled_account: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getUserInvitation', 'id', id)
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('getUserInvitation', 'tilled_account', tilled_account)
            const localVarPath = `/v1/user-invitations/{id}`
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
         * Returns a list of your account\'s user invitations.
         * @summary List all User Invitations
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {number} [offset] The (zero-based) offset of the first item in the collection to return.
         * @param {number} [limit] The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listUserInvitations: async (tilled_account: string, offset?: number, limit?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('listUserInvitations', 'tilled_account', tilled_account)
            const localVarPath = `/v1/user-invitations`;
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
         * Returns a list of your account\'s users.
         * @summary List all Users
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {number} [offset] The (zero-based) offset of the first item in the collection to return.
         * @param {number} [limit] The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listUsers: async (tilled_account: string, offset?: number, limit?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('listUsers', 'tilled_account', tilled_account)
            const localVarPath = `/v1/users`;
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
         * Creates a JSON Web Token with email and password.
         * @summary Login
         * @param {LoginParams} LoginParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        login: async (LoginParams: LoginParams, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'LoginParams' is not null or undefined
            assertParamExists('login', 'LoginParams', LoginParams)
            const localVarPath = `/v1/auth/login`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(LoginParams, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Invalidates the refresh token for a user.
         * @summary Logout
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        logout: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/v1/auth/logout`;
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


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Generate a new access token with a user\'s refresh token.
         * @summary Refresh an Access Token
         * @param {AccessTokenRefreshParams} AccessTokenRefreshParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        refreshAccessToken: async (AccessTokenRefreshParams: AccessTokenRefreshParams, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'AccessTokenRefreshParams' is not null or undefined
            assertParamExists('refreshAccessToken', 'AccessTokenRefreshParams', AccessTokenRefreshParams)
            const localVarPath = `/v1/auth/refresh`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(AccessTokenRefreshParams, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Creates a Tilled user and simultaneously creates a `partner` account. *Note: This resource should almost never be used by an existing Tilled customer.*
         * @summary Register
         * @param {RegisterParams} RegisterParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        register: async (RegisterParams: RegisterParams, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'RegisterParams' is not null or undefined
            assertParamExists('register', 'RegisterParams', RegisterParams)
            const localVarPath = `/v1/auth/register`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(RegisterParams, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Resends the user invitation with the given ID.
         * @summary Resend a User Invitation
         * @param {string} id 
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        resendUserInvitation: async (id: string, tilled_account: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('resendUserInvitation', 'id', id)
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('resendUserInvitation', 'tilled_account', tilled_account)
            const localVarPath = `/v1/user-invitations/{id}/resend`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
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


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Reset a user\'s password with the supplied `password_reset_token`. This will also invalidate a user\'s refresh token.
         * @summary Reset Password
         * @param {UserResetPasswordParams} UserResetPasswordParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        resetPassword: async (UserResetPasswordParams: UserResetPasswordParams, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'UserResetPasswordParams' is not null or undefined
            assertParamExists('resetPassword', 'UserResetPasswordParams', UserResetPasswordParams)
            const localVarPath = `/v1/auth/reset`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(UserResetPasswordParams, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Updates the user. Any parameters not provided will be left unchanged.
         * @summary Update a User
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {UserUpdateParams} UserUpdateParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateUser: async (tilled_account: string, id: string, UserUpdateParams: UserUpdateParams, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('updateUser', 'tilled_account', tilled_account)
            // verify required parameter 'id' is not null or undefined
            assertParamExists('updateUser', 'id', id)
            // verify required parameter 'UserUpdateParams' is not null or undefined
            assertParamExists('updateUser', 'UserUpdateParams', UserUpdateParams)
            const localVarPath = `/v1/users/{id}`
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
            localVarRequestOptions.data = serializeDataIfNeeded(UserUpdateParams, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * UsersApi - functional programming interface
 * @export
 */
export const UsersApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = UsersApiAxiosParamCreator(configuration)
    return {
        /**
         * Checks the existence of the user invitation with the given ID.
         * @summary Check a User Invitation
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async checkUserInvitation(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserInvitationCheck>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.checkUserInvitation(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Creates a user.
         * @summary Create a User
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {UserCreateParams} UserCreateParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createUser(tilled_account: string, UserCreateParams: UserCreateParams, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<User>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createUser(tilled_account, UserCreateParams, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Creates a user invitation that is subsequently sent to the specified `email`. Once the user registers for an account, the invitation is deleted.
         * @summary Create a User Invitation
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {UserInvitationCreateParams} UserInvitationCreateParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createUserInvitation(tilled_account: string, UserInvitationCreateParams: UserInvitationCreateParams, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserInvitation>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createUserInvitation(tilled_account, UserInvitationCreateParams, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Permanently deletes a user. It cannot be undone.
         * @summary Delete a User
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteUser(tilled_account: string, id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteUser(tilled_account, id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Permanently deletes a user invitation.
         * @summary Delete a User Invitation
         * @param {string} id 
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteUserInvitation(id: string, tilled_account: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteUserInvitation(id, tilled_account, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Request a temporary link be sent to the supplied email address that will allow the user to reset their password.
         * @summary Forgot Password
         * @param {ForgotPasswordParams} ForgotPasswordParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async forgotPassword(ForgotPasswordParams: ForgotPasswordParams, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.forgotPassword(ForgotPasswordParams, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Retrieves the user with the given ID.
         * @summary Get a User
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getUser(tilled_account: string, id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<User>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getUser(tilled_account, id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Retrieves the user invitation with the given ID.
         * @summary Get a User Invitation
         * @param {string} id 
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getUserInvitation(id: string, tilled_account: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserInvitation>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getUserInvitation(id, tilled_account, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns a list of your account\'s user invitations.
         * @summary List all User Invitations
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {number} [offset] The (zero-based) offset of the first item in the collection to return.
         * @param {number} [limit] The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listUserInvitations(tilled_account: string, offset?: number, limit?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ListUserInvitations200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listUserInvitations(tilled_account, offset, limit, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns a list of your account\'s users.
         * @summary List all Users
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {number} [offset] The (zero-based) offset of the first item in the collection to return.
         * @param {number} [limit] The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listUsers(tilled_account: string, offset?: number, limit?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ListUsers200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listUsers(tilled_account, offset, limit, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Creates a JSON Web Token with email and password.
         * @summary Login
         * @param {LoginParams} LoginParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async login(LoginParams: LoginParams, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LoginDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.login(LoginParams, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Invalidates the refresh token for a user.
         * @summary Logout
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async logout(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.logout(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Generate a new access token with a user\'s refresh token.
         * @summary Refresh an Access Token
         * @param {AccessTokenRefreshParams} AccessTokenRefreshParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async refreshAccessToken(AccessTokenRefreshParams: AccessTokenRefreshParams, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.refreshAccessToken(AccessTokenRefreshParams, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Creates a Tilled user and simultaneously creates a `partner` account. *Note: This resource should almost never be used by an existing Tilled customer.*
         * @summary Register
         * @param {RegisterParams} RegisterParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async register(RegisterParams: RegisterParams, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RegisterDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.register(RegisterParams, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Resends the user invitation with the given ID.
         * @summary Resend a User Invitation
         * @param {string} id 
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async resendUserInvitation(id: string, tilled_account: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserInvitation>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.resendUserInvitation(id, tilled_account, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Reset a user\'s password with the supplied `password_reset_token`. This will also invalidate a user\'s refresh token.
         * @summary Reset Password
         * @param {UserResetPasswordParams} UserResetPasswordParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async resetPassword(UserResetPasswordParams: UserResetPasswordParams, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.resetPassword(UserResetPasswordParams, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Updates the user. Any parameters not provided will be left unchanged.
         * @summary Update a User
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {UserUpdateParams} UserUpdateParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateUser(tilled_account: string, id: string, UserUpdateParams: UserUpdateParams, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<User>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateUser(tilled_account, id, UserUpdateParams, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * UsersApi - factory interface
 * @export
 */
export const UsersApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = UsersApiFp(configuration)
    return {
        /**
         * Checks the existence of the user invitation with the given ID.
         * @summary Check a User Invitation
         * @param {UsersApiCheckUserInvitationRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        checkUserInvitation(requestParameters: UsersApiCheckUserInvitationRequest, options?: AxiosRequestConfig): AxiosPromise<UserInvitationCheck> {
            return localVarFp.checkUserInvitation(requestParameters.id, options).then((request) => request(axios, basePath));
        },
        /**
         * Creates a user.
         * @summary Create a User
         * @param {UsersApiCreateUserRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createUser(requestParameters: UsersApiCreateUserRequest, options?: AxiosRequestConfig): AxiosPromise<User> {
            return localVarFp.createUser(requestParameters.tilled_account, requestParameters.UserCreateParams, options).then((request) => request(axios, basePath));
        },
        /**
         * Creates a user invitation that is subsequently sent to the specified `email`. Once the user registers for an account, the invitation is deleted.
         * @summary Create a User Invitation
         * @param {UsersApiCreateUserInvitationRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createUserInvitation(requestParameters: UsersApiCreateUserInvitationRequest, options?: AxiosRequestConfig): AxiosPromise<UserInvitation> {
            return localVarFp.createUserInvitation(requestParameters.tilled_account, requestParameters.UserInvitationCreateParams, options).then((request) => request(axios, basePath));
        },
        /**
         * Permanently deletes a user. It cannot be undone.
         * @summary Delete a User
         * @param {UsersApiDeleteUserRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteUser(requestParameters: UsersApiDeleteUserRequest, options?: AxiosRequestConfig): AxiosPromise<object> {
            return localVarFp.deleteUser(requestParameters.tilled_account, requestParameters.id, options).then((request) => request(axios, basePath));
        },
        /**
         * Permanently deletes a user invitation.
         * @summary Delete a User Invitation
         * @param {UsersApiDeleteUserInvitationRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteUserInvitation(requestParameters: UsersApiDeleteUserInvitationRequest, options?: AxiosRequestConfig): AxiosPromise<object> {
            return localVarFp.deleteUserInvitation(requestParameters.id, requestParameters.tilled_account, options).then((request) => request(axios, basePath));
        },
        /**
         * Request a temporary link be sent to the supplied email address that will allow the user to reset their password.
         * @summary Forgot Password
         * @param {UsersApiForgotPasswordRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        forgotPassword(requestParameters: UsersApiForgotPasswordRequest, options?: AxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.forgotPassword(requestParameters.ForgotPasswordParams, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieves the user with the given ID.
         * @summary Get a User
         * @param {UsersApiGetUserRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUser(requestParameters: UsersApiGetUserRequest, options?: AxiosRequestConfig): AxiosPromise<User> {
            return localVarFp.getUser(requestParameters.tilled_account, requestParameters.id, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieves the user invitation with the given ID.
         * @summary Get a User Invitation
         * @param {UsersApiGetUserInvitationRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUserInvitation(requestParameters: UsersApiGetUserInvitationRequest, options?: AxiosRequestConfig): AxiosPromise<UserInvitation> {
            return localVarFp.getUserInvitation(requestParameters.id, requestParameters.tilled_account, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns a list of your account\'s user invitations.
         * @summary List all User Invitations
         * @param {UsersApiListUserInvitationsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listUserInvitations(requestParameters: UsersApiListUserInvitationsRequest, options?: AxiosRequestConfig): AxiosPromise<ListUserInvitations200Response> {
            return localVarFp.listUserInvitations(requestParameters.tilled_account, requestParameters.offset, requestParameters.limit, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns a list of your account\'s users.
         * @summary List all Users
         * @param {UsersApiListUsersRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listUsers(requestParameters: UsersApiListUsersRequest, options?: AxiosRequestConfig): AxiosPromise<ListUsers200Response> {
            return localVarFp.listUsers(requestParameters.tilled_account, requestParameters.offset, requestParameters.limit, options).then((request) => request(axios, basePath));
        },
        /**
         * Creates a JSON Web Token with email and password.
         * @summary Login
         * @param {UsersApiLoginRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        login(requestParameters: UsersApiLoginRequest, options?: AxiosRequestConfig): AxiosPromise<LoginDto> {
            return localVarFp.login(requestParameters.LoginParams, options).then((request) => request(axios, basePath));
        },
        /**
         * Invalidates the refresh token for a user.
         * @summary Logout
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        logout(options?: AxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.logout(options).then((request) => request(axios, basePath));
        },
        /**
         * Generate a new access token with a user\'s refresh token.
         * @summary Refresh an Access Token
         * @param {UsersApiRefreshAccessTokenRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        refreshAccessToken(requestParameters: UsersApiRefreshAccessTokenRequest, options?: AxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.refreshAccessToken(requestParameters.AccessTokenRefreshParams, options).then((request) => request(axios, basePath));
        },
        /**
         * Creates a Tilled user and simultaneously creates a `partner` account. *Note: This resource should almost never be used by an existing Tilled customer.*
         * @summary Register
         * @param {UsersApiRegisterRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        register(requestParameters: UsersApiRegisterRequest, options?: AxiosRequestConfig): AxiosPromise<RegisterDto> {
            return localVarFp.register(requestParameters.RegisterParams, options).then((request) => request(axios, basePath));
        },
        /**
         * Resends the user invitation with the given ID.
         * @summary Resend a User Invitation
         * @param {UsersApiResendUserInvitationRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        resendUserInvitation(requestParameters: UsersApiResendUserInvitationRequest, options?: AxiosRequestConfig): AxiosPromise<UserInvitation> {
            return localVarFp.resendUserInvitation(requestParameters.id, requestParameters.tilled_account, options).then((request) => request(axios, basePath));
        },
        /**
         * Reset a user\'s password with the supplied `password_reset_token`. This will also invalidate a user\'s refresh token.
         * @summary Reset Password
         * @param {UsersApiResetPasswordRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        resetPassword(requestParameters: UsersApiResetPasswordRequest, options?: AxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.resetPassword(requestParameters.UserResetPasswordParams, options).then((request) => request(axios, basePath));
        },
        /**
         * Updates the user. Any parameters not provided will be left unchanged.
         * @summary Update a User
         * @param {UsersApiUpdateUserRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateUser(requestParameters: UsersApiUpdateUserRequest, options?: AxiosRequestConfig): AxiosPromise<User> {
            return localVarFp.updateUser(requestParameters.tilled_account, requestParameters.id, requestParameters.UserUpdateParams, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for checkUserInvitation operation in UsersApi.
 * @export
 * @interface UsersApiCheckUserInvitationRequest
 */
export interface UsersApiCheckUserInvitationRequest {
    /**
     * 
     * @type {string}
     * @memberof UsersApiCheckUserInvitation
     */
    readonly id: string
}

/**
 * Request parameters for createUser operation in UsersApi.
 * @export
 * @interface UsersApiCreateUserRequest
 */
export interface UsersApiCreateUserRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof UsersApiCreateUser
     */
    readonly tilled_account: string

    /**
     * 
     * @type {UserCreateParams}
     * @memberof UsersApiCreateUser
     */
    readonly UserCreateParams: UserCreateParams
}

/**
 * Request parameters for createUserInvitation operation in UsersApi.
 * @export
 * @interface UsersApiCreateUserInvitationRequest
 */
export interface UsersApiCreateUserInvitationRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof UsersApiCreateUserInvitation
     */
    readonly tilled_account: string

    /**
     * 
     * @type {UserInvitationCreateParams}
     * @memberof UsersApiCreateUserInvitation
     */
    readonly UserInvitationCreateParams: UserInvitationCreateParams
}

/**
 * Request parameters for deleteUser operation in UsersApi.
 * @export
 * @interface UsersApiDeleteUserRequest
 */
export interface UsersApiDeleteUserRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof UsersApiDeleteUser
     */
    readonly tilled_account: string

    /**
     * 
     * @type {string}
     * @memberof UsersApiDeleteUser
     */
    readonly id: string
}

/**
 * Request parameters for deleteUserInvitation operation in UsersApi.
 * @export
 * @interface UsersApiDeleteUserInvitationRequest
 */
export interface UsersApiDeleteUserInvitationRequest {
    /**
     * 
     * @type {string}
     * @memberof UsersApiDeleteUserInvitation
     */
    readonly id: string

    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof UsersApiDeleteUserInvitation
     */
    readonly tilled_account: string
}

/**
 * Request parameters for forgotPassword operation in UsersApi.
 * @export
 * @interface UsersApiForgotPasswordRequest
 */
export interface UsersApiForgotPasswordRequest {
    /**
     * 
     * @type {ForgotPasswordParams}
     * @memberof UsersApiForgotPassword
     */
    readonly ForgotPasswordParams: ForgotPasswordParams
}

/**
 * Request parameters for getUser operation in UsersApi.
 * @export
 * @interface UsersApiGetUserRequest
 */
export interface UsersApiGetUserRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof UsersApiGetUser
     */
    readonly tilled_account: string

    /**
     * 
     * @type {string}
     * @memberof UsersApiGetUser
     */
    readonly id: string
}

/**
 * Request parameters for getUserInvitation operation in UsersApi.
 * @export
 * @interface UsersApiGetUserInvitationRequest
 */
export interface UsersApiGetUserInvitationRequest {
    /**
     * 
     * @type {string}
     * @memberof UsersApiGetUserInvitation
     */
    readonly id: string

    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof UsersApiGetUserInvitation
     */
    readonly tilled_account: string
}

/**
 * Request parameters for listUserInvitations operation in UsersApi.
 * @export
 * @interface UsersApiListUserInvitationsRequest
 */
export interface UsersApiListUserInvitationsRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof UsersApiListUserInvitations
     */
    readonly tilled_account: string

    /**
     * The (zero-based) offset of the first item in the collection to return.
     * @type {number}
     * @memberof UsersApiListUserInvitations
     */
    readonly offset?: number

    /**
     * The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
     * @type {number}
     * @memberof UsersApiListUserInvitations
     */
    readonly limit?: number
}

/**
 * Request parameters for listUsers operation in UsersApi.
 * @export
 * @interface UsersApiListUsersRequest
 */
export interface UsersApiListUsersRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof UsersApiListUsers
     */
    readonly tilled_account: string

    /**
     * The (zero-based) offset of the first item in the collection to return.
     * @type {number}
     * @memberof UsersApiListUsers
     */
    readonly offset?: number

    /**
     * The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
     * @type {number}
     * @memberof UsersApiListUsers
     */
    readonly limit?: number
}

/**
 * Request parameters for login operation in UsersApi.
 * @export
 * @interface UsersApiLoginRequest
 */
export interface UsersApiLoginRequest {
    /**
     * 
     * @type {LoginParams}
     * @memberof UsersApiLogin
     */
    readonly LoginParams: LoginParams
}

/**
 * Request parameters for refreshAccessToken operation in UsersApi.
 * @export
 * @interface UsersApiRefreshAccessTokenRequest
 */
export interface UsersApiRefreshAccessTokenRequest {
    /**
     * 
     * @type {AccessTokenRefreshParams}
     * @memberof UsersApiRefreshAccessToken
     */
    readonly AccessTokenRefreshParams: AccessTokenRefreshParams
}

/**
 * Request parameters for register operation in UsersApi.
 * @export
 * @interface UsersApiRegisterRequest
 */
export interface UsersApiRegisterRequest {
    /**
     * 
     * @type {RegisterParams}
     * @memberof UsersApiRegister
     */
    readonly RegisterParams: RegisterParams
}

/**
 * Request parameters for resendUserInvitation operation in UsersApi.
 * @export
 * @interface UsersApiResendUserInvitationRequest
 */
export interface UsersApiResendUserInvitationRequest {
    /**
     * 
     * @type {string}
     * @memberof UsersApiResendUserInvitation
     */
    readonly id: string

    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof UsersApiResendUserInvitation
     */
    readonly tilled_account: string
}

/**
 * Request parameters for resetPassword operation in UsersApi.
 * @export
 * @interface UsersApiResetPasswordRequest
 */
export interface UsersApiResetPasswordRequest {
    /**
     * 
     * @type {UserResetPasswordParams}
     * @memberof UsersApiResetPassword
     */
    readonly UserResetPasswordParams: UserResetPasswordParams
}

/**
 * Request parameters for updateUser operation in UsersApi.
 * @export
 * @interface UsersApiUpdateUserRequest
 */
export interface UsersApiUpdateUserRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof UsersApiUpdateUser
     */
    readonly tilled_account: string

    /**
     * 
     * @type {string}
     * @memberof UsersApiUpdateUser
     */
    readonly id: string

    /**
     * 
     * @type {UserUpdateParams}
     * @memberof UsersApiUpdateUser
     */
    readonly UserUpdateParams: UserUpdateParams
}

/**
 * UsersApi - object-oriented interface
 * @export
 * @class UsersApi
 * @extends {BaseAPI}
 */
export class UsersApi extends BaseAPI {
    /**
     * Checks the existence of the user invitation with the given ID.
     * @summary Check a User Invitation
     * @param {UsersApiCheckUserInvitationRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public checkUserInvitation(requestParameters: UsersApiCheckUserInvitationRequest, options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).checkUserInvitation(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Creates a user.
     * @summary Create a User
     * @param {UsersApiCreateUserRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public createUser(requestParameters: UsersApiCreateUserRequest, options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).createUser(requestParameters.tilled_account, requestParameters.UserCreateParams, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Creates a user invitation that is subsequently sent to the specified `email`. Once the user registers for an account, the invitation is deleted.
     * @summary Create a User Invitation
     * @param {UsersApiCreateUserInvitationRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public createUserInvitation(requestParameters: UsersApiCreateUserInvitationRequest, options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).createUserInvitation(requestParameters.tilled_account, requestParameters.UserInvitationCreateParams, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Permanently deletes a user. It cannot be undone.
     * @summary Delete a User
     * @param {UsersApiDeleteUserRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public deleteUser(requestParameters: UsersApiDeleteUserRequest, options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).deleteUser(requestParameters.tilled_account, requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Permanently deletes a user invitation.
     * @summary Delete a User Invitation
     * @param {UsersApiDeleteUserInvitationRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public deleteUserInvitation(requestParameters: UsersApiDeleteUserInvitationRequest, options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).deleteUserInvitation(requestParameters.id, requestParameters.tilled_account, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Request a temporary link be sent to the supplied email address that will allow the user to reset their password.
     * @summary Forgot Password
     * @param {UsersApiForgotPasswordRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public forgotPassword(requestParameters: UsersApiForgotPasswordRequest, options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).forgotPassword(requestParameters.ForgotPasswordParams, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Retrieves the user with the given ID.
     * @summary Get a User
     * @param {UsersApiGetUserRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public getUser(requestParameters: UsersApiGetUserRequest, options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).getUser(requestParameters.tilled_account, requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Retrieves the user invitation with the given ID.
     * @summary Get a User Invitation
     * @param {UsersApiGetUserInvitationRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public getUserInvitation(requestParameters: UsersApiGetUserInvitationRequest, options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).getUserInvitation(requestParameters.id, requestParameters.tilled_account, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns a list of your account\'s user invitations.
     * @summary List all User Invitations
     * @param {UsersApiListUserInvitationsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public listUserInvitations(requestParameters: UsersApiListUserInvitationsRequest, options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).listUserInvitations(requestParameters.tilled_account, requestParameters.offset, requestParameters.limit, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns a list of your account\'s users.
     * @summary List all Users
     * @param {UsersApiListUsersRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public listUsers(requestParameters: UsersApiListUsersRequest, options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).listUsers(requestParameters.tilled_account, requestParameters.offset, requestParameters.limit, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Creates a JSON Web Token with email and password.
     * @summary Login
     * @param {UsersApiLoginRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public login(requestParameters: UsersApiLoginRequest, options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).login(requestParameters.LoginParams, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Invalidates the refresh token for a user.
     * @summary Logout
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public logout(options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).logout(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Generate a new access token with a user\'s refresh token.
     * @summary Refresh an Access Token
     * @param {UsersApiRefreshAccessTokenRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public refreshAccessToken(requestParameters: UsersApiRefreshAccessTokenRequest, options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).refreshAccessToken(requestParameters.AccessTokenRefreshParams, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Creates a Tilled user and simultaneously creates a `partner` account. *Note: This resource should almost never be used by an existing Tilled customer.*
     * @summary Register
     * @param {UsersApiRegisterRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public register(requestParameters: UsersApiRegisterRequest, options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).register(requestParameters.RegisterParams, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Resends the user invitation with the given ID.
     * @summary Resend a User Invitation
     * @param {UsersApiResendUserInvitationRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public resendUserInvitation(requestParameters: UsersApiResendUserInvitationRequest, options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).resendUserInvitation(requestParameters.id, requestParameters.tilled_account, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Reset a user\'s password with the supplied `password_reset_token`. This will also invalidate a user\'s refresh token.
     * @summary Reset Password
     * @param {UsersApiResetPasswordRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public resetPassword(requestParameters: UsersApiResetPasswordRequest, options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).resetPassword(requestParameters.UserResetPasswordParams, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Updates the user. Any parameters not provided will be left unchanged.
     * @summary Update a User
     * @param {UsersApiUpdateUserRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public updateUser(requestParameters: UsersApiUpdateUserRequest, options?: AxiosRequestConfig) {
        return UsersApiFp(this.configuration).updateUser(requestParameters.tilled_account, requestParameters.id, requestParameters.UserUpdateParams, options).then((request) => request(this.axios, this.basePath));
    }
}
