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



/**
 * 
 * @export
 * @interface BankAccount
 */
export interface BankAccount {
    /**
     * The name of the person or business that owns the bank account.
     * @type {string}
     * @memberof BankAccount
     */
    'account_holder_name': string;
    /**
     * The ID of the Account associated with the bank account.
     * @type {string}
     * @memberof BankAccount
     */
    'account_id': string;
    /**
     * Time at which the object was created.
     * @type {string}
     * @memberof BankAccount
     */
    'created_at': string;
    /**
     * The currency the bank account is in. Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase.
     * @type {string}
     * @memberof BankAccount
     */
    'currency': BankAccountCurrency;
    /**
     * Whether this bank account is the default account for its currency.
     * @type {boolean}
     * @memberof BankAccount
     */
    'default_for_currency': boolean;
    /**
     * Unique identifier for the object.
     * @type {string}
     * @memberof BankAccount
     */
    'id': string;
    /**
     * The last 4 digits of the bank account number.
     * @type {string}
     * @memberof BankAccount
     */
    'last4': string;
    /**
     * The US bank account routing number.
     * @type {string}
     * @memberof BankAccount
     */
    'routing_number': string;
    /**
     * Bank account status
     * @type {string}
     * @memberof BankAccount
     */
    'status': BankAccountStatus;
    /**
     * The bank account type
     * @type {string}
     * @memberof BankAccount
     */
    'type': BankAccountType;
    /**
     * Time at which the object was last updated.
     * @type {string}
     * @memberof BankAccount
     */
    'updated_at': string;
    /**
     * Name of the bank associated with the routing number (e.g. `WELLS FARGO`).
     * @type {string}
     * @memberof BankAccount
     */
    'bank_name'?: string;
}

export const BankAccountCurrency = {
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

export type BankAccountCurrency = typeof BankAccountCurrency[keyof typeof BankAccountCurrency];
export const BankAccountStatus = {
    NEW: 'new',
    VALIDATED: 'validated',
    VERIFIED: 'verified',
    VERIFICATION_FAILED: 'verification_failed',
    ERRORED: 'errored'
} as const;

export type BankAccountStatus = typeof BankAccountStatus[keyof typeof BankAccountStatus];
export const BankAccountType = {
    CHECKING: 'checking',
    SAVINGS: 'savings'
} as const;

export type BankAccountType = typeof BankAccountType[keyof typeof BankAccountType];


