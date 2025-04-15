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


// May contain unused imports in some cases
// @ts-ignore
import type { CardChecks } from './card-checks';

/**
 * 
 * @export
 * @interface CardDetails
 */
export interface CardDetails {
    /**
     * Whether or not the card is an apple pay card
     * @type {boolean}
     * @memberof CardDetails
     */
    'apple_pay'?: boolean;
    /**
     * Type of card.
     * @type {string}
     * @memberof CardDetails
     */
    'brand'?: CardDetailsBrand;
    /**
     * Checks on Card address and CVC if provided.
     * @type {CardChecks}
     * @memberof CardDetails
     */
    'checks'?: CardChecks;
    /**
     * Two-digit number representing the card\'s expiration month.
     * @type {number}
     * @memberof CardDetails
     */
    'exp_month'?: number;
    /**
     * Two- or four-digit number representing the card\'s expiration year.
     * @type {number}
     * @memberof CardDetails
     */
    'exp_year'?: number;
    /**
     * Card funding type.
     * @type {string}
     * @memberof CardDetails
     */
    'funding'?: CardDetailsFunding;
    /**
     * The card holder\'s name.
     * @type {string}
     * @memberof CardDetails
     */
    'holder_name'?: string;
    /**
     * Last 4 digits of the card.
     * @type {string}
     * @memberof CardDetails
     */
    'last4'?: string;
}

export const CardDetailsBrand = {
    AMEX: 'amex',
    DINERS: 'diners',
    DISCOVER: 'discover',
    JCB: 'jcb',
    MAESTRO: 'maestro',
    MASTERCARD: 'mastercard',
    SOLO: 'solo',
    VISA: 'visa',
    VISA_DEBIT: 'visa_debit',
    VISA_ELECTRON: 'visa_electron',
    INTERAC: 'interac',
    UNKNOWN: 'unknown'
} as const;

export type CardDetailsBrand = typeof CardDetailsBrand[keyof typeof CardDetailsBrand];
export const CardDetailsFunding = {
    CREDIT: 'credit',
    DEBIT: 'debit',
    PREPAID: 'prepaid',
    UNKNOWN: 'unknown'
} as const;

export type CardDetailsFunding = typeof CardDetailsFunding[keyof typeof CardDetailsFunding];


