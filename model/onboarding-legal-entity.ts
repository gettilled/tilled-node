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
import type { BLEBankAccount } from './blebank-account';
// May contain unused imports in some cases
// @ts-ignore
import type { CardCheckoutMethodBreakdown } from './card-checkout-method-breakdown';
// May contain unused imports in some cases
// @ts-ignore
import type { CharityDocumentData } from './charity-document-data';
// May contain unused imports in some cases
// @ts-ignore
import type { OnboardingAddress } from './onboarding-address';
// May contain unused imports in some cases
// @ts-ignore
import type { PatriotActDetails } from './patriot-act-details';
// May contain unused imports in some cases
// @ts-ignore
import type { PrincipalCreateParams } from './principal-create-params';
// May contain unused imports in some cases
// @ts-ignore
import type { ProcessingVolume } from './processing-volume';

/**
 * 
 * @export
 * @interface OnboardingLegalEntity
 */
export interface OnboardingLegalEntity {
    /**
     * Registered legal address of the business.
     * @type {OnboardingAddress}
     * @memberof OnboardingLegalEntity
     */
    'address': OnboardingAddress;
    /**
     * Banking details for the business\'s payouts.
     * @type {BLEBankAccount}
     * @memberof OnboardingLegalEntity
     */
    'bank_account': BLEBankAccount;
    /**
     * The method by which the business accepts card payments. The total value of all the methods must equal 100.
     * @type {CardCheckoutMethodBreakdown}
     * @memberof OnboardingLegalEntity
     */
    'card_checkout_method_breakdown': CardCheckoutMethodBreakdown;
    /**
     * The document data for the charity document. Required if the `mcc` is `8398`.
     * @type {CharityDocumentData}
     * @memberof OnboardingLegalEntity
     */
    'charity_document': CharityDocumentData;
    /**
     * The date when the business was incorporated in YYY-MM-DD format.
     * @type {string}
     * @memberof OnboardingLegalEntity
     */
    'date_of_incorporation': string;
    /**
     * Whether or not the business is a is a registered 501(c)(3) organization. If true, a copy of the 501(c)(3) letter must be uploaded. Only required if the `mcc` is `8398` or `8661`.
     * @type {boolean}
     * @memberof OnboardingLegalEntity
     */
    'is_501c3': boolean;
    /**
     * Registered legal business name (e.g. \"ACME Corporation\").
     * @type {string}
     * @memberof OnboardingLegalEntity
     */
    'legal_name': string;
    /**
     * The 4-digit merchant category code for the business. MCCs are used to classify businesses based on the goods or services they provide. For more information see the description [here](https://docs.tilled.com/api-reference#tag/onboarding/GET/v1/onboarding/mcc)
     * @type {string}
     * @memberof OnboardingLegalEntity
     */
    'mcc': OnboardingLegalEntityMcc;
    /**
     * Percentage of business-to-business (B2B) that the business conducts
     * @type {number}
     * @memberof OnboardingLegalEntity
     */
    'percent_business_to_business': number;
    /**
     * Array of Principals (ie Business Owners).
     * @type {Array<PrincipalCreateParams>}
     * @memberof OnboardingLegalEntity
     */
    'principals': Array<PrincipalCreateParams>;
    /**
     * An estimate of the processing volume of the business.
     * @type {ProcessingVolume}
     * @memberof OnboardingLegalEntity
     */
    'processing_volume': ProcessingVolume;
    /**
     * Description of the product sold by, or service provided by, the business.
     * @type {string}
     * @memberof OnboardingLegalEntity
     */
    'product_description': string;
    /**
     * Region for the merchant account
     * @type {string}
     * @memberof OnboardingLegalEntity
     */
    'region': OnboardingLegalEntityRegion;
    /**
     * Provides information about a payment that customers see on their statements. Concatenated with the prefix (shortened descriptor) or statement descriptor that’s set on the account to form the complete statement descriptor. Maximum 20 characters for the concatenated descriptor.
     * @type {string}
     * @memberof OnboardingLegalEntity
     */
    'statement_descriptor': string;
    /**
     * The category identifying the legal structure of the legal entity.
     * @type {string}
     * @memberof OnboardingLegalEntity
     */
    'structure': OnboardingLegalEntityStructure;
    /**
     * Customer support phone number of the business. Cannot contain special characters.
     * @type {string}
     * @memberof OnboardingLegalEntity
     */
    'support_phone': string;
    /**
     * The company\'s tax ID number (TIN)
     * @type {string}
     * @memberof OnboardingLegalEntity
     */
    'tax_id_number': string;
    /**
     * Required for TSYS merchants. The number of days billed prior to goods being shipped.
     * @type {number}
     * @memberof OnboardingLegalEntity
     */
    'days_billed_prior_to_shipment'?: number;
    /**
     * The merchant\'s trade name or Doing Business As Name (e.g. \"ACME\"), if different from the `legal_name`.
     * @type {string}
     * @memberof OnboardingLegalEntity
     */
    'dba_name'?: string;
    /**
     * Required if the merchant has processed credit cards before. If left blank, that indicates that the merchant did not process cards before.
     * @type {string}
     * @memberof OnboardingLegalEntity
     */
    'existing_processor_name'?: string;
    /**
     * Estimation of the number of terminal readers the business will need to order. Default is 1 for card-present merchants.
     * @type {number}
     * @memberof OnboardingLegalEntity
     */
    'number_of_terminals'?: number;
    /**
     * Information required by the Patriot Act. For TSYS applications, either the business license OR the articles of incorporation (AOI) details are required, not both.
     * @type {PatriotActDetails}
     * @memberof OnboardingLegalEntity
     */
    'patriot_act_details'?: PatriotActDetails;
    /**
     * Publicly available email address for sending support issues to.
     * @type {string}
     * @memberof OnboardingLegalEntity
     */
    'support_email'?: string;
    /**
     * The business\'s publicly available website.
     * @type {string}
     * @memberof OnboardingLegalEntity
     */
    'website'?: string;
}

