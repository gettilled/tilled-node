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
import { BusinessLegalEntityAchBankAccount } from "./businessLegalEntityAchBankAccount";
import { BusinessLegalEntityAddress } from "./businessLegalEntityAddress";
import { BusinessLegalEntityBankAccount } from "./businessLegalEntityBankAccount";
import { Principal } from "./principal";

export class BusinessLegalEntity {
  /**
   * Type of business. * `CHARITY` = Charity * `CIC` = Community Interest Company * `CORP` = Corporation * `LTD` = Limited * `LLC` = Limited Liability Company * `LLP` = Limited Liability Partnership * `NPCORP` = Non-Profit * `PARTNERSHIP` = Partnership * `PLC` = Public Limited Company * `GOV` = Public Sector/Governmental * `SOLEPROP` = Sole Proprietorship/Sole Trader * `TRUST` = Trust
   */
  "type": BusinessLegalEntity.Type;
  /**
   * The merchant name
   */
  "name": string;
  /**
   * Registered business legal/trading name (e.g. \"ACME CA\")
   */
  "legal_name": string;
  /**
   * Company\'s Tax Identification Number
   */
  "tax_identification_number": string;
  "address": BusinessLegalEntityAddress;
  /**
   * Category code of the business. * `ACCT` = Accounting * `ART` = Artist Supply and Craft Stores * `BEAUTY` = Barber & Beauty Shop * `CATERING` = Catering * `CHARITY` = Charity * `CLEANING` = Cleaning Services * `CONSULTANT` = Consultant * `CONTRACTOR` = Trade Contractor * `DENTIST` = Dentistry * `EDU` = Schools & Education * `FOOD` = Food/Grocery * `LANDSCAPING` = Landscaping * `LEGAL` = Legal Services * `MEDICAL_PRACT` = Medical Practitioner * `MEDICAL_SERV` = Health Services * `MEMBERSHIP` = Membership Org. * `MISC_FOOD_STORES` = Misc. Food Stores * `MISC_MERCH` = Misc General Merchandise * `MISC_SERV` = Services * `MUSIC` = Music/Entertainment * `PC` = Computer Services * `PHOTO_FILM` = Photo/FILM * `PROF_SERV` = Professional Services * `REAL_ESTATE` = Real Estate * `RECREATION` = Recreation Services * `REPAIR` = Repair Services * `RESTO` = Restaurant/Bar * `RETAIL` = Direct Marketing Retail (MOTO) * `TAXI` = Taxi/Limo * `VET` = Veterinary * `WEB_DEV` = Web Design * `WEB_HOSTING` = Web Hosting
   */
  "category": BusinessLegalEntity.Category;
  /**
   * Customer support phone number of the business. Cannot contain special characters.
   */
  "phone": string;
  /**
   * Single currency used for processing and settlement for this merchant account.
   */
  "currency": BusinessLegalEntity.Currency;
  /**
   * Estimated yearly volume of transactions of the business. * `LOW` = 0-50k * `MEDIUM` = 50-100k * `HIGH` = 100-250k * `VERY_HIGH` = 250k+
   */
  "yearly_volume_range": BusinessLegalEntity.YearlyVolumeRange;
  /**
   * Average transaction amount, in minor units. (e.g. $100.00 = 10000 minor units)
   */
  "average_transaction_amount": number;
  /**
   * Region for the merchant account
   */
  "region": BusinessLegalEntity.Region;
  /**
   * The locale value used for the merchant account. Values depend on the region.
   */
  "locale": BusinessLegalEntity.Locale;
  /**
   * Provides information about a payment that customers see on their statements. Concatenated with the prefix (shortened descriptor) or statement descriptor that’s set on the account to form the complete statement descriptor. Maximum 20 characters for the concatenated descriptor.
   */
  "statement_descriptor": string;
  /**
   * Array of Principals (ie Business Owners).
   */
  "principals": Array<Principal>;
  "ach_bank_account"?: BusinessLegalEntityAchBankAccount;
  /**
   * Company\'s business description
   */
  "description"?: string;
  /**
   * Email of the business.
   */
  "company_email"?: string;
  /**
   * Average number of transactions per month
   */
  "average_transactions_per_month"?: number;
  "bank_account"?: BusinessLegalEntityBankAccount;
  /**
   * Website of the business.
   */
  "website"?: string;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{
    name: string;
    baseName: string;
    type: string;
  }> = [
    {
      name: "type",
      baseName: "type",
      type: "BusinessLegalEntity.Type",
    },
    {
      name: "name",
      baseName: "name",
      type: "string",
    },
    {
      name: "legal_name",
      baseName: "legal_name",
      type: "string",
    },
    {
      name: "tax_identification_number",
      baseName: "tax_identification_number",
      type: "string",
    },
    {
      name: "address",
      baseName: "address",
      type: "BusinessLegalEntityAddress",
    },
    {
      name: "category",
      baseName: "category",
      type: "BusinessLegalEntity.Category",
    },
    {
      name: "phone",
      baseName: "phone",
      type: "string",
    },
    {
      name: "currency",
      baseName: "currency",
      type: "BusinessLegalEntity.Currency",
    },
    {
      name: "yearly_volume_range",
      baseName: "yearly_volume_range",
      type: "BusinessLegalEntity.YearlyVolumeRange",
    },
    {
      name: "average_transaction_amount",
      baseName: "average_transaction_amount",
      type: "number",
    },
    {
      name: "region",
      baseName: "region",
      type: "BusinessLegalEntity.Region",
    },
    {
      name: "locale",
      baseName: "locale",
      type: "BusinessLegalEntity.Locale",
    },
    {
      name: "statement_descriptor",
      baseName: "statement_descriptor",
      type: "string",
    },
    {
      name: "principals",
      baseName: "principals",
      type: "Array<Principal>",
    },
    {
      name: "ach_bank_account",
      baseName: "ach_bank_account",
      type: "BusinessLegalEntityAchBankAccount",
    },
    {
      name: "description",
      baseName: "description",
      type: "string",
    },
    {
      name: "company_email",
      baseName: "company_email",
      type: "string",
    },
    {
      name: "average_transactions_per_month",
      baseName: "average_transactions_per_month",
      type: "number",
    },
    {
      name: "bank_account",
      baseName: "bank_account",
      type: "BusinessLegalEntityBankAccount",
    },
    {
      name: "website",
      baseName: "website",
      type: "string",
    },
  ];

