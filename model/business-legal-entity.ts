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
import { BusinessLegalEntityAchBankAccount } from './business-legal-entity-ach-bank-account';
// May contain unused imports in some cases
// @ts-ignore
import { BusinessLegalEntityAddress } from './business-legal-entity-address';
// May contain unused imports in some cases
// @ts-ignore
import { BusinessLegalEntityBankAccount } from './business-legal-entity-bank-account';
// May contain unused imports in some cases
// @ts-ignore
import { Principal } from './principal';

/**
 * 
 * @export
 * @interface BusinessLegalEntity
 */
export interface BusinessLegalEntity {
    /**
     * 
     * @type {BusinessLegalEntityAddress}
     * @memberof BusinessLegalEntity
     */
    'address': BusinessLegalEntityAddress;
    /**
     * Average transaction amount, in minor units. (e.g. $100.00 = 10000 minor units)
     * @type {number}
     * @memberof BusinessLegalEntity
     */
    'average_transaction_amount': number;
    /**
     * Category code of the business. * `ACCT` = Accounting * `ART` = Artist Supply and Craft Stores * `BEAUTY` = Barber & Beauty Shop * `CATERING` = Catering * `CHARITY` = Charity * `CLEANING` = Cleaning Services * `CONSULTANT` = Consultant * `CONTRACTOR` = Trade Contractor * `DENTIST` = Dentistry * `EDU` = Schools & Education * `FOOD` = Food/Grocery * `LANDSCAPING` = Landscaping * `LEGAL` = Legal Services * `MEDICAL_PRACT` = Medical Practitioner * `MEDICAL_SERV` = Health Services * `MEMBERSHIP` = Membership Org. * `MISC_FOOD_STORES` = Misc. Food Stores * `MISC_MERCH` = Misc General Merchandise * `MISC_SERV` = Services * `MUSIC` = Music/Entertainment * `PC` = Computer Services * `PHOTO_FILM` = Photo/FILM * `PROF_SERV` = Professional Services * `REAL_ESTATE` = Real Estate * `RECREATION` = Recreation Services * `REPAIR` = Repair Services * `RESTO` = Restaurant/Bar * `RETAIL` = Direct Marketing Retail (MOTO) * `TAXI` = Taxi/Limo * `VET` = Veterinary * `WEB_DEV` = Web Design * `WEB_HOSTING` = Web Hosting
     * @type {string}
     * @memberof BusinessLegalEntity
     */
    'category': BusinessLegalEntityCategory;
    /**
     * Single currency used for processing and settlement for this merchant account.
     * @type {string}
     * @memberof BusinessLegalEntity
     */
    'currency': BusinessLegalEntityCurrency;
    /**
     * Registered business legal/trading name (e.g. \"ACME CA\")
     * @type {string}
     * @memberof BusinessLegalEntity
     */
    'legal_name': string;
    /**
     * The locale value used for the merchant account. Values depend on the region.
     * @type {string}
     * @memberof BusinessLegalEntity
     */
    'locale': BusinessLegalEntityLocale;
    /**
     * The merchant name
     * @type {string}
     * @memberof BusinessLegalEntity
     */
    'name': string;
    /**
     * Customer support phone number of the business. Cannot contain special characters.
     * @type {string}
     * @memberof BusinessLegalEntity
     */
    'phone': string;
    /**
     * Array of Principals (ie Business Owners).
     * @type {Array<Principal>}
     * @memberof BusinessLegalEntity
     */
    'principals': Array<Principal>;
    /**
     * Region for the merchant account
     * @type {string}
     * @memberof BusinessLegalEntity
     */
    'region': BusinessLegalEntityRegion;
    /**
     * Provides information about a payment that customers see on their statements. Concatenated with the prefix (shortened descriptor) or statement descriptor that’s set on the account to form the complete statement descriptor. Maximum 20 characters for the concatenated descriptor.
     * @type {string}
     * @memberof BusinessLegalEntity
     */
    'statement_descriptor': string;
    /**
     * Company\'s Tax Identification Number
     * @type {string}
     * @memberof BusinessLegalEntity
     */
    'tax_identification_number': string;
    /**
     * Type of business. * `CHARITY` = Charity * `CIC` = Community Interest Company * `CORP` = Corporation * `LTD` = Limited * `LLC` = Limited Liability Company * `LLP` = Limited Liability Partnership * `NPCORP` = Non-Profit * `PARTNERSHIP` = Partnership * `PLC` = Public Limited Company * `GOV` = Public Sector/Governmental * `SOLEPROP` = Sole Proprietorship/Sole Trader * `TRUST` = Trust
     * @type {string}
     * @memberof BusinessLegalEntity
     */
    'type': BusinessLegalEntityType;
    /**
     * Estimated yearly volume of transactions of the business. * `LOW` = 0-50k * `MEDIUM` = 50-100k * `HIGH` = 100-250k * `VERY_HIGH` = 250k+
     * @type {string}
     * @memberof BusinessLegalEntity
     */
    'yearly_volume_range': BusinessLegalEntityYearlyVolumeRange;
    /**
     * 
     * @type {BusinessLegalEntityAchBankAccount}
     * @memberof BusinessLegalEntity
     * @deprecated
     */
    'ach_bank_account'?: BusinessLegalEntityAchBankAccount;
    /**
     * Estimated annual revenue of the business. * `LOW` = $0 - 250,000 * `MEDIUM` = $250,001 - 500,000 * `HIGH` = $500,001 - 750,000 * `VERY_HIGH` = $750,001 - 1 Million * `EXTREMELY_HIGH` = $1+ Million
     * @type {string}
     * @memberof BusinessLegalEntity
     */
    'annual_revenue'?: BusinessLegalEntityAnnualRevenue;
    /**
     * Average number of transactions per month
     * @type {number}
     * @memberof BusinessLegalEntity
     */
    'average_transactions_per_month'?: number;
    /**
     * 
     * @type {BusinessLegalEntityBankAccount}
     * @memberof BusinessLegalEntity
     */
    'bank_account'?: BusinessLegalEntityBankAccount;
    /**
     * Email of the business.
     * @type {string}
     * @memberof BusinessLegalEntity
     */
    'company_email'?: string;
    /**
     * 2-digit Country code (e.g. \'US\', \'CA\') [See ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
     * @type {string}
     * @memberof BusinessLegalEntity
     */
    'country_of_incorporation'?: string;
    /**
     * Company\'s business description
     * @type {string}
     * @memberof BusinessLegalEntity
     */
    'description'?: string;
    /**
     * Year the business was incorporated. A number in \'YYYY\' format.
     * @type {number}
     * @memberof BusinessLegalEntity
     */
    'incorporation_year'?: number;
    /**
     * A 6 digit NAICS code that represents the business industry or trade. * `VETERINARY_SERVICES` = 541940 * `LANDSCAPE_ARCHITECTURAL_SERVICES` = 541320 * `SITE_PREPARATION_CONTRACTORS` = 238910 * `STRUCTURAL_STEEL_AND_PRECAST_CONCRETE_CONTRACTORS` = 238120 * `FRAMING_CONTRACTORS` = 238130 * `MASONRY_CONTRACTORS` = 238140 * `POURED_CONCRETE_FOUNDATION_AND_STRUCTURE_CONTRACTORS` = 238110 * `GLASS_AND_GLAZING_CONTRACTORS` = 238150 * `ROOFING_CONTRACTORS` = 238160 * `SIDING_CONTRACTORS` = 238170 * `OTHER_FOUNDATION_STRUCTURE_AND_BUILDING_EXTERIOR_CONTRACTORS` = 238190 * `ELECTRICAL_AND_OTHER_WIRING_INSTALLATION_CONTRACTORS` = 238210 * `PLUMBING_HEATING_AND_AIR_CONDITIONING_CONTRACTORS` = 238220 * `OTHER_BUILDING_EQUIPMENT_CONTRACTORS` = 238290 * `DRYWALL_AND_INSULATION_CONTRACTORS` = 238310 * `PAINTING_AND_WALL_COVERING_CONTRACTORS` = 238320 * `FLOORING_CONTRACTORS` = 238330 * `TILE_AND_TERRAZZO_CONTRACTORS` = 238340 * `FINISH_CARPENTRY_CONTRACTORS` = 238350 * `OTHER_BUILDING_FINISHING_CONTRACTORS` = 238390 * `ALL_OTHER_SPECIALTY_TRADE_CONTRACTORS` = 238990 * `TAXI_SERVICE` = 485310 * `LIMOUSINE_SERVICE` = 485320 * `DATA_PROCESSING_HOSTING_AND_RELATED_SERVICES` = 518210 * `STEAM_AND_AIR_CONDITIONING_SUPPLY` = 221330 * `HYDROELECTRIC_POWER_GENERATION` = 221111 * `FOSSIL_FUEL_ELECTRIC_POWER_GENERATION` = 221112 * `NUCLEAR_ELECTRIC_POWER_GENERATION` = 221113 * `SOLAR_ELECTRIC_POWER_GENERATION` = 221114 * `WIND_ELECTRIC_POWER_GENERATION` = 221115 * `GEOTHERMAL_ELECTRIC_POWER_GENERATION` = 221116 * `BIOMASS_ELECTRIC_POWER_GENERATION` = 221117 * `OTHER_ELECTRIC_POWER_GENERATION` = 221118 * `ELECTRIC_BULK_POWER_TRANSMISSION_AND_CONTROL` = 221121 * `ELECTRIC_POWER_DISTRIBUTION` = 221122 * `NATURAL_GAS_DISTRIBUTION` = 221210 * `WATER_SUPPLY_AND_IRRIGATION_SYSTEMS` = 221310 * `SEWAGE_TREATMENT_FACILITIES` = 221320 * `PHOTOGRAPHY_STUDIOS_PORTRAIT` = 541921 * `COMMERCIAL_PHOTOGRAPHY` = 541922 * `PHOTOFINISHING_LABORATORIES_EXCEPT_ONE_HOUR` = 812921 * `ALL_OTHER_GENERAL_MERCHANDISE_STORES` = 455219 * `GENERAL_LINE_GROCERY_MERCHANT_WHOLESALERS` = 424410 * `PACKAGED_FROZEN_FOOD_MERCHANT_WHOLESALERS` = 424420 * `DAIRY_PRODUCT_MERCHANT_WHOLESALERS` = 424430 * `POULTRY_AND_POULTRY_PRODUCT_MERCHANT_WHOLESALERS` = 424440 * `CONFECTIONERY_MERCHANT_WHOLESALERS` = 424450 * `FISH_AND_SEAFOOD_MERCHANT_WHOLESALERS` = 424460 * `MEAT_AND_MEAT_PRODUCT_MERCHANT_WHOLESALERS` = 424470 * `FRESH_FRUIT_AND_VEGETABLE_MERCHANT_WHOLESALERS` = 424480 * `OTHER_GROCERY_AND_RELATED_PRODUCTS_MERCHANT_WHOLESALERS` = 424490 * `SUPERMARKETS_AND_OTHER_GROCERY_EXCEPT_CONVENIENCE_STORES` = 445110 * `MEAT_MARKETS` = 445210 * `FISH_AND_SEAFOOD_MARKETS` = 445220 * `FRUIT_AND_VEGETABLE_MARKETS` = 445230 * `BAKED_GOODS_STORES` = 445291 * `CONFECTIONERY_AND_NUT_STORES` = 445292 * `ALL_OTHER_SPECIALTY_FOOD_STORES` = 445299 * `CATERERS` = 722320 * `DRINKING_PLACES_ALCOHOLIC_BEVERAGES` = 722410 * `FULL_SERVICE_RESTAURANTS` = 722511 * `LIMITED_SERVICE_RESTAURANTS` = 722513 * `CAFETERIAS_GRILL_BUFFETS_AND_BUFFETS` = 722514 * `SNACK_AND_NONALCOHOLIC_BEVERAGE_BARS` = 722515 * `ELECTRONIC_SHOPPING_AND_MAIL_ORDER_HOUSES` = 454111 * `HOBBY_TOY_AND_GAME_STORES` = 451120 * `SEWING_NEEDLEWORK_AND_PIECE_GOODS_STORES` = 451130 * `LESSORS_OF_RESIDENTIAL_BUILDINGS_AND_DWELLINGS` = 531110 * `LESSORS_OF_NONRESIDENTIAL_BUILDINGS_EXCEPT_MINIWAREHOUSES` = 531120 * `LESSORS_OF_MINIWAREHOUSES_AND_SELF_STORAGE_UNITS` = 531130 * `LESSORS_OF_OTHER_REAL_ESTATE_PROPERTY` = 531190 * `OFFICES_OF_REAL_ESTATE_AGENTS_AND_BROKERS` = 531210 * `RESIDENTIAL_PROPERTY_MANAGERS` = 531311 * `NONRESIDENTIAL_PROPERTY_MANAGERS` = 531312 * `OFFICES_OF_REAL_ESTATE_APPRAISERS` = 531320 * `OTHER_ACTIVITIES_RELATED_TO_REAL_ESTATE` = 531390 * `BARBER_SHOPS` = 812111 * `BEAUTY_SALONS` = 812112 * `ALL_OTHER_PERSONAL_SERVICES` = 812990 * `JANITORIAL_SERVICES` = 561720 * `GRAPHIC_DESIGN_SERVICES` = 541430 * `OTHER_SPECIALIZED_DESIGN_SERVICES` = 541490 * `CUSTOM_COMPUTER_PROGRAMMING_SERVICES` = 541511 * `COMPUTER_SYSTEMS_DESIGN_SERVICES` = 541512 * `COMPUTER_FACILITIES_MANAGEMENT_SERVICES` = 541513 * `OTHER_COMPUTER_RELATED_SERVICES` = 541519 * `ADMINISTRATIVE_AND_GENERAL_MANAGEMENT_CONSULTING_SERVICES` = 541611 * `HUMAN_RESOURCES_CONSULTING_SERVICES` = 541612 * `MARKETING_CONSULTING_SERVICES` = 541613 * `PHYSICAL_DISTRIBUTION_AND_LOGISTICS_CONSULTING_SERVICES` = 541614 * `OTHER_MANAGEMENT_CONSULTING_SERVICES` = 541618 * `ENVIRONMENTAL_CONSULTING_SERVICES` = 541620 * `OTHER_SCIENTIFIC_AND_TECHNICAL_CONSULTING_SERVICES` = 541690 * `GENERAL_AUTOMOTIVE_REPAIR` = 811111 * `AUTOMOTIVE_EXHAUST_SYSTEM_REPAIR` = 811112 * `AUTOMOTIVE_TRANSMISSION_REPAIR` = 811113 * `OTHER_AUTOMOTIVE_MECHANICAL_ELECTRICAL_REPAIR_AND_MAINTENANCE` = 811118 * `AUTOMOTIVE_BODY_PAINT_AND_INTERIOR_REPAIR_AND_MAINTENANCE` = 811121 * `AUTOMOTIVE_GLASS_REPLACEMENT_SHOPS` = 811122 * `AUTOMOTIVE_OIL_CHANGE_AND_LUBRICATION_SHOPS` = 811191 * `CAR_WASHES` = 811192 * `ALL_OTHER_AUTOMOTIVE_REPAIR_AND_MAINTENANCE` = 811198 * `CONSUMER_ELECTRONICS_REPAIR_AND_MAINTENANCE` = 811211 * `COMPUTER_AND_OFFICE_MACHINE_REPAIR_AND_MAINTENANCE` = 811212 * `COMMUNICATION_EQUIPMENT_REPAIR_AND_MAINTENANCE` = 811213 * `OTHER_ELECTRONIC_PRECISION_EQUIPMENT_REPAIR_AND_MAINTENANCE` = 811219 * `REPAIR_AND_MAINTENANCE_EXCEPT_AUTOMOTIVE_AND_ELECTRONIC` = 811310 * `HOME_AND_GARDEN_EQUIPMENT_REPAIR_AND_MAINTENANCE` = 811411 * `APPLIANCE_REPAIR_AND_MAINTENANCE` = 811412 * `REUPHOLSTERY_AND_FURNITURE_REPAIR` = 811420 * `FOOTWEAR_AND_LEATHER_GOODS_REPAIR` = 811430 * `OTHER_PERSONAL_AND_HOUSEHOLD_GOODS_REPAIR_AND_MAINTENANCE` = 811490 * `THEATER_COMPANIES_AND_DINNER_THEATERS` = 711110 * `DANCE_COMPANIES` = 711120 * `MUSICAL_GROUPS_AND_ARTISTS` = 711130 * `OTHER_PERFORMING_ARTS_COMPANIES` = 711190 * `SPORTS_TEAMS_AND_CLUBS` = 711211 * `RACETRACKS` = 711212 * `OTHER_SPECTATOR_SPORTS` = 711219 * `PROMOTERS_ARTS_SPORTS_EVENTS__FACILITIES` = 711310 * `PROMOTERS_ARTS_SPORTS_EVENTS_OUT_FACILITIES` = 711320 * `AGENTS_MANAGERS_FOR_ARTISTS_ATHLETES_OTHER_PUBLIC_FIGURES` = 711410 * `INDEPENDENT_ARTISTS_WRITERS_AND_PERFORMERS` = 711510 * `ALL_OTHER_AMUSEMENT_AND_RECREATION_INDUSTRIES` = 713990 * `OFFICES_OF_DENTISTS` = 621210 * `OFFICES_OF_PHYSICIANS_EXCEPT_MENTAL_HEALTH_SPECIALISTS` = 621111 * `OFFICES_OF_PHYSICIANS_MENTAL_HEALTH_SPECIALISTS` = 621112 * `OFFICES_OF_CHIROPRACTORS` = 621310 * `OFFICES_OF_OPTOMETRISTS` = 621320 * `OFFICES_OF_MENTAL_HEALTH_PRACTITIONERS_EXCEPT_PHYSICIANS` = 621330 * `OFFICES_OF_OCCUPATIONAL_SPEECH_THERAPISTS_AND_AUDIOLOGISTS` = 621340 * `OFFICES_OF_PODIATRISTS` = 621391 * `OFFICES_OF_ALL_OTHER_MISCELLANEOUS_HEALTH_PRACTITIONERS` = 621399 * `FAMILY_PLANNING_CENTERS` = 621410 * `OUTPATIENT_MENTAL_HEALTH_AND_SUBSTANCE_ABUSE_CENTERS` = 621420 * `HMO_MEDICAL_CENTERS` = 621491 * `KIDNEY_DIALYSIS_CENTERS` = 621492 * `FREESTANDING_AMBULATORY_SURGICAL_AND_EMERGENCY_CENTERS` = 621493 * `ALL_OTHER_OUTPATIENT_CARE_CENTERS` = 621498 * `MEDICAL_LABORATORIES` = 621511 * `DIAGNOSTIC_IMAGING_CENTERS` = 621512 * `HOME_HEALTH_CARE_SERVICES` = 621610 * `AMBULANCE_SERVICES` = 621910 * `BLOOD_AND_ORGAN_BANKS` = 621991 * `ALL_OTHER_MISCELLANEOUS_AMBULATORY_HEALTH_CARE_SERVICES` = 621999 * `OFFICES_OF_LAWYERS` = 541110 * `OFFICES_OF_NOTARIES` = 541120 * `TITLE_ABSTRACT_AND_SETTLEMENT_OFFICES` = 541191 * `ALL_OTHER_LEGAL_SERVICES` = 541199 * `GRANTMAKING_FOUNDATIONS` = 813211 * `VOLUNTARY_HEALTH_ORGANIZATIONS` = 813212 * `OTHER_GRANTMAKING_AND_GIVING_SERVICES` = 813219 * `PROFESSIONAL_ORGANIZATIONS` = 813920 * `CIVIC_AND_SOCIAL_ORGANIZATIONS` = 813410 * `HOTELS_AND_MOTELS_MEMBERSHIP` = 721110 * `OFFICES_OF_CERTIFIED_PUBLIC_ACCOUNTANTS` = 541211 * `TAX_PREPARATION_SERVICES` = 541213 * `PAYROLL_SERVICES` = 541214 * `OTHER_ACCOUNTING_SERVICES` = 541219 * `ALL_OTHER_PROFESSIONAL_SCIENTIFIC_AND_TECHNICAL_SERVICES` = 541990
     * @type {string}
     * @memberof BusinessLegalEntity
     */
    'naics_code'?: BusinessLegalEntityNaicsCode;
    /**
     * Website of the business.
     * @type {string}
     * @memberof BusinessLegalEntity
     */
    'website'?: string;
}

