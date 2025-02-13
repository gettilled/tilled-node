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


// May contain unused imports in some cases
// @ts-ignore
import type { PrincipalAddress } from './principal-address';

/**
 * 
 * @export
 * @interface Principal
 */
export interface Principal {
    /**
     * Registered *residential* address for this principal
     * @type {PrincipalAddress}
     * @memberof Principal
     */
    'address': PrincipalAddress;
    /**
     * Date of birth of the principal. Format must be ISO8601 (e.g. \'2000-01-25\'; format \'YYYY-MM-DD\'). Currently the principal must be older than 18 years of age.
     * @type {string}
     * @memberof Principal
     */
    'date_of_birth': string;
    /**
     * First name of the principal.
     * @type {string}
     * @memberof Principal
     */
    'first_name': string;
    /**
     * Indicates whether this principal is the applicant for the merchant account. For US merchant accounts (`region = US`) it is required that _exactly_ one of the principals is specified as the applicant.
     * @type {boolean}
     * @memberof Principal
     */
    'is_applicant': boolean;
    /**
     * Job title of the principal (e.g. CEO, CFO, President, VP)
     * @type {string}
     * @memberof Principal
     */
    'job_title': string;
    /**
     * Last name of the principal.
     * @type {string}
     * @memberof Principal
     */
    'last_name': string;
    /**
     * Percentage of ownership of the company.
     * @type {number}
     * @memberof Principal
     */
    'percentage_shareholding': number;
    /**
     * Phone number of the principal.
     * @type {string}
     * @memberof Principal
     */
    'phone': string;
    /**
     * Email address of the principal
     * @type {string}
     * @memberof Principal
     */
    'email'?: string;
    /**
     * The unique identifier for this principal. It is not required upon initial submission. The `ssn` property is redacted in any responses, so if the principal needs to be updated then provide this identifier that was generated during the initial request.
     * @type {string}
     * @memberof Principal
     */
    'id'?: string;
    /**
     * This indicates whether the principal is the Control Prong. Control Prong is an individual with significant responsibility for managing the legal entity customer (e.g., a CEO, CFO, COO, Managing Member, General Partner, President, Vice-President, or Treasurer). For US merchant accounts (`region = US`) it is required that _exactly_ one of the principals is specified as the Control Prong.
     * @type {boolean}
     * @memberof Principal
     */
    'is_control_prong'?: boolean;
    /**
     * Middle name of the principal.
     * @type {string}
     * @memberof Principal
     */
    'middle_name'?: string;
    /**
     * Nationality of the principal
     * @type {string}
     * @memberof Principal
     */
    'nationality'?: PrincipalNationality;
    /**
     * Previous registered *residential* address for this principal. Require for Canadian principals and have lived at their current address for fewer than 3 years.
     * @type {PrincipalAddress}
     * @memberof Principal
     */
    'previous_address'?: PrincipalAddress;
    /**
     * Social Security Number (US) or Social Insurance Number (CA). Optional when business type is `NPCORP`, `CHARITY`, or `GOV`. Expected format: 9-digit string of numbers (e.g. \"111444777\"). Optional in CA.
     * @type {string}
     * @memberof Principal
     */
    'ssn'?: string;
    /**
     * Type of representative. Ex. shareholder, director, officer, merchant rep
     * @type {string}
     * @memberof Principal
     */
    'type'?: PrincipalType;
}

