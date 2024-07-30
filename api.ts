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

export * from './api/apikeys-api';
export * from './api/accounts-api';
export * from './api/apple-pay-domains-api';
export * from './api/auth-links-api';
export * from './api/balance-transactions-api';
export * from './api/charges-api';
export * from './api/checkout-sessions-api';
export * from './api/customers-api';
export * from './api/disputes-api';
export * from './api/documents-api';
export * from './api/events-api';
export * from './api/files-api';
export * from './api/health-api';
export * from './api/onboarding-api';
export * from './api/outbound-transfers-api';
export * from './api/payment-intents-api';
export * from './api/payment-methods-api';
export * from './api/payouts-api';
export * from './api/platform-fee-refunds-api';
export * from './api/platform-fees-api';
export * from './api/pricing-templates-api';
export * from './api/product-codes-api';
export * from './api/refunds-api';
export * from './api/report-runs-api';
export * from './api/subscriptions-api';
export * from './api/terminal-readers-api';
export * from './api/users-api';
export * from './api/webhook-endpoints-api';
