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
import type { HealthOutput } from '../model';
/**
 * HealthApi - axios parameter creator
 * @export
 */
export const HealthApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Retrieves the details of the API’s Health. Note: a 503 HTTP response code will be returned for the fail status.
         * @summary Get the Overall Health of the API
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getHealth: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/v1/health`;
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
    }
};

/**
 * HealthApi - functional programming interface
 * @export
 */
export const HealthApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = HealthApiAxiosParamCreator(configuration)
    return {
        /**
         * Retrieves the details of the API’s Health. Note: a 503 HTTP response code will be returned for the fail status.
         * @summary Get the Overall Health of the API
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getHealth(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<HealthOutput>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getHealth(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['HealthApi.getHealth']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * HealthApi - factory interface
 * @export
 */
export const HealthApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = HealthApiFp(configuration)
    return {
        /**
         * Retrieves the details of the API’s Health. Note: a 503 HTTP response code will be returned for the fail status.
         * @summary Get the Overall Health of the API
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getHealth(options?: RawAxiosRequestConfig): AxiosPromise<HealthOutput> {
            return localVarFp.getHealth(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * HealthApi - object-oriented interface
 * @export
 * @class HealthApi
 * @extends {BaseAPI}
 */
export class HealthApi extends BaseAPI {
    /**
     * Retrieves the details of the API’s Health. Note: a 503 HTTP response code will be returned for the fail status.
     * @summary Get the Overall Health of the API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HealthApi
     */
    public getHealth(options?: RawAxiosRequestConfig) {
        return HealthApiFp(this.configuration).getHealth(options).then((request) => request(this.axios, this.basePath));
    }
}

