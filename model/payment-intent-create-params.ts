/* tslint:disable */
/* eslint-disable */
/**
 * Tilled API
 * The Tilled API is organized around [REST](http://en.wikipedia.org/wiki/Representational_State_Transfer). Our API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.  You can use the Tilled API in test mode, which does not affect your live data or interact with the banking networks. The API key you use to authenticate the request determines whether the request is live mode or test mode. Before your account is activated you will only be able to interact with test mode.  Authentication uses a standard web token schema.  **Notice**: The Tilled API treats HTTP status `401` to mean `Unauthenticated` and not the HTTP standard name of `Unauthorized`. Requests made for materials the requester does not have permission to access, the API will respond with `403: Forbidden`.  # Authentication  The tilled API uses API keys to authenticate requests. You can view and manage your API keys in the Tilled Dashboard.  Test mode secret keys have the prefix sk*test* and live mode secret keys have the prefix sk*live*. Alternatively, you can use restricted API keys for granular permissions.  Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.  Authentication to the API is performed via custom HTTP Header `tilled-api-key`. Provide your API key as the value.  All API requests must be made over HTTPS. Calls made over plain HTTP will fail. API requests without authentication will also fail.  <!-- ReDoc-Inject: <security-definitions> -->  # Errors  Tilled uses conventional HTTP response codes to indicate the success or failure of an API request. In general: Codes in the `2xx` range indicate success. Codes in the `4xx` range indicate an error that failed given the information provided (e.g., a required parameter was omitted, a charge failed, etc.). Codes in the `5xx` range indicate an error with Tilled\'s servers (these are rare).  Some `4xx` errors that could be handled programmatically (e.g., a card is declined) include an error code that briefly explains the error reported.  # Request IDs  Each API request has an associated request identifier. You can find this value in the response headers, under `request-id`. If you need to contact us about a specific request, providing the request identifier will ensure the fastest possible resolution.  # Metadata  Updatable Tilled objects—including [Account](#tag/Accounts), [Customer](#tag/Customers), [PaymentIntent](#tag/PaymentIntents), [Refund](#tag/Refunds), and [Subscription](#tag/Subscriptions)—have a `metadata` parameter. You can use this parameter to attach key-value data to these Tilled objects.  You can specify up to 50 keys, with key names up to 40 characters long and values up to 500 characters long.  Metadata is useful for storing additional, structured information on an object. As an example, you could store your user\'s full name and corresponding unique identifier from your system on a Tilled [Customer](#tag/Customers) object. Metadata is not used by Tilled—for example, not used to authorize or decline a charge—and won\'t be seen by your users unless you choose to show it to them. Do not store any sensitive information (bank account numbers, card details, etc.) as metadata.  # Apple Pay  Tilled supports Apple Pay through the Tilled.js [`PaymentRequest`](https://docs.tilled.com/tilledjs/#paymentrequest-ie-apple-pay) object.  In order to start accepting payments with Apple Pay, you will first need to validate the domains you plan to host the Apple Pay Button on by:  - Hosting Tilled\'s Apple Domain Verification File on the domain - Use the Tilled API to register the domain  ## Domain Verification File  Domains hosting an Apple Pay Button must be secured with HTTPS (TLS 1.2 or later) and have a valid SSL certificate.  Before [registering your domain](#operation/CreateApplePayDomain) with the Tilled API, you need to host Tilled\'s [Apple Domain Verification File](https://api.tilled.com/apple-developer-merchantid-domain-association) on the domain at the path: `/.well-known/apple-developer-merchantid-domain-association`  # Tilled.js  Tilled.js is the easiest way to get started collecting payments. It allows you to embed a payments form in your application and stores credit card information securely on remote servers instead of passing through your network. View the documentation [here](https://docs.tilled.com/tilledjs/).  # Webhooks  ## Receive event notifications with webhooks  Listen for events on your Tilled account so your integration can automatically trigger reactions.  Tilled uses webhooks to notify your application when an event happens in your account. Webhooks are particularly useful for asynchronous events like when a customer’s bank confirms a payment, a customer disputes a charge, or a recurring payment succeeds.  Begin using webhooks with your Tilled integration in just a couple steps:  - Create a webhook endpoint on your server. - Register the endpoint with Tilled to go live.  Not all Tilled integrations require webhooks. Keep reading to learn more about what webhooks are and when you should use them.  ### What are webhooks  _Webhooks_ refers to a combination of elements that collectively create a notification and reaction system within a larger integration.  Metaphorically, webhooks are like a phone number that Tilled calls to notify you of activity in your Tilled account. The activity could be the creation of a new customer or the payout of funds to your bank account. The webhook endpoint is the person answering that call who takes actions based upon the specific information it receives.  Non-metaphorically, the webhook endpoint is just more code on your server, which could be written in Ruby, PHP, Node.js, or whatever. The webhook endpoint has an associated URL (e.g., https://example.com/webhooks). The Tilled notifications are Event objects. This Event object contains all the relevant information about what just happened, including the type of event and the data associated with that event. The webhook endpoint uses the event details to take any required actions, such as indicating that an order should be fulfilled.  ### When to use webhooks  Many events that occur within a Tilled account have synchronous results–immediate and direct–to an executed request. For example, a successful request to create a customer immediately returns a Customer object. Such requests don’t require webhooks, as the key information is already available.  Other events that occur within a Tilled account are asynchronous: happening at a later time and not directly in response to your code’s execution. Most commonly these involve:  - The [Payment Intents API](#tag/PaymentIntents)  With these and similar APIs, Tilled needs to notify your integration about changes to the status of an object so your integration can take subsequent steps.  The specific actions your webhook endpoint may take differs based upon the event. Some examples include:  - Updating a customer’s membership record in your database when a subscription payment succeeds - Logging an accounting entry when a transfer is paid - Indicating that an order can be fulfilled (i.e., boxed and shipped)  ## Verifying signatures manually  The `tilled-signature` header included in each signed event contains a timestamp and one or more signatures. The timestamp is prefixed by `t=`, and each signature is prefixed by a `scheme`. Schemes start with `v`, followed by an integer. Currently, the only valid live signature scheme is `v1`.  ``` tilled-signature:t=1614049713663,v1=8981f5902896f479fa9079eec71fca01e9a065c5b59a96b221544023ce994b02 ```  Tilled generates signatures using a hash-based message authentication code ([HMAC](https://en.wikipedia.org/wiki/Hash-based_message_authentication_code)) with [SHA-256](https://en.wikipedia.org/wiki/SHA-2). You should ignore all schemes that are not `v1`.  You can verify the webhook event signature by following these steps.  ### Step 1: Extract the timestamp and signatures from the header  Split the header, using the `,` character as the separator, to get a list of elements. Then split each element, using the `=` character as the separator, to get a prefix and value pair.  The value for the prefix `t` corresponds to the timestamp, and `v1` corresponds to the signature (or signatures). You can discard all other elements.  ### Step 2: Prepare the signed_payload string  The `signed_payload` string is created by concatenating:  - The timestamp (as a string) - The character `.` - The actual JSON payload (i.e., the request body)  ### Step 3: Determine the expected signature  Compute an HMAC with the SHA256 hash function. Use the endpoint’s signing secret as the key, and use the `signed_payload` string as the message.  ### Step 4: Compare the signatures  Compare the signature (or signatures) in the header to the expected signature. For an equality match, compute the difference between the current timestamp and the received timestamp, then decide if the difference is within your tolerance.  To protect against timing attacks, use a constant-time string comparison to compare the expected signature to each of the received signatures. 
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
import { PaymentIntentLevel3 } from './payment-intent-level3';

/**
 * 
 * @export
 * @interface PaymentIntentCreateParams
 */
