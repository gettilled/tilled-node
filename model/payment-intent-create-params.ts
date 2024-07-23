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
import { PaymentIntentLevel3 } from './payment-intent-level3';

/**
 * 
 * @export
 * @interface PaymentIntentCreateParams
 */
export interface PaymentIntentCreateParams {
    /**
     * Amount intended to be collected by this PaymentIntent. A positive integer representing how much to charge in the smallest currency unit (e.g., 100 cents to charge $1.00)
     * @type {number}
     * @memberof PaymentIntentCreateParams
     */
    'amount': number;
    /**
     * Three-letter ISO currency code, in lowercase.
     * @type {string}
     * @memberof PaymentIntentCreateParams
     */
    'currency': PaymentIntentCreateParamsCurrency;
    /**
     * The list of payment method types (e.g. card) that this PaymentIntent is allowed to use.
     * @type {Array<string>}
     * @memberof PaymentIntentCreateParams
     */
    'payment_method_types': Array<PaymentIntentCreateParamsPaymentMethodTypes>;
    /**
     * Controls when the funds will be captured from the customer’s account.  `automatic` (Default) Tilled automatically captures funds when the customer authorizes the payment.  `manual` Place a hold on funds when the customer authorizes the payment, but don\'t capture the funds until later.
     * @type {string}
     * @memberof PaymentIntentCreateParams
     */
    'capture_method'?: PaymentIntentCreateParamsCaptureMethod;
    /**
     * Set to \'true\' to attempt to confirm this PaymentIntent immediately. This parameter defaults to `false`.
     * @type {boolean}
     * @memberof PaymentIntentCreateParams
     */
    'confirm'?: boolean;
    /**
     * 
     * @type {PaymentIntentLevel3}
     * @memberof PaymentIntentCreateParams
     */
    'level3'?: PaymentIntentLevel3;
    /**
     * Set of [key-value pairs](#section/Metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value (i.e. `\'\'` or `null`) to them. All keys can be unset by posting an empty value (i.e. `{}` or `null`) to `metadata`.
     * @type {{ [key: string]: string; }}
     * @memberof PaymentIntentCreateParams
     */
    'metadata'?: { [key: string]: string; };
    /**
     * Used to identify authorization requests that use stored credentials to improve authorization rates and reduce fraud.  `consumer_ad_hoc` Ad hoc consumer-initiated request  `merchant_ad_hoc` Unscheduled merchant-initiated request  `merchant_recurring` Scheduled, merchant-initiated recurring request
     * @type {string}
     * @memberof PaymentIntentCreateParams
     */
    'occurrence_type'?: PaymentIntentCreateParamsOccurrenceType;
    /**
     * ID of the PaymentMethod to attach to this PaymentIntent.
     * @type {string}
     * @memberof PaymentIntentCreateParams
     */
    'payment_method_id'?: string;
    /**
     * The amount of the platform fee (if any) that will be requested to be applied to the payment and transferred to the `partner` account. The amount of the fee collected will be capped at the total payment amount.
     * @type {number}
     * @memberof PaymentIntentCreateParams
     */
    'platform_fee_amount'?: number;
    /**
     * Provides information about a payment that customers see on their statements. Concatenated with the prefix (shortened descriptor) or statement descriptor that’s set on the account to form the complete statement descriptor. Maximum 20 characters for the concatenated descriptor.
     * @type {string}
     * @memberof PaymentIntentCreateParams
     */
    'statement_descriptor_suffix'?: string;
}

export const PaymentIntentCreateParamsCurrency = {
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

export type PaymentIntentCreateParamsCurrency = typeof PaymentIntentCreateParamsCurrency[keyof typeof PaymentIntentCreateParamsCurrency];
export const PaymentIntentCreateParamsPaymentMethodTypes = {
    CARD: 'card',
    ACH_DEBIT: 'ach_debit',
    EFT_DEBIT: 'eft_debit',
    CARD_PRESENT: 'card_present'
} as const;

export type PaymentIntentCreateParamsPaymentMethodTypes = typeof PaymentIntentCreateParamsPaymentMethodTypes[keyof typeof PaymentIntentCreateParamsPaymentMethodTypes];
export const PaymentIntentCreateParamsCaptureMethod = {
    AUTOMATIC: 'automatic',
    MANUAL: 'manual'
} as const;

export type PaymentIntentCreateParamsCaptureMethod = typeof PaymentIntentCreateParamsCaptureMethod[keyof typeof PaymentIntentCreateParamsCaptureMethod];
export const PaymentIntentCreateParamsOccurrenceType = {
    CONSUMER_AD_HOC: 'consumer_ad_hoc',
    MERCHANT_AD_HOC: 'merchant_ad_hoc',
    MERCHANT_RECURRING: 'merchant_recurring'
} as const;

export type PaymentIntentCreateParamsOccurrenceType = typeof PaymentIntentCreateParamsOccurrenceType[keyof typeof PaymentIntentCreateParamsOccurrenceType];


