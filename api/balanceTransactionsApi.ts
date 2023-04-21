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

import localVarRequest from "request";
import http from "http";

/* tslint:disable:no-unused-locals */
import { BalanceTransaction } from "../model/balanceTransaction";
import { BalanceTransactionsSummary } from "../model/balanceTransactionsSummary";
import { ListBalanceTransactions200Response } from "../model/listBalanceTransactions200Response";

import {
  ObjectSerializer,
  Authentication,
  VoidAuth,
  Interceptor,
} from "../model/models";
import {
  HttpBasicAuth,
  HttpBearerAuth,
  ApiKeyAuth,
  OAuth,
} from "../model/models";

import { HttpError, RequestFile } from "./apis";

let defaultBasePath = "https://api.tilled.com";

// ===============================================
// This file is autogenerated - Please do not edit
// ===============================================

export enum BalanceTransactionsApiApiKeys {
  TilledApiKey,
}

export class BalanceTransactionsApi {
  protected _basePath = defaultBasePath;
  protected _defaultHeaders: any = {};
  protected _useQuerystring: boolean = false;

  protected authentications = {
    default: <Authentication>new VoidAuth(),
    TilledApiKey: new ApiKeyAuth("header", "tilled-api-key"),
    JWT: new HttpBearerAuth(),
  };

  protected interceptors: Interceptor[] = [];

  constructor(basePath?: string);
  constructor(
    basePathOrUsername: string,
    password?: string,
    basePath?: string
  ) {
    if (password) {
      if (basePath) {
        this.basePath = basePath;
      }
    } else {
      if (basePathOrUsername) {
        this.basePath = basePathOrUsername;
      }
    }
  }

  set useQuerystring(value: boolean) {
    this._useQuerystring = value;
  }

  set basePath(basePath: string) {
    this._basePath = basePath;
  }

  set defaultHeaders(defaultHeaders: any) {
    this._defaultHeaders = defaultHeaders;
  }

  get defaultHeaders() {
    return this._defaultHeaders;
  }

  get basePath() {
    return this._basePath;
  }

  public setDefaultAuthentication(auth: Authentication) {
    this.authentications.default = auth;
  }

  public setApiKey(key: BalanceTransactionsApiApiKeys, value: string) {
    (this.authentications as any)[BalanceTransactionsApiApiKeys[key]].apiKey =
      value;
  }

  set accessToken(accessToken: string | (() => string)) {
    this.authentications.JWT.accessToken = accessToken;
  }

  public addInterceptor(interceptor: Interceptor) {
    this.interceptors.push(interceptor);
  }