export interface PaymentIntentCreateParams {
    /**
     * Amount intended to be collected by this PaymentIntent. A positive integer representing how much to charge in the smallest currency unit (e.g., 100 cents to charge $1.00)
     * @type {number}
     * @memberof PaymentIntentCreateParams
     */
    'amount': number;
    /**
     * Three-letter ISO currency code, in lowercase.
     * @type {string}
     * @memberof PaymentIntentCreateParams
     */
    'currency': PaymentIntentCreateParamsCurrency;
    /**
     * The list of payment method types (e.g. card) that this PaymentIntent is allowed to use.
     * @type {Array<string>}
     * @memberof PaymentIntentCreateParams
     */
    'payment_method_types': Array<PaymentIntentCreateParamsPaymentMethodTypes>;
    /**
     * Controls when the funds will be captured from the customer’s account.  `automatic` (Default) Tilled automatically captures funds when the customer authorizes the payment.  `manual` Place a hold on funds when the customer authorizes the payment, but don\'t capture the funds until later.
     * @type {string}
     * @memberof PaymentIntentCreateParams
     */
    'capture_method'?: PaymentIntentCreateParamsCaptureMethod;
    /**
     * Set to \'true\' to attempt to confirm this PaymentIntent immediately. This parameter defaults to `false`.
     * @type {boolean}
     * @memberof PaymentIntentCreateParams
     */
    'confirm'?: boolean;
    /**
     * 
     * @type {PaymentIntentLevel3}
     * @memberof PaymentIntentCreateParams
     */
    'level3'?: PaymentIntentLevel3;
    /**
     * Set of [key-value pairs](#section/Metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value (i.e. `\'\'` or `null`) to them. All keys can be unset by posting an empty value (i.e. `{}` or `null`) to `metadata`.
     * @type {{ [key: string]: string; }}
     * @memberof PaymentIntentCreateParams
     */
    'metadata'?: { [key: string]: string; };
    /**
     * Used to identify authorization requests that use stored credentials to improve authorization rates and reduce fraud.  `consumer_ad_hoc` Ad hoc consumer-initiated request  `merchant_ad_hoc` Unscheduled merchant-initiated request  `merchant_recurring` Scheduled, merchant-initiated recurring request
     * @type {string}
     * @memberof PaymentIntentCreateParams
     */
    'occurrence_type'?: PaymentIntentCreateParamsOccurrenceType;
    /**
     * ID of the PaymentMethod to attach to this PaymentIntent.
     * @type {string}
     * @memberof PaymentIntentCreateParams
     */
    'payment_method_id'?: string;
    /**
     * The amount of the platform fee (if any) that will be requested to be applied to the payment and transferred to the `partner` account. The amount of the fee collected will be capped at the total payment amount.
     * @type {number}
     * @memberof PaymentIntentCreateParams
     */
    'platform_fee_amount'?: number;
    /**
     * Provides information about a payment that customers see on their statements. Concatenated with the prefix (shortened descriptor) or statement descriptor that’s set on the account to form the complete statement descriptor. Maximum 20 characters for the concatenated descriptor.
     * @type {string}
     * @memberof PaymentIntentCreateParams
     */
    'statement_descriptor_suffix'?: string;
}