  static getAttributeTypeMap() {
    return BusinessLegalEntity.attributeTypeMap;
  }
}

export namespace BusinessLegalEntity {
  export enum Type {
    CHARITY = <any>"CHARITY",
    CIC = <any>"CIC",
    CORP = <any>"CORP",
    LTD = <any>"LTD",
    LLC = <any>"LLC",
    LLP = <any>"LLP",
    NPCORP = <any>"NPCORP",
    PARTNERSHIP = <any>"PARTNERSHIP",
    PLC = <any>"PLC",
    GOV = <any>"GOV",
    SOLEPROP = <any>"SOLEPROP",
    TRUST = <any>"TRUST",
  }
  export enum Category {
    ACCT = <any>"ACCT",
    ART = <any>"ART",
    BEAUTY = <any>"BEAUTY",
    CATERING = <any>"CATERING",
    CHARITY = <any>"CHARITY",
    CLEANING = <any>"CLEANING",
    CONSULTANT = <any>"CONSULTANT",
    CONTRACTOR = <any>"CONTRACTOR",
    DENTIST = <any>"DENTIST",
    EDU = <any>"EDU",
    FOOD = <any>"FOOD",
    LANDSCAPING = <any>"LANDSCAPING",
    LEGAL = <any>"LEGAL",
    MEDICAL_PRACT = <any>"MEDICAL_PRACT",
    MEDICAL_SERV = <any>"MEDICAL_SERV",
    MEMBERSHIP = <any>"MEMBERSHIP",
    MISC_FOOD_STORES = <any>"MISC_FOOD_STORES",
    MISC_MERCH = <any>"MISC_MERCH",
    MISC_SERV = <any>"MISC_SERV",
    MUSIC = <any>"MUSIC",
    PC = <any>"PC",
    PHOTO_FILM = <any>"PHOTO_FILM",
    PROF_SERV = <any>"PROF_SERV",
    REAL_ESTATE = <any>"REAL_ESTATE",
    RECREATION = <any>"RECREATION",
    REPAIR = <any>"REPAIR",
    RESTO = <any>"RESTO",
    RETAIL = <any>"RETAIL",
    TAXI = <any>"TAXI",
    UTILITY = <any>"UTILITY",
    VET = <any>"VET",
    WEB_DEV = <any>"WEB_DEV",
    WEB_HOSTING = <any>"WEB_HOSTING",
    OTHER = <any>"OTHER",
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
  export enum YearlyVolumeRange {
    LOW = <any>"LOW",
    MEDIUM = <any>"MEDIUM",
    HIGH = <any>"HIGH",
    VERY_HIGH = <any>"VERY_HIGH",
  }
  export enum Region {
    US = <any>"US",
    CA = <any>"CA",
  }
  export enum Locale {
    EN_US = <any>"en_US",
    EN_CA = <any>"en_CA",
    FR_CA = <any>"fr_CA",
    EN_GB = <any>"en_GB",
  }
}
