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
import type { BalanceTransactionFeeDetail } from './balance-transaction-fee-detail';

/**
 * 
 * @export
 * @interface BalanceTransaction
 */
export interface BalanceTransaction {
    /**
     * 
     * @type {string}
     * @memberof BalanceTransaction
     */
    'account_id': string;
    /**
     * Gross amount of the transaction, in the smallest currency unit (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency). Can be negative for certain transaction types (e.g. `payout`, `refund`).
     * @type {number}
     * @memberof BalanceTransaction
     */
    'amount': number;
    /**
     * The date the transaction\'s net funds will become available in the Tilled balance.
     * @type {string}
     * @memberof BalanceTransaction
     */
    'available_on': string;
    /**
     * Time at which the object was created.
     * @type {string}
     * @memberof BalanceTransaction
     */
    'created_at': string;
    /**
     * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase.
     * @type {string}
     * @memberof BalanceTransaction
     */
    'currency': BalanceTransactionCurrency;
    /**
     * Fees (in smallest currency unit) paid for this transaction. Note: Fees are now portrayed as individual balance transactions of `type = fee`.
     * @type {number}
     * @memberof BalanceTransaction
     * @deprecated
     */
    'fee': number;
    /**
     * Detailed breakdown of the fees paid for this transaction. Note: Fees are now portrayed as individual balance transactions of `type = fee`. Refer to `fee_type` and `fee_subtype` for details.
     * @type {Array<BalanceTransactionFeeDetail>}
     * @memberof BalanceTransaction
     * @deprecated
     */
    'fee_details': Array<BalanceTransactionFeeDetail>;
    /**
     * Unique identifier for the object.
     * @type {string}
     * @memberof BalanceTransaction
     */
    'id': string;
    /**
     * Net amount of the transaction, in smallest currency unit. Note: Fees are now portrayed as individual balance transactions of `type = fee`. `net` will no longer differ from `amount`.
     * @type {number}
     * @memberof BalanceTransaction
     * @deprecated
     */
    'net': number;
    /**
     * Tilled id to which this transaction is related
     * @type {string}
     * @memberof BalanceTransaction
     */
    'source_id': string;
    /**
     * Tilled resource type of `source_id`.
     * @type {string}
     * @memberof BalanceTransaction
     */
    'source_type': BalanceTransactionSourceType;
    /**
     * If the transaction’s net funds are available in the Tilled balance yet. Either `available` or `pending`.
     * @type {string}
     * @memberof BalanceTransaction
     */
    'status': BalanceTransactionStatus;
    /**
     * Transaction type.
     * @type {string}
     * @memberof BalanceTransaction
     */
    'type': BalanceTransactionType;
    /**
     * Time at which the object was last updated.
     * @type {string}
     * @memberof BalanceTransaction
     */
    'updated_at': string;
    /**
     * An arbitrary string attached to the object. Often useful for displaying to users.
     * @type {string}
     * @memberof BalanceTransaction
     */
    'description'?: string;
    /**
     * Fee subtype, if this transaction represents a fee (i.e. type = fee).
     * @type {string}
     * @memberof BalanceTransaction
     */
    'fee_subtype'?: BalanceTransactionFeeSubtype;
    /**
     * Fee type, if this transaction represents a fee (i.e. type = fee).
     * @type {string}
     * @memberof BalanceTransaction
     */
    'fee_type'?: BalanceTransactionFeeType;
    /**
     * The id of the Payout, if any, associated with this balance transaction.
     * @type {string}
     * @memberof BalanceTransaction
     */
    'payout_id'?: string;
}

