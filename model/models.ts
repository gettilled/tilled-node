import localVarRequest from "request";

export * from "./accessTokenRefreshParams";
export * from "./account";
export * from "./accountBusinessProfile";
export * from "./accountCapability";
export * from "./accountCapabilityCreateParams";
export * from "./accountCapabilityPricingTemplate";
export * from "./accountCapabilityProductCode";
export * from "./accountCapabilityUpdateParams";
export * from "./accountCreateParams";
export * from "./accountCreateParamsBankAccount";
export * from "./accountCreateParamsSettings";
export * from "./accountRequirementsError";
export * from "./accountSettings";
export * from "./accountSettingsBranding";
export * from "./accountSettingsBrandingCreateParams";
export * from "./accountSettingsCreateParams";
export * from "./accountSettingsCreateParamsBranding";
export * from "./accountUpdateParams";
export * from "./achDebitDetails";
export * from "./achDebitSingleUseToken";
export * from "./achDebitSingleUseTokenDetails";
export * from "./address";
export * from "./apiKey";
export * from "./apiKeyCreateParams";
export * from "./apiKeyUpdateParams";
export * from "./applePayDomain";
export * from "./applePayDomainCreateParams";
export * from "./authLinkCreateParams";
export * from "./authLinkDto";
export * from "./bLEBankAccount";
export * from "./balanceTransaction";
export * from "./balanceTransactionFeeDetail";
export * from "./balanceTransactionTypeSummaries";
export * from "./balanceTransactionTypeSummary";
export * from "./balanceTransactionsSummary";
export * from "./balanceTransactionsSummaryParameters";
export * from "./balanceTransactionsSummaryQueryParams";
export * from "./bankAccount";
export * from "./bankAccountCreateParams";
export * from "./baseAddress";
export * from "./businessLegalEntity";
export * from "./businessLegalEntityAchBankAccount";
export * from "./businessLegalEntityAddress";
export * from "./businessLegalEntityBankAccount";
export * from "./businessProfile";
export * from "./businessProfileAddress";
export * from "./businessRepresentative";
export * from "./cardChargeFeeTemplate";
export * from "./cardChecks";
export * from "./cardDetails";
export * from "./cardDetailsChecks";
export * from "./charge";
export * from "./chargeBalanceTransaction";
export * from "./chargePlatformFee";
export * from "./checkoutSession";
export * from "./checkoutSessionCreateParams";
export * from "./checkoutSessionCreateParamsPaymentIntentData";
export * from "./checkoutSessionCustomerDetails";
export * from "./checkoutSessionLineItem";
export * from "./checkoutSessionLineItemPriceData";
export * from "./customer";
export * from "./customerCreateParams";
export * from "./customerDetails";
export * from "./customerUpdateParams";
export * from "./debitFeeTemplate";
export * from "./dispute";
export * from "./disputeEvidence";
export * from "./disputeEvidenceCreateParams";
export * from "./disputeFile";
export * from "./disputeFileCreateParams";
export * from "./disputeFileFile";
export * from "./eftDebitDetails";
export * from "./event";
export * from "./forgotPasswordParams";
export * from "./healthOutput";
export * from "./level3";
export * from "./lineItem";
export * from "./listAPIKeys200Response";
export * from "./listAPIKeys200ResponseAllOf";
export * from "./listApplePayDomains200Response";
export * from "./listApplePayDomains200ResponseAllOf";
export * from "./listBalanceTransactions200Response";
export * from "./listBalanceTransactions200ResponseAllOf";
export * from "./listCheckoutSessions200Response";
export * from "./listCheckoutSessions200ResponseAllOf";
export * from "./listConnectedAccounts200Response";
export * from "./listConnectedAccounts200ResponseAllOf";
export * from "./listCustomers200Response";
export * from "./listCustomers200ResponseAllOf";
export * from "./listDisputes200Response";
export * from "./listDisputes200ResponseAllOf";
export * from "./listEvents200Response";
export * from "./listEvents200ResponseAllOf";
export * from "./listFiles200Response";
export * from "./listFiles200ResponseAllOf";
export * from "./listPaymentIntents200Response";
export * from "./listPaymentIntents200ResponseAllOf";
export * from "./listPaymentMethods200Response";
export * from "./listPaymentMethods200ResponseAllOf";
export * from "./listPayouts200Response";
export * from "./listPayouts200ResponseAllOf";
export * from "./listPlatformFees200Response";
export * from "./listPlatformFees200ResponseAllOf";
export * from "./listPricingTemplates200Response";
export * from "./listPricingTemplates200ResponseAllOf";
export * from "./listProductCodes200Response";
export * from "./listProductCodes200ResponseAllOf";
export * from "./listRefunds200Response";
export * from "./listRefunds200ResponseAllOf";
export * from "./listReportRuns200Response";
export * from "./listReportRuns200ResponseAllOf";
export * from "./listSubscriptions200Response";
export * from "./listSubscriptions200ResponseAllOf";
export * from "./listUserInvitations200Response";
export * from "./listUserInvitations200ResponseAllOf";
export * from "./listUsers200Response";
export * from "./listUsers200ResponseAllOf";
export * from "./listWebhookEndpoints200Response";
export * from "./listWebhookEndpoints200ResponseAllOf";
export * from "./loginDto";
export * from "./loginDtoUser";
export * from "./loginParams";
export * from "./markup";
export * from "./merchantApplication";
export * from "./merchantApplicationBusinessLegalEntity";
export * from "./merchantApplicationCreateParams";
export * from "./modelFile";
export * from "./paginatedDto";
export * from "./partialAddress";
export * from "./paymentIntent";
export * from "./paymentIntentCancelParams";
export * from "./paymentIntentCaptureParams";
export * from "./paymentIntentConfirmParams";
export * from "./paymentIntentCreateParams";
export * from "./paymentIntentCustomer";
export * from "./paymentIntentDataCreateParams";
export * from "./paymentIntentError";
export * from "./paymentIntentLastPaymentError";
export * from "./paymentIntentLevel3";
export * from "./paymentIntentPaymentMethod";
export * from "./paymentIntentUpdateParams";
export * from "./paymentMethod";
export * from "./paymentMethodAchDebit";
export * from "./paymentMethodAttachParams";
export * from "./paymentMethodBillingDetails";
export * from "./paymentMethodBillingDetailsAddress";
export * from "./paymentMethodCard";
export * from "./paymentMethodCreateAchDebitSingleUseTokenParams";
export * from "./paymentMethodCreateAchDebitSingleUseTokenParamsAchDebit";
export * from "./paymentMethodCreateAchDebitSingleUseTokenParamsBillingDetails";
export * from "./paymentMethodCreateDebitSingleUseTokenParamsBillingDetails";
export * from "./paymentMethodCreateDebitSingleUseTokenParamsBillingDetailsAddress";
export * from "./paymentMethodCreateParams";
export * from "./paymentMethodCreateParamsAchDebit";
export * from "./paymentMethodCreateParamsBillingDetails";
export * from "./paymentMethodCreateParamsCard";
export * from "./paymentMethodCreateParamsEftDebit";
export * from "./paymentMethodEftDebit";
export * from "./paymentMethodUpdateParams";
export * from "./payout";
export * from "./payoutBalanceTransaction";
export * from "./platformFee";
export * from "./platformFeeBalanceTransaction";
export * from "./platformFeeRefund";
export * from "./platformFeeRefundBalanceTransaction";
export * from "./price";
export * from "./priceProductData";
export * from "./pricingTemplate";
export * from "./pricingTemplateAchDebit";
export * from "./pricingTemplateCard";
export * from "./pricingTemplateEftDebit";
export * from "./principal";
export * from "./principalAddress";
export * from "./principalPreviousAddress";
export * from "./product";
export * from "./productCode";
export * from "./refund";
export * from "./refundCreateParams";
export * from "./registerDto";
export * from "./registerDtoAccount";
export * from "./registerDtoUser";
export * from "./registerParams";
export * from "./reportMetadataKey";
export * from "./reportRun";
export * from "./reportRunCreateParams";
export * from "./reportRunCreateParamsParameters";
export * from "./reportRunRequestParameters";
export * from "./reportRunRetrieveParams";
export * from "./subscription";
export * from "./subscriptionCreateParams";
export * from "./subscriptionPauseParams";
export * from "./subscriptionRetryParams";
export * from "./subscriptionUpdateParams";
export * from "./terminalReader";
export * from "./termsAndConditionsDetail";
export * from "./user";
export * from "./userCreateParams";
export * from "./userInvitation";
export * from "./userInvitationCheck";
export * from "./userInvitationCreateParams";
export * from "./userResetPasswordParams";
export * from "./userUpdateParams";
export * from "./webhookEndpoint";
export * from "./webhookEndpointCreateParams";
export * from "./webhookEndpointUpdateParams";