export const BusinessLegalEntityCategory = {
    ACCT: 'ACCT',
    ART: 'ART',
    BEAUTY: 'BEAUTY',
    CATERING: 'CATERING',
    CHARITY: 'CHARITY',
    CLEANING: 'CLEANING',
    CONSULTANT: 'CONSULTANT',
    CONTRACTOR: 'CONTRACTOR',
    DENTIST: 'DENTIST',
    EDU: 'EDU',
    FOOD: 'FOOD',
    LANDSCAPING: 'LANDSCAPING',
    LEGAL: 'LEGAL',
    MEDICAL_PRACT: 'MEDICAL_PRACT',
    MEDICAL_SERV: 'MEDICAL_SERV',
    MEMBERSHIP: 'MEMBERSHIP',
    MISC_FOOD_STORES: 'MISC_FOOD_STORES',
    MISC_MERCH: 'MISC_MERCH',
    MISC_SERV: 'MISC_SERV',
    MUSIC: 'MUSIC',
    PC: 'PC',
    PHOTO_FILM: 'PHOTO_FILM',
    PROF_SERV: 'PROF_SERV',
    REAL_ESTATE: 'REAL_ESTATE',
    RECREATION: 'RECREATION',
    REPAIR: 'REPAIR',
    RESTO: 'RESTO',
    RETAIL: 'RETAIL',
    TAXI: 'TAXI',
    UTILITY: 'UTILITY',
    VET: 'VET',
    WEB_DEV: 'WEB_DEV',
    WEB_HOSTING: 'WEB_HOSTING',
    OTHER: 'OTHER'
} as const;