export const PrincipalNationality = {
    AF: 'AF',
    AL: 'AL',
    DZ: 'DZ',
    US: 'US',
    AS: 'AS',
    AD: 'AD',
    AO: 'AO',
    AI: 'AI',
    AQ: 'AQ',
    AG: 'AG',
    AR: 'AR',
    AM: 'AM',
    AW: 'AW',
    AU: 'AU',
    AT: 'AT',
    AZ: 'AZ',
    BS: 'BS',
    BH: 'BH',
    BD: 'BD',
    BB: 'BB',
    BL: 'BL',
    BY: 'BY',
    BE: 'BE',
    BZ: 'BZ',
    BJ: 'BJ',
    BM: 'BM',
    BT: 'BT',
    BO: 'BO',
    BA: 'BA',
    BR: 'BR',
    GB: 'GB',
    BN: 'BN',
    BG: 'BG',
    BF: 'BF',
    BI: 'BI',
    KH: 'KH',
    CM: 'CM',
    CA: 'CA',
    CV: 'CV',
    KY: 'KY',
    CF: 'CF',
    TD: 'TD',
    CL: 'CL',
    CN: 'CN',
    CX: 'CX',
    CC: 'CC',
    CO: 'CO',
    KM: 'KM',
    CG: 'CG',
    CD: 'CD',
    CK: 'CK',
    CR: 'CR',
    HR: 'HR',
    CU: 'CU',
    CW: 'CW',
    CY: 'CY',
    CZ: 'CZ',
    DK: 'DK',
    DJ: 'DJ',
    DM: 'DM',
    DO: 'DO',
    NL: 'NL',
    EC: 'EC',
    EG: 'EG',
    AE: 'AE',
    GQ: 'GQ',
    ER: 'ER',
    EE: 'EE',
    ET: 'ET',
    FK: 'FK',
    FO: 'FO',
    FJ: 'FJ',
    PH: 'PH',
    FI: 'FI',
    FR: 'FR',
    GF: 'GF',
    PF: 'PF',
    GA: 'GA',
    GM: 'GM',
    GE: 'GE',
    DE: 'DE',
    GH: 'GH',
    GI: 'GI',
    GR: 'GR',
    GL: 'GL',
    GD: 'GD',
    GP: 'GP',
    GU: 'GU',
    GT: 'GT',
    GW: 'GW',
    GN: 'GN',
    GY: 'GY',
    HT: 'HT',
    HN: 'HN',
    HK: 'HK',
    HU: 'HU',
    KI: 'KI',
    IS: 'IS',
    IN: 'IN',
    ID: 'ID',
    IR: 'IR',
    IQ: 'IQ',
    IE: 'IE',
    IL: 'IL',
    IT: 'IT',
    CI: 'CI',
    JM: 'JM',
    JP: 'JP',
    JO: 'JO',
    KZ: 'KZ',
    KE: 'KE',
    KN: 'KN',
    KW: 'KW',
    KG: 'KG',
    LA: 'LA',
    LV: 'LV',
    LB: 'LB',
    LR: 'LR',
    LY: 'LY',
    LI: 'LI',
    LT: 'LT',
    LU: 'LU',
    MO: 'MO',
    MK: 'MK',
    YT: 'YT',
    MG: 'MG',
    MW: 'MW',
    MY: 'MY',
    MV: 'MV',
    ML: 'ML',
    MT: 'MT',
    IM: 'IM',
    MH: 'MH',
    MQ: 'MQ',
    MR: 'MR',
    MU: 'MU',
    MX: 'MX',
    FM: 'FM',
    MD: 'MD',
    MC: 'MC',
    MN: 'MN',
    ME: 'ME',
    MS: 'MS',
    MA: 'MA',
    LS: 'LS',
    BW: 'BW',
    MZ: 'MZ',
    MM: 'MM',
    NA: 'NA',
    NR: 'NR',
    NP: 'NP',
    NC: 'NC',
    NZ: 'NZ',
    VU: 'VU',
    NI: 'NI',
    NG: 'NG',
    NE: 'NE',
    NU: 'NU',
    NF: 'NF',
    KP: 'KP',
    MP: 'MP',
    NO: 'NO',
    OM: 'OM',
    PK: 'PK',
    PW: 'PW',
    PS: 'PS',
    PA: 'PA',
    PG: 'PG',
    PY: 'PY',
    PE: 'PE',
    PN: 'PN',
    PL: 'PL',
    PT: 'PT',
    PR: 'PR',
    QA: 'QA',
    RO: 'RO',
    RU: 'RU',
    RW: 'RW',
    SH: 'SH',
    LC: 'LC',
    VC: 'VC',
    PM: 'PM',
    SV: 'SV',
    WS: 'WS',
    SM: 'SM',
    SA: 'SA',
    SN: 'SN',
    RS: 'RS',
    SC: 'SC',
    SL: 'SL',
    SG: 'SG',
    SK: 'SK',
    SI: 'SI',
    SB: 'SB',
    SO: 'SO',
    ZA: 'ZA',
    KR: 'KR',
    ES: 'ES',
    LK: 'LK',
    SD: 'SD',
    SS: 'SS',
    SR: 'SR',
    SZ: 'SZ',
    SE: 'SE',
    CH: 'CH',
    SY: 'SY',
    ST: 'ST',
    TW: 'TW',
    TJ: 'TJ',
    TZ: 'TZ',
    TH: 'TH',
    TL: 'TL',
    TG: 'TG',
    TK: 'TK',
    TO: 'TO',
    TT: 'TT',
    TN: 'TN',
    TR: 'TR',
    TM: 'TM',
    TC: 'TC',
    TV: 'TV',
    UG: 'UG',
    UA: 'UA',
    UY: 'UY',
    UZ: 'UZ',
    VE: 'VE',
    VN: 'VN',
    VG: 'VG',
    WF: 'WF',
    EH: 'EH',
    YE: 'YE',
    ZM: 'ZM',
    ZW: 'ZW',
    AX: 'AX'
} as const;

export type PrincipalNationality = typeof PrincipalNationality[keyof typeof PrincipalNationality];
export const PrincipalType = {
    DIRECTOR: 'director',
    SHAREHOLDER: 'shareholder',
    MERCHANT_REP: 'merchant_rep',
    CONTACT: 'contact'
} as const;

export type PrincipalType = typeof PrincipalType[keyof typeof PrincipalType];