import * as fs from "fs";

export interface RequestDetailedFile {
  value: Buffer;
  options?: {
    filename?: string;
    contentType?: string;
  };
}

export type RequestFile = string | Buffer | fs.ReadStream | RequestDetailedFile;

import { AccessTokenRefreshParams } from "./accessTokenRefreshParams";
import { Account } from "./account";
import { AccountBusinessProfile } from "./accountBusinessProfile";
import { AccountCapability } from "./accountCapability";
import { AccountCapabilityCreateParams } from "./accountCapabilityCreateParams";
import { AccountCapabilityPricingTemplate } from "./accountCapabilityPricingTemplate";
import { AccountCapabilityProductCode } from "./accountCapabilityProductCode";
import { AccountCapabilityUpdateParams } from "./accountCapabilityUpdateParams";
import { AccountCreateParams } from "./accountCreateParams";
import { AccountCreateParamsBankAccount } from "./accountCreateParamsBankAccount";
import { AccountCreateParamsSettings } from "./accountCreateParamsSettings";
import { AccountRequirementsError } from "./accountRequirementsError";
import { AccountSettings } from "./accountSettings";
import { AccountSettingsBranding } from "./accountSettingsBranding";
import { AccountSettingsBrandingCreateParams } from "./accountSettingsBrandingCreateParams";
import { AccountSettingsCreateParams } from "./accountSettingsCreateParams";
import { AccountSettingsCreateParamsBranding } from "./accountSettingsCreateParamsBranding";
import { AccountUpdateParams } from "./accountUpdateParams";
import { AchDebitDetails } from "./achDebitDetails";
import { AchDebitSingleUseToken } from "./achDebitSingleUseToken";
import { AchDebitSingleUseTokenDetails } from "./achDebitSingleUseTokenDetails";
import { Address } from "./address";
import { ApiKey } from "./apiKey";
import { ApiKeyCreateParams } from "./apiKeyCreateParams";
import { ApiKeyUpdateParams } from "./apiKeyUpdateParams";
import { ApplePayDomain } from "./applePayDomain";
import { ApplePayDomainCreateParams } from "./applePayDomainCreateParams";
import { AuthLinkCreateParams } from "./authLinkCreateParams";
import { AuthLinkDto } from "./authLinkDto";
import { BLEBankAccount } from "./bLEBankAccount";
import { BalanceTransaction } from "./balanceTransaction";
import { BalanceTransactionFeeDetail } from "./balanceTransactionFeeDetail";
import { BalanceTransactionTypeSummaries } from "./balanceTransactionTypeSummaries";
import { BalanceTransactionTypeSummary } from "./balanceTransactionTypeSummary";
import { BalanceTransactionsSummary } from "./balanceTransactionsSummary";
import { BalanceTransactionsSummaryParameters } from "./balanceTransactionsSummaryParameters";
import { BalanceTransactionsSummaryQueryParams } from "./balanceTransactionsSummaryQueryParams";
import { BankAccount } from "./bankAccount";
import { BankAccountCreateParams } from "./bankAccountCreateParams";
import { BaseAddress } from "./baseAddress";
import { BusinessLegalEntity } from "./businessLegalEntity";
import { BusinessLegalEntityAchBankAccount } from "./businessLegalEntityAchBankAccount";
import { BusinessLegalEntityAddress } from "./businessLegalEntityAddress";
import { BusinessLegalEntityBankAccount } from "./businessLegalEntityBankAccount";
import { BusinessProfile } from "./businessProfile";
import { BusinessProfileAddress } from "./businessProfileAddress";
import { BusinessRepresentative } from "./businessRepresentative";
import { CardChargeFeeTemplate } from "./cardChargeFeeTemplate";
import { CardChecks } from "./cardChecks";
import { CardDetails } from "./cardDetails";
import { CardDetailsChecks } from "./cardDetailsChecks";
import { Charge } from "./charge";
import { ChargeBalanceTransaction } from "./chargeBalanceTransaction";
import { ChargePlatformFee } from "./chargePlatformFee";
import { CheckoutSession } from "./checkoutSession";
import { CheckoutSessionCreateParams } from "./checkoutSessionCreateParams";
import { CheckoutSessionCreateParamsPaymentIntentData } from "./checkoutSessionCreateParamsPaymentIntentData";
import { CheckoutSessionCustomerDetails } from "./checkoutSessionCustomerDetails";
import { CheckoutSessionLineItem } from "./checkoutSessionLineItem";
import { CheckoutSessionLineItemPriceData } from "./checkoutSessionLineItemPriceData";
import { Customer } from "./customer";
import { CustomerCreateParams } from "./customerCreateParams";
import { CustomerDetails } from "./customerDetails";
import { CustomerUpdateParams } from "./customerUpdateParams";
import { DebitFeeTemplate } from "./debitFeeTemplate";
import { Dispute } from "./dispute";
import { DisputeEvidence } from "./disputeEvidence";
import { DisputeEvidenceCreateParams } from "./disputeEvidenceCreateParams";
import { DisputeFile } from "./disputeFile";
import { DisputeFileCreateParams } from "./disputeFileCreateParams";
import { DisputeFileFile } from "./disputeFileFile";
import { EftDebitDetails } from "./eftDebitDetails";
import { Event } from "./event";
import { ForgotPasswordParams } from "./forgotPasswordParams";
import { HealthOutput } from "./healthOutput";
import { Level3 } from "./level3";
import { LineItem } from "./lineItem";
import { ListAPIKeys200Response } from "./listAPIKeys200Response";
import { ListAPIKeys200ResponseAllOf } from "./listAPIKeys200ResponseAllOf";
import { ListApplePayDomains200Response } from "./listApplePayDomains200Response";
import { ListApplePayDomains200ResponseAllOf } from "./listApplePayDomains200ResponseAllOf";
import { ListBalanceTransactions200Response } from "./listBalanceTransactions200Response";
import { ListBalanceTransactions200ResponseAllOf } from "./listBalanceTransactions200ResponseAllOf";
import { ListCheckoutSessions200Response } from "./listCheckoutSessions200Response";
import { ListCheckoutSessions200ResponseAllOf } from "./listCheckoutSessions200ResponseAllOf";
import { ListConnectedAccounts200Response } from "./listConnectedAccounts200Response";
import { ListConnectedAccounts200ResponseAllOf } from "./listConnectedAccounts200ResponseAllOf";
import { ListCustomers200Response } from "./listCustomers200Response";
import { ListCustomers200ResponseAllOf } from "./listCustomers200ResponseAllOf";
import { ListDisputes200Response } from "./listDisputes200Response";
import { ListDisputes200ResponseAllOf } from "./listDisputes200ResponseAllOf";
import { ListEvents200Response } from "./listEvents200Response";
import { ListEvents200ResponseAllOf } from "./listEvents200ResponseAllOf";
import { ListFiles200Response } from "./listFiles200Response";
import { ListFiles200ResponseAllOf } from "./listFiles200ResponseAllOf";
import { ListPaymentIntents200Response } from "./listPaymentIntents200Response";
import { ListPaymentIntents200ResponseAllOf } from "./listPaymentIntents200ResponseAllOf";
import { ListPaymentMethods200Response } from "./listPaymentMethods200Response";
import { ListPaymentMethods200ResponseAllOf } from "./listPaymentMethods200ResponseAllOf";
import { ListPayouts200Response } from "./listPayouts200Response";
import { ListPayouts200ResponseAllOf } from "./listPayouts200ResponseAllOf";
import { ListPlatformFees200Response } from "./listPlatformFees200Response";
import { ListPlatformFees200ResponseAllOf } from "./listPlatformFees200ResponseAllOf";
import { ListPricingTemplates200Response } from "./listPricingTemplates200Response";
import { ListPricingTemplates200ResponseAllOf } from "./listPricingTemplates200ResponseAllOf";
import { ListProductCodes200Response } from "./listProductCodes200Response";
import { ListProductCodes200ResponseAllOf } from "./listProductCodes200ResponseAllOf";
import { ListRefunds200Response } from "./listRefunds200Response";
import { ListRefunds200ResponseAllOf } from "./listRefunds200ResponseAllOf";
import { ListReportRuns200Response } from "./listReportRuns200Response";
import { ListReportRuns200ResponseAllOf } from "./listReportRuns200ResponseAllOf";
import { ListSubscriptions200Response } from "./listSubscriptions200Response";
import { ListSubscriptions200ResponseAllOf } from "./listSubscriptions200ResponseAllOf";
import { ListUserInvitations200Response } from "./listUserInvitations200Response";
import { ListUserInvitations200ResponseAllOf } from "./listUserInvitations200ResponseAllOf";
import { ListUsers200Response } from "./listUsers200Response";
import { ListUsers200ResponseAllOf } from "./listUsers200ResponseAllOf";
import { ListWebhookEndpoints200Response } from "./listWebhookEndpoints200Response";
import { ListWebhookEndpoints200ResponseAllOf } from "./listWebhookEndpoints200ResponseAllOf";
import { LoginDto } from "./loginDto";
import { LoginDtoUser } from "./loginDtoUser";
import { LoginParams } from "./loginParams";
import { Markup } from "./markup";
import { MerchantApplication } from "./merchantApplication";
import { MerchantApplicationBusinessLegalEntity } from "./merchantApplicationBusinessLegalEntity";
import { MerchantApplicationCreateParams } from "./merchantApplicationCreateParams";
import { ModelFile } from "./modelFile";
import { PaginatedDto } from "./paginatedDto";
import { PartialAddress } from "./partialAddress";
import { PaymentIntent } from "./paymentIntent";
import { PaymentIntentCancelParams } from "./paymentIntentCancelParams";
import { PaymentIntentCaptureParams } from "./paymentIntentCaptureParams";
import { PaymentIntentConfirmParams } from "./paymentIntentConfirmParams";
import { PaymentIntentCreateParams } from "./paymentIntentCreateParams";
import { PaymentIntentCustomer } from "./paymentIntentCustomer";
import { PaymentIntentDataCreateParams } from "./paymentIntentDataCreateParams";
import { PaymentIntentError } from "./paymentIntentError";
import { PaymentIntentLastPaymentError } from "./paymentIntentLastPaymentError";
import { PaymentIntentLevel3 } from "./paymentIntentLevel3";
import { PaymentIntentPaymentMethod } from "./paymentIntentPaymentMethod";
import { PaymentIntentUpdateParams } from "./paymentIntentUpdateParams";
import { PaymentMethod } from "./paymentMethod";
import { PaymentMethodAchDebit } from "./paymentMethodAchDebit";
import { PaymentMethodAttachParams } from "./paymentMethodAttachParams";
import { PaymentMethodBillingDetails } from "./paymentMethodBillingDetails";
import { PaymentMethodBillingDetailsAddress } from "./paymentMethodBillingDetailsAddress";
import { PaymentMethodCard } from "./paymentMethodCard";
import { PaymentMethodCreateAchDebitSingleUseTokenParams } from "./paymentMethodCreateAchDebitSingleUseTokenParams";
import { PaymentMethodCreateAchDebitSingleUseTokenParamsAchDebit } from "./paymentMethodCreateAchDebitSingleUseTokenParamsAchDebit";
import { PaymentMethodCreateAchDebitSingleUseTokenParamsBillingDetails } from "./paymentMethodCreateAchDebitSingleUseTokenParamsBillingDetails";
import { PaymentMethodCreateDebitSingleUseTokenParamsBillingDetails } from "./paymentMethodCreateDebitSingleUseTokenParamsBillingDetails";
import { PaymentMethodCreateDebitSingleUseTokenParamsBillingDetailsAddress } from "./paymentMethodCreateDebitSingleUseTokenParamsBillingDetailsAddress";
import { PaymentMethodCreateParams } from "./paymentMethodCreateParams";
import { PaymentMethodCreateParamsAchDebit } from "./paymentMethodCreateParamsAchDebit";
import { PaymentMethodCreateParamsBillingDetails } from "./paymentMethodCreateParamsBillingDetails";
import { PaymentMethodCreateParamsCard } from "./paymentMethodCreateParamsCard";
import { PaymentMethodCreateParamsEftDebit } from "./paymentMethodCreateParamsEftDebit";
import { PaymentMethodEftDebit } from "./paymentMethodEftDebit";
import { PaymentMethodUpdateParams } from "./paymentMethodUpdateParams";
import { Payout } from "./payout";
import { PayoutBalanceTransaction } from "./payoutBalanceTransaction";
import { PlatformFee } from "./platformFee";
import { PlatformFeeBalanceTransaction } from "./platformFeeBalanceTransaction";
import { PlatformFeeRefund } from "./platformFeeRefund";
import { PlatformFeeRefundBalanceTransaction } from "./platformFeeRefundBalanceTransaction";
import { Price } from "./price";
import { PriceProductData } from "./priceProductData";
import { PricingTemplate } from "./pricingTemplate";
import { PricingTemplateAchDebit } from "./pricingTemplateAchDebit";
import { PricingTemplateCard } from "./pricingTemplateCard";
import { PricingTemplateEftDebit } from "./pricingTemplateEftDebit";
import { Principal } from "./principal";
import { PrincipalAddress } from "./principalAddress";
import { PrincipalPreviousAddress } from "./principalPreviousAddress";
import { Product } from "./product";
import { ProductCode } from "./productCode";
import { Refund } from "./refund";
import { RefundCreateParams } from "./refundCreateParams";
import { RegisterDto } from "./registerDto";
import { RegisterDtoAccount } from "./registerDtoAccount";
import { RegisterDtoUser } from "./registerDtoUser";
import { RegisterParams } from "./registerParams";
import { ReportMetadataKey } from "./reportMetadataKey";
import { ReportRun } from "./reportRun";
import { ReportRunCreateParams } from "./reportRunCreateParams";
import { ReportRunCreateParamsParameters } from "./reportRunCreateParamsParameters";
import { ReportRunRequestParameters } from "./reportRunRequestParameters";
import { ReportRunRetrieveParams } from "./reportRunRetrieveParams";
import { Subscription } from "./subscription";
import { SubscriptionCreateParams } from "./subscriptionCreateParams";
import { SubscriptionPauseParams } from "./subscriptionPauseParams";
import { SubscriptionRetryParams } from "./subscriptionRetryParams";
import { SubscriptionUpdateParams } from "./subscriptionUpdateParams";
import { TerminalReader } from "./terminalReader";
import { TermsAndConditionsDetail } from "./termsAndConditionsDetail";
import { User } from "./user";
import { UserCreateParams } from "./userCreateParams";
import { UserInvitation } from "./userInvitation";
import { UserInvitationCheck } from "./userInvitationCheck";
import { UserInvitationCreateParams } from "./userInvitationCreateParams";
import { UserResetPasswordParams } from "./userResetPasswordParams";
import { UserUpdateParams } from "./userUpdateParams";
import { WebhookEndpoint } from "./webhookEndpoint";
import { WebhookEndpointCreateParams } from "./webhookEndpointCreateParams";
import { WebhookEndpointUpdateParams } from "./webhookEndpointUpdateParams";