  /**
   * Retrieves the balance transaction with the given ID.
   * @summary Get a Balance Transaction
   * @param tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @param id
   */
  public async getBalanceTransaction(
    tilled_account: string,
    id: string,
    options: { headers: { [name: string]: string } } = { headers: {} }
  ): Promise<{ response: http.IncomingMessage; body: BalanceTransaction }> {
    const localVarPath =
      this.basePath +
      "/v1/balance-transactions/{id}".replace(
        "{" + "id" + "}",
        encodeURIComponent(String(id))
      );
    let localVarQueryParameters: any = {};
    let localVarHeaderParams: any = (<any>Object).assign(
      {},
      this._defaultHeaders
    );
    const produces = ["application/json"];
    // give precedence to 'application/json'
    if (produces.indexOf("application/json") >= 0) {
      localVarHeaderParams.Accept = "application/json";
    } else {
      localVarHeaderParams.Accept = produces.join(",");
    }
    let localVarFormParams: any = {};

    // verify required parameter 'tilled_account' is not null or undefined
    if (tilled_account === null || tilled_account === undefined) {
      throw new Error(
        "Required parameter tilled_account was null or undefined when calling getBalanceTransaction."
      );
    }

    // verify required parameter 'id' is not null or undefined
    if (id === null || id === undefined) {
      throw new Error(
        "Required parameter id was null or undefined when calling getBalanceTransaction."
      );
    }

    localVarHeaderParams["tilled-account"] = ObjectSerializer.serialize(
      tilled_account,
      "string"
    );
    (<any>Object).assign(localVarHeaderParams, options.headers);

    let localVarUseFormData = false;

    let localVarRequestOptions: localVarRequest.Options = {
      method: "GET",
      qs: localVarQueryParameters,
      headers: localVarHeaderParams,
      uri: localVarPath,
      useQuerystring: this._useQuerystring,
      json: true,
    };

    let authenticationPromise = Promise.resolve();
    if (this.authentications.JWT.accessToken) {
      authenticationPromise = authenticationPromise.then(() =>
        this.authentications.JWT.applyToRequest(localVarRequestOptions)
      );
    }
    if (this.authentications.TilledApiKey.apiKey) {
      authenticationPromise = authenticationPromise.then(() =>
        this.authentications.TilledApiKey.applyToRequest(localVarRequestOptions)
      );
    }
    authenticationPromise = authenticationPromise.then(() =>
      this.authentications.default.applyToRequest(localVarRequestOptions)
    );

    let interceptorPromise = authenticationPromise;
    for (const interceptor of this.interceptors) {
      interceptorPromise = interceptorPromise.then(() =>
        interceptor(localVarRequestOptions)
      );
    }

    return interceptorPromise.then(() => {
      if (Object.keys(localVarFormParams).length) {
        if (localVarUseFormData) {
          (<any>localVarRequestOptions).formData = localVarFormParams;
        } else {
          localVarRequestOptions.form = localVarFormParams;
        }
      }
      return new Promise<{
        response: http.IncomingMessage;
        body: BalanceTransaction;
      }>((resolve, reject) => {
        localVarRequest(localVarRequestOptions, (error, response, body) => {
          if (error) {
            reject(error);
          } else {
            if (
              response.statusCode &&
              response.statusCode >= 200 &&
              response.statusCode <= 299
            ) {
              body = ObjectSerializer.deserialize(body, "BalanceTransaction");
              resolve({ response: response, body: body });
            } else {
              reject(new HttpError(response, body, response.statusCode));
            }
          }
        });
      });
    });
  }
  /**
   * Returns a summary of transactions grouped by `time_unit`, `type`, and `currency`.
   * @summary Get a Balance Transactions Summary
   * @param tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @param time_unit String indicating the unit of time to aggregate the summary of data.
   * @param time_zone Time Zone by which to aggregate the results.
   * @param created_at_gte Minimum &#x60;created_at&#x60; value to filter by (inclusive). Defaults to the beginning of the current month.
   * @param created_at_lte Maximum &#x60;created_at&#x60; value to filter by (inclusive). Defaults to midnight tonight.
   * @param types An array containing specific balance transaction types. The data will be filtered to include only transactions with a matching type property.
   * @param include_connected_accounts Whether or not to include the results from any connected accounts.
   */
  public async getBalanceTransactionsSummary(
    tilled_account: string,
    time_unit?: "day" | "month",
    time_zone?:
      | "Africa/Abidjan"
      | "Africa/Accra"
      | "Africa/Addis_Ababa"
      | "Africa/Algiers"
      | "Africa/Asmara"
      | "Africa/Asmera"
      | "Africa/Bamako"
      | "Africa/Bangui"
      | "Africa/Banjul"
      | "Africa/Bissau"
      | "Africa/Blantyre"
      | "Africa/Brazzaville"
      | "Africa/Bujumbura"
      | "Africa/Cairo"
      | "Africa/Casablanca"
      | "Africa/Ceuta"
      | "Africa/Conakry"
      | "Africa/Dakar"
      | "Africa/Dar_es_Salaam"
      | "Africa/Djibouti"
      | "Africa/Douala"
      | "Africa/El_Aaiun"
      | "Africa/Freetown"
      | "Africa/Gaborone"
      | "Africa/Harare"
      | "Africa/Johannesburg"
      | "Africa/Juba"
      | "Africa/Kampala"
      | "Africa/Khartoum"
      | "Africa/Kigali"
      | "Africa/Kinshasa"
      | "Africa/Lagos"
      | "Africa/Libreville"
      | "Africa/Lome"
      | "Africa/Luanda"
      | "Africa/Lubumbashi"
      | "Africa/Lusaka"
      | "Africa/Malabo"
      | "Africa/Maputo"
      | "Africa/Maseru"
      | "Africa/Mbabane"
      | "Africa/Mogadishu"
      | "Africa/Monrovia"
      | "Africa/Nairobi"
      | "Africa/Ndjamena"
      | "Africa/Niamey"
      | "Africa/Nouakchott"
      | "Africa/Ouagadougou"
      | "Africa/Porto-Novo"
      | "Africa/Sao_Tome"
      | "Africa/Timbuktu"
      | "Africa/Tripoli"
      | "Africa/Tunis"
      | "Africa/Windhoek"
      | "America/Adak"
      | "America/Anchorage"
      | "America/Anguilla"
      | "America/Antigua"
      | "America/Araguaina"
      | "America/Argentina/Buenos_Aires"
      | "America/Argentina/Catamarca"
      | "America/Argentina/ComodRivadavia"
      | "America/Argentina/Cordoba"
      | "America/Argentina/Jujuy"
      | "America/Argentina/La_Rioja"
      | "America/Argentina/Mendoza"
      | "America/Argentina/Rio_Gallegos"
      | "America/Argentina/Salta"
      | "America/Argentina/San_Juan"
      | "America/Argentina/San_Luis"
      | "America/Argentina/Tucuman"
      | "America/Argentina/Ushuaia"
      | "America/Aruba"
      | "America/Asuncion"
      | "America/Atikokan"
      | "America/Atka"
      | "America/Bahia"
      | "America/Bahia_Banderas"
      | "America/Barbados"
      | "America/Belem"
      | "America/Belize"
      | "America/Blanc-Sablon"
      | "America/Boa_Vista"
      | "America/Bogota"
      | "America/Boise"
      | "America/Buenos_Aires"
      | "America/Cambridge_Bay"
      | "America/Campo_Grande"
      | "America/Cancun"
      | "America/Caracas"
      | "America/Catamarca"
      | "America/Cayenne"
      | "America/Cayman"
      | "America/Chicago"
      | "America/Chihuahua"
      | "America/Coral_Harbour"
      | "America/Cordoba"
      | "America/Costa_Rica"
      | "America/Creston"
      | "America/Cuiaba"
      | "America/Curacao"
      | "America/Danmarkshavn"
      | "America/Dawson"
      | "America/Dawson_Creek"
      | "America/Denver"
      | "America/Detroit"
      | "America/Dominica"
      | "America/Edmonton"
      | "America/Eirunepe"
      | "America/El_Salvador"
      | "America/Ensenada"
      | "America/Fort_Wayne"
      | "America/Fortaleza"
      | "America/Glace_Bay"
      | "America/Godthab"
      | "America/Goose_Bay"
      | "America/Grand_Turk"
      | "America/Grenada"
      | "America/Guadeloupe"
      | "America/Guatemala"
      | "America/Guayaquil"
      | "America/Guyana"
      | "America/Halifax"
      | "America/Havana"
      | "America/Hermosillo"
      | "America/Indiana/Indianapolis"
      | "America/Indiana/Knox"
      | "America/Indiana/Marengo"
      | "America/Indiana/Petersburg"
      | "America/Indiana/Tell_City"
      | "America/Indiana/Vevay"
      | "America/Indiana/Vincennes"
      | "America/Indiana/Winamac"
      | "America/Indianapolis"
      | "America/Inuvik"
      | "America/Iqaluit"
      | "America/Jamaica"
      | "America/Jujuy"
      | "America/Juneau"
      | "America/Kentucky/Louisville"
      | "America/Kentucky/Monticello"
      | "America/Knox_IN"
      | "America/Kralendijk"
      | "America/La_Paz"
      | "America/Lima"
      | "America/Los_Angeles"
      | "America/Louisville"
      | "America/Lower_Princes"
      | "America/Maceio"
      | "America/Managua"
      | "America/Manaus"
      | "America/Marigot"
      | "America/Martinique"
      | "America/Matamoros"
      | "America/Mazatlan"
      | "America/Mendoza"
      | "America/Menominee"
      | "America/Merida"
      | "America/Metlakatla"
      | "America/Mexico_City"
      | "America/Miquelon"
      | "America/Moncton"
      | "America/Monterrey"
      | "America/Montevideo"
      | "America/Montreal"
      | "America/Montserrat"
      | "America/Nassau"
      | "America/New_York"
      | "America/Nipigon"
      | "America/Nome"
      | "America/Noronha"
      | "America/North_Dakota/Beulah"
      | "America/North_Dakota/Center"
      | "America/North_Dakota/New_Salem"
      | "America/Ojinaga"
      | "America/Panama"
      | "America/Pangnirtung"
      | "America/Paramaribo"
      | "America/Phoenix"
      | "America/Port-au-Prince"
      | "America/Port_of_Spain"
      | "America/Porto_Acre"
      | "America/Porto_Velho"
      | "America/Puerto_Rico"
      | "America/Rainy_River"
      | "America/Rankin_Inlet"
      | "America/Recife"
      | "America/Regina"
      | "America/Resolute"
      | "America/Rio_Branco"
      | "America/Rosario"
      | "America/Santa_Isabel"
      | "America/Santarem"
      | "America/Santiago"
      | "America/Santo_Domingo"
      | "America/Sao_Paulo"
      | "America/Scoresbysund"
      | "America/Shiprock"
      | "America/Sitka"
      | "America/St_Barthelemy"
      | "America/St_Johns"
      | "America/St_Kitts"
      | "America/St_Lucia"
      | "America/St_Thomas"
      | "America/St_Vincent"
      | "America/Swift_Current"
      | "America/Tegucigalpa"
      | "America/Thule"
      | "America/Thunder_Bay"
      | "America/Tijuana"
      | "America/Toronto"
      | "America/Tortola"
      | "America/Vancouver"
      | "America/Virgin"
      | "America/Whitehorse"
      | "America/Winnipeg"
      | "America/Yakutat"
      | "America/Yellowknife"
      | "Antarctica/Casey"
      | "Antarctica/Davis"
      | "Antarctica/DumontDUrville"
      | "Antarctica/Macquarie"
      | "Antarctica/Mawson"
      | "Antarctica/McMurdo"
      | "Antarctica/Palmer"
      | "Antarctica/Rothera"
      | "Antarctica/South_Pole"
      | "Antarctica/Syowa"
      | "Antarctica/Troll"
      | "Antarctica/Vostok"
      | "Arctic/Longyearbyen"
      | "Asia/Aden"
      | "Asia/Almaty"
      | "Asia/Amman"
      | "Asia/Anadyr"
      | "Asia/Aqtau"
      | "Asia/Aqtobe"
      | "Asia/Ashgabat"
      | "Asia/Ashkhabad"
      | "Asia/Baghdad"
      | "Asia/Bahrain"
      | "Asia/Baku"
      | "Asia/Bangkok"
      | "Asia/Beirut"
      | "Asia/Bishkek"
      | "Asia/Brunei"
      | "Asia/Calcutta"
      | "Asia/Chita"
      | "Asia/Choibalsan"
      | "Asia/Chongqing"
      | "Asia/Chungking"
      | "Asia/Colombo"
      | "Asia/Dacca"
      | "Asia/Damascus"
      | "Asia/Dhaka"
      | "Asia/Dili"
      | "Asia/Dubai"
      | "Asia/Dushanbe"
      | "Asia/Gaza"
      | "Asia/Harbin"
      | "Asia/Hebron"
      | "Asia/Ho_Chi_Minh"
      | "Asia/Hong_Kong"
      | "Asia/Hovd"
      | "Asia/Irkutsk"
      | "Asia/Istanbul"
      | "Asia/Jakarta"
      | "Asia/Jayapura"
      | "Asia/Jerusalem"
      | "Asia/Kabul"
      | "Asia/Kamchatka"
      | "Asia/Karachi"
      | "Asia/Kashgar"
      | "Asia/Kathmandu"
      | "Asia/Katmandu"
      | "Asia/Khandyga"
      | "Asia/Kolkata"
      | "Asia/Krasnoyarsk"
      | "Asia/Kuala_Lumpur"
      | "Asia/Kuching"
      | "Asia/Kuwait"
      | "Asia/Macao"
      | "Asia/Macau"
      | "Asia/Magadan"
      | "Asia/Makassar"
      | "Asia/Manila"
      | "Asia/Muscat"
      | "Asia/Nicosia"
      | "Asia/Novokuznetsk"
      | "Asia/Novosibirsk"
      | "Asia/Omsk"
      | "Asia/Oral"
      | "Asia/Phnom_Penh"
      | "Asia/Pontianak"
      | "Asia/Pyongyang"
      | "Asia/Qatar"
      | "Asia/Qyzylorda"
      | "Asia/Rangoon"
      | "Asia/Riyadh"
      | "Asia/Saigon"
      | "Asia/Sakhalin"
      | "Asia/Samarkand"
      | "Asia/Seoul"
      | "Asia/Shanghai"
      | "Asia/Singapore"
      | "Asia/Srednekolymsk"
      | "Asia/Taipei"
      | "Asia/Tashkent"
      | "Asia/Tbilisi"
      | "Asia/Tehran"
      | "Asia/Tel_Aviv"
      | "Asia/Thimbu"
      | "Asia/Thimphu"
      | "Asia/Tokyo"
      | "Asia/Ujung_Pandang"
      | "Asia/Ulaanbaatar"
      | "Asia/Ulan_Bator"
      | "Asia/Urumqi"
      | "Asia/Ust-Nera"
      | "Asia/Vientiane"
      | "Asia/Vladivostok"
      | "Asia/Yakutsk"
      | "Asia/Yekaterinburg"
      | "Asia/Yerevan"
      | "Atlantic/Azores"
      | "Atlantic/Bermuda"
      | "Atlantic/Canary"
      | "Atlantic/Cape_Verde"
      | "Atlantic/Faeroe"
      | "Atlantic/Faroe"
      | "Atlantic/Jan_Mayen"
      | "Atlantic/Madeira"
      | "Atlantic/Reykjavik"
      | "Atlantic/South_Georgia"
      | "Atlantic/St_Helena"
      | "Atlantic/Stanley"
      | "Australia/ACT"
      | "Australia/Adelaide"
      | "Australia/Brisbane"
      | "Australia/Broken_Hill"
      | "Australia/Canberra"
      | "Australia/Currie"
      | "Australia/Darwin"
      | "Australia/Eucla"
      | "Australia/Hobart"
      | "Australia/LHI"
      | "Australia/Lindeman"
      | "Australia/Lord_Howe"
      | "Australia/Melbourne"
      | "Australia/NSW"
      | "Australia/North"
      | "Australia/Perth"
      | "Australia/Queensland"
      | "Australia/South"
      | "Australia/Sydney"
      | "Australia/Tasmania"
      | "Australia/Victoria"
      | "Australia/West"
      | "Australia/Yancowinna"
      | "Brazil/Acre"
      | "Brazil/DeNoronha"
      | "Brazil/East"
      | "Brazil/West"
      | "Canada/Atlantic"
      | "Canada/Central"
      | "Canada/East-Saskatchewan"
      | "Canada/Eastern"
      | "Canada/Mountain"
      | "Canada/Newfoundland"
      | "Canada/Pacific"
      | "Canada/Saskatchewan"
      | "Canada/Yukon"
      | "Chile/Continental"
      | "Chile/EasterIsland"
      | "Etc/GMT"
      | "Etc/GMT+0"
      | "Etc/GMT+1"
      | "Etc/GMT+10"
      | "Etc/GMT+11"
      | "Etc/GMT+12"
      | "Etc/GMT+2"
      | "Etc/GMT+3"
      | "Etc/GMT+4"
      | "Etc/GMT+5"
      | "Etc/GMT+6"
      | "Etc/GMT+7"
      | "Etc/GMT+8"
      | "Etc/GMT+9"
      | "Etc/GMT-0"
      | "Etc/GMT-1"
      | "Etc/GMT-10"
      | "Etc/GMT-11"
      | "Etc/GMT-12"
      | "Etc/GMT-13"
      | "Etc/GMT-14"
      | "Etc/GMT-2"
      | "Etc/GMT-3"
      | "Etc/GMT-4"
      | "Etc/GMT-5"
      | "Etc/GMT-6"
      | "Etc/GMT-7"
      | "Etc/GMT-8"
      | "Etc/GMT-9"
      | "Etc/Greenwich"
      | "Etc/UCT"
      | "Etc/UTC"
      | "Etc/Universal"
      | "Etc/Zulu"
      | "Europe/Amsterdam"
      | "Europe/Andorra"
      | "Europe/Athens"
      | "Europe/Belfast"
      | "Europe/Belgrade"
      | "Europe/Berlin"
      | "Europe/Bratislava"
      | "Europe/Brussels"
      | "Europe/Bucharest"
      | "Europe/Budapest"
      | "Europe/Busingen"
      | "Europe/Chisinau"
      | "Europe/Copenhagen"
      | "Europe/Dublin"
      | "Europe/Gibraltar"
      | "Europe/Guernsey"
      | "Europe/Helsinki"
      | "Europe/Isle_of_Man"
      | "Europe/Istanbul"
      | "Europe/Jersey"
      | "Europe/Kaliningrad"
      | "Europe/Kiev"
      | "Europe/Lisbon"
      | "Europe/Ljubljana"
      | "Europe/London"
      | "Europe/Luxembourg"
      | "Europe/Madrid"
      | "Europe/Malta"
      | "Europe/Mariehamn"
      | "Europe/Minsk"
      | "Europe/Monaco"
      | "Europe/Moscow"
      | "Europe/Nicosia"
      | "Europe/Oslo"
      | "Europe/Paris"
      | "Europe/Podgorica"
      | "Europe/Prague"
      | "Europe/Riga"
      | "Europe/Rome"
      | "Europe/Samara"
      | "Europe/San_Marino"
      | "Europe/Sarajevo"
      | "Europe/Simferopol"
      | "Europe/Skopje"
      | "Europe/Sofia"
      | "Europe/Stockholm"
      | "Europe/Tallinn"
      | "Europe/Tirane"
      | "Europe/Tiraspol"
      | "Europe/Uzhgorod"
      | "Europe/Vaduz"
      | "Europe/Vatican"
      | "Europe/Vienna"
      | "Europe/Vilnius"
      | "Europe/Volgograd"
      | "Europe/Warsaw"
      | "Europe/Zagreb"
      | "Europe/Zaporozhye"
      | "Europe/Zurich"
      | "Indian/Antananarivo"
      | "Indian/Chagos"
      | "Indian/Christmas"
      | "Indian/Cocos"
      | "Indian/Comoro"
      | "Indian/Kerguelen"
      | "Indian/Mahe"
      | "Indian/Maldives"
      | "Indian/Mauritius"
      | "Indian/Mayotte"
      | "Indian/Reunion"
      | "Mexico/BajaNorte"
      | "Mexico/BajaSur"
      | "Mexico/General"
      | "Pacific/Apia"
      | "Pacific/Auckland"
      | "Pacific/Chatham"
      | "Pacific/Chuuk"
      | "Pacific/Easter"
      | "Pacific/Efate"
      | "Pacific/Enderbury"
      | "Pacific/Fakaofo"
      | "Pacific/Fiji"
      | "Pacific/Funafuti"
      | "Pacific/Galapagos"
      | "Pacific/Gambier"
      | "Pacific/Guadalcanal"
      | "Pacific/Guam"
      | "Pacific/Honolulu"
      | "Pacific/Johnston"
      | "Pacific/Kiritimati"
      | "Pacific/Kosrae"
      | "Pacific/Kwajalein"
      | "Pacific/Majuro"
      | "Pacific/Marquesas"
      | "Pacific/Midway"
      | "Pacific/Nauru"
      | "Pacific/Niue"
      | "Pacific/Norfolk"
      | "Pacific/Noumea"
      | "Pacific/Pago_Pago"
      | "Pacific/Palau"
      | "Pacific/Pitcairn"
      | "Pacific/Pohnpei"
      | "Pacific/Ponape"
      | "Pacific/Port_Moresby"
      | "Pacific/Rarotonga"
      | "Pacific/Saipan"
      | "Pacific/Samoa"
      | "Pacific/Tahiti"
      | "Pacific/Tarawa"
      | "Pacific/Tongatapu"
      | "Pacific/Truk"
      | "Pacific/Wake"
      | "Pacific/Wallis"
      | "Pacific/Yap",
    created_at_gte?: Date,
    created_at_lte?: Date,
    types?: Array<
      | "charge"
      | "charge_failure_refund"
      | "dispute"
      | "dispute_won"
      | "refund"
      | "refund_failure"
      | "adjustment"
      | "commission"
      | "payout"
      | "payout_cancel"
      | "payout_failure"
      | "fee"
      | "platform_fee"
      | "platform_fee_refund"
      | "charge_fee"
      | "refund_fee"
      | "account_fee"
      | "payment_method_fee"
      | "tilled_fee"
    >,
    include_connected_accounts?: boolean,
    options: { headers: { [name: string]: string } } = { headers: {} }
  ): Promise<{
    response: http.IncomingMessage;
    body: BalanceTransactionsSummary;
  }> {
    const localVarPath = this.basePath + "/v1/balance-transactions/summary";
    let localVarQueryParameters: any = {};
    let localVarHeaderParams: any = (<any>Object).assign(
      {},
      this._defaultHeaders
    );
    const produces = ["application/json"];
    // give precedence to 'application/json'
    if (produces.indexOf("application/json") >= 0) {
      localVarHeaderParams.Accept = "application/json";
    } else {
      localVarHeaderParams.Accept = produces.join(",");
    }
    let localVarFormParams: any = {};

    // verify required parameter 'tilled_account' is not null or undefined
    if (tilled_account === null || tilled_account === undefined) {
      throw new Error(
        "Required parameter tilled_account was null or undefined when calling getBalanceTransactionsSummary."
      );
    }

    if (time_unit !== undefined) {
      localVarQueryParameters["time_unit"] = ObjectSerializer.serialize(
        time_unit,
        "'day' | 'month'"
      );
    }

    if (time_zone !== undefined) {
      localVarQueryParameters["time_zone"] = ObjectSerializer.serialize(
        time_zone,
        "'Africa/Abidjan' | 'Africa/Accra' | 'Africa/Addis_Ababa' | 'Africa/Algiers' | 'Africa/Asmara' | 'Africa/Asmera' | 'Africa/Bamako' | 'Africa/Bangui' | 'Africa/Banjul' | 'Africa/Bissau' | 'Africa/Blantyre' | 'Africa/Brazzaville' | 'Africa/Bujumbura' | 'Africa/Cairo' | 'Africa/Casablanca' | 'Africa/Ceuta' | 'Africa/Conakry' | 'Africa/Dakar' | 'Africa/Dar_es_Salaam' | 'Africa/Djibouti' | 'Africa/Douala' | 'Africa/El_Aaiun' | 'Africa/Freetown' | 'Africa/Gaborone' | 'Africa/Harare' | 'Africa/Johannesburg' | 'Africa/Juba' | 'Africa/Kampala' | 'Africa/Khartoum' | 'Africa/Kigali' | 'Africa/Kinshasa' | 'Africa/Lagos' | 'Africa/Libreville' | 'Africa/Lome' | 'Africa/Luanda' | 'Africa/Lubumbashi' | 'Africa/Lusaka' | 'Africa/Malabo' | 'Africa/Maputo' | 'Africa/Maseru' | 'Africa/Mbabane' | 'Africa/Mogadishu' | 'Africa/Monrovia' | 'Africa/Nairobi' | 'Africa/Ndjamena' | 'Africa/Niamey' | 'Africa/Nouakchott' | 'Africa/Ouagadougou' | 'Africa/Porto-Novo' | 'Africa/Sao_Tome' | 'Africa/Timbuktu' | 'Africa/Tripoli' | 'Africa/Tunis' | 'Africa/Windhoek' | 'America/Adak' | 'America/Anchorage' | 'America/Anguilla' | 'America/Antigua' | 'America/Araguaina' | 'America/Argentina/Buenos_Aires' | 'America/Argentina/Catamarca' | 'America/Argentina/ComodRivadavia' | 'America/Argentina/Cordoba' | 'America/Argentina/Jujuy' | 'America/Argentina/La_Rioja' | 'America/Argentina/Mendoza' | 'America/Argentina/Rio_Gallegos' | 'America/Argentina/Salta' | 'America/Argentina/San_Juan' | 'America/Argentina/San_Luis' | 'America/Argentina/Tucuman' | 'America/Argentina/Ushuaia' | 'America/Aruba' | 'America/Asuncion' | 'America/Atikokan' | 'America/Atka' | 'America/Bahia' | 'America/Bahia_Banderas' | 'America/Barbados' | 'America/Belem' | 'America/Belize' | 'America/Blanc-Sablon' | 'America/Boa_Vista' | 'America/Bogota' | 'America/Boise' | 'America/Buenos_Aires' | 'America/Cambridge_Bay' | 'America/Campo_Grande' | 'America/Cancun' | 'America/Caracas' | 'America/Catamarca' | 'America/Cayenne' | 'America/Cayman' | 'America/Chicago' | 'America/Chihuahua' | 'America/Coral_Harbour' | 'America/Cordoba' | 'America/Costa_Rica' | 'America/Creston' | 'America/Cuiaba' | 'America/Curacao' | 'America/Danmarkshavn' | 'America/Dawson' | 'America/Dawson_Creek' | 'America/Denver' | 'America/Detroit' | 'America/Dominica' | 'America/Edmonton' | 'America/Eirunepe' | 'America/El_Salvador' | 'America/Ensenada' | 'America/Fort_Wayne' | 'America/Fortaleza' | 'America/Glace_Bay' | 'America/Godthab' | 'America/Goose_Bay' | 'America/Grand_Turk' | 'America/Grenada' | 'America/Guadeloupe' | 'America/Guatemala' | 'America/Guayaquil' | 'America/Guyana' | 'America/Halifax' | 'America/Havana' | 'America/Hermosillo' | 'America/Indiana/Indianapolis' | 'America/Indiana/Knox' | 'America/Indiana/Marengo' | 'America/Indiana/Petersburg' | 'America/Indiana/Tell_City' | 'America/Indiana/Vevay' | 'America/Indiana/Vincennes' | 'America/Indiana/Winamac' | 'America/Indianapolis' | 'America/Inuvik' | 'America/Iqaluit' | 'America/Jamaica' | 'America/Jujuy' | 'America/Juneau' | 'America/Kentucky/Louisville' | 'America/Kentucky/Monticello' | 'America/Knox_IN' | 'America/Kralendijk' | 'America/La_Paz' | 'America/Lima' | 'America/Los_Angeles' | 'America/Louisville' | 'America/Lower_Princes' | 'America/Maceio' | 'America/Managua' | 'America/Manaus' | 'America/Marigot' | 'America/Martinique' | 'America/Matamoros' | 'America/Mazatlan' | 'America/Mendoza' | 'America/Menominee' | 'America/Merida' | 'America/Metlakatla' | 'America/Mexico_City' | 'America/Miquelon' | 'America/Moncton' | 'America/Monterrey' | 'America/Montevideo' | 'America/Montreal' | 'America/Montserrat' | 'America/Nassau' | 'America/New_York' | 'America/Nipigon' | 'America/Nome' | 'America/Noronha' | 'America/North_Dakota/Beulah' | 'America/North_Dakota/Center' | 'America/North_Dakota/New_Salem' | 'America/Ojinaga' | 'America/Panama' | 'America/Pangnirtung' | 'America/Paramaribo' | 'America/Phoenix' | 'America/Port-au-Prince' | 'America/Port_of_Spain' | 'America/Porto_Acre' | 'America/Porto_Velho' | 'America/Puerto_Rico' | 'America/Rainy_River' | 'America/Rankin_Inlet' | 'America/Recife' | 'America/Regina' | 'America/Resolute' | 'America/Rio_Branco' | 'America/Rosario' | 'America/Santa_Isabel' | 'America/Santarem' | 'America/Santiago' | 'America/Santo_Domingo' | 'America/Sao_Paulo' | 'America/Scoresbysund' | 'America/Shiprock' | 'America/Sitka' | 'America/St_Barthelemy' | 'America/St_Johns' | 'America/St_Kitts' | 'America/St_Lucia' | 'America/St_Thomas' | 'America/St_Vincent' | 'America/Swift_Current' | 'America/Tegucigalpa' | 'America/Thule' | 'America/Thunder_Bay' | 'America/Tijuana' | 'America/Toronto' | 'America/Tortola' | 'America/Vancouver' | 'America/Virgin' | 'America/Whitehorse' | 'America/Winnipeg' | 'America/Yakutat' | 'America/Yellowknife' | 'Antarctica/Casey' | 'Antarctica/Davis' | 'Antarctica/DumontDUrville' | 'Antarctica/Macquarie' | 'Antarctica/Mawson' | 'Antarctica/McMurdo' | 'Antarctica/Palmer' | 'Antarctica/Rothera' | 'Antarctica/South_Pole' | 'Antarctica/Syowa' | 'Antarctica/Troll' | 'Antarctica/Vostok' | 'Arctic/Longyearbyen' | 'Asia/Aden' | 'Asia/Almaty' | 'Asia/Amman' | 'Asia/Anadyr' | 'Asia/Aqtau' | 'Asia/Aqtobe' | 'Asia/Ashgabat' | 'Asia/Ashkhabad' | 'Asia/Baghdad' | 'Asia/Bahrain' | 'Asia/Baku' | 'Asia/Bangkok' | 'Asia/Beirut' | 'Asia/Bishkek' | 'Asia/Brunei' | 'Asia/Calcutta' | 'Asia/Chita' | 'Asia/Choibalsan' | 'Asia/Chongqing' | 'Asia/Chungking' | 'Asia/Colombo' | 'Asia/Dacca' | 'Asia/Damascus' | 'Asia/Dhaka' | 'Asia/Dili' | 'Asia/Dubai' | 'Asia/Dushanbe' | 'Asia/Gaza' | 'Asia/Harbin' | 'Asia/Hebron' | 'Asia/Ho_Chi_Minh' | 'Asia/Hong_Kong' | 'Asia/Hovd' | 'Asia/Irkutsk' | 'Asia/Istanbul' | 'Asia/Jakarta' | 'Asia/Jayapura' | 'Asia/Jerusalem' | 'Asia/Kabul' | 'Asia/Kamchatka' | 'Asia/Karachi' | 'Asia/Kashgar' | 'Asia/Kathmandu' | 'Asia/Katmandu' | 'Asia/Khandyga' | 'Asia/Kolkata' | 'Asia/Krasnoyarsk' | 'Asia/Kuala_Lumpur' | 'Asia/Kuching' | 'Asia/Kuwait' | 'Asia/Macao' | 'Asia/Macau' | 'Asia/Magadan' | 'Asia/Makassar' | 'Asia/Manila' | 'Asia/Muscat' | 'Asia/Nicosia' | 'Asia/Novokuznetsk' | 'Asia/Novosibirsk' | 'Asia/Omsk' | 'Asia/Oral' | 'Asia/Phnom_Penh' | 'Asia/Pontianak' | 'Asia/Pyongyang' | 'Asia/Qatar' | 'Asia/Qyzylorda' | 'Asia/Rangoon' | 'Asia/Riyadh' | 'Asia/Saigon' | 'Asia/Sakhalin' | 'Asia/Samarkand' | 'Asia/Seoul' | 'Asia/Shanghai' | 'Asia/Singapore' | 'Asia/Srednekolymsk' | 'Asia/Taipei' | 'Asia/Tashkent' | 'Asia/Tbilisi' | 'Asia/Tehran' | 'Asia/Tel_Aviv' | 'Asia/Thimbu' | 'Asia/Thimphu' | 'Asia/Tokyo' | 'Asia/Ujung_Pandang' | 'Asia/Ulaanbaatar' | 'Asia/Ulan_Bator' | 'Asia/Urumqi' | 'Asia/Ust-Nera' | 'Asia/Vientiane' | 'Asia/Vladivostok' | 'Asia/Yakutsk' | 'Asia/Yekaterinburg' | 'Asia/Yerevan' | 'Atlantic/Azores' | 'Atlantic/Bermuda' | 'Atlantic/Canary' | 'Atlantic/Cape_Verde' | 'Atlantic/Faeroe' | 'Atlantic/Faroe' | 'Atlantic/Jan_Mayen' | 'Atlantic/Madeira' | 'Atlantic/Reykjavik' | 'Atlantic/South_Georgia' | 'Atlantic/St_Helena' | 'Atlantic/Stanley' | 'Australia/ACT' | 'Australia/Adelaide' | 'Australia/Brisbane' | 'Australia/Broken_Hill' | 'Australia/Canberra' | 'Australia/Currie' | 'Australia/Darwin' | 'Australia/Eucla' | 'Australia/Hobart' | 'Australia/LHI' | 'Australia/Lindeman' | 'Australia/Lord_Howe' | 'Australia/Melbourne' | 'Australia/NSW' | 'Australia/North' | 'Australia/Perth' | 'Australia/Queensland' | 'Australia/South' | 'Australia/Sydney' | 'Australia/Tasmania' | 'Australia/Victoria' | 'Australia/West' | 'Australia/Yancowinna' | 'Brazil/Acre' | 'Brazil/DeNoronha' | 'Brazil/East' | 'Brazil/West' | 'Canada/Atlantic' | 'Canada/Central' | 'Canada/East-Saskatchewan' | 'Canada/Eastern' | 'Canada/Mountain' | 'Canada/Newfoundland' | 'Canada/Pacific' | 'Canada/Saskatchewan' | 'Canada/Yukon' | 'Chile/Continental' | 'Chile/EasterIsland' | 'Etc/GMT' | 'Etc/GMT+0' | 'Etc/GMT+1' | 'Etc/GMT+10' | 'Etc/GMT+11' | 'Etc/GMT+12' | 'Etc/GMT+2' | 'Etc/GMT+3' | 'Etc/GMT+4' | 'Etc/GMT+5' | 'Etc/GMT+6' | 'Etc/GMT+7' | 'Etc/GMT+8' | 'Etc/GMT+9' | 'Etc/GMT-0' | 'Etc/GMT-1' | 'Etc/GMT-10' | 'Etc/GMT-11' | 'Etc/GMT-12' | 'Etc/GMT-13' | 'Etc/GMT-14' | 'Etc/GMT-2' | 'Etc/GMT-3' | 'Etc/GMT-4' | 'Etc/GMT-5' | 'Etc/GMT-6' | 'Etc/GMT-7' | 'Etc/GMT-8' | 'Etc/GMT-9' | 'Etc/Greenwich' | 'Etc/UCT' | 'Etc/UTC' | 'Etc/Universal' | 'Etc/Zulu' | 'Europe/Amsterdam' | 'Europe/Andorra' | 'Europe/Athens' | 'Europe/Belfast' | 'Europe/Belgrade' | 'Europe/Berlin' | 'Europe/Bratislava' | 'Europe/Brussels' | 'Europe/Bucharest' | 'Europe/Budapest' | 'Europe/Busingen' | 'Europe/Chisinau' | 'Europe/Copenhagen' | 'Europe/Dublin' | 'Europe/Gibraltar' | 'Europe/Guernsey' | 'Europe/Helsinki' | 'Europe/Isle_of_Man' | 'Europe/Istanbul' | 'Europe/Jersey' | 'Europe/Kaliningrad' | 'Europe/Kiev' | 'Europe/Lisbon' | 'Europe/Ljubljana' | 'Europe/London' | 'Europe/Luxembourg' | 'Europe/Madrid' | 'Europe/Malta' | 'Europe/Mariehamn' | 'Europe/Minsk' | 'Europe/Monaco' | 'Europe/Moscow' | 'Europe/Nicosia' | 'Europe/Oslo' | 'Europe/Paris' | 'Europe/Podgorica' | 'Europe/Prague' | 'Europe/Riga' | 'Europe/Rome' | 'Europe/Samara' | 'Europe/San_Marino' | 'Europe/Sarajevo' | 'Europe/Simferopol' | 'Europe/Skopje' | 'Europe/Sofia' | 'Europe/Stockholm' | 'Europe/Tallinn' | 'Europe/Tirane' | 'Europe/Tiraspol' | 'Europe/Uzhgorod' | 'Europe/Vaduz' | 'Europe/Vatican' | 'Europe/Vienna' | 'Europe/Vilnius' | 'Europe/Volgograd' | 'Europe/Warsaw' | 'Europe/Zagreb' | 'Europe/Zaporozhye' | 'Europe/Zurich' | 'Indian/Antananarivo' | 'Indian/Chagos' | 'Indian/Christmas' | 'Indian/Cocos' | 'Indian/Comoro' | 'Indian/Kerguelen' | 'Indian/Mahe' | 'Indian/Maldives' | 'Indian/Mauritius' | 'Indian/Mayotte' | 'Indian/Reunion' | 'Mexico/BajaNorte' | 'Mexico/BajaSur' | 'Mexico/General' | 'Pacific/Apia' | 'Pacific/Auckland' | 'Pacific/Chatham' | 'Pacific/Chuuk' | 'Pacific/Easter' | 'Pacific/Efate' | 'Pacific/Enderbury' | 'Pacific/Fakaofo' | 'Pacific/Fiji' | 'Pacific/Funafuti' | 'Pacific/Galapagos' | 'Pacific/Gambier' | 'Pacific/Guadalcanal' | 'Pacific/Guam' | 'Pacific/Honolulu' | 'Pacific/Johnston' | 'Pacific/Kiritimati' | 'Pacific/Kosrae' | 'Pacific/Kwajalein' | 'Pacific/Majuro' | 'Pacific/Marquesas' | 'Pacific/Midway' | 'Pacific/Nauru' | 'Pacific/Niue' | 'Pacific/Norfolk' | 'Pacific/Noumea' | 'Pacific/Pago_Pago' | 'Pacific/Palau' | 'Pacific/Pitcairn' | 'Pacific/Pohnpei' | 'Pacific/Ponape' | 'Pacific/Port_Moresby' | 'Pacific/Rarotonga' | 'Pacific/Saipan' | 'Pacific/Samoa' | 'Pacific/Tahiti' | 'Pacific/Tarawa' | 'Pacific/Tongatapu' | 'Pacific/Truk' | 'Pacific/Wake' | 'Pacific/Wallis' | 'Pacific/Yap'"
      );
    }

    if (created_at_gte !== undefined) {
      localVarQueryParameters["created_at_gte"] = ObjectSerializer.serialize(
        created_at_gte,
        "Date"
      );
    }

    if (created_at_lte !== undefined) {
      localVarQueryParameters["created_at_lte"] = ObjectSerializer.serialize(
        created_at_lte,
        "Date"
      );
    }

    if (types !== undefined) {
      localVarQueryParameters["types"] = ObjectSerializer.serialize(
        types,
        "Array<'charge' | 'charge_failure_refund' | 'dispute' | 'dispute_won' | 'refund' | 'refund_failure' | 'adjustment' | 'commission' | 'payout' | 'payout_cancel' | 'payout_failure' | 'fee' | 'platform_fee' | 'platform_fee_refund' | 'charge_fee' | 'refund_fee' | 'account_fee' | 'payment_method_fee' | 'tilled_fee'>"
      );
    }

    if (include_connected_accounts !== undefined) {
      localVarQueryParameters["include_connected_accounts"] =
        ObjectSerializer.serialize(include_connected_accounts, "boolean");
    }

    localVarHeaderParams["tilled-account"] = ObjectSerializer.serialize(
      tilled_account,
      "string"
    );
    (<any>Object).assign(localVarHeaderParams, options.headers);

    let localVarUseFormData = false;

    let localVarRequestOptions: localVarRequest.Options = {
      method: "GET",
      qs: localVarQueryParameters,
      headers: localVarHeaderParams,
      uri: localVarPath,
      useQuerystring: this._useQuerystring,
      json: true,
    };

    let authenticationPromise = Promise.resolve();
    if (this.authentications.JWT.accessToken) {
      authenticationPromise = authenticationPromise.then(() =>
        this.authentications.JWT.applyToRequest(localVarRequestOptions)
      );
    }
    if (this.authentications.TilledApiKey.apiKey) {
      authenticationPromise = authenticationPromise.then(() =>
        this.authentications.TilledApiKey.applyToRequest(localVarRequestOptions)
      );
    }
    authenticationPromise = authenticationPromise.then(() =>
      this.authentications.default.applyToRequest(localVarRequestOptions)
    );

    let interceptorPromise = authenticationPromise;
    for (const interceptor of this.interceptors) {
      interceptorPromise = interceptorPromise.then(() =>
        interceptor(localVarRequestOptions)
      );
    }

    return interceptorPromise.then(() => {
      if (Object.keys(localVarFormParams).length) {
        if (localVarUseFormData) {
          (<any>localVarRequestOptions).formData = localVarFormParams;
        } else {
          localVarRequestOptions.form = localVarFormParams;
        }
      }
      return new Promise<{
        response: http.IncomingMessage;
        body: BalanceTransactionsSummary;
      }>((resolve, reject) => {
        localVarRequest(localVarRequestOptions, (error, response, body) => {
          if (error) {
            reject(error);
          } else {
            if (
              response.statusCode &&
              response.statusCode >= 200 &&
              response.statusCode <= 299
            ) {
              body = ObjectSerializer.deserialize(
                body,
                "BalanceTransactionsSummary"
              );
              resolve({ response: response, body: body });
            } else {
              reject(new HttpError(response, body, response.statusCode));
            }
          }
        });
      });
    });
  }
  /**
   * Returns a list of transactions that have contributed to the Tilled account balance (e.g. charges, refunds, and so forth). The transactions are returned in sorted order, with the most recent transactions appearing first.
   * @summary List all Balance Transactions
   * @param tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @param created_at_gte Minimum &#x60;created_at&#x60; value to filter by (inclusive).
   * @param created_at_lte Maximum &#x60;created_at&#x60; value to filter by (inclusive).
   * @param type Only return transaction of the given type.
   * @param source_id Only returns the original transaction.
   * @param payout_id Only returns transactions that were paid out on the specified payout ID.
   * @param offset The (zero-based) offset of the first item in the collection to return.
   * @param limit The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
   */
  public async listBalanceTransactions(
    tilled_account: string,
    created_at_gte?: Date,
    created_at_lte?: Date,
    type?:
      | "charge"
      | "charge_failure_refund"
      | "dispute"
      | "dispute_won"
      | "refund"
      | "refund_failure"
      | "adjustment"
      | "commission"
      | "payout"
      | "payout_cancel"
      | "payout_failure"
      | "fee"
      | "platform_fee"
      | "platform_fee_refund"
      | "charge_fee"
      | "refund_fee"
      | "account_fee"
      | "payment_method_fee"
      | "tilled_fee",
    source_id?: string,
    payout_id?: string,
    offset?: number,
    limit?: number,
    options: { headers: { [name: string]: string } } = { headers: {} }
  ): Promise<{
    response: http.IncomingMessage;
    body: ListBalanceTransactions200Response;
  }> {
    const localVarPath = this.basePath + "/v1/balance-transactions";
    let localVarQueryParameters: any = {};
    let localVarHeaderParams: any = (<any>Object).assign(
      {},
      this._defaultHeaders
    );
    const produces = ["application/json"];
    // give precedence to 'application/json'
    if (produces.indexOf("application/json") >= 0) {
      localVarHeaderParams.Accept = "application/json";
    } else {
      localVarHeaderParams.Accept = produces.join(",");
    }
    let localVarFormParams: any = {};

    // verify required parameter 'tilled_account' is not null or undefined
    if (tilled_account === null || tilled_account === undefined) {
      throw new Error(
        "Required parameter tilled_account was null or undefined when calling listBalanceTransactions."
      );
    }

    if (created_at_gte !== undefined) {
      localVarQueryParameters["created_at_gte"] = ObjectSerializer.serialize(
        created_at_gte,
        "Date"
      );
    }

    if (created_at_lte !== undefined) {
      localVarQueryParameters["created_at_lte"] = ObjectSerializer.serialize(
        created_at_lte,
        "Date"
      );
    }

    if (type !== undefined) {
      localVarQueryParameters["type"] = ObjectSerializer.serialize(
        type,
        "'charge' | 'charge_failure_refund' | 'dispute' | 'dispute_won' | 'refund' | 'refund_failure' | 'adjustment' | 'commission' | 'payout' | 'payout_cancel' | 'payout_failure' | 'fee' | 'platform_fee' | 'platform_fee_refund' | 'charge_fee' | 'refund_fee' | 'account_fee' | 'payment_method_fee' | 'tilled_fee'"
      );
    }

    if (source_id !== undefined) {
      localVarQueryParameters["source_id"] = ObjectSerializer.serialize(
        source_id,
        "string"
      );
    }

    if (payout_id !== undefined) {
      localVarQueryParameters["payout_id"] = ObjectSerializer.serialize(
        payout_id,
        "string"
      );
    }

    if (offset !== undefined) {
      localVarQueryParameters["offset"] = ObjectSerializer.serialize(
        offset,
        "number"
      );
    }

    if (limit !== undefined) {
      localVarQueryParameters["limit"] = ObjectSerializer.serialize(
        limit,
        "number"
      );
    }

    localVarHeaderParams["tilled-account"] = ObjectSerializer.serialize(
      tilled_account,
      "string"
    );
    (<any>Object).assign(localVarHeaderParams, options.headers);

    let localVarUseFormData = false;

    let localVarRequestOptions: localVarRequest.Options = {
      method: "GET",
      qs: localVarQueryParameters,
      headers: localVarHeaderParams,
      uri: localVarPath,
      useQuerystring: this._useQuerystring,
      json: true,
    };

    let authenticationPromise = Promise.resolve();
    if (this.authentications.JWT.accessToken) {
      authenticationPromise = authenticationPromise.then(() =>
        this.authentications.JWT.applyToRequest(localVarRequestOptions)
      );
    }
    if (this.authentications.TilledApiKey.apiKey) {
      authenticationPromise = authenticationPromise.then(() =>
        this.authentications.TilledApiKey.applyToRequest(localVarRequestOptions)
      );
    }
    authenticationPromise = authenticationPromise.then(() =>
      this.authentications.default.applyToRequest(localVarRequestOptions)
    );

    let interceptorPromise = authenticationPromise;
    for (const interceptor of this.interceptors) {
      interceptorPromise = interceptorPromise.then(() =>
        interceptor(localVarRequestOptions)
      );
    }

    return interceptorPromise.then(() => {
      if (Object.keys(localVarFormParams).length) {
        if (localVarUseFormData) {
          (<any>localVarRequestOptions).formData = localVarFormParams;
        } else {
          localVarRequestOptions.form = localVarFormParams;
        }
      }
      return new Promise<{
        response: http.IncomingMessage;
        body: ListBalanceTransactions200Response;
      }>((resolve, reject) => {
        localVarRequest(localVarRequestOptions, (error, response, body) => {
          if (error) {
            reject(error);
          } else {
            if (
              response.statusCode &&
              response.statusCode >= 200 &&
              response.statusCode <= 299
            ) {
              body = ObjectSerializer.deserialize(
                body,
                "ListBalanceTransactions200Response"
              );
              resolve({ response: response, body: body });
            } else {
              reject(new HttpError(response, body, response.statusCode));
            }
          }
        });
      });
    });
  }
}