export const OnboardingLegalEntityMcc = {
    _0742: '0742',
    _0780: '0780',
    _1520: '1520',
    _1711: '1711',
    _1731: '1731',
    _1740: '1740',
    _1750: '1750',
    _1761: '1761',
    _1771: '1771',
    _1799: '1799',
    _4119: '4119',
    _4121: '4121',
    _4214: '4214',
    _4816: '4816',
    _4900: '4900',
    _5044: '5044',
    _5399: '5399',
    _5411: '5411',
    _5499: '5499',
    _5811: '5811',
    _5812: '5812',
    _5814: '5814',
    _5965: '5965',
    _5970: '5970',
    _6513: '6513',
    _7230: '7230',
    _7299: '7299',
    _7349: '7349',
    _7372: '7372',
    _7379: '7379',
    _7392: '7392',
    _7523: '7523',
    _7542: '7542',
    _7699: '7699',
    _7922: '7922',
    _7999: '7999',
    _8011: '8011',
    _8021: '8021',
    _8031: '8031',
    _8041: '8041',
    _8042: '8042',
    _8043: '8043',
    _8049: '8049',
    _8050: '8050',
    _8099: '8099',
    _8111: '8111',
    _8211: '8211',
    _8220: '8220',
    _8249: '8249',
    _8299: '8299',
    _8351: '8351',
    _8398: '8398',
    _8661: '8661',
    _8699: '8699',
    _8931: '8931',
    _8999: '8999'
} as const;

export type OnboardingLegalEntityMcc = typeof OnboardingLegalEntityMcc[keyof typeof OnboardingLegalEntityMcc];
export const OnboardingLegalEntityRegion = {
    US: 'US',
    CA: 'CA'
} as const;

export type OnboardingLegalEntityRegion = typeof OnboardingLegalEntityRegion[keyof typeof OnboardingLegalEntityRegion];
export const OnboardingLegalEntityStructure = {
    CHARITY: 'charity',
    COMMUNITY_INTEREST_COMPANY: 'community_interest_company',
    CORPORATION: 'corporation',
    GOVERNMENT: 'government',
    LIMITED: 'limited',
    LIMITED_LIABILITY_COMPANY: 'limited_liability_company',
    LIMITED_LIABILITY_PARTNERSHIP: 'limited_liability_partnership',
    NON_PROFIT: 'non_profit',
    PARTNERSHIP: 'partnership',
    PUBLIC_LIMITED_COMPANY: 'public_limited_company',
    SOLE_PROPRIETORSHIP: 'sole_proprietorship',
    TRUST: 'trust'
} as const;

export type OnboardingLegalEntityStructure = typeof OnboardingLegalEntityStructure[keyof typeof OnboardingLegalEntityStructure];