/* tslint:disable:no-unused-variable */
let primitives = [
  "string",
  "boolean",
  "double",
  "integer",
  "long",
  "float",
  "number",
  "any",
];

let enumsMap: { [index: string]: any } = {
  "Account.Type": Account.Type,
  "AccountBusinessProfile.Category": AccountBusinessProfile.Category,
  "AccountBusinessProfile.Locale": AccountBusinessProfile.Locale,
  "AccountBusinessProfile.Region": AccountBusinessProfile.Region,
  "AccountBusinessProfile.Structure": AccountBusinessProfile.Structure,
  "AccountCapability.Status": AccountCapability.Status,
  "AccountCapabilityPricingTemplate.PaymentMethodType":
    AccountCapabilityPricingTemplate.PaymentMethodType,
  "AccountCapabilityPricingTemplate.Currency":
    AccountCapabilityPricingTemplate.Currency,
  "AccountCapabilityPricingTemplate.Status":
    AccountCapabilityPricingTemplate.Status,
  "AccountCapabilityProductCode.PaymentMethodType":
    AccountCapabilityProductCode.PaymentMethodType,
  "AccountCapabilityProductCode.Currency":
    AccountCapabilityProductCode.Currency,
  "AccountCapabilityProductCode.Region": AccountCapabilityProductCode.Region,
  "AccountCreateParamsBankAccount.Type": AccountCreateParamsBankAccount.Type,
  "AccountCreateParamsBankAccount.Currency":
    AccountCreateParamsBankAccount.Currency,
  "AchDebitDetails.AccountType": AchDebitDetails.AccountType,
  "AchDebitSingleUseTokenDetails.AccountType":
    AchDebitSingleUseTokenDetails.AccountType,
  "ApiKey.Type": ApiKey.Type,
  "ApiKey.Scopes": ApiKey.Scopes,
  "ApiKeyCreateParams.Type": ApiKeyCreateParams.Type,
  "ApiKeyCreateParams.Scopes": ApiKeyCreateParams.Scopes,
  "ApiKeyUpdateParams.Scopes": ApiKeyUpdateParams.Scopes,
  "BLEBankAccount.Type": BLEBankAccount.Type,
  "BalanceTransaction.Status": BalanceTransaction.Status,
  "BalanceTransaction.Currency": BalanceTransaction.Currency,
  "BalanceTransaction.SourceType": BalanceTransaction.SourceType,
  "BalanceTransaction.Type": BalanceTransaction.Type,
  "BalanceTransaction.FeeSubtype": BalanceTransaction.FeeSubtype,
  "BalanceTransaction.FeeType": BalanceTransaction.FeeType,
  "BalanceTransactionFeeDetail.Currency": BalanceTransactionFeeDetail.Currency,
  "BalanceTransactionFeeDetail.Type": BalanceTransactionFeeDetail.Type,
  "BalanceTransactionTypeSummaries.TimeUnit":
    BalanceTransactionTypeSummaries.TimeUnit,
  "BalanceTransactionTypeSummary.Type": BalanceTransactionTypeSummary.Type,
  "BalanceTransactionTypeSummary.Currency":
    BalanceTransactionTypeSummary.Currency,
  "BalanceTransactionsSummaryParameters.TimeUnit":
    BalanceTransactionsSummaryParameters.TimeUnit,
  "BalanceTransactionsSummaryParameters.TimeZone":
    BalanceTransactionsSummaryParameters.TimeZone,
  "BalanceTransactionsSummaryParameters.Types":
    BalanceTransactionsSummaryParameters.Types,
  "BalanceTransactionsSummaryQueryParams.TimeUnit":
    BalanceTransactionsSummaryQueryParams.TimeUnit,
  "BalanceTransactionsSummaryQueryParams.TimeZone":
    BalanceTransactionsSummaryQueryParams.TimeZone,
  "BalanceTransactionsSummaryQueryParams.Types":
    BalanceTransactionsSummaryQueryParams.Types,
  "BankAccount.Type": BankAccount.Type,
  "BankAccount.Currency": BankAccount.Currency,
  "BankAccount.Status": BankAccount.Status,
  "BankAccountCreateParams.Type": BankAccountCreateParams.Type,
  "BankAccountCreateParams.Currency": BankAccountCreateParams.Currency,
  "BusinessLegalEntity.Type": BusinessLegalEntity.Type,
  "BusinessLegalEntity.Category": BusinessLegalEntity.Category,
  "BusinessLegalEntity.Currency": BusinessLegalEntity.Currency,
  "BusinessLegalEntity.YearlyVolumeRange":
    BusinessLegalEntity.YearlyVolumeRange,
  "BusinessLegalEntity.Region": BusinessLegalEntity.Region,
  "BusinessLegalEntity.Locale": BusinessLegalEntity.Locale,
  "BusinessLegalEntityAchBankAccount.Type":
    BusinessLegalEntityAchBankAccount.Type,
  "BusinessLegalEntityBankAccount.Type": BusinessLegalEntityBankAccount.Type,
  "BusinessProfile.Category": BusinessProfile.Category,
  "BusinessProfile.Locale": BusinessProfile.Locale,
  "BusinessProfile.Region": BusinessProfile.Region,
  "BusinessProfile.Structure": BusinessProfile.Structure,
  "BusinessRepresentative.Type": BusinessRepresentative.Type,
  "CardChargeFeeTemplate.TransactionFeeType":
    CardChargeFeeTemplate.TransactionFeeType,
  "CardChecks.AddressLine1Check": CardChecks.AddressLine1Check,
  "CardChecks.AddressPostalCodeCheck": CardChecks.AddressPostalCodeCheck,
  "CardChecks.CvcCheck": CardChecks.CvcCheck,
  "CardDetails.Brand": CardDetails.Brand,
  "CardDetails.Funding": CardDetails.Funding,
  "CardDetailsChecks.AddressLine1Check": CardDetailsChecks.AddressLine1Check,
  "CardDetailsChecks.AddressPostalCodeCheck":
    CardDetailsChecks.AddressPostalCodeCheck,
  "CardDetailsChecks.CvcCheck": CardDetailsChecks.CvcCheck,
  "Charge.Status": Charge.Status,
  "Charge.FailureCode": Charge.FailureCode,
  "ChargeBalanceTransaction.Status": ChargeBalanceTransaction.Status,
  "ChargeBalanceTransaction.Currency": ChargeBalanceTransaction.Currency,
  "ChargeBalanceTransaction.SourceType": ChargeBalanceTransaction.SourceType,
  "ChargeBalanceTransaction.Type": ChargeBalanceTransaction.Type,
  "ChargeBalanceTransaction.FeeSubtype": ChargeBalanceTransaction.FeeSubtype,
  "ChargeBalanceTransaction.FeeType": ChargeBalanceTransaction.FeeType,
  "ChargePlatformFee.Currency": ChargePlatformFee.Currency,
  "CheckoutSession.PaymentMethodTypes": CheckoutSession.PaymentMethodTypes,
  "CheckoutSession.Currency": CheckoutSession.Currency,
  "CheckoutSession.Status": CheckoutSession.Status,
  "CheckoutSessionCreateParamsPaymentIntentData.PaymentMethodTypes":
    CheckoutSessionCreateParamsPaymentIntentData.PaymentMethodTypes,
  "CheckoutSessionLineItemPriceData.Currency":
    CheckoutSessionLineItemPriceData.Currency,
  "DebitFeeTemplate.TransactionFeeType": DebitFeeTemplate.TransactionFeeType,
  "Dispute.Currency": Dispute.Currency,
  "Dispute.Status": Dispute.Status,
  "DisputeFile.Type": DisputeFile.Type,
  "DisputeFileCreateParams.Type": DisputeFileCreateParams.Type,
  "DisputeFileFile.Type": DisputeFileFile.Type,
  "DisputeFileFile.Purpose": DisputeFileFile.Purpose,
  "Event.Type": Event.Type,
  "HealthOutput.Status": HealthOutput.Status,
  "LoginDtoUser.Role": LoginDtoUser.Role,
  "Markup.CardType": Markup.CardType,
  "MerchantApplicationBusinessLegalEntity.Type":
    MerchantApplicationBusinessLegalEntity.Type,
  "MerchantApplicationBusinessLegalEntity.Category":
    MerchantApplicationBusinessLegalEntity.Category,
  "MerchantApplicationBusinessLegalEntity.Currency":
    MerchantApplicationBusinessLegalEntity.Currency,
  "MerchantApplicationBusinessLegalEntity.YearlyVolumeRange":
    MerchantApplicationBusinessLegalEntity.YearlyVolumeRange,
  "MerchantApplicationBusinessLegalEntity.Region":
    MerchantApplicationBusinessLegalEntity.Region,
  "MerchantApplicationBusinessLegalEntity.Locale":
    MerchantApplicationBusinessLegalEntity.Locale,
  "ModelFile.Type": ModelFile.Type,
  "ModelFile.Purpose": ModelFile.Purpose,
  "PaymentIntent.PaymentMethodTypes": PaymentIntent.PaymentMethodTypes,
  "PaymentIntent.Currency": PaymentIntent.Currency,
  "PaymentIntent.Status": PaymentIntent.Status,
  "PaymentIntent.CaptureMethod": PaymentIntent.CaptureMethod,
  "PaymentIntent.CancellationReason": PaymentIntent.CancellationReason,
  "PaymentIntent.OccurrenceType": PaymentIntent.OccurrenceType,
  "PaymentIntentCancelParams.CancellationReason":
    PaymentIntentCancelParams.CancellationReason,
  "PaymentIntentCreateParams.PaymentMethodTypes":
    PaymentIntentCreateParams.PaymentMethodTypes,
  "PaymentIntentCreateParams.Currency": PaymentIntentCreateParams.Currency,
  "PaymentIntentCreateParams.CaptureMethod":
    PaymentIntentCreateParams.CaptureMethod,
  "PaymentIntentCreateParams.OccurrenceType":
    PaymentIntentCreateParams.OccurrenceType,
  "PaymentIntentDataCreateParams.PaymentMethodTypes":
    PaymentIntentDataCreateParams.PaymentMethodTypes,
  "PaymentIntentError.Code": PaymentIntentError.Code,
  "PaymentIntentLastPaymentError.Code": PaymentIntentLastPaymentError.Code,
  "PaymentIntentPaymentMethod.Type": PaymentIntentPaymentMethod.Type,
  "PaymentIntentUpdateParams.PaymentMethodTypes":
    PaymentIntentUpdateParams.PaymentMethodTypes,
  "PaymentIntentUpdateParams.Currency": PaymentIntentUpdateParams.Currency,
  "PaymentIntentUpdateParams.CaptureMethod":
    PaymentIntentUpdateParams.CaptureMethod,
  "PaymentIntentUpdateParams.OccurrenceType":
    PaymentIntentUpdateParams.OccurrenceType,
  "PaymentMethod.Type": PaymentMethod.Type,
  "PaymentMethodAchDebit.AccountType": PaymentMethodAchDebit.AccountType,
  "PaymentMethodCard.Brand": PaymentMethodCard.Brand,
  "PaymentMethodCard.Funding": PaymentMethodCard.Funding,
  "PaymentMethodCreateAchDebitSingleUseTokenParamsAchDebit.AccountType":
    PaymentMethodCreateAchDebitSingleUseTokenParamsAchDebit.AccountType,
  "PaymentMethodCreateParams.Type": PaymentMethodCreateParams.Type,
  "PaymentMethodCreateParamsAchDebit.AccountType":
    PaymentMethodCreateParamsAchDebit.AccountType,
  "Payout.Currency": Payout.Currency,
  "Payout.Status": Payout.Status,
  "Payout.FailureCode": Payout.FailureCode,
  "PayoutBalanceTransaction.Status": PayoutBalanceTransaction.Status,
  "PayoutBalanceTransaction.Currency": PayoutBalanceTransaction.Currency,
  "PayoutBalanceTransaction.SourceType": PayoutBalanceTransaction.SourceType,
  "PayoutBalanceTransaction.Type": PayoutBalanceTransaction.Type,
  "PayoutBalanceTransaction.FeeSubtype": PayoutBalanceTransaction.FeeSubtype,
  "PayoutBalanceTransaction.FeeType": PayoutBalanceTransaction.FeeType,
  "PlatformFee.Currency": PlatformFee.Currency,
  "PlatformFeeBalanceTransaction.Status": PlatformFeeBalanceTransaction.Status,
  "PlatformFeeBalanceTransaction.Currency":
    PlatformFeeBalanceTransaction.Currency,
  "PlatformFeeBalanceTransaction.SourceType":
    PlatformFeeBalanceTransaction.SourceType,
  "PlatformFeeBalanceTransaction.Type": PlatformFeeBalanceTransaction.Type,
  "PlatformFeeBalanceTransaction.FeeSubtype":
    PlatformFeeBalanceTransaction.FeeSubtype,
  "PlatformFeeBalanceTransaction.FeeType":
    PlatformFeeBalanceTransaction.FeeType,
  "PlatformFeeRefundBalanceTransaction.Status":
    PlatformFeeRefundBalanceTransaction.Status,
  "PlatformFeeRefundBalanceTransaction.Currency":
    PlatformFeeRefundBalanceTransaction.Currency,
  "PlatformFeeRefundBalanceTransaction.SourceType":
    PlatformFeeRefundBalanceTransaction.SourceType,
  "PlatformFeeRefundBalanceTransaction.Type":
    PlatformFeeRefundBalanceTransaction.Type,
  "PlatformFeeRefundBalanceTransaction.FeeSubtype":
    PlatformFeeRefundBalanceTransaction.FeeSubtype,
  "PlatformFeeRefundBalanceTransaction.FeeType":
    PlatformFeeRefundBalanceTransaction.FeeType,
  "Price.Currency": Price.Currency,
  "PricingTemplate.PaymentMethodType": PricingTemplate.PaymentMethodType,
  "PricingTemplate.Currency": PricingTemplate.Currency,
  "PricingTemplate.Status": PricingTemplate.Status,
  "PricingTemplateAchDebit.TransactionFeeType":
    PricingTemplateAchDebit.TransactionFeeType,
  "PricingTemplateCard.TransactionFeeType":
    PricingTemplateCard.TransactionFeeType,
  "PricingTemplateEftDebit.TransactionFeeType":
    PricingTemplateEftDebit.TransactionFeeType,
  "Principal.Nationality": Principal.Nationality,
  "Principal.Type": Principal.Type,
  "ProductCode.PaymentMethodType": ProductCode.PaymentMethodType,
  "ProductCode.Currency": ProductCode.Currency,
  "ProductCode.Region": ProductCode.Region,
  "Refund.Status": Refund.Status,
  "Refund.FailureCode": Refund.FailureCode,
  "Refund.Reason": Refund.Reason,
  "RefundCreateParams.Reason": RefundCreateParams.Reason,
  "RegisterDtoAccount.Type": RegisterDtoAccount.Type,
  "RegisterDtoUser.Role": RegisterDtoUser.Role,
  "ReportMetadataKey.MetadataType": ReportMetadataKey.MetadataType,
  "ReportRun.Type": ReportRun.Type,
  "ReportRun.Status": ReportRun.Status,
  "ReportRunCreateParams.Type": ReportRunCreateParams.Type,
  "ReportRunCreateParamsParameters.TimeZone":
    ReportRunCreateParamsParameters.TimeZone,
  "ReportRunRequestParameters.TimeZone": ReportRunRequestParameters.TimeZone,
  "Subscription.Currency": Subscription.Currency,
  "Subscription.IntervalUnit": Subscription.IntervalUnit,
  "Subscription.Status": Subscription.Status,
  "SubscriptionCreateParams.Currency": SubscriptionCreateParams.Currency,
  "SubscriptionCreateParams.IntervalUnit":
    SubscriptionCreateParams.IntervalUnit,
  "TerminalReader.Type": TerminalReader.Type,
  "User.Role": User.Role,
  "UserCreateParams.Role": UserCreateParams.Role,
  "UserInvitation.Role": UserInvitation.Role,
  "UserInvitationCreateParams.Role": UserInvitationCreateParams.Role,
  "UserInvitationCreateParams.EmailTemplate":
    UserInvitationCreateParams.EmailTemplate,
  "UserUpdateParams.Role": UserUpdateParams.Role,
  "WebhookEndpoint.EnabledEvents": WebhookEndpoint.EnabledEvents,
  "WebhookEndpointCreateParams.EnabledEvents":
    WebhookEndpointCreateParams.EnabledEvents,
  "WebhookEndpointUpdateParams.EnabledEvents":
    WebhookEndpointUpdateParams.EnabledEvents,
};

