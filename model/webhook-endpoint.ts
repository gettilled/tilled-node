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
 * @interface WebhookEndpoint
 */
export interface WebhookEndpoint {
    /**
     * The id of the associated account.
     * @type {string}
     * @memberof WebhookEndpoint
     */
    'account_id': string;
    /**
     * Time at which the object was created.
     * @type {string}
     * @memberof WebhookEndpoint
     */
    'created_at': string;
    /**
     * The list of events to enable for this endpoint. You may specify `[\'*\']` to enable all events, except those that require explicit selection.
     * @type {Array<string>}
     * @memberof WebhookEndpoint
     */
    'enabled_events': Array<WebhookEndpointEnabledEvents>;
    /**
     * Unique identifier for the object.
     * @type {string}
     * @memberof WebhookEndpoint
     */
    'id': string;
    /**
     * Time at which the object was last updated.
     * @type {string}
     * @memberof WebhookEndpoint
     */
    'updated_at': string;
    /**
     * The URL of the webhook endpoint.
     * @type {string}
     * @memberof WebhookEndpoint
     */
    'url': string;
    /**
     * An optional description of what the webhook is used for.
     * @type {string}
     * @memberof WebhookEndpoint
     */
    'description'?: string;
    /**
     * The endpoint\'s secret, used to generate webhook signatures. Only returned at creation.
     * @type {string}
     * @memberof WebhookEndpoint
     */
    'secret'?: string;
}

export const WebhookEndpointEnabledEvents = {
    STAR: '*',
    ACCOUNT_UPDATED: 'account.updated',
    CHARGE_CAPTURED: 'charge.captured',
    CHARGE_EXPIRED: 'charge.expired',
    CHARGE_FAILED: 'charge.failed',
    CHARGE_SUCCEEDED: 'charge.succeeded',
    CHARGE_PENDING: 'charge.pending',
    CHARGE_REFUNDED: 'charge.refunded',
    CHARGE_REFUND_UPDATED: 'charge.refund.updated',
    CHARGE_UPDATED: 'charge.updated',
    CUSTOMER_CREATED: 'customer.created',
    CUSTOMER_DELETED: 'customer.deleted',
    CUSTOMER_UPDATED: 'customer.updated',
    DISPUTE_CREATED: 'dispute.created',
    DISPUTE_UPDATED: 'dispute.updated',
    PAYMENT_INTENT_CANCELED: 'payment_intent.canceled',
    PAYMENT_INTENT_CREATED: 'payment_intent.created',
    PAYMENT_INTENT_PAYMENT_FAILED: 'payment_intent.payment_failed',
    PAYMENT_INTENT_PROCESSING: 'payment_intent.processing',
    PAYMENT_INTENT_REQUIRES_ACTION: 'payment_intent.requires_action',
    PAYMENT_INTENT_SUCCEEDED: 'payment_intent.succeeded',
    PAYMENT_INTENT_AMOUNT_CAPTURABLE_UPDATED: 'payment_intent.amount_capturable_updated',
    PAYMENT_METHOD_ATTACHED: 'payment_method.attached',
    PAYMENT_METHOD_DETACHED: 'payment_method.detached',
    PAYOUT_CREATED: 'payout.created',
    PAYOUT_FAILED: 'payout.failed',
    PAYOUT_PAID: 'payout.paid',
    PAYOUT_UPDATED: 'payout.updated',
    PLATFORM_FEE_CREATED: 'platform_fee.created',
    PLATFORM_FEE_REFUNDED: 'platform_fee.refunded',
    SUBSCRIPTION_CREATED: 'subscription.created',
    SUBSCRIPTION_CANCELED: 'subscription.canceled',
    SUBSCRIPTION_UPDATED: 'subscription.updated',
    REPORT_RUN_SUCCEEDED: 'report_run.succeeded',
    REPORT_RUN_FAILED: 'report_run.failed',
    OUTBOUND_TRANSFER_PENDING: 'outbound_transfer.pending',
    OUTBOUND_TRANSFER_FAILED: 'outbound_transfer.failed',
    OUTBOUND_TRANSFER_CANCELED: 'outbound_transfer.canceled',
    OUTBOUND_TRANSFER_SUCCEEDED: 'outbound_transfer.succeeded'
} as const;

export type WebhookEndpointEnabledEvents = typeof WebhookEndpointEnabledEvents[keyof typeof WebhookEndpointEnabledEvents];


