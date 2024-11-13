'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var fs = require('fs');
console.log(fs.readdirSync('.'));
var tilled = require('../dist');
function createNewCustomer() {
    var config = new tilled.Configuration({
      apiKey: process.env.TILLED_SECRET_KEY,
      basePath: process.env.BASE_PATH || 'https://staging-api.tilled.com',
      baseOptions: { timeout: 2000 }
    });
    var customersApi = new tilled.CustomersApi(config);
    var customerId = process.env.VITE_TILLED_CUSTOMER_ID;
  
    console.log('Creating a new customer');
  
    customersApi
      .createCustomer({
        tilled_account: process.env.VITE_TILLED_MERCHANT_ACCOUNT_ID,
        CustomerCreateParams: {
          email: 'testymctesterface@test.com',
          first_name: 'Testy',
          last_name: 'McTesterface'
        }
      })
      .then((response) => {
        console.log(response.data);
        customerId = response.data.id;
  
        var serverEnv =
          'BASE_PATH=https://staging-api.tilled.com\nTILLED_SECRET_KEY='
            .concat(process.env.TILLED_SECRET_KEY, '\nTILLED_PARTNER_ACCOUNT=')
            .concat(process.env.TILLED_PARTNER_ACCOUNT);
        var clientEnv = 'VITE_TILLED_PUBLIC_KEY='
          .concat(
            process.env.VITE_TILLED_PUBLIC_KEY,
            '\nVITE_TILLED_MERCHANT_ACCOUNT_ID='
          )
          .concat(
            process.env.VITE_TILLED_MERCHANT_ACCOUNT_ID,
            '\nVITE_TILLED_CUSTOMER_ID='
          )
          .concat(
            customerId,
            '\nVITE_TILLED_MERCHANT_NAME=SDK Test\nVITE_TILLED_MERCHANT_TAX=1'
          );
        var envVarsExist =
          process.env.TILLED_SECRET_KEY &&
          process.env.TILLED_PARTNER_ACCOUNT &&
          process.env.VITE_TILLED_PUBLIC_KEY &&
          process.env.VITE_TILLED_MERCHANT_ACCOUNT_ID &&
          customerId;
  
        createEnvFiles(serverEnv, clientEnv, envVarsExist);
        console.log(fs.readdirSync('.'));
      })
      .catch((error) => {
        console.error(error);
      });
  }
  createNewCustomer();
  
  // These .env files need to be created in the react-ts-checkout submodule
  // Vite needs the .env file to be in the client directory
  // and the env variables to be prefixed with VITE_
  function createEnvFiles(serverEnv, clientEnv, envVarsExist) {
    console.log('Creating .env files in');
    if (!fs.existsSync('./test/project/react/react-ts-checkout')) {
      console.log(fs.readdirSync('./'));
      throw new Error('The react-ts-checkout submodule does not exist');
    } else if (!envVarsExist) {
      throw new Error('Environment variables are not set');
    }
    fs.writeFileSync('./test/project/react/react-ts-checkout/.env', serverEnv);
    fs.writeFileSync(
      './test/project/react/react-ts-checkout/client/.env',
      clientEnv
    );
    console.log('Successfully created .env files');
  }
  