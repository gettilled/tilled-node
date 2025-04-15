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
import type { ListReportRuns200Response } from '../model';
// @ts-ignore
import type { ReportRun } from '../model';
// @ts-ignore
import type { ReportRunCreateParams } from '../model';
// @ts-ignore
import type { ReportRunRetrieveParams } from '../model';
/**
 * ReportRunsApi - axios parameter creator
 * @export
 */
export const ReportRunsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Creates a Report Run.
         * @summary Create a Report Run
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {ReportRunCreateParams} ReportRunCreateParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createReportRun: async (tilled_account: string, ReportRunCreateParams: ReportRunCreateParams, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('createReportRun', 'tilled_account', tilled_account)
            // verify required parameter 'ReportRunCreateParams' is not null or undefined
            assertParamExists('createReportRun', 'ReportRunCreateParams', ReportRunCreateParams)
            const localVarPath = `/v1/report-runs`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(ReportRunCreateParams, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Retrieves the details of an existing Report Run.
         * @summary Get a Report Run
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getReportRun: async (tilled_account: string, id: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('getReportRun', 'tilled_account', tilled_account)
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getReportRun', 'id', id)
            const localVarPath = `/v1/report-runs/{id}`
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
         * Returns a list of Report Runs. The Report Runs are sorted with the most recently created appearing first.
         * @summary List all Report Runs
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {ReportRunRetrieveParams} ReportRunRetrieveParams 
         * @param {Array<ListReportRunsType>} [type] Only return ReportRuns whose type is included by this array. Examples: &#x60;?type&#x3D;payments_summary_2,payouts_summary_2&#x60; and &#x60;?type&#x3D;payouts_summary_2&#x60;.
         * @param {Array<ListReportRunsStatus>} [status] Only return ReportRuns whose status is included by this array. Examples: &#x60;?status&#x3D;finished&#x60; and &#x60;?status&#x3D;finished,queued&#x60;.
         * @param {number} [offset] The (zero-based) offset of the first item in the collection to return.
         * @param {number} [limit] The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listReportRuns: async (tilled_account: string, ReportRunRetrieveParams: ReportRunRetrieveParams, type?: Array<ListReportRunsType>, status?: Array<ListReportRunsStatus>, offset?: number, limit?: number, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('listReportRuns', 'tilled_account', tilled_account)
            // verify required parameter 'ReportRunRetrieveParams' is not null or undefined
            assertParamExists('listReportRuns', 'ReportRunRetrieveParams', ReportRunRetrieveParams)
            const localVarPath = `/v1/report-runs`;
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

            if (type) {
                localVarQueryParameter['type'] = type;
            }

            if (status) {
                localVarQueryParameter['status'] = status;
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


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(ReportRunRetrieveParams, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ReportRunsApi - functional programming interface
 * @export
 */
export const ReportRunsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ReportRunsApiAxiosParamCreator(configuration)
    return {
        /**
         * Creates a Report Run.
         * @summary Create a Report Run
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {ReportRunCreateParams} ReportRunCreateParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createReportRun(tilled_account: string, ReportRunCreateParams: ReportRunCreateParams, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ReportRun>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createReportRun(tilled_account, ReportRunCreateParams, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ReportRunsApi.createReportRun']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * Retrieves the details of an existing Report Run.
         * @summary Get a Report Run
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getReportRun(tilled_account: string, id: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ReportRun>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getReportRun(tilled_account, id, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ReportRunsApi.getReportRun']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * Returns a list of Report Runs. The Report Runs are sorted with the most recently created appearing first.
         * @summary List all Report Runs
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {ReportRunRetrieveParams} ReportRunRetrieveParams 
         * @param {Array<ListReportRunsType>} [type] Only return ReportRuns whose type is included by this array. Examples: &#x60;?type&#x3D;payments_summary_2,payouts_summary_2&#x60; and &#x60;?type&#x3D;payouts_summary_2&#x60;.
         * @param {Array<ListReportRunsStatus>} [status] Only return ReportRuns whose status is included by this array. Examples: &#x60;?status&#x3D;finished&#x60; and &#x60;?status&#x3D;finished,queued&#x60;.
         * @param {number} [offset] The (zero-based) offset of the first item in the collection to return.
         * @param {number} [limit] The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listReportRuns(tilled_account: string, ReportRunRetrieveParams: ReportRunRetrieveParams, type?: Array<ListReportRunsType>, status?: Array<ListReportRunsStatus>, offset?: number, limit?: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ListReportRuns200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listReportRuns(tilled_account, ReportRunRetrieveParams, type, status, offset, limit, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ReportRunsApi.listReportRuns']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * ReportRunsApi - factory interface
 * @export
 */
export const ReportRunsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ReportRunsApiFp(configuration)
    return {
        /**
         * Creates a Report Run.
         * @summary Create a Report Run
         * @param {ReportRunsApiCreateReportRunRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createReportRun(requestParameters: ReportRunsApiCreateReportRunRequest, options?: RawAxiosRequestConfig): AxiosPromise<ReportRun> {
            return localVarFp.createReportRun(requestParameters.tilled_account, requestParameters.ReportRunCreateParams, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieves the details of an existing Report Run.
         * @summary Get a Report Run
         * @param {ReportRunsApiGetReportRunRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getReportRun(requestParameters: ReportRunsApiGetReportRunRequest, options?: RawAxiosRequestConfig): AxiosPromise<ReportRun> {
            return localVarFp.getReportRun(requestParameters.tilled_account, requestParameters.id, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns a list of Report Runs. The Report Runs are sorted with the most recently created appearing first.
         * @summary List all Report Runs
         * @param {ReportRunsApiListReportRunsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listReportRuns(requestParameters: ReportRunsApiListReportRunsRequest, options?: RawAxiosRequestConfig): AxiosPromise<ListReportRuns200Response> {
            return localVarFp.listReportRuns(requestParameters.tilled_account, requestParameters.ReportRunRetrieveParams, requestParameters.type, requestParameters.status, requestParameters.offset, requestParameters.limit, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for createReportRun operation in ReportRunsApi.
 * @export
 * @interface ReportRunsApiCreateReportRunRequest
 */
export interface ReportRunsApiCreateReportRunRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof ReportRunsApiCreateReportRun
     */
    readonly tilled_account: string

    /**
     * 
     * @type {ReportRunCreateParams}
     * @memberof ReportRunsApiCreateReportRun
     */
    readonly ReportRunCreateParams: ReportRunCreateParams
}

/**
 * Request parameters for getReportRun operation in ReportRunsApi.
 * @export
 * @interface ReportRunsApiGetReportRunRequest
 */
export interface ReportRunsApiGetReportRunRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof ReportRunsApiGetReportRun
     */
    readonly tilled_account: string

    /**
     * 
     * @type {string}
     * @memberof ReportRunsApiGetReportRun
     */
    readonly id: string
}

/**
 * Request parameters for listReportRuns operation in ReportRunsApi.
 * @export
 * @interface ReportRunsApiListReportRunsRequest
 */
export interface ReportRunsApiListReportRunsRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof ReportRunsApiListReportRuns
     */
    readonly tilled_account: string

    /**
     * 
     * @type {ReportRunRetrieveParams}
     * @memberof ReportRunsApiListReportRuns
     */
    readonly ReportRunRetrieveParams: ReportRunRetrieveParams

    /**
     * Only return ReportRuns whose type is included by this array. Examples: &#x60;?type&#x3D;payments_summary_2,payouts_summary_2&#x60; and &#x60;?type&#x3D;payouts_summary_2&#x60;.
     * @type {Array<'payments_summary_1' | 'payments_summary_2' | 'payouts_summary_1' | 'payouts_summary_2' | 'payouts_summary_3' | 'payouts_detail_1' | 'fees_summary_1' | 'processing_summary_1' | 'disputes_summary_1' | 'interchange_detail_1' | 'interchange_detail_2'>}
     * @memberof ReportRunsApiListReportRuns
     */
    readonly type?: Array<ListReportRunsType>

    /**
     * Only return ReportRuns whose status is included by this array. Examples: &#x60;?status&#x3D;finished&#x60; and &#x60;?status&#x3D;finished,queued&#x60;.
     * @type {Array<'queued' | 'finished' | 'failed'>}
     * @memberof ReportRunsApiListReportRuns
     */
    readonly status?: Array<ListReportRunsStatus>

    /**
     * The (zero-based) offset of the first item in the collection to return.
     * @type {number}
     * @memberof ReportRunsApiListReportRuns
     */
    readonly offset?: number

    /**
     * The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
     * @type {number}
     * @memberof ReportRunsApiListReportRuns
     */
    readonly limit?: number
}

/**
 * ReportRunsApi - object-oriented interface
 * @export
 * @class ReportRunsApi
 * @extends {BaseAPI}
 */
export class ReportRunsApi extends BaseAPI {
    /**
     * Creates a Report Run.
     * @summary Create a Report Run
     * @param {ReportRunsApiCreateReportRunRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReportRunsApi
     */
    public createReportRun(requestParameters: ReportRunsApiCreateReportRunRequest, options?: RawAxiosRequestConfig) {
        return ReportRunsApiFp(this.configuration).createReportRun(requestParameters.tilled_account, requestParameters.ReportRunCreateParams, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Retrieves the details of an existing Report Run.
     * @summary Get a Report Run
     * @param {ReportRunsApiGetReportRunRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReportRunsApi
     */
    public getReportRun(requestParameters: ReportRunsApiGetReportRunRequest, options?: RawAxiosRequestConfig) {
        return ReportRunsApiFp(this.configuration).getReportRun(requestParameters.tilled_account, requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns a list of Report Runs. The Report Runs are sorted with the most recently created appearing first.
     * @summary List all Report Runs
     * @param {ReportRunsApiListReportRunsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ReportRunsApi
     */
    public listReportRuns(requestParameters: ReportRunsApiListReportRunsRequest, options?: RawAxiosRequestConfig) {
        return ReportRunsApiFp(this.configuration).listReportRuns(requestParameters.tilled_account, requestParameters.ReportRunRetrieveParams, requestParameters.type, requestParameters.status, requestParameters.offset, requestParameters.limit, options).then((request) => request(this.axios, this.basePath));
    }
}

/**
 * @export
 */
export const ListReportRunsType = {
    PAYMENTS_SUMMARY_1: 'payments_summary_1',
    PAYMENTS_SUMMARY_2: 'payments_summary_2',
    PAYOUTS_SUMMARY_1: 'payouts_summary_1',
    PAYOUTS_SUMMARY_2: 'payouts_summary_2',
    PAYOUTS_SUMMARY_3: 'payouts_summary_3',
    PAYOUTS_DETAIL_1: 'payouts_detail_1',
    FEES_SUMMARY_1: 'fees_summary_1',
    PROCESSING_SUMMARY_1: 'processing_summary_1',
    DISPUTES_SUMMARY_1: 'disputes_summary_1',
    INTERCHANGE_DETAIL_1: 'interchange_detail_1',
    INTERCHANGE_DETAIL_2: 'interchange_detail_2'
} as const;
export type ListReportRunsType = typeof ListReportRunsType[keyof typeof ListReportRunsType];
/**
 * @export
 */
export const ListReportRunsStatus = {
    QUEUED: 'queued',
    FINISHED: 'finished',
    FAILED: 'failed'
} as const;
export type ListReportRunsStatus = typeof ListReportRunsStatus[keyof typeof ListReportRunsStatus];
