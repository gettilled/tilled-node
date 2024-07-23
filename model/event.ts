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
 * @interface Event
 */
export interface Event {
    /**
     * The id of the account that originated the event.
     * @type {string}
     * @memberof Event
     */
    'account_id': string;
    /**
     * Time at which the object was created.
     * @type {string}
     * @memberof Event
     */
    'created_at': string;
    /**
     * Object containing the API resource relevant to the event. For example, a `charge.succeeded` event will have a full charge object as the value.
     * @type {object}
     * @memberof Event
     */
    'data': object;
    /**
     * Unique identifier for the object.
     * @type {string}
     * @memberof Event
     */
    'id': string;
    /**
     * Description of the event (e.g. `charge.succeeded` or `charge.refunded`).  `account.updated` Occurs whenever an account status or property has changed. This includes capability statuses.  `charge.captured` Occurs whenever a previously uncaptured charge is captured.  `charge.expired` Occurs whenever an uncaptured charge expires.  `charge.failed` Occurs whenever a failed charge attempt occurs.  `charge.succeeded` Occurs whenever a new charge is created and is successful.  `charge.pending` Occurs whenever a pending charge is created.  `charge.refunded` occurs whenever a charge is refunded, including partial refunds  `charge.refund.updated` Occurs whenever a refund is updated, on selected payment methods.  `charge.updated` Occurs when a charge description is updated  `customer.created` Occurs whenever a new customer is created.  `customer.deleted` Occurs whenever a customer is deleted.  `customer.updated` Occurs whenever any property of a customer changes.  `payment_intent.canceled` Occurs when a PaymentIntent is canceled.  `payment_intent.created` Occurs when a new PaymentIntent is created.  `payment_intent.payment_failed` Occurs when a PaymentIntent has failed the attempt to create a payment method or a payment.  `payment_intent.processing` Occurs when a PaymentIntent has started processing.  `payment_intent.requires_action` Occurs when a PaymentIntent transitions to requires_action state  `payment_intent.succeeded` Occurs when a PaymentIntent has successfully completed payment.  `payment_method.attached` Occurs whenever a new payment method is attached to a customer.  `payment_method.detached` Occurs whenever a payment method is detached from a customer.  `report_run.succeeded` Occurs whenever a report run has successfully been uploaded to S3 and our File system.  `report_run.failed` Occurs whenever a report run has failed to be uploaded to S3 or our File system.
     * @type {string}
     * @memberof Event
     */
    'type': EventType;
    /**
     * Time at which the object was last updated.
     * @type {string}
     * @memberof Event
     */
    'updated_at': string;
}

export const EventType = {
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

export type EventType = typeof EventType[keyof typeof EventType];


