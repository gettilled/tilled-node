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
import { Customer } from '../model';
// @ts-ignore
import { CustomerCreateParams } from '../model';
// @ts-ignore
import { CustomerUpdateParams } from '../model';
// @ts-ignore
import { ListCustomers200Response } from '../model';
/**
 * CustomersApi - axios parameter creator
 * @export
 */
export const CustomersApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Creates a Customer.
         * @summary Create a Customer
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {CustomerCreateParams} CustomerCreateParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createCustomer: async (tilled_account: string, CustomerCreateParams: CustomerCreateParams, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('createCustomer', 'tilled_account', tilled_account)
            // verify required parameter 'CustomerCreateParams' is not null or undefined
            assertParamExists('createCustomer', 'CustomerCreateParams', CustomerCreateParams)
            const localVarPath = `/v1/customers`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(CustomerCreateParams, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Deletes a Customer. This cannot be undone.
         * @summary Delete a Customer
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteCustomer: async (tilled_account: string, id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('deleteCustomer', 'tilled_account', tilled_account)
            // verify required parameter 'id' is not null or undefined
            assertParamExists('deleteCustomer', 'id', id)
            const localVarPath = `/v1/customers/{id}`
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
         * Retrieves the details of an existing Customer.
         * @summary Get a Customer
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCustomer: async (tilled_account: string, id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('getCustomer', 'tilled_account', tilled_account)
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getCustomer', 'id', id)
            const localVarPath = `/v1/customers/{id}`
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
         * Returns a list of Customers. The Customers are sorted with the most recently created appearing first.
         * @summary List all Customers
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {{ [key: string]: string; }} [metadata] &#x60;metadata&#x60; key-value pairs to filter by. Only exact matches on the key-value pair(s) will be returned. Example: &#x60;?metadata[internal_customer_id]&#x3D;7cb1159d-875e-47ae-a309-319fa7ff395b&#x60;.
         * @param {string} [q] The partial search of text fields. Supports searching by &#x60;customer.first_name&#x60;, &#x60;customer.last_name&#x60;, &#x60;customer.email&#x60;, &#x60;customer.phone&#x60;
         * @param {number} [offset] The (zero-based) offset of the first item in the collection to return.
         * @param {number} [limit] The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listCustomers: async (tilled_account: string, metadata?: { [key: string]: string; }, q?: string, offset?: number, limit?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('listCustomers', 'tilled_account', tilled_account)
            const localVarPath = `/v1/customers`;
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
         * Updates a Customer by setting the values of the provided parameters. Any parameters not provided will be left unchanged.
         * @summary Update a Customer
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {CustomerUpdateParams} CustomerUpdateParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateCustomer: async (tilled_account: string, id: string, CustomerUpdateParams: CustomerUpdateParams, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('updateCustomer', 'tilled_account', tilled_account)
            // verify required parameter 'id' is not null or undefined
            assertParamExists('updateCustomer', 'id', id)
            // verify required parameter 'CustomerUpdateParams' is not null or undefined
            assertParamExists('updateCustomer', 'CustomerUpdateParams', CustomerUpdateParams)
            const localVarPath = `/v1/customers/{id}`
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
            localVarRequestOptions.data = serializeDataIfNeeded(CustomerUpdateParams, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * CustomersApi - functional programming interface
 * @export
 */
export const CustomersApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = CustomersApiAxiosParamCreator(configuration)
    return {
        /**
         * Creates a Customer.
         * @summary Create a Customer
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {CustomerCreateParams} CustomerCreateParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createCustomer(tilled_account: string, CustomerCreateParams: CustomerCreateParams, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Customer>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createCustomer(tilled_account, CustomerCreateParams, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Deletes a Customer. This cannot be undone.
         * @summary Delete a Customer
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteCustomer(tilled_account: string, id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteCustomer(tilled_account, id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Retrieves the details of an existing Customer.
         * @summary Get a Customer
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getCustomer(tilled_account: string, id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Customer>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getCustomer(tilled_account, id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Returns a list of Customers. The Customers are sorted with the most recently created appearing first.
         * @summary List all Customers
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {{ [key: string]: string; }} [metadata] &#x60;metadata&#x60; key-value pairs to filter by. Only exact matches on the key-value pair(s) will be returned. Example: &#x60;?metadata[internal_customer_id]&#x3D;7cb1159d-875e-47ae-a309-319fa7ff395b&#x60;.
         * @param {string} [q] The partial search of text fields. Supports searching by &#x60;customer.first_name&#x60;, &#x60;customer.last_name&#x60;, &#x60;customer.email&#x60;, &#x60;customer.phone&#x60;
         * @param {number} [offset] The (zero-based) offset of the first item in the collection to return.
         * @param {number} [limit] The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listCustomers(tilled_account: string, metadata?: { [key: string]: string; }, q?: string, offset?: number, limit?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ListCustomers200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listCustomers(tilled_account, metadata, q, offset, limit, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Updates a Customer by setting the values of the provided parameters. Any parameters not provided will be left unchanged.
         * @summary Update a Customer
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {CustomerUpdateParams} CustomerUpdateParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateCustomer(tilled_account: string, id: string, CustomerUpdateParams: CustomerUpdateParams, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Customer>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateCustomer(tilled_account, id, CustomerUpdateParams, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * CustomersApi - factory interface
 * @export
 */
export const CustomersApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = CustomersApiFp(configuration)
    return {
        /**
         * Creates a Customer.
         * @summary Create a Customer
         * @param {CustomersApiCreateCustomerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createCustomer(requestParameters: CustomersApiCreateCustomerRequest, options?: AxiosRequestConfig): AxiosPromise<Customer> {
            return localVarFp.createCustomer(requestParameters.tilled_account, requestParameters.CustomerCreateParams, options).then((request) => request(axios, basePath));
        },
        /**
         * Deletes a Customer. This cannot be undone.
         * @summary Delete a Customer
         * @param {CustomersApiDeleteCustomerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteCustomer(requestParameters: CustomersApiDeleteCustomerRequest, options?: AxiosRequestConfig): AxiosPromise<object> {
            return localVarFp.deleteCustomer(requestParameters.tilled_account, requestParameters.id, options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieves the details of an existing Customer.
         * @summary Get a Customer
         * @param {CustomersApiGetCustomerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCustomer(requestParameters: CustomersApiGetCustomerRequest, options?: AxiosRequestConfig): AxiosPromise<Customer> {
            return localVarFp.getCustomer(requestParameters.tilled_account, requestParameters.id, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns a list of Customers. The Customers are sorted with the most recently created appearing first.
         * @summary List all Customers
         * @param {CustomersApiListCustomersRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listCustomers(requestParameters: CustomersApiListCustomersRequest, options?: AxiosRequestConfig): AxiosPromise<ListCustomers200Response> {
            return localVarFp.listCustomers(requestParameters.tilled_account, requestParameters.metadata, requestParameters.q, requestParameters.offset, requestParameters.limit, options).then((request) => request(axios, basePath));
        },
        /**
         * Updates a Customer by setting the values of the provided parameters. Any parameters not provided will be left unchanged.
         * @summary Update a Customer
         * @param {CustomersApiUpdateCustomerRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateCustomer(requestParameters: CustomersApiUpdateCustomerRequest, options?: AxiosRequestConfig): AxiosPromise<Customer> {
            return localVarFp.updateCustomer(requestParameters.tilled_account, requestParameters.id, requestParameters.CustomerUpdateParams, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for createCustomer operation in CustomersApi.
 * @export
 * @interface CustomersApiCreateCustomerRequest
 */
export interface CustomersApiCreateCustomerRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof CustomersApiCreateCustomer
     */
    readonly tilled_account: string

    /**
     * 
     * @type {CustomerCreateParams}
     * @memberof CustomersApiCreateCustomer
     */
    readonly CustomerCreateParams: CustomerCreateParams
}

/**
 * Request parameters for deleteCustomer operation in CustomersApi.
 * @export
 * @interface CustomersApiDeleteCustomerRequest
 */
export interface CustomersApiDeleteCustomerRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof CustomersApiDeleteCustomer
     */
    readonly tilled_account: string

    /**
     * 
     * @type {string}
     * @memberof CustomersApiDeleteCustomer
     */
    readonly id: string
}

/**
 * Request parameters for getCustomer operation in CustomersApi.
 * @export
 * @interface CustomersApiGetCustomerRequest
 */
export interface CustomersApiGetCustomerRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof CustomersApiGetCustomer
     */
    readonly tilled_account: string

    /**
     * 
     * @type {string}
     * @memberof CustomersApiGetCustomer
     */
    readonly id: string
}

/**
 * Request parameters for listCustomers operation in CustomersApi.
 * @export
 * @interface CustomersApiListCustomersRequest
 */
export interface CustomersApiListCustomersRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof CustomersApiListCustomers
     */
    readonly tilled_account: string

    /**
     * &#x60;metadata&#x60; key-value pairs to filter by. Only exact matches on the key-value pair(s) will be returned. Example: &#x60;?metadata[internal_customer_id]&#x3D;7cb1159d-875e-47ae-a309-319fa7ff395b&#x60;.
     * @type {{ [key: string]: string; }}
     * @memberof CustomersApiListCustomers
     */
    readonly metadata?: { [key: string]: string; }

    /**
     * The partial search of text fields. Supports searching by &#x60;customer.first_name&#x60;, &#x60;customer.last_name&#x60;, &#x60;customer.email&#x60;, &#x60;customer.phone&#x60;
     * @type {string}
     * @memberof CustomersApiListCustomers
     */
    readonly q?: string

    /**
     * The (zero-based) offset of the first item in the collection to return.
     * @type {number}
     * @memberof CustomersApiListCustomers
     */
    readonly offset?: number

    /**
     * The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
     * @type {number}
     * @memberof CustomersApiListCustomers
     */
    readonly limit?: number
}

/**
 * Request parameters for updateCustomer operation in CustomersApi.
 * @export
 * @interface CustomersApiUpdateCustomerRequest
 */
export interface CustomersApiUpdateCustomerRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof CustomersApiUpdateCustomer
     */
    readonly tilled_account: string

    /**
     * 
     * @type {string}
     * @memberof CustomersApiUpdateCustomer
     */
    readonly id: string

    /**
     * 
     * @type {CustomerUpdateParams}
     * @memberof CustomersApiUpdateCustomer
     */
    readonly CustomerUpdateParams: CustomerUpdateParams
}

/**
 * CustomersApi - object-oriented interface
 * @export
 * @class CustomersApi
 * @extends {BaseAPI}
 */
export class CustomersApi extends BaseAPI {
    /**
     * Creates a Customer.
     * @summary Create a Customer
     * @param {CustomersApiCreateCustomerRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomersApi
     */
    public createCustomer(requestParameters: CustomersApiCreateCustomerRequest, options?: AxiosRequestConfig) {
        return CustomersApiFp(this.configuration).createCustomer(requestParameters.tilled_account, requestParameters.CustomerCreateParams, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Deletes a Customer. This cannot be undone.
     * @summary Delete a Customer
     * @param {CustomersApiDeleteCustomerRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomersApi
     */
    public deleteCustomer(requestParameters: CustomersApiDeleteCustomerRequest, options?: AxiosRequestConfig) {
        return CustomersApiFp(this.configuration).deleteCustomer(requestParameters.tilled_account, requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Retrieves the details of an existing Customer.
     * @summary Get a Customer
     * @param {CustomersApiGetCustomerRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomersApi
     */
    public getCustomer(requestParameters: CustomersApiGetCustomerRequest, options?: AxiosRequestConfig) {
        return CustomersApiFp(this.configuration).getCustomer(requestParameters.tilled_account, requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns a list of Customers. The Customers are sorted with the most recently created appearing first.
     * @summary List all Customers
     * @param {CustomersApiListCustomersRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomersApi
     */
    public listCustomers(requestParameters: CustomersApiListCustomersRequest, options?: AxiosRequestConfig) {
        return CustomersApiFp(this.configuration).listCustomers(requestParameters.tilled_account, requestParameters.metadata, requestParameters.q, requestParameters.offset, requestParameters.limit, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Updates a Customer by setting the values of the provided parameters. Any parameters not provided will be left unchanged.
     * @summary Update a Customer
     * @param {CustomersApiUpdateCustomerRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomersApi
     */
    public updateCustomer(requestParameters: CustomersApiUpdateCustomerRequest, options?: AxiosRequestConfig) {
        return CustomersApiFp(this.configuration).updateCustomer(requestParameters.tilled_account, requestParameters.id, requestParameters.CustomerUpdateParams, options).then((request) => request(this.axios, this.basePath));
    }
}