export const BalanceTransactionCurrency = {
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

export type BalanceTransactionCurrency = typeof BalanceTransactionCurrency[keyof typeof BalanceTransactionCurrency];
export const BalanceTransactionSourceType = {
    CHARGE: 'charge',
    REFUND: 'refund',
    PAYOUT: 'payout',
    PAYMENT_METHOD: 'payment_method',
    PLATFORM_FEE: 'platform_fee',
    PLATFORM_FEE_REFUND: 'platform_fee_refund',
    DISPUTE: 'dispute',
    ACCOUNT: 'account',
    OUTBOUND_TRANSFER: 'outbound_transfer',
    TERMINAL_READER: 'terminal_reader'
} as const;

export type BalanceTransactionSourceType = typeof BalanceTransactionSourceType[keyof typeof BalanceTransactionSourceType];
export const BalanceTransactionStatus = {
    AVAILABLE: 'available',
    PENDING: 'pending'
} as const;

export type BalanceTransactionStatus = typeof BalanceTransactionStatus[keyof typeof BalanceTransactionStatus];
export const BalanceTransactionType = {
    CHARGE: 'charge',
    CHARGE_FAILURE_REFUND: 'charge_failure_refund',
    DISPUTE: 'dispute',
    DISPUTE_WON: 'dispute_won',
    REFUND: 'refund',
    REFUND_FAILURE: 'refund_failure',
    ADJUSTMENT: 'adjustment',
    COMMISSION: 'commission',
    PAYOUT: 'payout',
    PAYOUT_CANCEL: 'payout_cancel',
    PAYOUT_FAILURE: 'payout_failure',
    FEE: 'fee',
    PLATFORM_FEE: 'platform_fee',
    PLATFORM_FEE_REFUND: 'platform_fee_refund',
    OUTBOUND_TRANSFER: 'outbound_transfer',
    OUTBOUND_TRANSFER_CANCEL: 'outbound_transfer_cancel',
    OUTBOUND_TRANSFER_FAILURE: 'outbound_transfer_failure',
    CHARGE_FEE: 'charge_fee',
    REFUND_FEE: 'refund_fee',
    ACCOUNT_FEE: 'account_fee',
    PAYMENT_METHOD_FEE: 'payment_method_fee',
    TILLED_FEE: 'tilled_fee'
} as const;

export type BalanceTransactionType = typeof BalanceTransactionType[keyof typeof BalanceTransactionType];
export const BalanceTransactionFeeSubtype = {
    APPROVED_VERIFICATION: 'approved_verification',
    DECLINED_VERIFICATION: 'declined_verification',
    APPROVED_AUTHORIZATION: 'approved_authorization',
    DECLINED_AUTHORIZATION: 'declined_authorization',
    REVERSED_AUTHORIZATION: 'reversed_authorization',
    COMPLETED_CREDIT: 'completed_credit',
    DECLINED_CREDIT: 'declined_credit',
    COMPLETED_SETTLEMENT: 'completed_settlement',
    DECLINED_SETTLEMENT: 'declined_settlement',
    APPROVED_PURCHASE_RETURN_AUTHORIZATION: 'approved_purchase_return_authorization',
    DECLINED_PURCHASE_RETURN_AUTHORIZATION: 'declined_purchase_return_authorization',
    TRANSACTION: 'transaction',
    ACQUIRER_PROCESSING: 'acquirer_processing',
    AMEX_CARD_NOT_PRESENT: 'amex_card_not_present',
    AMEX_DUES_AND_ASSESSMENTS: 'amex_dues_and_assessments',
    AMEX_INBOUND: 'amex_inbound',
    AMEX_INTERNATIONAL_ASSESSMENT: 'amex_international_assessment',
    DISCOVER_ASSESSMENT: 'discover_assessment',
    DISCOVER_DATA_USAGE: 'discover_data_usage',
    DUES_AND_ASSESSMENTS: 'dues_and_assessments',
    FIXED_ACQUIRER_NETWORK: 'fixed_acquirer_network',
    INTERLINK_SWITCH: 'interlink_switch',
    INTERLINK_PIN_AUTHENTICATED: 'interlink_pin_authenticated',
    INTERLINK_REGULATED: 'interlink_regulated',
    MAESTRO_REGULATED: 'maestro_regulated',
    MAESTRO_STANDARD: 'maestro_standard',
    MAESTRO_SWITCH: 'maestro_switch',
    MASTERCARD_ACQUIRER_BRAND_VOLUME: 'mastercard_acquirer_brand_volume',
    MASTERCARD_ACQUIRER_MERCHANT_ADVICE_CODE: 'mastercard_acquirer_merchant_advice_code',
    MASTERCARD_ACQUIRER_PROGRAM_SUPPORT: 'mastercard_acquirer_program_support',
    MASTERCARD_ANNUAL_LOCATION: 'mastercard_annual_location',
    MASTERCARD_ASSESSMENT: 'mastercard_assessment',
    MASTERCARD_ASSESSMENT_1000_PLUS: 'mastercard_assessment_1000_plus',
    MASTERCARD_AUTHORIZATION: 'mastercard_authorization',
    MASTERCARD_CROSS_BORDER_SCHEME: 'mastercard_cross_border_scheme',
    MASTERCARD_DIGITAL_COMMERCE_DEVELOPMENT: 'mastercard_digital_commerce_development',
    MASTERCARD_DIGITAL_ENABLEMENT: 'mastercard_digital_enablement',
    MASTERCARD_DIGITAL_ENABLEMENT_MAX: 'mastercard_digital_enablement_max',
    MASTERCARD_FINAL_AUTHORIZATION: 'mastercard_final_authorization',
    MASTERCARD_FINAL_AUTHORIZATION_MIN: 'mastercard_final_authorization_min',
    MASTERCARD_INTERNATIONAL_ASSESSMENT: 'mastercard_international_assessment',
    MASTERCARD_NOMINAL_AMOUNT_AUTHORIZATION: 'mastercard_nominal_amount_authorization',
    MASTERCARD_PROCESSING_INTEGRITY: 'mastercard_processing_integrity',
    MASTERCARD_SAFETY_NET_ACQUIRER: 'mastercard_safety_net_acquirer',
    MISUSE_OF_AUTHORIZATION: 'misuse_of_authorization',
    NABU: 'nabu',
    NETWORK_DEBIT: 'network_debit',
    TRANSACTION_INTEGRITY: 'transaction_integrity',
    VISA_ACQUIRER_CREDIT_VOUCHER_INTERNATIONAL: 'visa_acquirer_credit_voucher_international',
    VISA_ASSESSMENT: 'visa_assessment',
    VISA_BASE_II_TRANSMISSION: 'visa_base_ii_transmission',
    VISA_CA_CARD_VERIFICATION: 'visa_ca_card_verification',
    VISA_COMMERCIAL_SOLUTION: 'visa_commercial_solution',
    VISA_DEBIT_ASSESSMENT: 'visa_debit_assessment',
    VISA_INTERNATIONAL_ASSESSMENT: 'visa_international_assessment',
    VISA_MISUSE_OF_AUTHORIZATION: 'visa_misuse_of_authorization',
    VISA_US_ACQUIRER_SERVICE_CREDIT: 'visa_us_acquirer_service_credit',
    VISA_US_ACQUIRER_SERVICE_DEBIT: 'visa_us_acquirer_service_debit',
    VISA_US_DIGITAL_COMMERCE: 'visa_us_digital_commerce',
    REVERSAL: 'reversal',
    DISCOUNT: 'discount',
    ACCOUNT_SETUP: 'account_setup',
    ACH_RETURN: 'ach_return',
    MONTHLY_ACCOUNT: 'monthly_account',
    MONTHLY_MINIMUM_PROCESSING: 'monthly_minimum_processing',
    CARD_ACCOUNT_UPDATE: 'card_account_update',
    MONTHLY_TERMINAL: 'monthly_terminal',
    RETRIEVAL: 'retrieval',
    APPLE_PAY_BALANCE_TRANSFER: 'apple_pay_balance_transfer',
    CHARGEBACK: 'chargeback',
    GOODS_AND_SERVICES: 'goods_and_services',
    HARMONIZED_SALES: 'harmonized_sales'
} as const;

export type BalanceTransactionFeeSubtype = typeof BalanceTransactionFeeSubtype[keyof typeof BalanceTransactionFeeSubtype];
export const BalanceTransactionFeeType = {
    DISCOUNT: 'discount',
    TRANSACTION: 'transaction',
    INTERCHANGE: 'interchange',
    PASS_THROUGH: 'pass_through',
    PLATFORM: 'platform',
    CHARGEBACK: 'chargeback',
    ADMINISTRATIVE: 'administrative',
    TAX: 'tax',
    NEGATIVE_ROUNDING_ADJUSTMENT: 'negative_rounding_adjustment',
    POSITIVE_ROUNDING_ADJUSTMENT: 'positive_rounding_adjustment',
    UNKNOWN: 'unknown'
} as const;

export type BalanceTransactionFeeType = typeof BalanceTransactionFeeType[keyof typeof BalanceTransactionFeeType];


