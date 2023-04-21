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
import { AchDebitSingleUseToken } from "../model/achDebitSingleUseToken";
import { ListPaymentMethods200Response } from "../model/listPaymentMethods200Response";
import { PaymentMethod } from "../model/paymentMethod";
import { PaymentMethodAttachParams } from "../model/paymentMethodAttachParams";
import { PaymentMethodCreateAchDebitSingleUseTokenParams } from "../model/paymentMethodCreateAchDebitSingleUseTokenParams";
import { PaymentMethodCreateParams } from "../model/paymentMethodCreateParams";
import { PaymentMethodUpdateParams } from "../model/paymentMethodUpdateParams";

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

export enum PaymentMethodsApiApiKeys {
  TilledApiKey,
}

export class PaymentMethodsApi {
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

  public setApiKey(key: PaymentMethodsApiApiKeys, value: string) {
    (this.authentications as any)[PaymentMethodsApiApiKeys[key]].apiKey = value;
  }

  set accessToken(accessToken: string | (() => string)) {
    this.authentications.JWT.accessToken = accessToken;
  }

  public addInterceptor(interceptor: Interceptor) {
    this.interceptors.push(interceptor);
  }

  /**
   * Attaches a PaymentMethod to a Customer. This effectively changes the payment method from single-use to reusable.
   * @summary Attach a Payment Method to a Customer
   * @param tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @param id
   * @param PaymentMethodAttachParams
   */
  public async attachPaymentMethodToCustomer(
    tilled_account: string,
    id: string,
    PaymentMethodAttachParams: PaymentMethodAttachParams,
    options: { headers: { [name: string]: string } } = { headers: {} }
  ): Promise<{ response: http.IncomingMessage; body: PaymentMethod }> {
    const localVarPath =
      this.basePath +
      "/v1/payment-methods/{id}/attach".replace(
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
        "Required parameter tilled_account was null or undefined when calling attachPaymentMethodToCustomer."
      );
    }

    // verify required parameter 'id' is not null or undefined
    if (id === null || id === undefined) {
      throw new Error(
        "Required parameter id was null or undefined when calling attachPaymentMethodToCustomer."
      );
    }

    // verify required parameter 'PaymentMethodAttachParams' is not null or undefined
    if (
      PaymentMethodAttachParams === null ||
      PaymentMethodAttachParams === undefined
    ) {
      throw new Error(
        "Required parameter PaymentMethodAttachParams was null or undefined when calling attachPaymentMethodToCustomer."
      );
    }

    localVarHeaderParams["tilled-account"] = ObjectSerializer.serialize(
      tilled_account,
      "string"
    );
    (<any>Object).assign(localVarHeaderParams, options.headers);

    let localVarUseFormData = false;

    let localVarRequestOptions: localVarRequest.Options = {
      method: "PUT",
      qs: localVarQueryParameters,
      headers: localVarHeaderParams,
      uri: localVarPath,
      useQuerystring: this._useQuerystring,
      json: true,
      body: ObjectSerializer.serialize(
        PaymentMethodAttachParams,
        "PaymentMethodAttachParams"
      ),
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
        body: PaymentMethod;
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
              body = ObjectSerializer.deserialize(body, "PaymentMethod");
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
   * Creates an ACH Debit Single-Use Token, for use in creating a PaymentMethod.
   * @summary Create an ACH Debit Single-Use Token
   * @param tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @param PaymentMethodCreateAchDebitSingleUseTokenParams
   */
  public async createAchDebitSingleUseToken(
    tilled_account: string,
    PaymentMethodCreateAchDebitSingleUseTokenParams: PaymentMethodCreateAchDebitSingleUseTokenParams,
    options: { headers: { [name: string]: string } } = { headers: {} }
  ): Promise<{ response: http.IncomingMessage; body: AchDebitSingleUseToken }> {
    const localVarPath = this.basePath + "/v1/payment-methods/ach-debit-token";
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
        "Required parameter tilled_account was null or undefined when calling createAchDebitSingleUseToken."
      );
    }

    // verify required parameter 'PaymentMethodCreateAchDebitSingleUseTokenParams' is not null or undefined
    if (
      PaymentMethodCreateAchDebitSingleUseTokenParams === null ||
      PaymentMethodCreateAchDebitSingleUseTokenParams === undefined
    ) {
      throw new Error(
        "Required parameter PaymentMethodCreateAchDebitSingleUseTokenParams was null or undefined when calling createAchDebitSingleUseToken."
      );
    }

    localVarHeaderParams["tilled-account"] = ObjectSerializer.serialize(
      tilled_account,
      "string"
    );
    (<any>Object).assign(localVarHeaderParams, options.headers);

