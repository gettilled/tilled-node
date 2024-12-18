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
import type { CheckoutSessionLineItem } from './checkout-session-line-item';
// May contain unused imports in some cases
// @ts-ignore
import type { CustomerDetails } from './customer-details';

/**
 * 
 * @export
 * @interface CheckoutSession
 */
export interface CheckoutSession {
    /**
     * The ID of the account for this checkout session.
     * @type {string}
     * @memberof CheckoutSession
     */
    'account_id': string;
    /**
     * Total of all items, in currency minor units.
     * @type {number}
     * @memberof CheckoutSession
     */
    'amount_total': number;
    /**
     * Time at which the object was created.
     * @type {string}
     * @memberof CheckoutSession
     */
    'created_at': string;
    /**
     * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase.
     * @type {string}
     * @memberof CheckoutSession
     */
    'currency': CheckoutSessionCurrency;
    /**
     * Unique identifier for the object.
     * @type {string}
     * @memberof CheckoutSession
     */
    'id': string;
    /**
     * A list of items the customer is purchasing. The maximum is 100 line items, however it is recommended to consolidate line items if there are more than a few dozen.
     * @type {Array<CheckoutSessionLineItem>}
     * @memberof CheckoutSession
     */
    'line_items': Array<CheckoutSessionLineItem>;
    /**
     * The ID of the payment intent for checkout session.
     * @type {string}
     * @memberof CheckoutSession
     */
    'payment_intent_id': string;
    /**
     * A list of the types of payment methods (e.g. card) this checkout session is allowed to accept.
     * @type {Array<string>}
     * @memberof CheckoutSession
     */
    'payment_method_types': Array<CheckoutSessionPaymentMethodTypes>;
    /**
     * The status of the checkout session, one of `open`, `complete` or `expired`.  `open` The checkout session is still in progress. Payment processing has not started.  `complete` The checkout session is complete. Payment processing may still be in progress.  `expired` The checkout session has expired. No further processing will occur.
     * @type {string}
     * @memberof CheckoutSession
     */
    'status': CheckoutSessionStatus;
    /**
     * Time at which the object was last updated.
     * @type {string}
     * @memberof CheckoutSession
     */
    'updated_at': string;
    /**
     * The URL to the checkout session. Redirect customers to this URL to take them to checkout.
     * @type {string}
     * @memberof CheckoutSession
     */
    'url': string;
    /**
     * If set, checkout will display a back button and customers will be directed to this URL if they decide to cancel payment and return to your website.
     * @type {string}
     * @memberof CheckoutSession
     */
    'cancel_url'?: string;
    /**
     * The customer details.
     * @type {CustomerDetails}
     * @memberof CheckoutSession
     */
    'customer_details'?: CustomerDetails;
    /**
     * The ID of the customer for this checkout session.
     * @type {string}
     * @memberof CheckoutSession
     */
    'customer_id'?: string;
    /**
     * The due date for the checkout session. After this date the customer will no longer be able to complete the checkout session.
     * @type {string}
     * @memberof CheckoutSession
     */
    'expires_at'?: string;
    /**
     * Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value (i.e. `\'\'` or `null`) to them. All keys can be unset by posting an empty value (i.e. `{}` or `null`) to `metadata`.\"
     * @type {{ [key: string]: string; }}
     * @memberof CheckoutSession
     */
    'metadata'?: { [key: string]: string; };
    /**
     * The URL to which we should send customers when payment is complete. It is recommended that you supply this value, but if none is provided, a generic success landing page will be used.
     * @type {string}
     * @memberof CheckoutSession
     */
    'success_url'?: string;
}

export const CheckoutSessionCurrency = {
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

export type CheckoutSessionCurrency = typeof CheckoutSessionCurrency[keyof typeof CheckoutSessionCurrency];
export const CheckoutSessionPaymentMethodTypes = {
    CARD: 'card',
    ACH_DEBIT: 'ach_debit',
    EFT_DEBIT: 'eft_debit',
    CARD_PRESENT: 'card_present'
} as const;

export type CheckoutSessionPaymentMethodTypes = typeof CheckoutSessionPaymentMethodTypes[keyof typeof CheckoutSessionPaymentMethodTypes];
export const CheckoutSessionStatus = {
    OPEN: 'open',
    COMPLETE: 'complete',
    EXPIRED: 'expired'
} as const;

export type CheckoutSessionStatus = typeof CheckoutSessionStatus[keyof typeof CheckoutSessionStatus];


