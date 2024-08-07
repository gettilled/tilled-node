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
 * @interface Subscription
 */
export interface Subscription {
    /**
     * The id of the associated account.
     * @type {string}
     * @memberof Subscription
     */
    'account_id': string;
    /**
     * Determines the date of the first payment and the day of week/month/year for subsequent payments. If a month doesn\'t have the anchor day, the subscription will be billed on the last day of the month. For example, a monthly subscription starting on January 31 bills on Feb 28/29, then March 31, April 30, etc. The subscription will be billed close to (typically within 30 minutes) the time portion of this date-time field. Note: if no time portion was specified during the creation of the subscription (i.e. \'2022-04-01\') then the time is defaulted to midnight UTC (00:00:00) and the subscription will be billed around 7PM Eastern on the *previous* day.
     * @type {string}
     * @memberof Subscription
     */
    'billing_cycle_anchor': string;
    /**
     * Time at which the object was created.
     * @type {string}
     * @memberof Subscription
     */
    'created_at': string;
    /**
     * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase.
     * @type {string}
     * @memberof Subscription
     */
    'currency': SubscriptionCurrency;
    /**
     * The id of the customer who owns the subscription.
     * @type {string}
     * @memberof Subscription
     */
    'customer_id': string;
    /**
     * Unique identifier for the object.
     * @type {string}
     * @memberof Subscription
     */
    'id': string;
    /**
     * The number of intervals (specified in the `interval_unit` attribute) between subscription billings. For example, `interval_unit=month` and `interval_count=3` bills every 3 months.
     * @type {number}
     * @memberof Subscription
     */
    'interval_count': number;
    /**
     * The frequency at which a subscription is billed. One of `week`, `month` or `year`.
     * @type {string}
     * @memberof Subscription
     */
    'interval_unit': SubscriptionIntervalUnit;
    /**
     * The id of the PaymentMethod used for this subscription. It must belong to the customer associated with the subscription.
     * @type {string}
     * @memberof Subscription
     */
    'payment_method_id': string;
    /**
     * Amount intended to be collected by this subscription. A positive integer representing how much to charge in the smallest currency unit (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency).
     * @type {number}
     * @memberof Subscription
     */
    'price': number;
    /**
     * Status of this subscription, one of `active`, `canceled`, `past_due`, `paused`, or `pending`.
     * @type {string}
     * @memberof Subscription
     */
    'status': SubscriptionStatus;
    /**
     * Time at which the object was last updated.
     * @type {string}
     * @memberof Subscription
     */
    'updated_at': string;
    /**
     * A date in the future at which the subscription will automatically get canceled.
     * @type {string}
     * @memberof Subscription
     */
    'cancel_at'?: string;
    /**
     * If the subscription has been canceled, the date of that cancellation.
     * @type {string}
     * @memberof Subscription
     */
    'canceled_at'?: string;
    /**
     * Set of [key-value pairs](#section/Metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. This `metadata` will be copied to the `payment_intent.metadata` field when a payment is attempted.
     * @type {{ [key: string]: string; }}
     * @memberof Subscription
     */
    'metadata'?: { [key: string]: string; };
    /**
     * The date at which payment will next be attempted. The value will be `null` when no more payments are to be attempted. Examples: `canceled` and `paused` statuses or `cancel_at` is prior to what would be the next payment date. When a payment fails and the status changes to `past_due` this value can be manually updated to determine the next attempt.
     * @type {string}
     * @memberof Subscription
     */
    'next_payment_at'?: string;
    /**
     * A date in the future at which the subscription will automatically get paused.
     * @type {string}
     * @memberof Subscription
     */
    'pause_at'?: string;
    /**
     * If the subscription has been paused, the date of the most recent pausing.
     * @type {string}
     * @memberof Subscription
     */
    'paused_at'?: string;
    /**
     * The amount of the fee (if any) that will be requested to be applied to the payment and transferred to the `partner` account. The amount of the fee collected will be capped a the total payment amount.
     * @type {number}
     * @memberof Subscription
     */
    'platform_fee_amount'?: number;
    /**
     * If the subscription has been paused, the date in the future at which the subscription will automatically return to active.
     * @type {string}
     * @memberof Subscription
     */
    'resume_at'?: string;
}

export const SubscriptionCurrency = {
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

export type SubscriptionCurrency = typeof SubscriptionCurrency[keyof typeof SubscriptionCurrency];
export const SubscriptionIntervalUnit = {
    WEEK: 'week',
    MONTH: 'month',
    YEAR: 'year'
} as const;

export type SubscriptionIntervalUnit = typeof SubscriptionIntervalUnit[keyof typeof SubscriptionIntervalUnit];
export const SubscriptionStatus = {
    ACTIVE: 'active',
    CANCELED: 'canceled',
    PAST_DUE: 'past_due',
    PAUSED: 'paused',
    PENDING: 'pending'
} as const;

export type SubscriptionStatus = typeof SubscriptionStatus[keyof typeof SubscriptionStatus];


