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
 * @interface UserInvitation
 */
export interface UserInvitation {
    /**
     * The ID of the Account associated with this pending user.
     * @type {string}
     * @memberof UserInvitation
     */
    'account_id': string;
    /**
     * Time at which the object was created.
     * @type {string}
     * @memberof UserInvitation
     */
    'created_at': string;
    /**
     * The pending user\'s email.
     * @type {string}
     * @memberof UserInvitation
     */
    'email': string;
    /**
     * Time at which the object will expire.
     * @type {string}
     * @memberof UserInvitation
     */
    'expires_at': string;
    /**
     * Unique identifier for the object.
     * @type {string}
     * @memberof UserInvitation
     */
    'id': string;
    /**
     * The pending user\'s role, primarily used in the Tilled Dashboard. The roles have varied restrictions on the actions they can take.
     * @type {string}
     * @memberof UserInvitation
     */
    'role': UserInvitationRole;
    /**
     * Time at which the object was last updated.
     * @type {string}
     * @memberof UserInvitation
     */
    'updated_at': string;
    /**
     * Frontend link for the user invitation.
     * @type {string}
     * @memberof UserInvitation
     */
    'invitation_url'?: string;
    /**
     * The ID of the user who sent the invitation.
     * @type {string}
     * @memberof UserInvitation
     */
    'inviter_user_id'?: string;
    /**
     * Time at which the invitation was last sent.
     * @type {string}
     * @memberof UserInvitation
     */
    'sent_at'?: string;
}

export const UserInvitationRole = {
    OWNER: 'owner',
    ADMIN: 'admin',
    DEVELOPER: 'developer',
    ANALYST: 'analyst',
    VIEW_ONLY: 'view_only',
    MERCHANT_OWNER: 'merchant_owner',
    MERCHANT_ADMIN: 'merchant_admin',
    RESELLER_OWNER: 'reseller_owner',
    RESELLER_ADMIN: 'reseller_admin',
    RESELLER_VIEW_ONLY: 'reseller_view_only'
} as const;

export type UserInvitationRole = typeof UserInvitationRole[keyof typeof UserInvitationRole];


