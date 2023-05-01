# tilled-node

## Disclaimer

This project is still in beta. It is generated and regenerated regularly when we make changes to our spec, but we cannot guarantee it's reliability at this time.

---

## Description

This SDK was generated using the [Typescript-Axios generator](https://openapi-generator.tech/docs/generators/typescript-axios) with the following [codegen.conf.json](codegen.conf.json)

### Install the NPM Package

In your root directory, run the following command:

```bash
npm install tilled-node --save
```

### Import the Necessary Modules

To use any of the modules in this SDK, will need to import an ApiKeys module in addition to the module you are attempting to use. To create and confirm a payment intent, you will need to import the `PaymentIntentsApi` and `PaymentIntentsApiKeys` modules like so:

```typescript
import {
	PaymentIntentsApi,
	PaymentIntentsApiApiKeys,
	PaymentIntentCreateParams,
	PaymentIntentConfirmParams,
} from 'tilled-node';
```

These examples only feature the `PaymentIntentsApi`, but this SDK is capable of making any of our other documented API calls. Our other APIs can be found in the [api](https://github.com/gettilled/tilled-node/tree/main/docs) directory.

### Set up Your Request Configuration

Once you have imported both modules, Set This SDK [Axios](https://axios-http.com/docs/intro) to make HTTP requests.

```typescript
const config = new Configuration({
	apiKey: process.env.TILLED_SECRET_KEY,
	basePath: 'https://sandbox-api.tilled.com', // defaults to https://api.tilled.com
	baseOptions: { timeout: 2000 }, // overide default settings with an Axios config
});
```

This SDK's `basePath` defaults to the production environment. The example above reassigns this property to the sandbox URL. Be sure to verify that you are using the [correct credentials](https://tilledpartners.zendesk.com/hc/en-us/articles/15020919691156-Are-my-credentials-for-sandbox-the-same-as-for-production-) for the environment you are working in.

### Configuring Your Class Instance

Use your newly created `config` to create a new class instance of the API module:

```typescript
const paymentIntentsApi = new PaymentIntentsApi(config);
```

## Process a Payment

### Creating a Payment Intent

We are now ready to make a payment. First, we need to [create a payment intent](https://docs.tilled.com/api#tag/PaymentIntents/operation/CreatePaymentIntent). This should be done as soon as your checkout page or componet is loaded. You can set up the endpoint for your frontend like so:

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

		paymentIntentsApi
			.createPaymentIntent({
				tilled_account,
				PaymentIntentCreateParams: req.body,
			})
			.then((response) => {
				return response.data;
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

### Confirming the Payment Intent

Now that we have a payment intent, let's [confirm](https://docs.tilled.com/api#tag/PaymentIntents/operation/ConfirmPaymentIntent) it:

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
		const { id } = req.params;

		paymentIntentsApi
			.confirmPaymentIntent({
				tilled_account,
				id,
				PaymentIntentConfirmParams: req.body,
			})
			.then((response) => {
				return response.data;
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

This example assumes that you are creating a payment intent on the client with [Tilled.js](https://docs.tilled.com/docs/payment-methods/tilledjs/) and passing it your request body. If you meet the PCI requirements to use the [Create a Payment Method](https://docs.tilled.com/api/#tag/PaymentMethods/operation/CreatePaymentMethod) endpoint and choose to use it, you will need to import the modules for the `PaymentMethodsApi` and create your payment method with the `createPaymentMethod` method.