export type BusinessLegalEntityCategory = typeof BusinessLegalEntityCategory[keyof typeof BusinessLegalEntityCategory];
export const BusinessLegalEntityCurrency = {
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

export type BusinessLegalEntityCurrency = typeof BusinessLegalEntityCurrency[keyof typeof BusinessLegalEntityCurrency];
export const BusinessLegalEntityLocale = {
    EN_US: 'en_US',
    EN_CA: 'en_CA',
    FR_CA: 'fr_CA',
    EN_GB: 'en_GB'
} as const;

export type BusinessLegalEntityLocale = typeof BusinessLegalEntityLocale[keyof typeof BusinessLegalEntityLocale];
export const BusinessLegalEntityRegion = {
    US: 'US',
    CA: 'CA'
} as const;

export type BusinessLegalEntityRegion = typeof BusinessLegalEntityRegion[keyof typeof BusinessLegalEntityRegion];
export const BusinessLegalEntityType = {
    CHARITY: 'CHARITY',
    CIC: 'CIC',
    CORP: 'CORP',
    LTD: 'LTD',
    LLC: 'LLC',
    LLP: 'LLP',
    NPCORP: 'NPCORP',
    PARTNERSHIP: 'PARTNERSHIP',
    PLC: 'PLC',
    GOV: 'GOV',
    SOLEPROP: 'SOLEPROP',
    TRUST: 'TRUST'
} as const;

export type BusinessLegalEntityType = typeof BusinessLegalEntityType[keyof typeof BusinessLegalEntityType];
export const BusinessLegalEntityYearlyVolumeRange = {
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH',
    VERY_HIGH: 'VERY_HIGH'
} as const;

export type BusinessLegalEntityYearlyVolumeRange = typeof BusinessLegalEntityYearlyVolumeRange[keyof typeof BusinessLegalEntityYearlyVolumeRange];
export const BusinessLegalEntityAnnualRevenue = {
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH',
    VERY_HIGH: 'VERY_HIGH',
    EXTREMELY_HIGH: 'EXTREMELY_HIGH'
} as const;

export type BusinessLegalEntityAnnualRevenue = typeof BusinessLegalEntityAnnualRevenue[keyof typeof BusinessLegalEntityAnnualRevenue];
export const BusinessLegalEntityNaicsCode = {
    VETERINARY_SERVICES: 'VETERINARY_SERVICES',
    LANDSCAPE_ARCHITECTURAL_SERVICES: 'LANDSCAPE_ARCHITECTURAL_SERVICES',
    SITE_PREPARATION_CONTRACTORS: 'SITE_PREPARATION_CONTRACTORS',
    STRUCTURAL_STEEL_AND_PRECAST_CONCRETE_CONTRACTORS: 'STRUCTURAL_STEEL_AND_PRECAST_CONCRETE_CONTRACTORS',
    FRAMING_CONTRACTORS: 'FRAMING_CONTRACTORS',
    MASONRY_CONTRACTORS: 'MASONRY_CONTRACTORS',
    POURED_CONCRETE_FOUNDATION_AND_STRUCTURE_CONTRACTORS: 'POURED_CONCRETE_FOUNDATION_AND_STRUCTURE_CONTRACTORS',
    GLASS_AND_GLAZING_CONTRACTORS: 'GLASS_AND_GLAZING_CONTRACTORS',
    ROOFING_CONTRACTORS: 'ROOFING_CONTRACTORS',
    SIDING_CONTRACTORS: 'SIDING_CONTRACTORS',
    OTHER_FOUNDATION_STRUCTURE_AND_BUILDING_EXTERIOR_CONTRACTORS: 'OTHER_FOUNDATION_STRUCTURE_AND_BUILDING_EXTERIOR_CONTRACTORS',
    ELECTRICAL_AND_OTHER_WIRING_INSTALLATION_CONTRACTORS: 'ELECTRICAL_AND_OTHER_WIRING_INSTALLATION_CONTRACTORS',
    PLUMBING_HEATING_AND_AIR_CONDITIONING_CONTRACTORS: 'PLUMBING_HEATING_AND_AIR_CONDITIONING_CONTRACTORS',
    OTHER_BUILDING_EQUIPMENT_CONTRACTORS: 'OTHER_BUILDING_EQUIPMENT_CONTRACTORS',
    DRYWALL_AND_INSULATION_CONTRACTORS: 'DRYWALL_AND_INSULATION_CONTRACTORS',
    PAINTING_AND_WALL_COVERING_CONTRACTORS: 'PAINTING_AND_WALL_COVERING_CONTRACTORS',
    FLOORING_CONTRACTORS: 'FLOORING_CONTRACTORS',
    TILE_AND_TERRAZZO_CONTRACTORS: 'TILE_AND_TERRAZZO_CONTRACTORS',
    FINISH_CARPENTRY_CONTRACTORS: 'FINISH_CARPENTRY_CONTRACTORS',
    OTHER_BUILDING_FINISHING_CONTRACTORS: 'OTHER_BUILDING_FINISHING_CONTRACTORS',
    ALL_OTHER_SPECIALTY_TRADE_CONTRACTORS: 'ALL_OTHER_SPECIALTY_TRADE_CONTRACTORS',
    TAXI_SERVICE: 'TAXI_SERVICE',
    LIMOUSINE_SERVICE: 'LIMOUSINE_SERVICE',
    DATA_PROCESSING_HOSTING_AND_RELATED_SERVICES: 'DATA_PROCESSING_HOSTING_AND_RELATED_SERVICES',
    STEAM_AND_AIR_CONDITIONING_SUPPLY: 'STEAM_AND_AIR_CONDITIONING_SUPPLY',
    HYDROELECTRIC_POWER_GENERATION: 'HYDROELECTRIC_POWER_GENERATION',
    FOSSIL_FUEL_ELECTRIC_POWER_GENERATION: 'FOSSIL_FUEL_ELECTRIC_POWER_GENERATION',
    NUCLEAR_ELECTRIC_POWER_GENERATION: 'NUCLEAR_ELECTRIC_POWER_GENERATION',
    SOLAR_ELECTRIC_POWER_GENERATION: 'SOLAR_ELECTRIC_POWER_GENERATION',
    WIND_ELECTRIC_POWER_GENERATION: 'WIND_ELECTRIC_POWER_GENERATION',
    GEOTHERMAL_ELECTRIC_POWER_GENERATION: 'GEOTHERMAL_ELECTRIC_POWER_GENERATION',
    BIOMASS_ELECTRIC_POWER_GENERATION: 'BIOMASS_ELECTRIC_POWER_GENERATION',
    OTHER_ELECTRIC_POWER_GENERATION: 'OTHER_ELECTRIC_POWER_GENERATION',
    ELECTRIC_BULK_POWER_TRANSMISSION_AND_CONTROL: 'ELECTRIC_BULK_POWER_TRANSMISSION_AND_CONTROL',
    ELECTRIC_POWER_DISTRIBUTION: 'ELECTRIC_POWER_DISTRIBUTION',
    NATURAL_GAS_DISTRIBUTION: 'NATURAL_GAS_DISTRIBUTION',
    WATER_SUPPLY_AND_IRRIGATION_SYSTEMS: 'WATER_SUPPLY_AND_IRRIGATION_SYSTEMS',
    SEWAGE_TREATMENT_FACILITIES: 'SEWAGE_TREATMENT_FACILITIES',
    PHOTOGRAPHY_STUDIOS_PORTRAIT: 'PHOTOGRAPHY_STUDIOS_PORTRAIT',
    COMMERCIAL_PHOTOGRAPHY: 'COMMERCIAL_PHOTOGRAPHY',
    PHOTOFINISHING_LABORATORIES_EXCEPT_ONE_HOUR: 'PHOTOFINISHING_LABORATORIES_EXCEPT_ONE_HOUR',
    ALL_OTHER_GENERAL_MERCHANDISE_STORES: 'ALL_OTHER_GENERAL_MERCHANDISE_STORES',
    GENERAL_LINE_GROCERY_MERCHANT_WHOLESALERS: 'GENERAL_LINE_GROCERY_MERCHANT_WHOLESALERS',
    PACKAGED_FROZEN_FOOD_MERCHANT_WHOLESALERS: 'PACKAGED_FROZEN_FOOD_MERCHANT_WHOLESALERS',
    DAIRY_PRODUCT_MERCHANT_WHOLESALERS: 'DAIRY_PRODUCT_MERCHANT_WHOLESALERS',
    POULTRY_AND_POULTRY_PRODUCT_MERCHANT_WHOLESALERS: 'POULTRY_AND_POULTRY_PRODUCT_MERCHANT_WHOLESALERS',
    CONFECTIONERY_MERCHANT_WHOLESALERS: 'CONFECTIONERY_MERCHANT_WHOLESALERS',
    FISH_AND_SEAFOOD_MERCHANT_WHOLESALERS: 'FISH_AND_SEAFOOD_MERCHANT_WHOLESALERS',
    MEAT_AND_MEAT_PRODUCT_MERCHANT_WHOLESALERS: 'MEAT_AND_MEAT_PRODUCT_MERCHANT_WHOLESALERS',
    FRESH_FRUIT_AND_VEGETABLE_MERCHANT_WHOLESALERS: 'FRESH_FRUIT_AND_VEGETABLE_MERCHANT_WHOLESALERS',
    OTHER_GROCERY_AND_RELATED_PRODUCTS_MERCHANT_WHOLESALERS: 'OTHER_GROCERY_AND_RELATED_PRODUCTS_MERCHANT_WHOLESALERS',
    SUPERMARKETS_AND_OTHER_GROCERY_EXCEPT_CONVENIENCE_STORES: 'SUPERMARKETS_AND_OTHER_GROCERY_EXCEPT_CONVENIENCE_STORES',
    MEAT_MARKETS: 'MEAT_MARKETS',
    FISH_AND_SEAFOOD_MARKETS: 'FISH_AND_SEAFOOD_MARKETS',
    FRUIT_AND_VEGETABLE_MARKETS: 'FRUIT_AND_VEGETABLE_MARKETS',
    BAKED_GOODS_STORES: 'BAKED_GOODS_STORES',
    CONFECTIONERY_AND_NUT_STORES: 'CONFECTIONERY_AND_NUT_STORES',
    ALL_OTHER_SPECIALTY_FOOD_STORES: 'ALL_OTHER_SPECIALTY_FOOD_STORES',
    CATERERS: 'CATERERS',
    DRINKING_PLACES_ALCOHOLIC_BEVERAGES: 'DRINKING_PLACES_ALCOHOLIC_BEVERAGES',
    FULL_SERVICE_RESTAURANTS: 'FULL_SERVICE_RESTAURANTS',
    LIMITED_SERVICE_RESTAURANTS: 'LIMITED_SERVICE_RESTAURANTS',
    CAFETERIAS_GRILL_BUFFETS_AND_BUFFETS: 'CAFETERIAS_GRILL_BUFFETS_AND_BUFFETS',
    SNACK_AND_NONALCOHOLIC_BEVERAGE_BARS: 'SNACK_AND_NONALCOHOLIC_BEVERAGE_BARS',
    ELECTRONIC_SHOPPING_AND_MAIL_ORDER_HOUSES: 'ELECTRONIC_SHOPPING_AND_MAIL_ORDER_HOUSES',
    HOBBY_TOY_AND_GAME_STORES: 'HOBBY_TOY_AND_GAME_STORES',
    SEWING_NEEDLEWORK_AND_PIECE_GOODS_STORES: 'SEWING_NEEDLEWORK_AND_PIECE_GOODS_STORES',
    LESSORS_OF_RESIDENTIAL_BUILDINGS_AND_DWELLINGS: 'LESSORS_OF_RESIDENTIAL_BUILDINGS_AND_DWELLINGS',
    LESSORS_OF_NONRESIDENTIAL_BUILDINGS_EXCEPT_MINIWAREHOUSES: 'LESSORS_OF_NONRESIDENTIAL_BUILDINGS_EXCEPT_MINIWAREHOUSES',
    LESSORS_OF_MINIWAREHOUSES_AND_SELF_STORAGE_UNITS: 'LESSORS_OF_MINIWAREHOUSES_AND_SELF_STORAGE_UNITS',
    LESSORS_OF_OTHER_REAL_ESTATE_PROPERTY: 'LESSORS_OF_OTHER_REAL_ESTATE_PROPERTY',
    OFFICES_OF_REAL_ESTATE_AGENTS_AND_BROKERS: 'OFFICES_OF_REAL_ESTATE_AGENTS_AND_BROKERS',
    RESIDENTIAL_PROPERTY_MANAGERS: 'RESIDENTIAL_PROPERTY_MANAGERS',
    NONRESIDENTIAL_PROPERTY_MANAGERS: 'NONRESIDENTIAL_PROPERTY_MANAGERS',
    OFFICES_OF_REAL_ESTATE_APPRAISERS: 'OFFICES_OF_REAL_ESTATE_APPRAISERS',
    OTHER_ACTIVITIES_RELATED_TO_REAL_ESTATE: 'OTHER_ACTIVITIES_RELATED_TO_REAL_ESTATE',
    BARBER_SHOPS: 'BARBER_SHOPS',
    BEAUTY_SALONS: 'BEAUTY_SALONS',
    ALL_OTHER_PERSONAL_SERVICES: 'ALL_OTHER_PERSONAL_SERVICES',
    JANITORIAL_SERVICES: 'JANITORIAL_SERVICES',
    GRAPHIC_DESIGN_SERVICES: 'GRAPHIC_DESIGN_SERVICES',
    OTHER_SPECIALIZED_DESIGN_SERVICES: 'OTHER_SPECIALIZED_DESIGN_SERVICES',
    CUSTOM_COMPUTER_PROGRAMMING_SERVICES: 'CUSTOM_COMPUTER_PROGRAMMING_SERVICES',
    COMPUTER_SYSTEMS_DESIGN_SERVICES: 'COMPUTER_SYSTEMS_DESIGN_SERVICES',
    COMPUTER_FACILITIES_MANAGEMENT_SERVICES: 'COMPUTER_FACILITIES_MANAGEMENT_SERVICES',
    OTHER_COMPUTER_RELATED_SERVICES: 'OTHER_COMPUTER_RELATED_SERVICES',
    ADMINISTRATIVE_AND_GENERAL_MANAGEMENT_CONSULTING_SERVICES: 'ADMINISTRATIVE_AND_GENERAL_MANAGEMENT_CONSULTING_SERVICES',
    HUMAN_RESOURCES_CONSULTING_SERVICES: 'HUMAN_RESOURCES_CONSULTING_SERVICES',
    MARKETING_CONSULTING_SERVICES: 'MARKETING_CONSULTING_SERVICES',
    PHYSICAL_DISTRIBUTION_AND_LOGISTICS_CONSULTING_SERVICES: 'PHYSICAL_DISTRIBUTION_AND_LOGISTICS_CONSULTING_SERVICES',
    OTHER_MANAGEMENT_CONSULTING_SERVICES: 'OTHER_MANAGEMENT_CONSULTING_SERVICES',
    ENVIRONMENTAL_CONSULTING_SERVICES: 'ENVIRONMENTAL_CONSULTING_SERVICES',
    OTHER_SCIENTIFIC_AND_TECHNICAL_CONSULTING_SERVICES: 'OTHER_SCIENTIFIC_AND_TECHNICAL_CONSULTING_SERVICES',
    GENERAL_AUTOMOTIVE_REPAIR: 'GENERAL_AUTOMOTIVE_REPAIR',
    AUTOMOTIVE_EXHAUST_SYSTEM_REPAIR: 'AUTOMOTIVE_EXHAUST_SYSTEM_REPAIR',
    AUTOMOTIVE_TRANSMISSION_REPAIR: 'AUTOMOTIVE_TRANSMISSION_REPAIR',
    OTHER_AUTOMOTIVE_MECHANICAL_ELECTRICAL_REPAIR_AND_MAINTENANCE: 'OTHER_AUTOMOTIVE_MECHANICAL_ELECTRICAL_REPAIR_AND_MAINTENANCE',
    AUTOMOTIVE_BODY_PAINT_AND_INTERIOR_REPAIR_AND_MAINTENANCE: 'AUTOMOTIVE_BODY_PAINT_AND_INTERIOR_REPAIR_AND_MAINTENANCE',
    AUTOMOTIVE_GLASS_REPLACEMENT_SHOPS: 'AUTOMOTIVE_GLASS_REPLACEMENT_SHOPS',
    AUTOMOTIVE_OIL_CHANGE_AND_LUBRICATION_SHOPS: 'AUTOMOTIVE_OIL_CHANGE_AND_LUBRICATION_SHOPS',
    CAR_WASHES: 'CAR_WASHES',
    ALL_OTHER_AUTOMOTIVE_REPAIR_AND_MAINTENANCE: 'ALL_OTHER_AUTOMOTIVE_REPAIR_AND_MAINTENANCE',
    CONSUMER_ELECTRONICS_REPAIR_AND_MAINTENANCE: 'CONSUMER_ELECTRONICS_REPAIR_AND_MAINTENANCE',
    COMPUTER_AND_OFFICE_MACHINE_REPAIR_AND_MAINTENANCE: 'COMPUTER_AND_OFFICE_MACHINE_REPAIR_AND_MAINTENANCE',
    COMMUNICATION_EQUIPMENT_REPAIR_AND_MAINTENANCE: 'COMMUNICATION_EQUIPMENT_REPAIR_AND_MAINTENANCE',
    OTHER_ELECTRONIC_PRECISION_EQUIPMENT_REPAIR_AND_MAINTENANCE: 'OTHER_ELECTRONIC_PRECISION_EQUIPMENT_REPAIR_AND_MAINTENANCE',
    REPAIR_AND_MAINTENANCE_EXCEPT_AUTOMOTIVE_AND_ELECTRONIC: 'REPAIR_AND_MAINTENANCE_EXCEPT_AUTOMOTIVE_AND_ELECTRONIC',
    HOME_AND_GARDEN_EQUIPMENT_REPAIR_AND_MAINTENANCE: 'HOME_AND_GARDEN_EQUIPMENT_REPAIR_AND_MAINTENANCE',
    APPLIANCE_REPAIR_AND_MAINTENANCE: 'APPLIANCE_REPAIR_AND_MAINTENANCE',
    REUPHOLSTERY_AND_FURNITURE_REPAIR: 'REUPHOLSTERY_AND_FURNITURE_REPAIR',
    FOOTWEAR_AND_LEATHER_GOODS_REPAIR: 'FOOTWEAR_AND_LEATHER_GOODS_REPAIR',
    OTHER_PERSONAL_AND_HOUSEHOLD_GOODS_REPAIR_AND_MAINTENANCE: 'OTHER_PERSONAL_AND_HOUSEHOLD_GOODS_REPAIR_AND_MAINTENANCE',
    THEATER_COMPANIES_AND_DINNER_THEATERS: 'THEATER_COMPANIES_AND_DINNER_THEATERS',
    DANCE_COMPANIES: 'DANCE_COMPANIES',
    MUSICAL_GROUPS_AND_ARTISTS: 'MUSICAL_GROUPS_AND_ARTISTS',
    OTHER_PERFORMING_ARTS_COMPANIES: 'OTHER_PERFORMING_ARTS_COMPANIES',
    SPORTS_TEAMS_AND_CLUBS: 'SPORTS_TEAMS_AND_CLUBS',
    RACETRACKS: 'RACETRACKS',
    OTHER_SPECTATOR_SPORTS: 'OTHER_SPECTATOR_SPORTS',
    PROMOTERS_ARTS_SPORTS_EVENTS_FACILITIES: 'PROMOTERS_ARTS_SPORTS_EVENTS_FACILITIES',
    PROMOTERS_ARTS_SPORTS_EVENTS_OUT_FACILITIES: 'PROMOTERS_ARTS_SPORTS_EVENTS_OUT_FACILITIES',
    AGENTS_MANAGERS_FOR_ARTISTS_ATHLETES_OTHER_PUBLIC_FIGURES: 'AGENTS_MANAGERS_FOR_ARTISTS_ATHLETES_OTHER_PUBLIC_FIGURES',
    INDEPENDENT_ARTISTS_WRITERS_AND_PERFORMERS: 'INDEPENDENT_ARTISTS_WRITERS_AND_PERFORMERS',
    ALL_OTHER_AMUSEMENT_AND_RECREATION_INDUSTRIES: 'ALL_OTHER_AMUSEMENT_AND_RECREATION_INDUSTRIES',
    OFFICES_OF_DENTISTS: 'OFFICES_OF_DENTISTS',
    OFFICES_OF_PHYSICIANS_EXCEPT_MENTAL_HEALTH_SPECIALISTS: 'OFFICES_OF_PHYSICIANS_EXCEPT_MENTAL_HEALTH_SPECIALISTS',
    OFFICES_OF_PHYSICIANS_MENTAL_HEALTH_SPECIALISTS: 'OFFICES_OF_PHYSICIANS_MENTAL_HEALTH_SPECIALISTS',
    OFFICES_OF_CHIROPRACTORS: 'OFFICES_OF_CHIROPRACTORS',
    OFFICES_OF_OPTOMETRISTS: 'OFFICES_OF_OPTOMETRISTS',
    OFFICES_OF_MENTAL_HEALTH_PRACTITIONERS_EXCEPT_PHYSICIANS: 'OFFICES_OF_MENTAL_HEALTH_PRACTITIONERS_EXCEPT_PHYSICIANS',
    OFFICES_OF_OCCUPATIONAL_SPEECH_THERAPISTS_AND_AUDIOLOGISTS: 'OFFICES_OF_OCCUPATIONAL_SPEECH_THERAPISTS_AND_AUDIOLOGISTS',
    OFFICES_OF_PODIATRISTS: 'OFFICES_OF_PODIATRISTS',
    OFFICES_OF_ALL_OTHER_MISCELLANEOUS_HEALTH_PRACTITIONERS: 'OFFICES_OF_ALL_OTHER_MISCELLANEOUS_HEALTH_PRACTITIONERS',
    FAMILY_PLANNING_CENTERS: 'FAMILY_PLANNING_CENTERS',
    OUTPATIENT_MENTAL_HEALTH_AND_SUBSTANCE_ABUSE_CENTERS: 'OUTPATIENT_MENTAL_HEALTH_AND_SUBSTANCE_ABUSE_CENTERS',
    HMO_MEDICAL_CENTERS: 'HMO_MEDICAL_CENTERS',
    KIDNEY_DIALYSIS_CENTERS: 'KIDNEY_DIALYSIS_CENTERS',
    FREESTANDING_AMBULATORY_SURGICAL_AND_EMERGENCY_CENTERS: 'FREESTANDING_AMBULATORY_SURGICAL_AND_EMERGENCY_CENTERS',
    ALL_OTHER_OUTPATIENT_CARE_CENTERS: 'ALL_OTHER_OUTPATIENT_CARE_CENTERS',
    MEDICAL_LABORATORIES: 'MEDICAL_LABORATORIES',
    DIAGNOSTIC_IMAGING_CENTERS: 'DIAGNOSTIC_IMAGING_CENTERS',
    HOME_HEALTH_CARE_SERVICES: 'HOME_HEALTH_CARE_SERVICES',
    AMBULANCE_SERVICES: 'AMBULANCE_SERVICES',
    BLOOD_AND_ORGAN_BANKS: 'BLOOD_AND_ORGAN_BANKS',
    ALL_OTHER_MISCELLANEOUS_AMBULATORY_HEALTH_CARE_SERVICES: 'ALL_OTHER_MISCELLANEOUS_AMBULATORY_HEALTH_CARE_SERVICES',
    OFFICES_OF_LAWYERS: 'OFFICES_OF_LAWYERS',
    OFFICES_OF_NOTARIES: 'OFFICES_OF_NOTARIES',
    TITLE_ABSTRACT_AND_SETTLEMENT_OFFICES: 'TITLE_ABSTRACT_AND_SETTLEMENT_OFFICES',
    ALL_OTHER_LEGAL_SERVICES: 'ALL_OTHER_LEGAL_SERVICES',
    GRANTMAKING_FOUNDATIONS: 'GRANTMAKING_FOUNDATIONS',
    VOLUNTARY_HEALTH_ORGANIZATIONS: 'VOLUNTARY_HEALTH_ORGANIZATIONS',
    OTHER_GRANTMAKING_AND_GIVING_SERVICES: 'OTHER_GRANTMAKING_AND_GIVING_SERVICES',
    PROFESSIONAL_ORGANIZATIONS: 'PROFESSIONAL_ORGANIZATIONS',
    CIVIC_AND_SOCIAL_ORGANIZATIONS: 'CIVIC_AND_SOCIAL_ORGANIZATIONS',
    HOTELS_AND_MOTELS_MEMBERSHIP: 'HOTELS_AND_MOTELS_MEMBERSHIP',
    OFFICES_OF_CERTIFIED_PUBLIC_ACCOUNTANTS: 'OFFICES_OF_CERTIFIED_PUBLIC_ACCOUNTANTS',
    TAX_PREPARATION_SERVICES: 'TAX_PREPARATION_SERVICES',
    PAYROLL_SERVICES: 'PAYROLL_SERVICES',
    OTHER_ACCOUNTING_SERVICES: 'OTHER_ACCOUNTING_SERVICES',
    ALL_OTHER_PROFESSIONAL_SCIENTIFIC_AND_TECHNICAL_SERVICES: 'ALL_OTHER_PROFESSIONAL_SCIENTIFIC_AND_TECHNICAL_SERVICES'
} as const;

export type BusinessLegalEntityNaicsCode = typeof BusinessLegalEntityNaicsCode[keyof typeof BusinessLegalEntityNaicsCode];


