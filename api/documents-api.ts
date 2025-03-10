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
import type { BulkDocumentSubmitRequestParams } from '../model';
// @ts-ignore
import type { BulkDocumentSubmitResponse } from '../model';
// @ts-ignore
import type { DocumentDto } from '../model';
// @ts-ignore
import type { DocumentSubmitRequestParams } from '../model';
// @ts-ignore
import type { ListDocuments200Response } from '../model';
/**
 * DocumentsApi - axios parameter creator
 * @export
 */
export const DocumentsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Submit multiple Documents at once.
         * @summary Bulk Submit Documents
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {BulkDocumentSubmitRequestParams} BulkDocumentSubmitRequestParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        bulkSubmitDocuments: async (tilled_account: string, BulkDocumentSubmitRequestParams: BulkDocumentSubmitRequestParams, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('bulkSubmitDocuments', 'tilled_account', tilled_account)
            // verify required parameter 'BulkDocumentSubmitRequestParams' is not null or undefined
            assertParamExists('bulkSubmitDocuments', 'BulkDocumentSubmitRequestParams', BulkDocumentSubmitRequestParams)
            const localVarPath = `/v1/documents/bulk-submit`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(BulkDocumentSubmitRequestParams, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Retrieves the details of an existing Document.
         * @summary Get a Document
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id The id of the document to be retrieved.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDocument: async (tilled_account: string, id: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('getDocument', 'tilled_account', tilled_account)
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getDocument', 'id', id)
            const localVarPath = `/v1/documents/{id}`
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
         * Returns a list of Documents. The Documents are sorted with the most recently created appearing first.
         * @summary List all Documents
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {ListDocumentsStatus} [status] 
         * @param {number} [offset] The (zero-based) offset of the first item in the collection to return.
         * @param {number} [limit] The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listDocuments: async (tilled_account: string, status?: ListDocumentsStatus, offset?: number, limit?: number, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('listDocuments', 'tilled_account', tilled_account)
            const localVarPath = `/v1/documents`;
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

            if (status !== undefined) {
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


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Submits a Document.
         * @summary Submit a Document
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id The id of the document to be updated.
         * @param {DocumentSubmitRequestParams} DocumentSubmitRequestParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        submitDocument: async (tilled_account: string, id: string, DocumentSubmitRequestParams: DocumentSubmitRequestParams, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('submitDocument', 'tilled_account', tilled_account)
            // verify required parameter 'id' is not null or undefined
            assertParamExists('submitDocument', 'id', id)
            // verify required parameter 'DocumentSubmitRequestParams' is not null or undefined
            assertParamExists('submitDocument', 'DocumentSubmitRequestParams', DocumentSubmitRequestParams)
            const localVarPath = `/v1/documents/{id}/submit`
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
            localVarRequestOptions.data = serializeDataIfNeeded(DocumentSubmitRequestParams, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DocumentsApi - functional programming interface
 * @export
 */
export const DocumentsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = DocumentsApiAxiosParamCreator(configuration)
    return {
        /**
         * Submit multiple Documents at once.
         * @summary Bulk Submit Documents
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {BulkDocumentSubmitRequestParams} BulkDocumentSubmitRequestParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async bulkSubmitDocuments(tilled_account: string, BulkDocumentSubmitRequestParams: BulkDocumentSubmitRequestParams, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BulkDocumentSubmitResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.bulkSubmitDocuments(tilled_account, BulkDocumentSubmitRequestParams, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['DocumentsApi.bulkSubmitDocuments']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * Retrieves the details of an existing Document.
         * @summary Get a Document
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id The id of the document to be retrieved.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getDocument(tilled_account: string, id: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DocumentDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getDocument(tilled_account, id, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['DocumentsApi.getDocument']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * Returns a list of Documents. The Documents are sorted with the most recently created appearing first.
         * @summary List all Documents
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {ListDocumentsStatus} [status] 
         * @param {number} [offset] The (zero-based) offset of the first item in the collection to return.
         * @param {number} [limit] The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listDocuments(tilled_account: string, status?: ListDocumentsStatus, offset?: number, limit?: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ListDocuments200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listDocuments(tilled_account, status, offset, limit, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['DocumentsApi.listDocuments']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * Submits a Document.
         * @summary Submit a Document
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id The id of the document to be updated.
         * @param {DocumentSubmitRequestParams} DocumentSubmitRequestParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async submitDocument(tilled_account: string, id: string, DocumentSubmitRequestParams: DocumentSubmitRequestParams, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DocumentDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.submitDocument(tilled_account, id, DocumentSubmitRequestParams, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['DocumentsApi.submitDocument']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * DocumentsApi - factory interface
 * @export
 */
export const DocumentsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DocumentsApiFp(configuration)
    return {
        /**
         * Submit multiple Documents at once.
         * @summary Bulk Submit Documents
         * @param {DocumentsApiBulkSubmitDocumentsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        bulkSubmitDocuments(requestParameters: DocumentsApiBulkSubmitDocumentsRequest, options?: RawAxiosRequestConfig): AxiosPromise<BulkDocumentSubmitResponse> {
            return localVarFp.bulkSubmitDocuments(requestParameters.tilled_account, requestParameters.BulkDocumentSubmitRequestParams, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieves the details of an existing Document.
         * @summary Get a Document
         * @param {DocumentsApiGetDocumentRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDocument(requestParameters: DocumentsApiGetDocumentRequest, options?: RawAxiosRequestConfig): AxiosPromise<DocumentDto> {
            return localVarFp.getDocument(requestParameters.tilled_account, requestParameters.id, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns a list of Documents. The Documents are sorted with the most recently created appearing first.
         * @summary List all Documents
         * @param {DocumentsApiListDocumentsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listDocuments(requestParameters: DocumentsApiListDocumentsRequest, options?: RawAxiosRequestConfig): AxiosPromise<ListDocuments200Response> {
            return localVarFp.listDocuments(requestParameters.tilled_account, requestParameters.status, requestParameters.offset, requestParameters.limit, options).then((request) => request(axios, basePath));
        },
        /**
         * Submits a Document.
         * @summary Submit a Document
         * @param {DocumentsApiSubmitDocumentRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        submitDocument(requestParameters: DocumentsApiSubmitDocumentRequest, options?: RawAxiosRequestConfig): AxiosPromise<DocumentDto> {
            return localVarFp.submitDocument(requestParameters.tilled_account, requestParameters.id, requestParameters.DocumentSubmitRequestParams, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for bulkSubmitDocuments operation in DocumentsApi.
 * @export
 * @interface DocumentsApiBulkSubmitDocumentsRequest
 */
export interface DocumentsApiBulkSubmitDocumentsRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof DocumentsApiBulkSubmitDocuments
     */
    readonly tilled_account: string

    /**
     * 
     * @type {BulkDocumentSubmitRequestParams}
     * @memberof DocumentsApiBulkSubmitDocuments
     */
    readonly BulkDocumentSubmitRequestParams: BulkDocumentSubmitRequestParams
}

/**
 * Request parameters for getDocument operation in DocumentsApi.
 * @export
 * @interface DocumentsApiGetDocumentRequest
 */
export interface DocumentsApiGetDocumentRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof DocumentsApiGetDocument
     */
    readonly tilled_account: string

    /**
     * The id of the document to be retrieved.
     * @type {string}
     * @memberof DocumentsApiGetDocument
     */
    readonly id: string
}

/**
 * Request parameters for listDocuments operation in DocumentsApi.
 * @export
 * @interface DocumentsApiListDocumentsRequest
 */
export interface DocumentsApiListDocumentsRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof DocumentsApiListDocuments
     */
    readonly tilled_account: string

    /**
     * 
     * @type {'requested' | 'submitted' | 'rejected' | 'verified'}
     * @memberof DocumentsApiListDocuments
     */
    readonly status?: ListDocumentsStatus

    /**
     * The (zero-based) offset of the first item in the collection to return.
     * @type {number}
     * @memberof DocumentsApiListDocuments
     */
    readonly offset?: number

    /**
     * The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
     * @type {number}
     * @memberof DocumentsApiListDocuments
     */
    readonly limit?: number
}

/**
 * Request parameters for submitDocument operation in DocumentsApi.
 * @export
 * @interface DocumentsApiSubmitDocumentRequest
 */
export interface DocumentsApiSubmitDocumentRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof DocumentsApiSubmitDocument
     */
    readonly tilled_account: string

    /**
     * The id of the document to be updated.
     * @type {string}
     * @memberof DocumentsApiSubmitDocument
     */
    readonly id: string

    /**
     * 
     * @type {DocumentSubmitRequestParams}
     * @memberof DocumentsApiSubmitDocument
     */
    readonly DocumentSubmitRequestParams: DocumentSubmitRequestParams
}

/**
 * DocumentsApi - object-oriented interface
 * @export
 * @class DocumentsApi
 * @extends {BaseAPI}
 */
export class DocumentsApi extends BaseAPI {
    /**
     * Submit multiple Documents at once.
     * @summary Bulk Submit Documents
     * @param {DocumentsApiBulkSubmitDocumentsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DocumentsApi
     */
    public bulkSubmitDocuments(requestParameters: DocumentsApiBulkSubmitDocumentsRequest, options?: RawAxiosRequestConfig) {
        return DocumentsApiFp(this.configuration).bulkSubmitDocuments(requestParameters.tilled_account, requestParameters.BulkDocumentSubmitRequestParams, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Retrieves the details of an existing Document.
     * @summary Get a Document
     * @param {DocumentsApiGetDocumentRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DocumentsApi
     */
    public getDocument(requestParameters: DocumentsApiGetDocumentRequest, options?: RawAxiosRequestConfig) {
        return DocumentsApiFp(this.configuration).getDocument(requestParameters.tilled_account, requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns a list of Documents. The Documents are sorted with the most recently created appearing first.
     * @summary List all Documents
     * @param {DocumentsApiListDocumentsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DocumentsApi
     */
    public listDocuments(requestParameters: DocumentsApiListDocumentsRequest, options?: RawAxiosRequestConfig) {
        return DocumentsApiFp(this.configuration).listDocuments(requestParameters.tilled_account, requestParameters.status, requestParameters.offset, requestParameters.limit, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Submits a Document.
     * @summary Submit a Document
     * @param {DocumentsApiSubmitDocumentRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DocumentsApi
     */
    public submitDocument(requestParameters: DocumentsApiSubmitDocumentRequest, options?: RawAxiosRequestConfig) {
        return DocumentsApiFp(this.configuration).submitDocument(requestParameters.tilled_account, requestParameters.id, requestParameters.DocumentSubmitRequestParams, options).then((request) => request(this.axios, this.basePath));
    }
}

/**
 * @export
 */
export const ListDocumentsStatus = {
    REQUESTED: 'requested',
    SUBMITTED: 'submitted',
    REJECTED: 'rejected',
    VERIFIED: 'verified'
} as const;
export type ListDocumentsStatus = typeof ListDocumentsStatus[keyof typeof ListDocumentsStatus];
