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


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, type RequestArgs, BaseAPI, RequiredError, operationServerMap } from '../base';
// @ts-ignore
import type { Event } from '../model';
// @ts-ignore
import type { ListEvents200Response } from '../model';
/**
 * EventsApi - axios parameter creator
 * @export
 */
export const EventsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Retrieves the details of an Event.
         * @summary Get an Event
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getEvent: async (tilled_account: string, id: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('getEvent', 'tilled_account', tilled_account)
            // verify required parameter 'id' is not null or undefined
            assertParamExists('getEvent', 'id', id)
            const localVarPath = `/v1/events/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication JWT required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            // authentication TilledApiKey required
            await setApiKeyToObject(localVarHeaderParameter, "tilled-api-key", configuration)

            if (tilled_account != null) {
                localVarHeaderParameter['tilled-account'] = String(tilled_account);
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Returns a list of Events from the past 30 days. The Events are sorted with the most recently created appearing first.
         * @summary List all Events
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} [created_at_gte] Minimum &#x60;created_at&#x60; value to filter by (inclusive).
         * @param {string} [created_at_lte] Maximum &#x60;created_at&#x60; value to filter by (inclusive).
         * @param {Array<ListEventsTypes>} [types] An array of up to 20 strings containing specific event names. The list will be filtered to include only events with a matching event property.
         * @param {string} [object_id] Id of related resource. The list will be filtered to include events that are related to the resource with this id.
         * @param {number} [offset] The (zero-based) offset of the first item in the collection to return.
         * @param {number} [limit] The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listEvents: async (tilled_account: string, created_at_gte?: string, created_at_lte?: string, types?: Array<ListEventsTypes>, object_id?: string, offset?: number, limit?: number, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tilled_account' is not null or undefined
            assertParamExists('listEvents', 'tilled_account', tilled_account)
            const localVarPath = `/v1/events`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication JWT required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            // authentication TilledApiKey required
            await setApiKeyToObject(localVarHeaderParameter, "tilled-api-key", configuration)

            if (created_at_gte !== undefined) {
                localVarQueryParameter['created_at_gte'] = (created_at_gte as any instanceof Date) ?
                    (created_at_gte as any).toISOString() :
                    created_at_gte;
            }

            if (created_at_lte !== undefined) {
                localVarQueryParameter['created_at_lte'] = (created_at_lte as any instanceof Date) ?
                    (created_at_lte as any).toISOString() :
                    created_at_lte;
            }

            if (types) {
                localVarQueryParameter['types'] = types;
            }

            if (object_id !== undefined) {
                localVarQueryParameter['object_id'] = object_id;
            }

            if (offset !== undefined) {
                localVarQueryParameter['offset'] = offset;
            }

            if (limit !== undefined) {
                localVarQueryParameter['limit'] = limit;
            }

            if (tilled_account != null) {
                localVarHeaderParameter['tilled-account'] = String(tilled_account);
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * EventsApi - functional programming interface
 * @export
 */
export const EventsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = EventsApiAxiosParamCreator(configuration)
    return {
        /**
         * Retrieves the details of an Event.
         * @summary Get an Event
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getEvent(tilled_account: string, id: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Event>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getEvent(tilled_account, id, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['EventsApi.getEvent']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * Returns a list of Events from the past 30 days. The Events are sorted with the most recently created appearing first.
         * @summary List all Events
         * @param {string} tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
         * @param {string} [created_at_gte] Minimum &#x60;created_at&#x60; value to filter by (inclusive).
         * @param {string} [created_at_lte] Maximum &#x60;created_at&#x60; value to filter by (inclusive).
         * @param {Array<ListEventsTypes>} [types] An array of up to 20 strings containing specific event names. The list will be filtered to include only events with a matching event property.
         * @param {string} [object_id] Id of related resource. The list will be filtered to include events that are related to the resource with this id.
         * @param {number} [offset] The (zero-based) offset of the first item in the collection to return.
         * @param {number} [limit] The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listEvents(tilled_account: string, created_at_gte?: string, created_at_lte?: string, types?: Array<ListEventsTypes>, object_id?: string, offset?: number, limit?: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ListEvents200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listEvents(tilled_account, created_at_gte, created_at_lte, types, object_id, offset, limit, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['EventsApi.listEvents']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * EventsApi - factory interface
 * @export
 */
export const EventsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = EventsApiFp(configuration)
    return {
        /**
         * Retrieves the details of an Event.
         * @summary Get an Event
         * @param {EventsApiGetEventRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getEvent(requestParameters: EventsApiGetEventRequest, options?: RawAxiosRequestConfig): AxiosPromise<Event> {
            return localVarFp.getEvent(requestParameters.tilled_account, requestParameters.id, options).then((request) => request(axios, basePath));
        },
        /**
         * Returns a list of Events from the past 30 days. The Events are sorted with the most recently created appearing first.
         * @summary List all Events
         * @param {EventsApiListEventsRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listEvents(requestParameters: EventsApiListEventsRequest, options?: RawAxiosRequestConfig): AxiosPromise<ListEvents200Response> {
            return localVarFp.listEvents(requestParameters.tilled_account, requestParameters.created_at_gte, requestParameters.created_at_lte, requestParameters.types, requestParameters.object_id, requestParameters.offset, requestParameters.limit, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for getEvent operation in EventsApi.
 * @export
 * @interface EventsApiGetEventRequest
 */
export interface EventsApiGetEventRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof EventsApiGetEvent
     */
    readonly tilled_account: string

    /**
     * 
     * @type {string}
     * @memberof EventsApiGetEvent
     */
    readonly id: string
}

/**
 * Request parameters for listEvents operation in EventsApi.
 * @export
 * @interface EventsApiListEventsRequest
 */
export interface EventsApiListEventsRequest {
    /**
     * The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
     * @type {string}
     * @memberof EventsApiListEvents
     */
    readonly tilled_account: string

    /**
     * Minimum &#x60;created_at&#x60; value to filter by (inclusive).
     * @type {string}
     * @memberof EventsApiListEvents
     */
    readonly created_at_gte?: string

    /**
     * Maximum &#x60;created_at&#x60; value to filter by (inclusive).
     * @type {string}
     * @memberof EventsApiListEvents
     */
    readonly created_at_lte?: string

    /**
     * An array of up to 20 strings containing specific event names. The list will be filtered to include only events with a matching event property.
     * @type {Array<'account.updated' | 'charge.captured' | 'charge.expired' | 'charge.failed' | 'charge.succeeded' | 'charge.pending' | 'charge.refunded' | 'charge.refund.pending' | 'charge.refund.updated' | 'charge.updated' | 'customer.created' | 'customer.deleted' | 'customer.updated' | 'dispute.created' | 'dispute.updated' | 'payment_intent.canceled' | 'payment_intent.created' | 'payment_intent.payment_failed' | 'payment_intent.processing' | 'payment_intent.requires_action' | 'payment_intent.succeeded' | 'payment_intent.amount_capturable_updated' | 'payment_method.attached' | 'payment_method.detached' | 'payment_method.updated' | 'payout.created' | 'payout.failed' | 'payout.paid' | 'payout.updated' | 'platform_fee.created' | 'platform_fee.refunded' | 'subscription.created' | 'subscription.canceled' | 'subscription.updated' | 'report_run.succeeded' | 'report_run.failed' | 'esignature_document.sent' | 'esignature_document.completed' | 'esignature_signer.sent' | 'esignature_signer.viewed' | 'esignature_signer.completed' | 'outbound_transfer.pending' | 'outbound_transfer.failed' | 'outbound_transfer.canceled' | 'outbound_transfer.succeeded'>}
     * @memberof EventsApiListEvents
     */
    readonly types?: Array<ListEventsTypes>

    /**
     * Id of related resource. The list will be filtered to include events that are related to the resource with this id.
     * @type {string}
     * @memberof EventsApiListEvents
     */
    readonly object_id?: string

    /**
     * The (zero-based) offset of the first item in the collection to return.
     * @type {number}
     * @memberof EventsApiListEvents
     */
    readonly offset?: number

    /**
     * The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
     * @type {number}
     * @memberof EventsApiListEvents
     */
    readonly limit?: number
}

/**
 * EventsApi - object-oriented interface
 * @export
 * @class EventsApi
 * @extends {BaseAPI}
 */
export class EventsApi extends BaseAPI {
    /**
     * Retrieves the details of an Event.
     * @summary Get an Event
     * @param {EventsApiGetEventRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EventsApi
     */
    public getEvent(requestParameters: EventsApiGetEventRequest, options?: RawAxiosRequestConfig) {
        return EventsApiFp(this.configuration).getEvent(requestParameters.tilled_account, requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Returns a list of Events from the past 30 days. The Events are sorted with the most recently created appearing first.
     * @summary List all Events
     * @param {EventsApiListEventsRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EventsApi
     */
    public listEvents(requestParameters: EventsApiListEventsRequest, options?: RawAxiosRequestConfig) {
        return EventsApiFp(this.configuration).listEvents(requestParameters.tilled_account, requestParameters.created_at_gte, requestParameters.created_at_lte, requestParameters.types, requestParameters.object_id, requestParameters.offset, requestParameters.limit, options).then((request) => request(this.axios, this.basePath));
    }
}

/**
 * @export
 */
export const ListEventsTypes = {
    ACCOUNT_UPDATED: 'account.updated',
    CHARGE_CAPTURED: 'charge.captured',
    CHARGE_EXPIRED: 'charge.expired',
    CHARGE_FAILED: 'charge.failed',
    CHARGE_SUCCEEDED: 'charge.succeeded',
    CHARGE_PENDING: 'charge.pending',
    CHARGE_REFUNDED: 'charge.refunded',
    CHARGE_REFUND_PENDING: 'charge.refund.pending',
    CHARGE_REFUND_UPDATED: 'charge.refund.updated',
    CHARGE_UPDATED: 'charge.updated',
    CUSTOMER_CREATED: 'customer.created',
    CUSTOMER_DELETED: 'customer.deleted',
    CUSTOMER_UPDATED: 'customer.updated',
    DISPUTE_CREATED: 'dispute.created',
    DISPUTE_UPDATED: 'dispute.updated',
    PAYMENT_INTENT_CANCELED: 'payment_intent.canceled',
    PAYMENT_INTENT_CREATED: 'payment_intent.created',
    PAYMENT_INTENT_PAYMENT_FAILED: 'payment_intent.payment_failed',
    PAYMENT_INTENT_PROCESSING: 'payment_intent.processing',
    PAYMENT_INTENT_REQUIRES_ACTION: 'payment_intent.requires_action',
    PAYMENT_INTENT_SUCCEEDED: 'payment_intent.succeeded',
    PAYMENT_INTENT_AMOUNT_CAPTURABLE_UPDATED: 'payment_intent.amount_capturable_updated',
    PAYMENT_METHOD_ATTACHED: 'payment_method.attached',
    PAYMENT_METHOD_DETACHED: 'payment_method.detached',
    PAYMENT_METHOD_UPDATED: 'payment_method.updated',
    PAYOUT_CREATED: 'payout.created',
    PAYOUT_FAILED: 'payout.failed',
    PAYOUT_PAID: 'payout.paid',
    PAYOUT_UPDATED: 'payout.updated',
    PLATFORM_FEE_CREATED: 'platform_fee.created',
    PLATFORM_FEE_REFUNDED: 'platform_fee.refunded',
    SUBSCRIPTION_CREATED: 'subscription.created',
    SUBSCRIPTION_CANCELED: 'subscription.canceled',
    SUBSCRIPTION_UPDATED: 'subscription.updated',
    REPORT_RUN_SUCCEEDED: 'report_run.succeeded',
    REPORT_RUN_FAILED: 'report_run.failed',
    ESIGNATURE_DOCUMENT_SENT: 'esignature_document.sent',
    ESIGNATURE_DOCUMENT_COMPLETED: 'esignature_document.completed',
    ESIGNATURE_SIGNER_SENT: 'esignature_signer.sent',
    ESIGNATURE_SIGNER_VIEWED: 'esignature_signer.viewed',
    ESIGNATURE_SIGNER_COMPLETED: 'esignature_signer.completed',
    OUTBOUND_TRANSFER_PENDING: 'outbound_transfer.pending',
    OUTBOUND_TRANSFER_FAILED: 'outbound_transfer.failed',
    OUTBOUND_TRANSFER_CANCELED: 'outbound_transfer.canceled',
    OUTBOUND_TRANSFER_SUCCEEDED: 'outbound_transfer.succeeded'
} as const;
export type ListEventsTypes = typeof ListEventsTypes[keyof typeof ListEventsTypes];
