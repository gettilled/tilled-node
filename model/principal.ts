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
import { PrincipalAddress } from "./principalAddress";
import { PrincipalPreviousAddress } from "./principalPreviousAddress";

export class Principal {
  /**
   * Indicates whether this principal is the applicant for the merchant account. For US merchant accounts (`region = US`) it is required that _exactly_ one of the principals is specified as the applicant.
   */
  "is_applicant": boolean;
  /**
   * Job title of the principal (e.g. CEO, CFO, President, VP)
   */
  "job_title": string;
  /**
   * First name of the principal.
   */
  "first_name": string;
  /**
   * Last name of the principal.
   */
  "last_name": string;
  /**
   * Phone number of the principal.
   */
  "phone": string;
  /**
   * Date of birth of the principal. Format must be ISO8601 (e.g. \'2000-01-25\'; format \'YYYY-MM-DD\'). Currently the principal must be older than 18 years of age.
   */
  "date_of_birth": Date;
  "address": PrincipalAddress;
  /**
   * Percentage of ownership of the company.
   */
  "percentage_shareholding": number;
  /**
   * The unique identifier for this principal. It is not required upon initial submission. The `ssn` property is redacted in any responses, so if the principal needs to be updated then provide this identifier that was generated during the initial request.
   */
  "id"?: string;
  /**
   * This indicates whether the principal is the Control Prong. Control Prong is an individual with significant responsibility for managing the legal entity customer (e.g., a CEO, CFO, COO, Managing Member, General Partner, President, Vice-President, or Treasurer). For US merchant accounts (`region = US`) it is required that _exactly_ one of the principals is specified as the Control Prong.
   */
  "is_control_prong"?: boolean;
  /**
   * Middle name of the principal.
   */
  "middle_name"?: string;
  /**
   * Email address of the principal
   */
  "email"?: string;
  /**
   * Social Security Number (US) or Social Insurance Number (CA). Optional when business type is `NPCORP`, `CHARITY`, or `GOV`. Expected format: 9-digit string of numbers (e.g. \"111444777\"). Optional in CA.
   */
  "ssn"?: string;
  "previous_address"?: PrincipalPreviousAddress;
  /**
   * Nationality of the principal
   */
  "nationality"?: Principal.Nationality;
  /**
   * Type of representative. Ex. shareholder, director, officer, merchant rep
   */
  "type"?: Principal.Type;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{
    name: string;
    baseName: string;
    type: string;
  }> = [
    {
      name: "is_applicant",
      baseName: "is_applicant",
      type: "boolean",
    },
    {
      name: "job_title",
      baseName: "job_title",
      type: "string",
    },
    {
      name: "first_name",
      baseName: "first_name",
      type: "string",
    },
    {
      name: "last_name",
      baseName: "last_name",
      type: "string",
    },
    {
      name: "phone",
      baseName: "phone",
      type: "string",
    },
    {
      name: "date_of_birth",
      baseName: "date_of_birth",
      type: "Date",
    },
    {
      name: "address",
      baseName: "address",
      type: "PrincipalAddress",
    },
    {
      name: "percentage_shareholding",
      baseName: "percentage_shareholding",
      type: "number",
    },
    {
      name: "id",
      baseName: "id",
      type: "string",
    },
    {
      name: "is_control_prong",
      baseName: "is_control_prong",
      type: "boolean",
    },
    {
      name: "middle_name",
      baseName: "middle_name",
      type: "string",
    },
    {
      name: "email",
      baseName: "email",
      type: "string",
    },
    {
      name: "ssn",
      baseName: "ssn",
      type: "string",
    },
    {
      name: "previous_address",
      baseName: "previous_address",
      type: "PrincipalPreviousAddress",
    },
    {
      name: "nationality",
      baseName: "nationality",
      type: "Principal.Nationality",
    },
    {
      name: "type",
      baseName: "type",
      type: "Principal.Type",
    },
  ];

  static getAttributeTypeMap() {
    return Principal.attributeTypeMap;
  }
}

