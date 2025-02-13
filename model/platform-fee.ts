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
import type { BalanceTransaction } from './balance-transaction';
// May contain unused imports in some cases
// @ts-ignore
import type { PlatformFeeRefund } from './platform-fee-refund';

/**
 * 
 * @export
 * @interface PlatformFee
 */
export interface PlatformFee {
    /**
     * Amount earned, in minor currency units.
     * @type {number}
     * @memberof PlatformFee
     */
    'amount': number;
    /**
     * Amount refunded, in minor currency units. Can be less than the amount attribute if a partial refund was issued.
     * @type {number}
     * @memberof PlatformFee
     */
    'amount_refunded': number;
    /**
     * The balance transaction that describes the impact of this collected platform fee on your account balance (not including refunds). Note: Multiple balance transactions may be associated with this resource and you can fetch them all with `/balance-transactions?source_id={id}`.
     * @type {BalanceTransaction}
     * @memberof PlatformFee
     * @deprecated
     */
    'balance_transaction': BalanceTransaction;
    /**
     * Id of the charge this fee was taken from.
     * @type {string}
     * @memberof PlatformFee
     */
    'charge_id': string;
    /**
     * Time at which the object was created.
     * @type {string}
     * @memberof PlatformFee
     */
    'created_at': string;
    /**
     * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase.
     * @type {string}
     * @memberof PlatformFee
     */
    'currency': PlatformFeeCurrency;
    /**
     * Unique identifier for the object.
     * @type {string}
     * @memberof PlatformFee
     */
    'id': string;
    /**
     * Id of the Tilled account that earned this fee. This is generally an account of `type` `partner`.
     * @type {string}
     * @memberof PlatformFee
     */
    'payee_account_id': string;
    /**
     * Id of the Tilled account this fee was taken from. This is generally an account of `type` `merchant`.
     * @type {string}
     * @memberof PlatformFee
     */
    'payer_account_id': string;
    /**
     * Whether the fee has been fully refunded. If the fee is only partially refunded, this attribute will be false.
     * @type {boolean}
     * @memberof PlatformFee
     */
    'refunded': boolean;
    /**
     * A list of refunds that have been applied to the fee.
     * @type {Array<PlatformFeeRefund>}
     * @memberof PlatformFee
     */
    'refunds': Array<PlatformFeeRefund>;
    /**
     * Time at which the object was last updated.
     * @type {string}
     * @memberof PlatformFee
     */
    'updated_at': string;
}

export const PlatformFeeCurrency = {
    AUD: 'aud',
    CAD: 'cad',
    DKK: 'dkk',
    EUR: 'eur',
    HKD: 'hkd',
    JPY: 'jpy',
    NZD: 'nzd',
    NOK: 'nok',
    GBP: 'gbp',
    ZAR: 'zar',
    SEK: 'sek',
    CHF: 'chf',
    USD: 'usd'
} as const;

export type PlatformFeeCurrency = typeof PlatformFeeCurrency[keyof typeof PlatformFeeCurrency];