    let localVarUseFormData = false;

    let localVarRequestOptions: localVarRequest.Options = {
      method: "POST",
      qs: localVarQueryParameters,
      headers: localVarHeaderParams,
      uri: localVarPath,
      useQuerystring: this._useQuerystring,
      json: true,
      body: ObjectSerializer.serialize(
        PaymentMethodCreateAchDebitSingleUseTokenParams,
        "PaymentMethodCreateAchDebitSingleUseTokenParams"
      ),
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
        body: AchDebitSingleUseToken;
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
                "AchDebitSingleUseToken"
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
   * Creates a PaymentMethod object. Read the [Tilled.js reference](#section/Tilled.js) to learn how to create PaymentMethods via Tilled.js. One of the following is required to create a payment method: `card`, `payment_token`, `ach_debit`, or `eft_debit`.  Note: If you would like to use this endpoint to submit raw cardholder data directly to Tilled\'s API (and not use Tilled.js), you must first submit your PCI Attestation of Compliance (AOC) to Tilled that shows you are currently compliant with the applicable PCI/DSS requirements. Please contact integrations@tilled.com for information on how to submit your documentation.
   * @summary Create a Payment Method
   * @param tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @param PaymentMethodCreateParams
   */
  public async createPaymentMethod(
    tilled_account: string,
    PaymentMethodCreateParams: PaymentMethodCreateParams,
    options: { headers: { [name: string]: string } } = { headers: {} }
  ): Promise<{ response: http.IncomingMessage; body: PaymentMethod }> {
    const localVarPath = this.basePath + "/v1/payment-methods";
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
        "Required parameter tilled_account was null or undefined when calling createPaymentMethod."
      );
    }

    // verify required parameter 'PaymentMethodCreateParams' is not null or undefined
    if (
      PaymentMethodCreateParams === null ||
      PaymentMethodCreateParams === undefined
    ) {
      throw new Error(
        "Required parameter PaymentMethodCreateParams was null or undefined when calling createPaymentMethod."
      );
    }

    localVarHeaderParams["tilled-account"] = ObjectSerializer.serialize(
      tilled_account,
      "string"
    );
    (<any>Object).assign(localVarHeaderParams, options.headers);

    let localVarUseFormData = false;

    let localVarRequestOptions: localVarRequest.Options = {
      method: "POST",
      qs: localVarQueryParameters,
      headers: localVarHeaderParams,
      uri: localVarPath,
      useQuerystring: this._useQuerystring,
      json: true,
      body: ObjectSerializer.serialize(
        PaymentMethodCreateParams,
        "PaymentMethodCreateParams"
      ),
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
        body: PaymentMethod;
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
              body = ObjectSerializer.deserialize(body, "PaymentMethod");
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
   * Detaches a PaymentMethod from a Customer. Once a payment method is detached it can no longer be used to make a charge.
   * @summary Detach a Payment Method from a Customer
   * @param tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @param id
   */
  public async detachPaymentMethodFromCustomer(
    tilled_account: string,
    id: string,
    options: { headers: { [name: string]: string } } = { headers: {} }
  ): Promise<{ response: http.IncomingMessage; body: PaymentMethod }> {
    const localVarPath =
      this.basePath +
      "/v1/payment-methods/{id}/detach".replace(
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
        "Required parameter tilled_account was null or undefined when calling detachPaymentMethodFromCustomer."
      );
    }

    // verify required parameter 'id' is not null or undefined
    if (id === null || id === undefined) {
      throw new Error(
        "Required parameter id was null or undefined when calling detachPaymentMethodFromCustomer."
      );
    }

    localVarHeaderParams["tilled-account"] = ObjectSerializer.serialize(
      tilled_account,
      "string"
    );
    (<any>Object).assign(localVarHeaderParams, options.headers);

    let localVarUseFormData = false;

    let localVarRequestOptions: localVarRequest.Options = {
      method: "PUT",
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
        body: PaymentMethod;
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
              body = ObjectSerializer.deserialize(body, "PaymentMethod");
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
   * Retrieves a PaymentMethod object.
   * @summary Get a Payment Method
   * @param tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @param id
   */
  public async getPaymentMethod(
    tilled_account: string,
    id: string,
    options: { headers: { [name: string]: string } } = { headers: {} }
  ): Promise<{ response: http.IncomingMessage; body: PaymentMethod }> {
    const localVarPath =
      this.basePath +
      "/v1/payment-methods/{id}".replace(
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
        "Required parameter tilled_account was null or undefined when calling getPaymentMethod."
      );
    }

    // verify required parameter 'id' is not null or undefined
    if (id === null || id === undefined) {
      throw new Error(
        "Required parameter id was null or undefined when calling getPaymentMethod."
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
        body: PaymentMethod;
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
              body = ObjectSerializer.deserialize(body, "PaymentMethod");
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
   * Returns a list of PaymentMethods for a given Customer.
   * @summary List a Customer\'s Payment Methods
   * @param tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @param type Only return payment methods of the given type.
   * @param customer_id Customer identifier
   * @param metadata &#x60;metadata&#x60; key-value pairs to filter by. Only exact matches on the key-value pair(s) will be returned. Example: &#x60;?metadata[internal_customer_id]&#x3D;7cb1159d-875e-47ae-a309-319fa7ff395b&#x60;.
   * @param offset The (zero-based) offset of the first item in the collection to return.
   * @param limit The maximum number of entries to return. If the value exceeds the maximum, then the maximum value will be used.
   */
  public async listPaymentMethods(
    tilled_account: string,
    type: "card" | "ach_debit" | "eft_debit",
    customer_id: string,
    metadata?: { [key: string]: string },
    offset?: number,
    limit?: number,
    options: { headers: { [name: string]: string } } = { headers: {} }
  ): Promise<{
    response: http.IncomingMessage;
    body: ListPaymentMethods200Response;
  }> {
    const localVarPath = this.basePath + "/v1/payment-methods";
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
        "Required parameter tilled_account was null or undefined when calling listPaymentMethods."
      );
    }

    // verify required parameter 'type' is not null or undefined
    if (type === null || type === undefined) {
      throw new Error(
        "Required parameter type was null or undefined when calling listPaymentMethods."
      );
    }

    // verify required parameter 'customer_id' is not null or undefined
    if (customer_id === null || customer_id === undefined) {
      throw new Error(
        "Required parameter customer_id was null or undefined when calling listPaymentMethods."
      );
    }

    if (metadata !== undefined) {
      localVarQueryParameters["metadata"] = ObjectSerializer.serialize(
        metadata,
        "{ [key: string]: string; }"
      );
    }

    if (type !== undefined) {
      localVarQueryParameters["type"] = ObjectSerializer.serialize(
        type,
        "'card' | 'ach_debit' | 'eft_debit'"
      );
    }

    if (customer_id !== undefined) {
      localVarQueryParameters["customer_id"] = ObjectSerializer.serialize(
        customer_id,
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
        body: ListPaymentMethods200Response;
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
                "ListPaymentMethods200Response"
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
   * Updates a PaymentMethod object. A PaymentMethod must be attached to a customer to be updated.
   * @summary Update a Payment Method
   * @param tilled_account The id of the Tilled Account (usually starting with the prefix &#x60;acct_&#x60;) that the request is performed on behalf of.
   * @param id
   * @param PaymentMethodUpdateParams
   */
  public async updatePaymentMethod(
    tilled_account: string,
    id: string,
    PaymentMethodUpdateParams: PaymentMethodUpdateParams,
    options: { headers: { [name: string]: string } } = { headers: {} }
  ): Promise<{ response: http.IncomingMessage; body: PaymentMethod }> {
    const localVarPath =
      this.basePath +
      "/v1/payment-methods/{id}".replace(
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
        "Required parameter tilled_account was null or undefined when calling updatePaymentMethod."
      );
    }

    // verify required parameter 'id' is not null or undefined
    if (id === null || id === undefined) {
      throw new Error(
        "Required parameter id was null or undefined when calling updatePaymentMethod."
      );
    }

    // verify required parameter 'PaymentMethodUpdateParams' is not null or undefined
    if (
      PaymentMethodUpdateParams === null ||
      PaymentMethodUpdateParams === undefined
    ) {
      throw new Error(
        "Required parameter PaymentMethodUpdateParams was null or undefined when calling updatePaymentMethod."
      );
    }

    localVarHeaderParams["tilled-account"] = ObjectSerializer.serialize(
      tilled_account,
      "string"
    );
    (<any>Object).assign(localVarHeaderParams, options.headers);

    let localVarUseFormData = false;

    let localVarRequestOptions: localVarRequest.Options = {
      method: "PATCH",
      qs: localVarQueryParameters,
      headers: localVarHeaderParams,
      uri: localVarPath,
      useQuerystring: this._useQuerystring,
      json: true,
      body: ObjectSerializer.serialize(
        PaymentMethodUpdateParams,
        "PaymentMethodUpdateParams"
      ),
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
        body: PaymentMethod;
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
              body = ObjectSerializer.deserialize(body, "PaymentMethod");
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
