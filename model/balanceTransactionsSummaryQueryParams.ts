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

export class BalanceTransactionsSummaryQueryParams {
  /**
   * String indicating the unit of time to aggregate the summary of data.
   */
  "time_unit"?: BalanceTransactionsSummaryQueryParams.TimeUnit =
    BalanceTransactionsSummaryQueryParams.TimeUnit.MONTH;
  /**
   * Time Zone by which to aggregate the results.
   */
  "time_zone"?: BalanceTransactionsSummaryQueryParams.TimeZone =
    BalanceTransactionsSummaryQueryParams.TimeZone.AMERICA_CHICAGO;
  /**
   * Minimum `created_at` value to filter by (inclusive). Defaults to the beginning of the current month.
   */
  "created_at_gte"?: Date;
  /**
   * Maximum `created_at` value to filter by (inclusive). Defaults to midnight tonight.
   */
  "created_at_lte"?: Date;
  /**
   * An array containing specific balance transaction types. The data will be filtered to include only transactions with a matching type property.
   */
  "types"?: Array<BalanceTransactionsSummaryQueryParams.Types>;
  /**
   * Whether or not to include the results from any connected accounts.
   */
  "include_connected_accounts"?: boolean = false;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{
    name: string;
    baseName: string;
    type: string;
  }> = [
    {
      name: "time_unit",
      baseName: "time_unit",
      type: "BalanceTransactionsSummaryQueryParams.TimeUnit",
    },
    {
      name: "time_zone",
      baseName: "time_zone",
      type: "BalanceTransactionsSummaryQueryParams.TimeZone",
    },
    {
      name: "created_at_gte",
      baseName: "created_at_gte",
      type: "Date",
    },
    {
      name: "created_at_lte",
      baseName: "created_at_lte",
      type: "Date",
    },
    {
      name: "types",
      baseName: "types",
      type: "Array<BalanceTransactionsSummaryQueryParams.Types>",
    },
    {
      name: "include_connected_accounts",
      baseName: "include_connected_accounts",
      type: "boolean",
    },
  ];

  static getAttributeTypeMap() {
    return BalanceTransactionsSummaryQueryParams.attributeTypeMap;
  }
}

