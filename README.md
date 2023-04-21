# tilled-node

## Disclaimer

This project is still in beta. It is generated and regenerated regularly when we make changes to our spec, but we cannot guarantee it's reliability at this time.

---

## Description

This SDK was generated using the [Typescript-Node generator](https://openapi-generator.tech/docs/generators/typescript-node) with the following [codegen.conf.json](codegen.conf.json)

## Install the NPM Package

In your root directory of your node application, run the following command:

```bash
npm install tilled-node --save
```

## Import the Necessary Modules

To use any of the modules in this SDK, will need to import an ApiKeys module in addition to the module you are attempting to use. To create and confirm a payment intent, you will need to import the `PaymentIntentsApi` and `PaymentIntentsApiKeys` modules like so:

```typescript
import {
  PaymentIntentsApi,
  PaymentIntentsApiApiKeys,
} from '../tilled-api-client/api/paymentIntentsApi';
import { PaymentIntentCreateParams } from '../tilled-api-client/model/paymentIntentCreateParams';
import { PaymentIntentConfirmParams } from '../tilled-api-client/model/paymentIntentConfirmParams';
```

## Configuring Your Class Instance

Once you have imported both modules, create a new class instance of the API module, set your secret key with the ApiKeys module, and set the `basePath` to the API:

```typescript
const paymentIntentsApi = new PaymentIntentsApi();

paymentIntentsApi.setApiKey(
  PaymentIntentsApiApiKeys.TilledApiKey,
  tilledSecretApiKey
);
paymentIntentsApi.basePath = 'https://sandbox-api.tilled.com';
```

### Setting the Base Path

This SDK's `basePath` defaults to the production environment. The example above reassigns this property to the sandbox URL. Be sure to verify that you are using the [correct credentials](https://docs.tilled.com/faq/get-started/?query=are%20my%20credentials%20for%20sandbox%20the%20same%20as%20for%20production) for the environment you are working in.

## Creating a Payment Intent

We are now ready to make a payment. First, we need to [create a payment intent](https://docs.tilled.com/docs/payments/payment-intents/#paymentintent-creation). This should be done as soon as your checkout page or component is loaded. You can set up the endpoint for your frontend like so:

```typescript
app.post(
 '/payment-intents',
 (
  req: Request & {
   headers: {
    tilled_account: string;
   };
   body: PaymentIntentCreateParams;
  },
  res: Response & {
   json: any;
   send: any;
   status: any;
  }
 ) => {
  const { tilled_account } = req.headers;
  const paymentIntentCreateParams = req.body;
  paymentIntentsApi
   .createPaymentIntent(tilled_account, paymentIntentCreateParams)
   .then((response) => {
    return response.body;
   })
   .then((data) => {
    res.json(data);
    console.log(data);
   })
   .catch((error) => {
    console.error(error);
    res.status(404).json(error);
   });
 }
);
```

In this example, we are passing the payment intent parameter in the request body from our frontend. Note that we are using the `PaymentIntentCreateParams` type that we imported earlier.

## Confirming the Payment Intent

Now that we have a payment intent, let's [confirm](https://docs.tilled.com/docs/payments/payment-intents/#confirming-a-paymentintent) it:

```typescript
app.post(
 '/payment-intents/:id/confirm',
 (
  req: Request & {
   headers: {
    tilled_account: string;
   };
   params: {
    id: string;
   };
   body: PaymentIntentConfirmParams;
  },
  res: Response & {
   json: any;
   send: any;
   status: any;
  }
 ) => {
  const { tilled_account } = req.headers;
  const id = req.params.id;
  const paymentIntentConfirmParams = req.body;
  paymentIntentsApi
   .confirmPaymentIntent(tilled_account, id, paymentIntentConfirmParams)
   .then((response) => {
    return response.body;
   })
   .then((data) => {
    res.json(data);
    console.log(data);
   })
   .catch((error) => {
    console.error(error);
    res.status(404).json(error);
   });
 }
);
```

This example assumes that you are creating a payment intent on the client with [Tilled.js](https://docs.tilled.com/docs/payment-methods/tilledjs/) and passing it your request body. If you meet the PCI requirments to use the [Create a Payment Method](https://docs.tilled.com/api/#tag/PaymentMethods/operation/CreatePaymentMethod) endpoint and choose to use it, you will need to import the modules for the `PaymentMethodsApi` and create your payment method with the `createPaymentMethod` method.
