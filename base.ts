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
// Some imports not used depending on template conditions
// @ts-ignore
import type { AxiosRequestHeaders, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';

export const BASE_PATH = 'https://api.tilled.com'.replace(/\/+$/, '');

/**
 *
 * @export
 */
export const COLLECTION_FORMATS = {
  csv: ',',
  ssv: ' ',
  tsv: '\t',
  pipes: '|'
};

/**
 *
 * @export
 * @interface RequestArgs
 */
export interface RequestArgs {
  url: string;
  options: RawAxiosRequestConfig;
}

/**
 *
 * @export
 * @class BaseAPI
 */
export class BaseAPI {
  protected configuration: Configuration | undefined;

  constructor(
    configuration?: Configuration,
    protected basePath: string = BASE_PATH,
    protected axios: AxiosInstance = globalAxios
  ) {
    if (configuration) {
      this.configuration = configuration;
      this.basePath = configuration.basePath ?? basePath;
    }
    this.axios.interceptors.response.use(
      (response) => {
        // Redact sensitive headers
        if (response?.config?.headers) {
          response.config.headers = redactHeaders(response.config.headers) as AxiosRequestHeaders;
        }
    
        // Redact sensitive request data
        if (response?.config?.data) {
            const parsedData = JSON.parse(response.config.data);
            response.config.data = JSON.stringify(redactData(parsedData, sensitiveKeys));
        }
    
        // Redact raw request headers
        if (response?.request?._header) {
          response.request._header = response.request._header.replace(
            /tilled-api-key: .+/,
            'tilled-api-key: sk_************'
          );
        }
    
        return response;
      },
      (error) => {
        // Redact sensitive headers in error
        if (error?.config?.headers) {
          error.config.headers = redactHeaders(error.config.headers);
        }
    
        // Redact sensitive request data in error
        if (error?.config?.data) {
            const parsedData = JSON.parse(error.config.data);
            error.config.data = JSON.stringify(redactData(parsedData, sensitiveKeys));
        }
    
        // Redact raw request headers in error
        if (error?.request?._header) {
          error.request._header = error.request._header.replace(
            /tilled-api-key: .+/,
            'tilled-api-key: sk_************'
          );
        }
    
        return Promise.reject(error);
      }
    );
    
    function redactHeaders(headers: Record<string, string>, sensitiveHeaders = ['tilled-api-key', 'Authorization']) {
      return Object.fromEntries(
        Object.entries(headers).map(([key, value]) =>
          sensitiveHeaders.includes(key) ? [key, '***'] : [key, value]
        )
      );
    }
    
    function redactData(obj: any, sensitiveKeys: string[]): any {
      if (Array.isArray(obj)) {
        return obj.map((item) => redactData(item, sensitiveKeys));
      } else if (obj && typeof obj === 'object') {
        return Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [
            key,
            sensitiveKeys.includes(key) ? '***' : redactData(value, sensitiveKeys),
          ])
        );
      }
      return obj;
    }
    
    const sensitiveKeys = ['number', 'cvc','account_number', 'institution_id', 'transit_number', 'routing_number', 'street', 'email', 'phone'];
    
  }
}

/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export class RequiredError extends Error {
  constructor(public field: string, msg?: string) {
    super(msg);
    this.name = 'RequiredError';
  }
}

interface ServerMap {
  [key: string]: {
    url: string;
    description: string;
  }[];
}

/**
 *
 * @export
 */
export const operationServerMap: ServerMap = {};
