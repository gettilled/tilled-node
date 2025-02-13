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
import type { Charge } from './charge';
// May contain unused imports in some cases
// @ts-ignore
import type { Customer } from './customer';
// May contain unused imports in some cases
// @ts-ignore
import type { Level3 } from './level3';
// May contain unused imports in some cases
// @ts-ignore
import type { PaymentIntentError } from './payment-intent-error';
// May contain unused imports in some cases
// @ts-ignore
import type { PaymentMethod } from './payment-method';

/**
 * 
 * @export
 * @interface PaymentIntent
 */
export interface PaymentIntent {
    /**
     * ID of the Tilled account for which the funds of this PaymentIntent are intended.
     * @type {string}
     * @memberof PaymentIntent
     */
    'account_id': string;
    /**
     * Amount intended to be collected by this PaymentIntent. A positive integer representing how much to charge in the smallest currency unit (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency).
     * @type {number}
     * @memberof PaymentIntent
     */
    'amount': number;
    /**
     * Amount that can be captured from this PaymentIntent.
     * @type {number}
     * @memberof PaymentIntent
     */
    'amount_capturable': number;
    /**
     * Amount that was collected by this PaymentIntent.
     * @type {number}
     * @memberof PaymentIntent
     */
    'amount_received': number;
    /**
     * Controls when the funds will be captured from the customer’s account.  `automatic` (Default) Tilled automatically captures funds when the customer authorizes the payment.  `manual` Place a hold on funds when the customer authorizes the payment, but don\'t capture the funds until later.
     * @type {string}
     * @memberof PaymentIntent
     */
    'capture_method': PaymentIntentCaptureMethod;
    /**
     * Charges that were created by this PaymentIntent, if any. At most, this list will only contain one successful charge.
     * @type {Array<Charge>}
     * @memberof PaymentIntent
     */
    'charges': Array<Charge>;
    /**
     * The client secret of this PaymentIntent. The client secret, along with a publishable key, can be used to complete a payment from your frontend. It should not be stored, logged, embedded in URLs, or exposed to anyone other than the customer. Make sure that you have TLS enabled on any page that includes the client secret.
     * @type {string}
     * @memberof PaymentIntent
     */
    'client_secret': string;
    /**
     * Time at which the object was created.
     * @type {string}
     * @memberof PaymentIntent
     */
    'created_at': string;
    /**
     * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase.
     * @type {string}
     * @memberof PaymentIntent
     */
    'currency': PaymentIntentCurrency;
    /**
     * Unique identifier for the object.
     * @type {string}
     * @memberof PaymentIntent
     */
    'id': string;
    /**
     * The list of payment method types (e.g. card) that this PaymentIntent is allowed to use.
     * @type {Array<string>}
     * @memberof PaymentIntent
     */
    'payment_method_types': Array<PaymentIntentPaymentMethodTypes>;
    /**
     * Status of this PaymentIntent, one of `requires_payment_method`, `requires_confirmation`, `requires_action`, `processing`, `requires_capture`, `canceled`, or `succeeded`.
     * @type {string}
     * @memberof PaymentIntent
     */
    'status': PaymentIntentStatus;
    /**
     * Time at which the object was updated.
     * @type {string}
     * @memberof PaymentIntent
     */
    'updated_at': string;
    /**
     * Populated when `status` is `canceled`, this is the time at which the PaymentIntent was canceled.
     * @type {string}
     * @memberof PaymentIntent
     */
    'canceled_at'?: string;
    /**
     * Reason for cancellation of this PaymentIntent, either user-provided (`duplicate`, `fraudulent`, `requested_by_customer`, or `abandoned`) or generated by Tilled internally (`automatic`).
     * @type {string}
     * @memberof PaymentIntent
     */
    'cancellation_reason'?: PaymentIntentCancellationReason;
    /**
     * The Customer this PaymentIntent belongs to, if one exists. Payment methods attached to other Customers cannot be used with this PaymentIntent.
     * @type {Customer}
     * @memberof PaymentIntent
     */
    'customer'?: Customer;
    /**
     * The payment error encountered in the previous PaymentIntent confirmation. It will be cleared if the PaymentIntent is later updated for any reason.
     * @type {PaymentIntentError}
     * @memberof PaymentIntent
     */
    'last_payment_error'?: PaymentIntentError;
    /**
     * Level 2 and Level 3 (L2/L3) credit card processing refers to certain B2B card transactions for which the merchant might be eligible for lower credit card interchange rates. The lower rates may be available for merchants who provide more detailed information when processing card-not-present transactions.
     * @type {Level3}
     * @memberof PaymentIntent
     */
    'level3'?: Level3;
    /**
     * Set of [key-value pairs](#section/Metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
     * @type {{ [key: string]: string; }}
     * @memberof PaymentIntent
     */
    'metadata'?: { [key: string]: string; };
    /**
     * Used to identify authorization requests that use stored credentials to improve authorization rates and reduce fraud.  `consumer_ad_hoc` Ad hoc consumer-initiated request  `merchant_ad_hoc` Unscheduled merchant-initiated request  `merchant_recurring` Scheduled, merchant-initiated recurring request
     * @type {string}
     * @memberof PaymentIntent
     */
    'occurrence_type'?: PaymentIntentOccurrenceType;
    /**
     * The PaymentMethod used in this PaymentIntent.
     * @type {PaymentMethod}
     * @memberof PaymentIntent
     */
    'payment_method'?: PaymentMethod;
    /**
     * The amount of the fee (if any) that will be requested to be applied to the payment and transferred to the `partner` account. The amount of the fee collected will be capped a the total payment amount.
     * @type {number}
     * @memberof PaymentIntent
     */
    'platform_fee_amount'?: number;
    /**
     * Provides information about a card payment that customers see on their statements. Concatenated with the prefix (shortened descriptor) or statement descriptor that’s set on the account to form the complete statement descriptor. Maximum 22 characters for the concatenated descriptor
     * @type {string}
     * @memberof PaymentIntent
     */
    'statement_descriptor_suffix'?: string;
    /**
     * ID of the subscription related to this PaymentIntent (if any).
     * @type {string}
     * @memberof PaymentIntent
     */
    'subscription_id'?: string;
}

