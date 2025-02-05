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
import type { AccountSettingsCreateParams } from './account-settings-create-params';
// May contain unused imports in some cases
// @ts-ignore
import type { BankAccountCreateParams } from './bank-account-create-params';

/**
 * 
 * @export
 * @interface AccountUpdateParams
 */
export interface AccountUpdateParams {
    /**
     * A bank account to attach to this account for receiving payouts. (Note: currently this is only used for `partner` account payouts)  By default, providing a bank account sets it as the new default bank account for its currency.
     * @type {BankAccountCreateParams}
     * @memberof AccountUpdateParams
     */
    'bank_account'?: BankAccountCreateParams;
    /**
     * The primary user\'s email address.
     * @type {string}
     * @memberof AccountUpdateParams
     */
    'email'?: string;
    /**
     * Set of [key-value pairs](#section/Metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value (i.e. `\'\'` or `null`) to them. All keys can be unset by posting an empty value (i.e. `{}` or `null`) to `metadata`.
     * @type {{ [key: string]: string; }}
     * @memberof AccountUpdateParams
     */
    'metadata'?: { [key: string]: string; };
    /**
     * The business name or individual name.
     * @type {string}
     * @memberof AccountUpdateParams
     */
    'name'?: string;
    /**
     * Account Settings
     * @type {AccountSettingsCreateParams}
     * @memberof AccountUpdateParams
     */
    'settings'?: AccountSettingsCreateParams;
    /**
     * The custom domain the `partner` chooses to reflect on all of its `merchant` accounts as part of the white label settings. It requires `paymentsonline.io` to be appended to the string to be accepted as a valid URL (i.e. `https://customdomain.paymentsonline.io`).  *Note: This feature is only available to `Partner` accounts.*
     * @type {string}
     * @memberof AccountUpdateParams
     */
    'white_label_domain'?: string;
}

