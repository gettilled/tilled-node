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
import type { DisputeEvidence } from './dispute-evidence';
// May contain unused imports in some cases
// @ts-ignore
import type { DisputeStatusHistory } from './dispute-status-history';

/**
 * 
 * @export
 * @interface Dispute
 */
export interface Dispute {
    /**
     * The ID of the Account associated with this dispute.
     * @type {string}
     * @memberof Dispute
     */
    'account_id': string;
    /**
     * Amount of the charge that is in dispute in the smallest currency unit (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency). If the dispute is type `chargeback` the amount has already been deducted from your account balance and can only be restored by submitting evidence proving the validity of the charge.
     * @type {number}
     * @memberof Dispute
     */
    'amount': number;
    /**
     * The balance transactions that describes the impact of this dispute on your account balance.
     * @type {Array<BalanceTransaction>}
     * @memberof Dispute
     */
    'balance_transactions': Array<BalanceTransaction>;
    /**
     * The ID of the Charge associated with this dispute.
     * @type {string}
     * @memberof Dispute
     */
    'charge_id': string;
    /**
     * Time at which the object was created.
     * @type {string}
     * @memberof Dispute
     */
    'created_at': string;
    /**
     * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase.
     * @type {string}
     * @memberof Dispute
     */
    'currency': DisputeCurrency;
    /**
     * Unique identifier for the object.
     * @type {string}
     * @memberof Dispute
     */
    'id': string;
    /**
     * Current status of the dispute.
     * @type {string}
     * @memberof Dispute
     */
    'status': DisputeStatus;
    /**
     * Status history of the dispute.
     * @type {Array<DisputeStatusHistory>}
     * @memberof Dispute
     */
    'status_history': Array<DisputeStatusHistory>;
    /**
     * Time at which the object was updated.
     * @type {string}
     * @memberof Dispute
     */
    'updated_at': string;
    /**
     * Time at which the supporting evidence is due and the dispute will be closed with no response.
     * @type {string}
     * @memberof Dispute
     */
    'closing_at'?: string;
    /**
     * Evidence submitted to challenge the dispute.
     * @type {DisputeEvidence}
     * @memberof Dispute
     */
    'evidence'?: DisputeEvidence;
    /**
     * Time at which the a dispute will be marked lost.
     * @type {string}
     * @memberof Dispute
     */
    'losing_at'?: string;
    /**
     * Description explaining the reason for a dispute
     * @type {string}
     * @memberof Dispute
     */
    'reason_description'?: string;
    /**
     * Time at which the dispute was reversed.
     * @type {string}
     * @memberof Dispute
     */
    'reversed_at'?: string;
}

export const DisputeCurrency = {
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

export type DisputeCurrency = typeof DisputeCurrency[keyof typeof DisputeCurrency];
export const DisputeStatus = {
    WARNING_NEEDS_RESPONSE: 'warning_needs_response',
    WARNING_UNDER_REVIEW: 'warning_under_review',
    WARNING_CLOSED: 'warning_closed',
    NEEDS_RESPONSE: 'needs_response',
    UNDER_REVIEW: 'under_review',
    CLOSED: 'closed',
    WON: 'won',
    LOST: 'lost'
} as const;

export type DisputeStatus = typeof DisputeStatus[keyof typeof DisputeStatus];


