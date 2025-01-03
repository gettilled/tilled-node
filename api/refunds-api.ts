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
import type { ListRefunds200Response } from '../model';
// @ts-ignore
import type { Refund } from '../model';
// @ts-ignore
import type { RefundCreateParams } from '../model';
/**
 * RefundsApi - axios parameter creator
 * @export
 */
export const RefundsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Creates a Refund.
         * @summary Create a Refund
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {RefundCreateParams} RefundCreateParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createRefund: async (tilled_account: string, RefundCreateParams: RefundCreateParams, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('createRefund', 'tilled_account', tilled_account)
            // verify required parameter 'RefundCreateParams' is not null or undefined
            assertParamExists('createRefund', 'RefundCreateParams', RefundCreateParams)
            const localVarPath = `/v1/refunds`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(RefundCreateParams, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Retrieves the details of an existing Refund.
         * @summary Get a Refund
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getRefund: async (tilled_account: string, id: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('getRefund', 'tilled_account', tilled_account)
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getRefund', 'id', id)
            const localVarPath = `/v1/refunds/{id}`
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
         * Returns a list of Refunds. The Refunds are sorted with the most recently created appearing first.
         * @summary List all Refunds
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {{ [key: string]: string; }} [metadata] &#x60;metadata&#x60; key-value pairs to filter by. Only exact matches on the key-value pair(s) will be returned. Example: &#x60;?metadata[internal_customer_id]&#x3D;7cb1159d-875e-47ae-a309-319fa7ff395b&#x60;.
         * @param {number} [offset] The (zero-based) offset of the first item in the collection to return.
         * @param {number} [limit] The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listRefunds: async (tilled_account: string, metadata?: { [key: string]: string; }, offset?: number, limit?: number, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('listRefunds', 'tilled_account', tilled_account)
            const localVarPath = `/v1/refunds`;
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
                for (const [key, value] of Object.entries(metadata)) {
                    localVarQueryParameter[key] = value;
                }
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
 * RefundsApi - functional programming interface
 * @export
 */
export const RefundsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = RefundsApiAxiosParamCreator(configuration)
    return {
        /**
         * Creates a Refund.
         * @summary Create a Refund
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {RefundCreateParams} RefundCreateParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createRefund(tilled_account: string, RefundCreateParams: RefundCreateParams, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Refund>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createRefund(tilled_account, RefundCreateParams, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['RefundsApi.createRefund']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * Retrieves the details of an existing Refund.
         * @summary Get a Refund
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getRefund(tilled_account: string, id: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Refund>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getRefund(tilled_account, id, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['RefundsApi.getRefund']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * Returns a list of Refunds. The Refunds are sorted with the most recently created appearing first.
         * @summary List all Refunds
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {{ [key: string]: string; }} [metadata] &#x60;metadata&#x60; key-value pairs to filter by. Only exact matches on the key-value pair(s) will be returned. Example: &#x60;?metadata[internal_customer_id]&#x3D;7cb1159d-875e-47ae-a309-319fa7ff395b&#x60;.
         * @param {number} [offset] The (zero-based) offset of the first item in the collection to return.
         * @param {number} [limit] The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listRefunds(tilled_account: string, metadata?: { [key: string]: string; }, offset?: number, limit?: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ListRefunds200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listRefunds(tilled_account, metadata, offset, limit, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['RefundsApi.listRefunds']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * RefundsApi - factory interface
 * @export
 */
export const RefundsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = RefundsApiFp(configuration)
    return {
        /**
         * Creates a Refund.
         * @summary Create a Refund
         * @param {RefundsApiCreateRefundRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createRefund(requestParameters: RefundsApiCreateRefundRequest, options?: RawAxiosRequestConfig): AxiosPromise<Refund> {
            return localVarFp.createRefund(requestParameters.tilled_account, requestParameters.RefundCreateParams, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieves the details of an existing Refund.
         * @summary Get a Refund
         * @param {RefundsApiGetRefundRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getRefund(requestParameters: RefundsApiGetRefundRequest, options?: RawAxiosRequestConfig): AxiosPromise<Refund> {
            return localVarFp.getRefund(requestParameters.tilled_account, requestParameters.id, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns a list of Refunds. The Refunds are sorted with the most recently created appearing first.
         * @summary List all Refunds
         * @param {RefundsApiListRefundsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listRefunds(requestParameters: RefundsApiListRefundsRequest, options?: RawAxiosRequestConfig): AxiosPromise<ListRefunds200Response> {
            return localVarFp.listRefunds(requestParameters.tilled_account, requestParameters.metadata, requestParameters.offset, requestParameters.limit, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for createRefund operation in RefundsApi.
 * @export
 * @interface RefundsApiCreateRefundRequest
 */
export interface RefundsApiCreateRefundRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof RefundsApiCreateRefund
     */
    readonly tilled_account: string

    /**
     * 
     * @type {RefundCreateParams}
     * @memberof RefundsApiCreateRefund
     */
    readonly RefundCreateParams: RefundCreateParams
}

/**
 * Request parameters for getRefund operation in RefundsApi.
 * @export
 * @interface RefundsApiGetRefundRequest
 */
export interface RefundsApiGetRefundRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof RefundsApiGetRefund
     */
    readonly tilled_account: string

    /**
     * 
     * @type {string}
     * @memberof RefundsApiGetRefund
     */
    readonly id: string
}

/**
 * Request parameters for listRefunds operation in RefundsApi.
 * @export
 * @interface RefundsApiListRefundsRequest
 */
export interface RefundsApiListRefundsRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof RefundsApiListRefunds
     */
    readonly tilled_account: string

    /**
     * &#x60;metadata&#x60; key-value pairs to filter by. Only exact matches on the key-value pair(s) will be returned. Example: &#x60;?metadata[internal_customer_id]&#x3D;7cb1159d-875e-47ae-a309-319fa7ff395b&#x60;.
     * @type {{ [key: string]: string; }}
     * @memberof RefundsApiListRefunds
     */
    readonly metadata?: { [key: string]: string; }

    /**
     * The (zero-based) offset of the first item in the collection to return.
     * @type {number}
     * @memberof RefundsApiListRefunds
     */
    readonly offset?: number

    /**
     * The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
     * @type {number}
     * @memberof RefundsApiListRefunds
     */
    readonly limit?: number
}

/**
 * RefundsApi - object-oriented interface
 * @export
 * @class RefundsApi
 * @extends {BaseAPI}
 */
export class RefundsApi extends BaseAPI {
    /**
     * Creates a Refund.
     * @summary Create a Refund
     * @param {RefundsApiCreateRefundRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RefundsApi
     */
    public createRefund(requestParameters: RefundsApiCreateRefundRequest, options?: RawAxiosRequestConfig) {
        return RefundsApiFp(this.configuration).createRefund(requestParameters.tilled_account, requestParameters.RefundCreateParams, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Retrieves the details of an existing Refund.
     * @summary Get a Refund
     * @param {RefundsApiGetRefundRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RefundsApi
     */
    public getRefund(requestParameters: RefundsApiGetRefundRequest, options?: RawAxiosRequestConfig) {
        return RefundsApiFp(this.configuration).getRefund(requestParameters.tilled_account, requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns a list of Refunds. The Refunds are sorted with the most recently created appearing first.
     * @summary List all Refunds
     * @param {RefundsApiListRefundsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RefundsApi
     */
    public listRefunds(requestParameters: RefundsApiListRefundsRequest, options?: RawAxiosRequestConfig) {
        return RefundsApiFp(this.configuration).listRefunds(requestParameters.tilled_account, requestParameters.metadata, requestParameters.offset, requestParameters.limit, options).then((request) => request(this.axios, this.basePath));
    }
}

