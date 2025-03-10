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
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, type RequestArgs, BaseAPI, RequiredError, operationServerMap } from '../base';
// @ts-ignore
import type { ApplePayDomain } from '../model';
// @ts-ignore
import type { ApplePayDomainCreateParams } from '../model';
// @ts-ignore
import type { ListApplePayDomains200Response } from '../model';
/**
 * ApplePayDomainsApi - axios parameter creator
 * @export
 */
export const ApplePayDomainsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Creates an Apple Pay Domain.
         * @summary Create an Apple Pay Domain
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {ApplePayDomainCreateParams} ApplePayDomainCreateParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createApplePayDomain: async (tilled_account: string, ApplePayDomainCreateParams: ApplePayDomainCreateParams, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('createApplePayDomain', 'tilled_account', tilled_account)
            // verify required parameter 'ApplePayDomainCreateParams' is not null or undefined
            assertParamExists('createApplePayDomain', 'ApplePayDomainCreateParams', ApplePayDomainCreateParams)
            const localVarPath = `/v1/apple-pay-domains`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(ApplePayDomainCreateParams, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Deletes an Apple Pay Domain. This cannot be undone.
         * @summary Delete an Apple Pay Domain
         * @param {string} id 
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteApplePayDomain: async (id: string, tilled_account: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('deleteApplePayDomain', 'id', id)
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('deleteApplePayDomain', 'tilled_account', tilled_account)
            const localVarPath = `/v1/apple-pay-domains/{id}`
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
         * Retrieves the details of an existing Apple Pay Domain.
         * @summary Get an Apple Pay Domain
         * @param {string} id 
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getApplePayDomain: async (id: string, tilled_account: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getApplePayDomain', 'id', id)
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('getApplePayDomain', 'tilled_account', tilled_account)
            const localVarPath = `/v1/apple-pay-domains/{id}`
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
         * Returns a list of registered Apple Pay Domains. The Apple Pay Domains are sorted with the most recently created appearing first.
         * @summary List all Apple Pay Domains
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {number} [offset] The (zero-based) offset of the first item in the collection to return.
         * @param {number} [limit] The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listApplePayDomains: async (tilled_account: string, offset?: number, limit?: number, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('listApplePayDomains', 'tilled_account', tilled_account)
            const localVarPath = `/v1/apple-pay-domains`;
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
    }
};

/**
 * ApplePayDomainsApi - functional programming interface
 * @export
 */
export const ApplePayDomainsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ApplePayDomainsApiAxiosParamCreator(configuration)
    return {
        /**
         * Creates an Apple Pay Domain.
         * @summary Create an Apple Pay Domain
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {ApplePayDomainCreateParams} ApplePayDomainCreateParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createApplePayDomain(tilled_account: string, ApplePayDomainCreateParams: ApplePayDomainCreateParams, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApplePayDomain>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createApplePayDomain(tilled_account, ApplePayDomainCreateParams, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ApplePayDomainsApi.createApplePayDomain']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * Deletes an Apple Pay Domain. This cannot be undone.
         * @summary Delete an Apple Pay Domain
         * @param {string} id 
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteApplePayDomain(id: string, tilled_account: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteApplePayDomain(id, tilled_account, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ApplePayDomainsApi.deleteApplePayDomain']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * Retrieves the details of an existing Apple Pay Domain.
         * @summary Get an Apple Pay Domain
         * @param {string} id 
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getApplePayDomain(id: string, tilled_account: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApplePayDomain>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getApplePayDomain(id, tilled_account, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ApplePayDomainsApi.getApplePayDomain']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * Returns a list of registered Apple Pay Domains. The Apple Pay Domains are sorted with the most recently created appearing first.
         * @summary List all Apple Pay Domains
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {number} [offset] The (zero-based) offset of the first item in the collection to return.
         * @param {number} [limit] The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listApplePayDomains(tilled_account: string, offset?: number, limit?: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ListApplePayDomains200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listApplePayDomains(tilled_account, offset, limit, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ApplePayDomainsApi.listApplePayDomains']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * ApplePayDomainsApi - factory interface
 * @export
 */
export const ApplePayDomainsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ApplePayDomainsApiFp(configuration)
    return {
        /**
         * Creates an Apple Pay Domain.
         * @summary Create an Apple Pay Domain
         * @param {ApplePayDomainsApiCreateApplePayDomainRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createApplePayDomain(requestParameters: ApplePayDomainsApiCreateApplePayDomainRequest, options?: RawAxiosRequestConfig): AxiosPromise<ApplePayDomain> {
            return localVarFp.createApplePayDomain(requestParameters.tilled_account, requestParameters.ApplePayDomainCreateParams, options).then((request) => request(axios, basePath));
        },
        /**
         * Deletes an Apple Pay Domain. This cannot be undone.
         * @summary Delete an Apple Pay Domain
         * @param {ApplePayDomainsApiDeleteApplePayDomainRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteApplePayDomain(requestParameters: ApplePayDomainsApiDeleteApplePayDomainRequest, options?: RawAxiosRequestConfig): AxiosPromise<object> {
            return localVarFp.deleteApplePayDomain(requestParameters.id, requestParameters.tilled_account, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieves the details of an existing Apple Pay Domain.
         * @summary Get an Apple Pay Domain
         * @param {ApplePayDomainsApiGetApplePayDomainRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getApplePayDomain(requestParameters: ApplePayDomainsApiGetApplePayDomainRequest, options?: RawAxiosRequestConfig): AxiosPromise<ApplePayDomain> {
            return localVarFp.getApplePayDomain(requestParameters.id, requestParameters.tilled_account, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns a list of registered Apple Pay Domains. The Apple Pay Domains are sorted with the most recently created appearing first.
         * @summary List all Apple Pay Domains
         * @param {ApplePayDomainsApiListApplePayDomainsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listApplePayDomains(requestParameters: ApplePayDomainsApiListApplePayDomainsRequest, options?: RawAxiosRequestConfig): AxiosPromise<ListApplePayDomains200Response> {
            return localVarFp.listApplePayDomains(requestParameters.tilled_account, requestParameters.offset, requestParameters.limit, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for createApplePayDomain operation in ApplePayDomainsApi.
 * @export
 * @interface ApplePayDomainsApiCreateApplePayDomainRequest
 */
export interface ApplePayDomainsApiCreateApplePayDomainRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof ApplePayDomainsApiCreateApplePayDomain
     */
    readonly tilled_account: string

    /**
     * 
     * @type {ApplePayDomainCreateParams}
     * @memberof ApplePayDomainsApiCreateApplePayDomain
     */
    readonly ApplePayDomainCreateParams: ApplePayDomainCreateParams
}

/**
 * Request parameters for deleteApplePayDomain operation in ApplePayDomainsApi.
 * @export
 * @interface ApplePayDomainsApiDeleteApplePayDomainRequest
 */
export interface ApplePayDomainsApiDeleteApplePayDomainRequest {
    /**
     * 
     * @type {string}
     * @memberof ApplePayDomainsApiDeleteApplePayDomain
     */
    readonly id: string

    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof ApplePayDomainsApiDeleteApplePayDomain
     */
    readonly tilled_account: string
}

/**
 * Request parameters for getApplePayDomain operation in ApplePayDomainsApi.
 * @export
 * @interface ApplePayDomainsApiGetApplePayDomainRequest
 */
export interface ApplePayDomainsApiGetApplePayDomainRequest {
    /**
     * 
     * @type {string}
     * @memberof ApplePayDomainsApiGetApplePayDomain
     */
    readonly id: string

    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof ApplePayDomainsApiGetApplePayDomain
     */
    readonly tilled_account: string
}

/**
 * Request parameters for listApplePayDomains operation in ApplePayDomainsApi.
 * @export
 * @interface ApplePayDomainsApiListApplePayDomainsRequest
 */
export interface ApplePayDomainsApiListApplePayDomainsRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof ApplePayDomainsApiListApplePayDomains
     */
    readonly tilled_account: string

    /**
     * The (zero-based) offset of the first item in the collection to return.
     * @type {number}
     * @memberof ApplePayDomainsApiListApplePayDomains
     */
    readonly offset?: number

    /**
     * The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
     * @type {number}
     * @memberof ApplePayDomainsApiListApplePayDomains
     */
    readonly limit?: number
}

/**
 * ApplePayDomainsApi - object-oriented interface
 * @export
 * @class ApplePayDomainsApi
 * @extends {BaseAPI}
 */
export class ApplePayDomainsApi extends BaseAPI {
    /**
     * Creates an Apple Pay Domain.
     * @summary Create an Apple Pay Domain
     * @param {ApplePayDomainsApiCreateApplePayDomainRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ApplePayDomainsApi
     */
    public createApplePayDomain(requestParameters: ApplePayDomainsApiCreateApplePayDomainRequest, options?: RawAxiosRequestConfig) {
        return ApplePayDomainsApiFp(this.configuration).createApplePayDomain(requestParameters.tilled_account, requestParameters.ApplePayDomainCreateParams, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Deletes an Apple Pay Domain. This cannot be undone.
     * @summary Delete an Apple Pay Domain
     * @param {ApplePayDomainsApiDeleteApplePayDomainRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ApplePayDomainsApi
     */
    public deleteApplePayDomain(requestParameters: ApplePayDomainsApiDeleteApplePayDomainRequest, options?: RawAxiosRequestConfig) {
        return ApplePayDomainsApiFp(this.configuration).deleteApplePayDomain(requestParameters.id, requestParameters.tilled_account, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Retrieves the details of an existing Apple Pay Domain.
     * @summary Get an Apple Pay Domain
     * @param {ApplePayDomainsApiGetApplePayDomainRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ApplePayDomainsApi
     */
    public getApplePayDomain(requestParameters: ApplePayDomainsApiGetApplePayDomainRequest, options?: RawAxiosRequestConfig) {
        return ApplePayDomainsApiFp(this.configuration).getApplePayDomain(requestParameters.id, requestParameters.tilled_account, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns a list of registered Apple Pay Domains. The Apple Pay Domains are sorted with the most recently created appearing first.
     * @summary List all Apple Pay Domains
     * @param {ApplePayDomainsApiListApplePayDomainsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ApplePayDomainsApi
     */
    public listApplePayDomains(requestParameters: ApplePayDomainsApiListApplePayDomainsRequest, options?: RawAxiosRequestConfig) {
        return ApplePayDomainsApiFp(this.configuration).listApplePayDomains(requestParameters.tilled_account, requestParameters.offset, requestParameters.limit, options).then((request) => request(this.axios, this.basePath));
    }
}

