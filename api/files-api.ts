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
import { ListFiles200Response } from '../model';
/**
 * FilesApi - axios parameter creator
 * @export
 */
export const FilesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Creates a File
         * @summary Create a File
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {File} file A file to upload. The file should follow the specifications of RFC 2388 (which defines file transfers for the multipart/form-data protocol).
         * @param {string} purpose The file purpose.
         * @param {string} [title] The user friendly file title.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createFile: async (tilled_account: string, file: File, purpose: string, title?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('createFile', 'tilled_account', tilled_account)
            // verify required parameter 'file' is not null or undefined
            assertParamExists('createFile', 'file', file)
            // verify required parameter 'purpose' is not null or undefined
            assertParamExists('createFile', 'purpose', purpose)
            const localVarPath = `/v1/files`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;
            const localVarFormParams = new ((configuration && configuration.formDataCtor) || FormData)();

            // authentication JWT required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            // authentication TilledApiKey required
            await setApiKeyToObject(localVarHeaderParameter, "tilled-api-key", configuration)

            if (tilled_account != null) {
                localVarHeaderParameter['tilled-account'] = String(tilled_account);
            }


            if (file !== undefined) { 
                localVarFormParams.append('file', file as any);
            }
    
            if (purpose !== undefined) { 
                localVarFormParams.append('purpose', purpose as any);
            }
    
            if (title !== undefined) { 
                localVarFormParams.append('title', title as any);
            }
    
    
            localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = localVarFormParams;

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Permanently delete a file
         * @summary Delete a File
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteFile: async (tilled_account: string, id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('deleteFile', 'tilled_account', tilled_account)
            // verify required parameter 'id' is not null or undefined
            assertParamExists('deleteFile', 'id', id)
            const localVarPath = `/v1/files/{id}`
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
         * Gets the contents of a file with the given ID.
         * @summary Get the Contents of a File
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getContentsOfFile: async (tilled_account: string, id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('getContentsOfFile', 'tilled_account', tilled_account)
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getContentsOfFile', 'id', id)
            const localVarPath = `/v1/files/{id}/contents`
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
         * Retrieves the file with the given ID.
         * @summary Get a File
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getFile: async (tilled_account: string, id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('getFile', 'tilled_account', tilled_account)
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getFile', 'id', id)
            const localVarPath = `/v1/files/{id}`
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
         * Returns a list of uploaded files
         * @summary List all Files
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {Array<'logo' | 'icon' | 'dispute_evidence' | 'onboarding_documentation'>} [purposes] A list of file purposes to filter on.
         * @param {number} [offset] The (zero-based) offset of the first item in the collection to return.
         * @param {number} [limit] The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFiles: async (tilled_account: string, purposes?: Array<'logo' | 'icon' | 'dispute_evidence' | 'onboarding_documentation'>, offset?: number, limit?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('listFiles', 'tilled_account', tilled_account)
            const localVarPath = `/v1/files`;
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

            if (purposes) {
                localVarQueryParameter['purposes'] = purposes;
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
    }
};

/**
 * FilesApi - functional programming interface
 * @export
 */
export const FilesApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = FilesApiAxiosParamCreator(configuration)
    return {
        /**
         * Creates a File
         * @summary Create a File
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {File} file A file to upload. The file should follow the specifications of RFC 2388 (which defines file transfers for the multipart/form-data protocol).
         * @param {string} purpose The file purpose.
         * @param {string} [title] The user friendly file title.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createFile(tilled_account: string, file: File, purpose: string, title?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<any>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createFile(tilled_account, file, purpose, title, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Permanently delete a file
         * @summary Delete a File
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteFile(tilled_account: string, id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteFile(tilled_account, id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Gets the contents of a file with the given ID.
         * @summary Get the Contents of a File
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getContentsOfFile(tilled_account: string, id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<File>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getContentsOfFile(tilled_account, id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Retrieves the file with the given ID.
         * @summary Get a File
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getFile(tilled_account: string, id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<any>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getFile(tilled_account, id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns a list of uploaded files
         * @summary List all Files
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {Array<'logo' | 'icon' | 'dispute_evidence' | 'onboarding_documentation'>} [purposes] A list of file purposes to filter on.
         * @param {number} [offset] The (zero-based) offset of the first item in the collection to return.
         * @param {number} [limit] The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listFiles(tilled_account: string, purposes?: Array<'logo' | 'icon' | 'dispute_evidence' | 'onboarding_documentation'>, offset?: number, limit?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ListFiles200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listFiles(tilled_account, purposes, offset, limit, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * FilesApi - factory interface
 * @export
 */
export const FilesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = FilesApiFp(configuration)
    return {
        /**
         * Creates a File
         * @summary Create a File
         * @param {FilesApiCreateFileRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createFile(requestParameters: FilesApiCreateFileRequest, options?: AxiosRequestConfig): AxiosPromise<any> {
            return localVarFp.createFile(requestParameters.tilled_account, requestParameters.file, requestParameters.purpose, requestParameters.title, options).then((request) => request(axios, basePath));
        },
        /**
         * Permanently delete a file
         * @summary Delete a File
         * @param {FilesApiDeleteFileRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteFile(requestParameters: FilesApiDeleteFileRequest, options?: AxiosRequestConfig): AxiosPromise<object> {
            return localVarFp.deleteFile(requestParameters.tilled_account, requestParameters.id, options).then((request) => request(axios, basePath));
        },
        /**
         * Gets the contents of a file with the given ID.
         * @summary Get the Contents of a File
         * @param {FilesApiGetContentsOfFileRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getContentsOfFile(requestParameters: FilesApiGetContentsOfFileRequest, options?: AxiosRequestConfig): AxiosPromise<File> {
            return localVarFp.getContentsOfFile(requestParameters.tilled_account, requestParameters.id, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieves the file with the given ID.
         * @summary Get a File
         * @param {FilesApiGetFileRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getFile(requestParameters: FilesApiGetFileRequest, options?: AxiosRequestConfig): AxiosPromise<any> {
            return localVarFp.getFile(requestParameters.tilled_account, requestParameters.id, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns a list of uploaded files
         * @summary List all Files
         * @param {FilesApiListFilesRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFiles(requestParameters: FilesApiListFilesRequest, options?: AxiosRequestConfig): AxiosPromise<ListFiles200Response> {
            return localVarFp.listFiles(requestParameters.tilled_account, requestParameters.purposes, requestParameters.offset, requestParameters.limit, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for createFile operation in FilesApi.
 * @export
 * @interface FilesApiCreateFileRequest
 */
export interface FilesApiCreateFileRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof FilesApiCreateFile
     */
    readonly tilled_account: string

    /**
     * A file to upload. The file should follow the specifications of RFC 2388 (which defines file transfers for the multipart/form-data protocol).
     * @type {File}
     * @memberof FilesApiCreateFile
     */
    readonly file: File

    /**
     * The file purpose.
     * @type {string}
     * @memberof FilesApiCreateFile
     */
    readonly purpose: string

    /**
     * The user friendly file title.
     * @type {string}
     * @memberof FilesApiCreateFile
     */
    readonly title?: string
}

/**
 * Request parameters for deleteFile operation in FilesApi.
 * @export
 * @interface FilesApiDeleteFileRequest
 */
export interface FilesApiDeleteFileRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof FilesApiDeleteFile
     */
    readonly tilled_account: string

    /**
     * 
     * @type {string}
     * @memberof FilesApiDeleteFile
     */
    readonly id: string
}

/**
 * Request parameters for getContentsOfFile operation in FilesApi.
 * @export
 * @interface FilesApiGetContentsOfFileRequest
 */
export interface FilesApiGetContentsOfFileRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof FilesApiGetContentsOfFile
     */
    readonly tilled_account: string

    /**
     * 
     * @type {string}
     * @memberof FilesApiGetContentsOfFile
     */
    readonly id: string
}

/**
 * Request parameters for getFile operation in FilesApi.
 * @export
 * @interface FilesApiGetFileRequest
 */
export interface FilesApiGetFileRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof FilesApiGetFile
     */
    readonly tilled_account: string

    /**
     * 
     * @type {string}
     * @memberof FilesApiGetFile
     */
    readonly id: string
}

/**
 * Request parameters for listFiles operation in FilesApi.
 * @export
 * @interface FilesApiListFilesRequest
 */
export interface FilesApiListFilesRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof FilesApiListFiles
     */
    readonly tilled_account: string

    /**
     * A list of file purposes to filter on.
     * @type {Array<'logo' | 'icon' | 'dispute_evidence' | 'onboarding_documentation'>}
     * @memberof FilesApiListFiles
     */
    readonly purposes?: Array<'logo' | 'icon' | 'dispute_evidence' | 'onboarding_documentation'>

    /**
     * The (zero-based) offset of the first item in the collection to return.
     * @type {number}
     * @memberof FilesApiListFiles
     */
    readonly offset?: number

    /**
     * The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
     * @type {number}
     * @memberof FilesApiListFiles
     */
    readonly limit?: number
}

/**
 * FilesApi - object-oriented interface
 * @export
 * @class FilesApi
 * @extends {BaseAPI}
 */
export class FilesApi extends BaseAPI {
    /**
     * Creates a File
     * @summary Create a File
     * @param {FilesApiCreateFileRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FilesApi
     */
    public createFile(requestParameters: FilesApiCreateFileRequest, options?: AxiosRequestConfig) {
        return FilesApiFp(this.configuration).createFile(requestParameters.tilled_account, requestParameters.file, requestParameters.purpose, requestParameters.title, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Permanently delete a file
     * @summary Delete a File
     * @param {FilesApiDeleteFileRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FilesApi
     */
    public deleteFile(requestParameters: FilesApiDeleteFileRequest, options?: AxiosRequestConfig) {
        return FilesApiFp(this.configuration).deleteFile(requestParameters.tilled_account, requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Gets the contents of a file with the given ID.
     * @summary Get the Contents of a File
     * @param {FilesApiGetContentsOfFileRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FilesApi
     */
    public getContentsOfFile(requestParameters: FilesApiGetContentsOfFileRequest, options?: AxiosRequestConfig) {
        return FilesApiFp(this.configuration).getContentsOfFile(requestParameters.tilled_account, requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Retrieves the file with the given ID.
     * @summary Get a File
     * @param {FilesApiGetFileRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FilesApi
     */
    public getFile(requestParameters: FilesApiGetFileRequest, options?: AxiosRequestConfig) {
        return FilesApiFp(this.configuration).getFile(requestParameters.tilled_account, requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns a list of uploaded files
     * @summary List all Files
     * @param {FilesApiListFilesRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FilesApi
     */
    public listFiles(requestParameters: FilesApiListFilesRequest, options?: AxiosRequestConfig) {
        return FilesApiFp(this.configuration).listFiles(requestParameters.tilled_account, requestParameters.purposes, requestParameters.offset, requestParameters.limit, options).then((request) => request(this.axios, this.basePath));
    }
}