let typeMap: { [index: string]: any } = {
  AccessTokenRefreshParams: AccessTokenRefreshParams,
  Account: Account,
  AccountBusinessProfile: AccountBusinessProfile,
  AccountCapability: AccountCapability,
  AccountCapabilityCreateParams: AccountCapabilityCreateParams,
  AccountCapabilityPricingTemplate: AccountCapabilityPricingTemplate,
  AccountCapabilityProductCode: AccountCapabilityProductCode,
  AccountCapabilityUpdateParams: AccountCapabilityUpdateParams,
  AccountCreateParams: AccountCreateParams,
  AccountCreateParamsBankAccount: AccountCreateParamsBankAccount,
  AccountCreateParamsSettings: AccountCreateParamsSettings,
  AccountRequirementsError: AccountRequirementsError,
  AccountSettings: AccountSettings,
  AccountSettingsBranding: AccountSettingsBranding,
  AccountSettingsBrandingCreateParams: AccountSettingsBrandingCreateParams,
  AccountSettingsCreateParams: AccountSettingsCreateParams,
  AccountSettingsCreateParamsBranding: AccountSettingsCreateParamsBranding,
  AccountUpdateParams: AccountUpdateParams,
  AchDebitDetails: AchDebitDetails,
  AchDebitSingleUseToken: AchDebitSingleUseToken,
  AchDebitSingleUseTokenDetails: AchDebitSingleUseTokenDetails,
  Address: Address,
  ApiKey: ApiKey,
  ApiKeyCreateParams: ApiKeyCreateParams,
  ApiKeyUpdateParams: ApiKeyUpdateParams,
  ApplePayDomain: ApplePayDomain,
  ApplePayDomainCreateParams: ApplePayDomainCreateParams,
  AuthLinkCreateParams: AuthLinkCreateParams,
  AuthLinkDto: AuthLinkDto,
  BLEBankAccount: BLEBankAccount,
  BalanceTransaction: BalanceTransaction,
  BalanceTransactionFeeDetail: BalanceTransactionFeeDetail,
  BalanceTransactionTypeSummaries: BalanceTransactionTypeSummaries,
  BalanceTransactionTypeSummary: BalanceTransactionTypeSummary,
  BalanceTransactionsSummary: BalanceTransactionsSummary,
  BalanceTransactionsSummaryParameters: BalanceTransactionsSummaryParameters,
  BalanceTransactionsSummaryQueryParams: BalanceTransactionsSummaryQueryParams,
  BankAccount: BankAccount,
  BankAccountCreateParams: BankAccountCreateParams,
  BaseAddress: BaseAddress,
  BusinessLegalEntity: BusinessLegalEntity,
  BusinessLegalEntityAchBankAccount: BusinessLegalEntityAchBankAccount,
  BusinessLegalEntityAddress: BusinessLegalEntityAddress,
  BusinessLegalEntityBankAccount: BusinessLegalEntityBankAccount,
  BusinessProfile: BusinessProfile,
  BusinessProfileAddress: BusinessProfileAddress,
  BusinessRepresentative: BusinessRepresentative,
  CardChargeFeeTemplate: CardChargeFeeTemplate,
  CardChecks: CardChecks,
  CardDetails: CardDetails,
  CardDetailsChecks: CardDetailsChecks,
  Charge: Charge,
  ChargeBalanceTransaction: ChargeBalanceTransaction,
  ChargePlatformFee: ChargePlatformFee,
  CheckoutSession: CheckoutSession,
  CheckoutSessionCreateParams: CheckoutSessionCreateParams,
  CheckoutSessionCreateParamsPaymentIntentData:
    CheckoutSessionCreateParamsPaymentIntentData,
  CheckoutSessionCustomerDetails: CheckoutSessionCustomerDetails,
  CheckoutSessionLineItem: CheckoutSessionLineItem,
  CheckoutSessionLineItemPriceData: CheckoutSessionLineItemPriceData,
  Customer: Customer,
  CustomerCreateParams: CustomerCreateParams,
  CustomerDetails: CustomerDetails,
  CustomerUpdateParams: CustomerUpdateParams,
  DebitFeeTemplate: DebitFeeTemplate,
  Dispute: Dispute,
  DisputeEvidence: DisputeEvidence,
  DisputeEvidenceCreateParams: DisputeEvidenceCreateParams,
  DisputeFile: DisputeFile,
  DisputeFileCreateParams: DisputeFileCreateParams,
  DisputeFileFile: DisputeFileFile,
  EftDebitDetails: EftDebitDetails,
  Event: Event,
  ForgotPasswordParams: ForgotPasswordParams,
  HealthOutput: HealthOutput,
  Level3: Level3,
  LineItem: LineItem,
  ListAPIKeys200Response: ListAPIKeys200Response,
  ListAPIKeys200ResponseAllOf: ListAPIKeys200ResponseAllOf,
  ListApplePayDomains200Response: ListApplePayDomains200Response,
  ListApplePayDomains200ResponseAllOf: ListApplePayDomains200ResponseAllOf,
  ListBalanceTransactions200Response: ListBalanceTransactions200Response,
  ListBalanceTransactions200ResponseAllOf:
    ListBalanceTransactions200ResponseAllOf,
  ListCheckoutSessions200Response: ListCheckoutSessions200Response,
  ListCheckoutSessions200ResponseAllOf: ListCheckoutSessions200ResponseAllOf,
  ListConnectedAccounts200Response: ListConnectedAccounts200Response,
  ListConnectedAccounts200ResponseAllOf: ListConnectedAccounts200ResponseAllOf,
  ListCustomers200Response: ListCustomers200Response,
  ListCustomers200ResponseAllOf: ListCustomers200ResponseAllOf,
  ListDisputes200Response: ListDisputes200Response,
  ListDisputes200ResponseAllOf: ListDisputes200ResponseAllOf,
  ListEvents200Response: ListEvents200Response,
  ListEvents200ResponseAllOf: ListEvents200ResponseAllOf,
  ListFiles200Response: ListFiles200Response,
  ListFiles200ResponseAllOf: ListFiles200ResponseAllOf,
  ListPaymentIntents200Response: ListPaymentIntents200Response,
  ListPaymentIntents200ResponseAllOf: ListPaymentIntents200ResponseAllOf,
  ListPaymentMethods200Response: ListPaymentMethods200Response,
  ListPaymentMethods200ResponseAllOf: ListPaymentMethods200ResponseAllOf,
  ListPayouts200Response: ListPayouts200Response,
  ListPayouts200ResponseAllOf: ListPayouts200ResponseAllOf,
  ListPlatformFees200Response: ListPlatformFees200Response,
  ListPlatformFees200ResponseAllOf: ListPlatformFees200ResponseAllOf,
  ListPricingTemplates200Response: ListPricingTemplates200Response,
  ListPricingTemplates200ResponseAllOf: ListPricingTemplates200ResponseAllOf,
  ListProductCodes200Response: ListProductCodes200Response,
  ListProductCodes200ResponseAllOf: ListProductCodes200ResponseAllOf,
  ListRefunds200Response: ListRefunds200Response,
  ListRefunds200ResponseAllOf: ListRefunds200ResponseAllOf,
  ListReportRuns200Response: ListReportRuns200Response,
  ListReportRuns200ResponseAllOf: ListReportRuns200ResponseAllOf,
  ListSubscriptions200Response: ListSubscriptions200Response,
  ListSubscriptions200ResponseAllOf: ListSubscriptions200ResponseAllOf,
  ListUserInvitations200Response: ListUserInvitations200Response,
  ListUserInvitations200ResponseAllOf: ListUserInvitations200ResponseAllOf,
  ListUsers200Response: ListUsers200Response,
  ListUsers200ResponseAllOf: ListUsers200ResponseAllOf,
  ListWebhookEndpoints200Response: ListWebhookEndpoints200Response,
  ListWebhookEndpoints200ResponseAllOf: ListWebhookEndpoints200ResponseAllOf,
  LoginDto: LoginDto,
  LoginDtoUser: LoginDtoUser,
  LoginParams: LoginParams,
  Markup: Markup,
  MerchantApplication: MerchantApplication,
  MerchantApplicationBusinessLegalEntity:
    MerchantApplicationBusinessLegalEntity,
  MerchantApplicationCreateParams: MerchantApplicationCreateParams,
  ModelFile: ModelFile,
  PaginatedDto: PaginatedDto,
  PartialAddress: PartialAddress,
  PaymentIntent: PaymentIntent,
  PaymentIntentCancelParams: PaymentIntentCancelParams,
  PaymentIntentCaptureParams: PaymentIntentCaptureParams,
  PaymentIntentConfirmParams: PaymentIntentConfirmParams,
  PaymentIntentCreateParams: PaymentIntentCreateParams,
  PaymentIntentCustomer: PaymentIntentCustomer,
  PaymentIntentDataCreateParams: PaymentIntentDataCreateParams,
  PaymentIntentError: PaymentIntentError,
  PaymentIntentLastPaymentError: PaymentIntentLastPaymentError,
  PaymentIntentLevel3: PaymentIntentLevel3,
  PaymentIntentPaymentMethod: PaymentIntentPaymentMethod,
  PaymentIntentUpdateParams: PaymentIntentUpdateParams,
  PaymentMethod: PaymentMethod,
  PaymentMethodAchDebit: PaymentMethodAchDebit,
  PaymentMethodAttachParams: PaymentMethodAttachParams,
  PaymentMethodBillingDetails: PaymentMethodBillingDetails,
  PaymentMethodBillingDetailsAddress: PaymentMethodBillingDetailsAddress,
  PaymentMethodCard: PaymentMethodCard,
  PaymentMethodCreateAchDebitSingleUseTokenParams:
    PaymentMethodCreateAchDebitSingleUseTokenParams,
  PaymentMethodCreateAchDebitSingleUseTokenParamsAchDebit:
    PaymentMethodCreateAchDebitSingleUseTokenParamsAchDebit,
  PaymentMethodCreateAchDebitSingleUseTokenParamsBillingDetails:
    PaymentMethodCreateAchDebitSingleUseTokenParamsBillingDetails,
  PaymentMethodCreateDebitSingleUseTokenParamsBillingDetails:
    PaymentMethodCreateDebitSingleUseTokenParamsBillingDetails,
  PaymentMethodCreateDebitSingleUseTokenParamsBillingDetailsAddress:
    PaymentMethodCreateDebitSingleUseTokenParamsBillingDetailsAddress,
  PaymentMethodCreateParams: PaymentMethodCreateParams,
  PaymentMethodCreateParamsAchDebit: PaymentMethodCreateParamsAchDebit,
  PaymentMethodCreateParamsBillingDetails:
    PaymentMethodCreateParamsBillingDetails,
  PaymentMethodCreateParamsCard: PaymentMethodCreateParamsCard,
  PaymentMethodCreateParamsEftDebit: PaymentMethodCreateParamsEftDebit,
  PaymentMethodEftDebit: PaymentMethodEftDebit,
  PaymentMethodUpdateParams: PaymentMethodUpdateParams,
  Payout: Payout,
  PayoutBalanceTransaction: PayoutBalanceTransaction,
  PlatformFee: PlatformFee,
  PlatformFeeBalanceTransaction: PlatformFeeBalanceTransaction,
  PlatformFeeRefund: PlatformFeeRefund,
  PlatformFeeRefundBalanceTransaction: PlatformFeeRefundBalanceTransaction,
  Price: Price,
  PriceProductData: PriceProductData,
  PricingTemplate: PricingTemplate,
  PricingTemplateAchDebit: PricingTemplateAchDebit,
  PricingTemplateCard: PricingTemplateCard,
  PricingTemplateEftDebit: PricingTemplateEftDebit,
  Principal: Principal,
  PrincipalAddress: PrincipalAddress,
  PrincipalPreviousAddress: PrincipalPreviousAddress,
  Product: Product,
  ProductCode: ProductCode,
  Refund: Refund,
  RefundCreateParams: RefundCreateParams,
  RegisterDto: RegisterDto,
  RegisterDtoAccount: RegisterDtoAccount,
  RegisterDtoUser: RegisterDtoUser,
  RegisterParams: RegisterParams,
  ReportMetadataKey: ReportMetadataKey,
  ReportRun: ReportRun,
  ReportRunCreateParams: ReportRunCreateParams,
  ReportRunCreateParamsParameters: ReportRunCreateParamsParameters,
  ReportRunRequestParameters: ReportRunRequestParameters,
  ReportRunRetrieveParams: ReportRunRetrieveParams,
  Subscription: Subscription,
  SubscriptionCreateParams: SubscriptionCreateParams,
  SubscriptionPauseParams: SubscriptionPauseParams,
  SubscriptionRetryParams: SubscriptionRetryParams,
  SubscriptionUpdateParams: SubscriptionUpdateParams,
  TerminalReader: TerminalReader,
  TermsAndConditionsDetail: TermsAndConditionsDetail,
  User: User,
  UserCreateParams: UserCreateParams,
  UserInvitation: UserInvitation,
  UserInvitationCheck: UserInvitationCheck,
  UserInvitationCreateParams: UserInvitationCreateParams,
  UserResetPasswordParams: UserResetPasswordParams,
  UserUpdateParams: UserUpdateParams,
  WebhookEndpoint: WebhookEndpoint,
  WebhookEndpointCreateParams: WebhookEndpointCreateParams,
  WebhookEndpointUpdateParams: WebhookEndpointUpdateParams,
};

