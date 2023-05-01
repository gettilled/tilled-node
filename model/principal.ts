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
import { PrincipalAddress } from "./principal-address";
// May contain unused imports in some cases
// @ts-ignore
import { PrincipalPreviousAddress } from "./principal-previous-address";

/**
 *
 * @export
 * @interface Principal
 */
export interface Principal {
  /**
   * Indicates whether this principal is the applicant for the merchant account. For US merchant accounts (`region = US`) it is required that _exactly_ one of the principals is specified as the applicant.
   * @type {boolean}
   * @memberof Principal
   */
  is_applicant: boolean;
  /**
   * Job title of the principal (e.g. CEO, CFO, President, VP)
   * @type {string}
   * @memberof Principal
   */
  job_title: string;
  /**
   * First name of the principal.
   * @type {string}
   * @memberof Principal
   */
  first_name: string;
  /**
   * Last name of the principal.
   * @type {string}
   * @memberof Principal
   */
  last_name: string;
  /**
   * Phone number of the principal.
   * @type {string}
   * @memberof Principal
   */
  phone: string;
  /**
   * Date of birth of the principal. Format must be ISO8601 (e.g. \'2000-01-25\'; format \'YYYY-MM-DD\'). Currently the principal must be older than 18 years of age.
   * @type {string}
   * @memberof Principal
   */
  date_of_birth: string;
  /**
   *
   * @type {PrincipalAddress}
   * @memberof Principal
   */
  address: PrincipalAddress;
  /**
   * Percentage of ownership of the company.
   * @type {number}
   * @memberof Principal
   */
  percentage_shareholding: number;
  /**
   * The unique identifier for this principal. It is not required upon initial submission. The `ssn` property is redacted in any responses, so if the principal needs to be updated then provide this identifier that was generated during the initial request.
   * @type {string}
   * @memberof Principal
   */
  id?: string;
  /**
   * This indicates whether the principal is the Control Prong. Control Prong is an individual with significant responsibility for managing the legal entity customer (e.g., a CEO, CFO, COO, Managing Member, General Partner, President, Vice-President, or Treasurer). For US merchant accounts (`region = US`) it is required that _exactly_ one of the principals is specified as the Control Prong.
   * @type {boolean}
   * @memberof Principal
   */
  is_control_prong?: boolean;
  /**
   * Middle name of the principal.
   * @type {string}
   * @memberof Principal
   */
  middle_name?: string;
  /**
   * Email address of the principal
   * @type {string}
   * @memberof Principal
   */
  email?: string;
  /**
   * Social Security Number (US) or Social Insurance Number (CA). Optional when business type is `NPCORP`, `CHARITY`, or `GOV`. Expected format: 9-digit string of numbers (e.g. \"111444777\"). Optional in CA.
   * @type {string}
   * @memberof Principal
   */
  ssn?: string;
  /**
   *
   * @type {PrincipalPreviousAddress}
   * @memberof Principal
   */
  previous_address?: PrincipalPreviousAddress;
  /**
   * Nationality of the principal
   * @type {string}
   * @memberof Principal
   */
  nationality?: PrincipalNationality;
  /**
   * Type of representative. Ex. shareholder, director, officer, merchant rep
   * @type {string}
   * @memberof Principal
   */
  type?: PrincipalType;
}

