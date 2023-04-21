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

import { RequestFile } from "./models";
import { BalanceTransactionFeeDetail } from "./balanceTransactionFeeDetail";

/**
 * The balance transaction that describes the impact of this refund on your account balance. Note: Multiple balance transactions may be associated with this resource and you can fetch them all with `/balance-transactions?source_id={id}`.
 */
export class PlatformFeeRefundBalanceTransaction {
  /**
   * Time at which the object was last updated.
   */
  "updated_at": Date;
  /**
   * Time at which the object was created.
   */
  "created_at": Date;
  /**
   * Detailed breakdown of the fees paid for this transaction. Note: Fees are now portrayed as individual balance transactions of `type = fee`. Refer to `fee_type` and `fee_subtype` for details.
   */
  "fee_details": Array<BalanceTransactionFeeDetail>;
  /**
   * If the transaction’s net funds are available in the Tilled balance yet. Either `available` or `pending`.
   */
  "status": PlatformFeeRefundBalanceTransaction.Status;
  /**
   * Unique identifier for the object.
   */
  "id": string;
  "account_id": string;
  /**
   * Gross amount of the transaction, in the smallest currency unit (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency). Can be negative for certain transaction types (e.g. `payout`, `refund`).
   */
  "amount": number;
  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase.
   */
  "currency": PlatformFeeRefundBalanceTransaction.Currency;
  /**
   * Fees (in smallest currency unit) paid for this transaction. Note: Fees are now portrayed as individual balance transactions of `type = fee`.
   */
  "fee": number;
  /**
   * Net amount of the transaction, in smallest currency unit. Note: Fees are now portrayed as individual balance transactions of `type = fee`. `net` will no longer differ from `amount`.
   */
  "net": number;
  /**
   * Tilled resource type of `source_id`.
   */
  "source_type": PlatformFeeRefundBalanceTransaction.SourceType;
  /**
   * Tilled id to which this transaction is related
   */
  "source_id": string;
  /**
   * Transaction type.
   */
  "type": PlatformFeeRefundBalanceTransaction.Type;
  /**
   * The date the transaction\'s net funds will become available in the Tilled balance.
   */
  "available_on": Date;
  /**
   * Fee subtype, if this transaction represents a fee (i.e. type = fee).
   */
  "fee_subtype"?: PlatformFeeRefundBalanceTransaction.FeeSubtype;
  /**
   * An arbitrary string attached to the object. Often useful for displaying to users.
   */
  "description"?: string;
  /**
   * Fee type, if this transaction represents a fee (i.e. type = fee).
   */
  "fee_type"?: PlatformFeeRefundBalanceTransaction.FeeType;
  /**
   * The id of the Payout, if any, associated with this balance transaction.
   */
  "payout_id"?: string;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{
    name: string;
    baseName: string;
    type: string;
  }> = [
    {
      name: "updated_at",
      baseName: "updated_at",
      type: "Date",
    },
    {
      name: "created_at",
      baseName: "created_at",
      type: "Date",
    },
    {
      name: "fee_details",
      baseName: "fee_details",
      type: "Array<BalanceTransactionFeeDetail>",
    },
    {
      name: "status",
      baseName: "status",
      type: "PlatformFeeRefundBalanceTransaction.Status",
    },
    {
      name: "id",
      baseName: "id",
      type: "string",
    },
    {
      name: "account_id",
      baseName: "account_id",
      type: "string",
    },
    {
      name: "amount",
      baseName: "amount",
      type: "number",
    },
    {
      name: "currency",
      baseName: "currency",
      type: "PlatformFeeRefundBalanceTransaction.Currency",
    },
    {
      name: "fee",
      baseName: "fee",
      type: "number",
    },
    {
      name: "net",
      baseName: "net",
      type: "number",
    },
    {
      name: "source_type",
      baseName: "source_type",
      type: "PlatformFeeRefundBalanceTransaction.SourceType",
    },
    {
      name: "source_id",
      baseName: "source_id",
      type: "string",
    },
    {
      name: "type",
      baseName: "type",
      type: "PlatformFeeRefundBalanceTransaction.Type",
    },
    {
      name: "available_on",
      baseName: "available_on",
      type: "Date",
    },
    {
      name: "fee_subtype",
      baseName: "fee_subtype",
      type: "PlatformFeeRefundBalanceTransaction.FeeSubtype",
    },
    {
      name: "description",
      baseName: "description",
      type: "string",
    },
    {
      name: "fee_type",
      baseName: "fee_type",
      type: "PlatformFeeRefundBalanceTransaction.FeeType",
    },
    {
      name: "payout_id",
      baseName: "payout_id",
      type: "string",
    },
  ];

  static getAttributeTypeMap() {
    return PlatformFeeRefundBalanceTransaction.attributeTypeMap;
  }
}