export class ObjectSerializer {
  public static findCorrectType(data: any, expectedType: string) {
    if (data == undefined) {
      return expectedType;
    } else if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
      return expectedType;
    } else if (expectedType === "Date") {
      return expectedType;
    } else {
      if (enumsMap[expectedType]) {
        return expectedType;
      }

      if (!typeMap[expectedType]) {
        return expectedType; // w/e we don't know the type
      }

      // Check the discriminator
      let discriminatorProperty = typeMap[expectedType].discriminator;
      if (discriminatorProperty == null) {
        return expectedType; // the type does not have a discriminator. use it.
      } else {
        if (data[discriminatorProperty]) {
          var discriminatorType = data[discriminatorProperty];
          if (typeMap[discriminatorType]) {
            return discriminatorType; // use the type given in the discriminator
          } else {
            return expectedType; // discriminator did not map to a type
          }
        } else {
          return expectedType; // discriminator was not present (or an empty string)
        }
      }
    }
  }

  public static serialize(data: any, type: string) {
    if (data == undefined) {
      return data;
    } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
      return data;
    } else if (type.lastIndexOf("Array<", 0) === 0) {
      // string.startsWith pre es6
      let subType: string = type.replace("Array<", ""); // Array<Type> => Type>
      subType = subType.substring(0, subType.length - 1); // Type> => Type
      let transformedData: any[] = [];
      for (let index = 0; index < data.length; index++) {
        let datum = data[index];
        transformedData.push(ObjectSerializer.serialize(datum, subType));
      }
      return transformedData;
    } else if (type === "Date") {
      return data.toISOString();
    } else {
      if (enumsMap[type]) {
        return data;
      }
      if (!typeMap[type]) {
        // in case we dont know the type
        return data;
      }

      // Get the actual type of this object
      type = this.findCorrectType(data, type);

      // get the map for the correct type.
      let attributeTypes = typeMap[type].getAttributeTypeMap();
      let instance: { [index: string]: any } = {};
      for (let index = 0; index < attributeTypes.length; index++) {
        let attributeType = attributeTypes[index];
        instance[attributeType.baseName] = ObjectSerializer.serialize(
          data[attributeType.name],
          attributeType.type
        );
      }
      return instance;
    }
  }

  public static deserialize(data: any, type: string) {
    // polymorphism may change the actual type.
    type = ObjectSerializer.findCorrectType(data, type);
    if (data == undefined) {
      return data;
    } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
      return data;
    } else if (type.lastIndexOf("Array<", 0) === 0) {
      // string.startsWith pre es6
      let subType: string = type.replace("Array<", ""); // Array<Type> => Type>
      subType = subType.substring(0, subType.length - 1); // Type> => Type
      let transformedData: any[] = [];
      for (let index = 0; index < data.length; index++) {
        let datum = data[index];
        transformedData.push(ObjectSerializer.deserialize(datum, subType));
      }
      return transformedData;
    } else if (type === "Date") {
      return new Date(data);
    } else {
      if (enumsMap[type]) {
        // is Enum
        return data;
      }

      if (!typeMap[type]) {
        // dont know the type
        return data;
      }
      let instance = new typeMap[type]();
      let attributeTypes = typeMap[type].getAttributeTypeMap();
      for (let index = 0; index < attributeTypes.length; index++) {
        let attributeType = attributeTypes[index];
        instance[attributeType.name] = ObjectSerializer.deserialize(
          data[attributeType.baseName],
          attributeType.type
        );
      }
      return instance;
    }
  }
}

