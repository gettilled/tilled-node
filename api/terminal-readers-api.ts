/* tslint:disable */
/* eslint-disable */
/**
 * Tilled API
 * The Tilled API is organized around [REST](http://en.wikipedia.org/wiki/Representational_State_Transfer). Our API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.  Tilled’s API has two public environments, `sandbox` and `production`. The former does not affect live data or interact with banking networks. Prior to certification completion, only `sandbox` is available.  Authentication uses a standard web token schema.  **Notice**: Tilled’s API uses HTTP status `401` for `Unauthenticated` (not `Unauthorized`). Requests for unauthorized materials will receive a `403: Forbidden` response. [Learn more about error codes >](https://docs.tilled.com/docs/resources/error-codes)  ## Authentication  Tilled’s API uses API keys for authentication, which can be managed in the Tilled Dashboard. Keys created in the sandbox environment will not work in production nor will production credentials work in the sandbox.  Restricted API keys can provide granular permissions.  Keep your API keys secure and do not share them publicly, such as on GitHub or in client-side code. Authentication is done via the custom HTTP header `tilled-api-key`, with your API key as the value. All requests must be over HTTPS; HTTP requests will fail, as will unauthenticated requests.  ## JWT  Create a JSON Web Token (JWT) using our [Login endpoint](https://docs.tilled.com/api-reference#tag/users/post/v1/auth/login). Use the format: Bearer <JWT>. 
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
import { ListTerminalReaders200Response } from '../model';
// @ts-ignore
import { TerminalReader } from '../model';
// @ts-ignore
import { TerminalReaderConnectionStatus } from '../model';
// @ts-ignore
import { TerminalReaderUpdateParams } from '../model';
/**
 * TerminalReadersApi - axios parameter creator
 * @export
 */