export namespace Principal {
  export enum Nationality {
    AF = <any>"AF",
    AL = <any>"AL",
    DZ = <any>"DZ",
    US = <any>"US",
    AS = <any>"AS",
    AD = <any>"AD",
    AO = <any>"AO",
    AI = <any>"AI",
    AQ = <any>"AQ",
    AG = <any>"AG",
    AR = <any>"AR",
    AM = <any>"AM",
    AW = <any>"AW",
    AU = <any>"AU",
    AT = <any>"AT",
    AZ = <any>"AZ",
    BS = <any>"BS",
    BH = <any>"BH",
    BD = <any>"BD",
    BB = <any>"BB",
    BL = <any>"BL",
    BY = <any>"BY",
    BE = <any>"BE",
    BZ = <any>"BZ",
    BJ = <any>"BJ",
    BM = <any>"BM",
    BT = <any>"BT",
    BO = <any>"BO",
    BA = <any>"BA",
    BR = <any>"BR",
    GB = <any>"GB",
    BN = <any>"BN",
    BG = <any>"BG",
    BF = <any>"BF",
    BI = <any>"BI",
    KH = <any>"KH",
    CM = <any>"CM",
    CA = <any>"CA",
    CV = <any>"CV",
    KY = <any>"KY",
    CF = <any>"CF",
    TD = <any>"TD",
    CL = <any>"CL",
    CN = <any>"CN",
    CX = <any>"CX",
    CC = <any>"CC",
    CO = <any>"CO",
    KM = <any>"KM",
    CG = <any>"CG",
    CD = <any>"CD",
    CK = <any>"CK",
    CR = <any>"CR",
    HR = <any>"HR",
    CU = <any>"CU",
    CW = <any>"CW",
    CY = <any>"CY",
    CZ = <any>"CZ",
    DK = <any>"DK",
    DJ = <any>"DJ",
    DM = <any>"DM",
    DO = <any>"DO",
    NL = <any>"NL",
    EC = <any>"EC",
    EG = <any>"EG",
    AE = <any>"AE",
    GQ = <any>"GQ",
    ER = <any>"ER",
    EE = <any>"EE",
    ET = <any>"ET",
    FK = <any>"FK",
    FO = <any>"FO",
    FJ = <any>"FJ",
    PH = <any>"PH",
    FI = <any>"FI",
    FR = <any>"FR",
    GF = <any>"GF",
    PF = <any>"PF",
    GA = <any>"GA",
    GM = <any>"GM",
    GE = <any>"GE",
    DE = <any>"DE",
    GH = <any>"GH",
    GI = <any>"GI",
    GR = <any>"GR",
    GL = <any>"GL",
    GD = <any>"GD",
    GP = <any>"GP",
    GU = <any>"GU",
    GT = <any>"GT",
    GW = <any>"GW",
    GN = <any>"GN",
    GY = <any>"GY",
    HT = <any>"HT",
    HN = <any>"HN",
    HK = <any>"HK",
    HU = <any>"HU",
    KI = <any>"KI",
    IS = <any>"IS",
    IN = <any>"IN",
    ID = <any>"ID",
    IR = <any>"IR",
    IQ = <any>"IQ",
    IE = <any>"IE",
    IL = <any>"IL",
    IT = <any>"IT",
    CI = <any>"CI",
    JM = <any>"JM",
    JP = <any>"JP",
    JO = <any>"JO",
    KZ = <any>"KZ",
    KE = <any>"KE",
    KN = <any>"KN",
    KW = <any>"KW",
    KG = <any>"KG",
    LA = <any>"LA",
    LV = <any>"LV",
    LB = <any>"LB",
    LR = <any>"LR",
    LY = <any>"LY",
    LI = <any>"LI",
    LT = <any>"LT",
    LU = <any>"LU",
    MO = <any>"MO",
    MK = <any>"MK",
    YT = <any>"YT",
    MG = <any>"MG",
    MW = <any>"MW",
    MY = <any>"MY",
    MV = <any>"MV",
    ML = <any>"ML",
    MT = <any>"MT",
    IM = <any>"IM",
    MH = <any>"MH",
    MQ = <any>"MQ",
    MR = <any>"MR",
    MU = <any>"MU",
    MX = <any>"MX",
    FM = <any>"FM",
    MD = <any>"MD",
    MC = <any>"MC",
    MN = <any>"MN",
    ME = <any>"ME",
    MS = <any>"MS",
    MA = <any>"MA",
    LS = <any>"LS",
    BW = <any>"BW",
    MZ = <any>"MZ",
    MM = <any>"MM",
    NA = <any>"NA",
    NR = <any>"NR",
    NP = <any>"NP",
    NC = <any>"NC",
    NZ = <any>"NZ",
    VU = <any>"VU",
    NI = <any>"NI",
    NG = <any>"NG",
    NE = <any>"NE",
    NU = <any>"NU",
    NF = <any>"NF",
    KP = <any>"KP",
    MP = <any>"MP",
    NO = <any>"NO",
    OM = <any>"OM",
    PK = <any>"PK",
    PW = <any>"PW",
    PS = <any>"PS",
    PA = <any>"PA",
    PG = <any>"PG",
    PY = <any>"PY",
    PE = <any>"PE",
    PN = <any>"PN",
    PL = <any>"PL",
    PT = <any>"PT",
    PR = <any>"PR",
    QA = <any>"QA",
    RO = <any>"RO",
    RU = <any>"RU",
    RW = <any>"RW",
    SH = <any>"SH",
    LC = <any>"LC",
    VC = <any>"VC",
    PM = <any>"PM",
    SV = <any>"SV",
    WS = <any>"WS",
    SM = <any>"SM",
    SA = <any>"SA",
    SN = <any>"SN",
    RS = <any>"RS",
    SC = <any>"SC",
    SL = <any>"SL",
    SG = <any>"SG",
    SK = <any>"SK",
    SI = <any>"SI",
    SB = <any>"SB",
    SO = <any>"SO",
    ZA = <any>"ZA",
    KR = <any>"KR",
    ES = <any>"ES",
    LK = <any>"LK",
    SD = <any>"SD",
    SS = <any>"SS",
    SR = <any>"SR",
    SZ = <any>"SZ",
    SE = <any>"SE",
    CH = <any>"CH",
    SY = <any>"SY",
    ST = <any>"ST",
    TW = <any>"TW",
    TJ = <any>"TJ",
    TZ = <any>"TZ",
    TH = <any>"TH",
    TL = <any>"TL",
    TG = <any>"TG",
    TK = <any>"TK",
    TO = <any>"TO",
    TT = <any>"TT",
    TN = <any>"TN",
    TR = <any>"TR",
    TM = <any>"TM",
    TC = <any>"TC",
    TV = <any>"TV",
    UG = <any>"UG",
    UA = <any>"UA",
    UY = <any>"UY",
    UZ = <any>"UZ",
    VE = <any>"VE",
    VN = <any>"VN",
    VG = <any>"VG",
    WF = <any>"WF",
    EH = <any>"EH",
    YE = <any>"YE",
    ZM = <any>"ZM",
    ZW = <any>"ZW",
    AX = <any>"AX",
  }
  export enum Type {
    DIRECTOR = <any>"director",
    SHAREHOLDER = <any>"shareholder",
    MERCHANT_REP = <any>"merchant_rep",
    CONTACT = <any>"contact",
  }
}
