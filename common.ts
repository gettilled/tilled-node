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

import type { Configuration } from './configuration';
import type { RequestArgs } from './base';
import type { AxiosInstance, AxiosResponse } from 'axios';
import { RequiredError } from './base';

/**
 *
 * @export
 */
export const DUMMY_BASE_URL = 'https://example.com';

/**
 *
 * @throws {RequiredError}
 * @export
 */
export const assertParamExists = function (
  functionName: string,
  paramName: string,
  paramValue: unknown
) {
  if (paramValue === null || paramValue === undefined) {
    throw new RequiredError(
      paramName,
      `Required parameter ${paramName} was null or undefined when calling ${functionName}.`
    );
  }
};

/**
 *
 * @export
 */
export const setApiKeyToObject = async function (
  object: any,
  keyParamName: string,
  configuration?: Configuration
) {
  if (configuration && configuration.apiKey) {
    const localVarApiKeyValue =
      typeof configuration.apiKey === 'function'
        ? await configuration.apiKey(keyParamName)
        : await configuration.apiKey;
    object[keyParamName] = localVarApiKeyValue;
  }
};

/**
 *
 * @export
 */
export const setBasicAuthToObject = function (
  object: any,
  configuration?: Configuration
) {
  if (configuration && (configuration.username || configuration.password)) {
    object['auth'] = {
      username: configuration.username,
      password: configuration.password
    };
  }
};

/**
 *
 * @export
 */
export const setBearerAuthToObject = async function (
  object: any,
  configuration?: Configuration
) {
  if (configuration && configuration.accessToken) {
    const accessToken =
      typeof configuration.accessToken === 'function'
        ? await configuration.accessToken()
        : await configuration.accessToken;
    object['Authorization'] = 'Bearer ' + accessToken;
  }
};

/**
 *
 * @export
 */
export const setOAuthToObject = async function (
  object: any,
  name: string,
  scopes: string[],
  configuration?: Configuration
) {
  if (configuration && configuration.accessToken) {
    const localVarAccessTokenValue =
      typeof configuration.accessToken === 'function'
        ? await configuration.accessToken(name, scopes)
        : await configuration.accessToken;
    object['Authorization'] = 'Bearer ' + localVarAccessTokenValue;
  }
};

function setFlattenedQueryParams(
  urlSearchParams: URLSearchParams,
  parameter: any,
  key: string = ''
): void {
  if (parameter == null) return;
  if (typeof parameter === 'object') {
    if (Array.isArray(parameter)) {
      (parameter as any[]).forEach((item) =>
        setFlattenedQueryParams(urlSearchParams, item, key)
      );
    } else {
      Object.keys(parameter).forEach((currentKey) =>
        setFlattenedQueryParams(
          urlSearchParams,
          parameter[currentKey],
          `${key}${key !== '' ? '.' : ''}${currentKey}`
        )
      );
    }
  } else {
    if (urlSearchParams.has(key)) {
      urlSearchParams.append(key, parameter);
    } else {
      urlSearchParams.set(key, parameter);
    }
  }
}

/**
 *
 * @export
 */
export const setSearchParams = function (url: URL, ...objects: any[]) {
  const searchParams = new URLSearchParams(url.search);
  setFlattenedQueryParams(searchParams, objects);
  url.search = searchParams.toString();
};

/**
 *
 * @export
 */
export const serializeDataIfNeeded = function (
  value: any,
  requestOptions: any,
  configuration?: Configuration
) {
  const nonString = typeof value !== 'string';
  const needsSerialization =
    nonString && configuration && configuration.isJsonMime
      ? configuration.isJsonMime(requestOptions.headers['Content-Type'])
      : nonString;
  return needsSerialization
    ? JSON.stringify(value !== undefined ? value : {})
    : value || '';
};

/**
 *
 * @export
 */
export const toPathString = function (url: URL) {
  return url.pathname + url.search + url.hash;
};

/**
 *
 * @export
 */
export const createRequestFunction = function (
  axiosArgs: RequestArgs,
  globalAxios: AxiosInstance,
  BASE_PATH: string,
  configuration?: Configuration
) {
  return <T = unknown, R = AxiosResponse<T>>(
    axios: AxiosInstance = globalAxios,
    basePath: string = BASE_PATH
  ) => {
    const axiosRequestArgs = {
      ...axiosArgs.options,
      url:
        (axios.defaults.baseURL ? '' : configuration?.basePath ?? basePath) +
        axiosArgs.url
    };
    return axios.request<T, R>(axiosRequestArgs);
  };
};