export namespace PlatformFeeRefundBalanceTransaction {
  export enum Status {
    AVAILABLE = <any>"available",
    PENDING = <any>"pending",
  }
  export enum Currency {
    AUD = <any>"aud",
    CAD = <any>"cad",
    DKK = <any>"dkk",
    EUR = <any>"eur",
    HKD = <any>"hkd",
    JPY = <any>"jpy",
    NZD = <any>"nzd",
    NOK = <any>"nok",
    GBP = <any>"gbp",
    ZAR = <any>"zar",
    SEK = <any>"sek",
    CHF = <any>"chf",
    USD = <any>"usd",
  }
  export enum SourceType {
    CHARGE = <any>"charge",
    REFUND = <any>"refund",
    PAYOUT = <any>"payout",
    PAYMENT_METHOD = <any>"payment_method",
    PLATFORM_FEE = <any>"platform_fee",
    PLATFORM_FEE_REFUND = <any>"platform_fee_refund",
    DISPUTE = <any>"dispute",
    ACCOUNT = <any>"account",
  }
  export enum Type {
    CHARGE = <any>"charge",
    CHARGE_FAILURE_REFUND = <any>"charge_failure_refund",
    DISPUTE = <any>"dispute",
    DISPUTE_WON = <any>"dispute_won",
    REFUND = <any>"refund",
    REFUND_FAILURE = <any>"refund_failure",
    ADJUSTMENT = <any>"adjustment",
    COMMISSION = <any>"commission",
    PAYOUT = <any>"payout",
    PAYOUT_CANCEL = <any>"payout_cancel",
    PAYOUT_FAILURE = <any>"payout_failure",
    FEE = <any>"fee",
    PLATFORM_FEE = <any>"platform_fee",
    PLATFORM_FEE_REFUND = <any>"platform_fee_refund",
    CHARGE_FEE = <any>"charge_fee",
    REFUND_FEE = <any>"refund_fee",
    ACCOUNT_FEE = <any>"account_fee",
    PAYMENT_METHOD_FEE = <any>"payment_method_fee",
    TILLED_FEE = <any>"tilled_fee",
  }
  export enum FeeSubtype {
    APPROVED_VERIFICATION = <any>"approved_verification",
    DECLINED_VERIFICATION = <any>"declined_verification",
    APPROVED_AUTHORIZATION = <any>"approved_authorization",
    DECLINED_AUTHORIZATION = <any>"declined_authorization",
    REVERSED_AUTHORIZATION = <any>"reversed_authorization",
    COMPLETED_CREDIT = <any>"completed_credit",
    DECLINED_CREDIT = <any>"declined_credit",
    COMPLETED_SETTLEMENT = <any>"completed_settlement",
    DECLINED_SETTLEMENT = <any>"declined_settlement",
    APPROVED_PURCHASE_RETURN_AUTHORIZATION = <any>(
      "approved_purchase_return_authorization"
    ),
    DECLINED_PURCHASE_RETURN_AUTHORIZATION = <any>(
      "declined_purchase_return_authorization"
    ),
    ACQUIRER_PROCESSING = <any>"acquirer_processing",
    AMEX_CARD_NOT_PRESENT = <any>"amex_card_not_present",
    AMEX_DUES_AND_ASSESSMENTS = <any>"amex_dues_and_assessments",
    AMEX_INTERNATIONAL_ASSESSMENT = <any>"amex_international_assessment",
    DISCOVER_ASSESSMENT = <any>"discover_assessment",
    DISCOVER_DATA_USAGE = <any>"discover_data_usage",
    DUES_AND_ASSESSMENTS = <any>"dues_and_assessments",
    FIXED_ACQUIRER_NETWORK = <any>"fixed_acquirer_network",
    MASTERCARD_ANNUAL_LOCATION = <any>"mastercard_annual_location",
    MASTERCARD_ASSESSMENT = <any>"mastercard_assessment",
    MASTERCARD_ASSESSMENT_1000_PLUS = <any>"mastercard_assessment_1000_plus",
    MASTERCARD_DIGITAL_COMMERCE_DEVELOPMENT = <any>(
      "mastercard_digital_commerce_development"
    ),
    MASTERCARD_DIGITAL_ENABLEMENT = <any>"mastercard_digital_enablement",
    MASTERCARD_INTERNATIONAL_ASSESSMENT = <any>(
      "mastercard_international_assessment"
    ),
    MASTERCARD_PROCESSING_INTEGRITY = <any>"mastercard_processing_integrity",
    NABU = <any>"nabu",
    TRANSACTION_INTEGRITY = <any>"transaction_integrity",
    VISA_ASSESSMENT = <any>"visa_assessment",
    VISA_DEBIT_ASSESSMENT = <any>"visa_debit_assessment",
    VISA_INTERNATIONAL_ASSESSMENT = <any>"visa_international_assessment",
    VISA_MISUSE_OF_AUTHORIZATION = <any>"visa_misuse_of_authorization",
    REVERSAL = <any>"reversal",
    DISCOUNT = <any>"discount",
    TRANSACTION = <any>"transaction",
    ACCOUNT_SETUP = <any>"account_setup",
    ACH_RETURN = <any>"ach_return",
    MONTHLY_ACCOUNT = <any>"monthly_account",
    MONTHLY_MINIMUM_PROCESSING = <any>"monthly_minimum_processing",
    RETRIEVAL = <any>"retrieval",
    GOODS_AND_SERVICES = <any>"goods_and_services",
    HARMONIZED_SALES = <any>"harmonized_sales",
  }
  export enum FeeType {
    DISCOUNT = <any>"discount",
    TRANSACTION = <any>"transaction",
    INTERCHANGE = <any>"interchange",
    PASS_THROUGH = <any>"pass_through",
    PLATFORM = <any>"platform",
    CHARGEBACK = <any>"chargeback",
    ADMINISTRATIVE = <any>"administrative",
    TAX = <any>"tax",
    ROUNDING_ADJUSTMENT = <any>"rounding_adjustment",
    UNKNOWN = <any>"unknown",
  }
}
