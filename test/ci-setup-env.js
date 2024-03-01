"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var dotenv = require("dotenv");
dotenv.config();
var serverEnv = "BASE_PATH=https://staging-api.tilled.com\nTILLED_SECRET_KEY=".concat(process.env.TILLED_SECRET_KEY, "\nTILLED_PARTNER_ACCOUNT=").concat(process.env.TILLED_PARTNER_ACCOUNT);
var clientEnv = "VITE_TILLED_PUBLIC_KEY=.".concat(process.env.VITE_TILLED_PUBLIC_KEY, "\nVITE_TILLED_MERCHANT_ACCOUNT_ID=").concat(process.env.VITE_TILLED_MERCHANT_ACCOUNT_ID, "\nVITE_TILLED_CUSTOMER_ID=").concat(process.env.VITE_TILLED_CUSTOMER_ID, "\nVITE_TILLED_MERCHANT_NAME=SDK Test\nVITE_TILLED_MERCHANT_TAX=1");
var envVarsExist = process.env.TILLED_SECRET_KEY && process.env.TILLED_PARTNER_ACCOUNT && process.env.VITE_TILLED_PUBLIC_KEY && process.env.VITE_TILLED_MERCHANT_ACCOUNT_ID && process.env.VITE_TILLED_CUSTOMER_ID;
console.log(fs.readdirSync('.'));
// These .env files need to be created in the react-ts-checkout submodule
// Vite needs the .env file to be in the client directory
// and the env variables to be prefixed with VITE_
function createEnvFiles() {
    console.log('Creating .env files in');
    if (!fs.existsSync('./test/project/react/react-ts-checkout')) {
        console.log(fs.readdirSync('./'));
        throw new Error('The react-ts-checkout submodule does not exist');
    }
    else if (!envVarsExist) {
        throw new Error('Environment variables are not set');
    }
    fs.writeFileSync('./test/project/react/react-ts-checkout/.env', serverEnv);
    fs.writeFileSync('./test/project/react/react-ts-checkout/client/.env', clientEnv);
    console.log('Successfully created .env files');
}
createEnvFiles();