export const PaymentIntentCreateParamsCurrency = {
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

export type PaymentIntentCreateParamsCurrency = typeof PaymentIntentCreateParamsCurrency[keyof typeof PaymentIntentCreateParamsCurrency];
export const PaymentIntentCreateParamsPaymentMethodTypes = {
    CARD: 'card',
    ACH_DEBIT: 'ach_debit',
    EFT_DEBIT: 'eft_debit',
    CARD_PRESENT: 'card_present'
} as const;

export type PaymentIntentCreateParamsPaymentMethodTypes = typeof PaymentIntentCreateParamsPaymentMethodTypes[keyof typeof PaymentIntentCreateParamsPaymentMethodTypes];
export const PaymentIntentCreateParamsCaptureMethod = {
    AUTOMATIC: 'automatic',
    MANUAL: 'manual'
} as const;

export type PaymentIntentCreateParamsCaptureMethod = typeof PaymentIntentCreateParamsCaptureMethod[keyof typeof PaymentIntentCreateParamsCaptureMethod];
export const PaymentIntentCreateParamsOccurrenceType = {
    CONSUMER_AD_HOC: 'consumer_ad_hoc',
    MERCHANT_AD_HOC: 'merchant_ad_hoc',
    MERCHANT_RECURRING: 'merchant_recurring'
} as const;

export type PaymentIntentCreateParamsOccurrenceType = typeof PaymentIntentCreateParamsOccurrenceType[keyof typeof PaymentIntentCreateParamsOccurrenceType];