export namespace BalanceTransactionsSummaryQueryParams {
  export enum TimeUnit {
    DAY = <any>"day",
    MONTH = <any>"month",
  }
  export enum TimeZone {
    AFRICA_ABIDJAN = <any>"Africa/Abidjan",
    AFRICA_ACCRA = <any>"Africa/Accra",
    AFRICA_ADDIS_ABABA = <any>"Africa/Addis_Ababa",
    AFRICA_ALGIERS = <any>"Africa/Algiers",
    AFRICA_ASMARA = <any>"Africa/Asmara",
    AFRICA_ASMERA = <any>"Africa/Asmera",
    AFRICA_BAMAKO = <any>"Africa/Bamako",
    AFRICA_BANGUI = <any>"Africa/Bangui",
    AFRICA_BANJUL = <any>"Africa/Banjul",
    AFRICA_BISSAU = <any>"Africa/Bissau",
    AFRICA_BLANTYRE = <any>"Africa/Blantyre",
    AFRICA_BRAZZAVILLE = <any>"Africa/Brazzaville",
    AFRICA_BUJUMBURA = <any>"Africa/Bujumbura",
    AFRICA_CAIRO = <any>"Africa/Cairo",
    AFRICA_CASABLANCA = <any>"Africa/Casablanca",
    AFRICA_CEUTA = <any>"Africa/Ceuta",
    AFRICA_CONAKRY = <any>"Africa/Conakry",
    AFRICA_DAKAR = <any>"Africa/Dakar",
    AFRICA_DAR_ES_SALAAM = <any>"Africa/Dar_es_Salaam",
    AFRICA_DJIBOUTI = <any>"Africa/Djibouti",
    AFRICA_DOUALA = <any>"Africa/Douala",
    AFRICA_EL_AAIUN = <any>"Africa/El_Aaiun",
    AFRICA_FREETOWN = <any>"Africa/Freetown",
    AFRICA_GABORONE = <any>"Africa/Gaborone",
    AFRICA_HARARE = <any>"Africa/Harare",
    AFRICA_JOHANNESBURG = <any>"Africa/Johannesburg",
    AFRICA_JUBA = <any>"Africa/Juba",
    AFRICA_KAMPALA = <any>"Africa/Kampala",
    AFRICA_KHARTOUM = <any>"Africa/Khartoum",
    AFRICA_KIGALI = <any>"Africa/Kigali",
    AFRICA_KINSHASA = <any>"Africa/Kinshasa",
    AFRICA_LAGOS = <any>"Africa/Lagos",
    AFRICA_LIBREVILLE = <any>"Africa/Libreville",
    AFRICA_LOME = <any>"Africa/Lome",
    AFRICA_LUANDA = <any>"Africa/Luanda",
    AFRICA_LUBUMBASHI = <any>"Africa/Lubumbashi",
    AFRICA_LUSAKA = <any>"Africa/Lusaka",
    AFRICA_MALABO = <any>"Africa/Malabo",
    AFRICA_MAPUTO = <any>"Africa/Maputo",
    AFRICA_MASERU = <any>"Africa/Maseru",
    AFRICA_MBABANE = <any>"Africa/Mbabane",
    AFRICA_MOGADISHU = <any>"Africa/Mogadishu",
    AFRICA_MONROVIA = <any>"Africa/Monrovia",
    AFRICA_NAIROBI = <any>"Africa/Nairobi",
    AFRICA_NDJAMENA = <any>"Africa/Ndjamena",
    AFRICA_NIAMEY = <any>"Africa/Niamey",
    AFRICA_NOUAKCHOTT = <any>"Africa/Nouakchott",
    AFRICA_OUAGADOUGOU = <any>"Africa/Ouagadougou",
    AFRICA_PORTO_NOVO = <any>"Africa/Porto-Novo",
    AFRICA_SAO_TOME = <any>"Africa/Sao_Tome",
    AFRICA_TIMBUKTU = <any>"Africa/Timbuktu",
    AFRICA_TRIPOLI = <any>"Africa/Tripoli",
    AFRICA_TUNIS = <any>"Africa/Tunis",
    AFRICA_WINDHOEK = <any>"Africa/Windhoek",
    AMERICA_ADAK = <any>"America/Adak",
    AMERICA_ANCHORAGE = <any>"America/Anchorage",
    AMERICA_ANGUILLA = <any>"America/Anguilla",
    AMERICA_ANTIGUA = <any>"America/Antigua",
    AMERICA_ARAGUAINA = <any>"America/Araguaina",
    AMERICA_ARGENTINA_BUENOS_AIRES = <any>"America/Argentina/Buenos_Aires",
    AMERICA_ARGENTINA_CATAMARCA = <any>"America/Argentina/Catamarca",
    AMERICA_ARGENTINA_COMOD_RIVADAVIA = <any>"America/Argentina/ComodRivadavia",
    AMERICA_ARGENTINA_CORDOBA = <any>"America/Argentina/Cordoba",
    AMERICA_ARGENTINA_JUJUY = <any>"America/Argentina/Jujuy",
    AMERICA_ARGENTINA_LA_RIOJA = <any>"America/Argentina/La_Rioja",
    AMERICA_ARGENTINA_MENDOZA = <any>"America/Argentina/Mendoza",
    AMERICA_ARGENTINA_RIO_GALLEGOS = <any>"America/Argentina/Rio_Gallegos",
    AMERICA_ARGENTINA_SALTA = <any>"America/Argentina/Salta",
    AMERICA_ARGENTINA_SAN_JUAN = <any>"America/Argentina/San_Juan",
    AMERICA_ARGENTINA_SAN_LUIS = <any>"America/Argentina/San_Luis",
    AMERICA_ARGENTINA_TUCUMAN = <any>"America/Argentina/Tucuman",
    AMERICA_ARGENTINA_USHUAIA = <any>"America/Argentina/Ushuaia",
    AMERICA_ARUBA = <any>"America/Aruba",
    AMERICA_ASUNCION = <any>"America/Asuncion",
    AMERICA_ATIKOKAN = <any>"America/Atikokan",
    AMERICA_ATKA = <any>"America/Atka",
    AMERICA_BAHIA = <any>"America/Bahia",
    AMERICA_BAHIA_BANDERAS = <any>"America/Bahia_Banderas",
    AMERICA_BARBADOS = <any>"America/Barbados",
    AMERICA_BELEM = <any>"America/Belem",
    AMERICA_BELIZE = <any>"America/Belize",
    AMERICA_BLANC_SABLON = <any>"America/Blanc-Sablon",
    AMERICA_BOA_VISTA = <any>"America/Boa_Vista",
    AMERICA_BOGOTA = <any>"America/Bogota",
    AMERICA_BOISE = <any>"America/Boise",
    AMERICA_BUENOS_AIRES = <any>"America/Buenos_Aires",
    AMERICA_CAMBRIDGE_BAY = <any>"America/Cambridge_Bay",
    AMERICA_CAMPO_GRANDE = <any>"America/Campo_Grande",
    AMERICA_CANCUN = <any>"America/Cancun",
    AMERICA_CARACAS = <any>"America/Caracas",
    AMERICA_CATAMARCA = <any>"America/Catamarca",
    AMERICA_CAYENNE = <any>"America/Cayenne",
    AMERICA_CAYMAN = <any>"America/Cayman",
    AMERICA_CHICAGO = <any>"America/Chicago",
    AMERICA_CHIHUAHUA = <any>"America/Chihuahua",
    AMERICA_CORAL_HARBOUR = <any>"America/Coral_Harbour",
    AMERICA_CORDOBA = <any>"America/Cordoba",
    AMERICA_COSTA_RICA = <any>"America/Costa_Rica",
    AMERICA_CRESTON = <any>"America/Creston",
    AMERICA_CUIABA = <any>"America/Cuiaba",
    AMERICA_CURACAO = <any>"America/Curacao",
    AMERICA_DANMARKSHAVN = <any>"America/Danmarkshavn",
    AMERICA_DAWSON = <any>"America/Dawson",
    AMERICA_DAWSON_CREEK = <any>"America/Dawson_Creek",
    AMERICA_DENVER = <any>"America/Denver",
    AMERICA_DETROIT = <any>"America/Detroit",
    AMERICA_DOMINICA = <any>"America/Dominica",
    AMERICA_EDMONTON = <any>"America/Edmonton",
    AMERICA_EIRUNEPE = <any>"America/Eirunepe",
    AMERICA_EL_SALVADOR = <any>"America/El_Salvador",
    AMERICA_ENSENADA = <any>"America/Ensenada",
    AMERICA_FORT_WAYNE = <any>"America/Fort_Wayne",
    AMERICA_FORTALEZA = <any>"America/Fortaleza",
    AMERICA_GLACE_BAY = <any>"America/Glace_Bay",
    AMERICA_GODTHAB = <any>"America/Godthab",
    AMERICA_GOOSE_BAY = <any>"America/Goose_Bay",
    AMERICA_GRAND_TURK = <any>"America/Grand_Turk",
    AMERICA_GRENADA = <any>"America/Grenada",
    AMERICA_GUADELOUPE = <any>"America/Guadeloupe",
    AMERICA_GUATEMALA = <any>"America/Guatemala",
    AMERICA_GUAYAQUIL = <any>"America/Guayaquil",
    AMERICA_GUYANA = <any>"America/Guyana",
    AMERICA_HALIFAX = <any>"America/Halifax",
    AMERICA_HAVANA = <any>"America/Havana",
    AMERICA_HERMOSILLO = <any>"America/Hermosillo",
    AMERICA_INDIANA_INDIANAPOLIS = <any>"America/Indiana/Indianapolis",
    AMERICA_INDIANA_KNOX = <any>"America/Indiana/Knox",
    AMERICA_INDIANA_MARENGO = <any>"America/Indiana/Marengo",
    AMERICA_INDIANA_PETERSBURG = <any>"America/Indiana/Petersburg",
    AMERICA_INDIANA_TELL_CITY = <any>"America/Indiana/Tell_City",
    AMERICA_INDIANA_VEVAY = <any>"America/Indiana/Vevay",
    AMERICA_INDIANA_VINCENNES = <any>"America/Indiana/Vincennes",
    AMERICA_INDIANA_WINAMAC = <any>"America/Indiana/Winamac",
    AMERICA_INDIANAPOLIS = <any>"America/Indianapolis",
    AMERICA_INUVIK = <any>"America/Inuvik",
    AMERICA_IQALUIT = <any>"America/Iqaluit",
    AMERICA_JAMAICA = <any>"America/Jamaica",
    AMERICA_JUJUY = <any>"America/Jujuy",
    AMERICA_JUNEAU = <any>"America/Juneau",
    AMERICA_KENTUCKY_LOUISVILLE = <any>"America/Kentucky/Louisville",
    AMERICA_KENTUCKY_MONTICELLO = <any>"America/Kentucky/Monticello",
    AMERICA_KNOX_IN = <any>"America/Knox_IN",
    AMERICA_KRALENDIJK = <any>"America/Kralendijk",
    AMERICA_LA_PAZ = <any>"America/La_Paz",
    AMERICA_LIMA = <any>"America/Lima",
    AMERICA_LOS_ANGELES = <any>"America/Los_Angeles",
    AMERICA_LOUISVILLE = <any>"America/Louisville",
    AMERICA_LOWER_PRINCES = <any>"America/Lower_Princes",
    AMERICA_MACEIO = <any>"America/Maceio",
    AMERICA_MANAGUA = <any>"America/Managua",
    AMERICA_MANAUS = <any>"America/Manaus",
    AMERICA_MARIGOT = <any>"America/Marigot",
    AMERICA_MARTINIQUE = <any>"America/Martinique",
    AMERICA_MATAMOROS = <any>"America/Matamoros",
    AMERICA_MAZATLAN = <any>"America/Mazatlan",
    AMERICA_MENDOZA = <any>"America/Mendoza",
    AMERICA_MENOMINEE = <any>"America/Menominee",
    AMERICA_MERIDA = <any>"America/Merida",
    AMERICA_METLAKATLA = <any>"America/Metlakatla",
    AMERICA_MEXICO_CITY = <any>"America/Mexico_City",
    AMERICA_MIQUELON = <any>"America/Miquelon",
    AMERICA_MONCTON = <any>"America/Moncton",
    AMERICA_MONTERREY = <any>"America/Monterrey",
    AMERICA_MONTEVIDEO = <any>"America/Montevideo",
    AMERICA_MONTREAL = <any>"America/Montreal",
    AMERICA_MONTSERRAT = <any>"America/Montserrat",
    AMERICA_NASSAU = <any>"America/Nassau",
    AMERICA_NEW_YORK = <any>"America/New_York",
    AMERICA_NIPIGON = <any>"America/Nipigon",
    AMERICA_NOME = <any>"America/Nome",
    AMERICA_NORONHA = <any>"America/Noronha",
    AMERICA_NORTH_DAKOTA_BEULAH = <any>"America/North_Dakota/Beulah",
    AMERICA_NORTH_DAKOTA_CENTER = <any>"America/North_Dakota/Center",
    AMERICA_NORTH_DAKOTA_NEW_SALEM = <any>"America/North_Dakota/New_Salem",
    AMERICA_OJINAGA = <any>"America/Ojinaga",
    AMERICA_PANAMA = <any>"America/Panama",
    AMERICA_PANGNIRTUNG = <any>"America/Pangnirtung",
    AMERICA_PARAMARIBO = <any>"America/Paramaribo",
    AMERICA_PHOENIX = <any>"America/Phoenix",
    AMERICA_PORT_AU_PRINCE = <any>"America/Port-au-Prince",
    AMERICA_PORT_OF_SPAIN = <any>"America/Port_of_Spain",
    AMERICA_PORTO_ACRE = <any>"America/Porto_Acre",
    AMERICA_PORTO_VELHO = <any>"America/Porto_Velho",
    AMERICA_PUERTO_RICO = <any>"America/Puerto_Rico",
    AMERICA_RAINY_RIVER = <any>"America/Rainy_River",
    AMERICA_RANKIN_INLET = <any>"America/Rankin_Inlet",
    AMERICA_RECIFE = <any>"America/Recife",
    AMERICA_REGINA = <any>"America/Regina",
    AMERICA_RESOLUTE = <any>"America/Resolute",
    AMERICA_RIO_BRANCO = <any>"America/Rio_Branco",
    AMERICA_ROSARIO = <any>"America/Rosario",
    AMERICA_SANTA_ISABEL = <any>"America/Santa_Isabel",
    AMERICA_SANTAREM = <any>"America/Santarem",
    AMERICA_SANTIAGO = <any>"America/Santiago",
    AMERICA_SANTO_DOMINGO = <any>"America/Santo_Domingo",
    AMERICA_SAO_PAULO = <any>"America/Sao_Paulo",
    AMERICA_SCORESBYSUND = <any>"America/Scoresbysund",
    AMERICA_SHIPROCK = <any>"America/Shiprock",
    AMERICA_SITKA = <any>"America/Sitka",
    AMERICA_ST_BARTHELEMY = <any>"America/St_Barthelemy",
    AMERICA_ST_JOHNS = <any>"America/St_Johns",
    AMERICA_ST_KITTS = <any>"America/St_Kitts",
    AMERICA_ST_LUCIA = <any>"America/St_Lucia",
    AMERICA_ST_THOMAS = <any>"America/St_Thomas",
    AMERICA_ST_VINCENT = <any>"America/St_Vincent",
    AMERICA_SWIFT_CURRENT = <any>"America/Swift_Current",
    AMERICA_TEGUCIGALPA = <any>"America/Tegucigalpa",
    AMERICA_THULE = <any>"America/Thule",
    AMERICA_THUNDER_BAY = <any>"America/Thunder_Bay",
    AMERICA_TIJUANA = <any>"America/Tijuana",
    AMERICA_TORONTO = <any>"America/Toronto",
    AMERICA_TORTOLA = <any>"America/Tortola",
    AMERICA_VANCOUVER = <any>"America/Vancouver",
    AMERICA_VIRGIN = <any>"America/Virgin",
    AMERICA_WHITEHORSE = <any>"America/Whitehorse",
    AMERICA_WINNIPEG = <any>"America/Winnipeg",
    AMERICA_YAKUTAT = <any>"America/Yakutat",
    AMERICA_YELLOWKNIFE = <any>"America/Yellowknife",
    ANTARCTICA_CASEY = <any>"Antarctica/Casey",
    ANTARCTICA_DAVIS = <any>"Antarctica/Davis",
    ANTARCTICA_DUMONT_D_URVILLE = <any>"Antarctica/DumontDUrville",
    ANTARCTICA_MACQUARIE = <any>"Antarctica/Macquarie",
    ANTARCTICA_MAWSON = <any>"Antarctica/Mawson",
    ANTARCTICA_MC_MURDO = <any>"Antarctica/McMurdo",
    ANTARCTICA_PALMER = <any>"Antarctica/Palmer",
    ANTARCTICA_ROTHERA = <any>"Antarctica/Rothera",
    ANTARCTICA_SOUTH_POLE = <any>"Antarctica/South_Pole",
    ANTARCTICA_SYOWA = <any>"Antarctica/Syowa",
    ANTARCTICA_TROLL = <any>"Antarctica/Troll",
    ANTARCTICA_VOSTOK = <any>"Antarctica/Vostok",
    ARCTIC_LONGYEARBYEN = <any>"Arctic/Longyearbyen",
    ASIA_ADEN = <any>"Asia/Aden",
    ASIA_ALMATY = <any>"Asia/Almaty",
    ASIA_AMMAN = <any>"Asia/Amman",
    ASIA_ANADYR = <any>"Asia/Anadyr",
    ASIA_AQTAU = <any>"Asia/Aqtau",
    ASIA_AQTOBE = <any>"Asia/Aqtobe",
    ASIA_ASHGABAT = <any>"Asia/Ashgabat",
    ASIA_ASHKHABAD = <any>"Asia/Ashkhabad",
    ASIA_BAGHDAD = <any>"Asia/Baghdad",
    ASIA_BAHRAIN = <any>"Asia/Bahrain",
    ASIA_BAKU = <any>"Asia/Baku",
    ASIA_BANGKOK = <any>"Asia/Bangkok",
    ASIA_BEIRUT = <any>"Asia/Beirut",
    ASIA_BISHKEK = <any>"Asia/Bishkek",
    ASIA_BRUNEI = <any>"Asia/Brunei",
    ASIA_CALCUTTA = <any>"Asia/Calcutta",
    ASIA_CHITA = <any>"Asia/Chita",
    ASIA_CHOIBALSAN = <any>"Asia/Choibalsan",
    ASIA_CHONGQING = <any>"Asia/Chongqing",
    ASIA_CHUNGKING = <any>"Asia/Chungking",
    ASIA_COLOMBO = <any>"Asia/Colombo",
    ASIA_DACCA = <any>"Asia/Dacca",
    ASIA_DAMASCUS = <any>"Asia/Damascus",
    ASIA_DHAKA = <any>"Asia/Dhaka",
    ASIA_DILI = <any>"Asia/Dili",
    ASIA_DUBAI = <any>"Asia/Dubai",
    ASIA_DUSHANBE = <any>"Asia/Dushanbe",
    ASIA_GAZA = <any>"Asia/Gaza",
    ASIA_HARBIN = <any>"Asia/Harbin",
    ASIA_HEBRON = <any>"Asia/Hebron",
    ASIA_HO_CHI_MINH = <any>"Asia/Ho_Chi_Minh",
    ASIA_HONG_KONG = <any>"Asia/Hong_Kong",
    ASIA_HOVD = <any>"Asia/Hovd",
    ASIA_IRKUTSK = <any>"Asia/Irkutsk",
    ASIA_ISTANBUL = <any>"Asia/Istanbul",
    ASIA_JAKARTA = <any>"Asia/Jakarta",
    ASIA_JAYAPURA = <any>"Asia/Jayapura",
    ASIA_JERUSALEM = <any>"Asia/Jerusalem",
    ASIA_KABUL = <any>"Asia/Kabul",
    ASIA_KAMCHATKA = <any>"Asia/Kamchatka",
    ASIA_KARACHI = <any>"Asia/Karachi",
    ASIA_KASHGAR = <any>"Asia/Kashgar",
    ASIA_KATHMANDU = <any>"Asia/Kathmandu",
    ASIA_KATMANDU = <any>"Asia/Katmandu",
    ASIA_KHANDYGA = <any>"Asia/Khandyga",
    ASIA_KOLKATA = <any>"Asia/Kolkata",
    ASIA_KRASNOYARSK = <any>"Asia/Krasnoyarsk",
    ASIA_KUALA_LUMPUR = <any>"Asia/Kuala_Lumpur",
    ASIA_KUCHING = <any>"Asia/Kuching",
    ASIA_KUWAIT = <any>"Asia/Kuwait",
    ASIA_MACAO = <any>"Asia/Macao",
    ASIA_MACAU = <any>"Asia/Macau",
    ASIA_MAGADAN = <any>"Asia/Magadan",
    ASIA_MAKASSAR = <any>"Asia/Makassar",
    ASIA_MANILA = <any>"Asia/Manila",
    ASIA_MUSCAT = <any>"Asia/Muscat",
    ASIA_NICOSIA = <any>"Asia/Nicosia",
    ASIA_NOVOKUZNETSK = <any>"Asia/Novokuznetsk",
    ASIA_NOVOSIBIRSK = <any>"Asia/Novosibirsk",
    ASIA_OMSK = <any>"Asia/Omsk",
    ASIA_ORAL = <any>"Asia/Oral",
    ASIA_PHNOM_PENH = <any>"Asia/Phnom_Penh",
    ASIA_PONTIANAK = <any>"Asia/Pontianak",
    ASIA_PYONGYANG = <any>"Asia/Pyongyang",
    ASIA_QATAR = <any>"Asia/Qatar",
    ASIA_QYZYLORDA = <any>"Asia/Qyzylorda",
    ASIA_RANGOON = <any>"Asia/Rangoon",
    ASIA_RIYADH = <any>"Asia/Riyadh",
    ASIA_SAIGON = <any>"Asia/Saigon",
    ASIA_SAKHALIN = <any>"Asia/Sakhalin",
    ASIA_SAMARKAND = <any>"Asia/Samarkand",
    ASIA_SEOUL = <any>"Asia/Seoul",
    ASIA_SHANGHAI = <any>"Asia/Shanghai",
    ASIA_SINGAPORE = <any>"Asia/Singapore",
    ASIA_SREDNEKOLYMSK = <any>"Asia/Srednekolymsk",
    ASIA_TAIPEI = <any>"Asia/Taipei",
    ASIA_TASHKENT = <any>"Asia/Tashkent",
    ASIA_TBILISI = <any>"Asia/Tbilisi",
    ASIA_TEHRAN = <any>"Asia/Tehran",
    ASIA_TEL_AVIV = <any>"Asia/Tel_Aviv",
    ASIA_THIMBU = <any>"Asia/Thimbu",
    ASIA_THIMPHU = <any>"Asia/Thimphu",
    ASIA_TOKYO = <any>"Asia/Tokyo",
    ASIA_UJUNG_PANDANG = <any>"Asia/Ujung_Pandang",
    ASIA_ULAANBAATAR = <any>"Asia/Ulaanbaatar",
    ASIA_ULAN_BATOR = <any>"Asia/Ulan_Bator",
    ASIA_URUMQI = <any>"Asia/Urumqi",
    ASIA_UST_NERA = <any>"Asia/Ust-Nera",
    ASIA_VIENTIANE = <any>"Asia/Vientiane",
    ASIA_VLADIVOSTOK = <any>"Asia/Vladivostok",
    ASIA_YAKUTSK = <any>"Asia/Yakutsk",
    ASIA_YEKATERINBURG = <any>"Asia/Yekaterinburg",
    ASIA_YEREVAN = <any>"Asia/Yerevan",
    ATLANTIC_AZORES = <any>"Atlantic/Azores",
    ATLANTIC_BERMUDA = <any>"Atlantic/Bermuda",
    ATLANTIC_CANARY = <any>"Atlantic/Canary",
    ATLANTIC_CAPE_VERDE = <any>"Atlantic/Cape_Verde",
    ATLANTIC_FAEROE = <any>"Atlantic/Faeroe",
    ATLANTIC_FAROE = <any>"Atlantic/Faroe",
    ATLANTIC_JAN_MAYEN = <any>"Atlantic/Jan_Mayen",
    ATLANTIC_MADEIRA = <any>"Atlantic/Madeira",
    ATLANTIC_REYKJAVIK = <any>"Atlantic/Reykjavik",
    ATLANTIC_SOUTH_GEORGIA = <any>"Atlantic/South_Georgia",
    ATLANTIC_ST_HELENA = <any>"Atlantic/St_Helena",
    ATLANTIC_STANLEY = <any>"Atlantic/Stanley",
    AUSTRALIA_ACT = <any>"Australia/ACT",
    AUSTRALIA_ADELAIDE = <any>"Australia/Adelaide",
    AUSTRALIA_BRISBANE = <any>"Australia/Brisbane",
    AUSTRALIA_BROKEN_HILL = <any>"Australia/Broken_Hill",
    AUSTRALIA_CANBERRA = <any>"Australia/Canberra",
    AUSTRALIA_CURRIE = <any>"Australia/Currie",
    AUSTRALIA_DARWIN = <any>"Australia/Darwin",
    AUSTRALIA_EUCLA = <any>"Australia/Eucla",
    AUSTRALIA_HOBART = <any>"Australia/Hobart",
    AUSTRALIA_LHI = <any>"Australia/LHI",
    AUSTRALIA_LINDEMAN = <any>"Australia/Lindeman",
    AUSTRALIA_LORD_HOWE = <any>"Australia/Lord_Howe",
    AUSTRALIA_MELBOURNE = <any>"Australia/Melbourne",
    AUSTRALIA_NSW = <any>"Australia/NSW",
    AUSTRALIA_NORTH = <any>"Australia/North",
    AUSTRALIA_PERTH = <any>"Australia/Perth",
    AUSTRALIA_QUEENSLAND = <any>"Australia/Queensland",
    AUSTRALIA_SOUTH = <any>"Australia/South",
    AUSTRALIA_SYDNEY = <any>"Australia/Sydney",
    AUSTRALIA_TASMANIA = <any>"Australia/Tasmania",
    AUSTRALIA_VICTORIA = <any>"Australia/Victoria",
    AUSTRALIA_WEST = <any>"Australia/West",
    AUSTRALIA_YANCOWINNA = <any>"Australia/Yancowinna",
    BRAZIL_ACRE = <any>"Brazil/Acre",
    BRAZIL_DE_NORONHA = <any>"Brazil/DeNoronha",
    BRAZIL_EAST = <any>"Brazil/East",
    BRAZIL_WEST = <any>"Brazil/West",
    CANADA_ATLANTIC = <any>"Canada/Atlantic",
    CANADA_CENTRAL = <any>"Canada/Central",
    CANADA_EAST_SASKATCHEWAN = <any>"Canada/East-Saskatchewan",
    CANADA_EASTERN = <any>"Canada/Eastern",
    CANADA_MOUNTAIN = <any>"Canada/Mountain",
    CANADA_NEWFOUNDLAND = <any>"Canada/Newfoundland",
    CANADA_PACIFIC = <any>"Canada/Pacific",
    CANADA_SASKATCHEWAN = <any>"Canada/Saskatchewan",
    CANADA_YUKON = <any>"Canada/Yukon",
    CHILE_CONTINENTAL = <any>"Chile/Continental",
    CHILE_EASTER_ISLAND = <any>"Chile/EasterIsland",
    ETC_GMT = <any>"Etc/GMT",
    ETC_GMT0 = <any>"Etc/GMT+0",
    ETC_GMT1 = <any>"Etc/GMT+1",
    ETC_GMT10 = <any>"Etc/GMT+10",
    ETC_GMT11 = <any>"Etc/GMT+11",
    ETC_GMT12 = <any>"Etc/GMT+12",
    ETC_GMT2 = <any>"Etc/GMT+2",
    ETC_GMT3 = <any>"Etc/GMT+3",
    ETC_GMT4 = <any>"Etc/GMT+4",
    ETC_GMT5 = <any>"Etc/GMT+5",
    ETC_GMT6 = <any>"Etc/GMT+6",
    ETC_GMT7 = <any>"Etc/GMT+7",
    ETC_GMT8 = <any>"Etc/GMT+8",
    ETC_GMT9 = <any>"Etc/GMT+9",
    ETC_GMT_0 = <any>"Etc/GMT-0",
    ETC_GMT_1 = <any>"Etc/GMT-1",
    ETC_GMT_10 = <any>"Etc/GMT-10",
    ETC_GMT_11 = <any>"Etc/GMT-11",
    ETC_GMT_12 = <any>"Etc/GMT-12",
    ETC_GMT_13 = <any>"Etc/GMT-13",
    ETC_GMT_14 = <any>"Etc/GMT-14",
    ETC_GMT_2 = <any>"Etc/GMT-2",
    ETC_GMT_3 = <any>"Etc/GMT-3",
    ETC_GMT_4 = <any>"Etc/GMT-4",
    ETC_GMT_5 = <any>"Etc/GMT-5",
    ETC_GMT_6 = <any>"Etc/GMT-6",
    ETC_GMT_7 = <any>"Etc/GMT-7",
    ETC_GMT_8 = <any>"Etc/GMT-8",
    ETC_GMT_9 = <any>"Etc/GMT-9",
    ETC_GREENWICH = <any>"Etc/Greenwich",
    ETC_UCT = <any>"Etc/UCT",
    ETC_UTC = <any>"Etc/UTC",
    ETC_UNIVERSAL = <any>"Etc/Universal",
    ETC_ZULU = <any>"Etc/Zulu",
    EUROPE_AMSTERDAM = <any>"Europe/Amsterdam",
    EUROPE_ANDORRA = <any>"Europe/Andorra",
    EUROPE_ATHENS = <any>"Europe/Athens",
    EUROPE_BELFAST = <any>"Europe/Belfast",
    EUROPE_BELGRADE = <any>"Europe/Belgrade",
    EUROPE_BERLIN = <any>"Europe/Berlin",
    EUROPE_BRATISLAVA = <any>"Europe/Bratislava",
    EUROPE_BRUSSELS = <any>"Europe/Brussels",
    EUROPE_BUCHAREST = <any>"Europe/Bucharest",
    EUROPE_BUDAPEST = <any>"Europe/Budapest",
    EUROPE_BUSINGEN = <any>"Europe/Busingen",
    EUROPE_CHISINAU = <any>"Europe/Chisinau",
    EUROPE_COPENHAGEN = <any>"Europe/Copenhagen",
    EUROPE_DUBLIN = <any>"Europe/Dublin",
    EUROPE_GIBRALTAR = <any>"Europe/Gibraltar",
    EUROPE_GUERNSEY = <any>"Europe/Guernsey",
    EUROPE_HELSINKI = <any>"Europe/Helsinki",
    EUROPE_ISLE_OF_MAN = <any>"Europe/Isle_of_Man",
    EUROPE_ISTANBUL = <any>"Europe/Istanbul",
    EUROPE_JERSEY = <any>"Europe/Jersey",
    EUROPE_KALININGRAD = <any>"Europe/Kaliningrad",
    EUROPE_KIEV = <any>"Europe/Kiev",
    EUROPE_LISBON = <any>"Europe/Lisbon",
    EUROPE_LJUBLJANA = <any>"Europe/Ljubljana",
    EUROPE_LONDON = <any>"Europe/London",
    EUROPE_LUXEMBOURG = <any>"Europe/Luxembourg",
    EUROPE_MADRID = <any>"Europe/Madrid",
    EUROPE_MALTA = <any>"Europe/Malta",
    EUROPE_MARIEHAMN = <any>"Europe/Mariehamn",
    EUROPE_MINSK = <any>"Europe/Minsk",
    EUROPE_MONACO = <any>"Europe/Monaco",
    EUROPE_MOSCOW = <any>"Europe/Moscow",
    EUROPE_NICOSIA = <any>"Europe/Nicosia",
    EUROPE_OSLO = <any>"Europe/Oslo",
    EUROPE_PARIS = <any>"Europe/Paris",
    EUROPE_PODGORICA = <any>"Europe/Podgorica",
    EUROPE_PRAGUE = <any>"Europe/Prague",
    EUROPE_RIGA = <any>"Europe/Riga",
    EUROPE_ROME = <any>"Europe/Rome",
    EUROPE_SAMARA = <any>"Europe/Samara",
    EUROPE_SAN_MARINO = <any>"Europe/San_Marino",
    EUROPE_SARAJEVO = <any>"Europe/Sarajevo",
    EUROPE_SIMFEROPOL = <any>"Europe/Simferopol",
    EUROPE_SKOPJE = <any>"Europe/Skopje",
    EUROPE_SOFIA = <any>"Europe/Sofia",
    EUROPE_STOCKHOLM = <any>"Europe/Stockholm",
    EUROPE_TALLINN = <any>"Europe/Tallinn",
    EUROPE_TIRANE = <any>"Europe/Tirane",
    EUROPE_TIRASPOL = <any>"Europe/Tiraspol",
    EUROPE_UZHGOROD = <any>"Europe/Uzhgorod",
    EUROPE_VADUZ = <any>"Europe/Vaduz",
    EUROPE_VATICAN = <any>"Europe/Vatican",
    EUROPE_VIENNA = <any>"Europe/Vienna",
    EUROPE_VILNIUS = <any>"Europe/Vilnius",
    EUROPE_VOLGOGRAD = <any>"Europe/Volgograd",
    EUROPE_WARSAW = <any>"Europe/Warsaw",
    EUROPE_ZAGREB = <any>"Europe/Zagreb",
    EUROPE_ZAPOROZHYE = <any>"Europe/Zaporozhye",
    EUROPE_ZURICH = <any>"Europe/Zurich",
    INDIAN_ANTANANARIVO = <any>"Indian/Antananarivo",
    INDIAN_CHAGOS = <any>"Indian/Chagos",
    INDIAN_CHRISTMAS = <any>"Indian/Christmas",
    INDIAN_COCOS = <any>"Indian/Cocos",
    INDIAN_COMORO = <any>"Indian/Comoro",
    INDIAN_KERGUELEN = <any>"Indian/Kerguelen",
    INDIAN_MAHE = <any>"Indian/Mahe",
    INDIAN_MALDIVES = <any>"Indian/Maldives",
    INDIAN_MAURITIUS = <any>"Indian/Mauritius",
    INDIAN_MAYOTTE = <any>"Indian/Mayotte",
    INDIAN_REUNION = <any>"Indian/Reunion",
    MEXICO_BAJA_NORTE = <any>"Mexico/BajaNorte",
    MEXICO_BAJA_SUR = <any>"Mexico/BajaSur",
    MEXICO_GENERAL = <any>"Mexico/General",
    PACIFIC_APIA = <any>"Pacific/Apia",
    PACIFIC_AUCKLAND = <any>"Pacific/Auckland",
    PACIFIC_CHATHAM = <any>"Pacific/Chatham",
    PACIFIC_CHUUK = <any>"Pacific/Chuuk",
    PACIFIC_EASTER = <any>"Pacific/Easter",
    PACIFIC_EFATE = <any>"Pacific/Efate",
    PACIFIC_ENDERBURY = <any>"Pacific/Enderbury",
    PACIFIC_FAKAOFO = <any>"Pacific/Fakaofo",
    PACIFIC_FIJI = <any>"Pacific/Fiji",
    PACIFIC_FUNAFUTI = <any>"Pacific/Funafuti",
    PACIFIC_GALAPAGOS = <any>"Pacific/Galapagos",
    PACIFIC_GAMBIER = <any>"Pacific/Gambier",
    PACIFIC_GUADALCANAL = <any>"Pacific/Guadalcanal",
    PACIFIC_GUAM = <any>"Pacific/Guam",
    PACIFIC_HONOLULU = <any>"Pacific/Honolulu",
    PACIFIC_JOHNSTON = <any>"Pacific/Johnston",
    PACIFIC_KIRITIMATI = <any>"Pacific/Kiritimati",
    PACIFIC_KOSRAE = <any>"Pacific/Kosrae",
    PACIFIC_KWAJALEIN = <any>"Pacific/Kwajalein",
    PACIFIC_MAJURO = <any>"Pacific/Majuro",
    PACIFIC_MARQUESAS = <any>"Pacific/Marquesas",
    PACIFIC_MIDWAY = <any>"Pacific/Midway",
    PACIFIC_NAURU = <any>"Pacific/Nauru",
    PACIFIC_NIUE = <any>"Pacific/Niue",
    PACIFIC_NORFOLK = <any>"Pacific/Norfolk",
    PACIFIC_NOUMEA = <any>"Pacific/Noumea",
    PACIFIC_PAGO_PAGO = <any>"Pacific/Pago_Pago",
    PACIFIC_PALAU = <any>"Pacific/Palau",
    PACIFIC_PITCAIRN = <any>"Pacific/Pitcairn",
    PACIFIC_POHNPEI = <any>"Pacific/Pohnpei",
    PACIFIC_PONAPE = <any>"Pacific/Ponape",
    PACIFIC_PORT_MORESBY = <any>"Pacific/Port_Moresby",
    PACIFIC_RAROTONGA = <any>"Pacific/Rarotonga",
    PACIFIC_SAIPAN = <any>"Pacific/Saipan",
    PACIFIC_SAMOA = <any>"Pacific/Samoa",
    PACIFIC_TAHITI = <any>"Pacific/Tahiti",
    PACIFIC_TARAWA = <any>"Pacific/Tarawa",
    PACIFIC_TONGATAPU = <any>"Pacific/Tongatapu",
    PACIFIC_TRUK = <any>"Pacific/Truk",
    PACIFIC_WAKE = <any>"Pacific/Wake",
    PACIFIC_WALLIS = <any>"Pacific/Wallis",
    PACIFIC_YAP = <any>"Pacific/Yap",
  }
  export enum Types {
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
}