export const PaymentIntentCaptureMethod = {
    AUTOMATIC: 'automatic',
    MANUAL: 'manual'
} as const;

export type PaymentIntentCaptureMethod = typeof PaymentIntentCaptureMethod[keyof typeof PaymentIntentCaptureMethod];
export const PaymentIntentCurrency = {
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

export type PaymentIntentCurrency = typeof PaymentIntentCurrency[keyof typeof PaymentIntentCurrency];
export const PaymentIntentPaymentMethodTypes = {
    CARD: 'card',
    ACH_DEBIT: 'ach_debit',
    EFT_DEBIT: 'eft_debit',
    CARD_PRESENT: 'card_present'
} as const;

export type PaymentIntentPaymentMethodTypes = typeof PaymentIntentPaymentMethodTypes[keyof typeof PaymentIntentPaymentMethodTypes];
export const PaymentIntentStatus = {
    CANCELED: 'canceled',
    PROCESSING: 'processing',
    REQUIRES_ACTION: 'requires_action',
    REQUIRES_CAPTURE: 'requires_capture',
    REQUIRES_CONFIRMATION: 'requires_confirmation',
    REQUIRES_PAYMENT_METHOD: 'requires_payment_method',
    SUCCEEDED: 'succeeded'
} as const;

export type PaymentIntentStatus = typeof PaymentIntentStatus[keyof typeof PaymentIntentStatus];
export const PaymentIntentCancellationReason = {
    DUPLICATE: 'duplicate',
    FRAUDULENT: 'fraudulent',
    REQUESTED_BY_CUSTOMER: 'requested_by_customer',
    ABANDONED: 'abandoned',
    AUTOMATIC: 'automatic'
} as const;

export type PaymentIntentCancellationReason = typeof PaymentIntentCancellationReason[keyof typeof PaymentIntentCancellationReason];
export const PaymentIntentOccurrenceType = {
    CONSUMER_AD_HOC: 'consumer_ad_hoc',
    MERCHANT_AD_HOC: 'merchant_ad_hoc',
    MERCHANT_RECURRING: 'merchant_recurring'
} as const;

export type PaymentIntentOccurrenceType = typeof PaymentIntentOccurrenceType[keyof typeof PaymentIntentOccurrenceType];


