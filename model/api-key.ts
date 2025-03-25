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
 * @interface ApiKey
 */
export interface ApiKey {
    /**
     * The id of the associated account.
     * @type {string}
     * @memberof ApiKey
     */
    'account_id': string;
    /**
     * Time at which the object was created.
     * @type {string}
     * @memberof ApiKey
     */
    'created_at': string;
    /**
     * Unique identifier for the object.
     * @type {string}
     * @memberof ApiKey
     */
    'id': string;
    /**
     * The string that you assign to describe the resource. It defaults to \'`type` Key\' (e.g. \'Secret Key\' and \'Publishable Key\')
     * @type {string}
     * @memberof ApiKey
     */
    'name': string;
    /**
     * The list of scopes to define the access for this key. You may specify `[\'*\']` to enable all scopes, except those that require explicit selection.
     * @type {Array<string>}
     * @memberof ApiKey
     */
    'scopes': Array<ApiKeyScopes>;
    /**
     * The type of API key.  `secret` can be used to authenticate all endpoints. `publishable` is used in your frontend application and can only access a handful of endpoints (e.g. confirm a Payment Intent).
     * @type {string}
     * @memberof ApiKey
     */
    'type': ApiKeyType;
    /**
     * Time at which the object was last updated.
     * @type {string}
     * @memberof ApiKey
     */
    'updated_at': string;
    /**
     * The actual value of the API key to be included in the `tilled-api-key` header for authentication. `secret` keys will have a redacted value except when initially created.
     * @type {string}
     * @memberof ApiKey
     */
    'value': string;
    /**
     * Time at which the key was last used to authenticate with the API.
     * @type {string}
     * @memberof ApiKey
     */
    'last_used'?: string;
}

export const ApiKeyScopes = {
    STAR: '*',
    ACCOUNTSDELETE: 'accounts:delete',
    ACCOUNTSREAD: 'accounts:read',
    ACCOUNTSWRITE: 'accounts:write',
    API_KEYSREAD: 'api_keys:read',
    API_KEYSWRITE: 'api_keys:write',
    APPLE_PAY_DOMAINSREAD: 'apple_pay_domains:read',
    APPLE_PAY_DOMAINSWRITE: 'apple_pay_domains:write',
    AUTH_LINKSREAD: 'auth_links:read',
    AUTH_LINKSWRITE: 'auth_links:write',
    BALANCE_TRANSACTIONSREAD: 'balance_transactions:read',
    BANK_ACCOUNTSREAD: 'bank_accounts:read',
    BANK_ACCOUNTSWRITE: 'bank_accounts:write',
    CHARGESREAD: 'charges:read',
    CHECKOUT_SESSIONSREAD: 'checkout_sessions:read',
    CHECKOUT_SESSIONSWRITE: 'checkout_sessions:write',
    CUSTOMERSREAD: 'customers:read',
    CUSTOMERSWRITE: 'customers:write',
    DISPUTESREAD: 'disputes:read',
    DISPUTESWRITE: 'disputes:write',
    EVENTSREAD: 'events:read',
    FILESREAD: 'files:read',
    FILESWRITE: 'files:write',
    ONBOARDINGREAD: 'onboarding:read',
    ONBOARDINGWRITE: 'onboarding:write',
    OUTBOUND_TRANSFERSREAD: 'outbound_transfers:read',
    OUTBOUND_TRANSFERSWRITE: 'outbound_transfers:write',
    PAYMENT_INTENTSREAD: 'payment_intents:read',
    PAYMENT_INTENTSWRITE: 'payment_intents:write',
    PAYMENT_METHODSREAD: 'payment_methods:read',
    PAYMENT_METHODSWRITE: 'payment_methods:write',
    PAYOUTSREAD: 'payouts:read',
    PAYOUTSWRITE: 'payouts:write',
    PLATFORM_FEESREAD: 'platform_fees:read',
    PRICING_TEMPLATESREAD: 'pricing_templates:read',
    PRICING_TEMPLATESWRITE: 'pricing_templates:write',
    PRODUCT_CODESREAD: 'product_codes:read',
    REFUNDSREAD: 'refunds:read',
    REFUNDSWRITE: 'refunds:write',
    REPORT_RUNSREAD: 'report_runs:read',
    REPORT_RUNSWRITE: 'report_runs:write',
    REQUEST_LOGSREAD: 'request_logs:read',
    STATEMENTSREAD: 'statements:read',
    SUBSCRIPTIONSREAD: 'subscriptions:read',
    SUBSCRIPTIONSWRITE: 'subscriptions:write',
    TERMINAL_READERSREAD: 'terminal_readers:read',
    TERMINAL_READERSWRITE: 'terminal_readers:write',
    USER_INVITATIONSREAD: 'user_invitations:read',
    USER_INVITATIONSWRITE: 'user_invitations:write',
    USERSREAD: 'users:read',
    USERSWRITE: 'users:write',
    WEBHOOK_ENDPOINTSREAD: 'webhook_endpoints:read',
    WEBHOOK_ENDPOINTSWRITE: 'webhook_endpoints:write'
} as const;

export type ApiKeyScopes = typeof ApiKeyScopes[keyof typeof ApiKeyScopes];
export const ApiKeyType = {
    PUBLISHABLE: 'publishable',
    SECRET: 'secret'
} as const;

export type ApiKeyType = typeof ApiKeyType[keyof typeof ApiKeyType];


