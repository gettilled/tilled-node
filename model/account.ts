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
import type { AccountCapability } from './account-capability';
// May contain unused imports in some cases
// @ts-ignore
import type { AccountDocument } from './account-document';
// May contain unused imports in some cases
// @ts-ignore
import type { AccountSettings } from './account-settings';
// May contain unused imports in some cases
// @ts-ignore
import type { BankAccount } from './bank-account';
// May contain unused imports in some cases
// @ts-ignore
import type { BusinessProfile } from './business-profile';
// May contain unused imports in some cases
// @ts-ignore
import type { TerminalReader } from './terminal-reader';

/**
 * 
 * @export
 * @interface Account
 */
export interface Account {
    /**
     * Bank accounts attached to this account. Primarily used for payouts.
     * @type {Array<BankAccount>}
     * @memberof Account
     */
    'bank_accounts': Array<BankAccount>;
    /**
     * Time at which the object was created.
     * @type {string}
     * @memberof Account
     */
    'created_at': string;
    /**
     * Documents that have been requested for an account, which are either in the `requested` or `submitted` status
     * @type {Array<AccountDocument>}
     * @memberof Account
     */
    'document_requests': Array<AccountDocument>;
    /**
     * Unique identifier for the object.
     * @type {string}
     * @memberof Account
     */
    'id': string;
    /**
     * Terminal Readers attached to this account.
     * @type {Array<TerminalReader>}
     * @memberof Account
     */
    'terminal_readers': Array<TerminalReader>;
    /**
     * The Tilled account type. Can be `partner` or `merchant`.
     * @type {string}
     * @memberof Account
     */
    'type': AccountType;
    /**
     * Time at which the object was last updated.
     * @type {string}
     * @memberof Account
     */
    'updated_at': string;
    /**
     * The Business Profile for this account.
     * @type {BusinessProfile}
     * @memberof Account
     */
    'business_profile'?: BusinessProfile;
    /**
     * Capabilities represent the assigned product codes to a given merchant account and their status.
     * @type {Array<AccountCapability>}
     * @memberof Account
     */
    'capabilities'?: Array<AccountCapability>;
    /**
     * The primary user\'s email address.
     * @type {string}
     * @memberof Account
     */
    'email'?: string;
    /**
     * Whether Tilled is providing support for this account.
     * @type {boolean}
     * @memberof Account
     * @deprecated
     */
    'merchant_support'?: boolean;
    /**
     * Set of [key-value pairs](#section/Metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
     * @type {{ [key: string]: string; }}
     * @memberof Account
     */
    'metadata'?: { [key: string]: string; };
    /**
     * The business name or individual name.
     * @type {string}
     * @memberof Account
     */
    'name'?: string;
    /**
     * The account settings object.
     * @type {AccountSettings}
     * @memberof Account
     */
    'settings'?: AccountSettings;
    /**
     * The status of the account. Only available for merchant accounts.
     * @type {string}
     * @memberof Account
     */
    'status'?: AccountStatus;
    /**
     * The `partner` white label domain.
     * @type {string}
     * @memberof Account
     */
    'white_label_domain'?: string;
}

export const AccountType = {
    PARTNER: 'partner',
    MERCHANT: 'merchant',
    RESELLER: 'reseller'
} as const;

export type AccountType = typeof AccountType[keyof typeof AccountType];
export const AccountStatus = {
    ACTIVE: 'active',
    REQUIRES_PRICING: 'requires_pricing',
    FUNDING_HOLD: 'funding_hold',
    ACCOUNT_REVIEW: 'account_review',
    PARTIALLY_ACTIVE: 'partially_active',
    ACTION_REQUIRED: 'action_required',
    CREATED: 'created',
    STARTED: 'started',
    DISABLED: 'disabled',
    REJECTED: 'rejected',
    WITHDRAWN: 'withdrawn'
} as const;

export type AccountStatus = typeof AccountStatus[keyof typeof AccountStatus];