export const PrincipalNationality = {
  AF: "AF",
  AL: "AL",
  DZ: "DZ",
  US: "US",
  AS: "AS",
  AD: "AD",
  AO: "AO",
  AI: "AI",
  AQ: "AQ",
  AG: "AG",
  AR: "AR",
  AM: "AM",
  AW: "AW",
  AU: "AU",
  AT: "AT",
  AZ: "AZ",
  BS: "BS",
  BH: "BH",
  BD: "BD",
  BB: "BB",
  BL: "BL",
  BY: "BY",
  BE: "BE",
  BZ: "BZ",
  BJ: "BJ",
  BM: "BM",
  BT: "BT",
  BO: "BO",
  BA: "BA",
  BR: "BR",
  GB: "GB",
  BN: "BN",
  BG: "BG",
  BF: "BF",
  BI: "BI",
  KH: "KH",
  CM: "CM",
  CA: "CA",
  CV: "CV",
  KY: "KY",
  CF: "CF",
  TD: "TD",
  CL: "CL",
  CN: "CN",
  CX: "CX",
  CC: "CC",
  CO: "CO",
  KM: "KM",
  CG: "CG",
  CD: "CD",
  CK: "CK",
  CR: "CR",
  HR: "HR",
  CU: "CU",
  CW: "CW",
  CY: "CY",
  CZ: "CZ",
  DK: "DK",
  DJ: "DJ",
  DM: "DM",
  DO: "DO",
  NL: "NL",
  EC: "EC",
  EG: "EG",
  AE: "AE",
  GQ: "GQ",
  ER: "ER",
  EE: "EE",
  ET: "ET",
  FK: "FK",
  FO: "FO",
  FJ: "FJ",
  PH: "PH",
  FI: "FI",
  FR: "FR",
  GF: "GF",
  PF: "PF",
  GA: "GA",
  GM: "GM",
  GE: "GE",
  DE: "DE",
  GH: "GH",
  GI: "GI",
  GR: "GR",
  GL: "GL",
  GD: "GD",
  GP: "GP",
  GU: "GU",
  GT: "GT",
  GW: "GW",
  GN: "GN",
  GY: "GY",
  HT: "HT",
  HN: "HN",
  HK: "HK",
  HU: "HU",
  KI: "KI",
  IS: "IS",
  IN: "IN",
  ID: "ID",
  IR: "IR",
  IQ: "IQ",
  IE: "IE",
  IL: "IL",
  IT: "IT",
  CI: "CI",
  JM: "JM",
  JP: "JP",
  JO: "JO",
  KZ: "KZ",
  KE: "KE",
  KN: "KN",
  KW: "KW",
  KG: "KG",
  LA: "LA",
  LV: "LV",
  LB: "LB",
  LR: "LR",
  LY: "LY",
  LI: "LI",
  LT: "LT",
  LU: "LU",
  MO: "MO",
  MK: "MK",
  YT: "YT",
  MG: "MG",
  MW: "MW",
  MY: "MY",
  MV: "MV",
  ML: "ML",
  MT: "MT",
  IM: "IM",
  MH: "MH",
  MQ: "MQ",
  MR: "MR",
  MU: "MU",
  MX: "MX",
  FM: "FM",
  MD: "MD",
  MC: "MC",
  MN: "MN",
  ME: "ME",
  MS: "MS",
  MA: "MA",
  LS: "LS",
  BW: "BW",
  MZ: "MZ",
  MM: "MM",
  NA: "NA",
  NR: "NR",
  NP: "NP",
  NC: "NC",
  NZ: "NZ",
  VU: "VU",
  NI: "NI",
  NG: "NG",
  NE: "NE",
  NU: "NU",
  NF: "NF",
  KP: "KP",
  MP: "MP",
  NO: "NO",
  OM: "OM",
  PK: "PK",
  PW: "PW",
  PS: "PS",
  PA: "PA",
  PG: "PG",
  PY: "PY",
  PE: "PE",
  PN: "PN",
  PL: "PL",
  PT: "PT",
  PR: "PR",
  QA: "QA",
  RO: "RO",
  RU: "RU",
  RW: "RW",
  SH: "SH",
  LC: "LC",
  VC: "VC",
  PM: "PM",
  SV: "SV",
  WS: "WS",
  SM: "SM",
  SA: "SA",
  SN: "SN",
  RS: "RS",
  SC: "SC",
  SL: "SL",
  SG: "SG",
  SK: "SK",
  SI: "SI",
  SB: "SB",
  SO: "SO",
  ZA: "ZA",
  KR: "KR",
  ES: "ES",
  LK: "LK",
  SD: "SD",
  SS: "SS",
  SR: "SR",
  SZ: "SZ",
  SE: "SE",
  CH: "CH",
  SY: "SY",
  ST: "ST",
  TW: "TW",
  TJ: "TJ",
  TZ: "TZ",
  TH: "TH",
  TL: "TL",
  TG: "TG",
  TK: "TK",
  TO: "TO",
  TT: "TT",
  TN: "TN",
  TR: "TR",
  TM: "TM",
  TC: "TC",
  TV: "TV",
  UG: "UG",
  UA: "UA",
  UY: "UY",
  UZ: "UZ",
  VE: "VE",
  VN: "VN",
  VG: "VG",
  WF: "WF",
  EH: "EH",
  YE: "YE",
  ZM: "ZM",
  ZW: "ZW",
  AX: "AX",
} as const;

export type PrincipalNationality =
  (typeof PrincipalNationality)[keyof typeof PrincipalNationality];
export const PrincipalType = {
  DIRECTOR: "director",
  SHAREHOLDER: "shareholder",
  MERCHANT_REP: "merchant_rep",
  CONTACT: "contact",
} as const;

export type PrincipalType = (typeof PrincipalType)[keyof typeof PrincipalType];
