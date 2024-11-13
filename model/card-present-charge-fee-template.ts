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
import type { Markup } from './markup';

/**
 * 
 * @export
 * @interface CardPresentChargeFeeTemplate
 */
export interface CardPresentChargeFeeTemplate {
    /**
     * The amount of the fee applied per chargeback, in currency minor units.
     * @type {number}
     * @memberof CardPresentChargeFeeTemplate
     */
    'chargeback_fee': number;
    /**
     * The list of additional markups applied to a given card type.
     * @type {Array<Markup>}
     * @memberof CardPresentChargeFeeTemplate
     */
    'markups': Array<Markup>;
    /**
     * The amount of the fee applied per retrieval, in currency minor units.
     * @type {number}
     * @memberof CardPresentChargeFeeTemplate
     */
    'retrieval_fee': number;
    /**
     * The amount of the fee applied per reversal, in currency minor units.
     * @type {number}
     * @memberof CardPresentChargeFeeTemplate
     */
    'reversal_fee': number;
    /**
     * The amount of the transaction fee applied to each transaction, in currency minor units.
     * @type {number}
     * @memberof CardPresentChargeFeeTemplate
     */
    'transaction_fee': number;
    /**
     * The type of transaction fee this pricing template applies.
     * @type {string}
     * @memberof CardPresentChargeFeeTemplate
     */
    'transaction_fee_type': CardPresentChargeFeeTemplateTransactionFeeType;
    /**
     * The amount of the fee applied when the merchant bank account information is updated, in currency minor units.
     * @type {number}
     * @memberof CardPresentChargeFeeTemplate
     */
    'bank_account_change_fee'?: number;
    /**
     * The amount of the monthly fee applied per terminal, in currency minor units.
     * @type {number}
     * @memberof CardPresentChargeFeeTemplate
     */
    'monthly_terminal_fee'?: number;
}

export const CardPresentChargeFeeTemplateTransactionFeeType = {
    FLAT_RATE: 'flat_rate',
    INTERCHANGE: 'interchange'
} as const;

export type CardPresentChargeFeeTemplateTransactionFeeType = typeof CardPresentChargeFeeTemplateTransactionFeeType[keyof typeof CardPresentChargeFeeTemplateTransactionFeeType];


