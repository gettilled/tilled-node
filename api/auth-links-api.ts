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
import type { AuthLinkCreateParams } from '../model';
// @ts-ignore
import type { AuthLinkDto } from '../model';
/**
 * AuthLinksApi - axios parameter creator
 * @export
 */
export const AuthLinksApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Creates an Auth Link for a User.
         * @summary Create an Auth Link
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {AuthLinkCreateParams} AuthLinkCreateParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createAuthLink: async (tilled_account: string, AuthLinkCreateParams: AuthLinkCreateParams, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('createAuthLink', 'tilled_account', tilled_account)
            // verify required parameter 'AuthLinkCreateParams' is not null or undefined
            assertParamExists('createAuthLink', 'AuthLinkCreateParams', AuthLinkCreateParams)
            const localVarPath = `/v1/auth-links`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(AuthLinkCreateParams, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * AuthLinksApi - functional programming interface
 * @export
 */
export const AuthLinksApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = AuthLinksApiAxiosParamCreator(configuration)
    return {
        /**
         * Creates an Auth Link for a User.
         * @summary Create an Auth Link
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {AuthLinkCreateParams} AuthLinkCreateParams 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createAuthLink(tilled_account: string, AuthLinkCreateParams: AuthLinkCreateParams, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AuthLinkDto>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createAuthLink(tilled_account, AuthLinkCreateParams, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['AuthLinksApi.createAuthLink']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * AuthLinksApi - factory interface
 * @export
 */
export const AuthLinksApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = AuthLinksApiFp(configuration)
    return {
        /**
         * Creates an Auth Link for a User.
         * @summary Create an Auth Link
         * @param {AuthLinksApiCreateAuthLinkRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createAuthLink(requestParameters: AuthLinksApiCreateAuthLinkRequest, options?: RawAxiosRequestConfig): AxiosPromise<AuthLinkDto> {
            return localVarFp.createAuthLink(requestParameters.tilled_account, requestParameters.AuthLinkCreateParams, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for createAuthLink operation in AuthLinksApi.
 * @export
 * @interface AuthLinksApiCreateAuthLinkRequest
 */
export interface AuthLinksApiCreateAuthLinkRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof AuthLinksApiCreateAuthLink
     */
    readonly tilled_account: string

    /**
     * 
     * @type {AuthLinkCreateParams}
     * @memberof AuthLinksApiCreateAuthLink
     */
    readonly AuthLinkCreateParams: AuthLinkCreateParams
}

/**
 * AuthLinksApi - object-oriented interface
 * @export
 * @class AuthLinksApi
 * @extends {BaseAPI}
 */
export class AuthLinksApi extends BaseAPI {
    /**
     * Creates an Auth Link for a User.
     * @summary Create an Auth Link
     * @param {AuthLinksApiCreateAuthLinkRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthLinksApi
     */
    public createAuthLink(requestParameters: AuthLinksApiCreateAuthLinkRequest, options?: RawAxiosRequestConfig) {
        return AuthLinksApiFp(this.configuration).createAuthLink(requestParameters.tilled_account, requestParameters.AuthLinkCreateParams, options).then((request) => request(this.axios, this.basePath));
    }
}