export const TerminalReadersApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Retrieves the details of an existing Terminal Reader.
         * @summary Get a Terminal Reader
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTerminal: async (tilled_account: string, id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('getTerminal', 'tilled_account', tilled_account)
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getTerminal', 'id', id)
            const localVarPath = `/v1/terminal-readers/{id}`
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
         * Retrieves the network connection status of an existing Terminal Reader.
         * @summary Get a Terminal Reader status
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTerminalStatus: async (tilled_account: string, id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('getTerminalStatus', 'tilled_account', tilled_account)
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getTerminalStatus', 'id', id)
            const localVarPath = `/v1/terminal-readers/{id}/status`
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
         * Returns a list of an Account\'s Terminal Readers. The Terminal Readers are sorted with the most recently created appearing first.
         * @summary List all Terminal Readers
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {{ [key: string]: string; }} [metadata] &#x60;metadata&#x60; key-value pairs to filter by. Only exact matches on the key-value pair(s) will be returned. Example: &#x60;?metadata[internal_customer_id]&#x3D;7cb1159d-875e-47ae-a309-319fa7ff395b&#x60;.
         * @param {string} [q] The partial search of text fields. Supports searching by &#x60;terminal_reader.description&#x60;, &#x60;terminal_reader.serial_number&#x60;, &#x60;terminal_reader.type&#x60;
         * @param {boolean} [include_connected_accounts] Whether or not to include the results from any connected accounts.
         * @param {string} [created_at_gte] Minimum &#x60;created_at&#x60; value to filter by (inclusive).
         * @param {string} [created_at_lte] Maximum &#x60;created_at&#x60; value to filter by (inclusive).
         * @param {number} [offset] The (zero-based) offset of the first item in the collection to return.
         * @param {number} [limit] The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listTerminalReaders: async (tilled_account: string, metadata?: { [key: string]: string; }, q?: string, include_connected_accounts?: boolean, created_at_gte?: string, created_at_lte?: string, offset?: number, limit?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('listTerminalReaders', 'tilled_account', tilled_account)
            const localVarPath = `/v1/terminal-readers`;
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

            if (q !== undefined) {
                localVarQueryParameter['q'] = q;
            }

            if (include_connected_accounts !== undefined) {
                localVarQueryParameter['include_connected_accounts'] = include_connected_accounts;
            }

            if (created_at_gte !== undefined) {
                localVarQueryParameter['created_at_gte'] = (created_at_gte as any instanceof Date) ?
                    (created_at_gte as any).toISOString() :
                    created_at_gte;
            }

            if (created_at_lte !== undefined) {
                localVarQueryParameter['created_at_lte'] = (created_at_lte as any instanceof Date) ?
                    (created_at_lte as any).toISOString() :
                    created_at_lte;
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
         * Updates the Terminal Reader by setting the values of the provided parameters. Any parameters not provided will be left unchanged.
         * @summary Update a Terminal Reader
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {TerminalReaderUpdateParams} TerminalReaderUpdateParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateTerminal: async (tilled_account: string, id: string, TerminalReaderUpdateParams: TerminalReaderUpdateParams, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('updateTerminal', 'tilled_account', tilled_account)
            // verify required parameter 'id' is not null or undefined
            assertParamExists('updateTerminal', 'id', id)
            // verify required parameter 'TerminalReaderUpdateParams' is not null or undefined
            assertParamExists('updateTerminal', 'TerminalReaderUpdateParams', TerminalReaderUpdateParams)
            const localVarPath = `/v1/terminal-readers/{id}`
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


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(TerminalReaderUpdateParams, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * TerminalReadersApi - functional programming interface
 * @export
 */
export const TerminalReadersApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = TerminalReadersApiAxiosParamCreator(configuration)
    return {
        /**
         * Retrieves the details of an existing Terminal Reader.
         * @summary Get a Terminal Reader
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getTerminal(tilled_account: string, id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TerminalReader>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getTerminal(tilled_account, id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Retrieves the network connection status of an existing Terminal Reader.
         * @summary Get a Terminal Reader status
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getTerminalStatus(tilled_account: string, id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TerminalReaderConnectionStatus>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getTerminalStatus(tilled_account, id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns a list of an Account\'s Terminal Readers. The Terminal Readers are sorted with the most recently created appearing first.
         * @summary List all Terminal Readers
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {{ [key: string]: string; }} [metadata] &#x60;metadata&#x60; key-value pairs to filter by. Only exact matches on the key-value pair(s) will be returned. Example: &#x60;?metadata[internal_customer_id]&#x3D;7cb1159d-875e-47ae-a309-319fa7ff395b&#x60;.
         * @param {string} [q] The partial search of text fields. Supports searching by &#x60;terminal_reader.description&#x60;, &#x60;terminal_reader.serial_number&#x60;, &#x60;terminal_reader.type&#x60;
         * @param {boolean} [include_connected_accounts] Whether or not to include the results from any connected accounts.
         * @param {string} [created_at_gte] Minimum &#x60;created_at&#x60; value to filter by (inclusive).
         * @param {string} [created_at_lte] Maximum &#x60;created_at&#x60; value to filter by (inclusive).
         * @param {number} [offset] The (zero-based) offset of the first item in the collection to return.
         * @param {number} [limit] The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listTerminalReaders(tilled_account: string, metadata?: { [key: string]: string; }, q?: string, include_connected_accounts?: boolean, created_at_gte?: string, created_at_lte?: string, offset?: number, limit?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ListTerminalReaders200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listTerminalReaders(tilled_account, metadata, q, include_connected_accounts, created_at_gte, created_at_lte, offset, limit, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Updates the Terminal Reader by setting the values of the provided parameters. Any parameters not provided will be left unchanged.
         * @summary Update a Terminal Reader
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {TerminalReaderUpdateParams} TerminalReaderUpdateParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateTerminal(tilled_account: string, id: string, TerminalReaderUpdateParams: TerminalReaderUpdateParams, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TerminalReader>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateTerminal(tilled_account, id, TerminalReaderUpdateParams, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * TerminalReadersApi - factory interface
 * @export
 */
export const TerminalReadersApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = TerminalReadersApiFp(configuration)
    return {
        /**
         * Retrieves the details of an existing Terminal Reader.
         * @summary Get a Terminal Reader
         * @param {TerminalReadersApiGetTerminalRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTerminal(requestParameters: TerminalReadersApiGetTerminalRequest, options?: AxiosRequestConfig): AxiosPromise<TerminalReader> {
            return localVarFp.getTerminal(requestParameters.tilled_account, requestParameters.id, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieves the network connection status of an existing Terminal Reader.
         * @summary Get a Terminal Reader status
         * @param {TerminalReadersApiGetTerminalStatusRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTerminalStatus(requestParameters: TerminalReadersApiGetTerminalStatusRequest, options?: AxiosRequestConfig): AxiosPromise<TerminalReaderConnectionStatus> {
            return localVarFp.getTerminalStatus(requestParameters.tilled_account, requestParameters.id, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns a list of an Account\'s Terminal Readers. The Terminal Readers are sorted with the most recently created appearing first.
         * @summary List all Terminal Readers
         * @param {TerminalReadersApiListTerminalReadersRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listTerminalReaders(requestParameters: TerminalReadersApiListTerminalReadersRequest, options?: AxiosRequestConfig): AxiosPromise<ListTerminalReaders200Response> {
            return localVarFp.listTerminalReaders(requestParameters.tilled_account, requestParameters.metadata, requestParameters.q, requestParameters.include_connected_accounts, requestParameters.created_at_gte, requestParameters.created_at_lte, requestParameters.offset, requestParameters.limit, options).then((request) => request(axios, basePath));
        },
        /**
         * Updates the Terminal Reader by setting the values of the provided parameters. Any parameters not provided will be left unchanged.
         * @summary Update a Terminal Reader
         * @param {TerminalReadersApiUpdateTerminalRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateTerminal(requestParameters: TerminalReadersApiUpdateTerminalRequest, options?: AxiosRequestConfig): AxiosPromise<TerminalReader> {
            return localVarFp.updateTerminal(requestParameters.tilled_account, requestParameters.id, requestParameters.TerminalReaderUpdateParams, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for getTerminal operation in TerminalReadersApi.
 * @export
 * @interface TerminalReadersApiGetTerminalRequest
 */
export interface TerminalReadersApiGetTerminalRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof TerminalReadersApiGetTerminal
     */
    readonly tilled_account: string

    /**
     * 
     * @type {string}
     * @memberof TerminalReadersApiGetTerminal
     */
    readonly id: string
}

/**
 * Request parameters for getTerminalStatus operation in TerminalReadersApi.
 * @export
 * @interface TerminalReadersApiGetTerminalStatusRequest
 */
export interface TerminalReadersApiGetTerminalStatusRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof TerminalReadersApiGetTerminalStatus
     */
    readonly tilled_account: string

    /**
     * 
     * @type {string}
     * @memberof TerminalReadersApiGetTerminalStatus
     */
    readonly id: string
}

/**
 * Request parameters for listTerminalReaders operation in TerminalReadersApi.
 * @export
 * @interface TerminalReadersApiListTerminalReadersRequest
 */
export interface TerminalReadersApiListTerminalReadersRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof TerminalReadersApiListTerminalReaders
     */
    readonly tilled_account: string

    /**
     * &#x60;metadata&#x60; key-value pairs to filter by. Only exact matches on the key-value pair(s) will be returned. Example: &#x60;?metadata[internal_customer_id]&#x3D;7cb1159d-875e-47ae-a309-319fa7ff395b&#x60;.
     * @type {{ [key: string]: string; }}
     * @memberof TerminalReadersApiListTerminalReaders
     */
    readonly metadata?: { [key: string]: string; }

    /**
     * The partial search of text fields. Supports searching by &#x60;terminal_reader.description&#x60;, &#x60;terminal_reader.serial_number&#x60;, &#x60;terminal_reader.type&#x60;
     * @type {string}
     * @memberof TerminalReadersApiListTerminalReaders
     */
    readonly q?: string

    /**
     * Whether or not to include the results from any connected accounts.
     * @type {boolean}
     * @memberof TerminalReadersApiListTerminalReaders
     */
    readonly include_connected_accounts?: boolean

    /**
     * Minimum &#x60;created_at&#x60; value to filter by (inclusive).
     * @type {string}
     * @memberof TerminalReadersApiListTerminalReaders
     */
    readonly created_at_gte?: string

    /**
     * Maximum &#x60;created_at&#x60; value to filter by (inclusive).
     * @type {string}
     * @memberof TerminalReadersApiListTerminalReaders
     */
    readonly created_at_lte?: string

    /**
     * The (zero-based) offset of the first item in the collection to return.
     * @type {number}
     * @memberof TerminalReadersApiListTerminalReaders
     */
    readonly offset?: number

    /**
     * The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
     * @type {number}
     * @memberof TerminalReadersApiListTerminalReaders
     */
    readonly limit?: number
}

/**
 * Request parameters for updateTerminal operation in TerminalReadersApi.
 * @export
 * @interface TerminalReadersApiUpdateTerminalRequest
 */
export interface TerminalReadersApiUpdateTerminalRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof TerminalReadersApiUpdateTerminal
     */
    readonly tilled_account: string

    /**
     * 
     * @type {string}
     * @memberof TerminalReadersApiUpdateTerminal
     */
    readonly id: string

    /**
     * 
     * @type {TerminalReaderUpdateParams}
     * @memberof TerminalReadersApiUpdateTerminal
     */
    readonly TerminalReaderUpdateParams: TerminalReaderUpdateParams
}

/**
 * TerminalReadersApi - object-oriented interface
 * @export
 * @class TerminalReadersApi
 * @extends {BaseAPI}
 */
export class TerminalReadersApi extends BaseAPI {
    /**
     * Retrieves the details of an existing Terminal Reader.
     * @summary Get a Terminal Reader
     * @param {TerminalReadersApiGetTerminalRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TerminalReadersApi
     */
    public getTerminal(requestParameters: TerminalReadersApiGetTerminalRequest, options?: AxiosRequestConfig) {
        return TerminalReadersApiFp(this.configuration).getTerminal(requestParameters.tilled_account, requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Retrieves the network connection status of an existing Terminal Reader.
     * @summary Get a Terminal Reader status
     * @param {TerminalReadersApiGetTerminalStatusRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TerminalReadersApi
     */
    public getTerminalStatus(requestParameters: TerminalReadersApiGetTerminalStatusRequest, options?: AxiosRequestConfig) {
        return TerminalReadersApiFp(this.configuration).getTerminalStatus(requestParameters.tilled_account, requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns a list of an Account\'s Terminal Readers. The Terminal Readers are sorted with the most recently created appearing first.
     * @summary List all Terminal Readers
     * @param {TerminalReadersApiListTerminalReadersRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TerminalReadersApi
     */
    public listTerminalReaders(requestParameters: TerminalReadersApiListTerminalReadersRequest, options?: AxiosRequestConfig) {
        return TerminalReadersApiFp(this.configuration).listTerminalReaders(requestParameters.tilled_account, requestParameters.metadata, requestParameters.q, requestParameters.include_connected_accounts, requestParameters.created_at_gte, requestParameters.created_at_lte, requestParameters.offset, requestParameters.limit, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Updates the Terminal Reader by setting the values of the provided parameters. Any parameters not provided will be left unchanged.
     * @summary Update a Terminal Reader
     * @param {TerminalReadersApiUpdateTerminalRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TerminalReadersApi
     */
    public updateTerminal(requestParameters: TerminalReadersApiUpdateTerminalRequest, options?: AxiosRequestConfig) {
        return TerminalReadersApiFp(this.configuration).updateTerminal(requestParameters.tilled_account, requestParameters.id, requestParameters.TerminalReaderUpdateParams, options).then((request) => request(this.axios, this.basePath));
    }
}
