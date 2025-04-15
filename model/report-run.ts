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
import type { ReportRunRequestParameters } from './report-run-request-parameters';

/**
 * 
 * @export
 * @interface ReportRun
 */
export interface ReportRun {
    /**
     * The id of the associated account.
     * @type {string}
     * @memberof ReportRun
     */
    'account_id': string;
    /**
     * Time at which the object was created.
     * @type {string}
     * @memberof ReportRun
     */
    'created_at': string;
    /**
     * Unique identifier for the object.
     * @type {string}
     * @memberof ReportRun
     */
    'id': string;
    /**
     * 
     * @type {ReportRunRequestParameters}
     * @memberof ReportRun
     */
    'parameters': ReportRunRequestParameters;
    /**
     * The status of a report run.
     * @type {string}
     * @memberof ReportRun
     */
    'status': ReportRunStatus;
    /**
     * The type of a report run.
     * @type {string}
     * @memberof ReportRun
     */
    'type': ReportRunType;
    /**
     * Time at which the object was last updated.
     * @type {string}
     * @memberof ReportRun
     */
    'updated_at': string;
    /**
     * The failure message of the report run, if status is \'failed\'.
     * @type {string}
     * @memberof ReportRun
     */
    'failure_message'?: string;
    /**
     * 
     * @type {any}
     * @memberof ReportRun
     */
    'result'?: any;
}

export const ReportRunStatus = {
    QUEUED: 'queued',
    FINISHED: 'finished',
    FAILED: 'failed'
} as const;

export type ReportRunStatus = typeof ReportRunStatus[keyof typeof ReportRunStatus];
export const ReportRunType = {
    PAYMENTS_SUMMARY_1: 'payments_summary_1',
    PAYMENTS_SUMMARY_2: 'payments_summary_2',
    PAYOUTS_SUMMARY_1: 'payouts_summary_1',
    PAYOUTS_SUMMARY_2: 'payouts_summary_2',
    PAYOUTS_SUMMARY_3: 'payouts_summary_3',
    PAYOUTS_DETAIL_1: 'payouts_detail_1',
    FEES_SUMMARY_1: 'fees_summary_1',
    PROCESSING_SUMMARY_1: 'processing_summary_1',
    DISPUTES_SUMMARY_1: 'disputes_summary_1',
    INTERCHANGE_DETAIL_1: 'interchange_detail_1',
    INTERCHANGE_DETAIL_2: 'interchange_detail_2'
} as const;

export type ReportRunType = typeof ReportRunType[keyof typeof ReportRunType];


