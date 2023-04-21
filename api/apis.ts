export * from "./aPIKeysApi";
import { APIKeysApi } from "./aPIKeysApi";
export * from "./accountsApi";
import { AccountsApi } from "./accountsApi";
export * from "./applePayDomainsApi";
import { ApplePayDomainsApi } from "./applePayDomainsApi";
export * from "./authLinksApi";
import { AuthLinksApi } from "./authLinksApi";
export * from "./balanceTransactionsApi";
import { BalanceTransactionsApi } from "./balanceTransactionsApi";
export * from "./chargesApi";
import { ChargesApi } from "./chargesApi";
export * from "./checkoutSessionsApi";
import { CheckoutSessionsApi } from "./checkoutSessionsApi";
export * from "./customersApi";
import { CustomersApi } from "./customersApi";
export * from "./disputesApi";
import { DisputesApi } from "./disputesApi";
export * from "./eventsApi";
import { EventsApi } from "./eventsApi";
export * from "./filesApi";
import { FilesApi } from "./filesApi";
export * from "./healthApi";
import { HealthApi } from "./healthApi";
export * from "./onboardingApi";
import { OnboardingApi } from "./onboardingApi";
export * from "./paymentIntentsApi";
import { PaymentIntentsApi } from "./paymentIntentsApi";
export * from "./paymentMethodsApi";
import { PaymentMethodsApi } from "./paymentMethodsApi";
export * from "./payoutsApi";
import { PayoutsApi } from "./payoutsApi";
export * from "./platformFeeRefundsApi";
import { PlatformFeeRefundsApi } from "./platformFeeRefundsApi";
export * from "./platformFeesApi";
import { PlatformFeesApi } from "./platformFeesApi";
export * from "./pricingTemplatesApi";
import { PricingTemplatesApi } from "./pricingTemplatesApi";
export * from "./productCodesApi";
import { ProductCodesApi } from "./productCodesApi";
export * from "./refundsApi";
import { RefundsApi } from "./refundsApi";
export * from "./reportRunsApi";
import { ReportRunsApi } from "./reportRunsApi";
export * from "./subscriptionsApi";
import { SubscriptionsApi } from "./subscriptionsApi";
export * from "./usersApi";
import { UsersApi } from "./usersApi";
export * from "./webhookEndpointsApi";
import { WebhookEndpointsApi } from "./webhookEndpointsApi";
import * as http from "http";

export class HttpError extends Error {
  constructor(
    public response: http.IncomingMessage,
    public body: any,
    public statusCode?: number
  ) {
    super("HTTP request failed");
    this.name = "HttpError";
  }
}

export { RequestFile } from "../model/models";

export const APIS = [
  APIKeysApi,
  AccountsApi,
  ApplePayDomainsApi,
  AuthLinksApi,
  BalanceTransactionsApi,
  ChargesApi,
  CheckoutSessionsApi,
  CustomersApi,
  DisputesApi,
  EventsApi,
  FilesApi,
  HealthApi,
  OnboardingApi,
  PaymentIntentsApi,
  PaymentMethodsApi,
  PayoutsApi,
  PlatformFeeRefundsApi,
  PlatformFeesApi,
  PricingTemplatesApi,
  ProductCodesApi,
  RefundsApi,
  ReportRunsApi,
  SubscriptionsApi,
  UsersApi,
  WebhookEndpointsApi,
];
