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
 * @interface UserCreateParams
 */
export interface UserCreateParams {
    /**
     * Email address
     * @type {string}
     * @memberof UserCreateParams
     */
    'email': string;
    /**
     * Full name
     * @type {string}
     * @memberof UserCreateParams
     */
    'name': string;
    /**
     * Password. Requires 1 alphabetic and 1 numeric character and a minimum length of 7.
     * @type {string}
     * @memberof UserCreateParams
     */
    'password': string;
    /**
     * The user\'s role, primarily used in the Tilled Dashboard. The roles have varied restrictions on the actions they can take.  `admin` Best for business owners and company administrators.  `developer` Best for developers or people primarily using the Tilled API.  `analyst` Best for people who need full access to Tilled data, but don\'t need to update business settings.  `view_only` Best for people who need to view Tilled data, but don\'t need to make any updates.  `account_manager` Best for people who are responsible for managing existing merchant accounts.
     * @type {string}
     * @memberof UserCreateParams
     */
    'role': UserCreateParamsRole;
}

export const UserCreateParamsRole = {
    OWNER: 'owner',
    ADMIN: 'admin',
    DEVELOPER: 'developer',
    ANALYST: 'analyst',
    VIEW_ONLY: 'view_only',
    ACCOUNT_MANAGER: 'account_manager',
    MERCHANT_OWNER: 'merchant_owner',
    MERCHANT_ADMIN: 'merchant_admin',
    MERCHANT_VIEW_ONLY: 'merchant_view_only',
    RESELLER_OWNER: 'reseller_owner',
    RESELLER_ADMIN: 'reseller_admin',
    RESELLER_VIEW_ONLY: 'reseller_view_only',
    RESELLER_SALES_REP: 'reseller_sales_rep',
    RESELLER_SUPPORT_SPECIALIST: 'reseller_support_specialist',
    RESELLER_INTEGRATION_ANALYST: 'reseller_integration_analyst'
} as const;

export type UserCreateParamsRole = typeof UserCreateParamsRole[keyof typeof UserCreateParamsRole];