export interface Authentication {
  /**
   * Apply authentication settings to header and query params.
   */
  applyToRequest(requestOptions: localVarRequest.Options): Promise<void> | void;
}

export class HttpBasicAuth implements Authentication {
  public username: string = "";
  public password: string = "";

  applyToRequest(requestOptions: localVarRequest.Options): void {
    requestOptions.auth = {
      username: this.username,
      password: this.password,
    };
  }
}

export class HttpBearerAuth implements Authentication {
  public accessToken: string | (() => string) = "";

  applyToRequest(requestOptions: localVarRequest.Options): void {
    if (requestOptions && requestOptions.headers) {
      const accessToken =
        typeof this.accessToken === "function"
          ? this.accessToken()
          : this.accessToken;
      requestOptions.headers["Authorization"] = "Bearer " + accessToken;
    }
  }
}

export class ApiKeyAuth implements Authentication {
  public apiKey: string = "";

  constructor(private location: string, private paramName: string) {}

  applyToRequest(requestOptions: localVarRequest.Options): void {
    if (this.location == "query") {
      (<any>requestOptions.qs)[this.paramName] = this.apiKey;
    } else if (
      this.location == "header" &&
      requestOptions &&
      requestOptions.headers
    ) {
      requestOptions.headers[this.paramName] = this.apiKey;
    } else if (
      this.location == "cookie" &&
      requestOptions &&
      requestOptions.headers
    ) {
      if (requestOptions.headers["Cookie"]) {
        requestOptions.headers["Cookie"] +=
          "; " + this.paramName + "=" + encodeURIComponent(this.apiKey);
      } else {
        requestOptions.headers["Cookie"] =
          this.paramName + "=" + encodeURIComponent(this.apiKey);
      }
    }
  }
}

export class OAuth implements Authentication {
  public accessToken: string = "";

  applyToRequest(requestOptions: localVarRequest.Options): void {
    if (requestOptions && requestOptions.headers) {
      requestOptions.headers["Authorization"] = "Bearer " + this.accessToken;
    }
  }
}

export class VoidAuth implements Authentication {
  public username: string = "";
  public password: string = "";

  applyToRequest(_: localVarRequest.Options): void {
    // Do nothing
  }
}

export type Interceptor = (
  requestOptions: localVarRequest.Options
) => Promise<void> | void;
